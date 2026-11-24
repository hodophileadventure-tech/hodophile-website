import assert from "node:assert/strict";
import { test } from "node:test";

import { getHotelsByCity } from "./hotels";
import { getCustomRoadStopoverCities, getSeasonalSkarduStays } from "./seasonal-skardu-itinerary";
import { getTransportLocation } from "../transport/locations";

test("uses Chilas outbound and Besham return from May through November", () => {
  const expected = [
    { city: "Islamabad", nights: 2 },
    { city: "Chilas", nights: 1 },
    { city: "Skardu", nights: 4 },
    { city: "Besham", nights: 1 },
  ];

  for (const month of [5, 11]) {
    assert.deepEqual(
      getSeasonalSkarduStays(
        [
          { city: "Islamabad", nights: 2 },
          { city: "Chilas", nights: 1 },
          { city: "Skardu", nights: 4 },
          { city: "Naran", nights: 1 },
        ],
        "road",
        month,
      ),
      expected,
    );
  }
});

test("splits two off-season Naran stopovers into one night each without extending the package", () => {
  assert.deepEqual(
    getSeasonalSkarduStays([{ city: "Skardu", nights: 7 }], "road", 12),
    [
      { city: "Naran (Outbound)", nights: 1 },
      { city: "Skardu", nights: 5 },
      { city: "Naran (Return)", nights: 1 },
    ],
  );
});

test("uses Naran outbound and return from December through April", () => {
  const expected = [
    { city: "Islamabad", nights: 2 },
    { city: "Naran (Outbound)", nights: 1 },
    { city: "Skardu", nights: 4 },
    { city: "Naran (Return)", nights: 1 },
  ];

  for (const month of [12, 4]) {
    assert.deepEqual(
      getSeasonalSkarduStays(
        [
          { city: "Islamabad", nights: 2 },
          { city: "Chilas", nights: 1 },
          { city: "Skardu", nights: 4 },
          { city: "Naran", nights: 1 },
        ],
        "road",
        month,
      ),
      expected,
    );
  }
});

test("adds both off-season Naran stops when the original route only has one", () => {
  assert.deepEqual(
    getSeasonalSkarduStays(
      [
        { city: "Islamabad", nights: 0 },
        { city: "Skardu", nights: 3 },
        { city: "Hunza", nights: 2 },
        { city: "Naran", nights: 1 },
      ],
      "road",
      12,
    ),
    [
      { city: "Islamabad", nights: 0 },
      { city: "Naran (Outbound)", nights: 1 },
      { city: "Skardu", nights: 2 },
      { city: "Hunza", nights: 2 },
      { city: "Naran (Return)", nights: 1 },
    ],
  );
});

test("begins air packages at Skardu and moves excluded transit nights into Skardu", () => {
  assert.deepEqual(
    getSeasonalSkarduStays(
      [
        { city: "Islamabad", nights: 2 },
        { city: "Chilas", nights: 1 },
        { city: "Skardu", nights: 4 },
        { city: "Naran", nights: 1 },
      ],
      "air",
      7,
    ),
    [{ city: "Skardu", nights: 8 }],
  );
});

test("provides the configured Besham room rates", () => {
  assert.deepEqual(
    getHotelsByCity("Besham").map((hotel) => [hotel.name, hotel.rooms[0]?.name, hotel.rooms[0]?.price]),
    [
      ["Ramada Hotel Besham", "Standard Room", 5000],
      ["Besham Inn", "Deluxe Room", 12000],
      ["Hilton Besham", "Executive Room", 20000],
    ],
  );
  assert.equal(getTransportLocation("Besham")?.name, "Besham");
});

test("adds the season-appropriate stopovers to custom road itineraries", () => {
  assert.deepEqual(getCustomRoadStopoverCities(["Hunza", "Skardu"], "road", 5), ["Chilas (Arrival)", "Besham (Return)"]);
  assert.deepEqual(getCustomRoadStopoverCities(["Hunza", "Skardu"], "road", 11), ["Chilas (Arrival)", "Besham (Return)"]);
  assert.deepEqual(getCustomRoadStopoverCities(["Hunza", "Skardu"], "road", 12), ["Naran (Outbound)", "Naran (Return)"]);
  assert.deepEqual(getCustomRoadStopoverCities(["Hunza", "Skardu"], "road", 4), ["Naran (Outbound)", "Naran (Return)"]);
});

test("does not duplicate selected seasonal stops or add road stopovers to air trips", () => {
  assert.deepEqual(getCustomRoadStopoverCities(["Naran", "Skardu"], "road", 7), ["Chilas (Arrival)", "Besham (Return)"]);
  assert.deepEqual(getCustomRoadStopoverCities(["Naran (Outbound)", "Naran (Return)", "Skardu"], "road", 1), []);
  assert.deepEqual(getCustomRoadStopoverCities(["Chilas", "Besham", "Hunza"], "road", 7), []);
  assert.deepEqual(getCustomRoadStopoverCities(["Hunza", "Skardu"], "air", 7), []);
  assert.deepEqual(getCustomRoadStopoverCities(["Swat"], "road", 7), []);
});
