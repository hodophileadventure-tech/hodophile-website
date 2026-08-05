"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function MiqatCTA() {
  return (
    <section className="snap-start min-h-[calc(100vh-var(--site-header-height))] overflow-hidden bg-black px-4 py-4 text-white sm:px-6 lg:px-10 xl:px-14">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-7xl overflow-hidden rounded-[2.2rem] border border-white/10"
      >
        <div className="relative h-[70vh] min-h-[32rem]">
          <Image
            src="/images/umrah/kabah-shareef.jpg"
            alt="Makkah night"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.66)_50%,rgba(0,0,0,0.32)_100%)]" />

          <div className="relative z-10 flex h-full items-center px-6 sm:px-10 lg:px-14">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.38em] text-[#FCC000]">Final Invitation</p>
              <h2 className="mt-4 font-[var(--font-miqat-heading)] text-4xl text-white sm:text-5xl lg:text-6xl">
                Begin Your Spiritual Journey
              </h2>
              <p className="mt-5 text-lg text-[#B5B5B5] sm:text-xl">MIQAT by Hodophile</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center rounded-full bg-[#FCC000] px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5"
                >
                  Book Your Umrah
                </Link>
                <a
                  href="https://wa.me/923377774460"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-[#FCC000] hover:text-[#FCC000]"
                >
                  WhatsApp Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
