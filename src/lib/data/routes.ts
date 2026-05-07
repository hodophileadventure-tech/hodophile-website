export interface VehiclePrice {
  name: string;
  price: number;
}

export interface Route {
  id: string;
  name: string;
  slug: string;
  duration: number; // total days including travel
  vehicleDays: number; // actual days vehicle is used/needed
  direction: string; // "ISB to ISB", "Karachi to Skardu", etc.
  city: "Skardu" | "Hunza" | "Swat" | "Kashmir" | "Khaplu" | "Shogran" | "Islamabad" | "Nathia Gali" | "Multi-City";
  minimumDays: number;
  vehicles: VehiclePrice[];
  itinerary?: string; // For multi-city tours
}

export const routes: Route[] = [
  {
    id: "skardu-hunza-8days",
    name: "Skardu & Hunza",
    slug: "skardu-hunza",
    duration: 8,
    vehicleDays: 8,
    direction: "ISB to ISB",
    city: "Skardu",
    minimumDays: 8,
    vehicles: [
      { name: "Toyota Corolla", price: 155000 },
      { name: "Honda BRV", price: 179000 },
      { name: "Prado", price: 407000 },
      { name: "Coaster 4C", price: 348000 },
      { name: "Coaster 5C", price: 364000 },
      { name: "Grand Cabin Petrol", price: 257000 },
      { name: "Grand Cabin Diesel", price: 252000 },
    ],
  },
  {
    id: "hunza-naltar-6days",
    name: "Hunza & Naltar",
    slug: "hunza-naltar",
    duration: 6,
    vehicleDays: 6,
    direction: "ISB to ISB",
    city: "Hunza",
    minimumDays: 6,
    vehicles: [
      { name: "Toyota Corolla", price: 118000 },
      { name: "Honda BRV", price: 136000 },
      { name: "Prado", price: 308000 },
      { name: "Grand Cabin", price: 194000 },
      { name: "Coaster", price: 275000 },
    ],
  },
  {
    id: "skardu-basho-6days",
    name: "Skardu & Basho",
    slug: "skardu-basho",
    duration: 6,
    vehicleDays: 6,
    direction: "ISB to ISB",
    city: "Skardu",
    minimumDays: 6,
    vehicles: [
      { name: "Toyota Corolla", price: 118000 },
      { name: "Honda BRV", price: 136000 },
      { name: "Prado", price: 308000 },
      { name: "Grand Cabin", price: 194000 },
      { name: "Coaster", price: 275000 },
    ],
  },
  {
    id: "swat-kalam-4days",
    name: "Swat Kalam & Malam Jabba",
    slug: "swat-kalam-malam-jabba",
    duration: 4,
    vehicleDays: 4,
    direction: "ISB to ISB",
    city: "Swat",
    minimumDays: 4,
    vehicles: [
      { name: "Toyota Corolla", price: 49000 },
      { name: "Honda BRV", price: 61000 },
      { name: "Prado", price: 82000 },
      { name: "Grand Cabin", price: 86000 },
      { name: "Coaster", price: 117000 },
    ],
  },
  {
    id: "kashmir-arangkel-5days",
    name: "Kashmir Arangkel & Taobat",
    slug: "kashmir-arangkel-taobat",
    duration: 5,
    vehicleDays: 5,
    direction: "ISB to ISB",
    city: "Kashmir",
    minimumDays: 5,
    vehicles: [
      { name: "Toyota Corolla", price: 60000 },
      { name: "Honda BRV", price: 75000 },
      { name: "Prado", price: 100000 },
      { name: "Grand Cabin", price: 105000 },
      { name: "Coaster", price: 145000 },
    ],
  },
  {
    id: "naran-babusar-4days",
    name: "Naran & Babusar",
    slug: "naran-babusar",
    duration: 4,
    vehicleDays: 4,
    direction: "ISB to ISB",
    city: "Shogran",
    minimumDays: 4,
    vehicles: [
      { name: "Toyota Corolla", price: 49000 },
      { name: "Honda BRV", price: 61000 },
      { name: "Prado", price: 82000 },
      { name: "Grand Cabin", price: 86000 },
      { name: "Coaster", price: 117000 },
    ],
  },
  {
    id: "naran-hunza-skardu-deosai-12days",
    name: "Naran, Hunza, Skardu, Shigar & Deosai",
    slug: "naran-hunza-skardu-deosai",
    duration: 12,
    vehicleDays: 8,
    direction: "Karachi to Karachi / ISB to ISB",
    city: "Multi-City",
    minimumDays: 12,
    itinerary: "Days 1-2: Bus/Train to ISB | Days 3-10: Vehicle tour (8 days) | Days 11-12: Bus/Train back",
    vehicles: [
      { name: "Toyota Corolla", price: 155000 }, // 8 days actual touring
      { name: "Honda BRV", price: 179000 },
      { name: "Prado", price: 338000 },
      { name: "Grand Cabin Petrol", price: 257000 },
      { name: "Grand Cabin Diesel", price: 252000 },
      { name: "Coaster 4C", price: 348000 },
      { name: "Coaster 5C", price: 364000 },
    ],
  },
  {
    id: "skardu-shigar-shangrila-10days",
    name: "Skardu, Shigar, & Shangrila (Group Tour)",
    slug: "skardu-shigar-shangrila",
    duration: 10,
    vehicleDays: 6,
    direction: "Karachi to Karachi / ISB to ISB",
    city: "Skardu",
    minimumDays: 10,
    itinerary: "Day 1-2: Bus/Train to ISB | Day 3: ISB to Chilas | Days 4-7: Skardu/Shigar (4 days) | Day 8: Naran | Day 9: Return to ISB | Day 10: Arrive Karachi",
    vehicles: [
      { name: "Toyota Corolla", price: 123000 }, // 6 days vehicle use
      { name: "Honda BRV", price: 142500 },
      { name: "Prado", price: 253500 },
      { name: "Grand Cabin Petrol", price: 194947 },
      { name: "Grand Cabin Diesel", price: 194947 },
      { name: "Coaster 4C", price: 269000 },
      { name: "Coaster 5C", price: 281500 },
    ],
  },
  {
    id: "naran-hunza-naltar-10days",
    name: "Naran, Hunza, & Naltar (Group Tour)",
    slug: "naran-hunza-naltar",
    duration: 10,
    vehicleDays: 5,
    direction: "Karachi to Karachi / ISB to ISB",
    city: "Multi-City",
    minimumDays: 10,
    itinerary: "Day 1-2: Bus/Train to ISB | Day 3: ISB to Chilas | Days 4-7: Naltar/Hunza/Naran (5 days) | Day 8: Return to ISB | Day 9: Bus/Train departure | Day 10: Arrive Karachi",
    vehicles: [
      { name: "Toyota Corolla", price: 110000 }, // 5 days vehicle use, 1550 KM
      { name: "Honda BRV", price: 130000 },
      { name: "Prado", price: 232000 },
      { name: "Grand Cabin Petrol", price: 177000 },
      { name: "Grand Cabin Diesel", price: 177000 },
      { name: "Coaster 4C", price: 247000 },
      { name: "Coaster 5C", price: 258000 },
    ],
  },
  {
    id: "kashmir-taobat-9days",
    name: "9 Days Kashmir, Arangkel & Taobat",
    slug: "kashmir-taobat",
    duration: 9,
    vehicleDays: 5,
    direction: "Karachi to Karachi / ISB to ISB",
    city: "Kashmir",
    minimumDays: 9,
    itinerary: "Day 1: Karachi departure via bus/train | Day 2: Islamabad arrival & check-in | Day 3: Islamabad to Sharda via Murree Expressway | Day 4: Taobat via 4x4 jeep | Day 5: Kel-Arangkel transfer and trek | Day 6: Return via Sharda/Keran belt | Day 7: Return to Islamabad | Day 8: Islamabad to Karachi departure | Day 9: Karachi arrival",
    vehicles: [
      { name: "Grand Cabin Petrol", price: 105000 },
      { name: "Grand Cabin Diesel", price: 105000 },
      { name: "Coaster 4C", price: 145000 },
      { name: "Coaster 5C", price: 155000 },
    ],
  },
];

export function getRouteById(id: string): Route | undefined {
  return routes.find((r) => r.id === id);
}

export function getRoutesByCity(city: string): Route[] {
  return routes.filter((r) => r.city === city);
}

export function getVehiclePrice(
  routeId: string,
  vehicleName: string
): number | undefined {
  const route = getRouteById(routeId);
  if (!route) return undefined;
  return route.vehicles.find((v) => v.name === vehicleName)?.price;
}
