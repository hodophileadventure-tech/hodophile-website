import type { Metadata } from "next";

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
    <PageShell>
      <PageHeroImage
        image="/images/editorial/editorial-2.jpg"
        imageAlt="Valley road through mountains"
        eyebrow="Blogs"
        title="Travel stories and practical guides for better domestic trip planning."
        description="Short travel articles that support route pages and answer common planning questions before booking."
      />

      <section className="mt-12 grid gap-6 lg:grid-cols-3 mx-auto max-w-7xl px-6 lg:px-8">
        {blogPosts.map((post) => (
          <article
            key={post.title}
            className="rounded-[2rem] border border-black/10 bg-white/80 p-6 backdrop-blur"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-[#fcc000]/75">{post.category}</p>
            <h2 className="mt-4 text-2xl font-semibold">{post.title}</h2>
            <p className="mt-3 text-sm leading-6 text-stone-600">{post.excerpt}</p>
          </article>
        ))}
      </section>
    </PageShell>
  );
}