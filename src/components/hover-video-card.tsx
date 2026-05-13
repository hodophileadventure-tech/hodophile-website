"use client";

import Link from "next/link";
import { useRef, useState } from "react";

type HoverVideoCardProps = {
  titleParts: string[];
  name: string;
  image: string;
  href: string;
  hoverVideo?: string;
};

export function HoverVideoCard({ titleParts, name, image, href, hoverVideo }: HoverVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Ignore autoplay restrictions; fallback remains poster image.
      });
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="overflow-hidden rounded-xl border-4 border-[#fcc000] bg-white shadow-[0_4px_14px_rgba(15,23,42,0.08)] flex flex-col h-full group"
    >
      <div className="relative h-[240px] overflow-hidden bg-stone-100">
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          sizes="(max-width: 1280px) 50vw, 25vw"
          className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.02]"
        />
        {hoverVideo ? (
          <video
            ref={videoRef}
            src={hoverVideo}
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 h-full w-full object-cover object-center transition duration-700 ${hovered ? "opacity-100" : "opacity-0"}`}
          />
        ) : null}
      </div>
      <div className="p-5 flex flex-col justify-between gap-5 flex-1">
        <h3 className="text-center text-lg font-semibold leading-7 text-black">
          {titleParts.length > 1 ? (
            <>
              <span className="block">{titleParts[0]}</span>
              <span className="block">{titleParts[1]}</span>
            </>
          ) : (
            name
          )}
        </h3>
        <Link
          href={href}
          className="inline-flex w-full items-center justify-center rounded-md bg-[#fcc000] px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] !text-black transition hover:bg-[#ffd24d]"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
