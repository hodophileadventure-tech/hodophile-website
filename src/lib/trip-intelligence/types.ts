import type { TravelStyle } from "@/lib/data/tour-packages";

export type DurationPreference = "all" | "weekend" | "4-7" | "8-12" | "12-plus";
export type FitCriterion = "destination" | "region" | "travelStyle" | "duration" | "budget" | "departureMonth";

export interface TripPreferences {
  destination?: string;
  region?: "northern" | "southern";
  travelStyle?: TravelStyle;
  duration?: DurationPreference;
  budget?: number;
  departureMonth?: string;
}

export interface MatchReason {
  criterion: FitCriterion;
  type: "match" | "mismatch";
  label: string;
  detail: string;
}

export interface NormalizedTrip {
  id: string;
  title: string;
  region: "northern" | "southern";
  destinationSlugs: string[];
  routeStops: string[];
  travelStyles: TravelStyle[];
  pricePerPerson: number;
  durationDays: number;
  durationLabel: string;
  departureMonths: string[];
  blockedDepartureMonths: string[];
  departureAvailability: "confirmed" | "on-request";
  departureNote?: string;
  summary: string;
}

export interface TripFitResult {
  score: number;
  reasons: MatchReason[];
  matchedCriteria: string[];
  unmatchedCriteria: string[];
  summary: string;
}

export interface TripSimilarityResult {
  trip: NormalizedTrip;
  score: number;
  reasons: string[];
}

export interface RankedTripRecommendation<T> {
  trip: T;
  score: number;
  summary: string;
  reasons: MatchReason[];
  matchedCriteria: string[];
  destinationKey: string;
}
