export interface JeepAddon {
  id: string;
  name: string;
  with_stay?: number; // price if staying at hotel
  without_stay?: number; // price if no hotel stay
  base_price?: number; // if no difference
  included?: boolean;
}

export interface JeepLocation {
  id: string;
  name: string;
  addons: JeepAddon[];
}

export interface PackageJeepRideOption {
  id: string;
  city: string;
  name: string;
  pricePerJeep: number;
  travelMode: "road" | "air" | "both";
}

export const packageJeepRideOptions: PackageJeepRideOption[] = [
  { id: "package-jeep-hunza", city: "Hunza", name: "Hunza jeep ride", pricePerJeep: 20000, travelMode: "both" },
  { id: "package-jeep-skardu", city: "Skardu", name: "Skardu jeep ride", pricePerJeep: 22000, travelMode: "both" },
  { id: "package-jeep-naran", city: "Naran", name: "Naran jeep ride", pricePerJeep: 7000, travelMode: "road" },
  { id: "package-jeep-astore-road", city: "Astore", name: "Astore jeep ride", pricePerJeep: 35000, travelMode: "road" },
  { id: "package-jeep-astore-air", city: "Astore", name: "Astore jeep ride (By Air)", pricePerJeep: 70000, travelMode: "air" },
  { id: "package-jeep-kashmir", city: "Kashmir", name: "Kashmir jeep ride", pricePerJeep: 30000, travelMode: "road" },
  { id: "package-jeep-swat", city: "Swat", name: "Swat jeep ride", pricePerJeep: 15000, travelMode: "road" },
  { id: "package-jeep-fairy-meadows", city: "Fairy Meadows", name: "Fairy Meadows jeep ride", pricePerJeep: 20000, travelMode: "both" },
  { id: "package-jeep-shogran", city: "Shogran", name: "Shogran jeep ride", pricePerJeep: 12000, travelMode: "road" },
];

export const jeepAddons: JeepLocation[] = [
  {
    id: "skardu-jeeps",
    name: "Skardu & Basho",
    addons: [
      {
        id: "jeep-basho-valley",
        name: "Basho Valley Exploration",
        base_price: 15000,
      },
      {
        id: "jeep-deosai-plains",
        name: "Deosai Plains",
        base_price: 20000,
      },
      {
        id: "jeep-fairy-meadows",
        name: "Fairy Meadows",
        base_price: 25000,
      },
      {
        id: "jeep-khaplu-palace",
        name: "Khaplu Palace Tour",
        base_price: 8000,
      },
    ],
  },
  {
    id: "hunza-jeeps",
    name: "Hunza",
    addons: [
      {
        id: "jeep-naltar-lake",
        name: "Naltar Lake & Alpine Meadows",
        base_price: 23000,
      },
      {
        id: "jeep-passu-glacier",
        name: "Passu Glacier Trek",
        base_price: 12000,
      },
      {
        id: "jeep-shandur-pass",
        name: "Shandur Pass",
        base_price: 10000,
      },
    ],
  },
  {
    id: "swat-jeeps",
    name: "Swat & Kalam",
    addons: [
      {
        id: "jeep-kalam-activities",
        name: "Kalam Valley Exploration",
        base_price: 20000,
      },
      {
        id: "jeep-malam-jabba",
        name: "Malam Jabba Ski Area",
        base_price: 8000,
      },
      {
        id: "jeep-minimerg",
        name: "Minimerg & White Peaks",
        base_price: 33000,
      },
      {
        id: "jeep-saiful-mulook",
        name: "Saiful Mulook Lake",
        base_price: 8000,
      },
    ],
  },
  {
    id: "kashmir-jeeps",
    name: "Kashmir & Nathia Gali",
    addons: [
      {
        id: "jeep-ratti-gali",
        name: "Ratti Gali Lake Trek",
        base_price: 20000,
      },
      {
        id: "jeep-taobat",
        name: "Taobat Valley",
        base_price: 23000,
      },
    ],
  },
  {
    id: "shogran-jeeps",
    name: "Shogran & Siri Paye",
    addons: [
      {
        id: "jeep-shogran-activities",
        name: "Shogran Jeep Adventure",
        with_stay: 15000,
        without_stay: 12000,
      },
    ],
  },
  {
    id: "package-jeep-rides",
    name: "Package jeep rides",
    addons: packageJeepRideOptions.map((ride) => ({
      id: ride.id,
      name: ride.name,
      base_price: ride.pricePerJeep,
    })),
  },
];

export function getPackageJeepRideOptions(
  cities: readonly string[],
  travelMode: "road" | "air",
): PackageJeepRideOption[] {
  const normalizeCity = (city: string) => city.trim().replace(/\s+\([^)]*\)$/, "").toLocaleLowerCase("en");
  const selectedCities = new Set(cities.map(normalizeCity));
  return packageJeepRideOptions.filter((ride) =>
    selectedCities.has(normalizeCity(ride.city)) &&
    (ride.travelMode === "both" || ride.travelMode === travelMode),
  );
}

export function getJeepsByLocation(locationId: string): JeepAddon[] {
  const location = jeepAddons.find((j) => j.id === locationId);
  return location?.addons || [];
}

export function calculateJeepCost(
  addons: { id: string; quantity: number }[]
): number {
  let total = 0;
  for (const addon of addons) {
    const jeepAddon = getJeepAddonById(addon.id);
    if (jeepAddon) {
      const price = jeepAddon.base_price || 0;
      total += price * addon.quantity;
    }
  }
  return total;
}

export function getJeepAddonById(id: string): JeepAddon | undefined {
  for (const location of jeepAddons) {
    const addon = location.addons.find((a) => a.id === id);
    if (addon) return addon;
  }
  return undefined;
}
