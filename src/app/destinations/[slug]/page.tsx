import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/page-shell";
import { JourneyActions } from "@/components/travel-discovery";
import { absoluteUrl, destinationDetailSlugs, destinations, destinationTourPageRedirects } from "@/lib/site";
import { getTourPackagesForDestination } from "@/lib/data/tour-packages";
import { buildPageSchema } from "@/lib/seo/structured-data";

type DestinationPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return [...destinationDetailSlugs, ...Object.keys(destinationTourPageRedirects)].map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = destinations.find((item) => item.slug === slug);

  if (!destination) {
    return {};
  }

  return {
    title: `${destination.name} Travel Guide & Tour Packages`,
    description: `${destination.description} Best time to visit: ${destination.bestTimeToVisit}. Ideal duration: ${destination.idealDuration}.`,
    alternates: {
      canonical: `/destinations/${slug}`,
    },
    openGraph: {
      title: `${destination.name} Travel Guide`,
      description: destination.description,
      url: absoluteUrl(`/destinations/${slug}`),
      images: [
        {
          url: absoluteUrl(destination.images[0].src),
          width: 1200,
          height: 630,
          alt: destination.name,
        },
      ],
    },
  };
}

export default async function DestinationGalleryPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = destinations.find((item) => item.slug === slug);

  if (!destination) {
    const redirectPath = destinationTourPageRedirects[slug as keyof typeof destinationTourPageRedirects];
    if (redirectPath) redirect(redirectPath);
    notFound();
  }

  const packages = getTourPackagesForDestination(slug);
  const quickLinks = [
    ...packages.slice(0, 2).map((tourPackage) => ({
      title: tourPackage.title,
      href: `/packages/${tourPackage.id}`,
      meta: `${tourPackage.duration} package`,
    })),
    ...destination.routeSuggestions,
  ];

  return (
    <>
      <JsonLd
        data={buildPageSchema({
          title: `${destination.name} travel guide`,
          description: destination.description,
          url: `/destinations/${slug}`,
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Destinations", url: "/destinations" },
            { name: destination.name, url: `/destinations/${slug}` },
          ],
        })}
      />
      <PageShell wide>
        <section className="space-y-6">
          <div>
            <Link href="/destinations" className="text-sm font-medium text-[#8b6b00] hover:text-[#735900]">
              ← Back to destinations
            </Link>
            <h1 className="mt-6 font-serif text-5xl font-semibold text-stone-950">{destination.name}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-stone-600">{destination.description}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {destination.highlights.map((highlight) => (
              <span
                key={highlight}
                className="rounded-full border border-[#d9a81d]/50 bg-[#fff6d1] px-3 py-1 text-sm font-medium text-[#4d3a00] shadow-[inset_0_0_0_1px_rgba(217,168,29,0.16)]"
              >
                {highlight}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Best time to visit", value: destination.bestTimeToVisit },
            { label: "Ideal duration", value: destination.idealDuration },
            { label: "Best for", value: destination.bestFor },
            { label: "Travel style", value: destination.journeyStyle },
          ].map((fact) => (
            <div key={fact.label} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.04)]">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-stone-500">{fact.label}</p>
              <p className="mt-3 text-base leading-7 text-stone-800">{fact.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-[0_18px_40px_rgba(15,23,42,0.04)]">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#b98a00]">Why travelers choose it</p>
            <h2 className="mt-4 font-serif text-3xl font-semibold text-stone-950">A destination built for memorable route planning.</h2>
            <ul className="mt-6 space-y-4 text-base leading-7 text-stone-600">
              {destination.tripHighlights.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#fcc000]/20 text-[#a36d00]">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-stone-200 bg-stone-50 p-7">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-stone-500">Quick links</p>
            {destination.routeGuidance.length > 0 && (
              <p className="mt-4 text-sm leading-6 text-stone-600">{destination.routeGuidance.join(" · ")}</p>
            )}
            <div className="mt-5 space-y-3">
              {quickLinks.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="block rounded-2xl border border-stone-200 bg-white p-4 transition hover:border-[#fcc000]/50 hover:bg-[#fff8db]"
                >
                  <p className="font-semibold text-stone-900">{route.title}</p>
                  <p className="mt-1 text-sm text-stone-500">{route.meta}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {packages.length > 0 && (
          <section className="relative mt-20 overflow-hidden rounded-[2rem] bg-[#0b0b0b] px-5 py-8 text-white shadow-[0_28px_70px_rgba(11,11,11,0.16)] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            <div className="pointer-events-none absolute right-[-5rem] top-[-7rem] h-64 w-64 rounded-full border border-[#fcc000]/20" />
            <div className="pointer-events-none absolute right-8 top-8 h-24 w-24 rounded-full border border-[#fcc000]/10" />

            <div className="relative flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#fcc000]">Curated journeys</p>
                <h2 className="mt-4 max-w-xl font-serif text-3xl font-normal leading-tight sm:text-4xl">{destination.name} journeys, thoughtfully arranged.</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">Choose a considered route with transparent pricing, carefully planned transport, and the freedom to travel at your own pace.</p>
              </div>
              <p className="shrink-0 text-xs uppercase tracking-[0.2em] text-white/45">{packages.length} {packages.length === 1 ? "journey" : "journeys"} available</p>
            </div>

            <div className="relative mt-8 grid gap-5 md:grid-cols-2">
              {packages.map((tourPackage) => (
                <article key={tourPackage.id} className="group rounded-2xl border border-white/10 bg-white/[0.06] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#fcc000]/50 hover:bg-white/[0.09] sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-5 border-b border-white/10 pb-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fcc000]">{tourPackage.duration}</p>
                      <h3 className="mt-3 max-w-sm font-serif text-2xl font-normal leading-tight text-white">
                        <Link href={`/packages/${tourPackage.id}`} className="transition hover:text-[#fcc000]">{tourPackage.title}</Link>
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-[0.65rem] uppercase tracking-[0.18em] text-white/45">From</p>
                      <p className="mt-1 text-xl font-semibold text-[#fcc000]">PKR {tourPackage.pricePerPerson.toLocaleString()}</p>
                      <p className="text-xs text-white/45">per person</p>
                      {tourPackage.couplePrice && <p className="mt-2 text-xs text-white/60">PKR {tourPackage.couplePrice.toLocaleString()} / couple</p>}
                    </div>
                  </div>
                  <div className="mt-5 space-y-3 text-sm leading-6 text-white/65">
                    {tourPackage.scheduleNote && <p><span className="mr-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/40">Schedule note</span>{tourPackage.scheduleNote}</p>}
                    {tourPackage.transport && <p><span className="mr-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/40">Transport</span>{tourPackage.transport.join("; ")}</p>}
                    <p><span className="mr-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/40">Route</span>{tourPackage.routeStops.join(" → ")}</p>
                    {tourPackage.routeHighlights?.length ? <p><span className="mr-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/40">Highlights</span>{tourPackage.routeHighlights.join("; ")}</p> : null}
                    <p><span className="mr-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/40">Travel styles</span>{tourPackage.travelStyles.map((style) => `${style.charAt(0).toUpperCase()}${style.slice(1)}`).join(", ")}</p>
                    {tourPackage.includes && <p><span className="mr-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/40">Includes</span>{tourPackage.includes.join("; ")}</p>}
                    {tourPackage.excludes && <p><span className="mr-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/40">Excludes</span>{tourPackage.excludes.join("; ")}</p>}
                  </div>
                  {tourPackage.notes?.map((note) => <p key={note} className="mt-5 border-t border-white/10 pt-4 text-xs leading-6 text-white/45">{note}</p>)}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                    <JourneyActions packageId={tourPackage.id} packageTitle={tourPackage.title} />
                    <Link
                      href={`/make-my-trip?destination=${encodeURIComponent(slug)}&inspiration=${encodeURIComponent(tourPackage.title)}`}
                      className="text-xs font-semibold text-[#fcc000] underline underline-offset-4"
                    >
                      Plan this route
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="mt-16 rounded-[2rem] border border-stone-200 bg-white p-7 shadow-[0_18px_40px_rgba(15,23,42,0.04)]">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-stone-500">Frequently asked questions</p>
          <div className="mt-6 space-y-5">
            {destination.faqs.map((item) => (
              <div key={item.question} className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                <p className="font-semibold text-stone-900">{item.question}</p>
                <p className="mt-2 text-sm leading-7 text-stone-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="mb-8 font-serif text-3xl font-semibold">Gallery</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {destination.images.map((image) => (
              <div key={image.src} className="group overflow-hidden rounded-2xl border border-stone-200 shadow-sm">
                <div className="relative aspect-square overflow-hidden bg-stone-100">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="font-medium text-stone-900">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-stone-200 bg-stone-50 p-8">
          <h2 className="font-serif text-3xl font-semibold">Ready to visit {destination.name}?</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
            Let us craft a personalized itinerary for your {destination.name} adventure. Share your dates, budget, and preferences.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={`/make-my-trip?destination=${encodeURIComponent(destination.slug)}&inspiration=${encodeURIComponent(destination.name)}`}
              className="inline-flex rounded-full bg-[#ffc000] px-6 py-3 text-sm font-semibold text-[#0b0b0b] transition hover:bg-[#ffd24d]"
            >
              Plan My Trip
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex rounded-full border border-[#8b6b00] bg-white px-6 py-3 text-sm font-semibold text-[#6e5200] transition hover:bg-[#fff8df]"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </PageShell>
    </>
  );
}
