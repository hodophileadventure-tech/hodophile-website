import type { Metadata } from "next";

import { PageHeroImage } from "@/components/page-hero-image";
import { PageShell } from "@/components/page-shell";
import { absoluteUrl } from "@/lib/site";

const terms = [
  {
    title: "Booking requests and confirmation",
    body: "A website inquiry or WhatsApp conversation is a request, not a confirmed reservation. A booking is confirmed only after Hodophile provides written confirmation of the itinerary, travel dates, traveler details, included services, total price, payment schedule, and any required advance, and the stated payment is received.",
  },
  {
    title: "Prices, inclusions, and payment",
    body: "Prices depend on the confirmed route, travel dates, group size, room-sharing arrangement, transport, and selected services. The written quotation should identify what is included and excluded, any optional costs, the amount and due date of each payment, and the validity period of the price. A service not listed as included should be treated as excluded unless confirmed in writing.",
  },
  {
    title: "Changes and travel conditions",
    body: "Tell us promptly about requested changes to dates, traveler details, rooming, or itinerary. Changes are subject to availability and may change the price. Weather, road closures, safety advice, local restrictions, or supplier operations can require itinerary or accommodation changes; we will communicate material changes and work to arrange a reasonable alternative where available.",
  },
  {
    title: "Cancellations and refunds",
    body: "Before paying, review the cancellation and refund schedule in your written quotation or package confirmation. The applicable schedule depends on the trip and third-party services such as hotels and transport tickets. Any non-refundable charges, supplier deductions, cancellation deadlines, and refund method should be disclosed in that booking document. Contact us in writing to request a cancellation; a conversation alone does not cancel a reservation.",
  },
  {
    title: "Traveler responsibilities",
    body: "Travelers are responsible for providing accurate names and contact details, arriving at the stated departure point on time, carrying required identification, and following reasonable safety instructions from the tour manager and local authorities. Tell us before confirmation about accessibility, medical, dietary, or other needs that may affect arrangements.",
  },
  {
    title: "Third-party services and force majeure",
    body: "Hotels, transport operators, airlines, and activity providers may apply their own terms. We will share relevant provider conditions when they affect your booking. We are not responsible for delays or service interruptions outside our reasonable control, including severe weather, road closures, government restrictions, natural events, or other force majeure conditions; remedies depend on the affected services and the written booking terms.",
  },
  {
    title: "Questions and disputes",
    body: "Raise booking questions or service concerns with Hodophile as soon as possible so we can review them while trip records are available. The written quotation and confirmation are the reference for route-specific arrangements. These general terms do not replace any more specific terms provided and accepted for an individual package.",
  },
];

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Booking, payment, change, cancellation, and traveler terms for Hodophile Pakistan tours.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
  openGraph: {
    title: "Terms & Conditions",
    description: "Booking, payment, change, cancellation, and traveler terms for Hodophile Pakistan tours.",
    url: absoluteUrl("/terms-and-conditions"),
  },
};

export default function TermsAndConditionsPage() {
  return (
    <PageShell wide>
      <PageHeroImage
        image="/images/editorial/editorial-7.webp"
        imageAlt="Mountain road and clouds"
        eyebrow="Terms & Conditions"
        title="Booking terms that keep the trip process clear and predictable."
        description="Review how tour requests become bookings, what your written quotation should confirm, and how changes and cancellations are handled. Package-specific terms are provided before payment."
      />

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        {terms.map((term) => (
          <article key={term.title} className="rounded-[2rem] border border-black/10 bg-white/80 p-6 backdrop-blur">
            <h2 className="text-2xl font-semibold">{term.title}</h2>
            <p className="mt-3 text-sm leading-7 text-stone-600">{term.body}</p>
          </article>
        ))}
      </section>
    </PageShell>
  );
}