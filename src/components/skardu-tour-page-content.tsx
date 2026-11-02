import Image from "next/image";
import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/page-shell";
import { getPackagePath } from "@/lib/data/package-routes";
import type { TourPackage } from "@/lib/data/tour-packages";
import { absoluteUrl } from "@/lib/site";
import { buildPageSchema } from "@/lib/seo/structured-data";

const pagePath = "/tours/northern-tours/skardu-valley-tour-packages";
const pageTitle = "Best Affordable Skardu Tour Packages in Pakistan";
const pageDescription =
  "Hodophile offers the best affordable Skardu tour packages in Pakistan, with private road journeys, flight linked trips, and coach departures from Karachi and Islamabad. Explore Skardu Valley tours filled with turquoise lakes, ancient forts, and the high plains of Deosai, with hotels, transport, and a guide arranged by a licensed Pakistan tour operator.";
const heroImage = "/images/package-cards/images__destinations__skardu-1080x1920.webp";
const whatsappNumber = "https://wa.me/923377777460";

const packageHeadingByTitle: Record<string, string> = {
  "Skardu, Deosai & Naran by Road": "Skardu, Deosai and Naran by Road",
  "Skardu & Basho by Road · 6 Days": "Skardu and Basho by Road, 6 Days",
  "Skardu & Khaplu": "Skardu and Khaplu",
  "Skardu & Hunza by Air": "Skardu and Hunza by Air",
  "Skardu & Hunza": "Skardu and Hunza",
  "Skardu, Deosai & Naran": "Skardu, Deosai and Naran",
};

const hotelDetails = [
  "Hotel accommodation",
  "2 nights Islamabad stay",
  "Dinner for Islamabad stay (one side)",
  "Standard hotel on quad sharing basis",
];

const vehicleDetails = [
  "Private road transport from Islamabad",
  "4x4 jeep for Deosai and for Basho Valley",
  "Road transport from Karachi; 4x4 access where required",
  "Corolla G/X for 4 days; Land Cruiser Prado for 2 days (1992 to 95 model)",
  "Local jeep for Deosai; local transport for Khunjerab Pass as required",
  "Youtong return bus tickets between Karachi and Islamabad",
  "Comfortable road transport",
];

const packagePrices = [
  "Skardu, Deosai and Naran by Road: PKR 45,000",
  "Skardu and Basho by Road, 6 Days: PKR 55,000",
  "Skardu and Khaplu: PKR 47,500",
  "Skardu and Hunza by Air: PKR 55,000",
  "Skardu and Hunza: PKR 55,000",
  "Skardu, Deosai and Naran: PKR 47,500",
];

const priceFactors = [
  "Room sharing and hotel category",
  "Vehicle type and number of travel days",
  "Seasonality and road conditions",
  "Custom add ons or upgraded rooms",
];

const includedItems = [
  "Hotel accommodation",
  "Luxury transport",
  "Breakfasts",
  "Tolls and taxes",
  "Driver cum tour guide",
  "Bonfire",
  "Tour guide",
  "Youtong return bus tickets Karachi, Islamabad, and Karachi",
  "2 nights Islamabad stay",
  "Dinner for Islamabad stay (one side)",
  "Standard hotel on quad sharing basis",
  "Half board meals",
  "Comfortable transport",
  "Tour manager",
];

const separateItems = [
  "Optional quad bike, jeep safari, and horse riding in Shigar and Sarfaranga",
  "Optional quad biking, jeep safari, and horse riding",
  "Personal expenses and attraction entry fees",
  "Train meals",
  "Self paid boating, zipline, rafting, and local activities",
  "Own transport to Islamabad or Rawalpindi hotel or station",
  "Air tickets",
  "Airport pick and drop",
  "Water sports at Attabad Lake",
  "Optional activities and entry charges",
];

const attractions = [
  "Upper Kachura Lake",
  "Lower Kachura Lake",
  "Shangrila Resort",
  "Satpara Lake",
  "Shigar Fort",
  "Khaplu Fort",
  "Deosai National Park",
  "Sheosar Lake",
  "Sarfaranga Cold Desert",
  "Katpana Cold Desert",
  "Manthoka Waterfall",
  "Khamosh Waterfall",
  "Basho Valley",
  "Blind Lake",
];

const trustPoints = [
  "Licensed tour operator, License No. 5436, with TAAP and PATO affiliations",
  "Top rated service with a driver cum tour guide and a tour manager on listed journeys",
  "Clear per person prices and honest inclusions",
  "Private options and tailored itineraries",
  "Round the clock customer service and WhatsApp support",
];

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
    question: "What are the best affordable Skardu tour packages in Pakistan?",
    answer: "Our Skardu packages start from PKR 45,000 per person as a listed reference rate. Skardu, Deosai and Naran by Road is the lowest listed price. Confirm the current rate on WhatsApp before booking.",
  },
  {
    question: "How many days do I need for a Skardu tour?",
    answer: "Our listed journeys run from 6 to 10 days. Six days covers Skardu and Deosai by road from Islamabad. Longer plans add Khaplu, Hunza, or Basho Valley.",
  },
  {
    question: "Do you offer Skardu tour packages from Karachi?",
    answer: "Yes. Skardu and Khaplu, and Skardu, Deosai and Naran, are 10 day journeys that start from Karachi by coach, listed at PKR 47,500 per person.",
  },
  {
    question: "Can I book a private Skardu tour?",
    answer: "Yes. Several journeys run as private road tours from Islamabad, and we can customize hotels, days, and stops for your group.",
  },
  {
    question: "Are Skardu tours suitable for families and couples?",
    answer: "Yes. We plan comfortable vehicles, family friendly hotels, and scenic stays for families, and quiet private plans for couples and honeymooners.",
  },
  {
    question: "What is usually included in a Skardu tour package?",
    answer: "Packages usually cover hotel stays, comfortable transport, breakfasts, tolls and taxes, and a tour guide. Air tickets, personal expenses, and optional activities are usually separate.",
  },
];

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

function SectionHeading({ label, children }: { label: string; children: string }) {
  return (
    <div>
      <p className="eyebrow text-stone-600">{label}</p>
      <h2 className="display-serif mt-3 text-3xl leading-tight text-stone-950 sm:text-4xl">{children}</h2>
    </div>
  );
}

function WhatsAppLink({ message, children }: { message: string; children: React.ReactNode }) {
  return (
    <a
      href={`${whatsappNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#fcc000] hover:bg-white/10"
    >
      {children}
    </a>
  );
}

export function SkarduTourPageContent({ packages }: { packages: TourPackage[] }) {
  const startingPrice = Math.min(...packages.map((tourPackage) => tourPackage.pricePerPerson));

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
            { name: "Skardu Valley", url: pagePath },
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
            <li><Link href="/" className="transition hover:text-[#b58900]">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/tours" className="transition hover:text-[#b58900]">Tours</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/tours/northern-tours" className="transition hover:text-[#b58900]">Northern Tours</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-stone-800">Skardu Valley</li>
          </ol>
        </nav>

        <section className="overflow-hidden rounded-[2rem] border border-[#fcc000]/20 bg-[#11110f] text-white shadow-[0_28px_80px_rgba(0,0,0,0.2)]">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-64 sm:min-h-80 lg:min-h-[32rem]">
              <Image
                src={heroImage}
                alt="Skardu Valley lake and mountain scenery in Baltistan, Pakistan"
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
                Best Affordable Skardu Tour Packages in Pakistan
              </h1>
              <p className="mt-5 text-sm leading-7 text-white/75 sm:text-base">{pageDescription}</p>
              <p className="mt-5 border-l-2 border-[#fcc000] pl-4 text-sm font-medium text-white/85">
                Lakes, forts, and premium glacial landscapes.
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
                <WhatsAppLink message="Hi Hodophile, I'm interested in Skardu Valley Tour Packages. Please share availability and booking details.">
                  WhatsApp an expert
                </WhatsAppLink>
                <Link href="/tours" className="site-button-secondary border-white/25 text-white">Back to Tours</Link>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Skardu tour highlights" className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [`${packages.length} matching journeys`, "Explore current package options"],
            [`PKR ${startingPrice.toLocaleString()} listed from`, "Per person; confirm current rate"],
            ["6 to 10 days", "Road and air routes"],
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
            <SectionHeading label="Route overview">Best Skardu Valley Tour Packages</SectionHeading>
            <p className="mt-5 text-sm leading-7 text-stone-600">
              Skardu Valley tour packages bundle your hotels, road or air transport, sightseeing, and local support into one clear plan. They suit families, couples, friends, and first time visitors who want to see Baltistan without planning it alone. Hodophile designs every Skardu Valley trip package around real routes from Islamabad and Karachi, through Chilas to Skardu, Deosai, Khaplu, Hunza, and Naran.
            </p>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              As a trusted Skardu tour company and tour operator for Skardu, we manage bookings, rooms, vehicles, and guides, so you can enjoy Skardu Valley tourism at its best. Think of this page as your Skardu Valley travel guide and booking desk in one.
            </p>
            <h3 className="mt-7 font-[var(--font-display)] text-2xl text-stone-950">Why this journey works</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                <h4 className="font-semibold text-stone-900">Hotel plan</h4>
                <ListItems items={hotelDetails} />
              </div>
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                <h4 className="font-semibold text-stone-900">Vehicle plan</h4>
                <ListItems items={vehicleDetails} />
              </div>
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 sm:col-span-2 xl:col-span-1">
                <h4 className="font-semibold text-stone-900">Pricing clarity</h4>
                <ListItems items={packagePrices} />
                <p className="mt-4 text-xs leading-6 text-stone-500">
                  Per person. Listed reference rates for the 45,000 and the Skardu and Hunza prices; confirm the current price.
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-[#d7c58d]/60 bg-[linear-gradient(145deg,#fffdf7,#f7f1e2)] p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
            <p className="eyebrow text-stone-600">Plan with clarity</p>
            <h3 className="mt-3 font-[var(--font-display)] text-2xl text-stone-950">What drives the final price</h3>
            <ListItems items={priceFactors} />
          </article>
        </section>

        <section id="available-departures" className="mt-12 scroll-mt-24">
          <SectionHeading label="Canonical journeys">Affordable Skardu Tour Packages: 6 Matching Journeys</SectionHeading>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-stone-600">
            Compare every Skardu package in one place. Prices are listed per person. This destination page does not have one approved day by day plan for every departure, so open a package to review its itinerary and confirm the final schedule with our team.
          </p>
          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {packages.map((tourPackage) => {
              const heading = packageHeadingByTitle[tourPackage.title] ?? tourPackage.title;
              const packagePath = getPackagePath(tourPackage.id);
              const whatsappMessage = `Hi Hodophile, I am interested in ${tourPackage.title}. Please confirm availability and the best current price.`;

              return (
                <article key={tourPackage.id} className="group flex h-full flex-col rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-[0_12px_34px_rgba(54,44,18,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#c39a21]/70 hover:shadow-[0_20px_44px_rgba(54,44,18,0.11)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b6b00]">{tourPackage.duration}</p>
                  <h3 className="mt-3 font-[var(--font-display)] text-xl leading-tight text-stone-950">
                    <Link href={packagePath} className="transition hover:text-[#806000]">{heading}</Link>
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-stone-600">{tourPackage.description}</p>
                  {tourPackage.scheduleNote ? (
                    <p className="mt-3 text-xs leading-6 text-stone-500">Schedule note: {tourPackage.scheduleNote}</p>
                  ) : null}
                  <p className="mt-4 border-t border-stone-200 pt-4 text-sm font-semibold text-stone-900">
                    {tourPackage.priceOnRequest
                      ? `Listed from PKR ${tourPackage.pricePerPerson.toLocaleString()} (confirm current rate)`
                      : `PKR ${tourPackage.pricePerPerson.toLocaleString()}`}
                    <span className="ml-1 font-normal text-stone-500">per person</span>
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <Link href={packagePath} className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-700 underline decoration-[#fcc000] underline-offset-4">
                      View journey
                    </Link>
                    <a
                      href={`${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#1f6b4a] px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:bg-[#174f37]"
                    >
                      Check availability
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mt-6 text-center">
            <Link href="/tours" className="font-semibold text-stone-800 underline decoration-[#fcc000] underline-offset-4 transition hover:text-[#806000]">
              View all tours
            </Link>
          </div>
        </section>

        <section className="mt-12 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
          <SectionHeading label="Skardu Valley tour packages with hotel, transport, and meals">
            What Is Included in Our Skardu Tour Packages
          </SectionHeading>
          <p className="mt-4 text-sm leading-7 text-stone-600">
            Every Skardu Valley tour package lists what is covered so you can compare honestly. The exact inclusions are confirmed for the package you choose.
          </p>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
              <h3 className="font-[var(--font-display)] text-xl text-stone-950">What&apos;s usually covered</h3>
              <ListItems items={includedItems} />
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
              <h3 className="font-[var(--font-display)] text-xl text-stone-950">What is usually separate</h3>
              <ListItems items={separateItems} />
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
            <SectionHeading label="Made for every traveler">
              Skardu Family Tour Packages, Honeymoon Trips, and Group Journeys
            </SectionHeading>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              Our Skardu family tour packages give you comfortable vehicles, family friendly hotels, and a relaxed pace. These affordable family trips to Skardu Valley keep costs clear, so budget family tour packages never hide extras. Children enjoy the lakes, open plains, and campfire evenings.
            </p>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              Couples can choose Skardu honeymoon tour packages with private transport, scenic stays, and quiet viewpoints. See our{" "}
              <Link href="/honeymoon-packages" className="font-semibold text-[#806000] underline underline-offset-4">Honeymoon Packages</Link>{" "}
              for more romantic getaways across Pakistan.
            </p>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              Friends and small groups can book Skardu group tour packages with shared costs and one tour manager. Anyone who wants privacy can pick a Skardu private tour package with a local guide, a fixed vehicle, and flexible stops.
            </p>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              Luxury and budget Skardu plans both exist, and foreign tourists can request a customized itinerary with extra days. Not sure what fits? Try our{" "}
              <Link href="/trip-suggestions" className="font-semibold text-[#806000] underline underline-offset-4">Trip Finder</Link>{" "}
              or tell us your dates through{" "}
              <Link href="/make-my-trip" className="font-semibold text-[#806000] underline underline-offset-4">Make My Trip</Link>.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
            <SectionHeading label="Lakes, forts, and plateaus">
              Skardu Sightseeing Tours: Lakes, Forts, and Deosai
            </SectionHeading>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              Skardu Valley tours mix mountain scenery, nature, and Baltistan culture. Guided sightseeing around Skardu includes lakes, cold deserts, waterfalls, and heritage forts, ideal for photography tours and village exploration.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {attractions.map((attraction) => (
                <li key={attraction} className="rounded-full border border-[#d9c890] bg-[#fff9e8] px-3 py-1.5 text-xs font-medium text-stone-700">
                  {attraction}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-7 text-stone-600">
              Stops differ by package, and we can add more on request. A Skardu to Deosai tour suits nature lovers, while a Skardu to Khaplu tour adds Baltistan cultural landmarks. Want more peaks? Pair Skardu with{" "}
              <Link href="/tours/northern-tours/hunza-valley-tour-packages" className="font-semibold text-[#806000] underline underline-offset-4">Hunza Valley Tour Packages</Link>, remote river views on the{" "}
              <Link href="/tours/northern-tours/astor-valley-tour-packages" className="font-semibold text-[#806000] underline underline-offset-4">Astor Valley Tour Packages</Link>, or trekking on our{" "}
              <Link href="/tours/adventure" className="font-semibold text-[#806000] underline underline-offset-4">Adventure Tours</Link>.
            </p>
          </article>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
            <SectionHeading label="Choose how you travel">
              Skardu Tour Packages from Karachi, Lahore, and Islamabad
            </SectionHeading>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              Most road journeys start in Islamabad and run through Chilas, a classic Skardu road trip. Our Karachi departures use coach travel, then join the northern route. If you prefer speed, Skardu tour packages by air include flights from Karachi, Lahore, or Islamabad.
            </p>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              Browse northern{" "}
              <Link href="/tours/northern-tours#by-road" className="font-semibold text-[#806000] underline underline-offset-4">road journeys</Link>{" "}
              or{" "}
              <Link href="/tours/northern-tours#by-air" className="font-semibold text-[#806000] underline underline-offset-4">Skardu flights and itineraries</Link>.
              {" "}Our listed journeys run from 6 to 10 days, and one week Skardu tours are covered by the 7 day flight linked plan. Need a shorter or longer plan, or a summer holiday timing? We can customize a flexible itinerary, and you can compare options with{" "}
              <Link href="/tours/northern-tours/naran-valley-tour-packages" className="font-semibold text-[#806000] underline underline-offset-4">Naran Valley Tour Packages</Link>,{" "}
              <Link href="/tours/northern-tours/kashmir-valley-tour-packages" className="font-semibold text-[#806000] underline underline-offset-4">Kashmir Valley Tour Packages</Link>, or{" "}
              <Link href="/tours/northern-tours/swat-valley-tour-packages" className="font-semibold text-[#806000] underline underline-offset-4">Swat Valley Tour Packages</Link>.
            </p>
          </article>
          <article className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
            <SectionHeading label="Skardu tour booking">Skardu Travel Planning and Booking Services</SectionHeading>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              Book Skardu Valley tour packages online or on WhatsApp. Our Skardu tour planning services cover hotel booking assistance, private transport, tour guide services, sightseeing, and full tour management. We also coordinate group arrangements, family travel planning, and road trip planning, with travel assistance before and during your trip.
            </p>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              Every Skardu Valley tour package with accommodation and transport is arranged by people who know the Karakoram routes, seasons, and road conditions.
            </p>
          </article>
        </section>

        <section className="mt-12 rounded-[1.75rem] border border-[#d7c58d]/60 bg-[linear-gradient(145deg,#fffdf7,#f7f1e2)] p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
          <SectionHeading label="Why travelers trust us">Why Choose Hodophile for Skardu Tours</SectionHeading>
          <ListItems items={trustPoints} />
        </section>

        <section className="mt-12 rounded-[1.75rem] border border-[#fcc000]/25 bg-[radial-gradient(circle_at_95%_0%,rgba(252,192,0,0.2),transparent_38%),linear-gradient(135deg,#171717,#262218)] p-6 text-white shadow-[0_20px_50px_rgba(0,0,0,0.16)] md:p-8">
          <h2 className="display-serif text-3xl leading-tight text-white sm:text-4xl">Book your Skardu adventure with Hodophile</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/75">
            Share your dates and group size, and we will confirm availability and the best current price for your Skardu journey.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/make-my-trip" className="site-button-primary !text-black">Request This Package</Link>
            <WhatsAppLink message="Hi Hodophile, I want to plan a Skardu trip. Please confirm availability and the best current price.">
              WhatsApp an expert
            </WhatsAppLink>
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
          <h2 className="display-serif mt-3 text-3xl leading-tight text-stone-950 sm:text-4xl">
            Tell us your dates and we will tailor the route around you.
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/make-my-trip" className="site-button-primary !text-black">Customize this trip</Link>
            <WhatsAppLink message="Hi Hodophile, I want a custom Skardu trip plan. Please share availability and the best current price.">
              WhatsApp a travel expert
            </WhatsAppLink>
          </div>
        </section>
      </PageShell>
    </>
  );
}

export const skarduTourPageMetadata = {
  title: { absolute: "Best Affordable Skardu Tour Packages in Pakistan | Hodophile" },
  description:
    "Book the best affordable Skardu tour packages in Pakistan. Private, family, and honeymoon trips from Karachi and Islamabad. Prices from PKR 45,000.",
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: "Best Affordable Skardu Tour Packages in Pakistan | Hodophile",
    description:
      "Book the best affordable Skardu tour packages in Pakistan. Private, family, and honeymoon trips from Karachi and Islamabad. Prices from PKR 45,000.",
    url: absoluteUrl(pagePath),
    images: [{ url: heroImage, alt: "Skardu Valley lake and mountain scenery in Baltistan, Pakistan" }],
  },
};
