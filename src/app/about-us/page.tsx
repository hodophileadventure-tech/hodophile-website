import type { Metadata } from "next";

import { PageHeroImage } from "@/components/page-hero-image";
import { PageShell } from "@/components/page-shell";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn how Hodophile Adventures plans domestic Pakistan trips with route-first itineraries, private transport, and hotel coordination.",
  alternates: {
    canonical: "/about-us",
  },
  openGraph: {
    title: "About Us",
    description:
      "A Pakistan travel brand focused on Hunza, Skardu, Naran, Kashmir, Swat, Murree, Shogran, Nathia Gali, and Astore.",
    url: absoluteUrl("/about-us"),
  },
};

export default function AboutUsPage() {
  return (
    <PageShell wide>
      <PageHeroImage
        image="/images/editorial/editorial-1.jpg"
        imageAlt="Scenic northern mountains"
        eyebrow="About Us"
        title="Route-first Pakistan travel planning for families, couples, and private groups."
        description={`${siteConfig.name} designs domestic trips with clear routes, hotel coordination, private transport, and day-by-day planning for northern Pakistan.`}
      />

      <section className="mt-12 grid gap-8 lg:grid-cols-[1.08fr_.92fr] lg:items-start mx-auto max-w-[96rem] px-6 lg:px-8 xl:px-10">
        <div className="space-y-6">
          <h2 className="max-w-3xl font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            We plan the route, the stay, and the details so your trip feels organized from the start.
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-stone-600">
            Hodophile Adventures focuses on domestic Pakistan travel with a practical planning style: the right route, the right vehicle, and the right hotel choices for the cities you want to visit.
          </p>
          <p className="max-w-2xl text-lg leading-8 text-stone-600">
            Our trips are built around popular northern destinations such as Hunza, Skardu, Naran, Astore, Fairy Meadows, Kashmir, Swat, Murree, Nathia Gali, and Shogran. That means travelers get a cleaner booking experience, clearer route guidance, and better trip planning for families and groups.
          </p>
        </div>

        <div className="rounded-[2rem] border-4 border-[#fcc000] bg-white/80 p-6 shadow-sm backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-[#fcc000]/80">What we handle</p>
          <div className="mt-4 grid gap-4 text-sm text-stone-600">
            <div className="rounded-2xl border-4 border-[#fcc000] bg-white p-4">
              <span className="font-semibold text-stone-900">Route planning:</span> Pakistan tour combinations, trip lengths, and destination order.
            </div>
            <div className="rounded-2xl border-4 border-[#fcc000] bg-white p-4">
              <span className="font-semibold text-stone-900">Transport:</span> private cars, SUVs, cabins, and coaster options based on group size.
            </div>
            <div className="rounded-2xl border-4 border-[#fcc000] bg-white p-4">
              <span className="font-semibold text-stone-900">Hotels and stays:</span> city-wise hotel selection and room planning for each stop.
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 mx-auto max-w-[96rem] px-6 lg:px-8 xl:px-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border-4 border-[#fcc000] bg-white/80 p-6 text-stone-700">
            <div className="mb-4 h-2 w-16 rounded-full bg-[#fcc000]" />
            <h3 className="text-lg font-semibold text-stone-900">Who we serve</h3>
            <p className="mt-3 text-sm leading-6">
              Families, honeymoon travelers, groups of friends, and corporate guests who want a smoother domestic travel experience across Pakistan.
            </p>
          </div>
          <div className="rounded-3xl border-4 border-[#fcc000] bg-white/80 p-6 text-stone-700">
            <div className="mb-4 h-2 w-16 rounded-full bg-[#fcc000]" />
            <h3 className="text-lg font-semibold text-stone-900">How we work</h3>
            <p className="mt-3 text-sm leading-6">
              We guide travelers from destination selection to quotation, hotel matching, transport selection, and final itinerary confirmation.
            </p>
          </div>
          <div className="rounded-3xl border-4 border-[#fcc000] bg-white/80 p-6 text-stone-700">
            <div className="mb-4 h-2 w-16 rounded-full bg-[#fcc000]" />
            <h3 className="text-lg font-semibold text-stone-900">Why it helps</h3>
            <p className="mt-3 text-sm leading-6">
              Clear route rules, better pricing transparency, and a booking flow that makes Pakistan road trips easier to compare and plan.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16 mx-auto max-w-[96rem] px-6 lg:px-8 xl:px-10 pb-6">
        <div className="rounded-[2rem] border-4 border-[#fcc000] bg-white/80 p-8">
          <h2 className="font-serif text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
            Built for the way people travel in Pakistan
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-stone-600">
            Our approach is simple: keep the journey clear, keep the package relevant, and keep the traveler informed. Whether it is a Hunza summer plan, a Skardu family trip, or a shorter mountain escape to Murree or Nathia Gali, we structure the experience around real routes and practical travel needs.
          </p>
        </div>
      </section>
    </PageShell>
  );
}