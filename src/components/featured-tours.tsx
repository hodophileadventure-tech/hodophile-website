"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <section className="mt-20 px-6 lg:px-8 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-yellow-400" />
            <p className="text-xs uppercase tracking-[0.35em] text-yellow-600 font-bold">
              CURATED EXPERIENCES
            </p>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-4 text-stone-950">
            Signature Journeys
          </h2>
          <p className="text-lg text-stone-600 leading-relaxed max-w-2xl">
            Meticulously designed itineraries featuring our most sought-after destinations. Each journey is crafted for unforgettable moments.
          </p>
        </motion.div>

        <div className="grid grid-cols-12 gap-8">
          {/* Main Featured Tour */}
          <motion.div
            key={`featured-${activeIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="col-span-12 lg:col-span-7"
          >
            <div className="relative overflow-hidden rounded-2xl group" style={{ aspectRatio: '16/9' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={active.image}
                    alt={active.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-black/30 to-black/70" />
              
              {/* Vignette */}
              <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.3)]" />

              {/* Content Overlay */}
              <motion.div
                key={`content-${activeIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10 z-10"
              >
                <div className="space-y-4">
                  {/* Journey Counter */}
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-400">
                      0{activeIndex + 1} / {String(tours.length).padStart(2, '0')}
                    </span>
                    <div className="h-0.5 flex-1 max-w-xs bg-gradient-to-r from-yellow-400 to-transparent" />
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <h3 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight drop-shadow-lg">
                      {active.titleParts && active.titleParts.length > 1 ? (
                        <>
                          <span className="block">{active.titleParts[0]}</span>
                          <span className="text-yellow-400">{active.titleParts[1]}</span>
                        </>
                      ) : (
                        <span>{active.title}</span>
                      )}
                    </h3>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center gap-6 text-sm text-white/90">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="uppercase tracking-[0.15em] font-semibold">{active.duration}</span>
                    </div>
                    <div className="h-1 w-1 bg-yellow-400 rounded-full" />
                    <span className="text-yellow-400 font-bold">{active.priceFrom}</span>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <Link
                      href={active.href}
                      className="btn-primary inline-flex gap-2 group"
                    >
                      Discover This Journey
                      <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Secondary Tours List */}
          <div className="col-span-12 lg:col-span-5">
            <div className="space-y-3">
              {remaining.map((tour, idx) => (
                <motion.button
                  key={tour.i}
                  onMouseEnter={() => setActiveIndex(tour.i)}
                  onFocus={() => setActiveIndex(tour.i)}
                  onClick={() => setActiveIndex(tour.i)}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  className={`w-full group relative overflow-hidden rounded-lg p-4 transition-all duration-300 ${
                    tour.i === activeIndex
                      ? 'bg-yellow-400/10 border border-yellow-400/40'
                      : 'bg-stone-100/50 border border-stone-200/50 hover:bg-stone-100/80'
                  }`}
                >
                  <div className="flex gap-4 items-center">
                    {/* Thumbnail */}
                    <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={tour.image}
                        alt={tour.name}
                        fill
                        className={`object-cover transition-transform duration-500 ${
                          tour.i === activeIndex ? 'scale-110' : 'group-hover:scale-105'
                        }`}
                      />
                      <div className={`absolute inset-0 transition-colors duration-300 ${
                        tour.i === activeIndex ? 'bg-black/20' : 'bg-black/10'
                      }`} />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h4 className={`text-sm font-bold transition-colors duration-300 ${
                        tour.i === activeIndex ? 'text-stone-950' : 'text-stone-700'
                      }`}>
                        {tour.titleParts && tour.titleParts.length > 1 ? (
                          <>
                            <span className="block">{tour.titleParts[0]}</span>
                            <span className="text-xs opacity-75">{tour.titleParts[1]}</span>
                          </>
                        ) : (
                          tour.title
                        )}
                      </h4>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-stone-500">{tour.duration}</span>
                        <span className={`text-sm font-bold ${
                          tour.i === activeIndex ? 'text-yellow-600' : 'text-stone-600'
                        }`}>
                          {tour.priceFrom}
                        </span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <svg className={`w-5 h-5 transition-all duration-300 ${
                      tour.i === activeIndex ? 'text-yellow-600 translate-x-1' : 'text-stone-400'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedTours;
