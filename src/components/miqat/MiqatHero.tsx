"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { whatsappUrl } from "@/lib/site";

export function MiqatHero() {
  return (
    <section className="relative isolate flex min-h-[min(760px,calc(100svh-var(--site-header-height)))] overflow-hidden bg-[#090909] px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-14 lg:py-10">
      <motion.div
        animate={{ scale: 1 }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <video
          className="h-full w-full object-cover"
          poster="/images/package-cards/images__umrah__kabah.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/videos/qasim-opt.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(0,0,0,0.84)_0%,rgba(0,0,0,0.62)_45%,rgba(0,0,0,0.22)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(252,192,0,0.16),transparent_32%)]" />
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-start">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.42em] text-[#FCC000]">Introducing</p>

          <h1 className="mt-6 font-[var(--font-display)] text-6xl leading-[0.94] tracking-[-0.04em] text-white sm:text-7xl lg:text-[6rem] xl:text-[6.5rem]">
            <span className="block">MIQAT</span>
            <span className="mt-2 block text-2xl font-light tracking-[0.01em] text-white/90 sm:text-3xl lg:text-4xl">
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

          <p className="mt-6 font-[var(--font-display)] text-2xl italic text-[#FCC000] sm:text-3xl">
            Your Sacred Journey, Thoughtfully Arranged.
          </p>

          <p className="mt-5 max-w-2xl text-base leading-8 text-[#B5B5B5] sm:text-lg">
            Premium Umrah experiences designed with comfort, care and complete peace of mind.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#miqat-packages"
              className="inline-flex items-center justify-center rounded-full bg-[#FCC000] px-6 py-3.5 text-sm font-semibold text-black transition hover:-translate-y-0.5"
            >
              Explore Packages
            </Link>
            <Link
              href={whatsappUrl("Hi Hodophile, I would like to speak with a MIQAT Umrah expert.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-[#FCC000] hover:text-[#FCC000]"
            >
              Talk to a MIQAT Expert
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
