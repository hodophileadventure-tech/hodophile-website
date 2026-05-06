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
            src="/images/editorial/editorial-5.jpg"
            alt="Scenic Pakistan travel background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(12,12,12,0.68)_0%,rgba(12,12,12,0.42)_52%,rgba(252,192,0,0.16)_100%)]" />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100dvh-6rem)] w-full max-w-5xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8 xl:px-10">
          <MakeMyTripForm />
        </div>
      </section>
    </PageShell>
  );
}