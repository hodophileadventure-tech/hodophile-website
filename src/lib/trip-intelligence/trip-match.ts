import type { TourExperience, TravelStyle } from "@/lib/data/tour-packages";

export const TRIP_MATCH_WEIGHTS = {
  travelStyle: 25,
  duration: 20,
  experience: 20,
  budget: 20,
  season: 15,
} as const;

export type TripMatchMood = TravelStyle | "relaxing" | "offbeat";
export type TripMatchDuration = "2-3" | "4-5" | "6-8" | "9-plus";
export type TripMatchSeason = "winter" | "spring" | "summer" | "autumn";
export type TripMatchReasonPreference =
  | "recharge"
  | "family"
  | "couple"
  | "adventure"
  | "nature"
  | "culture"
  | "offbeat"
  | "beach";
export type TripMatchMonth =
  | "january" | "february" | "march" | "april" | "may" | "june"
  | "july" | "august" | "september" | "october" | "november" | "december";

export type TripBudgetRange = {
  id: string;
  minimum: number;
  maximum?: number;
  label: string;
};

export type TripMatchPreferences = {
  moods: TripMatchMood[];
  reason?: TripMatchReasonPreference;
  duration?: TripMatchDuration;
  experiences: TourExperience[];
  budget?: TripBudgetRange;
  season?: TripMatchSeason;
  month?: TripMatchMonth;
};

export type TripMatchTrip = {
  id: string;
  title: string;
  duration: string;
  region: "northern" | "southern";
  destinationSlugs: string[];
  routeStops: string[];
  routeHighlights?: string[];
  travelStyles: TravelStyle[];
  experiences: TourExperience[];
  pace?: "Fast" | "Moderate" | "Relaxed";
  pricePerPerson?: number;
  departureAvailability?: "confirmed" | "on-request";
  departures?: Array<{ label: string }>;
  scheduleNote?: string;
  blockedDepartureMonths?: string[];
};

export type TripMatchReason = {
  category: keyof typeof TRIP_MATCH_WEIGHTS;
  label: string;
};

export type TripMatchResult<T extends TripMatchTrip> = {
  trip: T;
  score: number;
  reasons: TripMatchReason[];
};

export const TRIP_MATCH_MOODS: Array<{
  value: TripMatchMood;
  label: string;
  icon: string;
  description: string;
}> = [
  { value: "couples", label: "Couple escape", icon: "♡", description: "Trips listed for couples" },
  { value: "family", label: "Family getaway", icon: "⌂", description: "Trips listed for families" },
  { value: "adventure", label: "Adventure", icon: "△", description: "Routes listed for adventure" },
  { value: "tailored", label: "Tailored escape", icon: "✦", description: "Trips listed for tailored plans" },
  { value: "relaxing", label: "Relax & recharge", icon: "≈", description: "Journeys with a relaxed pace" },
  { value: "offbeat", label: "Offbeat explorer", icon: "↗", description: "Less-travelled routes and places" },
];

export const TRIP_MATCH_EXPERIENCES: Array<{
  value: TourExperience;
  label: string;
  icon: string;
}> = [
  { value: "mountains", label: "Mountains", icon: "△" },
  { value: "lakes-valleys", label: "Lakes & valleys", icon: "⌁" },
  { value: "beaches", label: "Beaches", icon: "≈" },
  { value: "nature", label: "Nature", icon: "✳" },
  { value: "adventure", label: "Adventure", icon: "↗" },
  { value: "romance", label: "Romance", icon: "♡" },
  { value: "culture", label: "Culture", icon: "⌂" },
  { value: "offbeat", label: "Offbeat", icon: "✦" },
];

export const TRIP_MATCH_REASONS: Array<{
  value: TripMatchReasonPreference;
  label: string;
  mood?: TripMatchMood;
  experience?: TourExperience;
}> = [
  { value: "recharge", label: "To relax and recharge", mood: "relaxing" },
  { value: "family", label: "To spend quality time with family", mood: "family" },
  { value: "couple", label: "For a special escape together", mood: "couples" },
  { value: "adventure", label: "To seek adventure", mood: "adventure" },
  { value: "nature", label: "To enjoy nature and scenery", experience: "nature" },
  { value: "culture", label: "To discover culture and heritage", experience: "culture" },
  { value: "offbeat", label: "To explore somewhere off the beaten path", mood: "offbeat" },
  { value: "beach", label: "To enjoy a beach escape", experience: "beaches" },
];

export const TRIP_MATCH_DURATIONS: Array<{
  value: TripMatchDuration;
  label: string;
  minimum: number;
  maximum?: number;
}> = [
  { value: "2-3", label: "2–3 days", minimum: 2, maximum: 3 },
  { value: "4-5", label: "4–5 days", minimum: 4, maximum: 5 },
  { value: "6-8", label: "6–8 days", minimum: 6, maximum: 8 },
  { value: "9-plus", label: "9+ days", minimum: 9 },
];

export const TRIP_MATCH_SEASONS: Array<{
  value: TripMatchSeason;
  label: string;
  months: string[];
}> = [
  { value: "winter", label: "Winter", months: ["december", "january", "february"] },
  { value: "spring", label: "Spring", months: ["march", "april", "may"] },
  { value: "summer", label: "Summer", months: ["june", "july", "august"] },
  { value: "autumn", label: "Autumn", months: ["september", "october", "november"] },
];

export const TRIP_MATCH_MONTHS = TRIP_MATCH_SEASONS.flatMap((season) =>
  season.months.map((month) => ({
    value: month as TripMatchMonth,
    label: `${month.charAt(0).toUpperCase()}${month.slice(1)}`,
    season: season.value,
  })),
);

const MONTH_NAMES = TRIP_MATCH_SEASONS.flatMap((season) => season.months);

export function createTripBudgetRanges(prices: number[]): TripBudgetRange[] {
  const sortedPrices = [...new Set(prices.filter((price) => Number.isFinite(price) && price > 0))].sort((a, b) => a - b);
  if (sortedPrices.length === 0) return [];

  const format = (price: number) => `PKR ${price.toLocaleString("en-PK")}`;
  if (sortedPrices.length < 3) {
    return [{
      id: "listed-range",
      minimum: sortedPrices[0],
      maximum: sortedPrices[sortedPrices.length - 1],
      label: `${format(sortedPrices[0])}–${format(sortedPrices[sortedPrices.length - 1])}`,
    }];
  }

  const lowerBoundary = sortedPrices[Math.floor((sortedPrices.length - 1) * 0.25)];
  const upperBoundary = sortedPrices[Math.floor((sortedPrices.length - 1) * 0.75)];

  return [
    { id: "value", minimum: 0, maximum: lowerBoundary, label: `Up to ${format(lowerBoundary)}` },
    {
      id: "balanced",
      minimum: lowerBoundary + 1,
      maximum: upperBoundary,
      label: `${format(lowerBoundary + 1)}–${format(upperBoundary)}`,
    },
    { id: "flexible", minimum: upperBoundary + 1, label: `Above ${format(upperBoundary)}` },
  ];
}

function getTripMonths(trip: TripMatchTrip): string[] {
  const schedule = [
    ...(trip.departures ?? []).map((departure) => departure.label),
    trip.scheduleNote ?? "",
  ].join(" ").toLowerCase();

  return [...new Set([...schedule.matchAll(new RegExp(`\\b(${MONTH_NAMES.join("|")})\\b`, "g"))].map((match) => match[1]))];
}

function getTripDuration(trip: TripMatchTrip): number {
  return Number(trip.duration.match(/\d+/)?.[0] ?? 0);
}

function matchesMood(trip: TripMatchTrip, mood: TripMatchMood): boolean {
  if (mood === "relaxing") return trip.pace === "Relaxed";
  if (mood === "offbeat") return trip.experiences.includes("offbeat");
  return trip.travelStyles.includes(mood);
}

function canMatchMood(trip: TripMatchTrip, mood: TripMatchMood): boolean {
  if (mood === "relaxing") return trip.pace !== undefined;
  return true;
}

export function calculateTripMatch<T extends TripMatchTrip>(
  preferences: TripMatchPreferences,
  trip: T,
): TripMatchResult<T> {
  const reasons: TripMatchReason[] = [];
  let availableWeight = 0;
  let earnedWeight = 0;
  const selectedReason = TRIP_MATCH_REASONS.find((option) => option.value === preferences.reason);
  const moods = [...new Set([
    ...preferences.moods,
    ...(selectedReason?.mood ? [selectedReason.mood] : []),
  ])];
  const experiences = [...new Set([
    ...preferences.experiences,
    ...(selectedReason?.experience ? [selectedReason.experience] : []),
  ])];

  if (moods.length > 0) {
    const knownMoods = moods.filter((mood) => canMatchMood(trip, mood));
    const matchedMoods = knownMoods.filter((mood) => matchesMood(trip, mood));
    if (knownMoods.length > 0) {
      availableWeight += TRIP_MATCH_WEIGHTS.travelStyle;
      earnedWeight += TRIP_MATCH_WEIGHTS.travelStyle * matchedMoods.length / knownMoods.length;
    }
    for (const mood of matchedMoods) {
      const label = TRIP_MATCH_MOODS.find((option) => option.value === mood)?.label ?? mood;
      reasons.push({ category: "travelStyle", label: `Matches your ${label.toLowerCase()} mood` });
    }
  }

  if (preferences.duration) {
    availableWeight += TRIP_MATCH_WEIGHTS.duration;
    const duration = getTripDuration(trip);
    const option = TRIP_MATCH_DURATIONS.find((item) => item.value === preferences.duration);
    if (option && duration >= option.minimum && (option.maximum === undefined || duration <= option.maximum)) {
      earnedWeight += TRIP_MATCH_WEIGHTS.duration;
      reasons.push({ category: "duration", label: `Fits your ${option.label} time window` });
    }
  }

  if (experiences.length > 0) {
    availableWeight += TRIP_MATCH_WEIGHTS.experience;
    const matchedExperiences = experiences.filter((experience) => trip.experiences.includes(experience));
    earnedWeight += TRIP_MATCH_WEIGHTS.experience * matchedExperiences.length / experiences.length;
    for (const experience of matchedExperiences) {
      const label = TRIP_MATCH_EXPERIENCES.find((option) => option.value === experience)?.label ?? experience;
      reasons.push({ category: "experience", label: `Includes your ${label.toLowerCase()} preference` });
    }
  }

  if (preferences.budget) {
    if (trip.pricePerPerson !== undefined && Number.isFinite(trip.pricePerPerson)) {
      availableWeight += TRIP_MATCH_WEIGHTS.budget;
      if (
        trip.pricePerPerson >= preferences.budget.minimum &&
        (preferences.budget.maximum === undefined || trip.pricePerPerson <= preferences.budget.maximum)
      ) {
        earnedWeight += TRIP_MATCH_WEIGHTS.budget;
        reasons.push({ category: "budget", label: `Listed price ${trip.pricePerPerson.toLocaleString("en-PK")} is within your range` });
      }
    }
  }

  if (preferences.season || preferences.month) {
    const tripMonths = getTripMonths(trip);
    if (tripMonths.length > 0) {
      availableWeight += TRIP_MATCH_WEIGHTS.season;
      const selectedSeason = TRIP_MATCH_SEASONS.find((season) =>
        season.value === preferences.season || season.months.includes(preferences.month ?? ""),
      );
      const blockedMonths = new Set((trip.blockedDepartureMonths ?? []).map((month) => month.toLowerCase()));
      const selectedMonths = preferences.month ? [preferences.month] : selectedSeason?.months ?? [];
      const matchingMonth = selectedMonths.find((month) => tripMonths.includes(month) && !blockedMonths.has(month));

      if (matchingMonth) {
        earnedWeight += TRIP_MATCH_WEIGHTS.season;
        reasons.push({
          category: "season",
          label: trip.departureAvailability === "confirmed"
            ? `A confirmed departure is listed in ${matchingMonth}`
            : `${matchingMonth} appears in the schedule note; confirm availability`,
        });
      }
    }
  }

  return {
    trip,
    score: availableWeight === 0 ? 0 : Math.round(earnedWeight / availableWeight * 100),
    reasons,
  };
}

export function rankTripMatches<T extends TripMatchTrip>(
  trips: T[],
  preferences: TripMatchPreferences,
  limit = 4,
): TripMatchResult<T>[] {
  return trips
    .map((trip) => calculateTripMatch(preferences, trip))
    .filter((result) => result.score > 0)
    .sort((first, second) => second.score - first.score || first.trip.title.localeCompare(second.trip.title))
    .slice(0, limit);
}
