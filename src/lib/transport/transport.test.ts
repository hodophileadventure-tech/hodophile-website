import assert from "node:assert/strict";
import { test } from "node:test";

import { calculateQuotation } from "@/lib/pricingEngine";

import { calculateTransportExpense } from "./calculations";
import { getCustomRoadStops } from "./itinerary";
import {
  createManualRouteOverride,
  fetchOpenRouteServiceRoute,
  prepareRoadRoute,
  RouteCalculationError,
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
});

test("builds custom road stops in selected order and avoids adding an air transfer", () => {
  assert.deepEqual(
    getCustomRoadStops("Karachi", ["Naran", "Hunza"], "road"),
    ["Karachi", "Islamabad", "Naran", "Hunza"],
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

test("parses ordered road distances and durations from the routing provider", async () => {
  const prepared = prepareRoadRoute(["Islamabad", "Naran", "Hunza"], false);
  const route = await fetchOpenRouteServiceRoute(
    prepared,
    async () => makeRouteResponse(prepared.stops),
    "test-server-key",
  );

  assert.deepEqual(route.legs.map(({ from, to }) => [from, to]), [
    ["Islamabad", "Naran"],
    ["Naran", "Hunza"],
  ]);
  assert.deepEqual(route.legs.map(({ distanceKm }) => distanceKm), [50, 100]);
  assert.equal(route.distanceKm, 150);
  assert.equal(route.durationSeconds, 10_800);
  assert.equal(route.source, "OPENROUTESERVICE");
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
