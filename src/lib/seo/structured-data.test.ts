import test from "node:test";
import assert from "node:assert/strict";

import { buildHomePageSchema, buildBreadcrumbListSchema } from "./structured-data.ts";

test("homepage schema includes only valid site-level entities", () => {
  const schema = buildHomePageSchema();

  assert.ok(Array.isArray(schema));
  assert.equal(schema.length, 3);
  assert.equal(schema[0]["@type"], "Organization");
  assert.equal(schema[1]["@type"], "WebSite");
  assert.equal(schema[2]["@type"], "WebPage");
});

test("breadcrumbs omit empty entries and keep absolute URLs", () => {
  const schema = buildBreadcrumbListSchema([
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about-us" },
  ]);

  assert.ok(schema);
  assert.equal(schema["@type"], "BreadcrumbList");
  assert.equal(schema.itemListElement.length, 2);
  assert.ok(String(schema.itemListElement[0].item).startsWith("https://hodophile.pk/"));
});
