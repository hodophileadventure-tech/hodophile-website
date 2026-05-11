import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import { absoluteUrl } from "@/lib/site";
import { featuredTourRoutePaths, getFeaturedTourBySlug } from "@/lib/data/featured-tour-cards";

type FeaturedTourPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return featuredTourRoutePaths.map((route) => ({
    slug: route.split("/").filter(Boolean).at(-1) ?? "",
  }));
}

export async function generateMetadata({ params }: FeaturedTourPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = getFeaturedTourBySlug(slug);

  if (!tour) {
    return {};
  }

  return {
    title: tour.title,
    description: tour.summary,
    alternates: {
      canonical: `/tours/featured/${tour.slug}`,
    },
    openGraph: {
      title: tour.title,
      description: tour.summary,
      url: absoluteUrl(`/tours/featured/${tour.slug}`),
    },
  };
}

export default async function FeaturedTourPage({ params }: FeaturedTourPageProps) {
  const { slug } = await params;
  const tour = getFeaturedTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  return (
    <PageShell wide>
      <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
        <div className="relative min-h-[62vh] md:min-h-[68vh]">
          <Image
            src={tour.heroImage}
            alt={tour.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,11,0.22)_0%,rgba(11,11,11,0.72)_100%)]" />

          <div className="relative z-10 mx-auto flex min-h-[62vh] max-w-[96rem] flex-col justify-end px-4 pb-12 pt-24 text-white md:min-h-[68vh] md:px-6 lg:px-10 xl:px-14">
            <p className="text-xs uppercase tracking-[0.34em] text-white/75">Featured Tour</p>
            <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
              {tour.title}
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/85 sm:text-base">
              {tour.summary}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-[minmax(18rem,24rem)_minmax(0,1fr)] xl:gap-12">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[2rem] border border-stone-200 bg-white p-3 shadow-[0_12px_36px_rgba(15,23,42,0.08)]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#111111]">
              <Image
                src={tour.homeImage}
                alt={`${tour.title} poster`}
                fill
                sizes="(max-width: 1024px) 100vw, 24rem"
                className="object-contain object-center p-3"
              />
            </div>
          </div>

          <div className="mt-5 rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Tour Snapshot</p>
            <p className="mt-3 font-serif text-3xl text-stone-900">{tour.duration}</p>
            <p className="mt-3 text-sm leading-7 text-stone-600">{tour.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {tour.highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#fcc000]/20 bg-[#fcc000]/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-[#9c7600]"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact-us"
                className="inline-flex rounded-full bg-[#0b0b0b] px-5 py-3 text-sm font-semibold !text-white transition hover:bg-black"
              >
                Request This Tour
              </Link>
              <Link
                href="/tours"
                className="inline-flex rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800 transition hover:border-stone-400 hover:text-stone-900"
              >
                Back to Tours
              </Link>
            </div>
          </div>

          {tour.includes?.length ? (
            <div className="mt-5 rounded-[1.5rem] border border-stone-200 bg-[#fff8df] p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.32em] text-stone-500 font-semibold text-stone-900">This Tour Includes</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
                {tour.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#fcc000]" />
                    <span className="font-semibold">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>

        <div>
          <div className="grid gap-6">
            <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.06)] md:p-8">
              <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Overview</p>
              <h2 className="mt-3 font-serif text-3xl text-stone-900">What to expect</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600">
                {tour.overview ?? tour.description}
              </p>

              {tour.attractions?.length ? (
                <div className="mt-8">
                  <p className="text-sm font-semibold text-stone-900">Tour Attractions</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {tour.attractions.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-2 rounded-full border border-[#fcc000]/30 bg-[#fff8df] px-3 py-2 text-sm text-stone-800"
                      >
                        <span className="flex h-2.5 w-2.5 rounded-full bg-[#fcc000]" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {(tour.pricingGroups?.length || tour.childPolicy?.length || tour.meals) && (
              <div className="rounded-[2rem] border border-[#fcc000] bg-[#fff8df] p-6 shadow-sm md:p-8">
                <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Pricing Per Person</p>
                <h2 className="mt-3 font-serif text-3xl text-stone-900">Choose the right plan</h2>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {tour.pricingGroups?.map((group) => (
                    <div key={group.title} className="rounded-[1.5rem] border border-red-300 bg-white p-5">
                      <h3 className="text-base font-semibold text-stone-900">{group.title}</h3>
                      <ul className="mt-4 space-y-3 text-sm text-stone-700">
                        {group.rows.map((row) => (
                          <li key={row.label} className="flex items-center justify-between gap-3">
                            <span>{row.label}</span>
                            <span className="font-semibold text-stone-900">{row.price}</span>
                          </li>
                        ))}
                      </ul>
                      {group.note ? <p className="mt-4 text-xs text-stone-600">{group.note}</p> : null}
                    </div>
                  ))}
                </div>

                {tour.childPolicy?.length ? (
                  <div className="mt-6 rounded-[1.5rem] border border-dashed border-stone-300 bg-white p-5">
                    <p className="text-sm font-semibold text-stone-900">Child Policy</p>
                    <ul className="mt-4 space-y-2 text-sm text-stone-600">
                      {tour.childPolicy.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-1 h-2 w-2 rounded-full bg-[#0b0b0b]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {tour.meals ? (
                  <div className="mt-6 rounded-[1.5rem] border border-stone-300 bg-white p-5">
                    <p className="text-sm font-semibold text-stone-900">Meals Menu</p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-stone-500"><strong>Breakfast</strong></p>
                        <p className="mt-2 text-sm text-stone-600">{tour.meals.breakfast}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-stone-500"><strong>Dinner</strong></p>
                        <p className="mt-2 text-sm text-stone-600">{tour.meals.dinner}</p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            )}

            <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.06)] md:p-8">
              <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Itinerary</p>
              <h2 className="mt-3 font-serif text-3xl text-stone-900">Day Wise Plan For This Route</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-600">
                A clear overview of how the journey flows, from departure through the scenic highlights and return.
              </p>

              <div className="mt-8">
              <details className="rounded-[1.75rem] border border-stone-200 bg-stone-50 p-5 shadow-sm" open>
                <summary className="cursor-pointer text-lg font-semibold text-stone-900">Itinerary</summary>
                <div className="mt-5 space-y-5 text-sm leading-7 text-stone-600">
                  {tour.itinerary.map((item) => (
                    <div key={`${tour.slug}-${item.day}`}>
                      <p className="text-[11px] uppercase tracking-[0.34em] text-[#a37a00]">{item.day}</p>
                      <h3 className="mt-2 text-xl font-semibold text-stone-900">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-stone-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </details>
            </div>

            <div className="mt-8 space-y-4">
              {tour.includes?.length ? (
                <details className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer text-lg font-semibold text-stone-900">Service Included</summary>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
                    {tour.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#fcc000]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : null}

              {tour.servicesExcluded?.length ? (
                <details className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer text-lg font-semibold text-stone-900">Service Not Included</summary>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
                    {tour.servicesExcluded.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#fcc000]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : null}

              {tour.bookingPolicy?.length ? (
                <details className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer text-lg font-semibold text-stone-900">Booking Procedure</summary>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
                    {tour.bookingPolicy.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#fcc000]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : null}
            </div>

            {tour.detailSections?.length ? (
              <div className="mt-8 space-y-4">
                {tour.detailSections.map((section) => (
                  <details
                    key={section.title}
                    className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm"
                  >
                    <summary className="cursor-pointer text-lg font-semibold text-stone-900">{section.title}</summary>
                    <div className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
                      {section.content.map((item) => {
                        const menuMatch = item.match(/^(Breakfast|Dinner):\s*(.*)$/);
                        return (
                          <p key={item}>
                            {menuMatch ? (
                              <>
                                <strong>{menuMatch[1]}:</strong> {menuMatch[2]}
                              </>
                            ) : (
                              item
                            )}
                          </p>
                        );
                      })}
                    </div>
                  </details>
                ))}
              </div>
            ) : null}
          </div>

          <div className="mt-8 rounded-[2rem] border border-[#fcc000] bg-[#fff8df] p-6 shadow-sm md:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Need changes?</p>
            <h2 className="mt-3 font-serif text-3xl text-stone-900">We can tailor this itinerary for your dates and group size.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-700">
              Open the trip builder and we will adjust hotels, transport, and pacing to match your preferred budget.
            </p>
          </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}