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
const whatsappNumber = "https://wa.me/923377777460";

const packageHeadingByTitle: Record<string, string> = {
  "Swat, Kalam, Malam Jabba, Balakot & Shogran": "Swat, Kalam, Malam Jabba, Balakot and Shogran",
  "Swat, Kalam & Malam Jabba": "Swat, Kalam and Malam Jabba",
};

const faqs = [
  {
    question: "Are fixed departure dates listed?",
    answer: "No date-specific departures are currently listed for these journeys. Request your dates to confirm availability.",
  },
  {
    question: "Where can I confirm package details?",
    answer: "Open a linked canonical journey to review its listed route, price, and notes, then confirm date-specific arrangements with the planning team.",
  },
  {
    question: "How much does a Swat Valley tour cost?",
    answer: "Listed prices start from PKR 33,500 per person for the 4-day Swat, Kalam and Malam Jabba journey. The 6-day journey with Balakot and Shogran is PKR 47,500 per person.",
  },
  {
    question: "How many days do I need for Swat and Kalam?",
    answer: "Our listed journeys run 4 and 6 days. Four days covers Kalam, Ushu Forest, and Malam Jabba. Shorter or longer plans can be customized.",
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
    answer: "Yes. Swat has gentle scenery, easy sightseeing, and family-friendly hotels. We plan a comfortable vehicle, flexible stops, and a relaxed pace for children.",
  },
  {
    question: "What is usually included in a Swat Valley tour package?",
    answer: "Packages usually cover accommodation, breakfast, a tour guide, a Honda BR-V or luxury vehicle, tolls and taxes, and a bonfire. Chairlift, zipline, entry tickets, and optional activities are usually separate.",
  },
];

function SectionHeading({ label, children }: { label: string; children: string }) {
  return (
    <div>
      <p className="eyebrow text-stone-600">{label}</p>
      <h2 className="display-serif mt-3 text-3xl leading-tight text-stone-950 sm:text-4xl">{children}</h2>
    </div>
  );
}

function ListItems({ items }: { items: string[] }) {
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
  const startingPrice = packages.length ? Math.min(...packages.map((tourPackage) => tourPackage.pricePerPerson)) : 33500;
  const includedItems = [...new Set(packages.flatMap((tourPackage) => tourPackage.includes ?? []))];
  const excludedItems = [...new Set(packages.flatMap((tourPackage) => tourPackage.excludes ?? []))];
  const hotelDetails = [...new Set(packages.flatMap((tourPackage) =>
    (tourPackage.includes ?? []).filter((item) => /hotel|accommodation|stay/i.test(item)),
  ))];
  const vehicleDetails = [...new Set(packages.flatMap((tourPackage) => tourPackage.transport ?? []))];

  const packagePrices = packages.map((tourPackage) =>
    `${packageHeadingByTitle[tourPackage.title] ?? tourPackage.title}: PKR ${tourPackage.pricePerPerson.toLocaleString()}`,
  );

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
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }}
      />
      <PageShell wide>
        <nav aria-label="Breadcrumb" className="mb-5 text-xs text-stone-500 sm:text-sm">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/tours">Tours</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/tours/northern-tours">Northern Tours</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-stone-800">Swat Valley</li>
          </ol>
        </nav>

        <section className="overflow-hidden rounded-[2rem] border border-[#fcc000]/20 bg-[#11110f] text-white shadow-[0_28px_80px_rgba(0,0,0,0.2)]">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-64 sm:min-h-80 lg:min-h-[32rem]">
              <Image
                src={heroImage}
                alt="Swat Valley green hills and river scenery in Khyber Pakhtunkhwa, Pakistan"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                fetchPriority="high"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <div className="flex flex-col justify-center bg-[radial-gradient(circle_at_100%_0%,rgba(252,192,0,0.13),transparent_38%),linear-gradient(145deg,#19170f,#0b0b0a)] p-6 sm:p-8 lg:p-10 xl:p-12">
              <p className="eyebrow text-[#fcc000]">Northern Tours</p>
              <h1 className="display-serif mt-4 text-3xl font-normal leading-tight text-white sm:text-4xl xl:text-5xl">
                Best Affordable Swat Valley Tour Packages
              </h1>
              <p className="mt-5 text-sm leading-7 text-white/75 sm:text-base">{pageDescription}</p>
              <p className="mt-5 border-l-2 border-[#fcc000] pl-4 text-sm font-medium text-white/85">
                Green valleys and calm domestic routes.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Tailored itinerary", "Route support", "Private options", "Booking assistance"].map((highlight) => (
                  <span key={highlight} className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-1.5 text-xs text-white/75">
                    {highlight}
                  </span>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/make-my-trip" className="site-button-primary !text-black">Request This Package</Link>
                <a
                  href={`${whatsappNumber}?text=${encodeURIComponent("Hi Hodophile, I'm interested in Swat Valley Tour Packages. Please share availability and booking details.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#fcc000] hover:bg-white/10"
                >
                  WhatsApp an expert
                </a>
                <Link href="/tours" className="site-button-secondary border-white/25 text-white">Back to Tours</Link>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Swat tour highlights" className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [`${packages.length} Matching journeys`, "Explore current package options"],
            [`PKR ${startingPrice.toLocaleString()} Listed from`, "Per person"],
            ["4 and 6 days", "Private road routes"],
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
            <SectionHeading label="Route overview">Best Swat Valley Tour Packages</SectionHeading>
            <p className="mt-5 text-sm leading-7 text-stone-600">
              Swat Valley tour packages bundle your accommodation, transport, sightseeing, and local support into one clear plan. They suit families, couples, friends, and first-time visitors who want green mountain scenery without planning it alone. Hodophile builds each Swat Valley trip around real routes from Islamabad through Mingora and Madyan to Kalam, with optional extensions to Balakot and Shogran.
            </p>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              As a trusted Swat Valley tour operator and travel agency, we handle bookings, rooms, vehicles, and guides. Think of this page as your Swat Valley travel guide and booking desk in one, designed for peaceful mountain holidays and Swat Valley tourism at its best.
            </p>
            <h3 className="mt-7 font-[var(--font-display)] text-2xl text-stone-950">Why this journey works</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                <h4 className="font-semibold text-stone-900">Hotel plan</h4>
                <ListItems items={hotelDetails.length ? hotelDetails : ["Accommodation"]} />
              </div>
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                <h4 className="font-semibold text-stone-900">Vehicle plan</h4>
                <ListItems items={vehicleDetails.length ? vehicleDetails : ["Private transport"]} />
              </div>
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 sm:col-span-2 xl:col-span-1">
                <h4 className="font-semibold text-stone-900">Pricing clarity</h4>
                <ListItems items={packagePrices} />
                <p className="mt-4 text-xs leading-6 text-stone-500">Per person.</p>
              </div>
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-[#d7c58d]/60 bg-[linear-gradient(145deg,#fffdf7,#f7f1e2)] p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
            <p className="eyebrow text-stone-600">Plan with clarity</p>
            <h3 className="mt-3 font-[var(--font-display)] text-2xl text-stone-950">What drives the final price</h3>
            <ListItems items={[
              "Room sharing and hotel category",
              "Vehicle type and number of travel days",
              "Seasonality and road conditions",
              "Any custom add-ons or upgraded room requests",
            ]} />
          </article>
        </section>

        <section id="available-departures" className="mt-12 scroll-mt-24">
          <SectionHeading label="Canonical journeys">Affordable Swat Valley Tour Packages: 2 Matching Journeys</SectionHeading>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-stone-600">
            Compare our Swat Kalam tour deals in one place. Prices are listed per person. This destination page does not have one approved day-by-day plan for every departure, so open a package to review its itinerary and confirm the final schedule with our team.
          </p>
          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {packages.map((tourPackage) => {
              const heading = packageHeadingByTitle[tourPackage.title] ?? tourPackage.title;
              const packagePath = getPackagePath(tourPackage.id);
              return (
                <article key={tourPackage.id} className="group flex h-full flex-col rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-[0_12px_34px_rgba(54,44,18,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#c39a21]/70">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b6b00]">{tourPackage.duration}</p>
                  <h3 className="mt-3 font-[var(--font-display)] text-xl leading-tight text-stone-950">
                    <Link href={packagePath}>{heading}</Link>
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-stone-600">{tourPackage.description}</p>
                  {tourPackage.scheduleNote ? <p className="mt-3 text-xs leading-6 text-stone-500">Schedule note: {tourPackage.scheduleNote}</p> : null}
                  <p className="mt-4 border-t border-stone-200 pt-4 text-sm font-semibold text-stone-900">
                    PKR {tourPackage.pricePerPerson.toLocaleString()} <span className="font-normal text-stone-500">per person</span>
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <Link href={packagePath} className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-700 underline decoration-[#fcc000] underline-offset-4">
                      View journey
                    </Link>
                    <a
                      href={`${whatsappNumber}?text=${encodeURIComponent(`Hi Hodophile, I am interested in ${tourPackage.title}. Please confirm availability and the best current price.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#1f6b4a] px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-white"
                    >
                      Check availability
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mt-6 text-center">
            <Link href="/tours" className="font-semibold text-stone-800 underline decoration-[#fcc000] underline-offset-4">View all tours</Link>
          </div>
        </section>

        <section className="mt-12 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
          <SectionHeading label="Swat Valley tour packages with hotel, transport, and breakfast">
            What Is Included in Our Swat Valley Tour Packages
          </SectionHeading>
          <p className="mt-4 text-sm leading-7 text-stone-600">
            Every Swat Valley tour package lists what is covered, so you can compare the real tour cost honestly. The exact inclusions are confirmed for the package you choose.
          </p>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
              <h3 className="font-[var(--font-display)] text-xl text-stone-950">What&apos;s usually covered</h3>
              <ListItems items={includedItems.length ? includedItems : ["Accommodation", "Breakfast", "Tour guide", "Luxury transport", "Tolls and taxes", "Bonfire"]} />
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
              <h3 className="font-[var(--font-display)] text-xl text-stone-950">What is usually separate</h3>
              <ListItems items={excludedItems.length ? excludedItems : ["Chairlift, zipline, and Malam Jabba activities", "Entry tickets and optional activities", "Khanpur Dam activities"]} />
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
            <SectionHeading label="Made for every traveler">Swat Valley Family Tour Packages, Honeymoon Trips, and Group Journeys</SectionHeading>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              Swat works well for family mountain getaways. Our family tour packages give you a comfortable vehicle, family-friendly hotels, flexible stops, and a calm pace that suits children.
            </p>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              Couples can choose Swat honeymoon tours with private transport, quiet resort stays, and peaceful forest evenings. See our <Link href="/honeymoon-packages" className="font-semibold text-[#806000] underline underline-offset-4">Honeymoon Packages</Link> for more romantic getaways.
            </p>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              Friends and small groups can book shared Swat group tours, while private tours can include a custom route, fixed vehicle, and flexible stops. Try our <Link href="/trip-suggestions" className="font-semibold text-[#806000] underline underline-offset-4">Trip Finder</Link> or <Link href="/make-my-trip" className="font-semibold text-[#806000] underline underline-offset-4">Make My Trip</Link>.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
            <SectionHeading label="Lakes, forests, and hill stations">Swat Kalam Sightseeing Tours: Lakes, Forests, and Hill Stations</SectionHeading>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              Swat Valley sightseeing blends pine forests, river views, alpine lakes, and cultural heritage. These green valley road trips are ideal for mountain photography, waterfalls, and slow family holidays.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {["Mingora","Madyan","Bahrain","Kalam Valley","Malam Jabba","Mahodand Lake","Ushu Forest","Matiltan","Palogha Valley","Balakot","Shogran","Fizagat Park","White Palace Marghazar","Swat Museum","Kundol Lake","Gabral Valley","Utror Valley","Khanpur Dam"].map((attraction) => (
                <li key={attraction} className="rounded-full border border-[#d9c890] bg-[#fff9e8] px-3 py-1.5 text-xs font-medium text-stone-700">{attraction}</li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-7 text-stone-600">
              Stops differ by package. Want more mountains? Pair Swat with <Link href="/tours/northern-tours/naran-valley-tour-packages" className="font-semibold text-[#806000] underline underline-offset-4">Naran Valley Tour Packages</Link>, <Link href="/tours/northern-tours/kashmir-valley-tour-packages" className="font-semibold text-[#806000] underline underline-offset-4">Kashmir Valley Tour Packages</Link>, <Link href="/tours/northern-tours/hunza-valley-tour-packages" className="font-semibold text-[#806000] underline underline-offset-4">Hunza Valley Tour Packages</Link>, or <Link href="/tours/adventure" className="font-semibold text-[#806000] underline underline-offset-4">Adventure Tours</Link>.
            </p>
          </article>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
            <SectionHeading label="Choose how you travel">Swat Valley Tour Packages from Islamabad, Lahore, and Karachi</SectionHeading>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              Our private road journeys start in Islamabad and travel north through Mingora and Madyan to Kalam. The motorway has improved road access, making the drive smoother.
            </p>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              Travelers from Lahore, Karachi, Faisalabad, and Multan can meet us in Islamabad or ask for a custom pickup plan. Spring to autumn is best for green valleys and lakes, while winter brings snow to Malam Jabba. Read our guide to <Link href="/10-best-places-to-visit-in-swat-in-winter/" className="font-semibold text-[#806000] underline underline-offset-4">the best places to visit in Swat in winter</Link>.
            </p>
          </article>
          <article className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
            <SectionHeading label="Swat tour booking">Swat Valley Tour Booking, Hotels, and Transport Services</SectionHeading>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              Book a Swat Valley tour online or on WhatsApp in three steps: share your dates and group size, review the itinerary and price, then confirm your reservation.
            </p>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              Our services cover hotel and resort booking, family accommodation, private transport, jeep rental for forest and lake routes, tour guide services, and full trip planning.
            </p>
          </article>
        </section>

        <section className="mt-12 rounded-[1.75rem] border border-[#d7c58d]/60 bg-[linear-gradient(145deg,#fffdf7,#f7f1e2)] p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
          <SectionHeading label="Why travelers trust us">Why Choose Hodophile for Swat Tours</SectionHeading>
          <ListItems items={[
            "Licensed tour operator, License No. 5436, with TAAP and PATO affiliations",
            "Top-rated service with a tour guide and comfortable vehicles",
            "Clear per-person prices and honest inclusions",
            "Private options and tailored itineraries",
            "Round-the-clock customer service and WhatsApp support",
          ]} />
        </section>

        <section className="mt-12 rounded-[1.75rem] border border-[#fcc000]/25 bg-[radial-gradient(circle_at_95%_0%,rgba(252,192,0,0.2),transparent_38%),linear-gradient(135deg,#171717,#262218)] p-6 text-white shadow-[0_20px_50px_rgba(0,0,0,0.16)] md:p-8">
          <p className="eyebrow text-[#fcc000]">Strong CTA</p>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl leading-tight text-white sm:text-4xl">Book your Swat adventure with Hodophile</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70">Share your dates and group size, and we will confirm availability and the best current price for your Swat journey.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/make-my-trip" className="site-button-primary !text-black">Request This Package</Link>
            <a
              href={`${whatsappNumber}?text=${encodeURIComponent("Hi Hodophile, I want to plan a Swat trip. Please confirm availability and the best current price.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/25 px-5 text-sm font-semibold text-white transition hover:border-[#fcc000]"
            >
              WhatsApp an expert
            </a>
          </div>
        </section>

        <section className="mt-12 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
          <SectionHeading label="Frequently asked">Questions Travelers Usually Ask</SectionHeading>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                <h3 className="font-[var(--font-display)] text-xl leading-tight text-stone-950">{faq.question}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-[1.75rem] border border-[#d7c58d]/60 bg-[linear-gradient(145deg,#fffdf7,#f7f1e2)] p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
          <p className="eyebrow text-stone-600">Need a custom plan?</p>
          <h2 className="display-serif mt-3 text-3xl leading-tight text-stone-950 sm:text-4xl">Tell us your dates and we will tailor the route around you.</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/make-my-trip" className="site-button-primary !text-black">Customize this trip</Link>
            <a
              href={`${whatsappNumber}?text=${encodeURIComponent("Hi Hodophile, I want a custom Swat trip plan. Please share availability and the best current price.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-stone-300 px-5 text-sm font-semibold text-stone-800 transition hover:border-[#8b6b00]"
            >
              WhatsApp a travel expert
            </a>
          </div>
        </section>
      </PageShell>
    </>
  );
}

export const swatTourPageMetadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: absoluteUrl(pagePath),
    images: [{ url: heroImage, alt: "Swat Valley green hills and river scenery in Khyber Pakhtunkhwa, Pakistan" }],
  },
};
