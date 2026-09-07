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
    <section className="relative overflow-hidden rounded-[1.5rem] bg-[#101010] shadow-[0_24px_70px_rgba(11,11,11,0.16)]">
      <div className="relative min-h-[22rem] sm:min-h-[24rem]">
        <Image src={image} alt={imageAlt} fill sizes="100vw" className={imageClassName ?? "object-cover"} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,11,0.22)_0%,rgba(11,11,11,0.62)_100%)]" />

        <div className="relative z-10 flex min-h-[24rem] items-end p-7 sm:min-h-[28rem] sm:p-12 lg:p-16">
          <div className="max-w-5xl text-white">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="display-serif mt-4 max-w-5xl text-5xl font-normal leading-[1.02] sm:text-6xl lg:text-7xl">{title}</h1>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-white/85 sm:text-base">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}