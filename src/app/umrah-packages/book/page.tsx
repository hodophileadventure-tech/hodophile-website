import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";

import { PageHeroImage } from "@/components/page-hero-image";
import { PageShell } from "@/components/page-shell";
import { UmrahBookingForm } from "@/components/umrah-booking-form";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "MIQAT by Hodophile | Book Your Umrah Package",
  description:
    "Book your MIQAT by Hodophile package with a dedicated form for hotel distance, transportation, and airline preferences.",
  alternates: {
    canonical: "/umrah-packages/book",
  },
  openGraph: {
    title: "MIQAT by Hodophile | Book Your Umrah Package",
    description:
      "Submit your Umrah travel details for MIQAT by Hodophile with hotel distance selection, transfer preferences, and airline choice.",
    url: absoluteUrl("/umrah-packages/book"),
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

export default function UmrahBookingPage() {
  return (
    <div className={`${inter.variable} ${cormorant.variable}`}>
      <PageShell wide noTopPadding>
        <PageHeroImage
          image="/images/miqat/miqat-booking-header.jpg"
          imageAlt="MIQAT by Hodophile Umrah booking form"
          imageClassName="object-contain object-center"
          eyebrow="MIQAT Booking"
          title="Reserve your Umrah details with a dedicated MIQAT package form."
          description="Choose hotel distances, transportation preferences, airline routing, and passenger details in one elegant booking experience."
        />

        <UmrahBookingForm />
      </PageShell>
    </div>
  );
}
