import Image from "next/image";
import type { Metadata } from "next";

import { PageHeroImage } from "@/components/page-hero-image";
import { PageShell } from "@/components/page-shell";
import { absoluteUrl } from "@/lib/site";

const galleryImages = Array.from({ length: 136 }, (_, index) => {
  const photoNumber = String(index + 1).padStart(3, "0");

  return {
    src: `/images/gallery/gallery-${photoNumber}.webp`,
    alt: `Pakistan travel gallery photo ${photoNumber}`,
    caption: `Gallery photo ${photoNumber}`,
  };
});

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A visual gallery of the domestic Pakistan destinations featured across the Hodophile site.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Gallery",
    description: "A gallery of Pakistan travel destinations and scenic route imagery.",
    url: absoluteUrl("/gallery"),
  },
};

export default function GalleryPage() {
  return (
    <PageShell wide noTopPadding>
      <PageHeroImage
        image="/images/package-cards/images__editorial__editorial-2.webp"
        imageAlt="Panoramic destination view"
        eyebrow="Gallery"
        title="Scenic Pakistan destinations presented through cinematic visual storytelling."
        description="A curated gallery of destination moments used throughout the Hodophile travel experience."
      />

      <section className="site-section-gap grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {galleryImages.map((image) => (
          <article key={image.src} className="group overflow-hidden rounded-[2rem] border border-black/10 bg-white/95 shadow-[0_22px_50px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(15,23,42,0.12)]">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#fcc000]/75">
                {image.caption}
              </p>
              <div className="mt-3 h-1.5 w-20 rounded-full bg-[#fcc000]/40" />
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}