import type { Metadata } from "next";

import { PageHeroImage } from "@/components/page-hero-image";
import { PageShell } from "@/components/page-shell";
import { JourneyCard } from "@/components/journey-card";
import { absoluteUrl } from "@/lib/site";
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
    image: "/images/package-cards/images__honeymoon__swat-valley-deluxe.webp",
  },
  {
    slug: "naran-babusar-4days",
    name: "Naran & Babusar — 4 Days",
    duration: "4 Days / 3 Nights",
    detail: "Kaghan Valley highlights: Saif-ul-Malook, Lulusar, and Babusar Top.",
    price: "PKR 120,000",
    image: "/images/package-cards/images__honeymoon__naran-babusar.webp",
  },
  {
    slug: "kashmir-arangkel-5days",
    name: "Kashmir Arang Kel — 5 Days",
    duration: "5 Days / 4 Nights",
    detail: "Neelum Valley route to Kel and the hill-meadow of Arang Kel.",
    price: "PKR 150,000",
    image: "/images/package-cards/images__honeymoon__ratti-gali-lake.webp",
  },
  ...Object.values(additionalHoneymoonPackages),
];

export default function HoneymoonPackagesPage() {
  return (
    <PageShell wide>
      <PageHeroImage
        image="/images/package-cards/images__honeymoon__hero.webp"
        imageAlt="Honeymoon header"
        videoSrc="/videos/honeymoon-hero.mp4"
        eyebrow="Honeymoon Packages"
        title="Curated honeymoon journeys for scenic, private, and memorable travel."
        description="Choose from premium domestic routes in Pakistan and let us craft an elegant honeymoon itinerary around your preferred pace."
      />

      <section className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {honeymoonPackages.map((item) => (
          <JourneyCard
            key={item.slug}
            href={`/honeymoon-packages/${item.slug}`}
            image={item.image}
            imageAlt={item.name}
            imageHeight="h-[18rem] sm:h-[20rem]"
            badge={item.duration}
            title={item.name}
            bodyClassName="p-5 sm:p-6"
          >
            <p className="flex-1 text-sm leading-6 text-white/75">{item.detail}</p>
            <div className="mt-5 flex items-end justify-between gap-4 border-t border-white/15 pt-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">From</p>
                <p className="mt-1 text-xl font-semibold text-[#fcc000]">{item.price ?? "Contact us"}</p>
              </div>
              <span className="text-sm font-bold uppercase tracking-[0.12em] text-white transition group-hover:text-[#fcc000]">
                View journey ↗
              </span>
            </div>
          </JourneyCard>
        ))}
      </section>
    </PageShell>
  );
}
