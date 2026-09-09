import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import { absoluteUrl } from "@/lib/site";
import { getTourPackagesForDestination } from "@/lib/data/tour-packages";

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
  khaplu: {
    name: "Khaplu",
    description: "A quiet Baltistan valley of historic forts, wide mountain views, and peaceful cultural routes.",
    images: [{ src: "/images/destinations/featured-skardu-basho.jpg", alt: "Khaplu mountain landscape" }],
    highlights: ["Khaplu Palace", "Baltistan culture", "Mountain views", "Quiet routes"],
  },
  shogran: {
    name: "Shogran",
    description: "A cool forested hill retreat with meadow views and an easy escape into the Kaghan Valley.",
    images: [{ src: "/images/destinations/naran.jpg", alt: "Shogran valley landscape" }],
    highlights: ["Forest trails", "Siri Paye", "Meadow views", "Kaghan Valley"],
  },
  ormara: {
    name: "Ormara",
    description: "A relaxed Makran coast escape for beachside camping, open sea views, and slow weekend travel.",
    images: [{ src: "/images/editorial/editorial-4.jpg", alt: "Ormara coastal escape" }],
    highlights: ["Beach camping", "Makran coast", "Sea views", "Weekend escape"],
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

  const packages = getTourPackagesForDestination(slug);

  return (
    <PageShell wide>
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

      {packages.length > 0 && (
        <section className="relative mt-20 overflow-hidden rounded-[2rem] bg-[#0b0b0b] px-5 py-8 text-white shadow-[0_28px_70px_rgba(11,11,11,0.16)] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <div className="pointer-events-none absolute right-[-5rem] top-[-7rem] h-64 w-64 rounded-full border border-[#fcc000]/20" />
          <div className="pointer-events-none absolute right-8 top-8 h-24 w-24 rounded-full border border-[#fcc000]/10" />

          <div className="relative flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#fcc000]">Curated departures</p>
              <h2 className="mt-4 max-w-xl font-serif text-3xl font-normal leading-tight sm:text-4xl">{destination.name} journeys, thoughtfully arranged.</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">Choose a considered route with transparent pricing, carefully planned transport, and the freedom to travel at your own pace.</p>
            </div>
            <p className="shrink-0 text-xs uppercase tracking-[0.2em] text-white/45">{packages.length} {packages.length === 1 ? "route" : "routes"} available</p>
          </div>

          <div className="relative mt-8 grid gap-5 md:grid-cols-2">
            {packages.map((tourPackage) => (
              <article key={tourPackage.id} className="group rounded-2xl border border-white/10 bg-white/[0.06] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#fcc000]/50 hover:bg-white/[0.09] sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-5 border-b border-white/10 pb-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fcc000]">{tourPackage.duration}</p>
                    <h3 className="mt-3 max-w-sm font-serif text-2xl font-normal leading-tight text-white">{tourPackage.title}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-[0.65rem] uppercase tracking-[0.18em] text-white/45">From</p>
                    <p className="mt-1 text-xl font-semibold text-[#fcc000]">PKR {tourPackage.pricePerPerson.toLocaleString()}</p>
                    <p className="text-xs text-white/45">per person</p>
                    {tourPackage.couplePrice && <p className="mt-2 text-xs text-white/60">PKR {tourPackage.couplePrice.toLocaleString()} / couple</p>}
                  </div>
                </div>
                <div className="mt-5 space-y-3 text-sm leading-6 text-white/65">
                  {tourPackage.departure && <p><span className="mr-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/40">Departure</span>{tourPackage.departure}</p>}
                  {tourPackage.transport && <p><span className="mr-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/40">Transport</span>{tourPackage.transport.join("; ")}</p>}
                  {tourPackage.includes && <p><span className="mr-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/40">Includes</span>{tourPackage.includes.join("; ")}</p>}
                  {tourPackage.excludes && <p><span className="mr-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/40">Excludes</span>{tourPackage.excludes.join("; ")}</p>}
                </div>
                {tourPackage.notes?.map((note) => <p key={note} className="mt-5 border-t border-white/10 pt-4 text-xs leading-6 text-white/45">{note}</p>)}
              </article>
            ))}
          </div>
        </section>
      )}

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
