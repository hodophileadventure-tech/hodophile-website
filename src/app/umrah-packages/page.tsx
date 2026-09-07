import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";

import { MiqatLanding } from "@/components/miqat";
import { PageShell } from "@/components/page-shell";

const miqatSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://hodophile.pk";

export const metadata: Metadata = {
  title: "MIQAT by Hodophile | Luxury Umrah Packages",
  description:
    "MIQAT by Hodophile offers premium Umrah packages with transparent pricing, curated hospitality, and spiritually focused support.",
  alternates: {
    canonical: `${miqatSiteUrl}/umrah-packages`,
  },
  openGraph: {
    title: "MIQAT by Hodophile | Luxury Umrah Packages",
    description:
      "Begin your sacred journey with MIQAT by Hodophile through premium Umrah planning, trusted guidance, and elegant travel execution.",
    url: `${miqatSiteUrl}/umrah-packages`,
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-miqat-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-miqat-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function UmrahPackagesPage() {
  return (
    <div className={`${inter.variable} ${cormorant.variable}`}>
      <PageShell wide noTopPadding>
        <MiqatLanding />
      </PageShell>
    </div>
  );
}
