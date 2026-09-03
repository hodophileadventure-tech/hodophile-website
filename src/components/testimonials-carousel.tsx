"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  image: string;
};

type TestimonialsCarouselProps = {
  testimonials: Testimonial[];
};

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller || testimonials.length < 2) {
      return undefined;
    }

    const step = () => {
      const firstCard = scroller.firstElementChild as HTMLElement | null;

      if (!firstCard) {
        return;
      }

      const cardWidth = firstCard.getBoundingClientRect().width;
      const cardGap = Number.parseFloat(getComputedStyle(scroller).columnGap || getComputedStyle(scroller).gap || "0") || 0;
      const nextScrollLeft = scroller.scrollLeft + cardWidth + cardGap;
      const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;

      if (nextScrollLeft >= maxScrollLeft - 8) {
        scroller.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      scroller.scrollBy({ left: cardWidth + cardGap, behavior: "smooth" });
    };

    const intervalId = window.setInterval(step, 5000);

    return () => window.clearInterval(intervalId);
  }, [testimonials.length]);

  return (
    <div className="mt-12">
      <div 
        ref={scrollerRef} 
        role="region" 
        aria-label="Client Testimonials" 
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 px-2 -mx-2 [scrollbar-width:thin] [scrollbar-color:rgba(252,192,0,0.3)_transparent] scroll-smooth"
      >
        {testimonials.map((story, index) => (
          <motion.article
            key={`${story.name}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="w-[28rem] shrink-0 snap-start"
          >
            <div className="group relative h-full rounded-2xl overflow-hidden card-premium">
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-yellow-400/40 via-stone-200/20 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Card Content */}
              <div className="relative bg-white rounded-2xl p-8 h-full flex flex-col z-10">
                {/* Star Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 fill-yellow-400"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-base leading-relaxed text-stone-700 mb-8 flex-1 italic">
                  &ldquo;{story.quote}&rdquo;
                </p>

                {/* Divider */}
                <div className="w-12 h-1 bg-gradient-to-r from-yellow-400 to-transparent rounded-full mb-6" />

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-stone-100">
                  <div className="relative w-14 h-14">
                    <Image
                      src={story.image}
                      alt={story.name}
                      fill
                      className="rounded-full object-cover border-2 border-yellow-400/20"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900">{story.name}</h3>
                    <p className="text-xs uppercase tracking-[0.15em] text-stone-500 font-semibold">
                      {story.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="mt-8 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-3">Swipe to see more</p>
        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-yellow-400/40 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-yellow-400/60 animate-pulse" style={{ animationDelay: '0.1s' }} />
          <div className="w-2 h-2 rounded-full bg-yellow-400/40 animate-pulse" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>
    </div>
  );
}

export default TestimonialsCarousel;