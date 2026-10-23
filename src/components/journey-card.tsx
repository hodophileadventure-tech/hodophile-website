import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type JourneyCardProps = {
  id?: string;
  href?: string;
  className?: string;
  image?: string;
  imageAlt: string;
  title: string;
  eyebrow?: string;
  imageCaption?: ReactNode;
  badge?: ReactNode;
  counter?: ReactNode;
  media?: ReactNode;
  glassBody?: boolean;
  imageSizes?: string;
  imageHeight?: string;
  bodyClassName?: string;
  children?: ReactNode;
};

export function JourneyCard({
  id,
  href,
  className = "",
  image,
  imageAlt,
  title,
  eyebrow,
  imageCaption,
  badge,
  counter,
  media,
  glassBody = true,
  imageSizes = "(max-width: 768px) 100vw, 50vw",
  imageHeight = "aspect-square",
  bodyClassName = "p-4 sm:p-5",
  children,
}: JourneyCardProps) {
  const card = (
    <article id={id} className={`journey-card group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-[#d4b34d]/25 bg-[#141414] text-white shadow-[0_22px_60px_rgba(0,0,0,0.2)] transition duration-500 hover:-translate-y-1 hover:border-[#c7a32a] hover:shadow-[0_30px_75px_rgba(0,0,0,0.36)] ${className}`}>
      <div className={`journey-card-image relative ${imageHeight} shrink-0 overflow-hidden bg-[#161616]`}>
        {media ? (
          <div className="absolute inset-0">{media}</div>
        ) : image ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes={imageSizes}
            className="object-cover transition duration-1000 group-hover:scale-[1.05]"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_20%,rgba(206,170,75,0.3),transparent_35%),linear-gradient(135deg,#111723,#2b3140_62%,#71603f)]" />
        )}
      </div>
      <div className={`journey-card-body relative flex flex-1 flex-col ${glassBody ? "bg-[#1c190f]" : ""} ${bodyClassName}`}>
        {(badge || counter) ? (
          <div className="mb-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs">
            {badge ? (
              <span className="rounded-full border border-[#fcc000]/30 bg-[#fcc000]/10 px-2.5 py-1 font-semibold uppercase tracking-[0.12em] text-[#fcc000]">
                {badge}
              </span>
            ) : null}
            {counter ? (
              <span className="font-medium text-white/70">{counter}</span>
            ) : null}
          </div>
        ) : null}
        {eyebrow || title || imageCaption ? (
          <div>
            {eyebrow ? (
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.15em] text-white/65">{eyebrow}</p>
            ) : null}
            <h3 className={`${eyebrow ? "mt-1" : ""} line-clamp-2 font-[var(--font-display)] text-xl leading-tight tracking-[-0.01em] sm:text-2xl`}>
              {title}
            </h3>
            {imageCaption ? (
              <div className="mt-2 text-xs font-medium text-white/75">{imageCaption}</div>
            ) : null}
          </div>
        ) : null}
        {children}
      </div>
    </article>
  );

  return href ? (
    <Link href={href} className="group block h-full rounded-[1.25rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FCC000]">
      {card}
    </Link>
  ) : card;
}
