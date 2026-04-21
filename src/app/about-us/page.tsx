import type { Metadata } from "next";

import { PageHeroImage } from "@/components/page-hero-image";
import { PageShell } from "@/components/page-shell";
import { absoluteUrl, servicePillars, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn how Hodophile Tours and Travels plans domestic Pakistan trips with a clean, conversion-focused structure.",
  alternates: {
    canonical: "/about-us",
  },
  openGraph: {
    title: "About Us",
    description:
      "A domestic travel brand built around Pakistan routes, flexible planning, and SEO-ready pages.",
    url: absoluteUrl("/about-us"),
  },
};

export default function AboutUsPage() {
  return (
    <PageShell>
      <PageHeroImage
        image="/images/editorial/editorial-1.jpg"
        imageAlt="Scenic northern mountains"
        eyebrow="About Us"
        title="A domestic travel partner built for Pakistan routes and clearer booking journeys."
        description={`${siteConfig.name} helps travelers compare routes, plan trips, and move from idea to itinerary without a cluttered booking process.`}
      />

      <section className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-start">
        <div className="space-y-6">
          <h2 className="max-w-3xl font-serif text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            Travel planning with editorial clarity and local expertise.
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-stone-600">
            We design route-first domestic experiences that feel premium, calm, and easy to navigate for every kind of traveler.
          </p>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-sm backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-[#fcc000]/80">What we focus on</p>
          <div className="mt-4 grid gap-4 text-sm text-stone-600">
            <div className="rounded-2xl border border-black/10 bg-white p-4">
              Domestic travel across Hunza, Skardu, Murree, Naran Kaghan, Swat, and Kashmir.
            </div>
            <div className="rounded-2xl border border-black/10 bg-white p-4">
              Hotel, transport, and itinerary coordination for families, groups, and corporates.
            </div>
            <div className="rounded-2xl border border-black/10 bg-white p-4">
              Strong SEO structure so every route can later grow into a dedicated landing page.
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {servicePillars.map((pillar) => (
          <div key={pillar} className="rounded-3xl border border-black/10 bg-white/80 p-6 text-stone-700">
            <div className="mb-4 h-2 w-16 rounded-full bg-[#fcc000]" />
            <p className="text-sm leading-6">{pillar}</p>
          </div>
        ))}
      </section>
    </PageShell>
  );
}