import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { destinations, destinationDetailSlugs, destinationTourPageRedirects, tourMenu } from "../site";
import { featuredTourCards, indexableFeaturedTourRoutePaths } from "./featured-tour-cards";
import { getTourPackagesForDestination, getTourPackagesForRegion, tourPackages } from "./tour-packages";
import sitemap from "../../app/sitemap";

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

  assert.deepEqual(ids, expectedJourneyIds);
  assert.equal(new Set(ids).size, ids.length, "journey ids must be unique");
  assert.equal(new Set(titles).size, titles.length, "canonical journey titles must be unique");

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

test("the active destination registry has unique identities and complete editorial data", () => {
  const slugs = destinations.map((destination) => destination.slug);
  const names = destinations.map((destination) => destination.name.trim().toLowerCase());

  assert.equal(new Set(slugs).size, slugs.length, "destination slugs must be unique");
  assert.equal(new Set(names).size, names.length, "destination identities must be unique");

  for (const destination of destinations) {
    assert.ok(destination.slug.trim().length > 0);
    assert.ok(destination.name.trim().length > 0);
    assert.ok(destination.description.trim().length > 0);
    assert.ok(destination.bestTimeToVisit.trim().length > 0);
    assert.ok(destination.idealDuration.trim().length > 0);
    assert.ok(destination.bestFor.trim().length > 0);
    assert.ok(destination.journeyStyle.trim().length > 0);
    assert.ok(destination.highlights.length > 0);
    assert.ok(destination.tripHighlights.length > 0);
    assert.ok(destination.images.length > 0);
    assert.ok(destination.faqs.length > 0);
    assert.ok(existsSync(resolve(process.cwd(), "public", destination.image.slice(1))), `missing listing image for ${destination.slug}`);
    for (const image of destination.images) {
      assert.ok(existsSync(resolve(process.cwd(), "public", image.src.slice(1))), `missing gallery image for ${destination.slug}`);
    }
    if (destination.exploreImage) {
      assert.ok(existsSync(resolve(process.cwd(), "public", destination.exploreImage.slice(1))), `missing Explore image for ${destination.slug}`);
    }
  }
});

test("every active destination detail page is generated from the editorial registry", () => {
  const destinationPage = readFileSync(resolve(process.cwd(), "src/app/destinations/[slug]/page.tsx"), "utf8");
  const redirectSlugs = new Set(Object.keys(destinationTourPageRedirects));
  const detailSlugs = [...destinationDetailSlugs].filter((slug) => !redirectSlugs.has(slug)).sort();

  assert.match(destinationPage, /\.\.\.destinationDetailSlugs/);
  assert.deepEqual(detailSlugs, destinations.map((destination) => destination.slug).sort());
  assert.deepEqual(
    ["hunza", "skardu", "naran", "kashmir", "swat", "khaplu", "shogran", "ormara", "fairy-meadows", "minimerg"].sort(),
    destinations.map((destination) => destination.slug).sort(),
  );
});

test("every canonical package destination slug resolves through the exact slug lookup", () => {
  for (const tourPackage of tourPackages) {
    for (const destinationSlug of tourPackage.destinationSlugs) {
      assert.ok(
        getTourPackagesForDestination(destinationSlug).includes(tourPackage),
        `${tourPackage.id} should resolve for ${destinationSlug}`,
      );
    }
  }
});

test("gorakh and moola remain package-only while Fairy Meadows and Minimerg remain editorial-only", () => {
  const destinationSlugs = new Set(destinations.map((destination) => destination.slug));
  const params = new Set([...destinationDetailSlugs, ...Object.keys(destinationTourPageRedirects)]);

  for (const slug of ["gorakh", "moola"]) {
    assert.ok(!destinationSlugs.has(slug));
    assert.ok(destinationTourPageRedirects[slug as keyof typeof destinationTourPageRedirects]);
    assert.ok(params.has(slug));
    assert.ok(getTourPackagesForDestination(slug).length > 0);
  }

  for (const slug of ["fairy-meadows", "minimerg"]) {
    assert.ok(destinationSlugs.has(slug));
    assert.ok(params.has(slug));
    assert.deepEqual(getTourPackagesForDestination(slug), []);
  }
});

test("sitemap destination URLs are derived from the active registry only", () => {
  const destinationPaths = sitemap()
    .map((entry) => new URL(entry.url).pathname)
    .filter((pathname) => pathname.startsWith("/destinations/"))
    .sort();

  assert.deepEqual(destinationPaths, destinations.map((destination) => `/destinations/${destination.slug}`).sort());
  assert.ok(!destinationPaths.includes("/destinations/gorakh"));
  assert.ok(!destinationPaths.includes("/destinations/moola"));
});

test("homepage destination cards do not use a display-name package map", () => {
  const homepage = readFileSync(resolve(process.cwd(), "src/app/page.tsx"), "utf8");

  assert.ok(!homepage.includes("destinationPackageLinks"));
  assert.match(homepage, /href=\{`\/destinations\/\$\{destination\.slug\}`\}/);
  assert.match(homepage, /Best time to visit: \{destination\.bestTimeToVisit\}/);
  assert.match(homepage, /Ideal duration: \{destination\.idealDuration\}/);
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
