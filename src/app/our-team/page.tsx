import type { Metadata } from "next";

import { AboutTeamShowcase } from "@/components/about-team-showcase";
import { PageHeroImage } from "@/components/page-hero-image";
import { PageShell } from "@/components/page-shell";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the leadership, travel specialists, operations team, and creative professionals behind Hodophile Adventures.",
  alternates: {
    canonical: "/our-team",
  },
  openGraph: {
    title: "Our Team",
    description:
      "Meet the people behind Hodophile Adventures and the domestic Pakistan travel experiences we plan and deliver.",
    url: absoluteUrl("/our-team"),
  },
};

export default function OurTeamPage() {
  return (
    <PageShell wide>
      <PageHeroImage
        image="/images/team/our-team-header.webp"
        imageAlt="Hodophile Adventures travel team"
        eyebrow="Our Team"
        title="The people behind the journey."
        description="Meet the leadership, planning, operations, technology, and creative team behind Hodophile Adventures."
      />

      <section className="mt-10">
        <AboutTeamShowcase />
      </section>
    </PageShell>
  );
}
