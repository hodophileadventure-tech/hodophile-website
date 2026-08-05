"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DestinationCard({ item }) {
  return (
    <Link href={item.href ?? '/tours'} className="group block">
      <motion.article
        className="relative overflow-hidden rounded-[18px] bg-black/5 shadow-[0_8px_30px_rgba(2,6,23,0.08)]"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -8 }}
      >
        <div className="relative h-[30rem] w-full rounded-[18px]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover transition-transform duration-400 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-105"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/35 to-transparent transition-opacity duration-400" />

          <div className="absolute -left-6 -top-6 h-24 w-[2px] rotate-6 bg-amber-400 opacity-60 blur-sm" />

          <div className="absolute left-6 bottom-6 right-6 flex items-end justify-between">
            <div className="max-w-[60%] text-white">
              <h3 className="text-2xl font-semibold leading-tight transition-transform duration-400">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-white/90">{item.description}</p>
            </div>

            <motion.button
              type="button"
              aria-label={`Explore ${item.title}`}
              className="ml-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#FCC000] shadow-[0_8px_24px_rgba(252,192,0,0.18)]"
              whileHover={{ x: 6, rotate: 12 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14" stroke="#000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 5l7 7-7 7" stroke="#000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
