export interface VehiclePrice {
  name: string;
  price: number;
}

export interface Route {
  id: string;
  name: string;
  slug: string;
  duration: number; // days
  direction: string; // "ISB to ISB", "Karachi to Skardu", etc.
  city: "Skardu" | "Hunza" | "Swat" | "Kashmir" | "Khaplu" | "Shogran";
  minimumDays: number;
  vehicles: VehiclePrice[];
}

export const routes: Route[] = [
  {
    id: "skardu-hunza-8days",
    name: "Skardu & Hunza",
    slug: "skardu-hunza",
    duration: 8,
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
