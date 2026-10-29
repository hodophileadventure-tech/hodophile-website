import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { getNorthernAirTourPath, northernAirTourBookingTerms, northernAirTours } from "./northern-air-tours";

test("Northern by Air detail pages have itinerary, pricing, and package information", () => {
  const expectedTours = [
    ["Skardu & Hunza · 8 Days by Air or Road", 8],
    ["Skardu · 4 Days", 4],
    ["Skardu · 5 Days", 5],
    ["Skardu · 6 Days", 6],
    ["Skardu · 7 Days", 7],
    ["Skardu · 8 Days", 8],
    ["Skardu & Hunza · 7 Days", 7],
    ["Skardu & Deosai · 8 Days", 8],
    ["Skardu & Minimerg · 8 Days", 8],
    ["Skardu, Minimerg & Bilamik · 8 Days", 8],
  ];

  assert.deepEqual(
    northernAirTours.map(({ title, itinerary }) => [title, itinerary.length]),
    expectedTours,
  );
  assert.equal(new Set(northernAirTours.map((tour) => tour.id)).size, expectedTours.length);
  assert.equal(new Set(northernAirTours.map((tour) => tour.image)).size, expectedTours.length);
  assert.equal(getNorthernAirTourPath("skardu-hunza-8-days"), "/tours/northern-tours/by-air-or-road/skardu-hunza-8-days");
  assert.equal(getNorthernAirTourPath("skardu-4-days"), "/tours/northern-tours/by-air/skardu-4-days");
  const skarduHunzaEightDayTour = northernAirTours.find((tour) => tour.id === "skardu-hunza-8-days");
  assert.ok(skarduHunzaEightDayTour);
  assert.deepEqual(skarduHunzaEightDayTour.travelModes, ["air", "road"]);
  assert.ok(skarduHunzaEightDayTour.pricing[0].rates.includes("PKR 60,000 per head by road; air tickets are extra for the air option"));
  assert.match(skarduHunzaEightDayTour.airfare, /air tickets are not included/i);
  assert.ok(existsSync(resolve(process.cwd(), "src/app/tours/northern-tours/by-air/[slug]/page.tsx")));
  assert.ok(northernAirTourBookingTerms.length > 0);

  for (const tour of northernAirTours) {
    assert.ok(
      existsSync(resolve(process.cwd(), "public", tour.image.slice(1))),
      `missing card image for ${tour.id}`,
    );
    assert.deepEqual(
      tour.itinerary.map((day) => day.day),
      Array.from({ length: tour.itinerary.length }, (_, index) => index + 1),
      `${tour.title} should list each itinerary day in order`,
    );
    for (const day of tour.itinerary) {
      assert.ok(day.title.trim().length > 0);
      assert.ok(day.description.trim().length > 0);
    }
    assert.ok(tour.summary.trim().length > 0, `${tour.title} should have a detail-page summary`);
    assert.ok(tour.pricing.length > 0, `${tour.title} should include pricing options`);
    assert.ok(tour.pricing.every((option) => option.rates.length > 0), `${tour.title} should include rates`);
    assert.ok(tour.airfare.trim().length > 0, `${tour.title} should explain airfare`);
    assert.ok(tour.inclusions.length > 0, `${tour.title} should list package inclusions`);
  }
});
