import Image from "next/image";
import Link from "next/link";

import { whatsappUrl } from "@/lib/site";

const destinationTiles = [
  {
    name: "Hunza",
    description: "Towering peaks, apricot valleys, and storied mountain roads.",
    image: "/images/package-cards/hero-images__kamran-ch-unsplash.webp",
    href: "/destinations/hunza",
    span: "md:col-span-7",
    height: "min-h-[26rem]",
    accent: "A timeless mountain escape",
  },
  {
    name: "Skardu",
    description: "Lakes, forts, and dramatic glacial scenery in Baltistan.",
    image: "/images/package-cards/hero-images__obaid-awan-unsplash.jpg.webp",
    href: "/destinations/skardu",
    span: "md:col-span-5",
    height: "min-h-[22rem]",
    accent: "High-altitude wonder",
  },
  {
    name: "Fairy Meadows",
    description: "Remote alpine meadows framed by iconic mountain views.",
    image: "/images/package-cards/hero-images__hussain-ahmed-unsplash.webp",
    href: "/destinations/fairy-meadows",
    span: "md:col-span-5",
    height: "min-h-[20rem]",
    accent: "A quiet, cinematic stay",
  },
  {
    name: "Kashmir",
    description: "Soft valleys, heritage, and slow days designed for couples and families.",
    image: "/images/package-cards/hero-images__zain-raza-unsplash.webp",
    href: "/destinations/kashmir",
    span: "md:col-span-7",
    height: "min-h-[22rem]",
    accent: "Gentle landscapes and warm hospitality",
  },
  {
    name: "Swat & Kalam",
    description: "Green valleys, pine-lined routes, and restorative mountain air.",
    image: "/images/package-cards/hero-images__hussain-ahmed-unsplash.webp",
    href: "/destinations/swat",
    span: "md:col-span-6",
    height: "min-h-[21rem]",
    accent: "A peaceful northern rhythm",
  },
  {
    name: "Deosai & Gilgit",
    description: "Plateaus, glacier roads, and unforgettable high-country journeys.",
    image: "/images/package-cards/hero-images__kamran-ch-unsplash.webp",
    href: "/destinations",
    span: "md:col-span-6",
    height: "min-h-[21rem]",
    accent: "For the route-seekers",
  },
];

const experienceCards = [
  {
    title: "Mountain Escapes",
    description: "Wake up surrounded by some of the world’s most dramatic landscapes.",
    image: "/images/package-cards/hero-images__kamran-ch-unsplash.webp",
  },
  {
    title: "Adventure & Trekking",
    description: "Go beyond the usual routes and experience Pakistan on foot.",
    image: "/images/package-cards/hero-images__obaid-awan-unsplash.jpg.webp",
  },
  {
    title: "Cultural Journeys",
    description: "Discover centuries of history, traditions and living heritage.",
    image: "/images/package-cards/hero-images__zain-raza-unsplash.webp",
  },
  {
    title: "Luxury Escapes",
    description: "Thoughtfully planned journeys with comfort, privacy and exceptional service.",
    image: "/images/package-cards/hero-images__hussain-ahmed-unsplash.webp",
  },
  {
    title: "Private Journeys",
    description: "Your dates. Your pace. Your route.",
    image: "/images/package-cards/hero-images__kamran-ch-unsplash.webp",
  },
  {
    title: "Honeymoon & Romantic Escapes",
    description: "Private moments in some of Pakistan’s most breathtaking destinations.",
    image: "/images/package-cards/hero-images__obaid-awan-unsplash.jpg.webp",
  },
];

const journeyCards = [
  {
    duration: "8 days",
    route: "Hunza & Skardu",
    description: "An eight-day northern Pakistan journey bringing Hunza and Skardu together.",
    image: "/images/pakistan-journeys/hunza-skardu.png",
  },
  {
    duration: "6 days",
    route: "Skardu & Basho",
    description: "A six-day escape pairing Skardu with the mountain scenery of Basho.",
    image: "/images/pakistan-journeys/skardu-basho.png",
  },
  {
    duration: "6 days",
    route: "Skardu & Khaplu",
    description: "Discover Skardu and Khaplu together on a six-day Baltistan journey.",
    image: "/images/pakistan-journeys/skardu-khaplu.png",
  },
  {
    duration: "7 days",
    route: "Kashmir & Shogran",
    description: "A seven-day mountain getaway combining Kashmir and Shogran.",
    image: "/images/pakistan-journeys/kashmir-shogran.png",
  },
  {
    duration: "7 days",
    route: "Kashmir & Swat",
    description: "A seven-day journey connecting the valleys of Kashmir and Swat.",
    image: "/images/pakistan-journeys/kashmir-swat.png",
  },
  {
    duration: "6 days",
    route: "Swat & Shogran",
    description: "A six-day northern escape across Swat and Shogran.",
    image: "/images/pakistan-journeys/swat-shogran.png",
  },
  {
    duration: "3 days",
    route: "Swat, Kalam & Malam Jabba",
    description: "A three-day short break through Swat, Kalam, and Malam Jabba.",
    image: "/images/pakistan-journeys/swat-kalam-malam-jabba.png",
  },
  {
    duration: "3 days",
    route: "Kashmir",
    description: "A three-day getaway to enjoy the landscapes and relaxed pace of Kashmir.",
    image: "/images/pakistan-journeys/kashmir.png",
  },
];

const whyPoints = [
  {
    title: "Local Expertise",
    text: "Travel with people who know the roads, regions and communities beyond the guidebooks.",
  },
  {
    title: "Tailor-Made Journeys",
    text: "Your journey can be built around your interests, pace and travel style.",
  },
  {
    title: "Seamless Planning",
    text: "From arrival to departure, we coordinate the details so you can focus on the experience.",
  },
  {
    title: "Professional Support",
    text: "Have a local team available throughout your journey.",
  },
  {
    title: "Authentic Experiences",
    text: "Meet the places and people that make Pakistan unforgettable.",
  },
  {
    title: "Transparent Planning",
    text: "Clear communication and carefully planned itineraries from the beginning.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Tell Us What You Want",
    text: "Share your dates, interests and travel style.",
  },
  {
    number: "02",
    title: "We Design Your Journey",
    text: "Our travel team builds an itinerary around you.",
  },
  {
    number: "03",
    title: "Refine & Confirm",
    text: "Review the details, make adjustments and confirm your trip.",
  },
  {
    number: "04",
    title: "Arrive & Explore",
    text: "From arrival to departure, our local team takes care of the journey.",
  },
];

const faqItems = [
  {
    question: "Can I customize my Pakistan tour?",
    answer:
      "Absolutely. Our private journeys can be tailored around your travel dates, interests, destinations, preferred pace, and travel style. Tell us what you have in mind and our team can help build the itinerary around you.",
  },
  {
    question: "Is Pakistan suitable for first-time visitors?",
    answer:
      "Yes. Pakistan offers a wide range of experiences for first-time visitors, from mountain landscapes and cultural heritage to food, adventure, and local experiences. We can design your journey according to your comfort level and interests.",
  },
  {
    question: "What should international visitors confirm before booking?",
    answer:
      "Visa, entry, and route-permit requirements depend on your nationality, itinerary, and current rules. Confirm them with the relevant official authorities before booking. We can plan the domestic itinerary around your confirmed arrival details; visas and permits are not included unless your written quotation explicitly says so.",
  },
  {
    question: "What destinations can I visit in Pakistan?",
    answer:
      "Depending on your itinerary, you can explore destinations such as Hunza, Skardu, Fairy Meadows, Naltar, Deosai, Swat, Kalam, Kashmir, Chitral, Gilgit and other regions across Pakistan.",
  },
  {
    question: "Do you offer private tours in Pakistan?",
    answer:
      "Yes. Private journeys can be arranged for couples, families, friends, and private groups, allowing you greater flexibility over your itinerary and travel pace.",
  },
  {
    question: "Can you arrange transportation and accommodation?",
    answer:
      "Yes. We can coordinate the key elements of your journey, including transportation and accommodation, according to the itinerary and package you choose.",
  },
  {
    question: "Can I choose my own travel dates?",
    answer:
      "Yes. For customized and private journeys, you can discuss your preferred travel dates with our team and we can plan the itinerary around them.",
  },
  {
    question: "Do you offer tours for couples and honeymooners?",
    answer:
      "Yes. We can create private journeys for couples and honeymooners, combining scenic destinations, comfortable stays and experiences suited to a more romantic trip.",
  },
  {
    question: "Can you arrange a tour for my family or group?",
    answer:
      "Yes. We can plan journeys for families and groups and tailor the itinerary according to the group's interests, size and preferred travel style.",
  },
  {
    question: "How far in advance should I plan my trip to Pakistan?",
    answer:
      "We recommend starting your planning as early as possible, particularly for peak travel periods and more complex private itineraries. This gives us more flexibility when arranging the different elements of your journey.",
  },
  {
    question: "Can I combine multiple destinations in one trip?",
    answer:
      "Yes. Multi-destination journeys can be designed to combine different regions and experiences. For example, you could combine Hunza and Skardu or create a longer journey covering several areas of northern Pakistan.",
  },
  {
    question: "How do I start planning my trip?",
    answer:
      "Simply tell us your approximate dates, number of travelers, destinations or experiences you're interested in, and any preferences you have. Our team can then help shape your journey.",
  },
];

export function ExplorePakistanPageContent() {
  return (
    <div className="space-y-5 pb-10 text-stone-900 sm:space-y-6">
      <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-stone-950">
        <div className="absolute inset-0">
          <Image
            src="/images/package-cards/hero-images__kamran-ch-unsplash.webp"
            alt="Snow-capped mountain valley in Pakistan"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.76)_0%,rgba(8,8,8,0.46)_34%,rgba(8,8,8,0.24)_100%)]" />
        </div>

        <div className="relative mx-auto flex min-h-[82vh] w-full max-w-[1600px] items-end px-4 pb-12 pt-28 sm:px-6 lg:px-10 lg:pb-16 xl:px-14">
          <div className="max-w-4xl text-white">
            <p className="eyebrow">Travel Deeper</p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.26em] text-[#fcc000]">
              Pakistan is the destination. Hodophile is your local expert.
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-none tracking-[-0.06em] sm:text-5xl lg:text-[5.3rem]">
              Discover Pakistan, Your Way.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
              From the peaks of the Karakoram to ancient cultures and unforgettable road journeys,
              discover Pakistan through carefully crafted experiences with local experts.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/make-my-trip"
                className="inline-flex items-center justify-center rounded-full bg-[#fcc000] px-6 py-3 text-sm font-semibold !text-black transition duration-300 hover:-translate-y-0.5 hover:bg-[#ffd24d]"
              >
                Plan Your Journey
              </Link>
              <a
                href="#experiences"
                className="inline-flex items-center justify-center rounded-full border border-white/80 bg-black/20 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.15)] transition duration-300 hover:-translate-y-0.5 hover:bg-black/30"
              >
                Explore Experiences
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-10 xl:px-14">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.06)]">
          <div className="grid items-center gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[360px] overflow-hidden">
              <Image
                src="/images/package-cards/hero-images__zain-raza-unsplash.webp"
                alt="Snowy mountain range in Pakistan"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
            </div>

            <div className="flex h-full flex-col justify-center px-5 py-8 sm:px-8 lg:px-10 xl:px-12">
              <p className="eyebrow !text-stone-600">Pakistan, Reframed</p>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">
                Pakistan is the destination. Hodophile is your local expert.
              </p>
              <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.05em] text-stone-950 sm:text-4xl">
                Pakistan Is More Than a Destination.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-stone-600">
                Explore dramatic mountain landscapes, rich cultural heritage, authentic local experiences,
                remote destinations, diverse food, warm hospitality, and a deep sense of adventure that
                rewards travelers who want more than a checklist of sights.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="destinations" className="px-4 py-6 sm:px-6 lg:px-10 xl:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow !text-stone-600">Destination Discovery</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-stone-950 sm:text-4xl">
                Where Will Pakistan Take You?
              </h2>
            </div>
            <Link href="/destinations" className="text-sm font-semibold text-stone-700 transition hover:text-[#9a7600]">
              See all destinations ↗
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-12">
            {destinationTiles.map((tile) => (
              <article
                key={tile.name}
                className={`group relative overflow-hidden rounded-[2rem] border border-stone-200 bg-stone-900 ${tile.span} ${tile.height}`}
              >
                <div className="absolute inset-0">
                  <Image
                    src={tile.name === "Hunza" ? "/images/package-cards/hero-images__kamran-ch-unsplash.webp" : tile.image}
                    alt={`${tile.name} in Pakistan`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,11,0.14)_0%,rgba(11,11,11,0.62)_100%)]" />
                <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-6">
                  <div className="rounded-[1.1rem] bg-black/20 p-3 backdrop-blur-[2px]">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#fcc000]">{tile.accent}</p>
                    <h3 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white">{tile.name}</h3>
                    <p className="mt-2 max-w-md text-sm leading-6 text-white/80">{tile.description}</p>
                    <div className="mt-5">
                      <Link
                        href={tile.href}
                        className="inline-flex items-center rounded-full border border-[#fcc000] bg-[#fcc000] px-4 py-2 text-sm font-semibold text-black shadow-[0_8px_24px_rgba(252,192,0,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ffd24d]"
                      >
                        Explore
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experiences" className="px-4 py-10 sm:px-6 lg:px-10 xl:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="eyebrow !text-stone-600">Experiences</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-stone-950 sm:text-4xl">Travel For The Experience.</h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {experienceCards.map((card) => (
              <article key={card.title} className="group relative overflow-hidden rounded-[2rem] border border-stone-200 bg-stone-900 min-h-[22rem]">
                <div className="absolute inset-0">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,18,18,0.18)_0%,rgba(17,18,18,0.75)_100%)]" />
                <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-6">
                  <h3 className="text-2xl font-semibold tracking-[-0.05em] text-white">{card.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-white/80">{card.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#0b0b0b] px-5 py-16 text-white sm:px-8 lg:px-14 lg:py-24">
        <div className="pointer-events-none absolute -left-48 top-12 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#FCC000]/[0.07] blur-3xl" />
        <div className="pointer-events-none absolute -right-48 top-[38%] -z-10 h-[38rem] w-[38rem] rounded-full bg-[#b47b12]/[0.09] blur-3xl" />
        <div className="mx-auto max-w-7xl">
          <div className="relative grid gap-8 border-y border-[#FCC000]/25 py-8 sm:py-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16 lg:py-12">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FCC000]/65 to-transparent" />
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-[#FCC000]">
                <span className="h-px w-10 bg-[#FCC000]" />
                Curated Pakistan journeys
                <span className="h-px w-10 bg-[#FCC000]/45" />
              </p>
              <h2 className="mt-5 font-[var(--font-display)] text-5xl leading-[0.98] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl">
                Find your way north.
                <span className="mt-2 block text-[#FCC000]">Make it your own.</span>
              </h2>
            </div>
            <div className="flex items-center justify-between gap-8 lg:max-w-sm lg:justify-end lg:gap-6">
              <p className="max-w-[15rem] text-sm leading-7 text-white/65">
                Eight ways to experience Pakistan, with time to take in every turn.
              </p>
              <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-full border border-[#FCC000]/45 bg-[#FCC000]/[0.06] shadow-[0_0_42px_rgba(252,192,0,0.08)] sm:h-24 sm:w-24">
                <span className="font-[var(--font-display)] text-3xl leading-none text-[#FCC000] sm:text-4xl">08</span>
                <span className="mt-1 text-[0.52rem] font-semibold uppercase tracking-[0.18em] text-white/55">Journeys</span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:mt-10 xl:gap-8">
            {journeyCards.map((journey, index) => (
              <article
                key={journey.route}
                className="group overflow-hidden rounded-[1.25rem] border border-[#d4b34d]/25 bg-[#141414] shadow-[0_22px_60px_rgba(0,0,0,0.2)] transition duration-500 hover:-translate-y-1 hover:border-[#c7a32a] hover:shadow-[0_30px_75px_rgba(0,0,0,0.36)]"
              >
                <div className="relative h-64 overflow-hidden bg-[#161616] sm:h-[19rem]">
                  <Image
                    src={journey.image}
                    alt={`${journey.route} in Pakistan`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition duration-1000 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.3)_0%,transparent_34%,rgba(0,0,0,0.82)_100%)]" />
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-6">
                    <span className="rounded-full border border-white/30 bg-black/30 px-3.5 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                      Pakistan · Private journey
                    </span>
                    <span className="font-[var(--font-display)] text-sm tracking-[0.18em] text-white">
                      {String(index + 1).padStart(2, "0")} <span className="text-[#FCC000]">/ 08</span>
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/75">{journey.duration}</p>
                    <h3 className="mt-2 font-[var(--font-display)] text-3xl leading-[1.02] tracking-[-0.02em] sm:text-4xl">
                      {journey.route}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
                  <p className="max-w-lg text-sm leading-7 text-white/65">{journey.description}</p>
                  <a
                    href={whatsappUrl(`Hi Hodophile, I am interested in the ${journey.route} ${journey.duration} journey in Pakistan. Please share the current itinerary, dates, availability, and quote.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-[#FCC000] px-5 py-3.5 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-[#ffda4d]"
                  >
                    Request this journey
                    <span aria-hidden="true" className="text-base">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-10 xl:px-14">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-stone-200 bg-[#f7f2e8] p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <p className="eyebrow !text-stone-600">Why Hodophile</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-stone-950 sm:text-4xl">
              Travel Pakistan With People Who Know It.
            </h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {whyPoints.map((point, index) => (
              <div key={point.title} className="rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-[0_16px_50px_rgba(15,23,42,0.03)]">
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#fcc000]/20 text-sm font-semibold text-stone-900">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.04em] text-stone-950">{point.title}</h3>
                <p className="mt-3 text-base leading-7 text-stone-600">{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-6 sm:px-6 lg:px-10 xl:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="eyebrow !text-stone-600">How It Works</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-stone-950 sm:text-4xl">Your Journey Starts Here.</h2>
          </div>

          <div className="relative mt-10">
            <div className="absolute left-0 right-0 top-8 hidden h-px bg-stone-300 md:block" />
            <div className="grid gap-6 md:grid-cols-4">
              {processSteps.map((step) => (
                <div key={step.number} className="relative rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.04)]">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#fcc000] text-lg font-semibold text-stone-900">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.04em] text-stone-950">{step.title}</h3>
                  <p className="mt-3 text-base leading-7 text-stone-600">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-10 xl:px-14">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-stone-950 text-white">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[340px] overflow-hidden">
              <Image
                src="/images/package-cards/hero-images__obaid-awan-unsplash.jpg.webp"
                alt="Pakistan mountain route at golden hour"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <p className="eyebrow !text-[#fcc000]">Custom Travel</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                Your Pakistan. Your Way.
              </h2>
              <p className="mt-5 text-base leading-7 text-white/80">
                Have a route in mind? Want to combine mountains, culture, adventure and relaxation? Tell us
                what you’re looking for and we’ll build the journey around you.
              </p>
              <div className="mt-7">
                <Link
                  href="/make-my-trip"
                  className="inline-flex items-center justify-center rounded-full bg-[#fcc000] px-6 py-3 text-sm font-semibold !text-black transition duration-300 hover:-translate-y-0.5 hover:bg-[#ffd24d]"
                >
                  Design My Journey
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="international-visitors" className="px-4 py-10 sm:px-6 lg:px-10 xl:px-14">
        <div className="mx-auto grid max-w-7xl gap-8 border-y border-stone-300 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14 lg:py-14">
          <div>
            <p className="eyebrow !text-stone-600">For international visitors</p>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-[-0.05em] text-stone-950 sm:text-4xl">
              Plan the Pakistan journey around your arrival.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-stone-600">
              Share your arrival city, available days, interests, and confirmed entry arrangements. We can help shape a realistic domestic route with clear travel days and written inclusions.
            </p>
            <Link
              href="/make-my-trip"
              className="mt-7 inline-flex items-center justify-center rounded-full bg-[#fcc000] px-6 py-3 text-sm font-semibold !text-black transition hover:bg-[#ffd24d]"
            >
              Plan an inbound trip
            </Link>
          </div>

          <ol className="grid gap-px border border-stone-300 bg-stone-300 sm:grid-cols-3">
            {[
              ["01", "Share arrival details", "Airport, dates, group size, and trip length."],
              ["02", "Shape the route", "Choose regions and a pace that fits the time available."],
              ["03", "Confirm inclusions", "Review transport, stays, exclusions, and total price in writing."],
            ].map(([number, title, detail]) => (
              <li key={number} className="bg-[#f7f3ea] p-5">
                <span className="text-xs font-bold tracking-[0.2em] text-[#9a7600]">{number}</span>
                <h3 className="mt-5 text-lg font-semibold text-stone-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">{detail}</p>
              </li>
            ))}
          </ol>
          <p className="text-xs leading-6 text-stone-500 lg:col-start-2">
            Entry, visa, and permit requirements change and depend on nationality and route. Confirm them with official authorities; these services are not included unless stated in your written quotation.
          </p>
        </div>
      </section>

      <section className="px-4 py-6 sm:px-6 lg:px-10 xl:px-14">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="eyebrow !text-stone-600">International Travel FAQ</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-stone-950 sm:text-4xl">
              Planning Questions, Answered.
            </h2>
          </div>

          <div className="mt-8 space-y-3">
            {faqItems.map((item) => (
              <details key={item.question} className="group rounded-[1.5rem] border border-stone-200 bg-white p-5 text-left shadow-[0_12px_30px_rgba(15,23,42,0.02)]">
                <summary className="cursor-pointer list-none text-lg font-semibold tracking-[-0.03em] text-stone-900 marker:content-none">
                  <span className="flex items-center justify-between gap-3">
                    <span>{item.question}</span>
                    <span className="text-2xl text-stone-400 transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-4 max-w-3xl text-base leading-7 text-stone-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 pt-8 sm:px-6 lg:px-10 xl:px-14">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-stone-200 bg-stone-900">
          <div className="absolute inset-0">
            <Image
              src="/images/package-cards/hero-images__hussain-ahmed-unsplash.webp"
              alt="Pakistan mountain landscape waiting to be explored"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,15,15,0.74)_0%,rgba(15,15,15,0.46)_30%,rgba(15,15,15,0.28)_100%)]" />
          </div>

          <div className="relative z-10 flex min-h-[26rem] items-center justify-center px-5 py-12 text-center text-white sm:px-8 lg:px-10">
            <div className="max-w-3xl">
              <p className="eyebrow !text-[#fcc000]">Start Your Story</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">Pakistan Is Waiting.</h2>
              <p className="mt-5 text-base leading-7 text-white/80 sm:text-lg">
                Tell us where you want to go. We’ll help you discover the journey in between.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/make-my-trip"
                  className="inline-flex items-center justify-center rounded-full bg-[#fcc000] px-6 py-3 text-sm font-semibold !text-black transition duration-300 hover:-translate-y-0.5 hover:bg-[#ffd24d]"
                >
                  Start Planning
                </Link>
                <Link
                  href="/explore-pakistan"
                  className="inline-flex items-center justify-center rounded-full border border-white/80 bg-black/20 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.15)] transition duration-300 hover:-translate-y-0.5 hover:bg-black/30"
                >
                  Explore Pakistan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
