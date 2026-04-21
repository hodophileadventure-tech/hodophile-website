import type { Metadata } from "next";

import { PageHeroImage } from "@/components/page-hero-image";
import { PageShell } from "@/components/page-shell";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Trip Inquiry",
  description:
    "A dedicated inquiry page for domestic Pakistan tour requests, itinerary planning, and lead generation.",
  alternates: {
    canonical: "/inquiry",
  },
  openGraph: {
    title: "Trip Inquiry",
    description:
      "A dedicated inquiry form for Pakistan travel leads and future booking workflows.",
    url: absoluteUrl("/inquiry"),
  },
};

export default function InquiryPage() {
  return (
    <PageShell>
      <PageHeroImage
        image="/images/editorial/editorial-6.jpg"
        imageAlt="Travelers in scenic valley"
        eyebrow="Trip Inquiry"
        title="Collect the details you need before turning a lead into a polished trip plan."
        description="This page gives you a direct inquiry route for family trips, group tours, and private domestic Pakistan itineraries."
      />

      <form className="mt-12 grid gap-4 rounded-[2rem] border border-black/10 bg-white/80 p-6 backdrop-blur lg:grid-cols-2">
        <label className="grid gap-2 text-sm text-stone-700">
          Full name
          <input className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-stone-900 outline-none placeholder:text-stone-500 focus:border-[#fcc000]/50" type="text" placeholder="Traveler name" />
        </label>
        <label className="grid gap-2 text-sm text-stone-700">
          WhatsApp number
          <input className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-stone-900 outline-none placeholder:text-stone-500 focus:border-[#fcc000]/50" type="tel" placeholder="+92 ..." />
        </label>
        <label className="grid gap-2 text-sm text-stone-700">
          Destination
          <select className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-stone-900 outline-none focus:border-[#fcc000]/50">
            <option>Hunza</option>
            <option>Skardu</option>
            <option>Murree</option>
            <option>Naran Kaghan</option>
            <option>Swat</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm text-stone-700">
          Travel month
          <input className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-stone-900 outline-none placeholder:text-stone-500 focus:border-[#fcc000]/50" type="text" placeholder="June 2026" />
        </label>
        <label className="grid gap-2 text-sm text-stone-700 lg:col-span-2">
          Notes
          <textarea className="min-h-40 rounded-2xl border border-black/10 bg-white px-4 py-3 text-stone-900 outline-none placeholder:text-stone-500 focus:border-[#fcc000]/50" placeholder="Tell us about your group size, hotel preference, and budget." />
        </label>
        <button
          type="submit"
          className="inline-flex rounded-full border border-[#fcc000]/40 bg-[#fcc000] px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 lg:col-span-2 lg:w-fit"
        >
          Request a plan
        </button>
      </form>
    </PageShell>
  );
}
