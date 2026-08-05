"use client";

import { motion } from "framer-motion";

const steps = ["Book", "Visa", "Departure", "Makkah", "Madinah", "Return"];

export function Timeline() {
  return (
    <section className="py-20 sm:py-24" aria-labelledby="miqat-timeline-heading">
      <div className="mx-auto max-w-[92rem]">
        <p className="text-xs uppercase tracking-[0.3em] text-[#0F5132]">Journey Timeline</p>
        <h2
          id="miqat-timeline-heading"
          className="mt-4 font-[var(--font-miqat-heading)] text-4xl text-[#1C1C1C] sm:text-5xl"
        >
          A Clear and Guided Sacred Journey
        </h2>

        <div className="relative mt-10 overflow-x-auto pb-2">
          <div className="absolute left-10 right-10 top-[2.6rem] hidden h-px bg-[#0F5132]/25 md:block" aria-hidden="true" />
          <motion.ol
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.09,
                },
              },
            }}
            className="grid min-w-[52rem] grid-cols-6 gap-4 md:min-w-0"
          >
            {steps.map((step) => (
              <motion.li
                key={step}
                variants={{
                  hidden: { opacity: 0, y: 26 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-center text-center"
              >
                <span className="inline-flex h-20 w-20 items-center justify-center rounded-full border border-[#0F5132]/25 bg-white text-sm font-semibold uppercase tracking-[0.08em] text-[#1C1C1C] shadow-[0_10px_30px_rgba(15,81,50,0.08)]">
                  {step}
                </span>
                <span className="mt-2 text-xl leading-none text-[#C9A227]" aria-hidden="true">↓</span>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
