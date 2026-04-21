import Image from "next/image";

type PageHeroImageProps = {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHeroImage({ image, imageAlt, eyebrow, title, description }: PageHeroImageProps) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_12px_36px_rgba(15,23,42,0.08)]">
      <div className="relative min-h-[22rem] sm:min-h-[24rem]">
        <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,11,0.22)_0%,rgba(11,11,11,0.62)_100%)]" />

        <div className="relative z-10 flex min-h-[22rem] items-end p-7 sm:min-h-[24rem] sm:p-10">
          <div className="max-w-3xl text-white">
            <p className="text-xs uppercase tracking-[0.32em] text-white/75">{eyebrow}</p>
            <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">{title}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}