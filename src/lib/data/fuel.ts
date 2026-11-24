export interface FuelPricing {
  petrol: number;
  diesel: number;
}

export const currentFuelPrices: FuelPricing = {
  petrol: 320,
  diesel: 320,
};

// Fuel consumption reference (km/liter)
export const fuelConsumption = {
  corolla: {
    petrol: 12,
  },
  brv: {
    petrol: 10,
    diesel: 11,
  },
  prado: {
    petrol: 8,
    diesel: 9,
  },
  coaster: {
    diesel: 5,
  },
  grandCabin: {
    petrol: 9,
    diesel: 10,
  },
};
