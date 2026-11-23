import { createHash } from "node:crypto";
import type { Prisma } from "@prisma/client";

import prisma from "@/lib/prisma";

import { getCanonicalLocationName, getTransportLocation, type MapCoordinate } from "./locations";
import type { OperationalTransportSettings } from "./settings";

const ROUTE_CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const MAX_STOPS = 14;
const MAX_ROUTE_COORDINATES = 30_000;

export type RouteDistanceSource = "OPENROUTESERVICE" | "MANUAL";

export interface RoadRouteLeg {
  from: string;
  to: string;
  distanceKm: number;
  durationSeconds: number | null;
  geometry: MapCoordinate[];
}

export interface RoadRouteEstimate {
  itineraryKey: string;
  stops: string[];
  legs: RoadRouteLeg[];
  baseDistanceKm: number;
  estimatedDistanceKm: number;
  allowanceKm: number;
  durationSeconds: number | null;
  source: RouteDistanceSource;
  geometry: MapCoordinate[];
}

export class RouteCalculationError extends Error {
  constructor(
    message: string,
    readonly code: "invalid-stops" | "not-configured" | "rate-limited" | "provider-error" | "invalid-response" | "timeout",
    readonly status: number,
    readonly itineraryKey?: string,
    readonly stops?: string[],
  ) {
    super(message);
    this.name = "RouteCalculationError";
  }
}

export interface PreparedRoadRoute {
  itineraryKey: string;
  stops: string[];
  coordinates: MapCoordinate[];
}

export interface StoredRoute {
  itineraryKey: string;
  stops: string[];
  legs: RoadRouteLeg[];
  geometry: MapCoordinate[];
  distanceKm: number;
  durationSeconds: number | null;
  source: RouteDistanceSource;
  manualOverride: boolean;
  expiresAt: Date;
}

interface OrsFeature {
  type: "Feature";
  geometry: { type: "LineString"; coordinates: number[][] };
  properties: {
    segments: Array<{ distance: number; duration: number }>;
    way_points: number[];
  };
}

const memoryCache = new Map<string, StoredRoute>();
const inFlightRoutes = new Map<string, Promise<StoredRoute>>();

function makeRouteKey(stops: string[]): string {
  return createHash("sha256").update(JSON.stringify(stops)).digest("hex");
}

export function prepareRoadRoute(
  requestedStops: unknown,
  includeReturnJourney: boolean,
): PreparedRoadRoute {
  if (!Array.isArray(requestedStops) || requestedStops.length < 2 || requestedStops.length > MAX_STOPS ||
      requestedStops.some((stop) => typeof stop !== "string" || stop.trim().length === 0 || stop.length > 80)) {
    throw new RouteCalculationError(
      `Select between 2 and ${MAX_STOPS} supported route stops.`,
      "invalid-stops",
      400,
    );
  }

  const canonicalStops: string[] = [];
  for (const requestedStop of requestedStops as string[]) {
    const canonicalName = getCanonicalLocationName(requestedStop);
    if (!canonicalName) {
      throw new RouteCalculationError(
        `Road routing is not available for "${requestedStop.trim()}". Choose a supported city or contact the team.`,
        "invalid-stops",
        400,
      );
    }
    if (canonicalStops[canonicalStops.length - 1]?.toLocaleLowerCase("en") !== canonicalName.toLocaleLowerCase("en")) {
      canonicalStops.push(canonicalName);
    }
  }

  if (includeReturnJourney && canonicalStops.length > 1 &&
      canonicalStops[canonicalStops.length - 1].toLocaleLowerCase("en") !== canonicalStops[0].toLocaleLowerCase("en")) {
    canonicalStops.push(canonicalStops[0]);
  }

  if (canonicalStops.length > MAX_STOPS) {
    throw new RouteCalculationError(
      `The complete route must contain no more than ${MAX_STOPS} stops.`,
      "invalid-stops",
      400,
    );
  }

  const coordinates = canonicalStops.map((stop) => getTransportLocation(stop)!.coordinate);
  return {
    itineraryKey: makeRouteKey(canonicalStops),
    stops: canonicalStops,
    coordinates,
  };
}

function isCoordinate(value: unknown): value is MapCoordinate {
  return Array.isArray(value) && value.length === 2 &&
    typeof value[0] === "number" && Number.isFinite(value[0]) && value[0] >= -180 && value[0] <= 180 &&
    typeof value[1] === "number" && Number.isFinite(value[1]) && value[1] >= -90 && value[1] <= 90;
}

function parseCoordinates(value: unknown): MapCoordinate[] | null {
  if (!Array.isArray(value) || value.length > MAX_ROUTE_COORDINATES) return null;
  const coordinates: MapCoordinate[] = [];
  for (const coordinate of value) {
    if (!isCoordinate(coordinate)) return null;
    coordinates.push(coordinate);
  }
  return coordinates;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseCachedLegs(value: unknown): RoadRouteLeg[] | null {
  if (!Array.isArray(value) || value.length > MAX_STOPS) return null;
  const legs: RoadRouteLeg[] = [];
  for (const valueLeg of value) {
    if (!isRecord(valueLeg) || typeof valueLeg.from !== "string" || typeof valueLeg.to !== "string" ||
        typeof valueLeg.distanceKm !== "number" || !Number.isFinite(valueLeg.distanceKm) ||
        valueLeg.distanceKm < 0 ||
        (valueLeg.durationSeconds !== null &&
          (typeof valueLeg.durationSeconds !== "number" || !Number.isFinite(valueLeg.durationSeconds) || valueLeg.durationSeconds < 0))) {
      return null;
    }
    const geometry = parseCoordinates(valueLeg.geometry);
    if (!geometry) return null;
    legs.push({
      from: valueLeg.from,
      to: valueLeg.to,
      distanceKm: valueLeg.distanceKm,
      durationSeconds: valueLeg.durationSeconds,
      geometry,
    });
  }
  return legs;
}

function parseStoredRoute(value: {
  id: string;
  stops: Prisma.JsonValue;
  legs: Prisma.JsonValue;
  geometry: Prisma.JsonValue;
  distanceKm: number;
  durationSeconds: number | null;
  source: string;
  manualOverride: boolean;
  expiresAt: Date;
}): StoredRoute | null {
  if (!Array.isArray(value.stops) || !value.stops.every((stop) => typeof stop === "string")) return null;
  const legs = parseCachedLegs(value.legs);
  const geometry = parseCoordinates(value.geometry);
  if (!legs || !geometry || !Number.isFinite(value.distanceKm) || value.distanceKm < 0 ||
      (value.durationSeconds !== null && (!Number.isFinite(value.durationSeconds) || value.durationSeconds < 0))) {
    return null;
  }

  return {
    itineraryKey: value.id,
    stops: value.stops,
    legs,
    geometry,
    distanceKm: value.distanceKm,
    durationSeconds: value.durationSeconds,
    source: value.manualOverride ? "MANUAL" : "OPENROUTESERVICE",
    manualOverride: value.manualOverride,
    expiresAt: value.expiresAt,
  };
}

async function readCachedRoute(itineraryKey: string): Promise<StoredRoute | null> {
  try {
    const row = await prisma.routeDistanceCache.findUnique({ where: { id: itineraryKey } });
    if (!row) return null;
    const cached = parseStoredRoute(row);
    if (!cached) {
      console.error(`Ignoring malformed cached route ${itineraryKey}.`);
      return null;
    }
    if (!cached.manualOverride && cached.expiresAt.getTime() <= Date.now()) return null;
    return cached;
  } catch (error) {
    console.error(`Unable to read route cache ${itineraryKey}:`, error);
    return null;
  }
}

async function saveCachedRoute(route: StoredRoute, requirePersistence = false): Promise<void> {
  try {
    await prisma.routeDistanceCache.upsert({
      where: { id: route.itineraryKey },
      create: {
        id: route.itineraryKey,
        stops: route.stops as Prisma.InputJsonValue,
        legs: route.legs as unknown as Prisma.InputJsonValue,
        geometry: route.geometry as Prisma.InputJsonValue,
        distanceKm: route.distanceKm,
        durationSeconds: route.durationSeconds,
        source: route.source,
        manualOverride: route.manualOverride,
        expiresAt: route.expiresAt,
      },
      update: {
        stops: route.stops as Prisma.InputJsonValue,
        legs: route.legs as unknown as Prisma.InputJsonValue,
        geometry: route.geometry as Prisma.InputJsonValue,
        distanceKm: route.distanceKm,
        durationSeconds: route.durationSeconds,
        source: route.source,
        manualOverride: route.manualOverride,
        expiresAt: route.expiresAt,
      },
    });
  } catch (error) {
    console.error(`Unable to persist route cache ${route.itineraryKey}:`, error);
    if (requirePersistence) throw new Error("Unable to persist the route override.");
  }
}

function parseOrsFeature(value: unknown, stops: string[], itineraryKey: string): StoredRoute {
  if (!isRecord(value) || !Array.isArray(value.features) || !isRecord(value.features[0])) {
    throw new RouteCalculationError("The routing service returned an invalid route.", "invalid-response", 502, itineraryKey, stops);
  }

  const feature = value.features[0] as unknown as OrsFeature;
  const coordinates = parseCoordinates(feature.geometry?.coordinates);
  const segments = feature.properties?.segments;
  const wayPoints = feature.properties?.way_points;
  if (feature.type !== "Feature" || feature.geometry?.type !== "LineString" ||
      !coordinates || coordinates.length < 2 || !Array.isArray(segments) ||
      segments.length !== stops.length - 1 || !Array.isArray(wayPoints) ||
      wayPoints.length !== segments.length + 1 ||
      wayPoints.some((index) => !Number.isInteger(index) || index < 0 || index >= coordinates.length)) {
    throw new RouteCalculationError("The routing service returned incomplete route legs.", "invalid-response", 502, itineraryKey, stops);
  }

  const legs: RoadRouteLeg[] = [];
  for (let index = 0; index < segments.length; index += 1) {
    const segment = segments[index];
    const startIndex = wayPoints[index];
    const endIndex = wayPoints[index + 1];
    if (!segment || !Number.isFinite(segment.distance) || segment.distance < 0 ||
        !Number.isFinite(segment.duration) || segment.duration < 0 ||
        !Number.isInteger(startIndex) || !Number.isInteger(endIndex) ||
        endIndex < startIndex || endIndex >= coordinates.length) {
      throw new RouteCalculationError("The routing service returned invalid route legs.", "invalid-response", 502, itineraryKey, stops);
    }

    legs.push({
      from: stops[index],
      to: stops[index + 1],
      distanceKm: segment.distance / 1000,
      durationSeconds: segment.duration,
      geometry: coordinates.slice(startIndex, endIndex + 1),
    });
  }

  if (legs.some((leg) => leg.geometry.length < 2)) {
    throw new RouteCalculationError("The routing service returned incomplete route geometry.", "invalid-response", 502, itineraryKey, stops);
  }

  return {
    itineraryKey,
    stops,
    legs,
    geometry: coordinates,
    distanceKm: legs.reduce((total, leg) => total + leg.distanceKm, 0),
    durationSeconds: legs.reduce((total, leg) => total + (leg.durationSeconds ?? 0), 0),
    source: "OPENROUTESERVICE",
    manualOverride: false,
    expiresAt: new Date(Date.now() + ROUTE_CACHE_TTL_MS),
  };
}

export async function fetchOpenRouteServiceRoute(
  prepared: PreparedRoadRoute,
  fetcher: typeof fetch = fetch,
  apiKey = process.env.OPENROUTESERVICE_API_KEY,
): Promise<StoredRoute> {
  if (!apiKey) {
    throw new RouteCalculationError(
      "Road distance service is not configured. Please contact Hodophile to confirm this route.",
      "not-configured",
      503,
      prepared.itineraryKey,
      prepared.stops,
    );
  }

  if (prepared.coordinates.length < 2) {
    return {
      itineraryKey: prepared.itineraryKey,
      stops: prepared.stops,
      legs: [],
      geometry: [],
      distanceKm: 0,
      durationSeconds: 0,
      source: "OPENROUTESERVICE",
      manualOverride: false,
      expiresAt: new Date(Date.now() + ROUTE_CACHE_TTL_MS),
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);
  let response: Response;
  try {
    response = await fetcher("https://api.openrouteservice.org/v2/directions/driving-car/geojson", {
      method: "POST",
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coordinates: prepared.coordinates,
        instructions: false,
        preference: "recommended",
      }),
      signal: controller.signal,
      cache: "no-store",
    });
  } catch {
    if (controller.signal.aborted) {
      throw new RouteCalculationError("Road route calculation timed out. Please try again.", "timeout", 504, prepared.itineraryKey, prepared.stops);
    }
    throw new RouteCalculationError("Road route calculation is temporarily unavailable.", "provider-error", 502, prepared.itineraryKey, prepared.stops);
  } finally {
    clearTimeout(timeout);
  }

  if (response.status === 429) {
    throw new RouteCalculationError(
      "The routing service is temporarily rate limited. Please try again shortly.",
      "rate-limited",
      429,
      prepared.itineraryKey,
      prepared.stops,
    );
  }
  if (!response.ok) {
    throw new RouteCalculationError(
      "The routing service could not calculate this road journey.",
      "provider-error",
      502,
      prepared.itineraryKey,
      prepared.stops,
    );
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new RouteCalculationError("The routing service returned unreadable route data.", "invalid-response", 502, prepared.itineraryKey, prepared.stops);
  }
  return parseOrsFeature(data, prepared.stops, prepared.itineraryKey);
}

function applyDistanceAllowance(
  route: StoredRoute,
  settings: OperationalTransportSettings,
): RoadRouteEstimate {
  const allowanceKm = route.distanceKm * settings.additionalDistancePercent / 100 +
    settings.additionalDistanceKm;
  return {
    itineraryKey: route.itineraryKey,
    stops: route.stops,
    legs: route.legs,
    baseDistanceKm: route.distanceKm,
    estimatedDistanceKm: route.distanceKm + allowanceKm,
    allowanceKm,
    durationSeconds: route.durationSeconds,
    source: route.source,
    geometry: route.geometry,
  };
}

export async function calculateRoadRoute(
  requestedStops: unknown,
  settings: OperationalTransportSettings,
  fetcher: typeof fetch = fetch,
  apiKey = process.env.OPENROUTESERVICE_API_KEY,
): Promise<RoadRouteEstimate> {
  const prepared = prepareRoadRoute(requestedStops, settings.includeReturnJourney);
  const cached = await readCachedRoute(prepared.itineraryKey);
  if (cached) {
    memoryCache.set(prepared.itineraryKey, cached);
    return applyDistanceAllowance(cached, settings);
  }

  const unexpiredMemoryRoute = memoryCache.get(prepared.itineraryKey);
  if (unexpiredMemoryRoute && unexpiredMemoryRoute.expiresAt.getTime() > Date.now()) {
    return applyDistanceAllowance(unexpiredMemoryRoute, settings);
  }

  let pending = inFlightRoutes.get(prepared.itineraryKey);
  if (!pending) {
    pending = fetchOpenRouteServiceRoute(prepared, fetcher, apiKey)
      .then(async (route) => {
        memoryCache.set(route.itineraryKey, route);
        await saveCachedRoute(route);
        return route;
      })
      .finally(() => inFlightRoutes.delete(prepared.itineraryKey));
    inFlightRoutes.set(prepared.itineraryKey, pending);
  }

  const route = await pending;
  return applyDistanceAllowance(route, settings);
}

export function invalidateMemoryRoute(itineraryKey: string): void {
  memoryCache.delete(itineraryKey);
}

export async function listCachedRoutesForAdmin() {
  const rows = await prisma.routeDistanceCache.findMany({
    orderBy: { updatedAt: "desc" },
    take: 100,
  });

  return rows.flatMap((row) => {
    const parsed = parseStoredRoute(row);
    if (!parsed) return [];
    return [{
      itineraryKey: parsed.itineraryKey,
      stops: parsed.stops,
      legs: parsed.legs.map(({ from, to, distanceKm, durationSeconds }) => ({
        from,
        to,
        distanceKm,
        durationSeconds,
      })),
      distanceKm: parsed.distanceKm,
      durationSeconds: parsed.durationSeconds,
      source: parsed.source,
      manualOverride: parsed.manualOverride,
      updatedAt: row.updatedAt,
    }];
  });
}

export async function saveManualRouteOverride(
  requestedStops: unknown,
  legDistancesKm: unknown,
  includeReturnJourney: boolean,
): Promise<{ itineraryKey: string; distanceKm: number; stops: string[] }> {
  const prepared = prepareRoadRoute(requestedStops, includeReturnJourney);
  const priorRoute = await readCachedRoute(prepared.itineraryKey);
  const route = createManualRouteOverride(prepared, legDistancesKm, priorRoute);
  await saveCachedRoute(route, true);
  memoryCache.set(route.itineraryKey, route);
  return { itineraryKey: route.itineraryKey, distanceKm: route.distanceKm, stops: route.stops };
}

export function createManualRouteOverride(
  prepared: PreparedRoadRoute,
  legDistancesKm: unknown,
  priorRoute: StoredRoute | null = null,
): StoredRoute {
  const expectedLegCount = Math.max(0, prepared.stops.length - 1);
  if (!Array.isArray(legDistancesKm) || legDistancesKm.length !== expectedLegCount ||
      legDistancesKm.some((distance) => typeof distance !== "number" || !Number.isFinite(distance) || distance <= 0 || distance > 5000)) {
    throw new RouteCalculationError(
      "Provide a manual distance greater than 0 and no more than 5,000 km for each route leg.",
      "invalid-stops",
      400,
      prepared.itineraryKey,
      prepared.stops,
    );
  }

  const legs: RoadRouteLeg[] = prepared.stops.slice(1).map((to, index) => {
    const priorLeg = priorRoute?.legs[index];
    const distance = legDistancesKm[index];
    if (typeof distance !== "number") {
      throw new RouteCalculationError(
        "Each manual route leg must have a numeric distance.",
        "invalid-stops",
        400,
        prepared.itineraryKey,
        prepared.stops,
      );
    }
    return {
      from: prepared.stops[index],
      to,
      distanceKm: distance,
      durationSeconds: priorLeg?.durationSeconds ?? null,
      geometry: priorLeg?.geometry ?? [],
    };
  });
  const distanceKm = legs.reduce((total, leg) => total + leg.distanceKm, 0);
  const route: StoredRoute = {
    itineraryKey: prepared.itineraryKey,
    stops: prepared.stops,
    legs,
    geometry: priorRoute?.geometry ?? [],
    distanceKm,
    durationSeconds: priorRoute?.durationSeconds ?? null,
    source: "MANUAL",
    manualOverride: true,
    expiresAt: new Date("9999-12-31T23:59:59.999Z"),
  };
  return route;
}
