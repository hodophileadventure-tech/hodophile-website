// Use native <img> on homepage to avoid Next.js image optimizer proxy
import Link from "next/link";
import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import TestimonialsCarousel from "@/components/testimonials-carousel";
import { LazyBackgroundVideo } from "@/components/lazy-background-video";
import { HoverVideoCard } from "@/components/hover-video-card";
import { orderedFeaturedTourCards } from "@/lib/data/featured-tour-cards";
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
    },
    {
      title: "Private Comfort",
      description: "Dedicated transport and selective stay options tailored to your travel style.",
      icon: "/images/icons/comfort.jpg",
    },
    {
      title: "Local Expertise",
      description: "Ground insights, route knowledge, and practical planning support across Pakistan.",
      icon: "/images/icons/local-expertise.png",
    },
    {
      title: "Seamless Support",
      description: "Responsive travel guidance before departure and throughout your journey.",
      icon: "/images/icons/support.jpg",
    },
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

  const heroImage = destinations[0]?.image ?? "/images/destinations/hunza.avif";
  const packageCards = orderedFeaturedTourCards.map((tour) => {
    const [firstPart, rest] = tour.title.split(/,\s+(.+)/);

    return {
      titleParts: rest ? [firstPart + ",", rest] : [tour.title],
      name: tour.title,
      image: tour.homeImage,
      href: `/tours/featured/${tour.slug}`,
      hoverVideo: tour.hoverVideo,
    };
  });

  return (
    <PageShell>
      <section className="-mx-6 -mt-24 -ml-[max(0px,calc((100vw-100%)/2))] -mr-[max(0px,calc((100vw-100%)/2))] overflow-hidden lg:-mx-8 lg:-ml-[max(0px,calc((100vw-100%)/2))] lg:-mr-[max(0px,calc((100vw-100%)/2))]">
        <div className="relative w-full h-[82vh] border-b border-stone-200 overflow-hidden">
          <LazyBackgroundVideo
            src="/hero-video.mp4"
            poster={heroImage}
            posterAlt="Scenic travel destination"
            className="absolute inset-0 will-change-transform"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,24,28,0.35)_0%,rgba(18,24,28,0.6)_100%)] z-[5]" />

          <div className="relative z-10 flex h-full w-full flex-col justify-end px-6 pb-16 pt-36 lg:px-8">
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
                  className="inline-flex items-center rounded-full border border-[#ffc000] bg-[#ffc000] px-6 py-3 text-sm font-semibold !text-[#0b0b0b] shadow-[0_10px_22px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5 hover:bg-[#ffd24d]"
                >
                  Plan My Journey
                </Link>
                <Link
                  href="/destinations"
                  className="inline-flex items-center rounded-full border border-white/65 bg-black/45 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-black/60"
                >
                  Explore Destinations
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20 space-y-8 w-full">
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

        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">
          {destinations.slice(0, 4).map((destination) => (
            <Link
              href={destinationPackageLinks[destination.name] ?? "/destinations"}
              key={destination.name}
              className="group overflow-hidden rounded-[30px] border-4 border-[#fcc000] bg-white p-3 shadow-[0_14px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-1"
            >
                <div className="relative h-64 overflow-hidden rounded-2xl">
                <img
                  src={destination.image}
                  alt={destination.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <div className="space-y-4 px-4 pb-5 pt-4">
                <h3 className="font-serif text-[2.2rem] font-semibold leading-none">{destination.name}</h3>
                <p className="text-[1.02rem] leading-8 text-stone-700">{destination.description}</p>
                <div className="flex items-center justify-between border-t border-stone-200 pt-3">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[#fcc000]">{destination.season}</p>
                  <span className="text-sm font-medium text-[#fcc000]">{destination.duration}</span>
                </div>
              </div>
            </Link>
          ))}
          </div>
        </div>
      </section>

      <section className="mt-20 rounded-3xl border-4 border-[#fcc000] bg-white shadow-[0_12px_36px_rgba(15,23,42,0.06)] w-full">
        <div className="px-6 py-5 lg:px-8 md:py-7">
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

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {packageCards.map((tour) => (
              <HoverVideoCard key={tour.name} {...tour} />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20 w-full">
        <div className="px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.32em] font-bold text-black">Why Choose Us</p>
            <h2 className="mt-3 font-serif text-4xl">
              <span className="text-black">Trustworthy planning</span>{' '}
              <span className="text-[#fcc000]">with premium restraint.</span>
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {serviceHighlights.map((item) => (
            <article key={item.title} className="rounded-2xl border-4 border-[#fcc000] bg-white p-6 shadow-sm">
              <div className="h-11 w-11 overflow-hidden rounded-full border border-stone-200 bg-stone-100">
                <img src={item.icon} alt={item.title} loading="lazy" decoding="async" width={44} height={44} className="h-full w-full object-cover" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">{item.description}</p>
            </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20 overflow-hidden rounded-3xl border-4 border-[#fcc000] bg-white shadow-[0_12px_36px_rgba(15,23,42,0.06)] w-full">
        <div className="px-6 py-8 lg:px-8">
          <p className="text-xs uppercase tracking-[0.32em] font-bold text-black">Testimonials</p>
          <h2 className="mt-3 font-serif text-4xl">
            <span className="text-black">Our clients don&apos;t just like us -</span>{' '}
            <span className="text-[#fcc000]">they rave about us.</span>
          </h2>
          <TestimonialsCarousel testimonials={testimonials} />
        </div>
      </section>

      <section className="mt-20 w-full">
        <div className="px-6 lg:px-8">
          <h2 className="text-center font-bold text-2xl sm:text-3xl mb-6 text-black">Hodophile Adventures Provide Free <span className="text-[#fcc000]">Travel Kit</span> to Our Customers</h2>
          <div className="mx-auto max-w-7xl rounded-3xl border-4 border-[#fcc000] bg-white overflow-hidden shadow-sm">
            <div className="relative bg-black">
            <LazyBackgroundVideo
              src="/travel-kit.mp4"
              poster="/images/destinations/kashmir.jpg"
              posterAlt="Travel kit preview"
              className="w-full max-h-[26rem] h-auto"
            />
          </div>
            <div className="p-8 text-center">
              <h2 className="font-serif text-4xl">Begin Your Next Journey</h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-stone-600">
                Let us craft a destination experience around your style. Share your preferred route, travel month, and group details. We will curate a polished domestic itinerary with premium pacing and memorable scenic moments.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link href="/make-my-trip" className="inline-flex rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold !text-white transition hover:bg-stone-800">
                  Make My Trip
                </Link>
                <Link href="/contact-us" className="inline-flex rounded-full border border-[#ffc000] bg-[#0b0b0b] px-6 py-3 text-sm font-semibold !text-[#ffc000] shadow-[0_8px_18px_rgba(0,0,0,0.2)] transition hover:bg-black">
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
