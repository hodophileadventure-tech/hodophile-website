import { calculateTripFit } from "./trip-fit";

import type { RankedTripRecommendation, TripPreferences } from "./types";

export function rankTripRecommendations<T extends { id: string; title: string; destinationSlugs?: string[] }>(
  preferences: TripPreferences,
  trips: T[],
  limit = 5,
): RankedTripRecommendation<T>[] {
  if (!Array.isArray(trips) || trips.length === 0) {
    return [];
  }

  const rankedTrips = trips
    .map((trip) => {
      const fitResult = calculateTripFit(preferences, trip);
      const destinationKey = trip.destinationSlugs?.find((slug) => slug && slug.trim().length > 0) ?? trip.id;

      return {
        trip,
        score: fitResult.score,
        summary: fitResult.summary,
        reasons: fitResult.reasons,
        matchedCriteria: fitResult.matchedCriteria,
        destinationKey,
      };
    })
    .sort((first, second) => second.score - first.score || first.trip.title.localeCompare(second.trip.title));

  const candidatesWithEvidence = rankedTrips.some((candidate) => candidate.score > 0)
    ? rankedTrips.filter((candidate) => candidate.score > 0)
    : rankedTrips;
  const diversifiedResults: RankedTripRecommendation<T>[] = [];
  const usedDestinations = new Set<string>();

  for (const candidate of candidatesWithEvidence) {
    if (usedDestinations.has(candidate.destinationKey)) {
      continue;
    }

    usedDestinations.add(candidate.destinationKey);
    diversifiedResults.push(candidate);

    if (diversifiedResults.length >= limit) {
      break;
    }
  }

  return diversifiedResults;
}