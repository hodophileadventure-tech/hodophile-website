import test from "node:test";
import assert from "node:assert/strict";

import { tourDiscoveryIdeas } from "../data/tour-discovery-ideas";
import { tourPackages } from "../data/tour-packages";
import {
  calculateTripMatch,
  createTripBudgetRanges,
  rankTripMatches,
  TRIP_MATCH_WEIGHTS,
  type TripMatchPreferences,
} from "./trip-match";

const journeyCatalog = [...tourPackages, ...tourDiscoveryIdeas];

test("Trip Match weights total 100 points and use the requested category proportions", () => {
  assert.deepEqual(TRIP_MATCH_WEIGHTS, {
    travelStyle: 25,
    duration: 20,
    experience: 20,
    budget: 20,
    season: 15,
  });
  assert.equal(Object.values(TRIP_MATCH_WEIGHTS).reduce((total, weight) => total + weight, 0), 100);
});

test("budget tiers are derived from listed prices and never fabricate prices", () => {
  const ranges = createTripBudgetRanges(tourPackages.map((journey) => journey.pricePerPerson));
  const priceValues = tourPackages.map((journey) => journey.pricePerPerson);

  assert.equal(ranges.length, 3);
  assert.deepEqual(
    ranges.map(({ minimum, maximum }) => [minimum, maximum]),
    [[0, 16500], [16501, 59500], [59501, undefined]],
  );
  assert.ok(priceValues.every((price) => ranges.some((range) => price >= range.minimum && (range.maximum === undefined || price <= range.maximum))));
  assert.deepEqual(createTripBudgetRanges([]), []);
  assert.deepEqual(createTripBudgetRanges([15000, 15000]), [{
    id: "listed-range",
    minimum: 15000,
    maximum: 15000,
    label: "PKR 15,000–PKR 15,000",
  }]);
});

test("experience, duration, and mood scores explain only verified metadata", () => {
  const journey = tourPackages.find((item) => item.id === "skardu-deosai-air-3-days");
  assert.ok(journey);
  const preferences: TripMatchPreferences = {
    moods: ["adventure"],
    duration: "2-3",
    experiences: ["mountains", "beaches"],
  };

  const result = calculateTripMatch(preferences, journey);
  assert.equal(result.score, 85);
  assert.deepEqual(result.reasons.map((reason) => reason.category), ["travelStyle", "duration", "experience"]);
  assert.ok(result.reasons.every((reason) => !reason.label.toLowerCase().includes("beach")));
});

test("request-only ideas without listed prices cannot match a selected budget", () => {
  const idea = tourDiscoveryIdeas[0];
  const preferences: TripMatchPreferences = {
    moods: [],
    experiences: [],
    budget: { id: "value", minimum: 0, maximum: 20000, label: "Up to PKR 20,000" },
  };
  const result = calculateTripMatch(preferences, idea);

  assert.equal(result.score, 0);
  assert.deepEqual(result.reasons, []);
  assert.ok(!("pricePerPerson" in idea));
});

test("missing price and season details do not count as mismatches", () => {
  const journey = tourPackages.find((item) => item.id === "skardu-deosai-air-3-days");
  assert.ok(journey);

  const result = calculateTripMatch({
    moods: ["adventure"],
    experiences: [],
    budget: { id: "value", minimum: 0, maximum: 20000, label: "Up to PKR 20,000" },
    season: "summer",
  }, journey);

  assert.equal(result.score, 56);
  assert.deepEqual(result.reasons.map((reason) => reason.category), ["travelStyle"]);
});

test("season matching requires an explicit schedule month and labels on-request availability", () => {
  const journey = tourPackages.find((item) => item.id === "ormara-beach-camping");
  assert.ok(journey);

  const requestedMonth = calculateTripMatch({ moods: [], experiences: [], season: "summer" }, journey);
  assert.equal(requestedMonth.score, 0);
  assert.deepEqual(requestedMonth.reasons, []);

  const explicitlyScheduled = {
    ...journey,
    scheduleNote: "Departure dates available in July",
  };
  const scheduledMatch = calculateTripMatch({ moods: [], experiences: [], month: "july" }, explicitlyScheduled);
  assert.equal(scheduledMatch.score, 100);
  assert.match(scheduledMatch.reasons[0].label, /july.*confirm availability/i);

  const differentMonth = calculateTripMatch(
    { moods: [], experiences: [], month: "june" },
    explicitlyScheduled,
  );
  assert.equal(differentMonth.score, 0);
});

test("ranking is deterministic, capped, and omits trips with no matching evidence", () => {
  const preferences: TripMatchPreferences = {
    moods: ["adventure"],
    duration: "2-3",
    experiences: [],
  };

  const first = rankTripMatches(journeyCatalog, preferences);
  const second = rankTripMatches(journeyCatalog, preferences);
  assert.deepEqual(first.map(({ trip, score }) => [trip.id, score]), second.map(({ trip, score }) => [trip.id, score]));
  assert.ok(first.length <= 4);
  assert.ok(first.length > 0);
  assert.ok(first.every((result) => result.score > 0));
  assert.ok(first.every((result, index) => index === 0 || first[index - 1].score >= result.score));
});
