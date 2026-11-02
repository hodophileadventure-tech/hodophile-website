import type { Metadata } from "next";

import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/page-shell";
import { PageHeroImage } from "@/components/page-hero-image";
import { absoluteUrl, blogPosts } from "@/lib/site";
import { buildPageSchema } from "@/lib/seo/structured-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

function renderInlineMarkdown(text: string, keyPrefix: string) {
  return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) {
      return part;
    }

    const [, label, href] = match;
    const key = `${keyPrefix}-${index}`;

    if (href.startsWith("/")) {
      return (
        <Link key={key} href={href} className="font-semibold text-[#806000] underline decoration-[#fcc000]/60 underline-offset-4">
          {label}
        </Link>
      );
    }

    return (
      <a key={key} href={href} target="_blank" rel="noreferrer" className="font-semibold text-[#806000] underline decoration-[#fcc000]/60 underline-offset-4">
        {label}
      </a>
    );
  });
}

function renderMarkdown(markdown: string) {
  const lines = markdown.trim().split(/\r?\n/);
  const elements = [];

  for (let index = 0; index < lines.length;) {
    const line = lines[index].trim();
    if (!line) {
      index += 1;
      continue;
    }

    const heading = line.match(/^(#{2,3})\s+(.+)$/);
    if (heading) {
      const [, marks, text] = heading;
      const className =
        marks.length === 2
          ? "mt-10 font-[var(--font-display)] text-3xl leading-tight text-stone-950 first:mt-0"
          : "mt-7 font-[var(--font-display)] text-xl leading-tight text-stone-950";
      const children = renderInlineMarkdown(text, `heading-${index}`);
      elements.push(
        marks.length === 2
          ? <h2 key={`heading-${index}`} className={className}>{children}</h2>
          : <h3 key={`heading-${index}`} className={className}>{children}</h3>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        const cells = lines[index].trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
        if (!cells.every((cell) => /^:?-{3,}:?$/.test(cell))) {
          rows.push(cells);
        }
        index += 1;
      }

      const [headers, ...bodyRows] = rows;
      if (headers) {
        elements.push(
          <div key={`table-${index}`} className="my-6 overflow-x-auto rounded-xl border border-stone-200">
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
              <thead className="bg-stone-100 text-stone-950">
                <tr>{headers.map((cell, cellIndex) => <th key={cellIndex} scope="col" className="px-4 py-3 font-semibold">{renderInlineMarkdown(cell, `table-head-${cellIndex}`)}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-stone-700">
                {bodyRows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {headers.map((_, cellIndex) => <td key={cellIndex} className="px-4 py-3">{renderInlineMarkdown(row[cellIndex] ?? "", `table-${rowIndex}-${cellIndex}`)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>,
        );
      }
      continue;
    }

    const unordered = line.match(/^[-*]\s+(.+)$/);
    const ordered = line.match(/^\d+\.\s+(.+)$/);
    if (unordered || ordered) {
      const orderedList = Boolean(ordered);
      const items: string[] = [];
      while (index < lines.length) {
        const itemLine = lines[index].trim();
        const item = orderedList
          ? itemLine.match(/^\d+\.\s+(.+)$/)
          : itemLine.match(/^[-*]\s+(.+)$/);
        if (!item) {
          break;
        }
        items.push(item[1]);
        index += 1;
      }
      const List = orderedList ? "ol" : "ul";
      elements.push(
        <List key={`list-${index}`} className={`${orderedList ? "list-decimal" : "list-disc"} my-4 space-y-2 pl-6 text-base leading-7 text-stone-700 marker:text-[#9a7600]`}>
          {items.map((item, itemIndex) => <li key={itemIndex}>{renderInlineMarkdown(item, `list-${index}-${itemIndex}`)}</li>)}
        </List>,
      );
      continue;
    }

    const paragraph: string[] = [];
    while (index < lines.length) {
      const text = lines[index].trim();
      if (
        !text ||
        /^(#{2,3})\s+/.test(text) ||
        text.startsWith("|") ||
        /^[-*]\s+/.test(text) ||
        /^\d+\.\s+/.test(text)
      ) {
        break;
      }
      paragraph.push(text);
      index += 1;
    }
    elements.push(
      <p key={`paragraph-${index}`} className="my-4 text-base leading-8 text-stone-700">
        {paragraph.map((text, paragraphIndex) => (
          <span key={paragraphIndex}>
            {paragraphIndex > 0 ? " " : ""}
            {renderInlineMarkdown(text, `paragraph-${index}-${paragraphIndex}`)}
          </span>
        ))}
      </p>,
    );
  }

  return elements;
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

  const title = post.metaTitle ?? post.title;
  const description = post.metaDescription ?? post.excerpt;

  return {
    title,
    description,
    alternates: {
      canonical: `/blogs/${post.slug}`,
    },
    openGraph: {
      title,
      description,
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
    <>
      <JsonLd
        data={[
          ...buildPageSchema({
            title: post.title,
            description: post.metaDescription ?? post.excerpt,
            url: `/blogs/${post.slug}`,
            breadcrumbs: [
              { name: "Home", url: "/" },
              { name: "Blogs", url: "/blogs" },
              { name: post.title, url: `/blogs/${post.slug}` },
            ],
          }),
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.metaDescription ?? post.excerpt,
            mainEntityOfPage: absoluteUrl(`/blogs/${post.slug}`),
            ...(post.hero ? { image: absoluteUrl(post.hero) } : {}),
            author: { "@type": "Organization", name: "Hodophile Adventures" },
            publisher: { "@type": "Organization", name: "Hodophile Adventures" },
          },
          ...(post.faqs.length > 0
            ? [{
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: post.faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: { "@type": "Answer", text: faq.answer },
                })),
              }]
            : []),
        ]}
      />
      <PageShell wide noTopPadding={Boolean(post.hero)}>
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
            {!post.contentMarkdown && (
              <h2 className="max-w-4xl font-serif text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
                {post.title}
              </h2>
            )}
            <p className="max-w-3xl text-lg leading-8 text-stone-600">{post.intro}</p>
          </div>

          <aside className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-[0_16px_36px_rgba(55,55,48,0.06)]">
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

        {post.contentMarkdown ? (
          <div className="mx-auto mt-10 max-w-4xl">
            {renderMarkdown(post.contentMarkdown)}
          </div>
        ) : (
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
            <div className="space-y-6">
              {post.sections.map((section) => (
                <section key={section.heading} className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-[0_12px_30px_rgba(55,55,48,0.04)]">
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
            <section className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-[0_12px_30px_rgba(55,55,48,0.04)]">
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

            <section className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-[0_12px_30px_rgba(55,55,48,0.04)]">
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">Frequently asked questions</h2>
              <div className="mt-4 space-y-4">
                {post.faqs.map((faq) => (
                  <div key={faq.question} className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                    <p className="font-semibold text-stone-950">{faq.question}</p>
                    <p className="mt-2 text-sm leading-7 text-stone-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-[0_12px_30px_rgba(55,55,48,0.04)]">
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">How to use this guide</h2>
              <p className="mt-4 text-sm leading-7 text-stone-600">
                Use this article as a planning reference before choosing a tour or building a custom itinerary. The article points out the travel style, timing, and pacing that usually work best for the destination, which helps make the booking process easier and more realistic.
              </p>
            </section>
            </div>
          </div>
        )}
      </article>
      </PageShell>
    </>
  );
}