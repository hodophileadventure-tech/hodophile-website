import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/page-shell";
import { northernAirTourBookingTerms, northernAirTours } from "@/lib/data/northern-air-tours";
import { absoluteUrl, whatsappUrl } from "@/lib/site";
import { buildPageSchema } from "@/lib/seo/structured-data";

type NorthernAirTourPageProps = {
  params: Promise<{ slug: string }>;
};

function getNorthernAirTour(slug: string) {
  return northernAirTours.find((tour) => tour.id === slug);
}

export async function generateStaticParams() {
  return northernAirTours.map((tour) => ({ slug: tour.id }));
}

export async function generateMetadata({ params }: NorthernAirTourPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = getNorthernAirTour(slug);

  if (!tour) return {};

  const url = `/tours/northern-tours/by-air/${tour.id}`;
  return {
    title: tour.title,
    description: tour.summary,
    alternates: { canonical: url },
    openGraph: {
      title: tour.title,
      description: tour.summary,
      url: absoluteUrl(url),
      images: [{ url: tour.image, alt: tour.title }],
    },
  };
}

export default async function NorthernAirTourPage({ params }: NorthernAirTourPageProps) {
  const { slug } = await params;
  const tour = getNorthernAirTour(slug);

  if (!tour) notFound();

  const pageUrl = `/tours/northern-tours/by-air/${tour.id}`;
  const inquiryUrl = whatsappUrl(
    `Hi Hodophile, I am interested in ${tour.title}. Please confirm the package price, room options, flight availability, and current itinerary.`,
  );

  return (
    <>
      <JsonLd
        data={buildPageSchema({
          title: tour.title,
          description: tour.summary,
          url: pageUrl,
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Tours", url: "/tours" },
            { name: "Northern Tours", url: "/tours/northern-tours" },
            { name: "By Air", url: "/tours/northern-tours#by-air" },
            { name: tour.title, url: pageUrl },
          ],
        })}
      />
      <PageShell wide>
        <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#090909]">
          <div className="relative min-h-[52vh] md:min-h-[60vh]">
            <Image
              src={tour.image}
              alt={`${tour.title} mountain scenery`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />
            <div className="relative z-10 mx-auto flex min-h-[52vh] max-w-[96rem] flex-col justify-end px-4 pb-10 pt-24 text-white md:min-h-[60vh] md:px-6 md:pb-14 lg:px-10 xl:px-14">
              <Link
                href="/tours/northern-tours#by-air"
                className="mb-6 w-fit text-sm font-semibold text-[#fcc000] transition hover:text-white"
              >
                ← All Northern by Air Tours
              </Link>
              <p className="text-xs uppercase tracking-[0.34em] text-[#fcc000]">Northern Tours · By Air</p>
              <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">{tour.title}</h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/85 sm:text-base">{tour.summary}</p>
            </div>
          </div>
        </section>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(18rem,25rem)_minmax(0,1fr)] xl:gap-12">
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white p-3 shadow-sm">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-stone-100">
                <Image src={tour.image} alt={`${tour.title} scenery`} fill sizes="(max-width: 1024px) 100vw, 25rem" className="object-cover" />
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Package overview</p>
                <p className="mt-2 font-serif text-2xl text-stone-900">{tour.itinerary.length} days · By air</p>
                <p className="mt-3 text-sm leading-6 text-stone-600">{tour.summary}</p>
                {tour.flightSchedule ? (
                  <p className="mt-4 rounded-xl border-l-2 border-[#fcc000] bg-[#fff8df] p-3 text-sm leading-6 text-stone-700">
                    {tour.flightSchedule}
                  </p>
                ) : null}
                <a
                  href={inquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#fcc000] px-5 text-sm font-bold text-black transition hover:bg-[#ffda4d]"
                >
                  Ask about this package
                </a>
              </div>
            </div>
          </aside>

          <main className="space-y-7">
            <section className="rounded-[2rem] border border-[#fcc000]/40 bg-[#fff8df] p-6 shadow-sm md:p-8" aria-labelledby="package-pricing">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#806000]">Package pricing</p>
              <h2 id="package-pricing" className="mt-3 font-serif text-3xl text-stone-900">Choose your stay and transport</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {tour.pricing.map((option) => (
                  <article key={option.packageType} className="rounded-2xl border border-stone-200 bg-white p-5">
                    <h3 className="font-semibold text-stone-900">{option.packageType}</h3>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-stone-700">
                      {option.rates.map((rate) => <li key={rate}>{rate}</li>)}
                    </ul>
                  </article>
                ))}
              </div>
              <p className="mt-5 rounded-xl bg-white/80 p-4 text-sm leading-6 text-stone-700">{tour.airfare}</p>
              <p className="mt-3 text-xs leading-5 text-stone-600">
                Rates are shown as printed on the supplied package information. Confirm current rates, room configuration, and availability before booking.
              </p>
            </section>

            <section className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm md:p-8" aria-labelledby="tour-itinerary">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">Day-by-day plan</p>
              <h2 id="tour-itinerary" className="mt-3 font-serif text-3xl text-stone-900">Tour itinerary</h2>
              <ol className="mt-7 space-y-5">
                {tour.itinerary.map((day) => (
                  <li key={day.day} className="grid gap-3 border-b border-stone-200 pb-5 last:border-b-0 last:pb-0 sm:grid-cols-[5.5rem_1fr]">
                    <span className="w-fit rounded-full bg-[#fff2bf] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#806000]">
                      Day {day.day}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-stone-900">{day.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-stone-600">{day.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className="grid gap-6 md:grid-cols-2">
              <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm md:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">Included</p>
                <h2 className="mt-3 font-serif text-2xl text-stone-900">Package includes</h2>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-stone-700">
                  {tour.inclusions.map((item) => (
                    <li key={item} className="flex gap-3"><span className="text-[#9a7600]">✓</span><span>{item}</span></li>
                  ))}
                </ul>
              </div>
              {tour.stayOptions.length ? (
                <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm md:p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">Accommodation</p>
                  <h2 className="mt-3 font-serif text-2xl text-stone-900">Stay options</h2>
                  <ul className="mt-5 space-y-3 text-sm leading-6 text-stone-700">
                    {tour.stayOptions.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ) : null}
            </section>

            <section className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm md:p-8" aria-labelledby="booking-terms">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">Booking information</p>
              <h2 id="booking-terms" className="mt-3 font-serif text-3xl text-stone-900">Booking process and policies</h2>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-stone-700">
                {northernAirTourBookingTerms.map((term) => (
                  <li key={term} className="flex gap-3"><span className="font-bold text-[#9a7600]">•</span><span>{term}</span></li>
                ))}
              </ul>
              <p className="mt-5 border-t border-stone-200 pt-5 text-sm leading-7 text-stone-600">
                Optional activities such as boating, jeep safari, quad biking, horse riding, paragliding, and rafting are charged separately where available. Weather, flight operations, and local road access can affect the itinerary; confirm final arrangements with the tour team.
              </p>
              <p className="mt-4 text-sm leading-6 text-stone-600">
                These package-specific booking details supplement the website&apos;s general{" "}
                <Link href="/terms-and-conditions" className="font-semibold text-stone-900 underline decoration-[#fcc000] decoration-2 underline-offset-4">
                  Terms and Conditions
                </Link>
                .
              </p>
              <a
                href={inquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[#0b0b0b] px-6 text-sm font-semibold text-white transition hover:bg-stone-800"
              >
                Confirm dates and availability
              </a>
            </section>
          </main>
        </div>
      </PageShell>
    </>
  );
}
