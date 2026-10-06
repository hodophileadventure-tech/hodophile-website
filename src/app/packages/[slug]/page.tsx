import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/page-shell";
import { PackagePromoCode } from "@/components/package-promo-code";
import { absoluteUrl } from "@/lib/site";
import { buildPageSchema } from "@/lib/seo/structured-data";
import { tourPackages } from "@/lib/data/tour-packages";
import { PROMOTIONS } from "@/lib/promotions/promotion-config";
import {
  premiumDestinations,
  readyToBookDestinations,
  exclusiveOffers,
} from "@/lib/data/premiumDestinations";

type PackagePageProps = {
  params: Promise<{ slug: string }>;
};

type PackageDetail = {
  slug: string;
  title: string;
  heroImage: string;
  homeImage: string;
  duration: string;
  scheduleNote?: string;
  bestFor?: string;
  transportSummary?: string;
  factsNeedConfirmation?: boolean;
  priceDisplay?: { label: string; value: string; note: string };
  itineraryHeading?: string;
  itineraryIntro?: string;
  summary: string;
  description: string;
  overview: string;
  highlights: string[];
  attractions: string[];
  itinerary: { day: string; title: string; description: string }[];
  includes: string[];
  excludes: string[];
  bookingPolicy: string[];
  detailSections: Array<{ title: string; content: string[] }>;
  priceWithIslamabadStay: string;
  priceWithoutIslamabadStay: string;
  tourNotes: string[];
  refundPolicy: string[];
  terms: string[];
  travelerInstruction: string[];
  childPolicy: string[];
  meals?: { breakfast: string; dinner: string };
};

const allPackages: PackageDetail[] = [
  ...premiumDestinations,
  ...readyToBookDestinations,
  ...exclusiveOffers,
].map((item) => {
  const titleText = item.title;
  const destinationName = titleText.replace(/^\d+\s*Days\s+/, "").trim();
  const base = {
    slug: item.id,
    title: titleText,
    heroImage: item.image,
    homeImage: item.image,
    duration: titleText,
    summary: item.description,
    description: item.description,
    overview:
      `Experience a thoughtfully planned ${destinationName} escape designed around scenic drives, comfortable stays, and memorable mountain moments. This route balances iconic viewpoints, relaxed pacing, and local charm so your trip feels exciting without being rushed.`,
    highlights: [
      destinationName,
      "Private transport support",
      "Comfort-first pacing",
      "Custom route planning",
    ],
    attractions: [
      `${destinationName} Valley`,
      "Scenic viewpoints",
      "Local culture and food",
      "Premium stay experience",
      "Photo-friendly stops",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & scenic setup",
        description: `Settle in and begin your ${destinationName} journey with a relaxed arrival, scenic stops, and a smooth first evening in the valley.`,
      },
      {
        day: "Day 2",
        title: "Highlights & viewpoints",
        description: "Enjoy the route's signature landscapes, iconic stops, and photo moments while keeping the pace comfortable and memorable.",
      },
      {
        day: "Day 3",
        title: "Leisure, local flavor & return",
        description: "Spend the final day exploring local charm, taking in the scenery, and wrapping up the trip at a relaxed pace before departure.",
      },
    ],
    includes: [
      "Comfortable transport support",
      "Hotel coordination and planning",
      "Route guidance and local insight",
      "Scenic stop recommendations",
    ],
    excludes: [
      "Personal shopping and extra meals",
      "Entry tickets at individual attractions",
      "Personal expenses and room service",
      "Emergency or medical charges",
    ],
    bookingPolicy: [
      "Confirm preferred dates and route preferences.",
      "Share your travel group size and budget for planning support.",
      "Our team will confirm arrangements and guide the next steps.",
    ],
    detailSections: [
      {
        title: "Perfect for",
        content: [
          "Families who want a balanced, confidence-building route.",
          "Couples looking for a calm, scenic getaway.",
          "Travelers who want a premium experience without overpacking the itinerary.",
        ],
      },
      {
        title: "Best time to travel",
        content: [
          "Early summer and peak season bring the most vibrant views and open routes.",
          "Plan with weather flexibility for smoother road conditions and more comfortable sightseeing.",
        ],
      },
    ],
    priceWithIslamabadStay: "PKR 25,000",
    priceWithoutIslamabadStay: "PKR 20,000",
    tourNotes: [
      "The package is designed for a relaxed and scenic route with managed transfers and comfort-first pacing.",
      "Road and weather conditions in northern Pakistan may affect the exact timing of sightseeing stops.",
      "Our team may adjust the schedule to keep the overall experience safe, smooth, and enjoyable.",
    ],
    refundPolicy: [
      "Cancellations within 48 hours may incur a full charge depending on the booking stage.",
      "A partial refund may be applicable when arrangements are canceled well in advance and costs are recoverable.",
      "Refund timelines depend on hotel and transport confirmations.",
    ],
    terms: [
      "HODOPHILE ADVENTURES reserves the right to amend the itinerary due to weather, road conditions, or local events.",
      "Travelers are responsible for personal belongings, behavior, and compliance with local rules and safety instructions.",
      "Management is not responsible for losses caused by natural conditions, landslides, or force majeure events.",
    ],
    travelerInstruction: [
      "Carry comfortable clothing and a light jacket for mountain evenings.",
      "Keep essential medicines, power banks, and personal items with you during travel.",
      "Respect local customs, avoid littering, and keep all timings aligned with the group schedule.",
    ],
    childPolicy: [
      "Below 3 years: Free of cost, no seat provided (laps with parent).",
      "3 to 7 years: 50% charge, folding/jumper seat provided.",
      "Above 7 years: 100% charge with a full seat.",
    ],
    meals: {
      breakfast: "Anda, Paratha, Tea, Channa, Omelet on rotation.",
      dinner: "Chicken Karahi, Handi, BBQ, Chicken Fried Rice, Vegetables, Daal, Raita, Salad, Naan on rotation.",
    },
  };

  const customized =
    base.slug === "kashmir"
      ? {
          ...base,
          summary:
            "A short but scenic Kashmir getaway from Islamabad to Keran and Upper Neelum Valley with waterfall stops, mountain views, and an overnight in the valley.",
          overview:
            "This 3-day Kashmir journey is designed for travelers who want a compact northern escape with waterfall viewpoints, valley scenery, and a memorable visit to Keran and Arang Kel. The route brings together comfortable road travel, short scenic stops, and a relaxed overnight experience in the Upper Neelum Valley.",
          highlights: [
            "Islamabad to Keran",
            "Upper Neelum Valley",
            "Dhani & Kashmir Waterfalls",
            "Chilana LOC",
            "Kel and Arang Kel",
            "Kutton Waterfall return",
          ],
          attractions: [
            "Kashmir Waterfall",
            "Dhani Waterfall",
            "Neelum Jhelum Hydropower Project",
            "Chilana LOC",
            "Keran Valley",
            "Kel",
            "Arang Kel",
            "Kutton Waterfall",
          ],
          itinerary: [
            {
              day: "Day 1",
              title: "Islamabad → Keran / Upper Neelum Valley",
              description:
                "Departure from Islamabad for Keran. Enjoy breakfast on the way and enjoy scenic short stops at Kashmir Waterfall, Dhani Waterfall, Neelum Jhelum Hydropower Project, and Chilana LOC before arriving in Keran or Upper Neelum Valley for hotel check-in and an overnight stay.",
            },
            {
              day: "Day 2",
              title: "Keran → Kel → Arang Kel → Keran",
              description:
                "Leave early for Kel and enjoy a short Doli (chairlift) ride on arrival. Trek to Arang Kel, which takes approximately 30–45 minutes along a dusty and rugged trail if accessible, then spend leisurely time exploring the area before returning to Kel and driving back to Keran for the night.",
            },
            {
              day: "Day 3",
              title: "Keran → Islamabad",
              description:
                "Depart for Islamabad with an en route stop at Kutton Waterfall before continuing the return journey to the capital. Travel is included in the package and participants are dropped back in Islamabad at the end of the tour.",
            },
          ],
        }
      : base;

  return customized;
});

allPackages.push(
  ...tourPackages.map((tourPackage): PackageDetail => {
      const routeStops = tourPackage.routeStops;
      const startingPrice = `PKR ${tourPackage.pricePerPerson.toLocaleString()}`;
      const sharingPrice = tourPackage.sharingPrices?.quad ?? tourPackage.pricePerPerson;
      const sharingPriceWithoutIslamabad = tourPackage.sharingPricesWithoutIslamabadStay?.quad ?? tourPackage.priceWithoutIslamabadStay;

      return {
        slug: tourPackage.id,
        title: tourPackage.title,
        heroImage: tourPackage.image,
        homeImage: tourPackage.image,
        duration: tourPackage.duration,
        scheduleNote: tourPackage.scheduleNote ?? "Departure dates available on request",
        bestFor: tourPackage.bestFor,
        transportSummary: tourPackage.transport?.join("; ") ?? "Transport details are not specified in the source listing.",
        factsNeedConfirmation: true,
        priceDisplay: {
          label: "Listed starting rate",
          value: startingPrice,
          note: "Confirm the current price and package configuration for your requested dates.",
        },
        summary: tourPackage.description,
        description: tourPackage.description,
        overview: tourPackage.description,
        highlights: [
          ...(tourPackage.bestFor ? [tourPackage.bestFor] : []),
          ...(tourPackage.pace ? [`${tourPackage.pace} pace`] : []),
          ...(tourPackage.routeHighlights ?? []),
        ],
        attractions: routeStops,
        itinerary: [],
        includes: tourPackage.includes ?? [],
        excludes: tourPackage.excludes ?? [],
        bookingPolicy: [
          "Request your preferred dates and group size to confirm availability and the current package configuration.",
        ],
        detailSections: [
          {
            title: "Room sharing prices",
            content: [
              ...(tourPackage.sharingPrices ? [`With Islamabad stays: quad PKR ${tourPackage.sharingPrices.quad.toLocaleString()}, triple PKR ${tourPackage.sharingPrices.triple.toLocaleString()}, twin PKR ${tourPackage.sharingPrices.twin.toLocaleString()}, solo PKR ${tourPackage.sharingPrices.solo.toLocaleString()}.`] : []),
              ...(tourPackage.sharingPricesWithoutIslamabadStay ? [`Without Islamabad stays: quad PKR ${tourPackage.sharingPricesWithoutIslamabadStay.quad.toLocaleString()}, triple PKR ${tourPackage.sharingPricesWithoutIslamabadStay.triple.toLocaleString()}, twin PKR ${tourPackage.sharingPricesWithoutIslamabadStay.twin.toLocaleString()}, solo PKR ${tourPackage.sharingPricesWithoutIslamabadStay.solo.toLocaleString()}.`] : []),
            ],
          },
          { title: "Route details", content: [`Listed stops: ${routeStops.join(" → ")}.`, ...(tourPackage.transport ?? [])] },
        ],
        priceWithIslamabadStay: `PKR ${sharingPrice.toLocaleString()}`,
        priceWithoutIslamabadStay: sharingPriceWithoutIslamabad ? `PKR ${sharingPriceWithoutIslamabad.toLocaleString()}` : "Confirm configuration",
        tourNotes: tourPackage.notes ?? [],
        refundPolicy: ["The applicable refund terms are shared with your confirmed itinerary and booking before payment."],
        terms: ["Routes and stop access may change with weather, road conditions, local guidance, or permissions."],
        travelerInstruction: ["Share your dates, group size, and preferred room configuration so the team can confirm the itinerary and current rate."],
        childPolicy: [],
      };
    }),
);

export async function generateStaticParams() {
  return allPackages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PackagePageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = allPackages.find((item) => item.slug === slug);

  if (!pkg) {
    return {};
  }

  return {
    title: pkg.title,
    description: pkg.summary,
    alternates: {
      canonical: `/packages/${pkg.slug}`,
    },
    openGraph: {
      title: pkg.title,
      description: pkg.summary,
      url: absoluteUrl(`/packages/${pkg.slug}`),
    },
  };
}

export default async function PackagePage({ params }: PackagePageProps) {
  const { slug } = await params;
  const pkg = allPackages.find((item) => item.slug === slug);

  if (!pkg) {
    notFound();
  }

  const packagePromotion = Object.values(PROMOTIONS).find((item) => item.eligibleTourIds.includes(pkg.slug));

  const travelDetailCards = [
    {
      title: "Accommodation",
      text: pkg.factsNeedConfirmation
        ? "The source listing does not specify hotel properties or room categories. Confirm accommodation for your requested dates."
        : "We plan room options by your group size and route preferences, with standard, deluxe, and executive hotel categories available when the route supports them.",
    },
    {
      title: "Transport",
      text: pkg.transportSummary ?? "Vehicle choice is matched to the terrain and group size, including AC travel and 4x4 options where the mountain route requires deeper access or rougher road conditions.",
    },
    {
      title: pkg.factsNeedConfirmation ? "Availability" : "Good to know",
      text: pkg.factsNeedConfirmation
        ? "Request your dates to confirm current availability, itinerary, and package configuration."
        : "Mountain routes can change with weather, road closures, and access permissions, so we keep the route flexible and communicate adjustments early.",
    },
  ];

  const faqs = [
    {
      question: "What is included in this package?",
      answer: pkg.factsNeedConfirmation
        ? "The source listing does not itemize inclusions for this journey. Request a dated quote with transport, accommodation, meals, and optional activities listed before booking."
        : "Most packages include the hotel stay, transport support, and the meals or route services described in the itinerary. Optional activities, personal purchases, and local entry charges are usually not included unless stated clearly.",
    },
    {
      question: "Can this trip be upgraded?",
      answer: pkg.factsNeedConfirmation
        ? "Ask the planning team which hotel, vehicle, and room-sharing options are available for your dates; any changes and price differences will be confirmed in your quote."
        : "Yes. We can usually move your tour to a higher hotel category, upgrade the vehicle, or adjust the room sharing for a more premium experience.",
    },
    {
      question: "What happens if the route changes?",
      answer: "If weather, road conditions, or local access limit the usual route, our team may revise the schedule or substitute a safe alternative while keeping the group experience comfortable and on track.",
    },
    {
      question: "How do I confirm my booking?",
      answer: "Share your preferred travel dates and group size with our team through WhatsApp or the inquiry form, and we will confirm the package, pricing, and booking process.",
    },
  ];

  return (
    <>
      <JsonLd
        data={buildPageSchema({
          title: pkg.title,
          description: pkg.summary,
          url: `/packages/${pkg.slug}`,
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Destinations", url: "/destinations" },
            { name: pkg.title, url: `/packages/${pkg.slug}` },
          ],
        })}
      />
      <PageShell wide>
      <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
        <div className="relative min-h-[62vh] md:min-h-[68vh]">
          <Image
            src={pkg.heroImage}
            alt={pkg.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,11,0.22)_0%,rgba(11,11,11,0.72)_100%)]" />

          <div className="relative z-10 mx-auto flex min-h-[62vh] max-w-[96rem] flex-col justify-end px-4 pb-12 pt-24 text-white md:min-h-[68vh] md:px-6 lg:px-10 xl:px-14">
            <p className="text-xs uppercase tracking-[0.34em] text-white/75">Destination Package</p>
            <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
              {pkg.title}
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/85 sm:text-base">
              {pkg.summary}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-[minmax(18rem,24rem)_minmax(0,1fr)] xl:gap-12">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[2rem] border border-stone-200 bg-white p-3 shadow-[0_12px_36px_rgba(15,23,42,0.08)]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-stone-100">
              <Image
                src={pkg.homeImage}
                alt={`${pkg.title} poster`}
                fill
                sizes="(max-width: 1024px) 100vw, 24rem"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </div>
          </div>

          <div className="mt-5 rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Tour Snapshot</p>
            <p className="mt-3 font-serif text-3xl text-stone-900">{pkg.duration}</p>
            <p className="mt-3 text-sm leading-7 text-stone-600">{pkg.description}</p>
            {pkg.scheduleNote ? <p className="mt-4 border-l-2 border-[#fcc000] pl-3 text-sm font-medium leading-6 text-stone-700">Schedule note: {pkg.scheduleNote}</p> : null}

            <div className="mt-5 rounded-[1.25rem] border border-[#fcc000]/30 bg-[#fff8df] p-4">
              <p className="text-[11px] uppercase tracking-[0.26em] text-stone-500">Package Pricing</p>
              {pkg.priceDisplay ? (
                <div className="mt-3 text-sm text-stone-700">
                  <div className="flex items-center justify-between gap-3">
                    <span>{pkg.priceDisplay.label}</span>
                    <span className="font-bold text-stone-900">{pkg.priceDisplay.value}</span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-stone-600">{pkg.priceDisplay.note}</p>
                </div>
              ) : <div className="mt-3 space-y-2 text-sm text-stone-700">
                <div className="flex items-center justify-between gap-3">
                  <span>With Islamabad stay</span>
                  <span className="font-bold text-stone-900">{pkg.priceWithIslamabadStay}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Without Islamabad stay</span>
                  <span className="font-bold text-stone-900">{pkg.priceWithoutIslamabadStay}</span>
                </div>
              </div>}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {pkg.highlights.map((item) => (
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
                href="/destinations"
                className="inline-flex rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800 transition hover:border-stone-400 hover:text-stone-900"
              >
                Back to Destinations
              </Link>
            </div>
          </div>
        </aside>

        <div>
          <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.06)] md:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Overview</p>
            <h2 className="mt-3 font-serif text-3xl text-stone-900">What to expect</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600">
              {pkg.overview}
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">Duration</p>
                <p className="mt-2 text-lg font-semibold text-stone-900">{pkg.duration}</p>
              </div>
              <div className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">Best for</p>
                <p className="mt-2 text-lg font-semibold text-stone-900">{pkg.bestFor ?? "Couples & groups"}</p>
              </div>
              <div className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">Schedule note</p>
                <p className="mt-2 text-lg font-semibold text-stone-900">{pkg.scheduleNote || "Flexible dates"}</p>
              </div>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-[#fcc000]/25 bg-[#fff8df] p-5">
              <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">Price transparency</p>
              {pkg.priceDisplay ? (
                <div className="mt-4 rounded-[1rem] bg-white p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{pkg.priceDisplay.label}</p>
                  <p className="mt-2 text-2xl font-black text-stone-900">{pkg.priceDisplay.value}</p>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{pkg.priceDisplay.note}</p>
                </div>
              ) : <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-[1rem] bg-white p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500">With Islamabad stay</p>
                  <p className="mt-2 text-2xl font-black text-stone-900">{pkg.priceWithIslamabadStay}</p>
                </div>
                <div className="rounded-[1rem] bg-white p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Without Islamabad stay</p>
                  <p className="mt-2 text-2xl font-black text-stone-900">{pkg.priceWithoutIslamabadStay}</p>
                </div>
              </div>}
            </div>

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

          <div className="mt-8 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.06)] md:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Included</p>
            <h2 className="mt-3 font-serif text-3xl text-stone-900">What this package includes</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
                <p className="text-sm font-semibold text-stone-900">Included in most packages</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
                  {pkg.includes?.length ? pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#fcc000]" />
                      <span>{item}</span>
                    </li>
                  )) : (
                    <li className="flex items-start gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#fcc000]" />
                      <span>Current inclusions are confirmed for your requested dates and package configuration.</span>
                    </li>
                  )}
                </ul>
              </div>
              <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
                <p className="text-sm font-semibold text-stone-900">{pkg.factsNeedConfirmation ? "Exclusions to confirm" : "Usually excluded"}</p>
                {pkg.excludes?.length ? (
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
                    {pkg.excludes.map((item) => <li key={item} className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-stone-400" /><span>{item}</span></li>)}
                  </ul>
                ) : (
                  <p className="mt-4 text-sm leading-7 text-stone-600">The source listing does not specify exclusions. Confirm all excluded costs before booking.</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.06)] md:p-8">            <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Travel details</p>
            <h2 className="mt-3 font-serif text-3xl text-stone-900">Everything you need to know before you book</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {travelDetailCards.map((card) => (
                <div key={card.title} className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
                  <p className="text-sm font-semibold text-stone-900">{card.title}</p>
                  <p className="mt-3 text-sm leading-7 text-stone-600">{card.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.06)] md:p-8">            <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Itinerary</p>
            <h2 className="mt-3 font-serif text-3xl text-stone-900">{pkg.itineraryHeading ?? "Day wise plan for this route"}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-600">
              {pkg.itineraryIntro ?? "A clear overview of how the journey flows, from arrival through the best scenic moments and the final return."}
            </p>

            <div className="mt-8">
              {pkg.itinerary.length ? (
                <details className="rounded-[1.75rem] border border-stone-200 bg-stone-50 p-5 shadow-sm" open>
                  <summary className="cursor-pointer text-lg font-semibold text-stone-900">Route outline</summary>
                  <div className="mt-5 space-y-5 text-sm leading-7 text-stone-600">
                    {pkg.itinerary.map((item) => (
                      <div key={`${pkg.slug}-${item.day}`}>
                        <p className="text-[11px] uppercase tracking-[0.34em] text-[#a37a00]">{item.day}</p>
                        <h3 className="mt-2 text-xl font-semibold text-stone-900">{item.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-stone-600">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </details>
              ) : (
                <p className="rounded-[1.5rem] border border-dashed border-stone-300 bg-stone-50 p-5 text-sm leading-7 text-stone-600">
                  No day-by-day itinerary is present in the source listing. Request your dates to confirm the route schedule.
                </p>
              )}
              {packagePromotion ? <PackagePromoCode tourId={pkg.slug} initialCode={packagePromotion.code} /> : null}
            </div>

            <div className="mt-8 space-y-4">
              {pkg.bookingPolicy?.length ? (
                <details className="rounded-[1.75rem] border border-stone-200 bg-stone-50 p-5 shadow-sm" open>
                  <summary className="cursor-pointer list-none text-lg font-semibold text-stone-900 before:content-['▶'] before:mr-3 before:inline-block before:text-[#0b0b0b] before:transition-transform before:group-open:rotate-90">Booking Procedure</summary>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
                    {pkg.bookingPolicy.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#fcc000]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : null}

              {pkg.includes?.length ? (
                <details className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer list-none text-lg font-semibold text-stone-900 before:content-['▶'] before:mr-3 before:inline-block before:text-[#0b0b0b]">Tour Includes</summary>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#fcc000]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : null}

              {pkg.tourNotes?.length ? (
                <details className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer list-none text-lg font-semibold text-stone-900 before:content-['▶'] before:mr-3 before:inline-block before:text-[#0b0b0b]">Tour Notes</summary>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
                    {pkg.tourNotes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#fcc000]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : null}

              {pkg.refundPolicy?.length ? (
                <details className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer list-none text-lg font-semibold text-stone-900 before:content-['▶'] before:mr-3 before:inline-block before:text-[#0b0b0b]">Refund Policy</summary>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
                    {pkg.refundPolicy.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#fcc000]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : null}

              {pkg.terms?.length ? (
                <details className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer list-none text-lg font-semibold text-stone-900 before:content-['▶'] before:mr-3 before:inline-block before:text-[#0b0b0b]">Terms & Conditions</summary>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
                    {pkg.terms.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#fcc000]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : null}

              {pkg.travelerInstruction?.length ? (
                <details className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer list-none text-lg font-semibold text-stone-900 before:content-['▶'] before:mr-3 before:inline-block before:text-[#0b0b0b]">Traveler&apos;s Instruction</summary>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
                    {pkg.travelerInstruction.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#fcc000]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : null}
            </div>

            {pkg.childPolicy?.length ? (
              <div className="mt-8 rounded-[2rem] border border-stone-200 bg-[#f7f4ea] p-6 shadow-sm">
                <h2 className="font-serif text-3xl text-stone-900">Child Policy</h2>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-700">
                  {pkg.childPolicy.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#0b0b0b]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {pkg.meals ? (
              <div className="mt-8 rounded-[2rem] border border-stone-200 bg-[#f7f4ea] p-6 shadow-sm">
                <h2 className="font-serif text-3xl text-stone-900">Meals Menu</h2>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Breakfast</p>
                    <p className="mt-2 text-sm leading-7 text-stone-700">{pkg.meals.breakfast}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Dinner</p>
                    <p className="mt-2 text-sm leading-7 text-stone-700">{pkg.meals.dinner}</p>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="mt-8 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-xs uppercase tracking-[0.32em] text-stone-500">FAQs</p>
              <h2 className="mt-3 font-serif text-3xl text-stone-900">Common questions before you book</h2>
              <div className="mt-6 space-y-4">
                {faqs.map((item) => (
                  <details key={item.question} className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4">
                    <summary className="cursor-pointer text-sm font-semibold text-stone-900">{item.question}</summary>
                    <p className="mt-3 text-sm leading-7 text-stone-600">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>

            {pkg.detailSections?.length ? (
              <div className="mt-8 space-y-4">
                {pkg.detailSections.map((section) => (
                  <details
                    key={section.title}
                    className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm"
                  >
                    <summary className="cursor-pointer list-none text-lg font-semibold text-stone-900 before:content-['▶'] before:mr-3 before:inline-block before:text-[#0b0b0b]">{section.title}</summary>
                    <div className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
                      {section.content.map((item) => (
                        <p key={item}>{item}</p>
                      ))}
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
              Open the trip builder and we will adjust hotels, transport, and pacing to match your preferred budget and route style.
            </p>
          </div>
        </div>
      </section>
      </PageShell>
    </>
  );
}
