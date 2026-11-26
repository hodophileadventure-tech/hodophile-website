export const AIR_DESTINATIONS = ["Skardu", "Hunza", "Astore", "Fairy Meadows"] as const;
type AirDestination = (typeof AIR_DESTINATIONS)[number];

const AIR_DESTINATION_DISTANCE_ADDITIONS_KM: Record<AirDestination, number> = {
  Skardu: 1000,
  Hunza: 350,
  Astore: 0,
  "Fairy Meadows": 0,
};

export const AIR_DESTINATION_ERROR =
  "By Air trips are currently available only for Skardu, Hunza, Astore, and Fairy Meadows. Please select an eligible destination or switch to By Road.";

export class AirDestinationValidationError extends Error {
  constructor() {
    super(AIR_DESTINATION_ERROR);
    this.name = "AirDestinationValidationError";
  }
}

function normalizeDestination(destination: string): string {
  return destination.trim().replace(/\s+\([^)]*\)$/, "").toLocaleLowerCase("en");
}

function getCanonicalAirDestination(value: unknown): AirDestination | undefined {
  if (typeof value !== "string") return undefined;
  const normalized = normalizeDestination(value);
  return AIR_DESTINATIONS.find((destination) => normalizeDestination(destination) === normalized);
}

export function isAirDestination(value: string): boolean {
  return getCanonicalAirDestination(value) !== undefined;
}

export function normalizeAirDestinations(destinations: unknown): AirDestination[] {
  if (!Array.isArray(destinations) || destinations.length === 0) {
    throw new AirDestinationValidationError();
  }

  const normalized: AirDestination[] = [];
  for (const destination of destinations) {
    const canonical = getCanonicalAirDestination(destination);
    if (!canonical) throw new AirDestinationValidationError();
    if (!normalized.some((item) => normalizeDestination(item) === normalizeDestination(canonical))) {
      normalized.push(canonical);
    }
  }

  return normalized;
}

export function getAirDestinationAdjustments(destinations: unknown): {
  distanceAdditionKm: number;
} {
  const selectedDestinations = normalizeAirDestinations(destinations);
  let distanceAdditionKm = 0;

  for (const destination of selectedDestinations) {
    distanceAdditionKm += AIR_DESTINATION_DISTANCE_ADDITIONS_KM[destination];
  }

  return { distanceAdditionKm };
}

export function buildAirRoadStops(destinations: unknown): string[] {
  const selectedDestinations = normalizeAirDestinations(destinations);
  const stops = [
    "Skardu",
    ...selectedDestinations.filter((destination) => destination !== "Skardu"),
  ];

  return stops.length === 1 ? stops : [...stops, "Skardu"];
}

export function validateAirRoadStops(stops: unknown): string[] {
  if (!Array.isArray(stops) || stops.length < 2 || stops.some((stop) => typeof stop !== "string")) {
    throw new AirDestinationValidationError();
  }

  const normalizedStops: string[] = [];
  for (const stop of stops) {
    const canonical = getCanonicalAirDestination(stop);
    if (!canonical) throw new AirDestinationValidationError();
    normalizedStops.push(canonical);
  }
  if (normalizedStops[0] !== "Skardu" || normalizedStops[normalizedStops.length - 1] !== "Skardu") {
    throw new AirDestinationValidationError();
  }

  const expectedStops = buildAirRoadStops(normalizedStops.slice(1, -1));
  if (expectedStops.length !== normalizedStops.length ||
      expectedStops.some((stop, index) => stop !== normalizedStops[index])) {
    throw new AirDestinationValidationError();
  }

  return expectedStops;
}

function getObjectKeys(value: unknown): string[] {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? Object.keys(value)
    : [];
}

export function getAirQuotationDestinations(
  input: {
    routeDestinations?: unknown;
    customCities?: unknown;
    multiCityHotels?: unknown;
    multiCityNights?: unknown;
  },
  route?: { city?: string; name?: string },
): string[] {
  const destinationLists: unknown[][] = [];
  for (const value of [input.routeDestinations, input.customCities]) {
    if (Array.isArray(value) && value.length > 0) destinationLists.push(value);
  }
  const hotelCities = getObjectKeys(input.multiCityHotels);
  const nightCities = getObjectKeys(input.multiCityNights);
  const allSubmittedDestinations = [
    ...destinationLists.flat(),
    ...hotelCities,
    ...nightCities,
  ];

  if (route?.city && route.city !== "Multi-City") {
    allSubmittedDestinations.push(route.city);
  }
  if (route?.name) {
    const routeName = route.name.toLocaleLowerCase("en");
    allSubmittedDestinations.push(
      ...AIR_DESTINATIONS.filter((destination) =>
        routeName.includes(destination.toLocaleLowerCase("en")),
      ),
    );
  }

  const canonicalSubmitted = allSubmittedDestinations.length > 0
    ? normalizeAirDestinations(allSubmittedDestinations)
    : [];
  if (canonicalSubmitted.length > 0) return canonicalSubmitted;

  const selectedList = destinationLists[0];
  if (selectedList) return normalizeAirDestinations(selectedList);
  throw new AirDestinationValidationError();
}
