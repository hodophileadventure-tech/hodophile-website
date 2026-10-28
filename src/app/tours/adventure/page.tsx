import type { Metadata } from "next";

import { AdventureToursContent } from "@/components/adventure-tours-content";
import { PageShell } from "@/components/page-shell";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Adventure Tours in Pakistan",
  description:
    "Explore Karakoram climbing expeditions and mountain trekking itineraries to K2 Base Camp and Nanga Parbat Base Camp.",
  alternates: {
    canonical: "/tours/adventure",
  },
  openGraph: {
    title: "Adventure Tours in Pakistan",
    description:
      "Explore Karakoram climbing expeditions and mountain trekking itineraries to K2 Base Camp and Nanga Parbat Base Camp.",
    url: absoluteUrl("/tours/adventure"),
  },
};

export default function AdventureToursPage() {
  return (
    <PageShell wide noTopPadding>
      <AdventureToursContent />
    </PageShell>
  );
}
