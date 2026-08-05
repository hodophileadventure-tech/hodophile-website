"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export function MiqatHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative snap-start min-h-[calc(115vh-var(--site-header-height))] overflow-hidden bg-black px-4 py-4 text-white sm:px-6 lg:px-10 xl:px-14">
      <motion.div
        animate={{ scale: 1 }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <video
          className="h-full w-full object-cover"
          src="/videos/qasim.mp4"
          poster="/images/umrah/kabah.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(0,0,0,0.84)_0%,rgba(0,0,0,0.62)_45%,rgba(0,0,0,0.22)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(252,192,0,0.16),transparent_32%)]" />
      </motion.div>

      <div className="relative z-10 mx-auto flex h-[calc(100vh-var(--site-header-height))] w-full max-w-6xl items-center justify-start">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.42em] text-[#FCC000]">Introducing</p>

          <h1 className="mt-4 font-[var(--font-miqat-heading)] leading-[0.95] tracking-[-0.03em] text-white text-[clamp(2.4rem,6.5vw,5.5rem)] sm:text-[clamp(3rem,6.5vw,6.5rem)] lg:text-[clamp(4.2rem,8.5vw,8rem)]">
            <span className="block">MIQAT</span>
            <span className="mt-2 block text-[clamp(1.2rem,2.4vw,1.9rem)] font-light tracking-[0.01em] text-white/90 sm:text-[clamp(1.6rem,2.6vw,2.6rem)] lg:text-[clamp(1.8rem,2.6vw,3.2rem)]">
              by Hodophile
            </span>
          </h1>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 108 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 h-[2px] bg-[#FCC000]"
          />

          <p className="mt-6 font-[var(--font-miqat-heading)] text-2xl italic text-[#FCC000] sm:text-3xl">
            Your Sacred Journey Begins Here
          </p>

          <p className="mt-5 max-w-2xl text-base leading-8 text-[#B5B5B5] sm:text-lg">
            Premium Umrah experiences designed with comfort, care and complete peace of mind.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#miqat-packages"
              className="inline-flex items-center rounded-full bg-[#FCC000] px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5"
            >
              Explore Packages
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-[#FCC000] hover:text-[#FCC000]"
            >
              Contact Expert
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
