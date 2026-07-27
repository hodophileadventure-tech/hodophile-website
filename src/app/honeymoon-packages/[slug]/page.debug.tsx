import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: { slug: string } };

const packages: Record<string, { title: string }> = {
  "swat-kalam-4days": { title: "Swat & Kalam — 4 Days" },
  "naran-babusar-4days": { title: "Naran & Babusar — 4 Days" },
  "kashmir-arangkel-5days": { title: "Kashmir Arang Kel — 5 Days" },
};

export async function generateStaticParams() {
  return Object.keys(packages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pkg = packages[params.slug];
  if (!pkg) return {};
  return {
    title: pkg.title,
  };
}

export default function PackagePage({ params }: Props) {
  const pkg = packages[params.slug];
  if (!pkg) notFound();

  return (
    <div>
      <h1>{pkg.title}</h1>
      <p>Slug: {params.slug}</p>
    </div>
  );
}
