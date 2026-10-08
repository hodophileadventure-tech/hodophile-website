import type { TourExperience, TravelStyle } from "./tour-packages";

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
};

export const tourDiscoveryIdeas: TourDiscoveryIdea[] = [
  {
    id: "swat-kalam-malam-jabba-8-days",
    title: "Swat, Kalam & Malam Jabba",
    description: "An eight-day northern escape across Swat, Kalam, and Malam Jabba. Ask us to confirm the route, dates, and current quotation.",
    region: "northern",
    destinationSlugs: ["swat", "kalam", "malam-jabba"],
    routeStops: ["Swat", "Kalam", "Malam Jabba"],
    duration: "8 Days / 7 Nights",
    image: "/images/package-cards/images__tour-packages__01.webp",
    travelStyles: ["family", "couples", "adventure", "tailored"],
    experiences: ["mountains", "nature", "adventure"],
    routeHighlights: ["Kalam valley", "Malam Jabba"],
    bestFor: "A short northern escape",
    pace: "Moderate",
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
    title: "Hunza & Naltar Valley",
    description: "A ten-day mountain journey through Hunza and Naltar Valley. Ask us to confirm the route, dates, and current quotation.",
    region: "northern",
    destinationSlugs: ["hunza", "naltar"],
    routeStops: ["Hunza", "Naltar Valley"],
    duration: "10 Days / 9 Nights",
    image: "/images/package-cards/images__tour-packages__13.webp",
    travelStyles: ["family", "couples", "adventure", "tailored"],
    experiences: ["mountains", "lakes-valleys", "nature", "romance"],
    routeHighlights: ["Hunza", "Naltar Valley"],
    bestFor: "A two-valley mountain escape",
    pace: "Relaxed",
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
