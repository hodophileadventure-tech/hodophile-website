import type { Metadata } from "next";

import { PageHeroImage } from "@/components/page-hero-image";
import { PageShell } from "@/components/page-shell";
import { absoluteUrl, destinationHighlights } from "@/lib/site";

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
    <PageShell>
      <PageHeroImage
        image="/images/editorial/editorial-4.jpg"
        imageAlt="Mountain valley with river"
        eyebrow="Destinations"
        title="The routes travelers search most when planning domestic Pakistan journeys."
        description="Explore destination-led pages designed for discovery, route comparison, and premium itinerary planning."
      />

      <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {destinationHighlights.map((destination) => (
          <article
            key={destination.name}
            className="rounded-[2rem] border border-black/10 bg-white/80 p-6 backdrop-blur"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-[#fcc000]/75">
              {destination.season}
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-stone-900">{destination.name}</h2>
            <p className="mt-3 text-sm leading-6 text-stone-600">{destination.bestFor}</p>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
