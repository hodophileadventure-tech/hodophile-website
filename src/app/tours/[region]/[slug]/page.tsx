import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/page-shell";
import { TourLanding } from "@/components/tour-landing";
import { absoluteUrl, destinations, tourMenu } from "@/lib/site";
import { buildPageSchema } from "@/lib/seo/structured-data";

type TourPackagePageProps = {
  params: Promise<{ region: string; slug: string }>;
};

function resolveRegion(region: string) {
  return tourMenu.find((group) => group.href.endsWith(`/${region}`));
}

function resolveItem(region: string, slug: string) {
  const group = resolveRegion(region);
  if (!group) {
    return { group: null, item: null };
  }

  const item = group.items.find((entry) => entry.href.endsWith(`/${slug}`));
  return { group, item };
}

function getPackageImage(slug: string) {
  const normalized = slug.toLowerCase();
  if (normalized.includes("hunza")) return "/images/destinations/hunza-custom.webp";
  if (normalized.includes("skardu")) return "/images/destinations/skardu-1080x1920.webp";
  if (normalized.includes("astor")) return "/images/destinations/hunza-custom.webp";
  if (normalized.includes("naran") || normalized.includes("kaghan")) return "/images/destinations/naran-hd.webp";
  if (normalized.includes("swat")) return "/images/destinations/swat-hd.webp";
  if (
    normalized.includes("kashmir") ||
    normalized.includes("beach") ||
    normalized.includes("gwadar") ||
    normalized.includes("ormara") ||
    normalized.includes("charna") ||
    normalized.includes("bhit") ||
    normalized.includes("moola") ||
    normalized.includes("gorakh") ||
    normalized.includes("quetta")
  ) {
    return "/images/destinations/kashmir.webp";
  }
  return destinations[0]?.image ?? "/images/destinations/hunza.avif";
}

export async function generateStaticParams() {
  return tourMenu.flatMap((group) => {
    const region = group.href.split("/").filter(Boolean).at(-1) ?? "";
    return group.items.map((item) => ({
      region,
      slug: item.href.split("/").filter(Boolean).at(-1) ?? "",
    }));
  });
}

export async function generateMetadata({ params }: TourPackagePageProps): Promise<Metadata> {
  const { region, slug } = await params;
  const { item } = resolveItem(region, slug);

  if (!item) {
    return {};
  }

  const description = item.description ?? `${item.label} by Hodophile Adventures with curated route support.`;

  return {
    title: item.label,
    description,
    alternates: {
      canonical: item.href,
    },
    openGraph: {
      title: item.label,
      description,
      url: absoluteUrl(item.href),
    },
  };
}

export default async function TourPackagePage({ params }: TourPackagePageProps) {
  const { region, slug } = await params;
  const { group, item } = resolveItem(region, slug);

  if (!group || !item) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={buildPageSchema({
          title: item.label,
          description: item.description ?? `${item.label} by Hodophile Adventures with curated route support.`,
          url: item.href,
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Tours", url: "/tours" },
            { name: group.label, url: group.href },
            { name: item.label, url: item.href },
          ],
        })}
      />
      <PageShell wide>
        <TourLanding
          eyebrow={group.label}
          title={item.label}
          description={
            item.description ??
            `${item.label} designed for smooth travel pacing, scenic stopovers, and premium domestic route planning.`
          }
          image={getPackageImage(slug)}
          highlights={["Tailored itinerary", "Route support", "Private options", "Booking assistance"]}
          ctaHref="/make-my-trip"
          ctaLabel="Request This Package"
        />
      </PageShell>
    </>
  );
}