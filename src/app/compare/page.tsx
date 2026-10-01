import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { CompareTripsClient } from "@/components/travel-discovery";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Compare Pakistan Tour Routes",
  description: "Compare domestic Pakistan tour packages by listed price, duration, route, and optional fit to your explicit preferences.",
  alternates: {
    canonical: "/compare",
  },
  openGraph: {
    title: "Compare Pakistan Tour Routes",
    description: "Review objective route details and see how selected journeys fit the preferences you choose.",
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
