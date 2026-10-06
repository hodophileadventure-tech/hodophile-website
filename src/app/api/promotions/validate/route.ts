import { NextRequest, NextResponse } from "next/server";

import { getTourPackageById } from "@/lib/data/tour-packages";
import { getRouteById } from "@/lib/data/routes";
import { calculateQuotation, type QuotationInput } from "@/lib/pricingEngine";
import { findPromotionRedemption } from "@/lib/promotions/promotion-redemption";
import { normalizePromotionPhone } from "@/lib/promotions/promotion-phone";
import { validatePromoCode } from "@/lib/promotions/promotion-service";
import type { PromoValidationResult } from "@/lib/promotions/promotion-types";

type PromoValidationBody = {
  tourId: string;
  promoCode: string;
  quotationInput?: QuotationInput;
  phone?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isPromoValidationBody(value: unknown): value is PromoValidationBody {
  return (
    isRecord(value) &&
    typeof value.tourId === "string" &&
    typeof value.promoCode === "string" &&
    (value.phone === undefined || typeof value.phone === "string")
  );
}

function validateQuotationInput(tourId: string, value: unknown): value is QuotationInput {
  if (!isRecord(value)) return false;
  return (
    value.routeId === tourId &&
    typeof value.vehicleName === "string" &&
    Number.isSafeInteger(value.numberOfRooms) &&
    Number(value.numberOfRooms) >= 1 &&
    Number(value.numberOfRooms) <= 20 &&
    Number.isSafeInteger(value.adults) &&
    Number(value.adults) >= 1 &&
    Number(value.adults) <= 100 &&
    Number.isSafeInteger(value.kids) &&
    Number(value.kids) >= 0 &&
    Number(value.kids) <= 100 &&
    typeof value.tripDate === "string" &&
    !Number.isNaN(Date.parse(value.tripDate))
  );
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ valid: false, error: "Invalid promo request." }, { status: 400 });
  }

  if (!isPromoValidationBody(body)) {
    return NextResponse.json({ valid: false, error: "Enter a promo code and select a tour." }, { status: 400 });
  }

  const eligibility = validatePromoCode(body.promoCode, body.tourId, 1);
  if (!eligibility.valid) {
    return NextResponse.json(eligibility satisfies PromoValidationResult);
  }

  if (body.phone !== undefined) {
    const phone = normalizePromotionPhone(body.phone);
    if (!phone) {
      return NextResponse.json({ valid: false, error: "Enter a valid phone number to check this promo code." }, { status: 400 });
    }

    try {
      const redemption = await findPromotionRedemption(phone);
      if (redemption) {
        return NextResponse.json({ valid: false, error: "This phone number has already used a promo code." });
      }
    } catch (error) {
      console.error("Promo redemption lookup error:", error);
      return NextResponse.json({ valid: false, error: "Unable to check promo eligibility right now." }, { status: 500 });
    }
  }

  const route = getRouteById(body.tourId);
  if (route) {
    const eligibility = validatePromoCode(body.promoCode, body.tourId, 1);
    if (!eligibility.valid) return NextResponse.json(eligibility satisfies PromoValidationResult);

    if (!validateQuotationInput(body.tourId, body.quotationInput)) {
      return NextResponse.json({ valid: false, error: "Complete the tour details before applying this promo code." }, { status: 400 });
    }

    const baseQuotation = await calculateQuotation(body.quotationInput);
    if (!baseQuotation) {
      return NextResponse.json({ valid: false, error: "Unable to validate the current tour price." }, { status: 400 });
    }

    return NextResponse.json(validatePromoCode(body.promoCode, body.tourId, baseQuotation.totalCost));
  }

  const tourPackage = getTourPackageById(body.tourId);
  if (!tourPackage) {
    return NextResponse.json(validatePromoCode(body.promoCode, body.tourId, 0));
  }

  return NextResponse.json(validatePromoCode(body.promoCode, tourPackage.id, tourPackage.pricePerPerson));
}