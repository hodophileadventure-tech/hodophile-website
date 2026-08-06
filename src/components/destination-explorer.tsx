"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

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
    <section className="mt-[6rem] overflow-hidden bg-[#fbf8f2]">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-10">
        <div className="absolute left-[-3rem] top-10 h-72 w-72 rounded-full bg-[#f4ddb2] blur-3xl" />
        <div className="absolute right-0 top-36 h-56 w-56 rounded-full bg-[#e9dec8] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-10 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.32em] font-bold text-black">Destinations</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-stone-950 sm:text-5xl">
              Discover the places that stay with you.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
              From dramatic mountain valleys to quiet lakeside escapes, explore Pakistan through journeys worth remembering.
            </p>
          </div>
          <Link href="/destinations" className="text-sm font-medium text-[#0b0b0b] transition hover:text-[#ffc000]">
            View all destinations
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.7fr_1.1fr] lg:items-start">
          <div className="relative overflow-hidden rounded-[28px] bg-stone-950" style={{ minHeight: 520 }}>
            <div className="absolute inset-0 transition-opacity duration-500 ease-out">
              <Image
                src={active.image}
                alt={active.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 70vw"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute left-8 bottom-8 right-8 z-10 text-white">
              <p className="text-xs uppercase tracking-[0.36em] text-white/70">
                0{activeIndex + 1} / DESTINATION
              </p>
              <h3 className="mt-4 text-4xl font-serif leading-tight sm:text-[3.8rem]">
                {active.name}
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
                {active.description}
              </p>
              <Link
                href={active.href}
                className="mt-6 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#fcc000] transition-opacity duration-200 hover:opacity-90"
              >
                Explore Destination →
              </Link>
            </div>
          </div>

          <div className="grid gap-3 rounded-[28px] bg-white/90 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.08)] ring-1 ring-black/5 lg:p-6">
            {selectors.map((destination) => {
              const isActive = destination.index === activeIndex;
              return (
                <button
                  key={destination.name}
                  type="button"
                  onClick={() => setActiveIndex(destination.index)}
                  className={`group flex w-full items-center justify-between gap-4 rounded-3xl border px-4 py-4 text-left transition duration-300 ${
                    isActive
                      ? "border-[#fcc000]/30 bg-[#fff6e5] shadow-[0_8px_24px_rgba(255,192,0,0.08)]"
                      : "border-stone-200 bg-white hover:border-[#fcc000]/40 hover:bg-[#fffaef]"
                  }`}
                >
                  <div>
                    <p className={`text-sm uppercase tracking-[0.34em] ${isActive ? "text-[#fcc000]" : "text-stone-500"}`}>
                      {String(destination.index + 1).padStart(2, "0")}
                    </p>
                    <p className={`mt-2 text-base font-semibold ${isActive ? "text-stone-950" : "text-stone-900"}`}>
                      {destination.name}
                    </p>
                  </div>
                  <span className={`text-lg transition duration-300 ${isActive ? "text-[#fcc000] opacity-100" : "text-stone-400 opacity-70 group-hover:text-[#fcc000] group-hover:opacity-100"}`}>
                    →
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DestinationExplorer;
