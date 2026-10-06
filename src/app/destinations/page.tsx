import type { Metadata } from "next";
import Image from "next/image";

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
        {destinations.map((destination) => {
          return (
            <article
              key={destination.name}
              className="group overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-[0_16px_36px_rgba(55,55,48,0.06)] transition hover:-translate-y-1 hover:border-[#d9a407]/60 hover:shadow-[0_22px_48px_rgba(55,55,48,0.1)]"
            >
              <a href={`/destinations/${destination.slug}`} className="block">
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
                  <p className="text-sm uppercase tracking-[0.3em] text-[#8b6b00]">Best time to visit: {destination.season}</p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-stone-950">{destination.name}</h2>
                  <p className="mt-3 text-sm leading-7 text-stone-600">{destination.description}</p>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 pt-4 text-sm text-stone-700">
                    {destination.duration ? <span>Ideal duration: {destination.duration}</span> : null}
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
