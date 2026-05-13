"use client";

import { useEffect, useState } from "react";

type LazyBackgroundVideoProps = {
  src: string;
  poster: string;
  className?: string;
  posterAlt?: string;
};

export function LazyBackgroundVideo({ src, poster, className = "", posterAlt = "" }: LazyBackgroundVideoProps) {
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setLoadVideo(true);
    }, 700);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={poster}
        alt={posterAlt}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {loadVideo ? (
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
    </div>
  );
}
