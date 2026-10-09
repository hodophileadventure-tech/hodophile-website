import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/page-shell";
import { absoluteUrl, whatsappUrl } from "@/lib/site";
import { buildPageSchema } from "@/lib/seo/structured-data";

type PackageSection = {
  title: string;
  items: string[];
};

type InternationalPackage = {
  id: string;
  name: string;
  region: string;
  duration: string;
  departure: string;
  price: string;
  image?: string;
  imageAlt?: string;
  artwork?: {
    title: string;
    route: string;
  };
  summary: string;
  highlights: string[];
  sections: PackageSection[];
  note?: string;
};

const internationalPackages: InternationalPackage[] = [
  {
    id: "dubai-thailand",
    name: "Dubai + Thailand",
    region: "United Arab Emirates · Thailand",
    duration: "9 days · 8 nights",
    departure: "25 Oct & 15 Nov · year to be confirmed",
    price: "PKR 385,000",
    image: "/images/international/dubai-thailand.png",
    imageAlt: "Dubai and Thailand holiday highlights",
    summary:
      "A two-country escape combining Bangkok temples and island time with Dubai city highlights and an evening desert safari.",
    highlights: ["4-star stays", "Thailand & Dubai e-visas", "Desert safari with BBQ dinner"],
    sections: [
      {
        title: "Included",
        items: [
          "Airport meet and greet, pre-travel guidance, and 24/7 travel assistance",
          "4-star hotels with daily breakfast and double, twin, or triple sharing",
          "Thailand e-visa and Dubai e-visa",
          "Airport, hotel, and sightseeing transportation",
        ],
      },
      {
        title: "Experiences",
        items: [
          "Bangkok temples tour with Gems Gallery",
          "Coral Island speedboat tour with lunch",
          "Dubai city tour with photo stops, including Dubai Mall and the Fountain Show",
          "Desert safari with BBQ dinner and entertainment",
        ],
      },
      {
        title: "Flights & pricing",
        items: [
          "Karachi – Dubai – Bangkok – Dubai – Karachi",
          "Adult: PKR 385,000 per person on double, twin, or triple sharing",
          "Child with bed (6–12): PKR 365,000 · child without bed (2–6): PKR 295,000",
          "Infant (1–23 months): PKR 110,000",
        ],
      },
    ],
    note: "Departure years were not included in the supplied package details. Confirm dates and live pricing before booking.",
  },
  {
    id: "china",
    name: "The Amazing China",
    region: "China",
    duration: "Duration not specified",
    departure: "30 Oct & 30 Nov · year to be confirmed",
    price: "PKR 595,000",
    image: "/images/international/china.png",
    imageAlt: "China holiday highlights",
    summary:
      "A city-led China itinerary spanning Beijing and Shanghai, from the Great Wall and Forbidden City to the Bund and Huangpu River.",
    highlights: ["4-star hotels", "China visa invitation letter", "Meals and sightseeing included"],
    sections: [
      {
        title: "Accommodation & travel",
        items: [
          "4-star hotels, double or twin bedding, and complimentary water bottles",
          "China visa with an invitation letter from a Chinese company",
          "Thai Airways, Emirates, Qatar Airways, or a similar airline",
          "Airport and sightseeing transportation",
          "Daily breakfast, lunches, and dinners",
        ],
      },
      {
        title: "Sightseeing",
        items: [
          "Tiananmen Square, Forbidden City, Jingshan Park, and Nanluoguxiang Alley",
          "Mutianyu Great Wall with cable car and shuttle bus",
          "Olympic Bird’s Nest Stadium (outside view)",
          "Yuyuan, Chenghuangmiao, Nanjing Road, and the Bund",
          "Huangpu River Cruise, Oriental Pearl Tower, Wukang Road, and Tianzifang",
        ],
      },
      {
        title: "Pricing",
        items: [
          "Adult: PKR 595,000 per person on double or triple sharing",
          "Child (6–12): PKR 570,000 · child without bed (2–6): PKR 495,000",
          "Infant (1–23 months): PKR 145,000",
          "The supplied sheet quotes a USD exchange rate of 280",
        ],
      },
    ],
    note: "The source does not state the departure year or trip duration. Confirm both, along with the final flight routing, before booking.",
  },
  {
    id: "vietnam",
    name: "Vietnam Grand Tour",
    region: "Vietnam",
    duration: "11 days",
    departure: "15 Oct & 15 Nov · year to be confirmed",
    price: "PKR 550,000",
    image: "/images/international/vietnam.png",
    imageAlt: "Vietnam holiday highlights",
    summary:
      "A multi-stop journey through Hanoi, Ha Long Bay, Da Nang, Hoi An, Phu Quoc, and Saigon, with an overnight cruise and domestic flights.",
    highlights: ["4-star hotels", "Ha Long Bay overnight cruise", "Domestic flights and tours"],
    sections: [
      {
        title: "Included",
        items: [
          "International and domestic flights, Vietnam e-visa, hotels, tours, and transfers",
          "4-star hotels with daily breakfast, complimentary water, and double or twin bedding",
          "Extra bed may be a mattress or sofa bed",
          "Syrena Cruise for two days, with all cruise meals",
          "Airport and sightseeing transportation",
        ],
      },
      {
        title: "Route highlights",
        items: [
          "Hanoi city sights, then Hoa Lu and a boat ride through Tam Coc in Ninh Binh",
          "Ha Long Bay overnight cruise, Surprise Cave, Titov Island, and Luon Cave",
          "Da Nang, Ba Na Hills, the Golden Bridge, Coconut Forest, and Hoi An Ancient Town",
          "Phu Quoc’s VinWonders and Safari, followed by Cu Chi Tunnels and Saigon city sights",
        ],
      },
      {
        title: "Flights & pricing",
        items: [
          "Karachi or Lahore to Hanoi and return from Saigon via Dubai on Emirates",
          "Domestic flights are listed for Hanoi–Da Nang, Da Nang–Phu Quoc, and Phu Quoc–Saigon",
          "Adult: PKR 550,000 · child (6–12): PKR 510,000",
          "Child without bed (2–6): PKR 390,000 · infant (1–23 months): PKR 170,000",
        ],
      },
      {
        title: "Day-by-day outline",
        items: [
          "Day 1: Arrive in Hanoi and visit Hoan Kiem Lake, Tran Quoc Pagoda, Train Street, and Dong Xuan Market",
          "Day 2: Ninh Binh, Hoa Lu, and Tam Coc",
          "Days 3–4: Ha Long Bay overnight cruise, then onward to Da Nang",
          "Days 5–6: Ba Na Hills and Golden Bridge; Coconut Forest and Hoi An",
          "Days 7–9: Fly to Phu Quoc, visit VinWonders and Safari, then continue to Saigon",
          "Day 10: Cu Chi Tunnels and Saigon city sights",
          "Day 11: Depart for home",
        ],
      },
    ],
    note: "The supplied itinerary conflicts on the Da Nang–Phu Quoc flight and overnight locations for days 7–9. Ask for a corrected day-by-day itinerary before confirming.",
  },
  {
    id: "thailand-malaysia-sri-lanka",
    name: "Thailand · Malaysia · Sri Lanka",
    region: "Thailand · Malaysia · Sri Lanka",
    duration: "Duration not specified",
    departure: "26 Oct · year to be confirmed",
    price: "PKR 399,000",
    image: "/images/international/thailand-malaysia-sri-lanka.png",
    imageAlt: "Thailand, Malaysia, and Sri Lanka holiday highlights",
    summary:
      "A three-country group departure pairing Colombo and Kuala Lumpur with Bangkok, Genting Highlands, and Coral Island.",
    highlights: ["3- and 4-star hotels", "Three e-visas", "Genting cable car & Coral Island"],
    sections: [
      {
        title: "Included",
        items: [
          "Airport meet and greet, pre-travel guidance, and 24/7 travel assistance",
          "3- or 4-star hotels, daily breakfast, and double, twin, or triple sharing",
          "Malaysia and Thailand e-visas; Sri Lanka e-visa (listed as 48-hour processing)",
          "Airport, hotel, and sightseeing transportation",
        ],
      },
      {
        title: "Experiences",
        items: [
          "Colombo and Kuala Lumpur city tours",
          "Genting Highlands full-day tour with return cable car",
          "Batu Caves photo stop",
          "Bangkok temples tour with Gems Gallery",
          "Coral Island speedboat tour with lunch",
        ],
      },
      {
        title: "Flights & pricing",
        items: [
          "SriLankan Airlines routing is listed via Colombo, Kuala Lumpur, and Bangkok; Kuala Lumpur–Bangkok on a domestic airline",
          "Adult: PKR 399,000 per person on double or triple sharing",
          "Child with bed (6–12): PKR 379,000 · child without bed (2–6): PKR 325,000",
          "Infant (1–23 months): PKR 110,000",
        ],
      },
    ],
    note: "The departure year, duration, and exact flight sequence are not clear in the supplied details. Confirm the final itinerary and price before booking.",
  },
  {
    id: "istanbul-antalya",
    name: "Istanbul + Antalya",
    region: "Türkiye",
    duration: "6 days · 5 nights",
    departure: "25 Sep 2026 · listed departure has passed",
    price: "PKR 295,000*",
    image: "/images/international/istanbul-antalya.png",
    imageAlt: "Istanbul and Antalya holiday highlights",
    summary:
      "An Istanbul and Antalya escape listed in the supplied package sheet, pending a corrected itinerary and current quote.",
    highlights: ["Istanbul + Antalya", "6 days / 5 nights", "Request updated departure"],
    sections: [
      {
        title: "Details to confirm",
        items: [
          "The sheet lists a 6-day, 5-night Istanbul + Antalya package and a starting figure of PKR 295,000",
          "The listed departure date, 25 September 2026, has passed",
          "The remaining accommodation, visa, flight, and sightseeing text describes Baku and Umrah travel rather than Türkiye",
          "The detailed sharing prices also conflict with the headline starting figure",
        ],
      },
    ],
    note: "The price and inclusions are not reliable enough to present as a current offer. Request a corrected Türkiye itinerary, new dates, and written quotation.",
  },
  {
    id: "uzbekistan",
    name: "Uzbekistan Promo",
    region: "Uzbekistan",
    duration: "5 days · 4 nights",
    departure: "Every Sunday from Karachi",
    price: "PKR 170,000",
    image: "/images/international/uzbekistan.png",
    imageAlt: "Uzbekistan holiday highlights",
    summary:
      "A short Tashkent escape with a city tour, landmark architecture, and a mix of private airport transfers and shared sightseeing.",
    highlights: ["4-star hotels", "Centrum Airways", "Tashkent city tour"],
    sections: [
      {
        title: "Included",
        items: [
          "Airport meet and greet, pre-travel guidance, hotel accommodation, tours, and transfers",
          "4-star hotels with double or triple bedrooms and daily breakfast",
          "Uzbekistan sticker visa",
          "Centrum Airways international tickets: Karachi–Tashkent–Karachi",
          "Tashkent return airport transfers on a private basis; city tour on a shared basis",
        ],
      },
      {
        title: "Tashkent sightseeing",
        items: [
          "Panoramic views from the TV Tower",
          "Minor Mosque and Monument of Courage",
          "Kosmonavtiar Station and Chorsu Bazaar",
          "Hazrati Imam Complex",
        ],
      },
      {
        title: "Pricing",
        items: ["PKR 170,000 per person, as quoted in the supplied package details"],
      },
    ],
    note: "Confirm Sunday availability, visa requirements, flight schedule, and current pricing before booking.",
  },
];

const pageTitle = "Beyond Pakistan | International Holiday Packages";
const pageDescription =
  "Explore curated international holiday packages from Pakistan, with departures to Dubai, Thailand, China, Vietnam, Sri Lanka, Türkiye, and Uzbekistan.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/beyond-pakistan",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: absoluteUrl("/beyond-pakistan"),
    images: ["/images/international/dubai-thailand.png"],
  },
};

function PackageCard({ pkg, index }: { pkg: InternationalPackage; index: number }) {
  return (
    <article
      id={pkg.id}
      className="group scroll-mt-28 overflow-hidden rounded-[1.25rem] border border-[#d4b34d]/25 bg-[#fffefa] shadow-[0_22px_60px_rgba(0,0,0,0.2)] transition duration-500 hover:-translate-y-1 hover:border-[#c7a32a] hover:shadow-[0_30px_75px_rgba(0,0,0,0.36)]"
    >
      <div className="relative h-72 overflow-hidden bg-[#161616] sm:h-[22rem]">
        {pkg.image ? (
          <Image
            src={pkg.image}
            alt={pkg.imageAlt ?? ""}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition duration-1000 group-hover:scale-[1.06]"
          />
        ) : (
          <div className="absolute inset-0 overflow-hidden bg-[#141923]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_20%,rgba(206,170,75,0.3),transparent_35%),linear-gradient(135deg,#111723,#2b3140_62%,#71603f)]" />
            <div className="absolute -right-14 top-8 h-64 w-64 rounded-full border border-white/10 transition duration-700 group-hover:scale-110" />
            <div className="absolute right-2 top-20 h-48 w-48 rounded-full border border-white/10" />
            <div className="absolute inset-x-8 top-[43%] h-px bg-gradient-to-r from-transparent via-[#FCC000]/70 to-transparent" />
            <div className="absolute inset-x-8 top-[43%] h-20 -translate-y-1/2 border-x border-[#FCC000]/20" />
            <div className="absolute inset-x-0 top-8 text-center font-[var(--font-display)] text-[0.62rem] uppercase tracking-[0.42em] text-white/45">
              A Hodophile route
            </div>
            <div className="absolute inset-x-7 top-1/2 -translate-y-1/2 text-center">
              <p className="font-[var(--font-display)] text-3xl leading-tight text-white sm:text-4xl">
                {pkg.artwork?.title}
              </p>
              <p className="mx-auto mt-3 max-w-sm text-[0.62rem] uppercase leading-5 tracking-[0.2em] text-white/55">
                {pkg.artwork?.route}
              </p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.26)_0%,transparent_28%,rgba(0,0,0,0.05)_48%,rgba(0,0,0,0.82)_100%)]" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-6">
          <span className="rounded-full border border-white/30 bg-black/25 px-3.5 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
            {pkg.region}
          </span>
          <span className="font-[var(--font-display)] text-sm tracking-[0.18em] text-white/80">
            {String(index + 1).padStart(2, "0")} <span className="text-[#FCC000]">/ 06</span>
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">{pkg.duration}</p>
          <h3 className="mt-2 font-[var(--font-display)] text-4xl leading-[1.02] tracking-[-0.02em] sm:text-[2.8rem]">
            {pkg.name}
          </h3>
          <p className="mt-3 text-sm font-medium text-white/85">
            From <span className="text-[#FCC000]">{pkg.price}</span>
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#806700]">
          The journey
        </p>
        <p className="mt-3 text-[0.96rem] leading-7 text-stone-600">{pkg.summary}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {pkg.highlights.map((highlight) => (
            <li
              key={highlight}
              className="rounded-full border border-stone-200 bg-[#f8f6f0] px-3.5 py-2 text-xs font-medium text-stone-700"
            >
              {highlight}
            </li>
          ))}
        </ul>

        <details className="group/details mt-7 border-t border-stone-200 pt-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-stone-900 marker:content-none">
            <span className="transition group-open/details:text-[#806700]">Discover the details</span>
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 text-lg transition group-open/details:rotate-45 group-open/details:border-[#c69a00]"
            >
              +
            </span>
          </summary>
          <div className="mt-6 space-y-6">
            <div className="flex items-start justify-between gap-5 border-l-2 border-[#c69a00] bg-[#f8f6f0] px-4 py-3">
              <div>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-stone-500">
                  Departure
                </p>
                <p className="mt-1 text-sm font-medium leading-6 text-stone-800">{pkg.departure}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-stone-500">
                  Listed from
                </p>
                <p className="mt-1 font-[var(--font-display)] text-xl text-stone-950">{pkg.price}</p>
              </div>
            </div>
            {pkg.sections.map((section, sectionIndex) => (
              <section key={section.title}>
                <div className="flex items-center gap-3">
                  <span className="font-[var(--font-display)] text-sm text-[#b08b16]">
                    {String(sectionIndex + 1).padStart(2, "0")}
                  </span>
                  <h4 className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-stone-800">
                    {section.title}
                  </h4>
                </div>
                <ul className="mt-3 space-y-2.5 pl-7">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-stone-600">
                      <span aria-hidden="true" className="mt-[0.65rem] h-1 w-1 shrink-0 rounded-full bg-[#c69a00]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            {pkg.note ? (
              <p className="rounded-xl border border-[#e9dba9] bg-[#fff9e5] px-4 py-3.5 text-sm leading-6 text-stone-700">
                <span className="font-semibold text-[#6e590d]">A note before you go: </span>
                {pkg.note}
              </p>
            ) : null}
          </div>
        </details>

        <div className="mt-6 flex flex-col gap-3 border-t border-stone-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-stone-500">
            Dates and fares confirmed with our team
          </p>
          <a
            href={whatsappUrl(`Hi Hodophile, I would like to request this tour: ${pkg.name}. Please share the current dates, availability, and booking details.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#11110f] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#FCC000] hover:text-black"
          >
            Request this tour
            <span aria-hidden="true" className="text-base text-[#FCC000] transition group-hover:text-black">↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}

function JourneyPlanning() {
  const steps = [
    {
      number: "01",
      title: "Find your somewhere",
      description: "Choose a journey that feels right for your dates, pace, and travel party.",
    },
    {
      number: "02",
      title: "Make it yours",
      description: "We’ll confirm the latest itinerary, availability, inclusions, and fare with you.",
    },
    {
      number: "03",
      title: "Set off with clarity",
      description: "Travel with the details agreed in advance and a team ready to assist.",
    },
  ];

  return (
    <section className="bg-[#f4f1eb] px-5 py-12 sm:px-8 lg:px-14 lg:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#806700]">
            From here to there
          </p>
          <h2 className="mt-4 max-w-md font-[var(--font-display)] text-4xl leading-[1.08] tracking-[-0.025em] text-stone-950 sm:text-5xl">
            The details matter. We make room for the wonder.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-stone-600">
            Every departure has its own particulars. We help you understand them before you decide,
            so the experience can begin with confidence.
          </p>
        </div>
        <ol className="divide-y divide-stone-300 border-y border-stone-300">
          {steps.map((step) => (
            <li key={step.number} className="grid gap-3 py-6 sm:grid-cols-[3.5rem_1fr] sm:gap-5">
              <span className="font-[var(--font-display)] text-2xl text-[#b08b16]">{step.number}</span>
              <div>
                <h3 className="font-[var(--font-display)] text-2xl text-stone-950">{step.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-stone-600">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function BeyondPakistanPage() {
  return (
    <PageShell wide noTopPadding>
      <JsonLd
        data={buildPageSchema({
          title: pageTitle,
          description: pageDescription,
          url: "/beyond-pakistan",
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Beyond Pakistan", url: "/beyond-pakistan" },
          ],
        })}
      />
      <div className="-mx-4 overflow-hidden md:-mx-6 lg:-mx-10 xl:-mx-14">
        <section className="relative isolate flex min-h-[min(780px,calc(100svh-var(--site-header-height)))] items-center overflow-hidden bg-[#090909] px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-14 lg:py-10">
          <Image
            src="/images/international/dubai-thailand.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 -z-20 object-cover"
          />
          <video
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/international/dubai-thailand.png"
            aria-hidden="true"
          >
            <source src="/videos/beyond-pakistan.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.62)_52%,rgba(0,0,0,0.22)_100%),linear-gradient(0deg,rgba(0,0,0,0.42),transparent_48%)]" />
          <div className="pointer-events-none absolute -right-40 -top-48 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#FCC000]/[0.07] blur-3xl" />
          <div className="relative mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
            <div className="flex flex-col justify-center py-3 lg:py-10">
              <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.34em] text-[#FCC000]">
                <span className="h-px w-10 bg-[#FCC000]" />
                International journeys by Hodophile
              </p>
              <h1 className="mt-6 font-[var(--font-display)] text-6xl leading-[0.94] tracking-[-0.04em] sm:text-7xl lg:text-[6rem] xl:text-[6.5rem]">
                Beyond
                <span className="mt-2 block text-[#FCC000]">Pakistan.</span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-8 text-white/75 sm:text-lg">
                Thoughtfully arranged escapes across Asia and beyond, with clear inclusions,
                considered details, and a Hodophile team beside you from departure to return.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#packages"
                  className="inline-flex items-center justify-center rounded-full bg-[#FCC000] px-6 py-3.5 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-[#ffda4d]"
                >
                  Explore the collection
                </a>
                <a
                  href={whatsappUrl("Hi Hodophile, I would like help choosing an international holiday package.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-[#FCC000] hover:text-[#FCC000]"
                >
                  Speak with our team
                </a>
              </div>

            </div>

            <div className="grid max-w-md grid-cols-3 gap-x-4 border-t border-white/20 pt-5 sm:gap-x-6 lg:mb-2 lg:max-w-none lg:grid-cols-1 lg:gap-y-5 lg:border-l lg:border-t-0 lg:border-[#FCC000]/60 lg:pl-6 lg:pt-0">
                <div>
                  <p className="font-[var(--font-display)] text-2xl text-white sm:text-3xl">06</p>
                  <p className="mt-1 text-[0.58rem] uppercase leading-4 tracking-[0.14em] text-white/70 sm:text-[0.65rem]">
                    Curated journeys
                  </p>
                </div>
                <div className="border-l border-white/25 pl-4 sm:pl-6 lg:border-l-0 lg:pl-0">
                  <p className="font-[var(--font-display)] text-2xl text-white sm:text-3xl">PKR 170K</p>
                  <p className="mt-1 text-[0.58rem] uppercase leading-4 tracking-[0.14em] text-white/70 sm:text-[0.65rem]">
                    Listed starting fare
                  </p>
                </div>
                <div className="border-l border-white/25 pl-4 sm:pl-6 lg:border-l-0 lg:pl-0">
                  <p className="font-[var(--font-display)] text-2xl text-white sm:text-3xl">One team</p>
                  <p className="mt-1 text-[0.58rem] uppercase leading-4 tracking-[0.14em] text-white/70 sm:text-[0.65rem]">
                    From planning to return
                  </p>
                </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-white/10 bg-[#0b0b0b] px-5 py-8 text-white sm:px-8 lg:px-14">
          <div className="absolute -right-24 -top-36 h-72 w-72 rounded-full bg-[#FCC000]/10 blur-3xl" />
          <div className="relative mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="shrink-0">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-[#FCC000]">
                A world of possibility
              </p>
              <p className="mt-1 font-[var(--font-display)] text-2xl text-white">Where will you go?</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/60 sm:gap-x-6">
              {["Dubai", "Bangkok", "Beijing", "Vietnam", "Kuala Lumpur", "Istanbul", "Tashkent"].map(
                (destination, index) => (
                  <span key={destination} className="inline-flex items-center gap-4">
                    {index > 0 ? <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#FCC000]" /> : null}
                    {destination}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>

        <section id="packages" className="relative isolate scroll-mt-20 overflow-hidden bg-[#0b0b0b] px-5 py-12 text-white sm:px-8 lg:px-14 lg:py-16">
          <div className="pointer-events-none absolute -left-48 top-12 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#FCC000]/[0.07] blur-3xl" />
          <div className="pointer-events-none absolute -right-48 top-[38%] -z-10 h-[38rem] w-[38rem] rounded-full bg-[#b47b12]/[0.09] blur-3xl" />
          <div className="mx-auto max-w-7xl">
            <div className="relative grid gap-8 border-y border-[#FCC000]/25 py-8 sm:py-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16 lg:py-12">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FCC000]/65 to-transparent" />
              <div className="max-w-3xl">
                <p className="inline-flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-[#FCC000]">
                  <span className="h-px w-10 bg-[#FCC000]" />
                  The Hodophile collection
                  <span className="h-px w-10 bg-[#FCC000]/45" />
                </p>
                <h2 className="mt-5 font-[var(--font-display)] text-5xl leading-[0.98] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl">
                  Not just places.
                  <span className="mt-2 block text-[#FCC000]">Ways to feel them.</span>
                </h2>
              </div>
              <div className="flex items-center justify-between gap-8 lg:max-w-sm lg:justify-end lg:gap-6">
                <p className="max-w-[15rem] text-sm leading-7 text-white/65">
                  Six distinct journeys, each with its own pace, character, and story.
                </p>
                <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-full border border-[#FCC000]/45 bg-[#FCC000]/[0.06] shadow-[0_0_42px_rgba(252,192,0,0.08)] sm:h-24 sm:w-24">
                  <span className="font-[var(--font-display)] text-3xl leading-none text-[#FCC000] sm:text-4xl">06</span>
                  <span className="mt-1 text-[0.52rem] font-semibold uppercase tracking-[0.18em] text-white/55">Journeys</span>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:mt-10 xl:gap-8">
              {internationalPackages.map((pkg, index) => (
                <PackageCard key={pkg.id} pkg={pkg} index={index} />
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs leading-6 text-white/50 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
              <p className="max-w-3xl">
                Departure dates and prices are subject to change without prior notice. Package
                inclusions, visa requirements, airline schedules, and final booking terms must be
                reconfirmed in writing before payment.
              </p>
              <p className="shrink-0 font-semibold uppercase tracking-[0.16em] text-[#FCC000]/75">
                Travel well. Travel considered.
              </p>
            </div>
          </div>
        </section>

        <JourneyPlanning />

        <section className="relative overflow-hidden bg-[#090909] px-5 py-12 text-white sm:px-8 lg:px-14 lg:py-16">
          <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-[#FCC000]/10 blur-3xl" />
          <div className="absolute -bottom-48 left-1/4 h-72 w-72 rounded-full bg-[#FCC000]/[0.06] blur-3xl" />
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(130deg,rgba(255,255,255,0.07),rgba(255,255,255,0.015)_55%,rgba(252,192,0,0.08))] px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-3xl">
                <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#FCC000]">
                  <span className="h-px w-8 bg-[#FCC000]" />
                  Your next chapter
                </p>
                <h2 className="mt-4 font-[var(--font-display)] text-4xl leading-[1.05] tracking-[-0.025em] sm:text-5xl lg:text-6xl">
                  The world is closer
                  <span className="text-[#FCC000]"> than it feels.</span>
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
                  Tell us what you are dreaming of. We’ll help you check current dates, availability,
                  and the right package for your travel party.
                </p>
              </div>
              <Link
                href={whatsappUrl("Hi Hodophile, I would like to plan an international holiday.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-[#FCC000] px-7 py-4 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-[#ffda4d]"
              >
                Plan with Hodophile
                <span aria-hidden="true" className="text-lg">↗</span>
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-4 border-t border-white/10 pt-5 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-white/35">
              <span>Hodophile Adventures</span>
              <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
              <span>Go beyond</span>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
