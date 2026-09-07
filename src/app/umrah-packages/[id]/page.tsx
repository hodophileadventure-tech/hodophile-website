import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import { formatPKR } from "@/lib/currency";
import { getUmrahPackage, umrahPackages } from "@/lib/data/umrah-packages";
import { whatsappUrl } from "@/lib/site";

type PageProps = { params: Promise<{ id: string }> };
const miqatSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://hodophile.pk";

export function generateStaticParams() {
  return umrahPackages.map((pkg) => ({ id: pkg.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const pkg = getUmrahPackage(id);
  if (!pkg) return {};

  const title = `${pkg.name} ${pkg.duration}-Day Umrah Package | MIQAT by Hodophile`;
  const description = `${pkg.name} ${pkg.duration}-day Umrah package with Makkah and Madinah hotel options and Quint, Quad, Triple, and Double room pricing.`;
  return {
    title,
    description,
    alternates: { canonical: `${miqatSiteUrl}/umrah-packages/${pkg.id}` },
    openGraph: { title, description, url: `${miqatSiteUrl}/umrah-packages/${pkg.id}`, type: "website" },
  };
}

export default async function UmrahPackageDetailPage({ params }: PageProps) {
  const { id } = await params;
  const pkg = getUmrahPackage(id);
  if (!pkg) notFound();

  const inquiry = `Hi Hodophile, I'm interested in the ${pkg.name} ${pkg.duration}-day Umrah package. Please share availability and booking details.`;
  const prices = Object.entries(pkg.prices) as Array<[keyof typeof pkg.prices, number]>;

  return (
    <PageShell wide>
      <main className="bg-[#f4f1eb] text-[#111]">
        <section className="border-b border-[#d6d1c5] px-4 py-16 sm:px-8 lg:px-14">
          <div className="mx-auto max-w-5xl">
            <Link href="/umrah-packages" className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8b7000] hover:text-black">Back to MIQAT packages</Link>
            <div className="mt-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#777]">{pkg.originalTier} tier · {pkg.duration} days</p>
                <h1 className="mt-3 font-[var(--font-miqat-heading)] text-5xl sm:text-7xl">{pkg.name}</h1>
                <p className="mt-4 max-w-xl text-lg leading-8 text-[#5d5a54]">{pkg.tagline}. A clear package view for your accommodation and room occupancy choices.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/umrah-packages/book" className="bg-[#FCC000] px-5 py-3 text-sm font-semibold text-black hover:bg-[#e6b100]">Get package details</Link>
                <a href={whatsappUrl(inquiry)} target="_blank" rel="noopener noreferrer" className="border border-[#111] px-5 py-3 text-sm font-semibold hover:bg-[#111] hover:text-white">WhatsApp MIQAT</a>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-8 lg:px-14">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8b7000]">Package overview</p>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div className="border border-[#d6d1c5] bg-white p-6"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#777]">Makkah hotel</p><p className="mt-3 text-xl font-semibold">{pkg.makkah.hotel}</p><p className="mt-2 text-sm text-[#666]">Listed distance: {pkg.makkah.distance}</p></div>
              <div className="border border-[#d6d1c5] bg-white p-6"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#777]">Madinah hotel</p><p className="mt-3 text-xl font-semibold">{pkg.madinah.hotel}</p><p className="mt-2 text-sm text-[#666]">Listed distance: {pkg.madinah.distance}</p></div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#d6d1c5] bg-white px-4 py-12 sm:px-8 lg:px-14">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8b7000]">Room options and pricing</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {prices.map(([room, price]) => <div key={room} className="border border-[#dedbd2] bg-[#f7f5ef] p-5"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#777]">{room}</p><p className="mt-3 text-2xl font-semibold">{formatPKR(price)}</p><p className="mt-2 text-xs text-[#666]">per person</p></div>)}
            </div>
            <p className="mt-6 text-sm leading-7 text-[#666]">Prices are subject to availability and may change depending on travel dates and airline availability. Final hotel confirmation and booking details are reviewed with the MIQAT team.</p>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-8 lg:px-14">
          <div className="mx-auto max-w-5xl border border-[#d6d1c5] bg-[#111] p-6 text-white sm:p-8">
            <h2 className="font-[var(--font-miqat-heading)] text-3xl">Plan the next step with MIQAT.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#c8c8c8]">Share your preferred dates and requirements. Our team will review availability, routing, and final accommodation details with you.</p>
            <div className="mt-6 flex flex-wrap gap-3"><Link href="/umrah-packages/book" className="bg-[#FCC000] px-5 py-3 text-sm font-semibold text-black">Get package details</Link><a href={whatsappUrl(inquiry)} target="_blank" rel="noopener noreferrer" className="border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:border-[#FCC000] hover:text-[#FCC000]">Ask a MIQAT expert</a></div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
