import { NextRequest, NextResponse } from "next/server";
import { calculateQuotation, type QuotationInput } from "@/lib/pricingEngine";
import { getCustomItineraryTransportOptions } from "@/lib/transport/quotation";
import { allowRouteCalculation } from "@/lib/transport/rate-limit";
import { applyPromotionToQuotation, validatePromoCode } from "@/lib/promotions/promotion-service";
import { getRouteById } from "@/lib/data/routes";
import { AirDestinationValidationError, getAirQuotationDestinations } from "@/lib/transport/air-routing";
import { RouteCalculationError } from "@/lib/transport/route-service";
import {
  getHotelById,
  getRoomOccupancyError,
  isMalamJabbaHotelSelection,
} from "@/lib/data/hotels";
import { getKashmirStayLocations } from "@/lib/data/custom-city-stays";
import { isPackageJeepRideAvailable, packageJeepRideOptions } from "@/lib/data/jeeps";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as QuotationInput & { promoCode?: unknown };
    if (body.includeIslamabadTransit !== undefined && typeof body.includeIslamabadTransit !== "boolean") {
      return NextResponse.json({ error: "Please provide a valid Islamabad transit selection." }, { status: 400 });
    }
    if (body.travelMode !== undefined && body.travelMode !== "road" && body.travelMode !== "air") {
      return NextResponse.json({ error: "Please select a valid travel mode." }, { status: 400 });
    }
    if (body.routeDestinations !== undefined &&
        (!Array.isArray(body.routeDestinations) || body.routeDestinations.length > 10 ||
          body.routeDestinations.some((city) => typeof city !== "string" || city.length > 80))) {
      return NextResponse.json({ error: "Please provide a valid ordered list of destinations." }, { status: 400 });
    }
    if (body.customCities !== undefined &&
        (!Array.isArray(body.customCities) || body.customCities.length > 10 ||
          body.customCities.some((city) => typeof city !== "string" || city.length > 80))) {
      return NextResponse.json({ error: "Please provide a valid list of custom destinations." }, { status: 400 });
    }
    if (
      !Number.isInteger(body.numberOfRooms) ||
      body.numberOfRooms < 1 ||
      !Number.isInteger(body.adults) ||
      body.adults < 1 ||
      !Number.isInteger(body.kids) ||
      body.kids < 0
    ) {
      return NextResponse.json(
        { error: "Please provide valid traveler and room counts." },
        { status: 400 },
      );
    }
    const roomCapacityError = getRoomOccupancyError(
      body.adults + body.kids,
      body.numberOfRooms,
    );
    if (roomCapacityError) {
      return NextResponse.json({ error: roomCapacityError }, { status: 400 });
    }

    const month = Number(body.tripDate?.slice(5, 7)) || 5;
    const unavailablePackageRide = body.jeepAddons?.find((addon) =>
      packageJeepRideOptions.some((ride) => ride.id === addon.id) &&
      !isPackageJeepRideAvailable(addon.id, month),
    );
    if (unavailablePackageRide) {
      return NextResponse.json(
        { error: "Kashmir jeep rides are available only from May through October." },
        { status: 400 },
      );
    }

    if (body.customCities?.includes("Malam Jabba")) {
      const singleCityNights = (body.singleCityHotelStays || [])
        .reduce((total, stay) => total + stay.nights, 0);
      const malamJabbaNights = body.singleCityHotelStays?.length
        ? singleCityNights
        : body.multiCityNights?.["Malam Jabba"] ?? 0;
      if (malamJabbaNights < 1) {
        return NextResponse.json(
          { error: "Malam Jabba requires at least one night." },
          { status: 400 },
        );
      }

      const multiCitySelection = body.multiCityHotels?.["Malam Jabba"];
      if (
        (multiCitySelection &&
          !isMalamJabbaHotelSelection(multiCitySelection.hotelId, multiCitySelection.roomId)) ||
        body.singleCityHotelStays?.some(
          (stay) => !isMalamJabbaHotelSelection(stay.hotelId, stay.roomId),
        ) ||
        (body.hotelId &&
          body.roomId &&
          !isMalamJabbaHotelSelection(body.hotelId, body.roomId))
      ) {
        return NextResponse.json(
          { error: "Choose a hotel and room in Bahrain or Fizaghat for Malam Jabba." },
          { status: 400 },
        );
      }
    }
    if (body.customCityHotelStays !== undefined) {
      if (!Array.isArray(body.customCityHotelStays)) {
        return NextResponse.json({ error: "Please provide valid hotel stays for Kashmir." }, { status: 400 });
      }
      const validKashmirStays = body.customCityHotelStays.every((stay, index) => {
        if (
          !stay ||
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
        return NextResponse.json(
          { error: "Choose an available Kashmir hotel and room for each night. Taobat is available June through October." },
          { status: 400 },
        );
      }
      const requiredKashmirNights = body.customCities?.includes("Kashmir")
        ? body.multiCityNights?.Kashmir ?? 0
        : 0;
      if (body.customCityHotelStays.length !== requiredKashmirNights) {
        return NextResponse.json(
          { error: "Please select a hotel and room for each Kashmir night." },
          { status: 400 },
        );
      }
    }
    if (body.travelMode === "air") {
      try {
        getAirQuotationDestinations(
          body,
          typeof body.routeId === "string" ? getRouteById(body.routeId) : undefined,
        );
      } catch (error) {
        if (error instanceof AirDestinationValidationError) {
          return NextResponse.json({ error: error.message }, { status: 400 });
        }
        throw error;
      }
    }
    if (body.routeId === "custom-itinerary" || body.travelMode === "air") {
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

    const missingFields = [
      !body.routeId && "routeId",
      !body.vehicleName && "vehicleName",
      !body.numberOfRooms && "numberOfRooms",
      !body.adults && "adults",
      !body.tripDate && "tripDate",
    ].filter(Boolean);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: `Missing required fields: ${missingFields.join(", ")}`,
          details: "Live quotation preview requires route, vehicle, guests, and trip date.",
        },
        { status: 400 }
      );
    }

    const { promoCode, ...quotationInput } = body;
    const transportOptions = await getCustomItineraryTransportOptions(quotationInput);
    let quotation = await calculateQuotation(quotationInput, transportOptions);
    if (!quotation) {
      return NextResponse.json(
        {
          error: "Unable to calculate quotation.",
          details: "Please verify your hotel and route selections.",
        },
        { status: 400 }
      );
    }

    if (typeof promoCode === "string" && promoCode.trim()) {
      const promotion = validatePromoCode(promoCode, quotationInput.routeId, quotation.totalCost);
      if (!promotion.valid) {
        return NextResponse.json(promotion, { status: 400 });
      }
      quotation = applyPromotionToQuotation(quotation, promotion, quotationInput.adults + quotationInput.kids);
    }

    const customerQuotation = { ...quotation };
    delete customerQuotation.transportBreakdown;
    return NextResponse.json({ success: true, quotation: customerQuotation });
  } catch (error) {
    console.error("Quotation calc error:", error);
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
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
