"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Ayesha Siddiqui",
    role: "Pakistan",
    quote:
      "Everything was managed with remarkable care. Hotel check-ins, transfers and daily guidance were seamless, allowing us to stay fully focused on worship.",
    image: "/images/testimonials/female-1.png",
  },
  {
    name: "Khalid Rehman",
    role: "United Kingdom",
    quote:
      "MIQAT delivered exactly what was promised. The process was transparent from booking to return, and the support team remained available at every step.",
    image: "/images/testimonials/male-2.png",
  },
  {
    name: "Fatima Noor",
    role: "UAE",
    quote:
      "A calm and premium Umrah experience. The itinerary was thoughtfully paced, and every sacred visit felt organized and peaceful.",
    image: "/images/testimonials/female-2.png",
  },
];

export function Testimonials() {
  return (
    <section className="snap-start min-h-[calc(100vh-var(--site-header-height))] overflow-hidden bg-black px-4 py-4 text-white sm:px-6 lg:px-10 xl:px-14">
      <div className="mx-auto min-h-[calc(100vh-var(--site-header-height))] w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.38em] text-[#FCC000]">Trust & Testimonials</p>
          <h2 className="mt-4 font-[var(--font-miqat-heading)] text-4xl text-white sm:text-5xl">
            Loved by Pilgrims Worldwide
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="rounded-[1.6rem] border border-white/10 bg-[#0B0B0B] p-6 shadow-[0_14px_45px_rgba(0,0,0,0.3)]"
            >
              <div className="flex items-center gap-1 text-[#FCC000]" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star key={starIndex} className="h-4 w-4 fill-current" aria-hidden="true" />
                ))}
              </div>

              <Quote className="mt-6 h-8 w-8 text-[#FCC000]/40" aria-hidden="true" />
              <p className="mt-4 text-sm leading-8 text-[#B5B5B5]">{item.quote}</p>

              <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{item.name}</p>
                  <p className="text-xs uppercase tracking-[0.26em] text-[#B5B5B5]">{item.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
