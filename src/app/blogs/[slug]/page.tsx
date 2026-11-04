import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/page-shell";
import { absoluteUrl, blogPosts } from "@/lib/site";
import { buildPageSchema } from "@/lib/seo/structured-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

function getReadingTime(post: NonNullable<ReturnType<typeof getBlogPost>>) {
  const content = [
    post.intro,
    post.contentMarkdown ?? "",
    ...post.sections.flatMap((section) => [section.heading, ...section.body]),
    ...post.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join(" ");
  const wordCount = content.trim().split(/\s+/).length;

  return Math.max(1, Math.ceil(wordCount / 200));
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
        <Link key={key} href={href} className="font-semibold text-[#fcc000] underline decoration-[#fcc000]/60 underline-offset-4">
          {label}
        </Link>
      );
    }

    return (
      <a key={key} href={href} target="_blank" rel="noreferrer" className="font-semibold text-[#fcc000] underline decoration-[#fcc000]/60 underline-offset-4">
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
          ? "mt-12 font-[var(--font-display)] text-3xl leading-tight text-white first:mt-0 sm:text-4xl"
          : "mt-8 font-[var(--font-display)] text-2xl leading-tight text-white";
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
          <div key={`table-${index}`} className="my-8 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
              <thead className="bg-white/[0.06] text-white">
                <tr>{headers.map((cell, cellIndex) => <th key={cellIndex} scope="col" className="px-4 py-3 font-semibold">{renderInlineMarkdown(cell, `table-head-${cellIndex}`)}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-white/70">
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
        <List key={`list-${index}`} className={`${orderedList ? "list-decimal" : "list-disc"} my-6 space-y-3 pl-6 text-base leading-8 text-white/70 marker:text-[#fcc000]`}>
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
      <p key={`paragraph-${index}`} className="my-6 text-base leading-8 text-white/70 sm:text-[1.0625rem] sm:leading-9">
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

  const readingTime = getReadingTime(post);

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
        <header className="theme-preserve-dark relative isolate mx-auto flex min-h-[34rem] max-w-[96rem] flex-col items-start justify-between overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b0b0b] px-6 py-7 shadow-[0_30px_90px_rgba(0,0,0,0.38)] sm:min-h-[38rem] sm:rounded-[2rem] sm:px-10 sm:py-10 lg:px-16 lg:py-12">
          {post.hero && (
            <Image
              src={post.hero}
              alt={post.heroAlt || post.title}
              fill
              preload
              sizes="(max-width: 1024px) 100vw, 96rem"
              className="absolute inset-0 -z-20 object-cover"
            />
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,8,8,0.94)_0%,rgba(8,8,8,0.74)_46%,rgba(8,8,8,0.12)_100%),linear-gradient(0deg,rgba(8,8,8,0.76)_0%,transparent_62%)]"
          />
          <nav aria-label="Breadcrumb" className="relative flex items-center gap-2 text-xs font-medium tracking-wide text-white/55">
            <Link href="/" className="transition hover:text-[#fcc000]">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/blogs" className="transition hover:text-[#fcc000]">Journal</Link>
            <span aria-hidden="true">/</span>
            <span className="max-w-[14rem] truncate text-white/80 sm:max-w-none">{post.category}</span>
          </nav>
          <div className="max-w-4xl">
            <p className="inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#fcc000]">
              <span className="h-px w-8 bg-[#fcc000]" aria-hidden="true" />
              {post.category}
            </p>
            <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-4xl leading-[1.08] tracking-[-0.035em] text-white sm:text-5xl lg:text-7xl">
              {post.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
              {post.excerpt}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/20 pt-5 text-xs font-medium text-white/70 sm:mt-10">
              <span className="text-white">Hodophile Editorial</span>
              <span className="hidden h-1 w-1 rounded-full bg-[#fcc000] sm:block" aria-hidden="true" />
              <span>{readingTime} min read</span>
              <span className="hidden h-1 w-1 rounded-full bg-[#fcc000] sm:block" aria-hidden="true" />
              <span>{post.destinations.join(" · ")}</span>
            </div>
          </div>
        </header>

        <article className="theme-preserve-dark mx-auto mt-5 max-w-[96rem] rounded-[1.5rem] border border-white/10 bg-[#080808] px-6 py-10 sm:mt-7 sm:rounded-[2rem] sm:px-10 sm:py-14 lg:px-16 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-16">
            <div className="min-w-0">
              <p className="mb-9 border-l-2 border-[#fcc000] pl-5 font-[var(--font-display)] text-xl leading-8 text-white/90 sm:mb-12 sm:pl-7 sm:text-2xl sm:leading-9">
                {post.intro}
              </p>

              {post.contentMarkdown ? (
                <div>{renderMarkdown(post.contentMarkdown)}</div>
              ) : (
                <div className="space-y-12">
                  {post.sections.map((section) => (
                    <section key={section.heading} className="border-t border-white/10 pt-8 first:border-0 first:pt-0">
                      <h2 className="font-[var(--font-display)] text-3xl leading-tight text-white sm:text-4xl">
                        {section.heading}
                      </h2>
                      <div className="mt-5 space-y-5 text-base leading-8 text-white/70 sm:text-[1.0625rem] sm:leading-9">
                        {section.body.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              )}
            </div>

            <aside className="space-y-5 lg:sticky lg:top-8 lg:self-start">
              <section className="theme-preserve-dark rounded-[1.5rem] border border-white/10 bg-[linear-gradient(145deg,rgba(252,192,0,0.09),rgba(255,255,255,0.025)_48%,rgba(255,255,255,0.015))] p-6 sm:p-7">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-[#fcc000]">At a glance</p>
                <h2 className="mt-3 font-[var(--font-display)] text-2xl text-white">The essentials</h2>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">Destinations</p>
                  <p className="mt-2 text-sm leading-6 text-white/80">{post.destinations.join(", ")}</p>
                </div>
                <div className="mt-5 border-t border-white/10 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">Good to know</p>
                  <ul className="mt-3 space-y-3">
                    {post.highlights.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-white/75">
                        <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#fcc000]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {!post.contentMarkdown && (
                <>
                  <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 sm:p-7">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-[#fcc000]">A thoughtful trip starts here</p>
                    <h2 className="mt-3 font-[var(--font-display)] text-2xl leading-tight text-white">Make the journey your own.</h2>
                    <p className="mt-3 text-sm leading-7 text-white/60">
                      Use this guide to set your pace, then explore a route that fits your travel style.
                    </p>
                    <Link href="/tours" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#fcc000] transition hover:gap-3">
                      Explore Pakistan tours <span aria-hidden="true">→</span>
                    </Link>
                  </section>

                  <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 sm:p-7">
                    <h2 className="font-[var(--font-display)] text-2xl text-white">Frequently asked questions</h2>
                    <div className="mt-5 space-y-5">
                      {post.faqs.map((faq) => (
                        <div key={faq.question} className="border-t border-white/10 pt-4 first:border-0 first:pt-0">
                          <p className="text-sm font-semibold leading-6 text-white">{faq.question}</p>
                          <p className="mt-2 text-sm leading-6 text-white/60">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              )}
            </aside>
          </div>
        </article>
      </PageShell>
    </>
  );
}