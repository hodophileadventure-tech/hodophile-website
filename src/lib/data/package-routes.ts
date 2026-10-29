import { exclusiveOffers, premiumDestinations, readyToBookDestinations } from "./premiumDestinations";
import { tourPackages } from "./tour-packages";

type PackageRouteEntry = {
  id: string;
  title: string;
  collection: "destination" | "ready-to-book" | "exclusive-offer" | "tour";
};

function slugifyPackageName(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const entries: PackageRouteEntry[] = [
  ...premiumDestinations.map(({ id, title }) => ({ id, title, collection: "destination" as const })),
  ...readyToBookDestinations.map(({ id, title }) => ({ id, title, collection: "ready-to-book" as const })),
  ...exclusiveOffers.map(({ id, title }) => ({ id, title, collection: "exclusive-offer" as const })),
  ...tourPackages.map(({ id, title }) => ({ id, title, collection: "tour" as const })),
];

const baseSlugCounts = new Map<string, number>();
for (const entry of entries) {
  const baseSlug = slugifyPackageName(entry.title);
  baseSlugCounts.set(baseSlug, (baseSlugCounts.get(baseSlug) ?? 0) + 1);
}

const routeSlugById = new Map<string, string>();
const usedRouteSlugs = new Set<string>();
const seenBaseSlugs = new Set<string>();

for (const entry of entries) {
  const baseSlug = slugifyPackageName(entry.title);
  const collectionSuffix = entry.collection === "destination" ? "destination" : entry.collection;
  const isDuplicateName = (baseSlugCounts.get(baseSlug) ?? 0) > 1;
  let routeSlug = isDuplicateName && seenBaseSlugs.has(baseSlug)
    ? `${baseSlug}-${collectionSuffix}`
    : baseSlug;

  if (usedRouteSlugs.has(routeSlug)) {
    routeSlug = `${routeSlug}-${slugifyPackageName(entry.id)}`;
  }
  if (usedRouteSlugs.has(routeSlug)) {
    throw new Error(`Duplicate package URL slug for ${entry.id}: ${routeSlug}`);
  }
  if (routeSlugById.has(entry.id)) {
    throw new Error(`Duplicate package route ID: ${entry.id}`);
  }

  seenBaseSlugs.add(baseSlug);
  usedRouteSlugs.add(routeSlug);
  routeSlugById.set(entry.id, routeSlug);
}

export function getPackageRouteSlug(id: string) {
  const routeSlug = routeSlugById.get(id);
  if (!routeSlug) {
    throw new Error(`Missing package URL mapping for ${id}`);
  }
  return routeSlug;
}

export function getPackagePath(id: string) {
  return `/packages/${getPackageRouteSlug(id)}`;
}

export const packageRouteEntries = entries.map(({ id, title }) => ({
  id,
  title,
  slug: getPackageRouteSlug(id),
}));

export const packageRouteRedirects = [
  ...entries.flatMap(({ id }) => {
    const destination = getPackagePath(id);
    const source = `/packages/${id}`;
    return source === destination ? [] : [{ source, destination, permanent: true }];
  }),
  {
    source: "/packages/skardu-deosai-basho-air-5-days",
    destination: getPackagePath("skardu-basho-6-days"),
    permanent: true,
  },
];
