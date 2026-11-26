import assert from "node:assert/strict";
import { test } from "node:test";

import {
  CUSTOM_CITY_MINIMUM_NIGHTS,
  getCitiesWithOvernightStays,
  getCustomCityHotelLocation,
  getHotelStayLabel,
  getMinimumCustomCityNights,
} from "./custom-city-stays";
import { getHotelsByCity } from "./hotels";

test("uses the requested custom-city minimum nights", () => {
  assert.deepEqual(CUSTOM_CITY_MINIMUM_NIGHTS, {
    Skardu: 3,
    Hunza: 2,
    Astore: 3,
    Kashmir: 2,
    Swat: 2,
    "Fairy Meadows": 2,
    Shogran: 0,
    "Nathia Gali": 0,
    Murree: 0,
    "Malam Jabba": 0,
  });
  assert.equal(getMinimumCustomCityNights("Naran"), 1);
});

test("identifies zero-night day trips without removing them from selected cities", () => {
  assert.deepEqual(
    getCitiesWithOvernightStays(["Shogran", "Skardu", "Malam Jabba"], {
      Shogran: 0,
      Skardu: 3,
      "Malam Jabba": 0,
    }),
    ["Skardu"],
  );
});

test("defaults combined Shogran trips to Balakot and supports choosing Shogran", () => {
  assert.equal(getCustomCityHotelLocation("Shogran", ["Shogran", "Swat"]), "Balakot");
  assert.equal(getCustomCityHotelLocation("Shogran", ["Shogran"]), "Shogran");
  assert.equal(getCustomCityHotelLocation("Shogran", ["Shogran", "Swat"], "Shogran"), "Shogran");
  assert.equal(getCustomCityHotelLocation("Malam Jabba", ["Malam Jabba"]), "Swat");
  assert.equal(getHotelStayLabel("Shogran", "Balakot"), "Balakot stay for Shogran");
});

test("includes the requested Balakot hotels and room rates", () => {
  const hotels = getHotelsByCity("Balakot");
  const prices = Object.fromEntries(
    hotels.map((hotel) => [hotel.name, Object.fromEntries(hotel.rooms.map((room) => [room.name, room.price]))]),
  );

  assert.deepEqual(prices, {
    "Royal Shangrila": { Standard: 5000 },
    "Pine Track": { Standard: 5000, Deluxe: 12000, Executive: 25000 },
    "Pine Park by Agha": { Standard: 5000 },
    "Royal Park": { Standard: 5000 },
    "Dcozy Resort": { Deluxe: 12000 },
    "White Palace": { Deluxe: 12000 },
  });
});
