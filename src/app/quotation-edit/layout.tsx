import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Quotation",
  robots: { index: false, follow: false },
};

export default function QuotationEditLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}