import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHeroImage } from "@/components/page-hero-image";
import { PageShell } from "@/components/page-shell";
import { featuredTourCards } from "@/lib/data/featured-tour-cards";
import { absoluteUrl, tourMenu, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pakistan Tour Packages",
  description:
    "Browse domestic Pakistan tour packages for Hunza, Skardu, Murree, and more with clear SEO-friendly service pages.",
  alternates: {
    canonical: "/tours",
  },
  openGraph: {
    title: "Pakistan Tour Packages",
    description:
      "Domestic packages for families, couples, and groups traveling across Pakistan.",
    url: absoluteUrl("/tours"),
  },
};

export default function ToursPage() {
  return (
    <PageShell wide>
      <PageHeroImage
        image="/images/editorial/editorial-8.jpg"
        imageAlt="Scenic tour route"
        eyebrow="Tours and Packages"
        title="Domestic Pakistan packages built for clear comparisons and stronger search visibility."
        description="Browse grouped routes and destination-first package pages designed for smooth planning and confident booking."
      />

      <section className="mt-12" aria-labelledby="signature-journeys-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Signature journeys</p>
            <h2 id="signature-journeys-heading" className="mt-3 font-serif text-4xl text-stone-950">Compare real routes at a glance.</h2>
          </div>
          <Link href="/make-my-trip" className="text-sm font-semibold text-stone-700 transition hover:text-stone-950">Need a custom route? ↗</Link>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredTourCards.map((tour) => (
            <article key={tour.slug} className="group flex h-full flex-col overflow-hidden border border-stone-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-[#fcc000]/70">
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <Image src={tour.homeImage} alt={tour.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute left-4 top-4 bg-[#fcc000] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-black">{tour.duration}</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-2xl font-semibold leading-tight text-stone-950">{tour.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-stone-600">{tour.summary}</p>
                <div className="mt-5 flex items-end justify-between gap-4 border-t border-stone-200 pt-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">From</p>
                    <p className="mt-1 text-lg font-semibold text-stone-950">{tour.priceFrom ?? "Contact for pricing"}</p>
                  </div>
                  <Link href={`/tours/featured/${tour.slug}`} className="text-sm font-bold uppercase tracking-[0.12em] text-stone-950 transition hover:text-[#9a7600]">View journey ↗</Link>
                </div>
                <a href={whatsappUrl(`Hi Hodophile, I'm interested in ${tour.title}. Please share availability and booking details.`)} target="_blank" rel="noopener noreferrer" className="mt-4 text-sm font-semibold text-[#557a63] hover:text-[#31563f]">Ask an expert on WhatsApp</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-[2rem] border border-stone-200 bg-white p-7 shadow-sm">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Tour Menu</p>
            <h2 className="mt-3 font-serif text-3xl">Browse by tour group and package.</h2>
          </div>
          <Link href="/make-my-trip" className="text-sm font-medium text-stone-700 transition hover:text-stone-900">
            Need custom route?
          </Link>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-2">
          {tourMenu.map((group) => (
            <article key={group.href} className="rounded-[1.75rem] border border-stone-200 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(15,23,42,0.1)]">
              <Link href={group.href} className="text-lg font-semibold text-stone-950 transition hover:text-[#0b0b0b]">
                {group.label}
              </Link>
              <div className="mt-5 grid gap-3">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-[1.5rem] border border-stone-200 bg-[#fffdf7] px-4 py-3 text-sm font-medium text-stone-700 transition hover:border-[#ffc000]/60 hover:bg-[#fff8e5]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
