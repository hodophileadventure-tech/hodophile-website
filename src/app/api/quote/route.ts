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

  const route = getRouteById(body.routeId);
  if (!route) {
    return `Invalid route selected: ${body.routeId}`;
  }

  const isMultiCity = Boolean(body.multiCityHotels && body.multiCityNights);
  if (isMultiCity) {
    if (!body.multiCityHotels || !body.multiCityNights) {
      return "Multi-city tour requires hotel and night selections.";
    }

    // Ensure required cities have at least one hotel/room selected
    const missingCitySelections = Object.entries(body.multiCityNights)
      .filter(([, nights]) => nights > 0)
      .map(([city, nights]) => ({ city, nights }))
      .filter(({ city }) => {
        const selection = body.multiCityHotels?.[city];
        return !selection?.hotelId || !selection?.roomId;
      })
      .map(({ city }) => city);

    if (missingCitySelections.length > 0) {
      return `Please select hotel and room for: ${missingCitySelections.join(", ")}`;
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
      multiCityHotels: body.multiCityHotels,
      multiCityNights: body.multiCityNights,
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
    const route = getRouteById(body.routeId);
    const isMultiCity = Boolean(body.multiCityHotels && body.multiCityNights);
    let hotelName = "";
    let roomType = "";

    if (isMultiCity && body.multiCityHotels) {
      // Build hotel list for multi-city tours
      const hotelNames = Object.entries(body.multiCityHotels)
        .map(([city, info]) => {
          const hotel = getHotelById(info.hotelId);
          return `${city}: ${hotel?.name || info.hotelId}`;
        })
        .join(" | ");
      hotelName = hotelNames;
      roomType = "Multiple";
    } else if (body.hotelId) {
      // Single-city tour
      const hotel = getHotelById(body.hotelId);
      hotelName = hotel?.name || body.hotelId;
      roomType = body.roomId || "";
    }

    // Save quotation to Google Sheet
    await saveQuotationToSheet({
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      startingPoint: body.startingPoint,
      tripDate: body.tripDate,
      route: route?.name || body.routeId,
      destination: route?.name?.split("&")[0]?.trim() || "",
      vehicle: body.vehicleName,
      hotel: hotelName,
      roomType: roomType,
      numberOfRooms: body.numberOfRooms,
      adults: body.adults,
      kids: body.kids || 0,
      tourType: body.tourType,
      transportCost: quotation.transportCost,
      hotelCost: quotation.hotelCost,
      jeepAddonsCost: quotation.jeepAddonsCost,
      subtotal: quotation.subtotal,
      markupAmount: quotation.markupAmount,
      totalCost: quotation.totalCost,
      perPersonCost: quotation.perPersonCost,
    });

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
