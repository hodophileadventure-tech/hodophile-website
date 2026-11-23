import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { getVehicleRate } from "@/lib/data/vehicleRates";
import { isTransportAdminAuthorized, isTransportAdminConfigured } from "@/lib/transport/admin-auth";
import { calculateTransportCost } from "@/lib/pricingEngine";
import { calculateRoadRoute, RouteCalculationError, saveManualRouteOverride } from "@/lib/transport/route-service";
import { DEFAULT_TRANSPORT_SETTINGS, getOperationalTransportSettings, getOperationalVehicleConfiguration, createTransportCostSettings } from "@/lib/transport/settings";

type SettingsUpdate = Partial<{
  petrolPricePerLiter: number | null;
  dieselPricePerLiter: number | null;
  additionalDistanceKm: number;
  additionalDistancePercent: number;
  includeReturnJourney: boolean;
}>;

type VehicleUpdate = {
  name: string;
  fuelType: "petrol" | "diesel";
  averageKmPerLiter: number;
  fuelPricePerLiter?: number | null;
  maintenanceCostPerKm: number;
  enabled?: boolean;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isOptionalBoundedNumber(
  value: unknown,
  minimum: number,
  maximum: number,
): boolean {
  return value === undefined || value === null ||
    (typeof value === "number" && Number.isFinite(value) && value >= minimum && value <= maximum);
}

function isOptionalPrice(value: unknown): boolean {
  return value === undefined || value === null ||
    (typeof value === "number" && Number.isFinite(value) && value > 0 && value <= 1_000_000);
}

function validateSettings(value: unknown): value is SettingsUpdate {
  if (!isRecord(value)) return false;
  return isOptionalPrice(value.petrolPricePerLiter) &&
    isOptionalPrice(value.dieselPricePerLiter) &&
    isOptionalBoundedNumber(value.additionalDistanceKm, 0, 10_000) &&
    isOptionalBoundedNumber(value.additionalDistancePercent, 0, 200) &&
    (value.includeReturnJourney === undefined || typeof value.includeReturnJourney === "boolean");
}

function isVehicleUpdate(value: unknown): value is VehicleUpdate {
  return isRecord(value) &&
    typeof value.name === "string" && value.name.trim().length > 0 && value.name.length <= 80 &&
    (value.fuelType === "petrol" || value.fuelType === "diesel") &&
    typeof value.averageKmPerLiter === "number" && Number.isFinite(value.averageKmPerLiter) &&
    value.averageKmPerLiter > 0 && value.averageKmPerLiter <= 100 &&
    isOptionalPrice(value.fuelPricePerLiter) &&
    typeof value.maintenanceCostPerKm === "number" && Number.isFinite(value.maintenanceCostPerKm) &&
    value.maintenanceCostPerKm >= 0 && value.maintenanceCostPerKm <= 100_000 &&
    (value.enabled === undefined || typeof value.enabled === "boolean");
}

function isAdminRequest(request: NextRequest): boolean {
  return isTransportAdminAuthorized(request.headers.get("authorization"));
}

function authorizationResponse(request: NextRequest) {
  if (!isTransportAdminConfigured()) {
    return NextResponse.json(
      { error: "Transport admin API is disabled until TRANSPORT_ADMIN_API_KEY is configured." },
      { status: 503 },
    );
  }
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Admin authorization is required." }, { status: 401 });
  }
  return null;
}

export async function GET(request: NextRequest) {
  const authError = authorizationResponse(request);
  if (authError) return authError;

  try {
    const [settings, vehicles, routes] = await Promise.all([
      prisma.transportSettings.findUnique({ where: { id: "transport-settings-default" } }),
      prisma.transportVehicleConfig.findMany({ orderBy: { name: "asc" } }),
      prisma.routeDistanceCache.findMany({
        orderBy: { updatedAt: "desc" },
        take: 100,
        select: {
          id: true,
          stops: true,
          legs: true,
          distanceKm: true,
          durationSeconds: true,
          source: true,
          manualOverride: true,
          updatedAt: true,
        },
      }),
    ]);

    return NextResponse.json({
      settings: settings ?? DEFAULT_TRANSPORT_SETTINGS,
      vehicles,
      cachedRoutes: routes,
    });
  } catch (error) {
    console.error("Unable to load transport administration data:", error);
    return NextResponse.json({ error: "Transport settings are unavailable." }, { status: 503 });
  }
}

export async function PUT(request: NextRequest) {
  const authError = authorizationResponse(request);
  if (authError) return authError;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }
  if (!isRecord(body)) {
    return NextResponse.json({ error: "Provide transport settings, vehicles, or a route override." }, { status: 400 });
  }

  const settingsUpdate = body.settings;
  const vehicleUpdates = body.vehicles;
  const routeOverride = body.routeOverride;
  if (settingsUpdate !== undefined && !validateSettings(settingsUpdate)) {
    return NextResponse.json({ error: "Transport settings contain invalid values." }, { status: 400 });
  }
  if (vehicleUpdates !== undefined &&
      (!Array.isArray(vehicleUpdates) || vehicleUpdates.length > 50 || !vehicleUpdates.every(isVehicleUpdate))) {
    return NextResponse.json({ error: "Vehicle settings contain invalid values." }, { status: 400 });
  }
  if (routeOverride !== undefined &&
      (!isRecord(routeOverride) || !Array.isArray(routeOverride.stops) || !Array.isArray(routeOverride.legDistancesKm))) {
    return NextResponse.json({ error: "Route override must include ordered stops and one distance per leg." }, { status: 400 });
  }

  try {
    if (settingsUpdate !== undefined) {
      await prisma.transportSettings.upsert({
        where: { id: "transport-settings-default" },
        create: {
          id: "transport-settings-default",
          ...settingsUpdate as SettingsUpdate,
        },
        update: settingsUpdate as SettingsUpdate,
      });
    }

    if (Array.isArray(vehicleUpdates)) {
      await prisma.$transaction(
        vehicleUpdates.map((vehicle) => {
          const value = vehicle as VehicleUpdate;
          const data = {
            name: value.name.trim(),
            fuelType: value.fuelType,
            averageKmPerLiter: value.averageKmPerLiter,
            fuelPricePerLiter: value.fuelPricePerLiter ?? null,
            maintenanceCostPerKm: value.maintenanceCostPerKm,
            enabled: value.enabled ?? true,
          };
          return prisma.transportVehicleConfig.upsert({
            where: { name: data.name },
            create: data,
            update: data,
          });
        }),
      );
    }

    let overrideResult: { itineraryKey: string; distanceKm: number; stops: string[] } | undefined;
    if (routeOverride !== undefined && isRecord(routeOverride)) {
      const settings = await getOperationalTransportSettings();
      overrideResult = await saveManualRouteOverride(
        routeOverride.stops,
        routeOverride.legDistancesKm,
        settings.includeReturnJourney,
      );
    }

    return NextResponse.json({ success: true, routeOverride: overrideResult });
  } catch (error) {
    if (error instanceof Error && error.message === "Unable to persist the route override.") {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }
    console.error("Unable to update transport administration data:", error);
    return NextResponse.json({ error: "Transport settings could not be saved." }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  const authError = authorizationResponse(request);
  if (authError) return authError;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }
  if (!isRecord(body) || !Array.isArray(body.stops) ||
      typeof body.vehicleName !== "string" ||
      typeof body.vehicleDays !== "number" ||
      !Number.isInteger(body.vehicleDays) || body.vehicleDays < 1 || body.vehicleDays > 60) {
    return NextResponse.json(
      { error: "Provide ordered stops, a configured vehicle name, and vehicle days from 1 to 60." },
      { status: 400 },
    );
  }

  try {
    const settings = await getOperationalTransportSettings();
    const route = await calculateRoadRoute(body.stops, settings);
    const vehicleRate = getVehicleRate(body.vehicleName);
    if (!vehicleRate) {
      return NextResponse.json({ error: "This vehicle does not have a rental and toll configuration." }, { status: 400 });
    }

    const vehicleConfiguration = await getOperationalVehicleConfiguration(vehicleRate.name);
    const estimate = calculateTransportCost(
      vehicleRate.name,
      "custom-itinerary",
      body.vehicleDays,
      route.baseDistanceKm,
      "road",
      vehicleConfiguration,
      createTransportCostSettings(settings),
    );
    if (!estimate) {
      return NextResponse.json({ error: "Unable to calculate transportation expenses for this vehicle." }, { status: 400 });
    }

    return NextResponse.json({
      route: {
        itineraryKey: route.itineraryKey,
        stops: route.stops,
        distanceSource: route.source,
        baseDistanceKm: route.baseDistanceKm,
        estimatedDistanceKm: route.estimatedDistanceKm,
        allowanceKm: route.allowanceKm,
        durationSeconds: route.durationSeconds,
      },
      breakdown: {
        vehicleSelected: vehicleRate.name,
        fuelType: vehicleConfiguration?.fuelType ?? vehicleRate.fuelType,
        fuelAverageKmPerLiter: estimate.averageKmPerLiter,
        totalDistanceKm: estimate.distance,
        estimatedFuelRequiredLiters: estimate.fuelNeeded,
        fuelPricePerLiter: estimate.fuelPricePerLiter,
        fuelExpense: estimate.fuelCost,
        maintenanceExpense: estimate.maintenanceCost,
        rentalExpense: estimate.rentalCost,
        tollTax: estimate.tollTax,
        totalTransportationExpense: estimate.totalCost,
      },
    });
  } catch (error) {
    if (error instanceof RouteCalculationError) {
      return NextResponse.json({ error: error.message, code: error.code }, { status: error.status });
    }
    console.error("Unable to calculate operational transportation expenses:", error);
    return NextResponse.json({ error: "Transportation expenses are unavailable." }, { status: 503 });
  }
}
