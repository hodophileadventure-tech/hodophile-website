"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-18, 26]);

  return (
    <section
      ref={heroRef}
      id="miqat-hero"
      className="relative -mx-4 min-h-[85vh] overflow-hidden px-4 pb-16 pt-24 md:-mx-6 md:px-6 lg:-mx-10 lg:px-10 xl:-mx-14 xl:px-14"
      aria-labelledby="miqat-hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[url('/images/umrah/islamic-pattern.svg')] bg-[length:320px_320px] bg-repeat opacity-[0.03]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(201,162,39,0.17),transparent_38%),radial-gradient(circle_at_85%_80%,rgba(15,81,50,0.12),transparent_35%)]" />

      <div className="relative mx-auto grid min-h-[76vh] max-w-[92rem] items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#0F5132]">Luxury Umrah Experience</p>
          <h1
            id="miqat-hero-heading"
            className="mt-5 text-[3.1rem] font-semibold leading-[0.95] tracking-[-0.03em] text-[#1C1C1C] sm:text-[4rem] lg:text-[4.7rem]"
          >
            <span className="font-[var(--font-miqat-heading)]">MIQAT</span>
            <span className="mt-2 block text-[2rem] font-normal leading-none tracking-[-0.02em] text-[#0F5132] sm:text-[2.5rem]">
              by Hodophile
            </span>
          </h1>
          <p className="mt-6 font-[var(--font-miqat-heading)] text-3xl italic leading-tight text-[#0F5132] sm:text-[2.2rem]">
            Your Sacred Journey Begins Here.
          </p>
          <p className="mt-5 max-w-xl text-base leading-8 text-[#666666] sm:text-lg">
            Experience Umrah with comfort, transparency, and complete peace of mind. Every detail is carefully planned so you can focus on your worship.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="#miqat-packages"
              className="inline-flex items-center rounded-full bg-[#0F5132] px-7 py-3 text-sm font-semibold text-[#FDFBF7] transition hover:-translate-y-0.5 hover:bg-[#0A3E27]"
            >
              Explore Packages
            </Link>
            <Link
              href="#miqat-cta"
              className="inline-flex items-center rounded-full border border-[#C9A227] px-7 py-3 text-sm font-semibold text-[#0F5132] transition hover:-translate-y-0.5 hover:bg-[#C9A227] hover:text-[#1C1C1C]"
            >
              Talk to an Expert
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="relative mx-auto w-full max-w-[40rem]"
        >
          <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full border border-[#C9A227]/60" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[2rem] border border-[#0F5132]/10 bg-white p-2 shadow-[0_22px_60px_rgba(15,81,50,0.15)]">
            <motion.div style={{ y: imageY }} className="relative h-[24rem] overflow-hidden rounded-[1.5rem] sm:h-[32rem]">
              <Image
                src="/images/umrah/kabah.jpg"
                alt="Kaaba in Masjid al Haram"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
