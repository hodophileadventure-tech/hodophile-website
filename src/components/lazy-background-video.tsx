"use client";

type LazyBackgroundVideoProps = {
  src: string;
  poster: string;
  className?: string;
  posterAlt?: string;
};

export function LazyBackgroundVideo({ src, poster, className = "", posterAlt = "" }: LazyBackgroundVideoProps) {
  const videoType = src.toLowerCase().endsWith(".webm") ? "video/webm" : "video/mp4";

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
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover z-0"
      >
        <source src={src} type={videoType} />
      </video>
    </div>
  );
}
