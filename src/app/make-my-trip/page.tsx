import type { Metadata } from "next";
import Image from "next/image";

import { PageShell } from "@/components/page-shell";
import { absoluteUrl } from "@/lib/site";
import { MakeMyTripForm } from "@/components/make-my-trip-form";

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
    <PageShell wide>
      <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden py-12 min-h-[calc(100dvh-6rem)]">
        <div className="absolute inset-0">
          <Image
            src="/images/editorial/make-my-trip-bg.jpg"
            alt="Scenic Pakistan travel background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(12,12,12,0.68)_0%,rgba(12,12,12,0.42)_52%,rgba(252,192,0,0.16)_100%)]" />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100dvh-6rem)] w-full max-w-6xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8 xl:px-10">
          <div className="relative w-full rounded-[3rem] border border-white/30 bg-white/95 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.18)] backdrop-blur-lg sm:p-8 lg:p-10">
            <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(252,192,0,0.18),transparent)]" />
            <div className="relative z-10">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-xs uppercase tracking-[0.35em] text-stone-700">Plan your custom trip</p>
                <h1 className="mt-3 text-3xl font-semibold text-stone-950 sm:text-4xl">Create a premium journey across Pakistan with expert route planning.</h1>
                <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
                  Share your dates, travel style, and group details. We will tailor a route, hotels, and transport to match your ideal domestic itinerary.
                </p>
              </div>
              <div className="mt-8">
                <MakeMyTripForm />
              </div>
            </div>
          </div>
        </div>
      </section>

    </PageShell>
  );
}