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
  imageHeight = "h-64 sm:h-[19rem]",
  bodyClassName = "p-6 sm:p-8",
  children,
}: JourneyCardProps) {
  const card = (
    <article id={id} className={`group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-[#d4b34d]/25 bg-[#141414] text-white shadow-[0_22px_60px_rgba(0,0,0,0.2)] transition duration-500 hover:-translate-y-1 hover:border-[#c7a32a] hover:shadow-[0_30px_75px_rgba(0,0,0,0.36)] ${className}`}>
      <div className={`relative ${imageHeight} shrink-0 overflow-hidden bg-[#161616]`}>
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
        {(badge || counter) ? (
          <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-5 sm:p-6">
            {badge ? (
              <span className="rounded-full border border-white/30 bg-black/30 px-3.5 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                {badge}
              </span>
            ) : <span />}
            {counter ? (
              <span className="font-[var(--font-display)] text-sm tracking-[0.18em] text-white">
                {counter}
              </span>
            ) : null}
          </div>
        ) : null}
        <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
          {eyebrow ? (
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/75">{eyebrow}</p>
          ) : null}
          <h3 className={`${eyebrow ? "mt-2" : ""} font-[var(--font-display)] text-3xl leading-[1.02] tracking-[-0.02em] sm:text-4xl`}>
            {title}
          </h3>
          {imageCaption ? (
            <div className="mt-3 text-sm font-medium text-white/85">{imageCaption}</div>
          ) : null}
        </div>
      </div>
      {children ? (
        <div className={`relative flex flex-1 flex-col ${glassBody ? "isolate overflow-hidden bg-black/40" : ""} ${bodyClassName}`}>
          {glassBody && image ? (
            <>
              <Image
                src={image}
                alt=""
                fill
                sizes={imageSizes}
                aria-hidden="true"
                className="absolute inset-0 -z-20 scale-110 object-cover opacity-75 blur-xl"
              />
              <div className="absolute inset-0 -z-10 bg-black/45 backdrop-blur-sm" aria-hidden="true" />
            </>
          ) : null}
          <div className={glassBody ? "relative z-10 flex flex-1 flex-col" : "contents"}>
            {children}
          </div>
        </div>
      ) : null}
    </article>
  );

  return href ? (
    <Link href={href} className="group block h-full rounded-[1.25rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FCC000]">
      {card}
    </Link>
  ) : card;
}
