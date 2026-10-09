import { NextRequest, NextResponse } from "next/server";

import { getTourPackageById } from "@/lib/data/tour-packages";
import {
  createPromotionRedemption,
  isPromotionRedemptionConflict,
} from "@/lib/promotions/promotion-redemption";
import { normalizePromotionPhone } from "@/lib/promotions/promotion-phone";
import { validatePromoCode } from "@/lib/promotions/promotion-service";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid promo request." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return NextResponse.json({ success: false, error: "Enter a promo code, phone number, and tour." }, { status: 400 });
  }

  const values = body as { tourId?: unknown; promoCode?: unknown; phone?: unknown };
  if (
    typeof values.tourId !== "string" ||
    typeof values.promoCode !== "string" ||
    typeof values.phone !== "string"
  ) {
    return NextResponse.json({ success: false, error: "Enter a promo code, phone number, and tour." }, { status: 400 });
  }

  const phone = normalizePromotionPhone(values.phone);
  if (!phone) {
    return NextResponse.json({ success: false, error: "Enter a valid phone number to use this promo code." }, { status: 400 });
  }

  const tourPackage = getTourPackageById(values.tourId);
  if (!tourPackage) {
    return NextResponse.json({ success: false, error: "This promo code is not valid for this tour." }, { status: 400 });
  }

  if (tourPackage.priceOnRequest) {
    return NextResponse.json({ success: false, error: "Promotions are unavailable until this tour's price is confirmed." }, { status: 400 });
  }

  const promotion = validatePromoCode(values.promoCode, tourPackage.id, tourPackage.pricePerPerson);
  if (!promotion.valid) {
    return NextResponse.json({ success: false, error: promotion.error }, { status: 400 });
  }

  try {
    await createPromotionRedemption(phone, promotion.code, tourPackage.id);
    return NextResponse.json({ success: true, promotion });
  } catch (error) {
    if (isPromotionRedemptionConflict(error)) {
      return NextResponse.json(
        { success: false, error: "This phone number has already used a promo code." },
        { status: 409 },
      );
    }

    console.error("Promo redemption creation error:", error);
    return NextResponse.json(
      { success: false, error: "Unable to submit this promo request right now." },
      { status: 500 },
    );
  }
}
