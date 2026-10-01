export { FIT_WEIGHTS, calculateTripFit } from "./trip-fit";
export { getSimilarTrips, getSimilarTripsForSavedTrips } from "./similar-trips";
export { normalizeTrip, parseDurationDays, durationMatchesPreference, normalizeDestinationSlug } from "./normalize";
export { rankTripRecommendations } from "./recommendations";

export type { DurationPreference, FitCriterion, MatchReason, NormalizedTrip, RankedTripRecommendation, TripFitResult, TripPreferences, TripSimilarityResult } from "./types";
