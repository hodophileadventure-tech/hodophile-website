"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Crown } from "lucide-react";

export type MiqatPackage = {
  name: string;
  nights: string;
  price: string;
  image: string;
  href: string;
};

type PackageCardProps = {
  pkg: MiqatPackage;
  index: number;
};

export function PackageCard({ pkg, index }: PackageCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-[1.75rem] border border-[#0F5132]/10 bg-white shadow-[0_16px_45px_rgba(15,81,50,0.08)] transition-all duration-500 hover:border-[#C9A227]/55 hover:shadow-[0_26px_60px_rgba(15,81,50,0.14)]"
    >
      <div className="relative h-60 overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-[#C9A227]/60 bg-[#0F5132]/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#FDFBF7]">
          <Crown className="h-3.5 w-3.5 text-[#C9A227]" aria-hidden="true" />
          Luxury Badge
        </span>
      </div>

      <div className="space-y-5 p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[#666666]">{pkg.nights}</p>
          <h3 className="mt-2 text-3xl font-semibold leading-none text-[#1C1C1C] sm:text-[2.05rem]">{pkg.name}</h3>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[#666666]">Starting From</p>
          <p className="mt-1 text-2xl font-semibold text-[#0F5132]">{pkg.price}</p>
        </div>

        <a
          href={pkg.href}
          className="inline-flex items-center gap-2 rounded-full border border-[#0F5132] px-5 py-2.5 text-sm font-semibold text-[#0F5132] transition hover:bg-[#0F5132] hover:text-[#FDFBF7]"
        >
          View Details
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </motion.article>
  );
}
