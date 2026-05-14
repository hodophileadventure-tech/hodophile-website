"use client";

type LazyBackgroundVideoProps = {
  src: string;
  poster: string;
  className?: string;
  posterAlt?: string;
};

export function LazyBackgroundVideo({ src, poster, className = "", posterAlt = "" }: LazyBackgroundVideoProps) {
  return (
    <div className={`relative overflow-hidden w-full h-full ${className}`}>
      <img
        src={poster}
        alt={posterAlt}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover z-0"
      />
      <video
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover z-0"
      >
        <source src={src.replace(".mp4", ".webm")} type="video/webm" />
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
