import assert from "node:assert/strict";
import test from "node:test";
import { NextRequest } from "next/server";

import { getTourPackageById } from "@/lib/data/tour-packages";
import { POST } from "./route";

const promoPackages = [
  ["skardu-hunza-air-7-days", "HODOHS10"],
  ["skardu-khaplu-deosai-basho-air-7-days", "HODOSK10"],
  ["skardu-deosai-basho-air-5-days", "HODOSB10"],
] as const;

async function validatePackage(tourId: string, promoCode: string, phone?: string) {
  const request = new NextRequest("http://localhost/api/promotions/validate-package", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tourId, promoCode, phone }),
  });
  const response = await POST(request);
  return { status: response.status, body: await response.json() as Record<string, unknown> };
}

test("each dedicated package link validates only its assigned 10% code", async () => {
  for (const [tourId, promoCode] of promoPackages) {
    const packageData = getTourPackageById(tourId);
    assert.ok(packageData);

    const result = await validatePackage(tourId, promoCode);
    assert.equal(result.status, 200);
    assert.equal(result.body.valid, true);
    assert.equal(result.body.code, promoCode);
    assert.equal(result.body.originalPrice, packageData.pricePerPerson);
    assert.equal(result.body.discountAmount, Math.round(packageData.pricePerPerson * 0.1));
  }
});

test("package promo check rejects an invalid phone before querying redemption storage", async () => {
  const result = await validatePackage(promoPackages[0][0], promoPackages[0][1], "12345");
  assert.equal(result.status, 400);
  assert.equal(result.body.valid, false);
});
