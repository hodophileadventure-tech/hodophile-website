import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { destinationTourPageRedirects, tourMenu } from "../site";
import { featuredTourCards, getFeaturedTourBySlug, indexableFeaturedTourRoutePaths } from "./featured-tour-cards";
import { getPackagePath, packageRouteEntries, packageRouteRedirects } from "./package-routes";
import { routes } from "./routes";
import { tourDiscoveryIdeas } from "./tour-discovery-ideas";
import { getHeritageTourPackages, getTourPackagesForDestination, getTourPackagesForRegion, tourPackages } from "./tour-packages";

const expectedJourneyIds = [
  "skardu-deosai-air-3-days",
  "skardu-basho-6-days",
  "skardu-khaplu-deosai-basho-air-7-days",
  "skardu-hunza-air-7-days",
  "ormara-beach-camping",
  "swat-kalam-shogran-10-days",
  "swat-kalam-malam-jabba-khanpur-4-days",
  "kashmir-shogran-9-days",
  "hunza-skardu-naran-12-days",
  "skardu-deosai-naran-10-days",
  "seasonal-11",
  "seasonal-53",
  "seasonal-54",
];

test("the canonical list contains exactly the 13 unique journeys with required source fields", () => {
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
    assert.ok(tourPackage.experiences.length > 0);
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

test("all package URLs use unique name-based slugs and redirect previous ID URLs", () => {
  const packageableIdeas = tourDiscoveryIdeas.filter((idea) => !idea.detailHref);
  const expectedPackageCount = tourPackages.length + 10 + packageableIdeas.length;

  assert.equal(packageRouteEntries.length, expectedPackageCount);
  assert.equal(new Set(packageRouteEntries.map((entry) => entry.id)).size, expectedPackageCount);
  assert.equal(new Set(packageRouteEntries.map((entry) => entry.slug)).size, expectedPackageCount);
  for (const idea of packageableIdeas) {
    assert.ok(packageRouteEntries.some((entry) => entry.id === idea.id), `${idea.id} needs a detail route`);
  }
  assert.equal(getPackagePath("skardu-basho-6-days"), "/packages/skardu-and-basho-by-road-6-days");
  assert.equal(getPackagePath("hunza-skardu-naran-12-days"), "/packages/skardu-and-hunza");
  assert.equal(getPackagePath("ready-kashmir"), "/packages/3-days-kashmir-ready-to-book");
  assert.ok(packageRouteRedirects.some(
    (redirect) =>
      redirect.source === "/packages/skardu-basho-6-days" &&
      redirect.destination === "/packages/skardu-and-basho-by-road-6-days",
  ));
  assert.ok(packageRouteRedirects.some(
    (redirect) =>
      redirect.source === "/packages/skardu-deosai-basho-air-5-days" &&
      redirect.destination === "/packages/skardu-and-basho-by-road-6-days",
  ));
});

test("the heritage collection includes only packages with explicit historic itinerary stops", () => {
  const heritagePackages = getHeritageTourPackages();

  assert.deepEqual(
    heritagePackages.map((tourPackage) => tourPackage.id),
    [
      "skardu-deosai-air-3-days",
      "skardu-basho-6-days",
      "skardu-khaplu-deosai-basho-air-7-days",
      "kashmir-shogran-9-days",
      "hunza-skardu-naran-12-days",
      "skardu-deosai-naran-10-days",
    ],
  );

  for (const tourPackage of heritagePackages) {
    const listedHistoricSites = [
      ...(tourPackage.routeHighlights ?? []),
      ...(tourPackage.itinerary ?? []).map((day) => day.description),
    ].join(" ");
    assert.match(listedHistoricSites, /\b(?:fort|mosque|bazaar)\b/i, `${tourPackage.id} needs a named historic stop`);
  }
});

test("the tour discovery catalog restores unique historical route ideas without stale prices or dates", () => {
  const journeys = [...tourPackages, ...tourDiscoveryIdeas];
  const ids = journeys.map((journey) => journey.id);
  const images = journeys.map((journey) => journey.image);
  const routeDurations = journeys.map((journey) =>
    `${[...journey.destinationSlugs].sort().join(",")}|${[...journey.routeStops].sort().join(",")}|${Number.parseInt(journey.duration, 10)}`,
  );

  assert.equal(journeys.length, 22);
  assert.equal(new Set(ids).size, ids.length, "journey ids must be unique across catalog and ideas");
  assert.equal(new Set(images).size, images.length, "each journey must use a unique image");
  assert.equal(new Set(routeDurations).size, routeDurations.length, "the same destination set and duration must not be listed twice");

  for (const idea of tourDiscoveryIdeas) {
    assert.ok(idea.title.trim().length > 0);
    assert.ok(idea.description.trim().length > 0);
    assert.ok(idea.destinationSlugs.length > 0);
    assert.ok(idea.routeStops.length > 0);
    assert.ok(idea.experiences.length > 0);
    assert.ok(idea.routeHighlights.length > 0);
    assert.ok(idea.bestFor.trim().length > 0);
    assert.ok(existsSync(resolve(process.cwd(), "public", idea.image.slice(1))), `missing image for ${idea.id}`);
    if (idea.id === "hunza-naltar-10-days") {
      assert.equal(idea.pricePerPerson, 39000);
      assert.equal(idea.detailHref, "/tours/featured/hunza-naltar");
    } else if (idea.id === "swat-kalam-malam-jabba-8-days") {
      assert.equal(idea.pricePerPerson, 33700);
      assert.equal(idea.pricingGroups?.length, 2);
    } else {
      assert.ok(!("pricePerPerson" in idea), `${idea.id} must not expose historical pricing`);
    }
    assert.ok(!/\b(?:departure|dates?)\s*[:(]/i.test(idea.title), `${idea.id} must not include an old departure date`);
  }
});

test("the new Swat and Neelum Valley posters have complete, name-based package details", () => {
  const swat = tourDiscoveryIdeas.find((idea) => idea.id === "swat-kalam-malam-jabba-8-days");
  const kashmir = tourDiscoveryIdeas.find((idea) => idea.id === "kashmir-arangkel-3-days");

  assert.ok(swat);
  assert.equal(swat.title, "Swat, Kalam & Malam Jabba · 8 Days");
  assert.equal(swat.duration, "8 Days / 7 Nights");
  assert.equal(swat.pricePerPerson, 33700);
  assert.deepEqual(swat.itinerary?.map((day) => day.day), Array.from({ length: 8 }, (_, index) => `Day ${index + 1}`));
  assert.deepEqual(swat.pricingGroups?.map((group) => group.rows.map((row) => row.price)), [
    ["PKR 33,700 per person", "PKR 35,700 per person", "PKR 39,500 per person", "PKR 58,700 per person"],
    ["PKR 36,900 per person", "PKR 114,000 per person", "PKR 49,000 per person", "PKR 114,000 per couple"],
  ]);
  assert.ok(swat.includes?.includes("Jeep ride to Mahodand Lake"));
  assert.equal(getPackagePath(swat.id), "/packages/swat-kalam-and-malam-jabba-8-days");

  assert.ok(kashmir);
  assert.equal(kashmir.title, "Neelum Valley, Kel & Arang Kel");
  assert.equal(kashmir.duration, "3 Days / 2 Nights");
  assert.equal(kashmir.pricePerPerson, undefined);
  assert.deepEqual(kashmir.itinerary?.map((day) => day.day), ["Day 1", "Day 2", "Day 3"]);
  assert.ok(kashmir.includes?.includes("Luxury transport"));
  assert.equal(getPackagePath(kashmir.id), "/packages/neelum-valley-kel-and-arang-kel");
});

test("the Skardu and Basho package matches its six-day road itinerary and listed price", () => {
  const journey = tourPackages.find((tourPackage) => tourPackage.id === "skardu-basho-6-days");
  const sourceRoute = routes.find((route) => route.id === "skardu-basho-6days");

  assert.ok(journey);
  assert.ok(sourceRoute?.dayByDayItinerary);
  assert.equal(journey.title, "Skardu & Basho by Road · 6 Days");
  assert.equal(journey.duration, "6 Days / 5 Nights");
  assert.equal(journey.pricePerPerson, 55000);
  assert.equal(journey.priceOnRequest, undefined);
  assert.deepEqual(journey.itinerary, sourceRoute.dayByDayItinerary);
  assert.ok(journey.transport?.some((item) => /road transport/i.test(item)));
  assert.ok(!journey.excludes?.some((item) => /air tickets|airport/i.test(item)));
});

test("the seven-day Skardu and Hunza by-air tour is listed at PKR 55,000 per person", () => {
  const journey = tourPackages.find((tourPackage) => tourPackage.id === "skardu-hunza-air-7-days");

  assert.ok(journey);
  assert.equal(journey.title, "Skardu & Hunza by Air");
  assert.equal(journey.duration, "7 Days");
  assert.equal(journey.pricePerPerson, 55000);
});

test("the eight-day Skardu and Hunza road tour uses the confirmed PKR 55,000 rate", () => {
  const journey = tourPackages.find((tourPackage) => tourPackage.id === "hunza-skardu-naran-12-days");

  assert.ok(journey);
  assert.equal(journey.duration, "8 Days / 7 Nights");
  assert.equal(journey.pricePerPerson, 55000);
});

test("the Naran, Hunza, and Naltar listing uses its detailed tour page and listed group rate", () => {
  const idea = tourDiscoveryIdeas.find((item) => item.id === "hunza-naltar-10-days");
  const detail = getFeaturedTourBySlug("hunza-naltar");

  assert.ok(idea);
  assert.ok(detail);
  assert.equal(idea.title, detail.title);
  assert.equal(idea.pricePerPerson, 39000);
  assert.equal(idea.detailHref, "/tours/featured/hunza-naltar");
  assert.equal(detail.pricingGroups?.[1]?.rows[0]?.price, "Rs. 39,000");
  assert.equal(detail.itinerary.length, 10);
});

test("the four-day Swat, Kalam, and Malam Jabba package uses the supplied itinerary and rate", () => {
  const journey = tourPackages.find((tourPackage) => tourPackage.id === "swat-kalam-malam-jabba-khanpur-4-days");

  assert.ok(journey);
  assert.equal(journey.duration, "4 Days / 3 Nights");
  assert.equal(journey.pricePerPerson, 28000);
  assert.equal(journey.priceOnRequest, undefined);
  assert.deepEqual(journey.itinerary?.map((day) => day.day), ["Day 1", "Day 2", "Day 3", "Day 4"]);
  assert.ok(journey.includes?.includes("Breakfast"));
  assert.ok(journey.excludes?.some((item) => /chairlift.*zipline/i.test(item)));
  assert.ok(journey.excludes?.some((item) => /Khanpur Dam.*activities/i.test(item)));
});

test("Ormara Beach Night Camping uses its dedicated beach-camping image", () => {
  const journey = tourPackages.find((tourPackage) => tourPackage.id === "ormara-beach-camping");

  assert.ok(journey);
  assert.equal(journey.image, "/images/package-cards/images__tour-packages__ormara-beach-camping.png");
});

test("provided Ormara and Skardu-Deosai-Naran itineraries match their listed trip durations", () => {
  const expectedItineraryDays = {
    "ormara-beach-camping": 2,
    "skardu-deosai-naran-10-days": 10,
  };

  for (const [journeyId, dayCount] of Object.entries(expectedItineraryDays)) {
    const journey = tourPackages.find((tourPackage) => tourPackage.id === journeyId);
    assert.ok(journey, `missing journey ${journeyId}`);
    assert.equal(journey.itinerary?.length, dayCount, `${journeyId} should list every itinerary day`);
    assert.deepEqual(
      journey.itinerary?.map((day) => day.day),
      Array.from({ length: dayCount }, (_, index) => `Day ${index + 1}`),
    );
  }
});

test("poster-matched packages use the supplied names, durations, itinerary, and current price status", () => {
  const posterJourneys = [
    { id: "skardu-deosai-air-3-days", title: "Skardu, Deosai & Naran by Road", days: 6, priceOnRequest: true },
    { id: "skardu-basho-6-days", title: "Skardu & Basho by Road · 6 Days", days: 6, priceOnRequest: undefined },
    { id: "swat-kalam-shogran-10-days", title: "Swat, Kalam, Malam Jabba, Balakot & Shogran", days: 6, priceOnRequest: undefined },
    { id: "kashmir-shogran-9-days", title: "Kashmir, Shogran & Murree", days: 6, priceOnRequest: true },
    { id: "hunza-skardu-naran-12-days", title: "Skardu & Hunza", days: 8, priceOnRequest: true },
  ];

  for (const expected of posterJourneys) {
    const journey = tourPackages.find((tourPackage) => tourPackage.id === expected.id);
    assert.ok(journey, `missing journey ${expected.id}`);
    assert.equal(journey.title, expected.title);
    assert.ok(journey.duration.startsWith(`${expected.days} Days`));
    assert.equal(journey.itinerary?.length, expected.days);
    assert.equal(journey.priceOnRequest, expected.priceOnRequest);
  }

  const swatShogranJourney = tourPackages.find((tourPackage) => tourPackage.id === "swat-kalam-shogran-10-days");
  assert.ok(swatShogranJourney);
  assert.equal(swatShogranJourney.pricePerPerson, 40000);
  assert.equal(swatShogranJourney.duration, "6 Days / 5 Nights");
  assert.deepEqual(swatShogranJourney.itinerary?.map((day) => day.day), Array.from({ length: 6 }, (_, index) => `Day ${index + 1}`));

  const pricedPosterJourney = tourPackages.find((tourPackage) => tourPackage.id === "skardu-deosai-naran-10-days");
  assert.ok(pricedPosterJourney);
  assert.equal(pricedPosterJourney.priceOnRequest, undefined);
  assert.equal(pricedPosterJourney.pricePerPerson, 47500);
  assert.equal(pricedPosterJourney.priceWithoutIslamabadStay, 43500);
  assert.equal(pricedPosterJourney.couplePrice, 109000);
  assert.deepEqual(pricedPosterJourney.itinerary?.map((day) => day.day), Array.from({ length: 10 }, (_, index) => `Day ${index + 1}`));
});

test("Gorakh Hill and Moola Chotok remain without unprovided day-by-day itineraries", () => {
  for (const journeyId of ["seasonal-53", "seasonal-54"]) {
    const journey = tourPackages.find((tourPackage) => tourPackage.id === journeyId);
    assert.ok(journey, `missing journey ${journeyId}`);
    assert.equal(journey.itinerary, undefined);
  }
});

test("Kashmir Arang Kel and Taobat follows the supplied five-day poster itinerary", () => {
  const journey = tourPackages.find((tourPackage) => tourPackage.id === "seasonal-11");

  assert.ok(journey);
  assert.equal(journey.title, "Kashmir with Arang Kel & Taobat");
  assert.equal(journey.duration, "5 Days");
  assert.equal(journey.itinerary?.length, 5);
  assert.deepEqual(
    journey.itinerary?.map((day) => day.day),
    ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
  );
  assert.deepEqual(journey.routeStops, ["Islamabad", "Sharda", "Kel", "Arang Kel", "Taobat", "Keran", "Kutton Waterfall"]);
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
      "skardu-basho-6-days",
      "skardu-khaplu-deosai-basho-air-7-days",
      "skardu-hunza-air-7-days",
      "hunza-skardu-naran-12-days",
      "skardu-deosai-naran-10-days",
    ],
    naran: ["skardu-deosai-air-3-days", "hunza-skardu-naran-12-days", "skardu-deosai-naran-10-days"],
    swat: ["swat-kalam-shogran-10-days", "swat-kalam-malam-jabba-khanpur-4-days"],
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
    assert.ok(featuredCard.priceFrom.includes(`PKR ${tourPackage.pricePerPerson.toLocaleString()} per person`));
    assert.deepEqual(featuredCard.itinerary, tourPackage.itinerary ?? []);
    assert.ok(!indexableFeaturedTourRoutePaths.includes(`/tours/featured/${slug}`));
  }
});
