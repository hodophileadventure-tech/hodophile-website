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
    <PageShell>
      <PageHeroImage
        image="/images/editorial/editorial-3.jpg"
        imageAlt="Scenic mountains at sunset"
        eyebrow="Contact Us"
        title="Share your destination and we will shape the route around your travel goals."
        description="Connect with our planning team for domestic Pakistan departures, route suggestions, and tailored itinerary support."
      />

      <section className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] mx-auto max-w-7xl px-6 lg:px-8">
        <div className="space-y-6">
          <h2 className="max-w-2xl font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Speak with a travel advisor.
          </h2>
          <div className="space-y-4 text-sm text-stone-600">
            <p>{siteConfig.email}</p>
            <p>{siteConfig.phone}</p>
            <p>{siteConfig.location}</p>
          </div>
        </div>

        <ContactForm />
      </section>
    </PageShell>
  );
}