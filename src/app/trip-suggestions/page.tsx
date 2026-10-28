import type { Metadata } from "next";

import { TripMakerRecommendations } from "@/components/trip-maker-recommendations";
import { PageShell } from "@/components/page-shell";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Find Your Pakistan Trip",
  description:
    "Tell us your travel style, timing, budget, and destination preferences to get suggested Pakistan trips you can compare side by side.",
  alternates: {
    canonical: "/trip-suggestions",
  },
  openGraph: {
    title: "Find Your Pakistan Trip",
    description:
      "Get Pakistan trip suggestions based on your preferences, then compare your shortlist.",
    url: absoluteUrl("/trip-suggestions"),
  },
};

export default function TripSuggestionsPage() {
  return (
    <PageShell wide>
      <div className="pt-8 md:pt-10">
        <section className="mb-8 max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8b6b00]">
            Plan your Pakistan journey
          </p>
          <h1 className="mt-3 font-serif text-4xl font-normal text-stone-950 sm:text-5xl">
            Find a trip that feels like yours.
          </h1>
          <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
            Share a few preferences to see journeys that fit. Add the ones you like
            to your shortlist and compare routes, duration, and listed prices.
          </p>
        </section>
        <TripMakerRecommendations />
      </div>
    </PageShell>
  );
}
