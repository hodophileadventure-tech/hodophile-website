import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JourneyCard } from "@/components/journey-card";
import { PageShell } from "@/components/page-shell";
import { TourLanding } from "@/components/tour-landing";
import { getTourPackagesForRegion } from "@/lib/data/tour-packages";
import { absoluteUrl, destinations, tourMenu } from "@/lib/site";

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

      <section className="mt-12 rounded-[2.5rem] bg-[#0b0b0b] p-6 text-white shadow-[0_30px_90px_rgba(11,11,11,0.16)] md:p-8">
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

      <section className="relative mt-10 overflow-hidden rounded-[2rem] bg-[#0b0b0b] p-6 text-white shadow-[0_24px_70px_rgba(11,11,11,0.16)] md:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-[#fcc000]/20" />
        <div className="relative flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[#fcc000]">Journeys</p>
            <h2 className="mt-3 font-serif text-3xl text-white">{regionalPackages.length} {group.label} journeys.</h2>
          </div>
          <Link href="/tours" className="text-sm font-semibold text-white/65 transition hover:text-[#fcc000]">View all journeys ↗</Link>
        </div>

        <div className="relative mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {regionalPackages.map((item) => (
            <JourneyCard
              key={item.id}
              href={`/packages/${item.id}`}
              image={item.image}
              imageAlt={item.title}
              eyebrow={item.duration}
              title={item.title}
              imageHeight="aspect-square"
              bodyClassName="p-5"
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4 text-sm">
                <span className="text-white/55">From</span>
                <span className="font-semibold text-[#fcc000]">{item.priceOnRequest ? "Price on request" : `PKR ${item.pricePerPerson.toLocaleString()}`}</span>
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