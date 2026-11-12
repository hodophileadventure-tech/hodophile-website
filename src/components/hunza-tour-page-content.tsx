import Image from "next/image";
import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/page-shell";
import { getPackagePath } from "@/lib/data/package-routes";
import type { TourPackage } from "@/lib/data/tour-packages";
import { absoluteUrl } from "@/lib/site";
import { buildPageSchema } from "@/lib/seo/structured-data";

const pagePath = "/tours/northern-tours/hunza-valley-tour-packages";
const pageTitle = "Best Affordable Hunza Valley Tour Packages | Hodophile";
const pageDescription =
  "Book the best affordable Hunza Valley tour packages in Pakistan. Private, family, and honeymoon trips with hotels and a guide. From PKR 55,000.";
const heroImage = "/images/package-cards/images__destinations__hunza-custom.webp";
const whatsappNumber = "https://wa.me/923377777460";

const packageHeadingByTitle: Record<string, string> = {
  "Skardu & Hunza by Air": "Skardu and Hunza by Air",
  "Skardu & Hunza": "Skardu and Hunza",
};

const hotelDetails = [
  "Hotel accommodation",
  "Boutique mountain stays in Karimabad and nearby valleys",
  "Private family and honeymoon room options",
  "Comfort-first hotel planning for rest days and scenic stops",
];

const vehicleDetails = [
  "Corolla G/X for 4 days",
  "Land Cruiser Prado for 2 days (1992 to 95 model)",
  "Road transport from Islamabad",
  "Local jeep for Deosai",
  "Local transport for Khunjerab Pass as required",
];

const packagePrices = [
  "Skardu and Hunza by Air: PKR 55,000",
  "Skardu and Hunza: PKR 55,000",
];

const priceFactors = [
  "Room sharing and hotel category",
  "Vehicle type and number of travel days",
  "Seasonality and road conditions",
  "Custom add ons or upgraded room requests",
];

const includedItems = [
  "Hotel accommodation",
  "Luxury transport",
  "Breakfasts",
  "Tolls and taxes",
  "Tour guide",
  "Bonfire",
];

const separateItems = [
  "Air tickets",
  "Airport pick and drop",
  "Water sports at Attabad Lake",
  "Optional activities and entry charges",
];

const attractions = [
  "Karimabad",
  "Baltit Fort",
  "Altit Fort",
  "Eagle's Nest",
  "Attabad Lake",
  "Passu Cones",
  "Khunjerab Pass",
  "Hussaini Suspension Bridge",
  "Gulmit",
  "Upper Hunza and Gojal Valley",
  "Duikar",
  "Nagar Valley",
  "Hopper Glacier",
  "Rakaposhi Viewpoint",
];

const trustPoints = [
  "Licensed tour operator with route support and clear planning",
  "Private and family-friendly packages designed around real mountain roads",
  "Transparent per person pricing and honest inclusions",
  "Flexible planning for couples, groups, and custom itineraries",
  "Responsive WhatsApp support from Pakistan travel specialists",
];

const faqs = [
  {
    question: "Are fixed departure dates listed?",
    answer: "No date-specific departures are currently listed for these journeys. Request your dates to confirm availability.",
  },
  {
    question: "What is included in a Hunza Valley tour package?",
    answer: "Packages usually cover hotel stays, transport, breakfasts, tolls and taxes, and a guide. Air tickets, airport pick-up/drop, water sports, and optional activities are usually separate.",
  },
  {
    question: "Do you offer Hunza family tour packages and honeymoon trips?",
    answer: "Yes. Our packages are designed for families, couples, and small groups, with comfortable vehicles, scenic stays, and flexible starts.",
  },
  {
    question: "Can I customize a Hunza tour for private travel?",
    answer: "Yes. We can tailor the route, hotel category, and duration around your dates, budget, and group size.",
  },
  {
    question: "How long is the typical Hunza tour?",
    answer: "Our listed journeys run for 7 and 8 days. Shorter or longer plans can be arranged by request.",
  },
  {
    question: "Do you offer Hunza tours from Karachi, Lahore, and Islamabad?",
    answer: "Yes. We can plan road journeys from Islamabad and air-linked arrangements that connect Karachi, Lahore, and Islamabad with Hunza and Skardu.",
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

export function HunzaTourPageContent({ packages }: { packages: TourPackage[] }) {
  const startingPrice = packages.length ? Math.min(...packages.map((tourPackage) => tourPackage.pricePerPerson)) : 55000;

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
            { name: "Hunza Valley", url: pagePath },
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
        <section className="rounded-[2rem] border border-stone-200 bg-white/90 p-6 shadow-[0_18px_50px_rgba(21,16,4,0.07)] backdrop-blur-sm md:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-stone-500">Northern Tours</p>
              <h1 className="mt-4 max-w-xl font-[var(--font-display)] text-4xl leading-none text-stone-950 sm:text-5xl lg:text-6xl">
                Best Affordable Hunza Valley Tour Packages
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-stone-600">
                Hodophile offers the best affordable Hunza Valley tour packages in Pakistan, with private road journeys from Islamabad and flight-linked trips from Karachi, Lahore, and Islamabad. Discover Hunza Valley tours through Karimabad, Attabad Lake, and the high Karakoram, with hotels, transport, and guidance arranged by a licensed Pakistan tour operator.
              </p>
              <p className="mt-3 text-sm font-medium text-stone-700">Alpine scenery, boutique stays, and curated mountain circuits.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/make-my-trip" className="site-button-primary !text-black">Request This Package</Link>
                <WhatsAppLink message="Hi Hodophile, I am interested in Hunza Valley Tour Packages. Please share availability and current rates.">
                  WhatsApp an expert
                </WhatsAppLink>
                <Link href="/tours" className="site-button-secondary border-stone-300 text-stone-800">Back to Tours</Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-stone-600">
                <span>Tailored itinerary</span>
                <span>Route support</span>
                <span>Private options</span>
                <span>Booking assistance</span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.75rem] border border-stone-200 bg-stone-100 shadow-[0_20px_54px_rgba(0,0,0,0.08)]">
              <Image
                src={heroImage}
                alt="Hunza Valley mountains and village scenery along the Karakoram Highway, Pakistan"
                width={900}
                height={1200}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section aria-label="Hunza tour highlights" className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [`${packages.length} matching journeys`, "Compare current package options"],
            [`PKR ${startingPrice.toLocaleString()} listed from`, "Per person; confirm current rate"],
            ["7 and 8 days", "Road and air route options"],
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
            <SectionHeading label="Route overview">Best Hunza Valley Tour Packages</SectionHeading>
            <p className="mt-5 text-sm leading-7 text-stone-600">
              Hunza Valley tour packages bundle your hotels, transport, sightseeing, and local support into one clear plan. They suit families, couples, friends, and first-time visitors who want the Karakoram without the stress of planning it alone. Hodophile designs each Hunza Valley trip package around real routes, either by road from Islamabad along the Karakoram Highway or by air through Skardu.
            </p>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              As a trusted Hunza Valley tour company and a tour operator for Hunza Valley, we handle bookings, rooms, vehicles, and guides. Think of this page as your Hunza Valley travel guide and booking desk in one, built for Hunza Valley tourism at its best.
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
                  Per person. Skardu and Hunza is a listed reference rate; confirm the current price.
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
          <SectionHeading label="Canonical journeys">Affordable Hunza Valley Tour Packages: 2 Matching Journeys</SectionHeading>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-stone-600">
            This destination page does not have one approved day-by-day plan for every departure. Open a package to review its itinerary and confirm the final schedule with our team.
          </p>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
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
          <SectionHeading label="Hunza Valley tour packages with hotel, transport, and meals">
            What Is Included in Our Hunza Valley Tour Packages
          </SectionHeading>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <article>
              <h3 className="font-[var(--font-display)] text-2xl text-stone-900">What&apos;s usually covered</h3>
              <ListItems items={includedItems} />
            </article>
            <article>
              <h3 className="font-[var(--font-display)] text-2xl text-stone-900">What is usually separate</h3>
              <ListItems items={separateItems} />
            </article>
          </div>
        </section>

        <section className="mt-12 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
          <SectionHeading label="Made for every traveler">Hunza Valley Family Tour Packages, Honeymoon Trips, and Group Journeys</SectionHeading>
          <div className="mt-5 space-y-5 text-sm leading-7 text-stone-600">
            <p>
              Our Hunza Valley family tour packages give you comfortable vehicles, family-friendly hotels, and a relaxed pace. These affordable family trips to Hunza Valley keep costs clear, so budget plans never hide extras. Children love the bridges, forts, and evening bonfires.
            </p>
            <p>
              Couples can choose Hunza Valley honeymoon packages with private transport, scenic stays, and quiet viewpoints over Rakaposhi. See our <Link href="/honeymoon-packages" className="font-semibold text-[#806000] underline underline-offset-4">Honeymoon Packages</Link> for more romantic getaways across Pakistan.
            </p>
            <p>
              Friends and small groups can book Hunza group tour packages with shared costs and one tour manager. Anyone who wants privacy can pick a Hunza private tour with a local guide, a fixed vehicle, and flexible stops.
            </p>
            <p>
              Luxury and budget plans both exist, and foreign tourists can request a customized itinerary with extra days. Not sure what fits? Try our <Link href="/trip-suggestions" className="font-semibold text-[#806000] underline underline-offset-4">Trip Finder</Link> or send your dates through <Link href="/make-my-trip" className="font-semibold text-[#806000] underline underline-offset-4">Make My Trip</Link>.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <SectionHeading label="Forts, lakes, and peaks">Hunza Sightseeing Tours: Forts, Lakes, and Karakoram Views</SectionHeading>
          <p className="mt-5 max-w-4xl text-sm leading-7 text-stone-600">
            Hunza Valley tours blend mountain scenery, culture, and nature. Guided sightseeing around Hunza includes ancient forts, turquoise lakes, glaciers, and village lanes, ideal for photography tours and heritage exploration.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {attractions.map((attraction) => (
              <span key={attraction} className="rounded-full border border-stone-200 bg-white px-3 py-2 text-xs font-medium text-stone-700">
                {attraction}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm leading-7 text-stone-600">
            Karimabad is the cultural heart of the valley, and Baltit and Altit forts tell its royal history. Travelers who want high-altitude drama continue through Gulmit and Gojal to the Passu Cones and Khunjerab Pass. Stops differ by package, and we can add more on request. Want more peaks? Pair Hunza with <Link href="/tours/northern-tours/skardu-valley-tour-packages" className="font-semibold text-[#806000] underline underline-offset-4">Skardu Valley Tour Packages</Link>, remote river views on the <Link href="/tours/northern-tours/astor-valley-tour-packages" className="font-semibold text-[#806000] underline underline-offset-4">Astor Valley Tour Packages</Link>, or trekking on our <Link href="/tours/adventure" className="font-semibold text-[#806000] underline underline-offset-4">Adventure Tours</Link>.
          </p>
        </section>

        <section className="mt-12 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
          <SectionHeading label="Choose how you travel">Hunza Valley Tour Packages from Karachi, Lahore, and Islamabad</SectionHeading>
          <div className="mt-5 space-y-5 text-sm leading-7 text-stone-600">
            <p>
              Our road journey starts in Islamabad and follows the Karakoram Highway, a classic Hunza road trip. If you prefer speed, the air journey uses flights from Karachi, Lahore, or Islamabad and links Hunza with Skardu.
            </p>
            <p>
              Browse northern <Link href="/tours/northern-tours" className="font-semibold text-[#806000] underline underline-offset-4">road journeys</Link> or <Link href="/tours/northern-tours/by-air-or-road" className="font-semibold text-[#806000] underline underline-offset-4">flights and itineraries</Link>. Our listed journeys run 7 and 8 days, so a one-week Hunza tour is covered by the air plan. Short Hunza Valley tour packages and 3, 4, 5, or 6 day plans can be customized, though a weekend is too short for the full mountain circuit.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
          <SectionHeading label="Travel planning and booking support">Hunza Valley Travel Planning and Booking Services</SectionHeading>
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm leading-7 text-stone-600">
                Our planning support covers route timing, room selection, vehicle type, and any custom add-ons for families, couples, or small groups. We help you compare private road and flight-linked options so you can choose the right pace without confusion.
              </p>
            </div>
            <div>
              <p className="text-sm leading-7 text-stone-600">
                We also advise on seasonality, road conditions, and route timing for safety and comfort, especially around Khunjerab Pass, Attabad Lake, and the Karakoram Highway. Every detail is discussed before confirmation so your plan fits your dates and budget.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-[1.75rem] border border-[#fcc000]/40 bg-[#fff8df] p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
          <SectionHeading label="Why choose Hodophile">Why Choose Hodophile for Hunza Tours</SectionHeading>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {trustPoints.map((point) => (
              <div key={point} className="rounded-2xl border border-[#e9d58d] bg-white/80 p-4 text-sm leading-6 text-stone-700">
                {point}
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="mt-12 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] md:p-8">
          <SectionHeading label="Questions travellers usually ask">Questions Travellers Usually Ask</SectionHeading>
          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                <h3 className="font-semibold text-stone-900">{faq.question}</h3>
                <p className="mt-2 text-sm leading-7 text-stone-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-[2rem] border border-stone-200 bg-[linear-gradient(135deg,#1a1a1a,#0f172a)] p-6 text-white shadow-[0_18px_52px_rgba(15,23,42,0.18)] md:p-8">
          <h2 className="font-[var(--font-display)] text-3xl leading-tight text-white sm:text-4xl">
            Tell us your dates, and we will tailor the route around you.
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/make-my-trip" className="site-button-primary !text-black">Customize this trip</Link>
            <WhatsAppLink message="Hi Hodophile, I want a custom Hunza trip plan. Please share availability and the best current price.">
              WhatsApp a travel expert
            </WhatsAppLink>
          </div>
        </section>
      </PageShell>
    </>
  );
}

export const hunzaTourPageMetadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: absoluteUrl(pagePath),
    images: [{ url: heroImage, alt: "Hunza Valley mountains and village scenery along the Karakoram Highway, Pakistan" }],
  },
};
