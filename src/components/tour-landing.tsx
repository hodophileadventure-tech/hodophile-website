import Image from "next/image";
import Link from "next/link";
import { whatsappUrl } from "@/lib/site";

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
    <section className="overflow-hidden rounded-[2.5rem] bg-[#0b0b0b] text-white shadow-[0_30px_90px_rgba(11,11,11,0.2)]">
      <div className="grid gap-0 lg:grid-cols-[1.08fr_.92fr]">
        <div className="relative min-h-[28rem]">
          <Image src={image} alt={title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,11,0.08)_0%,rgba(11,11,11,0.58)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white lg:p-8">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="display-serif mt-4 max-w-3xl text-5xl font-normal leading-[1.02] sm:text-6xl lg:text-7xl">{title}</h1>
          </div>
        </div>

        <div className="flex flex-col justify-between p-8 lg:p-10 xl:p-12">
          <div>
            <p className="eyebrow text-[#fcc000]">Tour overview</p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/65">{description}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.22em] text-white/65"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={ctaHref}
              className="inline-flex rounded-full border border-[#fcc000] bg-[#fcc000] px-5 py-3 text-sm font-semibold !text-[#0b0b0b] shadow-[0_10px_22px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:bg-[#ffd24d]"
            >
              {ctaLabel}
            </Link>
            <a
              href={whatsappUrl(`Hi Hodophile, I'm interested in ${title}. Please share availability and booking details.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-[#b8d5bf] px-5 py-3 text-sm font-semibold text-[#b8d5bf] transition hover:border-[#fcc000] hover:bg-[#fcc000]/10 hover:text-[#fcc000]"
            >
              WhatsApp an expert
            </a>
            <Link
              href="/tours"
              className="inline-flex rounded-full border border-white/25 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-[#fcc000] hover:bg-[#fcc000]/10 hover:text-[#fcc000]"
            >
              Back to Tours
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}