import Image from "next/image";
import Link from "next/link";

type TourLandingProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  highlights: string[];
  ctaHref?: string;
  ctaLabel?: string;
};

export function TourLanding({
  eyebrow,
  title,
  description,
  image,
  highlights,
  ctaHref = "/make-my-trip",
  ctaLabel = "Request a Plan",
}: TourLandingProps) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_12px_36px_rgba(15,23,42,0.06)]">
      <div className="grid gap-0 lg:grid-cols-[1.05fr_.95fr]">
        <div className="relative min-h-[28rem]">
          <Image src={image} alt={title} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,11,0.08)_0%,rgba(11,11,11,0.58)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <p className="text-xs uppercase tracking-[0.32em] text-white/70">{eyebrow}</p>
            <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">{title}</h1>
          </div>
        </div>

        <div className="flex flex-col justify-between p-8 lg:p-10">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Tour overview</p>
            <p className="mt-4 max-w-xl text-base leading-8 text-stone-600">{description}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-stone-300 px-3 py-1 text-xs uppercase tracking-[0.22em] text-stone-600"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={ctaHref}
              className="inline-flex rounded-full border border-[#ffc000] bg-[#ffc000] px-5 py-3 text-sm font-semibold !text-[#0b0b0b] shadow-[0_10px_22px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:bg-[#ffd24d]"
            >
              {ctaLabel}
            </Link>
            <Link
              href="/tours"
              className="inline-flex rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800 transition hover:border-stone-400 hover:text-stone-900"
            >
              Back to Tours
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}