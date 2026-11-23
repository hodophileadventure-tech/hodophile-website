import { NextRequest, NextResponse } from "next/server";

import { RouteCalculationError, calculateRoadRoute } from "@/lib/transport/route-service";
import { getOperationalTransportSettings } from "@/lib/transport/settings";
import { allowRouteCalculation } from "@/lib/transport/rate-limit";

function getClientIdentifier(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
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

  if (typeof body !== "object" || body === null || Array.isArray(body) ||
      !("stops" in body)) {
    return NextResponse.json({ error: "Provide an ordered list of route stops." }, { status: 400 });
  }

  try {
    const settings = await getOperationalTransportSettings();
    const route = await calculateRoadRoute(
      (body as { stops?: unknown }).stops,
      settings,
    );
    return NextResponse.json(route);
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

    console.error("Route calculation failed:", error);
    return NextResponse.json(
      { error: "Unable to calculate this road route right now." },
      { status: 500 },
    );
  }
}
