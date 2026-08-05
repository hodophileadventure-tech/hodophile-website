"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const places = [
  { title: "Masjid Al Haram", image: "/images/umrah/kabah.jpg" },
  { title: "Masjid An Nabawi", image: "/images/umrah/masjid-e-nabvi.jpg" },
  { title: "Mount Arafat", image: "/images/umrah/kabah-shareef.jpg" },
  { title: "Jabal Al Noor", image: "/images/umrah/masjid-nabvi.jpg" },
];

export function SacredPlaces() {
  return (
    <section className="snap-start min-h-[calc(100vh-var(--site-header-height))] overflow-hidden bg-black px-4 py-4 text-white sm:px-6 lg:px-10 xl:px-14">
      <div className="mx-auto min-h-[calc(100vh-var(--site-header-height))] w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.38em] text-[#FCC000]">Sacred Destinations</p>
          <h2 className="mt-4 font-[var(--font-miqat-heading)] text-4xl text-white sm:text-5xl">
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
              className="group relative overflow-hidden rounded-[1.7rem] border border-white/10"
            >
              <div className="relative h-80 sm:h-96">
                <Image
                  src={place.image}
                  alt={place.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-[var(--font-miqat-heading)] text-3xl text-white">{place.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-7 text-[#B5B5B5]">
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
