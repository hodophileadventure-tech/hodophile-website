import Image from "next/image";

type PageHeroImageProps = {
  image: string;
  imageAlt: string;
  videoSrc?: string;
  eyebrow: string;
  title: string;
  description: string;
  imageClassName?: string;
};

export function PageHeroImage({ image, imageAlt, videoSrc, eyebrow, title, description, imageClassName }: PageHeroImageProps) {
  return (
    <section className="relative isolate left-1/2 flex w-screen -translate-x-1/2 min-h-[min(760px,calc(100svh-var(--site-header-height)))] overflow-hidden bg-[#090909] px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-14 lg:py-10">
      <Image src={image} alt={imageAlt} fill preload sizes="100vw" className={`absolute inset-0 -z-20 ${imageClassName ?? "object-cover"}`} />
      {videoSrc && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={image}
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
      <div className="relative mx-auto grid w-full max-w-7xl items-center">
        <div className="max-w-4xl py-3 lg:py-10">
          <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.34em] text-[#FCC000]">
            <span className="h-px w-10 bg-[#FCC000]" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-6xl leading-[0.94] tracking-[-0.04em] sm:text-7xl lg:text-[6rem] xl:text-[6.5rem]">
            {title}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}