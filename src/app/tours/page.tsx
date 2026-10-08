import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { TravelDiscoveryCatalog } from "@/components/travel-discovery";
import { tourDiscoveryIdeas } from "@/lib/data/tour-discovery-ideas";
import { tourPackages } from "@/lib/data/tour-packages";
import { absoluteUrl, tourMenu } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pakistan Tours, Made Easy",
  description:
    "Browse domestic Pakistan tour packages for Hunza, Skardu, Murree, and more with clear, easy planning.",
  alternates: {
    canonical: "/tours",
  },
  openGraph: {
    title: "Pakistan Tours, Made Easy",
    description:
      "Domestic packages for families, couples, and groups traveling across Pakistan.",
    url: absoluteUrl("/tours"),
  },
};

export default function ToursPage() {
  const journeyCount = tourPackages.length + tourDiscoveryIdeas.length;
  const scheduledJourneys = tourPackages.filter((tourPackage) => tourPackage.departures.length > 0);
  const scheduledDepartureCount = scheduledJourneys.reduce(
    (count, tourPackage) => count + tourPackage.departures.length,
    0,
  );

  return (
    <PageShell wide noTopPadding>
      <div className="-mx-4 overflow-hidden md:-mx-6 lg:-mx-10 xl:-mx-14">
        <section className="relative isolate flex min-h-[min(760px,calc(100svh-var(--site-header-height)))] items-center overflow-hidden bg-[#090909] px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-14 lg:py-10">
          <Image
            src="/images/package-cards/images__editorial__editorial-8.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 -z-20 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.62)_52%,rgba(0,0,0,0.22)_100%),linear-gradient(0deg,rgba(0,0,0,0.42),transparent_48%)]" />
          <div className="pointer-events-none absolute -right-40 -top-48 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#FCC000]/[0.07] blur-3xl" />
          <div className="relative mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
            <div className="flex flex-col justify-center py-3 lg:py-10">
              <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.34em] text-[#FCC000]">
                <span className="h-px w-10 bg-[#FCC000]" />
                Domestic journeys by Hodophile
              </p>
              <h1 className="mt-6 font-[var(--font-display)] text-6xl leading-[0.94] tracking-[-0.04em] sm:text-7xl lg:text-[6rem] xl:text-[6.5rem]">
                Find your
                <span className="mt-2 block text-[#FCC000]">next journey.</span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-8 text-white/75 sm:text-lg">
                Thoughtfully planned escapes across Pakistan, with considered routes, clear details, and a local team beside you.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#tour-discovery"
                  className="inline-flex items-center justify-center rounded-full bg-[#FCC000] px-6 py-3.5 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-[#ffda4d]"
                >
                  Explore journeys
                </a>
                <Link
                  href="/make-my-trip"
                  className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-[#FCC000] hover:text-[#FCC000]"
                >
                  Plan a private trip
                </Link>
              </div>
            </div>

            <div className="grid max-w-md grid-cols-3 gap-x-4 border-t border-white/20 pt-5 sm:gap-x-6 lg:mb-2 lg:max-w-none lg:grid-cols-1 lg:gap-y-5 lg:border-l lg:border-t-0 lg:border-[#FCC000]/60 lg:pl-6 lg:pt-0">
              <div>
                <p className="font-[var(--font-display)] text-2xl text-white sm:text-3xl">{String(journeyCount).padStart(2, "0")}</p>
                <p className="mt-1 text-[0.58rem] uppercase leading-4 tracking-[0.14em] text-white/70 sm:text-[0.65rem]">Curated journeys</p>
              </div>
              <div className="border-l border-white/25 pl-4 sm:pl-6 lg:border-l-0 lg:pl-0">
                <p className="font-[var(--font-display)] text-2xl text-white sm:text-3xl">{String(new Set(tourPackages.map((tourPackage) => tourPackage.region)).size).padStart(2, "0")}</p>
                <p className="mt-1 text-[0.58rem] uppercase leading-4 tracking-[0.14em] text-white/70 sm:text-[0.65rem]">Regions to explore</p>
              </div>
              <div className="border-l border-white/25 pl-4 sm:pl-6 lg:border-l-0 lg:pl-0">
                <p className="font-[var(--font-display)] text-2xl text-white sm:text-3xl">One team</p>
                <p className="mt-1 text-[0.58rem] uppercase leading-4 tracking-[0.14em] text-white/70 sm:text-[0.65rem]">From planning to return</p>
              </div>
            </div>
          </div>
        </section>

        <TravelDiscoveryCatalog />
      </div>

      <section className="-mx-4 mt-0 bg-[#f4f1eb] px-4 py-12 md:-mx-6 md:px-6 sm:py-16 lg:-mx-10 lg:px-14 lg:py-20 xl:-mx-14" aria-labelledby="confirmed-departures-heading">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#806700]">{scheduledDepartureCount ? "Confirmed departures" : "Travel on your terms"}</p>
            <h2 id="confirmed-departures-heading" className="mt-4 max-w-md font-[var(--font-display)] text-4xl leading-[1.08] tracking-[-0.025em] text-stone-950 sm:text-5xl">
              {scheduledDepartureCount ? "Dates worth looking forward to." : "Your dates. Your pace. Your Pakistan."}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-stone-600">
              {scheduledDepartureCount ? "Browse verified departures and find the journey that fits your plans." : "No fixed group dates are confirmed right now. Request the dates that work for you, and our team will confirm availability and current pricing."}
            </p>
          </div>

        {scheduledJourneys.length > 0 ? (
          <div className="divide-y divide-stone-300 border-y border-stone-300">
            {scheduledJourneys.map((journey) => (
              <article key={journey.id} className="grid gap-4 py-5 sm:grid-cols-[minmax(0,0.8fr)_1.2fr] sm:gap-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-[var(--font-display)] text-2xl text-stone-950">{journey.title}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-stone-500">{journey.duration} · {journey.departures.length} departures</p>
                  </div>
                  <Link href={`/packages/${journey.id}`} className="shrink-0 text-xs font-bold uppercase tracking-[0.1em] text-[#8b6b00]">Journey ↗</Link>
                </div>
                <ul className="divide-y divide-stone-200 text-sm text-stone-700">
                  {journey.departures.map((departure) => (
                    <li key={departure.id} className="flex flex-wrap justify-between gap-2 py-2 first:pt-0 last:pb-0">
                      <span>{departure.label}</span>
                      <span className="font-semibold text-stone-950">PKR {departure.pricePerPerson.toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center border-y border-stone-300 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <p className="max-w-xl text-sm leading-7 text-stone-600">{journeyCount} journeys are available for custom-date requests.</p>
            <Link href="/make-my-trip" className="mt-4 inline-flex w-fit items-center justify-center rounded-full bg-[#0b0b0b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-black sm:mt-0">Request my dates</Link>
          </div>
        )}
        </div>
      </section>

      <section className="relative -mx-4 mt-0 overflow-hidden bg-[#090909] px-4 py-12 text-white md:-mx-6 md:px-6 sm:py-16 lg:-mx-10 lg:px-14 lg:py-20 xl:-mx-14">
        <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-[#FCC000]/10 blur-3xl" />
        <div className="absolute -bottom-48 left-1/4 h-72 w-72 rounded-full bg-[#FCC000]/[0.06] blur-3xl" />
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(130deg,rgba(255,255,255,0.07),rgba(255,255,255,0.015)_55%,rgba(252,192,0,0.08))] px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#FCC000]">Your next chapter</p>
              <h2 className="mt-4 font-[var(--font-display)] text-4xl leading-[1.05] tracking-[-0.025em] sm:text-5xl lg:text-6xl">
                A Pakistan journey
                <span className="text-[#FCC000]"> made for you.</span>
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
                Tell us what you are dreaming of. We’ll help shape the route around your dates, interests, and travel party.
              </p>
            </div>
            <Link href="/make-my-trip" className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#FCC000] px-7 py-4 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-[#ffda4d]">Plan with Hodophile <span aria-hidden="true" className="ml-3 text-lg">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="relative -mx-4 mt-0 overflow-hidden bg-[#0b0b0b] px-4 py-12 text-white md:-mx-6 md:px-6 sm:py-16 lg:-mx-10 lg:px-14 lg:py-20 xl:-mx-14">
        <div className="pointer-events-none absolute -right-24 -top-36 h-72 w-72 rounded-full bg-[#FCC000]/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/15 pb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#FCC000]">Explore by region</p>
              <h2 className="mt-4 font-[var(--font-display)] text-4xl leading-[1.08] tracking-[-0.025em] text-white sm:text-5xl">Find your way through Pakistan.</h2>
            </div>
            <Link href="/make-my-trip" className="text-sm font-medium text-white/65 transition hover:text-[#FCC000]">
              Need custom route?
            </Link>
          </div>

          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            {tourMenu.map((group) => (
              <article key={group.href} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-[#FCC000]/50 hover:bg-white/[0.07]">
                <Link href={group.href} className="font-[var(--font-display)] text-2xl text-white transition hover:text-[#FCC000]">
                  {group.label}
                </Link>
                <div className="mt-5 grid gap-3">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-medium text-white/65 transition hover:border-[#FCC000]/50 hover:bg-[#FCC000]/[0.06] hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
