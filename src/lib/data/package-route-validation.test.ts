import test from "node:test";
import assert from "node:assert/strict";

import { tourPackages } from "./tour-packages";
import { seasonalTourPackages } from "./seasonal-tour-packages";

test("detail package route ids are unique and keep the core journeys", () => {
  const generatedRouteIds = [
    ...tourPackages.filter((tourPackage) => !tourPackage.id.startsWith("seasonal-")).map((tourPackage) => tourPackage.id),
    ...seasonalTourPackages.map((item) => item.id),
  ];

  const duplicateIds = generatedRouteIds.filter((id, index) => generatedRouteIds.indexOf(id) !== index);

  assert.deepEqual(duplicateIds, [], "route ids must not duplicate");
  assert.ok(generatedRouteIds.includes("skardu-deosai-air-3-days"), "missing core Skardu route");
  assert.ok(generatedRouteIds.includes("skardu-hunza-air-7-days"), "missing core Hunza route");
  assert.ok(generatedRouteIds.includes("ormara-beach-camping"), "missing core southern route");
});
