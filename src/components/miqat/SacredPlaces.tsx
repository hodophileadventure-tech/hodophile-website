"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const places = [
  { title: "Masjid Al Haram", image: "/images/package-cards/images__umrah__kabah.webp" },
  { title: "Masjid An Nabawi", image: "/images/package-cards/images__umrah__masjid-e-nabvi.webp" },
];

export function SacredPlaces() {
  return (
    <section className="overflow-hidden px-4 py-12 text-stone-950 sm:px-6 sm:py-16 lg:px-10 lg:py-20 xl:px-14">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.38em] text-[#806700]">Sacred Destinations</p>
          <h2 className="mt-4 font-[var(--font-display)] text-4xl text-stone-950 sm:text-5xl">
            Places of Reflection and Reverence
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {places.map((place, index) => (
            <motion.article
              key={place.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.06 }}
              whileHover={{ scale: 1.01, y: -4 }}
              className="group overflow-hidden rounded-[1.25rem] border border-stone-300 bg-white shadow-sm"
            >
              <div className="relative h-40 sm:h-48">
                <Image
                  src={place.image}
                  alt={place.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-[var(--font-display)] text-xl text-stone-950">{place.title}</h3>
                <p className="mt-1 max-w-xs text-sm leading-6 text-stone-600">
                  A sacred setting framed by architecture, calm and deeply meaningful presence.
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
