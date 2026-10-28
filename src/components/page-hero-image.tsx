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
    <section className="site-hero-height theme-preserve-dark relative isolate left-1/2 flex w-screen -translate-x-1/2 overflow-hidden bg-[#090909] px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-14 lg:py-10">
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
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-3xl leading-[1.08] tracking-[-0.03em] sm:text-4xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}