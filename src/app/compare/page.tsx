import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { CompareTripsClient } from "@/components/travel-discovery";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Compare Pakistan Tour Routes",
  description: "Compare domestic Pakistan tour routes side by side with a clear overview of pricing, duration, and travel fit.",
  alternates: {
    canonical: "/compare",
  },
  openGraph: {
    title: "Compare Pakistan Tour Routes",
    description: "Pick the best match for your travel style using a side-by-side route comparison tool.",
    url: absoluteUrl("/compare"),
  },
};

export default function ComparePage() {
  return (
    <PageShell wide>
      <div className="pt-8 md:pt-10">
        <CompareTripsClient />
      </div>
    </PageShell>
  );
}
