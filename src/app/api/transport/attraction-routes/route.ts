import { NextRequest, NextResponse } from "next/server";

import {
  calculateAttractionRoadRoute,
  RouteCalculationError,
} from "@/lib/transport/route-service";
import { allowRouteCalculation } from "@/lib/transport/rate-limit";

function getClientIdentifier(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(request: NextRequest) {
  if (!allowRouteCalculation(getClientIdentifier(request))) {
    return NextResponse.json(
      { error: "Too many route requests. Please wait a minute and try again." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (!isRecord(body) || !Array.isArray(body.routes) || body.routes.length === 0 || body.routes.length > 10) {
    return NextResponse.json({ error: "Provide destination groups for attraction routing." }, { status: 400 });
  }

  try {
    const routes = [];
    for (const routeGroup of body.routes) {
      if (!isRecord(routeGroup) || typeof routeGroup.city !== "string" || routeGroup.city.length > 80) {
        return NextResponse.json({ error: "Each attraction route must include a valid destination." }, { status: 400 });
      }
      const route = await calculateAttractionRoadRoute(routeGroup.attractionIds);
      routes.push({
        city: routeGroup.city,
        legs: route.legs.map((leg) => ({
          fromAttractionId: leg.from,
          toAttractionId: leg.to,
          distanceKm: leg.distanceKm,
          durationSeconds: leg.durationSeconds,
        })),
      });
    }

    return NextResponse.json({ routes });
  } catch (error) {
    if (error instanceof RouteCalculationError) {
      return NextResponse.json(
        {
          error: error.message,
          code: error.code,
          itineraryKey: error.itineraryKey,
          stops: error.stops,
          providerStatus: error.providerStatus,
        },
        {
          status: error.status,
          headers: error.status === 429 ? { "Retry-After": "60" } : undefined,
        },
      );
    }

    console.error("Attraction route calculation failed:", error);
    return NextResponse.json(
      { error: "Unable to calculate attraction travel times right now." },
      { status: 500 },
    );
  }
}
