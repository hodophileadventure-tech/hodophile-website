import { seasonalTourPackages } from "./seasonal-tour-packages";

export type TourDeparture = {
  id: string;
  label: string;
  pricePerPerson: number;
};

export type TravelStyle = "family" | "couples" | "adventure" | "tailored";

export type TourPackage = {
  id: string;
  title: string;
  destinationSlugs: string[];
  routeStops?: string[];
  routeHighlights?: string[];
  bestFor?: string;
  pace?: "Fast" | "Moderate" | "Relaxed";
  region?: "northern" | "southern";
  image?: string;
  duration: string;
  pricePerPerson: number;
  priceWithoutIslamabadStay?: number;
  sharingPrices?: {
    quad: number;
    triple: number;
    twin: number;
    solo: number;
  };
  couplePrice?: number;
  departure?: string;
  departureAvailability?: "confirmed" | "on-request";
  departures?: TourDeparture[];
  travelStyles?: TravelStyle[];
  transport?: string[];
  includes?: string[];
  excludes?: string[];
  notes?: string[];
};

const northernTransport = ["Comfortable transport", "Tour manager", "Bonfire"];

const coreTourPackages: TourPackage[] = [
  {
    id: "skardu-deosai-air-3-days",
    title: "Skardu & Deosai by Air",
    destinationSlugs: ["skardu"],
    routeStops: ["Skardu", "Deosai"],
    routeHighlights: ["Deosai high-altitude plateau"],
    bestFor: "Short escape",
    pace: "Fast",
    travelStyles: ["adventure", "couples", "tailored"],
    duration: "3 Days",
    pricePerPerson: 45000,
    couplePrice: 70000,
    departure: "KDU-to-KDU by air; flights from Karachi, Lahore, or Islamabad",
    transport: ["Corolla G/X for 2 days", "Land Cruiser Prado for Deosai (1992-95 model)"],
    excludes: ["Air tickets", "Airport pick and drop"],
  },
  {
    id: "skardu-deosai-basho-air-5-days",
    title: "Skardu, Deosai & Basho by Air",
    destinationSlugs: ["skardu"],
    routeStops: ["Skardu", "Deosai", "Basho"],
    routeHighlights: ["Deosai plateau crossing", "Basho forest valley"],
    bestFor: "Mountain and forest",
    pace: "Moderate",
    travelStyles: ["adventure", "couples", "tailored"],
    duration: "5 Days",
    pricePerPerson: 60000,
    couplePrice: 90000,
    departure: "KDU-to-KDU by air; flights from Karachi, Lahore, or Islamabad",
    transport: ["Corolla G/X for 2 days", "Land Cruiser Prado for 2 days (1992-95 model)"],
    excludes: ["Air tickets", "Airport pick and drop"],
  },
  {
    id: "skardu-khaplu-deosai-basho-air-7-days",
    title: "Skardu, Khaplu, Deosai & Basho by Air",
    destinationSlugs: ["skardu", "khaplu"],
    routeStops: ["Skardu", "Khaplu", "Deosai", "Basho"],
    routeHighlights: ["Khaplu heritage", "Deosai plateau crossing", "Basho forest valley"],
    bestFor: "Full Baltistan circuit",
    pace: "Relaxed",
    travelStyles: ["adventure", "family", "tailored"],
    duration: "7 Days",
    pricePerPerson: 90000,
    couplePrice: 140000,
    departure: "KDU-to-KDU by air; flights from Karachi, Lahore, or Islamabad",
    transport: ["Corolla G/X for 4 days", "Land Cruiser Prado for 2 days (1992-95 model)"],
    excludes: ["Air tickets", "Airport pick and drop"],
  },
  {
    id: "skardu-hunza-air-7-days",
    title: "Skardu & Hunza by Air",
    destinationSlugs: ["skardu", "hunza"],
    routeStops: ["Skardu", "Hunza"],
    routeHighlights: ["Air-linked Skardu and Hunza valley stays"],
    bestFor: "Two-valley journey",
    pace: "Moderate",
    travelStyles: ["family", "couples", "tailored"],
    duration: "7 Days",
    pricePerPerson: 100000,
    couplePrice: 180000,
    departure: "KDU-to-KDU by air; flights from Karachi, Lahore, or Islamabad",
    transport: ["Corolla G/X for 4 days", "Land Cruiser Prado for 2 days (1992-95 model)"],
    excludes: ["Air tickets", "Airport pick and drop"],
  },
  {
    id: "ormara-beach-camping",
    title: "Ormara Beach Night Camping",
    destinationSlugs: ["ormara"],
    routeStops: ["Ormara Coast"],
    routeHighlights: ["Beachside overnight camp"],
    bestFor: "Coastal camping",
    pace: "Relaxed",
    travelStyles: ["adventure", "family", "tailored"],
    duration: "2 Days / 1 Night",
    pricePerPerson: 13500,
    departure: "Every weekend: Saturday morning to Sunday evening",
    notes: ["Private weekday trips are available for groups of 12-20 people."],
  },
  {
    id: "swat-kalam-shogran-10-days",
    title: "Swat, Kalam & Shogran",
    destinationSlugs: ["swat", "shogran"],
    routeStops: ["Swat", "Kalam", "Malam Jabba", "Shogran"],
    routeHighlights: ["Kalam valley", "Malam Jabba", "Shogran highlands"],
    bestFor: "Families and varied scenery",
    pace: "Relaxed",
    travelStyles: ["family", "couples", "tailored"],
    duration: "10 Days",
    pricePerPerson: 42000,
    couplePrice: 94000,
    departure: "Every Monday early morning from Islamabad",
    transport: ["Luxury transport", "Land Cruiser"],
    includes: ["2 nights Islamabad hotel stay", "Standard accommodation", "Breakfast and dinner", ...northernTransport, "Basic phone photography"],
    notes: ["No hidden charges."],
  },
  {
    id: "kashmir-shogran-9-days",
    title: "Kashmir & Shogran",
    destinationSlugs: ["kashmir", "shogran"],
    routeStops: ["Kashmir", "Neelum Valley", "Shogran"],
    routeHighlights: ["Neelum Valley", "Arang Kel and Taobat by arrangement", "Shogran highlands"],
    bestFor: "Valley contrast",
    pace: "Relaxed",
    travelStyles: ["family", "couples", "tailored"],
    duration: "9 Days",
    pricePerPerson: 39000,
    couplePrice: 90000,
    departure: "Every Monday early morning from Islamabad",
    transport: ["Luxury transport", "Land Cruiser"],
    includes: ["2 nights Islamabad hotel stay", "Standard accommodation", "Breakfast and dinner", ...northernTransport, "Basic phone photography"],
    notes: ["No hidden charges."],
  },
  {
    id: "hunza-skardu-naran-12-days",
    title: "Hunza, Skardu & Naran",
    destinationSlugs: ["hunza", "skardu", "naran"],
    routeStops: ["Hunza", "Skardu", "Naran"],
    routeHighlights: ["Three-region mountain circuit", "Saif-ul-Malook jeep excursion"],
    bestFor: "Three-region circuit",
    pace: "Relaxed",
    travelStyles: ["adventure", "family", "tailored"],
    duration: "12 Days",
    pricePerPerson: 68000,
    couplePrice: 155400,
    departure: "Every Friday evening from Karachi; Sunday early morning from Islamabad",
    transport: ["Comfortable transport", "Prado (1990-92 model) for Deosai", "Local jeep for Saif-ul-Malook"],
    includes: ["Youtong return bus tickets Karachi-Islamabad-Karachi", "2 nights Islamabad stay", "Dinner for Islamabad stay (one side)", "Standard hotel on quad-sharing basis", "Half-board meals", ...northernTransport],
    notes: ["Directly joining from Islamabad: PKR 49,700 per person or PKR 113,400 per couple."],
  },
  {
    id: "skardu-deosai-naran-10-days",
    title: "Skardu, Deosai & Naran",
    destinationSlugs: ["skardu", "naran"],
    routeStops: ["Skardu", "Deosai", "Naran"],
    routeHighlights: ["Deosai plateau crossing", "Saif-ul-Malook jeep excursion"],
    bestFor: "Highland explorer",
    pace: "Relaxed",
    travelStyles: ["adventure", "family", "tailored"],
    duration: "10 Days",
    pricePerPerson: 59500,
    couplePrice: 139000,
    departure: "Every Friday evening from Karachi; Sunday early morning from Islamabad",
    transport: ["Comfortable transport", "Prado (1990-92 model) for Deosai", "Local jeep for Saif-ul-Malook"],
    includes: ["Youtong return bus tickets Karachi-Islamabad-Karachi", "2 nights Islamabad stay", "Dinner for Islamabad stay (one side)", "Standard hotel on quad-sharing basis", "Half-board meals", ...northernTransport],
    notes: ["Directly joining from Islamabad: PKR 39,500 per person or PKR 89,000 per couple."],
  },
];

function normalizeJourneyTitle(title: string) {
  return title
    .replace(/^\s*\d+\s*days?\s+tour\s+to\s+/i, "")
    .replace(/^blossom special\s*-?\s*/i, "")
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/\band\b/gi, "&")
    .replace(/[^a-z0-9]+/gi, " ")
    .trim()
    .toLowerCase();
}

const seasonalJourneys = new Map<string, TourPackage>();

for (const seasonalPackage of seasonalTourPackages) {
  const journeyKey = `${normalizeJourneyTitle(seasonalPackage.title)}|${seasonalPackage.duration}`;
  const existingJourney = seasonalJourneys.get(journeyKey);
  const confirmedDepartures = seasonalPackage.departureAvailability === "confirmed"
    ? [{
        id: seasonalPackage.id,
        label: seasonalPackage.departure ?? "Confirmed dates",
        pricePerPerson: seasonalPackage.pricePerPerson,
      }]
    : [];

  if (existingJourney) {
    existingJourney.departures = [...(existingJourney.departures ?? []), ...confirmedDepartures];
    continue;
  }

  seasonalJourneys.set(journeyKey, {
    ...seasonalPackage,
    departures: confirmedDepartures,
  });
}

export const tourPackages: TourPackage[] = [
  ...coreTourPackages,
  ...seasonalJourneys.values(),
];

export function getTourPackagesForDestination(destinationSlug: string) {
  return tourPackages.filter((tourPackage) => tourPackage.destinationSlugs.includes(destinationSlug));
}