"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const sacredPlaces = [
  {
    title: "Masjid al Haram",
    image: "/images/umrah/kabah.jpg",
  },
  {
    title: "Masjid an Nabawi",
    image: "/images/umrah/masjid-e-nabvi.jpg",
  },
  {
    title: "Mount Arafat",
    image: "/images/umrah/kabah-shareef.jpg",
  },
  {
    title: "Jabal al Noor",
    image: "/images/umrah/masjid-nabvi.jpg",
  },
];

export function SacredPlaces() {
  return (
    <section className="py-20 sm:py-24" aria-labelledby="miqat-sacred-heading">
      <div className="mx-auto max-w-[92rem]">
        <p className="text-xs uppercase tracking-[0.3em] text-[#0F5132]">Sacred Places</p>
        <h2
          id="miqat-sacred-heading"
          className="mt-4 font-[var(--font-miqat-heading)] text-4xl text-[#1C1C1C] sm:text-5xl"
        >
          Places of Reflection and Reverence
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {sacredPlaces.map((place, index) => (
            <motion.article
              key={place.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.07 }}
              className="group relative overflow-hidden rounded-[1.5rem]"
            >
              <div className="relative h-72 sm:h-80">
                <Image
                  src={place.image}
                  alt={place.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <h3 className="font-[var(--font-miqat-heading)] text-2xl text-[#FDFBF7]">{place.title}</h3>
                <Link
                  href="/contact-us"
                  className="translate-y-2 text-sm font-medium text-[#FDFBF7] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  Learn More →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
