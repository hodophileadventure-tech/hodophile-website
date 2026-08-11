"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Crown } from "lucide-react";

const packages = [
  {
    tier: "Economy",
    price: "From Rs.195,000",
    detail: "Thoughtfully paced stays with essential comforts and complete guidance.",
    image: "/images/umrah/masjid-e-nabvi.jpg",
  },
  {
    tier: "Premium",
    price: "From Rs.325,000",
    detail: "A refined balance of comfort, service and spiritual ease throughout the journey.",
    image: "/images/umrah/kabah-shareef.jpg",
  },
  {
    tier: "HARAMAIN",
    price: "From Rs.495,000",
    detail: "Luxury hospitality, premium transfers and elevated support at every step.",
    image: "/images/umrah/kabah.jpg",
  },
];

export function Packages() {
  return (
    <section id="miqat-packages" className="snap-start min-h-[calc(100vh-var(--site-header-height))] overflow-hidden bg-black px-4 py-4 text-white sm:px-6 lg:px-10 xl:px-14">
      <div className="mx-auto min-h-[calc(100vh-var(--site-header-height))] w-full max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.38em] text-[#FCC000]">Umrah Packages</p>
          <h2 className="mt-4 font-[var(--font-miqat-heading)] text-4xl text-white sm:text-5xl">
            Crafted for Every Pilgrim
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#B5B5B5] sm:text-lg">
            Select a tier that reflects your comfort, pace and preferred level of service.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {packages.map((pkg, index) => (
            <motion.article
              key={pkg.tier}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="overflow-hidden rounded-[1.8rem] border border-[#FCC000]/25 bg-[#0B0B0B]/90 shadow-[0_16px_55px_rgba(0,0,0,0.35)] backdrop-blur"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.tier}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-[#FCC000]/35 bg-black/70 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#FCC000]">
                  <Crown className="h-3.5 w-3.5" aria-hidden="true" />
                  Premium
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-[#B5B5B5]">7 Nights</p>
                <h3 className="mt-3 font-[var(--font-miqat-heading)] text-3xl text-white">{pkg.tier}</h3>
                <p className="mt-3 text-sm leading-7 text-[#B5B5B5]">{pkg.detail}</p>

                <div className="mt-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-[#B5B5B5]">Starting From</p>
                  <p className="mt-2 text-2xl font-semibold text-[#FCC000]">{pkg.price}</p>
                </div>

                <Link
                  href="/umrah-packages/book"
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#FCC000]/35 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#FCC000] hover:text-black"
                >
                  View Package
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
