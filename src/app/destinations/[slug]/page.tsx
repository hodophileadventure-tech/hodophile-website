import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import { absoluteUrl } from "@/lib/site";

type DestinationPageProps = {
  params: Promise<{ slug: string }>;
};

const destinationGalleries = {
  hunza: {
    name: "Hunza",
    description: "Terraced valleys, dramatic peaks, and scenic stays. Experience the magic of Hunza's alpine beauty.",
    images: [
      { src: "/images/destinations/hunza.avif", alt: "Hunza Valley" },
      { src: "/images/destinations/featured-hunza-naltar.jpg", alt: "Hunza Naltar" },
    ],
    highlights: ["Terraced valleys", "Dramatic peaks", "Alpine beauty", "Scenic stays"],
  },
  skardu: {
    name: "Skardu",
    description: "Lakes, forts, and wide alpine views. A premium destination for northern adventures.",
    images: [
      { src: "/images/destinations/skardu.jpg", alt: "Skardu" },
      { src: "/images/destinations/featured-skardu-basho.jpg", alt: "Skardu Basho" },
      { src: "/images/destinations/featured-skardu-hunza.jpg", alt: "Skardu Hunza" },
    ],
    highlights: ["Alpine lakes", "Historic forts", "Mountain views", "Premium routes"],
  },
  naran: {
    name: "Naran",
    description: "Road trips, river views, and summer escapes. Perfect for families and groups.",
    images: [
      { src: "/images/destinations/naran.jpg", alt: "Naran" },
      { src: "/images/destinations/naran-saif.jpg", alt: "Naran Saif" },
    ],
    highlights: ["River views", "Summer escapes", "Road trips", "Family-friendly"],
  },
  kashmir: {
    name: "Kashmir",
    description: "Soft valleys, clean air, and scenic routes. A calm getaway in nature.",
    images: [
      { src: "/images/destinations/kashmir.jpg", alt: "Kashmir" },
    ],
    highlights: ["Soft valleys", "Clean mountain air", "Scenic routes", "Peaceful getaway"],
  },
  swat: {
    name: "Swat",
    description: "Green hills and peaceful routes. A classic domestic Pakistan tour.",
    images: [
      { src: "/images/destinations/swat.jpg", alt: "Swat" },
      { src: "/images/destinations/featured-kalam-malam-jabba.jpg", alt: "Swat Kalam" },
    ],
    highlights: ["Green hills", "Peaceful routes", "Valley scenery", "Cultural experiences"],
  },
};

export async function generateStaticParams() {
  return Object.keys(destinationGalleries).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = destinationGalleries[slug as keyof typeof destinationGalleries];

  if (!destination) {
    return {};
  }

  return {
    title: `${destination.name} Gallery - Scenic Images`,
    description: destination.description,
    alternates: {
      canonical: `/destinations/${slug}`,
    },
    openGraph: {
      title: `${destination.name} Gallery`,
      description: destination.description,
      url: absoluteUrl(`/destinations/${slug}`),
      images: [
        {
          url: absoluteUrl(destination.images[0].src),
          width: 1200,
          height: 630,
          alt: destination.name,
        },
      ],
    },
  };
}

export default async function DestinationGalleryPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = destinationGalleries[slug as keyof typeof destinationGalleries];

  if (!destination) {
    notFound();
  }

  return (
    <PageShell>
      <section className="space-y-6">
        <div>
          <Link href="/destinations" className="text-sm font-medium text-[#ffc000] hover:text-[#ffd24d]">
            ← Back to destinations
          </Link>
          <h1 className="mt-6 font-serif text-5xl font-semibold">{destination.name}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">{destination.description}</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {destination.highlights.map((highlight) => (
            <span
              key={highlight}
              className="rounded-full border border-[#fcc000]/20 bg-[#fcc000]/10 px-3 py-1 text-sm text-[#fcc000]"
            >
              {highlight}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="mb-8 font-serif text-3xl font-semibold">Gallery</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {destination.images.map((image) => (
            <div key={image.src} className="group overflow-hidden rounded-2xl border border-stone-200 shadow-sm">
              <div className="relative aspect-square overflow-hidden bg-stone-100">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <p className="font-medium text-stone-900">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-3xl border border-stone-200 bg-stone-50 p-8">
        <h2 className="font-serif text-3xl font-semibold">Ready to visit {destination.name}?</h2>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
          Let us craft a personalized itinerary for your {destination.name} adventure. Share your dates, budget, and preferences.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/make-my-trip"
            className="inline-flex rounded-full bg-[#ffc000] px-6 py-3 text-sm font-semibold text-[#0b0b0b] transition hover:bg-[#ffd24d]"
          >
            Plan My Trip
          </Link>
          <Link
            href="/contact-us"
            className="inline-flex rounded-full border border-[#ffc000] bg-transparent px-6 py-3 text-sm font-semibold text-[#ffc000] transition hover:bg-[#ffc000]/10"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
