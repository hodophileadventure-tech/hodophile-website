import Image from "next/image";

type PageHeroImageProps = {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  description: string;
  imageClassName?: string;
};

export function PageHeroImage({ image, imageAlt, eyebrow, title, description, imageClassName }: PageHeroImageProps) {
  return (
    <section className="relative isolate overflow-hidden rounded-[2rem] bg-black shadow-[0_24px_70px_rgba(11,11,11,0.16)]">
      <div className="relative min-h-[27rem] sm:min-h-[32rem] lg:min-h-[36rem]">
        <Image src={image} alt={imageAlt} fill preload sizes="100vw" className={imageClassName ?? "object-cover"} />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.65)_48%,rgba(0,0,0,0.2)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(252,192,0,0.12),transparent_34%)]" />

        <div className="relative z-10 flex min-h-[27rem] items-center px-6 py-12 sm:min-h-[32rem] sm:px-10 sm:py-14 lg:min-h-[36rem] lg:px-16">
          <div className="max-w-4xl text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#FCC000] sm:text-sm">{eyebrow}</p>
            <h1 className="mt-5 max-w-4xl font-[var(--font-miqat-heading)] text-[clamp(2.5rem,6vw,5.5rem)] font-normal leading-[0.98] tracking-[-0.035em]">{title}</h1>
            <div className="mt-6 h-[2px] w-16 bg-[#FCC000] sm:w-[6.75rem]" aria-hidden="true" />
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}