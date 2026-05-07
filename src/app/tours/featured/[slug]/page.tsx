import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import { absoluteUrl } from "@/lib/site";
import {
  featuredTourRoutePaths,
  featuredTourTermsAndConditions,
  getFeaturedTourBySlug,
} from "@/lib/data/featured-tour-cards";

function renderSplitHeading(title: string) {
  const words = title.split(" ");
  const splitIndex = Math.max(1, Math.ceil(words.length / 2));
  const firstHalf = words.slice(0, splitIndex).join(" ");
  const secondHalf = words.slice(splitIndex).join(" ");

  return (
    <>
      <span className="text-[#ffc000]">{firstHalf}</span>
      {secondHalf ? <span className="text-black"> {secondHalf}</span> : null}
    </>
  );
}

function getIncludeIconSrc(item: string) {
  const label = item.toLowerCase();

  if (label.includes("hotel accommodation")) return "/images/featured-tour-icons/accommodation-custom.png";
  if (label.includes("transport")) return "/images/featured-tour-icons/transport-custom.png";
  if (label.includes("4x4 jeep")) return "/images/featured-tour-icons/jeep.png";
  if (label.includes("breakfast") || label.includes("dinner") || label.includes("meal")) return "/images/featured-tour-icons/food-custom.png";
  if (label.includes("toll")) return "/images/featured-tour-icons/toll.png";
  if (label.includes("guide") || label.includes("tour manager")) return "/images/featured-tour-icons/tour-guide-custom.png";
  if (label.includes("bonfire")) return "/images/featured-tour-icons/bonfire-custom.png";

  return "/images/featured-tour-icons/accommodation-custom.png";
}

function getExcludeIconSrc(item: string) {
  const label = item.toLowerCase();

  if (label.includes("air conditioner") || label.includes("heater or air conditioner")) return "/images/featured-tour-icons/ac.png";
  if (label.includes("entry tickets") || label.includes("fort") || label.includes("park") || label.includes("museum")) {
    return "/images/featured-tour-icons/fort.png";
  }
  if (label.includes("porter")) return "/images/featured-tour-icons/porter.png";
  if (label.includes("landslide") || label.includes("roadblock")) return "/images/featured-tour-icons/landslide.png";
  if (label.includes("trekking equipment") || label.includes("water sports")) return "/images/featured-tour-icons/watersport.png";
  if (label.includes("jeep") || label.includes("careem") || label.includes("uber") || label.includes("extra ride")) return "/images/featured-tour-icons/car-logo.png";
  if (label.includes("tea") || label.includes("mineral water") || label.includes("cold drinks") || label.includes("room service")) return "/images/featured-tour-icons/room-service.png";
  if (label.includes("insurance") || label.includes("evacuation") || label.includes("laundry") || label.includes("phone calls")) return "/images/featured-tour-icons/insurance.png";

  return "/images/featured-tour-icons/fort.png";
}

function renderPerPersonHighlight(text: string) {
  const parts = text.split(/(per person)/gi);

  return parts.map((part, index) =>
    part.toLowerCase() === "per person" ? (
      <span key={`${part}-${index}`} className="font-bold text-[#fcc000]">
        {part}
      </span>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  );
}

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
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-white">
              <Image
                src={tour.homeImage}
                alt={`${tour.title} poster`}
                fill
                sizes="(max-width: 1024px) 100vw, 24rem"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="mt-5 rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-black">Tour Snapshot</p>
            <p className="mt-3 font-serif text-3xl text-[#fcc000]">{tour.duration}</p>
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
                className="inline-flex rounded-full border border-[#fcc000] bg-[#fcc000] px-5 py-3 text-sm font-semibold !text-[#0b0b0b] transition hover:bg-[#ffd24d]"
              >
                Request This Tour
              </Link>
              <Link
                href="/tours"
                className="inline-flex rounded-full border border-[#fcc000] bg-white px-5 py-3 text-sm font-semibold text-[#fcc000] transition hover:bg-[#fff8df]"
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
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white p-0 shadow-sm ring-1 ring-[#fcc000]/20">
                      <Image
                        src={getIncludeIconSrc(item)}
                        alt={item}
                        width={28}
                        height={28}
                        className="object-contain"
                        style={{ width: "28px", height: "28px" }}
                      />
                    </span>
                    <span className="font-semibold leading-6">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>

        <div>
          <div className="grid gap-6">
            <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.06)] md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-black">Overview</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-[#fcc000]">What to expect</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600">
                {tour.overview ?? tour.description}
              </p>

              {tour.attractions?.length ? (
                <div className="mt-8">
                  <p className="text-sm font-bold text-[#fcc000]">Tour Attractions</p>
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

            {(tour.pricingGroups?.length || tour.childPolicy?.length || tour.bookingPolicy?.length) && (
              <div className="rounded-[2rem] border border-[#fcc000] bg-[#fff8df] p-6 shadow-sm md:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.32em] text-black">Pricing Per Person</p>
                <h2 className="mt-3 font-serif text-3xl font-bold text-[#fcc000]">Choose the right plan</h2>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {tour.pricingGroups?.map((group) => (
                    <div key={group.title} className="rounded-[1.5rem] border border-red-300 bg-white p-5">
                      <h3 className="text-base font-bold text-[#fcc000]">{group.title}</h3>
                      <ul className="mt-4 space-y-3 text-sm text-stone-700">
                        {group.rows.map((row) => (
                          <li key={row.label} className="flex items-center justify-between gap-3">
                            <span>{row.label}</span>
                            <span className="font-semibold text-stone-900">{row.price}</span>
                          </li>
                        ))}
                      </ul>
                      {group.note ? (
                        <p className="mt-4 text-xs text-stone-600">{renderPerPersonHighlight(group.note)}</p>
                      ) : null}
                    </div>
                  ))}
                </div>

                {tour.childPolicy?.length ? (
                  <div className="mt-6 rounded-[1.5rem] border border-dashed border-stone-300 bg-white p-5">
                    <p className="text-sm font-bold text-[#fcc000]">Child Policy</p>
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

                {tour.bookingPolicy?.length ? (
                  <div className="mt-6 rounded-[1.5rem] border border-stone-300 bg-white p-5">
                    <p className="text-sm font-bold text-[#fcc000]">Booking Procedure</p>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
                      {tour.bookingPolicy.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#fcc000]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            )}

            <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.06)] md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-black">Itinerary</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-[#fcc000]">Day Wise Plan For This Route</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-600">
                A clear overview of how the journey flows, from departure through the scenic highlights and return.
              </p>

              <div className="mt-8">
              <details className="rounded-[1.75rem] border border-stone-200 bg-stone-50 p-5 shadow-sm">
                <summary className="cursor-pointer text-lg font-semibold text-[#ffc000]">Itinerary</summary>
                <div className="mt-5 space-y-5 text-sm leading-7 text-stone-600">
                  {tour.itinerary.map((item) => (
                    <div key={`${tour.slug}-${item.day}`}>
                      <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#a37a00]">{item.day}</p>
                      <h3 className="mt-2 text-xl font-semibold">{renderSplitHeading(item.title)}</h3>
                      <p className="mt-2 text-sm leading-7 text-stone-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </details>
            </div>

            <div className="mt-8 space-y-4">
              {tour.includes?.length ? (
                <details className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer text-lg font-semibold text-[#ffc000]">Service Included</summary>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
                    {tour.includes.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white p-0 shadow-sm ring-1 ring-[#fcc000]/20">
                          <Image
                            src={getIncludeIconSrc(item)}
                            alt={item}
                            width={28}
                            height={28}
                            className="object-contain"
                            style={{ width: "28px", height: "28px" }}
                          />
                        </span>
                        <span className="font-semibold leading-6">{item}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : null}

              {tour.servicesExcluded?.length ? (
                <details className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer text-lg font-semibold text-[#ffc000]"><span className="text-red-600 mr-2">✕</span>Service Not Included</summary>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
                    {tour.servicesExcluded.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-red-200 bg-white p-0 shadow-sm">
                          <Image
                            src={getExcludeIconSrc(item)}
                            alt={item}
                            width={28}
                            height={28}
                            className="object-contain"
                            style={{ width: "28px", height: "28px" }}
                          />
                        </span>
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
                    <summary className="cursor-pointer text-lg font-bold text-[#fcc000]">{section.title}</summary>
                    <div className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
                      {section.content.map((item) => {
                        const menuMatch = item.match(/^(Breakfast|Dinner):\s*(.*)$/);
                        return (
                          <p key={item}>
                            {menuMatch ? (
                              <>
                                <strong className="text-[#fcc000]">{menuMatch[1]}:</strong> {menuMatch[2]}
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

            <details className="mt-4 rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm">
              <summary className="cursor-pointer text-lg font-semibold text-[#ffc000]">Terms &amp; Conditions</summary>
              <div className="mt-5 space-y-5 text-sm leading-7 text-stone-600">
                {featuredTourTermsAndConditions.map((section) => (
                  <div key={section.title} className="space-y-3">
                    <p className="text-sm font-semibold">{renderSplitHeading(section.title)}</p>
                    <div className="space-y-3">
                      {section.content.map((item) => (
                        <p key={item} className="text-stone-600">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </details>
          </div>

          <div className="mt-8 rounded-[2rem] border border-[#fcc000] bg-[#fff8df] p-6 shadow-sm md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-black">Need changes?</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[#fcc000]">We can tailor this itinerary for your dates and group size.</h2>
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