import type { Metadata } from "next";
import Image from "next/image";

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
              className="group overflow-hidden rounded-[2rem] border border-black/10 bg-white/90 shadow-[0_24px_45px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(15,23,42,0.12)]"
            >
              <a href={`/destinations/${slug}`} className="block">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover object-center transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-[#fcc000]/80">{destination.season}</p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-stone-950">{destination.name}</h2>
                  <p className="mt-3 text-sm leading-7 text-stone-600">{destination.description}</p>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 pt-4 text-sm text-stone-700">
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
