import type { Metadata } from "next";
import Image from "next/image";

import { ContactForm } from "@/components/contact-form";
import { PageShell } from "@/components/page-shell";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Talk with Hodophile Adventures about Pakistan destinations, custom routes, and planning your next trip.",
  alternates: {
    canonical: "/contact-us",
  },
  openGraph: {
    title: "Contact Us",
    description: "Talk with our travel specialists about destinations, routes, and tailor-made Pakistan trips.",
    url: absoluteUrl("/contact-us"),
  },
};

export default function ContactUsPage() {
  return (
    <PageShell wide>
      <section aria-labelledby="contact-page-title" className="relative isolate flex min-h-[25rem] items-center overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0b] px-6 py-12 text-white shadow-[0_28px_70px_rgba(0,0,0,0.25)] sm:min-h-[28rem] sm:px-10 lg:px-16">
        <Image
          src="/images/package-cards/images__editorial__editorial-3.webp"
          alt="Mountain scenery in northern Pakistan"
          fill
          priority
          sizes="(max-width: 1536px) 100vw, 1536px"
          className="absolute inset-0 -z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,8,8,0.94)_0%,rgba(8,8,8,0.78)_48%,rgba(8,8,8,0.28)_100%)]" />
        <div className="absolute -right-24 -top-32 -z-10 h-80 w-80 rounded-full bg-[#FCC000]/10 blur-3xl" />
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-[#FCC000]">
            <span className="h-px w-9 bg-[#FCC000]" aria-hidden="true" />
            Contact our team
          </p>
          <h1 id="contact-page-title" className="mt-5 max-w-3xl font-[var(--font-display)] text-4xl leading-[1.04] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
            Let’s plan a trip that feels like yours.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
            Tell us what you have in mind. Our Pakistan travel specialists will help shape the route, pace, and details around you.
          </p>
          <a
            href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}
            className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#FCC000] px-6 py-3 text-sm font-bold text-[#111] transition hover:bg-[#ffd84d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FCC000]"
          >
            Call our travel team
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section aria-label="Contact information and inquiry form" className="mx-auto mt-8 grid max-w-7xl items-start gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(35,29,13,0.94),rgba(17,17,15,0.98)_62%)] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.2)] sm:p-8 lg:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#FCC000]">Get in touch</p>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl leading-tight text-white sm:text-4xl">
            Good journeys start with a conversation.
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/65 sm:text-base">
            Ask us about destinations, seasons, or a tailor-made itinerary. We’re happy to help you find the right way to explore Pakistan.
          </p>

          <div className="mt-7 grid gap-3">
            <a
              href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}
              className="group rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-[#FCC000]/45 hover:bg-black/30 sm:p-5"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Call us</span>
              <span className="mt-1 block break-words text-base font-semibold text-white transition group-hover:text-[#FCC000]">{siteConfig.phone}</span>
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="group rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-[#FCC000]/45 hover:bg-black/30 sm:p-5"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Email us</span>
              <span className="mt-1 block break-all text-base font-semibold text-white transition group-hover:text-[#FCC000]">{siteConfig.email}</span>
            </a>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Visit our office</span>
              <span className="mt-1 block text-sm leading-6 text-white/80">{siteConfig.location}</span>
            </div>
          </div>
        </div>

        <ContactForm />
      </section>
    </PageShell>
  );
}