import type { Metadata } from "next";
import Link from "next/link";

import { PageHeroImage } from "@/components/page-hero-image";
import { PageShell } from "@/components/page-shell";
import { TravelDiscoveryCatalog } from "@/components/travel-discovery";
import { tourPackages } from "@/lib/data/tour-packages";
import { absoluteUrl, tourMenu } from "@/lib/site";

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
  const northernJourneyCount = tourPackages.filter((tourPackage) => tourPackage.region === "northern").length;
  const southernJourneyCount = tourPackages.filter((tourPackage) => tourPackage.region === "southern").length;
  const scheduledJourneys = tourPackages.filter((tourPackage) => tourPackage.departures.length > 0);
  const scheduledDepartureCount = scheduledJourneys.reduce(
    (count, tourPackage) => count + tourPackage.departures.length,
    0,
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

      <TravelDiscoveryCatalog />

      <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Tour catalog highlights">
        {[
          [String(tourPackages.length), "unique journeys"],
          [scheduledDepartureCount ? String(scheduledDepartureCount) : "On request", scheduledDepartureCount ? "confirmed departures" : "custom-date journeys"],
          [String(northernJourneyCount), "northern journeys"],
          [String(southernJourneyCount), "southern journeys"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-[1.25rem] border border-stone-200 bg-white px-5 py-4 shadow-[0_12px_28px_rgba(55,55,48,0.05)]">
            <p className="text-2xl font-semibold text-stone-950">{value}</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a7600]">{label}</p>
          </div>
        ))}
      </section>

      <section className="mt-16 rounded-[2rem] border border-stone-200 bg-[#f7f3ea] p-6 shadow-[0_20px_55px_rgba(55,55,48,0.07)] sm:p-8" aria-labelledby="confirmed-departures-heading">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-stone-300 pb-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8b6b00]">{scheduledDepartureCount ? "Confirmed dates" : "Flexible dates"}</p>
            <h2 id="confirmed-departures-heading" className="mt-3 font-serif text-3xl text-stone-950">{scheduledDepartureCount ? "Departures, grouped by journey." : "Travel on the dates that work for you."}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">{scheduledDepartureCount ? "Only dates with a verified year appear here. Other journeys remain available for custom date requests." : "No fixed group dates are confirmed right now. Every journey can be requested around your schedule; our team will confirm current availability and pricing."}</p>
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-600">{scheduledDepartureCount ? `${scheduledDepartureCount} dates · ${scheduledJourneys.length} journeys` : `${tourPackages.length} journeys open for date requests`}</span>
        </div>

        {scheduledJourneys.length > 0 ? (
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {scheduledJourneys.map((journey) => (
              <article key={journey.id} className="rounded-2xl border border-stone-200 bg-white p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-stone-950">{journey.title}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-stone-500">{journey.duration} · {journey.departures.length} departures</p>
                  </div>
                  <Link href={`/packages/${journey.id}`} className="shrink-0 text-xs font-bold uppercase tracking-[0.1em] text-[#8b6b00]">Journey ↗</Link>
                </div>
                <ul className="mt-4 space-y-2 border-t border-stone-200 pt-4 text-sm text-stone-700">
                  {journey.departures.map((departure) => (
                    <li key={departure.id} className="flex flex-wrap justify-between gap-2">
                      <span>{departure.label}</span>
                      <span className="font-semibold text-stone-950">PKR {departure.pricePerPerson.toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-dashed border-stone-300 bg-white/70 p-5">
            <p className="max-w-2xl text-sm leading-6 text-stone-700">Choose a journey and request the dates that suit you. We will confirm availability and the current price with you.</p>
            <Link href="/make-my-trip" className="btn-dark">Request my dates</Link>
          </div>
        )}
      </section>

      <section className="mt-14 rounded-[2.5rem] border border-[#fcc000]/40 bg-[#fff8df] px-5 py-8 text-stone-950 shadow-[0_30px_90px_rgba(55,55,48,0.1)] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#e0c566]/60 pb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[#8b6b00]">Need a managed plan?</p>
            <h2 className="mt-3 font-serif text-3xl text-stone-950">Tell us your dates and we will shape the route for you.</h2>
          </div>
          <Link href="/make-my-trip" className="btn-dark">Build my trip</Link>
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
