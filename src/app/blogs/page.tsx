import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHeroImage } from "@/components/page-hero-image";
import { PageShell } from "@/components/page-shell";
import { absoluteUrl, blogPosts } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Travel tips and Pakistan planning articles for domestic routes, packing, and trip preparation.",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "Blogs",
    description: "Helpful articles that support domestic Pakistan travel planning.",
    url: absoluteUrl("/blogs"),
  },
};

export default function BlogsPage() {
  return (
    <PageShell wide>
      <PageHeroImage
        image="/images/editorial/editorial-2.webp"
        imageAlt="Valley road through mountains"
        eyebrow="Blogs"
        title="Travel stories and practical guides for better domestic trip planning."
        description="Short travel articles that support route pages and answer common planning questions before booking."
      />

      <section className="mt-12 grid gap-6 lg:grid-cols-3 mx-auto max-w-[96rem] px-6 lg:px-8 xl:px-10">
        {blogPosts.map((post) => (
          <Link
            key={post.title}
            href={`/blogs/${post.slug}`}
            className="group overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-[0_16px_36px_rgba(55,55,48,0.06)] transition hover:-translate-y-1 hover:border-[#d9a407]/60 hover:shadow-[0_22px_48px_rgba(55,55,48,0.1)]"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-stone-100">
              <Image src={post.hero ?? "/images/editorial/editorial-2.webp"} alt={post.heroAlt || post.title} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b6b00]">{post.category}</p>
              <h2 className="mt-3 font-serif text-2xl leading-tight text-stone-950">{post.title}</h2>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-stone-600">{post.excerpt}</p>
              <div className="mt-5 flex items-center justify-between gap-3 border-t border-stone-200 pt-4">
                <span className="text-xs font-semibold text-stone-500">{post.destinations.join(" · ")}</span>
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-stone-900">Read article ↗</span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </PageShell>
  );
}