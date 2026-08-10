import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { siteConfig } from "@/lib/site";
import { AnalyticsScripts } from "@/components/AnalyticsScripts";
import { DealsPopup } from "@/components/deals-popup";
import { JsonLd } from "@/components/JsonLd";
import { LeadCapturePopup } from "@/components/lead-capture-popup";

const GA_TRACKING_ID =
  process.env.NEXT_PUBLIC_GA_TRACKING_ID || process.env.NEXT_PUBLIC_GA_ID;
const FACEBOOK_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

const poppins = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  viewport: 'width=device-width, initial-scale=1',
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
      { url: "/logo.png", type: "image/png" },
    ],
    apple: "/logo.png",
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
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    areaServed: siteConfig.location,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
  };

  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f7f6f2] text-stone-900">
        <JsonLd data={[organizationSchema, websiteSchema]} />
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
        {children}
      </body>
    </html>
  );
}
