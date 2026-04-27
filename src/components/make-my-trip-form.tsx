"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { calculateQuotation, type QuotationBreakdown } from "@/lib/pricingEngine";
import { getHotelsByCity, type Hotel } from "@/lib/data/hotels";
import { routes } from "@/lib/data/routes";
import { PriceSummary } from "./price-summary";

export function MakeMyTripForm() {
  const router = useRouter();
  
  // Form state
  const [tripDate, setTripDate] = useState("");
  const [routeId, setRouteId] = useState("");
  const [hotelCategory, setHotelCategory] = useState("deluxe"); // standard, deluxe, executive
  const [hotelId, setHotelId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [tourType, setTourType] = useState("private");
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [kidsAges, setKidsAges] = useState<string[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // UI state
  const [quotation, setQuotation] = useState<QuotationBreakdown | null>(null);
  const [availableHotels, setAvailableHotels] = useState<Hotel[]>([]);
  const [availableRooms, setAvailableRooms] = useState<any[]>([]);
  const [availableVehicles, setAvailableVehicles] = useState<Array<{ name: string; price: number }>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  // Helper function to get default hotel by category
  const getDefaultHotelByCategory = (hotels: Hotel[], category: string): string => {
    const categoryMap: { [key: string]: string[] } = {
      standard: [
        "hermes-hotel-hunza",
        "eagle-nest-swat",
        "blue-ocean-kalam",
        "hispar-hotel-skardu",
        "ifq-premier-skardu",
      ],
      deluxe: [
        "mulberry-hotel-hunza",
        "khoj-hotel-skardu",
        "qayam-hotels-hunza",
        "maple-resort-skardu",
        "spruce-resort-shogran",
      ],
      executive: [
        "shangrila-resort-skardu",
        "offto-resort-hunza",
        "farme-resort-hunza",
        "gumaan-resort-skardu",
        "north-palace-khaplu",
      ],
    };

    const preferredIds = categoryMap[category] || categoryMap.deluxe;
    const defaultHotel = hotels.find((h) => preferredIds.includes(h.id));
    return defaultHotel?.id || "";
  };

  // Vehicle capacity mapping
  const vehicleCapacity: { [key: string]: { min: number; max: number; seats: number } } = {
    "Toyota Corolla": { min: 1, max: 4, seats: 4 },
    "Honda BRV": { min: 1, max: 6, seats: 6 },
    "Prado": { min: 1, max: 7, seats: 7 },
    "Grand Cabin Petrol": { min: 1, max: 13, seats: 13 },
    "Grand Cabin Diesel": { min: 1, max: 13, seats: 13 },
    "Coaster 4C": { min: 1, max: 35, seats: 35 },
    "Coaster 5C": { min: 1, max: 50, seats: 50 },
  };

  // Check if a vehicle is suitable for the number of guests
  const isVehicleSuitable = (vehicleName: string, totalGuests: number): boolean => {
    const capacity = vehicleCapacity[vehicleName];
    if (!capacity) return true; // Allow if not in mapping
    return totalGuests <= capacity.max;
  };

  // Get vehicle capacity info
  const getVehicleCapacityInfo = (vehicleName: string): string | null => {
    const capacity = vehicleCapacity[vehicleName];
    if (!capacity) return null;
    return `${capacity.seats} seats`;
  };

  const totalGuests = adults + kids;

  // Update available vehicles when route changes
  useEffect(() => {
    if (routeId) {
      const selectedRoute = routes.find((r) => r.id === routeId);
      if (selectedRoute) {
        setAvailableVehicles(selectedRoute.vehicles);
        setVehicleName("");
      }
    }
  }, [routeId]);

  // Update available hotels when route changes
  useEffect(() => {
    if (routeId) {
      const selectedRoute = routes.find((r) => r.id === routeId);
      if (selectedRoute) {
        const hotels = getHotelsByCity(selectedRoute.city);
        setAvailableHotels(hotels);
        
        // Auto-select default hotel based on category
        const defaultHotelId = getDefaultHotelByCategory(hotels, hotelCategory);
        setHotelId(defaultHotelId);
        setRoomId("");
      }
    }
  }, [routeId, hotelCategory]);

  // Update available rooms when hotel changes
  useEffect(() => {
    if (hotelId) {
      const selectedHotel = availableHotels.find((h) => h.id === hotelId);
      if (selectedHotel) {
        setAvailableRooms(selectedHotel.rooms);
        
        // Auto-select a room based on category preference
        const categoryRoomPreference: { [key: string]: string[] } = {
          standard: ["Standard", "Budget Room", "Couple"],
          deluxe: ["Deluxe", "Deluxe Room", "Deluxe Balcony Room"],
          executive: ["Executive", "Executive Suite", "Premium", "Presidential"],
        };
        
        const preferredRoomNames = categoryRoomPreference[hotelCategory] || categoryRoomPreference.deluxe;
        const defaultRoom = selectedHotel.rooms.find((r) => 
          preferredRoomNames.some(name => r.name.includes(name))
        );
        
        setRoomId(defaultRoom?.name || "");
      }
    }
  }, [hotelId, availableHotels, hotelCategory]);

  // Validate vehicle based on guest count
  useEffect(() => {
    if (vehicleName && !isVehicleSuitable(vehicleName, totalGuests)) {
      // Find a suitable vehicle for this guest count
      const suitableVehicle = availableVehicles.find((v) =>
        isVehicleSuitable(v.name, totalGuests)
      );
      
      if (suitableVehicle) {
        setVehicleName(suitableVehicle.name);
      } else {
        setVehicleName("");
      }
    }
  }, [adults, kids, totalGuests, vehicleName, availableVehicles]);

  // Calculate quotation when key fields change
  useEffect(() => {
    if (tripDate && routeId && hotelId && roomId && vehicleName && numberOfRooms > 0 && adults > 0) {
      const calc = calculateQuotation({
        routeId,
        vehicleName,
        hotelId,
        roomId,
        numberOfRooms,
        adults,
        kids,
        tripDate,
      });
      setQuotation(calc);
    } else {
      setQuotation(null);
    }
  }, [tripDate, routeId, hotelId, roomId, vehicleName, numberOfRooms, adults, kids]);

  const handleKidsCountChange = (value: number) => {
    setKids(value);
    setKidsAges(Array(value).fill(""));
  };

  const handleKidsAgeChange = (index: number, value: string) => {
    const newAges = [...kidsAges];
    newAges[index] = value;
    setKidsAges(newAges);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitError("");

    try {
      if (!quotation) {
        setSubmitError("Please complete all required fields");
        setIsSubmitting(false);
        return;
      }

      // Get route and hotel info for quotation result page
      const selectedRoute = routes.find((r) => r.id === routeId);
      const selectedHotel = availableHotels.find((h) => h.id === hotelId);
      const destination = selectedRoute?.city || "Destination";

      // Prepare quotation data for result page
      const quotationData = {
        tripDate,
        routeId,
        destination,
        hotelId,
        roomType: roomId,
        vehicleName,
        numberOfRooms,
        adults,
        kids,
        tourType,
        totalCost: quotation.totalCost,
      };

      // Encode data and redirect to result page
      const encoded = btoa(JSON.stringify(quotationData));

      // Also send to API for WhatsApp notification
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripDate,
          routeId,
          hotelId,
          roomId,
          vehicleName,
          numberOfRooms,
          adults,
          kids,
          customerName,
          customerPhone,
          tourType,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Redirect to quotation result page
        router.push(`/quotation-result?data=${encoded}`);
      } else {
        setSubmitError(data.error || "Failed to submit quotation");
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-[1fr_350px] gap-6">
        {/* Main Form */}
        <div className="w-full rounded-[15px] border border-white/20 bg-white/94 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-sm md:p-6">
          <div className="mb-6 text-center md:text-left">
            <p className="text-[11px] uppercase tracking-[0.38em] text-[#8a6a00]">Plan my Journey</p>
            <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-[2.6rem]">
              Design Your Perfect Trip
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-stone-600 md:mx-0">
              Select your dates, destination, vehicle, and hotel. Get an instant quotation powered by real-time pricing.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            {/* Customer Info */}
            <div className="grid md:grid-cols-2 gap-4 pb-4 border-b border-stone-200">
              <label className="grid gap-2 text-sm font-medium text-stone-900">
                Your Name *
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Full name"
                  className="rounded-[15px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-stone-900">
                WhatsApp Number *
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+92..."
                  className="rounded-[15px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
                />
              </label>
            </div>

            {/* Trip Details */}
            <label className="grid gap-2 text-sm font-medium text-stone-900">
              Trip Start Date *
              <input
                type="date"
                required
                value={tripDate}
                onChange={(e) => setTripDate(e.target.value)}
                className="rounded-[15px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
              />
            </label>

            <div className="grid md:grid-cols-2 gap-4">
              <label className="grid gap-2 text-sm font-medium text-stone-900">
                Select Route *
                <select
                  required
                  value={routeId}
                  onChange={(e) => setRouteId(e.target.value)}
                  className="rounded-[15px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
                >
                  <option value="">Choose a destination...</option>
                  {routes.map((route) => (
                    <option key={route.id} value={route.id}>
                      {route.name} ({route.duration} days)
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-medium text-stone-900">
                Tour Type *
                <select
                  value={tourType}
                  onChange={(e) => setTourType(e.target.value)}
                  className="rounded-[15px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
                >
                  <option value="private">Private Tour</option>
                  <option value="group">Group Tour</option>
                </select>
              </label>
            </div>

            {/* Hotel Category Selection */}
            <label className="grid gap-2 text-sm font-medium text-stone-900">
              Hotel Category *
              <select
                value={hotelCategory}
                onChange={(e) => setHotelCategory(e.target.value)}
                className="rounded-[15px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
              >
                <option value="standard">🏨 Standard - Budget-Friendly</option>
                <option value="deluxe">⭐ Deluxe - Mid-Range (Recommended)</option>
                <option value="executive">🌟 Executive - Premium</option>
              </select>
            </label>

            {/* Hotel & Vehicle Selection */}
            <div className="grid md:grid-cols-2 gap-4">
              <label className="grid gap-2 text-sm font-medium text-stone-900">
                Select Hotel *
                <select
                  required
                  value={hotelId}
                  onChange={(e) => setHotelId(e.target.value)}
                  disabled={!routeId}
                  className="rounded-[15px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15 disabled:bg-stone-100 disabled:text-stone-500"
                >
                  <option value="">
                    {!routeId ? "Select route first" : availableHotels.length === 0 ? "No hotels available" : "Choose a hotel..."}
                  </option>
                  {availableHotels.map((hotel) => (
                    <option key={hotel.id} value={hotel.id}>
                      {hotel.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-medium text-stone-900">
                Room Type *
                <select
                  required
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  disabled={!hotelId}
                  className="rounded-[15px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15 disabled:bg-stone-100 disabled:text-stone-500"
                >
                  <option value="">
                    {!hotelId ? "Select hotel first" : availableRooms.length === 0 ? "No rooms available" : "Choose a room..."}
                  </option>
                  {availableRooms.map((room) => (
                    <option key={room.name} value={room.name}>
                      {room.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="grid gap-2 text-sm font-medium text-stone-900">
              Select Vehicle *
              <select
                required
                value={vehicleName}
                onChange={(e) => setVehicleName(e.target.value)}
                disabled={!routeId}
                className="rounded-[15px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15 disabled:bg-stone-100 disabled:text-stone-500"
              >
                <option value="">
                  {!routeId ? "Select route first" : availableVehicles.length === 0 ? "No vehicles available" : "Choose a vehicle..."}
                </option>
                {availableVehicles.map((vehicle) => {
                  const isSuitable = isVehicleSuitable(vehicle.name, totalGuests);
                  const capacityInfo = getVehicleCapacityInfo(vehicle.name);
                  return (
                    <option
                      key={vehicle.name}
                      value={vehicle.name}
                      disabled={!isSuitable}
                      className={isSuitable ? "" : "text-gray-400"}
                    >
                      {vehicle.name}
                      {capacityInfo ? ` (${capacityInfo})` : ""}
                      {!isSuitable ? " - Not suitable for your group" : ""}
                    </option>
                  );
                })}
              </select>
            </label>

            {/* Vehicle capacity warning */}
            {totalGuests > 4 && (
              <div className="rounded-[15px] bg-blue-50 border border-blue-200 p-4 text-sm text-blue-800">
                <p className="font-medium">👥 Your group size: {totalGuests} people</p>
                <p className="text-xs mt-1">
                  {totalGuests <= 4 && "Corolla (4 seats) is available."}
                  {totalGuests > 4 && totalGuests <= 6 && "Note: Corolla unavailable. Honda BRV, Prado and larger vehicles recommended."}
                  {totalGuests > 6 && totalGuests <= 7 && "Note: Prado and larger vehicles recommended for comfort."}
                  {totalGuests > 7 && "Grand Cabin or Coaster recommended for your group size."}
                </p>
              </div>
            )}

            {/* Guest & Room Details */}
            <div className="grid md:grid-cols-3 gap-4">
              <label className="grid gap-2 text-sm font-medium text-stone-900">
                Number of Rooms *
                <select
                  required
                  value={numberOfRooms}
                  onChange={(e) => setNumberOfRooms(parseInt(e.target.value))}
                  className="rounded-[15px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "Room" : "Rooms"}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-medium text-stone-900">
                Adults *
                <input
                  type="number"
                  min="1"
                  required
                  value={adults}
                  onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
                  className="rounded-[15px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
                />
              </label>

              <label className="grid gap-2 text-sm font-medium text-stone-900">
                Kids
                <input
                  type="number"
                  min="0"
                  value={kids}
                  onChange={(e) => handleKidsCountChange(parseInt(e.target.value) || 0)}
                  className="rounded-[15px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
                />
              </label>
            </div>

            {/* Kids Ages */}
            {kids > 0 && (
              <div className="grid gap-3 p-4 rounded-[15px] bg-[#fcc000]/5 border border-[#fcc000]/20">
                <p className="text-sm font-medium text-stone-900">Ages of Kids</p>
                <div className="grid md:grid-cols-3 gap-3">
                  {Array.from({ length: kids }).map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      placeholder={`Kid ${index + 1} age`}
                      value={kidsAges[index] || ""}
                      onChange={(e) => handleKidsAgeChange(index, e.target.value)}
                      className="rounded-[15px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            {submitMessage && (
              <div className="rounded-[15px] bg-green-50 border border-green-200 p-4 text-sm text-green-800">
                {submitMessage}
              </div>
            )}

            {submitError && (
              <div className="rounded-[15px] bg-red-50 border border-red-200 p-4 text-sm text-red-800">
                {submitError}
              </div>
            )}

            {!quotation && tripDate && routeId && hotelId && roomId && vehicleName && (
              <div className="rounded-[15px] bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
                ⚠️ Calculating quotation... If this persists, check browser console for details. Make sure all fields are properly selected.
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !quotation}
              className="mt-2 inline-flex w-full items-center justify-center rounded-[15px] bg-[#ffc000] px-6 py-3 text-sm font-semibold text-black shadow-[0_16px_30px_rgba(252,192,0,0.28)] transition hover:-translate-y-0.5 hover:bg-[#ffd247] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Processing..." : "✨ Get Quotation"}
            </button>
          </form>
        </div>

        {/* Price Summary Sidebar */}
        <div className="md:sticky md:top-6 md:h-fit">
          <PriceSummary quotation={quotation} isLoading={false} />
        </div>
      </div>
    </div>
  );
}
