"use client";

import { useEffect, useRef, useState } from "react";

type LazyBackgroundVideoProps = {
  src: string;
  poster: string;
  className?: string;
  posterAlt?: string;
};

export function LazyBackgroundVideo({ src, poster, className = "", posterAlt = "" }: LazyBackgroundVideoProps) {
  const [loadVideo, setLoadVideo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Start loading when element enters viewport
          setLoadVideo(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <img
        src={poster}
        alt={posterAlt}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {loadVideo ? (
        <video
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={src.replace(".mp4", ".webm")} type="video/webm" />
          <source src={src} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
