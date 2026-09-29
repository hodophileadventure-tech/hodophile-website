"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, useSyncExternalStore } from "react";

import { tourPackages, type TravelStyle, type TourDeparture } from "@/lib/data/tour-packages";

type RegionFilter = "all" | "northern" | "southern";
type DurationFilter = "all" | "weekend" | "4-7" | "8-12" | "12-plus";
type SortOption = "recommended" | "price-low" | "duration-short";

type DiscoveryPackage = {
  id: string;
  title: string;
  duration: string;
  pricePerPerson: number;
  departure?: string;
  departureAvailability?: "confirmed" | "on-request";
  region: Exclude<RegionFilter, "all">;
  notes: string[];
  destinationSlugs: string[];
  routeStops: string[];
  routeHighlights: string[];
  bestFor: string;
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

function getPackageRegion(tourPackage: (typeof tourPackages)[number]): Exclude<RegionFilter, "all"> {
  if (tourPackage.region) {
    return tourPackage.region;
  }

  const destinationSlugs = tourPackage.destinationSlugs ?? [];
  return destinationSlugs.some((slug) => ["ormara", "gorakh", "moola", "ranikot", "charo", "bhit", "quetta", "ziyarat"].includes(slug))
    ? "southern"
    : "northern";
}

function getPackageImage(title: string, index = 0) {
  const skarduVariants = [
    "/images/destinations/skardu-1080x1920.webp",
    "/images/destinations/skardu-unsplash.webp",
    "/images/destinations/featured-skardu-basho.webp",
    "/images/destinations/editorial/editorial-8.webp",
  ];

  const hunzaVariants = [
    "/images/destinations/hunza-custom.webp",
    "/images/destinations/hunza-unsplash.webp",
    "/images/destinations/fairy-meadows-unsplash.webp",
  ];

  const kashmirVariants = [
    "/images/destinations/kashmir.webp",
    "/images/destinations/fairy-meadows-unsplash.webp",
  ];

  const naranVariants = [
    "/images/destinations/naran-hd.webp",
    "/images/destinations/naran-unsplash.webp",
  ];

  const coastalVariants = [
    "/images/destinations/swat-hd.webp",
    "/images/destinations/swat-unsplash.webp",
  ];

  if (/skardu|basho|manthoka|khaplu|astor/i.test(title)) return skarduVariants[index % skarduVariants.length];
  if (/hunza|naltar|gilgit|fairy/i.test(title)) return hunzaVariants[index % hunzaVariants.length];
  if (/kashmir|taobat|arang kel/i.test(title)) return kashmirVariants[index % kashmirVariants.length];
  if (/naran|shogran|kaghan/i.test(title)) return naranVariants[index % naranVariants.length];
  if (/ormara|charna|bhit|moola|gorakh|quetta|ziyarat/i.test(title)) return coastalVariants[index % coastalVariants.length];
  return coastalVariants[index % coastalVariants.length];
}

function buildPackageSummary(tourPackage: (typeof tourPackages)[number]) {
  const title = tourPackage.title.toLowerCase();

  if (title.includes("skardu") && title.includes("khaplu")) {
    return "A longer Baltistan circuit pairing Khaplu heritage with Deosai's high plains and Basho's forested valleys.";
  }
  if (title.includes("skardu") && title.includes("basho")) {
    return "Skardu's alpine lakes meet Basho's quieter forest scenery, with Deosai added for high-altitude views.";
  }
  if (title.includes("skardu") && title.includes("hunza")) {
    return "A flight-linked northbound journey connecting Hunza's historic villages with Skardu's broad mountain landscapes.";
  }
  if (title.includes("skardu") && title.includes("deosai")) {
    return "Base in Skardu and cross the Deosai plateau for wide-open highland scenery and a focused short escape.";
  }
  if (title.includes("hunza")) {
    return "Historic Hunza villages and Naltar's glacier-fed lakes shape a slower northbound journey with time for scenic stops.";
  }
  if (title.includes("kashmir")) {
    return "Follow the Neelum Valley through riverside settlements toward Arang Kel and Taobat, subject to current access.";
  }
  if (title.includes("swat") && title.includes("shogran")) {
    return "Join Swat's river valleys with Shogran's forested plateau in a multi-stop trip built around varied scenery.";
  }
  if (title.includes("swat")) {
    return "Explore Swat and Kalam's river valleys, with local excursions paced around road conditions and season.";
  }
  if (title.includes("ormara")) {
    return "Spend the night on the Makran coast with a beachside camp and a weekend rhythm away from the city.";
  }
  if (title.includes("gorakh")) {
    return "Trade the coast for Sindh's highlands on a short Gorakh Hill escape with open plateau viewpoints.";
  }
  if (title.includes("moola")) {
    return "Follow the seasonal canyon route into Moola Chotok, with access and water conditions confirmed before travel.";
  }
  if (title.includes("naran")) {
    return "Connect Naran's lakes and mountain roads with the wider northern itinerary, subject to seasonal pass access.";
  }

  return tourPackage.notes?.[0] ?? "Flexible domestic progress with a clear route, premium guidance, and smooth travel planning.";
}

const discoveryImagePool = [
  "/images/destinations/skardu-1080x1920.webp",
  "/images/destinations/hunza-custom.webp",
  "/images/destinations/kashmir.webp",
  "/images/destinations/naran-hd.webp",
  "/images/destinations/swat-hd.webp",
  "/images/destinations/hunza-unsplash.webp",
  "/images/destinations/skardu-unsplash.webp",
  "/images/destinations/naran-unsplash.webp",
  "/images/destinations/swat-unsplash.webp",
  "/images/destinations/fairy-meadows-unsplash.webp",
  "/images/destinations/featured-skardu-basho.webp",
  "/images/editorial/editorial-8.webp",
];

const routeImageById: Record<string, string> = {
  "skardu-deosai-air-3-days": "/images/tour-packages/03.webp",
  "skardu-deosai-basho-air-5-days": "/images/tour-packages/14.webp",
  "skardu-khaplu-deosai-basho-air-7-days": "/images/tour-packages/21.webp",
  "skardu-hunza-air-7-days": "/images/destinations/featured-skardu-hunza.webp",
  "ormara-beach-camping": "/images/tour-packages/25.webp",
  "swat-kalam-shogran-10-days": "/images/tour-packages/02.webp",
  "kashmir-shogran-9-days": "/images/tour-packages/06.webp",
  "hunza-skardu-naran-12-days": "/images/tour-packages/05.webp",
  "skardu-deosai-naran-10-days": "/images/featured-tours/10days-skardu-deosai.jpg.webp",
};

const usedPackageImages = new Set<string>();

const packageList: DiscoveryPackage[] = tourPackages.map((tourPackage, index) => {
  const preferredImage = routeImageById[tourPackage.id] ?? tourPackage.image ?? getPackageImage(tourPackage.title, index);
  const image = usedPackageImages.has(preferredImage)
    ? discoveryImagePool.find((candidate) => !usedPackageImages.has(candidate)) ?? preferredImage
    : preferredImage;
  usedPackageImages.add(image);

  return {
    id: tourPackage.id,
    title: tourPackage.title,
    duration: tourPackage.duration,
    pricePerPerson: tourPackage.pricePerPerson,
    departure: tourPackage.departure,
    departureAvailability: tourPackage.departureAvailability,
    region: getPackageRegion(tourPackage),
    notes: tourPackage.notes ?? [],
    destinationSlugs: tourPackage.destinationSlugs ?? [],
    routeStops: tourPackage.routeStops ?? (tourPackage.destinationSlugs ?? []).map(formatDestination),
    routeHighlights: tourPackage.routeHighlights ?? [],
    bestFor: tourPackage.bestFor ?? "Custom date journey",
    pace: tourPackage.pace,
    travelStyles: tourPackage.travelStyles ?? ["family", "tailored"],
    departures: tourPackage.departures ?? [],
    transport: tourPackage.transport ?? [],
    includes: tourPackage.includes ?? [],
    image,
    summary: buildPackageSummary(tourPackage),
  };
});

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

function getMonthFit(packageItem: DiscoveryPackage, month: string) {
  if (!month) return "Choose a month to check listed departure dates.";
  if (packageItem.departureAvailability !== "confirmed" && packageItem.departures.length === 0) {
    return "Seasonal availability is not specified; request dates to confirm.";
  }

  const departureText = (packageItem.departures.length
    ? packageItem.departures.map((departure) => departure.label)
    : [packageItem.departure ?? ""])
    .join(" ")
    .toLowerCase();
  const monthPattern = new RegExp(`\\b(${departureMonths.join("|")})\\b`, "g");
  const monthIndexes = [...departureText.matchAll(monthPattern)]
    .map((match) => departureMonths.indexOf(match[1]));
  const targetMonth = departureMonths.indexOf(month);

  if (!monthIndexes.length) return "The listed departure has no confirmed month; request dates to confirm.";
  if (monthIndexes.length === 1 && monthIndexes[0] === targetMonth) {
    return `A confirmed departure is listed in ${month}.`;
  }

  const firstMonth = monthIndexes[0];
  const lastMonth = monthIndexes[monthIndexes.length - 1];
  const isInWindow = firstMonth <= lastMonth
    ? targetMonth >= firstMonth && targetMonth <= lastMonth
    : targetMonth >= firstMonth || targetMonth <= lastMonth;

  return isInWindow
    ? `A confirmed departure window includes ${month}.`
    : `No confirmed departure is listed in ${month}; request dates to confirm.`;
}

function getSimilarTrips(packageItem: DiscoveryPackage) {
  return packageList
    .filter((candidate) => candidate.id !== packageItem.id)
    .map((candidate) => {
      const sharedDestinations = candidate.destinationSlugs.filter((slug) => packageItem.destinationSlugs.includes(slug));
      const sharedStyles = candidate.travelStyles.filter(
        (travelStyle) => travelStyle !== "tailored" && packageItem.travelStyles.includes(travelStyle),
      );
      const durationDifference = Math.abs(getDurationDays(candidate) - getDurationDays(packageItem));
      const score = sharedDestinations.length * 3 + sharedStyles.length + (durationDifference <= 2 ? 1 : 0);
      const reasons = [
        ...sharedDestinations.map(formatDestination),
        ...sharedStyles.slice(0, 1).map((travelStyle) => `${travelStyle} style`),
      ];

      return { packageItem: candidate, score, reasons };
    })
    .filter((match) => match.score > 0)
    .sort((first, second) => second.score - first.score)
    .slice(0, 2);
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

function RouteCard({
  packageItem,
  isWishlistEnabled,
  isCompareEnabled,
  onToggleWishlist,
  onToggleCompare,
}: {
  packageItem: DiscoveryPackage;
  isWishlistEnabled: boolean;
  isCompareEnabled: boolean;
  onToggleWishlist: (id: string) => void;
  onToggleCompare: (id: string) => void;
}) {
  const priceText = formatCurrency(packageItem.pricePerPerson);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-[0_12px_30px_rgba(55,55,48,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#fcc000]/60 hover:shadow-[0_20px_40px_rgba(55,55,48,0.12)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
        <Image
          src={packageItem.image ?? "/images/destinations/swat-hd.webp"}
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

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-stone-500">From</p>
            <p className="mt-1 text-xl font-semibold text-[#9a7600]">{priceText}</p>
          </div>
          <span className="max-w-[48%] text-right text-xs font-semibold leading-5 text-stone-700">{packageItem.bestFor}</span>
        </div>

        <div className="mt-4 flex items-center gap-2 border-t border-stone-200 pt-4">
          <Link href={`/packages/${packageItem.id}`} className="inline-flex min-h-10 flex-1 items-center justify-center rounded-full bg-[#0b0b0b] px-4 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#282828]">
            View journey
          </Link>
          <button type="button" onClick={() => onToggleWishlist(packageItem.id)} title={isWishlistEnabled ? "Remove from saved journeys" : "Save journey"} className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-base transition ${isWishlistEnabled ? "border-[#1b7a4b] bg-[#1b7a4b] text-white" : "border-stone-300 bg-white text-stone-700 hover:border-[#1b7a4b] hover:text-[#1b7a4b]"}`} aria-label={isWishlistEnabled ? `Remove ${packageItem.title} from wishlist` : `Save ${packageItem.title} to wishlist`}>
            ♥
          </button>
          <button type="button" onClick={() => onToggleCompare(packageItem.id)} title={isCompareEnabled ? "Remove from comparison" : "Add to comparison"} className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-base transition ${isCompareEnabled ? "border-[#9a7600] bg-[#fcc000] text-[#0b0b0b]" : "border-stone-300 bg-white text-stone-700 hover:border-[#9a7600] hover:text-[#9a7600]"}`} aria-label={isCompareEnabled ? `Remove ${packageItem.title} from compare` : `Add ${packageItem.title} to compare`}>
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
      const matchesMinimum = minimumBudget === "" || packageItem.pricePerPerson >= Number(minimumBudget);
      const matchesMaximum = maximumBudget === "" || packageItem.pricePerPerson <= Number(maximumBudget);

      return matchesQuery && matchesStyle && matchesDuration && matchesRegion && matchesMinimum && matchesMaximum;
    });
    if (sort === "price-low") {
      return filtered.sort((first, second) => first.pricePerPerson - second.pricePerPerson);
    }
    if (sort === "duration-short") {
      return filtered.sort((first, second) => getDurationDays(first) - getDurationDays(second));
    }
    return filtered;
  }, [duration, maximumBudget, minimumBudget, region, search, sort, style]);

  const fitCriteriaCount = [fitStyle !== "all", fitRegion !== "all", fitDuration !== "all", fitBudget !== "", fitMonth !== ""]
    .filter(Boolean).length;
  const fitRecommendations = useMemo(() => {
    const matchesDuration = (packageItem: DiscoveryPackage) => {
      const packageDuration = getDurationDays(packageItem);
      if (fitDuration === "weekend") return packageDuration <= 3;
      if (fitDuration === "4-7") return packageDuration >= 4 && packageDuration <= 7;
      if (fitDuration === "8-12") return packageDuration >= 8 && packageDuration <= 12;
      if (fitDuration === "12-plus") return packageDuration > 12;
      return true;
    };

    return packageList
      .map((packageItem, index) => {
        const monthText = getMonthFit(packageItem, fitMonth);
        const monthMatch = fitMonth && /confirmed departure (is listed|window includes)/i.test(monthText);
        const reasons = [
          fitStyle !== "all" && packageItem.travelStyles.includes(fitStyle) ? `${fitStyle} travel style` : null,
          fitRegion !== "all" && packageItem.region === fitRegion ? `${fitRegion} Pakistan` : null,
          fitDuration !== "all" && matchesDuration(packageItem) ? `${packageItem.duration} duration` : null,
          fitBudget !== "" && packageItem.pricePerPerson <= Number(fitBudget) ? "within your budget" : null,
          monthMatch ? `departure listed in ${fitMonth}` : null,
        ].filter((reason): reason is string => Boolean(reason));

        return { packageItem, index, reasons, monthText, monthMatch };
      })
      .sort((first, second) =>
        second.reasons.length - first.reasons.length ||
        Number(second.monthMatch) - Number(first.monthMatch) ||
        first.index - second.index,
      )
      .slice(0, 3);
  }, [fitBudget, fitDuration, fitMonth, fitRegion, fitStyle]);

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
    <section className="mt-10 overflow-hidden rounded-[2.5rem] border border-[#e8ddba] bg-[radial-gradient(circle_at_top,_rgba(252,192,0,0.12),_rgba(247,245,240,0.98)_38%,_rgba(247,245,240,1)_100%)] px-5 py-8 shadow-[0_35px_90px_rgba(55,55,48,0.08)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-stone-200 pb-7">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#8b6b00]">Curated discovery</p>
          <h2 className="mt-3 font-serif text-4xl text-stone-950">Search, compare, and shortlist your next Pakistan journey.</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-stone-600">
            Thoughtful escapes for mountain lovers, beach seekers, and travelers who want the right route without the noise.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm font-medium text-stone-700">
          <span className="rounded-full border border-[#e5d5a3] bg-[#fffdf8] px-3 py-2 shadow-[0_8px_20px_rgba(122,94,0,0.06)]">{filteredPackages.length} {filteredPackages.length === 1 ? "journey" : "journeys"}</span>
          <Link href="/wishlist" className="rounded-full border border-stone-200 bg-white px-3 py-2 transition hover:border-[#1f6b4a] hover:text-[#1f6b4a]">
            Saved trips ({wishlistIds.length})
          </Link>
        </div>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px_220px]">
        <label className="rounded-[1.4rem] border border-stone-200 bg-white p-3 shadow-[0_12px_24px_rgba(55,55,48,0.04)]">
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Where do you want to go?</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search Pakistan destinations"
            className="w-full border-0 bg-transparent px-1 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
          />
        </label>

        <label className="rounded-[1.4rem] border border-stone-200 bg-white p-3 shadow-[0_12px_24px_rgba(55,55,48,0.04)]">
          <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Duration</span>
          <select
            value={duration}
            onChange={(event) => setDuration(event.target.value as DurationFilter)}
            className="w-full border-0 bg-transparent px-1 py-2 text-sm text-stone-900 focus:outline-none"
          >
            <option value="all">Any duration</option>
            <option value="weekend">Weekend</option>
            <option value="4-7">4–7 days</option>
            <option value="8-12">8–12 days</option>
            <option value="12-plus">12+ days</option>
          </select>
        </label>

        <label className="rounded-[1.4rem] border border-stone-200 bg-white p-3 shadow-[0_12px_24px_rgba(55,55,48,0.04)]">
          <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Sort journeys</span>
          <select value={sort} onChange={(event) => setSort(event.target.value as SortOption)} className="w-full border-0 bg-transparent px-1 py-2 text-sm text-stone-900 focus:outline-none">
            <option value="recommended">Catalog order</option>
            <option value="price-low">Price: low to high</option>
            <option value="duration-short">Shortest first</option>
          </select>
        </label>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr_1fr]">
        <div>
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Travel style</span>
          <div className="flex flex-wrap gap-2">
            {([
              ["all", "All styles"],
              ["family", "Family"],
              ["couples", "Couples"],
              ["adventure", "Adventure"],
              ["tailored", "Tailored"],
            ] as const).map(([value, label]) => (
              <button key={value} type="button" onClick={() => setStyle(value)} aria-pressed={style === value} className={`rounded-full px-3 py-2 text-xs font-semibold transition ${style === value ? "bg-[#0b0b0b] text-white" : "border border-stone-200 bg-white text-stone-700 hover:border-[#fcc000]"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Region</span>
          <div className="flex flex-wrap gap-2">
            {(["all", "northern", "southern"] as const).map((option) => (
              <button key={option} type="button" onClick={() => setRegion(option)} aria-pressed={region === option} className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition ${region === option ? "bg-[#0b0b0b] text-white" : "border border-stone-200 bg-white text-stone-700 hover:border-stone-300"}`}>
                {option === "all" ? "All" : option}
              </button>
            ))}
          </div>
        </div>

        <fieldset>
          <legend className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Budget · PKR</legend>
          <div className="grid grid-cols-2 gap-2">
            <label className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-stone-500">
              Min
              <input type="number" min="0" step="5000" value={minimumBudget} onChange={(event) => setMinimumBudget(event.target.value)} placeholder="Any" className="mt-1 block w-full bg-transparent text-sm text-stone-900 outline-none placeholder:text-stone-400" />
            </label>
            <label className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-stone-500">
              Max
              <input type="number" min="0" step="5000" value={maximumBudget} onChange={(event) => setMaximumBudget(event.target.value)} placeholder="Any" className="mt-1 block w-full bg-transparent text-sm text-stone-900 outline-none placeholder:text-stone-400" />
            </label>
          </div>
        </fieldset>
      </div>

      <section className="mt-7 border-y border-stone-300 py-6" aria-labelledby="trip-fit-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8b6b00]">Trip intelligence</p>
            <h3 id="trip-fit-heading" className="mt-1 font-serif text-2xl text-stone-950">Find journeys that fit your plans</h3>
          </div>
          <span className="text-xs text-stone-600">Recommendations use listed route, price, and departure data.</span>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <label className="text-xs font-semibold text-stone-600">
            Travel style
            <select value={fitStyle} onChange={(event) => setFitStyle(event.target.value as TravelStyle | "all")} className="mt-1 block min-h-11 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900">
              <option value="all">Any style</option>
              <option value="family">Family</option>
              <option value="couples">Couples</option>
              <option value="adventure">Adventure</option>
              <option value="tailored">Tailored</option>
            </select>
          </label>
          <label className="text-xs font-semibold text-stone-600">
            Region
            <select value={fitRegion} onChange={(event) => setFitRegion(event.target.value as RegionFilter)} className="mt-1 block min-h-11 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900">
              <option value="all">Either region</option>
              <option value="northern">Northern Pakistan</option>
              <option value="southern">Southern Pakistan</option>
            </select>
          </label>
          <label className="text-xs font-semibold text-stone-600">
            Time available
            <select value={fitDuration} onChange={(event) => setFitDuration(event.target.value as DurationFilter)} className="mt-1 block min-h-11 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900">
              <option value="all">Any duration</option>
              <option value="weekend">Up to 3 days</option>
              <option value="4-7">4–7 days</option>
              <option value="8-12">8–12 days</option>
              <option value="12-plus">More than 12 days</option>
            </select>
          </label>
          <label className="text-xs font-semibold text-stone-600">
            Budget per person
            <input type="number" min="0" step="5000" value={fitBudget} onChange={(event) => setFitBudget(event.target.value)} placeholder="No limit" className="mt-1 block min-h-11 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 placeholder:text-stone-400" />
          </label>
          <label className="text-xs font-semibold text-stone-600">
            Season match
            <select value={fitMonth} onChange={(event) => setFitMonth(event.target.value)} className="mt-1 block min-h-11 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900">
              <option value="">Not selected</option>
              {departureMonths.map((month) => <option key={month} value={month}>{month.charAt(0).toUpperCase() + month.slice(1)}</option>)}
            </select>
          </label>
        </div>

        {fitCriteriaCount ? (
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {fitRecommendations.map(({ packageItem, reasons, monthText }) => (
              <article key={packageItem.id} className="flex flex-col border-l-2 border-[#fcc000] bg-white py-3 pl-4 pr-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8b6b00]">Fits {reasons.length} of {fitCriteriaCount} preferences</p>
                <h4 className="mt-1 font-semibold text-stone-950">{packageItem.title}</h4>
                <p className="mt-1 text-xs font-semibold text-stone-800">
                  From {formatCurrency(packageItem.pricePerPerson)} per person
                  {fitBudget && packageItem.pricePerPerson > Number(fitBudget) ? ` · ${formatCurrency(packageItem.pricePerPerson - Number(fitBudget))} above budget` : ""}
                </p>
                <p className="mt-1 text-xs leading-5 text-stone-600">{reasons.length ? reasons.join(" · ") : "No selected preferences match this route exactly."}</p>
                {fitMonth ? <p className="mt-2 text-xs leading-5 text-stone-600">{monthText}</p> : null}
                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 text-xs font-semibold">
                  <Link href={`/packages/${packageItem.id}`} className="text-stone-950 underline decoration-[#fcc000] decoration-2 underline-offset-4">View journey</Link>
                  <Link href={`/make-my-trip?destination=${encodeURIComponent(packageItem.destinationSlugs[0] ?? "")}&inspiration=${encodeURIComponent(packageItem.title)}`} className="text-[#735900] underline underline-offset-4">Plan this route</Link>
                  <button type="button" onClick={() => toggleWishlist(packageItem.id)} className="text-stone-600 underline underline-offset-4">{wishlistIds.includes(packageItem.id) ? "Saved" : "Save"}</button>
                  <button type="button" onClick={() => toggleCompare(packageItem.id)} disabled={!compareIds.includes(packageItem.id) && compareIds.length >= MAX_COMPARE_ITEMS} className="text-stone-600 underline underline-offset-4 disabled:cursor-not-allowed disabled:opacity-50">{compareIds.includes(packageItem.id) ? "In compare" : "Compare"}</button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-stone-600">Choose at least one preference to see ranked trips, listed date matches, and similar routes.</p>
        )}

        {fitCriteriaCount && fitRecommendations[0] ? (
          <div className="mt-5 border-t border-stone-200 pt-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Similar trips to {fitRecommendations[0].packageItem.title}</p>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
              {getSimilarTrips(fitRecommendations[0].packageItem).map(({ packageItem, reasons }) => (
                <Link key={packageItem.id} href={`/packages/${packageItem.id}`} className="text-sm font-semibold text-stone-800 underline decoration-stone-300 underline-offset-4 hover:decoration-[#fcc000]">
                  {packageItem.title}<span className="ml-2 text-xs font-normal text-stone-500">{reasons.join(" · ")}</span>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <div className="mt-7 rounded-[1.6rem] border border-stone-200 bg-white/90 p-4 shadow-[0_18px_40px_rgba(55,55,48,0.04)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8b6b00]">Quick compare</p>
            <h3 className="mt-1 text-lg font-semibold text-stone-950">Select up to four journeys to compare</h3>
          </div>
          <button
            type="button"
            onClick={() => setQuickCompareSelection(["", "", "", ""])}
            className="text-xs font-semibold uppercase tracking-[0.13em] text-stone-600 transition hover:text-[#8b6b00]"
          >
            Clear
          </button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {quickCompareSelection.map((selectedId, index) => (
            <label key={`quick-compare-${index}`} className="rounded-2xl border border-stone-200 bg-stone-50 p-3">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-stone-500">Journey {index + 1}</span>
              <select
                value={selectedId}
                onChange={(event) => {
                  const nextSelection = [...quickCompareSelection];
                  nextSelection[index] = event.target.value;
                  setQuickCompareSelection(nextSelection);
                }}
                className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#fcc000]"
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
            className="inline-flex items-center justify-center rounded-full bg-[#0b0b0b] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-black"
          >
            Compare selected
          </button>
          <Link href="/compare" className="text-sm font-semibold text-stone-600 transition hover:text-[#8b6b00]">
            Open compare page
          </Link>
        </div>
      </div>

      {comparePackages.length > 0 && (
        <div className="mt-7 rounded-[1.6rem] border border-[#e4c976] bg-[linear-gradient(135deg,_rgba(255,248,223,0.96),_rgba(255,255,255,0.92))] p-4 shadow-[0_18px_40px_rgba(122,94,0,0.06)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b6b00]">Comparison tray</p>
              <h3 className="mt-1 text-lg font-semibold text-stone-950">Selected for side-by-side comparison</h3>
              <p className="mt-1 text-xs text-stone-600">Up to four journeys. Remove one to make room for another.</p>
            </div>
            <Link href="/compare" className="inline-flex items-center justify-center rounded-full bg-[#0b0b0b] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-black">
              View compare
            </Link>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {comparePackages.map((packageItem) => (
              <div key={packageItem.id} className="flex items-center justify-between rounded-2xl border border-[#e7cf74] bg-white/80 p-3">
                <div>
                  <p className="text-sm font-semibold text-stone-900">{packageItem.title}</p>
                  <p className="mt-1 text-xs text-stone-600">{formatCurrency(packageItem.pricePerPerson)}</p>
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
            <h3 className="text-2xl font-semibold text-stone-950">Journey results</h3>
            <p className="mt-1 text-sm text-stone-600">{filteredPackages.length} {filteredPackages.length === 1 ? "journey" : "journeys"} found</p>
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
              className="text-sm font-semibold text-stone-600 transition hover:text-[#8b6b00]"
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
    </section>
  );
}

export function CompareTripsClient() {
  const compareIds = useStoredIds(STORAGE_KEYS.compare, MAX_COMPARE_ITEMS);

  const comparePackages = compareIds
    .map((id) => packageList.find((packageItem) => packageItem.id === id))
    .filter((packageItem): packageItem is DiscoveryPackage => Boolean(packageItem));
  const comparedStops = [...new Set(comparePackages.flatMap((packageItem) => packageItem.routeStops))];

  const removeComparedPackage = (id: string) => {
    writeStorageIds(STORAGE_KEYS.compare, compareIds.filter((value) => value !== id));
  };

  if (comparePackages.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-stone-300 bg-[radial-gradient(circle_at_top,_rgba(252,192,0,0.12),_rgba(255,255,255,1)_55%)] p-8 text-center shadow-[0_20px_50px_rgba(55,55,48,0.06)]">
        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#8b6b00]">Compare</p>
        <p className="mt-3 text-2xl font-semibold text-stone-950">No journeys selected yet.</p>
        <p className="mt-3 text-sm text-stone-600">Choose up to four trips to compare their stops, time away, starting price, and travel style side by side.</p>
        <Link href="/tours" className="mt-6 inline-flex items-center justify-center rounded-full bg-[#0b0b0b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-black">
          Browse catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-stone-200 bg-[linear-gradient(180deg,_rgba(255,255,255,1),_rgba(248,244,236,1))] p-5 shadow-[0_20px_50px_rgba(55,55,48,0.06)] md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8b6b00]">Compare</p>
          <h1 className="mt-3 font-serif text-4xl text-stone-950">Compare journeys</h1>
          <p className="mt-2 text-sm text-stone-600">Compare {comparePackages.length} selected {comparePackages.length === 1 ? "journey" : "journeys"} on the details that shape your trip.</p>
        </div>
        <Link href="/tours" className="text-sm font-semibold text-stone-600 transition hover:text-[#8b6b00]">
          Add more journeys
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-3 text-left">
          <thead>
            <tr>
              <th className="pr-4 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Journey</th>
              {comparePackages.map((packageItem) => (
                <th key={packageItem.id} className="min-w-[220px] pr-4 align-top">
                  <div className="rounded-2xl border border-stone-200 bg-stone-50 p-3 sm:p-4">
                    <div className="relative mb-3 aspect-[16/9] overflow-hidden rounded-xl bg-stone-200">
                      <Image src={packageItem.image ?? "/images/destinations/swat-hd.webp"} alt="" fill sizes="(max-width: 768px) 70vw, 220px" className="object-cover" />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8b6b00]">Trip {comparePackages.indexOf(packageItem) + 1}</p>
                    <p className="text-sm font-semibold text-stone-900">{packageItem.title}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-stone-500">{packageItem.duration} · {packageItem.pace ?? "Pace to confirm"}</p>
                    <p className="mt-3 text-lg font-semibold text-[#9a7600]">From {formatCurrency(packageItem.pricePerPerson)}</p>
                    <button type="button" onClick={() => removeComparedPackage(packageItem.id)} className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-stone-500 transition hover:text-red-700">Remove</button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { label: "Duration", value: (packageItem: DiscoveryPackage) => packageItem.duration },
              { label: "Travel pace", value: (packageItem: DiscoveryPackage) => packageItem.pace ?? "To be confirmed" },
              { label: "Best for", value: (packageItem: DiscoveryPackage) => packageItem.bestFor },
              { label: "Stay", value: (packageItem: DiscoveryPackage) => includedDetails(packageItem, /hotel|accommodation|stay/i, "Stay details to confirm") },
              { label: "Meals", value: (packageItem: DiscoveryPackage) => includedDetails(packageItem, /breakfast|dinner|lunch|meal/i, "Meal plan to confirm") },
              {
                label: "Transport",
                value: (packageItem: DiscoveryPackage) => [...packageItem.transport, ...packageItem.includes.filter((item) => /transport|vehicle|driver|bus|flight/i.test(item))].join(", ") || "Transport details to confirm",
              },
              {
                label: "Highlights",
                value: (packageItem: DiscoveryPackage) => packageItem.routeHighlights.join(", ") || "Ask the planner to confirm trip-specific activities",
              },
              {
                label: "Departures",
                value: (packageItem: DiscoveryPackage) => packageItem.departures.length
                  ? packageItem.departures.map((departure) => departure.label).join("; ")
                  : packageItem.departureAvailability === "confirmed" ? packageItem.departure ?? "Dates to confirm" : packageItem.departure ?? "Dates available on request",
              },
            ].map(({ label, value }) => (
              <tr key={label}>
                <td className="pr-4 text-sm font-semibold text-stone-900">{label}</td>
                {comparePackages.map((packageItem) => (
                  <td key={`${packageItem.id}-${label}`} className="pr-4 align-top">
                    <div className="rounded-2xl border border-stone-200 p-3 text-sm text-stone-600">
                      {String(value(packageItem))}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
            {comparedStops.map((stop) => (
              <tr key={`stop-${stop}`}>
                <td className="pr-4 text-sm font-semibold text-stone-900">{stop}</td>
                {comparePackages.map((packageItem) => {
                  const includesStop = packageItem.routeStops.includes(stop);
                  return (
                    <td key={`${packageItem.id}-stop-${stop}`} className="pr-4 align-top">
                      <div className={`rounded-2xl border p-3 text-sm font-semibold ${includesStop ? "border-[#c9decf] bg-[#f0f7f2] text-[#1f6b4a]" : "border-stone-200 bg-stone-50 text-stone-400"}`}>
                        {includesStop ? "Included" : "Not on route"}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="mt-8 border-t border-stone-200 pt-6" aria-labelledby="fit-explanation-heading">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8b6b00]">Route-by-route</p>
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
              const durationDifference = previousPackage ? getDurationDays(packageItem) - getDurationDays(previousPackage) : 0;
              const priceDifference = previousPackage ? packageItem.pricePerPerson - previousPackage.pricePerPerson : 0;
              const differences = [
                addedStops.length ? `adds ${addedStops.join(", ")}` : null,
                removedStops.length ? `does not include ${removedStops.join(", ")}` : null,
                durationDifference > 0 ? `adds ${durationDifference} ${durationDifference === 1 ? "day" : "days"}` : null,
                durationDifference < 0 ? `takes ${Math.abs(durationDifference)} fewer days` : null,
                priceDifference > 0 ? `costs ${formatCurrency(priceDifference)} more` : null,
                priceDifference < 0 ? `costs ${formatCurrency(Math.abs(priceDifference))} less` : null,
              ].filter((difference): difference is string => Boolean(difference));
              const description = previousPackage
                ? `Compared with ${previousPackage.title}, this journey ${differences.join(" and ") || "keeps a similar duration and price with a different itinerary"}.`
                : `Trip 1 sets the reference: ${packageItem.duration.toLowerCase()} across ${packageItem.routeStops.join(" and ")}, from ${formatCurrency(packageItem.pricePerPerson)}.`;
              return (
                <article key={`${packageItem.id}-fit`} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8b6b00]">Trip {index + 1}</p>
                  <h3 className="font-semibold text-stone-950">{packageItem.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link href={`/packages/${packageItem.id}`} className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#0b0b0b] px-4 text-xs font-bold uppercase tracking-[0.1em] text-white">View journey</Link>
                    <Link href="/make-my-trip" className="inline-flex min-h-10 items-center justify-center rounded-full border border-stone-300 bg-white px-4 text-xs font-bold uppercase tracking-[0.1em] text-stone-900">Customize trip</Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="mt-3 text-sm leading-6 text-stone-600">Add at least one more journey to compare its route stops, days, and starting price.</p>
        )}
      </section>
    </div>
  );
}

export function WishlistTripsClient() {
  const router = useRouter();
  const wishlistIds = useStoredIds(STORAGE_KEYS.wishlist);

  const wishlistPackages = wishlistIds
    .map((id) => packageList.find((packageItem) => packageItem.id === id))
    .filter((packageItem): packageItem is DiscoveryPackage => Boolean(packageItem));

  const removeFromWishlist = (id: string) => {
    writeStorageIds(STORAGE_KEYS.wishlist, wishlistIds.filter((value) => value !== id));
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
          <button type="button" onClick={compareShortlist} className="inline-flex items-center justify-center rounded-full bg-[#0b0b0b] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-black">
            Compare up to {MAX_COMPARE_ITEMS}
          </button>
          <Link href="/make-my-trip" className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-stone-900 transition hover:border-[#fcc000]">
            Build my trip
          </Link>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {wishlistPackages.map((packageItem) => (
          <article key={packageItem.id} className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-[0_15px_32px_rgba(55,55,48,0.05)]">
          <div className="relative aspect-[4/3]">
            <Image
              src={packageItem.image ?? "/images/destinations/swat-hd.webp"}
              alt={packageItem.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => removeFromWishlist(packageItem.id)}
              className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/90 text-stone-700 shadow-md"
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
              <span className="text-lg font-semibold text-[#9a7600]">{formatCurrency(packageItem.pricePerPerson)}</span>
              <Link href={`/packages/${packageItem.id}`} className="text-xs font-bold uppercase tracking-[0.12em] text-stone-950 transition hover:text-[#9a7600]">
                View route ↗
              </Link>
            </div>
          </div>
          </article>
        ))}
      </div>
    </div>
  );
}
