import assert from "node:assert/strict";
import test from "node:test";
import { NextRequest } from "next/server";

import { POST } from "./route";

test("quote endpoint rejects unsupported air destinations before calculating a price", async () => {
  const request = new NextRequest("http://localhost/api/quote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customerName: "Test Traveler",
      customerPhone: "03000000000",
      startingPoint: "Islamabad",
      routeId: "custom-itinerary",
      vehicleName: "Toyota Corolla",
      numberOfRooms: 1,
      adults: 2,
      kids: 0,
      tripDate: "2027-06-15",
      tourType: "private",
      travelMode: "air",
      customCities: ["Swat"],
      routeDestinations: ["Swat"],
    }),
  });

  const response = await POST(request);
  const body = await response.json() as { error?: string };

  assert.equal(response.status, 400);
  assert.equal(
    body.error,
    "By Air trips are currently available only for Skardu, Hunza, Astore, and Fairy Meadows. Please select an eligible destination or switch to By Road.",
  );
});
