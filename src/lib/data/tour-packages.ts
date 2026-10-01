export type TourDeparture = {
  id: string;
  journeyId: string;
  destinationSlugs: string[];
  label: string;
  pricePerPerson: number;
};

export type TravelStyle = "family" | "couples" | "adventure" | "tailored";

export type TourPackage = {
  id: string;
  title: string;
  description: string;
  region: "northern" | "southern";
  destinationSlugs: string[];
  routeStops: string[];
  routeHighlights?: string[];
  bestFor?: string;
  pace?: "Fast" | "Moderate" | "Relaxed";
  image: string;
  duration: string;
  pricePerPerson: number;
  priceWithoutIslamabadStay?: number;
  sharingPrices?: {
    quad: number;
    triple: number;
    twin: number;
    solo: number;
  };
  sharingPricesWithoutIslamabadStay?: {
    quad: number;
    triple: number;
    twin: number;
    solo: number;
  };
  couplePrice?: number;
  scheduleNote?: string;
  blockedDepartureMonths?: string[];
  departureAvailability: "confirmed" | "on-request";
  departures: TourDeparture[];
  travelStyles: TravelStyle[];
  transport?: string[];
  includes?: string[];
  excludes?: string[];
  notes?: string[];
};

const northernTransport = ["Comfortable transport", "Tour manager", "Bonfire"];

export const tourPackages: TourPackage[] = [
  {
    id: "skardu-deosai-air-3-days",
    title: "Skardu & Deosai by Air",
    description: "Base in Skardu and cross the Deosai plateau for wide-open highland scenery and a focused short escape.",
    region: "northern",
    destinationSlugs: ["skardu"],
    image: "/images/tour-packages/03.webp",
    routeStops: ["Skardu", "Deosai"],
    routeHighlights: ["Deosai high-altitude plateau"],
    bestFor: "Short escape",
    pace: "Fast",
    travelStyles: ["adventure", "couples", "tailored"],
    duration: "3 Days",
    pricePerPerson: 45000,
    couplePrice: 70000,
    scheduleNote: "KDU-to-KDU by air; flights from Karachi, Lahore, or Islamabad",
    departureAvailability: "on-request",
    departures: [],
    transport: ["Corolla G/X for 2 days", "Land Cruiser Prado for Deosai (1992-95 model)"],
    excludes: ["Air tickets", "Airport pick and drop"],
  },
  {
    id: "skardu-deosai-basho-air-5-days",
    title: "Skardu, Deosai & Basho by Air",
    description: "Skardu's alpine lakes meet Basho's forest scenery, with Deosai added for high-altitude views.",
    region: "northern",
    destinationSlugs: ["skardu"],
    image: "/images/tour-packages/14.webp",
    routeStops: ["Skardu", "Deosai", "Basho"],
    routeHighlights: ["Deosai plateau crossing", "Basho forest valley"],
    bestFor: "Mountain and forest",
    pace: "Moderate",
    travelStyles: ["adventure", "couples", "tailored"],
    duration: "5 Days",
    pricePerPerson: 60000,
    couplePrice: 90000,
    scheduleNote: "KDU-to-KDU by air; flights from Karachi, Lahore, or Islamabad",
    departureAvailability: "on-request",
    departures: [],
    transport: ["Corolla G/X for 2 days", "Land Cruiser Prado for 2 days (1992-95 model)"],
    excludes: ["Air tickets", "Airport pick and drop"],
  },
  {
    id: "skardu-khaplu-deosai-basho-air-7-days",
    title: "Skardu, Khaplu, Deosai & Basho by Air",
    description: "A longer Baltistan circuit pairing Khaplu heritage with Deosai's high plains and Basho's forested valleys.",
    region: "northern",
    destinationSlugs: ["skardu", "khaplu"],
    image: "/images/tour-packages/21.webp",
    routeStops: ["Skardu", "Khaplu", "Deosai", "Basho"],
    routeHighlights: ["Khaplu heritage", "Deosai plateau crossing", "Basho forest valley"],
    bestFor: "Full Baltistan circuit",
    pace: "Relaxed",
    travelStyles: ["adventure", "family", "tailored"],
    duration: "7 Days",
    pricePerPerson: 90000,
    couplePrice: 140000,
    scheduleNote: "KDU-to-KDU by air; flights from Karachi, Lahore, or Islamabad",
    departureAvailability: "on-request",
    departures: [],
    transport: ["Corolla G/X for 4 days", "Land Cruiser Prado for 2 days (1992-95 model)"],
    excludes: ["Air tickets", "Airport pick and drop"],
  },
  {
    id: "skardu-hunza-air-7-days",
    title: "Skardu & Hunza by Air",
    description: "A flight-linked journey connecting Hunza villages with Skardu's mountain landscapes.",
    region: "northern",
    destinationSlugs: ["skardu", "hunza"],
    image: "/images/destinations/featured-skardu-hunza.webp",
    routeStops: ["Skardu", "Hunza"],
    routeHighlights: ["Air-linked Skardu and Hunza valley stays"],
    bestFor: "Two-valley journey",
    pace: "Moderate",
    travelStyles: ["family", "couples", "tailored"],
    duration: "7 Days",
    pricePerPerson: 100000,
    couplePrice: 180000,
    scheduleNote: "KDU-to-KDU by air; flights from Karachi, Lahore, or Islamabad",
    departureAvailability: "on-request",
    departures: [],
    transport: ["Corolla G/X for 4 days", "Land Cruiser Prado for 2 days (1992-95 model)"],
    excludes: ["Air tickets", "Airport pick and drop"],
  },
  {
    id: "ormara-beach-camping",
    title: "Ormara Beach Night Camping",
    description: "Spend the night on the Makran coast with a beachside camp and a weekend rhythm away from the city.",
    region: "southern",
    destinationSlugs: ["ormara"],
    image: "/images/tour-packages/25.webp",
    routeStops: ["Ormara Coast"],
    routeHighlights: ["Beachside overnight camp"],
    bestFor: "Coastal camping",
    pace: "Relaxed",
    travelStyles: ["adventure", "family", "tailored"],
    duration: "2 Days / 1 Night",
    pricePerPerson: 13500,
    scheduleNote: "Every weekend: Saturday morning to Sunday evening",
    departureAvailability: "on-request",
    departures: [],
    notes: ["Private weekday trips are available for groups of 12-20 people."],
  },
  {
    id: "swat-kalam-shogran-10-days",
    title: "Swat, Kalam & Shogran",
    description: "A multi-stop trip linking Swat and Kalam with Shogran, based on the listed route stops.",
    region: "northern",
    destinationSlugs: ["swat", "shogran"],
    image: "/images/tour-packages/02.webp",
    routeStops: ["Swat", "Kalam", "Malam Jabba", "Shogran"],
    routeHighlights: ["Kalam valley", "Malam Jabba", "Shogran highlands"],
    bestFor: "Families and varied scenery",
    pace: "Relaxed",
    travelStyles: ["family", "couples", "tailored"],
    duration: "10 Days",
    pricePerPerson: 42000,
    couplePrice: 94000,
    scheduleNote: "Every Monday early morning from Islamabad",
    departureAvailability: "on-request",
    departures: [],
    transport: ["Luxury transport", "Land Cruiser"],
    includes: ["2 nights Islamabad hotel stay", "Standard accommodation", "Breakfast and dinner", ...northernTransport, "Basic phone photography"],
    notes: ["No hidden charges."],
  },
  {
    id: "kashmir-shogran-9-days",
    title: "Kashmir & Shogran",
    description: "A valley route linking Kashmir and Shogran; confirm the schedule and access for requested dates.",
    region: "northern",
    destinationSlugs: ["kashmir", "shogran"],
    image: "/images/tour-packages/06.webp",
    routeStops: ["Kashmir", "Neelum Valley", "Shogran"],
    routeHighlights: ["Neelum Valley", "Arang Kel and Taobat by arrangement", "Shogran highlands"],
    bestFor: "Valley contrast",
    pace: "Relaxed",
    travelStyles: ["family", "couples", "tailored"],
    duration: "9 Days",
    pricePerPerson: 39000,
    couplePrice: 90000,
    scheduleNote: "Every Monday early morning from Islamabad",
    departureAvailability: "on-request",
    departures: [],
    transport: ["Luxury transport", "Land Cruiser"],
    includes: ["2 nights Islamabad hotel stay", "Standard accommodation", "Breakfast and dinner", ...northernTransport, "Basic phone photography"],
    notes: ["No hidden charges."],
  },
  {
    id: "hunza-skardu-naran-12-days",
    title: "Hunza, Skardu & Naran",
    description: "A three-region mountain circuit across Hunza, Skardu, and Naran. Confirm the schedule and access for requested dates.",
    region: "northern",
    destinationSlugs: ["hunza", "skardu", "naran"],
    image: "/images/tour-packages/05.webp",
    routeStops: ["Hunza", "Skardu", "Naran"],
    routeHighlights: ["Three-region mountain circuit", "Saif-ul-Malook jeep excursion"],
    bestFor: "Three-region circuit",
    pace: "Relaxed",
    travelStyles: ["adventure", "family", "tailored"],
    duration: "12 Days",
    pricePerPerson: 68000,
    couplePrice: 155400,
    scheduleNote: "Every Friday evening from Karachi; Sunday early morning from Islamabad",
    departureAvailability: "on-request",
    departures: [],
    transport: ["Comfortable transport", "Prado (1990-92 model) for Deosai", "Local jeep for Saif-ul-Malook"],
    includes: ["Youtong return bus tickets Karachi-Islamabad-Karachi", "2 nights Islamabad stay", "Dinner for Islamabad stay (one side)", "Standard hotel on quad-sharing basis", "Half-board meals", ...northernTransport],
    notes: ["Directly joining from Islamabad: PKR 49,700 per person or PKR 113,400 per couple."],
  },
  {
    id: "skardu-deosai-naran-10-days",
    title: "Skardu, Deosai & Naran",
    description: "A multi-region journey linking Skardu, Deosai, and Naran. Confirm the day-by-day schedule and access for requested dates.",
    region: "northern",
    destinationSlugs: ["skardu", "naran"],
    image: "/images/featured-tours/10days-skardu-deosai.jpg.webp",
    routeStops: ["Skardu", "Deosai", "Naran"],
    routeHighlights: ["Deosai plateau crossing", "Saif-ul-Malook jeep excursion"],
    bestFor: "Highland explorer",
    pace: "Relaxed",
    travelStyles: ["adventure", "family", "tailored"],
    duration: "10 Days",
    pricePerPerson: 59500,
    couplePrice: 139000,
    scheduleNote: "Every Friday evening from Karachi; Sunday early morning from Islamabad",
    departureAvailability: "on-request",
    departures: [],
    transport: ["Comfortable transport", "Prado (1990-92 model) for Deosai", "Local jeep for Saif-ul-Malook"],
    includes: ["Youtong return bus tickets Karachi-Islamabad-Karachi", "2 nights Islamabad stay", "Dinner for Islamabad stay (one side)", "Standard hotel on quad-sharing basis", "Half-board meals", ...northernTransport],
    notes: ["Directly joining from Islamabad: PKR 39,500 per person or PKR 89,000 per couple."],
  },
  {
    id: "seasonal-11",
    title: "Kashmir with Arang Kel & Taobat",
    description: "Follow the Neelum Valley toward Arang Kel and Taobat, subject to current access.",
    region: "northern",
    destinationSlugs: ["kashmir"],
    routeStops: ["Kashmir", "Arang Kel", "Taobat"],
    routeHighlights: ["Neelum Valley", "Arang Kel", "Taobat"],
    bestFor: "Valley explorer",
    image: "/images/tour-packages/10.webp",
    duration: "9 Days / 8 Nights",
    pricePerPerson: 46500,
    priceWithoutIslamabadStay: 42500,
    sharingPrices: { quad: 46500, triple: 48500, twin: 52500, solo: 76500 },
    sharingPricesWithoutIslamabadStay: { quad: 42500, triple: 44500, twin: 46500, solo: 62500 },
    scheduleNote: "Departure dates available on request",
    departureAvailability: "on-request",
    departures: [],
    travelStyles: ["family", "couples", "tailored"],
    notes: [
      "Quad sharing from PKR 46,500 with Islamabad stays, or PKR 42,500 without them.",
      "Room rates: triple PKR 48,500, twin PKR 52,500, solo PKR 76,500.",
    ],
  },
  {
    id: "seasonal-53",
    title: "02 Days Gorakh Hill Station",
    description: "A short Gorakh Hill journey; confirm itinerary, access, and current availability for requested dates.",
    region: "southern",
    destinationSlugs: ["gorakh"],
    routeStops: ["Gorakh Hill"],
    bestFor: "Highland weekend",
    image: "/images/tour-packages/27.webp",
    duration: "2 Days / 1 Night",
    pricePerPerson: 16500,
    priceWithoutIslamabadStay: 16500,
    sharingPrices: { quad: 16500, triple: 17500, twin: 18500, solo: 18500 },
    sharingPricesWithoutIslamabadStay: { quad: 16500, triple: 17500, twin: 18500, solo: 18500 },
    scheduleNote: "Available on request; October to March departures only.",
    blockedDepartureMonths: ["april", "may", "june", "july", "august", "september"],
    departureAvailability: "on-request",
    departures: [],
    travelStyles: ["adventure", "family", "tailored"],
    notes: [
      "Quad sharing from PKR 16,500 with Islamabad stays, or PKR 16,500 without them.",
      "Room rates: triple PKR 17,500, twin PKR 18,500, solo PKR 18,500.",
    ],
  },
  {
    id: "seasonal-54",
    title: "02 Days Moola Chotok",
    description: "A short Moola Chotok journey; confirm itinerary, access, and current availability for requested dates.",
    region: "southern",
    destinationSlugs: ["moola"],
    routeStops: ["Moola Chotok"],
    bestFor: "Canyon adventure",
    image: "/images/tour-packages/28.webp",
    duration: "2 Days / 1 Night",
    pricePerPerson: 16000,
    priceWithoutIslamabadStay: 16000,
    sharingPrices: { quad: 16000, triple: 17000, twin: 18000, solo: 18000 },
    sharingPricesWithoutIslamabadStay: { quad: 16000, triple: 17000, twin: 18000, solo: 18000 },
    scheduleNote: "Available on request; October to March departures only.",
    blockedDepartureMonths: ["april", "may", "june", "july", "august", "september"],
    departureAvailability: "on-request",
    departures: [],
    travelStyles: ["adventure", "family", "tailored"],
    notes: [
      "Quad sharing from PKR 16,000 with Islamabad stays, or PKR 16,000 without them.",
      "Room rates: triple PKR 17,000, twin PKR 18,000, solo PKR 18,000.",
    ],
  },
];

export function getTourPackagesForDestination(destinationSlug: string) {
  return tourPackages.filter((tourPackage) => tourPackage.destinationSlugs.includes(destinationSlug));
}

export function getTourPackageById(id: string) {
  return tourPackages.find((tourPackage) => tourPackage.id === id);
}

export function getTourPackagesForRegion(region: TourPackage["region"]) {
  return tourPackages.filter((tourPackage) => tourPackage.region === region);
}

export function getTourPackagesForTravelStyle(travelStyle: TravelStyle) {
  return tourPackages.filter((tourPackage) => tourPackage.travelStyles.includes(travelStyle));
}