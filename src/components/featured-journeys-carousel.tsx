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
    <section className="mt-16 overflow-hidden bg-[#fbf7f1] px-6 pb-10 lg:px-8">
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
                className="group relative snap-start shrink-0 min-w-[88vw] max-w-[760px] rounded-[22px] overflow-hidden border border-stone-200 bg-white text-stone-950 shadow-[0_22px_55px_rgba(15,23,42,0.08)] md:min-w-[48vw] xl:min-w-[38vw]"
              >
                <div className="relative h-40 sm:h-48 md:h-52">
                  <Image
                    src={tour.image}
                    alt={tour.name}
                    fill
                    sizes="(max-width: 768px) 88vw, (max-width: 1280px) 70vw, 68vw"
                    className="absolute inset-0 object-cover transition duration-800 ease-out group-hover:scale-[1.03]"
                    priority={index === 0}
                  />
                </div>

                <div className="p-4 sm:p-5">
                  <div className="max-w-2xl">
                    <p className="text-[0.65rem] uppercase tracking-[0.24em] text-stone-500">
                      0{index + 1} / {String(tours.length).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 line-clamp-2 text-xl font-semibold leading-tight text-stone-950 sm:text-2xl">
                      {tour.name}
                    </h3>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-stone-600">
                      {tour.duration} · {tour.priceFrom.toUpperCase()}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-800 transition duration-200 group-hover:text-[#806000]">
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
              className="text-sm uppercase tracking-[0.28em] text-stone-700 transition hover:text-stone-950 disabled:cursor-not-allowed disabled:text-stone-500 disabled:opacity-100"
            >
              ← previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={activeIndex === tours.length - 1}
              className="text-sm uppercase tracking-[0.28em] text-stone-700 transition hover:text-stone-950 disabled:cursor-not-allowed disabled:text-stone-500 disabled:opacity-100"
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
