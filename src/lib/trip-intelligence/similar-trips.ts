import { normalizeTrip } from "./normalize";
import type { NormalizedTrip, TripSimilarityResult } from "./types";

function getComparableTrip(rawTrip: { id: string; title: string; region: "northern" | "southern"; destinationSlugs?: string[]; travelStyles?: string[]; duration?: string; pricePerPerson?: number; description?: string; routeStops?: string[]; departures?: Array<{ label: string }>; scheduleNote?: string; departureAvailability?: "confirmed" | "on-request"; }): NormalizedTrip {
  return normalizeTrip(rawTrip as never);
}

export function getSimilarTrips(
  trip: { id: string; title: string; region: "northern" | "southern"; destinationSlugs?: string[]; travelStyles?: string[]; duration?: string; pricePerPerson?: number; description?: string; routeStops?: string[]; departures?: Array<{ label: string }>; scheduleNote?: string; departureAvailability?: "confirmed" | "on-request" },
  allTrips: Array<{ id: string; title: string; region: "northern" | "southern"; destinationSlugs?: string[]; travelStyles?: string[]; duration?: string; pricePerPerson?: number; description?: string; routeStops?: string[]; departures?: Array<{ label: string }>; scheduleNote?: string; departureAvailability?: "confirmed" | "on-request" }>,
): TripSimilarityResult[] {
  const currentTrip = getComparableTrip(trip);
  const seenIds = new Set<string>();

  return allTrips
    .map((candidate) => getComparableTrip(candidate))
    .filter((candidate) => candidate.id !== currentTrip.id)
    .map((candidate) => {
      const sharedDestinations = candidate.destinationSlugs.filter((slug) => currentTrip.destinationSlugs.includes(slug));
      const sharedStyles = candidate.travelStyles.filter(
        (travelStyle) => travelStyle !== "tailored" && currentTrip.travelStyles.includes(travelStyle),
      );
      const durationDifference = Math.abs(candidate.durationDays - currentTrip.durationDays);
      const score = sharedDestinations.length * 3 + sharedStyles.length + (durationDifference <= 2 ? 1 : 0);
      const reasons = [
        ...sharedDestinations.map((slug) => `Shares ${slug} destination`),
        ...sharedStyles.slice(0, 1).map((travelStyle) => `${travelStyle} style`),
      ];

      return { trip: candidate, score, reasons };
    })
    .filter((match) => match.score > 0)
    .filter((match) => {
      if (seenIds.has(match.trip.id)) return false;
      seenIds.add(match.trip.id);
      return true;
    })
    .sort((first, second) => second.score - first.score || first.trip.title.localeCompare(second.trip.title))
    .slice(0, 2);
}

export function getSimilarTripsForSavedTrips(
  savedTrips: Array<Parameters<typeof getSimilarTrips>[0]>,
  allTrips: Parameters<typeof getSimilarTrips>[1],
  limit = 4,
): Array<TripSimilarityResult & { relatedTo: string }> {
  if (!Number.isFinite(limit) || limit < 1) return [];

  const maximumResults = Math.floor(limit);
  const savedIds = new Set(savedTrips.map((trip) => trip.id));
  const seenIds = new Set(savedIds);
  const relatedTrips: Array<TripSimilarityResult & { relatedTo: string }> = [];

  // Preserve saved-trip order, then each seed's canonical similarity order.
  for (const savedTrip of savedTrips) {
    for (const result of getSimilarTrips(savedTrip, allTrips)) {
      if (seenIds.has(result.trip.id)) continue;

      seenIds.add(result.trip.id);
      relatedTrips.push({ ...result, relatedTo: savedTrip.title });
      if (relatedTrips.length >= maximumResults) return relatedTrips;
    }
  }

  return relatedTrips;
}
