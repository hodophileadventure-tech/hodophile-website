"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DestinationCard({ item }) {
  return (
    <Link href={item.href ?? '/tours'} className="group block">
      <motion.article
        className="flex h-full flex-col overflow-hidden rounded-[24px] border border-[#d4b34d]/35 bg-[#fff2d5] text-stone-900 shadow-[0_18px_42px_rgba(50,40,10,0.1)]"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -8 }}
      >
        <div className="destination-card-image relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-[#f1e5c8]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover transition-transform duration-400 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-105"
            loading="lazy"
          />

        </div>
        <div className="flex flex-1 flex-col items-start gap-5 p-5 sm:p-6">
          <div className="flex-1">
            <h3 className="font-serif text-3xl font-normal leading-tight tracking-[-0.02em] text-stone-950">
              {item.title}
            </h3>
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-stone-600">{item.description}</p>
          </div>
          <motion.span
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#FCC000] px-5 text-sm font-semibold uppercase tracking-[0.14em] text-black transition-colors group-hover:bg-[#ffda4d]"
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            View Details
          </motion.span>
        </div>
      </motion.article>
    </Link>
  );
}
