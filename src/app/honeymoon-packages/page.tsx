import type { Metadata } from "next";

import { PageHeroImage } from "@/components/page-hero-image";
import { PageShell } from "@/components/page-shell";
import { absoluteUrl } from "@/lib/site";
import Link from "next/link";
import { additionalHoneymoonPackages } from "@/lib/data/additional-honeymoon-packages";

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
    image: "/images/honeymoon/swat-valley-deluxe.webp",
  },
  {
    slug: "naran-babusar-4days",
    name: "Naran & Babusar — 4 Days",
    duration: "4 Days / 3 Nights",
    detail: "Kaghan Valley highlights: Saif-ul-Malook, Lulusar, and Babusar Top.",
    price: "PKR 120,000",
    image: "/images/honeymoon/naran-babusar.webp",
  },
  {
    slug: "kashmir-arangkel-5days",
    name: "Kashmir Arang Kel — 5 Days",
    duration: "5 Days / 4 Nights",
    detail: "Neelum Valley route to Kel and the hill-meadow of Arang Kel.",
    price: "PKR 150,000",
    image: "/images/honeymoon/ratti-gali-lake.webp",
  },
  ...Object.values(additionalHoneymoonPackages),
];

export default function HoneymoonPackagesPage() {
  return (
    <PageShell wide>
      <PageHeroImage
        image="/images/honeymoon/hero.webp"
        imageAlt="Honeymoon header"
        eyebrow="Honeymoon Packages"
        title="Curated honeymoon journeys for scenic, private, and memorable travel."
        description="Choose from premium domestic routes in Pakistan and let us craft an elegant honeymoon itinerary around your preferred pace."
      />

      <section className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {honeymoonPackages.map((item) => (
          <Link
            key={item.slug}
            href={`/honeymoon-packages/${item.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-[0_16px_40px_rgba(55,55,48,0.08)] transition duration-500 hover:-translate-y-1 hover:border-[#d4aa18] hover:shadow-[0_24px_55px_rgba(55,55,48,0.15)]"
          >
            <div className="relative aspect-[4/3] w-full overflow-visible bg-stone-200">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-contain bg-stone-100 p-0 object-center brightness-105 saturate-110 transition duration-700"
              />
              <span className="absolute left-4 top-4 bg-[#fcc000] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0b0b0b]">
                {item.duration}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <h2 className="!text-2xl font-semibold leading-tight text-stone-950">{item.name}</h2>
              <p className="mt-4 line-clamp-3 text-sm leading-6 text-stone-600">{item.detail}</p>
              <div className="mt-auto flex items-end justify-between gap-4 border-t border-stone-200 pt-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500">From</p>
                  <p className="mt-1 text-xl font-semibold text-[#9a7600]">{item.price ?? "Contact us"}</p>
                </div>
                <span className="text-sm font-bold uppercase tracking-[0.12em] text-stone-950 transition group-hover:text-[#9a7600]">View journey ↗</span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </PageShell>
  );
}
