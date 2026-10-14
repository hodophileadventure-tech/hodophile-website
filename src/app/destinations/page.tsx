import type { Metadata } from "next";

import { JourneyCard } from "@/components/journey-card";
import { PageHeroImage } from "@/components/page-hero-image";
import { PageShell } from "@/components/page-shell";
import { absoluteUrl, destinations } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pakistan Travel Destinations",
  description:
    "Explore popular domestic destinations in Pakistan including Hunza, Skardu, Murree, Swat, and Naran Kaghan.",
  alternates: {
    canonical: "/destinations",
  },
  openGraph: {
    title: "Pakistan Travel Destinations",
    description:
      "Destination pages for Pakistan travel SEO, family trips, and custom domestic tours.",
    url: absoluteUrl("/destinations"),
  },
};

export default function DestinationsPage() {
  return (
    <PageShell wide>
      <PageHeroImage
        image="/images/package-cards/images__editorial__editorial-4.webp"
        imageAlt="Mountain valley with river"
        eyebrow="Destinations"
        title="The routes travelers search most when planning domestic Pakistan journeys."
        description="Explore destination-led pages designed for discovery, route comparison, and premium itinerary planning."
      />

      <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3 mx-auto max-w-[96rem] px-6 lg:px-8 xl:px-10">
        {destinations.map((destination) => (
            <JourneyCard
              key={destination.name}
              href={`/destinations/${destination.slug}`}
              image={destination.image}
              imageAlt={destination.name}
              imageSizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              imageHeight="h-64 sm:h-[19rem]"
              eyebrow={`Best time to visit · ${destination.season}`}
              title={destination.name}
              bodyClassName="p-6"
            >
              <p className="text-sm leading-7 text-white/75">{destination.description}</p>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-4 text-sm text-white/70">
                {destination.duration ? <span>Ideal duration: {destination.duration}</span> : null}
                {destination.priceFrom && <span className="font-semibold text-[#fcc000]">{destination.priceFrom}</span>}
              </div>
              <span className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-[#fcc000] px-5 text-sm font-semibold text-black transition group-hover:bg-[#ffda4d]">
                Explore destination
              </span>
            </JourneyCard>
          ))}
      </section>
    </PageShell>
  );
}
