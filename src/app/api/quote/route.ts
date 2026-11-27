import { NextRequest, NextResponse } from "next/server";
import { calculateQuotation, type QuotationInput } from "@/lib/pricingEngine";
import { getVehicleRate } from "@/lib/data/vehicleRates";
import { sendWhatsAppNotification, logQuotationNotification } from "@/lib/whatsapp";
import { saveQuotationToSheet } from "@/lib/googleSheets";
import { getRouteById } from "@/lib/data/routes";
import {
  getHotelById,
  getRoomOccupancyError,
  isMalamJabbaHotelSelection,
} from "@/lib/data/hotels";
import { getKashmirStayLocations } from "@/lib/data/custom-city-stays";
import { isPackageJeepRideAvailable, packageJeepRideOptions } from "@/lib/data/jeeps";
import { applyPromotionToQuotation, validatePromoCode } from "@/lib/promotions/promotion-service";
import {
  createPromotionRedemption,
  isPromotionRedemptionConflict,
} from "@/lib/promotions/promotion-redemption";
import { normalizePromotionPhone } from "@/lib/promotions/promotion-phone";
import { getCustomItineraryTransportOptions } from "@/lib/transport/quotation";
import { allowRouteCalculation } from "@/lib/transport/rate-limit";
import {
  AirDestinationValidationError,
  buildAirRoadStops,
  getAirQuotationDestinations,
} from "@/lib/transport/air-routing";
import { RouteCalculationError } from "@/lib/transport/route-service";
import type { GeneratedItinerary } from "@/lib/itinerary-generator";

interface QuoteRequestBody extends QuotationInput {
  customerName: string;
  customerPhone: string;
  startingPoint: string;
  tourType: string;
  kidsAges?: string[];
  hotelCategory?: string;
  promoCode?: string;
  itinerary?: GeneratedItinerary;
}

function getMissingFields(body: QuoteRequestBody) {
  const required = [
    "customerName",
    "customerPhone",
    "routeId",
    "vehicleName",
    "numberOfRooms",
    "adults",
    "tripDate",
  ];
  return required.filter((field) => !body[field as keyof QuoteRequestBody]);
}

function buildValidationError(body: QuoteRequestBody) {
  if (typeof body.customerName !== "string" || typeof body.customerPhone !== "string") {
    return "Please provide a valid name and phone number.";
  }
  if (body.promoCode !== undefined && typeof body.promoCode !== "string") {
    return "Please provide a valid promo code.";
  }

  const integerFields = ["numberOfRooms", "adults", "kids"] as const;
  for (const field of integerFields) {
    const value = body[field];
    if (!Number.isInteger(value) || value < 0 || value > 100) {
      return `${field} must be a whole number between 0 and 100.`;
    }
  }
  if (!body.tripDate || Number.isNaN(Date.parse(body.tripDate))) {
    return "Please provide a valid trip date.";
  }
  if (body.travelMode !== undefined && body.travelMode !== "road" && body.travelMode !== "air") {
    return "Please select a valid travel mode.";
  }
  if (body.includeIslamabadTransit !== undefined && typeof body.includeIslamabadTransit !== "boolean") {
    return "Please provide a valid Islamabad transit selection.";
  }
  if (body.startingPoint !== undefined &&
      (typeof body.startingPoint !== "string" || body.startingPoint.length > 80)) {
    return "Please provide a valid starting city.";
  }
  if (body.routeDestinations !== undefined &&
      (!Array.isArray(body.routeDestinations) || body.routeDestinations.length > 10 ||
        body.routeDestinations.some((city) => typeof city !== "string" || city.length > 80))) {
    return "Please provide a valid ordered list of destinations.";
  }
  if (body.customCities !== undefined &&
      (!Array.isArray(body.customCities) || body.customCities.length > 10 ||
        body.customCities.some((city) => typeof city !== "string" || city.length > 80))) {
    return "Please provide a valid list of custom destinations.";
  }
  if (body.customCityHotelStays !== undefined && !Array.isArray(body.customCityHotelStays)) {
    return "Please provide valid hotel stays for Kashmir.";
  }
  if (
    body.itinerary !== undefined &&
    (!Array.isArray(body.itinerary.days) ||
      body.itinerary.days.length > 20 ||
      JSON.stringify(body.itinerary).length > 100_000)
  ) {
    return "Please provide a valid itinerary with no more than 20 days.";
  }
  if (body.travelMode === "air") {
    try {
      getAirQuotationDestinations(body, getRouteById(body.routeId));
    } catch (error) {
      if (error instanceof AirDestinationValidationError) return error.message;
      throw error;
    }
  }
  const nights = [
    ...Object.values(body.multiCityNights || {}),
    ...(body.singleCityHotelStays || []).map((stay) => stay.nights),
    ...(body.customCityHotelStays || []).map((stay) => stay.nights),
  ];
  if (nights.some((value) => !Number.isInteger(value) || value < 0 || value > 60)) {
    return "Hotel nights must be whole numbers between 0 and 60.";
  }
  const roomCapacityError = getRoomOccupancyError(body.adults + body.kids, body.numberOfRooms);
  if (roomCapacityError) return roomCapacityError;

  const month = Number(body.tripDate.slice(5, 7)) || 5;
  const unavailablePackageRide = body.jeepAddons?.find((addon) =>
    packageJeepRideOptions.some((ride) => ride.id === addon.id) &&
    !isPackageJeepRideAvailable(addon.id, month),
  );
  if (unavailablePackageRide) {
    return "Kashmir jeep rides are available only from May through October.";
  }

  if (body.customCities?.includes("Malam Jabba")) {
    const singleCityNights = (body.singleCityHotelStays || [])
      .reduce((total, stay) => total + stay.nights, 0);
    const malamJabbaNights = body.singleCityHotelStays?.length
      ? singleCityNights
      : body.multiCityNights?.["Malam Jabba"] ?? 0;
    if (malamJabbaNights < 1) {
      return "Malam Jabba requires at least one night.";
    }

    const multiCitySelection = body.multiCityHotels?.["Malam Jabba"];
    if (
      multiCitySelection &&
      !isMalamJabbaHotelSelection(multiCitySelection.hotelId, multiCitySelection.roomId)
    ) {
      return "Choose a hotel and room in Bahrain or Fizaghat for Malam Jabba.";
    }
    if (
      body.singleCityHotelStays?.some(
        (stay) => !isMalamJabbaHotelSelection(stay.hotelId, stay.roomId),
      )
    ) {
      return "Choose a hotel and room in Bahrain or Fizaghat for Malam Jabba.";
    }
    if (
      body.hotelId &&
      body.roomId &&
      !isMalamJabbaHotelSelection(body.hotelId, body.roomId)
    ) {
      return "Choose a hotel and room in Bahrain or Fizaghat for Malam Jabba.";
    }
  }

  if (body.customCityHotelStays !== undefined) {
    const validKashmirStays = body.customCityHotelStays.every((stay, index) => {
      if (
        stay.city !== "Kashmir" ||
        stay.nights !== 1 ||
        !getKashmirStayLocations(index + 1, month).includes(stay.location)
      ) {
        return false;
      }
      const hotel = getHotelById(stay.hotelId);
      return hotel?.location === stay.location && hotel.rooms.some((room) => room.name === stay.roomId);
    });
    if (!validKashmirStays) {
      return "Choose an available Kashmir hotel and room for each night. The first night must be in Keran or Neelum, and Taobat is available June through October.";
    }
  }
  if (body.jeepAddons?.some((addon) => !Number.isInteger(addon.quantity) || addon.quantity < 0 || addon.quantity > 20)) {
    return "Jeep add-on quantities must be whole numbers between 0 and 20.";
  }

  const missing = getMissingFields(body);
  if (missing.length > 0) {
    return `Missing required field(s): ${missing.join(", ")}`;
  }

  const isCustomItinerary = Boolean(body.customCities && body.customCities.length > 0);
  const isSingleCityMultiStay = Boolean(body.singleCityHotelStays && body.singleCityHotelStays.length > 0);
  if (!isCustomItinerary) {
    const route = getRouteById(body.routeId);
    if (!route) {
      return `Invalid route selected: ${body.routeId}`;
    }
  }

  const isMultiCity = Boolean(body.multiCityHotels && body.multiCityNights);
  if (isCustomItinerary) {
    if (!body.customCities || body.customCities.length === 0) {
      return "Please select at least one city for your custom package.";
    }

    if (isSingleCityMultiStay) {
      const missingStaySelections = (body.singleCityHotelStays || [])
        .filter((stay) => stay.nights > 0)
        .filter((stay) => !stay.hotelId || !stay.roomId);

      if (missingStaySelections.length > 0) {
        return "Please select hotel and room for each hotel stay in the single-city package.";
      }
    } else if (!body.multiCityHotels || !body.multiCityNights) {
      return "Custom package requires hotel and night selections.";
    } else {
      const missingCitySelections = body.customCities
        .filter((city) => (body.multiCityNights?.[city] ?? 0) > 0 && city !== "Kashmir")
        .filter((city) => {
          const selection = body.multiCityHotels?.[city];
          return !selection?.hotelId || !selection?.roomId;
        });
      const requiredKashmirNights = body.multiCityNights.Kashmir ?? 0;
      const selectedKashmirNights = (body.customCityHotelStays || [])
        .filter((stay) => stay.city === "Kashmir")
        .reduce((total, stay) => total + stay.nights, 0);

      if (
        missingCitySelections.length > 0 ||
        (requiredKashmirNights > 0 && selectedKashmirNights !== requiredKashmirNights)
      ) {
        if (requiredKashmirNights > 0 && selectedKashmirNights !== requiredKashmirNights) {
          return "Please select a hotel and room for each Kashmir night.";
        }
        return `Please select hotel and room for: ${missingCitySelections.join(", ")}`;
      }
    }
  } else if (isMultiCity) {
    if (!body.multiCityHotels || !body.multiCityNights) {
      return "Multi-city tour requires hotel and night selections.";
    }

    // Ensure required cities have at least one hotel/room selected
    const missingCitySelections = Object.entries(body.multiCityNights)
      .filter(([, nights]) => nights > 0)
      .map(([city]) => city)
      .filter((city) => {
        const selection = body.multiCityHotels?.[city];
        return !selection?.hotelId || !selection?.roomId;
      });

    if (missingCitySelections.length > 0) {
      return `Please select hotel and room for: ${missingCitySelections.join(", ")}`;
    }
  } else if (isSingleCityMultiStay) {
    const missingStaySelections = (body.singleCityHotelStays || [])
      .filter((stay) => stay.nights > 0)
      .filter((stay) => !stay.hotelId || !stay.roomId);

    if (missingStaySelections.length > 0) {
      return "Please select hotel and room for each hotel stay in the single-city package.";
    }
  } else {
    if (!body.hotelId || !body.roomId) {
      return "Please select both hotel and room for the tour.";
    }
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as QuoteRequestBody;
    const validationError = buildValidationError(body);
    if (validationError) {
      return NextResponse.json(
        { error: validationError, details: validationError },
        { status: 400 }
      );
    }

    const route = getRouteById(body.routeId);
    const isCustomItinerary = !route && Boolean(body.customCities && body.customCities.length > 0);
    if (isCustomItinerary || body.travelMode === "air") {
      const identifier = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "unknown";
      if (!allowRouteCalculation(identifier)) {
        return NextResponse.json(
          { error: "Too many route requests. Please wait a minute and try again." },
          { status: 429, headers: { "Retry-After": "60" } },
        );
      }
    }

    // Normalize vehicle name (accept aliases from frontend)
    const canonicalVehicle = getVehicleRate(body.vehicleName)?.name || body.vehicleName;

    // Calculate quotation (now async)
    const quotationInput: QuotationInput = {
      routeId: body.routeId,
      vehicleName: canonicalVehicle,
      hotelId: body.hotelId,
      roomId: body.roomId,
      singleCityHotelStays: body.singleCityHotelStays,
      customCityHotelStays: body.customCityHotelStays,
      multiCityHotels: body.multiCityHotels,
      multiCityNights: body.multiCityNights,
      customCities: body.customCities,
      customRouteLabel: body.customRouteLabel,
      travelMode: body.travelMode,
      startingPoint: body.startingPoint,
      routeDestinations: body.routeDestinations,
      numberOfRooms: body.numberOfRooms,
      adults: body.adults,
      kids: body.kids || 0,
      tripDate: body.tripDate,
      jeepAddons: body.jeepAddons,
      jeepCount: Math.ceil((body.adults + (body.kids || 0)) / 6) || 1,
    };
    const transportOptions = await getCustomItineraryTransportOptions(quotationInput);
    let quotation = await calculateQuotation(quotationInput, transportOptions);

    if (!quotation) {
      return NextResponse.json(
        { error: "Unable to calculate quotation. Please check your selections." },
        { status: 400 }
      );
    }

    const appliedPromotion = body.promoCode?.trim()
      ? validatePromoCode(body.promoCode, body.routeId, quotation.totalCost)
      : undefined;
    if (appliedPromotion && !appliedPromotion.valid) {
      return NextResponse.json({ error: appliedPromotion.error }, { status: 400 });
    }
    if (appliedPromotion?.valid) {
      quotation = applyPromotionToQuotation(quotation, appliedPromotion, body.adults + (body.kids || 0));

      const phone = normalizePromotionPhone(body.customerPhone);
      if (!phone) {
        return NextResponse.json(
          { error: "Enter a valid phone number to use this promo code." },
          { status: 400 },
        );
      }

      try {
        await createPromotionRedemption(phone, appliedPromotion.code, body.routeId);
      } catch (error) {
        if (isPromotionRedemptionConflict(error)) {
          return NextResponse.json(
            { error: "This phone number has already used a promo code." },
            { status: 409 },
          );
        }
        throw error;
      }
    }

    // Get route and hotel names for the sheet
    const isMultiCity = Boolean(body.multiCityHotels && body.multiCityNights);
    const isSingleCityMultiStay = Boolean(body.singleCityHotelStays && body.singleCityHotelStays.length > 0);
    const itineraryCities = body.travelMode === "air"
      ? body.routeDestinations?.length
        ? body.routeDestinations
        : body.customCities?.length
          ? body.customCities
          : route
            ? [route.city]
            : []
      : body.customCities ?? (route ? [route.city] : []);
    const routeItinerary = body.travelMode === "air"
      ? buildAirRoadStops(itineraryCities)
        .map((stop, index, stops) =>
          (index === 0 || index === stops.length - 1) && stop === "Skardu" ? "Skardu Airport" : stop,
        )
        .join(" -> ")
      : isCustomItinerary || isMultiCity
        ? itineraryCities.join(" -> ")
        : route?.itinerary || "";
    let hotelName = "";
    let roomType = "";

    if ((isMultiCity || isCustomItinerary) && body.multiCityHotels) {
      // Build hotel list for multi-city tours
      const cityOrder = isCustomItinerary ? body.customCities || [] : Object.keys(body.multiCityHotels);
      const hotelNames = cityOrder
        .map((city) => {
          if ((body.multiCityNights?.[city] ?? 0) <= 0) return null;
          const info = body.multiCityHotels?.[city];
          if (!info) return null;
          const hotel = getHotelById(info.hotelId);
          const stayLabel = hotel && hotel.city !== city && !city.startsWith(`${hotel.city} (`)
            ? `${hotel.city} stay for ${city}`
            : city;
          return `${stayLabel}: ${hotel?.name || info.hotelId}`;
        })
        .filter(Boolean)
        .join(" | ");
      const kashmirHotelNames = (body.customCityHotelStays || [])
        .map((stay, index) => {
          const hotel = getHotelById(stay.hotelId);
          return hotel
            ? `Kashmir night ${index + 1} · ${stay.location}: ${hotel.name} (${stay.roomId})`
            : null;
        })
        .filter(Boolean)
        .join(" | ");
      hotelName = [hotelNames, kashmirHotelNames].filter(Boolean).join(" | ");
      roomType = "Multiple";
    } else if (isSingleCityMultiStay && body.singleCityHotelStays) {
      const stayNames = body.singleCityHotelStays
        .map((stay) => {
          const hotel = getHotelById(stay.hotelId);
          return hotel ? `${hotel.name} (${stay.nights} nights)` : null;
        })
        .filter(Boolean)
        .join(" | ");
      hotelName = stayNames;
      roomType = "Multiple";
    } else if (body.hotelId) {
      // Single-city tour
      const hotel = getHotelById(body.hotelId);
      hotelName = hotel?.name || body.hotelId;
      roomType = body.roomId || "";
    }

    // Save quotation to Google Sheet
    const sheetSaveResult = await saveQuotationToSheet({
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      startingPoint: body.startingPoint,
      tripDate: body.tripDate,
      routeId: isCustomItinerary ? "custom-itinerary" : body.routeId,
      route: isCustomItinerary ? body.customRouteLabel || body.customCities?.join(" + ") || "Custom Package" : route?.name || body.routeId,
      destination: isCustomItinerary ? body.customRouteLabel || body.customCities?.join(" + ") || "Custom Package" : route?.name?.split("&")[0]?.trim() || "",
      destinationCity: isCustomItinerary ? "Custom" : route?.city || "",
      routeDurationDays: isCustomItinerary
        ? Math.max(1, Object.values(body.multiCityNights || {}).reduce((sum, nights) => sum + nights, 0))
        : route?.duration || 0,
      routeDirection: isCustomItinerary ? "Custom itinerary" : route?.direction || "",
      routeItinerary,
      vehicle: body.vehicleName,
      hotel: hotelName,
      hotelCategory: body.hotelCategory || "",
      roomType: roomType,
      numberOfRooms: body.numberOfRooms,
      adults: body.adults,
      kids: body.kids || 0,
      kidsAges: body.kidsAges || [],
      tourType: body.tourType,
      travelMode: body.travelMode || "road",
      isMultiCity: isMultiCity || isCustomItinerary,
      multiCityHotels: body.multiCityHotels,
      multiCityNights: body.multiCityNights,
      singleCityHotelStays: body.singleCityHotelStays,
      customCityHotelStays: body.customCityHotelStays,
      itinerary: body.itinerary,
      transportCost: quotation.transportCost,
      hotelCost: quotation.hotelCost,
      jeepAddonsCost: quotation.jeepAddonsCost,
      subtotal: quotation.subtotal,
      markupAmount: quotation.markupAmount,
      totalCost: quotation.totalCost,
      perPersonCost: quotation.perPersonCost,
      promoCode: quotation.promotion?.code,
      discountPercent: quotation.promotion?.discountPercent,
      discountAmount: quotation.promotion?.discountAmount,
      originalTotalCost: quotation.promotion?.originalPrice,
    });

    if (!sheetSaveResult.success) {
      console.warn("Unable to save lead in Google Sheets.", sheetSaveResult.error);
      // Continue even if sheet save fails, so quote requests still work.
      // This is especially important when production env vars are not configured.
    }

    // TODO: Save lead to database (once Prisma is set up)
    // const lead = await db.lead.create({
    //   data: {
    //     name: body.customerName,
    //     phone: body.customerPhone,
    //     route: quotation.details.route,
    //     vehicle: quotation.details.vehicle,
    //     hotel: quotation.details.hotel,
    //     rooms: body.numberOfRooms,
    //     jeep_addons: body.jeepAddons ? JSON.stringify(body.jeepAddons) : null,
    //     total_price: quotation.totalCost,
    //   },
    // });

    // Send WhatsApp notification
    const whatsappResult = await sendWhatsAppNotification({
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      quotation,
      promotion: quotation.promotion,
      travelMode: body.travelMode,
    });

    // Fallback: log if WhatsApp not configured
    if (!whatsappResult.success) {
      logQuotationNotification({
        customerName: body.customerName,
        customerPhone: body.customerPhone,
        quotation,
        promotion: quotation.promotion,
        travelMode: body.travelMode,
      });
    }

    const customerQuotation = { ...quotation };
    delete customerQuotation.transportBreakdown;
    return NextResponse.json({
      success: true,
      quotation: customerQuotation,
      message: "Quotation calculated successfully. Our team will contact you soon.",
    });
  } catch (error) {
    console.error("Quote calculation error:", error);
    if (error instanceof AirDestinationValidationError) {
      return NextResponse.json({ error: error.message, details: error.message }, { status: 400 });
    }
    if (error instanceof RouteCalculationError) {
      return NextResponse.json(
        { error: error.message, details: error.message, code: error.code },
        { status: error.status },
      );
    }
    return NextResponse.json(
      {
        error: "Internal server error",
        details: "Please try again or contact Hodophile support.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: "Use POST method to calculate quotation",
      endpoint: "/api/quote",
      method: "POST",
    },
    { status: 405 }
  );
}
