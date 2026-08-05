import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";

import { MiqatLanding } from "@/components/miqat";
import { PageShell } from "@/components/page-shell";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "MIQAT by Hodophile | Luxury Umrah Packages",
  description:
    "MIQAT by Hodophile offers premium Umrah packages with transparent pricing, curated hospitality, and spiritually focused support.",
  alternates: {
    canonical: "/umrah-packages",
  },
  openGraph: {
    title: "MIQAT by Hodophile | Luxury Umrah Packages",
    description:
      "Begin your sacred journey with MIQAT by Hodophile through premium Umrah planning, trusted guidance, and elegant travel execution.",
    url: absoluteUrl("/umrah-packages"),
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-miqat-body",
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-miqat-heading",
  weight: ["400", "500", "600", "700"],
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
