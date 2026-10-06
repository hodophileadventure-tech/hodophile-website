import assert from "node:assert/strict";
import test from "node:test";
import { NextRequest } from "next/server";

import { getHotelsByCity } from "@/lib/data/hotels";
import { POST } from "./route";

const routeId = "skardu-basho-6days";
const hotel = getHotelsByCity("Skardu")[0];
assert.ok(hotel);
const room = hotel.rooms[0];
assert.ok(room);

async function quote(body: Record<string, unknown>) {
  const request = new NextRequest("http://localhost/api/quote/calc", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const response = await POST(request);
  return { status: response.status, body: await response.json() as Record<string, unknown> };
}

const input = {
  routeId,
  vehicleName: "Toyota Corolla",
  hotelId: hotel.id,
  roomId: room.name,
  numberOfRooms: 1,
  adults: 2,
  kids: 0,
  tripDate: "2027-06-15",
};

test("live quote applies HODOSB10 to its own server calculation, not client prices", async () => {
  const result = await quote({
    ...input,
    promoCode: "HODOSB10",
    basePrice: 1,
    discountPercent: 100,
    discountAmount: 1_000_000,
    finalPrice: 0,
  });

  assert.equal(result.status, 200);
  assert.equal(result.body.success, true);
  const quotation = result.body.quotation as { totalCost: number; promotion: { originalPrice: number; discountPercent: number; discountAmount: number; finalPrice: number } };
  assert.ok(quotation.promotion.originalPrice > 1);
  assert.equal(quotation.promotion.discountPercent, 10);
  assert.equal(quotation.promotion.discountAmount, Math.round(quotation.promotion.originalPrice * 0.1));
  assert.equal(quotation.totalCost, quotation.promotion.finalPrice);
});

test("live quote remains unchanged without a promo code", async () => {
  const result = await quote(input);
  assert.equal(result.status, 200);
  assert.equal(result.body.success, true);
  const quotation = result.body.quotation as { totalCost: number; promotion?: unknown };
  assert.equal(quotation.promotion, undefined);
});

test("live quote rejects HODOSB10 after switching to an ineligible tour", async () => {
  const result = await quote({ ...input, routeId: "swat-kalam-4days", promoCode: "HODOSB10" });
  assert.equal(result.status, 400);
  assert.equal(result.body.valid, false);
});