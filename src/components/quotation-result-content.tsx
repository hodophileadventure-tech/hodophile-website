"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { routes } from "@/lib/data/routes";
import { formatPKR } from "@/lib/currency";

export function QuotationResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [quotation, setQuotation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const quotationData = searchParams.get("data");
      if (!quotationData) {
        router.push("/make-my-trip");
        return;
      }
      const decoded = JSON.parse(atob(quotationData));
      setQuotation(decoded);
    } catch (error) {
      console.error("Failed to parse quotation data:", error);
      router.push("/make-my-trip");
    } finally {
      setLoading(false);
    }
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-stone-600">Loading quotation...</div>
      </div>
    );
  }

  if (!quotation) {
    return null;
  }

  const isCustomItinerary = Array.isArray(quotation.customCities) && quotation.customCities.length > 0;
  const route = isCustomItinerary ? undefined : routes.find((r) => r.id === quotation.routeId);
  const routeName = isCustomItinerary
    ? quotation.customRouteLabel || quotation.customCities.join(" + ") || "Custom Package"
    : route?.name || quotation.destination || "Unknown";

  const numberOfGuests = quotation.details?.numberOfGuests ?? ((quotation.adults || 0) + (quotation.kids || 0));
  const transportCost = quotation.transportCost ?? 0;
  const hotelCost = quotation.hotelCost ?? 0;
  const jeepCost = quotation.jeepAddonsCost ?? 0;
  const subtotal = quotation.subtotal ?? 0;
  const markupAmount = quotation.markupAmount ?? 0;
  const perPersonPrice = quotation.perPersonCost ?? 0;
  const totalAmount = quotation.totalCost ?? 0;
  const travelMode = quotation.travelMode || "road";
  const packageDescription = quotation.details?.vehicle
    ? `with ${quotation.details.vehicle}`
    : quotation.vehicleName
    ? `with ${quotation.vehicleName}`
    : "Package includes transport and hotel";

  const items = [
    {
      item: "Transport",
      description: quotation.details?.vehicle
        ? `Transport by ${quotation.details.vehicle}`
        : quotation.vehicleName
        ? `Transport by ${quotation.vehicleName}`
        : "Vehicle and fuel charges",
      unitPrice: "",
      quantity: "",
      amount: transportCost,
    },
    {
      item: "Hotel",
      description: quotation.details?.hotel || "Hotel accommodation",
      unitPrice: "",
      quantity: quotation.details?.numberOfRooms ?? quotation.numberOfRooms ?? "-",
      amount: hotelCost,
    },
  ];

  if (jeepCost > 0) {
    items.push({
      item: "Jeep Add-ons",
      description: "Mandatory jeep activities and optional add-ons",
      unitPrice: "",
      quantity: "",
      amount: jeepCost,
    });
  }

  const quoteNumber = `Q${Date.now().toString().slice(-6)}`;
  const quoteDate = new Date().toLocaleDateString("en-GB");

  return (
    <div className="min-h-screen bg-[#f4f4f4] py-10 px-4 print:bg-white print:py-0 print:px-0">
      <div className="mx-auto w-full max-w-[900px] bg-white border border-stone-200 shadow-xl print:shadow-none print:border-black/10 print:m-0 print:max-w-none">
        <div className="px-8 py-8 print:px-10 print:py-8">
          <div className="flex flex-wrap items-center justify-between gap-6 border-b border-stone-200 pb-6">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 overflow-hidden rounded-3xl bg-white p-3 shadow-sm">
                <Image src="/logo-transparent.png" alt="Hodophile Adventures logo" width={80} height={80} className="h-full w-full object-contain" />
              </div>
              <div>
                <h1 className="text-4xl font-black uppercase tracking-[0.12em] text-stone-950">Hodophile Adventures</h1>
                <p className="mt-1 text-sm uppercase tracking-[0.3em] text-stone-600">The Perfect Experience</p>
                <p className="mt-2 text-sm text-stone-700">Government License# 5436</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-[1.25fr_0.75fr] items-start">
            <div className="rounded-2xl border border-stone-300 bg-stone-100 p-6">
              <p className="text-2xl font-bold text-stone-900">To, {quotation.customerName ? `Mr. ${quotation.customerName}` : "Customer"}</p>
              <div className="mt-6 space-y-3 text-sm text-stone-800">
                <p>{quotation.customerPhone || "Cell#"}</p>
                <p>{quotation.destination || "Destination not specified"}</p>
                <p>{routeName}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-black uppercase tracking-[0.18em] text-[#fcc000]">Quotation</p>
              <div className="mt-8 space-y-3 text-sm text-stone-900">
                <div>
                  <span className="font-semibold">Quote #</span>
                  <span className="ml-2">{quoteNumber}</span>
                </div>
                <div>
                  <span className="font-semibold">Quote Date</span>
                  <span className="ml-2">{quoteDate}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl border border-stone-300 bg-white p-6">
            <div className="text-sm text-stone-900">
              <p className="font-semibold mb-2">Quotation Details</p>
              <p className="mb-4">This quotation has been prepared for your requested itinerary. Detailed pricing has been withheld in this view for privacy. To view the full pricing breakdown, please contact our sales team at <a className="font-semibold underline" href="tel:+923001234567">+92 300 1234567</a> or reply to the email we sent you.</p>
              <div className="mt-4 rounded-[10px] border border-stone-200 bg-stone-50 p-4">
                <p className="text-sm"><span className="font-semibold">Route:</span> {routeName}</p>
                <p className="text-sm"><span className="font-semibold">Passengers:</span> {numberOfGuests}</p>
                <p className="text-sm"><span className="font-semibold">Departure:</span> {quotation.startingPoint || "-"}</p>
                <p className="text-sm"><span className="font-semibold">Trip Mode:</span> {travelMode === "air" ? "By Air" : "By Road"}</p>
              </div>
              <div className="mt-6">
                <p className="text-sm font-semibold">NOTES:</p>
                <div className="mt-3 space-y-2 text-sm text-stone-800">
                  <p><span className="font-semibold">Accommodation Type:</span> {quotation.details?.roomType || quotation.roomType || "-"}</p>
                  <p><span className="font-semibold">Transportation Type:</span> {quotation.details?.vehicle || quotation.vehicleName || "-"}</p>
                  <p><span className="font-semibold">Tour Mode:</span> {travelMode === "air" ? "By Air" : "By Road"}</p>
                  <p><span className="font-semibold">Departure Location:</span> {quotation.startingPoint || "-"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
            <div className="rounded-3xl border border-stone-300 bg-stone-100 p-6 text-sm text-stone-900">
              <p className="font-semibold">Package included:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Transport by AC vehicle</li>
                <li>Hotel accommodation</li>
                <li>Sightseeing support</li>
              </ul>
              <p className="mt-6 font-semibold">Quotation valid only for 3 Days.</p>
              <p className="mt-3 text-xs text-stone-700">Quotation is exclusive of air tickets.</p>
            </div>

            <div className="rounded-3xl border border-stone-300 bg-white p-4">
              <div className="space-y-2 text-sm text-stone-900">
                <p className="font-semibold">Pricing Hidden</p>
                <p className="text-sm">Detailed pricing has been hidden from this view. To receive the full breakdown or to make adjustments, please contact our sales team.</p>
                <p className="mt-3 font-semibold"><a className="underline" href="tel:+923001234567">Call Sales: +92 300 1234567</a></p>
                <p className="pt-3 text-xs text-stone-700">Quotation is exclusive of air tickets.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="print:hidden border-t border-stone-200 bg-white px-8 py-6 text-right">
          <button
            onClick={() => window.print()}
            className="inline-flex rounded-full bg-[#fcc000] px-8 py-3 text-sm font-semibold text-black transition hover:bg-[#e4b200]"
          >
            Print Quotation
          </button>
        </div>
      </div>
    </div>
  );
}
