import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { destinationTourPageRedirects, tourMenu } from "../site";
import { featuredTourCards, indexableFeaturedTourRoutePaths } from "./featured-tour-cards";
import { getTourPackagesForDestination, getTourPackagesForRegion, tourPackages } from "./tour-packages";

const expectedJourneyIds = [
  "skardu-deosai-air-3-days",
  "skardu-deosai-basho-air-5-days",
  "skardu-khaplu-deosai-basho-air-7-days",
  "skardu-hunza-air-7-days",
  "ormara-beach-camping",
  "swat-kalam-shogran-10-days",
  "kashmir-shogran-9-days",
  "hunza-skardu-naran-12-days",
  "skardu-deosai-naran-10-days",
  "seasonal-11",
  "seasonal-53",
  "seasonal-54",
];

test("the canonical list contains exactly the 12 unique journeys with required source fields", () => {
  const ids = tourPackages.map((tourPackage) => tourPackage.id);
  const titles = tourPackages.map((tourPackage) => tourPackage.title);
  const images = tourPackages.map((tourPackage) => tourPackage.image);

  assert.deepEqual(ids, expectedJourneyIds);
  assert.equal(new Set(ids).size, ids.length, "journey ids must be unique");
  assert.equal(new Set(titles).size, titles.length, "canonical journey titles must be unique");
  assert.equal(new Set(images).size, images.length, "each journey must use a unique image");

  for (const tourPackage of tourPackages) {
    assert.ok(["northern", "southern"].includes(tourPackage.region));
    assert.ok(tourPackage.destinationSlugs.length > 0);
    assert.ok(tourPackage.routeStops.length > 0);
    assert.ok(tourPackage.description.trim().length > 0);
    assert.ok(tourPackage.image.startsWith("/"));
    assert.ok(existsSync(resolve(process.cwd(), "public", tourPackage.image.slice(1))), `missing image for ${tourPackage.id}`);
    assert.ok(Number.isFinite(tourPackage.pricePerPerson) && tourPackage.pricePerPerson > 0);
    assert.ok(Number.parseInt(tourPackage.duration, 10) > 0);
    assert.ok(tourPackage.travelStyles.length > 0);
    assert.ok(Array.isArray(tourPackage.departures));
    if (tourPackage.departureAvailability === "confirmed") assert.ok(tourPackage.departures.length > 0);
    const renderedJourneyText = [
      tourPackage.title,
      tourPackage.description,
      ...tourPackage.routeStops,
      ...(tourPackage.routeHighlights ?? []),
      ...(tourPackage.notes ?? []),
      ...(tourPackage.scheduleNote ? [tourPackage.scheduleNote] : []),
    ];
    assert.ok(
      renderedJourneyText.every((value) => !/\broute\s+route\b/i.test(value)),
      `${tourPackage.id} contains a duplicated route suffix`,
    );
  }
});

test("destination relationships are explicit and never fall back to unrelated packages", () => {
  for (const item of tourMenu.flatMap((group) => group.items)) {
    const matches = getTourPackagesForDestination(item.destinationSlug);
    assert.ok(matches.every((tourPackage) => tourPackage.destinationSlugs.includes(item.destinationSlug)));
  }

  for (const destinationSlug of ["moola", "gorakh", "ormara"]) {
    const matchingIds = getTourPackagesForDestination(destinationSlug).map((tourPackage) => tourPackage.id);
    assert.ok(matchingIds.length > 0, `${destinationSlug} should retain its canonical package relation`);
    assert.ok(!matchingIds.includes("swat-kalam-shogran-10-days"), `${destinationSlug} must not include the Swat journey`);
  }

  assert.deepEqual(getTourPackagesForDestination("unmapped-destination"), []);
});

test("the eight audited destinations resolve only their canonical journeys", () => {
  const expectedByDestination = {
    hunza: ["skardu-hunza-air-7-days", "hunza-skardu-naran-12-days"],
    skardu: [
      "skardu-deosai-air-3-days",
      "skardu-deosai-basho-air-5-days",
      "skardu-khaplu-deosai-basho-air-7-days",
      "skardu-hunza-air-7-days",
      "hunza-skardu-naran-12-days",
      "skardu-deosai-naran-10-days",
    ],
    naran: ["hunza-skardu-naran-12-days", "skardu-deosai-naran-10-days"],
    swat: ["swat-kalam-shogran-10-days"],
    kashmir: ["kashmir-shogran-9-days", "seasonal-11"],
    ormara: ["ormara-beach-camping"],
    gorakh: ["seasonal-53"],
    moola: ["seasonal-54"],
  };

  for (const [destinationSlug, expectedIds] of Object.entries(expectedByDestination)) {
    assert.deepEqual(
      getTourPackagesForDestination(destinationSlug).map((tourPackage) => tourPackage.id),
      expectedIds,
      `unexpected journey relationship for ${destinationSlug}`,
    );
  }
});

test("missing southern guide slugs redirect only to their explicit destination categories", () => {
  for (const [destinationSlug, href] of Object.entries(destinationTourPageRedirects)) {
    const category = tourMenu.flatMap((group) => group.items).find((item) => item.destinationSlug === destinationSlug);
    assert.equal(category?.href, href);
    const matches = getTourPackagesForDestination(destinationSlug);
    assert.ok(matches.length > 0);
    assert.ok(matches.every((tourPackage) => tourPackage.region === "southern"));
  }
});

test("southern and northern destination relations stay in their canonical regions", () => {
  const southernJourneyIds = ["ormara-beach-camping", "seasonal-53", "seasonal-54"];
  const northernStops = new Set(["Hunza", "Skardu", "Naran", "Kashmir", "Swat", "Kalam", "Shogran"]);
  for (const id of southernJourneyIds) {
    const tourPackage = tourPackages.find((item) => item.id === id);
    assert.ok(tourPackage, `missing ${id}`);
    assert.equal(tourPackage.region, "southern");
    assert.ok(!tourPackage.routeStops.some((stop) => northernStops.has(stop)), `${id} contains a northern route stop`);
  }

  assert.deepEqual(getTourPackagesForRegion("southern").map((item) => item.id), southernJourneyIds);
  assert.ok(getTourPackagesForRegion("northern").every((item) => item.region === "northern"));
  assert.equal(getTourPackagesForDestination("moola")[0]?.id, "seasonal-54");
  assert.equal(getTourPackagesForDestination("gorakh")[0]?.id, "seasonal-53");
  assert.equal(getTourPackagesForDestination("ormara")[0]?.id, "ormara-beach-camping");
});

test("every listed departure belongs to exactly one canonical journey", () => {
  const departures = tourPackages.flatMap((tourPackage) => tourPackage.departures);
  const departureIds = departures.map((departure) => departure.id);

  assert.equal(new Set(departureIds).size, departureIds.length, "departure ids must be unique");
  for (const departure of departures) {
    const owner = tourPackages.find((tourPackage) => tourPackage.id === departure.journeyId);
    assert.ok(owner, `orphan departure ${departure.id}`);
    assert.ok(owner.departures.some((record) => record.id === departure.id));
    assert.ok(departure.destinationSlugs.length > 0);
    assert.ok(departure.destinationSlugs.every((destinationSlug) => owner.destinationSlugs.includes(destinationSlug)));
    assert.ok(departure.label.trim().length > 0);
    assert.ok(Number.isFinite(departure.pricePerPerson) && departure.pricePerPerson > 0);
  }
});

test("overlapping featured routes project canonical journey facts", () => {
  const aliases = {
    "kashmir-taobat": "seasonal-11",
    "hunza-skardu": "hunza-skardu-naran-12-days",
  };

  for (const [slug, packageId] of Object.entries(aliases)) {
    const featuredCard = featuredTourCards.find((tour) => tour.slug === slug);
    const tourPackage = tourPackages.find((item) => item.id === packageId);
    assert.ok(featuredCard, `missing featured alias ${slug}`);
    assert.ok(tourPackage, `missing canonical journey ${packageId}`);
    assert.equal(featuredCard.canonicalPackageId, tourPackage.id);
    assert.equal(featuredCard.title, tourPackage.title);
    assert.equal(featuredCard.description, tourPackage.description);
    assert.equal(featuredCard.duration, tourPackage.duration);
    assert.equal(featuredCard.homeImage, tourPackage.image);
    assert.deepEqual(featuredCard.attractions, tourPackage.routeStops);
    assert.equal(featuredCard.priceFrom, `PKR ${tourPackage.pricePerPerson.toLocaleString()} per person`);
    assert.deepEqual(featuredCard.itinerary, []);
    assert.ok(!indexableFeaturedTourRoutePaths.includes(`/tours/featured/${slug}`));
  }
});
