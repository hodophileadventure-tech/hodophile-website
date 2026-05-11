"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import { calculateQuotation, type QuotationBreakdown } from "@/lib/pricingEngine";
import { getHotelsByCity, type Hotel } from "@/lib/data/hotels";
import { formatPKR } from "@/lib/currency";

function QuotationEditContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [quotationData, setQuotationData] = useState<any>(null);
  const [customCityNights, setCustomCityNights] = useState<Record<string, number>>({});
  const [multiCityHotels, setMultiCityHotels] = useState<Record<string, { hotelId: string; roomId: string }>>({});
  const [singleCityHotelStays, setSingleCityHotelStays] = useState<Array<{ hotelId: string; roomId: string; nights: number }>>([]);
  const [vehicleName, setVehicleName] = useState("");
  const [quotation, setQuotation] = useState<QuotationBreakdown | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available vehicles for custom tours
  const availableVehicles = [
    { name: "Toyota Corolla", price: 0 },
    { name: "Honda BRV", price: 0 },
    { name: "Prado", price: 0 },
    { name: "Grand Cabin Petrol", price: 0 },
    { name: "Grand Cabin Diesel", price: 0 },
    { name: "Coaster 4C", price: 0 },
    { name: "Coaster 5C", price: 0 },
  ];

  const vehicleCapacity: { [key: string]: { min: number; max: number; seats: number } } = {
    "Toyota Corolla": { min: 1, max: 4, seats: 4 },
    "Honda BRV": { min: 1, max: 6, seats: 6 },
    "Prado": { min: 1, max: 7, seats: 7 },
    "Grand Cabin Petrol": { min: 1, max: 13, seats: 13 },
    "Grand Cabin Diesel": { min: 1, max: 13, seats: 13 },
    "Coaster 4C": { min: 1, max: 35, seats: 35 },
    "Coaster 5C": { min: 1, max: 50, seats: 50 },
  };

  const isVehicleSuitable = (vehicleNameToCheck: string, totalGuests: number): boolean => {
    const capacity = vehicleCapacity[vehicleNameToCheck];
    if (!capacity) return true;
    return totalGuests <= capacity.max;
  };

  const getVehicleCapacityInfo = (vehicleNameToCheck: string): string | null => {
    const capacity = vehicleCapacity[vehicleNameToCheck];
    if (!capacity) return null;
    return `${capacity.seats} seats`;
  };

  // Decode quotation data from URL
  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      try {
        const decoded = JSON.parse(atob(data));
        setQuotationData(decoded);
        setCustomCityNights(decoded.multiCityNights || {});
        setMultiCityHotels(decoded.multiCityHotels || {});
        setSingleCityHotelStays(decoded.singleCityHotelStays || []);
        setVehicleName(decoded.vehicleName || "");
      } catch (error) {
        console.error("Failed to decode quotation data:", error);
      }
    }
  }, [searchParams]);

  const isSingleCitySplitStay = Array.isArray(quotationData?.singleCityHotelStays) && quotationData.singleCityHotelStays.length > 0;
  const splitStayCity = quotationData?.customCities?.[0] || quotationData?.destination || "";

  // Recalculate quotation when edits are made
  useEffect(() => {
    if (!quotationData) return;

    const useSingleCitySplitStay = Array.isArray(quotationData.singleCityHotelStays) && quotationData.singleCityHotelStays.length > 0;

    const updatedQuotation = calculateQuotation({
      routeId: quotationData.routeId,
      vehicleName,
      customCities: quotationData.customCities,
      customRouteLabel: quotationData.customRouteLabel,
      singleCityHotelStays: useSingleCitySplitStay ? singleCityHotelStays : undefined,
      multiCityHotels: useSingleCitySplitStay ? undefined : multiCityHotels,
      multiCityNights: useSingleCitySplitStay ? undefined : customCityNights,
      numberOfRooms: quotationData.numberOfRooms,
      adults: quotationData.adults,
      kids: quotationData.kids,
      tripDate: quotationData.tripDate,
      mandatoryJeepCost: 0,
      travelMode: quotationData.travelMode,
    });

    if (updatedQuotation) {
      setQuotation(updatedQuotation);
    }
  }, [customCityNights, multiCityHotels, singleCityHotelStays, vehicleName, quotationData]);

  const handleProceed = async () => {
    setIsSubmitting(true);
    try {
      const updatedData = {
        ...quotationData,
        multiCityNights: customCityNights,
        multiCityHotels,
        vehicleName,
        transportCost: quotation?.transportCost,
        hotelCost: quotation?.hotelCost,
        jeepAddonsCost: quotation?.jeepAddonsCost,
        subtotal: quotation?.subtotal,
        markupAmount: quotation?.markupAmount,
        totalCost: quotation?.totalCost,
        perPersonCost: quotation?.perPersonCost,
        singleCityHotelStays,
        travelMode: quotationData?.travelMode,
      };

      const encoded = btoa(JSON.stringify(updatedData));
      router.push(`/quotation-result?data=${encoded}`);
    } catch (error) {
      console.error("Error proceeding:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!quotationData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-stone-600">Loading your quotation...</p>
        </div>
      </div>
    );
  }

  const cities = quotationData.customCities || [];
  const totalGuests = quotationData.adults + quotationData.kids;

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 py-8">
      <div className="w-full max-w-4xl px-4">
        <div className="rounded-[15px] border border-white/20 bg-white/94 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-sm">
          <div className="mb-8 text-center md:text-left">
            <p className="text-[11px] uppercase tracking-[0.38em] text-[#8a6a00]">Review & Edit</p>
            <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-[2.6rem] font-bold">
              <span className="text-black">Review your</span> <span className="text-[#FCC000]">choices</span>
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-stone-600 md:mx-0">
              Adjust the number of nights in each city, select your preferred hotels, and choose your vehicle.
            </p>
          </div>

          <div className="space-y-8">
            {isSingleCitySplitStay ? (
              <div className="rounded-[15px] border border-green-200 bg-green-50 p-6">
                <h2 className="font-semibold text-stone-900 mb-4">🏨 Select Hotels</h2>
                <p className="mb-4 text-sm text-green-800">Split your stay for {splitStayCity}. Your selected hotel rows are already loaded below.</p>
                <div className="space-y-4">
                  {singleCityHotelStays.map((stay, index) => {
                    const hotelsForCity = getHotelsByCity(splitStayCity);
                    const selectedHotel = hotelsForCity.find((hotel) => hotel.id === stay.hotelId);
                    return (
                      <div key={`${stay.hotelId || "stay"}-${index}`} className="rounded-[12px] border border-green-200 bg-white p-4">
                        <p className="mb-3 text-sm font-semibold text-green-900">Stay {index + 1}</p>
                        <div className="grid gap-3 grid-cols-1 lg:grid-cols-3">
                          <label className="grid gap-2 text-sm font-medium text-stone-900">
                            Hotel *
                            <select
                              required
                              value={stay.hotelId}
                              onChange={(e) =>
                                setSingleCityHotelStays((current) =>
                                  current.map((currentStay, currentIndex) =>
                                    currentIndex === index
                                      ? { ...currentStay, hotelId: e.target.value, roomId: "" }
                                      : currentStay
                                  )
                                )
                              }
                              className="rounded-[10px] border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
                            >
                              <option value="">Select hotel...</option>
                              {hotelsForCity.map((hotel) => (
                                <option key={hotel.id} value={hotel.id}>
                                  {hotel.name}
                                </option>
                              ))}
                            </select>
                          </label>

                          <label className="grid gap-2 text-sm font-medium text-stone-900 overflow-hidden">
                            Room Type *
                            <select
                              required
                              value={stay.roomId}
                              onChange={(e) =>
                                setSingleCityHotelStays((current) =>
                                  current.map((currentStay, currentIndex) =>
                                    currentIndex === index ? { ...currentStay, roomId: e.target.value } : currentStay
                                  )
                                )
                              }
                              disabled={!stay.hotelId}
                              className="rounded-[10px] border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15 disabled:bg-stone-100 disabled:text-stone-500 overflow-hidden text-ellipsis"
                            >
                              <option value="">Select room...</option>
                              {selectedHotel?.rooms.map((room) => (
                                <option key={room.name} value={room.name}>
                                  {room.name}
                                </option>
                              ))}
                            </select>
                          </label>

                          <label className="grid gap-2 text-sm font-medium text-stone-900">
                            Nights on this hotel *
                            <input
                              type="number"
                              min="1"
                              value={stay.nights}
                              onChange={(e) =>
                                setSingleCityHotelStays((current) =>
                                  current.map((currentStay, currentIndex) =>
                                    currentIndex === index
                                      ? { ...currentStay, nights: Math.max(1, parseInt(e.target.value) || 1) }
                                      : currentStay
                                  )
                                )
                              }
                              className="rounded-[10px] border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
                            />
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="rounded-[15px] border border-green-200 bg-green-50 p-6">
                <h2 className="font-semibold text-stone-900 mb-4">🏨 Select Hotels</h2>
                {cities.map((city: string) => {
                  const hotelsForCity = getHotelsByCity(city);
                  const currentSelection = multiCityHotels[city];
                  const selectedHotel = hotelsForCity.find(h => h.id === currentSelection?.hotelId);

                  return (
                    <div key={city} className="mb-6 pb-6 border-b border-green-200 last:border-b-0">
                      <p className="text-sm font-semibold text-green-900 mb-3">{city}</p>
                      <div className="grid gap-3 grid-cols-1 lg:grid-cols-2">
                        <label className="grid gap-2 text-sm font-medium text-stone-900">
                          Hotel *
                          <select
                            required
                            value={currentSelection?.hotelId || ""}
                            onChange={(e) =>
                              setMultiCityHotels({
                                ...multiCityHotels,
                                [city]: {
                                  ...currentSelection,
                                  hotelId: e.target.value,
                                  roomId: "",
                                },
                              })
                            }
                            className="rounded-[10px] border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
                          >
                            <option value="">Select hotel...</option>
                            {hotelsForCity.map((hotel) => (
                              <option key={hotel.id} value={hotel.id}>
                                {hotel.name}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="grid gap-2 text-sm font-medium text-stone-900 overflow-hidden">
                          Room Type *
                          <select
                            required
                            value={currentSelection?.roomId || ""}
                            onChange={(e) =>
                              setMultiCityHotels({
                                ...multiCityHotels,
                                [city]: {
                                  ...currentSelection,
                                  roomId: e.target.value,
                                },
                              })
                            }
                            disabled={!currentSelection?.hotelId}
                            className="rounded-[10px] border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15 disabled:bg-stone-100 disabled:text-stone-500 overflow-hidden text-ellipsis"
                          >
                            <option value="">Select room...</option>
                            {selectedHotel?.rooms.map((room) => (
                              <option key={room.name} value={room.name}>
                                {room.name}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Vehicle Selection */}
            <div className="rounded-[15px] border border-purple-200 bg-purple-50 p-6">
              <h2 className="font-semibold text-stone-900 mb-4">🚗 Select Vehicle</h2>
              <select
                required
                value={vehicleName}
                onChange={(e) => setVehicleName(e.target.value)}
                className="w-full rounded-[10px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
              >
                <option value="">Choose a vehicle...</option>
                {availableVehicles.map((vehicle) => {
                  const isSuitable = isVehicleSuitable(vehicle.name, totalGuests);
                  const capacityInfo = getVehicleCapacityInfo(vehicle.name);
                  return (
                    <option
                      key={vehicle.name}
                      value={vehicle.name}
                      disabled={!isSuitable}
                    >
                      {vehicle.name}
                      {capacityInfo ? ` (${capacityInfo})` : ""}
                      {!isSuitable ? " - Not suitable for your group" : ""}
                    </option>
                  );
                })}
              </select>
              <p className="mt-2 text-xs text-purple-800">
                👥 Your group size: {totalGuests} people
              </p>
            </div>

            {/* Quotation Summary */}
            {quotation && (
              <div className="rounded-[15px] border-2 border-[#fcc000] bg-[#fcc000]/10 p-6 text-center">
                <p className="text-stone-600 text-sm mb-3">💰 Updated Total Trip Cost</p>
                <p className="font-serif text-5xl text-[#fcc000] font-bold">
                  {formatPKR(quotation.totalCost)}
                </p>
                <p className="text-stone-600 text-sm mt-3">
                  Per Person: {formatPKR(quotation.perPersonCost || 0)}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => router.back()}
                className="px-8 py-3 rounded-[10px] border-2 border-stone-900 text-stone-900 font-semibold hover:bg-stone-100 transition"
              >
                ← Back
              </button>
              <button
                onClick={handleProceed}
                disabled={isSubmitting || !quotation}
                className="px-8 py-3 rounded-[10px] bg-[#fcc000] text-black font-semibold hover:bg-[#fcc000]/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Processing..." : "✨ Proceed to Result"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuotationEditPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>}>
      <QuotationEditContent />
    </Suspense>
  );
}
