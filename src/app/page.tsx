// Use native <img> on homepage to avoid Next.js image optimizer proxy
import Link from "next/link";
import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { MiqatHighlightSection } from "@/components/miqat-highlight";
import { WhyChooseUs } from "@/components/why-choose-us";
import TestimonialsCarousel from "@/components/testimonials-carousel";
import { companyStats } from "@/lib/data/company-stats";
import { featuredTourCards } from "@/lib/data/featured-tour-cards";
import { absoluteUrl, blogPosts, destinations, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Domestic Tours in Pakistan",
  description:
    "Hodophile Tours and Travels builds domestic Pakistan itineraries for Hunza, Skardu, Murree, Naran Kaghan, and more.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Domestic Tours in Pakistan",
    description:
      "A fast, SEO-friendly travel site for domestic Pakistan trips, package pages, and destination content.",
    url: absoluteUrl("/"),
  },
};

export default function Home() {
  const destinationPackageLinks: Record<string, string> = {
    Hunza: "/destinations/hunza",
    Skardu: "/destinations/skardu",
    Naran: "/destinations/naran",
    Swat: "/destinations/swat",
  };

  const testimonials = [
    {
      quote:
        "This was our First trip with Hodophile. We have really enjoyed at Bhit Khori. Hodophile is really good travel agency for family and friends tours. I was travel with other traveling agencies but I was not satisfied with services. When I tried this travel agency I am really satisfied with Hodophile services. Thanks to Hodophile.",
      name: "Dileep Rathore",
      role: "Satisfied Client",
      image: "/images/testimonials/male-1.png",
    },
    {
      quote:
        "This was our second trip with Hodophile Adventures and it lived up to our very high expectations. Hunza and Kalash, both tours have been excellent. We had an amazing time at Chillam Joshi festival. From initial contact to booking, to superb coordination by the tour organizer.",
      name: "Aiman Zaib",
      role: "Satisfied Client",
      image: "/images/testimonials/female-1.png",
    },
    {
      quote:
        "Every thing was so managed. Breakfast and lunch was too delicious and on time. The most important thing there environment was so clean and all the families there were so decent. We enjoyed a lot without fear. If you want to go on a trip with your family, I definitely suggest Hodophile Adventures.",
      name: "Fariha",
      role: "Satisfied Client",
      image: "/images/testimonials/female-2.png",
    },
    {
      quote:
        "Amazing trip to Arabian Rocks called Bhit Khori in my life, never before experience like this. I enjoyed the underwater world amazingly. The organizer Hodophile Adventures and their staff like Mr. Akhter Jan behaved extremely well while giving instructions to new people. Really a great life time experience.",
      name: "Rahul Gill",
      role: "Satisfied Client",
      image: "/images/testimonials/male-2.png",
    },
    {
      quote:
        "Our Bhit Khori tour was beautifully arranged and properly timed. The overall coordination and guidance from the team made the journey relaxed and memorable.",
      name: "Bilal Raza",
      role: "Satisfied Client",
      image: "/images/testimonials/male-4.png",
    },
    {
      quote:
        "From planning to execution, this trip felt organized and smooth. The route was excellent and the team remained supportive throughout the whole journey.",
      name: "Saima Noor",
      role: "Satisfied Client",
      image: "/images/testimonials/female-2.png",
    },
    {
      quote:
        "We planned a trip to Gorakh Hill with Hodophile Adventures and it turned out to be an excellent experience. The journey started from Karachi and departed exactly on time. Transport was comfortable, the team was supportive, and the guide remained helpful throughout. Food, accommodation, photography support, bonfire, and camping were all very well organized. Overall, it was a well-planned and unforgettable trip. Highly recommended.",
      name: "Qamar Imam",
      role: "Verified Client Review",
      image: "/images/testimonials/qamar.jpg",
    },
    {
      quote:
        "Assalaam o Alaikum. I had a lovely trip to Ormara with Hodophile Adventures. It was my first solo trip, so I had many questions, and the team answered every query politely and patiently. From safety and punctuality to resort management, night camping, bonfire, and food quality, every detail was managed beautifully. This trip will stay in our memories for life, and we will definitely join again.",
      name: "Nusrat Waqar",
      role: "Verified Client Review",
      image: "/images/testimonials/nusrat.jpg",
    },
    {
      quote:
        "Rating: 5/5. Our Skardu trip with Hodophile Adventure was truly once-in-a-lifetime. From initial communication to on-ground execution, everything was professional and well managed. Guides were knowledgeable about local culture and geography, adventure activities were exciting and safe, accommodations were comfortable, and the itinerary balanced exploration with relaxation perfectly. I wholeheartedly recommend them for Skardu adventures.",
      name: "SamMamah Zubair",
      role: "Verified Client Review",
      image: "/images/testimonials/samama.jpg",
    },
    {
      quote:
        "I recently went on a 3-day trip to Quetta and Ziarat with Hodophile Adventures and it was an absolute success. The team ensured a seamless and enjoyable experience from start to finish. Accommodations were top-notch, the itinerary was thoughtful, and Mr. Akhter Jan made the journey even more special with his knowledge and passion. I highly recommend Hodophile Adventures and give them a 5-star rating for excellent service.",
      name: "Imran Ahmed",
      role: "Verified Client Review",
      image: "/images/testimonials/imran.jpg",
    },
  ];

  const packageCards = featuredTourCards.map((tour) => {
    const [firstPart, rest] = tour.title.split(/,\s+(.+)/);

    return {
      titleParts: rest ? [firstPart + ",", rest] : [tour.title],
      name: tour.title,
      image: tour.homeImage,
      href: `/tours/featured/${tour.slug}`,
      duration: tour.duration,
      priceFrom: tour.priceFrom,
      summary: tour.summary,
    };
  });

  return (
    <PageShell wide>
      <section className="relative left-1/2 -mt-24 w-screen -translate-x-1/2 overflow-hidden bg-[#101010] text-white">
        <div className="relative min-h-[88vh]">
          <video
            poster="/hero-images/hunza.avif"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            controls={false}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ display: 'block' }}
          >
            <source src="/hero-video.webm" type="video/webm" />
            <source src="/hero-video-opt.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,24,28,0.35)_0%,rgba(18,24,28,0.6)_100%)]" />

          <div className="relative z-10 flex min-h-[88vh] w-full items-end px-6 pb-14 pt-40 lg:px-16 lg:pb-20">
            <div className="max-w-5xl text-white">
              <p className="eyebrow">Hodophile Adventures · Pakistan</p>
              <h1 className="display-serif mt-5 max-w-4xl text-6xl font-normal leading-[0.95] sm:text-7xl lg:text-[7.8rem]">
                Travel Pakistan.<br />
                <span className="text-[#fcc000]">Beautifully planned.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
                Premium private tours, curated group journeys, and thoughtfully arranged experiences across Pakistan.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/tours"
                  className="inline-flex items-center rounded-full border border-[#ffc000] bg-[#ffc000] px-6 py-3 text-sm font-semibold !text-[#0b0b0b] shadow-[0_10px_22px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5 hover:bg-[#ffd24d]"
                >
                  Explore tours <span aria-hidden="true">↗</span>
                </Link>
                <Link
                  href="/make-my-trip"
                  className="inline-flex items-center rounded-full border border-white/65 bg-black/45 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-black/60"
                >
                  Plan my trip <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section aria-label="Hodophile at a glance" className="mt-8 border-y border-stone-300/70 bg-white/60 px-5 py-5 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {companyStats.slice(1, 5).map((stat) => (
            <div key={stat.key} className="flex items-baseline gap-3 border-stone-200 sm:border-r sm:last:border-r-0 lg:justify-center">
              <strong className="text-2xl font-semibold text-stone-950">{stat.value}</strong>
              <span className="text-xs uppercase tracking-[0.18em] text-stone-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="relative mt-24 w-full overflow-hidden border-y border-stone-300/70 py-16 lg:py-24">
        <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-20">
          <div className="relative min-w-0 h-[26rem] overflow-hidden sm:h-[34rem]">
            <img
              src="/images/editorial/editorial-8.jpg"
              alt="A quiet mountain landscape in Pakistan"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
            <p className="absolute bottom-5 left-5 text-xs uppercase tracking-[0.28em] text-white/80">Pakistan · In between places</p>
          </div>
          <div className="min-w-0 max-w-2xl">
            <p className="eyebrow text-stone-600">A reason to go</p>
            <h2 className="display-serif mt-5 text-5xl font-normal leading-[0.98] text-stone-950 sm:text-6xl lg:text-7xl">
              The best journeys stay with you.
            </h2>
            <p className="mt-8 text-lg leading-[1.85] text-stone-700 sm:text-xl">
              Pakistan is not a checklist of places. It is the tea poured by a roadside, the sudden silence above the tree line, the long conversation with someone you met five minutes ago.
            </p>
            <p className="mt-5 max-w-xl text-sm leading-7 text-stone-600">
              We plan the route around those moments. The right pace, the right people, the right amount of room for the unexpected. Because a memorable trip is felt long after the photographs are put away.
            </p>
            <Link href="/about-us" className="mt-9 inline-flex border-b border-stone-900/40 pb-3 text-sm font-semibold uppercase tracking-[0.25em] text-stone-950 transition hover:border-[#b58900] hover:text-[#b58900]">
              Our way of travelling ↗
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-20 w-full">
        <div>
          <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
              <p className="eyebrow text-stone-600">The collection</p>
              <h2 className="display-serif mt-3 text-5xl font-normal leading-tight sm:text-6xl">
                <span className="text-black">The country,</span>{' '}
                <span className="text-[#b58900]">beautifully unfiltered.</span>
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
                Scenic valleys, alpine lakes, and heritage routes curated for smooth, memorable journeys.
              </p>
            </div>
          <Link href="/destinations" className="text-sm font-bold uppercase tracking-[0.16em] text-stone-900 transition hover:text-[#b58900]">
            View all destinations ↗
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {destinations.slice(0, 4).map((destination) => (
            <Link
              href={destinationPackageLinks[destination.name] ?? "/destinations"}
              key={destination.name}
              className="group relative overflow-hidden bg-[#171717] transition hover:-translate-y-1"
            >
                <div className="relative h-[30rem] overflow-hidden">
                {destination.name === "Naran" || destination.name === "Swat" ? (
                  <img
                    src={destination.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl"
                  />
                ) : null}
                <img
                  src={destination.image}
                  alt={destination.name}
                  loading="lazy"
                  decoding="async"
                  className={`absolute inset-0 h-full w-full transition duration-700 group-hover:scale-105 ${destination.name === "Naran" || destination.name === "Swat" ? "object-contain" : "object-cover"}`}
                />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.24em] text-[#fcc000]">{destination.season}</p>
                      <h3 className="display-serif mt-2 text-4xl font-normal leading-none">{destination.name}</h3>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">{destination.duration}</span>
                  </div>
                  <p className="mt-4 max-w-xs text-sm leading-6 text-white/75">{destination.description}</p>
                </div>
              </div>
            </Link>
          ))}
          </div>
        </div>
      </section>

      <section className="mt-24 w-full bg-[#0b0b0b] px-6 py-12 text-white lg:px-10 lg:py-16">
        <div>
          <div>
            <p className="eyebrow">Signature departures</p>
            <h2 className="display-serif mt-3 text-5xl font-normal leading-tight sm:text-6xl">
              Journeys with a point of view.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
              Compare top routes at a glance and jump directly into the package that matches your travel style.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {packageCards.map((tour) => (
              <article key={tour.name} className="noise-surface group flex h-full flex-col overflow-hidden rounded-xl border border-white/70 bg-white/85 text-black shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-md">
                <div className="relative h-[240px] overflow-hidden bg-stone-100">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 1280px) 50vw, 25vw"
                    className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex flex-col justify-between gap-5 flex-1">
                  <div>
                    <div className="flex items-center justify-between gap-3 text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500">
                      <span>{tour.duration}</span>
                      {tour.priceFrom ? <span className="text-[#9a7600]">{tour.priceFrom}</span> : null}
                    </div>
                    <h3 className="mt-4 text-lg font-semibold leading-7 text-black">
                    {tour.titleParts.length > 1 ? (
                      <>
                        <span className="block">{tour.titleParts[0]}</span>
                        <span className="block">{tour.titleParts[1]}</span>
                      </>
                    ) : (
                      tour.name
                    )}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-stone-600">{tour.summary}</p>
                  </div>
                  <Link
                    href={tour.href}
                    className="inline-flex w-full items-center justify-between border-t border-stone-200 pt-4 text-sm font-bold uppercase tracking-[0.14em] !text-black transition hover:text-[#b58900]"
                  >
                    View journey <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <MiqatHighlightSection />

      <WhyChooseUs />

      <section className="mt-24 w-full border-y border-stone-300/70 bg-[#f8f5ef] px-6 py-16 lg:px-10 lg:py-20" aria-labelledby="how-it-works-heading">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow text-stone-600">The planning process</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-5">
            <h2 id="how-it-works-heading" className="display-serif max-w-3xl text-5xl font-normal leading-tight sm:text-6xl">
              A considered journey, from first question to return home.
            </h2>
            <p className="max-w-sm text-sm leading-7 text-stone-600">Simple planning, clear communication, and a real team behind the details.</p>
          </div>

          <ol className="mt-12 grid gap-px overflow-hidden border border-stone-300 bg-stone-300 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ["01", "Tell us where you want to go."],
              ["02", "We design your journey."],
              ["03", "Confirm your booking."],
              ["04", "Travel with our team."],
              ["05", "Come home with memories."],
            ].map(([number, label]) => (
              <li key={number} className="bg-[#f8f5ef] p-5 lg:min-h-40">
                <span className="text-sm font-semibold text-[#9a7600]">{number}</span>
                <p className="mt-8 max-w-[12rem] text-base font-semibold leading-6 text-stone-950">{label}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-24 w-full overflow-hidden bg-[#151515] px-6 py-14 text-white lg:px-10 lg:py-16" aria-labelledby="planner-heading">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="eyebrow">Make My Trip</p>
            <h2 id="planner-heading" className="display-serif mt-3 max-w-3xl text-5xl font-normal leading-tight sm:text-6xl">Your trip. Your way.</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/65">Choose where you want to go, when you want to travel, and how you want to experience it. Our existing planner turns those choices into a tailored quotation.</p>
          </div>
          <Link href="/make-my-trip" className="inline-flex items-center justify-center rounded-full bg-[#fcc000] px-6 py-3 text-sm font-semibold !text-black transition hover:-translate-y-0.5 hover:bg-[#ffd24d]">Build my trip <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="mt-24 w-full overflow-hidden bg-white px-6 py-10 lg:px-10 lg:py-14">
        <div>
          <p className="eyebrow text-stone-600">Real people. Real journeys.</p>
          <h2 className="display-serif mt-3 text-5xl font-normal">
            Good trips become great stories.
          </h2>
          <TestimonialsCarousel testimonials={testimonials.slice(0, 5)} />
        </div>
      </section>

      <section className="mt-24 w-full" aria-labelledby="journal-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-stone-600">From the journal</p>
            <h2 id="journal-heading" className="display-serif mt-3 text-5xl font-normal sm:text-6xl">Travel better, before you leave.</h2>
          </div>
          <Link href="/blogs" className="text-sm font-bold uppercase tracking-[0.16em] text-stone-900 transition hover:text-[#b58900]">Explore journal <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {blogPosts.slice(0, 3).map((post, index) => {
            const destinationImage = destinations[index]?.image ?? "/images/editorial/editorial-2.jpg";
            return (
              <Link key={post.slug} href={`/blogs/${post.slug}`} className="group overflow-hidden border border-stone-200 bg-white transition hover:-translate-y-1 hover:border-[#fcc000]/70">
                <div className="relative h-52 overflow-hidden bg-stone-100">
                  <img src={post.hero ?? destinationImage} alt={post.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9a7600]">{post.category}</p>
                  <h3 className="mt-3 text-xl font-semibold leading-7 text-stone-950">{post.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-stone-600">{post.excerpt}</p>
                  <span className="mt-5 inline-flex text-sm font-semibold text-stone-950">Read article <span className="ml-2" aria-hidden="true">↗</span></span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="relative left-1/2 mt-24 w-screen -translate-x-1/2 overflow-hidden bg-[#fcc000] px-6 py-16 lg:px-16">
        <div>
          <div className="mx-auto max-w-5xl overflow-hidden rounded-xl bg-black shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
            <div className="relative bg-black">
            <video
                src="/travel-kit.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                controls={false}
                className="w-full max-h-[26rem] h-auto object-cover block"
                style={{ display: 'block' }}
              />
            </div>
            <div className="p-8 text-center text-white lg:p-12">
              <h2 className="display-serif text-5xl font-normal">Where will you go next?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/65">
                Tell us where you want to go. We&apos;ll help plan the journey.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link href="/make-my-trip" className="inline-flex rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold !text-white transition hover:bg-stone-800">
                  Plan my trip
                </Link>
                <Link href="/contact-us" className="inline-flex rounded-full border border-[#ffc000] bg-[#0b0b0b] px-6 py-3 text-sm font-semibold !text-[#ffc000] shadow-[0_8px_18px_rgba(0,0,0,0.2)] transition hover:bg-black">
                  Talk to an expert
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <Link
          href="/contact-us"
          className="rounded-full border border-[#ffc000] bg-[#ffc000] px-5 py-3 text-sm font-medium !text-[#0b0b0b] shadow-[0_18px_40px_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5 hover:bg-[#ffd24d]"
        >
          Contact us
        </Link>
        <a
          href="https://www.messenger.com/t/hodophileadventure"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on Messenger"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#006AFF] text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
            <path d="M12 2C6.5 2 2 6.1 2 11.2c0 2.9 1.5 5.6 3.9 7.3V22l3.4-1.9c.9.3 1.9.5 2.9.5 5.5 0 10-4.1 10-9.2S17.5 2 12 2Zm1 11.6-2.6-2.8-5 2.8 5.5-5.8 2.7 2.8 4.9-2.8-5.5 5.8Z" />
          </svg>
        </a>
        <a
          href={whatsappUrl("Hi Hodophile, I would like to plan a trip across Pakistan.")}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1f6b4a] text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-[1.8]">
            <path d="M20.1 11.9a8 8 0 0 1-11.4 7L4 20l1.2-4.2A8 8 0 1 1 20.1 12Z" />
            <path d="M8.7 9.7c.2-.5.4-.5.8-.5h.5c.2 0 .4 0 .6.4l.8 1.9c.1.3.1.5 0 .7l-.5.6c-.1.2-.2.4 0 .7a9.2 9.2 0 0 0 1.9 1.9c.3.2.5.1.7 0l.6-.5c.2-.1.4-.1.7 0l1.9.8c.4.2.4.4.4.6v.5c0 .4 0 .6-.5.8-.6.2-1.4.5-3.3-.2-2.4-.9-5.1-3.5-5.9-5.9-.7-1.9-.4-2.7-.2-3.3Z" />
          </svg>
        </a>
      </div>
    </PageShell>
  );
}
