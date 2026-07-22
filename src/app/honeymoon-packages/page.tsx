import type { Metadata } from "next";

import { PageHeroImage } from "@/components/page-hero-image";
import { PageShell } from "@/components/page-shell";
import { absoluteUrl } from "@/lib/site";
import Link from "next/link";

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
    slug: "swat-kalam-4days",
    name: "Swat & Kalam — 4 Days",
    duration: "4 Days / 3 Nights",
    detail: "Ushu forests, Mahodand Lake excursion, and relaxed valley pacing.",
    price: "PKR 120,000",
    image: "/images/honeymoon/swat-kalam.jpg",
  },
  {
    slug: "naran-babusar-4days",
    name: "Naran & Babusar — 4 Days",
    duration: "4 Days / 3 Nights",
    detail: "Kaghan Valley highlights: Saif-ul-Malook, Lulusar, and Babusar Top.",
    price: "PKR 120,000",
    image: "/images/honeymoon/naran-babusar.jpg",
  },
  {
    slug: "kashmir-arangkel-5days",
    name: "Kashmir Arang Kel — 5 Days",
    duration: "5 Days / 4 Nights",
    detail: "Neelum Valley route to Kel and the hill-meadow of Arang Kel.",
    price: "PKR 150,000",
    image: "/images/honeymoon/kashmir-arangkel.jpg",
  },
];

export default function HoneymoonPackagesPage() {
  return (
    <PageShell wide>
      <PageHeroImage
        image="/images/honeymoon/hero.png"
        imageAlt="Honeymoon header"
        eyebrow="Honeymoon Packages"
        title="Curated honeymoon journeys for scenic, private, and memorable travel."
        description="Choose from premium domestic routes in Pakistan and let us craft an elegant honeymoon itinerary around your preferred pace."
      />

      <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {honeymoonPackages.map((item) => (
          <Link
            key={item.slug}
            href={`/honeymoon-packages/${item.slug}`}
            className="group block rounded-[2rem] border border-black/10 bg-white/85 p-0 shadow-sm backdrop-blur overflow-hidden"
          >
            <div className="h-48 w-full overflow-hidden bg-stone-100">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="flex items-baseline justify-between">
                <p className="text-xs uppercase tracking-[0.3em] text-[#fcc000]">{item.duration}</p>
                <p className="text-sm font-semibold text-stone-900">{item.price}</p>
              </div>
              <h2 className="mt-3 text-2xl font-semibold">{item.name}</h2>
              <p className="mt-3 text-sm leading-7 text-stone-600">{item.detail}</p>
            </div>
          </Link>
        ))}
      </section>
    </PageShell>
  );
}
