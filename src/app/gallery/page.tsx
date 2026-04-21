import Image from "next/image";
import type { Metadata } from "next";

import { PageHeroImage } from "@/components/page-hero-image";
import { PageShell } from "@/components/page-shell";
import { absoluteUrl } from "@/lib/site";

const galleryImages = [
  { src: "/images/destinations/skardu.jpg", alt: "Skardu landscape", caption: "Skardu" },
  { src: "/images/destinations/naran-saif.jpg", alt: "Naran landscape", caption: "Naran" },
  { src: "/images/destinations/swat.jpg", alt: "Swat landscape", caption: "Swat" },
  { src: "/images/destinations/kashmir.jpg", alt: "Kashmir landscape", caption: "Kashmir" },
  { src: "/images/editorial/editorial-3.jpg", alt: "Northern valley", caption: "Valley views" },
  { src: "/images/editorial/editorial-5.jpg", alt: "Mountain route", caption: "Scenic roads" },
  { src: "/images/editorial/editorial-6.jpg", alt: "Travel in highlands", caption: "Highland escapes" },
  { src: "/images/editorial/editorial-8.jpg", alt: "Cinematic landscape", caption: "Cinematic Pakistan" },
];

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
    <PageShell>
      <PageHeroImage
        image="/images/editorial/editorial-2.jpg"
        imageAlt="Panoramic destination view"
        eyebrow="Gallery"
        title="Scenic Pakistan destinations presented through cinematic visual storytelling."
        description="A curated gallery of destination moments used throughout the Hodophile travel experience."
      />

      <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {galleryImages.map((image) => (
          <article key={image.src} className="overflow-hidden rounded-[2rem] border border-black/10 bg-white/80 backdrop-blur">
            <div className="relative aspect-[4/3]">
              <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1280px) 50vw, 33vw" className="object-cover" />
            </div>
            <div className="p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#fcc000]/75">
                {image.caption}
              </p>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}