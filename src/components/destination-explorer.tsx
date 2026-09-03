"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type DestinationExplorerItem = {
  name: string;
  image: string;
  description: string;
  duration?: string;
  priceFrom?: string;
  href: string;
};

export function DestinationExplorer({ destinations }: { destinations: DestinationExplorerItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = destinations[activeIndex] ?? destinations[0];

  const selectors = useMemo(
    () => destinations.map((destination, index) => ({ ...destination, index })),
    [destinations],
  );

  return (
    <section className="mt-24 overflow-hidden py-20">
      {/* Animated Background Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-20 h-80 w-96 rounded-full bg-yellow-400/5 blur-3xl animate-pulse" />
        <div className="absolute right-[-5%] bottom-20 h-72 w-80 rounded-full bg-stone-400/3 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-wrap items-end justify-between gap-6"
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-yellow-400" />
              <p className="text-xs uppercase tracking-[0.35em] font-bold text-yellow-600">
                Destinations
              </p>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight text-stone-950 mb-4">
              Discover Places That Stay With You
            </h2>
            <p className="text-base lg:text-lg leading-relaxed text-stone-600 max-w-2xl">
              From dramatic mountain valleys to serene lakeside escapes, explore Pakistan's most enchanting destinations through journeys worth remembering.
            </p>
          </div>
          <Link 
            href="/destinations" 
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-yellow-400/30 bg-yellow-50/50 text-yellow-900 font-semibold text-sm uppercase tracking-[0.1em] transition-all duration-300 hover:border-yellow-400/60 hover:bg-yellow-100/50 hover:shadow-lg"
          >
            View All
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.8fr_1fr] lg:items-start">
          {/* Main Image Section */}
          <motion.div
            key={`featured-${activeIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl bg-stone-950 shadow-2xl"
            style={{ minHeight: 560 }}
          >
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
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/40 to-black/70" />
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.4)]" />

            {/* Content Overlay */}
            <motion.div
              key={`content-${activeIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="absolute inset-0 flex flex-col justify-end p-10 z-10"
            >
              <div className="space-y-6">
                {/* Destination Counter */}
                <div className="inline-flex items-center gap-4 w-fit">
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-yellow-400">
                    0{activeIndex + 1} / DESTINATION
                  </span>
                  <div className="h-0.5 w-10 bg-gradient-to-r from-yellow-400 to-transparent" />
                </div>

                {/* Title */}
                <h3 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-white drop-shadow-lg leading-tight">
                  {active.name}
                </h3>

                {/* Description */}
                <p className="text-base text-white/90 leading-relaxed max-w-xl drop-shadow-md">
                  {active.description}
                </p>

                {/* CTA */}
                <Link
                  href={active.href}
                  className="group inline-flex items-center gap-3 pt-4"
                >
                  <span className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-400 group-hover:text-yellow-300 transition-colors">
                    Explore Destination
                  </span>
                  <svg className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300 transition-all group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* Destination Selector Cards */}
          <div className="grid gap-3">
            {selectors.map((destination, idx) => {
              const isActive = destination.index === activeIndex;
              return (
                <motion.button
                  key={destination.name}
                  onClick={() => setActiveIndex(destination.index)}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  className={`group relative w-full rounded-2xl border px-5 py-5 text-left transition-all duration-300 overflow-hidden ${
                    isActive
                      ? "border-yellow-400/60 bg-yellow-50/80 shadow-[0_12px_36px_rgba(252,192,0,0.12)]"
                      : "border-stone-200/50 bg-white/60 hover:border-yellow-400/40 hover:bg-yellow-50/40 hover:shadow-lg backdrop-blur-sm"
                  }`}
                >
                  {/* Gradient background on hover */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/0 to-yellow-100/0 group-hover:from-yellow-100/40 group-hover:to-yellow-100/20 transition-all duration-300" />
                  )}
                  
                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className={`text-xs font-bold uppercase tracking-[0.25em] transition-colors duration-300 ${
                        isActive 
                          ? "text-yellow-600" 
                          : "text-stone-500 group-hover:text-yellow-600"
                      }`}>
                        {String(destination.index + 1).padStart(2, "0")}
                      </p>
                      <p className={`mt-3 text-lg font-bold transition-colors duration-300 ${
                        isActive 
                          ? "text-stone-950" 
                          : "text-stone-900 group-hover:text-stone-950"
                      }`}>
                        {destination.name}
                      </p>
                    </div>
                    <motion.svg
                      animate={{ x: isActive ? 4 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`w-6 h-6 flex-shrink-0 transition-all duration-300 ${
                        isActive 
                          ? "text-yellow-600" 
                          : "text-stone-400 group-hover:text-yellow-600"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </motion.svg>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DestinationExplorer;
