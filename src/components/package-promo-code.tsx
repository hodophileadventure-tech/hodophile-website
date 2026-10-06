"use client";

import { useState } from "react";

import { formatPKR } from "@/lib/currency";
import { whatsappUrl } from "@/lib/site";
import type { PromoValidationResult, PromotionSummary } from "@/lib/promotions/promotion-types";
import { normalizePromotionPhone } from "@/lib/promotions/promotion-phone";

export function PackagePromoCode({ tourId, initialCode }: { tourId: string; initialCode: string }) {
  const [code, setCode] = useState(initialCode);
  const [phone, setPhone] = useState("");
  const [promotion, setPromotion] = useState<PromotionSummary | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);

  const applyCode = async () => {
    const normalizedPhone = normalizePromotionPhone(phone);
    if (!normalizedPhone) {
      setError("Enter a valid phone number to check this promo code.");
      return;
    }

    setIsLoading(true);
    setError("");
    setPromotion(null);

    try {
      const response = await fetch("/api/promotions/validate-package", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tourId, promoCode: code, phone: normalizedPhone }),
      });
      const result = await response.json() as PromoValidationResult;

      if (!response.ok || !result.valid) {
        setError(result.valid ? "Unable to apply this promo code." : result.error);
        return;
      }

      setPromotion(result);
      setCode(result.code);
    } catch {
      setError("Unable to validate this promo code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const requestTour = async () => {
    if (!promotion) return;

    setIsRedeeming(true);
    setError("");

    try {
      const response = await fetch("/api/promotions/redeem-package", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tourId, promoCode: promotion.code, phone }),
      });
      const result = await response.json() as {
        success?: boolean;
        promotion?: PromotionSummary;
        error?: string;
      };

      if (!response.ok || !result.success || !result.promotion) {
        setError(result.error || "Unable to submit this promo request. Please try again.");
        return;
      }

      const confirmedPromotion = result.promotion;
      window.location.assign(whatsappUrl(
        `Hi Hodophile, I would like to request ${tourId} with promo code ${confirmedPromotion.code}. Server-validated listed price: ${formatPKR(confirmedPromotion.originalPrice)} per person; ${confirmedPromotion.discountPercent}% discount: ${formatPKR(confirmedPromotion.discountAmount)}; discounted listed price: ${formatPKR(confirmedPromotion.finalPrice)} per person.`,
      ));
    } catch {
      setError("Unable to submit this promo request. Please try again.");
    } finally {
      setIsRedeeming(false);
    }
  };

  return (
    <section className="mt-4 border-t border-[#fcc000]/25 pt-4" aria-label="Promotional discount">
      <label htmlFor="package-promo-phone" className="block text-xs font-semibold text-stone-900">Phone number</label>
      <input
        id="package-promo-phone"
        type="tel"
        value={phone}
        onChange={(event) => { setPhone(event.target.value); setPromotion(null); setError(""); }}
        disabled={isLoading || isRedeeming}
        placeholder="03XX XXXXXXX"
        autoComplete="tel"
        className="mt-2 min-h-10 w-full border border-stone-300 bg-white px-3 text-xs text-stone-900 outline-none placeholder:text-stone-400 focus:border-[#b98d00] focus:ring-2 focus:ring-[#fcc000]/25 disabled:bg-stone-100"
      />
      <label htmlFor="package-promo-code" className="block text-xs font-semibold text-stone-900">Promo code</label>
      <div className="mt-2 flex gap-2">
        <input
          id="package-promo-code"
          value={code}
          onChange={(event) => { setCode(event.target.value); setPromotion(null); setError(""); }}
          disabled={isLoading || isRedeeming || Boolean(promotion)}
          placeholder="Enter promo code"
          autoComplete="off"
          className="min-h-10 min-w-0 flex-1 border border-stone-300 bg-white px-3 text-xs uppercase tracking-[0.08em] text-stone-900 outline-none placeholder:normal-case placeholder:tracking-normal focus:border-[#b98d00] focus:ring-2 focus:ring-[#fcc000]/25 disabled:bg-stone-100"
        />
        {promotion ? (
          <button type="button" onClick={() => { setCode(""); setPromotion(null); }} disabled={isRedeeming} className="min-h-10 border border-stone-300 px-3 text-xs font-semibold text-stone-700 hover:border-stone-500 disabled:opacity-50">Remove</button>
        ) : (
          <button type="button" onClick={applyCode} disabled={isLoading || isRedeeming || !code.trim()} className="min-h-10 bg-stone-950 px-4 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-600">{isLoading ? "Checking…" : "Apply"}</button>
        )}
      </div>
      {error ? <p role="alert" className="mt-2 text-xs font-medium text-red-700">{error}</p> : null}
      {promotion ? (
        <div className="mt-3 space-y-2 border-t border-stone-200 pt-3 text-xs" aria-live="polite">
          <p className="font-semibold text-[#32633e]">✓ {promotion.code} applied · {promotion.discountPercent}% off</p>
          <div className="flex justify-between gap-3"><span className="text-stone-600">Original price per person</span><span className="text-stone-600 line-through">{formatPKR(promotion.originalPrice)}</span></div>
          <div className="flex justify-between gap-3"><span className="text-stone-600">Promo discount</span><span className="font-semibold text-[#32633e]">−{formatPKR(promotion.discountAmount)}</span></div>
          <div className="flex justify-between gap-3 border-t border-stone-200 pt-2"><span className="font-semibold text-stone-900">Final price per person</span><span className="font-bold text-stone-950">{formatPKR(promotion.finalPrice)}</span></div>
          <p className="text-[10px] leading-4 text-stone-500">Price is per person. Final itinerary and availability are confirmed by the travel team.</p>
          <button
            type="button"
            onClick={requestTour}
            disabled={isRedeeming}
            className="mt-3 inline-flex min-h-10 w-full items-center justify-center bg-stone-950 px-3 text-xs font-semibold text-white hover:bg-stone-800 disabled:cursor-wait disabled:opacity-70"
          >
            {isRedeeming ? "Submitting request…" : "Request this tour on WhatsApp"}
          </button>
        </div>
      ) : null}
    </section>
  );
}