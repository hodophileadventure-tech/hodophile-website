import type { Metadata } from "next";

import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { WishlistTripsClient } from "@/components/travel-discovery";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Saved Pakistan Tour Routes",
  description: "Review your clicked travel inspirations, compare your shortlisted trips, and keep your next Pakistan journey organized.",
  alternates: {
    canonical: "/wishlist",
  },
  openGraph: {
    title: "Saved Pakistan Tour Routes",
    description: "Shortlist and revisit the trips you want to compare or book next.",
    url: absoluteUrl("/wishlist"),
  },
};

export default function WishlistPage() {
  return (
    <PageShell wide>
      <div className="pt-8 md:pt-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#8b6b00]">Saved trips</p>
            <h1 className="mt-3 font-serif text-4xl text-stone-950">Your shortlist</h1>
          </div>
          <Link href="/tours" className="text-sm font-semibold text-stone-600 transition hover:text-[#8b6b00]">
            Explore more routes
          </Link>
        </div>

        <WishlistTripsClient />
      </div>
    </PageShell>
  );
}
