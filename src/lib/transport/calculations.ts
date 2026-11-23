export type FuelType = "petrol" | "diesel";

export interface TransportVehicleConfiguration {
  name: string;
  fuelType: FuelType;
  averageKmPerLiter: number;
  fuelPricePerLiter?: number | null;
  maintenanceCostPerKm: number;
}

export interface TransportCostSettings {
  petrolPricePerLiter?: number | null;
  dieselPricePerLiter?: number | null;
  additionalDistanceKm: number;
  additionalDistancePercent: number;
}

export interface TransportExpenseEstimate {
  baseDistanceKm: number;
  allowanceKm: number;
  totalDistanceKm: number;
  fuelLiters: number;
  fuelPricePerLiter: number;
  fuelExpense: number;
  maintenanceExpense: number;
  totalTransportationExpense: number;
}

function isFiniteNonNegative(value: number): boolean {
  return Number.isFinite(value) && value >= 0;
}

export function calculateTransportExpense(
  baseDistanceKm: number,
  vehicle: TransportVehicleConfiguration,
  settings: TransportCostSettings,
): TransportExpenseEstimate {
  if (!isFiniteNonNegative(baseDistanceKm)) {
    throw new RangeError("Distance must be a non-negative finite number.");
  }
  if (!Number.isFinite(vehicle.averageKmPerLiter) || vehicle.averageKmPerLiter <= 0) {
    throw new RangeError("Vehicle fuel average must be greater than zero.");
  }
  if (!isFiniteNonNegative(vehicle.maintenanceCostPerKm)) {
    throw new RangeError("Maintenance cost must be a non-negative finite number.");
  }
  if (!isFiniteNonNegative(settings.additionalDistanceKm) ||
      !isFiniteNonNegative(settings.additionalDistancePercent)) {
    throw new RangeError("Distance allowances must be non-negative finite numbers.");
  }

  const configuredFuelPrice = vehicle.fuelPricePerLiter ??
    (vehicle.fuelType === "petrol" ? settings.petrolPricePerLiter : settings.dieselPricePerLiter);
  if (!Number.isFinite(configuredFuelPrice) || configuredFuelPrice === null || configuredFuelPrice === undefined || configuredFuelPrice <= 0) {
    throw new RangeError(`A valid ${vehicle.fuelType} price per litre is required.`);
  }

  const percentageAllowanceKm = baseDistanceKm * settings.additionalDistancePercent / 100;
  const allowanceKm = percentageAllowanceKm + settings.additionalDistanceKm;
  const totalDistanceKm = baseDistanceKm + allowanceKm;
  const fuelLiters = totalDistanceKm / vehicle.averageKmPerLiter;
  const fuelExpense = Math.round(fuelLiters * configuredFuelPrice);
  const maintenanceExpense = Math.round(totalDistanceKm * vehicle.maintenanceCostPerKm);

  return {
    baseDistanceKm,
    allowanceKm,
    totalDistanceKm,
    fuelLiters,
    fuelPricePerLiter: configuredFuelPrice,
    fuelExpense,
    maintenanceExpense,
    totalTransportationExpense: fuelExpense + maintenanceExpense,
  };
}
