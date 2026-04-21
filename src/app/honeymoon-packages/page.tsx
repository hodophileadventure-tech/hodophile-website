import type { Metadata } from "next";

import { PageHeroImage } from "@/components/page-hero-image";
import { PageShell } from "@/components/page-shell";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Honeymoon Packages",
  description:
    "Explore curated honeymoon packages across Pakistan with private stays, scenic routes, and premium itinerary support.",
  alternates: {
    canonical: "/honeymoon-packages",
  },
  openGraph: {
    title: "Honeymoon Packages",
    description:
      "Romantic domestic Pakistan itineraries designed for comfort, privacy, and memorable destinations.",
    url: absoluteUrl("/honeymoon-packages"),
  },
};

const honeymoonPackages = [
  {
    name: "Hunza Honeymoon Escape",
    duration: "5 Days / 4 Nights",
    detail: "Private scenic stays, sunset viewpoints, and curated mountain experiences.",
  },
  {
    name: "Skardu Couple Retreat",
    duration: "6 Days / 5 Nights",
    detail: "Alpine lakes, boutique accommodation, and smooth route planning for couples.",
  },
  {
    name: "Kashmir Romantic Getaway",
    duration: "4 Days / 3 Nights",
    detail: "Calm valley landscapes, relaxed pacing, and premium couple-friendly experiences.",
  },
];

export default function HoneymoonPackagesPage() {
  return (
    <PageShell>
      <PageHeroImage
        image="/images/editorial/editorial-2.jpg"
        imageAlt="Romantic valley getaway"
        eyebrow="Honeymoon Packages"
        title="Curated honeymoon journeys for scenic, private, and memorable travel."
        description="Choose from premium domestic routes in Pakistan and let us craft an elegant honeymoon itinerary around your preferred pace."
      />

      <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {honeymoonPackages.map((item) => (
          <article
            key={item.name}
            className="rounded-[2rem] border border-black/10 bg-white/85 p-6 shadow-sm backdrop-blur"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[#fcc000]">{item.duration}</p>
            <h2 className="mt-3 text-2xl font-semibold text-stone-900">{item.name}</h2>
            <p className="mt-3 text-sm leading-7 text-stone-600">{item.detail}</p>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
