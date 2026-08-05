"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type FeaturedJourney = {
  title: string;
  name: string;
  image: string;
  href: string;
  duration: string;
  priceFrom: string;
};

type FeaturedJourneysCarouselProps = {
  tours: FeaturedJourney[];
};

export function FeaturedJourneysCarousel({ tours }: FeaturedJourneysCarouselProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) {
          return;
        }

        const index = Number(visible.target.getAttribute("data-index"));
        if (!Number.isNaN(index)) {
          setActiveIndex(index);
        }
      },
      {
        root: carousel,
        threshold: [0.5],
      },
    );

    cardRefs.current.forEach((card) => card && observer.observe(card));

    return () => observer.disconnect();
  }, [tours]);

  const scrollToIndex = (index: number) => {
    const carousel = carouselRef.current;
    const card = cardRefs.current[index];

    if (!carousel || !card) {
      return;
    }

    carousel.scrollTo({ left: card.offsetLeft - 16, behavior: "smooth" });
  };

  const handlePrev = () => scrollToIndex(Math.max(0, activeIndex - 1));
  const handleNext = () => scrollToIndex(Math.min(tours.length - 1, activeIndex + 1));

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      handleNext();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      handlePrev();
    }
  };

  const progressPercentage = ((activeIndex + 1) / tours.length) * 100;

  return (
    <section className="mt-[6rem] overflow-hidden bg-[#fbf7f1] px-6 pb-10 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.32em] text-stone-700/80">
            FEATURED JOURNEYS
          </p>
          <h2 className="mt-4 text-3xl font-medium tracking-[-0.03em] text-stone-950 sm:text-4xl">
            Journeys worth taking.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600">
            Discover the routes our travellers return to.
          </p>
        </div>

        <div className="mt-10 overflow-hidden">
          <div
            ref={carouselRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="flex gap-6 overflow-x-auto pb-6 pr-4 scroll-smooth snap-x snap-mandatory touch-pan-x"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {tours.map((tour, index) => (
              <div
                key={tour.name}
                ref={(element) => {
                  if (!element) return;
                  cardRefs.current[index] = element;
                }}
                data-index={index}
                className="group relative snap-start shrink-0 min-w-[88vw] max-w-[1050px] rounded-[22px] overflow-hidden border border-white/10 bg-[#111111] shadow-[0_22px_55px_rgba(15,23,42,0.08)] md:min-w-[70vw] xl:min-w-[68vw]"
              >
                <div className="relative h-[52rem] min-h-[28rem] md:h-[56rem] lg:h-[60rem]">
                  <Image
                    src={tour.image}
                    alt={tour.name}
                    fill
                    sizes="(max-width: 768px) 88vw, (max-width: 1280px) 70vw, 68vw"
                    className="absolute inset-0 object-cover transition duration-800 ease-out group-hover:scale-[1.03]"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.26),transparent_36%),linear-gradient(180deg,transparent_36%,rgba(0,0,0,0.56))]" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <div className="max-w-2xl">
                    <p className="text-xs uppercase tracking-[0.36em] text-white/70">
                      0{index + 1} / {String(tours.length).padStart(2, "0")}
                    </p>
                    <h3 className="mt-4 text-4xl font-normal leading-[0.95] text-white sm:text-[4.4rem]">
                      {tour.name}
                    </h3>
                    <p className="mt-5 text-sm uppercase tracking-[0.28em] text-white/75 sm:text-base">
                      {tour.duration} · {tour.priceFrom.toUpperCase()}
                    </p>
                    <div className="mt-8 inline-flex items-center gap-3 text-sm uppercase tracking-[0.32em] text-white transition duration-200 group-hover:text-[#fcc000]">
                      <span>Explore journey</span>
                      <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </div>

                <Link href={tour.href} className="absolute inset-0 z-10" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-stone-200/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4 text-sm uppercase tracking-[0.28em] text-stone-700">
            <span className="font-semibold text-stone-900">{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className="hidden h-px w-20 bg-stone-300 sm:inline-block" />
            <span>{String(tours.length).padStart(2, "0")} journeys</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="text-sm uppercase tracking-[0.28em] text-stone-700 transition hover:text-stone-950 disabled:cursor-not-allowed disabled:text-stone-400"
            >
              ← previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={activeIndex === tours.length - 1}
              className="text-sm uppercase tracking-[0.28em] text-stone-700 transition hover:text-stone-950 disabled:cursor-not-allowed disabled:text-stone-400"
            >
              next →
            </button>
          </div>
        </div>

        <div className="mt-4 h-[2px] overflow-hidden rounded-full bg-stone-200">
          <div
            className="h-full rounded-full bg-[#fcc000] transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </section>
  );
}
