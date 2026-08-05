"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Headset,
  Hotel,
  Landmark,
  Plane,
  WalletCards,
} from "lucide-react";

const features = [
  { label: "Visa Assistance", icon: BadgeCheck },
  { label: "Premium Hotels", icon: Hotel },
  { label: "Direct Flights", icon: Plane },
  { label: "Guided Ziyarat", icon: Landmark },
  { label: "24/7 Support", icon: Headset },
  { label: "Flexible Installments", icon: WalletCards },
];

export function WhyChoose() {
  return (
    <section id="miqat-why" className="py-20 sm:py-24" aria-labelledby="miqat-why-heading">
      <div className="mx-auto grid max-w-[92rem] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] border border-[#0F5132]/15 bg-white shadow-[0_18px_40px_rgba(15,81,50,0.10)]"
        >
          <div className="relative h-[26rem] sm:h-[34rem]">
            <Image
              src="/images/umrah/masjid-e-nabvi.jpg"
              alt="Pilgrims in Masjid an Nabawi courtyard"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#0F5132]">Why Choose MIQAT</p>
          <h2
            id="miqat-why-heading"
            className="mt-4 font-[var(--font-miqat-heading)] text-4xl leading-tight text-[#1C1C1C] sm:text-5xl"
          >
            Why Choose MIQAT?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[#666666]">
            Meticulous planning, respected hospitality partners, and spiritually focused logistics crafted for a refined Umrah experience.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.article
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.45, delay: 0.08 + index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="group rounded-2xl border border-[#0F5132]/10 bg-white p-4 shadow-[0_10px_28px_rgba(15,81,50,0.08)] transition-all duration-300 hover:shadow-[0_18px_35px_rgba(15,81,50,0.12)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#F6F0DD] text-[#C9A227]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-[#1C1C1C]">
                      {feature.label}
                    </h3>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
