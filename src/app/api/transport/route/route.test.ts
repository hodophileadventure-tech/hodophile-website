import assert from "node:assert/strict";
import test from "node:test";
import { NextRequest } from "next/server";

import { POST } from "./route";

async function postRoute(stops: string[]) {
  const request = new NextRequest("http://localhost/api/transport/route", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": `air-route-test-${Math.random()}`,
    },
    body: JSON.stringify({ stops, travelMode: "air" }),
  });
  const response = await POST(request);
  return { status: response.status, body: await response.json() as Record<string, unknown> };
}

test("air route endpoint rejects unsupported destinations and non-Skardu origins", async () => {
  const unsupported = await postRoute(["Skardu", "Swat", "Skardu"]);
  const invalidOrigin = await postRoute(["Islamabad", "Hunza", "Islamabad"]);

  assert.equal(unsupported.status, 400);
  assert.equal(invalidOrigin.status, 400);
  assert.equal(unsupported.body.error, invalidOrigin.body.error);
});
