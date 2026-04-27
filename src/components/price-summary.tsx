"use client";

import type { QuotationBreakdown } from "@/lib/pricingEngine";
import { formatPKR } from "@/lib/pricingEngine";

interface PriceSummaryProps {
  quotation: QuotationBreakdown | null;
  isLoading?: boolean;
}

export function PriceSummary({ quotation, isLoading }: PriceSummaryProps) {
  if (isLoading) {
    return (
      <div className="rounded-[15px] border border-stone-200 bg-white p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-stone-200 rounded w-3/4"></div>
          <div className="h-4 bg-stone-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!quotation) {
    return (
      <div className="rounded-[15px] border border-stone-200 bg-white p-6 text-center text-stone-600">
        <p>Complete your trip details to see pricing</p>
      </div>
    );
  }

  const { details } = quotation;

  return (
    <div className="rounded-[15px] border border-white/20 bg-white/94 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-sm">
      {/* Trip Package Name */}
      <div className="mb-8 pb-6 border-b border-stone-200">
        <h2 className="font-serif text-2xl text-stone-900">
          📍 {details.route} in {details.hotel}
        </h2>
        <p className="text-stone-600 text-sm mt-2">
          {details.numberOfGuests} guest{details.numberOfGuests > 1 ? "s" : ""} • {details.vehicle} • {details.roomType}
        </p>
      </div>

      {/* Total Cost */}
      <div className="rounded-[10px] bg-[#fcc000]/10 p-6 text-center">
        <p className="text-stone-600 text-sm mb-3">💰 Total Trip Cost</p>
        <p className="font-serif text-4xl text-[#fcc000] font-bold">
          {formatPKR(quotation.totalCost)}
        </p>
      </div>
      </div>
    </div>
  );
}
