import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import { PageHeroImage } from "@/components/page-hero-image";
import { absoluteUrl, blogPosts } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Blog Article Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blogs/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: absoluteUrl(`/blogs/${post.slug}`),
    },
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <PageShell wide>
      {post.hero && (
        <div className="mb-8">
          <PageHeroImage
            image={post.hero}
            imageAlt={post.heroAlt || post.title}
            eyebrow={post.category}
            title={post.title}
            description={post.excerpt}
          />
        </div>
      )}

      <article className="mx-auto max-w-[96rem] px-6 lg:px-8 xl:px-10 py-6 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-start">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-[#fcc000]/25 bg-[#fcc000]/10 px-4 py-2 text-sm font-medium text-[#8a6a12]">
              {post.category}
            </span>
            <h1 className="max-w-4xl font-serif text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
              {post.title}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-stone-600">{post.intro}</p>
          </div>

          <aside className="rounded-[2rem] border-4 border-[#fcc000] bg-white/85 p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-[#8a6a12]">Quick facts</p>
            <div className="mt-4 space-y-4 text-sm text-stone-700">
              <div>
                <p className="font-semibold text-stone-950">Destinations covered</p>
                <p className="mt-1">{post.destinations.join(", ")}</p>
              </div>
              <div>
                <p className="font-semibold text-stone-950">Why people book it</p>
                <ul className="mt-2 space-y-2">
                  {post.highlights.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#fcc000]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <div className="space-y-6">
            {post.sections.map((section) => (
              <section key={section.heading} className="rounded-[2rem] border-4 border-[#fcc000] bg-white/85 p-6">
                <h2 className="text-2xl font-semibold tracking-tight text-stone-950">{section.heading}</h2>
                <div className="mt-4 space-y-4 text-base leading-8 text-stone-600">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="space-y-6">
            <section className="rounded-[2rem] border-4 border-[#fcc000] bg-white/85 p-6">
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">Planning notes</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-stone-600">
                <p>
                  For domestic Pakistan travel, the best results usually come from route-first planning: choose the destination order, match the transport to the group size, and keep hotel stays aligned with the number of nights in each city.
                </p>
                <p>
                  These guides are written to help travelers understand what each destination feels like in practice, not just what it looks like in photos. That makes it easier to compare trips, set expectations, and pick the right itinerary length.
                </p>
              </div>
            </section>

            <section className="rounded-[2rem] border-4 border-[#fcc000] bg-white/85 p-6">
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">Frequently asked questions</h2>
              <div className="mt-4 space-y-4">
                {post.faqs.map((faq) => (
                  <div key={faq.question} className="rounded-2xl border border-[#fcc000]/30 bg-[#fcc000]/5 p-4">
                    <p className="font-semibold text-stone-950">{faq.question}</p>
                    <p className="mt-2 text-sm leading-7 text-stone-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border-4 border-[#fcc000] bg-white/85 p-6">
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">How to use this guide</h2>
              <p className="mt-4 text-sm leading-7 text-stone-600">
                Use this article as a planning reference before choosing a tour or building a custom itinerary. The article points out the travel style, timing, and pacing that usually work best for the destination, which helps make the booking process easier and more realistic.
              </p>
            </section>
          </div>
        </div>
      </article>
    </PageShell>
  );
}