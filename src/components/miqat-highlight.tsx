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
      className="relative overflow-visible bg-[#f3ede5] px-6 py-24 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-[96rem]">
        <div className="relative overflow-visible">
          <div className="grid gap-16 lg:grid-cols-[minmax(0,38%)_minmax(0,62%)] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={transition}
              className="relative z-10 max-w-[420px]"
            >
              <div className="flex items-center justify-between gap-6">
                <p className="text-xs uppercase tracking-[0.35em] text-stone-950/70">
                  MIQAT BY HODOPHILE
                </p>
                <p className="text-xs uppercase tracking-[0.35em] text-stone-950/45">
                  01 / UMRAH
                </p>
              </div>

              <h2
                id="miqat-highlight-heading"
                className="mt-10 font-serif text-[clamp(3rem,4vw,4.25rem)] leading-[0.95] tracking-[-0.03em] text-stone-950"
              >
                A different kind of journey.
              </h2>

              <p className="mt-8 max-w-[420px] text-base leading-[1.85] text-stone-800 sm:text-[1.05rem]">
                Thoughtfully arranged Umrah journeys, with every detail considered from your first conversation to your return home.
              </p>

              <div className="mt-10">
                <Link
                  href="/umrah-packages"
                  className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.32em] text-stone-950 transition duration-200 ease-in-out"
                >
                  <span>DISCOVER MIQAT</span>
                  <span className="inline-block transition-transform duration-200 ease-in-out group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </motion.div>

            <div className="relative lg:-mr-10">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ ...transition, delay: 0.1 }}
                className="overflow-hidden bg-[#f3ede5] lg:relative lg:-top-8 lg:translate-x-8"
              >
                <img
                  src="/images/miqat/miqat-cinematic.jpg"
                  alt="Pilgrims moving through Masjid al-Haram in soft evening light, an intimate Umrah moment."
                  className="h-[66vh] min-h-[520px] w-full object-cover object-[50%_20%]"
                />
              </motion.div>

              <p className="mt-6 text-xs uppercase tracking-[0.35em] text-stone-900/65">
                MAKKAH · SAUDI ARABIA
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
