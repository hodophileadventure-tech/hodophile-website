"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { routes } from "@/lib/data/routes";
import { getHotelsByCity } from "@/lib/data/hotels";
import { formatPKR } from "@/lib/pricingEngine";

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
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 flex items-center justify-center">
        <div className="animate-pulse text-stone-600">Loading quotation...</div>
      </div>
    );
  }

  if (!quotation) {
    return null;
  }

  const route = routes.find((r) => r.id === quotation.routeId);
  const hotels = getHotelsByCity(quotation.destination);
  const hotel = hotels.find((h) => h.id === quotation.hotelId);

  // Generate day-by-day itinerary
  const generateItinerary = () => {
    const days = [];
    const routeName = route?.name || "Tour";
    const duration = route?.duration || 5;

    days.push({
      day: 1,
      title: "Arrival",
      description: `Arrive at Islamabad. Drive to ${quotation.destination}. Check-in at ${hotel?.name || "hotel"}.`,
    });

    for (let i = 2; i < duration; i++) {
      days.push({
        day: i,
        title: `Exploration Day ${i - 1}`,
        description: `Full day exploration of ${quotation.destination}. Visit local attractions and scenic spots.`,
      });
    }

    days.push({
      day: duration,
      title: "Departure",
      description: `Check-out from ${hotel?.name || "hotel"}. Drive back to Islamabad.`,
    });

    return days;
  };

  const itinerary = generateItinerary();

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl text-stone-900 mb-2">
            Your Travel Quotation
          </h1>
          <p className="text-stone-600">
            {quotation.tripDate}
          </p>
        </div>

        {/* Itinerary Section */}
        <div className="bg-white rounded-[15px] border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.28)] p-8 mb-8">
          <h2 className="font-serif text-2xl text-stone-900 mb-6">📅 Itinerary</h2>
          <div className="space-y-4">
            {itinerary.map((dayItem, index) => (
              <div
                key={index}
                className="border-l-4 border-[#fcc000] pl-6 py-2"
              >
                <h3 className="font-semibold text-stone-900">
                  Day {dayItem.day}: {dayItem.title}
                </h3>
                <p className="text-stone-600 text-sm mt-1">{dayItem.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tour Details */}
        <div className="bg-white rounded-[15px] border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.28)] p-8 mb-8">
          <h2 className="font-serif text-2xl text-stone-900 mb-6">🎒 Tour Details</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-stone-600">Route</p>
                <p className="text-lg font-semibold text-stone-900">
                  {route?.name || "Unknown"}
                </p>
              </div>
              <div>
                <p className="text-sm text-stone-600">Duration</p>
                <p className="text-lg font-semibold text-stone-900">
                  {route?.duration || 0} Days
                </p>
              </div>
              <div>
                <p className="text-sm text-stone-600">Vehicle</p>
                <p className="text-lg font-semibold text-stone-900">
                  {quotation.vehicleName}
                </p>
              </div>
              <div>
                <p className="text-sm text-stone-600">Total Guests</p>
                <p className="text-lg font-semibold text-stone-900">
                  {quotation.adults} Adults{quotation.kids > 0 ? ` + ${quotation.kids} Kids` : ""}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-stone-600">Hotel</p>
                <p className="text-lg font-semibold text-stone-900">
                  {hotel?.name || "Unknown"}
                </p>
              </div>
              <div>
                <p className="text-sm text-stone-600">Room Type</p>
                <p className="text-lg font-semibold text-stone-900">
                  {quotation.roomType}
                </p>
              </div>
              <div>
                <p className="text-sm text-stone-600">Number of Rooms</p>
                <p className="text-lg font-semibold text-stone-900">
                  {quotation.numberOfRooms} Room{quotation.numberOfRooms > 1 ? "s" : ""}
                </p>
              </div>
              <div>
                <p className="text-sm text-stone-600">Tour Type</p>
                <p className="text-lg font-semibold text-stone-900 capitalize">
                  {quotation.tourType}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quotation Summary */}
        <div className="bg-[#fcc000]/10 rounded-[15px] border-2 border-[#fcc000] p-8 text-center">
          <p className="text-stone-600 text-sm mb-3">💰 Total Trip Cost</p>
          <p className="font-serif text-5xl text-[#fcc000] font-bold">
            {formatPKR(quotation.totalCost)}
          </p>
          <p className="text-stone-600 text-sm mt-6">
            ✅ This quotation includes all accommodations, transportation, and services.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-12 justify-center">
          <button
            onClick={() => router.push("/make-my-trip")}
            className="px-8 py-3 rounded-[10px] border-2 border-stone-900 text-stone-900 font-semibold hover:bg-stone-100 transition"
          >
            ← Back to Booking
          </button>
          <button
            onClick={() => window.print()}
            className="px-8 py-3 rounded-[10px] bg-[#fcc000] text-black font-semibold hover:bg-[#fcc000]/90 transition"
          >
            🖨️ Print Quotation
          </button>
        </div>
      </div>
    </div>
  );
}
