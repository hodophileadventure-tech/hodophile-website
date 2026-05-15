import type { Metadata } from "next";
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
        image="/images/editorial/editorial-2.jpg"
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
            className="rounded-[2rem] border border-black/10 bg-white/80 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-[#fcc000]/50 hover:shadow-lg"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-[#fcc000]/75">{post.category}</p>
            <h2 className="mt-4 text-2xl font-semibold">{post.title}</h2>
            <p className="mt-3 text-sm leading-6 text-stone-600">{post.excerpt}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {post.destinations.map((destination) => (
                <span key={destination} className="rounded-full border border-[#fcc000]/30 bg-[#fcc000]/10 px-3 py-1 text-xs font-medium text-[#8a6a12]">
                  {destination}
                </span>
              ))}
            </div>
            <ul className="mt-5 space-y-2 text-sm leading-6 text-stone-600">
              {post.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#fcc000]" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </section>
    </PageShell>
  );
}