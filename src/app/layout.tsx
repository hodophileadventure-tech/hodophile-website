import type { Metadata } from "next";
import "./globals.css";

import { siteConfig } from "@/lib/site";
import { AnalyticsScripts } from "@/components/AnalyticsScripts";
import { DealsPopup } from "@/components/deals-popup";
import { FloatingCtaBar } from "@/components/floating-cta-bar";
import { LeadCapturePopup } from "@/components/lead-capture-popup";

const GA_TRACKING_ID =
  process.env.NEXT_PUBLIC_GA_TRACKING_ID || process.env.NEXT_PUBLIC_GA_ID;
const FACEBOOK_PIXEL_ID =
  process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "1993102121396051";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [
    "Pakistan tours",
    "domestic travel",
    "Hunza tours",
    "Skardu tours",
    "travel agency Pakistan",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.webp", type: "image/webp" },
    ],
    apple: "/logo.webp",
  },
  openGraph: {
    type: "website",
    title: siteConfig.name,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#f7f6f2] text-stone-900">
        <AnalyticsScripts gaTrackingId={GA_TRACKING_ID} facebookPixelId={FACEBOOK_PIXEL_ID} />
        {FACEBOOK_PIXEL_ID ? (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
              alt="Facebook Pixel"
            />
          </noscript>
        ) : null}
        <DealsPopup />
        <LeadCapturePopup />
        <FloatingCtaBar />
        {children}
      </body>
    </html>
  );
}
