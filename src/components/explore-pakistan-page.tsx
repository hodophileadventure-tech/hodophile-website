import Image from "next/image";
import Link from "next/link";

const destinationTiles = [
  {
    name: "Hunza",
    description: "Towering peaks, apricot valleys, and storied mountain roads.",
    image: "/hero-images/kamran-ch-unsplash.webp",
    href: "/destinations/hunza",
    span: "md:col-span-7",
    height: "min-h-[26rem]",
    accent: "A timeless mountain escape",
  },
  {
    name: "Skardu",
    description: "Lakes, forts, and dramatic glacial scenery in Baltistan.",
    image: "/hero-images/obaid-awan-unsplash.jpg.webp",
    href: "/destinations/skardu",
    span: "md:col-span-5",
    height: "min-h-[22rem]",
    accent: "High-altitude wonder",
  },
  {
    name: "Fairy Meadows",
    description: "Remote alpine meadows framed by iconic mountain views.",
    image: "/hero-images/hussain-ahmed-unsplash.webp",
    href: "/destinations/fairy-meadows",
    span: "md:col-span-5",
    height: "min-h-[20rem]",
    accent: "A quiet, cinematic stay",
  },
  {
    name: "Kashmir",
    description: "Soft valleys, heritage, and slow days designed for couples and families.",
    image: "/hero-images/zain-raza-unsplash.webp",
    href: "/destinations/kashmir",
    span: "md:col-span-7",
    height: "min-h-[22rem]",
    accent: "Gentle landscapes and warm hospitality",
  },
  {
    name: "Swat & Kalam",
    description: "Green valleys, pine-lined routes, and restorative mountain air.",
    image: "/hero-images/hussain-ahmed-unsplash.webp",
    href: "/destinations/swat",
    span: "md:col-span-6",
    height: "min-h-[21rem]",
    accent: "A peaceful northern rhythm",
  },
  {
    name: "Deosai & Gilgit",
    description: "Plateaus, glacier roads, and unforgettable high-country journeys.",
    image: "/hero-images/kamran-ch-unsplash.webp",
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
    image: "/hero-images/kamran-ch-unsplash.webp",
  },
  {
    title: "Adventure & Trekking",
    description: "Go beyond the usual routes and experience Pakistan on foot.",
    image: "/hero-images/obaid-awan-unsplash.jpg.webp",
  },
  {
    title: "Cultural Journeys",
    description: "Discover centuries of history, traditions and living heritage.",
    image: "/hero-images/zain-raza-unsplash.webp",
  },
  {
    title: "Luxury Escapes",
    description: "Thoughtfully planned journeys with comfort, privacy and exceptional service.",
    image: "/hero-images/hussain-ahmed-unsplash.webp",
  },
  {
    title: "Private Journeys",
    description: "Your dates. Your pace. Your route.",
    image: "/hero-images/kamran-ch-unsplash.webp",
  },
  {
    title: "Honeymoon & Romantic Escapes",
    description: "Private moments in some of Pakistan’s most breathtaking destinations.",
    image: "/hero-images/obaid-awan-unsplash.jpg.webp",
  },
];

const journeyCards = [
  {
    duration: "9 Days",
    nights: "8 Nights",
    route: "Kashmir, Arangkel & Taobat",
    description: "A standard group tour from Karakorum through Islamabad into Kashmir, Taobat, and Arangkel.",
    href: "/tours",
    image: "/hero-images/zain-raza-unsplash.webp",
    price: "From PKR 37,500",
  },
  {
    duration: "10 Days",
    nights: "7 Nights",
    route: "Skardu, Shigar & Shangrila",
    description: "A rugged Skardu route with Shangrila, Shigar Fort, Sarfaranga Cold Desert, and Deosai.",
    href: "/tours",
    image: "/hero-images/obaid-awan-unsplash.jpg.webp",
    price: "From PKR 39,000",
  },
  {
    duration: "12 Days",
    nights: "11 Nights",
    route: "Naran, Hunza, Skardu",
    description: "Naran, Hunza, Skardu, and Deosai combined into a bold northern journey.",
    href: "/tours",
    image: "/hero-images/kamran-ch-unsplash.webp",
    price: "From PKR 46,700",
  },
  {
    duration: "10 Days",
    nights: "9 Nights",
    route: "Naran, Hunza & Naltar",
    description: "A refreshing northern route with Naran Valley, Hunza heritage, and alpine Naltar lakes.",
    href: "/tours",
    image: "/hero-images/hussain-ahmed-unsplash.webp",
    price: "From PKR 39,000",
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
            src="/hero-images/kamran-ch-unsplash.webp"
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
                src="/hero-images/zain-raza-unsplash.webp"
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
                    src={tile.name === "Hunza" ? "/hero-images/kamran-ch-unsplash.webp" : tile.image}
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

      <section className="px-4 py-6 sm:px-6 lg:px-10 xl:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow !text-stone-600">Curated Journeys</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-stone-950 sm:text-4xl">Journeys Worth Taking</h2>
            </div>
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-4 lg:grid-cols-2">
            {journeyCards.map((journey) => (
              <article
                key={journey.route}
                className="group overflow-hidden rounded-[1.75rem] border border-stone-200 bg-[#f3f0eb] shadow-[0_18px_55px_rgba(15,23,42,0.04)]"
              >
                <div className="relative h-[270px] overflow-hidden">
                  <Image
                    src={journey.route.includes("Skardu") ? "/hero-images/zain-raza-unsplash.webp" : journey.route.includes("Naran") ? "/hero-images/Naran.webp" : "/hero-images/kamran-ch-unsplash.webp"}
                    alt={`${journey.route} in Pakistan`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex h-[calc(100%-270px)] flex-col justify-between p-4 sm:p-5">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500">
                      <span>{journey.duration} / {journey.nights}</span>
                      <span className="text-[#9a7600]">{journey.price}</span>
                    </div>
                    <h3 className="mt-4 text-[2rem] font-semibold leading-[1.05] tracking-[-0.06em] text-stone-950">
                      {journey.route}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-stone-600">{journey.description}</p>
                  </div>

                  <div className="mt-5">
                    <Link
                      href={journey.href}
                      className="inline-flex items-center rounded-full bg-[#fcc000] px-4 py-3 text-sm font-semibold text-stone-900 transition duration-300 hover:-translate-y-0.5 hover:bg-[#ffd24d]"
                    >
                      Contact us
                    </Link>
                  </div>
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
                src="/hero-images/obaid-awan-unsplash.jpg.webp"
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
              src="/hero-images/hussain-ahmed-unsplash.webp"
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
