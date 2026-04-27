"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Slide = {
  src: string;
  label: string;
  headline: string;
  description: string;
  slug: string;
};

const slides: Slide[] = [
  {
    src: "/hero-images/hunza.avif",
    label: "Hunza",
    slug: "hunza",
    headline: "Where the magical journey begins...",
    description: "Terraced valleys, dramatic peaks, and scenic stays built for Pakistan travel.",
  },
  {
    src: "/hero-images/skurdu.jpg",
    label: "Skardu",
    slug: "skardu",
    headline: "Where the magical journey begins...",
    description: "Lakes, forts, and wide alpine views for slower, premium northern trips.",
  },
  {
    src: "/hero-images/Naran.jpg",
    label: "Naran",
    slug: "naran",
    headline: "Where the magical journey begins...",
    description: "Road trips, river views, and summer escapes for families and groups.",
  },
  {
    src: "/hero-images/kashmir.jpg",
    label: "Kashmir",
    slug: "kashmir",
    headline: "Where the magical journey begins...",
    description: "Soft valleys, clean air, and scenic routes for a calm getaway.",
  },
  {
    src: "/hero-images/Sawat.jpg",
    label: "Swat",
    slug: "swat",
    headline: "Where the magical journey begins...",
    description: "Green hills and peaceful routes for a classic domestic Pakistan tour.",
  },
];

export function HeroSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  const activeSlide = slides[activeIndex];

  return (
    <div className="relative flex min-h-[520px] items-center justify-center overflow-hidden py-16 sm:min-h-[560px]">
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            index === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.label}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.35)_100%),radial-gradient(circle_at_center,rgba(252,192,0,0.1),transparent_40%)]" />

      <div className="relative z-10 flex max-w-5xl flex-col items-center text-center px-6 lg:px-8">
        <span className="inline-flex rounded-full border border-[#fcc000]/40 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#8a6400] shadow-lg shadow-black/10 backdrop-blur">
          {activeSlide.label}
        </span>
        <h1 className="mt-8 max-w-4xl font-display text-5xl font-semibold italic tracking-tight text-[#fcc000] drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] sm:text-6xl lg:text-7xl">
          {activeSlide.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
          {activeSlide.description}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${slide.label}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex ? "w-10 bg-[#fcc000]" : "w-2.5 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {slides.map((slide) => (
            <Link
              key={slide.label}
              href={`/destinations/${slide.slug}`}
              className="rounded-full border border-white/20 bg-black/20 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white/90 backdrop-blur transition hover:border-white/60 hover:bg-black/40"
            >
              {slide.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}