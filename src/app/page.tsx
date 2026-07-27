// Use native <img> on homepage to avoid Next.js image optimizer proxy
import Link from "next/link";
import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import TestimonialsCarousel from "@/components/testimonials-carousel";
import { featuredTourCards } from "@/lib/data/featured-tour-cards";
import { absoluteUrl, destinations } from "@/lib/site";

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
    Hunza: "/tours/northern-tours/hunza-valley-tour-packages",
    Skardu: "/tours/northern-tours/skardu-valley-tour-packages",
    Naran: "/tours/northern-tours/naran-valley-tour-packages",
    Swat: "/tours/northern-tours/swat-valley-tour-packages",
  };

  const serviceHighlights = [
    {
      title: "Curated Itineraries",
      description: "Thoughtfully paced routes designed for comfort, scenery, and memorable travel flow.",
      icon: "/images/icons/travel-icon.png",
      stat: "3000+ Travellers",
    },
    {
      title: "Private Comfort",
      description: "Dedicated transport and selective stay options tailored to your travel style.",
      icon: "/images/icons/comfort.jpg",
      stat: "98% Satisfaction",
    },
    {
      title: "Local Expertise",
      description: "Ground insights, route knowledge, and practical planning support across Pakistan.",
      icon: "/images/icons/local-expertise.png",
      stat: "24/7 Support",
    },
    {
      title: "Seamless Support",
      description: "Responsive travel guidance before departure and throughout your journey.",
      icon: "/images/icons/support.jpg",
      stat: "10+ Years",
    },
  ];

  const showcaseStats = [
    { label: "3000+", caption: "Happy Travellers" },
    { label: "120+", caption: "Tours Completed" },
    { label: "98%", caption: "Satisfaction" },
  ];

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

  const heroImage = "/hero-images/fairy-meadows.jpeg";
  const packageCards = featuredTourCards.map((tour) => {
    const [firstPart, rest] = tour.title.split(/,\s+(.+)/);

    return {
      titleParts: rest ? [firstPart + ",", rest] : [tour.title],
      name: tour.title,
      image: tour.homeImage,
      href: `/tours/featured/${tour.slug}`,
      duration: tour.duration,
      priceFrom: tour.priceFrom ?? "From PKR 0",
      summary: tour.summary,
    };
  });

  return (
    <PageShell>
      <section className="-mx-6 -mt-24 -ml-[max(0px,calc((100vw-100%)/2))] -mr-[max(0px,calc((100vw-100%)/2))] overflow-hidden lg:-mx-8 lg:-ml-[max(0px,calc((100vw-100%)/2))] lg:-mr-[max(0px,calc((100vw-100%)/2))]">
        <div className="relative min-h-[82vh] border-b border-stone-200">
          <video
            src="/hero-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            controls={false}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ display: 'block' }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,24,28,0.35)_0%,rgba(18,24,28,0.6)_100%)]" />

          <div className="relative z-10 flex min-h-[82vh] w-full items-end px-6 pb-16 pt-36 lg:px-8">
            <div className="max-w-4xl text-white">
              <h1 className="font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                Experience Pakistan&apos;s Most Cinematic Journeys Unforgettably Curated.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
                Discover cinematic landscapes, refined itineraries, and premium travel planning inspired by
                contemporary European hospitality standards.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/make-my-trip"
                  className="inline-flex items-center rounded-[12px] border border-[#ffc000] bg-gradient-to-r from-[#ffd14b] via-[#ffc000] to-[#f4b700] px-8 py-3.5 text-sm font-semibold !text-[#0b0b0b] shadow-[0_14px_35px_rgba(255,192,0,0.22)] transition duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(255,192,0,0.28)] hover:from-[#ffe45b] hover:via-[#ffd24d] hover:to-[#f8b700]"
                >
                  Plan My Journey
                </Link>
                <Link
                  href="/destinations"
                  className="inline-flex items-center rounded-[12px] border border-white/65 bg-gradient-to-r from-black/95 via-[#111111] to-[#1b1b1b] px-8 py-3.5 text-sm font-semibold text-white backdrop-blur transition duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.22)] hover:from-[#151515] hover:via-[#1a1a1a] hover:to-[#252525]"
                >
                  Explore Destinations
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="mt-[6rem] space-y-8 w-full overflow-hidden bg-[#fbf8f2]">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-10">
          <div className="absolute left-[-3rem] top-10 h-72 w-72 rounded-full bg-[#f4ddb2] blur-3xl" />
          <div className="absolute right-0 top-36 h-56 w-56 rounded-full bg-[#e9dec8] blur-3xl" />
        </div>
        <div className="px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
              <p className="text-xs uppercase tracking-[0.32em] font-bold text-black">Destinations</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
                <span className="text-black">Discover Pakistan&apos;s</span>{' '}
                <span className="text-[#fcc000]">Most Loved Escapes</span>
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
                Scenic valleys, alpine lakes, and heritage routes curated for smooth, memorable journeys.
              </p>
            </div>
          <Link href="/destinations" className="text-sm font-medium text-[#0b0b0b] transition hover:text-[#ffc000]">
            View all destinations
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {destinations.slice(0, 4).map((destination) => (
            <Link
              href={destinationPackageLinks[destination.name] ?? "/destinations"}
              key={destination.name}
              className="group flex h-[40rem] flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.14)] transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(15,23,42,0.18)]"
            >
              <div className="relative h-[28rem] overflow-hidden bg-stone-100">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-2 text-xs uppercase tracking-[0.24em] text-white">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[#fcc000] stroke-current" strokeWidth="1.8">
                    <path d="M12 21s8-4.438 8-10a8 8 0 1 0-16 0c0 5.562 8 10 8 10Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Destination</span>
                </div>
                <div className="absolute right-5 top-5 rounded-full bg-black/55 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white">
                  {destination.duration}
                </div>
                <div className="absolute left-5 bottom-6 right-5">
                  <h3 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl line-clamp-2" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {destination.name}
                  </h3>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between gap-4 p-6">
                <div>
                  <p className="text-sm leading-6 text-stone-600" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {destination.description}
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="inline-flex items-center rounded-full bg-[#111111] px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_12px_28px_rgba(0,0,0,0.16)]">
                    {destination.priceFrom}
                  </span>
                  <span className="inline-flex items-center justify-center rounded-full bg-[#fcc000] px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#0b0b0b] shadow-[0_10px_24px_rgba(255,192,0,0.18)]">
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          ))}
          </div>
        </div>
      </section>

      <section className="mt-[6rem] overflow-hidden rounded-[2rem] bg-[#fffdfa] shadow-[0_20px_45px_rgba(15,23,42,0.06)] w-full relative">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-10">
          <div className="absolute left-8 top-8 h-60 w-60 rounded-full bg-[#f6e2c3] blur-3xl" />
          <div className="absolute right-8 bottom-8 h-48 w-48 rounded-full bg-[#ece2d4] blur-3xl" />
        </div>
        <div className="px-6 py-5 lg:px-8 md:py-7">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] font-bold text-black">Featured Tours</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
                <span className="text-black">Signature Tour Packages,</span>{' '}
                <span className="text-[#fcc000]">Crafted for Comfort</span>
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
                Compare top routes at a glance and jump directly into the package that matches your travel style.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-[2rem] bg-[#f7f3eb] shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
              <img
                src={heroImage}
                alt="Featured tour preview"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute left-6 bottom-6 right-6 rounded-3xl border border-white/20 bg-black/25 p-6 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.32em] text-white/80">Curated journeys</p>
                <h3 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  Discover premium mountain routes with cinematic pace.
                </h3>
                <Link
                  href="/tours"
                  className="mt-6 inline-flex items-center rounded-full bg-[#fcc000] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0b0b0b] shadow-[0_10px_24px_rgba(255,192,0,0.18)] transition duration-200 ease-in-out hover:-translate-y-0.5"
                >
                  Explore tours
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {packageCards.map((tour) => (
              <Link
                key={tour.name}
                href={tour.href}
                className="group flex h-[40rem] flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.14)] transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(15,23,42,0.18)]"
              >
                <div className="relative h-[28rem] overflow-hidden bg-stone-100">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    sizes="(max-width: 1280px) 50vw, 25vw"
                    className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-2 text-xs uppercase tracking-[0.22em] text-white">
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[#fcc000] stroke-current" strokeWidth="1.8">
                      <path d="M12 21s8-4.438 8-10a8 8 0 1 0-16 0c0 5.562 8 10 8 10Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {tour.duration}
                  </div>
                  <div className="absolute right-5 top-5 rounded-full bg-[#fcc000] px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0b0b0b] shadow-[0_10px_24px_rgba(255,192,0,0.16)]">
                    {tour.priceFrom}
                  </div>
                  <div className="absolute left-5 bottom-6 right-5">
                    <h3 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl line-clamp-2" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {tour.titleParts.length > 1 ? (
                        <>
                          <span className="block">{tour.titleParts[0]}</span>
                          <span className="block">{tour.titleParts[1]}</span>
                        </>
                      ) : (
                        tour.name
                      )}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between gap-4 p-6">
                  <p className="text-sm leading-6 text-stone-600" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {tour.summary}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[0_12px_28px_rgba(0,0,0,0.16)]">
                      <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 text-[#fcc000] stroke-current" strokeWidth="1.8">
                        <path d="M12 21s8-4.438 8-10a8 8 0 1 0-16 0c0 5.562 8 10 8 10Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      Premium route
                    </span>
                    <span className="inline-flex items-center justify-center rounded-full bg-[#fcc000] px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#0b0b0b] shadow-[0_10px_24px_rgba(255,192,0,0.16)]">
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-[6rem] min-h-[34rem] relative overflow-hidden bg-[#111111]">
        <div className="absolute inset-0 opacity-80 overflow-hidden">
          <img
            src="/hero-images/gilgit.jpeg"
            alt="Cinematic travel scene"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: 'center center' }}
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-20 text-center lg:px-8">
          <p className="text-xs uppercase tracking-[0.32em] font-bold text-white/75">A journey that lingers</p>
          <h2 className="mt-4 text-4xl font-serif leading-tight text-white sm:text-5xl">
            Travel with depth, calm, and a sense of true discovery.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
            A single cinematic moment can shape the feeling of an entire itinerary. Explore routes crafted to feel effortless and unforgettable.
          </p>
          <Link
            href="/make-my-trip"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-[#fcc000] px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#0b0b0b] shadow-[0_14px_40px_rgba(255,192,0,0.2)] transition duration-200 ease-in-out hover:-translate-y-0.5"
          >
            Plan My Journey
          </Link>
        </div>
      </section>

      <section className="mt-[6rem] w-full overflow-hidden bg-[#f9f9f8]">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-10">
          <div className="absolute left-6 top-10 h-56 w-56 rounded-full bg-[#e8e2d8] blur-3xl" />
          <div className="absolute right-8 bottom-10 h-48 w-48 rounded-full bg-[#e7dcbf] blur-3xl" />
        </div>
        <div className="px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.32em] font-bold text-black">Why Choose Us</p>
            <h2 className="mt-3 font-serif text-4xl">
              <span className="text-black">Trustworthy planning</span>{' '}
              <span className="text-[#fcc000]">with premium restraint.</span>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {serviceHighlights.map((item) => (
            <article key={item.title} className="group overflow-hidden rounded-[2rem] border border-[#ece2d0] bg-white/95 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.09)] transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_28px_65px_rgba(15,23,42,0.16)]">
              <div className="relative overflow-hidden rounded-[2rem] bg-[#fff8e6] p-6 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,rgba(255,208,70,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(17,17,17,0.06),transparent_30%)] before:opacity-80">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#fff5d2] via-[#fff0b5] to-[#fff7e2] shadow-[0_10px_25px_rgba(255,198,0,0.18)]">
                  <img src={item.icon} alt={item.title} width={40} height={40} className="h-10 w-10 object-contain" />
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-[#9c7a00]">{item.stat}</p>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight text-black">{item.title}</h3>
                </div>
                <p className="text-sm leading-7 text-stone-600">{item.description}</p>
              </div>
            </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-[6rem] overflow-hidden rounded-[2rem] bg-[#f7f6f4] shadow-[0_20px_45px_rgba(15,23,42,0.06)] w-full relative">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-10">
          <div className="absolute left-6 top-8 h-48 w-48 rounded-full bg-[#f4e1ad] blur-3xl" />
          <div className="absolute right-8 bottom-12 h-64 w-64 rounded-full bg-[#1a1a1a] opacity-10 blur-3xl" />
        </div>
        <div className="relative overflow-hidden rounded-[2rem] bg-[#111111] px-6 py-16 text-white sm:px-10 lg:px-16">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/hero-images/kamran-ch-unsplash.jpg"
              alt="Cinematic journey background"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: 'center bottom' }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_45%),linear-gradient(180deg,rgba(0,0,0,0.28),rgba(0,0,0,0.72))]" />
          </div>
          <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#f7e4a3]">Cinematic Journeys</p>
            <h2 className="max-w-3xl text-4xl font-serif leading-tight text-white sm:text-5xl">
              Every route becomes a moving story — made for people who travel with heart.
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
              A full-width showcase of the places, moments, and quiet details that turn your trip into a memory.
            </p>
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
              {showcaseStats.map((stat) => (
                <div key={stat.label} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl transition duration-300 hover:-translate-y-1">
                  <p className="text-4xl font-semibold uppercase tracking-[0.12em] text-white">{stat.label}</p>
                  <p className="mt-3 text-sm uppercase tracking-[0.26em] text-[#f8e7b9]">
                    {stat.caption}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="/make-my-trip"
              className="inline-flex items-center justify-center rounded-full bg-[#fcc000] px-10 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#0b0b0b] shadow-[0_16px_40px_rgba(255,192,0,0.2)] transition duration-200 ease-in-out hover:-translate-y-0.5"
            >
              Start Your Journey
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-[6rem] overflow-hidden rounded-[2rem] bg-[#f7f6f4] shadow-[0_20px_45px_rgba(15,23,42,0.06)] w-full relative">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-10">
          <div className="absolute left-10 top-12 h-52 w-52 rounded-full bg-[#e5dcc8] blur-3xl" />
          <div className="absolute right-10 bottom-12 h-48 w-48 rounded-full bg-[#ede6d0] blur-3xl" />
        </div>
        <div className="px-6 py-8 lg:px-8">
          <p className="text-xs uppercase tracking-[0.32em] font-bold text-black">Testimonials</p>
          <h2 className="mt-3 font-serif text-4xl">
            <span className="text-black">Our clients don&apos;t just like us -</span>{' '}
            <span className="text-[#fcc000]">they rave about us.</span>
          </h2>
          <TestimonialsCarousel testimonials={testimonials} />
        </div>
      </section>

      <section className="mt-[6rem] w-full overflow-hidden bg-[#fbf7f1]">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-10">
          <div className="absolute left-10 top-14 h-60 w-60 rounded-full bg-[#f2e3b8] blur-3xl" />
          <div className="absolute right-10 bottom-14 h-48 w-48 rounded-full bg-[#e9d8b0] blur-3xl" />
        </div>
        <div className="px-6 lg:px-8">
          <h2 className="text-center font-bold text-2xl sm:text-3xl mb-6 text-black">Hodophile Adventures Provide Free <span className="text-[#fcc000]">Travel Kit</span> to Our Customers</h2>
          <div className="mx-auto max-w-7xl rounded-3xl border-4 border-[#fcc000] bg-white overflow-hidden shadow-sm">
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
            <div className="p-8 text-center">
              <h2 className="font-serif text-4xl">Begin Your Next Journey</h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-stone-600">
                Let us craft a destination experience around your style. Share your preferred route, travel month, and group details. We will curate a polished domestic itinerary with premium pacing and memorable scenic moments.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  href="/make-my-trip"
                  className="inline-flex items-center justify-center rounded-[12px] bg-gradient-to-r from-[#111111] via-[#121212] to-[#1f1f1f] px-8 py-3.5 text-sm font-semibold !text-white shadow-[0_14px_35px_rgba(0,0,0,0.22)] transition duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.28)] hover:from-[#151515] hover:via-[#1b1b1b] hover:to-[#292929]"
                >
                  Make My Trip
                </Link>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center rounded-[12px] border border-[#ffc000] bg-gradient-to-r from-[#0b0b0b] via-[#111111] to-[#161616] px-8 py-3.5 text-sm font-semibold !text-[#ffc000] shadow-[0_14px_35px_rgba(255,192,0,0.18)] transition duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(255,192,0,0.26)] hover:from-[#0d0d0d] hover:via-[#111111] hover:to-[#1c1c1c]"
                >
                  Contact Concierge
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <Link
          href="/contact-us"
          className="inline-flex items-center justify-center rounded-[12px] border border-[#ffc000] bg-gradient-to-r from-[#ffd14b] via-[#ffc000] to-[#f4b700] px-7 py-3.5 text-sm font-medium !text-[#0b0b0b] shadow-[0_14px_35px_rgba(255,192,0,0.22)] transition duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(255,192,0,0.28)] hover:from-[#ffe45b] hover:via-[#ffd24d] hover:to-[#f8b700]"
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
          href="https://wa.me/923377777460"
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
