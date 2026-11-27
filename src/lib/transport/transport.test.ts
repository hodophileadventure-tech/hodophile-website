import assert from "node:assert/strict";
import { test } from "node:test";

import { calculateQuotation, calculateTransportCost } from "@/lib/pricingEngine";
import { calculateJeepCost, getPackageJeepRideOptions } from "@/lib/data/jeeps";
import { getHotelsByCity } from "@/lib/data/hotels";

import { isTransportAdminAuthorized } from "./admin-auth";
import { calculateTransportExpense } from "./calculations";
import { getCustomRoadStops } from "./itinerary";
import { getTransportLocation } from "./locations";
import { allowRouteCalculation } from "./rate-limit";
import {
  applyRouteDistanceAdjustments,
  prepareAttractionRoadRoute,
  createManualRouteOverride,
  fetchOpenRouteServiceRoute,
  prepareRoadRoute,
  RouteCalculationError,
  type StoredRoute,
} from "./route-service";

function makeRouteResponse(stops: string[], status = 200): Response {
  const coordinates = prepareRoadRoute(stops, false).coordinates;
  return new Response(JSON.stringify({
    features: [{
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates,
      },
      properties: {
        segments: stops.slice(1).map((_, index) => ({
          distance: (index + 1) * 50_000,
          duration: (index + 1) * 3_600,
        })),
        way_points: coordinates.map((_, index) => index),
      },
    }],
  }), { status });
}

test("prepares multi-destination routes in order and includes the return stop", () => {
  const route = prepareRoadRoute(["Karachi", "Islamabad", "Naran", "Hunza", "Skardu"], true);

  assert.deepEqual(route.stops, ["Karachi", "Islamabad", "Naran", "Hunza", "Skardu", "Karachi"]);
  assert.equal(route.coordinates.length, route.stops.length);
  assert.notEqual(
    prepareRoadRoute(["Karachi", "Islamabad", "Naran", "Hunza", "Skardu"], false).itineraryKey,
    prepareRoadRoute(["Karachi", "Islamabad", "Hunza", "Naran", "Skardu"], false).itineraryKey,
  );
  assert.throws(
    () => prepareRoadRoute(["Islamabad", "Islamabad"], false),
    (error: unknown) => error instanceof RouteCalculationError && error.code === "invalid-stops",
  );
});

test("prepares attraction routes from verified points without distance adjustments or a return stop", () => {
  const route = prepareAttractionRoadRoute(["hunza-baltit-fort", "hunza-altit-fort"]);

  assert.deepEqual(route.stops, ["hunza-baltit-fort", "hunza-altit-fort"]);
  assert.deepEqual(route.coordinates, [
    [74.6698917, 36.3255234],
    [74.6821016, 36.3168395],
  ]);
  assert.deepEqual(route.destinationAdjustmentsKmByLeg, [0]);
  assert.throws(
    () => prepareAttractionRoadRoute(["hunza-baltit-fort", "unknown-attraction"]),
    (error: unknown) => error instanceof RouteCalculationError && error.code === "invalid-stops",
  );
  assert.throws(
    () => prepareAttractionRoadRoute(["nathia-mukshpuri", "nathia-ayubia"]),
    (error: unknown) => error instanceof RouteCalculationError && error.code === "invalid-stops",
  );
});

test("air routes keep map-provider leg distances without fixed destination adjustments", () => {
  const airRoute = prepareRoadRoute(["Skardu", "Hunza", "Astore", "Skardu"], true, false);

  assert.deepEqual(airRoute.stops, ["Skardu", "Hunza", "Astore", "Skardu"]);
  assert.deepEqual(airRoute.destinationAdjustmentsKmByLeg, [0, 0, 0]);
});

test("adds each selected destination distance once to its leg and the custom route total", () => {
  const destinations = [
    "Hunza",
    "Skardu",
    "Naran",
    "Astore",
    "Kashmir",
    "Swat",
    "Fairy Meadows",
    "Shogran",
    "Nathia Gali",
    "Murree",
  ];
  const prepared = prepareRoadRoute(["Islamabad", ...destinations], true);

  assert.deepEqual(prepared.destinationAdjustmentsKmByLeg, [
    400,
    500,
    300,
    270,
    340,
    550,
    188,
    200,
    120,
    185,
    0,
  ]);
  assert.deepEqual(
    prepareRoadRoute(["Islamabad", "Murree", "Naran"], true).destinationAdjustmentsKmByLeg,
    [185, 300, 0],
  );
  assert.deepEqual(
    prepareRoadRoute(["Islamabad", "Hunza", "Skardu", "Hunza"], true).destinationAdjustmentsKmByLeg,
    [400, 500, 0, 0],
  );

  const route: StoredRoute = {
    itineraryKey: prepared.itineraryKey,
    stops: prepared.stops,
    legs: prepared.stops.slice(1).map((to, index) => ({
      from: prepared.stops[index]!,
      to,
      distanceKm: 10,
      durationSeconds: 100,
      geometry: [prepared.coordinates[index]!, prepared.coordinates[index + 1]!],
    })),
    geometry: prepared.coordinates,
    distanceKm: (prepared.stops.length - 1) * 10,
    durationSeconds: (prepared.stops.length - 1) * 100,
    source: "OPENROUTESERVICE",
    manualOverride: false,
    expiresAt: new Date(),
  };
  const estimate = applyRouteDistanceAdjustments(route, {
    petrolPricePerLiter: null,
    dieselPricePerLiter: null,
    additionalDistanceKm: 20,
    additionalDistancePercent: 10,
    includeReturnJourney: true,
  }, prepared);

  assert.deepEqual(estimate.legs.map(({ distanceKm }) => distanceKm), [
    410,
    510,
    310,
    280,
    350,
    560,
    198,
    210,
    130,
    195,
    10,
  ]);
  assert.equal(estimate.baseDistanceKm, 3_163);
  assert.equal(estimate.allowanceKm, 336.3);
  assert.equal(estimate.estimatedDistanceKm, 3_499.3);
});

test("builds custom road stops in selected order and avoids adding an air transfer", () => {
  assert.deepEqual(
    getCustomRoadStops("Karachi", ["Naran", "Hunza"], "road"),
    ["Karachi", "Islamabad", "Naran", "Hunza"],
  );
  assert.deepEqual(
    getCustomRoadStops("Karachi", ["Islamabad", "Naran"], "road"),
    ["Karachi", "Islamabad", "Naran"],
  );
  assert.deepEqual(
    getCustomRoadStops("Islamabad", ["Islamabad", "Naran"], "road"),
    ["Islamabad", "Naran"],
  );
  assert.deepEqual(
    getCustomRoadStops("Karachi", ["Naran"], "road", false),
    ["Karachi", "Naran"],
  );
  assert.deepEqual(
    getCustomRoadStops("Karachi", ["Naran", "Hunza"], "air"),
    ["Karachi", "Naran", "Hunza"],
  );
});

test("rejects unsupported route stops instead of approximating their distance", () => {
  assert.throws(
    () => prepareRoadRoute(["Karachi", "Atlantis"], false),
    (error: unknown) => error instanceof RouteCalculationError && error.code === "invalid-stops",
  );
});

test("routes Fairy Meadows road access through Raikot Bridge", () => {
  const route = prepareRoadRoute(["Islamabad", "Fairy Meadows"], false);
  const raikotBridge = getTransportLocation("Raikot Bridge");

  assert.ok(raikotBridge);
  assert.deepEqual(route.stops, ["Islamabad", "Raikot Bridge"]);
  assert.deepEqual(route.coordinates[1], raikotBridge.coordinate);
});

test("routes Shogran to a nearby routable road-access point", () => {
  const route = prepareRoadRoute(["Islamabad", "Shogran"], false);
  const shogran = getTransportLocation("Shogran");
  const roadAccess = getTransportLocation("Shogran Road Access");

  assert.ok(shogran);
  assert.ok(roadAccess);
  assert.deepEqual(route.stops, ["Islamabad", "Shogran Road Access"]);
  assert.deepEqual(route.coordinates[1], roadAccess.coordinate);
  assert.notDeepEqual(route.coordinates[1], shogran.coordinate);
});

test("parses ordered road distances and durations from the routing provider", async () => {
  const prepared = prepareRoadRoute(["Islamabad", "Naran", "Hunza"], false);
  let instructions: unknown;
  const fetcher: typeof fetch = async (_input, init) => {
    const body = typeof init?.body === "string" ? JSON.parse(init.body) : null;
    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      throw new Error("Expected a JSON routing request body.");
    }
    instructions = (body as Record<string, unknown>).instructions;
    return makeRouteResponse(prepared.stops);
  };
  const route = await fetchOpenRouteServiceRoute(
    prepared,
    fetcher,
    "test-server-key",
  );

  assert.equal(instructions, true);
  assert.deepEqual(route.legs.map(({ from, to }) => [from, to]), [
    ["Islamabad", "Naran"],
    ["Naran", "Hunza"],
  ]);
  assert.deepEqual(route.legs.map(({ distanceKm }) => distanceKm), [50, 100]);
  assert.equal(route.distanceKm, 150);
  assert.equal(route.durationSeconds, 10_800);
  assert.equal(route.source, "OPENROUTESERVICE");
});

test("accepts valid route geometry longer than 30,000 coordinates", async () => {
  const prepared = prepareRoadRoute(["Islamabad", "Swat"], false);
  const coordinates = Array.from({ length: 32_739 }, (_, index) => [
    73.0479 + index / 1_000_000,
    33.6844,
  ]);
  const route = await fetchOpenRouteServiceRoute(
    prepared,
    async () => new Response(JSON.stringify({
      features: [{
        type: "Feature",
        geometry: { type: "LineString", coordinates },
        properties: {
          segments: [{ distance: 300_000, duration: 10_000 }],
          way_points: [0, coordinates.length - 1],
        },
      }],
    })),
    "test-server-key",
  );

  assert.equal(route.geometry.length, coordinates.length);
  assert.equal(route.legs[0]?.geometry.length, coordinates.length);
});

test("reports missing credentials, provider rate limits, and malformed route data", async () => {
  const prepared = prepareRoadRoute(["Karachi", "Islamabad"], false);
  await assert.rejects(
    fetchOpenRouteServiceRoute(prepared, fetch, ""),
    (error: unknown) => error instanceof RouteCalculationError && error.code === "not-configured",
  );
  await assert.rejects(
    fetchOpenRouteServiceRoute(prepared, async () => new Response(null, { status: 429 }), "test-server-key"),
    (error: unknown) => error instanceof RouteCalculationError && error.code === "rate-limited",
  );
  await assert.rejects(
    fetchOpenRouteServiceRoute(prepared, async () => new Response("{}", { status: 200 }), "test-server-key"),
    (error: unknown) => error instanceof RouteCalculationError && error.code === "invalid-response",
  );
});

test("preserves provider authentication status and redacts any echoed credential", async () => {
  const prepared = prepareRoadRoute(["Islamabad", "Swat"], false);
  const apiKey = "test-server-key";

  await assert.rejects(
    fetchOpenRouteServiceRoute(
      prepared,
      async () => new Response(JSON.stringify({
        error: { code: 4010, message: `Invalid key ${apiKey}` },
      }), { status: 401 }),
      apiKey,
    ),
    (error: unknown) => {
      assert.ok(error instanceof RouteCalculationError);
      assert.equal(error.code, "provider-authentication");
      assert.equal(error.providerStatus, 401);
      assert.equal(error.providerBody?.includes(apiKey), false);
      assert.equal(error.providerBody?.includes("[REDACTED]"), true);
      return true;
    },
  );
});

test("keeps the timeout active while reading the provider response body", async () => {
  const prepared = prepareRoadRoute(["Karachi", "Islamabad"], false);
  const fetcher: typeof fetch = async (_input, init) => new Response(new ReadableStream({
    start(controller) {
      init?.signal?.addEventListener("abort", () => {
        controller.error(new DOMException("Aborted", "AbortError"));
      }, { once: true });
    },
  }));

  await assert.rejects(
    fetchOpenRouteServiceRoute(prepared, fetcher, "test-server-key", 5),
    (error: unknown) => error instanceof RouteCalculationError && error.code === "timeout",
  );
});

test("manual distance overrides replace only leg distances and are identified as manual", () => {
  const prepared = prepareRoadRoute(["Islamabad", "Naran", "Hunza"], false);
  const route = createManualRouteOverride(prepared, [310, 420]);

  assert.equal(route.distanceKm, 730);
  assert.equal(route.source, "MANUAL");
  assert.equal(route.manualOverride, true);
  assert.deepEqual(route.legs.map(({ distanceKm }) => distanceKm), [310, 420]);
  assert.deepEqual(route.legs.map(({ durationSeconds }) => durationSeconds), [null, null]);
  assert.throws(
    () => createManualRouteOverride(prepared, [310]),
    (error: unknown) => error instanceof RouteCalculationError && error.code === "invalid-stops",
  );
});

test("calculates petrol and diesel fuel, distance allowance, and maintenance costs", () => {
  const settings = {
    petrolPricePerLiter: 300,
    dieselPricePerLiter: 400,
    additionalDistanceKm: 25,
    additionalDistancePercent: 5,
  };
  const petrol = calculateTransportExpense(1_000, {
    name: "Petrol vehicle",
    fuelType: "petrol",
    averageKmPerLiter: 10,
    maintenanceCostPerKm: 2,
  }, settings);
  const diesel = calculateTransportExpense(500, {
    name: "Diesel vehicle",
    fuelType: "diesel",
    averageKmPerLiter: 5,
    maintenanceCostPerKm: 10,
  }, { ...settings, additionalDistanceKm: 0, additionalDistancePercent: 0 });

  assert.equal(petrol.totalDistanceKm, 1_075);
  assert.equal(petrol.fuelLiters, 107.5);
  assert.equal(petrol.fuelExpense, 32_250);
  assert.equal(petrol.maintenanceExpense, 2_150);
  assert.equal(petrol.totalTransportationExpense, 34_400);
  assert.equal(diesel.totalDistanceKm, 500);
  assert.equal(diesel.fuelExpense, 40_000);
  assert.equal(diesel.maintenanceExpense, 5_000);
  assert.equal(diesel.totalTransportationExpense, 45_000);
});

test("uses PKR 320 per litre for default petrol and diesel vehicle rates", () => {
  const petrol = calculateTransportCost("Toyota Corolla", "skardu-basho-6days", 1);
  const diesel = calculateTransportCost("Prado", "skardu-basho-6days", 1);
  const coaster = calculateTransportCost("Coaster 4C", "skardu-basho-6days", 1);

  assert.equal(petrol?.fuelPricePerLiter, 320);
  assert.equal(diesel?.fuelPricePerLiter, 320);
  assert.equal(coaster?.fuelPricePerLiter, 320);
});

test("uses a vehicle-specific fuel price and rejects missing prices", () => {
  const vehicle = {
    name: "Configured petrol vehicle",
    fuelType: "petrol" as const,
    averageKmPerLiter: 10,
    fuelPricePerLiter: 250,
    maintenanceCostPerKm: 0,
  };
  const estimate = calculateTransportExpense(100, vehicle, {
    petrolPricePerLiter: 300,
    dieselPricePerLiter: null,
    additionalDistanceKm: 0,
    additionalDistancePercent: 0,
  });

  assert.equal(estimate.fuelPricePerLiter, 250);
  assert.equal(estimate.fuelExpense, 2_500);
  assert.throws(
    () => calculateTransportExpense(100, { ...vehicle, fuelPricePerLiter: null }, {
      petrolPricePerLiter: null,
      dieselPricePerLiter: null,
      additionalDistanceKm: 0,
      additionalDistancePercent: 0,
    }),
    RangeError,
  );
});

test("keeps configured package-route transport pricing independent of custom-route inputs", () => {
  const input = {
    routeId: "skardu-basho-6days",
    vehicleName: "Toyota Corolla",
    hotelId: "skardu-dera-lamsa",
    roomId: "Lamsa Executive Room",
    numberOfRooms: 1,
    adults: 2,
    kids: 0,
    tripDate: "2026-06-15",
  };
  const existingPackageQuote = calculateQuotation(input);
  const withCustomRouteInputs = calculateQuotation(input, {
    distanceKm: 1,
    vehicleConfiguration: {
      name: "Toyota Corolla",
      fuelType: "petrol",
      averageKmPerLiter: 100,
      fuelPricePerLiter: 1,
      maintenanceCostPerKm: 0,
    },
    settings: {
      petrolPricePerLiter: 1,
      dieselPricePerLiter: 1,
      additionalDistanceKm: 0,
      additionalDistancePercent: 0,
    },
  });

  assert.ok(existingPackageQuote);
  assert.ok(withCustomRouteInputs);
  assert.equal(withCustomRouteInputs.transportCost, existingPackageQuote.transportCost);
  assert.deepEqual(withCustomRouteInputs.transportBreakdown, existingPackageQuote.transportBreakdown);
});

test("uses a supplied road distance once in a custom quotation", () => {
  const input = {
    routeId: "custom-itinerary",
    customCities: ["Naran"],
    routeDestinations: ["Naran"],
    startingPoint: "Islamabad",
    vehicleName: "Toyota Corolla",
    hotelId: "hotel-mount-feast-naran",
    roomId: "Deluxe w/o balcony",
    numberOfRooms: 1,
    adults: 2,
    kids: 0,
    tripDate: "2026-06-15",
    jeepAddons: [{ id: "package-jeep-naran", quantity: 1 }],
  };
  const options = {
    distanceKm: 500,
    vehicleConfiguration: {
      name: "Toyota Corolla",
      fuelType: "petrol" as const,
      averageKmPerLiter: 10,
      maintenanceCostPerKm: 2,
    },
    settings: {
      petrolPricePerLiter: 300,
      dieselPricePerLiter: 400,
      additionalDistanceKm: 0,
      additionalDistancePercent: 10,
    },
  };
  const quote = calculateQuotation(input, options);
  const quoteWithoutSelectedRide = calculateQuotation({ ...input, jeepAddons: undefined }, options);

  assert.ok(quote);
  assert.ok(quoteWithoutSelectedRide);
  assert.equal(quote.jeepAddonsCost, 7_000);
  assert.equal(quoteWithoutSelectedRide.jeepAddonsCost, 0);
  assert.deepEqual(getPackageJeepRideOptions(["Naran"], "road").map((ride) => ride.pricePerJeep), [7_000]);
  assert.equal(quote.transportBreakdown?.distance, 550);
  assert.equal(quote.transportBreakdown?.fuelCost, 16_500);
  assert.equal(quote.transportBreakdown?.maintenanceCost, 1_100);
  assert.equal(quote.transportBreakdown?.rentalCost, 6_000);
  assert.equal(quote.transportBreakdown?.tollTax, 8_000);
  assert.equal(quote.transportCost, 31_600);
});

test("charges transport but no accommodation for a zero-night destination", () => {
  const shogranHotel = getHotelsByCity("Shogran")[0];
  assert.ok(shogranHotel);
  const room = shogranHotel.rooms[0];
  assert.ok(room);

  const quote = calculateQuotation({
    routeId: "custom-itinerary",
    customCities: ["Shogran"],
    routeDestinations: ["Shogran"],
    startingPoint: "Islamabad",
    vehicleName: "Toyota Corolla",
    numberOfRooms: 1,
    adults: 2,
    kids: 0,
    tripDate: "2026-06-15",
    multiCityHotels: {
      Shogran: { hotelId: shogranHotel.id, roomId: room.name },
    },
    multiCityNights: { Shogran: 0 },
  }, { distanceKm: 100 });

  assert.ok(quote);
  assert.equal(quote.hotelCost, 0);
  assert.equal(quote.breakfastCost, 1_000);
  assert.equal(quote.details.hotel, "");
  assert.ok(quote.transportCost > 0);
  assert.equal(quote.totalCost, 27_300);
});

test("adds PKR 500 per traveler per trip day for breakfast", () => {
  const shogranHotel = getHotelsByCity("Shogran")[0];
  assert.ok(shogranHotel);
  const room = shogranHotel.rooms[0];
  assert.ok(room);

  const baseInput = {
    routeId: "custom-itinerary",
    customCities: ["Shogran"],
    routeDestinations: ["Shogran"],
    startingPoint: "Islamabad",
    vehicleName: "Toyota Corolla",
    numberOfRooms: 1,
    kids: 0,
    tripDate: "2026-06-15",
    multiCityHotels: {
      Shogran: { hotelId: shogranHotel.id, roomId: room.name },
    },
    multiCityNights: { Shogran: 1 },
  };
  const twoTravelerQuote = calculateQuotation({
    ...baseInput,
    adults: 2,
  });
  const fourTravelerQuote = calculateQuotation({
    ...baseInput,
    adults: 4,
  });

  assert.ok(twoTravelerQuote);
  assert.ok(fourTravelerQuote);
  assert.equal(twoTravelerQuote.breakfastCost, 2_000);
  assert.equal(fourTravelerQuote.breakfastCost, 4_000);
  assert.equal(fourTravelerQuote.hotelCost, twoTravelerQuote.hotelCost);
  assert.equal(fourTravelerQuote.transportCost, twoTravelerQuote.transportCost);
  assert.ok(fourTravelerQuote.totalCost > twoTravelerQuote.totalCost);
});

test("offers the requested per-jeep rates and selects the By Air Astore rate", () => {
  assert.deepEqual(
    getPackageJeepRideOptions(
      ["Hunza", "Skardu", "Naran", "Astore", "Kashmir", "Swat", "Fairy Meadows", "Shogran"],
      "road",
    ).map(({ city, pricePerJeep }) => [city, pricePerJeep]),
    [
      ["Hunza", 20_000],
      ["Skardu", 22_000],
      ["Naran", 7_000],
      ["Astore", 35_000],
      ["Kashmir", 30_000],
      ["Swat", 15_000],
      ["Fairy Meadows", 20_000],
      ["Shogran", 12_000],
    ],
  );
  assert.deepEqual(
    getPackageJeepRideOptions(["Astore"], "air").map(({ pricePerJeep }) => pricePerJeep),
    [70_000],
  );
  assert.equal(calculateJeepCost([{ id: "package-jeep-naran", quantity: 2 }]), 14_000);
});

test("uses only the server-calculated Skardu road distance for air transport pricing", () => {
  const airInput = {
    routeId: "skardu-basho-6days",
    vehicleName: "Toyota Corolla",
    hotelId: "skardu-dera-lamsa",
    roomId: "Lamsa Executive Room",
    numberOfRooms: 1,
    adults: 2,
    kids: 0,
    tripDate: "2026-06-15",
    travelMode: "air" as const,
  };
  const serverOptions = {
    distanceKm: 1_234,
    vehicleConfiguration: {
      name: "Toyota Corolla",
      fuelType: "petrol" as const,
      averageKmPerLiter: 10,
      fuelPricePerLiter: 300,
      maintenanceCostPerKm: 0,
    },
    settings: {
      petrolPricePerLiter: 300,
      dieselPricePerLiter: 400,
      additionalDistanceKm: 0,
      additionalDistancePercent: 0,
    },
  };

  assert.equal(calculateQuotation(airInput), null);

  const roundTripQuote = calculateQuotation({
    ...airInput,
    routeDestinations: ["Skardu", "Hunza"],
  }, serverOptions);
  const skarduOnlyQuote = calculateQuotation({
    ...airInput,
    routeDestinations: ["Skardu"],
  }, { ...serverOptions, distanceKm: 0 });

  assert.ok(roundTripQuote);
  assert.ok(skarduOnlyQuote);
  assert.equal(roundTripQuote.transportBreakdown?.distance, 1_234);
  assert.equal(skarduOnlyQuote.transportBreakdown?.distance, 0);
});

test("adds only selected By Air jeep rides to a custom destination quote", () => {
  const quote = calculateQuotation({
    routeId: "skardu-basho-6days",
    vehicleName: "Toyota Corolla",
    hotelId: "skardu-dera-lamsa",
    roomId: "Lamsa Executive Room",
    customCities: ["Astore", "Fairy Meadows"],
    routeDestinations: ["Astore", "Fairy Meadows"],
    numberOfRooms: 1,
    adults: 2,
    kids: 0,
    tripDate: "2026-06-15",
    travelMode: "air",
    jeepAddons: [
      { id: "package-jeep-astore-air", quantity: 1 },
      { id: "package-jeep-fairy-meadows", quantity: 1 },
    ],
  }, {
    distanceKm: 1_200,
    vehicleConfiguration: {
      name: "Toyota Corolla",
      fuelType: "petrol",
      averageKmPerLiter: 10,
      fuelPricePerLiter: 300,
      maintenanceCostPerKm: 0,
    },
    settings: {
      petrolPricePerLiter: 300,
      dieselPricePerLiter: 400,
      additionalDistanceKm: 0,
      additionalDistancePercent: 0,
    },
  });

  assert.ok(quote);
  assert.equal(quote.transportBreakdown?.distance, 1_200);
  assert.equal(quote.jeepAddonsCost, 90_000);
  assert.deepEqual(quote.details.jeepAddonsDetails, [
    "Astore jeep ride (By Air) (1 jeep)",
    "Fairy Meadows jeep ride (1 jeep)",
  ]);
});

test("requires the exact configured bearer secret for transport administration", () => {
  const previousKey = process.env.TRANSPORT_ADMIN_API_KEY;
  const expectedKey = "test-admin-key-".repeat(3);
  try {
    process.env.TRANSPORT_ADMIN_API_KEY = expectedKey;
    assert.equal(isTransportAdminAuthorized(`Bearer ${expectedKey}`), true);
    assert.equal(isTransportAdminAuthorized("Bearer wrong-key"), false);
    assert.equal(isTransportAdminAuthorized(null), false);
    assert.equal(isTransportAdminAuthorized(`Basic ${expectedKey}`), false);
    assert.equal(isTransportAdminAuthorized(`Bearer ${expectedKey} `), false);
  } finally {
    if (previousKey === undefined) delete process.env.TRANSPORT_ADMIN_API_KEY;
    else process.env.TRANSPORT_ADMIN_API_KEY = previousKey;
  }
});

test("limits route calculations per identifier and resets the window", () => {
  const identifier = `transport-test-${Math.random()}`;
  const start = 1_000_000;

  for (let request = 0; request < 20; request += 1) {
    assert.equal(allowRouteCalculation(identifier, start), true);
  }
  assert.equal(allowRouteCalculation(identifier, start), false);
  assert.equal(allowRouteCalculation(identifier, start + 60_000), true);
});
