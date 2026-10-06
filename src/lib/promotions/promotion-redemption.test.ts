import assert from "node:assert/strict";
import test from "node:test";

import { isPromotionRedemptionConflict } from "./promotion-redemption";
import { normalizePromotionPhone } from "./promotion-phone";

test("normalizes local and international phone formats to one identifier", () => {
  assert.equal(normalizePromotionPhone("0300 1234567"), "+923001234567");
  assert.equal(normalizePromotionPhone("+92 300-1234567"), "+923001234567");
  assert.equal(normalizePromotionPhone("0092 (300) 1234567"), "+923001234567");
});

test("rejects phone numbers that cannot be used as a stable redemption identity", () => {
  for (const phone of ["", "12345", "not a phone", "+123", "0300 123456"]) {
    assert.equal(normalizePromotionPhone(phone), null);
  }
});

test("recognizes duplicate-key errors from the unique phone redemption id", () => {
  assert.equal(isPromotionRedemptionConflict({ code: "P2002" }), true);
  assert.equal(isPromotionRedemptionConflict({ code: "P2025" }), false);
  assert.equal(isPromotionRedemptionConflict(null), false);
});
