import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { absoluteUrl, siteConfig, servicePillars } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Hodophile Tours and Travels",
  description:
    "Learn how Hodophile Tours and Travels designs domestic trips across Pakistan with SEO-ready service pages and flexible planning.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Hodophile Tours and Travels",
    description:
      "A Pakistan domestic travel company focused on custom itineraries, family trips, and clear service pages.",
    url: absoluteUrl("/about"),
  },
};

export default function AboutPage() {
  return (
    <PageShell>
      <section className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-start">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-[#fcc000]/25 bg-[#fcc000]/10 px-4 py-2 text-sm font-medium text-[#fcc000]">
            About the brand
          </span>
          <h1 className="max-w-3xl font-serif text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
            A domestic travel partner built for Pakistan routes and SEO-friendly growth.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-stone-600">
            {siteConfig.name} helps travelers plan smooth domestic journeys across Pakistan.
            We focus on clear itineraries, flexible transport, strong service pages, and a site
            structure that search engines can understand.
          </p>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-2xl shadow-black/40 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-[#fcc000]/80">What we do</p>
          <div className="mt-4 grid gap-4 text-sm text-stone-600">
            <div className="rounded-2xl border border-black/10 bg-white p-4">
              Domestic tours across northern Pakistan and major city routes.
            </div>
            <div className="rounded-2xl border border-black/10 bg-white p-4">
              Hotel, transport, and itinerary coordination for families and groups.
            </div>
            <div className="rounded-2xl border border-black/10 bg-white p-4">
              Content-ready pages that support Google indexing and future SEO work.
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
