import assert from "node:assert/strict";
import { test } from "node:test";

import { sortedCitiesWithHotels } from "./cities";
import { ROUTE_GRAPH, getRouteDistance, validateRoute } from "./custom-itinerary";
import { getHotelsByCity } from "./hotels";
import { getTransportLocation } from "../transport/locations";

test("Malam Jabba is available as a custom destination with Swat hotel options and road routing", () => {
  assert.ok(sortedCitiesWithHotels.includes("Malam Jabba"));
  assert.ok(getHotelsByCity("Malam Jabba").length > 0);
  assert.ok(getHotelsByCity("Malam Jabba").every((hotel) => hotel.city === "Swat"));
  assert.equal(getTransportLocation("Malam Jabba")?.name, "Malam Jabba");
  assert.deepEqual(validateRoute(["Islamabad", "Malam Jabba", "Islamabad"], ROUTE_GRAPH), []);
  assert.equal(getRouteDistance(["Islamabad", "Malam Jabba", "Islamabad"], ROUTE_GRAPH), 650);
});
