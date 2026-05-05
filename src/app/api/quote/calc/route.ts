import { NextRequest, NextResponse } from "next/server";
import { calculateQuotation, type QuotationInput } from "@/lib/pricingEngine";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as QuotationInput;

    if (!body.routeId || !body.vehicleName || !body.numberOfRooms || !body.adults || !body.tripDate) {
      return NextResponse.json(
        { error: "Missing required quotation fields" },
        { status: 400 }
      );
    }

    const quotation = await calculateQuotation(body);
    if (!quotation) {
      return NextResponse.json(
        { error: "Unable to calculate quotation" },
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
