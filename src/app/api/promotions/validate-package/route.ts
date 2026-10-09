import { NextRequest, NextResponse } from "next/server";

import { getTourPackageById } from "@/lib/data/tour-packages";
import { findPromotionRedemption } from "@/lib/promotions/promotion-redemption";
import { normalizePromotionPhone } from "@/lib/promotions/promotion-phone";
import { validatePromoCode } from "@/lib/promotions/promotion-service";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ valid: false, error: "Invalid promo request." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return NextResponse.json({ valid: false, error: "Enter a promo code and select a tour." }, { status: 400 });
  }

  const values = body as { tourId?: unknown; promoCode?: unknown; phone?: unknown };
  if (typeof values.tourId !== "string" || typeof values.promoCode !== "string") {
    return NextResponse.json({ valid: false, error: "Enter a promo code and select a tour." }, { status: 400 });
  }

  const tourPackage = getTourPackageById(values.tourId);
  if (!tourPackage) {
    return NextResponse.json({ valid: false, error: "This promo code is not valid for this tour." });
  }

  if (tourPackage.priceOnRequest) {
    return NextResponse.json({ valid: false, error: "Promotions are unavailable until this tour's price is confirmed." });
  }

  const promotion = validatePromoCode(values.promoCode, tourPackage.id, tourPackage.pricePerPerson);
  if (!promotion.valid) {
    return NextResponse.json(promotion);
  }

  if (typeof values.phone === "string") {
    const phone = normalizePromotionPhone(values.phone);
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

  return NextResponse.json(promotion);
}