import assert from "node:assert/strict";
import test from "node:test";
import { generateItinerary, getItineraryAttractionRouteGroups } from "./itinerary-generator";
import { decodeBase64Json, encodeBase64Json } from "./base64-json";

const routeTrip = {
  selectedCities: ["Hunza", "Skardu"],
  nightsByCity: { Hunza: 3, Skardu: 4 },
  routeSequence: ["Islamabad", "Hunza", "Skardu"],
  tripDate: "2026-07-10",
  startingPoint: "Islamabad",
  travelMode: "road" as const,
  pace: "balanced" as const,
  durationDays: 8,
  hotelCategory: "standard",
  vehicleName: "Toyota Corolla",
  multiCityHotels: {
    Hunza: { hotelId: "eagle-nest-hunza", roomId: "Standard" },
    Skardu: { hotelId: "hispar-hotel-skardu", roomId: "Standard" },
  },
  routeLegs: [
    { from: "Islamabad", to: "Hunza", distanceKm: 600, durationSeconds: 36_000 },
    { from: "Hunza", to: "Skardu", distanceKm: 450, durationSeconds: 25_200 },
  ],
  presetDays: [{ day: "Day 1", title: "Islamabad to Hunza", description: "Selected package route details." }],
};

test("generates the exact selected duration, route order, and hotel allocation", () => {
  const itinerary = generateItinerary(routeTrip);

  assert.equal(itinerary.days.length, 8);
  assert.equal(itinerary.durationNights, 7);
  assert.equal(itinerary.days[0].description, "Selected package route details.");
  assert.deepEqual(itinerary.days.slice(0, 3).map((day) => day.overnight?.hotelName), [
    "Eagle Nest Hunza",
    "Eagle Nest Hunza",
    "Eagle Nest Hunza",
  ]);
  assert.deepEqual(itinerary.days.slice(3, 7).map((day) => day.overnight?.hotelName), [
    "Hispar Hotel Skardu",
    "Hispar Hotel Skardu",
    "Hispar Hotel Skardu",
    "Hispar Hotel Skardu",
  ]);
  assert.equal(itinerary.days[7].overnight, undefined);
  assert.ok(itinerary.days[0].morning.some((activity) => activity.title.includes("Islamabad to Hunza")));
  const scheduledTitles = itinerary.days.flatMap((day) =>
    [...day.morning, ...day.afternoon, ...day.evening].map((activity) => activity.title),
  );
  assert.ok(scheduledTitles.some((title) => title.includes("Baltit Fort")));
  assert.ok(!scheduledTitles.some((title) => title.includes("Saif-ul-Malook")));
});

test("pace changes the number of attractions without repeating them", () => {
  const base = {
    selectedCities: ["Skardu"],
    nightsByCity: { Skardu: 1 },
    routeSequence: ["Skardu"],
    tripDate: "2026-07-10",
    startingPoint: "Skardu",
    travelMode: "road" as const,
    durationDays: 2,
    attractionRouteLegs: [
      { fromAttractionId: "skardu-shangrila", toAttractionId: "skardu-upper-kachura", distanceKm: 5, durationSeconds: 1_200 },
      { fromAttractionId: "skardu-upper-kachura", toAttractionId: "skardu-shigar-fort", distanceKm: 20, durationSeconds: 1_200 },
      { fromAttractionId: "skardu-shigar-fort", toAttractionId: "skardu-sarfaranga", distanceKm: 12, durationSeconds: 1_200 },
    ],
  };
  const getAttractions = (pace: "relaxed" | "balanced" | "adventure") =>
    generateItinerary({ ...base, pace }).days.flatMap((day) =>
      [...day.morning, ...day.afternoon, ...day.evening]
        .filter((activity) => activity.kind === "sightseeing")
        .map((activity) => activity.title),
    );
  const relaxed = getAttractions("relaxed");
  const balanced = getAttractions("balanced");
  const adventure = getAttractions("adventure");

  assert.ok(relaxed.length < balanced.length);
  assert.ok(balanced.length < adventure.length);
  assert.equal(new Set(adventure).size, adventure.length);
});

test("uses verified local drive estimates and credits OpenStreetMap coordinates", () => {
  const input = {
    selectedCities: ["Hunza"],
    nightsByCity: { Hunza: 2 },
    routeSequence: ["Hunza"],
    tripDate: "2026-07-10",
    startingPoint: "Hunza",
    travelMode: "road" as const,
    pace: "balanced" as const,
    attractionRouteLegs: [{
      fromAttractionId: "hunza-baltit-fort",
      toAttractionId: "hunza-altit-fort",
      distanceKm: 4.2,
      durationSeconds: 900,
    }],
  };
  const itinerary = generateItinerary(input);
  const activities = itinerary.days.flatMap((day) =>
    [...day.morning, ...day.afternoon, ...day.evening],
  );
  const localDrive = activities.find((activity) =>
    activity.title === "Travel: Baltit Fort to Altit Fort",
  );

  assert.equal(localDrive?.distanceKm, 4.2);
  assert.equal(localDrive?.drivingMinutes, 15);
  assert.equal(itinerary.usesOpenStreetMap, true);
  assert.ok(itinerary.notes.some((note) => note.includes("OpenStreetMap contributors")));
  assert.ok(getItineraryAttractionRouteGroups(input).some((group) =>
    group.attractionIds.includes("hunza-baltit-fort") &&
    group.attractionIds.includes("hunza-altit-fort"),
  ));
});

test("does not invent local drive times when mapped routes are unavailable", () => {
  const itinerary = generateItinerary({
    selectedCities: ["Hunza"],
    nightsByCity: { Hunza: 2 },
    routeSequence: ["Hunza"],
    tripDate: "2026-07-10",
    startingPoint: "Hunza",
    travelMode: "road",
    pace: "balanced",
  });
  const activities = itinerary.days.flatMap((day) =>
    [...day.morning, ...day.afternoon, ...day.evening],
  );

  assert.ok(itinerary.notes.some((note) => note.includes("Local attraction drive times are not available")));
  assert.ok(!activities.some((activity) =>
    activity.title === "Travel: Baltit Fort to Altit Fort",
  ));
});

test("uses leisure on extra days without repeating a destination's attractions", () => {
  const itinerary = generateItinerary({
    selectedCities: ["Malam Jabba"],
    nightsByCity: { "Malam Jabba": 3 },
    routeSequence: ["Malam Jabba"],
    tripDate: "2026-07-10",
    startingPoint: "Malam Jabba",
    travelMode: "road",
    pace: "balanced",
  });
  const attractions = itinerary.days.flatMap((day) =>
    [...day.morning, ...day.afternoon, ...day.evening]
      .filter((activity) => activity.kind === "sightseeing")
      .map((activity) => activity.title),
  );

  assert.equal(itinerary.days.length, 4);
  assert.deepEqual(attractions, ["Malam Jabba"]);
  assert.ok(itinerary.days.slice(1).some((day) =>
    [...day.morning, ...day.afternoon, ...day.evening]
      .some((activity) => activity.kind === "leisure"),
  ));
});

test("schedules a selected optional jeep experience on a local exploration day", () => {
  const itinerary = generateItinerary({
    selectedCities: ["Hunza"],
    nightsByCity: { Hunza: 2 },
    routeSequence: ["Hunza"],
    tripDate: "2026-07-10",
    startingPoint: "Hunza",
    travelMode: "road",
    pace: "balanced",
    jeepRideNames: ["Hunza jeep ride"],
  });
  const optionalActivities = itinerary.days.flatMap((day) =>
    [...day.morning, ...day.afternoon, ...day.evening]
      .filter((activity) => activity.kind === "optional")
      .map((activity) => activity.title),
  );

  assert.deepEqual(optionalActivities, ["Hunza jeep ride"]);
  assert.equal(itinerary.days[1].overnight?.location, "Hunza");
});

test("keeps the fixed package day count and places the return journey on its final day", () => {
  const itinerary = generateItinerary({
    selectedCities: ["Skardu"],
    nightsByCity: { Skardu: 3 },
    routeSequence: ["Islamabad", "Skardu"],
    tripDate: "2026-07-10",
    startingPoint: "Islamabad",
    travelMode: "road",
    pace: "balanced",
    durationDays: 6,
    packageItinerary: "Day 6: Return to Islamabad",
  });

  assert.equal(itinerary.days.length, 6);
  assert.equal(itinerary.durationNights, 3);
  assert.ok(itinerary.days[5].title.includes("Return to Islamabad"));
  assert.ok(itinerary.days[5].morning.some((activity) => activity.title.includes("Skardu to Islamabad")));
  assert.ok(!itinerary.days[3].title.includes("Return journey"));
});

test("filters Taobat sightseeing by season and uses the selected Kashmir hotel per night", () => {
  const winterPlan = generateItinerary({
    selectedCities: ["Taobat"],
    nightsByCity: { Taobat: 1 },
    routeSequence: ["Taobat"],
    tripDate: "2026-01-10",
    startingPoint: "Taobat",
    travelMode: "road",
    pace: "balanced",
  });
  assert.ok(!winterPlan.days[0].morning.some((activity) => activity.title === "Taobat Valley"));

  const summerPlan = generateItinerary({
    selectedCities: ["Kashmir"],
    nightsByCity: { Kashmir: 2 },
    routeSequence: ["Islamabad", "Kashmir"],
    tripDate: "2026-07-10",
    startingPoint: "Islamabad",
    travelMode: "road",
    pace: "balanced",
    customCityHotelStays: [
      { city: "Kashmir", location: "Keran", hotelId: "keran-neelum-elites", roomId: "Standard", nights: 1 },
      { city: "Kashmir", location: "Taobat", hotelId: "greenland-guest-house-taobat", roomId: "Standard", nights: 1 },
    ],
  });

  assert.equal(summerPlan.days[0].overnight?.hotelName, "Keran Neelum Elites");
  assert.equal(summerPlan.days[0].overnight?.location, "Keran");
  assert.equal(summerPlan.days[1].overnight?.hotelName, "Greenland Guest House");
  assert.equal(summerPlan.days[1].overnight?.location, "Taobat");
  assert.ok(summerPlan.days[1].morning.some((activity) => activity.title === "Taobat Valley"));
});

test("air itineraries use Skardu as the ground hub and do not route from the customer's departure city", () => {
  const itinerary = generateItinerary({
    selectedCities: ["Hunza"],
    nightsByCity: { Hunza: 1 },
    routeSequence: ["Skardu", "Hunza"],
    tripDate: "2026-07-10",
    startingPoint: "Islamabad",
    travelMode: "air",
    pace: "balanced",
    routeLegs: [{ from: "Skardu", to: "Hunza", distanceKm: 250, durationSeconds: null }],
  });
  const travelTitles = itinerary.days.flatMap((day) =>
    [...day.morning, ...day.afternoon, ...day.evening]
      .filter((activity) => activity.kind === "travel")
      .map((activity) => activity.title),
  );

  assert.ok(travelTitles.some((title) => title.includes("Skardu to Hunza")));
  assert.ok(!travelTitles.some((title) => title.includes("Islamabad")));
  assert.ok(itinerary.notes.some((note) => note.includes("Air tickets")));
  assert.ok(itinerary.days[0].morning.some((activity) => activity.description.includes("Driving-time estimate is unavailable")));
});

test("base64 JSON round-trips the Unicode itinerary content", () => {
  const source = { title: "Day 01 · Hunza — Skardu", details: "Traveler’s itinerary" };
  assert.deepEqual(decodeBase64Json(encodeBase64Json(source)), source);
});
