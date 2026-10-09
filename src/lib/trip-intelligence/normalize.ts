import type { TourPackage, TravelStyle } from "@/lib/data/tour-packages";

import type { DurationPreference, NormalizedTrip } from "./types";

export const DEPARTURE_MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
] as const;

export function normalizeText(value?: string | null): string {
  return (value ?? "").trim().toLowerCase();
}

export function normalizeDestinationSlug(value?: string | null): string {
  const cleaned = normalizeText(value).replace(/[^a-z0-9]+/g, "-");
  return cleaned.replace(/^-+|-+$/g, "");
}

export function parseDurationDays(duration?: string | null): number {
  if (!duration) return 0;
  const match = duration.match(/(\d+)/);
  return match ? Number.parseInt(match[1], 10) : 0;
}

export function durationMatchesPreference(durationDays: number, preference?: DurationPreference): boolean {
  if (!preference || preference === "all") return true;

  switch (preference) {
    case "weekend":
      return durationDays <= 3;
    case "4-7":
      return durationDays >= 4 && durationDays <= 7;
    case "8-12":
      return durationDays >= 8 && durationDays <= 12;
    case "12-plus":
      return durationDays > 12;
    default:
      return true;
  }
}

export function getDepartureMonthsFromTrip(trip: Pick<TourPackage, "departures" | "scheduleNote" | "departureAvailability">): string[] {
  const departureText = (trip.departures.length ? trip.departures.map((departure) => departure.label) : [trip.scheduleNote ?? ""])
    .join(" ")
    .toLowerCase();

  if (!departureText.trim()) return [];

  const monthPattern = new RegExp(`\\b(${DEPARTURE_MONTHS.join("|")})\\b`, "g");
  const matches = [...departureText.matchAll(monthPattern)].map((match) => match[1]);
  return [...new Set(matches)];
}

export function normalizeTrip(trip: Partial<TourPackage> & { id: string; title: string; region: "northern" | "southern" }): NormalizedTrip {
  const destinationSlugs = Array.isArray(trip.destinationSlugs)
    ? trip.destinationSlugs.map((destinationSlug) => normalizeDestinationSlug(destinationSlug)).filter(Boolean)
    : [];

  const travelStyles = Array.isArray(trip.travelStyles)
    ? trip.travelStyles.filter((style): style is TravelStyle => typeof style === "string" && style.length > 0)
    : [];

  const routeStops = Array.isArray(trip.routeStops)
    ? trip.routeStops.filter((stop): stop is string => typeof stop === "string" && stop.trim().length > 0)
    : [];

  return {
    id: trip.id,
    title: trip.title,
    region: trip.region,
    destinationSlugs,
    routeStops,
    travelStyles,
    pricePerPerson: trip.priceOnRequest ? 0 : Number(trip.pricePerPerson) || 0,
    priceOnRequest: trip.priceOnRequest,
    durationDays: parseDurationDays(trip.duration),
    durationLabel: trip.duration ?? "",
    departureMonths: getDepartureMonthsFromTrip({
      departures: Array.isArray(trip.departures) ? trip.departures : [],
      scheduleNote: trip.scheduleNote,
      departureAvailability: trip.departureAvailability ?? "on-request",
    }),
    blockedDepartureMonths: Array.isArray(trip.blockedDepartureMonths)
      ? trip.blockedDepartureMonths.map((month) => normalizeText(month)).filter(Boolean)
      : [],
    departureAvailability: trip.departureAvailability ?? "on-request",
    departureNote: trip.scheduleNote,
    summary: trip.description ?? "",
  };
}
