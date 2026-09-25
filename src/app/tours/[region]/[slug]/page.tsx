import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/page-shell";
import { TourLanding } from "@/components/tour-landing";
import { tourPackages } from "@/lib/data/tour-packages";
import { absoluteUrl, destinations, tourMenu, whatsappUrl } from "@/lib/site";
import { buildPageSchema } from "@/lib/seo/structured-data";

type TourPackagePageProps = {
  params: Promise<{ region: string; slug: string }>;
};

function resolveRegion(region: string) {
  return tourMenu.find((group) => group.href.endsWith(`/${region}`));
}

function resolveItem(region: string, slug: string) {
  const group = resolveRegion(region);
  if (!group) {
    return { group: null, item: null };
  }

  const item = group.items.find((entry) => entry.href.endsWith(`/${slug}`));
  return { group, item };
}

function getDestinationTagsFromSlug(slug: string): string[] {
  const lower = slug.toLowerCase();
  const tags: string[] = [];

  if (lower.includes("hunza")) tags.push("hunza");
  if (lower.includes("skardu")) tags.push("skardu");
  if (lower.includes("kashmir")) tags.push("kashmir");
  if (lower.includes("swat")) tags.push("swat");
  if (lower.includes("naran")) tags.push("naran");
  if (lower.includes("shogran")) tags.push("shogran");
  if (lower.includes("astor")) tags.push("skardu");

  return tags.length ? tags : ["swat"];
}

function buildRouteContent(label: string) {
  const lower = label.toLowerCase();

  const itinerary = [
    { day: "Day 1", title: "Arrival and route setup", description: "Begin with arrival support, a smooth transfer, and an easy first evening to settle into the destination and restore energy for the trip." },
    { day: "Day 2", title: "Destination highlights", description: "Explore the region's signature viewpoints, heritage spots, and scenic stops while keeping the pace comfortable and photo-friendly." },
    { day: "Day 3", title: "Local experience and free time", description: "Enjoy the route at a slower rhythm with valleys, local food, culture, and relaxed downtime before the return or next leg." },
  ];

  const genericIncludes = [
    "Private or shared transport depending on trip structure",
    "Hotel coordination and route planning support",
    "Guidance for scenic stops and smooth daily pacing",
    "On-ground support for route changes and travel coordination",
  ];

  const genericExcludes = [
    "Personal shopping, extra meals, and beverages",
    "Entry tickets and optional activities",
    "Travel insurance and medical emergencies",
    "Any cost caused by weather, landslides, or force majeure",
  ];

  if (lower.includes("chitral")) {
    return {
      summary: "This Chitral route combines scenic mountain travel, heritage town stops, and comfortable valley pacing for travelers who want a northern journey that feels both cultural and cinematic.",
      itinerary: [
        { day: "Day 1", title: "Arrival and hotel check-in", description: "Travel to Chitral and settle into the accommodation after a scenic drive through the valley corridor." },
        { day: "Day 2", title: "Local sights and mountain viewpoints", description: "Explore the town, surrounding viewpoints, and characteristic spaces that define Chitral's landscape and pace." },
        { day: "Day 3", title: "Leisure, dining and onward movement", description: "Spend time enjoying local food, village atmosphere, and flexible sightseeing before the final route departure." },
      ],
      includes: [
        "Transport support from arrival to departure",
        "Accommodation arranged for the selected route",
        "Route planning and local guidance on route pacing",
        "Support for hotel and daily schedule coordination",
      ],
      excludes: [
        "Personal shopping and beverages",
        "Local attraction tickets or optional extras",
        "Travel insurance and emergency medical costs",
        "Any road or weather-related unplanned expenses",
      ],
      hotel: "Hotel category depends on your room sharing preference and season. We recommend confirming the room type before final payment.",
      vehicle: "Vehicle type is selected based on group size, route length, and mountain access. 4x4 may be used on uneven or remote sections when required.",
      pricing: "Pricing varies by season, hotel category, room sharing, and vehicle selection. Exact rates are confirmed once your dates and group size are finalized.",
      faqs: [
        { question: "What is included in the Chitral package?", answer: "Accommodation, route planning, transport support, and standard travel coordination are generally included. Optional tickets or extras are not included unless specifically stated." },
        { question: "Can I customize the hotel or room type?", answer: "Yes. We can usually adjust the room category, sharing basis, and vehicle selection to fit your comfort level and budget before booking." },
        { question: "Will the route change because of weather?", answer: "Mountain travel is weather-sensitive. If access is affected, we adapt the route to the safest operational plan and keep the trip comfortable and realistic." },
      ],
    };
  }

  if (lower.includes("hunza") || lower.includes("skardu") || lower.includes("naran") || lower.includes("swat") || lower.includes("kashmir")) {
    return {
      summary: `This ${label} route is designed for travelers who want scenic variety, a comfortable daily pace, and strong route coordination across mountain sections, valley viewpoints, and accommodation planning.`,
      itinerary,
      includes: genericIncludes,
      excludes: genericExcludes,
      hotel: "We match the hotel category to the route, season, and whether you want a standard, deluxe, or premium-room experience for your group.",
      vehicle: "A comfortable private vehicle is used for the route, with heavier mountain access or luggage needs reviewed ahead of booking to ensure comfort and safety.",
      pricing: "Starting prices vary by room sharing, hotel category, vehicle type, and season. We confirm the exact per-person rate once your trip dates and occupancy are confirmed.",
      faqs: [
        { question: "Is this package suitable for families or couples?", answer: "Yes. The route is structured to work well for families, couples, and private groups with flexible pacing and comfortable overnight planning." },
        { question: "What affects the price the most?", answer: "Hotel category, room sharing, season, and vehicle type usually drive the final price more than the destination itself." },
        { question: "What if the route is interrupted by weather?", answer: "We revise the plan to safer stops or alternative scenic points and notify travelers early so the trip remains smooth and secure." },
      ],
    };
  }

  return {
    summary: `${label} is planned to balance scenic highlights, comfortable overnight stays, and a route that feels exciting without becoming rushed.`,
    itinerary,
    includes: genericIncludes,
    excludes: genericExcludes,
    hotel: "Accommodation is selected according to the route, room-sharing plan, and the travel style you prefer for the trip.",
    vehicle: "Vehicle choice is matched to the group size and road conditions so the route feels comfortable and well supported.",
    pricing: "The final amount depends on occupancy, hotel grade, vehicle type, and trip length. We recommend confirming exact pricing before departure.",
    faqs: [
      { question: "Can I customize this route?", answer: "Yes. We can align the hotel category, daily route plan, and transport setup to your preferred travel rhythm and budget." },
      { question: "How early should I book?", answer: "Booking early is best, especially for peak seasons, because room availability and vehicle choice become tighter as dates approach." },
      { question: "Do weather changes affect the plan?", answer: "They can. We keep the itinerary flexible and select the safest practical route whenever local conditions change." },
    ],
  };
}

function getPackageImage(slug: string) {
  const normalized = slug.toLowerCase();
  if (normalized.includes("hunza")) return "/images/destinations/hunza-custom.webp";
  if (normalized.includes("skardu")) return "/images/destinations/skardu-1080x1920.webp";
  if (normalized.includes("astor")) return "/images/destinations/hunza-custom.webp";
  if (normalized.includes("naran") || normalized.includes("kaghan")) return "/images/destinations/naran-hd.webp";
  if (normalized.includes("swat")) return "/images/destinations/swat-hd.webp";
  if (
    normalized.includes("kashmir") ||
    normalized.includes("beach") ||
    normalized.includes("gwadar") ||
    normalized.includes("ormara") ||
    normalized.includes("charna") ||
    normalized.includes("bhit") ||
    normalized.includes("moola") ||
    normalized.includes("gorakh") ||
    normalized.includes("quetta")
  ) {
    return "/images/destinations/kashmir.webp";
  }
  return destinations[0]?.image ?? "/images/destinations/hunza.avif";
}

export async function generateStaticParams() {
  return tourMenu.flatMap((group) => {
    const region = group.href.split("/").filter(Boolean).at(-1) ?? "";
    return group.items.map((item) => ({
      region,
      slug: item.href.split("/").filter(Boolean).at(-1) ?? "",
    }));
  });
}

export async function generateMetadata({ params }: TourPackagePageProps): Promise<Metadata> {
  const { region, slug } = await params;
  const { item } = resolveItem(region, slug);

  if (!item) {
    return {};
  }

  const description = item.description ?? `${item.label} by Hodophile Adventures with curated route support.`;

  return {
    title: item.label,
    description,
    alternates: {
      canonical: item.href,
    },
    openGraph: {
      title: item.label,
      description,
      url: absoluteUrl(item.href),
    },
  };
}

export default async function TourPackagePage({ params }: TourPackagePageProps) {
  const { region, slug } = await params;
  const { group, item } = resolveItem(region, slug);

  if (!group || !item) {
    notFound();
  }

  const routeContent = buildRouteContent(item.label);
  const matchingPackages = tourPackages.filter((tourPackage) =>
    getDestinationTagsFromSlug(slug).some((tag) =>
      tourPackage.destinationSlugs.includes(tag) || tourPackage.title.toLowerCase().includes(tag),
    ),
  );

  return (
    <>
      <JsonLd
        data={buildPageSchema({
          title: item.label,
          description: item.description ?? `${item.label} by Hodophile Adventures with curated route support.`,
          url: item.href,
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Tours", url: "/tours" },
            { name: group.label, url: group.href },
            { name: item.label, url: item.href },
          ],
        })}
      />
      <PageShell wide>
        <TourLanding
          eyebrow={group.label}
          title={item.label}
          description={
            item.description ?? routeContent.summary
          }
          image={getPackageImage(slug)}
          highlights={["Tailored itinerary", "Route support", "Private options", "Booking assistance"]}
          ctaHref="/make-my-trip"
          ctaLabel="Request This Package"
        />

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] xl:gap-8">
          <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)] md:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Route overview</p>
            <h2 className="mt-3 font-serif text-3xl text-stone-900">Why this journey works</h2>
            <p className="mt-4 text-sm leading-7 text-stone-600">{routeContent.summary}</p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4">
                <p className="text-sm font-semibold text-stone-900">Hotel plan</p>
                <p className="mt-2 text-sm leading-7 text-stone-600">{routeContent.hotel}</p>
              </div>
              <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4">
                <p className="text-sm font-semibold text-stone-900">Vehicle plan</p>
                <p className="mt-2 text-sm leading-7 text-stone-600">{routeContent.vehicle}</p>
              </div>
              <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4">
                <p className="text-sm font-semibold text-stone-900">Pricing clarity</p>
                <p className="mt-2 text-sm leading-7 text-stone-600">{routeContent.pricing}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#fcc000] bg-[#fff8df] p-6 shadow-sm md:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Fast answer</p>
            <h2 className="mt-3 font-serif text-3xl text-stone-900">What drives the final price</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-700">
              <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#fcc000]" /><span>Room sharing and hotel category</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#fcc000]" /><span>Vehicle type and number of travel days</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#fcc000]" /><span>Seasonality and road conditions</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#fcc000]" /><span>Any custom add-ons or upgraded room requests</span></li>
            </ul>
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)] md:p-8">
          <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Typical itinerary</p>
          <h2 className="mt-3 font-serif text-3xl text-stone-900">Day-by-day flow</h2>
          <div className="mt-6 space-y-5">
            {routeContent.itinerary.map((entry) => (
              <div key={entry.day} className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
                <p className="text-[11px] uppercase tracking-[0.32em] text-[#a37a00]">{entry.day}</p>
                <h3 className="mt-2 text-xl font-semibold text-stone-900">{entry.title}</h3>
                <p className="mt-2 text-sm leading-7 text-stone-600">{entry.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2 xl:gap-8">
          <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)] md:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Included</p>
            <h2 className="mt-3 font-serif text-3xl text-stone-900">What&apos;s usually covered</h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-stone-600">
              {routeContent.includes.map((item) => (
                <li key={item} className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#fcc000]" /><span>{item}</span></li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)] md:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Not included</p>
            <h2 className="mt-3 font-serif text-3xl text-stone-900">What is usually separate</h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-stone-600">
              {routeContent.excludes.map((item) => (
                <li key={item} className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#0b0b0b]" /><span>{item}</span></li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)] md:p-8">
          <div className="flex items-end justify-between gap-4 border-b border-stone-200 pb-5">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Available departures</p>
              <h2 className="mt-3 font-serif text-3xl text-stone-900">{matchingPackages.length} matching packages</h2>
            </div>
            <Link href="/tours" className="text-sm font-medium text-stone-600 transition hover:text-[#8b6b00]">View all tours</Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {matchingPackages.map((pkg) => (
              <article key={pkg.id} className="group rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 transition hover:-translate-y-1 hover:border-[#fcc000] hover:bg-[#fff8df]">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#9a7600]">{pkg.duration}</p>
                <Link href={`/packages/${pkg.id}`} className="block">
                  <h3 className="mt-3 font-serif text-2xl leading-tight text-stone-900">{pkg.title}</h3>
                </Link>
                <p className="mt-3 text-sm text-stone-600">{pkg.departure}</p>
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-stone-200 pt-3">
                  <span className="text-sm font-semibold text-stone-900">PKR {pkg.pricePerPerson.toLocaleString()}</span>
                  <Link href={`/packages/${pkg.id}`} className="text-xs uppercase tracking-[0.16em] text-stone-500 group-hover:text-[#8b6b00]">View route ↗</Link>
                </div>
                <a
                  href={whatsappUrl(`Hi Hodophile, I am interested in ${pkg.title}. Please confirm availability and the best current price.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#1f6b4a] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#174f37]"
                >
                  Check availability
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)] md:p-8">
          <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Frequently asked</p>
          <h2 className="mt-3 font-serif text-3xl text-stone-900">Questions travelers usually ask</h2>
          <div className="mt-6 space-y-4">
            {routeContent.faqs.map((faq) => (
              <details key={faq.question} className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4">
                <summary className="cursor-pointer text-sm font-semibold text-stone-900">{faq.question}</summary>
                <p className="mt-3 text-sm leading-7 text-stone-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-[#fcc000] bg-[#fff8df] p-6 shadow-sm md:p-8">
          <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Need a custom plan?</p>
          <h2 className="mt-3 font-serif text-3xl text-stone-900">Tell us your dates and we will tailor the route around you.</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/make-my-trip" className="inline-flex rounded-full bg-[#0b0b0b] px-5 py-3 text-sm font-semibold !text-white transition hover:bg-black">Customize this trip</a>
            <a href={whatsappUrl(`Hi Hodophile, I want to book the ${item.label} package. Please share availability and the best current price.`)} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full border border-[#0b0b0b] px-5 py-3 text-sm font-semibold text-stone-900 transition hover:border-[#fcc000] hover:bg-[#fcc000]/10">WhatsApp a travel expert</a>
          </div>
        </section>
      </PageShell>
    </>
  );
}