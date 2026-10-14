"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const features = [
  "Founded in Karachi in 2021",
  "Government license no. 5436",
  "TAAP and PATO affiliations",
  "Umrah services and travel planning",
  "Experienced team support",
  "24/7 customer service",
];

export function WhyMiqat() {
  return (
    <section className="overflow-hidden bg-[var(--surface-page)] px-4 py-12 text-stone-950 sm:px-6 sm:py-16 lg:px-10 lg:py-20 xl:px-14">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[1.25rem] border border-stone-300"
        >
          <div className="relative h-[28rem] sm:h-[34rem]">
            <Image
              src="/images/package-cards/images__umrah__masjid-e-nabvi.webp"
              alt="Masjid al Nabawi"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.38em] text-[#806700]">Trust, clearly stated</p>
          <h2 className="mt-4 font-[var(--font-display)] text-4xl leading-tight text-stone-950 sm:text-5xl">
            A considered partner for your journey.
          </h2>
          <p className="mt-5 text-base leading-8 text-stone-600 sm:text-lg">
            MIQAT is backed by Hodophile Adventures, a Karachi-based, government-licensed travel company founded in 2021. We bring the same careful planning and clear communication to Umrah services.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {features.map((feature, index) => (
              <motion.article
                key={feature}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.45, delay: 0.05 + index * 0.05 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="rounded-[1.25rem] border border-stone-200 bg-white p-4 shadow-[0_10px_28px_rgba(25,22,16,0.06)] transition duration-300 hover:border-[#FCC000]/60 hover:shadow-[0_16px_35px_rgba(25,22,16,0.1)]"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#FCC000]/15 text-[#8b6b00] shadow-[inset_0_0_0_1px_rgba(217,168,29,0.16)]">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <p className="text-sm font-medium text-stone-900">{feature}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
