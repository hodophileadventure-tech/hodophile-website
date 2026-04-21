import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import { TourLanding } from "@/components/tour-landing";
import { absoluteUrl, destinations, tourMenu } from "@/lib/site";

type RegionPageProps = {
  params: Promise<{ region: string }>;
};

function findGroupByRegion(region: string) {
  return tourMenu.find((group) => group.href.endsWith(`/${region}`));
}

function getRegionImage(region: string) {
  if (region === "southern-tours") {
    return "/images/destinations/kashmir.jpg";
  }
  return destinations[0]?.image ?? "/images/destinations/hunza.avif";
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

  return (
    <PageShell>
      <TourLanding
        eyebrow="Tour Group"
        title={group.label}
        description={`Browse premium ${group.label.toLowerCase()} designed for families, couples, students, and corporate travel across Pakistan.`}
        image={getRegionImage(region)}
        highlights={["Private transport", "Flexible pacing", "Hotel coordination", "Local support"]}
        ctaHref="/make-my-trip"
        ctaLabel="Customize This Route"
      />

      <section className="mt-12 rounded-3xl border border-stone-200 bg-white p-7 shadow-sm">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Packages</p>
            <h2 className="mt-3 font-serif text-3xl text-stone-900">Select a package to explore details.</h2>
          </div>
          <Link href="/tours" className="text-sm font-medium text-stone-700 transition hover:text-stone-900">
            Back to all tours
          </Link>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4 transition hover:border-[#ffc000] hover:bg-[#fff9e8]"
            >
              <div className="text-base font-semibold text-stone-900">{item.label}</div>
              {item.description ? <p className="mt-1 text-sm text-stone-600">{item.description}</p> : null}
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}