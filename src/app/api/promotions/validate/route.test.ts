import assert from "node:assert/strict";
import test from "node:test";
import { NextRequest } from "next/server";

import { getHotelsByCity } from "@/lib/data/hotels";
import { POST } from "./route";

const routePromoPairs = [
  ["skardu-basho-6days", "HODOSB10"],
  ["skardu-hunza-8days", "HODOHS10"],
] as const;
const khapluPackageId = "skardu-khaplu-deosai-basho-air-7-days";

function quotationInput(routeId: string) {
  const hotel = getHotelsByCity("Skardu")[0];
  const room = hotel?.rooms[0];
  assert.ok(hotel && room);

  return {
    routeId,
    vehicleName: "Toyota Corolla",
    hotelId: hotel.id,
    roomId: room.name,
    numberOfRooms: 1,
    adults: 2,
    kids: 0,
    tripDate: "2027-06-15",
  };
}

async function postPromo(body: Record<string, unknown>) {
  const request = new NextRequest("http://localhost/api/promotions/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const response = await POST(request);
  return { status: response.status, body: await response.json() as Record<string, unknown> };
}

test("tour-specific codes validate using each route's server-calculated quotation", async () => {
  for (const [tourId, promoCode] of routePromoPairs) {
    const result = await postPromo({ tourId, promoCode, quotationInput: quotationInput(tourId) });
    assert.equal(result.status, 200);
    assert.equal(result.body.valid, true);
    assert.equal(result.body.discountPercent, 10);
    assert.equal(result.body.finalPrice, Number(result.body.originalPrice) - Number(result.body.discountAmount));
  }
});

test("HODOSK10 validates the existing Khaplu package price from server data", async () => {
  const result = await postPromo({ tourId: khapluPackageId, promoCode: "HODOSK10", basePrice: 1 });
  assert.equal(result.status, 200);
  assert.equal(result.body.valid, true);
  assert.equal(result.body.originalPrice, 47_500);
  assert.equal(result.body.discountAmount, 4_750);
  assert.equal(result.body.finalPrice, 42_750);
});

test("client-supplied base price and discount fields are ignored for route quotations", async () => {
  const tourId = routePromoPairs[0][0];
  const result = await postPromo({
    tourId,
    promoCode: "HODOSB10",
    quotationInput: quotationInput(tourId),
    basePrice: 1,
    discountPercent: 100,
    discountAmount: 1_000_000,
    finalPrice: 0,
  });
  assert.equal(result.status, 200);
  assert.equal(result.body.valid, true);
  assert.ok(Number(result.body.originalPrice) > 1);
  assert.equal(result.body.discountPercent, 10);
});

test("promo rejects ineligible routes and mismatched route pricing inputs", async () => {
  const ineligible = await postPromo({ tourId: "swat-kalam-4days", promoCode: "HODOSB10", quotationInput: quotationInput("swat-kalam-4days") });
  assert.equal(ineligible.body.valid, false);
  assert.match(String(ineligible.body.error), /not valid for this tour/i);

  const mismatched = await postPromo({ tourId: routePromoPairs[0][0], promoCode: "HODOSB10", quotationInput: quotationInput(routePromoPairs[1][0]) });
  assert.equal(mismatched.status, 400);
});

test("invalid and normalized promo codes behave consistently through the API", async () => {
  const input = quotationInput(routePromoPairs[0][0]);
  const invalid = await postPromo({ tourId: routePromoPairs[0][0], promoCode: "SAVE90", quotationInput: input });
  assert.equal(invalid.body.valid, false);

  for (const promoCode of ["hodosb10", " HODOSB10 "]) {
    const result = await postPromo({ tourId: routePromoPairs[0][0], promoCode, quotationInput: input });
    assert.equal(result.body.valid, true);
    assert.equal(result.body.code, "HODOSB10");
  }
});

test("promo validation rejects an invalid phone before checking redemption storage", async () => {
  const tourId = routePromoPairs[0][0];
  const result = await postPromo({
    tourId,
    promoCode: "HODOSB10",
    phone: "12345",
    quotationInput: quotationInput(tourId),
  });
  assert.equal(result.status, 400);
  assert.equal(result.body.valid, false);
});