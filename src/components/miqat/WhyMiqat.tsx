"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const features = [
  "Complete Visa Assistance",
  "Premium Accommodation",
  "Guided Ziyarat",
  "Experienced Tour Managers",
  "24/7 Support",
  "Transparent Pricing",
];

export function WhyMiqat() {
  return (
    <section className="snap-start min-h-[calc(100vh-var(--site-header-height))] overflow-hidden bg-black px-4 py-4 text-white sm:px-6 lg:px-10 xl:px-14">
      <div className="mx-auto grid min-h-[calc(100vh-var(--site-header-height))] w-full max-w-7xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10"
        >
          <div className="relative h-[28rem] sm:h-[34rem]">
            <Image
              src="/images/umrah/masjid-e-nabvi.jpg"
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
          <p className="text-sm font-semibold uppercase tracking-[0.38em] text-[#FCC000]">Why MIQAT</p>
          <h2 className="mt-4 font-[var(--font-miqat-heading)] text-4xl leading-tight text-white sm:text-5xl">
            Why Choose MIQAT?
          </h2>
          <p className="mt-5 text-base leading-8 text-[#B5B5B5] sm:text-lg">
            Every detail is crafted to feel calm, secure and deeply respectful, from your first consultation to your return home.
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
                className="rounded-[1.25rem] border border-[#FCC000]/35 bg-[#070707] p-4 shadow-[0_10px_35px_rgba(252,192,0,0.12)] transition duration-300 hover:shadow-[0_16px_45px_rgba(252,192,0,0.2)]"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#FCC000]/10 text-[#FCC000]">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <p className="text-sm font-medium text-white">{feature}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
