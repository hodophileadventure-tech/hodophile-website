"use client";

import { useState } from "react";

import { formatPKR } from "@/lib/currency";
import type { QuotationBreakdown } from "@/lib/pricingEngine";
import { RouteVisualizer } from "./route-visualizer";

type JourneyStop = {
  name: string;
  nights?: number;
};

type JourneySummaryProps = {
  routeLabel: string;
  stops: JourneyStop[];
  date: string;
  duration: string;
  guests: number;
  hotelDetails: string[];
  travelMode: string;
  hotelCategory: string;
  vehicle: string;
  quotation: QuotationBreakdown | null;
  priceAdjustment: number;
  onReview: () => void;
};

function SummaryContent({
  routeLabel,
  stops,
  date,
  duration,
  guests,
  hotelDetails,
  travelMode,
  hotelCategory,
  vehicle,
  quotation,
  priceAdjustment,
  onReview,
}: JourneySummaryProps) {
  const total = quotation ? quotation.totalCost + priceAdjustment : 0;

  return (
    <>
      <div className="flex items-center justify-between gap-3 border-b border-stone-200 pb-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500">Your journey</p>
          <p className="mt-1 font-serif text-xl text-stone-950">A trip taking shape</p>
        </div>
        <span aria-hidden="true" className="text-lg text-[#9a7600]">✦</span>
      </div>

      <div className="mt-4">
        <p className="mb-3 text-sm font-semibold leading-5 text-stone-900">{routeLabel}</p>
        <RouteVisualizer stops={stops} />
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-x-3 gap-y-4 border-y border-stone-200 py-4">
        <div>
          <dt className="text-[9px] font-semibold uppercase tracking-[0.14em] text-stone-500">Dates</dt>
          <dd className="mt-1 text-xs font-medium text-stone-900">{date || "Not selected"}</dd>
        </div>
        <div>
          <dt className="text-[9px] font-semibold uppercase tracking-[0.14em] text-stone-500">Duration</dt>
          <dd className="mt-1 text-xs font-medium text-stone-900">{duration || "To be planned"}</dd>
        </div>
        <div>
          <dt className="text-[9px] font-semibold uppercase tracking-[0.14em] text-stone-500">Travellers</dt>
          <dd className="mt-1 text-xs font-medium text-stone-900">{guests} {guests === 1 ? "traveller" : "travellers"}</dd>
        </div>
        <div>
          <dt className="text-[9px] font-semibold uppercase tracking-[0.14em] text-stone-500">Arrival</dt>
          <dd className="mt-1 text-xs font-medium capitalize text-stone-900">By {travelMode}</dd>
        </div>
        <div>
          <dt className="text-[9px] font-semibold uppercase tracking-[0.14em] text-stone-500">Stay</dt>
          <dd className="mt-1 text-xs font-medium capitalize text-stone-900">{hotelCategory}</dd>
        </div>
        <div>
          <dt className="text-[9px] font-semibold uppercase tracking-[0.14em] text-stone-500">Vehicle</dt>
          <dd className="mt-1 text-xs font-medium text-stone-900">{vehicle || "Not selected"}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-[9px] font-semibold uppercase tracking-[0.14em] text-stone-500">Hotels & rooms</dt>
          <dd className="mt-1 space-y-1 text-xs font-medium text-stone-900">
            {hotelDetails.length ? hotelDetails.map((detail) => <span key={detail} className="block break-words">{detail}</span>) : "Not selected"}
          </dd>
        </div>
      </dl>

      {quotation ? (
        <div className="mt-4" aria-live="polite">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-stone-500">Estimated investment</p>
          {quotation.promotion ? <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#32633e]">{quotation.promotion.code} · {quotation.promotion.discountPercent}% off</p> : null}
          <p className="mt-1 font-serif text-2xl tabular-nums text-stone-950">{formatPKR(total)}</p>
          {quotation.promotion ? <p className="mt-1 text-[10px] text-stone-500 line-through">Original {formatPKR(quotation.promotion.originalPrice + priceAdjustment)}</p> : null}
          <p className="mt-1 text-[11px] text-stone-600">{formatPKR(quotation.perPersonCost + priceAdjustment / Math.max(1, guests))} per person</p>
          <div className="mt-3 space-y-1.5 border-t border-stone-200 pt-3 text-xs">
            {quotation.promotion ? <div className="flex justify-between gap-3"><span className="text-stone-600">{quotation.promotion.discountPercent}% promo discount</span><span className="font-medium text-[#32633e]">−{formatPKR(quotation.promotion.discountAmount)}</span></div> : null}
            <div className="flex justify-between gap-3"><span className="text-stone-600">Transport</span><span className="font-medium text-stone-900">{formatPKR(quotation.transportCost)}</span></div>
            <div className="flex justify-between gap-3"><span className="text-stone-600">Accommodation</span><span className="font-medium text-stone-900">{formatPKR(quotation.hotelCost)}</span></div>
            {quotation.jeepAddonsCost > 0 ? <div className="flex justify-between gap-3"><span className="text-stone-600">Activities</span><span className="font-medium text-stone-900">{formatPKR(quotation.jeepAddonsCost)}</span></div> : null}
          </div>
        </div>
      ) : (
        <p className="mt-4 text-xs leading-5 text-stone-500">Your estimate appears once the required route, stay, travellers, and vehicle details are selected.</p>
      )}

      <button
        type="button"
        onClick={onReview}
        className="mt-4 inline-flex min-h-11 w-full items-center justify-center bg-stone-950 px-4 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#262626] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b6b00]"
      >
        Review journey
      </button>
    </>
  );
}

export function JourneySummary(props: JourneySummaryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const total = props.quotation ? props.quotation.totalCost + props.priceAdjustment : null;

  return (
    <>
      <aside className="sticky top-24 hidden self-start border border-stone-200 bg-[#fffdf8] p-5 lg:block" aria-label="Live journey summary">
        <SummaryContent {...props} />
      </aside>

      <section className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-300 bg-[#fffdf8] shadow-[0_-10px_30px_rgba(0,0,0,0.12)] lg:hidden" aria-label="Live journey summary">
        <div className="mx-auto max-w-3xl px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsExpanded((current) => !current)}
              aria-expanded={isExpanded}
              className="flex min-h-12 min-w-0 flex-1 items-center justify-between gap-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8b6b00]"
            >
              <span className="min-w-0">
                <span className="block truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-500">Your journey · {props.guests} travellers</span>
                <span className="mt-0.5 block truncate text-sm font-semibold text-stone-950">{total === null ? "Estimate in progress" : formatPKR(total)}</span>
              </span>
              <span aria-hidden="true" className="shrink-0 text-lg leading-none">{isExpanded ? "−" : "+"}</span>
            </button>
            <button type="button" onClick={props.onReview} className="min-h-11 shrink-0 bg-stone-950 px-4 text-[10px] font-semibold uppercase tracking-[0.1em] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b6b00]">Review</button>
          </div>
          {isExpanded ? (
            <div className="max-h-[58dvh] overflow-y-auto border-t border-stone-200 pb-3 pt-4">
              <SummaryContent {...props} />
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}