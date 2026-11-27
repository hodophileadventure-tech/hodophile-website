import assert from "node:assert/strict";
import test from "node:test";
import { NextRequest } from "next/server";

import { POST } from "./route";

test("rejects attraction routes that reference unmapped locations", async () => {
  const request = new NextRequest("http://localhost/api/transport/attraction-routes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": `attraction-route-test-${Math.random()}`,
    },
    body: JSON.stringify({
      routes: [{ city: "Hunza", attractionIds: ["hunza-baltit-fort", "unknown-attraction"] }],
    }),
  });

  const response = await POST(request);
  const body = await response.json() as { error?: string };

  assert.equal(response.status, 400);
  assert.match(body.error ?? "", /verified road-routing location/);
});
