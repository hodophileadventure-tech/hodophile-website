import test from "node:test";
import assert from "node:assert/strict";

import { tourPackages } from "@/lib/data/tour-packages";
import {
  calculateTripFit,
  getSimilarTrips,
  getSimilarTripsForSavedTrips,
  normalizeTrip,
  type TripPreferences,
} from "./index";

const makeSimilarityTrip = (
  id: string,
  title: string,
  destinationSlugs: string[],
  travelStyles: string[],
  duration: string,
) => ({ id, title, region: "northern" as const, destinationSlugs, travelStyles, duration, routeStops: [] });

const seedOne = makeSimilarityTrip("seed-one", "Seed One", ["north"], ["family"], "5 Days");
const seedTwo = makeSimilarityTrip("seed-two", "Seed Two", ["south"], ["adventure"], "12 Days");
const seedThree = makeSimilarityTrip("seed-three", "Seed Three", ["east"], ["tailored"], "8 Days");
const sharedCandidate = makeSimilarityTrip("shared", "Shared Candidate", ["north", "south"], ["family", "adventure"], "5 Days");
const northCandidate = makeSimilarityTrip("north-only", "North Candidate", ["north"], ["couples"], "9 Days");
const southCandidate = makeSimilarityTrip("south-only", "South Candidate", ["south"], ["couples"], "12 Days");
const eastCandidateOne = makeSimilarityTrip("east-one", "East Candidate One", ["east"], ["couples"], "9 Days");
const eastCandidateTwo = makeSimilarityTrip("east-two", "East Candidate Two", ["east"], ["adventure"], "6 Days");
const multiSeedTrips = [seedOne, seedTwo, seedThree, sharedCandidate, northCandidate, southCandidate, eastCandidateOne, eastCandidateTwo];

test("normalizeTrip converts existing package metadata into stable matching inputs", () => {
  const trip = normalizeTrip(tourPackages[0]);

  assert.equal(trip.id, "skardu-deosai-air-3-days");
  assert.deepEqual(trip.destinationSlugs, ["skardu"]);
  assert.deepEqual(trip.travelStyles, ["adventure", "couples", "tailored"]);
  assert.equal(trip.region, "northern");
  assert.equal(trip.durationDays, 3);
  assert.equal(trip.pricePerPerson, 45000);
  assert.ok(Array.isArray(trip.routeStops));
  assert.ok(Array.isArray(trip.departureMonths));
});

test("calculateTripFit returns a deterministic score and transparent reasons", () => {
  const preferences: TripPreferences = {
    destination: "skardu",
    region: "northern",
    travelStyle: "adventure",
    duration: "weekend",
    budget: 60000,
    departureMonth: "april",
  };

  const result = calculateTripFit(preferences, tourPackages[0]);

  assert.ok(result.score >= 0);
  assert.ok(result.score <= 100);
  assert.ok(result.reasons.length > 0);
  assert.ok(result.matchedCriteria.includes("destination"));
  assert.ok(result.matchedCriteria.includes("region"));
  assert.ok(result.matchedCriteria.includes("travelStyle"));
  assert.ok(result.matchedCriteria.includes("duration"));
  assert.ok(result.matchedCriteria.includes("budget"));
  assert.ok(result.summary.length > 0);
});

test("calculateTripFit gracefully handles missing preferences without penalizing the trip", () => {
  const result = calculateTripFit({}, tourPackages[0]);

  assert.equal(result.score, 0);
  assert.deepEqual(result.matchedCriteria, []);
  assert.deepEqual(result.unmatchedCriteria, []);
  assert.equal(result.summary, "No preferences selected; no fit criteria were evaluated.");
});

test("getSimilarTrips returns only genuinely related trips and excludes the current route", () => {
  const currentTrip = tourPackages.find((trip) => trip.id === "skardu-hunza-air-7-days");
  assert.ok(currentTrip);

  const results = getSimilarTrips(currentTrip, tourPackages);

  assert.ok(results.length > 0);
  assert.ok(results.every((match) => match.trip.id !== currentTrip.id));
  assert.ok(results[0].score >= (results[1]?.score ?? 0));
  assert.ok(results[0].reasons.length > 0);
});

test("similar trip scoring is deterministic and removes duplicates", () => {
  const uniqueResults = getSimilarTrips(tourPackages[0], [tourPackages[0], tourPackages[0], tourPackages[1]]);
  assert.equal(uniqueResults.length, 1);
  assert.equal(uniqueResults[0].trip.id, "skardu-deosai-basho-air-5-days");
});

test("saved-trip related journeys reuse canonical similarity for one seed", () => {
  const expected = getSimilarTrips(tourPackages[0], tourPackages).map((result) => result.trip.id);
  const actual = getSimilarTripsForSavedTrips([tourPackages[0]], tourPackages).map((result) => result.trip.id);

  assert.deepEqual(actual, expected);
});

test("multiple saved trips merge candidates in first-seen order", () => {
  const results = getSimilarTripsForSavedTrips([seedOne, seedTwo], multiSeedTrips);

  assert.deepEqual(results.map((result) => result.trip.id), ["shared", "north-only", "south-only"]);
  assert.deepEqual(results.map((result) => result.relatedTo), ["Seed One", "Seed One", "Seed Two"]);
});

test("duplicate candidates from multiple saved trips appear once", () => {
  const results = getSimilarTripsForSavedTrips([seedOne, seedTwo], multiSeedTrips);

  assert.equal(results.filter((result) => result.trip.id === "shared").length, 1);
});

test("all saved journeys are excluded from related results", () => {
  const results = getSimilarTripsForSavedTrips([seedOne, seedTwo], multiSeedTrips);

  assert.ok(results.every((result) => result.trip.id !== seedOne.id && result.trip.id !== seedTwo.id));
});

test("multi-seed ordering is deterministic", () => {
  const firstRun = getSimilarTripsForSavedTrips([seedOne, seedTwo], multiSeedTrips);
  const secondRun = getSimilarTripsForSavedTrips([seedOne, seedTwo], multiSeedTrips);

  assert.deepEqual(secondRun, firstRun);
});

test("three saved trips still cap related results at four in first-seen order", () => {
  const results = getSimilarTripsForSavedTrips([seedOne, seedTwo, seedThree], multiSeedTrips);

  assert.deepEqual(results.map((result) => result.trip.id), ["shared", "north-only", "south-only", "east-one"]);
  assert.equal(results.length, 4);
});

test("saved-trip similarity returns no candidates when none are related", () => {
  assert.deepEqual(getSimilarTripsForSavedTrips([seedOne], [seedOne]), []);
  assert.deepEqual(getSimilarTripsForSavedTrips([], multiSeedTrips), []);
});

test("budget and duration edge cases remain safe and informational", () => {
  const result = calculateTripFit({ budget: 10000, duration: "weekend" }, tourPackages[0]);

  assert.ok(result.score <= 100);
  assert.ok(result.score >= 0);
  assert.ok(result.reasons.some((reason) => reason.criterion === "budget" || reason.criterion === "duration"));
});
