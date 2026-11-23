import { NextRequest, NextResponse } from "next/server";
import { calculateQuotation, type QuotationInput } from "@/lib/pricingEngine";
import { getCustomItineraryTransportOptions } from "@/lib/transport/quotation";
import { allowRouteCalculation } from "@/lib/transport/rate-limit";
import { applyPromotionToQuotation, validatePromoCode } from "@/lib/promotions/promotion-service";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as QuotationInput & { promoCode?: unknown };
    if (body.includeIslamabadTransit !== undefined && typeof body.includeIslamabadTransit !== "boolean") {
      return NextResponse.json({ error: "Please provide a valid Islamabad transit selection." }, { status: 400 });
    }
    if (body.routeId === "custom-itinerary" && body.travelMode !== "air") {
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
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
