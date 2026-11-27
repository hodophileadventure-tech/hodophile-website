"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Suspense } from "react";
import { calculateQuotation, type QuotationBreakdown } from "@/lib/pricingEngine";
import { getHotelById, getHotelsByCity } from "@/lib/data/hotels";
import {
  getKashmirStayLocations,
  getCitiesWithOvernightStays,
  getCustomCityHotelLocation,
  getHotelStayLabel,
  type CustomCityHotelStay,
  type ShogranStayLocation,
} from "@/lib/data/custom-city-stays";
import { formatPKR } from "@/lib/currency";
import { PageShell } from "@/components/page-shell";
import { ItineraryViewer } from "@/components/make-my-trip/itinerary-viewer";
import { generateItinerary, type ItineraryGeneratorInput } from "@/lib/itinerary-generator";
import { decodeBase64Json, encodeBase64Json } from "@/lib/base64-json";

function QuotationEditContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [quotationData, setQuotationData] = useState<any>(null);
  const [customCityNights, setCustomCityNights] = useState<Record<string, number>>({});
  const [multiCityHotels, setMultiCityHotels] = useState<Record<string, { hotelId: string; roomId: string }>>({});
  const [singleCityHotelStays, setSingleCityHotelStays] = useState<Array<{ hotelId: string; roomId: string; nights: number }>>([]);
  const [customCityHotelStays, setCustomCityHotelStays] = useState<CustomCityHotelStay[]>([]);
  const [shogranStayLocation, setShogranStayLocation] = useState<ShogranStayLocation | null>(null);
  const [vehicleName, setVehicleName] = useState("");
  const [quotation, setQuotation] = useState<QuotationBreakdown | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteError, setQuoteError] = useState("");

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
        const decoded = decodeBase64Json(data) as typeof quotationData;
        setQuotationData(decoded);
        const decodedNights = decoded.multiCityNights || {};
        setCustomCityNights(
          Object.keys(decodedNights).length > 0
            ? decodedNights
            : Object.fromEntries((decoded.customCities || []).map((city: string) => [city, 1])),
        );
        setMultiCityHotels(decoded.multiCityHotels || {});
        setSingleCityHotelStays(decoded.singleCityHotelStays || []);
        setCustomCityHotelStays(decoded.customCityHotelStays || []);
        const selectedShogranHotel = getHotelById(decoded.multiCityHotels?.Shogran?.hotelId || "");
        if (selectedShogranHotel?.city === "Balakot" || selectedShogranHotel?.city === "Shogran") {
          setShogranStayLocation(selectedShogranHotel.city);
        } else {
          setShogranStayLocation(null);
        }
        setVehicleName(decoded.vehicleName || "");
      } catch (error) {
        console.error("Failed to decode quotation data:", error);
      }
    }
  }, [searchParams]);

  const overnightMultiCityHotels = useMemo(
    () => Object.fromEntries(
      Object.entries(multiCityHotels).filter(([city]) => (customCityNights[city] ?? 1) > 0),
    ),
    [multiCityHotels, customCityNights],
  );
  const isSingleCitySplitStay = Array.isArray(quotationData?.singleCityHotelStays) && quotationData.singleCityHotelStays.length > 0;
  const hasKashmirCustomStays = customCityHotelStays.length > 0;
  const cities = Array.isArray(quotationData?.customCities) ? quotationData.customCities : [];
  const displayNightsByCity = Object.fromEntries(
    cities.map((city: string) => [city, customCityNights[city] ?? 1]),
  );
  const overnightCities = getCitiesWithOvernightStays(cities, displayNightsByCity);
  const missingOvernightHotel = !isSingleCitySplitStay && overnightCities
    .filter((city) => city !== "Kashmir" || !hasKashmirCustomStays)
    .some(
    (city) => !overnightMultiCityHotels[city]?.hotelId || !overnightMultiCityHotels[city]?.roomId,
  );
  const splitStayCity = quotationData?.customCities?.[0] || quotationData?.destination || "";
  const itineraryConfiguration: ItineraryGeneratorInput | null = (() => {
    const stored = quotationData?.itineraryConfiguration as ItineraryGeneratorInput | undefined;
    if (!stored) return null;
    const currentNights = Object.keys(customCityNights).length > 0
      ? customCityNights
      : stored.nightsByCity;
    const originalNightTotal = Object.values(stored.nightsByCity).reduce((total, nights) => total + Math.max(0, nights), 0);
    const currentNightTotal = Object.values(currentNights).reduce((total, nights) => total + Math.max(0, nights), 0);
    return {
      ...stored,
      selectedCities: cities.length > 0 ? cities : stored.selectedCities,
      nightsByCity: currentNights,
      durationDays: stored.durationDays && currentNightTotal === originalNightTotal
        ? stored.durationDays
        : undefined,
      multiCityHotels: overnightMultiCityHotels,
      singleCityHotelStays: isSingleCitySplitStay ? singleCityHotelStays : stored.singleCityHotelStays,
      customCityHotelStays: hasKashmirCustomStays ? customCityHotelStays : stored.customCityHotelStays,
      vehicleName,
    };
  })();
  const generatedItinerary = itineraryConfiguration
    ? generateItinerary(itineraryConfiguration)
    : quotationData?.itinerary;

  // Recalculate quotation when edits are made
  useEffect(() => {
    if (!quotationData) return;

    const useSingleCitySplitStay = Array.isArray(quotationData.singleCityHotelStays) && quotationData.singleCityHotelStays.length > 0;
    if (missingOvernightHotel) return;

    if (
      quotationData.travelMode === "air" ||
      (typeof quotationData.promoCode === "string" && quotationData.promoCode)
    ) {
      let isCurrent = true;
      const quoteInput = {
        routeId: quotationData.routeId,
        vehicleName,
        hotelId: quotationData.hotelId,
        roomId: quotationData.roomType,
        hotelCategory: quotationData.hotelCategory,
        singleCityHotelStays: useSingleCitySplitStay ? singleCityHotelStays : undefined,
        customCityHotelStays: hasKashmirCustomStays ? customCityHotelStays : undefined,
        multiCityHotels: useSingleCitySplitStay ? undefined : overnightMultiCityHotels,
        multiCityNights: useSingleCitySplitStay ? undefined : customCityNights,
        customCities: quotationData.customCities,
        customRouteLabel: quotationData.customRouteLabel,
        travelMode: quotationData.travelMode,
        startingPoint: quotationData.startingPoint,
        routeDestinations: quotationData.routeDestinations,
        includeIslamabadTransit: quotationData.includeIslamabadTransit,
        numberOfRooms: quotationData.numberOfRooms,
        adults: quotationData.adults,
        kids: quotationData.kids,
        jeepAddons: quotationData.jeepAddons,
        tripDate: quotationData.tripDate,
      };

      void fetch("/api/quote/calc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...quoteInput, promoCode: quotationData.promoCode }),
      })
        .then(async (response) => ({ response, data: await response.json() }))
        .then(({ response, data }) => {
          if (!isCurrent) return;
          if (!response.ok || !data.success) {
            setQuotation(null);
            setQuoteError(data.error || "Unable to calculate the Skardu road route.");
            return;
          }
          setQuotation(data.quotation as QuotationBreakdown);
          setQuoteError("");
        })
        .catch(() => {
          if (isCurrent) {
            setQuotation(null);
            setQuoteError("Unable to calculate the Skardu road route. Please try again.");
          }
        });

      return () => {
        isCurrent = false;
      };
    }

    const updatedQuotation = calculateQuotation({
      routeId: quotationData.routeId,
      vehicleName,
      customCities: quotationData.customCities,
      customRouteLabel: quotationData.customRouteLabel,
      singleCityHotelStays: useSingleCitySplitStay ? singleCityHotelStays : undefined,
      customCityHotelStays: hasKashmirCustomStays ? customCityHotelStays : undefined,
      multiCityHotels: useSingleCitySplitStay ? undefined : overnightMultiCityHotels,
      multiCityNights: useSingleCitySplitStay ? undefined : customCityNights,
      numberOfRooms: quotationData.numberOfRooms,
      adults: quotationData.adults,
      kids: quotationData.kids,
      jeepAddons: quotationData.jeepAddons,
      tripDate: quotationData.tripDate,
      mandatoryJeepCost: 0,
      travelMode: quotationData.travelMode,
    });

    if (updatedQuotation) {
      setQuotation(updatedQuotation);
      setQuoteError("");
    }
  }, [customCityNights, multiCityHotels, missingOvernightHotel, overnightMultiCityHotels, singleCityHotelStays, customCityHotelStays, hasKashmirCustomStays, vehicleName, quotationData]);

  const handleProceed = async () => {
    if (missingOvernightHotel) return;
    setIsSubmitting(true);
    try {
      let authoritativeQuotation = quotation;
      if (quotationData?.travelMode === "air" || quotationData?.promoCode) {
        const response = await fetch("/api/quote/calc", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            routeId: quotationData.routeId,
            vehicleName,
            hotelId: quotationData.hotelId,
            roomId: quotationData.roomType,
            hotelCategory: quotationData.hotelCategory,
            singleCityHotelStays: isSingleCitySplitStay ? singleCityHotelStays : undefined,
            customCityHotelStays: hasKashmirCustomStays ? customCityHotelStays : undefined,
            multiCityHotels: isSingleCitySplitStay ? undefined : overnightMultiCityHotels,
            multiCityNights: isSingleCitySplitStay ? undefined : customCityNights,
            customCities: quotationData.customCities,
            customRouteLabel: quotationData.customRouteLabel,
            startingPoint: quotationData.startingPoint,
            routeDestinations: quotationData.routeDestinations,
            includeIslamabadTransit: quotationData.includeIslamabadTransit,
            numberOfRooms: quotationData.numberOfRooms,
            adults: quotationData.adults,
            kids: quotationData.kids,
            jeepAddons: quotationData.jeepAddons,
            tripDate: quotationData.tripDate,
            travelMode: quotationData.travelMode,
            promoCode: quotationData.promoCode,
          }),
        });
        const responseData = await response.json();
        if (!response.ok || !responseData.success) {
          throw new Error(responseData.error || "Unable to revalidate this promo code.");
        }
        authoritativeQuotation = responseData.quotation as QuotationBreakdown;
      }

      const updatedData = {
        ...quotationData,
        multiCityNights: customCityNights,
        multiCityHotels: overnightMultiCityHotels,
        vehicleName,
        transportCost: authoritativeQuotation?.transportCost,
        hotelCost: authoritativeQuotation?.hotelCost,
        jeepAddonsCost: authoritativeQuotation?.jeepAddonsCost,
        subtotal: authoritativeQuotation?.subtotal,
        markupAmount: authoritativeQuotation?.markupAmount,
        totalCost: authoritativeQuotation?.totalCost,
        perPersonCost: authoritativeQuotation?.perPersonCost,
        promotion: authoritativeQuotation?.promotion,
        singleCityHotelStays,
        customCityHotelStays,
        travelMode: quotationData?.travelMode,
        itineraryConfiguration: itineraryConfiguration ?? quotationData.itineraryConfiguration,
      };

      const encoded = encodeBase64Json(updatedData);
      router.push(`/quotation-result?data=${encoded}`);
    } catch (error) {
      console.error("Error proceeding:", error);
      setQuoteError(error instanceof Error ? error.message : "Unable to validate this quotation.");
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
            {hasKashmirCustomStays ? (
              <div className="rounded-[15px] border border-[#f4d77d] bg-white p-6">
                <h2 className="mb-2 font-semibold text-stone-900">Kashmir stays</h2>
                <p className="mb-4 text-sm text-stone-600">The first night must be in Keran or Neelum. Taobat is available June through October.</p>
                <div className="space-y-4">
                  {customCityHotelStays.map((stay, index) => {
                    const month = Number(quotationData.tripDate?.slice(5, 7)) || 5;
                    const locations = getKashmirStayLocations(index + 1, month);
                    const hotelsForStay = getHotelsByCity(stay.location);
                    const selectedHotel = hotelsForStay.find((hotel) => hotel.id === stay.hotelId);
                    return (
                      <div key={`kashmir-edit-night-${index + 1}`} className="rounded-[12px] border border-stone-200 p-4">
                        <p className="mb-3 text-sm font-semibold text-stone-900">Night {index + 1}</p>
                        <div className="grid gap-3 md:grid-cols-3">
                          <label className="grid gap-2 text-sm font-medium text-stone-900">
                            Stay location *
                            <select
                              required
                              value={stay.location}
                              onChange={(event) => {
                                const location = locations.find((option) => option === event.target.value);
                                if (!location) return;
                                setCustomCityHotelStays((current) =>
                                  current.map((item, itemIndex) =>
                                    itemIndex === index
                                      ? { ...item, location, hotelId: "", roomId: "" }
                                      : item
                                  )
                                );
                              }}
                              className="rounded-[10px] border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900"
                            >
                              {locations.map((location) => <option key={location} value={location}>{location}</option>)}
                            </select>
                          </label>
                          <label className="grid gap-2 text-sm font-medium text-stone-900 md:col-span-2">
                            Hotel *
                            <select
                              required
                              value={stay.hotelId}
                              onChange={(event) =>
                                setCustomCityHotelStays((current) =>
                                  current.map((item, itemIndex) =>
                                    itemIndex === index
                                      ? { ...item, hotelId: event.target.value, roomId: "" }
                                      : item
                                  )
                                )
                              }
                              className="rounded-[10px] border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900"
                            >
                              <option value="">Select hotel...</option>
                              {hotelsForStay.map((hotel) => <option key={hotel.id} value={hotel.id}>{hotel.name}</option>)}
                            </select>
                          </label>
                        </div>
                        <label className="mt-3 grid max-w-md gap-2 text-sm font-medium text-stone-900">
                          Room type *
                          <select
                            required
                            value={stay.roomId}
                            disabled={!selectedHotel}
                            onChange={(event) =>
                              setCustomCityHotelStays((current) =>
                                current.map((item, itemIndex) =>
                                  itemIndex === index ? { ...item, roomId: event.target.value } : item
                                )
                              )
                            }
                            className="rounded-[10px] border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 disabled:bg-stone-100"
                          >
                            <option value="">Select room...</option>
                            {selectedHotel?.rooms.map((room) => <option key={room.name} value={room.name}>{room.name}</option>)}
                          </select>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
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
                {overnightCities.length === 0 ? (
                  <p className="rounded-[12px] border border-green-200 bg-white p-4 text-sm text-stone-700">
                    These destinations are day trips. Only transportation is included; no accommodation is charged.
                  </p>
                ) : null}
                {overnightCities.map((city: string) => {
                  const hotelCity = getCustomCityHotelLocation(city, cities, shogranStayLocation ?? undefined);
                  const hotelsForCity = getHotelsByCity(hotelCity);
                  const currentSelection = multiCityHotels[city];
                  const selectedHotel = hotelsForCity.find(h => h.id === currentSelection?.hotelId);
                  const nights = displayNightsByCity[city];

                  return (
                    <div key={city} className="mb-6 pb-6 border-b border-green-200 last:border-b-0">
                      <p className="text-sm font-semibold text-green-900 mb-3">
                        {getHotelStayLabel(city, hotelCity)} · {nights} night{nights === 1 ? "" : "s"}
                      </p>
                      {city === "Shogran" && cities.length > 1 ? (
                        <label className="mb-3 grid max-w-sm gap-2 text-sm font-medium text-stone-900">
                          Overnight stay location
                          <select
                            value={hotelCity}
                            onChange={(event) => {
                              setShogranStayLocation(event.target.value === "Shogran" ? "Shogran" : "Balakot");
                              setMultiCityHotels((current) => {
                                const next = { ...current };
                                delete next.Shogran;
                                return next;
                              });
                            }}
                            className="rounded-[10px] border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
                          >
                            <option value="Balakot">Balakot (default)</option>
                            <option value="Shogran">Shogran</option>
                          </select>
                        </label>
                      ) : null}
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
            {quotation && !missingOvernightHotel && (
              <div className="rounded-[15px] border-2 border-[#fcc000] bg-[#fcc000]/10 p-6 text-center">
                <p className="text-stone-600 text-sm mb-3">💰 Updated Total Trip Cost</p>
                <p className="font-serif text-5xl text-[#fcc000] font-bold">
                  {formatPKR(quotation.totalCost)}
                </p>
                {quotation.promotion ? (
                  <div className="mx-auto mt-4 max-w-sm border-t border-[#fcc000]/30 pt-3 text-left text-sm">
                    <p className="font-semibold text-green-800">{quotation.promotion.code} · {quotation.promotion.discountPercent}% off</p>
                    <div className="mt-2 flex justify-between gap-3 text-stone-600"><span>Original total</span><span className="line-through">{formatPKR(quotation.promotion.originalPrice)}</span></div>
                    <div className="mt-1 flex justify-between gap-3 font-semibold text-green-800"><span>Discount</span><span>−{formatPKR(quotation.promotion.discountAmount)}</span></div>
                  </div>
                ) : null}
                <p className="text-stone-600 text-sm mt-3">
                  Per Person: {formatPKR(quotation.perPersonCost || 0)}
                </p>
              </div>
            )}
            {quotationData.travelMode === "air" ? (
              <div className="rounded-[15px] border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
                <p className="font-semibold">Travel Mode: By Air · Arrival &amp; Departure Hub: Skardu</p>
                <p className="mt-1 font-bold">Air Tickets: NOT INCLUDED</p>
                <p className="mt-1">Air tickets to and from Skardu are not included in this quotation. Customers are responsible for arranging their own flight tickets.</p>
              </div>
            ) : null}
            {generatedItinerary ? <ItineraryViewer itinerary={generatedItinerary} /> : null}
            {quoteError ? (
              <p role="alert" className="rounded-[15px] border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                {quoteError}
              </p>
            ) : null}
            {missingOvernightHotel ? (
              <p role="alert" className="rounded-[15px] border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                Select a hotel and room for every overnight stay.
              </p>
            ) : null}

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
                disabled={isSubmitting || !quotation || Boolean(quoteError) || missingOvernightHotel}
                className="px-8 py-3 rounded-[10px] bg-[#fcc000] text-black font-semibold hover:bg-[#fcc000]/90 transition disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-700 disabled:opacity-100"
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
    <PageShell wide>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>}>
        <QuotationEditContent />
      </Suspense>
    </PageShell>
  );
}
