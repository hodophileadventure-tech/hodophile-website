import { getVehicleRate } from "@/lib/data/vehicleRates";
import type { QuotationInput, ServerTransportOptions } from "@/lib/pricingEngine";
import { getRouteById } from "@/lib/data/routes";

import { RouteCalculationError, calculateRoadRoute } from "./route-service";
import { getCustomRoadStops } from "./itinerary";
import { buildAirRoadStops, getAirQuotationDestinations } from "./air-routing";
import {
  createTransportCostSettings,
  getOperationalTransportSettings,
  getOperationalVehicleConfiguration,
} from "./settings";

export async function getCustomItineraryTransportOptions(
  input: QuotationInput,
): Promise<ServerTransportOptions | undefined> {
  const isAir = input.travelMode === "air";
  const isCustomItinerary = input.routeId === "custom-itinerary";
  if (!isAir && (!isCustomItinerary || !input.startingPoint)) {
    return undefined;
  }

  try {
    const settings = await getOperationalTransportSettings();
    let distanceKm: number;
    if (isAir) {
      const selectedDestinations = getAirQuotationDestinations(input, getRouteById(input.routeId));
      const stops = buildAirRoadStops(selectedDestinations);
      distanceKm = stops.length === 1
        ? 0
        : (await calculateRoadRoute(stops, settings, undefined, undefined, false)).baseDistanceKm;
    } else {
      const destinations = input.routeDestinations ?? (input.customCities ?? [])
        .filter((city) => !city.startsWith("Chilas"));
      const stops = getCustomRoadStops(
        input.startingPoint!,
        destinations,
        "road",
        input.includeIslamabadTransit !== false,
      );
      if (stops.length < 2) return undefined;
      distanceKm = (await calculateRoadRoute(stops, settings)).baseDistanceKm;
    }

    const canonicalVehicleName = getVehicleRate(input.vehicleName)?.name ?? input.vehicleName;
    const vehicleConfiguration = await getOperationalVehicleConfiguration(canonicalVehicleName);
    const transportSettings = createTransportCostSettings(settings);
    if (isAir && distanceKm === 0) {
      transportSettings.additionalDistanceKm = 0;
      transportSettings.additionalDistancePercent = 0;
    }

    return {
      distanceKm,
      vehicleConfiguration,
      settings: transportSettings,
    };
  } catch (error) {
    if (!(error instanceof RouteCalculationError)) throw error;
    if (isAir) throw error;
    console.warn(`Using the existing estimate after road routing failed: ${error.message}`);
    return undefined;
  }
}
