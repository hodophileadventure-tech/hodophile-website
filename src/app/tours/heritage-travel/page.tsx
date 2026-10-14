import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { HeritageToursCatalog } from "@/components/travel-discovery";
import { getHeritageTourPackages } from "@/lib/data/tour-packages";
import { absoluteUrl } from "@/lib/site";

const heroImage = "/images/package-cards/images__editorial__editorial-2.webp";
const heritageGuideHref = "/blogs/cultural-heritage-spots-pakistan";

export const metadata: Metadata = {
  title: "Heritage Travel in Pakistan",
  description:
    "Discover Pakistan journeys that include historic forts, mosques, and bazaars, paired with the landscapes and local culture around them.",
  alternates: {
    canonical: "/tours/heritage-travel",
  },
  openGraph: {
    title: "Heritage Travel in Pakistan",
    description:
      "Discover Pakistan journeys that include historic forts, mosques, and bazaars, paired with the landscapes and local culture around them.",
    url: absoluteUrl("/tours/heritage-travel"),
    images: [{ url: absoluteUrl(heroImage), alt: "Mountain and river scenery in Pakistan" }],
  },
};

export default function HeritageTravelPage() {
  const heritageTours = getHeritageTourPackages();

  return (
    <PageShell wide noTopPadding>
      <div className="-mx-4 overflow-hidden md:-mx-6 lg:-mx-10 xl:-mx-14">
        <section className="relative isolate flex min-h-[min(700px,calc(100svh-var(--site-header-height)))] items-center overflow-hidden bg-[#090909] px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-14">
          <Image
            src={heroImage}
            alt="Mountain and river scenery in Pakistan"
            fill
            loading="eager"
            sizes="100vw"
            className="absolute inset-0 -z-20 object-cover object-center"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.6)_55%,rgba(0,0,0,0.26)_100%)]" />
          <div className="relative mx-auto w-full max-w-7xl">
            <nav aria-label="Breadcrumb" className="mb-10 text-xs text-white/65">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/" className="transition hover:text-[#FCC000]">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/tours" className="transition hover:text-[#FCC000]">Tours</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-white">Heritage Travel</li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.34em] text-[#FCC000]">
                <span className="h-px w-10 bg-[#FCC000]" />
                History, culture & place
              </p>
              <h1 className="mt-6 font-[var(--font-display)] text-5xl leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
                Heritage Travel
                <span className="mt-2 block text-[#FCC000]">in Pakistan</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
                Follow the stories held in historic forts, mosques, and old bazaars. These journeys pair the landmarks in our itineraries with the landscapes and communities around them.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="#heritage-tours" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#FCC000] px-6 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-[#ffda4d]">
                  Explore heritage journeys
                </Link>
                <Link href={heritageGuideHref} className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur transition hover:border-[#FCC000] hover:text-[#FCC000]">
                  Read the heritage travel guide
                </Link>
              </div>
            </div>
          </div>
        </section>

        <HeritageToursCatalog packageIds={heritageTours.map((tour) => tour.id)} />

        <section className="bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-14">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#806700]">Travel with context</p>
              <h2 className="mt-3 font-[var(--font-display)] text-3xl leading-tight text-stone-950 sm:text-4xl">
                Let the place tell its story.
              </h2>
            </div>
            <p className="text-sm leading-7 text-stone-600 sm:text-base">
              Heritage is best experienced beyond a quick stop: take time for the architecture, local markets, and the people who keep each place’s history alive. Our listed journeys include specific historic sites in their existing itineraries; they are not a broad catalogue of every northern tour.
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
