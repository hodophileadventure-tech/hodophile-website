import prisma from "@/lib/prisma";

import type { TransportVehicleConfiguration } from "./calculations";

export interface OperationalTransportSettings {
  petrolPricePerLiter: number | null;
  dieselPricePerLiter: number | null;
  additionalDistanceKm: number;
  additionalDistancePercent: number;
  includeReturnJourney: boolean;
}

export const DEFAULT_TRANSPORT_SETTINGS: OperationalTransportSettings = {
  petrolPricePerLiter: null,
  dieselPricePerLiter: null,
  additionalDistanceKm: 0,
  additionalDistancePercent: 0,
  includeReturnJourney: true,
};

export async function getOperationalTransportSettings(): Promise<OperationalTransportSettings> {
  try {
    const settings = await prisma.transportSettings.findUnique({
      where: { id: "transport-settings-default" },
    });

    return settings ? {
      petrolPricePerLiter: settings.petrolPricePerLiter,
      dieselPricePerLiter: settings.dieselPricePerLiter,
      additionalDistanceKm: settings.additionalDistanceKm,
      additionalDistancePercent: settings.additionalDistancePercent,
      includeReturnJourney: settings.includeReturnJourney,
    } : DEFAULT_TRANSPORT_SETTINGS;
  } catch (error) {
    console.error("Unable to load operational transport settings:", error);
    return DEFAULT_TRANSPORT_SETTINGS;
  }
}

export async function getOperationalVehicleConfiguration(
  vehicleName: string,
): Promise<TransportVehicleConfiguration | null> {
  try {
    const vehicle = await prisma.transportVehicleConfig.findUnique({
      where: { name: vehicleName },
    });
    if (!vehicle || !vehicle.enabled) return null;

    return {
      name: vehicle.name,
      fuelType: vehicle.fuelType === "diesel" ? "diesel" : "petrol",
      averageKmPerLiter: vehicle.averageKmPerLiter,
      fuelPricePerLiter: vehicle.fuelPricePerLiter,
      maintenanceCostPerKm: vehicle.maintenanceCostPerKm,
    };
  } catch (error) {
    console.error(`Unable to load transport configuration for ${vehicleName}:`, error);
    return null;
  }
}

export function createTransportCostSettings(
  settings: OperationalTransportSettings,
) {
  return {
    petrolPricePerLiter: settings.petrolPricePerLiter,
    dieselPricePerLiter: settings.dieselPricePerLiter,
    additionalDistanceKm: settings.additionalDistanceKm,
    additionalDistancePercent: settings.additionalDistancePercent,
  };
}
