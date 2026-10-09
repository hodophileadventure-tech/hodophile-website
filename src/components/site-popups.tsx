"use client";

import { usePathname } from "next/navigation";

import { DealsPopup } from "@/components/deals-popup";
import { LeadCapturePopup } from "@/components/lead-capture-popup";

export function SitePopups() {
  const pathname = usePathname();

  if (pathname === "/make-my-trip") {
    return null;
  }

  return (
    <>
      <DealsPopup />
      <LeadCapturePopup />
    </>
  );
}
