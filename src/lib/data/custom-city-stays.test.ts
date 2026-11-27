import assert from "node:assert/strict";
import { test } from "node:test";

import {
  CUSTOM_CITY_MINIMUM_NIGHTS,
  getKashmirStayLocations,
  getCitiesWithOvernightStays,
  getCustomCityHotelLocation,
  getHotelStayLabel,
  getMinimumCustomCityNights,
  isTaobatAvailable,
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

test("requires Keran or Neelum on the first Kashmir night and limits Taobat to June through October", () => {
  assert.deepEqual(getKashmirStayLocations(1, 7), ["Keran", "Neelum"]);
  assert.deepEqual(getKashmirStayLocations(2, 5), ["Keran", "Neelum", "Sharda", "Arangkel"]);
  assert.deepEqual(getKashmirStayLocations(2, 6), ["Keran", "Neelum", "Sharda", "Arangkel", "Taobat"]);
  assert.equal(isTaobatAvailable(11), false);
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

test("includes the supplied Kashmir-area hotels and rates", () => {
  const pricesByArea = (area: string) =>
    Object.fromEntries(
      getHotelsByCity(area).map((hotel) => [
        hotel.name,
        Object.fromEntries(hotel.rooms.map((room) => [room.name, room.price])),
      ]),
    );

  assert.deepEqual(pricesByArea("Keran"), {
    "Keran Neelum Elites": { Standard: 5000, Deluxe: 12000 },
    "Keran Luxus": { Standard: 5000 },
    "Keran Retreat": { Deluxe: 12000 },
    "Keran Resort": { Deluxe: 12000 },
    "Keran Residency": { Standard: 5000 },
  });
  assert.deepEqual(pricesByArea("Neelum"), {
    "Green Village": { Standard: 5000 },
    "Cozy Cottage": { Deluxe: 12000 },
    "Selina Inn": { Standard: 5000 },
    "Swiss Wood Cottage": { Executive: 25000 },
    "Neelum Green Hills": { Standard: 5000 },
    "Gillani Guest House": { Standard: 5000 },
  });
  assert.deepEqual(pricesByArea("Arangkel"), {
    "State Continental": { Standard: 7000 },
    "Arangkel Residency": { Standard: 7000 },
    Khanabados: { Executive: 25000 },
    "Gul Palace": { Standard: 7000 },
    "1+ Corridor": { Standard: 7000 },
  });
  assert.deepEqual(pricesByArea("Taobat"), {
    "Greenland Guest House": { Standard: 7000 },
    "Neelum Resort Taobat": { Deluxe: 15000 },
    "River Chalet by State Continental": { Executive: 27000 },
    "Cedarwood Hotel": { Deluxe: 15000 },
  });
});
