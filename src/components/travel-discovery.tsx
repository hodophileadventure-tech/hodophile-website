"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { tourPackages } from "@/lib/data/tour-packages";
import { whatsappUrl } from "@/lib/site";

type RegionFilter = "all" | "northern" | "southern";
type BudgetFilter = "all" | "under-50000" | "50000-100000" | "100000-plus";

type DiscoveryPackage = {
  id: string;
  title: string;
  duration: string;
  pricePerPerson: number;
  departure?: string;
  region: Exclude<RegionFilter, "all">;
  notes: string[];
  destinationSlugs: string[];
  image?: string;
  summary: string;
};

const STORAGE_KEYS = {
  compare: "hodophile-compare",
  wishlist: "hodophile-wishlist",
};

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

  if (title.includes("skardu")) {
    return "Mountain lakes, clear skies, and premium valley stays designed for a relaxed but immersive northern getaway.";
  }
  if (title.includes("hunza")) {
    return "Historic villages, glacier routes, and scenic stops that are ideal for travelers wanting bigger mountain drama.";
  }
  if (title.includes("kashmir") || title.includes("swat")) {
    return "Softer landscapes and easy pacing make this a strong option for couples, families, and flexible departures.";
  }
  if (title.includes("ormara") || title.includes("bhit") || title.includes("charna") || title.includes("moola")) {
    return "Coastal and canyon-based escapes with beach time, overnight stays, and flexible group-friendly routes.";
  }
  if (title.includes("deosai") || title.includes("basho") || title.includes("khaplu")) {
    return "Adventure-led highland routes with remote scenery, elevated viewpoints, and deliberate travel pacing.";
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

const packageList: DiscoveryPackage[] = tourPackages.map((tourPackage, index) => ({
  id: tourPackage.id,
  title: tourPackage.title,
  duration: tourPackage.duration,
  pricePerPerson: tourPackage.pricePerPerson,
  departure: tourPackage.departure,
  region: getPackageRegion(tourPackage),
  notes: tourPackage.notes ?? [],
  destinationSlugs: tourPackage.destinationSlugs ?? [],
  image: tourPackage.image ?? getPackageImage(tourPackage.title, index) ?? discoveryImagePool[index % discoveryImagePool.length],
  summary: buildPackageSummary(tourPackage),
}));

function readStorageIds(storageKey: string) {
  if (typeof window === "undefined") return [];

  try {
    const rawValue = window.localStorage.getItem(storageKey);
    if (!rawValue) return [];
    const parsedValue = JSON.parse(rawValue);
    return Array.isArray(parsedValue) ? parsedValue.filter((value): value is string => typeof value === "string") : [];
  } catch {
    return [];
  }
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
          {packageItem.region === "northern" ? "Northern" : "Southern"}
        </span>
        <div className="absolute right-3 top-3 flex gap-2">
          <button
            type="button"
            onClick={() => onToggleWishlist(packageItem.id)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold shadow-md backdrop-blur-sm transition ${
              isWishlistEnabled
                ? "border-[#1b7a4b] bg-[#1b7a4b] text-white"
                : "border-white/70 bg-white/90 text-stone-700 hover:border-[#1b7a4b] hover:text-[#1b7a4b]"
            }`}
            aria-label={isWishlistEnabled ? `Remove ${packageItem.title} from wishlist` : `Save ${packageItem.title} to wishlist`}
          >
            ♥
          </button>
          <button
            type="button"
            onClick={() => onToggleCompare(packageItem.id)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold shadow-md backdrop-blur-sm transition ${
              isCompareEnabled
                ? "border-[#9a7600] bg-[#fcc000] text-[#0b0b0b]"
                : "border-white/70 bg-white/90 text-stone-700 hover:border-[#9a7600] hover:text-[#9a7600]"
            }`}
            aria-label={isCompareEnabled ? `Remove ${packageItem.title} from compare` : `Add ${packageItem.title} to compare`}
          >
            ⇄
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a7600]">{packageItem.duration}</span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-stone-500">{packageItem.destinationSlugs.length} destinations</span>
        </div>

        <h3 className="mt-3 font-serif text-[1.9rem] leading-[1.08] text-stone-950">{packageItem.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-stone-600">{packageItem.summary}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {(packageItem.notes.slice(0, 2).length ? packageItem.notes.slice(0, 2) : ["Flexible departure", "Curated route"]).map((note) => (
            <span key={note} className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 text-[11px] font-medium text-stone-700">
              {note}
            </span>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-stone-500">From</p>
            <p className="mt-1 text-lg font-semibold text-[#9a7600]">{priceText}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-stone-500">Best for</p>
            <p className="mt-1 text-sm font-semibold text-stone-900">{packageItem.region === "northern" ? "Mountain route" : "Coastal escape"}</p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-stone-200 pt-4">
          <Link href={`/packages/${packageItem.id}`} className="text-sm font-bold uppercase tracking-[0.12em] text-stone-950 transition hover:text-[#9a7600]">
            View route ↗
          </Link>
          <a
            href={whatsappUrl(`Hi Hodophile, I am interested in ${packageItem.title}. Please share the best current package details.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[#1f6b4a] transition hover:text-[#9a7600]"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

export function TravelDiscoveryCatalog() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState<RegionFilter>("all");
  const [budget, setBudget] = useState<BudgetFilter>("all");
  const [compareIds, setCompareIds] = useState<string[]>(() => readStorageIds(STORAGE_KEYS.compare));
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => readStorageIds(STORAGE_KEYS.wishlist));
  const [quickCompareSelection, setQuickCompareSelection] = useState<Array<string | "">>(["", "", ""]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEYS.compare, JSON.stringify(compareIds));
  }, [compareIds]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  const filteredPackages = useMemo(() => {
    const query = search.trim().toLowerCase();

    return packageList.filter((packageItem) => {
      const matchesQuery =
        query.length === 0 ||
        packageItem.title.toLowerCase().includes(query) ||
        packageItem.destinationSlugs.some((slug) => slug.toLowerCase().includes(query)) ||
        packageItem.summary.toLowerCase().includes(query) ||
        packageItem.notes.some((note) => note.toLowerCase().includes(query));

      const matchesRegion = region === "all" || packageItem.region === region;

      const matchesBudget =
        budget === "all" ||
        (budget === "under-50000" && packageItem.pricePerPerson < 50000) ||
        (budget === "50000-100000" && packageItem.pricePerPerson >= 50000 && packageItem.pricePerPerson <= 100000) ||
        (budget === "100000-plus" && packageItem.pricePerPerson > 100000);

      return matchesQuery && matchesRegion && matchesBudget;
    });
  }, [budget, region, search]);

  const recommendedPackages = useMemo(() => {
    const baseList = filteredPackages.length > 0 ? filteredPackages : packageList;
    return baseList.slice(0, 3);
  }, [filteredPackages]);

  const toggleWishlist = (id: string) => {
    setWishlistIds((currentValues) =>
      currentValues.includes(id) ? currentValues.filter((value) => value !== id) : [...currentValues, id],
    );
  };

  const persistCompareSelection = (ids: string[]) => {
    setCompareIds(ids);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEYS.compare, JSON.stringify(ids));
    }
    router.push("/compare");
  };

  const handleCompareSubmit = () => {
    const selectedIds = quickCompareSelection.filter((value): value is string => Boolean(value));
    if (selectedIds.length === 0) return;
    persistCompareSelection(selectedIds.slice(0, 3));
  };

  const toggleCompare = (id: string) => {
    setCompareIds((currentValues) => {
      if (currentValues.includes(id)) {
        return currentValues.filter((value) => value !== id);
      }
      if (currentValues.length >= 3) {
        return [...currentValues.slice(1), id];
      }
      return [...currentValues, id];
    });
  };

  const comparePackages = compareIds
    .map((id) => packageList.find((packageItem) => packageItem.id === id))
    .filter((packageItem): packageItem is DiscoveryPackage => Boolean(packageItem));

  return (
    <section className="mt-10 overflow-hidden rounded-[2.5rem] border border-[#e8ddba] bg-[radial-gradient(circle_at_top,_rgba(252,192,0,0.12),_rgba(247,245,240,0.98)_38%,_rgba(247,245,240,1)_100%)] px-5 py-8 shadow-[0_35px_90px_rgba(55,55,48,0.08)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-stone-200 pb-7">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#8b6b00]">Curated discovery</p>
          <h2 className="mt-3 font-serif text-4xl text-stone-950">Search, compare, and shortlist your next Pakistan route.</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-stone-600">
            Thoughtful escapes for mountain lovers, beach seekers, and travelers who want the right route without the noise.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm font-medium text-stone-700">
          <span className="rounded-full border border-[#e5d5a3] bg-[#fffdf8] px-3 py-2 shadow-[0_8px_20px_rgba(122,94,0,0.06)]">{filteredPackages.length} matches</span>
          <Link href="/wishlist" className="rounded-full border border-stone-200 bg-white px-3 py-2 transition hover:border-[#1f6b4a] hover:text-[#1f6b4a]">
            Saved trips ({wishlistIds.length})
          </Link>
        </div>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-[1.4fr_repeat(2,minmax(0,0.8fr))]">
        <label className="rounded-[1.4rem] border border-stone-200 bg-white p-3 shadow-[0_12px_24px_rgba(55,55,48,0.04)]">
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Search routes</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Try Hunza, Skardu, Kashmir, or beach escapes"
            className="w-full border-0 bg-transparent px-1 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
          />
        </label>

        <div className="rounded-[1.4rem] border border-stone-200 bg-white p-3 shadow-[0_12px_24px_rgba(55,55,48,0.04)]">
          <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Region</span>
          <div className="flex flex-wrap gap-2">
            {(["all", "northern", "southern"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setRegion(option)}
                className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition ${
                  region === option ? "bg-[#0b0b0b] text-white" : "border border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300"
                }`}
              >
                {option === "all" ? "All" : option}
              </button>
            ))}
          </div>
        </div>

        <label className="rounded-[1.4rem] border border-stone-200 bg-white p-3 shadow-[0_12px_24px_rgba(55,55,48,0.04)]">
          <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Budget</span>
          <select
            value={budget}
            onChange={(event) => setBudget(event.target.value as BudgetFilter)}
            className="w-full border-0 bg-transparent px-1 py-2 text-sm text-stone-900 focus:outline-none"
          >
            <option value="all">Any budget</option>
            <option value="under-50000">Under PKR 50,000</option>
            <option value="50000-100000">PKR 50,000 - 100,000</option>
            <option value="100000-plus">PKR 100,000+</option>
          </select>
        </label>
      </div>

      <div className="mt-7 rounded-[1.6rem] border border-stone-200 bg-white/90 p-4 shadow-[0_18px_40px_rgba(55,55,48,0.04)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8b6b00]">Quick compare</p>
            <h3 className="mt-1 text-lg font-semibold text-stone-950">Select up to three routes to compare</h3>
          </div>
          <button
            type="button"
            onClick={() => setQuickCompareSelection(["", "", ""])}
            className="text-xs font-semibold uppercase tracking-[0.13em] text-stone-600 transition hover:text-[#8b6b00]"
          >
            Clear
          </button>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {quickCompareSelection.map((selectedId, index) => (
            <label key={`quick-compare-${index}`} className="rounded-2xl border border-stone-200 bg-stone-50 p-3">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-stone-500">Route {index + 1}</span>
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
                  <option key={route.id} value={route.id}>
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
            </div>
            <Link href="/compare" className="inline-flex items-center justify-center rounded-full bg-[#0b0b0b] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-black">
              View compare
            </Link>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
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

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {recommendedPackages.map((packageItem, index) => (
          <div key={`${packageItem.id}-recommendation`} className="rounded-[1.4rem] border border-stone-200 bg-white p-4 shadow-[0_16px_28px_rgba(55,55,48,0.04)]">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9a7600]">
              {index === 0 ? "Best fit" : index === 1 ? "Popular now" : "New for you"}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-stone-950">{packageItem.title}</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">{packageItem.summary}</p>
            <div className="mt-4 flex items-center justify-between border-t border-stone-200 pt-4">
              <span className="text-lg font-semibold text-[#9a7600]">{formatCurrency(packageItem.pricePerPerson)}</span>
              <Link href={`/packages/${packageItem.id}`} className="text-xs font-bold uppercase tracking-[0.12em] text-stone-950 transition hover:text-[#9a7600]">
                Explore ↗
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-2xl font-semibold text-stone-950">Route results</h3>
          {search || region !== "all" || budget !== "all" ? (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setRegion("all");
                setBudget("all");
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
            <p className="mt-2 text-sm text-stone-600">Try a broader search like “Hunza”, “coastal”, or “family travel” to surface more routes.</p>
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
  const [compareIds] = useState<string[]>(() => readStorageIds(STORAGE_KEYS.compare));

  const comparePackages = compareIds
    .map((id) => packageList.find((packageItem) => packageItem.id === id))
    .filter((packageItem): packageItem is DiscoveryPackage => Boolean(packageItem));

  if (comparePackages.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-stone-300 bg-[radial-gradient(circle_at_top,_rgba(252,192,0,0.12),_rgba(255,255,255,1)_55%)] p-8 text-center shadow-[0_20px_50px_rgba(55,55,48,0.06)]">
        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#8b6b00]">Compare</p>
        <p className="mt-3 text-2xl font-semibold text-stone-950">No routes selected for comparison yet.</p>
        <p className="mt-3 text-sm text-stone-600">Pick up to three tours from the catalog and return here to compare route fit, pace, and pricing.</p>
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
          <h1 className="mt-3 font-serif text-4xl text-stone-950">Trip shortlist</h1>
        </div>
        <Link href="/tours" className="text-sm font-semibold text-stone-600 transition hover:text-[#8b6b00]">
          Add more routes
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-3 text-left">
          <thead>
            <tr>
              <th className="pr-4 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Route</th>
              {comparePackages.map((packageItem) => (
                <th key={packageItem.id} className="min-w-[220px] pr-4 align-top">
                  <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                    <p className="text-sm font-semibold text-stone-900">{packageItem.title}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#8b6b00]">{packageItem.region}</p>
                    <p className="mt-3 text-lg font-semibold text-[#9a7600]">{formatCurrency(packageItem.pricePerPerson)}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { label: "Duration", value: (packageItem: DiscoveryPackage) => packageItem.duration },
              { label: "Departure", value: (packageItem: DiscoveryPackage) => packageItem.departure ?? "Flexible dates" },
              {
                label: "Budget fit",
                value: (packageItem: DiscoveryPackage) =>
                  packageItem.pricePerPerson < 50000 ? "Under PKR 50k" : packageItem.pricePerPerson > 100000 ? "PKR 100k+" : "Mid-range",
              },
              {
                label: "Best for",
                value: (packageItem: DiscoveryPackage) => (packageItem.region === "northern" ? "Mountain route" : "Coastal escape"),
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
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function WishlistTripsClient() {
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => readStorageIds(STORAGE_KEYS.wishlist));

  const wishlistPackages = wishlistIds
    .map((id) => packageList.find((packageItem) => packageItem.id === id))
    .filter((packageItem): packageItem is DiscoveryPackage => Boolean(packageItem));

  const removeFromWishlist = (id: string) => {
    const nextWishlist = wishlistIds.filter((value) => value !== id);
    setWishlistIds(nextWishlist);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(nextWishlist));
    }
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
  );
}
