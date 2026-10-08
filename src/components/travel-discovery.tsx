"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, useSyncExternalStore } from "react";

import type { RouteItineraryDay } from "@/lib/data/routes";
import { tourPackages, type TravelStyle, type TourDeparture } from "@/lib/data/tour-packages";
import { tourDiscoveryIdeas } from "@/lib/data/tour-discovery-ideas";
import { calculateTripFit, getSimilarTrips as getSimilarTripsFromEngine, getSimilarTripsForSavedTrips, normalizeTrip, type TripPreferences } from "@/lib/trip-intelligence";

type RegionFilter = "all" | "northern" | "southern";
type DurationFilter = "all" | "weekend" | "4-7" | "8-12" | "12-plus";
type SortOption = "recommended" | "price-low" | "duration-short";

type DiscoveryPackage = {
  id: string;
  title: string;
  duration: string;
  pricePerPerson?: number;
  requestOnly?: boolean;
  scheduleNote?: string;
  departureAvailability: "confirmed" | "on-request";
  region: Exclude<RegionFilter, "all">;
  notes: string[];
  destinationSlugs: string[];
  routeStops: string[];
  routeHighlights: string[];
  itinerary?: RouteItineraryDay[];
  bestFor?: string;
  pace?: "Fast" | "Moderate" | "Relaxed";
  travelStyles: TravelStyle[];
  departures: TourDeparture[];
  transport: string[];
  includes: string[];
  image?: string;
  summary: string;
};

const STORAGE_KEYS = {
  compare: "hodophile-compare",
  wishlist: "hodophile-wishlist",
};
const MAX_COMPARE_ITEMS = 4;
const STORAGE_CHANGE_EVENT = "hodophile-storage-change";
const EMPTY_STORAGE_SNAPSHOT = "[]";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);
}

function journeyHref(packageItem: DiscoveryPackage) {
  if (!packageItem.requestOnly) return `/packages/${packageItem.id}`;

  return `/make-my-trip?destination=${encodeURIComponent(packageItem.destinationSlugs[0] ?? "")}&inspiration=${encodeURIComponent(packageItem.title)}`;
}

function listedPrice(packageItem: DiscoveryPackage) {
  return packageItem.pricePerPerson === undefined ? "Price on request" : formatCurrency(packageItem.pricePerPerson);
}

const packageList: DiscoveryPackage[] = [
  ...tourPackages.map((tourPackage) => ({
    id: tourPackage.id,
    title: tourPackage.title,
    duration: tourPackage.duration,
    pricePerPerson: tourPackage.pricePerPerson,
    scheduleNote: tourPackage.scheduleNote,
    departureAvailability: tourPackage.departureAvailability,
    region: tourPackage.region,
    notes: tourPackage.notes ?? [],
    destinationSlugs: tourPackage.destinationSlugs,
    routeStops: tourPackage.routeStops,
    routeHighlights: tourPackage.routeHighlights ?? [],
    itinerary: tourPackage.itinerary,
    bestFor: tourPackage.bestFor,
    pace: tourPackage.pace,
    travelStyles: tourPackage.travelStyles,
    departures: tourPackage.departures,
    transport: tourPackage.transport ?? [],
    includes: tourPackage.includes ?? [],
    image: tourPackage.image,
    summary: tourPackage.description,
  })),
  ...tourDiscoveryIdeas.map((idea): DiscoveryPackage => ({
    ...idea,
    scheduleNote: "Dates, itinerary details, and current price to confirm",
    departureAvailability: "on-request",
    notes: [],
    routeHighlights: [],
    departures: [],
    transport: [],
    includes: [],
    requestOnly: true,
    summary: idea.description,
  })),
];

function getDurationDays(packageItem: DiscoveryPackage) {
  return Number(packageItem.duration.match(/\d+/)?.[0] ?? 0);
}

function formatDestination(slug: string) {
  return slug.split("-").map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(" ");
}

function includedDetails(packageItem: DiscoveryPackage, pattern: RegExp, fallback: string) {
  const matchingDetails = packageItem.includes.filter((item) => pattern.test(item));
  return matchingDetails.length ? matchingDetails.join(", ") : fallback;
}

const departureMonths = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

function buildTripPreferences(search: string, fitStyle: TravelStyle | "all", fitRegion: RegionFilter, fitDuration: DurationFilter, fitBudget: string, fitMonth: string): TripPreferences {
  const destination = search.trim() || undefined;
  return {
    destination,
    region: fitRegion === "all" ? undefined : fitRegion,
    travelStyle: fitStyle === "all" ? undefined : fitStyle,
    duration: fitDuration === "all" ? undefined : fitDuration,
    budget: fitBudget ? Number(fitBudget) : undefined,
    departureMonth: fitMonth || undefined,
  };
}

function getPreferenceSummary(score: number, matchedCount: number, selectedCount: number) {
  if (selectedCount === 0) return "Explore our trips";
  if (score >= 80) return "Strong match for your preferences";
  if (score >= 60) return "Good fit for your selected preferences";
  if (score >= 40) return "Partial match for your current preferences";
  return "Not a strong match yet";
}

function parseStorageIds(rawValue: string) {
  try {
    const parsedValue = JSON.parse(rawValue);
    return Array.isArray(parsedValue) ? parsedValue.filter((value): value is string => typeof value === "string") : [];
  } catch {
    return [];
  }
}

function getStorageSnapshot(storageKey: string) {
  if (typeof window === "undefined") return EMPTY_STORAGE_SNAPSHOT;

  try {
    return window.localStorage.getItem(storageKey) ?? EMPTY_STORAGE_SNAPSHOT;
  } catch {
    return EMPTY_STORAGE_SNAPSHOT;
  }
}

function subscribeToStorage(storageKey: string, onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  const handleStorage = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === null) onStoreChange();
  };
  const handleSameTabChange = (event: Event) => {
    if (event instanceof CustomEvent && event.detail === storageKey) onStoreChange();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(STORAGE_CHANGE_EVENT, handleSameTabChange);
  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(STORAGE_CHANGE_EVENT, handleSameTabChange);
  };
}

function writeStorageIds(storageKey: string, ids: string[]) {
  if (typeof window === "undefined") return;

  const uniqueIds = [...new Set(ids)];
  const storedIds = storageKey === STORAGE_KEYS.compare ? uniqueIds.slice(0, MAX_COMPARE_ITEMS) : uniqueIds;
  window.localStorage.setItem(storageKey, JSON.stringify(storedIds));
  window.dispatchEvent(new CustomEvent(STORAGE_CHANGE_EVENT, { detail: storageKey }));
}

function useStoredIds(storageKey: string, maximumItems?: number) {
  const snapshot = useSyncExternalStore(
    (onStoreChange) => subscribeToStorage(storageKey, onStoreChange),
    () => getStorageSnapshot(storageKey),
    () => EMPTY_STORAGE_SNAPSHOT,
  );

  return useMemo(() => {
    const ids = parseStorageIds(snapshot);
    return maximumItems === undefined ? ids : ids.slice(0, maximumItems);
  }, [maximumItems, snapshot]);
}

export function JourneyActions({ packageId, packageTitle }: { packageId: string; packageTitle: string }) {
  const wishlistIds = useStoredIds(STORAGE_KEYS.wishlist);
  const compareIds = useStoredIds(STORAGE_KEYS.compare, MAX_COMPARE_ITEMS);
  const isWishlistEnabled = wishlistIds.includes(packageId);
  const isCompareEnabled = compareIds.includes(packageId);

  const toggleWishlist = () => {
    if (typeof window === "undefined") return;
    writeStorageIds(STORAGE_KEYS.wishlist, isWishlistEnabled ? wishlistIds.filter((value) => value !== packageId) : [...wishlistIds, packageId]);
  };

  const toggleCompare = () => {
    if (typeof window === "undefined") return;

    if (isCompareEnabled) {
      writeStorageIds(STORAGE_KEYS.compare, compareIds.filter((value) => value !== packageId));
      return;
    }

    if (compareIds.length >= MAX_COMPARE_ITEMS) return;
    writeStorageIds(STORAGE_KEYS.compare, [...compareIds, packageId]);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={toggleWishlist}
        title={isWishlistEnabled ? "Remove from saved journeys" : "Save journey"}
        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-base transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b6b00] ${isWishlistEnabled ? "border-[#1b7a4b] bg-[#1b7a4b] text-white" : "border-stone-300 bg-white text-stone-700 hover:border-[#1b7a4b] hover:text-[#1b7a4b]"}`}
        aria-label={isWishlistEnabled ? `Remove ${packageTitle} from wishlist` : `Save ${packageTitle} to wishlist`}
      >
        ♥
      </button>
      <button
        type="button"
        onClick={toggleCompare}
        title={isCompareEnabled ? "Remove from comparison" : "Add to comparison"}
        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-base transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b6b00] ${isCompareEnabled ? "border-[#9a7600] bg-[#fcc000] text-[#0b0b0b]" : "border-stone-300 bg-white text-stone-700 hover:border-[#9a7600] hover:text-[#9a7600]"}`}
        aria-label={isCompareEnabled ? `Remove ${packageTitle} from compare` : `Add ${packageTitle} to compare`}
      >
        ⇄
      </button>
    </div>
  );
}

function RouteCard({
  packageItem,
  isWishlistEnabled,
  isCompareEnabled,
  onToggleWishlist,
  onToggleCompare,
  relatedContext,
}: {
  packageItem: DiscoveryPackage;
  isWishlistEnabled: boolean;
  isCompareEnabled: boolean;
  onToggleWishlist: (id: string) => void;
  onToggleCompare: (id: string) => void;
  relatedContext?: { savedTripTitle: string; reasons: string[] };
}) {
  const priceText = listedPrice(packageItem);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-[0_12px_30px_rgba(55,55,48,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#fcc000]/60 hover:shadow-[0_20px_40px_rgba(55,55,48,0.12)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
        <Image
          src={packageItem.image ?? "/images/package-cards/images__destinations__swat-hd.webp"}
          alt={packageItem.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-[#fcc000] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0b0b0b]">
          {packageItem.routeStops[0] ?? (packageItem.region === "northern" ? "Northern" : "Southern")}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-stone-500">
          <span>{packageItem.duration}</span>
          {packageItem.pace ? <span>{packageItem.pace} pace</span> : null}
        </div>

        <h3 className="mt-2 font-serif text-2xl leading-tight text-stone-950">{packageItem.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-600">{packageItem.summary}</p>
        {relatedContext ? (
          <div className="mt-3 border-l border-[#fcc000] pl-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-500">Related to {relatedContext.savedTripTitle}</p>
            {relatedContext.reasons.length ? (
              <ul className="mt-1 space-y-0.5 text-xs leading-5 text-stone-600">
                {relatedContext.reasons.map((reason) => <li key={`${packageItem.id}-${reason}`}>{reason}</li>)}
              </ul>
            ) : null}
          </div>
        ) : null}

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-stone-500">{packageItem.pricePerPerson === undefined ? "Pricing" : "From"}</p>
            <p className="mt-1 text-xl font-semibold text-[#9a7600]">{priceText}</p>
          </div>
          <span className="max-w-[48%] text-right text-xs font-semibold leading-5 text-stone-700">{packageItem.bestFor ?? "Not specified"}</span>
        </div>

        <div className="mt-4 flex items-center gap-2 border-t border-stone-200 pt-4">
          <Link href={journeyHref(packageItem)} className="inline-flex min-h-10 flex-1 items-center justify-center rounded-full bg-[#0b0b0b] px-4 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#282828] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b6b00]">
            {packageItem.requestOnly ? "Request details" : "View journey"}
          </Link>
          <button type="button" onClick={() => onToggleWishlist(packageItem.id)} title={isWishlistEnabled ? "Remove from saved journeys" : "Save journey"} className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-base transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b6b00] ${isWishlistEnabled ? "border-[#1b7a4b] bg-[#1b7a4b] text-white" : "border-stone-300 bg-white text-stone-700 hover:border-[#1b7a4b] hover:text-[#1b7a4b]"}`} aria-label={isWishlistEnabled ? `Remove ${packageItem.title} from wishlist` : `Save ${packageItem.title} to wishlist`}>
            ♥
          </button>
          <button type="button" onClick={() => onToggleCompare(packageItem.id)} title={isCompareEnabled ? "Remove from comparison" : "Add to comparison"} className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-base transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b6b00] ${isCompareEnabled ? "border-[#9a7600] bg-[#fcc000] text-[#0b0b0b]" : "border-stone-300 bg-white text-stone-700 hover:border-[#9a7600] hover:text-[#9a7600]"}`} aria-label={isCompareEnabled ? `Remove ${packageItem.title} from compare` : `Add ${packageItem.title} to compare`}>
            ⇄
          </button>
        </div>
      </div>
    </article>
  );
}

export function TravelDiscoveryCatalog() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [style, setStyle] = useState<TravelStyle | "all">("all");
  const [duration, setDuration] = useState<DurationFilter>("all");
  const [region, setRegion] = useState<RegionFilter>("all");
  const [minimumBudget, setMinimumBudget] = useState("");
  const [maximumBudget, setMaximumBudget] = useState("");
  const [sort, setSort] = useState<SortOption>("recommended");
  const [fitStyle, setFitStyle] = useState<TravelStyle | "all">("all");
  const [fitRegion, setFitRegion] = useState<RegionFilter>("all");
  const [fitDuration, setFitDuration] = useState<DurationFilter>("all");
  const [fitBudget, setFitBudget] = useState("");
  const [fitMonth, setFitMonth] = useState("");
  const compareIds = useStoredIds(STORAGE_KEYS.compare, MAX_COMPARE_ITEMS);
  const wishlistIds = useStoredIds(STORAGE_KEYS.wishlist);
  const [quickCompareSelection, setQuickCompareSelection] = useState<Array<string | "">>(["", "", "", ""]);

  const filteredPackages = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = packageList.filter((packageItem) => {
      const matchesQuery =
        query.length === 0 ||
        packageItem.title.toLowerCase().includes(query) ||
        packageItem.destinationSlugs.some((slug) => slug.toLowerCase().includes(query)) ||
        packageItem.summary.toLowerCase().includes(query) ||
        packageItem.notes.some((note) => note.toLowerCase().includes(query));

      const packageDuration = getDurationDays(packageItem);
      const matchesStyle = style === "all" || packageItem.travelStyles.includes(style);
      const matchesDuration = duration === "all" ||
        (duration === "weekend" && packageDuration <= 3) ||
        (duration === "4-7" && packageDuration >= 4 && packageDuration <= 7) ||
        (duration === "8-12" && packageDuration >= 8 && packageDuration <= 12) ||
        (duration === "12-plus" && packageDuration > 12);
      const matchesRegion = region === "all" || packageItem.region === region;
      const matchesMinimum = minimumBudget === "" || (packageItem.pricePerPerson !== undefined && packageItem.pricePerPerson >= Number(minimumBudget));
      const matchesMaximum = maximumBudget === "" || (packageItem.pricePerPerson !== undefined && packageItem.pricePerPerson <= Number(maximumBudget));

      return matchesQuery && matchesStyle && matchesDuration && matchesRegion && matchesMinimum && matchesMaximum;
    });
    if (sort === "price-low") {
      return filtered.sort((first, second) => (first.pricePerPerson ?? Number.POSITIVE_INFINITY) - (second.pricePerPerson ?? Number.POSITIVE_INFINITY));
    }
    if (sort === "duration-short") {
      return filtered.sort((first, second) => getDurationDays(first) - getDurationDays(second));
    }
    return filtered;
  }, [duration, maximumBudget, minimumBudget, region, search, sort, style]);

  const fitPreferences = useMemo(
    () => buildTripPreferences(search, fitStyle, fitRegion, fitDuration, fitBudget, fitMonth),
    [fitBudget, fitDuration, fitMonth, fitRegion, fitStyle, search],
  );
  const fitCriteriaCount = [
    fitPreferences.destination,
    fitPreferences.region,
    fitPreferences.travelStyle,
    fitPreferences.duration,
    fitPreferences.budget,
    fitPreferences.departureMonth,
  ].filter(Boolean).length;

  const fitRecommendations = useMemo(() => {
    if (fitCriteriaCount === 0) {
      return [];
    }

    return packageList
      .map((packageItem) => {
        const result = calculateTripFit(fitPreferences, packageItem);
        return {
          packageItem,
          score: result.score,
          summary: result.summary,
          reasons: result.reasons,
          matchedCriteria: result.matchedCriteria,
        };
      })
      .sort((first, second) => second.score - first.score || first.packageItem.title.localeCompare(second.packageItem.title))
      .slice(0, 3);
  }, [fitCriteriaCount, fitPreferences]);

  const toggleWishlist = (id: string) => {
    writeStorageIds(
      STORAGE_KEYS.wishlist,
      wishlistIds.includes(id) ? wishlistIds.filter((value) => value !== id) : [...wishlistIds, id],
    );
  };

  const persistCompareSelection = (ids: string[]) => {
    writeStorageIds(STORAGE_KEYS.compare, ids);
    router.push("/compare");
  };

  const handleCompareSubmit = () => {
    const selectedIds = [...new Set(quickCompareSelection.filter((value): value is string => Boolean(value)))];
    if (selectedIds.length === 0) return;
    persistCompareSelection(selectedIds.slice(0, MAX_COMPARE_ITEMS));
  };

  const toggleCompare = (id: string) => {
    if (compareIds.includes(id)) {
      writeStorageIds(STORAGE_KEYS.compare, compareIds.filter((value) => value !== id));
      return;
    }
    if (compareIds.length >= MAX_COMPARE_ITEMS) return;
    writeStorageIds(STORAGE_KEYS.compare, [...compareIds, id]);
  };

  const comparePackages = compareIds
    .map((id) => packageList.find((packageItem) => packageItem.id === id))
    .filter((packageItem): packageItem is DiscoveryPackage => Boolean(packageItem));

  return (
    <section id="tour-discovery" className="relative isolate scroll-mt-20 overflow-hidden bg-[#0b0b0b] text-white">
      <div className="pointer-events-none absolute -left-48 top-12 h-[34rem] w-[34rem] rounded-full bg-[#FCC000]/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute -right-48 top-[38%] h-[38rem] w-[38rem] rounded-full bg-[#b47b12]/[0.09] blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-14 lg:py-24">
      <div className="relative flex flex-wrap items-end justify-between gap-4 border-y border-[#FCC000]/25 py-8 sm:py-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FCC000]/65 to-transparent" />
        <div>
          <p className="inline-flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-[#FCC000]">
            <span className="h-px w-8 bg-[#FCC000]" />
            Smart trip suggestions
          </p>
          <h2 className="mt-5 max-w-3xl font-[var(--font-display)] text-5xl leading-[0.98] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl">Find your Pakistan escape.</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/65">
            Share what you’re looking for and discover journeys matched to your style, dates, and budget.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm font-medium text-white/75">
          <span className="rounded-full border border-[#FCC000]/35 bg-[#FCC000]/[0.06] px-3 py-2 text-[#FCC000]">{filteredPackages.length} {filteredPackages.length === 1 ? "journey" : "journeys"}</span>
          <Link href="/wishlist" className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-2 transition hover:border-[#FCC000]/50 hover:text-[#FCC000]">
            Saved trips ({wishlistIds.length})
          </Link>
        </div>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px_220px]">
        <label className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-3 transition focus-within:border-[#FCC000]/55">
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">Where do you want to go?</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search Pakistan destinations"
            className="w-full border-0 bg-transparent px-1 py-2 text-sm text-white placeholder:text-white/35 focus:outline-none"
          />
        </label>

        <label className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-3 transition focus-within:border-[#FCC000]/55">
          <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">Duration</span>
          <select
            value={duration}
            onChange={(event) => setDuration(event.target.value as DurationFilter)}
            className="w-full border-0 bg-transparent px-1 py-2 text-sm text-white focus:outline-none"
          >
            <option value="all">Any duration</option>
            <option value="weekend">Weekend</option>
            <option value="4-7">4–7 days</option>
            <option value="8-12">8–12 days</option>
            <option value="12-plus">12+ days</option>
          </select>
        </label>

        <label className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-3 transition focus-within:border-[#FCC000]/55">
          <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">Sort journeys</span>
          <select value={sort} onChange={(event) => setSort(event.target.value as SortOption)} className="w-full border-0 bg-transparent px-1 py-2 text-sm text-white focus:outline-none">
            <option value="recommended">Catalog order</option>
            <option value="price-low">Price: low to high</option>
            <option value="duration-short">Shortest first</option>
          </select>
        </label>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr_1fr]">
        <div id="adventure-tours">
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">Travel style</span>
          <div className="flex flex-wrap gap-2">
            {([
              ["all", "All styles"],
              ["family", "Family"],
              ["couples", "Couples"],
              ["adventure", "Adventure"],
              ["tailored", "Tailored"],
            ] as const).map(([value, label]) => (
              <button key={value} type="button" onClick={() => setStyle(value)} aria-pressed={style === value} className={`rounded-full px-3 py-2 text-xs font-semibold transition ${style === value ? "bg-[#FCC000] text-stone-950" : "border border-white/15 bg-white/[0.04] text-white/75 hover:border-[#FCC000]/60 hover:text-white"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">Region</span>
          <div className="flex flex-wrap gap-2">
            {(["all", "northern", "southern"] as const).map((option) => (
              <button key={option} type="button" onClick={() => setRegion(option)} aria-pressed={region === option} className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition ${region === option ? "bg-[#FCC000] text-stone-950" : "border border-white/15 bg-white/[0.04] text-white/75 hover:border-[#FCC000]/60 hover:text-white"}`}>
                {option === "all" ? "All" : option}
              </button>
            ))}
          </div>
        </div>

        <fieldset>
          <legend className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">Budget · PKR</legend>
          <div className="grid grid-cols-2 gap-2">
            <label className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-white/55">
              Min
              <input type="number" min="0" step="5000" value={minimumBudget} onChange={(event) => setMinimumBudget(event.target.value)} placeholder="Any" className="mt-1 block w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35" />
            </label>
            <label className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-white/55">
              Max
              <input type="number" min="0" step="5000" value={maximumBudget} onChange={(event) => setMaximumBudget(event.target.value)} placeholder="Any" className="mt-1 block w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35" />
            </label>
          </div>
        </fieldset>
      </div>

      <section className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(130deg,rgba(255,255,255,0.07),rgba(255,255,255,0.015)_55%,rgba(252,192,0,0.06))] p-5 sm:p-7" aria-labelledby="trip-fit-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#FCC000]/30 bg-[#FCC000]/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FCC000]">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#FCC000] shadow-[0_0_0_3px_rgba(252,192,0,0.18)]" />
              Trip suggestions
            </p>
            <h3 id="trip-fit-heading" className="mt-3 font-[var(--font-display)] text-3xl text-white sm:text-4xl">Your kind of Pakistan journey</h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">Tell us what matters. We’ll bring the most relevant routes to the top.</p>
          </div>
          <span className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs font-medium text-white/55">Matched using listed route, price, and departure details</span>
        </div>

        <div className="mt-6 grid gap-3 rounded-[1.5rem] border border-white/10 bg-black/20 p-4 sm:grid-cols-2 xl:grid-cols-5">
          <label className="text-xs font-bold text-white/75">
            Travel style
            <select value={fitStyle} onChange={(event) => setFitStyle(event.target.value as TravelStyle | "all")} className="mt-2 block min-h-12 w-full rounded-xl border border-stone-200 bg-white px-3 text-sm font-medium text-stone-900 shadow-sm transition focus:border-[#c89a00] focus:outline-none focus:ring-2 focus:ring-[#fcc000]/30">
              <option value="all">Any style</option>
              <option value="family">Family</option>
              <option value="couples">Couples</option>
              <option value="adventure">Adventure</option>
              <option value="tailored">Tailored</option>
            </select>
          </label>
          <label className="text-xs font-bold text-white/75">
            Region
            <select value={fitRegion} onChange={(event) => setFitRegion(event.target.value as RegionFilter)} className="mt-2 block min-h-12 w-full rounded-xl border border-stone-200 bg-white px-3 text-sm font-medium text-stone-900 shadow-sm transition focus:border-[#c89a00] focus:outline-none focus:ring-2 focus:ring-[#fcc000]/30">
              <option value="all">Either region</option>
              <option value="northern">Northern Pakistan</option>
              <option value="southern">Southern Pakistan</option>
            </select>
          </label>
          <label className="text-xs font-bold text-white/75">
            Time available
            <select value={fitDuration} onChange={(event) => setFitDuration(event.target.value as DurationFilter)} className="mt-2 block min-h-12 w-full rounded-xl border border-stone-200 bg-white px-3 text-sm font-medium text-stone-900 shadow-sm transition focus:border-[#c89a00] focus:outline-none focus:ring-2 focus:ring-[#fcc000]/30">
              <option value="all">Any duration</option>
              <option value="weekend">Up to 3 days</option>
              <option value="4-7">4–7 days</option>
              <option value="8-12">8–12 days</option>
              <option value="12-plus">More than 12 days</option>
            </select>
          </label>
          <label className="text-xs font-bold text-white/75">
            Budget per person
            <input type="number" min="0" step="5000" value={fitBudget} onChange={(event) => setFitBudget(event.target.value)} placeholder="No limit" className="mt-2 block min-h-12 w-full rounded-xl border border-stone-200 bg-white px-3 text-sm font-medium text-stone-900 shadow-sm placeholder:text-stone-400 transition focus:border-[#c89a00] focus:outline-none focus:ring-2 focus:ring-[#fcc000]/30" />
          </label>
          <label className="text-xs font-bold text-white/75">
            Season match
            <select value={fitMonth} onChange={(event) => setFitMonth(event.target.value)} className="mt-2 block min-h-12 w-full rounded-xl border border-stone-200 bg-white px-3 text-sm font-medium text-stone-900 shadow-sm transition focus:border-[#c89a00] focus:outline-none focus:ring-2 focus:ring-[#fcc000]/30">
              <option value="">Not selected</option>
              {departureMonths.map((month) => <option key={month} value={month}>{month.charAt(0).toUpperCase() + month.slice(1)}</option>)}
            </select>
          </label>
        </div>

        {fitCriteriaCount ? (
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {fitRecommendations.map(({ packageItem, score, summary, reasons, matchedCriteria }) => {
              const matchReasons = reasons.filter((reason) => reason.type === "match").slice(0, 3);
              const mismatchReasons = reasons.filter((reason) => reason.type === "mismatch").slice(0, 2);
              const label = getPreferenceSummary(score, matchedCriteria.length, fitCriteriaCount);

              return (
                <article key={packageItem.id} className="group flex flex-col overflow-hidden rounded-[1.6rem] border border-stone-200/90 bg-white shadow-[0_14px_35px_rgba(42,35,13,0.07)] transition duration-500 hover:-translate-y-1 hover:border-[#d8b431] hover:shadow-[0_22px_42px_rgba(42,35,13,0.12)] motion-reduce:transform-none motion-reduce:transition-none">
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-200">
                    <Image
                      src={packageItem.image ?? "/images/package-cards/images__destinations__swat-hd.webp"}
                      alt={packageItem.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                    <span className="absolute bottom-3 left-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/85">{packageItem.duration} · {packageItem.region}</span>
                    <span className="absolute right-3 top-3 rounded-full border border-white/40 bg-[#fcc000] px-3 py-1.5 text-xs font-black text-stone-950 shadow-lg">{score}% match</span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-stone-100">
                        <span className="block h-full rounded-full bg-gradient-to-r from-[#e0ae00] to-[#fcc000]" style={{ width: `${score}%` }} />
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#806000]">{label}</span>
                    </div>
                    <h4 className="font-serif text-xl leading-tight text-stone-950">{packageItem.title}</h4>
                    <p className="mt-1 text-xs font-bold text-[#806000]">{listedPrice(packageItem)}{packageItem.pricePerPerson === undefined ? "" : <span className="font-medium text-stone-500"> per person</span>}</p>
                    <p className="mt-3 text-xs leading-5 text-stone-600">{summary}</p>
                    <ul className="mt-4 space-y-2 text-xs text-stone-600">
                    {matchReasons.length ? (
                      matchReasons.map((reason) => (
                        <li key={`${packageItem.id}-${reason.criterion}`} className="flex items-start gap-2 rounded-xl bg-[#f6f3e9] px-3 py-2">
                          <span aria-hidden="true" className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-[#b38a00]" />
                          <span>{reason.label}</span>
                        </li>
                      ))
                    ) : (
                      <li className="flex items-start gap-2 rounded-xl bg-stone-50 px-3 py-2">
                        <span aria-hidden="true" className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-stone-400" />
                        <span>No selected preference is a strong match yet.</span>
                      </li>
                    )}
                    {mismatchReasons.length > 0 ? (
                      mismatchReasons.map((reason) => (
                        <li key={`${packageItem.id}-${reason.criterion}-mismatch`} className="flex items-start gap-2 text-stone-500">
                          <span aria-hidden="true" className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-stone-300" />
                          <span>{reason.label}</span>
                        </li>
                      ))
                    ) : null}
                    </ul>
                    <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-stone-100 pt-4 text-xs font-semibold">
                      <Link href={journeyHref(packageItem)} className="rounded-sm text-stone-950 underline decoration-[#fcc000] decoration-2 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b38a00]">{packageItem.requestOnly ? "Request details" : "View journey"}</Link>
                      <Link href={`/make-my-trip?destination=${encodeURIComponent(packageItem.destinationSlugs[0] ?? "")}&inspiration=${encodeURIComponent(packageItem.title)}`} className="rounded-sm text-[#735900] underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b38a00]">Plan this route</Link>
                      <button type="button" onClick={() => toggleWishlist(packageItem.id)} className="rounded-sm text-stone-600 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b38a00]">{wishlistIds.includes(packageItem.id) ? "Saved" : "Save"}</button>
                      <button type="button" onClick={() => toggleCompare(packageItem.id)} disabled={!compareIds.includes(packageItem.id) && compareIds.length >= MAX_COMPARE_ITEMS} className="rounded-sm text-stone-600 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b38a00] disabled:cursor-not-allowed disabled:text-stone-500 disabled:opacity-100">{compareIds.includes(packageItem.id) ? "In compare" : "Compare"}</button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-5 rounded-[1.5rem] border border-dashed border-[#d9c275] bg-white/75 px-5 py-6 text-sm text-stone-600">
            <p className="font-serif text-xl text-stone-950">A better match starts with one detail</p>
            <p className="mt-1">Choose a destination, travel style, duration, budget, or month to see trips matched to your plans.</p>
          </div>
        )}

        {fitCriteriaCount && fitRecommendations[0] ? (
          <div className="mt-5 border-t border-white/10 pt-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">Similar trips to {fitRecommendations[0].packageItem.title}</p>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
              {getSimilarTripsFromEngine(fitRecommendations[0].packageItem, packageList).map(({ trip, reasons }) => {
                const similarPackage = packageList.find((packageItem) => packageItem.id === trip.id);
                if (!similarPackage) return null;

                return (
                  <Link key={trip.id} href={journeyHref(similarPackage)} className="text-sm font-semibold text-white/85 underline decoration-white/25 underline-offset-4 hover:decoration-[#fcc000]">
                    {trip.title}<span className="ml-2 text-xs font-normal text-white/50">{reasons.join(" · ")}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}
      </section>

      <div className="mt-7 rounded-[1.8rem] border border-[#28251c] bg-[radial-gradient(circle_at_top_right,_rgba(252,192,0,0.2),_transparent_32%),linear-gradient(135deg,_#171714,_#29271f)] p-5 text-white shadow-[0_24px_55px_rgba(20,18,12,0.18)] sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#ffd84d]">Quick compare</p>
            <h3 className="mt-1 font-serif text-2xl text-white">Build your side-by-side shortlist</h3>
            <p className="mt-1 text-sm text-white/65">Select up to four journeys to compare the details that matter.</p>
          </div>
          <button
            type="button"
            onClick={() => setQuickCompareSelection(["", "", "", ""])}
            className="text-xs font-semibold uppercase tracking-[0.13em] text-white/70 transition hover:text-[#ffd84d]"
          >
            Clear
          </button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {quickCompareSelection.map((selectedId, index) => (
            <label key={`quick-compare-${index}`} className="rounded-2xl border border-white/15 bg-white/[0.07] p-3">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#ffd84d]">Journey {index + 1}</span>
              <select
                value={selectedId}
                onChange={(event) => {
                  const nextSelection = [...quickCompareSelection];
                  nextSelection[index] = event.target.value;
                  setQuickCompareSelection(nextSelection);
                }}
                className="w-full rounded-xl border border-white/15 bg-[#fdfcf8] px-3 py-2.5 text-sm text-stone-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#fcc000]"
              >
                <option value="">Choose a route</option>
                {packageList.map((route) => (
                  <option key={route.id} value={route.id} disabled={quickCompareSelection.some((selected, selectedIndex) => selectedIndex !== index && selected === route.id)}>
                    {route.title}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleCompareSubmit}
            className="inline-flex items-center justify-center rounded-full bg-[#fcc000] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-stone-950 transition hover:bg-[#ffd84d]"
          >
            Compare selected
          </button>
          <Link href="/compare" className="text-sm font-semibold text-white/75 transition hover:text-[#ffd84d]">
            Open compare page
          </Link>
        </div>
      </div>

      {comparePackages.length > 0 && (
        <div className="mt-7 rounded-[1.6rem] border border-white/10 bg-[linear-gradient(130deg,rgba(255,255,255,0.07),rgba(255,255,255,0.015)_55%,rgba(252,192,0,0.06))] p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#FCC000]">Comparison tray</p>
              <h3 className="mt-1 text-lg font-semibold text-white">Selected for side-by-side comparison</h3>
              <p className="mt-1 text-xs text-white/55">Up to four journeys. Remove one to make room for another.</p>
            </div>
            <Link href="/compare" className="inline-flex items-center justify-center rounded-full bg-[#0b0b0b] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-black">
              View compare
            </Link>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {comparePackages.map((packageItem) => (
              <div key={packageItem.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-3">
                <div>
                  <p className="text-sm font-semibold text-white">{packageItem.title}</p>
                  <p className="mt-1 text-xs text-white/55">{listedPrice(packageItem)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleCompare(packageItem.id)}
                  className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8b6b00]"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-[var(--font-display)] text-3xl text-white">Journey results</h3>
            <p className="mt-1 text-sm text-white/55">{filteredPackages.length} {filteredPackages.length === 1 ? "journey" : "journeys"} found</p>
          </div>
          {search || style !== "all" || duration !== "all" || region !== "all" || minimumBudget || maximumBudget ? (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStyle("all");
                setDuration("all");
                setRegion("all");
                setMinimumBudget("");
                setMaximumBudget("");
                setSort("recommended");
              }}
              className="text-sm font-semibold text-white/65 transition hover:text-[#FCC000]"
            >
              Clear filters
            </button>
          ) : null}
        </div>

        {filteredPackages.length === 0 ? (
          <div className="mt-5 rounded-[1.5rem] border border-dashed border-stone-300 bg-white px-5 py-8 text-center">
            <p className="text-lg font-semibold text-stone-900">No trips match this search yet.</p>
            <p className="mt-2 text-sm text-stone-600">Adjust your filters or search another destination to see more journeys.</p>
          </div>
        ) : (
          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredPackages.map((packageItem) => (
              <RouteCard
                key={packageItem.id}
                packageItem={packageItem}
                isWishlistEnabled={wishlistIds.includes(packageItem.id)}
                isCompareEnabled={compareIds.includes(packageItem.id)}
                onToggleWishlist={toggleWishlist}
                onToggleCompare={toggleCompare}
              />
            ))}
          </div>
        )}
      </div>
      </div>
    </section>
  );
}

export function CompareTripsClient() {
  const compareIds = useStoredIds(STORAGE_KEYS.compare, MAX_COMPARE_ITEMS);
  const [fitPreferences, setFitPreferences] = useState<TripPreferences>({});

  const comparePackages = compareIds
    .map((id) => packageList.find((packageItem) => packageItem.id === id))
    .filter((packageItem): packageItem is DiscoveryPackage => Boolean(packageItem));
  const comparedStops = [...new Set(comparePackages.flatMap((packageItem) => packageItem.routeStops))];
  const hasFitPreferences = Boolean(
    fitPreferences.destination ||
    fitPreferences.region ||
    fitPreferences.travelStyle ||
    fitPreferences.duration ||
    (typeof fitPreferences.budget === "number" && Number.isFinite(fitPreferences.budget)),
  );
  const fitResults = hasFitPreferences
    ? comparePackages.map((packageItem) => ({
        packageItem,
        result: calculateTripFit(fitPreferences, packageItem),
      }))
    : [];

  const removeComparedPackage = (id: string) => {
    writeStorageIds(STORAGE_KEYS.compare, compareIds.filter((value) => value !== id));
  };

  if (comparePackages.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-[2rem] border border-stone-800 bg-[radial-gradient(circle_at_top_right,_rgba(252,192,0,0.23),_transparent_36%),linear-gradient(135deg,_#11110f,_#29271f)] p-8 text-center shadow-[0_24px_60px_rgba(20,18,12,0.2)]">
        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#ffd84d]">Your shortlist, side by side</p>
        <p className="mt-3 font-serif text-3xl text-white">Choose the journey that feels right.</p>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/70">Choose up to four trips to compare their stops, time away, starting price, and travel style side by side.</p>
        <Link href="/tours" className="mt-6 inline-flex items-center justify-center rounded-full bg-[#fcc000] px-5 py-3 text-sm font-bold text-stone-950 transition hover:bg-[#ffd84d]">
          Browse catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-[#e4d6a8] bg-[linear-gradient(180deg,_#fffdf7,_#f5f1e7)] p-4 shadow-[0_28px_70px_rgba(45,36,12,0.12)] sm:p-6 md:p-8">
      <div className="relative -mx-4 -mt-4 flex flex-wrap items-end justify-between gap-4 overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_right,_rgba(252,192,0,0.25),_transparent_32%),linear-gradient(120deg,_#11110f,_#28261f)] px-5 py-7 sm:-mx-6 sm:-mt-6 sm:px-7 md:-mx-8 md:-mt-8 md:px-9 md:py-9">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ffd84d]">The journey edit</p>
          <h1 className="mt-3 font-serif text-4xl text-white sm:text-5xl">Compare journeys</h1>
          <p className="mt-2 text-sm text-white/70">Compare {comparePackages.length} selected {comparePackages.length === 1 ? "journey" : "journeys"} on the details that shape your trip.</p>
        </div>
        <Link href="/tours" className="inline-flex min-h-11 items-center rounded-full border border-white/25 px-4 text-sm font-semibold text-white transition hover:border-[#fcc000] hover:text-[#ffd84d]">
          Add more journeys
        </Link>
      </div>

      <section className="mt-7 rounded-[1.7rem] border border-[#e8d99f] bg-[radial-gradient(circle_at_top_right,_rgba(252,192,0,0.12),_transparent_35%),#fffdf7] p-5 sm:p-6" aria-labelledby="compare-fit-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#806000]">Made for your plans</p>
            <h2 id="compare-fit-heading" className="mt-2 font-serif text-3xl text-stone-950">Your trip fit</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
              Fit uses only preferences you select here. Preferences are not saved, and listed package prices may differ from a custom quotation.
            </p>
          </div>
          {hasFitPreferences ? (
            <button
              type="button"
              onClick={() => setFitPreferences({})}
              className="min-h-11 rounded-full border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-700 transition hover:border-[#8b6b00] hover:text-stone-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b6b00]"
            >
              Clear preferences
            </button>
          ) : null}
        </div>

        <div className="mt-5 grid gap-3 rounded-2xl border border-[#efe6c9] bg-white/80 p-4 sm:grid-cols-2 xl:grid-cols-5">
          <label className="text-xs font-bold text-stone-700">
            Destination
            <select
              value={fitPreferences.destination ?? ""}
              onChange={(event) => setFitPreferences((current) => ({ ...current, destination: event.target.value || undefined }))}
              className="mt-2 block min-h-12 w-full rounded-xl border border-stone-200 bg-white px-3 text-sm font-medium text-stone-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b38a00]"
            >
              <option value="">Any destination</option>
              {[...new Set(packageList.flatMap((packageItem) => packageItem.destinationSlugs))].sort().map((destination) => (
                <option key={destination} value={destination}>{formatDestination(destination)}</option>
              ))}
            </select>
          </label>
          <label className="text-xs font-bold text-stone-700">
            Region
            <select
              value={fitPreferences.region ?? ""}
              onChange={(event) => setFitPreferences((current) => ({ ...current, region: (event.target.value || undefined) as TripPreferences["region"] }))}
              className="mt-2 block min-h-12 w-full rounded-xl border border-stone-200 bg-white px-3 text-sm font-medium text-stone-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b38a00]"
            >
              <option value="">Either region</option>
              <option value="northern">Northern Pakistan</option>
              <option value="southern">Southern Pakistan</option>
            </select>
          </label>
          <label className="text-xs font-bold text-stone-700">
            Travel style
            <select
              value={fitPreferences.travelStyle ?? ""}
              onChange={(event) => setFitPreferences((current) => ({ ...current, travelStyle: (event.target.value || undefined) as TravelStyle | undefined }))}
              className="mt-2 block min-h-12 w-full rounded-xl border border-stone-200 bg-white px-3 text-sm font-medium text-stone-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b38a00]"
            >
              <option value="">Any style</option>
              <option value="family">Family</option>
              <option value="couples">Couples</option>
              <option value="adventure">Adventure</option>
              <option value="tailored">Tailored</option>
            </select>
          </label>
          <label className="text-xs font-bold text-stone-700">
            Time available
            <select
              value={fitPreferences.duration ?? ""}
              onChange={(event) => setFitPreferences((current) => ({ ...current, duration: (event.target.value || undefined) as TripPreferences["duration"] }))}
              className="mt-2 block min-h-12 w-full rounded-xl border border-stone-200 bg-white px-3 text-sm font-medium text-stone-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b38a00]"
            >
              <option value="">Any duration</option>
              <option value="weekend">Up to 3 days</option>
              <option value="4-7">4–7 days</option>
              <option value="8-12">8–12 days</option>
              <option value="12-plus">More than 12 days</option>
            </select>
          </label>
          <label className="text-xs font-bold text-stone-700">
            Budget per person · PKR
            <input
              type="number"
              min="0"
              step="5000"
              value={fitPreferences.budget ?? ""}
              onChange={(event) => setFitPreferences((current) => ({ ...current, budget: event.target.value === "" ? undefined : Number(event.target.value) }))}
              placeholder="No limit"
              className="mt-2 block min-h-12 w-full rounded-xl border border-stone-200 bg-white px-3 text-sm font-medium text-stone-900 placeholder:text-stone-400 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b38a00]"
            />
          </label>
        </div>

        {!hasFitPreferences ? (
          <p role="status" className="mt-4 text-sm text-stone-600">Select your preferences to see how each trip fits your plans.</p>
        ) : (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {fitResults.map(({ packageItem, result }) => (
              <article key={packageItem.id} className="border-l-2 border-[#fcc000] bg-white p-4">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8b6b00]">{packageItem.title}</h3>
                <p className="mt-2 text-2xl font-semibold text-stone-950">{result.score}% match</p>
                <p className="mt-1 text-sm text-stone-600">{result.summary}</p>
                <ul className="mt-4 space-y-3">
                  {result.reasons.map((reason) => (
                    <li key={`${packageItem.id}-${reason.criterion}`} className="border-t border-stone-100 pt-2 text-xs leading-5 text-stone-700">
                      <p className="font-semibold">{reason.label}</p>
                      <p className="mt-0.5 text-stone-600">{reason.detail}</p>
                    </li>
                  ))}
                </ul>
                <Link href={journeyHref(packageItem)} className="mt-4 inline-flex min-h-10 items-center text-xs font-semibold text-stone-950 underline decoration-[#fcc000] decoration-2 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b6b00]">
                  {packageItem.requestOnly ? "Request details" : "View journey"}
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="mt-8 overflow-hidden rounded-[1.7rem] border border-stone-200 bg-white/80 p-4 sm:p-6" aria-labelledby="objective-comparison-heading">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-stone-200 pb-5">
          <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#806000]">The details, side by side</p>
          <h2 id="objective-comparison-heading" className="mt-2 font-serif text-3xl text-stone-950">Compare the journey details</h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Listed per-person package prices are shown here. A custom quotation is calculated separately and may vary with dates, group size, transport, and accommodation.
          </p>
          </div>
          <span className="rounded-full bg-[#fff3c4] px-3 py-2 text-xs font-bold text-[#725600]">{comparePackages.length} journeys selected</span>
        </div>

      <p className="mt-4 text-xs font-medium text-stone-500 sm:hidden">Swipe across to see every selected journey.</p>
      <div role="region" aria-label="Objective trip comparison table; scroll horizontally to compare all journeys" tabIndex={0} className="mt-4 overflow-x-auto rounded-2xl [scrollbar-color:#c8a83d_#f2efe6] [scrollbar-width:thin] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b38a00]">
        <table className="min-w-full border-separate border-spacing-y-2 text-left">
          <caption className="sr-only">Objective package details for the selected journeys</caption>
          <thead>
            <tr>
              <th className="sticky left-0 z-20 min-w-[145px] bg-white pr-3 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 sm:min-w-[180px] sm:pr-4">Journey</th>
              {comparePackages.map((packageItem) => (
                <th key={packageItem.id} className="min-w-[220px] pr-4 align-top">
                  <div className="overflow-hidden rounded-[1.3rem] border border-[#e8dbb6] bg-[linear-gradient(155deg,_#fffdf7,_#f5f0e1)] p-3 shadow-[0_12px_28px_rgba(50,40,10,0.08)] sm:p-4">
                    <div className="relative mb-3 aspect-[16/9] overflow-hidden rounded-xl bg-stone-200">
                      <Image src={packageItem.image ?? "/images/package-cards/images__destinations__swat-hd.webp"} alt="" fill sizes="(max-width: 768px) 70vw, 220px" className="object-cover" />
                      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2 pt-7 text-[10px] font-bold uppercase tracking-[0.18em] text-white">Journey {comparePackages.indexOf(packageItem) + 1}</span>
                    </div>
                    <p className="font-serif text-lg leading-tight text-stone-950">{packageItem.title}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-stone-500">{packageItem.duration} · {packageItem.pace ?? "Pace to confirm"}</p>
                    <p className="mt-3 text-xl font-bold text-[#806000]">{listedPrice(packageItem)}</p>
                    <details className="group mt-4 border-t border-[#e8dbb6] pt-3">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-xs font-bold text-stone-800 marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b38a00] [&::-webkit-details-marker]:hidden">
                        <span>{packageItem.itinerary?.length ? "View day-by-day itinerary" : "View route outline"}</span>
                        <span aria-hidden="true" className="text-[#806000] transition-transform group-open:rotate-180">⌄</span>
                      </summary>
                      {packageItem.itinerary?.length ? (
                        <ol className="mt-3 space-y-3">
                          {packageItem.itinerary.map((day) => (
                            <li key={`${packageItem.id}-${day.day}`} className="border-l-2 border-[#fcc000] pl-3">
                              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#806000]">{day.day}</p>
                              <p className="mt-0.5 text-sm font-semibold text-stone-900">{day.title}</p>
                              <p className="mt-1 text-xs leading-5 text-stone-600">{day.description}</p>
                            </li>
                          ))}
                        </ol>
                      ) : (
                        <div className="mt-3">
                          <p className="text-xs leading-5 text-stone-600">
                            The day-by-day plan is not listed yet and will be confirmed with your dates.
                          </p>
                          <ol className="mt-2 list-inside list-decimal space-y-1 text-xs leading-5 text-stone-700">
                            {packageItem.routeStops.map((stop) => <li key={`${packageItem.id}-${stop}`}>{stop}</li>)}
                          </ol>
                        </div>
                      )}
                    </details>
                    <button type="button" onClick={() => removeComparedPackage(packageItem.id)} className="mt-3 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-stone-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700">Remove journey</button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { label: "Listed price per person", value: (packageItem: DiscoveryPackage) => listedPrice(packageItem) },
              { label: "Duration", value: (packageItem: DiscoveryPackage) => packageItem.duration },
              { label: "Region", value: (packageItem: DiscoveryPackage) => `${packageItem.region.charAt(0).toUpperCase()}${packageItem.region.slice(1)}` },
              { label: "Travel style", value: (packageItem: DiscoveryPackage) => packageItem.travelStyles.length ? packageItem.travelStyles.map((style) => `${style.charAt(0).toUpperCase()}${style.slice(1)}`).join(", ") : "Not specified" },
              { label: "Travel pace", value: (packageItem: DiscoveryPackage) => packageItem.pace ?? "To be confirmed" },
              { label: "Best for", value: (packageItem: DiscoveryPackage) => packageItem.bestFor ?? "Not specified" },
              { label: "Stay", value: (packageItem: DiscoveryPackage) => includedDetails(packageItem, /hotel|accommodation|stay/i, "Stay details to confirm") },
              { label: "Meals", value: (packageItem: DiscoveryPackage) => includedDetails(packageItem, /breakfast|dinner|lunch|meal/i, "Meal plan to confirm") },
              {
                label: "Transport",
                value: (packageItem: DiscoveryPackage) => [...packageItem.transport, ...packageItem.includes.filter((item) => /transport|vehicle|driver|bus|flight/i.test(item))].join(", ") || "Transport details to confirm",
              },
              {
                label: "Highlights",
                value: (packageItem: DiscoveryPackage) => packageItem.routeHighlights.join(", ") || "Not specified",
              },
              {
                label: "Schedule note / dates",
                value: (packageItem: DiscoveryPackage) => packageItem.departures.length
                  ? packageItem.departures.map((departure) => departure.label).join("; ")
                  : packageItem.scheduleNote ?? "Dates available on request",
              },
            ].map(({ label, value }) => (
              <tr key={label}>
                <td className="sticky left-0 z-10 min-w-[145px] bg-white pr-3 align-top sm:min-w-[180px] sm:pr-4">
                  <div className="h-full min-h-12 rounded-xl bg-stone-950 px-3 py-3 text-xs font-bold uppercase tracking-[0.1em] text-[#ffdc58]">{label}</div>
                </td>
                {comparePackages.map((packageItem) => (
                  <td key={`${packageItem.id}-${label}`} className="pr-4 align-top">
                    <div className="min-h-12 rounded-xl border border-stone-200 bg-[linear-gradient(135deg,_#fff,_#f8f6ef)] p-3 text-sm leading-6 text-stone-700 shadow-[0_3px_10px_rgba(30,25,10,0.03)] even:bg-[#f8f6ef]">
                      {String(value(packageItem))}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
            {comparedStops.map((stop) => (
              <tr key={`stop-${stop}`}>
                <td className="sticky left-0 z-10 min-w-[145px] bg-white pr-3 align-top sm:min-w-[180px] sm:pr-4">
                  <div className="rounded-xl bg-[#f3ecd5] px-3 py-3 text-sm font-bold text-stone-900">{stop}</div>
                </td>
                {comparePackages.map((packageItem) => {
                  const includesStop = packageItem.routeStops.includes(stop);
                  return (
                    <td key={`${packageItem.id}-stop-${stop}`} className="pr-4 align-top">
                      <div className={`rounded-xl border p-3 text-sm font-semibold ${includesStop ? "border-[#e1ca72] bg-[#fff5cf] text-[#624b00]" : "border-stone-200 bg-stone-50 text-stone-400"}`}>
                        {includesStop ? "✓ On this route" : "— Not on route"}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="mt-8 rounded-[1.6rem] bg-[linear-gradient(145deg,_#f5f0df,_#fffdf7)] p-5 sm:p-6" aria-labelledby="fit-explanation-heading">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#806000]">The short version</p>
        <h2 id="fit-explanation-heading" className="mt-2 font-serif text-3xl text-stone-950">What’s different?</h2>
        {comparePackages.length > 1 ? (
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {comparePackages.map((packageItem, index) => {
              const previousPackage = comparePackages[index - 1];
              const addedStops = previousPackage
                ? packageItem.routeStops.filter((stop) => !previousPackage.routeStops.includes(stop))
                : packageItem.routeStops;
              const removedStops = previousPackage
                ? previousPackage.routeStops.filter((stop) => !packageItem.routeStops.includes(stop))
                : [];
              const durationDifference = previousPackage
                ? normalizeTrip(packageItem).durationDays - normalizeTrip(previousPackage).durationDays
                : 0;
              const priceDifference = previousPackage && packageItem.pricePerPerson !== undefined && previousPackage.pricePerPerson !== undefined
                ? packageItem.pricePerPerson - previousPackage.pricePerPerson
                : undefined;
              const hasUnlistedPrice = packageItem.pricePerPerson === undefined ||
                (previousPackage !== undefined && previousPackage.pricePerPerson === undefined);
              const differences = [
                addedStops.length ? `adds ${addedStops.join(", ")}` : null,
                removedStops.length ? `does not include ${removedStops.join(", ")}` : null,
                durationDifference > 0 ? `adds ${durationDifference} ${durationDifference === 1 ? "day" : "days"}` : null,
                durationDifference < 0 ? `takes ${Math.abs(durationDifference)} fewer days` : null,
                priceDifference !== undefined && priceDifference > 0 ? `has a listed per-person price ${formatCurrency(priceDifference)} higher` : null,
                priceDifference !== undefined && priceDifference < 0 ? `has a listed per-person price ${formatCurrency(Math.abs(priceDifference))} lower` : null,
                hasUnlistedPrice ? "has pricing to confirm" : null,
              ].filter((difference): difference is string => Boolean(difference));
              const description = previousPackage
                ? `Compared with ${previousPackage.title}, this journey ${differences.join(" and ") || "has no differences in compared stop coverage, duration, or listed price"}.`
                : `Trip 1 sets the reference: ${packageItem.duration.toLowerCase()} across ${packageItem.routeStops.join(" and ")}, priced ${listedPrice(packageItem)}.`;
              return (
                <article key={`${packageItem.id}-fit`} className="rounded-[1.35rem] border border-[#e6d8aa] bg-white p-5 shadow-[0_10px_25px_rgba(50,40,10,0.06)]">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#806000]">Journey {index + 1}</p>
                  <h3 className="mt-1 font-serif text-lg text-stone-950">{packageItem.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link href={journeyHref(packageItem)} className="inline-flex min-h-10 items-center justify-center rounded-full bg-stone-950 px-4 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:bg-[#343126] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b38a00]">{packageItem.requestOnly ? "Request details" : "View journey"}</Link>
                    <Link href="/make-my-trip" className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#e3d7b4] bg-[#fffaf0] px-4 text-xs font-bold uppercase tracking-[0.1em] text-stone-900 transition hover:border-[#c89a00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b38a00]">Customize trip</Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="mt-3 text-sm leading-6 text-stone-600">Add at least one more journey to compare its route stops, days, and starting price.</p>
        )}
      </section>
      </section>
    </div>
  );
}

export function WishlistTripsClient() {
  const router = useRouter();
  const wishlistIds = useStoredIds(STORAGE_KEYS.wishlist);
  const compareIds = useStoredIds(STORAGE_KEYS.compare, MAX_COMPARE_ITEMS);

  const wishlistPackages = wishlistIds
    .map((id) => packageList.find((packageItem) => packageItem.id === id))
    .filter((packageItem): packageItem is DiscoveryPackage => Boolean(packageItem));
  const relatedTrips = useMemo(() => {
    const recommendations = getSimilarTripsForSavedTrips(wishlistPackages, packageList);

    return recommendations.flatMap((recommendation) => {
      const packageItem = packageList.find((candidate) => candidate.id === recommendation.trip.id);
      return packageItem ? [{ packageItem, savedTripTitle: recommendation.relatedTo, reasons: recommendation.reasons }] : [];
    });
  }, [wishlistIds]);

  const removeFromWishlist = (id: string) => {
    writeStorageIds(STORAGE_KEYS.wishlist, wishlistIds.filter((value) => value !== id));
  };

  const toggleWishlist = (id: string) => {
    writeStorageIds(
      STORAGE_KEYS.wishlist,
      wishlistIds.includes(id) ? wishlistIds.filter((value) => value !== id) : [...wishlistIds, id],
    );
  };

  const toggleCompare = (id: string) => {
    if (compareIds.includes(id)) {
      writeStorageIds(STORAGE_KEYS.compare, compareIds.filter((value) => value !== id));
      return;
    }
    if (compareIds.length >= MAX_COMPARE_ITEMS) return;
    writeStorageIds(STORAGE_KEYS.compare, [...compareIds, id]);
  };

  const compareShortlist = () => {
    const selectedIds = wishlistPackages.slice(0, MAX_COMPARE_ITEMS).map((packageItem) => packageItem.id);
    writeStorageIds(STORAGE_KEYS.compare, selectedIds);
    router.push("/compare");
  };

  if (wishlistPackages.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-stone-300 bg-[radial-gradient(circle_at_top,_rgba(252,192,0,0.08),_rgba(255,255,255,1)_62%)] p-8 text-center shadow-[0_20px_50px_rgba(55,55,48,0.04)]">
        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#8b6b00]">Saved</p>
        <p className="mt-3 text-2xl font-semibold text-stone-950">Your saved trips are empty.</p>
        <p className="mt-3 text-sm text-stone-600">Save routes from the catalog to build a polished shortlist for your next Pakistan adventure.</p>
        <Link href="/tours" className="mt-6 inline-flex items-center justify-center rounded-full bg-[#0b0b0b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-black">
          Discover routes
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b6b00]">Your shortlist</p>
          <h1 className="mt-2 font-serif text-3xl text-stone-950">My Shortlist</h1>
          <p className="mt-1 text-sm text-stone-600">{wishlistPackages.length} saved {wishlistPackages.length === 1 ? "journey" : "journeys"}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={compareShortlist} className="inline-flex items-center justify-center rounded-full bg-[#0b0b0b] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b6b00]">
            Compare up to {MAX_COMPARE_ITEMS}
          </button>
          <Link href="/make-my-trip" className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-stone-900 transition hover:border-[#fcc000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b6b00]">
            Build my trip
          </Link>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {wishlistPackages.map((packageItem) => (
          <article key={packageItem.id} className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-[0_15px_32px_rgba(55,55,48,0.05)]">
          <div className="relative aspect-[4/3]">
            <Image
              src={packageItem.image ?? "/images/package-cards/images__destinations__swat-hd.webp"}
              alt={packageItem.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => removeFromWishlist(packageItem.id)}
              className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/90 text-stone-700 shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b6b00]"
              aria-label={`Remove ${packageItem.title} from saved list`}
            >
              ✕
            </button>
          </div>
          <div className="p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a7600]">{packageItem.region}</p>
            <h2 className="mt-2 font-serif text-2xl text-stone-950">{packageItem.title}</h2>
            <p className="mt-3 text-sm leading-6 text-stone-600">{packageItem.summary}</p>
            <div className="mt-4 flex items-center justify-between border-t border-stone-200 pt-4">
              <span className="text-lg font-semibold text-[#9a7600]">{listedPrice(packageItem)}</span>
              <Link href={journeyHref(packageItem)} className="text-xs font-bold uppercase tracking-[0.12em] text-stone-950 transition hover:text-[#9a7600] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b6b00]">
                {packageItem.requestOnly ? "Request details ↗" : "View route ↗"}
              </Link>
            </div>
          </div>
          </article>
        ))}
      </div>

      {relatedTrips.length ? (
        <section className="mt-12 border-t border-stone-200 pt-8" aria-labelledby="related-journeys-heading">
          <div className="mb-5 max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b6b00]">Continue exploring</p>
            <h2 id="related-journeys-heading" className="mt-2 font-serif text-3xl text-stone-950">Similar journeys</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">Related to your saved trips, using shared route details.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {relatedTrips.map(({ packageItem, savedTripTitle, reasons }) => (
              <RouteCard
                key={packageItem.id}
                packageItem={packageItem}
                isWishlistEnabled={wishlistIds.includes(packageItem.id)}
                isCompareEnabled={compareIds.includes(packageItem.id)}
                onToggleWishlist={toggleWishlist}
                onToggleCompare={toggleCompare}
                relatedContext={{ savedTripTitle, reasons }}
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
