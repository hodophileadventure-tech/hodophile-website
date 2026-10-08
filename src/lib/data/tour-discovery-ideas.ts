import type { TravelStyle } from "./tour-packages";

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
  },
];
