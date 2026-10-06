import type { Metadata } from "next";
import Image from "next/image";

import { PageShell } from "@/components/page-shell";
import { absoluteUrl } from "@/lib/site";
import { MakeMyTripForm } from "@/components/make-my-trip-form";
import { TripMakerRecommendations } from "@/components/trip-maker-recommendations";

export const metadata: Metadata = {
  title: "Make My Trip",
  description:
    "A trip request page for domestic Pakistan itineraries, route selection, and travel planning.",
  alternates: {
    canonical: "/make-my-trip",
  },
  openGraph: {
    title: "Make My Trip",
    description: "Submit your travel details and request a custom domestic Pakistan plan.",
    url: absoluteUrl("/make-my-trip"),
  },
};

export default function MakeMyTripPage() {
  return (
    <PageShell wide noTopPadding mainClassName="overflow-x-clip !px-0">
      <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#0b0b0b] text-white">
        <div className="relative min-h-[25rem] sm:min-h-[29rem]">
          <Image
            src="/images/package-cards/images__editorial__make-my-trip-bg.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.76)_0%,rgba(0,0,0,0.44)_58%,rgba(0,0,0,0.12)_100%)]" />
          <div className="relative mx-auto flex min-h-[25rem] w-full max-w-[96rem] items-end px-5 pb-12 pt-20 sm:min-h-[29rem] sm:px-8 sm:pb-16 lg:px-14">
            <div className="max-w-4xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#ffd84d]">Hodophile Adventures · Pakistan</p>
              <h1 className="mt-4 max-w-4xl font-serif text-5xl font-normal leading-[0.98] sm:text-6xl lg:text-7xl">Your journey, designed around you.</h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
                Start with the feeling, shape the route, and refine every detail with local travel expertise.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-[96rem] space-y-12 px-4 pb-12 pt-8 sm:px-6 lg:px-10 lg:pt-12 xl:px-14">
        <TripMakerRecommendations />
        <MakeMyTripForm />
      </div>
    </PageShell>
  );
}