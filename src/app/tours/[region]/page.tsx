import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JourneyCard } from "@/components/journey-card";
import { PageShell } from "@/components/page-shell";
import { TourLanding } from "@/components/tour-landing";
import { getNorthernAirTourPath, northernAirTours } from "@/lib/data/northern-air-tours";
import { getTourPackagesForRegion } from "@/lib/data/tour-packages";
import { absoluteUrl, destinations, tourMenu, whatsappUrl } from "@/lib/site";

type RegionPageProps = {
  params: Promise<{ region: string }>;
};

function findGroupByRegion(region: string) {
  return tourMenu.find((group) => group.href.endsWith(`/${region}`));
}

function getRegionImage(region: string) {
  if (region === "southern-tours") {
    return "/images/package-cards/images__destinations__kashmir.webp";
  }
  return destinations[0]?.image ?? "/images/package-cards/images__destinations__hunza.avif";
}

export async function generateStaticParams() {
  return tourMenu.map((group) => ({
    region: group.href.split("/").filter(Boolean).at(-1) ?? "",
  }));
}

export async function generateMetadata({ params }: RegionPageProps): Promise<Metadata> {
  const { region } = await params;
  const group = findGroupByRegion(region);

  if (!group) {
    return {};
  }

  return {
    title: group.label,
    description: `${group.label} by Hodophile Adventures with curated route pages and flexible planning.`,
    alternates: {
      canonical: group.href,
    },
    openGraph: {
      title: group.label,
      description: `${group.label} by Hodophile Adventures with curated route pages and flexible planning.`,
      url: absoluteUrl(group.href),
    },
  };
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { region } = await params;
  const group = findGroupByRegion(region);

  if (!group) {
    notFound();
  }

  const regionalPackages = getTourPackagesForRegion(region === "southern-tours" ? "southern" : "northern");
  const isNorthernToursPage = region === "northern-tours";
  const roadPackages = isNorthernToursPage
    ? regionalPackages.filter((item) => !/by air|kdu-to-kdu|air-linked/i.test(`${item.title} ${item.scheduleNote ?? ""}`))
    : regionalPackages;

  return (
    <PageShell wide>
      <TourLanding
        eyebrow="Tour Group"
        title={group.label}
        description={`Browse premium ${group.label.toLowerCase()} designed for families, couples, students, and corporate travel across Pakistan.`}
        image={getRegionImage(region)}
        highlights={["Private transport", "Flexible pacing", "Hotel coordination", "Local support"]}
        ctaHref="/make-my-trip"
        ctaLabel="Customize This Route"
      />

      <section className="site-section-gap rounded-[2.5rem] bg-[#0b0b0b] p-6 text-white shadow-[0_30px_90px_rgba(11,11,11,0.16)] md:p-8">
        <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[#fcc000]">Packages</p>
            <h2 className="mt-3 font-serif text-3xl text-white">Select a package to explore details.</h2>
          </div>
          <Link href="/tours" className="text-sm font-medium text-white/65 transition hover:text-[#fcc000]">
            Back to all tours
          </Link>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-white/10 bg-[#151515] px-5 py-4 transition hover:-translate-y-1 hover:border-[#ffc000] hover:bg-[#fcc000]/10"
            >
              <div className="text-base font-semibold text-white">{item.label}</div>
              {item.description ? <p className="mt-1 text-sm text-white/55">{item.description}</p> : null}
            </Link>
          ))}
        </div>
      </section>

      {region === "northern-tours" ? (
        <section
          id="by-air"
          className="relative mt-10 overflow-hidden rounded-[2rem] border border-[#fcc000]/20 bg-[#141414] p-6 text-white shadow-[0_24px_70px_rgba(11,11,11,0.16)] md:p-8"
          aria-labelledby="northern-by-air-heading"
        >
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-[#fcc000]">Northern Tours</p>
              <h2 id="northern-by-air-heading" className="mt-3 font-serif text-3xl text-white">
                Northern by Air Tours
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
                Choose a Skardu air-tour package and ask our team for current itinerary, dates, and availability.
              </p>
            </div>
          </div>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {northernAirTours.map((tour) => (
              <li key={tour.id} className="overflow-hidden rounded-[1.5rem] border border-[#d4b34d]/35 bg-[#fff2d5] p-4 text-stone-900 shadow-[0_18px_42px_rgba(50,40,10,0.1)] sm:p-5">
                <Link href={getNorthernAirTourPath(tour.id)} className="group/tour block">
                  <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-xl bg-[#f1e5c8]">
                    <Image
                      src={tour.image}
                      alt={`${tour.title} tour scenery`}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition duration-500"
                    />
                  </div>
                  <span className="flex items-center justify-between gap-3">
                    <span className="font-serif text-2xl leading-tight text-stone-900 sm:text-3xl">{tour.title}</span>
                    <span aria-hidden="true" className="shrink-0 text-xs font-semibold uppercase tracking-[0.12em] text-[#806000]">
                      ↗
                    </span>
                  </span>
                  <span className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#fcc000] px-5 text-sm font-semibold uppercase tracking-[0.14em] text-black transition group-hover/tour:bg-[#ffda4d]">
                    View Details
                  </span>
                </Link>
                <details className="group">
                  <summary className="mt-4 flex cursor-pointer list-none items-center justify-between gap-3 border-t border-stone-300 pt-4 [&::-webkit-details-marker]:hidden">
                    <span className="text-sm font-medium text-stone-700">Day-by-day itinerary</span>
                    <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.12em] text-[#fcc000] group-open:hidden">
                      View itinerary +
                    </span>
                    <span className="hidden shrink-0 text-xs font-semibold uppercase tracking-[0.12em] text-[#fcc000] group-open:inline">
                      Hide itinerary −
                    </span>
                  </summary>
                  <ol className="mt-4 space-y-3 border-t border-stone-300 pt-4">
                    {tour.itinerary.map((day) => (
                      <li key={day.day} className="grid gap-1 sm:grid-cols-[5rem_1fr] sm:gap-3">
                        <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#806000]">
                          Day {day.day}
                        </span>
                        <div>
                          <h3 className="text-sm font-semibold text-stone-900">{day.title}</h3>
                          <p className="mt-1 text-sm leading-6 text-stone-600">{day.description}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <a
                    href={whatsappUrl(`Hi Hodophile, I am interested in the ${tour.title} package. Please confirm the itinerary, current dates, and availability.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex min-h-10 items-center rounded-full bg-[#fcc000] px-4 text-xs font-semibold uppercase tracking-[0.1em] text-black transition hover:bg-[#ffda4d]"
                  >
                    Ask about this tour
                  </a>
                </details>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section
        id={isNorthernToursPage ? "by-road" : undefined}
        className="relative mt-10 scroll-mt-24 overflow-hidden rounded-[2rem] bg-[#0b0b0b] p-6 text-white shadow-[0_24px_70px_rgba(11,11,11,0.16)] md:p-8"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-[#fcc000]/20" />
        <div className="relative flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[#fcc000]">
              {isNorthernToursPage ? "Northern Tours · By Road" : "Journeys"}
            </p>
            <h2 className="mt-3 font-serif text-3xl text-white">
              {isNorthernToursPage ? "Northern by Road Tours" : `${roadPackages.length} ${group.label} journeys.`}
            </h2>
          </div>
          <Link href="/tours" className="text-sm font-semibold text-white/65 transition hover:text-[#fcc000]">View all journeys ↗</Link>
        </div>

        <div className="relative mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {roadPackages.map((item) => (
            <JourneyCard
              key={item.id}
              href={`/packages/${item.id}`}
              image={item.image}
              imageAlt={item.title}
              eyebrow={item.duration}
              title={item.title}
              imageHeight="aspect-[16/10]"
              bodyClassName="p-5"
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4 text-sm">
                <span className="text-stone-500">From</span>
                <span className="font-semibold text-[#806000]">{item.priceOnRequest ? "Price on request" : `PKR ${item.pricePerPerson.toLocaleString()}`}</span>
              </div>
              <span className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-[#fcc000] px-5 text-sm font-semibold text-black transition group-hover:bg-[#ffda4d]">
                Explore package ↗
              </span>
            </JourneyCard>
          ))}
        </div>
      </section>
    </PageShell>
  );
}