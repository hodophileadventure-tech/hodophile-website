"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export function MiqatHighlightSection() {
  const reduceMotion = useReducedMotion();
  const transition = { duration: reduceMotion ? 0 : 0.75, ease: "easeOut" as const };

  return (
    <section
      id="miqat-highlight"
      aria-labelledby="miqat-highlight-heading"
      className="relative overflow-visible bg-[#f3ede5] px-6 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-[96rem]">
        <div className="relative overflow-visible">
          <div className="mb-16 flex items-center gap-5 text-xs uppercase tracking-[0.35em] text-stone-950/55 lg:mb-24">
            <span className="text-stone-950">02</span>
            <span className="h-px w-16 bg-stone-950/30" />
            <span>A quieter way to travel</span>
          </div>

          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={transition}
              className="relative z-10 max-w-[520px]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#9a7600]">MIQAT by Hodophile</p>

              <h2
                id="miqat-highlight-heading"
                className="mt-8 font-[var(--font-miqat-heading)] text-[clamp(3.5rem,6vw,7rem)] font-normal leading-[0.88] text-stone-950"
              >
                A journey of the heart.
              </h2>

              <p className="mt-10 max-w-[450px] text-lg leading-[1.8] text-stone-800 sm:text-xl">
                Some journeys take you somewhere new. Some return you to what matters most.
              </p>

              <p className="mt-5 max-w-[430px] text-sm leading-7 text-stone-700/80">
                MIQAT is our considered approach to Umrah: thoughtfully arranged, quietly supported, and shaped around the sacred rhythm of the days ahead. From the first conversation to the moment you return home, every detail is held with care.
              </p>

              <div className="mt-10">
                <Link
                  href="/umrah-packages"
                  className="group inline-flex items-center gap-4 border-b border-stone-950/40 pb-3 text-sm font-semibold uppercase tracking-[0.28em] text-stone-950 transition duration-200 ease-in-out hover:border-[#9a7600] hover:text-[#9a7600]"
                >
                  <span>Enter MIQAT</span>
                  <span className="inline-block transition-transform duration-200 ease-in-out group-hover:translate-x-1">↗</span>
                </Link>
              </div>
            </motion.div>

            <div className="relative lg:-mr-10">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ ...transition, delay: 0.1 }}
                className="overflow-hidden bg-[#f3ede5] lg:relative lg:-top-10 lg:translate-x-8"
              >
                <img
                  src="/images/miqat/miqat-cinematic.jpg"
                  alt="Pilgrims moving through Masjid al-Haram in soft evening light, an intimate Umrah moment."
                  className="h-[58vh] min-h-[500px] w-full object-cover object-[50%_20%] lg:h-[72vh]"
                />
              </motion.div>

              <div className="mt-6 flex items-start justify-between gap-6 text-xs uppercase tracking-[0.3em] text-stone-900/60">
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
