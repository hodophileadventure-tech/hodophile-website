import type { QuotationBreakdown } from "@/lib/pricingEngine";

import { PROMOTIONS } from "./promotion-config";
import type { PromoValidationResult, PromotionSummary } from "./promotion-types";

function normalizePromoCode(code: string) {
  return code.trim().toUpperCase();
}

export function validatePromoCode(
  code: string,
  tourId: string,
  authoritativePrice: number,
  now = new Date(),
): PromoValidationResult {
  const promotion = PROMOTIONS[normalizePromoCode(code) as keyof typeof PROMOTIONS];
  if (!promotion || !promotion.active) {
    return { valid: false, error: "Invalid or expired promo code." };
  }

  if (
    (promotion.startsAt && now < new Date(promotion.startsAt)) ||
    (promotion.endsAt && now > new Date(promotion.endsAt))
  ) {
    return { valid: false, error: "Invalid or expired promo code." };
  }

  if (!promotion.eligibleTourIds.includes(tourId)) {
    return { valid: false, error: "This promo code is not valid for this tour." };
  }

  if (!Number.isSafeInteger(authoritativePrice) || authoritativePrice < 0) {
    return { valid: false, error: "Unable to validate the current tour price." };
  }

  const discountAmount = Math.round((authoritativePrice * promotion.discountPercent) / 100);
  return {
    valid: true,
    code: promotion.code,
    discountPercent: promotion.discountPercent,
    originalPrice: authoritativePrice,
    discountAmount,
    finalPrice: authoritativePrice - discountAmount,
  };
}

export function applyPromotionToQuotation(
  quotation: QuotationBreakdown,
  promotion: PromotionSummary,
  guestCount: number,
): QuotationBreakdown {
  return {
    ...quotation,
    totalCost: promotion.finalPrice,
    perPersonCost: Math.round(promotion.finalPrice / Math.max(1, guestCount)),
    promotion,
  };
}