"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { whatsappUrl } from "@/lib/site";

export function MiqatHero() {
  return (
    <section className="relative isolate left-1/2 flex w-screen -translate-x-1/2 min-h-[min(760px,calc(100svh-var(--site-header-height)))] overflow-hidden bg-[#090909] px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-14 lg:py-10">
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

          <h1 className="mt-6 font-[var(--font-display)] text-3xl leading-[1.08] tracking-[-0.03em] text-white sm:text-4xl">
            <span className="block">MIQAT</span>
            <span className="mt-2 block text-lg font-light tracking-[0.01em] text-white/90 sm:text-xl">
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

          <p className="mt-6 font-[var(--font-display)] text-xl italic text-[#FCC000] sm:text-2xl">
            Your Sacred Journey, Thoughtfully Arranged.
          </p>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#B5B5B5] sm:text-base sm:leading-8">
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
