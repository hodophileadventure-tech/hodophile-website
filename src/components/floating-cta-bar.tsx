"use client";

import Link from "next/link";

import { trackEvent } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/site";

export function FloatingCtaBar() {
  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-1.25rem)] max-w-xl -translate-x-1/2 md:bottom-6">
      <div className="flex items-center justify-between gap-2 rounded-full border border-[#fcc000]/50 bg-[#121212]/95 px-2 py-2 shadow-[0_18px_40px_rgba(0,0,0,0.28)] backdrop-blur-md">
        <a
          href={whatsappUrl("Hi Hodophile, I want to plan a Pakistan trip and need a quick quote.")}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent("whatsapp_cta_click", { placement: "floating_cta" })}
          className="inline-flex flex-1 items-center justify-center rounded-full bg-[#fcc000] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-black transition hover:bg-[#ffd454]"
        >
          WhatsApp us
        </a>
        <Link
          href="/make-my-trip"
          onClick={() => trackEvent("custom_trip_cta_click", { placement: "floating_cta" })}
          className="inline-flex flex-1 items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-white/10"
        >
          Plan my trip
        </Link>
      </div>
    </div>
  );
}
