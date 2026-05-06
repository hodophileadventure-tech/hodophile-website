import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import { absoluteUrl } from "@/lib/site";
import { featuredTourRoutePaths, getFeaturedTourBySlug } from "@/lib/data/featured-tour-cards";

type FeaturedTourPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return featuredTourRoutePaths.map((route) => ({
    slug: route.split("/").filter(Boolean).at(-1) ?? "",
  }));
}

export async function generateMetadata({ params }: FeaturedTourPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = getFeaturedTourBySlug(slug);

  if (!tour) {
    return {};
  }

  return {
    title: tour.title,
    description: tour.summary,
    alternates: {
      canonical: `/tours/featured/${tour.slug}`,
    },
    openGraph: {
      title: tour.title,
      description: tour.summary,
      url: absoluteUrl(`/tours/featured/${tour.slug}`),
    },
  };
}

export default async function FeaturedTourPage({ params }: FeaturedTourPageProps) {
  const { slug } = await params;
  const tour = getFeaturedTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  return (
    <PageShell wide>
      <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
        <div className="relative min-h-[62vh] md:min-h-[68vh]">
          <Image
            src={tour.heroImage}
            alt={tour.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,11,0.22)_0%,rgba(11,11,11,0.72)_100%)]" />

          <div className="relative z-10 mx-auto flex min-h-[62vh] max-w-[96rem] flex-col justify-end px-4 pb-12 pt-24 text-white md:min-h-[68vh] md:px-6 lg:px-10 xl:px-14">
            <p className="text-xs uppercase tracking-[0.34em] text-white/75">Featured Tour</p>
            <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
              {tour.title}
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/85 sm:text-base">
              {tour.summary}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-[minmax(18rem,24rem)_minmax(0,1fr)] xl:gap-12">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[2rem] border border-stone-200 bg-white p-3 shadow-[0_12px_36px_rgba(15,23,42,0.08)]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#111111]">
              <Image
                src={tour.homeImage}
                alt={`${tour.title} poster`}
                fill
                sizes="(max-width: 1024px) 100vw, 24rem"
                className="object-contain object-center p-3"
              />
            </div>
          </div>

          <div className="mt-5 rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Tour Snapshot</p>
            <p className="mt-3 font-serif text-3xl text-stone-900">{tour.duration}</p>
            <p className="mt-3 text-sm leading-7 text-stone-600">{tour.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {tour.highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#fcc000]/20 bg-[#fcc000]/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-[#9c7600]"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact-us"
                className="inline-flex rounded-full bg-[#0b0b0b] px-5 py-3 text-sm font-semibold !text-white transition hover:bg-black"
              >
                Request This Tour
              </Link>
              <Link
                href="/tours"
                className="inline-flex rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800 transition hover:border-stone-400 hover:text-stone-900"
              >
                Back to Tours
              </Link>
            </div>
          </div>
        </aside>

        <div>
          <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.06)] md:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Itinerary</p>
            <h2 className="mt-3 font-serif text-3xl text-stone-900">Day-by-day plan for this route</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-600">
              A clear overview of how the journey flows, from departure through the scenic highlights and return.
            </p>

            <div className="mt-8 grid gap-4">
              {tour.itinerary.map((item) => (
                <article
                  key={`${tour.slug}-${item.day}`}
                  className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5"
                >
                  <p className="text-[11px] uppercase tracking-[0.34em] text-[#a37a00]">{item.day}</p>
                  <h3 className="mt-2 text-xl font-semibold text-stone-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-600">{item.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-[2rem] border border-[#fcc000] bg-[#fff8df] p-6 shadow-sm md:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Need changes?</p>
            <h2 className="mt-3 font-serif text-3xl text-stone-900">We can tailor this itinerary for your dates and group size.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-700">
              Open the trip builder and we will adjust hotels, transport, and pacing to match your preferred budget.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}