"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section id="miqat-cta" className="pb-8 pt-20 sm:pt-24" aria-labelledby="miqat-cta-heading">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-[92rem] overflow-hidden rounded-[2rem]"
      >
        <div className="relative h-[24rem] sm:h-[28rem]">
          <Image
            src="/images/umrah/kabah-shareef.jpg"
            alt="Pilgrims near the Kaaba"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(12,42,29,0.88)_0%,rgba(12,42,29,0.68)_52%,rgba(12,42,29,0.45)_100%)]" />

          <div className="absolute inset-0 flex items-center p-6 sm:p-10 lg:p-14">
            <div className="max-w-3xl">
              <h2 id="miqat-cta-heading" className="font-[var(--font-miqat-heading)] text-4xl text-[#FDFBF7] sm:text-5xl lg:text-6xl">
                Begin Your Spiritual Journey
              </h2>
              <p className="mt-3 text-lg text-[#FDFBF7]/90 sm:text-xl">MIQAT by Hodophile</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center rounded-full bg-[#C9A227] px-7 py-3 text-sm font-semibold text-[#1C1C1C] transition hover:-translate-y-0.5 hover:bg-[#E0BA42]"
                >
                  Book Now
                </Link>
                <a
                  href="https://wa.me/923377774460"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border border-[#FDFBF7]/80 px-7 py-3 text-sm font-semibold text-[#FDFBF7] transition hover:-translate-y-0.5 hover:bg-[#FDFBF7] hover:text-[#0F5132]"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
