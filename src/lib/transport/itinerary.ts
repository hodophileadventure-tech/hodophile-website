function normalizeStop(stop: string): string {
  return stop.trim().replace(/\s+\([^)]*\)$/, "");
}

export function getCustomRoadStops(
  startingPoint: string,
  selectedDestinations: string[],
  travelMode: "road" | "air" = "road",
  includeIslamabadTransit = true,
): string[] {
  const origin = normalizeStop(startingPoint);
  if (!origin) return [];

  const destinations = selectedDestinations
    .map(normalizeStop)
    .filter((destination) => destination && destination !== "Chilas");

  const originLower = origin.toLocaleLowerCase("en");
  const hasIslamabad = destinations.some((destination) => destination.toLocaleLowerCase("en") === "islamabad");
  const needsIslamabadStop = includeIslamabadTransit &&
    travelMode === "road" &&
    originLower !== "islamabad" &&
    originLower !== "lahore" &&
    originLower !== "rawalpindi" &&
    !hasIslamabad;
  const orderedDestinations = needsIslamabadStop
    ? ["Islamabad", ...destinations]
    : destinations;

  return [
    origin,
    ...orderedDestinations.filter((destination) => destination.toLocaleLowerCase("en") !== originLower),
  ];
}
