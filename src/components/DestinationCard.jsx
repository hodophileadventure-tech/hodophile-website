"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DestinationCard({ item }) {
  return (
    <Link href={item.href ?? '/tours'} className="group block">
      <motion.article
        className="overflow-hidden rounded-[18px] border border-stone-200 bg-white shadow-[0_8px_30px_rgba(2,6,23,0.08)]"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -8 }}
      >
        <div className="relative h-40 w-full sm:h-48">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover transition-transform duration-400 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-105"
            loading="lazy"
          />

        </div>
        <div className="flex min-h-32 items-start justify-between gap-4 p-4">
          <div>
            <h3 className="text-lg font-semibold leading-tight text-stone-950 sm:text-xl">
              {item.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm leading-5 text-stone-600">{item.description}</p>
          </div>
          <motion.span
            aria-hidden="true"
            className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FCC000] shadow-[0_8px_24px_rgba(252,192,0,0.18)]"
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12h14" stroke="#000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 5l7 7-7 7" stroke="#000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>
        </div>
      </motion.article>
    </Link>
  );
}
