"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
  const [centerIndex, setCenterIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);
  const intervalRef = useRef<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const updateCenterItem = () => {
    const scroller = scrollerRef.current;
    if (!scroller || testimonials.length < 2) return;
    const firstCard = scroller.firstElementChild as HTMLElement | null;
    if (!firstCard) return;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const cardGap = Number.parseFloat(getComputedStyle(scroller).columnGap || getComputedStyle(scroller).gap || "0") || 0;
    const scrollCenter = scroller.scrollLeft + scroller.clientWidth / 2;
    const index = Math.round((scrollCenter - cardWidth / 2) / (cardWidth + cardGap)) % testimonials.length;
    const resolved = Math.max(0, index);
    setCenterIndex(resolved);
    setCurrentIndex(resolved);
    currentIndexRef.current = resolved;
  };
  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller || testimonials.length < 2) {
      return undefined;
    }

    const step = () => {
      const firstCard = scroller.firstElementChild as HTMLElement | null;
      if (!firstCard) return;

      const cardWidth = firstCard.getBoundingClientRect().width;
      const cardGap = Number.parseFloat(getComputedStyle(scroller).columnGap || getComputedStyle(scroller).gap || "0") || 0;
      const next = (currentIndexRef.current + 1) % testimonials.length;
      const targetLeft = next * (cardWidth + cardGap);

      scroller.scrollTo({ left: targetLeft, behavior: "smooth" });
      currentIndexRef.current = next;
      setCurrentIndex(next);
      setTimeout(() => setCenterIndex(next), 600);
    };


    scroller.addEventListener("scroll", updateCenterItem);
    // start from the very first card
    currentIndexRef.current = 0;
    setCurrentIndex(0);
    setCenterIndex(0);
    scroller.scrollTo({ left: 0 });

    // Pause when the user interacts via pointer/touch/hover/focus
    const onPointerEnter = () => setIsPaused(true);
    const onPointerLeave = () => setIsPaused(false);
    const onPointerDown = () => setIsPaused(true);
    const onPointerUp = () => setIsPaused(false);

    scroller.addEventListener("mouseenter", onPointerEnter);
    scroller.addEventListener("mouseleave", onPointerLeave);
    scroller.addEventListener("pointerdown", onPointerDown);
    scroller.addEventListener("pointerup", onPointerUp);
    scroller.addEventListener("touchstart", onPointerDown, { passive: true });
    scroller.addEventListener("touchend", onPointerUp);

    return () => {
      scroller.removeEventListener("scroll", updateCenterItem);
      scroller.removeEventListener("mouseenter", onPointerEnter);
      scroller.removeEventListener("mouseleave", onPointerLeave);
      scroller.removeEventListener("pointerdown", onPointerDown);
      scroller.removeEventListener("pointerup", onPointerUp);
      scroller.removeEventListener("touchstart", onPointerDown as EventListener);
      scroller.removeEventListener("touchend", onPointerUp as EventListener);
    };
  }, [testimonials.length]);

  // Manage auto-advance interval and respond to pause state reliably
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || testimonials.length < 2) return;

    const firstCard = scroller.firstElementChild as HTMLElement | null;
    if (!firstCard) return;

    const step = () => {
      const cardWidth = firstCard.getBoundingClientRect().width;
      const cardGap = Number.parseFloat(getComputedStyle(scroller).columnGap || getComputedStyle(scroller).gap || "0") || 0;
      const next = (currentIndexRef.current + 1) % testimonials.length;
      const targetLeft = next * (cardWidth + cardGap);
      scroller.scrollTo({ left: targetLeft, behavior: "smooth" });
      currentIndexRef.current = next;
      setCurrentIndex(next);
      setTimeout(() => setCenterIndex(next), 600);
    };

    if (!isPaused) {
      intervalRef.current = window.setInterval(step, 3000) as unknown as number;
    }

    return () => {
      if (intervalRef.current != null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [testimonials.length, isPaused]);

  return (
    <div
      ref={scrollerRef}
      className="mt-8 -mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-visible px-2 py-6 [scrollbar-width:thin]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {testimonials.map((story, index) => (
        <article
          key={`${story.name}-${index}`}
          className={`relative origin-center w-[20rem] shrink-0 snap-start rounded-2xl border-4 border-[#fcc000] bg-stone-50 p-5 transition-all duration-500 sm:w-[22rem] ${
            index === centerIndex ? "z-20 scale-105 shadow-2xl" : "z-0 scale-95 opacity-50"
          }`}
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