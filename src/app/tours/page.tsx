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
    <PageShell wide>
      <PageHeroImage
        image="/images/editorial/editorial-8.jpg"
        imageAlt="Scenic tour route"
        eyebrow="Tours and Packages"
        title="Domestic Pakistan packages built for clear comparisons and stronger search visibility."
        description="Browse grouped routes and destination-first package pages designed for smooth planning and confident booking."
      />

      <section className="mt-12 grid gap-6 lg:grid-cols-3 mx-auto max-w-[96rem] px-6 lg:px-8 xl:px-10">
        {featuredPackages.map((trip) => (
          <article
            key={trip.name}
            className="flex h-full flex-col rounded-[2rem] border border-black/10 bg-white/90 p-6 shadow-[0_24px_45px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(15,23,42,0.12)]"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-[#fcc000]/75">{trip.duration}</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-stone-950">{trip.name}</h2>
            <p className="mt-3 text-sm leading-7 text-stone-600">{trip.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {trip.highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#fcc000]/30 bg-[#fff6d2] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6800]"
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
