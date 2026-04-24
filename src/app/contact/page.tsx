import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
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
    <PageShell>
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] mx-auto max-w-7xl px-6 lg:px-8">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-[#fcc000]/25 bg-[#fcc000]/10 px-4 py-2 text-sm font-medium text-[#fcc000]">
            Contact
          </span>
          <h1 className="max-w-2xl font-serif text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
            Tell us where you want to go and we will shape the route around your travel goals.
          </h1>
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
