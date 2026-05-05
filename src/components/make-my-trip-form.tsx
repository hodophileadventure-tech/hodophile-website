"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { calculateQuotation, type QuotationBreakdown } from "@/lib/pricingEngine";
import { getHotelsByCity, type Hotel } from "@/lib/data/hotels";
import { routes, type Route } from "@/lib/data/routes";
import { getMandatoryJeepCost, getRouteActivities } from "@/lib/data/routeActivities";
import { PriceSummary } from "./price-summary";

export function MakeMyTripForm() {
  const router = useRouter();
  
  // Form state
  const [tripDate, setTripDate] = useState("");
  const [startingPoint, setStartingPoint] = useState("");
  const [routeId, setRouteId] = useState("");
  const [hotelCategory, setHotelCategory] = useState("deluxe"); // standard, deluxe, executive
  const [hotelId, setHotelId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [multiCityHotels, setMultiCityHotels] = useState<Record<string, { hotelId: string; roomId: string }>>({});
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
  const [mandatoryJeepCost, setMandatoryJeepCost] = useState(0);
  const [routeActivities, setRouteActivities] = useState<any>(null);

  // Smart room selection based on price tier (not exact name matching)
  const selectRoomByCategory = (rooms: any[], category: string): string => {
    if (!rooms || rooms.length === 0) return "";

    // Calculate price for each room for comparison
    const roomsWithPrice = rooms.map((room: any) => ({
      name: room.name,
      price:
        room.price ||
        room.peak ||
        room.high ||
        (Array.isArray(room.high) ? room.high[0] : 0) ||
        room.double ||
        room.low ||
        (Array.isArray(room.low) ? room.low[0] : 0) ||
        0,
    }));

    // Sort by price
    roomsWithPrice.sort((a, b) => a.price - b.price);

    // Select based on category
    if (category === "standard") {
      // Cheapest room
      return roomsWithPrice[0]?.name || "";
    } else if (category === "deluxe") {
      // Middle room
      const midIndex = Math.floor(roomsWithPrice.length / 2);
      return roomsWithPrice[midIndex]?.name || "";
    } else if (category === "executive") {
      // Most expensive room
      return roomsWithPrice[roomsWithPrice.length - 1]?.name || "";
    }

    return roomsWithPrice[0]?.name || "";
  };

  // Get first hotel for the city (simplified auto-select)
  const getDefaultHotel = (hotels: Hotel[]): string => {
    return hotels.length > 0 ? hotels[0].id : "";
  };

  // Get cheapest hotel for a category
  const selectHotelByCategory = (hotels: Hotel[], category: string): string => {
    if (!hotels || hotels.length === 0) return "";

    const hotelsWithPrice = hotels.map((hotel) => {
      // Get first room's cheapest price
      const firstRoom = hotel.rooms[0];
      let price = 0;
      if (firstRoom) {
        price =
          firstRoom.price ||
          firstRoom.peak ||
          firstRoom.high ||
          (Array.isArray(firstRoom.high) ? firstRoom.high[0] : 0) ||
          firstRoom.double ||
          firstRoom.low ||
          (Array.isArray(firstRoom.low) ? firstRoom.low[0] : 0) ||
          0;
      }
      return { id: hotel.id, price };
    });

    // Sort by price
    hotelsWithPrice.sort((a, b) => a.price - b.price);

    if (category === "standard") {
      // Cheapest hotel
      return hotelsWithPrice[0]?.id || "";
    } else if (category === "deluxe") {
      // Middle-priced hotel
      const midIndex = Math.floor(hotelsWithPrice.length / 2);
      return hotelsWithPrice[midIndex]?.id || "";
    } else if (category === "executive") {
      // Most expensive hotel
      return hotelsWithPrice[hotelsWithPrice.length - 1]?.id || "";
    }

    return hotelsWithPrice[0]?.id || "";
  };

  // Calculate rooms needed (max 4 people per room)
  const calculateRoomsNeeded = (guestCount: number): number => {
    return Math.ceil(guestCount / 4);
  };

  // Check if Islamabad hotel is mandatory
  const isIslamabadHotelMandatory = (): boolean => {
    if (!isMultiCityTour()) return false;
    const startingPointLower = startingPoint.toLowerCase().trim();
    return startingPointLower !== "islamabad" && startingPointLower !== "rawalpindi";
  };

  // Multi-city itinerary configuration
  const multiCityConfig: Record<string, { cities: string[]; nights: number[] }> = {
    "naran-hunza-skardu-deosai-12days": {
      cities: ["Islamabad", "Skardu", "Hunza", "Naran"],
      nights: [0, 3, 2, 1], // Islamabad is for optional pre-tour stay
    },
    "skardu-shigar-shangrila-10days": {
      cities: ["Chilas", "Skardu", "Naran"],
      nights: [1, 4, 1], // Day 3: Chilas, Days 4-7: Skardu, Day 8: Naran
    },
    "naran-hunza-naltar-10days": {
      cities: ["Chilas", "Hunza", "Naran"],
      nights: [1, 3, 1], // Day 3: Chilas, Days 4-7: Hunza/Naltar, Day 8: Naran
    },
  };

  const isMultiCityTour = (): boolean => {
    return multiCityConfig[routeId] !== undefined;
  };

  // Initialize multi-city hotels with defaults
  const initializeMultiCityHotels = (route: Route) => {
    const config = multiCityConfig[route.id];
    if (config) {
      const defaults: Record<string, { hotelId: string; roomId: string }> = {};
      for (const city of config.cities) {
        const hotelsForCity = getHotelsByCity(city);
        if (hotelsForCity.length > 0) {
          // Use category-based hotel selection
          const defaultHotelId = selectHotelByCategory(hotelsForCity, hotelCategory);
          const selectedHotel = hotelsForCity.find((h) => h.id === defaultHotelId);
          const defaultRoom = selectedHotel
            ? selectRoomByCategory(selectedHotel.rooms, hotelCategory)
            : "";

          defaults[city] = {
            hotelId: defaultHotelId,
            roomId: defaultRoom,
          };
        }
      }
      setMultiCityHotels(defaults);
    }
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
        
        // Update mandatory jeep cost and route activities
        const jeepCost = getMandatoryJeepCost(routeId);
        setMandatoryJeepCost(jeepCost);
        
        const activities = getRouteActivities(routeId);
        setRouteActivities(activities);
      }
    }
  }, [routeId]);

  // Update available hotels when route changes
  useEffect(() => {
    if (routeId) {
      const selectedRoute = routes.find((r) => r.id === routeId);
      if (selectedRoute) {
        // Check if this is a multi-city tour
        if (selectedRoute.city === "Multi-City") {
          initializeMultiCityHotels(selectedRoute);
          setHotelId(""); // Clear single-city hotel for multi-city tours
        } else {
          const hotels = getHotelsByCity(selectedRoute.city);
          setAvailableHotels(hotels);

          // Auto-select hotel based on category (not just first)
          const defaultHotelId = selectHotelByCategory(hotels, hotelCategory);
          setHotelId(defaultHotelId);
          setRoomId("");
        }
      }
    }
  }, [routeId, hotelCategory]);

  // Update hotel selections when hotel category changes
  useEffect(() => {
    if (isMultiCityTour()) {
      initializeMultiCityHotels(routes.find((r) => r.id === routeId)!);
    } else if (availableHotels.length > 0) {
      // For single-city tours, update hotel selection based on category
      const newHotelId = selectHotelByCategory(availableHotels, hotelCategory);
      setHotelId(newHotelId);
      setRoomId("");
    }
  }, [hotelCategory]);

  // Update available rooms when hotel changes
  useEffect(() => {
    if (hotelId) {
      const selectedHotel = availableHotels.find((h) => h.id === hotelId);
      if (selectedHotel) {
        setAvailableRooms(selectedHotel.rooms);
        
        // Auto-select room based on category using price tier
        const defaultRoom = selectRoomByCategory(selectedHotel.rooms, hotelCategory);
        setRoomId(defaultRoom);
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

  // Auto-calculate rooms based on guest count (max 4 per room)
  useEffect(() => {
    const roomsNeeded = calculateRoomsNeeded(totalGuests);
    setNumberOfRooms(roomsNeeded);
  }, [adults, kids, totalGuests]);

  // Calculate quotation when key fields change
  useEffect(() => {
    if (tripDate && routeId && vehicleName && numberOfRooms > 0 && adults > 0) {
      if (routeId) {
        const selectedRoute = routes.find((r) => r.id === routeId);
        if (selectedRoute) {
          // Check if this is a multi-city tour
          if (isMultiCityTour() && selectedRoute.city === "Multi-City") {
            // Build multiCityNights from config
            const config = multiCityConfig[routeId];
            if (config) {
              const multiCityNights: Record<string, number> = {};
              config.cities.forEach((city, index) => {
                multiCityNights[city] = config.nights[index];
              });

              // Check if all hotels are selected
              const allHotelsSelected = config.cities.every(
                (city) => multiCityHotels[city]?.hotelId && multiCityHotels[city]?.roomId
              );

              if (allHotelsSelected) {
                const calc = calculateQuotation({
                  routeId,
                  vehicleName,
                  multiCityHotels,
                  multiCityNights,
                  numberOfRooms,
                  adults,
                  kids,
                  tripDate,
                  mandatoryJeepCost,
                });
                setQuotation(calc);
              } else {
                setQuotation(null);
              }
            }
          } else if (hotelId && roomId) {
            // Single-city tour
            const calc = calculateQuotation({
              routeId,
              vehicleName,
              hotelId,
              roomId,
              numberOfRooms,
              adults,
              kids,
              tripDate,
              mandatoryJeepCost,
            });
            setQuotation(calc);
          } else {
            setQuotation(null);
          }
        }
      }
    } else {
      setQuotation(null);
    }
  }, [tripDate, routeId, hotelId, roomId, vehicleName, numberOfRooms, adults, kids, multiCityHotels, mandatoryJeepCost]);

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
      const destination = selectedRoute?.city === "Multi-City" 
        ? selectedRoute?.name || "Multi-City Destination"
        : selectedRoute?.city || "Destination";

      // For multi-city, collect all hotels
      let primaryHotelId = hotelId;
      let primaryRoomId = roomId;
      
      if (isMultiCityTour()) {
        const firstHotel = Object.values(multiCityHotels)[0];
        primaryHotelId = firstHotel?.hotelId || "";
        primaryRoomId = firstHotel?.roomId || "";
      }

      // Prepare quotation data for result page
      const quotationData = {
        tripDate,
        startingPoint,
        routeId,
        destination,
        hotelId: primaryHotelId,
        roomType: primaryRoomId,
        vehicleName,
        numberOfRooms,
        adults,
        kids,
        tourType,
        // Include full breakdown
        transportCost: quotation.transportCost,
        hotelCost: quotation.hotelCost,
        jeepAddonsCost: quotation.jeepAddonsCost,
        subtotal: quotation.subtotal,
        markupAmount: quotation.markupAmount,
        totalCost: quotation.totalCost,
        perPersonCost: quotation.perPersonCost,
        // Include multi-city data
        multiCityHotels: isMultiCityTour() ? multiCityHotels : undefined,
        multiCityNights: isMultiCityTour() && routeId in multiCityConfig 
          ? Object.fromEntries(
              multiCityConfig[routeId as keyof typeof multiCityConfig].cities.map((city, i) => [
                city,
                multiCityConfig[routeId as keyof typeof multiCityConfig].nights[i],
              ])
            )
          : undefined,
      };

      // Encode data and redirect to result page
      const encoded = btoa(JSON.stringify(quotationData));

      // Also send to API for WhatsApp notification
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripDate,
          startingPoint,
          routeId,
          hotelId: primaryHotelId,
          roomId: primaryRoomId,
          vehicleName,
          numberOfRooms,
          adults,
          kids,
          customerName,
          customerPhone,
          tourType,
          mandatoryJeepCost,
          multiCityHotels: isMultiCityTour() ? multiCityHotels : undefined,
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

            <label className="grid gap-2 text-sm font-medium text-stone-900">
              Starting Point *
              <input
                type="text"
                required
                placeholder="e.g., Karachi, Islamabad, Lahore..."
                value={startingPoint}
                onChange={(e) => setStartingPoint(e.target.value)}
                className="rounded-[15px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
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

            {/* Mandatory Jeep Activities Alert */}
            {mandatoryJeepCost > 0 && routeActivities && (
              <div className="bg-red-50 border-2 border-red-300 rounded-[15px] p-4">
                <h3 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                  🚙 Included Jeep Activities
                </h3>
                <ul className="space-y-2">
                  {routeActivities.activities
                    .filter((a: any) => a.isJeepRequired)
                    .map((activity: any, idx: number) => (
                      <li key={idx} className="text-sm text-red-800 flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>
                          <strong>{activity.name}</strong> ({activity.location})
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {/* Hotel & Vehicle Selection */}
            {!isMultiCityTour() ? (
              <div className="space-y-4">
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

                {/* Hotel Image Display */}
                {hotelId && availableHotels.find((h) => h.id === hotelId)?.image && (
                  <div className="rounded-[15px] border border-stone-200 overflow-hidden bg-stone-100">
                    <img
                      src={availableHotels.find((h) => h.id === hotelId)?.image}
                      alt={availableHotels.find((h) => h.id === hotelId)?.name}
                      className="w-full h-40 object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {/* Room Image Display */}
                {roomId && availableRooms.find((r) => r.name === roomId)?.image && (
                  <div className="rounded-[15px] border border-stone-200 overflow-hidden bg-stone-100">
                    <img
                      src={availableRooms.find((r) => r.name === roomId)?.image}
                      alt={roomId}
                      className="w-full h-40 object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-[15px] border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm font-semibold text-amber-900 mb-4">
                  🏨 Multi-City Tour: Select Hotels for Each Destination
                </p>
                
                {isIslamabadHotelMandatory() && (
                  <div className="rounded-[10px] bg-red-50 border border-red-200 p-3 mb-4">
                    <p className="text-xs font-semibold text-red-800">
                      ⚠️ You're starting from {startingPoint}. Islamabad hotel stay is MANDATORY.
                    </p>
                  </div>
                )}

                {multiCityConfig[routeId]?.cities.map((city) => {
                  const hotelsForCity = getHotelsByCity(city);
                  const currentSelection = multiCityHotels[city];
                  const selectedHotel = hotelsForCity.find(
                    (h) => h.id === currentSelection?.hotelId
                  );
                  const nights = multiCityConfig[routeId]?.nights[
                    multiCityConfig[routeId]?.cities.indexOf(city)
                  ];
                  const isMandatory = city === "Islamabad" && isIslamabadHotelMandatory();
                  const isOptional = nights === 0 && !isMandatory;

                  return (
                    <div
                      key={city}
                      className={`mb-4 pb-4 border-b border-amber-200 last:border-b-0 ${
                        isMandatory ? "rounded-[10px] bg-red-50 p-3 border border-red-200" : ""
                      }`}
                    >
                      <p className="text-xs uppercase tracking-widest text-amber-800 mb-3">
                        {city}
                        {nights && nights > 0 && ` • ${nights} night${nights > 1 ? "s" : ""}`}
                        {isMandatory && " • REQUIRED"}
                        {isOptional && " • (Optional)"}
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <label className="grid gap-2 text-sm font-medium text-stone-900">
                          Hotel {isMandatory ? "* REQUIRED" : nights === 0 ? "(Optional)" : "*"}
                          <select
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
                            required={nights !== 0 || isMandatory}
                            className={`rounded-[10px] border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15 ${
                              isMandatory ? "border-red-300 focus:ring-red-200" : ""
                            }`}
                          >
                            <option value="">Select hotel...</option>
                            {hotelsForCity.map((hotel) => (
                              <option key={hotel.id} value={hotel.id}>
                                {hotel.name}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="grid gap-2 text-sm font-medium text-stone-900">
                          Room Type {isMandatory ? "* REQUIRED" : nights === 0 ? "" : "*"}
                          <select
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
                            required={nights !== 0 || isMandatory}
                            className={`rounded-[10px] border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15 disabled:bg-stone-100 disabled:text-stone-500 ${
                              isMandatory ? "border-red-300 focus:ring-red-200" : ""
                            }`}
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

                      {/* Hotel & Room Images for Multi-City */}
                      <div className="grid md:grid-cols-2 gap-3 mt-3">
                        {selectedHotel?.image && (
                          <div className="rounded-[10px] border border-stone-200 overflow-hidden bg-stone-100">
                            <img
                              src={selectedHotel.image}
                              alt={selectedHotel.name}
                              className="w-full h-28 object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                        {selectedHotel && currentSelection?.roomId && selectedHotel.rooms.find((r) => r.name === currentSelection.roomId)?.image && (
                          <div className="rounded-[10px] border border-stone-200 overflow-hidden bg-stone-100">
                            <img
                              src={selectedHotel.rooms.find((r) => r.name === currentSelection.roomId)?.image}
                              alt={currentSelection.roomId}
                              className="w-full h-28 object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

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
                Number of Rooms (Auto-Calculated)
                <div className="rounded-[15px] border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900">
                  <div className="font-semibold">{numberOfRooms} {numberOfRooms === 1 ? "Room" : "Rooms"}</div>
                  <div className="text-xs text-stone-600 mt-1">4 people max/room</div>
                </div>
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

            {!quotation && tripDate && routeId && vehicleName && (
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
