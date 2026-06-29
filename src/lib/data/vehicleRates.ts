// Vehicle daily rental rates and fuel consumption
export interface VehicleRate {
  name: string;
  dailyRate: number; // PKR per day
  consumption: number; // km per liter
  tollTax: number; // Fixed toll + tax per trip
  fuelType: "petrol" | "diesel";
  fuelPrice?: number; // Optional override for fuel price per liter
}

export const vehicleRates: VehicleRate[] = [
  {
    name: "Toyota Corolla",
    dailyRate: 6000,
    consumption: 10,
    tollTax: 8000,
    fuelType: "petrol",
  },
  {
    name: "Honda BRV",
    dailyRate: 9000,
    consumption: 10,
    tollTax: 8000,
    fuelType: "petrol",
  },
  {
    name: "Prado",
    dailyRate: 20000,
    consumption: 4,
    tollTax: 8000,
    fuelType: "diesel",
  },
  {
    name: "Grand Cabin Petrol",
    dailyRate: 13000,
    consumption: 7,
    tollTax: 11000,
    fuelType: "petrol",
  },
  {
    name: "Grand Cabin Diesel",
    dailyRate: 13000,
    consumption: 7,
    tollTax: 11000,
    fuelType: "diesel",
  },
  {
    name: "Coaster 4C",
    dailyRate: 18000,
    consumption: 5,
    tollTax: 13000,
    fuelType: "diesel",
    fuelPrice: 322,
  },
  {
    name: "Coaster 5C",
    dailyRate: 20000,
    consumption: 5,
    tollTax: 13000,
    fuelType: "diesel",
    fuelPrice: 322,
  },
];

// Known alias map (lowercased keys) to canonical vehicle names
const vehicleAliases: Record<string, string> = {
  "coaster 35 seater": "Coaster 5C",
  "coaster 35": "Coaster 5C",
  "coaster 4c": "Coaster 4C",
  "coaster 5c": "Coaster 5C",
  "coaster": "Coaster 4C",
  "grand cabin": "Grand Cabin Petrol",
  "grand cabin petrol": "Grand Cabin Petrol",
  "grand cabin diesel": "Grand Cabin Diesel",
};

export function getVehicleRate(vehicleName: string): VehicleRate | undefined {
  if (!vehicleName) return undefined;
  const key = vehicleName.trim().toLowerCase();

  // Direct alias match
  if (vehicleAliases[key]) {
    const canonical = vehicleAliases[key];
    return vehicleRates.find((v) => v.name === canonical);
  }

  // Exact case-insensitive name match
  const exact = vehicleRates.find((v) => v.name.toLowerCase() === key);
  if (exact) return exact;

  // Partial-match: find first vehicle whose name includes the key tokens
  const tokens = key.split(/[^a-z0-9]+/).filter(Boolean);
  if (tokens.length > 0) {
    const candidate = vehicleRates.find((v) =>
      tokens.every((t) => v.name.toLowerCase().includes(t))
    );
    if (candidate) return candidate;
  }

  // Last-resort: find any vehicle whose name contains a primary token like 'coaster' or 'prado'
  for (const v of vehicleRates) {
    const lname = v.name.toLowerCase();
    if (key.includes('coaster') && lname.includes('coaster')) return v;
    if (key.includes('prado') && lname.includes('prado')) return v;
    if (key.includes('grand') && lname.includes('grand')) return v;
  }

  return undefined;
}
