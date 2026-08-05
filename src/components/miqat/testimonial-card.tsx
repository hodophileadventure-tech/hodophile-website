"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

export type MiqatTestimonial = {
  name: string;
  country: string;
  quote: string;
  image: string;
};

type TestimonialCardProps = {
  testimonial: MiqatTestimonial;
  index: number;
};

export function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[1.5rem] border border-white/45 bg-white/45 p-6 shadow-[0_18px_45px_rgba(15,81,50,0.12)] backdrop-blur-md"
    >
      <Quote className="absolute right-6 top-5 h-9 w-9 text-[#C9A227]/35" aria-hidden="true" />

      <div className="flex items-center gap-1 text-[#C9A227]" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, starIndex) => (
          <Star key={starIndex} className="h-4 w-4 fill-current" aria-hidden="true" />
        ))}
      </div>

      <p className="mt-4 text-sm leading-7 text-[#1C1C1C]/90">{testimonial.quote}</p>

      <div className="mt-6 flex items-center gap-3 border-t border-[#0F5132]/12 pt-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#1C1C1C]">{testimonial.name}</p>
          <p className="text-xs uppercase tracking-[0.18em] text-[#666666]">{testimonial.country}</p>
        </div>
      </div>
    </motion.article>
  );
}
