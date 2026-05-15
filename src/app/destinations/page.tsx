import type { Metadata } from "next";

import { PageHeroImage } from "@/components/page-hero-image";
import { PageShell } from "@/components/page-shell";
import { absoluteUrl, destinationHighlights, destinations, destinationGallerySlugs } from "@/lib/site";

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
        image="/images/editorial/editorial-4.jpg"
        imageAlt="Mountain valley with river"
        eyebrow="Destinations"
        title="The routes travelers search most when planning domestic Pakistan journeys."
        description="Explore destination-led pages designed for discovery, route comparison, and premium itinerary planning."
      />

      <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3 mx-auto max-w-[96rem] px-6 lg:px-8 xl:px-10">
        {destinations.map((destination, idx) => {
          const slug = destinationGallerySlugs[idx] || destination.name.toLowerCase().replace(/\s+/g, "-");
          return (
            <article
              key={destination.name}
              className="rounded-[2rem] border border-black/10 bg-white/80 p-0 overflow-hidden shadow-sm"
            >
              <a href={`/destinations/${slug}`} className="block">
                <div className="h-44 w-full overflow-hidden bg-stone-100">
                  <img src={destination.image} alt={destination.name} className="h-full w-full object-cover" />
                </div>
                <div className="p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-[#fcc000]/75">{destination.season}</p>
                  <h2 className="mt-3 text-2xl font-semibold">{destination.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{destination.description}</p>
                  <div className="mt-4 flex items-center justify-between text-sm text-stone-700">
                    <span>{destination.duration}</span>
                    {destination.priceFrom && <span className="font-semibold text-stone-900">{destination.priceFrom}</span>}
                  </div>
                </div>
              </a>
            </article>
          );
        })}
      </section>
    </PageShell>
  );
}
