"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export function MiqatHighlightSection() {
  const reduceMotion = useReducedMotion();
  const transition = { duration: reduceMotion ? 0 : 0.75, ease: "easeOut" as const };

  return (
    <section
      id="miqat-highlight"
      aria-labelledby="miqat-highlight-heading"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_90%_0%,rgba(252,192,0,0.18),transparent_38%),linear-gradient(135deg,#11110f,#29271f)] px-6 py-16 sm:px-8 lg:px-12 lg:py-20"
    >
      <div className="mx-auto max-w-[96rem]">
        <div className="relative">
          <div className="mb-10 flex items-center gap-5 text-xs uppercase tracking-[0.35em] text-[#b8b2a7] lg:mb-14">
            <span className="text-[#FCC000]">02</span>
            <span className="h-px w-16 bg-white/25" />
            <span>A quieter way to travel</span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end lg:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={transition}
              className="relative z-10 max-w-[520px]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#FCC000]">MIQAT by Hodophile</p>

              <h2
                id="miqat-highlight-heading"
                className="mt-8 font-[var(--font-miqat-heading)] text-[clamp(3.5rem,6vw,7rem)] font-normal leading-[0.88] text-[#f5f1e8]"
              >
                A journey of the heart.
              </h2>

              <p className="mt-10 max-w-[450px] text-lg leading-[1.8] text-[#f5f1e8] sm:text-xl">
                Some journeys take you somewhere new. Some return you to what matters most.
              </p>

              <p className="mt-5 max-w-[430px] text-sm leading-7 text-[#d0cbc2]">
                MIQAT is our considered approach to Umrah: thoughtfully arranged, quietly supported, and shaped around the sacred rhythm of the days ahead. From the first conversation to the moment you return home, every detail is held with care.
              </p>

              <div className="mt-10">
                <Link
                  href="/umrah-packages"
                  className="group inline-flex items-center gap-4 border-b border-[#FCC000]/50 pb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#f5f1e8] transition duration-200 ease-in-out hover:border-[#FCC000] hover:text-[#FCC000]"
                >
                  <span>Enter MIQAT</span>
                  <span className="inline-block transition-transform duration-200 ease-in-out group-hover:translate-x-1">↗</span>
                </Link>
              </div>
            </motion.div>

            <div className="relative min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ ...transition, delay: 0.1 }}
                className="relative overflow-hidden rounded-[1.5rem] border border-white/10 shadow-[0_18px_55px_rgba(0,0,0,0.35)]"
              >
                <Image
                  src="/images/miqat-sunset.png"
                  alt="Sunset over the Kaaba and the Prophet's Mosque courtyard."
                  width={1672}
                  height={1024}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="aspect-[1.63] w-full object-cover"
                />
              </motion.div>

              <div className="mt-6 flex items-start justify-between gap-6 text-xs uppercase tracking-[0.3em] text-[#b8b2a7]">
                <p>Makkah · Saudi Arabia</p>
                <p className="hidden max-w-[190px] text-right leading-5 sm:block">A sacred journey, held with intention.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
