export { FIT_WEIGHTS, calculateTripFit } from "./trip-fit";
export { getSimilarTrips, getSimilarTripsForSavedTrips } from "./similar-trips";
export { normalizeTrip, parseDurationDays, durationMatchesPreference, normalizeDestinationSlug } from "./normalize";
export { rankTripRecommendations } from "./recommendations";
export {
  calculateTripMatch,
  createTripBudgetRanges,
  rankTripMatches,
  TRIP_MATCH_DURATIONS,
  TRIP_MATCH_EXPERIENCES,
  TRIP_MATCH_MOODS,
  TRIP_MATCH_MONTHS,
  TRIP_MATCH_REASONS,
  TRIP_MATCH_SEASONS,
  TRIP_MATCH_WEIGHTS,
} from "./trip-match";

export type { DurationPreference, FitCriterion, MatchReason, NormalizedTrip, RankedTripRecommendation, TripFitResult, TripPreferences, TripSimilarityResult } from "./types";
export type { TripBudgetRange, TripMatchDuration, TripMatchMood, TripMatchMonth, TripMatchPreferences, TripMatchReason, TripMatchReasonPreference, TripMatchResult, TripMatchSeason, TripMatchTrip } from "./trip-match";
