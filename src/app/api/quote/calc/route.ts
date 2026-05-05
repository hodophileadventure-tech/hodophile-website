import { NextRequest, NextResponse } from "next/server";
import { calculateQuotation, type QuotationInput } from "@/lib/pricingEngine";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as QuotationInput;

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

    const quotation = await calculateQuotation(body);
    if (!quotation) {
      return NextResponse.json(
        {
          error: "Unable to calculate quotation.",
          details: "Please verify your hotel and route selections.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, quotation });
  } catch (error) {
    console.error("Quotation calc error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
