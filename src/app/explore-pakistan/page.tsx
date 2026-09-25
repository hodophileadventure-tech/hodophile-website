import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { ExplorePakistanPageContent } from "@/components/explore-pakistan-page";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Explore Pakistan | Private & Custom Pakistan Tours | Hodophile",
  description:
    "Discover Pakistan with Hodophile. Explore private, customized and expertly planned journeys across Hunza, Skardu, the Karakoram and beyond.",
  alternates: {
    canonical: "/explore-pakistan",
  },
  openGraph: {
    title: "Explore Pakistan | Private & Custom Pakistan Tours | Hodophile",
    description:
      "Discover Pakistan with Hodophile. Explore private, customized and expertly planned journeys across Hunza, Skardu, the Karakoram and beyond.",
    url: absoluteUrl("/explore-pakistan"),
  },
};

export default function ExplorePakistanPage() {
  return (
    <PageShell wide>
      <ExplorePakistanPageContent />
    </PageShell>
  );
}
