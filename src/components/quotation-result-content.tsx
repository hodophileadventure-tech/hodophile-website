"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { routes } from "@/lib/data/routes";
import { getHotelsByCity } from "@/lib/data/hotels";
import { formatPKR } from "@/lib/currency";
import { getRouteActivities } from "@/lib/data/routeActivities";
import { getMandatoryJeepCost } from "@/lib/data/routeActivities";

export function QuotationResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [quotation, setQuotation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editingHotels, setEditingHotels] = useState<Record<string, { hotelId: string; roomId: string }>>({});
  const [isEditing, setIsEditing] = useState(false);

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
  
  // Handle multi-city or single-city hotels
  let hotelDisplay = "";
  let hotel = null;
  let roomTypeDisplay = quotation.roomType;
  let roomDetailsDisplay = "";
  
  if (quotation.multiCityHotels && quotation.multiCityNights) {
    // Multi-city tour
    const hotelNames = Object.entries(quotation.multiCityHotels)
      .map(([city, info]: [string, any]) => {
        const cityHotels = getHotelsByCity(city);
        const h = cityHotels.find((hotel) => hotel.id === info.hotelId);
        return h?.name || info.hotelId;
      })
      .join(" + ");
    hotelDisplay = hotelNames;
    roomTypeDisplay = "Multiple";
    roomDetailsDisplay = Object.entries(quotation.multiCityHotels)
      .map(([city, info]: [string, any]) => {
        const cityHotels = getHotelsByCity(city);
        const h = cityHotels.find((hotel) => hotel.id === info.hotelId);
        return `${city}: ${h?.name || info.hotelId} — ${info.roomId || "Room"}`;
      })
      .join(" | ");
  } else {
    // Single-city tour
    const hotels = getHotelsByCity(quotation.destination);
    hotel = hotels.find((h) => h.id === quotation.hotelId);
    hotelDisplay = hotel?.name || "Unknown";
  }

  // Generate day-by-day itinerary from route activities if available
  const generateItinerary = () => {
    const routeActivityData = getRouteActivities(quotation.routeId);
    
    if (routeActivityData) {
      // Use detailed route activities if available
      return routeActivityData.activities.map((activity) => ({
        day: activity.day,
        title: activity.name,
        description: activity.description,
        isJeepRequired: activity.isJeepRequired,
        location: activity.location,
        cost: activity.cost,
      }));
    }
    
    // Fallback to simple itinerary if no route activities found
    const days = [];
    const duration = route?.duration || 5;

    days.push({
      day: 1,
      title: "Arrival",
      description: `Arrive at Islamabad. Drive to ${quotation.destination}. Check-in at hotel.`,
      isJeepRequired: false,
      location: quotation.destination || "",
      cost: undefined,
    });

    for (let i = 2; i < duration; i++) {
      days.push({
        day: i,
        title: `Exploration Day ${i - 1}`,
        description: `Full day exploration of ${quotation.destination}. Visit local attractions and scenic spots.`,
        isJeepRequired: false,
        location: quotation.destination || "",
        cost: undefined,
      });
    }

    days.push({
      day: duration,
      title: "Departure",
      description: `Check-out from hotel. Drive back to Islamabad.`,
      isJeepRequired: false,
      location: "Islamabad",
      cost: undefined,
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
                className={`border-l-4 pl-6 py-3 rounded-r ${
                  dayItem.isJeepRequired
                    ? "border-l-red-500 bg-red-50"
                    : "border-l-[#fcc000] bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-stone-900 flex items-center gap-2">
                      Day {dayItem.day}: {dayItem.title}
                      {dayItem.isJeepRequired && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-200 text-red-700 text-xs font-bold rounded">
                          🚙 JEEP REQUIRED
                        </span>
                      )}
                    </h3>
                    <p className="text-stone-600 text-sm mt-2">{dayItem.description}</p>
                    {dayItem.location && (
                      <p className="text-stone-500 text-xs mt-1">📍 {dayItem.location}</p>
                    )}
                  </div>
                </div>
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
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-stone-600">Hotel</p>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-xs px-3 py-1 rounded bg-[#fcc000] text-black hover:bg-[#fcc000]/90 font-semibold transition"
                  >
                    {isEditing ? "Done" : "✏️ Edit"}
                  </button>
                </div>
                {isEditing ? (
                  <div className="mt-2 space-y-3">
                    {quotation.multiCityHotels && quotation.multiCityNights ? (
                      Object.entries(quotation.multiCityNights).map(([city, nights]: [string, any]) => {
                        const cityHotels = getHotelsByCity(city);
                        const currentHotelId = editingHotels[city]?.hotelId || quotation.multiCityHotels?.[city]?.hotelId;
                        const selectedHotel = cityHotels.find(h => h.id === currentHotelId);
                        const rooms = selectedHotel?.rooms || [];
                        
                        return (
                          <div key={city} className="border border-stone-200 rounded p-3 bg-stone-50">
                            <p className="text-sm font-medium text-stone-900 mb-2">{city}</p>
                            <select
                              value={currentHotelId || ""}
                              onChange={(e) => {
                                setEditingHotels({
                                  ...editingHotels,
                                  [city]: {
                                    hotelId: e.target.value,
                                    roomId: quotation.multiCityHotels?.[city]?.roomId || ""
                                  }
                                });
                                quotation.multiCityHotels[city].hotelId = e.target.value;
                              }}
                              className="w-full mb-2 px-2 py-1 border border-stone-200 rounded text-sm"
                            >
                              <option value="">Select hotel</option>
                              {cityHotels.map(h => (
                                <option key={h.id} value={h.id}>{h.name}</option>
                              ))}
                            </select>
                          </div>
                        );
                      })
                    ) : (
                      <select
                        value={editingHotels.singleCity?.hotelId || quotation.hotelId || ""}
                        onChange={(e) => {
                          setEditingHotels({
                            ...editingHotels,
                            singleCity: {
                              hotelId: e.target.value,
                              roomId: quotation.hotelId ? quotation.roomId : ""
                            }
                          });
                          quotation.hotelId = e.target.value;
                        }}
                        className="w-full px-2 py-1 border border-stone-200 rounded text-sm"
                      >
                        <option value="">Select hotel</option>
                        {getHotelsByCity(quotation.destination).map(h => (
                          <option key={h.id} value={h.id}>{h.name}</option>
                        ))}
                      </select>
                    )}
                  </div>
                ) : (
                  <p className="text-lg font-semibold text-stone-900">
                    {hotelDisplay}
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm text-stone-600">Room Type</p>
                <p className="text-lg font-semibold text-stone-900">
                  {roomTypeDisplay}
                </p>
                {roomDetailsDisplay ? (
                  <p className="mt-2 text-sm text-stone-500">
                    {roomDetailsDisplay}
                  </p>
                ) : null}
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
          <p className="text-stone-600 text-sm mt-3">
            Per Person: {formatPKR(quotation.perPersonCost || 0)}
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
