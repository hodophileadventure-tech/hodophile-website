"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

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

    const intervalId = window.setInterval(step, 2000);

    return () => window.clearInterval(intervalId);
  }, [testimonials.length]);

  return (
    <div ref={scrollerRef} className="mt-8 -mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-2 [scrollbar-width:thin]">
      {testimonials.map((story, index) => (
        <article
          key={`${story.name}-${index}`}
          className="w-[20rem] shrink-0 snap-start rounded-2xl border-4 border-[#fcc000] bg-stone-50 p-5 sm:w-[22rem]"
        >
          <div className="mb-4 flex items-center gap-3">
            <Image
              src={story.image}
              alt={story.name}
              width={52}
              height={52}
              className="h-12 w-12 rounded-full border border-stone-200 object-cover"
            />
            <div>
              <h3 className="text-sm font-semibold">{story.name}</h3>
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{story.role}</p>
            </div>
          </div>
          <p className="text-sm leading-7 text-stone-600">&ldquo;{story.quote}&rdquo;</p>
        </article>
      ))}
    </div>
  );
}

export default TestimonialsCarousel;