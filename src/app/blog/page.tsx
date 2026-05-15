import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { absoluteUrl, blogPosts } from "@/lib/site";

export const metadata: Metadata = {
  title: "Travel Blog",
  description:
    "Helpful Pakistan travel articles on the best time to visit, packing lists, and choosing the right tour package.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Travel Blog",
    description:
      "Educational travel content that supports SEO and helps visitors choose the right domestic route.",
    url: absoluteUrl("/blog"),
  },
};

export default function BlogPage() {
  return (
    <PageShell wide>
      <section className="space-y-6">
        <span className="inline-flex rounded-full border border-[#fcc000]/25 bg-[#fcc000]/10 px-4 py-2 text-sm font-medium text-[#fcc000]">
          Travel blog
        </span>
        <h1 className="max-w-3xl font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
          SEO-friendly articles that support destination pages and answer real traveler questions.
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-stone-600">
          These starter articles can be turned into full posts later. For now, they give the site
          authority, fresh indexable content, and a route for long-tail search traffic.
        </p>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link
            key={post.title}
            href={`/blogs/${post.slug}`}
            className="rounded-[2rem] border border-black/10 bg-white/80 p-6 backdrop-blur"
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
