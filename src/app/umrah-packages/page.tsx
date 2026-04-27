import type { Metadata } from "next";
import Image from "next/image";

import { PageHeroImage } from "@/components/page-hero-image";
import { PageShell } from "@/components/page-shell";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Umrah Packages",
  description:
    "Browse Umrah departure options from Pakistan with guided support, accommodation assistance, and itinerary coordination.",
  alternates: {
    canonical: "/umrah-packages",
  },
  openGraph: {
    title: "Umrah Packages",
    description:
      "Plan your Umrah journey from Pakistan with clear package options and responsive support.",
    url: absoluteUrl("/umrah-packages"),
  },
};

const umrahPackages = [
  {
    name: "Economy Umrah Package",
    duration: "10 Days",
    detail: "Practical departures from Pakistan with guided coordination and essential services.",
    image: "/images/umrah/masjid-e-nabvi.jpg",
  },
  {
    name: "Deluxe Umrah Package",
    duration: "12 Days",
    detail: "Comfort-focused package with upgraded stays and smoother transfer planning.",
    image: "/images/umrah/kabah-shareef.jpg",
  },
  {
    name: "Executive Umrah Package",
    duration: "14 Days",
    detail: "Premium Umrah experience with priority support and curated travel assistance.",
    image: "/images/umrah/masjid-nabvi.jpg",
  },
];

export default function UmrahPackagesPage() {
  return (
    <PageShell>
      <PageHeroImage
        image="/images/umrah/kabah.jpg"
        imageAlt="Travel planning for Umrah"
        eyebrow="Umrah Packages"
        title="Organized Umrah departures from Pakistan with clear planning and support."
        description="Compare package tiers and submit your preferred travel window for personalized Umrah assistance."
      />

      <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {umrahPackages.map((item) => (
          <article
            key={item.name}
            className="overflow-hidden rounded-[2rem] border border-black/10 bg-white/85 shadow-sm backdrop-blur"
          >
            <div className="relative h-56">
              <Image src={item.image} alt={item.name} fill sizes="(max-width: 1280px) 50vw, 33vw" className="object-cover" />
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#fcc000]">{item.duration}</p>
              <h2 className="mt-3 text-2xl font-semibold">{item.name}</h2>
              <p className="mt-3 text-sm leading-7 text-stone-600">{item.detail}</p>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
