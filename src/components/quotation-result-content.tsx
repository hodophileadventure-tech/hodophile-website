"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { routes } from "@/lib/data/routes";
import { formatPKR } from "@/lib/currency";
import { siteConfig, whatsappUrl } from "@/lib/site";
import type { CustomCityHotelStay } from "@/lib/data/custom-city-stays";
import { decodeBase64Json } from "@/lib/base64-json";

interface QuotationDisplayData {
  routeId?: string;
  promoCode?: string;
  hotelId?: string;
  hotelCategory?: string;
  numberOfRooms?: number;
  customCities?: string[];
  customRouteLabel?: string;
  multiCityNights?: Record<string, number>;
  multiCityHotels?: Record<string, { hotelId: string; roomId: string }>;
  singleCityHotelStays?: Array<{ hotelId: string; roomId: string; nights: number }>;
  customCityHotelStays?: CustomCityHotelStay[];
  routeDestinations?: string[];
  includeIslamabadTransit?: boolean;
  destination?: string;
  details?: {
    numberOfGuests?: number;
    roomType?: string;
    accommodationType?: string;
    vehicle?: string;
    hotel?: string;
  };
  adults?: number;
  kids?: number;
  perPersonCost?: number;
  totalCost?: number;
  hotelCost?: number;
  breakfastCost?: number;
  promotion?: {
    code: string;
    discountPercent: number;
    discountAmount: number;
    originalPrice: number;
  };
  travelMode?: "road" | "air";
  startingPoint?: string;
  tripDate?: string;
  quoteNumber?: string;
  customerName?: string;
  customerPhone?: string;
  vehicleName?: string;
  roomType?: string;
  tourStartingPoint?: string;
  jeepAddons?: Array<{ id: string; quantity: number }>;
  jeepRideNames?: string[];
}

export function QuotationResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [quotation, setQuotation] = useState<QuotationDisplayData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isCurrent = true;
    const loadQuotation = async () => {
      let isAirQuote = false;
      try {
        const quotationData = searchParams.get("data");
        if (!quotationData) {
          router.push("/make-my-trip");
          return;
        }
        const decoded = decodeBase64Json(quotationData) as QuotationDisplayData;
        const quoteNumber = decoded.quoteNumber || `Q${Date.now().toString().slice(-6)}`;
        isAirQuote = decoded.travelMode === "air";
        const requiresServerCalculation =
          decoded.travelMode === "air" ||
          (typeof decoded.promoCode === "string" && decoded.promoCode.length > 0);
        if (requiresServerCalculation) {
          const response = await fetch("/api/quote/calc", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              routeId: decoded.routeId,
              vehicleName: decoded.vehicleName,
              hotelId: decoded.hotelId,
              roomId: decoded.roomType,
              hotelCategory: decoded.hotelCategory,
              singleCityHotelStays: decoded.singleCityHotelStays,
              customCityHotelStays: decoded.customCityHotelStays,
              multiCityHotels: decoded.multiCityHotels,
              multiCityNights: decoded.multiCityNights,
              customCities: decoded.customCities,
              customRouteLabel: decoded.customRouteLabel,
              travelMode: decoded.travelMode,
              startingPoint: decoded.startingPoint,
              routeDestinations: decoded.routeDestinations,
              includeIslamabadTransit: decoded.includeIslamabadTransit,
              numberOfRooms: decoded.numberOfRooms,
              adults: decoded.adults,
              kids: decoded.kids,
              tripDate: decoded.tripDate,
              promoCode: decoded.promoCode,
              jeepAddons: decoded.jeepAddons,
            }),
          });
          const result = await response.json();
          if (!response.ok || !result.success) {
            if (decoded.travelMode === "air") {
              if (isCurrent) setLoadError(result.error || "Unable to validate the Skardu road route.");
              return;
            }
            router.push("/make-my-trip");
            return;
          }
          if (isCurrent) {
            setQuotation({
              ...decoded,
              ...result.quotation,
              quoteNumber: result.quotation?.quoteNumber || quoteNumber,
            });
          }
        } else if (isCurrent) {
          setQuotation({ ...decoded, quoteNumber });
        }
      } catch (error) {
        console.error("Failed to parse quotation data:", error);
        if (isAirQuote) {
          if (isCurrent) setLoadError("Unable to load this quotation. Please return to Make My Trip and try again.");
        } else {
          router.push("/make-my-trip");
        }
      } finally {
        if (isCurrent) setLoading(false);
      }
    };

    void loadQuotation();
    return () => {
      isCurrent = false;
    };
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--surface-page)] flex items-center justify-center">
        <div className="animate-pulse text-stone-600">Loading quotation...</div>
      </div>
    );
  }

  if (!quotation) {
    return loadError ? (
      <div className="min-h-screen bg-[var(--surface-page)] px-4 py-10">
        <div role="alert" className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-white p-6 text-red-800 shadow">
          <p className="font-semibold">Quotation unavailable</p>
          <p className="mt-2 text-sm">{loadError}</p>
          <button type="button" onClick={() => router.push("/make-my-trip")} className="mt-4 rounded-full bg-[#fcc000] px-5 py-2 text-sm font-semibold text-black">
            Return to Make My Trip
          </button>
        </div>
      </div>
    ) : null;
  }

  const isCustomItinerary =
    quotation.routeId === "custom-itinerary" &&
    Array.isArray(quotation.customCities) &&
    quotation.customCities.length > 0;
  const route = isCustomItinerary ? undefined : routes.find((r) => r.id === quotation.routeId);
  const packageName = isCustomItinerary
    ? quotation.customRouteLabel || quotation.customCities?.join(" + ") || "Custom Package"
    : route?.name || quotation.destination || "Unknown";
  const multiCityNightCount = Object.values(quotation.multiCityNights || {}).reduce(
    (total, nights) => total + Math.max(0, nights),
    0,
  );
  const singleCityHotelNightCount = (quotation.singleCityHotelStays || []).reduce(
    (total, stay) => total + Math.max(0, stay.nights),
    0,
  );
  const tripNights = isCustomItinerary
    ? Math.max(multiCityNightCount, singleCityHotelNightCount)
    : Math.max(0, (route?.duration || 1) - 1);
  const tripDays = isCustomItinerary ? Math.max(1, tripNights + 1) : route?.duration || 0;
  const packageNameWithoutDuration = packageName.replace(
    /^\d+\s*days?(?:\s*\/\s*\d+\s*nights?)?\s*[·-]?\s*/i,
    "",
  );
  const durationLabel = `${tripDays} Day${tripDays === 1 ? "" : "s"} / ${tripNights} Night${tripNights === 1 ? "" : "s"} Trip`;
  const routeName = tripDays > 0
    ? `${durationLabel} · ${packageNameWithoutDuration || packageName}`
    : packageName;
  const numberOfGuests = quotation.details?.numberOfGuests ?? ((quotation.adults || 0) + (quotation.kids || 0));
  const perPersonPrice = quotation.perPersonCost ?? 0;
  const totalAmount = quotation.totalCost ?? 0;
  const promotion = quotation.promotion;
  const travelMode = quotation.travelMode || "road";
  const departureLocation = quotation.startingPoint || quotation.destination || "To be confirmed";
  const tripDate = quotation.tripDate
    ? new Date(`${quotation.tripDate}T00:00:00`).toLocaleDateString("en-GB")
    : "To be confirmed";
  const quoteNumber = quotation.quoteNumber || "Q";
  const quoteDate = new Date().toLocaleDateString("en-GB");
  const jeepRideNames = quotation.jeepRideNames ?? [];
  const inclusions = [
    `${quotation.vehicleName || "Selected car"} with fuel and toll tax`,
    "Breakfast",
    ...(jeepRideNames.length > 0
      ? [`Jeep ride${jeepRideNames.length === 1 ? "" : "s"}: ${jeepRideNames.join(", ")}`]
      : []),
    ...(quotation.hotelCost && quotation.hotelCost > 0 ? ["Hotel accommodation"] : []),
  ];

  const handleWhatsApp = () => {
    const promoDetails = promotion
      ? ` Promo code ${promotion.code} applied: ${promotion.discountPercent}% off. Original total ${formatPKR(promotion.originalPrice)}, discount ${formatPKR(promotion.discountAmount)}, final total ${formatPKR(totalAmount)}.`
      : "";
    const airDetails = travelMode === "air"
      ? " Travel Mode: By Air. Arrival & Departure Hub: Skardu. Air Tickets: NOT INCLUDED. Air tickets to and from Skardu are not included in this quotation. Customers are responsible for arranging their own flight tickets."
      : "";
    const message = `Hi Hodophile, I would like to confirm the quotation for ${routeName}. Quote number: ${quoteNumber}.${airDetails}${promoDetails} Please share the final trip details and next steps.`;
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="quotation-page pdf-page">
      <article className="quotation-canvas pdf-canvas">
        <header className="quotation-brand">
          <Image
            src="/images/package-cards/logo-transparent.webp"
            alt="Hodophile Adventures logo"
            width={300}
            height={140}
            className="quotation-logo"
          />
          <div className="quotation-brand-copy">
            <h1>Hodophile Adventures</h1>
            <p>The Perfect Experience</p>
            <span>Government License# 5436</span>
          </div>
        </header>

        <main className="quotation-content">
          <section className="quotation-header-info">
            <div className="quotation-header-top">
              <div className="quotation-customer">
                <strong>To, {quotation.customerName || "Customer"}</strong>
                <p>Cell# {quotation.customerPhone || "—"}</p>
                <p>{departureLocation}</p>
              </div>
              <div className="quotation-title">
                <h2>Quotation</h2>
                <p><strong>Quote #</strong> {quoteNumber}</p>
                <p><strong>Quote Date</strong> {quoteDate}</p>
              </div>
            </div>
          </section>

          <table className="pdf-main-table">
            <thead>
              <tr>
                <th className="quotation-item-column">Item</th>
                <th>Description</th>
                <th className="quotation-unit-column">Price</th>
                <th className="quotation-quantity-column">No. of Person(s)</th>
                <th className="quotation-amount-column">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="quotation-package-row">
                <td><strong>1</strong></td>
                <td>
                  <strong>{routeName}</strong>
                  <div className="quotation-notes">
                    <strong>NOTES:</strong>
                    {quotation.hotelCost && quotation.hotelCost > 0 ? (
                      <p>Accommodation Type: {quotation.details?.accommodationType || quotation.details?.roomType || quotation.roomType || "To be confirmed"}</p>
                    ) : null}
                    {quotation.breakfastCost ? <p>Breakfast: {formatPKR(quotation.breakfastCost)}</p> : null}
                    <p>Transportation Type: {quotation.details?.vehicle || quotation.vehicleName || "To be confirmed"}</p>
                    <p>Departure Location: {departureLocation}</p>
                    <p>Trip Date: {tripDate}</p>
                    {quotation.tourStartingPoint ? <p>Tour starts: {quotation.tourStartingPoint}</p> : null}
                    {travelMode === "air" ? <p className="quotation-air-note">Air tickets to and from Skardu are not included.</p> : null}
                  </div>
                </td>
                <td className="quotation-number">{formatPKR(perPersonPrice)}</td>
                <td className="quotation-number">{numberOfGuests}</td>
                <td className="quotation-number"><strong>{formatPKR(totalAmount)}</strong></td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2} className="quotation-inclusions">
                  <strong>Package includes:</strong>
                  <ul>
                    {inclusions.map((item) => <li key={item}>- {item}</li>)}
                  </ul>
                  {promotion ? <p className="quotation-promotion">{promotion.code} discount applied.</p> : null}
                  <strong>Quotation valid for confirmation and booking.</strong>
                </td>
                <td colSpan={3} className="quotation-total-cell">
                  <div className="quotation-total">
                    <span>Quote Total</span>
                    <strong>{formatPKR(totalAmount)}</strong>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </main>

        <div className="quotation-accreditations" aria-label="Licensing and affiliations">
          <Image src="/images/footer/govt-pakistan.webp" alt="Government of Pakistan" width={80} height={72} />
          <Image src="/images/footer/taap-logo.webp" alt="TAAP" width={100} height={72} />
          <Image src="/images/footer/affiliation-pato.webp" alt="PATO" width={90} height={72} />
        </div>
        <footer className="quotation-footer">
          <span>hodophile.pk</span>
          <span>{siteConfig.email}</span>
          <span>{siteConfig.phone}</span>
          <span>{siteConfig.location}</span>
        </footer>

        <div className="quotation-actions">
          <button
            onClick={() => window.print()}
            className="rounded-full bg-[#fcc000] px-8 py-3 text-sm font-semibold text-black transition hover:bg-[#e4b200]"
          >
            Print Quotation / Save PDF
          </button>
          <button
            onClick={handleWhatsApp}
            className="rounded-full border border-stone-300 bg-white px-8 py-3 text-sm font-semibold text-stone-900 transition hover:bg-stone-100"
          >
            Share on WhatsApp
          </button>
        </div>
      </article>
    </div>
  );
}
