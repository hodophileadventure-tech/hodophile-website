"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type FeaturedJourney = {
  title: string;
  titleParts?: string[];
  name: string;
  image: string;
  href: string;
  duration: string;
  priceFrom: string;
  summary?: string;
};

export function FeaturedTours({ tours }: { tours: FeaturedJourney[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!tours || tours.length === 0) return;
    setActiveIndex((i) => (i >= tours.length ? 0 : i));
  }, [tours]);

  const active = tours[activeIndex] ?? tours[0];

  const remaining = useMemo(() => tours.map((t, i) => ({ ...t, i })), [tours]);

  return (
    <section className="mt-[6rem] px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.32em] text-stone-700/80">
            FEATURED TOURS
          </p>
          <h2 className="mt-3 text-3xl font-serif tracking-tight text-stone-950 sm:text-4xl">
            Signature journeys, thoughtfully crafted.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600">
            Cinematic routes and intimate itineraries curated for meaningful travel.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-12 gap-6 items-start">
          {/* Main featured */}
          <div className="col-span-12 lg:col-span-7">
            <div className="relative overflow-hidden rounded-[22px]" style={{ aspectRatio: '16/9' }}>
              <Image
                src={active.image}
                alt={active.name}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-500 ease-out hover:scale-[1.02]"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              <div className="absolute left-6 bottom-6 right-6 z-10 text-white">
                <div className="flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-white/80">
                  <div className="text-stone-300">0{activeIndex + 1}</div>
                  <div className="h-px w-10 bg-[#fcc000]/70" />
                  <div className="text-sm text-white/80">{String(tours.length).padStart(2, '0')} journeys</div>
                </div>

                <h3 className="mt-3 text-4xl font-serif leading-tight sm:text-[3.4rem]">
                  {active.titleParts && active.titleParts.length > 1 ? (
                    <>
                      <span className="block">{active.titleParts[0]}</span>
                      <span className="block text-3xl font-medium opacity-95">{active.titleParts[1]}</span>
                    </>
                  ) : (
                    <span className="block">{active.title}</span>
                  )}
                </h3>

                <div className="mt-4 flex items-center gap-4 text-sm text-white/80">
                  <div className="uppercase tracking-[0.18em]">{active.duration}</div>
                  <div className="text-[#fcc000]">· {active.priceFrom}</div>
                </div>

                {active.summary && (
                  <p className="mt-4 max-w-2xl text-sm text-white/90">{active.summary}</p>
                )}

                <div className="mt-6">
                  <Link
                    href={active.href}
                    className="inline-flex items-center gap-3 rounded-full bg-[#fcc000] px-6 py-3 text-sm font-semibold text-[#0b0b0b] shadow-[0_12px_30px_rgba(255,192,0,0.12)] transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    Explore Journey →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary list */}
          <div className="col-span-12 lg:col-span-5">
            <div className="flex h-full flex-col gap-4 bg-[#fbf6ef] rounded-[20px] p-4 lg:p-6 border border-stone-200/30">
              {remaining.map((tour, idx) => (
                <button
                  key={tour.i}
                  onMouseEnter={() => setActiveIndex(tour.i)}
                  onFocus={() => setActiveIndex(tour.i)}
                  onClick={() => setActiveIndex(tour.i)}
                  className={`group flex w-full items-center gap-4 rounded-md px-3 py-3 text-left transition-colors duration-300 focus:outline-none ${
                    tour.i === activeIndex ? "bg-white/6" : "hover:bg-white/3"
                  }`}
                >
                  <div className="relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={tour.image}
                      alt={tour.name}
                      fill
                      className={`object-cover transition-transform duration-500 ${tour.i === activeIndex ? 'scale-[1.03]' : 'group-hover:scale-[1.02]'}`}
                    />
                    <div className={`absolute inset-0 ${tour.i === activeIndex ? 'bg-black/20' : 'bg-black/12'}`} />
                  </div>

                  <div className="flex flex-1 flex-col">
                    <div className={`flex items-center justify-between gap-4`}> 
                      <div className={`text-sm font-semibold ${tour.i === activeIndex ? 'text-white' : 'text-stone-900'}`}>
                        {tour.titleParts && tour.titleParts.length > 1 ? (
                          <span className="block">{tour.titleParts[0]} <span className="opacity-90">{tour.titleParts[1]}</span></span>
                        ) : (
                          <span>{tour.title}</span>
                        )}
                      </div>
                      <div className="text-sm text-[#fcc000]">→</div>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-sm text-stone-600">
                      <div>{tour.duration}</div>
                      <div className="font-semibold text-stone-900">{tour.priceFrom}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedTours;
