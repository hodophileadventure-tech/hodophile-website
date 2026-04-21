import type { Metadata } from "next";

import { PageHeroImage } from "@/components/page-hero-image";
import { PageShell } from "@/components/page-shell";
import { absoluteUrl } from "@/lib/site";

const terms = [
  {
    title: "Bookings",
    body: "Trip requests are confirmed after route details, dates, and traveler count are reviewed.",
  },
  {
    title: "Payments",
    body: "Payment terms are shared during planning and may vary based on route, season, and group size.",
  },
  {
    title: "Changes",
    body: "Itinerary changes should be communicated early so transport and hotel arrangements can be adjusted.",
  },
  {
    title: "Cancellations",
    body: "Cancellation handling depends on the route and the vendors involved in the booking.",
  },
];

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "General terms for domestic Pakistan trip requests, confirmations, and itinerary changes.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
  openGraph: {
    title: "Terms & Conditions",
    description: "Basic booking terms for domestic Pakistan travel requests.",
    url: absoluteUrl("/terms-and-conditions"),
  },
};

export default function TermsAndConditionsPage() {
  return (
    <PageShell>
      <PageHeroImage
        image="/images/editorial/editorial-7.jpg"
        imageAlt="Mountain road and clouds"
        eyebrow="Terms & Conditions"
        title="Booking terms that keep the trip process clear and predictable."
        description="General guidance for domestic Pakistan trip requests, confirmations, itinerary updates, and service handling."
      />

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        {terms.map((term) => (
          <article key={term.title} className="rounded-[2rem] border border-black/10 bg-white/80 p-6 backdrop-blur">
            <h2 className="text-2xl font-semibold text-stone-900">{term.title}</h2>
            <p className="mt-3 text-sm leading-7 text-stone-600">{term.body}</p>
          </article>
        ))}
      </section>
    </PageShell>
  );
}