import type { Metadata } from "next";

import { AboutTeamShowcase } from "@/components/about-team-showcase";
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
      <section className="team-page-hero">
        <div className="team-page-hero-wrap">
          <img
            className="team-page-hero-image"
            src="/images/team/our-team-header.png"
            alt=""
            aria-hidden="true"
          />
        </div>
      </section>

      <section className="team-page-showcase">
        <AboutTeamShowcase />
      </section>

      <style>{`
        .team-page-hero {
          width: 100vw;
          position: relative;
          left: 50%;
          margin-left: -50vw;
        }

        .team-page-hero-wrap {
          width: 100%;
          margin: 0;
          padding: 0;
          line-height: 0;
        }

        .team-page-hero-image {
          width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
        }

        .team-page-showcase {
          margin-top: 4rem;
        }
      `}</style>
    </PageShell>
  );
}
