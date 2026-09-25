import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHeroImage } from "@/components/page-hero-image";
import { PageShell } from "@/components/page-shell";
import { featuredTourCards } from "@/lib/data/featured-tour-cards";
import { seasonalTourPackages } from "@/lib/data/seasonal-tour-packages";
import { tourPackages } from "@/lib/data/tour-packages";
import { absoluteUrl, tourMenu, whatsappUrl } from "@/lib/site";

function getSeasonalPackageImage(title: string) {
  if (/skardu|basho|manthoka/i.test(title)) return "/images/destinations/skardu-1080x1920.webp";
  if (/hunza|naltar/i.test(title)) return "/images/destinations/hunza-custom.webp";
  if (/kashmir|taobat|arang kel/i.test(title)) return "/images/destinations/kashmir.webp";
  if (/naran|shogran/i.test(title)) return "/images/destinations/naran-hd.webp";
  return "/images/destinations/swat-hd.webp";
}

function getSeasonalPackageRegion(title: string) {
  if (/skardu|basho|manthoka/i.test(title)) return "Baltistan route";
  if (/hunza|naltar/i.test(title)) return "Karakoram route";
  if (/kashmir|taobat|arang kel/i.test(title)) return "Neelum Valley route";
  if (/naran|shogran/i.test(title)) return "Kaghan route";
  return "Swat route";
}

function getPackageSeason(title: string, departure = "") {
  const searchableText = `${title} ${departure}`;
  if (/may|june/i.test(searchableText)) return { label: "Summer", rank: 1 };
  if (/march|april/i.test(searchableText)) return { label: "Spring", rank: 2 };
  if (/january|february/i.test(searchableText)) return { label: "Winter", rank: 3 };
  return { label: "Flexible dates", rank: 4 };
}

export const metadata: Metadata = {
  title: "Pakistan Tour Packages",
  description:
    "Browse domestic Pakistan tour packages for Hunza, Skardu, Murree, and more with clear SEO-friendly service pages.",
  alternates: {
    canonical: "/tours",
  },
  openGraph: {
    title: "Pakistan Tour Packages",
    description:
      "Domestic packages for families, couples, and groups traveling across Pakistan.",
    url: absoluteUrl("/tours"),
  },
};

export default function ToursPage() {
  const sortBySeason = (packages: typeof seasonalTourPackages) =>
    [...packages].sort((first, second) => {
      const seasonDifference = getPackageSeason(first.title, first.departure).rank - getPackageSeason(second.title, second.departure).rank;
      return seasonDifference || first.title.localeCompare(second.title);
    });

  const getPackageRegion = (tourPackage: (typeof tourPackages)[number]) => {
    if (tourPackage.region) {
      return tourPackage.region;
    }

    const destinationSlugs = tourPackage.destinationSlugs ?? [];
    return destinationSlugs.some((slug) => ["ormara", "gorakh", "moola", "ranikot", "charo"].includes(slug)) ? "southern" : "northern";
  };

  const northernPackages = sortBySeason(
    tourPackages.filter((tourPackage) => getPackageRegion(tourPackage) === "northern"),
  );
  const southernPackages = sortBySeason(
    tourPackages.filter((tourPackage) => getPackageRegion(tourPackage) === "southern"),
  );
  const adventurePackages = tourPackages.filter((tourPackage) => {
    const searchableText = `${tourPackage.title} ${tourPackage.departure ?? ""} ${tourPackage.notes?.join(" ") ?? ""}`.toLowerCase();
    return /(air|deosai|basho|khaplu|camping|jeep|hike|hiking|trek|mountain|pass|waterfall|valley)/.test(searchableText);
  });

  const renderDepartureCard = (tourPackage: (typeof seasonalTourPackages)[number], index: number, prefix: string) => (
    <article key={tourPackage.id} className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-[0_16px_40px_rgba(55,55,48,0.08)] transition duration-500 hover:-translate-y-1 hover:border-[#d4aa18] hover:shadow-[0_24px_55px_rgba(55,55,48,0.15)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
        <img
          src={tourPackage.image ?? getSeasonalPackageImage(tourPackage.title)}
          alt={tourPackage.title}
          className="block h-full w-full object-cover brightness-105 saturate-110 transition duration-700 group-hover:scale-105 group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
        <span className="absolute left-4 top-4 bg-[#fcc000] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0b0b0b]">
          {tourPackage.duration}
        </span>
        <span className="absolute bottom-4 right-4 text-xs font-bold tracking-[0.2em] text-white drop-shadow-md">
          {prefix}{String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#9a7600]">
            {getPackageSeason(tourPackage.title, tourPackage.departure).label} · Seasonal departure
          </p>
          <span className="rounded-full bg-[#fff8df] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#8b6b00]">Popular</span>
        </div>
        <h3 className="mt-3 font-serif text-[1.85rem] leading-[1.08] text-stone-950">
          {tourPackage.title}
        </h3>
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-stone-600">
          {getSeasonalPackageRegion(tourPackage.title)} route with planned accommodation, meals, transport, and on-ground support.
        </p>
        <div className="mt-6 flex items-end justify-between gap-4 border-t border-stone-200 pt-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500">From</p>
            <p className="mt-1 text-xl font-semibold text-[#9a7600]">PKR {tourPackage.pricePerPerson.toLocaleString()}</p>
          </div>
          <Link href={`/packages/${tourPackage.id}`} className="text-sm font-bold uppercase tracking-[0.12em] text-stone-950 transition hover:text-[#9a7600]">
            View journey ↗
          </Link>
        </div>
        <a
          href={whatsappUrl(`Hi Hodophile, I am interested in ${tourPackage.title}. Please confirm availability and the best current price.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center rounded-full bg-[#1f6b4a] px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#174f37]"
        >
          Check availability
        </a>
      </div>
    </article>
  );

  return (
    <PageShell wide>
      <PageHeroImage
        image="/images/editorial/editorial-8.webp"
        imageAlt="Scenic tour route"
        eyebrow="Tours and Packages"
        title="Domestic Pakistan packages built for clear comparisons and stronger search visibility."
        description="Browse grouped routes and destination-first package pages designed for smooth planning and confident booking."
      />

      <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Tour catalog highlights">
        {[
          [String(tourPackages.length), "ready-to-compare routes"],
          [String(seasonalTourPackages.length), "scheduled departures"],
          [String(northernPackages.length), "northern packages"],
          [String(southernPackages.length), "southern packages"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-[1.25rem] border border-stone-200 bg-white px-5 py-4 shadow-[0_12px_28px_rgba(55,55,48,0.05)]">
            <p className="text-2xl font-semibold text-stone-950">{value}</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a7600]">{label}</p>
          </div>
        ))}
      </section>

      <section className="mt-12 rounded-[2.5rem] border border-stone-200 bg-[#ecece8] px-5 py-8 text-stone-950 shadow-[0_30px_90px_rgba(55,55,48,0.1)] sm:px-8 sm:py-10 lg:px-12 lg:py-14" aria-labelledby="signature-journeys-heading">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-stone-300 pb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[#9a7600]">Signature journeys</p>
            <h2 id="signature-journeys-heading" className="mt-3 font-serif text-4xl text-stone-950">Compare real routes at a glance.</h2>
          </div>
          <Link href="/make-my-trip" className="text-sm font-semibold text-stone-600 transition hover:text-[#9a7600]">Need a custom route? ↗</Link>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredTourCards.map((tour) => (
            <article key={tour.slug} className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-[0_16px_40px_rgba(55,55,48,0.08)] transition hover:-translate-y-1 hover:border-[#fcc000]/70 hover:shadow-[0_20px_48px_rgba(55,55,48,0.14)]">
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
                <Image src={tour.homeImage} alt={tour.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute left-4 top-4 bg-[#fcc000] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-black">{tour.duration}</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-2xl font-semibold leading-tight text-stone-950">{tour.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-stone-600">{tour.summary}</p>
                <div className="mt-5 flex items-end justify-between gap-4 border-t border-stone-200 pt-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">From</p>
                    <p className="mt-1 text-lg font-semibold text-[#9a7600]">{tour.priceFrom ?? "Contact for pricing"}</p>
                  </div>
                  <Link href={`/tours/featured/${tour.slug}`} className="text-sm font-bold uppercase tracking-[0.12em] text-stone-950 transition hover:text-[#9a7600]">View journey ↗</Link>
                </div>
                <a href={whatsappUrl(`Hi Hodophile, I'm interested in ${tour.title}. Please share availability and booking details.`)} target="_blank" rel="noopener noreferrer" className="mt-4 text-sm font-semibold text-[#557a63] hover:text-[#9a7600]">Ask an expert on WhatsApp</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {adventurePackages.length > 0 && (
        <section id="adventure-tours" className="mt-16 rounded-[2.5rem] border border-stone-300 bg-white px-5 py-8 shadow-[0_30px_90px_rgba(55,55,48,0.12)] sm:px-8 sm:py-10 lg:px-12 lg:py-12" aria-labelledby="adventure-tours-heading">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-stone-300 pb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-[#9a7600]">Adventure trips</p>
              <h2 id="adventure-tours-heading" className="mt-3 font-serif text-4xl text-stone-950">Adventure Tours</h2>
            </div>
            <p className="text-xs uppercase tracking-[0.18em] text-stone-500">{adventurePackages.length} curated routes</p>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {adventurePackages.map((tourPackage, index) => renderDepartureCard(tourPackage as (typeof seasonalTourPackages)[number], index, "A"))}
          </div>
        </section>
      )}

      <section className="relative mt-16 overflow-hidden rounded-[2.5rem] border border-stone-300 bg-[#dcdcd7] px-5 py-8 text-stone-950 shadow-[0_30px_90px_rgba(55,55,48,0.14)] sm:px-8 sm:py-10 lg:px-12 lg:py-14" aria-labelledby="scheduled-departures-heading">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-[#b9971f]/25" />
        <div className="pointer-events-none absolute right-14 top-14 h-24 w-24 rounded-full border border-[#b9971f]/20" />
        <div className="relative flex flex-wrap items-end justify-between gap-7 border-b border-stone-300 pb-9">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-[#fcc000]">
              <span className="h-px w-10 bg-[#b9971f]" />
              <p className="text-[11px] font-bold uppercase tracking-[0.36em] text-[#8b6b00]">The departure edit</p>
            </div>
            <h2 id="scheduled-departures-heading" className="mt-5 max-w-2xl font-serif text-4xl leading-[1.05] text-stone-950 sm:text-5xl lg:text-6xl">Choose the date that fits your next great escape.</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">A considered collection of seasonal journeys across Pakistan, with transparent starting prices and a complete itinerary behind every card.</p>
          </div>
          <div className="flex items-center gap-4 rounded-full border border-[#b9971f]/40 bg-[#f7f3df] px-4 py-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fcc000] text-sm font-bold text-[#0b0b0b]">{seasonalTourPackages.length}</span>
            <span className="pr-2 text-xs uppercase tracking-[0.18em] text-stone-600">curated<br />departures</span>
          </div>
        </div>

        <div className="relative mt-9">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8b6b00]">Mountain escapes</p>
              <h3 className="mt-2 font-serif text-3xl text-stone-950">Northern Tours</h3>
            </div>
            <p className="text-xs uppercase tracking-[0.18em] text-stone-500">{northernPackages.length} departures</p>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {northernPackages.map((tourPackage, index) => renderDepartureCard(tourPackage, index, "N"))}
          </div>

          <div className="mt-14 flex flex-wrap items-end justify-between gap-4 border-b border-stone-300 pb-5">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8b6b00]">Coast and highland escapes</p>
              <h3 className="mt-2 font-serif text-3xl text-stone-950">Southern Tours</h3>
            </div>
            <p className="text-xs uppercase tracking-[0.18em] text-stone-500">{southernPackages.length} departures</p>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {southernPackages.map((tourPackage, index) => renderDepartureCard(tourPackage, index, "S"))}
          </div>
        </div>
      </section>

      <section className="mt-14 rounded-[2.5rem] border border-[#fcc000]/40 bg-[#fff8df] px-5 py-8 text-stone-950 shadow-[0_30px_90px_rgba(55,55,48,0.1)] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#e0c566]/60 pb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[#8b6b00]">Need a managed plan?</p>
            <h2 className="mt-3 font-serif text-3xl text-stone-950">Tell us your dates and we will shape the route for you.</h2>
          </div>
          <Link href="/make-my-trip" className="inline-flex items-center justify-center rounded-full bg-[#0b0b0b] px-5 py-3 text-sm font-semibold !text-white transition hover:bg-black">Build my trip</Link>
        </div>
      </section>

      <section className="mt-14 rounded-[2.5rem] border border-stone-300 bg-[#ecece8] px-5 py-8 text-stone-950 shadow-[0_30px_90px_rgba(55,55,48,0.1)] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-stone-300 pb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[#8b6b00]">Tour menu</p>
            <h2 className="mt-3 font-serif text-3xl text-stone-950">Browse by tour group and package.</h2>
          </div>
          <Link href="/make-my-trip" className="text-sm font-medium text-stone-600 transition hover:text-[#8b6b00]">
            Need custom route?
          </Link>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-2">
          {tourMenu.map((group) => (
            <article key={group.href} className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-[0_18px_40px_rgba(55,55,48,0.08)] transition hover:-translate-y-1 hover:border-[#fcc000]/60">
              <Link href={group.href} className="text-lg font-semibold text-stone-950 transition hover:text-[#8b6b00]">
                {group.label}
              </Link>
              <div className="mt-5 grid gap-3">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl border border-stone-200 bg-[#f7f7f4] px-4 py-3 text-sm font-medium text-stone-600 transition hover:border-[#ffc000]/60 hover:bg-[#fff8df] hover:text-stone-950"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
