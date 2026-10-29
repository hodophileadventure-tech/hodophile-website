import type { TourExperience, TravelStyle } from "./tour-packages";

export type TourDiscoveryPriceGroup = {
  title: string;
  rows: Array<{ label: string; price: string }>;
  note?: string;
};

export type TourDiscoveryIdea = {
  id: string;
  title: string;
  description: string;
  region: "northern" | "southern";
  destinationSlugs: string[];
  routeStops: string[];
  duration: string;
  image: string;
  travelStyles: TravelStyle[];
  experiences: TourExperience[];
  routeHighlights: string[];
  bestFor: string;
  pace: "Fast" | "Moderate" | "Relaxed";
  pricePerPerson?: number;
  detailHref?: string;
  pricingGroups?: TourDiscoveryPriceGroup[];
  itinerary?: Array<{ day: string; title: string; description: string }>;
  includes?: string[];
  excludes?: string[];
  notes?: string[];
};

export const tourDiscoveryIdeas: TourDiscoveryIdea[] = [
  {
    id: "swat-kalam-malam-jabba-8-days",
    title: "Swat, Kalam & Malam Jabba · 8 Days",
    description: "An eight-day group journey from Karachi or Islamabad through Swat, Malam Jabba, Bahrain, Kalam, and Mahodand Lake.",
    region: "northern",
    destinationSlugs: ["swat", "kalam", "malam-jabba"],
    routeStops: ["Karachi", "Islamabad", "Swat", "Malam Jabba", "Bahrain", "Kalam", "Ushu Forest", "Palogha Valley", "Mahodand Lake"],
    duration: "8 Days / 7 Nights",
    image: "/images/package-cards/images__tour-packages__01.webp",
    travelStyles: ["family", "couples", "adventure", "tailored"],
    experiences: ["mountains", "nature", "adventure"],
    routeHighlights: ["Kalam valley", "Malam Jabba"],
    bestFor: "A short northern escape",
    pace: "Moderate",
    pricePerPerson: 33700,
    pricingGroups: [
      {
        title: "Direct from Islamabad · without Islamabad stay",
        rows: [
          { label: "Quad sharing", price: "PKR 33,700 per person" },
          { label: "Triple sharing", price: "PKR 35,700 per person" },
          { label: "Couple sharing", price: "PKR 39,500 per person" },
          { label: "Single person", price: "PKR 58,700 per person" },
        ],
      },
      {
        title: "With 2 nights Islamabad stay · stay and food",
        rows: [
          { label: "Quad sharing", price: "PKR 36,900 per person" },
          { label: "Couple sharing", price: "PKR 114,000 per person" },
          { label: "Triple sharing", price: "PKR 49,000 per person" },
          { label: "Single person", price: "PKR 114,000 per couple" },
        ],
        note: "Rates and units are transcribed as shown on the supplied poster; confirm the room configuration and rate basis before booking.",
      },
    ],
    includes: [
      "Hotel accommodation",
      "Luxury transport",
      "Breakfast and dinner as specified",
      "Tolls and taxes",
      "Tour guide",
      "Bonfire",
      "Jeep ride to Mahodand Lake",
    ],
    excludes: [
      "Train meals",
      "Breakfast on Day 7",
      "Dinner on Day 6",
      "Transfers to and from the bus or railway station in Islamabad",
    ],
    notes: [
      "Chairlift and zipline fees at Malam Jabba are not listed among the inclusions; confirm their cost before booking.",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Karachi departure",
        description: "Depart Karachi by bus; one meal is included. Meals during train travel are not included if traveling by train.",
      },
      {
        day: "Day 2",
        title: "Arrival in Rawalpindi / Islamabad",
        description: "Arrive in Rawalpindi or Islamabad and transfer to the hotel using your own transport, such as Uber or Yango. Check in, have dinner, and stay overnight. Hotel dinner is for guests booked on the tour.",
      },
      {
        day: "Day 3",
        title: "Islamabad to Swat and Malam Jabba",
        description: "Depart early for Swat via the Swat Expressway, with sightseeing along the way and views of the Swat River. Visit Malam Jabba; chairlift and zipline activities are optional. Check in to the hotel for dinner and the night stay in Malam Jabba or Bahrain.",
      },
      {
        day: "Day 4",
        title: "Malam Jabba to Kalam",
        description: "Depart early for Kalam, sightseeing along the river and passing through Bahrain. Check in to the Kalam hotel, explore Kalam Bazaar at leisure, and stay overnight after dinner.",
      },
      {
        day: "Day 5",
        title: "Mahodand Lake excursion",
        description: "Travel by 4x4 jeep to Mahodand Lake, visiting Ushu Forest and Palogha Valley along the way. Enjoy a boat ride and leisure time at the lake, then return to Kalam for dinner and the night stay.",
      },
      {
        day: "Day 6",
        title: "Kalam to Islamabad",
        description: "Check out and depart for Islamabad with sightseeing stops along the way. Tour services end on arrival in Islamabad. Karachi participants may check in to a hotel for the night; dinner is not included.",
      },
      {
        day: "Day 7",
        title: "Islamabad departure for Karachi",
        description: "Check out before noon. Breakfast is not included. Travel to the bus or railway station using your own transport and depart for Karachi.",
      },
      {
        day: "Day 8",
        title: "Arrival in Karachi",
        description: "Arrive in Karachi and conclude the tour.",
      },
    ],
  },
  {
    id: "kashmir-arangkel-3-days",
    title: "Neelum Valley, Kel & Arang Kel",
    description: "A three-day Islamabad tour to Keran, Kel, and Arang Kel in Neelum Valley.",
    region: "northern",
    destinationSlugs: ["kashmir", "neelum-valley", "arang-kel"],
    routeStops: ["Islamabad", "Keran", "Neelum Valley", "Kel", "Arang Kel", "Kutton Waterfall"],
    duration: "3 Days / 2 Nights",
    image: "/images/package-cards/images__destinations__kashmir.webp",
    travelStyles: ["family", "couples", "adventure", "tailored"],
    experiences: ["mountains", "lakes-valleys", "nature", "adventure"],
    routeHighlights: ["Keran", "Kel", "Arang Kel", "Kutton Waterfall"],
    bestFor: "A short Neelum Valley escape",
    pace: "Fast",
    pricePerPerson: 22000,
    includes: ["Accommodation", "Luxury transport", "Breakfast", "Tolls and taxes", "Tour guide", "Bonfire"],
    itinerary: [
      {
        day: "Day 1",
        title: "Islamabad to Keran",
        description: "Depart for Keran with breakfast on the way. Make short sightseeing stops at Kashmir Waterfall, Dhani Waterfall, the Neelum Jhelum Hydropower Project, and Chilana LOC. Arrive in Keran or Upper Neelum Valley for the overnight stay.",
      },
      {
        day: "Day 2",
        title: "Keran, Kel, and Arang Kel",
        description: "Depart for Kel and take a short Doli ride to reach the trail. Trek to Arang Kel for approximately 30–45 minutes on a dusty, rugged trail if accessible. Spend leisure time there, return to Kel, then drive back to Keran for hotel check-in and the night stay.",
      },
      {
        day: "Day 3",
        title: "Keran to Islamabad",
        description: "Depart for Islamabad with a short stop at Kutton Waterfall. Return to Islamabad for participant drop-off; tour services end on arrival.",
      },
    ],
    notes: [
      "The Arang Kel trek is approximately 30–45 minutes on a dusty, rugged trail and depends on access.",
      "Confirm the current rate and package configuration for your requested dates.",
    ],
  },
  {
    id: "swat-kalam-malam-jabba-shogran-10-days",
    title: "Swat, Kalam, Malam Jabba & Shogran",
    description: "A ten-day route linking Swat, Kalam, Malam Jabba, and Shogran. Ask us to confirm the route, dates, and current quotation.",
    region: "northern",
    destinationSlugs: ["swat", "kalam", "malam-jabba", "shogran"],
    routeStops: ["Swat", "Kalam", "Malam Jabba", "Shogran"],
    duration: "10 Days / 9 Nights",
    image: "/images/package-cards/images__tour-packages__08.webp",
    travelStyles: ["family", "couples", "adventure", "tailored"],
    experiences: ["mountains", "nature", "adventure"],
    routeHighlights: ["Kalam valley", "Malam Jabba", "Shogran highlands"],
    bestFor: "A longer northern circuit",
    pace: "Relaxed",
  },
  {
    id: "skardu-manthoka-basho-10-days",
    title: "Skardu, Manthoka & Basho",
    description: "A ten-day Baltistan journey featuring Skardu, Manthoka, and Basho. Ask us to confirm the route, dates, and current quotation.",
    region: "northern",
    destinationSlugs: ["skardu", "manthoka", "basho"],
    routeStops: ["Skardu", "Manthoka", "Basho"],
    duration: "10 Days / 9 Nights",
    image: "/images/package-cards/images__tour-packages__23.webp",
    travelStyles: ["family", "adventure", "tailored"],
    experiences: ["mountains", "nature", "offbeat"],
    routeHighlights: ["Manthoka Waterfall", "Basho valley"],
    bestFor: "Baltistan's waterfalls and forests",
    pace: "Relaxed",
  },
  {
    id: "hunza-naltar-10-days",
    title: "10 Days Naran, Hunza & Naltar",
    description: "A ten-day group journey through Naran, Hunza, and Naltar Valley, including Naltar's alpine lakes and Hunza's historic forts.",
    region: "northern",
    destinationSlugs: ["naran", "hunza", "naltar"],
    routeStops: ["Naran", "Hunza", "Naltar Valley"],
    duration: "10 Days / 9 Nights",
    image: "/images/package-cards/images__tour-packages__13.webp",
    travelStyles: ["family", "couples", "adventure", "tailored"],
    experiences: ["mountains", "lakes-valleys", "nature", "romance"],
    routeHighlights: ["Naltar Alpine Lakes", "Baltit Fort", "Attabad Lake", "Khunjerab Pass"],
    bestFor: "A northern group circuit",
    pace: "Relaxed",
    pricePerPerson: 39000,
    detailHref: "/tours/featured/hunza-naltar",
  },
  {
    id: "hunza-skardu-12-days",
    title: "Hunza & Skardu",
    description: "A twelve-day journey connecting Hunza and Skardu, distinct from the Naran-inclusive circuit. Ask us to confirm the route, dates, and current quotation.",
    region: "northern",
    destinationSlugs: ["hunza", "skardu"],
    routeStops: ["Hunza", "Skardu"],
    duration: "12 Days / 11 Nights",
    image: "/images/package-cards/images__tour-packages__09.webp",
    travelStyles: ["family", "couples", "adventure", "tailored"],
    experiences: ["mountains", "lakes-valleys", "nature", "romance"],
    routeHighlights: ["Hunza", "Skardu"],
    bestFor: "A two-region mountain circuit",
    pace: "Relaxed",
  },
  {
    id: "naran-shogran-9-days",
    title: "Naran & Shogran",
    description: "A nine-day journey through Naran and Shogran. Ask us to confirm the route, dates, and current quotation.",
    region: "northern",
    destinationSlugs: ["naran", "shogran"],
    routeStops: ["Naran", "Shogran"],
    duration: "9 Days / 8 Nights",
    image: "/images/package-cards/images__tour-packages__43.webp",
    travelStyles: ["family", "couples", "adventure", "tailored"],
    experiences: ["mountains", "lakes-valleys", "nature", "romance"],
    routeHighlights: ["Naran", "Shogran"],
    bestFor: "A twin-valley getaway",
    pace: "Relaxed",
  },
  {
    id: "ranikot-fort-2-days",
    title: "Ranikot Fort Weekend",
    description: "A short southern escape to Ranikot Fort. Ask us to confirm the route, dates, and current quotation.",
    region: "southern",
    destinationSlugs: ["ranikot"],
    routeStops: ["Ranikot Fort"],
    duration: "2 Days / 1 Night",
    image: "/images/package-cards/images__tour-packages__30.webp",
    travelStyles: ["family", "adventure", "tailored"],
    experiences: ["nature", "culture", "offbeat"],
    routeHighlights: ["Ranikot Fort"],
    bestFor: "A short heritage escape",
    pace: "Moderate",
  },
  {
    id: "charo-machi-2-days",
    title: "Charo Machi Weekend",
    description: "A short southern escape to Charo Machi. Ask us to confirm the route, dates, and current quotation.",
    region: "southern",
    destinationSlugs: ["charo-machi"],
    routeStops: ["Charo Machi"],
    duration: "2 Days / 1 Night",
    image: "/images/package-cards/images__tour-packages__34.webp",
    travelStyles: ["family", "adventure", "tailored"],
    experiences: ["nature", "adventure", "offbeat"],
    routeHighlights: ["Charo Machi"],
    bestFor: "A short offbeat adventure",
    pace: "Fast",
  },
];
