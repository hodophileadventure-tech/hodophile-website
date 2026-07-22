import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
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
    <PageShell wide>
      <PageHeroImage
        image="/images/editorial/editorial-3.jpg"
        imageAlt="Scenic mountains at sunset"
        eyebrow="Contact Us"
        title="Share your destination and we will shape the route around your travel goals."
        description="Connect with our planning team for domestic Pakistan departures, route suggestions, and tailored itinerary support."
      />

      <section className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] mx-auto max-w-[96rem] px-6 lg:px-8 xl:px-10">
        <div className="space-y-6 rounded-[2rem] border border-black/10 bg-white/95 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
          <span className="inline-flex rounded-full border border-[#fcc000]/25 bg-[#fcc000]/10 px-4 py-2 text-sm font-medium text-[#8a6a12] uppercase tracking-[0.3em]">
            Get in touch
          </span>
          <h2 className="max-w-2xl font-serif text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
            Speak with a travel advisor.
          </h2>
          <p className="max-w-2xl text-base leading-8 text-stone-600">
            Our planning team is ready to answer your route questions, suggest the best seasons, and tailor a domestic Pakistan itinerary for your group.
          </p>
          <div className="grid gap-4 text-sm text-stone-600 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
              <p className="text-sm font-semibold text-stone-900">Email</p>
              <p className="mt-2">{siteConfig.email}</p>
            </div>
            <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
              <p className="text-sm font-semibold text-stone-900">Call</p>
              <p className="mt-2">{siteConfig.phone}</p>
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 text-sm text-stone-600">
            <p className="font-semibold text-stone-900">Office</p>
            <p className="mt-2">{siteConfig.location}</p>
          </div>
        </div>

        <ContactForm />
      </section>
    </PageShell>
  );
}