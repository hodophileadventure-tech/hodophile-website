import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/page-shell";
import { absoluteUrl, whatsappUrl } from "@/lib/site";
import { buildPageSchema } from "@/lib/seo/structured-data";

type OfferRegion = "caucasus" | "mediterranean" | "asia" | "visa";

type InternationalOffer = {
  id: string;
  name: string;
  region: OfferRegion;
  category: string;
  duration: string;
  dates: string;
  travelers: string;
  price?: string;
  priceUnit?: string;
  image: string;
  imageAlt: string;
  summary: string;
  availability: string;
  highlights: string[];
  includes: string[];
};

const offers: InternationalOffer[] = [
  {
    id: "baku-caspian-afterglow",
    name: "Caspian Afterglow",
    region: "caucasus",
    category: "Baku group journey",
    duration: "6 nights / 7 days",
    dates: "20-26 July; year not stated",
    travelers: "12 adults",
    price: "PKR 315,000",
    priceUnit: "per person",
    image: "/images/international/baku.webp",
    imageAlt: "Baku waterfront architecture beside the Caspian Sea",
    summary: "A week in Baku pairing the old city and modern skyline with day trips to Gabala, Shahdag, Absheron, and Gobustan.",
    availability: "Year was not supplied; confirm current departure dates and rates.",
    highlights: ["Qafqaz Hotel Baku, 4-star", "Standard double room", "English-speaking guide"],
    includes: ["Six nights with daily breakfast", "FlyDubai itinerary as quoted", "Sprinter transfers and tours", "Gabala and Shahdag cable cars", "Baku, Absheron, and Gobustan tour tickets", "12 standard Azerbaijan visas"],
  },
  {
    id: "baku-family-caspian",
    name: "Baku, Together",
    region: "caucasus",
    category: "Baku family escape",
    duration: "4 hotel nights; 8-13 July 2026",
    dates: "8-13 July 2026",
    travelers: "2 adults + 2 children",
    price: "PKR 280,000 adult / PKR 210,000 child",
    priceUnit: "per person",
    image: "/images/international/baku.webp",
    imageAlt: "Baku waterfront architecture beside the Caspian Sea",
    summary: "A family Baku stay with city highlights, Shahdag, and the Absheron Peninsula, with flights and e-visas listed in the offer.",
    availability: "The supplied departure has passed; ask for the next available dates.",
    highlights: ["Qafqaz Baku City Hotel, 4-star", "Standard double + baby cot", "Shahdag cable car"],
    includes: ["Return FlyDubai flights as listed", "Four hotel nights with breakfast", "Airport transfers and sedan transport", "Baku city, Shahdag, and Absheron tours", "Azerbaijan e-visas", "Listed entrance tickets"],
  },
  {
    id: "turkey-between-two-seas",
    name: "Between Two Seas",
    region: "mediterranean",
    category: "Istanbul + Antalya",
    duration: "7 nights / 8 days",
    dates: "20-27 July 2026",
    travelers: "2 adults",
    price: "PKR 280,000",
    priceUnit: "per person",
    image: "/images/international/istanbul.webp",
    imageAlt: "Ferry crossing the Bosphorus with Istanbul's historic skyline",
    summary: "An Istanbul and Antalya stay with a Bosphorus dinner cruise and a guided Princess Island day.",
    availability: "The supplied departure has passed; ask for the next available dates.",
    highlights: ["Istanbul + Antalya", "Daily breakfast", "Bosphorus dinner cruise"],
    includes: ["Ramada by Wyndham Istanbul Taksim", "Best Western Plus Khan Hotel, Antalya", "Intercity transport tickets", "Airport transfers", "Tours and local tour transport", "Princess Island ferry and guide"],
  },
  {
    id: "malaysia-straits-to-shoreline",
    name: "Straits to Shoreline",
    region: "asia",
    category: "Langkawi + Kuala Lumpur",
    duration: "6 nights / 7 days",
    dates: "21-28 July 2026",
    travelers: "12 adults",
    price: "PKR 370,000",
    priceUnit: "per person",
    image: "/images/international/langkawi.webp",
    imageAlt: "Green Langkawi island rising above the blue Andaman Sea",
    summary: "A two-stop Malaysia group holiday combining Langkawi's island tours with Kuala Lumpur and Genting Highlands.",
    availability: "The supplied departure has passed; ask for the next available dates.",
    highlights: ["3 nights Langkawi + 3 nights Kuala Lumpur", "Batik Air return flights", "12-person group"],
    includes: ["Return Batik Air flights with 20 kg baggage as listed", "Nadias Hotel Cenang Beach Langkawi", "Grand Mercure Bukit Bintang Kuala Lumpur", "Daily breakfast", "Airport transfers and private transportation", "Kuala Lumpur, Genting, Batu Caves, and Langkawi tours"],
  },
  {
    id: "malaysia-bali-thailand-tri-nation",
    name: "Three Countries, One Journey",
    region: "asia",
    category: "Malaysia + Bali + Thailand",
    duration: "12 days",
    dates: "Departure 12 July; year not stated",
    travelers: "6 adults; 2 triple-sharing rooms",
    image: "/images/international/bali.webp",
    imageAlt: "Green rice terraces and Mount Agung in Bali at dawn",
    summary: "A multi-country itinerary split across Malaysia, Bali, and Thailand, with four days allocated to each country.",
    availability: "Year, exact city route, and current departure dates need confirmation.",
    highlights: ["4 days per country", "Return air tickets", "Hotels with breakfast"],
    includes: ["Return air tickets", "Visa as stated in the offer", "Hotel accommodation with breakfast", "Dinner", "Transportation and transfers"],
  },
  {
    id: "antalya-coast-and-current",
    name: "Antalya: Coast & Current",
    region: "mediterranean",
    category: "Antalya touring package",
    duration: "Dates and duration to be confirmed",
    dates: "Not supplied",
    travelers: "Ask for current group options",
    price: "PKR 280,000",
    priceUnit: "per person; reconfirm inclusions",
    image: "/images/international/istanbul.webp",
    imageAlt: "Turkish coastal-city travel inspiration",
    summary: "An Antalya offer listing a city cruise, waterfalls, rafting, sightseeing, accommodation, and transfers.",
    availability: "The source did not specify travel dates, duration, hotel, or flight details.",
    highlights: ["Antalya city tour", "Cruise and waterfalls", "Rafting adventure"],
    includes: ["Hotel accommodation with daily breakfast", "Intercity transport tickets", "Airport transfers", "Tours and excursions as mentioned", "Tour transportation and sightseeing"],
  },
  {
    id: "kuala-lumpur-thailand-two-shores",
    name: "Two Capitals, Two Shores",
    region: "asia",
    category: "Kuala Lumpur + Pattaya + Bangkok",
    duration: "8 nights / 9 days",
    dates: "1-9 August; year not stated",
    travelers: "1 person",
    price: "PKR 300,000",
    priceUnit: "per person",
    image: "/images/international/bangkok.webp",
    imageAlt: "White marble temple architecture in Bangkok",
    summary: "A solo-friendly route with city stays in Kuala Lumpur, Pattaya, and Bangkok, plus cable cars, island hopping, and a dinner cruise.",
    availability: "Year was not supplied; confirm dates, flights, and visa documentation requirements.",
    highlights: ["3 nights Kuala Lumpur", "2 nights Pattaya", "3 nights Bangkok"],
    includes: ["Hotel stays with breakfast", "Visa on documentation basis", "Genting Highlands and Kuala Lumpur tours", "Pattaya island-hopping tour", "Chao Phraya dinner cruise", "Tours and transfers"],
  },
  {
    id: "malaysia-island-highlands-edit",
    name: "The Island & Highlands Edit",
    region: "asia",
    category: "Langkawi + Genting + Kuala Lumpur",
    duration: "8 nights / 9 days as supplied",
    dates: "27 July-7 August 2026",
    travelers: "2 guests stated; room allocation needs confirmation",
    price: "PKR 170,000",
    priceUnit: "per person",
    image: "/images/international/langkawi.webp",
    imageAlt: "Langkawi island and sea viewed from above",
    summary: "A Malaysia stay spanning Langkawi, Genting Highlands, and Kuala Lumpur, with theme-park, cable-car, and city excursions.",
    availability: "The date span, stated duration, and room count conflict in the supplied offer; reconfirm before booking.",
    highlights: ["Langkawi + Genting + Kuala Lumpur", "Breakfast included", "Sunway Lagoon tickets listed"],
    includes: ["Hotel accommodation", "Daily breakfast", "Private airport transfers", "Tours and entrance tickets as mentioned", "Genting cable car tickets", "Taxes and service charges; tourism tax excluded"],
  },
  {
    id: "thailand-four-shores",
    name: "Four Shores of Thailand",
    region: "asia",
    category: "Phuket + Krabi + Pattaya + Bangkok",
    duration: "8 nights / 9 days",
    dates: "Not supplied",
    travelers: "Ask for current group options",
    price: "PKR 200,000",
    priceUnit: "per person",
    image: "/images/international/bangkok.webp",
    imageAlt: "Ornate marble temple in Bangkok, Thailand",
    summary: "A four-city Thailand circuit with island excursions, local sightseeing, and a Chao Phraya dinner cruise.",
    availability: "Price and travel dates were not included in the supplied offer.",
    highlights: ["2 nights each in four cities", "Phi Phi + Four Islands tours", "Bangkok temples and dinner cruise"],
    includes: ["Thailand tourist visa", "Eight hotel nights", "Daily breakfast", "Airport transfers", "Tours as mentioned"],
  },
  {
    id: "dubai-family-visa",
    name: "UAE Family Visa Assistance",
    region: "visa",
    category: "Visa service; not a tour package",
    duration: "30-day visa application",
    dates: "Application timing to be confirmed",
    travelers: "Eligible family members only",
    price: "PKR 110,000",
    priceUnit: "per person",
    image: "/images/international/dubai.webp",
    imageAlt: "Burj Khalifa above Dubai's illuminated skyline",
    summary: "A UAE family-visa service described as a done-base family visa and offered only to trusted clients.",
    availability: "Eligibility and visa approval are not guaranteed; confirm current requirements with the team.",
    highlights: ["Husband and wife", "Parents with children under 18", "Trusted clients only"],
    includes: ["Application support for eligible family members", "Passport pages, CNIC, recent photo, and FRC listed as required documents"],
  },
  {
    id: "malaysia-family-island-skyline",
    name: "Island & Skyline: A Family Escape",
    region: "asia",
    category: "Malaysia family journey",
    duration: "8 nights / 9 days",
    dates: "4-12 September 2026",
    travelers: "2 adults + 1 child",
    image: "/images/international/langkawi.webp",
    imageAlt: "Langkawi island framed by sea and green hills",
    summary: "A family stay split between Langkawi and Kuala Lumpur with island tours, a city visit, and Genting Highlands.",
    availability: "The supplied departure has passed; price was not included. Request a refreshed family quote.",
    highlights: ["4 nights Langkawi + 4 nights Kuala Lumpur", "Family accommodation", "Malaysia e-visa listed"],
    includes: ["Intercity flights", "Hotel accommodation with breakfast", "Malaysia e-visa", "Airport transfers", "Langkawi island hopping and grand tour", "Kuala Lumpur and Genting tours"],
  },
  {
    id: "bali-island-stillness",
    name: "Bali in Stillness",
    region: "asia",
    category: "Seminyak + Ubud",
    duration: "6 days / 5 nights as supplied",
    dates: "1-8 October 2026",
    travelers: "5 adults; 2 rooms",
    price: "PKR 375,000",
    priceUnit: "per person; PKR 1,875,000 total for 5 adults",
    image: "/images/international/bali.webp",
    imageAlt: "Bali rice terraces beneath Mount Agung at sunrise",
    summary: "A Seminyak and Ubud stay with Uluwatu, Nusa Penida, Kintamani, rice terraces, and waterfall touring.",
    availability: "Confirm the date span against the five hotel nights listed before booking.",
    highlights: ["3 nights Seminyak + 2 nights Ubud", "Breakfast included", "Nusa Penida day tour"],
    includes: ["Batik Air flights as listed", "Ramada Seminyak and Ubud Raya Villa", "Watersports and Uluwatu visit", "West Nusa Penida tour with lunch", "Ubud touring and airport transfer"],
  },
  {
    id: "bangkok-city-of-gold",
    name: "Bangkok, After Dark",
    region: "asia",
    category: "Bangkok solo stay",
    duration: "Dates and duration to be confirmed",
    dates: "24 October-1 November; year not stated",
    travelers: "1 adult",
    price: "PKR 200,000",
    priceUnit: "total package price as supplied",
    image: "/images/international/bangkok.webp",
    imageAlt: "Bangkok's white marble temple framed by decorative stonework",
    summary: "A Bangkok city stay with Safari World, Siam Amazing Park, and an evening Chao Phraya cruise.",
    availability: "Year and duration were not supplied; confirm the single-traveler total and availability.",
    highlights: ["KC Place Hotel Pratunam", "Breakfast included", "Thailand e-visa listed"],
    includes: ["Hotel accommodation", "Daily breakfast", "Airport transfers", "Safari World and Marine Park with lunch", "Siam Amazing Park with lunch and rides", "Chao Phraya Princess dinner cruise"],
  },
  {
    id: "thailand-city-to-coast",
    name: "Thailand: City to Coast",
    region: "asia",
    category: "Bangkok + Pattaya + Phuket",
    duration: "Dates and duration to be confirmed",
    dates: "Hotel dates listed as 1-11 October; year not stated",
    travelers: "2 adults + 1 infant",
    price: "PKR 365,000",
    priceUnit: "per person",
    image: "/images/international/bangkok.webp",
    imageAlt: "Bangkok temple architecture for a Thailand city and coast itinerary",
    summary: "A Thailand stay across Bangkok, Pattaya, and Phuket with island tours, wildlife attractions, temples, and a dinner cruise.",
    availability: "Year, exact duration, flight arrangements, and infant pricing need confirmation.",
    highlights: ["Three hotel stops", "Phi Phi + James Bond Island tours", "Safari World and city sightseeing"],
    includes: ["Airport transfers", "Hotel accommodation", "Tours as listed", "National park fees listed separately are excluded"],
  },
];

const regions: { id: OfferRegion; label: string; intro: string }[] = [
  { id: "caucasus", label: "Caucasus", intro: "Caspian city breaks, family escapes, and architecture-rich itineraries." },
  { id: "mediterranean", label: "Mediterranean", intro: "Turkey stays blending historic cities, coastal time, and guided touring." },
  { id: "asia", label: "Asia-Pacific", intro: "Island stays, Southeast Asian city pairings, and multi-country journeys." },
  { id: "visa", label: "Visa Services", intro: "A separate application-support service; visa approval is always subject to the relevant authorities." },
];

export const metadata: Metadata = {
  title: "Beyond Pakistan | International Holiday Packages",
  description: "Explore curated international holiday packages from Pakistan, including Baku, Turkey, Malaysia, Bali, Thailand, and Dubai visa assistance.",
  alternates: { canonical: "/beyond-pakistan" },
  openGraph: {
    title: "Beyond Pakistan | International Holiday Packages",
    description: "Thoughtfully arranged international journeys for Pakistani travelers.",
    url: absoluteUrl("/beyond-pakistan"),
  },
};

function OfferCard({ offer }: { offer: InternationalOffer }) {
  const inquiry = `Hello Hodophile, please share current dates, availability, and a confirmed quote for ${offer.name}.`;

  return (
    <article id={offer.id} className="group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_16px_40px_rgba(25,22,16,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#d9a407]/60 hover:shadow-[0_24px_55px_rgba(25,22,16,0.12)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-200">
        <Image src={offer.image} alt={offer.imageAlt} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
        <span className="absolute left-4 top-4 rounded-full border border-white/50 bg-black/35 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">{offer.category}</span>
        <span className="absolute bottom-4 left-4 text-xs font-medium text-white/90">{offer.duration}</span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-serif text-2xl leading-tight text-stone-950">{offer.name}</h3>
        <p className="mt-3 text-sm leading-6 text-stone-600">{offer.summary}</p>

        <dl className="mt-5 grid grid-cols-2 gap-x-3 gap-y-4 border-y border-stone-200 py-4 text-xs">
          <div>
            <dt className="uppercase tracking-[0.12em] text-stone-500">Dates</dt>
            <dd className="mt-1.5 font-medium leading-5 text-stone-800">{offer.dates}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-[0.12em] text-stone-500">Travelers</dt>
            <dd className="mt-1.5 font-medium leading-5 text-stone-800">{offer.travelers}</dd>
          </div>
          <div className="col-span-2">
            <dt className="uppercase tracking-[0.12em] text-stone-500">Availability</dt>
            <dd className="mt-1.5 leading-5 text-stone-700">{offer.availability}</dd>
          </div>
        </dl>

        <div className="mt-4 flex flex-wrap gap-2">
          {offer.highlights.map((highlight) => <span key={highlight} className="rounded-full bg-[#f6f3ea] px-3 py-1.5 text-xs text-stone-700">{highlight}</span>)}
        </div>

        <details className="mt-5 border-t border-stone-200 pt-4">
          <summary className="cursor-pointer text-sm font-semibold text-stone-800 marker:text-[#9a7600]">View listed inclusions</summary>
          <ul className="mt-3 grid gap-2 text-sm leading-5 text-stone-600">
            {offer.includes.map((item) => <li key={item} className="flex gap-2"><span className="text-[#9a7600]" aria-hidden="true">+</span><span>{item}</span></li>)}
          </ul>
        </details>

        <div className="mt-auto pt-5">
          <div className="flex min-h-14 items-end justify-between gap-3 border-t border-stone-200 pt-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500">Package price</p>
              <p className="mt-1 text-lg font-bold text-stone-950">{offer.price ?? "Request a quote"}</p>
              {offer.priceUnit ? <p className="mt-0.5 text-xs text-stone-500">{offer.priceUnit}</p> : null}
            </div>
            <a href={whatsappUrl(inquiry)} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0b0b0b] px-4 py-3 text-xs font-semibold !text-white transition hover:bg-[#292929] hover:!text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9a407]">
              Enquire
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function BeyondPakistanPage() {
  return (
    <PageShell wide>
      <JsonLd data={buildPageSchema({
        title: "Beyond Pakistan | International Holiday Packages",
        description: "Curated international holiday packages from Pakistan.",
        url: "/beyond-pakistan",
        breadcrumbs: [
          { name: "Home", url: "/" },
          { name: "Beyond Pakistan", url: "/beyond-pakistan" },
        ],
      })} />

      <section className="relative left-1/2 h-[66svh] min-h-[31rem] max-h-[42rem] w-screen -translate-x-1/2 overflow-hidden bg-stone-950">
        <Image src="/images/international/baku.webp" alt="Baku's waterfront skyline on the Caspian Sea" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.76)_0%,rgba(8,8,8,0.36)_60%,rgba(8,8,8,0.12)_100%)]" />
        <div className="relative z-10 mx-auto flex h-full max-w-[96rem] flex-col justify-end px-5 pb-10 pt-24 text-white sm:px-8 sm:pb-14 lg:px-14">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#fcc000]">International journeys by Hodophile</p>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">Beyond Pakistan</h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">From the Caspian coast to Southeast Asia, discover considered journeys with flights, stays, and experiences brought together by one local team.</p>
          <a href="#journeys" className="mt-7 inline-flex w-fit items-center border-b border-[#fcc000] pb-2 text-sm font-semibold text-white transition hover:text-[#fcc000]">Explore international packages</a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-3 pt-10 sm:px-6 lg:px-8" aria-label="International collection overview">
        <div className="grid gap-4 border-b border-stone-200 pb-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#8b6b00]">A wider world, thoughtfully planned</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-stone-950 sm:text-4xl">Choose a journey that feels like yours.</h2>
            <p className="mt-3 text-sm leading-6 text-stone-600">Browse the international offers currently shared with our team. Dates and rates are subject to availability; some source details need reconfirmation before booking.</p>
          </div>
          <p className="text-sm font-medium text-stone-600"><span className="text-2xl font-semibold text-stone-950">{offers.length}</span> curated offers</p>
        </div>
        <nav aria-label="International package regions" className="flex flex-wrap gap-2 pt-5">
          {regions.map((region) => <a key={region.id} href={`#${region.id}`} className="rounded-full border border-stone-300 px-4 py-2 text-xs font-semibold text-stone-700 transition hover:border-[#d9a407] hover:bg-[#fff8df] hover:text-stone-950">{region.label}</a>)}
        </nav>
      </section>

      <div id="journeys" className="mx-auto max-w-7xl px-4 pb-16 pt-7 sm:px-6 lg:px-8">
        {regions.map((region) => {
          const regionOffers = offers.filter((offer) => offer.region === region.id);
          if (regionOffers.length === 0) return null;

          return (
            <section key={region.id} id={region.id} className="scroll-mt-28 py-8" aria-labelledby={`${region.id}-heading`}>
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-stone-200 pb-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#8b6b00]">{regionOffers.length} {regionOffers.length === 1 ? "offer" : "offers"}</p>
                  <h2 id={`${region.id}-heading`} className="mt-2 font-serif text-3xl text-stone-950">{region.label}</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">{region.intro}</p>
                </div>
              </div>
              <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
                {regionOffers.map((offer) => <OfferCard key={offer.id} offer={offer} />)}
              </div>
            </section>
          );
        })}
      </div>

      <section className="mb-12 border-y border-stone-200 bg-[#f4f1e9] px-5 py-10 sm:px-8 lg:py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#8b6b00]">Your dates, your pace</p>
            <h2 className="mt-2 font-serif text-3xl text-stone-950">Have another destination in mind?</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">Tell us where you would like to go and our team can confirm current availability, inclusions, and a written quote.</p>
          </div>
          <Link href="/contact-us" className="inline-flex w-fit items-center rounded-full bg-[#0b0b0b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800">Plan an international trip</Link>
        </div>
      </section>
    </PageShell>
  );
}