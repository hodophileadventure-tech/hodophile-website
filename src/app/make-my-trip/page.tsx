import type { Metadata } from "next";

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
    <main className="min-h-screen overflow-x-clip bg-[#f4f1eb]">
      <MakeMyTripForm />
    </main>
  );
}