import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/page-shell";
import { getPackagePath } from "@/lib/data/package-routes";
import type { TourPackage } from "@/lib/data/tour-packages";
import { absoluteUrl } from "@/lib/site";
import { buildPageSchema } from "@/lib/seo/structured-data";

const pagePath = "/tours/northern-tours/kashmir-valley-tour-packages";
const pageTitle = "Best Kashmir Tour Packages Pakistan | Hodophile";
const pageDescription =
  "Book Kashmir tour packages from Islamabad with Hodophile Adventures. Private Neelum Valley trips to Keran, Arang Kel & Taobat. From PKR 32,000/person.";
const heroImage = "/images/destinations/kashmir.webp";
const heroImageAlt = "Neelum Valley river and green mountains in Azad Kashmir, Pakistan";
const whatsappNumber = "https://wa.me/923377777460";

const faqs = [
  {
    question: "Are fixed departure dates listed?",
    answer: "No date specific departures are currently listed for these journeys. Request your dates to confirm availability.",
  },
  {
    question: "Where can I confirm package details?",
    answer: "Open a linked canonical journey to review its listed route, price, and notes, then confirm date specific arrangements with the planning team.",
  },
  {
    question: "What is the best time to visit Kashmir?",
    answer: "April to October is the best time for most Kashmir tour packages, with clear roads and lush green valleys. Winter can bring snow, especially on routes to Arang Kel and Taobat.",
  },
  {
    question: "Do you offer Kashmir tour packages from Lahore, Karachi, and Islamabad?",
    answer: "Our listed packages start from Islamabad. Travelers from Lahore, Karachi, Rawalpindi, and Faisalabad can join in Islamabad or request a custom pickup plan.",
  },
  {
    question: "How many days do I need for a Neelum Valley tour?",
    answer: "Four to seven days suits most trips. Our 4 day Kashmir and Arangkel package covers Keran and Arang Kel, while longer routes add Shogran, Murree, or Taobat.",
  },
  {
    question: "Is Arang Kel included in Kashmir tour packages?",
    answer: "Yes. Our Kashmir and Arangkel and Kashmir with Arang Kel and Taobat journeys include Arang Kel. Access depends on weather and local conditions.",
  },
  {
    question: "Do you offer private and family Kashmir tour packages?",
    answer: "Yes. Hodophile offers private Kashmir tour packages and family Kashmir tours with a comfortable vehicle, hotel stays, and flexible stops.",
  },
  {
    question: "What is usually included in a Kashmir tour package?",
    answer: "Packages usually include hotel accommodation, a Honda BR V or equivalent vehicle, breakfast, a tour guide, tolls, and taxes. A 4x4 jeep is included where routes require it. Chairlift tickets and optional activities are usually separate.",
  },
] as const;

const hotelPlanItems = ["Accommodation", "Breakfast", "Clean and comfortable hotel stays"];
const vehiclePlanItems = [
  "Honda BR V or equivalent private vehicle",
  "Local 4x4 jeep for Arang Kel, Taobat, and off road sections where required",
  "Bonfire on selected packages",
];
const pricingClarityItems = [
  "Kashmir, Swat and Shogran: PKR 50,000",
  "Kashmir and Arangkel: PKR 32,000",
  "Kashmir, Shogran and Murree: PKR 39,000",
  "Kashmir with Arang Kel and Taobat: PKR 46,500",
];
const priceFactorItems = [
  "Room sharing and hotel category",
  "Vehicle type and number of travel days",
  "Seasonality and road conditions",
  "Custom add ons or upgraded room requests",
];
const usuallyCoveredItems = [
  "Hotel accommodation",
  "Honda BR V or equivalent private vehicle",
  "Breakfast",
  "Tour guide",
  "Tolls and taxes",
  "Bonfire on selected itineraries",
  "4x4 jeep for routes that require it, such as Arang Kel and Taobat",
];
const usuallySeparateItems = [
  "Chairlift tickets and optional activities",
  "Lunch, dinner, and personal expenses",
  "Entry fees not listed in the package",
];
const attractionTags = [
  "Neelum Valley",
  "Keran",
  "Sharda",
  "Upper Neelum",
  "Kel",
  "Arang Kel",
  "Taobat",
  "Kutton Waterfall",
  "Kundal Shahi",
  "Dhani Waterfall",
  "Shogran",
  "Murree",
  "Swat",
  "Malam Jabba",
];
const whyChooseItems = [
  "Licensed Pakistan tour operator, License No. 5436",
  "TAAP and PATO affiliated travel company",
  "Clear per person pricing with no hidden surprises",
  "Private vehicles, 4x4 jeeps where needed, and experienced drivers",
  "Responsive WhatsApp support and tailored itineraries",
];

function SectionHeading({ label, children }: { label: string; children: string }) {
  return (
    <div>
      <p className="eyebrow text-stone-600">{label}</p>
      <h2 className="display-serif mt-3 text-3xl leading-tight text-stone-950 sm:text-4xl">{children}</h2>
    </div>
  );
}

function ListItems({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#fcc000]" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

type CardSpec = {
  id: string;
  heading: string;
  description: string;
  scheduleNote: string;
};

const cardSpecs: CardSpec[] = [
  {
    id: "kashmir-swat-shogran-7-days",
    heading: "Kashmir, Swat and Shogran",
    description: "A seven day combined journey from Kashmir through Swat and Malam Jabba to Shogran Meadows.",
    scheduleNote: "Seven day combined tour from Islamabad; Arang Kel, chairlift, jeep, weather, and road access remain subject to local conditions.",
  },
  {
    id: "kashmir-arangkel-4-days",
    heading: "Kashmir and Arangkel",
    description: "A four day Neelum Valley journey through Keran and Sharda, with an Arang Kel village and meadow excursion.",
    scheduleNote: "Four day tour from Islamabad; waterfall access, chairlift availability, and road conditions are subject to local conditions.",
  },
  {
    id: "kashmir-shogran-9-days",
    heading: "Kashmir, Shogran and Murree",
    description: "A six day private tour from Islamabad through Keran and Muzaffarabad to Shogran, with a Murree pickup.",
    scheduleNote: "Six day private tour from Islamabad; Day 1 pickup is listed from Murree.",
  },
  {
    id: "seasonal-11",
    heading: "Kashmir with Arang Kel and Taobat",
    description: "A five day tour from Islamabad through Sharda, Kel, Arang Kel, Taobat, and Keran, with a return via Kutton Waterfall.",
    scheduleNote: "Five day private tour from Islamabad; schedule and access are subject to local conditions.",
  },
];

export function KashmirTourPageContent({ packages }: { packages: TourPackage[] }) {
  const packageMap = new Map(packages.map((tourPackage) => [tourPackage.id, tourPackage]));
  const cards = cardSpecs
    .map((spec) => ({ spec, tourPackage: packageMap.get(spec.id) }))
    .filter((entry): entry is { spec: CardSpec; tourPackage: TourPackage } => Boolean(entry.tourPackage));
  const startingPrice = cards.length ? Math.min(...cards.map(({ tourPackage }) => tourPackage.pricePerPerson)) : 32000;

  return (
    <>
      <JsonLd
        data={buildPageSchema({
          title: pageTitle,
          description: pageDescription,
          url: pagePath,
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Tours", url: "/tours" },
            { name: "Northern Tours", url: "/tours/northern-tours" },
            { name: "Kashmir Valley", url: pagePath },
          ],
        })}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />
      <PageShell wide>
        <nav aria-label="Breadcrumb" className="mb-5 text-xs text-stone-500 sm:text-sm">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-stone-800">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/tours" className="hover:text-stone-800">Tours</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/tours/northern-tours" className="hover:text-stone-800">Northern Tours</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-stone-800">Kashmir Valley</li>
          </ol>
        </nav>

        <section className="overflow-hidden rounded-[2rem] border border-[#fcc000]/20 bg-[#11110f] text-white shadow-[0_28px_80px_rgba(0,0,0,0.2)]">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-64 sm:min-h-80 lg:min-h-[32rem]">
              <Image src={heroImage} alt={heroImageAlt} fill sizes="(max-width: 1024px) 100vw, 45vw" fetchPriority="high" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <div className="theme-preserve-dark flex flex-col justify-center bg-[radial-gradient(circle_at_100%_0%,rgba(252,192,0,0.13),transparent_38%),linear-gradient(145deg,#19170f,#0b0b0a)] p-6 sm:p-8 lg:p-10 xl:p-12">
              <p className="eyebrow text-[#fcc000]">Northern Tours</p>
              <h1 className="display-serif mt-4 text-3xl font-normal leading-tight text-white sm:text-4xl xl:text-5xl">Kashmir Tour Packages</h1>
              <p className="mt-5 text-sm leading-7 text-white/75 sm:text-base">Hodophile Adventures offers private Kashmir tour packages from Islamabad for families, couples, and groups who want to experience Neelum Valley, Arang Kel, and Taobat without the stress of planning. Our Azad Kashmir tour packages include hotel accommodation, transport, and a tour guide, with routes covering Keran, Sharda, Shogran, and Murree. As a licensed Pakistan tour operator, we build every Kashmir trip around real road conditions and clear per person pricing.</p>
              <p className="mt-5 border-l-2 border-[#fcc000] pl-4 text-sm font-medium text-white/85">Neelum Valley and calm mountain routes.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Tailored itinerary", "Route support", "Private options", "Booking assistance"].map((highlight) => (
                  <span key={highlight} className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-1.5 text-xs text-white/75">{highlight}</span>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/make-my-trip" className="site-button-primary !text-black">Request This Package</Link>
                <a href={`${whatsappNumber}?text=${encodeURIComponent("Hi Hodophile, I am interested in Kashmir Valley tour packages. Please share availability and current rates.")}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#fcc000] hover:bg-white/10">WhatsApp an expert</a>
                <Link href="/tours" className="site-button-secondary border-white/25 text-white">Back to Tours</Link>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Kashmir tour highlights" className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [`${cards.length || 4} Matching journeys`, "Explore current package options"],
            [`PKR ${startingPrice.toLocaleString()} Listed from`, "Per person"],
            ["4 to 7 days", "Private road routes"],
            ["Private options available", "Plan around your group"],
          ].map(([value, detail]) => (
            <div key={value} className="rounded-2xl border border-stone-200 bg-white p-4 shadow-[0_10px_28px_rgba(54,44,18,0.05)]">
              <p className="font-semibold text-stone-900">{value}</p>
              <p className="mt-1 text-xs leading-5 text-stone-600">{detail}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
            <SectionHeading label="Route overview">Kashmir Valley Tour Packages in Pakistan</SectionHeading>
            <p className="mt-5 text-sm leading-7 text-stone-600">Our Kashmir Valley tour packages take you through the rivers, forests, and mountain villages of Azad Kashmir, with Neelum Valley at the heart of every route. From Keran and Upper Neelum to Sharda, Kel, and the alpine meadows of Arang Kel, each journey is planned as a private road trip from Islamabad with realistic driving days and confirmed stops.</p>
            <p className="mt-4 text-sm leading-7 text-stone-600">Hodophile combines local route knowledge with clear planning, so you know what is included, which vehicle is used, and how the final price is set before you travel. Whether you are looking for a short Neelum Valley tour package or a longer Kashmir holiday that includes Swat, Shogran, or Murree, this page helps you compare options and book with confidence.</p>
            <h3 className="mt-7 font-[var(--font-display)] text-2xl text-stone-950">Why this journey works</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                <h4 className="font-semibold text-stone-900">Hotel plan</h4>
                <ListItems items={hotelPlanItems} />
              </div>
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                <h4 className="font-semibold text-stone-900">Vehicle plan</h4>
                <ListItems items={vehiclePlanItems} />
              </div>
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 sm:col-span-2 xl:col-span-1">
                <h4 className="font-semibold text-stone-900">Pricing clarity</h4>
                <ListItems items={pricingClarityItems} />
                <p className="mt-4 text-xs leading-6 text-stone-500">Note: Per person.</p>
              </div>
            </div>
          </article>
          <article className="rounded-[1.75rem] border border-[#d7c58d]/60 bg-[linear-gradient(145deg,#fffdf7,#f7f1e2)] p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
            <p className="eyebrow text-stone-600">Plan with clarity</p>
            <h3 className="mt-3 font-[var(--font-display)] text-2xl text-stone-950">What drives the final price</h3>
            <ListItems items={priceFactorItems} />
          </article>
        </section>

        <section id="available-departures" className="mt-12 scroll-mt-24">
          <SectionHeading label="Canonical journeys">Kashmir Tour Packages: 4 Matching Journeys</SectionHeading>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-stone-600">Compare our Kashmir tour packages in one place. Prices are listed per person. This destination page does not have one approved day by day plan for every departure, so open a package to review its itinerary and confirm the final schedule with our team.</p>
          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {cards.map(({ spec, tourPackage }) => {
              const packagePath = getPackagePath(tourPackage.id);
              return (
                <article key={tourPackage.id} className="group flex h-full flex-col rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-[0_12px_34px_rgba(54,44,18,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#c39a21]/70">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b6b00]">{tourPackage.duration}</p>
                  <h3 className="mt-3 font-[var(--font-display)] text-xl leading-tight text-stone-950"><Link href={packagePath}>{spec.heading}</Link></h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-stone-600">{spec.description}</p>
                  <p className="mt-3 text-xs leading-6 text-stone-500">Schedule note: {spec.scheduleNote}</p>
                  <p className="mt-4 border-t border-stone-200 pt-4 text-sm font-semibold text-stone-900">Price: PKR {tourPackage.pricePerPerson.toLocaleString()}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link href={packagePath} className="site-button-primary !px-4 !py-2.5 !text-sm !normal-case !tracking-normal !text-black">View journey</Link>
                    <a href={`${whatsappNumber}?text=${encodeURIComponent(`Hi Hodophile, I am interested in ${spec.heading}. Please confirm availability and the best current price.`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center justify-center rounded-full border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-900 transition hover:border-[#c39a21]">Check availability</a>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="mt-5"><Link href="/tours" className="text-sm font-semibold text-[#8b6b00] underline decoration-[#d9a407]/50 underline-offset-4">View all tours</Link></p>
        </section>

        <section className="mt-12 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
          <SectionHeading label="Kashmir tour packages with hotel, transport, and breakfast">What Is Included in Our Kashmir Tour Packages</SectionHeading>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-stone-600">Every Kashmir tour package lists what is covered so you can compare the real tour cost. The exact inclusions are confirmed for the package you choose.</p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
              <h3 className="font-[var(--font-display)] text-xl text-stone-950">What&apos;s usually covered</h3>
              <ListItems items={usuallyCoveredItems} />
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
              <h3 className="font-[var(--font-display)] text-xl text-stone-950">What is usually separate</h3>
              <ListItems items={usuallySeparateItems} />
            </div>
          </div>
        </section>

        <section className="mt-12">
          <SectionHeading label="Made for every traveler">Family, Honeymoon, and Private Kashmir Tour Packages</SectionHeading>
          <div className="mt-5 space-y-4 text-sm leading-7 text-stone-600">
            <p>Kashmir is one of Pakistan&apos;s most loved destinations for family holidays. Our family Kashmir tour packages offer a comfortable pace, family friendly hotels, and a private vehicle so children and elders can travel with ease. Neelum Valley&apos;s riverside villages, green meadows, and short scenic walks make it a natural fit for families looking for a peaceful mountain break.</p>
            <p>Couples can choose Kashmir honeymoon packages with private transport, quiet stays in Keran or Shogran, and time to explore Arang Kel and Upper Neelum at a relaxed pace. For a wider selection of romantic getaways, see our <Link href="/honeymoon-packages" className="font-semibold text-[#8b6b00] underline decoration-[#d9a407]/50 underline-offset-4">Honeymoon Packages</Link>.</p>
            <p>Friends and small groups can book shared Kashmir trips, while travelers who want full flexibility can choose a private Kashmir tour package with a custom itinerary and fixed vehicle. If you prefer to plan your own route, try our <Link href="/trip-suggestions" className="font-semibold text-[#8b6b00] underline decoration-[#d9a407]/50 underline-offset-4">Trip Finder</Link> or build a plan through <Link href="/make-my-trip" className="font-semibold text-[#8b6b00] underline decoration-[#d9a407]/50 underline-offset-4">Make My Trip</Link>.</p>
          </div>
        </section>

        <section className="mt-12">
          <SectionHeading label="Rivers, valleys, and meadows">Neelum Valley Tour Highlights and Sightseeing</SectionHeading>
          <p className="mt-5 text-sm leading-7 text-stone-600">Neelum Valley is the centerpiece of Azad Kashmir tourism, known for its turquoise river, pine forests, wooden bridges, and remote mountain villages. Our Neelum Valley tour packages cover the valley from Keran and Upper Neelum to Sharda, Kel, and the high meadows of Arang Kel and Taobat. Each route is planned with practical driving times, local jeep transfers where roads require them, and stops at the valley&apos;s best viewpoints and waterfalls.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {attractionTags.map((tag) => (
              <span key={tag} className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-700">{tag}</span>
            ))}
          </div>
          <p className="mt-5 text-sm leading-7 text-stone-600">Some packages also combine Kashmir with Swat, Malam Jabba, Shogran, or Murree for travelers who want to see more of northern Pakistan in one trip. Stops differ by package, and access to Arang Kel and Taobat depends on weather and road conditions. Want to explore more? See our <Link href="/tours/northern-tours/swat-valley-tour-packages" className="font-semibold text-[#8b6b00] underline decoration-[#d9a407]/50 underline-offset-4">Swat Valley Tour Packages</Link>, <Link href="/tours/northern-tours/naran-valley-tour-packages" className="font-semibold text-[#8b6b00] underline decoration-[#d9a407]/50 underline-offset-4">Naran Valley Tour Packages</Link>, <Link href="/tours/northern-tours/hunza-valley-tour-packages" className="font-semibold text-[#8b6b00] underline decoration-[#d9a407]/50 underline-offset-4">Hunza Valley Tour Packages</Link>, or <Link href="/tours/northern-tours/skardu-valley-tour-packages" className="font-semibold text-[#8b6b00] underline decoration-[#d9a407]/50 underline-offset-4">Skardu Valley Tour Packages</Link>.</p>
        </section>

        <section className="mt-12 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
          <SectionHeading label="Choose how you travel">Kashmir Tour Packages from Islamabad, Lahore, and Karachi</SectionHeading>
          <p className="mt-5 text-sm leading-7 text-stone-600">Our listed Kashmir tour packages start from Islamabad, with private road travel into Azad Kashmir and Neelum Valley. Travelers from Lahore, Karachi, Rawalpindi, and Faisalabad can join in Islamabad or request a custom pickup arrangement.</p>
          <p className="mt-4 text-sm leading-7 text-stone-600">Browse more <Link href="/tours/northern-tours#by-road" className="font-semibold text-[#8b6b00] underline decoration-[#d9a407]/50 underline-offset-4">Northern Pakistan road journeys</Link> or plan a custom route through <Link href="/make-my-trip" className="font-semibold text-[#8b6b00] underline decoration-[#d9a407]/50 underline-offset-4">Make My Trip</Link>. Our Kashmir journeys run from 4 to 7 days. Shorter or longer plans, including combined trips with Swat, Shogran, Murree, or Hunza, can be arranged on request.</p>
          <h3 className="mt-6 font-[var(--font-display)] text-2xl text-stone-950">Best time to visit Kashmir</h3>
          <p className="mt-3 text-sm leading-7 text-stone-600">April to October is the best season for most Kashmir and Neelum Valley tours, with open roads, green landscapes, and comfortable weather. Winter brings snow to higher areas such as Arang Kel and Taobat, and some routes may close. We confirm road and weather conditions before every departure so your plan stays realistic.</p>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
            <SectionHeading label="Kashmir tour booking">Kashmir Tour Booking, Hotels, and Transport Services</SectionHeading>
            <p className="mt-5 text-sm leading-7 text-stone-600">Booking a Kashmir tour with Hodophile is straightforward. Share your travel dates, group size, and preferred route on WhatsApp or through our website. We confirm availability, share the itinerary and per person price, and finalize your reservation once you approve the plan.</p>
            <p className="mt-4 text-sm leading-7 text-stone-600">Our Kashmir tour services include hotel booking, private transport in a Honda BR V or equivalent vehicle, 4x4 jeep arrangements for Arang Kel and Taobat where needed, a tour guide, and full trip planning. Every Kashmir tour package with hotel and transport is arranged by a team that knows Neelum Valley roads, seasons, and local conditions.</p>
          </article>
          <article className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
            <SectionHeading label="Why travelers trust us">Why Choose Hodophile Adventures for Kashmir Tours</SectionHeading>
            <ListItems items={whyChooseItems} />
          </article>
        </section>

        <section className="mt-12 rounded-[1.75rem] border border-[#d7c58d]/60 bg-[linear-gradient(145deg,#fffdf7,#f7f1e2)] p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
          <h2 className="display-serif text-3xl leading-tight text-stone-950 sm:text-4xl">Book Your Kashmir Tour with Hodophile Adventures</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600">Share your dates and group size, and we will confirm availability and the best current price for your Kashmir journey.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/make-my-trip" className="site-button-primary !text-black">Request This Package</Link>
            <a href={`${whatsappNumber}?text=${encodeURIComponent("Hi Hodophile, I want to book a Kashmir tour package. Please confirm availability and the best current price.")}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-900 transition hover:border-[#c39a21]">WhatsApp an expert</a>
          </div>
        </section>

        <section className="mt-12 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
          <SectionHeading label="Frequently asked">Questions Travelers Usually Ask</SectionHeading>
          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4">
                <summary className="cursor-pointer text-sm font-semibold text-stone-900">{faq.question}</summary>
                <p className="mt-3 text-sm leading-7 text-stone-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-[1.75rem] border border-[#d7c58d]/60 bg-[linear-gradient(145deg,#fffdf7,#f7f1e2)] p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
          <p className="eyebrow text-stone-600">Need a custom plan?</p>
          <h2 className="display-serif mt-3 text-3xl leading-tight text-stone-950 sm:text-4xl">Tell us your dates and we will tailor the route around you.</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/make-my-trip" className="site-button-primary !text-black">Customize this trip</Link>
            <a href={`${whatsappNumber}?text=${encodeURIComponent("Hi Hodophile, I want a custom Kashmir trip plan. Please share availability and the best current price.")}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-900 transition hover:border-[#c39a21]">WhatsApp a travel expert</a>
          </div>
        </section>

        <section className="mt-8 border-t border-stone-200 pt-6">
          <p className="text-sm text-stone-600">
            <Link href="/destinations" className="font-semibold text-[#8b6b00] underline decoration-[#d9a407]/50 underline-offset-4">Destinations</Link>
            {" | "}
            <Link href="/beyond-pakistan" className="font-semibold text-[#8b6b00] underline decoration-[#d9a407]/50 underline-offset-4">Beyond Pakistan</Link>
            {" | "}
            <Link href="/blogs" className="font-semibold text-[#8b6b00] underline decoration-[#d9a407]/50 underline-offset-4">Blogs</Link>
            {" | "}
            <Link href="/about-us" className="font-semibold text-[#8b6b00] underline decoration-[#d9a407]/50 underline-offset-4">About Us</Link>
            {" | "}
            <Link href="/contact-us" className="font-semibold text-[#8b6b00] underline decoration-[#d9a407]/50 underline-offset-4">Contact Us</Link>
          </p>
        </section>
      </PageShell>
    </>
  );
}

export const kashmirTourPageMetadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: pagePath },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: absoluteUrl(pagePath),
    images: [{ url: heroImage, alt: heroImageAlt }],
  },
};
