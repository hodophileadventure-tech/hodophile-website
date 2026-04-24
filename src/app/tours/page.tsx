import type { Metadata } from "next";
import Link from "next/link";

import { PageHeroImage } from "@/components/page-hero-image";
import { PageShell } from "@/components/page-shell";
import { absoluteUrl, featuredPackages, tourMenu } from "@/lib/site";

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
    <PageShell>
      <PageHeroImage
        image="/images/editorial/editorial-8.jpg"
        imageAlt="Scenic tour route"
        eyebrow="Tours and Packages"
        title="Domestic Pakistan packages built for clear comparisons and stronger search visibility."
        description="Browse grouped routes and destination-first package pages designed for smooth planning and confident booking."
      />

      <section className="mt-12 grid gap-6 lg:grid-cols-3 mx-auto max-w-7xl px-6 lg:px-8">
        {featuredPackages.map((trip) => (
          <article
            key={trip.name}
            className="flex h-full flex-col rounded-[2rem] border border-black/10 bg-white/80 p-6 backdrop-blur"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-[#fcc000]/75">{trip.duration}</p>
            <h2 className="mt-4 text-2xl font-semibold text-stone-900">{trip.name}</h2>
            <p className="mt-3 text-sm leading-6 text-stone-600">{trip.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {trip.highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#fcc000]/20 bg-[#fcc000]/10 px-3 py-1 text-xs text-[#fcc000]"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="mt-14 rounded-[2rem] border border-stone-200 bg-white p-7 shadow-sm">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Tour Menu</p>
            <h2 className="mt-3 font-serif text-3xl text-stone-900">Browse by tour group and package.</h2>
          </div>
          <Link href="/make-my-trip" className="text-sm font-medium text-stone-700 transition hover:text-stone-900">
            Need custom route?
          </Link>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-2">
          {tourMenu.map((group) => (
            <article key={group.href} className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
              <Link href={group.href} className="text-lg font-semibold text-stone-900 transition hover:text-[#0b0b0b]">
                {group.label}
              </Link>
              <div className="mt-4 grid gap-2">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700 transition hover:border-[#ffc000] hover:bg-[#fff9e8]"
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
