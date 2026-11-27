export interface CityStay {
  city: string;
  nights: number;
}

const ROAD_STOPOVER_CITIES = new Set(["Naran", "Chilas", "Besham"]);
const CUSTOM_SKARDU_ROUTE_CITIES = new Set(["Hunza", "Skardu", "Fairy Meadows", "Astore"]);
const STOPOVER_EXCLUSION_CITIES = new Set(["Shogran", "Swat", "Kashmir", "Murree"]);

function getBaseCity(city: string): string {
  return city.trim().replace(/\s+\([^)]*\)$/, "");
}

export function isNaranStopoverSeason(month: number): boolean {
  return month >= 6 && month <= 10;
}

export function shouldExcludeRoadStopovers(destinations: readonly string[]): boolean {
  return destinations.some((city) => STOPOVER_EXCLUSION_CITIES.has(getBaseCity(city)));
}

export function isExcludedRoadStopover(
  destinations: readonly string[],
  city: string,
): boolean {
  return shouldExcludeRoadStopovers(destinations) &&
    ROAD_STOPOVER_CITIES.has(getBaseCity(city));
}

export function excludeConflictingRoadStopovers(destinations: readonly string[]): string[] {
  return shouldExcludeRoadStopovers(destinations)
    ? destinations.filter((city) => !ROAD_STOPOVER_CITIES.has(getBaseCity(city)))
    : [...destinations];
}

export function getCustomRoadStopoverCities(
  destinations: readonly string[],
  travelMode: "road" | "air",
  month: number,
): string[] {
  const effectiveDestinations = excludeConflictingRoadStopovers(destinations);
  if (
    travelMode === "air" ||
    shouldExcludeRoadStopovers(destinations) ||
    effectiveDestinations.length !== destinations.length ||
    !effectiveDestinations.some((city) => CUSTOM_SKARDU_ROUTE_CITIES.has(getBaseCity(city)))
  ) {
    return [];
  }

  const selectedCities = new Set(effectiveDestinations.map(getBaseCity));
  if (isNaranStopoverSeason(month)) {
    return [
      ...(effectiveDestinations.filter((city) => getBaseCity(city) === "Naran").length >= 1 ? [] : ["Naran (Outbound)"]),
      ...(effectiveDestinations.filter((city) => getBaseCity(city) === "Naran").length >= 2 ? [] : ["Naran (Return)"]),
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

  if (isNaranStopoverSeason(month)) {
    const adjustedDestinations = addNightsToSkardu(destinationStays, existingStopoverNights - 2);
    return [
      ...islamabadStays,
      { city: "Naran (Outbound)", nights: 1 },
      ...adjustedDestinations,
      { city: "Naran (Return)", nights: 1 },
    ];
  }

  const chilasStay = stopovers.find((stay) => getBaseCity(stay.city) === "Chilas") ?? { city: "Chilas", nights: 1 };
  const beshamStay = stopovers.find((stay) => getBaseCity(stay.city) === "Besham") ?? { city: "Besham", nights: 1 };
  const adjustedDestinations = addNightsToSkardu(
    destinationStays,
    existingStopoverNights - chilasStay.nights - beshamStay.nights,
  );

  return [
    ...islamabadStays,
    { ...chilasStay },
    ...adjustedDestinations,
    { ...beshamStay },
  ];
}
