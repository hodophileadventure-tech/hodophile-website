import assert from "node:assert/strict";
import test from "node:test";

import {
  AIR_DESTINATION_ERROR,
  AirDestinationValidationError,
  buildAirRoadStops,
  getAirDestinationAdjustments,
  getAirQuotationDestinations,
  validateAirRoadStops,
} from "./air-routing";

test("builds Skardu round trips for one or multiple eligible destinations", () => {
  assert.deepEqual(buildAirRoadStops(["Skardu"]), ["Skardu"]);
  assert.deepEqual(buildAirRoadStops(["Hunza"]), ["Skardu", "Hunza", "Skardu"]);
  assert.deepEqual(buildAirRoadStops(["Astore"]), ["Skardu", "Astore", "Skardu"]);
  assert.deepEqual(buildAirRoadStops(["Fairy Meadows"]), ["Skardu", "Fairy Meadows", "Skardu"]);
  assert.deepEqual(
    buildAirRoadStops(["Skardu", "Hunza", "Astore"]),
    ["Skardu", "Hunza", "Astore", "Skardu"],
  );
  assert.deepEqual(
    buildAirRoadStops(["Hunza", "Skardu", "Hunza"]),
    ["Skardu", "Hunza", "Skardu"],
  );
});

test("adds By Air destination kilometers once per selected destination", () => {
  assert.deepEqual(
    getAirDestinationAdjustments(["Skardu", "Hunza", "Astore", "Fairy Meadows", "Fairy Meadows"]),
    { distanceAdditionKm: 1_350 },
  );
  assert.deepEqual(
    getAirDestinationAdjustments(["Astore", "Fairy Meadows"]),
    { distanceAdditionKm: 0 },
  );
});

test("canonicalizes eligible names and validates complete map routes", () => {
  assert.deepEqual(
    validateAirRoadStops(["skardu", "fairy meadows", "skardu"]),
    ["Skardu", "Fairy Meadows", "Skardu"],
  );
  assert.deepEqual(
    getAirQuotationDestinations(
      { routeDestinations: ["Hunza"], customCities: ["Hunza"] },
      { city: "Skardu", name: "Skardu & Hunza" },
    ),
    ["Hunza", "Skardu"],
  );
  assert.deepEqual(
    getAirQuotationDestinations({}, { city: "Skardu", name: "Skardu & Hunza" }),
    ["Skardu", "Hunza"],
  );
});

test("rejects unsupported destinations and routes that do not round-trip through Skardu", () => {
  assert.throws(
    () => buildAirRoadStops(["Swat"]),
    (error: unknown) =>
      error instanceof AirDestinationValidationError && error.message === AIR_DESTINATION_ERROR,
  );
  assert.throws(() => validateAirRoadStops(["Islamabad", "Hunza", "Islamabad"]), AirDestinationValidationError);
  assert.throws(() => validateAirRoadStops(["Skardu", "Hunza"]), AirDestinationValidationError);
  assert.throws(() => validateAirRoadStops(["Skardu", "Skardu"]), AirDestinationValidationError);
});
