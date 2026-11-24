export interface CityStay {
  city: string;
  nights: number;
}

const ROAD_STOPOVER_CITIES = new Set(["Naran", "Chilas", "Besham"]);
const CUSTOM_SKARDU_ROUTE_CITIES = new Set(["Hunza", "Skardu", "Fairy Meadows", "Astore"]);

function getBaseCity(city: string): string {
  return city.trim().replace(/\s+\([^)]*\)$/, "");
}

export function getCustomRoadStopoverCities(
  destinations: readonly string[],
  travelMode: "road" | "air",
  month: number,
): string[] {
  if (
    travelMode === "air" ||
    !destinations.some((city) => CUSTOM_SKARDU_ROUTE_CITIES.has(getBaseCity(city)))
  ) {
    return [];
  }

  const selectedCities = new Set(destinations.map(getBaseCity));
  if (month >= 5 && month <= 11) {
    return [
      ...(destinations.filter((city) => getBaseCity(city) === "Naran").length >= 1 ? [] : ["Naran (Outbound)"]),
      ...(destinations.filter((city) => getBaseCity(city) === "Naran").length >= 2 ? [] : ["Naran (Return)"]),
    ];
  }

  return [
    ...(selectedCities.has("Chilas") ? [] : ["Chilas (Arrival)"]),
    ...(selectedCities.has("Besham") ? [] : ["Besham (Return)"]),
  ];
}

function addNightsToSkardu(stays: CityStay[], nights: number): CityStay[] {
  if (nights === 0) return stays;

  return stays.map((stay) =>
    stay.city === "Skardu"
      ? { ...stay, nights: Math.max(0, stay.nights + nights) }
      : stay,
  );
}

export function getSeasonalSkarduStays(
  stays: readonly CityStay[],
  travelMode: "road" | "air",
  month: number,
): CityStay[] {
  if (!stays.some((stay) => stay.city === "Skardu")) {
    return stays.map((stay) => ({ ...stay }));
  }

  const islamabadStays = stays.filter((stay) => stay.city === "Islamabad");
  const stopovers = stays.filter((stay) => ROAD_STOPOVER_CITIES.has(getBaseCity(stay.city)));
  const destinationStays = stays.filter(
    (stay) => stay.city !== "Islamabad" && !ROAD_STOPOVER_CITIES.has(getBaseCity(stay.city)),
  );

  if (travelMode === "air") {
    const nightsToReassign = stays
      .filter((stay) => stay.city === "Islamabad" || ROAD_STOPOVER_CITIES.has(getBaseCity(stay.city)))
      .reduce((total, stay) => total + stay.nights, 0);

    return addNightsToSkardu(destinationStays, nightsToReassign);
  }

  const existingStopoverNights = stopovers.reduce((total, stay) => total + stay.nights, 0);
  const adjustedDestinations = addNightsToSkardu(destinationStays, existingStopoverNights - 2);

  if (month >= 5 && month <= 11) {
    return [
      ...islamabadStays,
      { city: "Naran (Outbound)", nights: 1 },
      ...adjustedDestinations,
      { city: "Naran (Return)", nights: 1 },
    ];
  }

  const chilasStay = stopovers.find((stay) => getBaseCity(stay.city) === "Chilas") ?? { city: "Chilas", nights: 1 };
  const beshamStay = stopovers.find((stay) => getBaseCity(stay.city) === "Besham") ?? { city: "Besham", nights: 1 };

  return [
    ...islamabadStays,
    { ...chilasStay },
    ...adjustedDestinations,
    { ...beshamStay },
  ];
}
