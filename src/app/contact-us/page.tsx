import type { Metadata } from "next";

import { PageHeroImage } from "@/components/page-hero-image";
import { PageShell } from "@/components/page-shell";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Hodophile Tours and Travels for domestic Pakistan trips, route planning, and quick support.",
  alternates: {
    canonical: "/contact-us",
  },
  openGraph: {
    title: "Contact Us",
    description: "A simple contact page for travel leads and itinerary requests.",
    url: absoluteUrl("/contact-us"),
  },
};

export default function ContactUsPage() {
  return (
    <PageShell>
      <PageHeroImage
        image="/images/editorial/editorial-3.jpg"
        imageAlt="Scenic mountains at sunset"
        eyebrow="Contact Us"
        title="Share your destination and we will shape the route around your travel goals."
        description="Connect with our planning team for domestic Pakistan departures, route suggestions, and tailored itinerary support."
      />

      <section className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <h2 className="max-w-2xl font-serif text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            Speak with a travel advisor.
          </h2>
          <div className="space-y-4 text-sm text-stone-600">
            <p>{siteConfig.email}</p>
            <p>{siteConfig.phone}</p>
            <p>{siteConfig.location}</p>
          </div>
        </div>

        <form className="rounded-[2rem] border border-black/10 bg-white/80 p-6 backdrop-blur">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-stone-700">
              Name
              <input className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-stone-900 outline-none ring-0 placeholder:text-stone-500 focus:border-[#fcc000]/50" type="text" placeholder="Your name" />
            </label>
            <label className="grid gap-2 text-sm text-stone-700">
              Phone
              <input className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-stone-900 outline-none ring-0 placeholder:text-stone-500 focus:border-[#fcc000]/50" type="tel" placeholder="Your phone number" />
            </label>
          </div>
          <label className="mt-4 grid gap-2 text-sm text-stone-700">
            Email
            <input className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-stone-900 outline-none ring-0 placeholder:text-stone-500 focus:border-[#fcc000]/50" type="email" placeholder="you@example.com" />
          </label>
          <label className="mt-4 grid gap-2 text-sm text-stone-700">
            Message
            <textarea className="min-h-40 rounded-2xl border border-black/10 bg-white px-4 py-3 text-stone-900 outline-none ring-0 placeholder:text-stone-500 focus:border-[#fcc000]/50" placeholder="Tell us your destination, travel dates, and number of travelers." />
          </label>
          <button
            type="submit"
            className="mt-6 inline-flex rounded-full border border-[#fcc000]/40 bg-[#fcc000] px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5"
          >
            Send inquiry
          </button>
        </form>
      </section>
    </PageShell>
  );
}