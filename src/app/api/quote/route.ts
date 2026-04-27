import { NextRequest, NextResponse } from "next/server";
import { calculateQuotation, type QuotationInput } from "@/lib/pricingEngine";
import { sendWhatsAppNotification, logQuotationNotification } from "@/lib/whatsapp";

interface QuoteRequestBody extends QuotationInput {
  customerName: string;
  customerPhone: string;
  tourType: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as QuoteRequestBody;

    // Validate required fields
    const required = [
      "customerName",
      "customerPhone",
      "routeId",
      "vehicleName",
      "hotelId",
      "roomId",
      "numberOfRooms",
      "adults",
      "tripDate",
    ];

    for (const field of required) {
      if (!body[field as keyof QuoteRequestBody]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Calculate quotation
    const quotation = calculateQuotation({
      routeId: body.routeId,
      vehicleName: body.vehicleName,
      hotelId: body.hotelId,
      roomId: body.roomId,
      numberOfRooms: body.numberOfRooms,
      adults: body.adults,
      kids: body.kids || 0,
      tripDate: body.tripDate,
      jeepAddons: body.jeepAddons,
    });

    if (!quotation) {
      return NextResponse.json(
        { error: "Unable to calculate quotation. Please check your selections." },
        { status: 400 }
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
