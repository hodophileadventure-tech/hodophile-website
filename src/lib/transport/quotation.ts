import { getVehicleRate } from "@/lib/data/vehicleRates";
import type { QuotationInput, ServerTransportOptions } from "@/lib/pricingEngine";

import { RouteCalculationError, calculateRoadRoute } from "./route-service";
import { getCustomRoadStops } from "./itinerary";
import {
  createTransportCostSettings,
  getOperationalTransportSettings,
  getOperationalVehicleConfiguration,
} from "./settings";

export async function getCustomItineraryTransportOptions(
  input: QuotationInput,
): Promise<ServerTransportOptions | undefined> {
  if (input.routeId !== "custom-itinerary" || input.travelMode === "air" || !input.startingPoint) {
    return undefined;
  }

  const destinations = input.routeDestinations ?? (input.customCities ?? [])
    .filter((city) => !city.startsWith("Chilas"));
  const stops = getCustomRoadStops(
    input.startingPoint,
    destinations,
    "road",
    input.includeIslamabadTransit !== false,
  );
  if (stops.length < 2) return undefined;

  try {
    const settings = await getOperationalTransportSettings();
    const route = await calculateRoadRoute(stops, settings);
    const canonicalVehicleName = getVehicleRate(input.vehicleName)?.name ?? input.vehicleName;
    const vehicleConfiguration = await getOperationalVehicleConfiguration(canonicalVehicleName);

    return {
      distanceKm: route.baseDistanceKm,
      vehicleConfiguration,
      settings: createTransportCostSettings(settings),
    };
  } catch (error) {
    if (!(error instanceof RouteCalculationError)) throw error;
    console.warn(`Using the existing estimate after road routing failed: ${error.message}`);
    return undefined;
  }
}
