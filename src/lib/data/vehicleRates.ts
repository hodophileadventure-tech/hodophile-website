// Vehicle daily rental rates and fuel consumption
export interface VehicleRate {
  name: string;
  dailyRate: number; // PKR per day
  consumption: number; // km per liter
  tollTax: number; // Fixed toll + tax per trip
  fuelType: "petrol" | "diesel";
}

export const vehicleRates: VehicleRate[] = [
  {
    name: "Toyota Corolla",
    dailyRate: 7000,
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
  },
  {
    name: "Coaster 5C",
    dailyRate: 20000,
    consumption: 5,
    tollTax: 13000,
    fuelType: "diesel",
  },
];

export function getVehicleRate(vehicleName: string): VehicleRate | undefined {
  return vehicleRates.find((v) => v.name === vehicleName);
}
