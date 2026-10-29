import type { Metadata } from "next";

import {
  generateMetadata as generateNorthernAirTourMetadata,
  NorthernAirTourPage,
} from "@/app/tours/northern-tours/by-air/[slug]/page";

const params = Promise.resolve({ slug: "skardu-hunza-8-days" });

export async function generateMetadata(): Promise<Metadata> {
  return generateNorthernAirTourMetadata({ params });
}

export default function SkarduHunzaTourPage() {
  return NorthernAirTourPage({ params });
}
