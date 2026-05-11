import { NextRequest, NextResponse } from "next/server";
import { calculateQuotation, type QuotationInput } from "@/lib/pricingEngine";
import { sendWhatsAppNotification, logQuotationNotification } from "@/lib/whatsapp";
import { saveQuotationToSheet } from "@/lib/googleSheets";
import { getRouteById } from "@/lib/data/routes";
import { getHotelById } from "@/lib/data/hotels";

interface QuoteRequestBody extends QuotationInput {
  customerName: string;
  customerPhone: string;
  startingPoint: string;
  tourType: string;
  kidsAges?: string[];
  hotelCategory?: string;
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
        .filter((city) => (body.multiCityNights?.[city] ?? 0) > 0)
        .filter((city) => {
          const selection = body.multiCityHotels?.[city];
          return !selection?.hotelId || !selection?.roomId;
        });

      if (missingCitySelections.length > 0) {
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

    // Calculate quotation (now async)
    const quotation = await calculateQuotation({
      routeId: body.routeId,
      vehicleName: body.vehicleName,
      hotelId: body.hotelId,
      roomId: body.roomId,
      singleCityHotelStays: body.singleCityHotelStays,
      multiCityHotels: body.multiCityHotels,
      multiCityNights: body.multiCityNights,
      customCities: body.customCities,
      customRouteLabel: body.customRouteLabel,
      travelMode: body.travelMode,
      numberOfRooms: body.numberOfRooms,
      adults: body.adults,
      kids: body.kids || 0,
      tripDate: body.tripDate,
      jeepAddons: body.jeepAddons,
      mandatoryJeepCost: body.mandatoryJeepCost,
    });

    if (!quotation) {
      return NextResponse.json(
        { error: "Unable to calculate quotation. Please check your selections." },
        { status: 400 }
      );
    }

    // Get route and hotel names for the sheet
    const route = body.customCities?.length ? undefined : getRouteById(body.routeId);
    const isMultiCity = Boolean(body.multiCityHotels && body.multiCityNights);
    const isCustomItinerary = Boolean(body.customCities && body.customCities.length > 0);
    const isSingleCityMultiStay = Boolean(body.singleCityHotelStays && body.singleCityHotelStays.length > 0);
    let hotelName = "";
    let roomType = "";

    if ((isMultiCity || isCustomItinerary) && body.multiCityHotels) {
      // Build hotel list for multi-city tours
      const cityOrder = isCustomItinerary ? body.customCities || [] : Object.keys(body.multiCityHotels);
      const hotelNames = cityOrder
        .map((city) => {
          const info = body.multiCityHotels?.[city];
          if (!info) return null;
          const hotel = getHotelById(info.hotelId);
          return `${city}: ${hotel?.name || info.hotelId}`;
        })
        .filter(Boolean)
        .join(" | ");
      hotelName = hotelNames;
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
      routeId: body.customCities?.length ? "custom-itinerary" : body.routeId,
      route: isCustomItinerary ? body.customRouteLabel || body.customCities?.join(" + ") || "Custom Package" : route?.name || body.routeId,
      destination: isCustomItinerary ? body.customRouteLabel || body.customCities?.join(" + ") || "Custom Package" : route?.name?.split("&")[0]?.trim() || "",
      destinationCity: isCustomItinerary ? "Custom" : route?.city || "",
      routeDurationDays: isCustomItinerary ? Object.values(body.multiCityNights || {}).reduce((sum, nights) => sum + nights, 0) : route?.duration || 0,
      routeDirection: isCustomItinerary ? "Custom itinerary" : route?.direction || "",
      routeItinerary: isCustomItinerary ? (body.customCities || []).join(" -> ") : route?.itinerary || "",
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
      transportCost: quotation.transportCost,
      hotelCost: quotation.hotelCost,
      jeepAddonsCost: quotation.jeepAddonsCost,
      subtotal: quotation.subtotal,
      markupAmount: quotation.markupAmount,
      totalCost: quotation.totalCost,
      perPersonCost: quotation.perPersonCost,
    });

    if (!sheetSaveResult.success) {
      return NextResponse.json(
        {
          error: "Unable to save lead in Google Sheets.",
          details: sheetSaveResult.error || "Sheet write failed",
        },
        { status: 502 }
      );
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
    });

    // Fallback: log if WhatsApp not configured
    if (!whatsappResult.success) {
      logQuotationNotification({
        customerName: body.customerName,
        customerPhone: body.customerPhone,
        quotation,
      });
    }

    return NextResponse.json({
      success: true,
      quotation,
      message: "Quotation calculated successfully. Our team will contact you soon.",
    });
  } catch (error) {
    console.error("Quote calculation error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
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
