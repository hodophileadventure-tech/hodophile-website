import type { RouteItineraryDay } from "./routes";
export type TourDeparture = {
  id: string;
  journeyId: string;
  destinationSlugs: string[];
  label: string;
  pricePerPerson: number;
};

export type TravelStyle = "family" | "couples" | "adventure" | "tailored";
export type TourExperience = "mountains" | "lakes-valleys" | "beaches" | "nature" | "adventure" | "romance" | "culture" | "offbeat";

export type TourPackage = {
  id: string;
  title: string;
  description: string;
  region: "northern" | "southern";
  destinationSlugs: string[];
  routeStops: string[];
  routeHighlights?: string[];
  itinerary?: RouteItineraryDay[];
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
  experiences: TourExperience[];
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
    image: "/images/package-cards/images__tour-packages__03.webp",
    routeStops: ["Skardu", "Deosai"],
    routeHighlights: ["Deosai high-altitude plateau"],
    bestFor: "Short escape",
    pace: "Fast",
    travelStyles: ["adventure", "couples", "tailored"],
    experiences: ["mountains", "nature", "adventure"],
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
    title: "Skardu & Basho by Air",
    description: "Explore Skardu's alpine scenery and Basho's pine forests on a five-day air-linked escape.",
    region: "northern",
    destinationSlugs: ["skardu"],
    image: "/images/package-cards/images__tour-packages__14.webp",
    routeStops: ["Skardu", "Basho"],
    routeHighlights: ["Basho forest valley"],
    bestFor: "Mountain and forest",
    pace: "Moderate",
    travelStyles: ["adventure", "couples", "tailored"],
    experiences: ["mountains", "nature", "offbeat"],
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
    title: "Skardu & Khaplu",
    description: "A 10-day road journey from Karachi through Chilas, Skardu, Khaplu, and Naran with scenic valley stops and cultural landmarks.",
    region: "northern",
    destinationSlugs: ["skardu", "khaplu"],
    image: "/images/package-cards/images__tour-packages__21.webp",
    routeStops: ["Chilas", "Skardu", "Khaplu", "Naran", "Islamabad"],
    routeHighlights: ["Upper Kachura Lake", "Manthoka and Khamosh Waterfalls", "Khaplu Fort", "Chaqchan Mosque"],
    bestFor: "Baltistan road circuit",
    pace: "Relaxed",
    travelStyles: ["adventure", "family", "tailored"],
    experiences: ["mountains", "lakes-valleys", "nature", "adventure", "culture"],
    duration: "10 Days / 9 Nights",
    pricePerPerson: 47500,
    priceWithoutIslamabadStay: 43500,
    couplePrice: 109000,
    scheduleNote: "Departure from Karachi via bus; tour services start in Chilas and end in Islamabad",
    departureAvailability: "on-request",
    departures: [],
    transport: ["Road transport from Karachi", "4x4 access where required"],
    excludes: ["Train meals", "Self-paid boating, zipline, rafting, and local activities", "Own transport to Islamabad/Rawalpindi hotel or station"],
    itinerary: [
      { day: "Day 1", title: "Departure from Karachi", description: "Depart from Karachi by bus with one meal included. Train travel is possible, but train meals are not included." },
      { day: "Day 2", title: "Rawalpindi / Islamabad", description: "Reach Rawalpindi or Islamabad, transfer to the hotel using own transport such as Uber or Yango, then check in for dinner and the night stay." },
      { day: "Day 3", title: "Islamabad to Chilas", description: "Tour services begin here. Depart at 5:00 AM after breakfast and travel 11–13 hours via Besham and Dassu along the Indus River, with a stop at Summer Nala. Check in at Chilas for dinner and the night stay." },
      { day: "Day 4", title: "Chilas to Skardu Valley", description: "Travel toward Skardu with a stop at Askole Nala. Visit Upper Kachura Lake for boating and zipline activities, then visit Shangrila Resort before checking in late at the Skardu hotel." },
      { day: "Day 5", title: "Skardu to Khaplu", description: "Travel to Khaplu with visits to Manthoka Waterfall and Khamosh Waterfall. Enjoy leisure time, then reach Khaplu late for dinner and the night stay." },
      { day: "Day 6", title: "Khaplu to Skardu", description: "Visit Chaqchan Mosque and Khaplu Fort, then drive west with a stop at Kashal Agri Garden in Ghowari before returning to Skardu for dinner and the night stay." },
      { day: "Day 7", title: "Skardu to Besham / Naran Valley", description: "Depart after breakfast with a stop at the Kunhar River. River rafting may be available if Naran is open. Check in at the Besham or Naran hotel for dinner and the night stay." },
      { day: "Day 8", title: "Naran Valley to Islamabad", description: "Check out early, depart for Islamabad with sightseeing stops, and reach Islamabad. Tour services end here. Karachi participants may require an additional hotel night; dinner is not included." },
      { day: "Day 9", title: "Departure for Karachi", description: "Check out before noon. Breakfast is not included. Travel to the bus or railway station using own transport and depart for Karachi." },
      { day: "Day 10", title: "Arrival in Karachi", description: "Reach Karachi and conclude the journey with the trip memories." },
    ],
  },
  {
    id: "skardu-hunza-air-7-days",
    title: "Skardu & Hunza by Air",
    description: "A flight-linked journey connecting Hunza villages with Skardu's mountain landscapes.",
    region: "northern",
    destinationSlugs: ["skardu", "hunza"],
    image: "/images/package-cards/images__destinations__featured-skardu-hunza.webp",
    routeStops: ["Skardu", "Hunza"],
    routeHighlights: ["Air-linked Skardu and Hunza valley stays"],
    bestFor: "Two-valley journey",
    pace: "Moderate",
    travelStyles: ["family", "couples", "tailored"],
    experiences: ["mountains", "lakes-valleys", "nature", "romance"],
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
    image: "/images/package-cards/images__tour-packages__ormara-beach-camping.png",
    routeStops: ["Ormara Coast"],
    routeHighlights: ["Beachside overnight camp"],
    bestFor: "Coastal camping",
    pace: "Relaxed",
    travelStyles: ["adventure", "family", "tailored"],
    experiences: ["beaches", "nature", "adventure", "offbeat"],
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
    image: "/images/package-cards/images__tour-packages__02.webp",
    routeStops: ["Swat", "Kalam", "Malam Jabba", "Shogran"],
    routeHighlights: ["Kalam valley", "Malam Jabba", "Shogran highlands"],
    bestFor: "Families and varied scenery",
    pace: "Relaxed",
    travelStyles: ["family", "couples", "tailored"],
    experiences: ["mountains", "lakes-valleys", "nature", "romance"],
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
    image: "/images/package-cards/images__tour-packages__06.webp",
    routeStops: ["Kashmir", "Neelum Valley", "Shogran"],
    routeHighlights: ["Neelum Valley", "Arang Kel and Taobat by arrangement", "Shogran highlands"],
    bestFor: "Valley contrast",
    pace: "Relaxed",
    travelStyles: ["family", "couples", "tailored"],
    experiences: ["mountains", "lakes-valleys", "nature", "romance"],
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
    image: "/images/package-cards/images__tour-packages__05.webp",
    routeStops: ["Hunza", "Skardu", "Naran"],
    routeHighlights: ["Three-region mountain circuit", "Saif-ul-Malook jeep excursion"],
    bestFor: "Three-region circuit",
    pace: "Relaxed",
    travelStyles: ["adventure", "family", "tailored"],
    experiences: ["mountains", "lakes-valleys", "nature", "adventure"],
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
    image: "/images/package-cards/images__featured-tours__10days-skardu-deosai.jpg.webp",
    routeStops: ["Skardu", "Deosai", "Naran"],
    routeHighlights: ["Deosai plateau crossing", "Saif-ul-Malook jeep excursion"],
    bestFor: "Highland explorer",
    pace: "Relaxed",
    travelStyles: ["adventure", "family", "tailored"],
    experiences: ["mountains", "lakes-valleys", "nature", "adventure"],
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
    image: "/images/package-cards/images__tour-packages__10.webp",
    duration: "9 Days / 8 Nights",
    pricePerPerson: 46500,
    priceWithoutIslamabadStay: 42500,
    sharingPrices: { quad: 46500, triple: 48500, twin: 52500, solo: 76500 },
    sharingPricesWithoutIslamabadStay: { quad: 42500, triple: 44500, twin: 46500, solo: 62500 },
    scheduleNote: "Departure dates available on request",
    departureAvailability: "on-request",
    departures: [],
    travelStyles: ["family", "couples", "tailored"],
    experiences: ["mountains", "lakes-valleys", "nature", "romance"],
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
    image: "/images/package-cards/images__tour-packages__27.webp",
    duration: "2 Days / 1 Night",
    pricePerPerson: 16500,
    priceWithoutIslamabadStay: 16500,
    sharingPrices: { quad: 16500, triple: 17500, twin: 18500, solo: 18500 },
    sharingPricesWithoutIslamabadStay: { quad: 16500, triple: 17500, twin: 18500, solo: 18500 },
    scheduleNote: "Departure dates available on request",
    departureAvailability: "on-request",
    departures: [],
    travelStyles: ["adventure", "family", "tailored"],
    experiences: ["mountains", "nature", "offbeat"],
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
    image: "/images/package-cards/images__tour-packages__28.webp",
    duration: "2 Days / 1 Night",
    pricePerPerson: 16000,
    priceWithoutIslamabadStay: 16000,
    sharingPrices: { quad: 16000, triple: 17000, twin: 18000, solo: 18000 },
    sharingPricesWithoutIslamabadStay: { quad: 16000, triple: 17000, twin: 18000, solo: 18000 },
    scheduleNote: "Departure dates available on request",
    departureAvailability: "on-request",
    departures: [],
    travelStyles: ["adventure", "family", "tailored"],
    experiences: ["nature", "adventure", "offbeat"],
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