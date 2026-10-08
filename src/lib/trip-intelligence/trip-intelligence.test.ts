import test from "node:test";
import assert from "node:assert/strict";

import { tourPackages } from "@/lib/data/tour-packages";
import {
  calculateTripFit,
  getSimilarTrips,
  getSimilarTripsForSavedTrips,
  normalizeTrip,
  rankTripRecommendations,
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

test("a trip with no current price is never presented as a budget fit", () => {
  const result = calculateTripFit(
    { budget: 100000 },
    {
      id: "unpriced-trip",
      title: "Unpriced trip",
      region: "northern",
      pricePerPerson: undefined,
    },
  );

  assert.ok(!result.matchedCriteria.includes("budget"));
  assert.ok(result.reasons.some((reason) => reason.label === "Price to confirm" && reason.detail.includes("Current pricing is not listed")));
});

test("rankTripRecommendations avoids package-count dominance and stays stable across input order", () => {
  const skarduOne = {
    id: "skardu-one",
    title: "Skardu One",
    region: "northern" as const,
    destinationSlugs: ["skardu"],
    travelStyles: ["adventure"],
    duration: "5 Days",
    pricePerPerson: 40000,
    routeStops: ["Skardu"],
    description: "Skardu adventure",
    departures: [],
    scheduleNote: "Available in April",
    departureAvailability: "confirmed" as const,
  };

  const skarduTwo = {
    ...skarduOne,
    id: "skardu-two",
    title: "Skardu Two",
  };

  const skarduThree = {
    ...skarduOne,
    id: "skardu-three",
    title: "Skardu Three",
  };

  const hunza = {
    ...skarduOne,
    id: "hunza-one",
    title: "Hunza One",
    destinationSlugs: ["hunza"],
    routeStops: ["Hunza"],
    pricePerPerson: 45000,
  };

  const swat = {
    ...skarduOne,
    id: "swat-one",
    title: "Swat One",
    destinationSlugs: ["swat"],
    routeStops: ["Swat"],
    pricePerPerson: 42000,
  };

  const preferences: TripPreferences = {
    travelStyle: "adventure",
    duration: "4-7",
    budget: 50000,
  };

  const catalogA = [skarduOne, skarduTwo, skarduThree, hunza, swat];
  const catalogB = [swat, hunza, skarduThree, skarduTwo, skarduOne];

  const resultsA = rankTripRecommendations(preferences, catalogA, 3);
  const resultsB = rankTripRecommendations(preferences, catalogB, 3);

  assert.deepEqual(resultsA.map((result) => result.trip.id), resultsB.map((result) => result.trip.id));
  assert.ok(resultsA.some((result) => result.trip.id === "hunza-one"));
  assert.ok(resultsA.some((result) => result.trip.id === "swat-one"));
  assert.equal(new Set(resultsA.map((result) => result.trip.destinationSlugs[0])).size, resultsA.length);
});

test("recommendations change materially with style, duration, budget, and destination preferences", () => {
  const shortAdventure = rankTripRecommendations({ travelStyle: "adventure", duration: "weekend", budget: 50000 }, tourPackages, 3);
  const longAdventure = rankTripRecommendations({ travelStyle: "adventure", duration: "12-plus", budget: 90000 }, tourPackages, 3);
  const family = rankTripRecommendations({ travelStyle: "family", duration: "4-7", budget: 60000 }, tourPackages, 3);
  const lowBudget = rankTripRecommendations({ budget: 20000 }, tourPackages, 3);
  const kashmir = rankTripRecommendations({ destination: "kashmir" }, tourPackages, 3);

  assert.notDeepEqual(shortAdventure.map((result) => result.trip.id), longAdventure.map((result) => result.trip.id));
  assert.notDeepEqual(shortAdventure.map((result) => result.trip.id), family.map((result) => result.trip.id));
  assert.notDeepEqual(family.map((result) => result.trip.id), lowBudget.map((result) => result.trip.id));
  assert.equal(kashmir[0]?.trip.id, "kashmir-shogran-9-days");
  assert.ok(kashmir.every((result) => result.score > 0));
  assert.ok(lowBudget[0]?.score > 0);
  assert.ok(lowBudget[0]?.reasons.some((reason) => reason.criterion === "budget" && reason.type === "match"));
});

test("near matches retain factual mismatch reasons and honest on-request month wording", () => {
  const result = calculateTripFit({ budget: 20000, duration: "weekend", departureMonth: "july" }, tourPackages.find((trip) => trip.id === "kashmir-shogran-9-days"));

  assert.ok(result.reasons.some((reason) => reason.criterion === "budget" && reason.type === "mismatch"));
  assert.ok(result.reasons.some((reason) => reason.criterion === "duration" && reason.type === "mismatch"));
  assert.ok(result.reasons.some((reason) => reason.criterion === "departureMonth" && reason.type === "mismatch"));
  assert.ok(!result.reasons.some((reason) => reason.detail.includes("confirmed departure") && reason.type === "match"));
});

test("gorakh hill and moola chotok are unavailable in april through september", () => {
  const blockedMonths = ["april", "may", "june", "july", "august", "september"];

  for (const id of ["seasonal-53", "seasonal-54"]) {
    const trip = tourPackages.find((candidate) => candidate.id === id);
    assert.ok(trip, `missing canonical trip ${id}`);

    for (const month of blockedMonths) {
      const result = calculateTripFit({ departureMonth: month }, trip);
      assert.equal(result.matchedCriteria.includes("departureMonth"), false, `${id} should not be available in ${month}`);
      assert.ok(result.reasons.some((reason) => reason.criterion === "departureMonth" && reason.type === "mismatch"));
    }
  }
});
