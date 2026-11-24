import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { absoluteUrl } from "@/lib/site";
import { additionalHoneymoonPackages } from "@/lib/data/additional-honeymoon-packages";
import { featuredTourTermsAndConditions } from "@/lib/data/featured-tour-cards";

type Props = { params: Promise<{ slug: string }> };

const packages = { ...additionalHoneymoonPackages };

export async function generateStaticParams() {
  return Object.keys(packages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pkg = packages[slug];
  if (!pkg) return {};
  return {
    title: pkg.title,
    description: pkg.description,
    alternates: { canonical: `/honeymoon-packages/${slug}` },
    openGraph: {
      title: pkg.title,
      description: pkg.description,
      url: absoluteUrl(`/honeymoon-packages/${slug}`),
    },
  };
}

export default async function PackagePage({ params }: Props) {
  const { slug } = await params;
  const pkg = packages[slug];
  if (!pkg) {
    notFound();
  }

  return (
    <PageShell wide noTopPadding>
      {/* Hero Section */}
      <section className="site-full-bleed overflow-hidden">
        <div className="site-detail-hero-height relative">
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="site-hero-overlay" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" aria-hidden="true" />
          <div className="site-detail-hero-height relative z-10 mx-auto flex max-w-[96rem] flex-col justify-end px-4 pb-10 pt-20 text-white sm:pb-12 sm:pt-24 md:px-6 lg:px-10 xl:px-14">
            <p className="site-hero-copy-shadow text-xs font-semibold uppercase tracking-[0.34em] !text-white/90">Honeymoon Package</p>
            <h1 className="site-hero-copy-shadow mt-3 max-w-4xl font-serif text-3xl leading-tight !text-white sm:text-4xl">
              {pkg.title}
            </h1>
            <p className="site-hero-copy-shadow mt-4 max-w-3xl text-xs leading-6 !text-white/90 sm:text-sm sm:leading-7">
              {pkg.description}
            </p>
          </div>
        </div>
      </section>

      {/* Two Column Layout */}
      <section className="site-section-gap grid gap-8 lg:grid-cols-[minmax(18rem,24rem)_minmax(0,1fr)] xl:gap-12">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[2rem] border border-stone-200 bg-white p-3 shadow-[0_12px_36px_rgba(15,23,42,0.08)]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-stone-100">
              <Image
                src={pkg.image}
                alt={`${pkg.title} poster`}
                fill
                sizes="(max-width: 1024px) 100vw, 24rem"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </div>
          </div>

          <div className="mt-5 rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Package Details</p>
            <p className="mt-3 font-serif text-3xl text-stone-900">{pkg.duration}</p>
            <p className="mt-3 text-2xl font-bold text-[#9c7600]">{pkg.price}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Romantic pacing", "Private options", "Route support"].map((item) => (
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
                href="/make-my-trip"
                className="inline-flex rounded-full bg-[#0b0b0b] px-5 py-3 text-sm font-semibold !text-white transition hover:bg-black"
              >
                Request This Package
              </Link>
              <Link
                href="/honeymoon-packages"
                className="inline-flex rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800 transition hover:border-stone-400 hover:text-stone-900"
              >
                Back to Packages
              </Link>
            </div>
          </div>

          {pkg.includes?.length ? (
            <div className="mt-5 rounded-[1.5rem] border border-stone-200 bg-[#fff8df] p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.32em] text-stone-500 font-semibold">This Tour Includes</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#fcc000]" />
                    <span className="font-semibold">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>

        {/* Main Content */}
        <div>
          <div className="grid gap-6">
            <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.06)] md:p-8">
              <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Overview</p>
              <h2 className="mt-3 font-serif text-3xl text-stone-900">What to expect</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600">
                {pkg.overview ?? pkg.description}
              </p>

              {pkg.attractions?.length ? (
                <div className="mt-8">
                  <p className="text-sm font-semibold text-stone-900">Tour Attractions</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {pkg.attractions.map((item) => (
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
            <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.06)] md:p-8">
              <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Itinerary</p>
              <h2 className="mt-3 font-serif text-3xl text-stone-900">Day Wise Plan For This Route</h2>

              <div className="mt-8">
                {pkg.itinerary?.length ? (
                  <ol className="space-y-4">
                    {pkg.itinerary.map((item) => (
                      <li
                        key={`${item.day}-${item.title}`}
                        className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9c7600]">{item.day}</p>
                        <p className="mt-2 text-lg font-semibold text-stone-900">{item.title}</p>
                        <p className="mt-2 whitespace-pre-line text-sm leading-7 text-stone-600">{item.description}</p>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <div className="rounded-[1.5rem] border border-dashed border-stone-300 bg-stone-50 p-5 text-sm leading-7 text-stone-600">
                    A detailed day-wise itinerary for this package is not yet added and will be shared with your quotation based on your travel dates, route, and selected tier.
                  </div>
                )}
              </div>
            </div>

            {/* Pricing and Details Section */}
            {(pkg.includes?.length || pkg.childPolicy?.length || pkg.mealsMenu) && (
              <div className="rounded-[2rem] border border-[#fcc000] bg-[#fff8df] p-6 shadow-sm md:p-8">
                <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Package Details</p>
                <h2 className="mt-3 font-serif text-3xl text-stone-900">What&apos;s Included &amp; Important Info</h2>

                {pkg.childPolicy?.length ? (
                  <div className="mt-6 rounded-[1.5rem] border border-dashed border-stone-300 bg-white p-5">
                    <p className="text-sm font-semibold text-stone-900">Child Policy</p>
                    <ul className="mt-4 space-y-2 text-sm text-stone-600">
                      {pkg.childPolicy.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-1 h-2 w-2 rounded-full bg-[#0b0b0b]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {pkg.mealsMenu ? (
                  <div className="mt-6 rounded-[1.5rem] border border-stone-300 bg-white p-5">
                    <p className="text-sm font-semibold text-stone-900">Meals Menu</p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-stone-500 font-semibold">Breakfast</p>
                        <p className="mt-2 text-sm text-stone-600">{pkg.mealsMenu.breakfast}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-stone-500 font-semibold">Dinner</p>
                        <p className="mt-2 text-sm text-stone-600">{pkg.mealsMenu.dinner}</p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            )}

            {/* Detail Sections */}
            <div className="mt-8 space-y-4">
              {pkg.includes?.length ? (
                <details className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer text-lg font-semibold text-stone-900">Service Included</summary>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#fcc000]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : null}

              {pkg.excluded?.length ? (
                <details className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer text-lg font-semibold text-stone-900">Service Not Included</summary>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
                    {pkg.excluded.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#fcc000]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : null}

              {pkg.bookingPolicy?.length ? (
                <details className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer text-lg font-semibold text-stone-900">Booking Procedure</summary>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
                    {pkg.bookingPolicy.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#fcc000]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : null}

              {pkg.detailSections?.length ? (
                <>
                  {pkg.detailSections.map((section) => (
                    <details
                      key={section.title}
                      className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm"
                    >
                      <summary className="cursor-pointer text-lg font-semibold text-stone-900">
                        {section.title}
                      </summary>
                      <div className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
                        {section.content.map((item) => (
                          <p key={item}>{item}</p>
                        ))}
                      </div>
                    </details>
                  ))}
                </>
              ) : null}

              {featuredTourTermsAndConditions.map((section) => (
                <details
                  key={section.title}
                  className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm"
                >
                  <summary className="cursor-pointer text-lg font-semibold text-stone-900">
                    {section.title}
                  </summary>
                  <div className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
                    {section.content.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-8 rounded-[2rem] border border-[#fcc000] bg-[#fff8df] p-6 shadow-sm md:p-8">
              <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Need changes?</p>
              <h2 className="mt-3 font-serif text-3xl text-stone-900">We can tailor this package for your dates and preferences.</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-700">
                Open the trip builder and we will adjust hotels, transport, meals, and pacing to match your preferred budget and travel dates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
