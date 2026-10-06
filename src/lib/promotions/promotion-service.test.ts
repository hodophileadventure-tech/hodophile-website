import assert from "node:assert/strict";
import test from "node:test";

import { applyPromotionToQuotation, validatePromoCode } from "./promotion-service";

const codeTourPairs = [
  ["HODOSB10", "skardu-basho-6days"],
  ["HODOHS10", "skardu-hunza-8days"],
  ["HODOSK10", "skardu-khaplu-deosai-basho-air-7-days"],
] as const;
const packagePromoPairs = [
  ["HODOSB10", "skardu-deosai-basho-air-5-days"],
  ["HODOHS10", "skardu-hunza-air-7-days"],
  ["HODOSK10", "skardu-khaplu-deosai-basho-air-7-days"],
] as const;

test("each tour-specific code grants 10% on its own canonical tour", () => {
  for (const [code, tourId] of codeTourPairs) {
    const result = validatePromoCode(code, tourId, 100_000);
    assert.equal(result.valid, true);
    if (!result.valid) continue;
    assert.equal(result.code, code);
    assert.equal(result.discountPercent, 10);
    assert.equal(result.discountAmount, 10_000);
    assert.equal(result.finalPrice, 90_000);
  }
});

test("tour-specific codes reject other eligible tours", () => {
  for (const [code, tourId] of codeTourPairs) {
    for (const [, otherTourId] of codeTourPairs) {
      if (tourId === otherTourId) continue;
      assert.deepEqual(validatePromoCode(code, otherTourId, 100_000), {
        valid: false,
        error: "This promo code is not valid for this tour.",
      });
    }
  }
});

test("each code also applies to its matching dedicated package page", () => {
  for (const [code, packageId] of packagePromoPairs) {
    const result = validatePromoCode(code, packageId, 100_000);
    assert.equal(result.valid, true);
    if (!result.valid) continue;
    assert.equal(result.code, code);
    assert.equal(result.discountPercent, 10);
  }
});

test("invalid codes do not grant a discount", () => {
  assert.deepEqual(validatePromoCode("BASHO20", codeTourPairs[0][1], 100_000), {
    valid: false,
    error: "Invalid or expired promo code.",
  });
});

test("promo codes are case-insensitive and trim whitespace", () => {
  for (const code of ["hodosb10", " HODOSB10 "]) {
    const result = validatePromoCode(code, codeTourPairs[0][1], 75_000);
    assert.equal(result.valid, true);
    if (!result.valid) continue;
    assert.equal(result.code, "HODOSB10");
    assert.equal(result.discountAmount, 7_500);
    assert.equal(result.finalPrice, 67_500);
  }
});

test("discount uses whole-PKR rounding and updates only the quotation total", () => {
  const validation = validatePromoCode("HODOSB10", codeTourPairs[0][1], 75_001);
  assert.equal(validation.valid, true);
  if (!validation.valid) return;

  const quotation = applyPromotionToQuotation({
    transportCost: 20_000,
    hotelCost: 30_000,
    jeepAddonsCost: 5_000,
    subtotal: 55_000,
    markupAmount: 20_001,
    totalCost: 75_001,
    perPersonCost: 37_501,
    details: {
      route: "Skardu & Basho",
      vehicle: "Toyota Corolla",
      hotel: "Test hotel",
      roomType: "Standard",
      numberOfRooms: 1,
      numberOfGuests: 2,
      jeepAddonsDetails: [],
    },
  }, validation, 2);

  assert.equal(validation.discountAmount, 7_500);
  assert.equal(quotation.totalCost, 67_501);
  assert.equal(quotation.perPersonCost, 33_751);
  assert.equal(quotation.promotion?.discountPercent, 10);
});

test("client-supplied invalid prices cannot produce a promotion result", () => {
  for (const invalidPrice of [-1, 1.5, Number.NaN, Number.POSITIVE_INFINITY]) {
    assert.equal(validatePromoCode("HODOSB10", codeTourPairs[0][1], invalidPrice).valid, false);
  }
});
