import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/page-shell";
import { getPackagePath } from "@/lib/data/package-routes";
import type { TourPackage } from "@/lib/data/tour-packages";
import { absoluteUrl } from "@/lib/site";
import { buildPageSchema } from "@/lib/seo/structured-data";

const pagePath = "/tours/northern-tours/swat-valley-tour-packages";
const pageTitle = "Best Affordable Swat Valley Tour Packages | Hodophile";
const pageDescription =
  "Book the best affordable Swat Valley tour packages in Pakistan. Private Kalam, Malam Jabba, and Shogran trips with hotel and guide. From PKR 33,500.";
const heroImage = "/images/package-cards/images__destinations__swat-hd.webp";
const heroImageAlt = "Swat Valley green hills and river scenery in Khyber Pakhtunkhwa, Pakistan";
const whatsappNumber = "https://wa.me/923377777460";

const packageHeadingById: Record<string, string> = {
  "swat-kalam-shogran-10-days": "Swat, Shogran and Khanpur Dam",
  "swat-kalam-malam-jabba-khanpur-4-days": "Swat, Kalam and Malam Jabba",
};

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
    question: "How much does a Swat Valley tour cost?",
    answer: "Listed prices start from PKR 33,500 per person for the 4 day Swat, Kalam and Malam Jabba journey. The 6 day journey with Balakot and Shogran is PKR 47,500 per person.",
  },
  {
    question: "How many days do I need for Swat and Kalam?",
    answer: "Our listed journeys run 4 and 6 days. Four days covers Kalam, Ushu Forest, and Malam Jabba. Shorter or longer plans, such as 3 or 5 days, can be customized.",
  },
  {
    question: "What is the best time to visit Swat Valley?",
    answer: "Spring to autumn, roughly March to October, is best for green valleys and lakes. Winter brings snow to Malam Jabba. We confirm road conditions before every departure.",
  },
  {
    question: "Do you offer Swat Valley tours from Lahore, Islamabad, and Karachi?",
    answer: "Our listed private tours start from Islamabad. Travelers from Lahore, Karachi, Rawalpindi, Faisalabad, and Multan can join in Islamabad or ask for a custom plan.",
  },
  {
    question: "Is Swat Valley good for family trips?",
    answer: "Yes. Swat has gentle scenery, easy sightseeing, and family friendly hotels. We plan a comfortable vehicle, flexible stops, and a relaxed pace for children.",
  },
  {
    question: "What is usually included in a Swat Valley tour package?",
    answer: "Packages usually cover accommodation, breakfast, a tour guide, a Honda BR V or luxury vehicle, tolls and taxes, and a bonfire. Chairlift, zipline, entry tickets, and optional activities are usually separate.",
  },
] as const;

const hotelPlanItems = ["Accommodation"];
const vehiclePlanItems = [
  "Honda BR V",
  "4x4 jeep for Ushu Forest, Palogha Valley, Matiltan, Mahudand Lake, and Shogran",
  "Luxury transport",
  "4x4 jeep for Ushu Forest, Palogha Valley, Matiltan, and Mahudand Lake",
];
const pricingClarityItems = [
  "Swat, Kalam, Malam Jabba, Balakot and Shogran: PKR 47,500",
  "Swat, Kalam and Malam Jabba: PKR 33,500",
];
const priceFactorItems = [
  "Room sharing and hotel category",
  "Vehicle type and number of travel days",
  "Seasonality and road conditions",
  "Any custom add ons or upgraded room requests",
];
const usuallyCoveredItems = [
  "Accommodation",
  "Breakfast",
  "Tour guide",
  "Honda BR V",
  "Tolls and taxes",
  "Bonfire",
  "Luxury transport",
];
const usuallySeparateItems = [
  "Chairlift, zipline, and other Malam Jabba activities",
  "Entry tickets and optional activities",
  "Khanpur Dam entry tickets and activities, including paragliding, speedboat, and jet ski",
];
const attractionTags = [
  "Mingora",
  "Madyan",
  "Bahrain",
  "Kalam Valley",
  "Malam Jabba",
  "Mahodand Lake",
  "Ushu Forest",
  "Matiltan",
  "Palogha Valley",
  "Balakot",
  "Shogran",
  "Fizagat Park",
  "White Palace Marghazar",
  "Swat Museum",
  "Kundol Lake",
  "Gabral Valley",
  "Utror Valley",
  "Khanpur Dam",
];
const whyChooseItems = [
  "Licensed tour operator, License No. 5436, with TAAP and PATO affiliations",
  "Top rated service with a tour guide and comfortable vehicles on listed journeys",
  "Clear per person prices and honest inclusions",
  "Private options and tailored itineraries",
  "Round the clock customer service and WhatsApp support",
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

export function SwatTourPageContent({ packages }: { packages: TourPackage[] }) {
  const swatPackages = [...packages].sort((a, b) => b.duration.localeCompare(a.duration));
  const startingPrice = swatPackages.length ? Math.min(...swatPackages.map((tourPackage) => tourPackage.pricePerPerson)) : 33500;

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
            { name: "Swat Valley", url: pagePath },
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
            <li aria-current="page" className="text-stone-800">Swat Valley</li>
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
              <h1 className="display-serif mt-4 text-3xl font-normal leading-tight text-white sm:text-4xl xl:text-5xl">Best Affordable Swat Valley Tour Packages</h1>
              <p className="mt-5 text-sm leading-7 text-white/75 sm:text-base">Hodophile offers the best affordable Swat Valley tour packages in Pakistan, with private road journeys from Islamabad to Kalam, Malam Jabba, Balakot, and Shogran. Enjoy green hills, pine forests, and alpine lakes, with accommodation, a comfortable vehicle, and a guide arranged by a licensed Pakistan tour operator.</p>
              <p className="mt-5 border-l-2 border-[#fcc000] pl-4 text-sm font-medium text-white/85">Green valleys and calm domestic routes.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Tailored itinerary", "Route support", "Private options", "Booking assistance"].map((highlight) => (
                  <span key={highlight} className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-1.5 text-xs text-white/75">{highlight}</span>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/make-my-trip" className="site-button-primary !text-black">Request This Package</Link>
                <a href={`${whatsappNumber}?text=${encodeURIComponent("Hi Hodophile, I am interested in Swat Valley Tour Packages. Please share availability and current rates.")}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#fcc000] hover:bg-white/10">WhatsApp an expert</a>
                <Link href="/tours" className="site-button-secondary border-white/25 text-white">Back to Tours</Link>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Swat tour highlights" className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [`${swatPackages.length || 2} Matching journeys`, "Explore current package options"],
            [`PKR ${startingPrice.toLocaleString()} Listed from`, "Per person"],
            ["4 and 6 days", "Private road routes"],
            ["Private Options available", "Plan around your group"],
          ].map(([value, detail]) => (
            <div key={value} className="rounded-2xl border border-stone-200 bg-white p-4 shadow-[0_10px_28px_rgba(54,44,18,0.05)]">
              <p className="font-semibold text-stone-900">{value}</p>
              <p className="mt-1 text-xs leading-5 text-stone-600">{detail}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
            <SectionHeading label="Route overview">Best Swat Valley Tour Packages</SectionHeading>
            <p className="mt-5 text-sm leading-7 text-stone-600">Swat Valley tour packages bundle your accommodation, transport, sightseeing, and local support into one clear plan. They suit families, couples, friends, and first time visitors who want green mountain scenery without planning it alone. Hodophile builds each Swat Valley trip around real routes from Islamabad through Mingora and Madyan to Kalam, with optional extensions to Balakot and Shogran.</p>
            <p className="mt-4 text-sm leading-7 text-stone-600">As a trusted Swat Valley tour operator and travel agency, we handle bookings, rooms, vehicles, and guides. Think of this page as your Swat Valley travel guide and booking desk in one, designed for peaceful mountain holidays and Swat Valley tourism at its best.</p>
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
          <SectionHeading label="Canonical journeys">Affordable Swat Valley Tour Packages: 2 Matching Journeys</SectionHeading>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-stone-600">Compare our Swat Kalam tour deals in one place. Prices are listed per person. This destination page does not have one approved day by day plan for every departure, so open a package to review its itinerary and confirm the final schedule with our team.</p>
          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {swatPackages.map((tourPackage) => {
              const heading = packageHeadingById[tourPackage.id] ?? tourPackage.title;
              const packagePath = getPackagePath(tourPackage.id);
              const description = tourPackage.id === "swat-kalam-shogran-10-days"
                ? "A six-day private journey from Islamabad through Malam Jabba, Swat, Shogran, and Khanpur Dam."
                : "A four day journey from Islamabad to Kalam, Ushu Forest, and Malam Jabba, with an optional Khanpur Dam stop on the return.";
              const scheduleNote = tourPackage.id === "swat-kalam-shogran-10-days"
                ? "Pickup and drop-off in Islamabad; Malam Jabba is visited on Day 1 and Khanpur Dam on Day 6."
                : "Four day tour from Islamabad; Khanpur Dam is visited only if time allows.";
              return (
                <article key={tourPackage.id} className="group flex h-full flex-col rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-[0_12px_34px_rgba(54,44,18,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#c39a21]/70">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b6b00]">{tourPackage.duration}</p>
                  <h3 className="mt-3 font-[var(--font-display)] text-xl leading-tight text-stone-950"><Link href={packagePath}>{heading}</Link></h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-stone-600">{description}</p>
                  <p className="mt-3 text-xs leading-6 text-stone-500">Schedule note: {scheduleNote}</p>
                  <p className="mt-4 border-t border-stone-200 pt-4 text-sm font-semibold text-stone-900">Price: PKR {tourPackage.pricePerPerson.toLocaleString()}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link href={packagePath} className="site-button-primary !px-4 !py-2.5 !text-sm !normal-case !tracking-normal !text-black">View journey</Link>
                    <a href={`${whatsappNumber}?text=${encodeURIComponent(`Hi Hodophile, I am interested in ${heading}. Please confirm availability and the best current price.`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center justify-center rounded-full border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-900 transition hover:border-[#c39a21]">Check availability</a>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="mt-5"><Link href="/tours" className="text-sm font-semibold text-[#8b6b00] underline decoration-[#d9a407]/50 underline-offset-4">View all tours</Link></p>
        </section>

        <section className="mt-12 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
          <SectionHeading label="Swat Valley tour packages with hotel, transport, and breakfast">What Is Included in Our Swat Valley Tour Packages</SectionHeading>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-stone-600">Every Swat Valley tour package lists what is covered, so you can compare the real tour cost honestly. The exact inclusions are confirmed for the package you choose.</p>
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
          <SectionHeading label="Made for every traveler">Swat Valley Family Tour Packages, Honeymoon Trips, and Group Journeys</SectionHeading>
          <div className="mt-5 space-y-4 text-sm leading-7 text-stone-600">
            <p>Swat is a gentle, relaxing destination, so it works well for family mountain getaways. Our Swat Valley family tour packages give you a comfortable vehicle, family friendly hotels, flexible stops, and a calm pace that suits kids. If you ask whether Swat is good for family trips, the answer is yes, thanks to easy sightseeing and riverside rest spots.</p>
            <p>Couples can choose Swat Valley honeymoon tour packages with private transport, quiet resort stays, and peaceful forest evenings. See our <Link href="/honeymoon-packages" className="font-semibold text-[#8b6b00] underline decoration-[#d9a407]/50 underline-offset-4">Honeymoon Packages</Link> for more romantic getaways across Pakistan.</p>
            <p>Friends and small groups can book Swat Valley group tour packages with shared costs and one guide. Anyone who wants privacy can choose a private Swat tour with a custom itinerary, a fixed vehicle, and flexible stops. Nature lovers and adventure seekers can add jeep rides, short hikes, and photography stops.</p>
            <p>Luxury resort plans and budget plans both exist. Not sure what fits? Try our <Link href="/trip-suggestions" className="font-semibold text-[#8b6b00] underline decoration-[#d9a407]/50 underline-offset-4">Trip Finder</Link> or send your dates through <Link href="/make-my-trip" className="font-semibold text-[#8b6b00] underline decoration-[#d9a407]/50 underline-offset-4">Make My Trip</Link>.</p>
          </div>
        </section>

        <section className="mt-12">
          <SectionHeading label="Lakes, forests, and hill stations">Swat Kalam Sightseeing Tours: Lakes, Forests, and Hill Stations</SectionHeading>
          <p className="mt-5 text-sm leading-7 text-stone-600">Swat Valley sightseeing blends pine forests, river views, alpine lakes, and rich cultural heritage. These green valley road trips are ideal for mountain photography, waterfalls, and slow family holidays.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {attractionTags.map((tag) => (
              <span key={tag} className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-700">{tag}</span>
            ))}
          </div>
          <p className="mt-5 text-sm leading-7 text-stone-600">Malam Jabba is the hill station for chairlift and ski views, while Kalam is the base for Ushu Forest, Matiltan, and Mahodand Lake, usually reached by 4x4 jeep safari. Cultural stops such as the White Palace at Marghazar and the Swat Museum add heritage to the scenery. Stops differ by package, and we can add more on request. Want more mountains? Pair Swat with <Link href="/tours/northern-tours/naran-valley-tour-packages" className="font-semibold text-[#8b6b00] underline decoration-[#d9a407]/50 underline-offset-4">Naran Valley Tour Packages</Link>, <Link href="/tours/northern-tours/kashmir-valley-tour-packages" className="font-semibold text-[#8b6b00] underline decoration-[#d9a407]/50 underline-offset-4">Kashmir Valley Tour Packages</Link>, <Link href="/tours/northern-tours/hunza-valley-tour-packages" className="font-semibold text-[#8b6b00] underline decoration-[#d9a407]/50 underline-offset-4">Hunza Valley Tour Packages</Link>, or trekking on our <Link href="/tours/adventure" className="font-semibold text-[#8b6b00] underline decoration-[#d9a407]/50 underline-offset-4">Adventure Tours</Link>.</p>
        </section>

        <section className="mt-12 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
          <SectionHeading label="Choose how you travel">Swat Valley Tour Packages from Islamabad, Lahore, and Karachi</SectionHeading>
          <p className="mt-5 text-sm leading-7 text-stone-600">Our private road journeys start in Islamabad, close to Rawalpindi, and head north to Swat. Road access has improved with the motorway, which makes the drive smoother. Travelers from Lahore, Karachi, Faisalabad, and Multan can meet us in Islamabad or ask for a custom pickup plan.</p>
          <p className="mt-4 text-sm leading-7 text-stone-600">Browse northern <Link href="/tours/northern-tours#by-road" className="font-semibold text-[#8b6b00] underline decoration-[#d9a407]/50 underline-offset-4">road journeys</Link> or compare <Link href="/tours/northern-tours/skardu-valley-tour-packages" className="font-semibold text-[#8b6b00] underline decoration-[#d9a407]/50 underline-offset-4">Skardu Valley Tour Packages</Link> and <Link href="/tours/northern-tours/astor-valley-tour-packages" className="font-semibold text-[#8b6b00] underline decoration-[#d9a407]/50 underline-offset-4">Astor Valley Tour Packages</Link>. Our listed journeys run 4 and 6 days. Short Swat trips and 2, 3, or 5 day plans can be customized, and a weekend trip works for travelers who start in Islamabad. Longer 7, 8, or 10 day holidays can combine Swat with Shogran, Naran, and Kashmir.</p>
          <h3 className="mt-6 font-[var(--font-display)] text-2xl text-stone-950">Best time to visit Swat Valley</h3>
          <p className="mt-3 text-sm leading-7 text-stone-600">Spring to autumn, roughly March to October, is best for green valleys and lakes, and winter brings snow to Malam Jabba. Read our guide to the <Link href="/10-best-places-to-visit-in-swat-in-winter/" className="font-semibold text-[#8b6b00] underline decoration-[#d9a407]/50 underline-offset-4">best places to visit in Swat in winter</Link>. Road conditions can change, so we check them before each departure and plan realistic driving days.</p>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
            <SectionHeading label="Swat tour booking">Swat Valley Tour Booking, Hotels, and Transport Services</SectionHeading>
            <p className="mt-5 text-sm leading-7 text-stone-600">Book a Swat Valley tour online or on WhatsApp in three steps: share your dates and group size, review the itinerary and price, then confirm your reservation. Our Swat tour services cover hotel and resort booking, family accommodation, private transport, jeep rental for forest and lake routes, tour guide services, and full trip planning.</p>
            <p className="mt-4 text-sm leading-7 text-stone-600">Every Swat Valley tour package with accommodation and transport is arranged by people who know the Swat roads, seasons, and local drivers.</p>
          </article>
          <article className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
            <SectionHeading label="Why travelers trust us">Why Choose Hodophile for Swat Tours</SectionHeading>
            <ListItems items={whyChooseItems} />
          </article>
        </section>

        <section className="mt-12 rounded-[1.75rem] border border-[#d7c58d]/60 bg-[linear-gradient(145deg,#fffdf7,#f7f1e2)] p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
          <h2 className="display-serif text-3xl leading-tight text-stone-950 sm:text-4xl">Book your Swat adventure with Hodophile</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600">Share your dates and group size, and we will confirm availability and the best current price for your Swat journey.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/make-my-trip" className="site-button-primary !text-black">Request This Package</Link>
            <a href={`${whatsappNumber}?text=${encodeURIComponent("Hi Hodophile, I want to book a Swat Valley tour. Please confirm availability and the best current price.")}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-900 transition hover:border-[#c39a21]">WhatsApp an expert</a>
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
            <a href={`${whatsappNumber}?text=${encodeURIComponent("Hi Hodophile, I want a custom Swat trip plan. Please share availability and the best current price.")}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-900 transition hover:border-[#c39a21]">WhatsApp a travel expert</a>
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

export const swatTourPageMetadata: Metadata = {
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
