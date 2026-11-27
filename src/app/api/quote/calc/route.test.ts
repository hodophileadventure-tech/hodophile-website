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

test("live air quote rejects unsupported destinations server-side", async () => {
  const result = await quote({
    ...input,
    travelMode: "air",
    routeDestinations: ["Swat"],
  });

  assert.equal(result.status, 400);
  assert.equal(
    result.body.error,
    "By Air trips are currently available only for Skardu, Hunza, Astore, and Fairy Meadows. Please select an eligible destination or switch to By Road.",
  );
});

test("live quote rejects a missing per-night Kashmir hotel selection", async () => {
  const result = await quote({
    ...input,
    customCities: ["Kashmir"],
    multiCityNights: { Kashmir: 2 },
    customCityHotelStays: [],
  });

  assert.equal(result.status, 400);
  assert.equal(result.body.error, "Please select a hotel and room for each Kashmir night.");
});

test("live quote rejects more than four guests per room", async () => {
  const result = await quote({ ...input, adults: 5, numberOfRooms: 1 });

  assert.equal(result.status, 400);
  assert.equal(
    result.body.error,
    "A maximum of 4 people can share one room. Please select at least 2 rooms or reduce the number of people.",
  );
});

test("live quote allows four guests in one room", async () => {
  const result = await quote({ ...input, adults: 4, numberOfRooms: 1 });

  assert.equal(result.status, 200);
  assert.equal(result.body.success, true);
});

test("live quote requires at least one Malam Jabba night", async () => {
  const result = await quote({
    ...input,
    customCities: ["Malam Jabba"],
    multiCityHotels: {
      "Malam Jabba": { hotelId: "hill-city-hotel-fizaghat", roomId: "Standard" },
    },
    multiCityNights: { "Malam Jabba": 0 },
  });

  assert.equal(result.status, 400);
  assert.equal(result.body.error, "Malam Jabba requires at least one night.");
});

test("live quote restricts Malam Jabba hotels to Bahrain and Fizaghat", async () => {
  const result = await quote({
    ...input,
    customCities: ["Malam Jabba"],
    multiCityHotels: {
      "Malam Jabba": { hotelId: hotel.id, roomId: room.name },
    },
    multiCityNights: { "Malam Jabba": 1 },
  });

  assert.equal(result.status, 400);
  assert.equal(
    result.body.error,
    "Choose a hotel and room in Bahrain or Fizaghat for Malam Jabba.",
  );
});

test("live quote rejects Kashmir jeep rides outside May through October", async () => {
  const result = await quote({
    ...input,
    tripDate: "2027-04-15",
    jeepAddons: [{ id: "package-jeep-kashmir", quantity: 1 }],
  });

  assert.equal(result.status, 400);
  assert.equal(result.body.error, "Kashmir jeep rides are available only from May through October.");
});