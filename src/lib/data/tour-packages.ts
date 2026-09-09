export type TourPackage = {
  id: string;
  title: string;
  destinationSlugs: string[];
  duration: string;
  pricePerPerson: number;
  couplePrice?: number;
  departure?: string;
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
    destinationSlugs: ["skardu"],
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
    duration: "2 Days / 1 Night",
    pricePerPerson: 13500,
    departure: "Every weekend: Saturday morning to Sunday evening",
    notes: ["Private weekday trips are available for groups of 12-20 people."],
  },
  {
    id: "swat-kalam-shogran-10-days",
    title: "Swat, Kalam & Shogran",
    destinationSlugs: ["swat", "shogran"],
    duration: "10 Days",
    pricePerPerson: 42000,
    couplePrice: 94000,
    departure: "Every Monday early morning from Islamabad",
    transport: ["Luxury transport", "Land Cruiser"],
    includes: ["2 nights Islamabad hotel stay", "Standard accommodation", "Breakfast and dinner", ...northernTransport, "Basic phone photography"],
    notes: ["No hidden charges.", "The source listing also showed PKR 37,800 as an alternate price."],
  },
  {
    id: "kashmir-shogran-9-days",
    title: "Kashmir & Shogran",
    destinationSlugs: ["kashmir", "shogran"],
    duration: "9 Days",
    pricePerPerson: 39000,
    couplePrice: 90000,
    departure: "Every Monday early morning from Islamabad",
    transport: ["Luxury transport", "Land Cruiser"],
    includes: ["2 nights Islamabad hotel stay", "Standard accommodation", "Breakfast and dinner", ...northernTransport, "Basic phone photography"],
    notes: ["No hidden charges.", "The source listing also showed PKR 35,100 as an alternate price."],
  },
  {
    id: "hunza-skardu-naran-12-days",
    title: "Hunza, Skardu & Naran",
    destinationSlugs: ["hunza", "skardu", "naran"],
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
    duration: "10 Days",
    pricePerPerson: 59500,
    couplePrice: 139000,
    departure: "Every Friday evening from Karachi; Sunday early morning from Islamabad",
    transport: ["Comfortable transport", "Prado (1990-92 model) for Deosai", "Local jeep for Saif-ul-Malook"],
    includes: ["Youtong return bus tickets Karachi-Islamabad-Karachi", "2 nights Islamabad stay", "Dinner for Islamabad stay (one side)", "Standard hotel on quad-sharing basis", "Half-board meals", ...northernTransport],
    notes: ["Directly joining from Islamabad: PKR 39,500 per person or PKR 89,000 per couple."],
  },
];

export function getTourPackagesForDestination(destinationSlug: string) {
  return tourPackages.filter((tourPackage) => tourPackage.destinationSlugs.includes(destinationSlug));
}