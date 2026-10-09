import type { TourPackage, TravelStyle } from "@/lib/data/tour-packages";

import { DEPARTURE_MONTHS, durationMatchesPreference, normalizeDestinationSlug, normalizeText, normalizeTrip } from "./normalize";
import type { FitCriterion, MatchReason, NormalizedTrip, TripFitResult, TripPreferences } from "./types";

export const FIT_WEIGHTS: Record<FitCriterion, number> = {
  destination: 25,
  region: 20,
  travelStyle: 20,
  duration: 15,
  budget: 10,
  departureMonth: 10,
};

function getTravelStyleLabel(style?: TravelStyle): string {
  return style ? style.charAt(0).toUpperCase() + style.slice(1) : "Travel style";
}

function tripMatchesDestination(preference: string, trip: NormalizedTrip): boolean {
  const normalizedPreference = normalizeDestinationSlug(preference);
  if (!normalizedPreference) return false;

  return trip.destinationSlugs.some((slug) => slug === normalizedPreference || slug.includes(normalizedPreference));
}

function tripMatchesDepartureMonth(monthPreference: string, trip: NormalizedTrip): boolean {
  if (!monthPreference) return false;

  const normalisedMonth = normalizeText(monthPreference);
  if (!DEPARTURE_MONTHS.includes(normalisedMonth as (typeof DEPARTURE_MONTHS)[number])) {
    return false;
  }

  if (trip.blockedDepartureMonths.includes(normalisedMonth)) {
    return false;
  }

  const departureText = (trip.departureMonths.length ? trip.departureMonths : [trip.departureNote ?? ""])
    .join(" ")
    .toLowerCase();

  if (!departureText.trim()) {
    return false;
  }

  const monthIndex = DEPARTURE_MONTHS.indexOf(normalisedMonth as (typeof DEPARTURE_MONTHS)[number]);
  const monthPattern = new RegExp(`\\b(${DEPARTURE_MONTHS.join("|")})\\b`, "g");
  const monthIndexes = [...departureText.matchAll(monthPattern)].map((match) => DEPARTURE_MONTHS.indexOf(match[1] as (typeof DEPARTURE_MONTHS)[number]));

  if (!monthIndexes.length) {
    return false;
  }

  if (monthIndexes.length === 1 && monthIndexes[0] === monthIndex) {
    return true;
  }

  const firstMonth = monthIndexes[0];
  const lastMonth = monthIndexes[monthIndexes.length - 1];
  const isInWindow = firstMonth <= lastMonth
    ? monthIndex >= firstMonth && monthIndex <= lastMonth
    : monthIndex >= firstMonth || monthIndex <= lastMonth;

  return isInWindow;
}

function makeReason(
  criterion: FitCriterion,
  type: "match" | "mismatch",
  label: string,
  detail: string,
): MatchReason {
  return { criterion, type, label, detail };
}

function getDurationFitScore(durationDays: number, preference: TripPreferences["duration"]): number {
  if (!preference || preference === "all" || durationDays <= 0) return 0;
  if (durationMatchesPreference(durationDays, preference)) return 1;

  switch (preference) {
    case "weekend":
      return Math.max(0, 1 - (durationDays - 3) / 6);
    case "4-7": {
      const distance = durationDays < 4 ? 4 - durationDays : durationDays - 7;
      return Math.max(0, 1 - distance / 6);
    }
    case "8-12": {
      const distance = durationDays < 8 ? 8 - durationDays : durationDays - 12;
      return Math.max(0, 1 - distance / 8);
    }
    case "12-plus":
      return Math.min(0.85, durationDays / 12 * 0.85);
    default:
      return 0;
  }
}

export function calculateTripFit(preferences: TripPreferences, trip: Partial<TourPackage> | NormalizedTrip | undefined): TripFitResult {
  if (!trip) {
    return {
      score: 0,
      reasons: [],
      matchedCriteria: [],
      unmatchedCriteria: [],
      summary: "No trip data was provided.",
    };
  }

  const normalizedTrip: NormalizedTrip = "durationDays" in trip && "departureMonths" in trip
    ? (trip as NormalizedTrip)
    : normalizeTrip(trip as TourPackage);

  const selectedCriteria = [
    preferences.destination ? "destination" : null,
    preferences.region ? "region" : null,
    preferences.travelStyle ? "travelStyle" : null,
    preferences.duration ? "duration" : null,
    typeof preferences.budget === "number" && Number.isFinite(preferences.budget) && !normalizedTrip.priceOnRequest ? "budget" : null,
    preferences.departureMonth ? "departureMonth" : null,
  ].filter((criterion): criterion is FitCriterion => criterion !== null);

  if (selectedCriteria.length === 0) {
    return {
      score: 0,
      reasons: [],
      matchedCriteria: [],
      unmatchedCriteria: [],
      summary: "No preferences selected; no fit criteria were evaluated.",
    };
  }

  let totalWeight = 0;
  let matchedWeight = 0;
  const reasons: MatchReason[] = [];
  const matchedCriteria: string[] = [];
  const unmatchedCriteria: string[] = [];

  for (const criterion of selectedCriteria) {
    const weight = FIT_WEIGHTS[criterion];
    totalWeight += weight;

    let isMatch = false;
    let matchStrength = 0;
    let label = "";
    let detail = "";

    switch (criterion) {
      case "destination": {
        const destinationPreference = preferences.destination ?? "";
        isMatch = tripMatchesDestination(destinationPreference, normalizedTrip);
        label = isMatch ? "Destination fit" : "Destination mismatch";
        detail = isMatch
          ? `This route includes ${normalizedTrip.destinationSlugs.join(", ") || normalizedTrip.title}.`
          : `This route does not match ${destinationPreference}.`;
        break;
      }
      case "region": {
        isMatch = Boolean(preferences.region && normalizedTrip.region === preferences.region);
        label = isMatch ? "Region match" : "Region mismatch";
        detail = isMatch
          ? `${normalizedTrip.region.charAt(0).toUpperCase() + normalizedTrip.region.slice(1)} matches your selected region.`
          : `This route is in ${normalizedTrip.region}, not ${preferences.region}.`;
        break;
      }
      case "travelStyle": {
        isMatch = Boolean(preferences.travelStyle && normalizedTrip.travelStyles.includes(preferences.travelStyle));
        label = isMatch ? `${getTravelStyleLabel(preferences.travelStyle)} fit` : `${getTravelStyleLabel(preferences.travelStyle)} mismatch`;
        detail = isMatch
          ? `${getTravelStyleLabel(preferences.travelStyle)} is listed for this trip.`
          : `${getTravelStyleLabel(preferences.travelStyle)} is not listed for this trip.`;
        break;
      }
      case "duration": {
        if (preferences.duration) {
          isMatch = durationMatchesPreference(normalizedTrip.durationDays, preferences.duration);
          matchStrength = getDurationFitScore(normalizedTrip.durationDays, preferences.duration);
          label = isMatch ? "Duration fit" : matchStrength > 0 ? "Closest duration" : "Duration mismatch";
          detail = isMatch
            ? `${normalizedTrip.durationLabel} matches your selected duration preference.`
            : `${normalizedTrip.durationLabel} is the closest listed duration to your selected preference.`;
        }
        break;
      }
      case "budget": {
        const numericBudget = Number(preferences.budget ?? 0);
        const hasListedPrice = normalizedTrip.pricePerPerson > 0;
        isMatch = numericBudget > 0 && hasListedPrice && normalizedTrip.pricePerPerson <= numericBudget;
        matchStrength = numericBudget > 0 && hasListedPrice
          ? Math.min(1, numericBudget / Math.max(normalizedTrip.pricePerPerson, 1))
          : 0;
        label = !hasListedPrice ? "Price to confirm" : isMatch ? "Budget fit" : matchStrength > 0 ? "Budget stretch" : "Budget mismatch";
        detail = !hasListedPrice
          ? "Current pricing is not listed; request a quote from the planning team."
          : isMatch
            ? `PKR ${normalizedTrip.pricePerPerson.toLocaleString()} is within your budget.`
            : `PKR ${normalizedTrip.pricePerPerson.toLocaleString()} is above your selected budget of PKR ${numericBudget.toLocaleString()}.`;
        break;
      }
      case "departureMonth": {
        const month = preferences.departureMonth ?? "";
        isMatch = tripMatchesDepartureMonth(month, normalizedTrip);
        matchStrength = isMatch ? 1 : 0;
        label = isMatch ? "Departure month fit" : "Departure month mismatch";
        detail = isMatch
          ? normalizedTrip.departureAvailability === "confirmed"
            ? `A confirmed departure or window includes ${month}.`
            : `The package schedule note includes ${month}; availability remains on request.`
          : `No confirmed departure is listed for ${month}.`;
        break;
      }
      default:
        break;
    }

    if (isMatch) {
      matchStrength = 1;
    }

    if (matchStrength > 0) {
      matchedWeight += weight * matchStrength;
    }

    if (isMatch) {
      matchedCriteria.push(criterion);
      reasons.push(makeReason(criterion, "match", label, detail));
    } else {
      unmatchedCriteria.push(criterion);
      reasons.push(makeReason(criterion, "mismatch", label, detail));
    }
  }

  const score = totalWeight === 0 ? 0 : Math.max(0, Math.min(100, Math.round((matchedWeight / totalWeight) * 100)));

  if (matchedCriteria.length === 0) {
    return {
      score,
      reasons,
      matchedCriteria: [],
      unmatchedCriteria,
      summary: "This trip does not match the selected preferences.",
    };
  }

  return {
    score,
    reasons,
    matchedCriteria,
    unmatchedCriteria,
    summary: `This trip matches ${matchedCriteria.length} of ${selectedCriteria.length} selected preferences.`,
  };
}
