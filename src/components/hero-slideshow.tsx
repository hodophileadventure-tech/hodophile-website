"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

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
    headline: "Experience Alpine\nMagic",
    description: "Terraced valleys, dramatic peaks, and premium stays curated for the discerning traveler.",
  },
  {
    src: "/hero-images/skurdu.jpg",
    label: "Skardu",
    slug: "skardu",
    headline: "Discover Crystal\nLakes",
    description: "Alpine lakes, ancient forts, and panoramic views for the ultimate luxury retreat.",
  },
  {
    src: "/hero-images/Naran.jpg",
    label: "Naran",
    slug: "naran",
    headline: "Mountain Roads\nUnwind",
    description: "Scenic routes, river escapes, and perfect family moments in nature's embrace.",
  },
  {
    src: "/hero-images/kashmir.jpg",
    label: "Kashmir",
    slug: "kashmir",
    headline: "Paradise\nAwaits",
    description: "Serene valleys, pristine air, and curated experiences in the crown jewel of Pakistan.",
  },
  {
    src: "/hero-images/Sawat.jpg",
    label: "Swat",
    slug: "swat",
    headline: "Valley of\nSerenity",
    description: "Verdant hills, peaceful trails, and authentic cultural immersion await.",
  },
];

export function HeroSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const activeSlide = slides[activeIndex];

  return (
    <div 
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
    >
      {/* Animated Background Slides */}
      {slides.map((slide, index) => (
        <motion.div
          key={slide.src}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{
            opacity: index === activeIndex ? 1 : 0,
            scale: index === activeIndex ? 1 : 1.05,
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slide.src}
            alt={slide.label}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      ))}

      {/* Premium Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60 pointer-events-none" />
      
      {/* Vignette Effect */}
      <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.5)] pointer-events-none" />

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 flex max-w-5xl flex-col items-center text-center px-6 lg:px-8"
      >
        {/* Location Badge */}
        <motion.div
          key={activeSlide.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 rounded-full border border-yellow-500/60 bg-black/40 backdrop-blur-md px-5 py-2.5 text-xs font-bold uppercase tracking-[0.4em] text-yellow-400 shadow-lg"
        >
          <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          {activeSlide.label}
        </motion.div>

        {/* Main Headline - Premium Typography */}
        <motion.h1
          key={`headline-${activeIndex}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-10 max-w-4xl text-5xl sm:text-6xl lg:text-7xl font-serif font-bold leading-[1.15] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
        >
          {activeSlide.headline.split('\n').map((line, i) => (
            <span key={i} className="block">
              {i === activeSlide.headline.split('\n').length - 1 ? (
                <span className="text-yellow-400 drop-shadow-[0_4px_12px_rgba(252,192,0,0.4)]">
                  {line}
                </span>
              ) : (
                line
              )}
            </span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          key={`description-${activeIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-white/85 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
        >
          {activeSlide.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href={`/tours/northern-tours/${activeSlide.slug}-valley-tour-packages`}
            className="btn-primary shadow-lg hover:shadow-xl"
          >
            Explore {activeSlide.label}
          </Link>
          <Link
            href="/make-my-trip"
            className="btn-secondary"
          >
            Plan Your Trip
          </Link>
        </motion.div>

        {/* Slide Indicators */}
        <div className="mt-16 flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: index === activeIndex ? 1 : 0.5 }}
              className={`transition-all duration-300 rounded-full ${
                index === activeIndex 
                  ? 'w-10 h-2 bg-yellow-400 shadow-lg shadow-yellow-400/40' 
                  : 'w-2 h-2 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Destination Tags */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {slides.map((slide) => (
            <Link
              key={slide.label}
              href={`/tours/northern-tours/${slide.slug}-valley-tour-packages`}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                slide.label === activeSlide.label
                  ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/40'
                  : 'border border-white/30 text-white/70 hover:border-white/60 hover:text-white hover:bg-white/10 backdrop-blur-sm'
              }`}
            >
              {slide.label}
            </Link>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-white/60 text-xs uppercase tracking-[0.2em]">Scroll</p>
          <svg
            className="w-5 h-5 text-yellow-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}