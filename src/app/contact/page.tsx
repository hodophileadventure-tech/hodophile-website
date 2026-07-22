import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { PageHeroImage } from "@/components/page-hero-image";
import { PageShell } from "@/components/page-shell";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Hodophile Tours and Travels",
  description:
    "Contact Hodophile Tours and Travels for domestic Pakistan trips, package planning, and custom itineraries.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Hodophile Tours and Travels",
    description:
      "A simple contact page for leads, inquiries, and SEO indexing.",
    url: absoluteUrl("/contact"),
  },
};

export default function ContactPage() {
  return (
    <PageShell wide>
      <PageHeroImage
        image="/images/editorial/editorial-6.jpg"
        imageAlt="Traveler using phone in mountains"
        eyebrow="Contact"
        title="Ask about routes, pricing, and custom Pakistan travel plans."
        description="Our team is ready to discuss group sizes, hotel preferences, and your ideal travel dates. Start the conversation with a quick request."
      />

      <section className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] mx-auto max-w-[96rem] px-6 lg:px-8 xl:px-10">
        <div className="space-y-6 rounded-[2rem] border border-black/10 bg-white/95 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
          <span className="inline-flex rounded-full border border-[#fcc000]/25 bg-[#fcc000]/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#8a6a12]">
            Get in touch
          </span>
          <h1 className="max-w-2xl font-serif text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
            Tell us where you want to go and we will shape the route around your travel goals.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-stone-600">
            Whether you need a short escape or a multi-city adventure, we can create a tailored domestic itinerary that fits your pace and budget.
          </p>
          <div className="grid gap-4 text-sm sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
              <p className="font-semibold text-stone-900">Email</p>
              <p className="mt-2">{siteConfig.email}</p>
            </div>
            <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
              <p className="font-semibold text-stone-900">Phone</p>
              <p className="mt-2">{siteConfig.phone}</p>
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 text-sm text-stone-600">
            <p className="font-semibold text-stone-900">Office Location</p>
            <p className="mt-2">{siteConfig.location}</p>
          </div>
        </div>

        <ContactForm />
      </section>
    </PageShell>
  );
}
