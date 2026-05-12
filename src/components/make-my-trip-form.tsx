"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  CarFront,
  Check,
  Compass,
  Sparkles,
  Hotel as HotelIcon,
  Baby,
  Map,
  MapPin,
  Phone,
  PlaneTakeoff,
  BedDouble,
  User,
  Users,
  TriangleAlert,
} from "lucide-react";
import { calculateQuotation, type QuotationBreakdown } from "@/lib/pricingEngine";
import { getHotelsByCity, type Hotel } from "@/lib/data/hotels";
import { routes, type Route } from "@/lib/data/routes";
import { getMandatoryJeepCost, getMandatoryJeepCostForCities } from "@/lib/data/routeActivities";
import { sortedCitiesWithHotels } from "@/lib/data/cities";
import { featuredTourCards } from "@/lib/data/featured-tour-cards";

// Map featured tours to their corresponding route slugs
const PREPLANNED_TRIP_MAP: Record<string, string> = {
  "kashmir-taobat": "kashmir-taobat",
  "skardu-deosai": "skardu-shigar-shangrila",
  "hunza-skardu": "naran-hunza-skardu-deosai",
  "hunza-naltar": "naran-hunza-naltar",
};

// Get cities for a multi-city route
function getCitiesForRoute(route: Route): string[] {
  if (route.city === "Multi-City") {
    // Extract cities from the route name or itinerary
    if (route.slug.includes("hunza") && route.slug.includes("skardu")) {
      return ["Naran", "Hunza", "Skardu"];
    }
    if (route.slug.includes("hunza") && route.slug.includes("naltar")) {
      return ["Naran", "Hunza", "Naltar"];
    }
  }
  return [route.city];
}

const CUSTOM_AVAILABLE_VEHICLES = [
  { name: "Toyota Corolla", price: 0 },
  { name: "Honda BRV", price: 0 },
  { name: "Prado", price: 0 },
  { name: "Grand Cabin Petrol", price: 0 },
  { name: "Grand Cabin Diesel", price: 0 },
  { name: "Coaster 4C", price: 0 },
  { name: "Coaster 5C", price: 0 },
];

const phoneRegex13Digit = /^\+92\d{10}$/;
const phoneRegex11Digit = /^03\d{9}$/;
const LABEL_ICON_CLASS = "h-4 w-4 shrink-0 text-black";
const VALIDATION_ICON_CLASS = "h-4 w-4 shrink-0 text-black";

export function MakeMyTripForm() {
  const router = useRouter();
  
  // Form state
  const [tripDate, setTripDate] = useState("");
  const [startingPoint, setStartingPoint] = useState("");
  const [otherStartingPoint, setOtherStartingPoint] = useState("");
  const [hideAutoIslamabad, setHideAutoIslamabad] = useState(false);
  const [routeId, setRouteId] = useState("");
  const [selectedCities, setSelectedCities] = useState<string[]>([]); // For individual city selection
  const [customCityNights, setCustomCityNights] = useState<Record<string, number>>({});
  const [hotelCategory, setHotelCategory] = useState("standard"); // standard, deluxe, executive
  const [hotelId, setHotelId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [singleCityHotelStays, setSingleCityHotelStays] = useState<Array<{ hotelId: string; roomId: string; nights: number }>>([]);
  const [multiCityHotels, setMultiCityHotels] = useState<Record<string, { hotelId: string; roomId: string }>>({});
  const [vehicleName, setVehicleName] = useState("");
  const [tourType, setTourType] = useState("private");
  const [travelMode, setTravelMode] = useState("road");
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [kidsAges, setKidsAges] = useState<string[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedPreplannedTrip, setSelectedPreplannedTrip] = useState("");
  const [preplannedRoute, setPreplannedRoute] = useState<Route | null>(null);
  const [showLuxuryDropdown, setShowLuxuryDropdown] = useState(false);
  const [selectedLuxuryPackage, setSelectedLuxuryPackage] = useState<string | null>(null);
  const [showHoneymoonDropdown, setShowHoneymoonDropdown] = useState(false);
  const [selectedHoneymoonTour, setSelectedHoneymoonTour] = useState<string | null>(null);

  // Luxury planning packages mapping
  const luxuryPackages: Record<string, { label: string; routeSlug: string; cities: string[] }> = {
    "skardu-deosai": { label: "5 Days Skardu & Deosai", routeSlug: "skardu-shigar-shangrila", cities: ["Skardu"] },
    "hunza-skardu": { label: "8 Day Hunza & Skardu", routeSlug: "naran-hunza-skardu-deosai", cities: ["Hunza", "Skardu"] },
  };

  // UI state
  const [quotation, setQuotation] = useState<QuotationBreakdown | null>(null);
  const [availableHotels, setAvailableHotels] = useState<Hotel[]>([]);
  const [availableRooms, setAvailableRooms] = useState<any[]>([]);
  const [availableVehicles, setAvailableVehicles] = useState<Array<{ name: string; price: number }>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [mandatoryJeepCost, setMandatoryJeepCost] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const previousQuotationRef = useRef<QuotationBreakdown | null>(null);
  const luxuryDropdownRef = useRef<HTMLDivElement | null>(null);
  const honeymoonDropdownRef = useRef<HTMLDivElement | null>(null);

  // Close luxury dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (luxuryDropdownRef.current && !luxuryDropdownRef.current.contains(event.target as Node)) {
        setShowLuxuryDropdown(false);
      }
      if (honeymoonDropdownRef.current && !honeymoonDropdownRef.current.contains(event.target as Node)) {
        setShowHoneymoonDropdown(false);
      }
    };
    if (showLuxuryDropdown || showHoneymoonDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showLuxuryDropdown, showHoneymoonDropdown]);

  // Handle luxury package selection
  const handleLuxuryPackageSelect = (packageKey: string) => {
    const packageData = luxuryPackages[packageKey];
    if (!packageData) return;

    setSelectedLuxuryPackage(packageKey);
    setShowLuxuryDropdown(false);
    
    // Select the route
    const matchedRoute = routes.find((r) => r.slug === packageData.routeSlug);
    if (matchedRoute) {
      // Automatically set travel mode to "By Air"
      setTravelMode("air");

      // Auto-select Prado as vehicle
      setVehicleName("Prado");

      // Set hotel category to executive
      setHotelCategory("executive");

      // Set default trip date if not already set (use today's date or next week)
      if (!tripDate) {
        const defaultDate = new Date();
        defaultDate.setDate(defaultDate.getDate() + 7);
        setTripDate(defaultDate.toISOString().split('T')[0]);
      }

      // Ensure we have at least 2 adults and 0 kids for calculations
      if (adults < 2) setAdults(2);
      if (kids < 0) setKids(0);

      // For luxury packages we treat the form as a custom-city selection so
      // the UI shows per-city executive hotel lists and we can set exact days.
      // Clear any routeId so isCustomCitySelection() becomes true.
      setRouteId("");

      // Use package cities (e.g., ["Skardu"] or ["Hunza","Skardu"]).
      setSelectedCities(packageData.cities);

      // Set total days based on package and distribute nights across cities.
      const packageDays = packageKey === "skardu-deosai" ? 5 : packageKey === "hunza-skardu" ? 8 : matchedRoute.duration;
      const totalNights = Math.max(1, packageDays - 1);
      const cities = packageData.cities;
      const base = Math.floor(totalNights / cities.length);
      let rem = totalNights % cities.length;
      const daysPerCity: Record<string, number> = {};
      for (const city of cities) {
        const nightsForCity = base + (rem > 0 ? 1 : 0);
        rem = Math.max(0, rem - 1);
        // Store days (not nights) because other code expects days in customCityNights
        daysPerCity[city] = nightsForCity + 0; // nights -> add 0 then later convert to days below
      }
      // Convert nights to days (days = nights + 1)
      const daysPerCityAsDays: Record<string, number> = {};
      for (const city of Object.keys(daysPerCity)) {
        daysPerCityAsDays[city] = daysPerCity[city] + 1;
      }
      setCustomCityNights(daysPerCityAsDays);

      // Auto-initialize multi-city hotels with executive category for each package city
      const defaults: Record<string, { hotelId: string; roomId: string }> = {};
      for (const city of cities) {
        const hotelsForCity = getHotelsByCity(city).filter((h) => h.rooms?.some((r) => /executive/i.test(r.name)));
        if (hotelsForCity.length > 0) {
          const defaultHotelId = selectHotelByCategory(hotelsForCity, "executive");
          const selectedHotel = hotelsForCity.find((h) => h.id === defaultHotelId);
          const defaultRoom = selectedHotel ? selectRoomByCategory(selectedHotel.rooms.filter((r) => /executive/i.test(r.name)), "executive") : "";
          defaults[city] = { hotelId: defaultHotelId, roomId: defaultRoom };
        }
      }
      setMultiCityHotels(defaults);

      // Clear error message
      setSubmitError("");
    }
  };

  // Handle honeymoon tour selection from featured tours
  const handleHoneymoonTourSelect = (tourSlug: string) => {
    const routeSlug = PREPLANNED_TRIP_MAP[tourSlug];
    const matchedRoute = routes.find((r) => r.slug === routeSlug);
    if (matchedRoute) {
      setSelectedHoneymoonTour(tourSlug);
      setShowHoneymoonDropdown(false);
      setRouteId(matchedRoute.id);
      setSelectedCities(matchedRoute.city === "Multi-City" ? [matchedRoute.city] : [matchedRoute.city]);
      setHotelCategory("standard");
      setVehicleName("");
      setMultiCityHotels({});
      // User can now select travel mode, vehicle, hotel, etc.
    }
  };

  // Handle preplanned trip selection
  useEffect(() => {
    if (selectedPreplannedTrip) {
      const routeSlug = PREPLANNED_TRIP_MAP[selectedPreplannedTrip];
      const matchedRoute = routes.find((r) => r.slug === routeSlug);
      if (matchedRoute) {
        setPreplannedRoute(matchedRoute);
        setRouteId(matchedRoute.id);
        setTourType("private"); // Lock to private tours
        setHideAutoIslamabad(false); // Reset Islamabad toggle
        
        // For multi-city routes, cities are defined in multiCityConfig
        // For single-city routes, use the route's city
        const cities = matchedRoute.city === "Multi-City" 
          ? [matchedRoute.city] // Will use multiCityConfig for actual cities
          : [matchedRoute.city];
        setSelectedCities(cities);
        setCustomCityNights({}); // Clear custom nights - they'll be set by hotel selection
        
        // Clear hotel selections - they'll be auto-populated when route loads
        setHotelId("");
        setRoomId("");
        setMultiCityHotels({});
        setVehicleName("");
      }
    } else {
      setPreplannedRoute(null);
      setRouteId("");
      setSelectedCities([]);
      setCustomCityNights({});
    }
  }, [selectedPreplannedTrip]);

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

  const getActualStartingPoint = (): string => {
    return startingPoint === "Other" ? otherStartingPoint.trim() : startingPoint;
  };

  // Check if Islamabad hotel is mandatory
  const isIslamabadHotelMandatory = (): boolean => {
    if (!isMultiCityTour()) return false;
    const config = multiCityConfig[routeId as keyof typeof multiCityConfig];
    if (!config || !config.cities.includes("Islamabad")) return false;
    const startingPointLower = getActualStartingPoint().toLowerCase().trim();
    return (
      startingPointLower !== "islamabad" &&
      startingPointLower !== "lahore" &&
      startingPointLower !== "rawalpindi"
    );
  };

  // Multi-city itinerary configuration
  const multiCityConfig: Record<string, { cities: string[]; nights: number[] }> = {
    "naran-hunza-skardu-deosai-12days": {
      cities: ["Islamabad", "Skardu", "Hunza", "Naran"],
      nights: [0, 3, 2, 1], // Islamabad is for optional pre-tour stay
    },
    "skardu-shigar-shangrila-10days": {
      cities: ["Islamabad", "Chilas", "Skardu", "Naran"],
      nights: [2, 1, 4, 1], // Karachi members: ISB stay + tour nights
    },
    "naran-hunza-naltar-10days": {
      cities: ["Islamabad", "Chilas", "Hunza", "Naran"],
      nights: [2, 1, 3, 1], // Karachi members: ISB stay + tour nights
    },
    "kashmir-taobat-9days": {
      cities: ["Islamabad", "Sharda", "Taobat", "Arangkel", "Keran"],
      nights: [2, 1, 1, 1, 1], // Karachi flow: 2 ISB nights + Sharda/Taobat/Arangkel/Keran
    },
  };

  // Route-specific hotel curation for location-accurate group tours.
  const routeCityHotelPreferences: Record<string, Record<string, string[]>> = {
    "kashmir-taobat-9days": {
      Islamabad: ["hotel-index-islamabad", "hotel-redline-islamabad", "grand-hotel-islamabad"],
      Sharda: ["sharda-lodge-kashmir"],
      Taobat: ["corner-view-cottage-taobat", "shangrila-taobat"],
      Arangkel: ["corner-cottage-arangkel", "arangkel-wanderlust-resort", "arangkel-wanderlust-resort-second"],
      Keran: ["ibex-cottage-keran", "keran-resort-kashmir", "timber-resort-keran"],
    },
  };

  const getHotelsForRouteCity = (selectedRouteId: string, city: string): Hotel[] => {
    const baseHotels = getHotelsByCity(city);
    const preferredIds = routeCityHotelPreferences[selectedRouteId]?.[city];

    if (!preferredIds || preferredIds.length === 0) {
      return baseHotels;
    }

    const preferred = baseHotels.filter((hotel) => preferredIds.includes(hotel.id));
    return preferred.length > 0 ? preferred : baseHotels;
  };

  const isMultiCityTour = (): boolean => {
    return multiCityConfig[routeId] !== undefined;
  };

  const getVisibleMultiCityConfig = (selectedRouteId: string) => {
    const config = multiCityConfig[selectedRouteId as keyof typeof multiCityConfig];
    if (!config) return null;

    const cities = config.cities.filter((city) => city !== "Islamabad" || isIslamabadHotelMandatory());
    const nights = cities.map((city) => config.nights[config.cities.indexOf(city)]);

    return { cities, nights };
  };

  // Initialize multi-city hotels with defaults
  const initializeMultiCityHotels = (route: Route) => {
    const config = multiCityConfig[route.id];
    if (config) {
      const defaults: Record<string, { hotelId: string; roomId: string }> = {};
      for (const city of config.cities) {
        const hotelsForCity = getHotelsForRouteCity(route.id, city);
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

  // Check if user is using custom city selection instead of a package route
  const isCustomCitySelection = (): boolean => {
    return selectedCities.length > 0 && !routeId;
  };

  // Check if user is using a package route
  const isPackageRoute = (): boolean => {
    return !!routeId && selectedCities.length === 0;
  };

  const selectedRoute = useMemo(() => (routeId ? routes.find((route) => route.id === routeId) : undefined), [routeId]);
  const singleCityNightCount = Math.max(1, (selectedRoute?.duration || 1) - 1);
  const supportsMultipleHotelsInSingleCity = Boolean(
    selectedRoute && !isMultiCityTour() && !isCustomCitySelection() && singleCityNightCount > 2
  );
  const isSingleCustomCity = isCustomCitySelection() && selectedCities.length === 1;
  const customSingleCityNightCount = selectedCities.length === 1
    ? Math.max(1, (customCityNights[selectedCities[0]] ?? 0) - 1)
    : 0;
  const supportsMultipleHotelsInCustomSingleCity = Boolean(
    isCustomCitySelection() &&
    selectedCities.length === 1 &&
    customSingleCityNightCount > 2
  );

  const vehicleOptions = routeId
    ? availableVehicles
    : isCustomCitySelection()
    ? CUSTOM_AVAILABLE_VEHICLES
    : [];

  const shouldAutoIncludeIslamabad = (): boolean => {
    if (!isCustomCitySelection()) return false;

    const startingPointLower = getActualStartingPoint().toLowerCase().trim();
    const needsIslamabad =
      startingPointLower !== "islamabad" &&
      startingPointLower !== "lahore" &&
      startingPointLower !== "rawalpindi" &&
      startingPointLower !== "";

    return needsIslamabad && !hideAutoIslamabad;
  };

  const effectiveSelectedCities = useMemo(() => {
    if (shouldAutoIncludeIslamabad() && !selectedCities.includes("Islamabad")) {
      return [...selectedCities, "Islamabad"];
    }
    return selectedCities;
  }, [selectedCities, startingPoint, otherStartingPoint, routeId, hideAutoIslamabad]);

  const effectiveCustomCityNights = useMemo(() => {
    if (shouldAutoIncludeIslamabad() && !customCityNights["Islamabad"]) {
      return { ...customCityNights, Islamabad: 2 };
    }
    return customCityNights;
  }, [customCityNights, startingPoint, otherStartingPoint, routeId, hideAutoIslamabad]);

  const effectiveMultiCityHotels = useMemo(() => {
    if (!shouldAutoIncludeIslamabad() || multiCityHotels["Islamabad"]?.hotelId) {
      return multiCityHotels;
    }

    let hotelsForIsb = getHotelsByCity("Islamabad");
    if (selectedLuxuryPackage) {
      hotelsForIsb = hotelsForIsb.filter((h) => h.rooms?.some((r) => /executive/i.test(r.name)));
    }
    const defaultHotelId = selectHotelByCategory(hotelsForIsb, hotelCategory);
    const selectedHotel = hotelsForIsb.find((h) => h.id === defaultHotelId);
    const defaultRoom = selectedHotel ? selectRoomByCategory(selectedHotel.rooms, hotelCategory) : "";

    return {
      ...multiCityHotels,
      Islamabad: { hotelId: defaultHotelId, roomId: defaultRoom },
    };
  }, [multiCityHotels, hotelCategory, startingPoint, otherStartingPoint, routeId, hideAutoIslamabad]);

  const initializeSingleCityHotelStays = (route: Route) => {
    let hotels = getHotelsByCity(route.city).filter(
      (hotel) => hotel.city !== "Islamabad" || isIslamabadHotelMandatory(),
    );
    if (selectedLuxuryPackage) {
      hotels = hotels.filter((h) => h.rooms?.some((r) => /executive/i.test(r.name)));
    }

    setAvailableHotels(hotels);

    if (supportsMultipleHotelsInSingleCity) {
      const defaultHotelId = selectHotelByCategory(hotels, hotelCategory);
      const selectedHotel = hotels.find((hotel) => hotel.id === defaultHotelId);
      const defaultRoom = selectedHotel ? selectRoomByCategory(selectedHotel.rooms, hotelCategory) : "";

      setSingleCityHotelStays((currentStays) =>
        currentStays.length > 0
          ? currentStays
          : [
              {
                hotelId: defaultHotelId,
                roomId: defaultRoom,
                nights: singleCityNightCount,
              },
            ]
      );
      setHotelId("");
      setRoomId("");
    } else {
      setSingleCityHotelStays([]);
      const defaultHotelId = selectHotelByCategory(hotels, hotelCategory);
      setHotelId(defaultHotelId);
      setRoomId("");
    }
  };

  const initializeCustomSingleCityHotelStays = (city: string, nights: number) => {
    let hotels = getHotelsByCity(city).filter((hotel) => hotel.city !== "Islamabad" || isIslamabadHotelMandatory());
    if (selectedLuxuryPackage) {
      hotels = hotels.filter((h) => h.rooms?.some((r) => /executive/i.test(r.name)));
    }
    setAvailableHotels(hotels);

    if (singleCityHotelStays.length === 0) {
      const defaultHotelId = selectHotelByCategory(hotels, hotelCategory);
      const selectedHotel = hotels.find((hotel) => hotel.id === defaultHotelId);
      const defaultRoom = selectedHotel ? selectRoomByCategory(selectedHotel.rooms, hotelCategory) : "";
      setSingleCityHotelStays([
        {
          hotelId: defaultHotelId,
          roomId: defaultRoom,
          nights,
        },
      ]);
    }
  };

  useEffect(() => {
    if (!supportsMultipleHotelsInCustomSingleCity) return;
    initializeCustomSingleCityHotelStays(selectedCities[0], customSingleCityNightCount);
  }, [supportsMultipleHotelsInCustomSingleCity, selectedCities, customSingleCityNightCount, hotelCategory]);

  useEffect(() => {
    if (!supportsMultipleHotelsInCustomSingleCity) return;

    const totalSelectedNights = singleCityHotelStays.reduce((sum, stay) => sum + Math.max(0, stay.nights), 0);
    const remainingNights = customSingleCityNightCount - totalSelectedNights;
    const lastStay = singleCityHotelStays[singleCityHotelStays.length - 1];
    const hasSelectableLastStay = Boolean(lastStay?.hotelId && lastStay?.roomId);

    if (remainingNights > 0 && hasSelectableLastStay) {
      const trailingBlankStay = singleCityHotelStays[singleCityHotelStays.length - 1];
      if (!trailingBlankStay || trailingBlankStay.hotelId || trailingBlankStay.roomId) {
        setSingleCityHotelStays((current) => [...current, { hotelId: "", roomId: "", nights: remainingNights }]);
      }
    }
  }, [supportsMultipleHotelsInCustomSingleCity, singleCityHotelStays, customSingleCityNightCount]);

  const toggleCitySelection = (city: string) => {
    setSelectedCities((currentCities) => {
      if (currentCities.includes(city)) {
        const updatedCities = currentCities.filter((selectedCity) => selectedCity !== city);
        setMultiCityHotels((currentHotels) => {
          const nextHotels = { ...currentHotels };
          delete nextHotels[city];
          return nextHotels;
        });
        if (city === "Islamabad") {
          setHideAutoIslamabad(false);
        }
        setCustomCityNights((currentNights) => {
          const nextNights = { ...currentNights };
          delete nextNights[city];
          return nextNights;
        });
        return updatedCities;
      }

      if (routeId) {
        setRouteId("");
      }

      if (city === "Islamabad") {
        setHideAutoIslamabad(false);
      }

      setCustomCityNights((currentNights) => ({
        ...currentNights,
        [city]: currentNights[city] ?? 2,
      }));

      return [...currentCities, city];
    });
  };

  // Update available vehicles when route changes or when custom cities are selected
  useEffect(() => {
    if (selectedRoute) {
      setAvailableVehicles(selectedRoute.vehicles);
      setVehicleName("");

      // Update mandatory jeep cost and route activities
      const jeepCost = getMandatoryJeepCost(routeId);
      setMandatoryJeepCost(jeepCost);
    }
  }, [selectedRoute, routeId]);

  // Update available hotels when route changes
  useEffect(() => {
    if (selectedRoute) {
      if (isMultiCityTour()) {
        initializeMultiCityHotels(selectedRoute);
        setHotelId(""); // Clear single-city hotel for multi-city tours
      } else if (supportsMultipleHotelsInSingleCity) {
        initializeSingleCityHotelStays(selectedRoute);
      } else {
        let hotels = getHotelsByCity(selectedRoute.city).filter(
          (hotel) => hotel.city !== "Islamabad" || isIslamabadHotelMandatory(),
        );
        if (selectedLuxuryPackage) {
          hotels = hotels.filter((h) => h.rooms?.some((r) => /executive/i.test(r.name)));
        }
        setAvailableHotels(hotels);

        // Auto-select hotel based on category (not just first)
        const defaultHotelId = selectHotelByCategory(hotels, hotelCategory);
        setHotelId(defaultHotelId);
        setRoomId("");
      }
    }
  }, [selectedRoute, hotelCategory, startingPoint, otherStartingPoint, supportsMultipleHotelsInSingleCity]);

  // Update hotel selections when hotel category changes
  useEffect(() => {
    if (!selectedRoute) return;

    if (isMultiCityTour()) {
      initializeMultiCityHotels(selectedRoute);
    } else if (supportsMultipleHotelsInSingleCity) {
      initializeSingleCityHotelStays(selectedRoute);
    } else if (availableHotels.length > 0) {
      // For single-city tours, update hotel selection based on category
      const newHotelId = selectHotelByCategory(availableHotels, hotelCategory);
      setHotelId(newHotelId);
      setRoomId("");
    }
  }, [hotelCategory, selectedRoute, supportsMultipleHotelsInSingleCity]);

  // Update available rooms when hotel changes
  useEffect(() => {
    if (hotelId) {
      const selectedHotel = availableHotels.find((h) => h.id === hotelId);
      if (selectedHotel) {
        // If luxury package active, only expose rooms that explicitly include 'executive' in the name
        const roomsToShow = selectedLuxuryPackage
          ? selectedHotel.rooms.filter((r) => /executive/i.test(r.name))
          : selectedHotel.rooms;
        setAvailableRooms(roomsToShow);

        // Auto-select room based on category using price tier (within filtered rooms)
        const defaultRoom = selectRoomByCategory(roomsToShow, hotelCategory);
        setRoomId(defaultRoom);
      }
    }
  }, [hotelId, availableHotels, hotelCategory]);

  // Validate vehicle based on guest count
  useEffect(() => {
    if (vehicleName && !isVehicleSuitable(vehicleName, totalGuests)) {
      // Find a suitable vehicle for this guest count
      const suitableVehicle = vehicleOptions.find((v) =>
        isVehicleSuitable(v.name, totalGuests)
      );
      
      if (suitableVehicle) {
        setVehicleName(suitableVehicle.name);
      } else {
        setVehicleName("");
      }
    }
  }, [adults, kids, totalGuests, vehicleName, vehicleOptions]);

  // Auto-calculate rooms based on guest count (max 4 per room)
  useEffect(() => {
    const roomsNeeded = calculateRoomsNeeded(totalGuests);
    setNumberOfRooms(roomsNeeded);
  }, [adults, kids, totalGuests]);

  // Calculate quotation when key fields change
  useEffect(() => {
    if (tripDate && vehicleName && numberOfRooms > 0 && adults > 0) {
      if (isCustomCitySelection()) {
        if (supportsMultipleHotelsInCustomSingleCity) {
          const totalSingleCityNights = singleCityHotelStays.reduce((sum, stay) => sum + Math.max(0, stay.nights), 0);
          const allStaysSelected = singleCityHotelStays.length > 0 && singleCityHotelStays.every((stay) => stay.hotelId && stay.roomId && stay.nights > 0);

          if (allStaysSelected && totalSingleCityNights === customSingleCityNightCount) {
            const customJeepCost = getMandatoryJeepCostForCities(
              effectiveSelectedCities.filter((city) => city !== "Islamabad")
            );
            const calc = calculateQuotation({
              routeId: "custom-itinerary",
              vehicleName,
              customCities: effectiveSelectedCities,
              customRouteLabel: effectiveSelectedCities.join(" + "),
              singleCityHotelStays,
              numberOfRooms,
              adults,
              kids,
              tripDate,
              mandatoryJeepCost: customJeepCost,
              travelMode: travelMode as "road" | "air",
            });
            setQuotation(calc);
          } else {
            setQuotation(null);
          }
        } else {
          // Custom city selection - treat as multi-city
          const allHotelsSelected = effectiveSelectedCities.every(
            (city) => effectiveMultiCityHotels[city]?.hotelId && effectiveMultiCityHotels[city]?.roomId
          );
          const allNightsSelected = effectiveSelectedCities.every((city) => (effectiveCustomCityNights[city] ?? 0) > 0);

          if (allHotelsSelected && allNightsSelected) {
            const customJeepCost = getMandatoryJeepCostForCities(
              effectiveSelectedCities.filter((city) => city !== "Islamabad")
            );
            const calc = calculateQuotation({
              routeId: "custom-itinerary",
              vehicleName,
              customCities: effectiveSelectedCities,
              customRouteLabel: effectiveSelectedCities.join(" + "),
              multiCityHotels: effectiveMultiCityHotels,
              multiCityNights: effectiveCustomCityNights,
              numberOfRooms,
              adults,
              kids,
              tripDate,
              mandatoryJeepCost: customJeepCost,
              travelMode: travelMode as "road" | "air",
            });
            setQuotation(calc);
          } else {
            setQuotation(null);
          }
        }
      } else if (selectedRoute) {
        if (isMultiCityTour()) {
            // Build multiCityNights from config
            const config = getVisibleMultiCityConfig(routeId);
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
                  travelMode: travelMode as "road" | "air",
                });
                setQuotation(calc);
              } else {
                setQuotation(null);
              }
            }
        } else if (supportsMultipleHotelsInSingleCity) {
          const totalSingleCityNights = singleCityHotelStays.reduce((sum, stay) => sum + Math.max(0, stay.nights), 0);
          const allStaysSelected = singleCityHotelStays.length > 0 && singleCityHotelStays.every((stay) => stay.hotelId && stay.roomId && stay.nights > 0);

          if (allStaysSelected && totalSingleCityNights === singleCityNightCount) {
            const calc = calculateQuotation({
              routeId,
              vehicleName,
              hotelId: singleCityHotelStays[0]?.hotelId,
              roomId: singleCityHotelStays[0]?.roomId,
              singleCityHotelStays,
              numberOfRooms,
              adults,
              kids,
              tripDate,
              mandatoryJeepCost,
              travelMode: travelMode as "road" | "air",
            });
            setQuotation(calc);
          } else {
            setQuotation(null);
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
              travelMode: travelMode as "road" | "air",
            });
            setQuotation(calc);
          } else {
            setQuotation(null);
          }
      }
    } else {
      setQuotation(null);
    }
  }, [tripDate, routeId, selectedRoute, hotelId, roomId, vehicleName, numberOfRooms, adults, kids, multiCityHotels, customCityNights, mandatoryJeepCost, selectedCities, effectiveSelectedCities, effectiveCustomCityNights, effectiveMultiCityHotels, singleCityHotelStays, singleCityNightCount, supportsMultipleHotelsInSingleCity, travelMode]);

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

      // Validate phone number
      const phoneRegex13Digit = /^\+92\d{10}$/; // +92 followed by 10 digits (13 total)
      const phoneRegex11Digit = /^03\d{9}$/; // 03 followed by 9 digits (11 total)
      
      if (!phoneRegex13Digit.test(customerPhone) && !phoneRegex11Digit.test(customerPhone)) {
        setSubmitError("Phone number must be either +92XXXXXXXXXX (13 digits) or 03XXXXXXXXX (11 digits)");
        setIsSubmitting(false);
        return;
      }

      // For multi-city, collect all hotels
      let primaryHotelId = hotelId;
      let primaryRoomId = roomId;
      
      let selectedMultiCityNights;
      let selectedCustomCities: string[] | undefined;
      let selectedSingleCityHotelStays: typeof singleCityHotelStays | undefined;
      if (supportsMultipleHotelsInCustomSingleCity) {
        selectedCustomCities = effectiveSelectedCities;
        selectedSingleCityHotelStays = singleCityHotelStays;
        primaryHotelId = "";
        primaryRoomId = "Multiple";
      } else if (isCustomCitySelection()) {
        selectedCustomCities = effectiveSelectedCities;
        selectedMultiCityNights = { ...effectiveCustomCityNights };
        primaryHotelId = "";
        primaryRoomId = "Multiple";
      } else if (supportsMultipleHotelsInSingleCity) {
        selectedSingleCityHotelStays = singleCityHotelStays;
        primaryHotelId = "";
        primaryRoomId = "Multiple";
      } else if (supportsMultipleHotelsInCustomSingleCity) {
        selectedSingleCityHotelStays = singleCityHotelStays;
        primaryHotelId = "";
        primaryRoomId = "Multiple";
      } else if (isMultiCityTour() && routeId in multiCityConfig) {
        selectedMultiCityNights = Object.fromEntries(
          (getVisibleMultiCityConfig(routeId)?.cities || []).map((city, i) => [
            city,
            getVisibleMultiCityConfig(routeId)?.nights[i] ?? 0,
          ])
        );
        primaryHotelId = "";
        primaryRoomId = "Multiple";
      }

      // Prepare quotation data for edit page
      const quotationData = {
        tripDate,
        startingPoint: getActualStartingPoint(),
        routeId: isCustomCitySelection() ? "custom-itinerary" : routeId,
        destination: isCustomCitySelection() ? effectiveSelectedCities.join(" + ") : selectedRoute?.city || routeId,
        hotelId: primaryHotelId,
        roomType: primaryRoomId,
        vehicleName,
        numberOfRooms,
        adults,
        kids,
        kidsAges,
        hotelCategory,
        tourType,
        // Include full breakdown
        transportCost: quotation.transportCost,
        hotelCost: quotation.hotelCost,
        jeepAddonsCost: quotation.jeepAddonsCost,
        subtotal: quotation.subtotal,
        markupAmount: quotation.markupAmount,
        totalCost: quotation.totalCost,
        perPersonCost: quotation.perPersonCost,
        singleCityHotelStays: selectedSingleCityHotelStays,
        travelMode,
        // Include multi-city data
        multiCityHotels: ((isCustomCitySelection() && !supportsMultipleHotelsInCustomSingleCity) || isMultiCityTour()) ? effectiveMultiCityHotels : undefined,
        multiCityNights: selectedMultiCityNights,
        customCities: selectedCustomCities,
        customRouteLabel: isCustomCitySelection() ? effectiveSelectedCities.join(" + ") : undefined,
        customerName,
        customerPhone,
      };

      // Encode data and redirect to edit page
      const encoded = btoa(JSON.stringify(quotationData));

      // Also send to API for WhatsApp notification
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripDate,
          startingPoint,
          routeId: isCustomCitySelection() ? "custom-itinerary" : routeId,
          hotelId: primaryHotelId,
          roomId: primaryRoomId,
          vehicleName,
          numberOfRooms,
          adults,
          kids,
          kidsAges,
          hotelCategory,
          customerName,
          customerPhone,
          tourType,
          mandatoryJeepCost,
          travelMode,
          singleCityHotelStays: selectedSingleCityHotelStays,
          multiCityHotels: ((isCustomCitySelection() && !supportsMultipleHotelsInCustomSingleCity) || isMultiCityTour()) ? effectiveMultiCityHotels : undefined,
          multiCityNights: selectedMultiCityNights,
          customCities: selectedCustomCities,
          customRouteLabel: isCustomCitySelection() ? effectiveSelectedCities.join(" + ") : undefined,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Redirect to quotation edit page
        router.push(`/quotation-edit?data=${encoded}`);
      } else {
        setSubmitError(data.error || data.details || "Failed to submit quotation");
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate form completion percentage for progress bar
  const calculateFormProgress = (): number => {
    const requiredFields = [customerName, customerPhone, tripDate, startingPoint, vehicleName];
    const fieldsWithValues = requiredFields.filter(field => field.trim()).length;
    const hasValidDestination = routeId || effectiveSelectedCities.length > 0;
    const hasValidHotel = hotelId || (Object.keys(multiCityHotels).length > 0) || (singleCityHotelStays.length > 0 && singleCityHotelStays.some(s => s.hotelId));
    
    const totalRequired = 6; // base fields + destination + hotel
    let validCount = fieldsWithValues + (hasValidDestination ? 1 : 0) + (hasValidHotel ? 1 : 0);
    
    return Math.min(100, Math.round((validCount / totalRequired) * 100));
  };

  const customerNameValid = customerName.trim().length > 1;
  const customerPhoneValid = phoneRegex13Digit.test(customerPhone.trim()) || phoneRegex11Digit.test(customerPhone.trim());
  const tripDateValid = Boolean(tripDate);
  const startingPointValid = startingPoint === "Other" ? otherStartingPoint.trim().length > 0 : Boolean(startingPoint);
  const destinationValid = isCustomCitySelection() ? effectiveSelectedCities.length > 0 : Boolean(routeId);
  const vehicleValid = Boolean(vehicleName);
  const adultsValid = adults > 0;

  const hotelSelectionValid = useMemo(() => {
    if (supportsMultipleHotelsInCustomSingleCity) {
      const totalSingleCityNights = singleCityHotelStays.reduce((sum, stay) => sum + Math.max(0, stay.nights), 0);
      return (
        singleCityHotelStays.length > 0 &&
        totalSingleCityNights === customSingleCityNightCount &&
        singleCityHotelStays.every((stay) => stay.hotelId && stay.roomId && stay.nights > 0)
      );
    }

    if (isCustomCitySelection()) {
      return (
        effectiveSelectedCities.length > 0 &&
        effectiveSelectedCities.every((city) => effectiveMultiCityHotels[city]?.hotelId && effectiveMultiCityHotels[city]?.roomId)
      );
    }

    if (isMultiCityTour()) {
      const config = getVisibleMultiCityConfig(routeId);
      return Boolean(
        config &&
          config.cities.every((city) => multiCityHotels[city]?.hotelId && multiCityHotels[city]?.roomId)
      );
    }

    if (supportsMultipleHotelsInSingleCity) {
      const totalSingleCityNights = singleCityHotelStays.reduce((sum, stay) => sum + Math.max(0, stay.nights), 0);
      return (
        singleCityHotelStays.length > 0 &&
        totalSingleCityNights === singleCityNightCount &&
        singleCityHotelStays.every((stay) => stay.hotelId && stay.roomId && stay.nights > 0)
      );
    }

    return Boolean(hotelId && roomId);
  }, [
    supportsMultipleHotelsInCustomSingleCity,
    singleCityHotelStays,
    customSingleCityNightCount,
    effectiveSelectedCities,
    effectiveMultiCityHotels,
    isMultiCityTour,
    routeId,
    multiCityHotels,
    supportsMultipleHotelsInSingleCity,
    singleCityNightCount,
    hotelId,
    roomId,
  ]);

  const quotationReady = Boolean(quotation);
  const progressChecklist = [
    customerNameValid,
    customerPhoneValid,
    tripDateValid,
    startingPointValid,
    destinationValid,
    hotelSelectionValid,
    vehicleValid,
    adultsValid,
    quotationReady,
  ];
  const formProgress = Math.round((progressChecklist.filter(Boolean).length / progressChecklist.length) * 100);

  useEffect(() => {
    const hasJustGeneratedQuotation = !previousQuotationRef.current && quotation;
    previousQuotationRef.current = quotation;

    if (!hasJustGeneratedQuotation) return;

    setShowCelebration(true);
    const timeout = setTimeout(() => setShowCelebration(false), 1800);
    return () => clearTimeout(timeout);
  }, [quotation]);

  return (
    <div className="flex justify-center items-center min-h-screen py-8">
      <div className="w-full max-w-2xl make-my-trip-form">
        <style>{`
          .make-my-trip-form input,
          .make-my-trip-form select,
          .make-my-trip-form textarea {
            transition: all 220ms ease;
          }
          .make-my-trip-form input:hover,
          .make-my-trip-form select:hover,
          .make-my-trip-form textarea:hover,
          .make-my-trip-form input:focus,
          .make-my-trip-form select:focus,
          .make-my-trip-form textarea:focus {
            transform: translateY(-1px);
            border-color: #fcc000;
            box-shadow: 0 0 0 10px rgba(252,192,0,0.08);
          }

          @keyframes glow-pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(252, 192, 0, 0.3); }
            50% { box-shadow: 0 0 0 8px rgba(252, 192, 0, 0); }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes confetti {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(40px) rotate(360deg); opacity: 0; }
          }
          @keyframes fast-blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          .glow-focus:focus { 
            animation: glow-pulse 1.5s infinite;
            border-color: #fcc000;
          }
          .spinner { animation: spin 1s linear infinite; }
          .confetti-piece { animation: confetti 2s ease-in forwards; }
          .blink-fast { animation: fast-blink 0.6s ease-in-out infinite; }
        `}</style>

        <div className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-[#fff6d6] via-white to-[#fff1bd] p-[1.5px] shadow-[0_32px_80px_rgba(0,0,0,0.12)] transition-all duration-500">
          <div className="pointer-events-none absolute left-[-110px] top-[-110px] h-60 w-60 rounded-full bg-[#fcc000]/18 blur-3xl" />
          <div className="pointer-events-none absolute right-[-90px] bottom-[-90px] h-72 w-72 rounded-full bg-[#7f5a00]/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#fcc000]/70 to-transparent" />
          <div className="relative isolate overflow-hidden rounded-[28px] bg-[#FFF8Df] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_12px_30px_rgba(0,0,0,0.05)] ring-1 ring-[#f4d77d]/60 transition-all duration-500 sm:p-10">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-stone-600">Form Progress</p>
              <p className="text-xs font-bold text-[#fcc000]">{formProgress}%</p>
            </div>
            <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#fcc000] to-[#ffd247] rounded-full transition-all duration-500"
                style={{ width: `${formProgress}%` }}
              />
            </div>
          </div>

          {/* Celebration Animation */}
          {showCelebration && (
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="confetti-piece fixed w-2 h-2 bg-[#fcc000] rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: '50%',
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          )}

          <div className="mb-6 text-center md:text-left">
            <p className="text-sm font-bold uppercase tracking-[0.38em] text-[#D4A500]">Craft your own Trip</p>
            <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-[2.6rem] font-bold">
              <span className="text-black">Your Adventure</span>, <span className="text-[#FCC000]">Your Way</span>
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-stone-600 md:mx-0">
              Select your dates, destination, vehicle, and hotel. Get an instant quotation powered by real-time pricing.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 md:justify-start">
              {/* Honeymoon Gateway Button with Featured Tours Dropdown */}
              <div ref={honeymoonDropdownRef} className="relative">
                <button
                  type="button"
                  onClick={() => setShowHoneymoonDropdown(!showHoneymoonDropdown)}
                  className="relative inline-flex items-center rounded-full border-4 border-[#fcc000] bg-[#fff7db] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-[#8d6500] shadow-sm transition hover:bg-[#fff2c8] blink-fast"
                >
                  💕 Honeymoon Gateway
                </button>
                
                {/* Featured Tours Dropdown */}
                {showHoneymoonDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-max max-h-64 overflow-y-auto rounded-[16px] border border-[#fcc000]/40 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.15)] z-50">
                    <div className="py-2">
                      {featuredTourCards.map((tour) => (
                        <button
                          key={tour.slug}
                          type="button"
                          onClick={() => handleHoneymoonTourSelect(tour.slug)}
                          className="block w-full px-4 py-3 text-left text-sm font-semibold text-stone-900 hover:bg-[#fff8df] transition"
                        >
                          {tour.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Luxury Planning Button with Dropdown */}
              <div ref={luxuryDropdownRef} className="relative">
                <button
                  type="button"
                  onClick={() => setShowLuxuryDropdown(!showLuxuryDropdown)}
                  className="relative inline-flex items-center rounded-full border-4 border-[#fcc000] bg-[#fff7db] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-[#8d6500] shadow-sm transition hover:bg-[#fff2c8] hover:border-[#fcc000] blink-fast"
                >
                  <span>✨ Luxury Planning</span>
                </button>
                
                {/* Dropdown Menu */}
                {showLuxuryDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-max rounded-[16px] border-2 border-[#fcc000] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.15)] z-50">
                    <div className="py-2">
                      {Object.entries(luxuryPackages).map(([key, pkg]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => handleLuxuryPackageSelect(key)}
                          className="block w-full px-4 py-3 text-left text-sm font-semibold text-stone-900 hover:bg-[#fff8df] transition"
                        >
                          {pkg.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            {/* Customer Info */}
            <div className="grid grid-cols-1 gap-4 rounded-[24px] border border-[#f4d77d] bg-[#FFF8Df] p-4 shadow-[0_8px_20px_rgba(252,192,0,0.06)] lg:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-stone-900">
                <span className="flex items-center gap-2">
                  <User className={LABEL_ICON_CLASS} aria-hidden="true" />
                  <span>Your Name *</span>
                  {customerNameValid && <Check className={VALIDATION_ICON_CLASS} aria-hidden="true" />}
                </span>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Full name"
                  className="glow-focus rounded-[15px] border border-[#f4d77d] bg-[#FFF8Df] px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-stone-900">
                <span className="flex items-center gap-2">
                  <Phone className={LABEL_ICON_CLASS} aria-hidden="true" />
                  <span>WhatsApp Number *</span>
                  {customerPhoneValid && <Check className={VALIDATION_ICON_CLASS} aria-hidden="true" />}
                </span>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+92..."
                  className="glow-focus rounded-[15px] border border-[#f4d77d] bg-[#FFF8Df] px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
                />
              </label>
            </div>

            {/* Preplanned Trips */}
            <div className="rounded-[24px] border border-[#f4d77d] bg-[#FFF8Df] p-4 shadow-[0_8px_20px_rgba(252,192,0,0.06)]">
              <label className="grid gap-2 text-sm font-medium text-stone-900">
                <span className="flex items-center gap-2">
                  <Map className={LABEL_ICON_CLASS} aria-hidden="true" />
                  <span>Preplanned Trips</span>
                </span>
                <select
                  value={selectedPreplannedTrip}
                  onChange={(e) => setSelectedPreplannedTrip(e.target.value)}
                  className="glow-focus rounded-[15px] border border-[#f4d77d] bg-[#FFF8Df] px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
                >
                  <option value="">Select a preplanned trip (optional)</option>
                  {featuredTourCards.map((tour) => (
                    <option key={tour.slug} value={tour.slug}>
                      {tour.title}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Show preplanned trip details if selected */}
            {selectedPreplannedTrip && preplannedRoute && (
              <div className="rounded-[22px] border border-[#f4d77d] bg-[#FFF8Df] p-4 shadow-[0_8px_22px_rgba(252,192,0,0.06)]">
                <p className="text-sm text-stone-700 font-medium">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className={LABEL_ICON_CLASS} aria-hidden="true" />
                    <strong>{preplannedRoute.name}</strong>
                  </span>
                </p>
                <p className="text-xs text-stone-600 mt-1">Duration: {preplannedRoute.duration} days</p>
                {preplannedRoute.itinerary && (
                  <p className="text-xs text-stone-600 mt-2 italic">{preplannedRoute.itinerary}</p>
                )}
              </div>
            )}

            {/* Trip Details */}
            {!selectedPreplannedTrip && (
            <div className="grid gap-4 rounded-[24px] border border-[#f4d77d] bg-[#FFF8Df] p-4 shadow-[0_8px_20px_rgba(252,192,0,0.06)]">
            <label className="grid gap-2 text-sm font-medium text-stone-900">
              <span className="flex items-center gap-2">
                <CalendarDays className={LABEL_ICON_CLASS} aria-hidden="true" />
                <span>Trip Start Date *</span>
                {tripDateValid && <Check className={VALIDATION_ICON_CLASS} aria-hidden="true" />}
              </span>
              <input
                type="date"
                required
                value={tripDate}
                onChange={(e) => setTripDate(e.target.value)}
                className="glow-focus rounded-[15px] border border-[#f4d77d] bg-[#FFF8Df] px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-stone-900">
              <span className="flex items-center gap-2">
                <MapPin className={LABEL_ICON_CLASS} aria-hidden="true" />
                <span>Starting Point *</span>
                {startingPointValid && <Check className={VALIDATION_ICON_CLASS} aria-hidden="true" />}
              </span>
              <select
                required
                value={startingPoint}
                onChange={(e) => {
                  setStartingPoint(e.target.value);
                  if (e.target.value !== "Other") {
                    setOtherStartingPoint("");
                  }
                }}
                className="glow-focus rounded-[15px] border border-[#f4d77d] bg-[#FFF8Df] px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
              >
                <option value="">Select your starting city...</option>
                {[
                  "Karachi",
                  "Lahore",
                  "Islamabad",
                  "Multan",
                  "Other",
                ].map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>
            {startingPoint === "Other" && (
              <label className="grid gap-2 text-sm font-medium text-stone-900">
                Enter Starting City *
                <input
                  required
                  type="text"
                  value={otherStartingPoint}
                  onChange={(e) => setOtherStartingPoint(e.target.value)}
                  placeholder="Type your starting city"
                  className="rounded-[15px] border border-[#f4d77d] bg-[#FFF8Df] px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
                />
              </label>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <label className="grid gap-2 text-sm font-medium text-stone-900">
                <span className="flex items-center gap-2">
                  <Compass className={LABEL_ICON_CLASS} aria-hidden="true" />
                  <span>Tour Type *</span>
                </span>
                <select
                  value={tourType}
                  onChange={(e) => setTourType(e.target.value)}
                  className="rounded-[15px] border border-[#f4d77d] bg-[#FFF8Df] px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
                >
                  <option value="private">Private Tour</option>
                </select>
              </label>
            </div>

            <label className="grid gap-2 text-sm font-medium text-stone-900">
              <span className="flex items-center gap-2">
                <PlaneTakeoff className={LABEL_ICON_CLASS} aria-hidden="true" />
                <span>Tour Mode *</span>
              </span>
              <select
                value={travelMode}
                onChange={(e) => setTravelMode(e.target.value)}
                className="rounded-[15px] border border-[#f4d77d] bg-[#FFF8Df] px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
              >
                <option value="road">By Road</option>
                <option value="air">By Air</option>
              </select>
            </label>

            {/* Individual City Selection - Always visible for private tours */}
            <div className="rounded-[20px] border border-[#f4d77d] bg-[#FFF8Df] p-4 shadow-[0_8px_20px_rgba(252,192,0,0.06)]">
              <p className="text-sm font-semibold text-[#6e5200] mb-4">
                Select Destination Cities (Multiple Allowed) *
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {sortedCitiesWithHotels.map((city) => (
                  <label
                    key={city}
                    className="flex items-center gap-2 p-3 rounded-[12px] border border-[#f4d77d] bg-[#FFF8Df] cursor-pointer hover:bg-[#fffdf3] transition"
                  >
                    <input
                      type="checkbox"
                      checked={effectiveSelectedCities.includes(city)}
                      onChange={() => toggleCitySelection(city)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm font-medium text-stone-900">{city}</span>
                  </label>
                ))}
              </div>
              {effectiveSelectedCities.length > 0 && (
                <div className="mt-3 space-y-2 text-xs text-[#6e5200]">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="max-w-full break-words">Selected: {effectiveSelectedCities.join(", ")}</div>
                    {shouldAutoIncludeIslamabad() && (
                      <div className="ml-0 max-w-full break-words text-sm text-stone-700 sm:ml-4">Automatically added: <span className="font-semibold">Islamabad (2 nights)</span></div>
                    )}
                  </div>
                  {shouldAutoIncludeIslamabad() && (
                    <div className="mt-2 rounded-[14px] bg-[#fff2c8] border border-[#f4d77d] p-3 text-sm text-stone-900 flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0 max-w-full">
                        <div className="font-medium">Islamabad (2 nights) added automatically</div>
                        <div className="text-xs text-stone-700">We added Islamabad because your starting city requires an Islamabad stay. You can change nights or select Islamabad hotel below.</div>
                      </div>
                      <div className="ml-0 sm:ml-4 shrink-0">
                        <button
                          type="button"
                          onClick={() => setHideAutoIslamabad(true)}
                          className="rounded-full px-3 py-1 text-sm font-semibold text-[#8a4b00] border border-[#8a4b00] bg-[#FFF8Df] hover:bg-[#fff3db]"
                        >
                          Remove Islamabad
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {effectiveSelectedCities.map((city) => (
                      <label key={city} className="grid gap-1 rounded-[12px] border border-[#f4d77d] bg-[#FFF8Df] p-2 text-stone-900 shadow-sm">
                        <span className="text-[11px] font-semibold uppercase tracking-wide text-[#6e5200]">
                          {city} {isSingleCustomCity ? "days" : "nights"}
                        </span>
                        <input
                          type="number"
                          min="1"
                          value={effectiveCustomCityNights[city] ?? 2}
                          onChange={(e) =>
                            setCustomCityNights({
                              ...customCityNights,
                              [city]: Math.max(1, parseInt(e.target.value) || 1),
                            })
                          }
                          className="rounded-[8px] border border-[#f4d77d] bg-[#FFF8Df] px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
            </div>
            )}

            {/* Hotel Category Selection */}
            <label className="grid gap-2 text-sm font-medium text-stone-900">
              <span className="flex items-center gap-2">
                <HotelIcon className={LABEL_ICON_CLASS} aria-hidden="true" />
                <span>Hotel Category *</span>
              </span>
              <select
                value={hotelCategory}
                onChange={(e) => setHotelCategory(e.target.value)}
                className="rounded-[15px] border border-[#f4d77d] bg-[#FFF8Df] px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
              >
                <option value="standard">Standard - Budget-Friendly</option>
                <option value="deluxe">Deluxe - Mid-Range (Recommended)</option>
                <option value="executive">Executive - Premium</option>
              </select>
            </label>

            {/* Hotel & Vehicle Selection */}
            {isPackageRoute() && !isMultiCityTour() ? (
              <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-stone-900 min-w-0">
                  Select Hotel *
                  <select
                    required
                    value={hotelId}
                    onChange={(e) => setHotelId(e.target.value)}
                    disabled={!routeId}
                    className="rounded-[15px] border border-[#f4d77d] bg-[#FFF8Df] px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15 disabled:bg-[#f8efc8] disabled:text-stone-500 appearance-none w-full"
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

                <label className="grid gap-2 text-sm font-medium text-stone-900 min-w-0 z-50 overflow-hidden">
                  Room Type *
                  <select
                    required
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    disabled={!hotelId}
                    className="rounded-[15px] border border-[#f4d77d] bg-[#FFF8Df] px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15 disabled:bg-[#f8efc8] disabled:text-stone-500 appearance-none w-full overflow-hidden text-ellipsis"
                  >
                    <option value="">
                      {!hotelId ? "Select hotel first" : availableRooms.length === 0 ? "No rooms available" : "Choose a room..."}
                    </option>
                    {availableRooms.map((room: any) => (
                      <option key={room.name} value={room.name}>
                        {room.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            ) : supportsMultipleHotelsInSingleCity ? (
              <div className="rounded-[15px] border border-green-200 bg-green-50 p-4">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="inline-flex items-center gap-2 text-sm font-semibold text-green-900">
                      <HotelIcon className={LABEL_ICON_CLASS} aria-hidden="true" />
                      <span>Select Hotels for {selectedRoute?.city}</span>
                    </p>
                    <p className="text-xs text-green-800 mt-1">You can split the stay across multiple hotels because this trip is longer than 2 nights.</p>
                  </div>
                  <div className="rounded-full border border-[#f4d77d] bg-[#FFF8Df] px-3 py-1 text-xs font-semibold text-[#6e5200]">
                    Total nights: {singleCityHotelStays.reduce((sum, stay) => sum + Math.max(0, stay.nights), 0)} / {singleCityNightCount}
                  </div>
                </div>

                <div className="space-y-4">
                  {singleCityHotelStays.map((stay, index) => {
                    const selectedHotel = availableHotels.find((hotel) => hotel.id === stay.hotelId);
                    return (
                      <div key={`${stay.hotelId}-${index}`} className="rounded-[10px] border border-[#f4d77d] bg-[#FFF8Df] p-3 shadow-sm">
                        <div className="mb-3 flex items-center justify-between gap-2">
                          <p className="text-xs uppercase tracking-widest text-green-800 font-semibold">Stay {index + 1}</p>
                          <div className="flex items-center gap-2">
                            {singleCityHotelStays.length > 1 && (
                              <button
                                type="button"
                                onClick={() => setSingleCityHotelStays((current) => current.filter((_, currentIndex) => currentIndex !== index))}
                                className="rounded-full border border-red-300 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-50"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="grid gap-3 grid-cols-1 lg:grid-cols-3">
                          <label className="grid gap-2 text-sm font-medium text-stone-900">
                            Hotel *
                            <select
                              required
                              value={stay.hotelId}
                              onChange={(e) => {
                                const nextHotelId = e.target.value;
                                const nextHotel = availableHotels.find((hotel) => hotel.id === nextHotelId);
                                const roomsToUse = nextHotel && selectedLuxuryPackage ? nextHotel.rooms.filter((r) => /executive/i.test(r.name)) : nextHotel?.rooms || [];
                                const nextRoom = nextHotel ? selectRoomByCategory(roomsToUse, hotelCategory) : "";
                                setSingleCityHotelStays((current) =>
                                  current.map((currentStay, currentIndex) =>
                                    currentIndex === index
                                      ? { ...currentStay, hotelId: nextHotelId, roomId: nextRoom }
                                      : currentStay
                                  )
                                );
                              }}
                              className="rounded-[10px] border border-[#f4d77d] bg-[#FFF8Df] px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
                            >
                              <option value="">Select hotel...</option>
                              {availableHotels
                                .filter((h) => !selectedLuxuryPackage || h.rooms?.some((r) => /executive/i.test(r.name)))
                                .map((hotel) => (
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
                              className="rounded-[10px] border border-[#f4d77d] bg-[#FFF8Df] px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15 disabled:bg-[#f8efc8] disabled:text-stone-500 overflow-hidden text-ellipsis"
                            >
                              <option value="">Select room...</option>
                              {selectedHotel?.rooms
                                .filter((r) => !selectedLuxuryPackage || /executive/i.test(r.name))
                                .map((room: any) => (
                                  <option key={room.name} value={room.name}>
                                    {room.name}
                                  </option>
                                ))}
                            </select>
                          </label>

                          <label className="grid gap-2 text-sm font-medium text-stone-900">
                            Nights *
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
                              className="rounded-[10px] border border-[#f4d77d] bg-[#FFF8Df] px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
                            />
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setSingleCityHotelStays((current) => [
                        ...current,
                        { hotelId: "", roomId: "", nights: 1 },
                      ])
                    }
                    className="rounded-[10px] border border-[#f4d77d] bg-[#FFF8Df] px-4 py-2 text-sm font-semibold text-[#6e5200] hover:bg-[#fffdf3]"
                  >
                    + Add Another Hotel
                  </button>
                  <p className="text-xs text-green-800">Total nights must equal {singleCityNightCount} to generate the quotation.</p>
                </div>
              </div>
            ) : selectedLuxuryPackage ? (
              <div className="rounded-[15px] border border-[#7f5a00]/30 bg-[#fffef7] p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                <p className="inline-flex items-center gap-2 text-sm font-bold text-[#7f5a00] mb-4">
                  <HotelIcon className={LABEL_ICON_CLASS} aria-hidden="true" />
                  <span>Executive Hotels for Each City</span>
                </p>
                {selectedCities.map((city) => {
                  let hotelsForCity = getHotelsByCity(city);
                  if (selectedLuxuryPackage) {
                    hotelsForCity = hotelsForCity.filter((h) => h.rooms?.some((r) => /executive/i.test(r.name)));
                  }
                  const currentSelection = multiCityHotels[city];
                  const selectedHotel = hotelsForCity.find(
                    (h) => h.id === currentSelection?.hotelId
                  );

                  return (
                    <div
                      key={city}
                      className="mb-4 pb-4 border-b border-[#f4d77d] last:border-b-0 rounded-[10px] bg-[#FFF8Df] p-3"
                    >
                      <p className="text-xs uppercase tracking-widest text-[#7f5a00] mb-3 font-bold">
                        {city}
                      </p>
                      <div className="grid gap-3 grid-cols-1 lg:grid-cols-2">
                        <label className="grid gap-2 text-sm font-medium text-stone-900">
                          Hotel (Executive) *
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
                            className="rounded-[10px] border border-[#f4d77d] bg-[#FFF8Df] px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
                          >
                            <option value="">Select executive hotel...</option>
                            {hotelsForCity
                              .sort((a, b) => {
                                const priceA =
                                  a.rooms[0]?.price ||
                                  a.rooms[0]?.peak ||
                                  (Array.isArray(a.rooms[0]?.high) ? a.rooms[0]?.high?.[0] : a.rooms[0]?.high) ||
                                  0;
                                const priceB =
                                  b.rooms[0]?.price ||
                                  b.rooms[0]?.peak ||
                                  (Array.isArray(b.rooms[0]?.high) ? b.rooms[0]?.high?.[0] : b.rooms[0]?.high) ||
                                  0;
                                return priceB - priceA;
                              })
                              .map((hotel) => (
                                <option key={hotel.id} value={hotel.id}>
                                  {hotel.name}
                                </option>
                              ))}
                          </select>
                        </label>

                        <label className="grid gap-2 text-sm font-medium text-stone-900 overflow-hidden">
                          Room Type (Executive) *
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
                            className="rounded-[10px] border border-[#f4d77d] bg-[#FFF8Df] px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15 disabled:bg-[#f8efc8] disabled:text-stone-500 overflow-hidden text-ellipsis"
                          >
                            <option value="">Select executive room...</option>
                            {selectedHotel?.rooms
                              .filter((r) => !selectedLuxuryPackage || /executive/i.test(r.name))
                              .sort((a, b) => {
                                const priceA = a.price || a.peak || (Array.isArray(a.high) ? a.high[0] : a.high) || 0;
                                const priceB = b.price || b.peak || (Array.isArray(b.high) ? b.high[0] : b.high) || 0;
                                return priceB - priceA;
                              })
                              .map((room: any) => (
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
            ) : supportsMultipleHotelsInCustomSingleCity ? (
              <div className="rounded-[15px] border border-green-200 bg-green-50 p-4">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="inline-flex items-center gap-2 text-sm font-semibold text-green-900">
                      <HotelIcon className={LABEL_ICON_CLASS} aria-hidden="true" />
                      <span>Select Hotels for {selectedRoute?.city}</span>
                    </p>
                    <p className="text-xs text-green-800 mt-1">You can split the stay across multiple hotels because this trip is longer than 2 nights.</p>
                  </div>
                  <div className="rounded-full border border-[#f4d77d] bg-[#FFF8Df] px-3 py-1 text-xs font-semibold text-[#6e5200]">
                    Total nights: {singleCityHotelStays.reduce((sum, stay) => sum + Math.max(0, stay.nights), 0)} / {singleCityNightCount}
                  </div>
                </div>

                <div className="space-y-4">
                  {singleCityHotelStays.map((stay, index) => {
                    const selectedHotel = availableHotels.find((hotel) => hotel.id === stay.hotelId);
                    return (
                      <div key={`${stay.hotelId}-${index}`} className="rounded-[10px] border border-[#f4d77d] bg-[#FFF8Df] p-3 shadow-sm">
                        <div className="mb-3 flex items-center justify-between gap-2">
                          <p className="text-xs uppercase tracking-widest text-green-800 font-semibold">Stay {index + 1}</p>
                          <div className="flex items-center gap-2">
                            {singleCityHotelStays.length > 1 && (
                              <button
                                type="button"
                                onClick={() => setSingleCityHotelStays((current) => current.filter((_, currentIndex) => currentIndex !== index))}
                                className="rounded-full border border-red-300 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-50"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="grid gap-3 grid-cols-1 lg:grid-cols-3">
                          <label className="grid gap-2 text-sm font-medium text-stone-900">
                            Hotel *
                            <select
                              required
                              value={stay.hotelId}
                              onChange={(e) => {
                                const nextHotelId = e.target.value;
                                const nextHotel = availableHotels.find((hotel) => hotel.id === nextHotelId);
                                const roomsToUse = nextHotel && selectedLuxuryPackage ? nextHotel.rooms.filter((r) => /executive/i.test(r.name)) : nextHotel?.rooms || [];
                                const nextRoom = nextHotel ? selectRoomByCategory(roomsToUse, hotelCategory) : "";
                                setSingleCityHotelStays((current) =>
                                  current.map((currentStay, currentIndex) =>
                                    currentIndex === index
                                      ? { ...currentStay, hotelId: nextHotelId, roomId: nextRoom }
                                      : currentStay
                                  )
                                );
                              }}
                              className="rounded-[10px] border border-[#f4d77d] bg-[#FFF8Df] px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
                            >
                              <option value="">Select hotel...</option>
                              {availableHotels.map((hotel) => (
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
                              className="rounded-[10px] border border-[#f4d77d] bg-[#FFF8Df] px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15 disabled:bg-[#f8efc8] disabled:text-stone-500 overflow-hidden text-ellipsis"
                            >
                              <option value="">Select room...</option>
                              {selectedHotel?.rooms
                                .filter((r) => !selectedLuxuryPackage || /executive/i.test(r.name))
                                .map((room: any) => (
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
                              className="rounded-[10px] border border-[#f4d77d] bg-[#FFF8Df] px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
                            />
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setSingleCityHotelStays((current) => [
                        ...current,
                        { hotelId: "", roomId: "", nights: 1 },
                      ])
                    }
                    className="rounded-[10px] border border-[#f4d77d] bg-[#FFF8Df] px-4 py-2 text-sm font-semibold text-[#6e5200] hover:bg-[#fffdf3]"
                  >
                    + Add Another Hotel
                  </button>
                  <p className="text-xs text-green-800">Total nights must equal {singleCityNightCount} to generate the quotation.</p>
                </div>
              </div>
            ) : supportsMultipleHotelsInCustomSingleCity ? (
              <div className="rounded-[15px] border border-green-200 bg-green-50 p-4">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="inline-flex items-center gap-2 text-sm font-semibold text-green-900">
                      <HotelIcon className={LABEL_ICON_CLASS} aria-hidden="true" />
                      <span>Select Hotels for {selectedCities[0]}</span>
                    </p>
                    <p className="text-xs text-green-800 mt-1">You can split the stay across multiple hotels because this trip is longer than 2 nights.</p>
                  </div>
                  <div className="rounded-full border border-[#f4d77d] bg-[#FFF8Df] px-3 py-1 text-xs font-semibold text-[#6e5200]">
                    Total nights: {singleCityHotelStays.reduce((sum, stay) => sum + Math.max(0, stay.nights), 0)} / {customSingleCityNightCount}
                  </div>
                </div>

                <div className="space-y-4">
                  {singleCityHotelStays.map((stay, index) => {
                    const selectedHotel = availableHotels.find((hotel) => hotel.id === stay.hotelId);
                    return (
                      <div key={`${stay.hotelId}-${index}`} className="rounded-[10px] border border-[#f4d77d] bg-[#FFF8Df] p-3 shadow-sm">
                        <div className="mb-3 flex items-center justify-between gap-2">
                          <p className="text-xs uppercase tracking-widest text-green-800 font-semibold">Stay {index + 1}</p>
                          <div className="flex items-center gap-2">
                            {singleCityHotelStays.length > 1 && (
                              <button
                                type="button"
                                onClick={() => setSingleCityHotelStays((current) => current.filter((_, currentIndex) => currentIndex !== index))}
                                className="rounded-full border border-red-300 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-50"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="grid gap-3 grid-cols-1 lg:grid-cols-3">
                          <label className="grid gap-2 text-sm font-medium text-stone-900">
                            Hotel *
                            <select
                              required
                              value={stay.hotelId}
                              onChange={(e) => {
                                const nextHotelId = e.target.value;
                                const nextHotel = availableHotels.find((hotel) => hotel.id === nextHotelId);
                                const roomsToUse = nextHotel && selectedLuxuryPackage ? nextHotel.rooms.filter((r) => /executive/i.test(r.name)) : nextHotel?.rooms || [];
                                const nextRoom = nextHotel ? selectRoomByCategory(roomsToUse, hotelCategory) : "";
                                setSingleCityHotelStays((current) =>
                                  current.map((currentStay, currentIndex) =>
                                    currentIndex === index
                                      ? { ...currentStay, hotelId: nextHotelId, roomId: nextRoom }
                                      : currentStay
                                  )
                                );
                              }}
                              className="rounded-[10px] border border-[#f4d77d] bg-[#FFF8Df] px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
                            >
                              <option value="">Select hotel...</option>
                              {availableHotels.map((hotel) => (
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
                              className="rounded-[10px] border border-[#f4d77d] bg-[#FFF8Df] px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15 disabled:bg-[#f8efc8] disabled:text-stone-500 overflow-hidden text-ellipsis"
                            >
                              <option value="">Select room...</option>
                              {selectedHotel?.rooms.map((room: any) => (
                                <option key={room.name} value={room.name}>
                                  {room.name}
                                </option>
                              ))}
                            </select>
                          </label>

                          <label className="grid gap-2 text-sm font-medium text-stone-900">
                            Nights *
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
                              className="rounded-[10px] border border-[#f4d77d] bg-[#FFF8Df] px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
                            />
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-xs text-green-800">If you leave nights remaining after this hotel, another hotel row appears automatically.</p>
                  <p className="text-xs text-green-800">Total hotel nights must equal {customSingleCityNightCount} to generate the quotation.</p>
                </div>
              </div>
            ) : isCustomCitySelection() ? (
              <div className="rounded-[15px] border border-green-200 bg-green-50 p-4">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-green-900 mb-4">
                  <HotelIcon className={LABEL_ICON_CLASS} aria-hidden="true" />
                  <span>Select Hotels for Each City</span>
                </p>
                {effectiveSelectedCities.map((city) => {
                  let hotelsForCity = getHotelsByCity(city);
                  if (selectedLuxuryPackage) {
                    hotelsForCity = hotelsForCity.filter((h) => h.rooms?.some((r) => /executive/i.test(r.name)));
                  }
                  const currentSelection = effectiveMultiCityHotels[city];
                  const selectedHotel = hotelsForCity.find(
                    (h) => h.id === currentSelection?.hotelId
                  );

                  return (
                    <div
                      key={city}
                      className="mb-4 pb-4 border-b border-[#f4d77d] last:border-b-0 rounded-[10px] bg-[#FFF8Df] p-3"
                    >
                      <p className="text-xs uppercase tracking-widest text-green-800 mb-3 font-semibold">
                        {city}
                      </p>
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
                            className="rounded-[10px] border border-[#f4d77d] bg-[#FFF8Df] px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
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
                            className="rounded-[10px] border border-[#f4d77d] bg-[#FFF8Df] px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15 disabled:bg-[#f8efc8] disabled:text-stone-500 overflow-hidden text-ellipsis"
                          >
                            <option value="">Select room...</option>
                            {selectedHotel?.rooms
                              .filter((r) => !selectedLuxuryPackage || /executive/i.test(r.name))
                              .map((room: any) => (
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
            ) : null}

            <label className="grid gap-2 text-sm font-medium text-stone-900">
              <span className="flex items-center gap-2">
                <CarFront className={LABEL_ICON_CLASS} aria-hidden="true" />
                <span>Select Vehicle *</span>
                {vehicleValid && <Check className={VALIDATION_ICON_CLASS} aria-hidden="true" />}
              </span>
              <select
                required
                value={vehicleName}
                onChange={(e) => setVehicleName(e.target.value)}
                disabled={!routeId && !isCustomCitySelection()}
                className="glow-focus rounded-[15px] border border-[#f4d77d] bg-[#FFF8Df] px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15 disabled:bg-[#f8efc8] disabled:text-stone-500"
              >
                <option value="">
                  {!routeId && !isCustomCitySelection() ? "Select destination first" : vehicleOptions.length === 0 ? "No vehicles available" : "Choose a vehicle..."}
                </option>
                {vehicleOptions.map((vehicle) => {
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
              <div className="rounded-[18px] bg-[#FFF8Df] border border-[#f4d77d] p-4 text-sm text-[#6e5200] shadow-[0_8px_18px_rgba(252,192,0,0.06)]">
                <p className="inline-flex items-center gap-2 font-medium">
                  <Users className={LABEL_ICON_CLASS} aria-hidden="true" />
                  <span>Your group size: {totalGuests} people</span>
                </p>
                <p className="text-xs mt-1">
                  {totalGuests <= 4 && "Corolla (4 seats) is available."}
                  {totalGuests > 4 && totalGuests <= 6 && "Note: Corolla unavailable. Honda BRV, Prado and larger vehicles recommended."}
                  {totalGuests > 6 && totalGuests <= 7 && "Note: Prado and larger vehicles recommended for comfort."}
                  {totalGuests > 7 && "Grand Cabin or Coaster recommended for your group size."}
                </p>
              </div>
            )}

            {/* Guest & Room Details */}
            <div className="grid gap-4 grid-cols-1 xl:grid-cols-3">
              <label className="grid gap-2 text-sm font-medium text-stone-900">
                <span className="flex items-center gap-2">
                  <BedDouble className={LABEL_ICON_CLASS} aria-hidden="true" />
                  <span>Number of Rooms (Auto-Calculated)</span>
                </span>
                <div className="rounded-[15px] border border-[#f4d77d] bg-[#FFF8Df] px-4 py-3 text-sm text-stone-900">
                  <div className="font-semibold">{numberOfRooms} {numberOfRooms === 1 ? "Room" : "Rooms"}</div>
                  <div className="text-xs text-stone-600 mt-1">4 people max/room</div>
                </div>
              </label>

              <label className="grid gap-2 text-sm font-medium text-stone-900 overflow-hidden">
                <span className="flex items-center gap-2">
                  <Users className={LABEL_ICON_CLASS} aria-hidden="true" />
                  <span>Adults *</span>
                </span>
                <input
                  type="number"
                  min="1"
                  required
                  value={adults}
                  onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
                  className="rounded-[15px] border border-[#f4d77d] bg-[#FFF8Df] px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15 w-full"
                />
              </label>

              <label className="grid gap-2 text-sm font-medium text-stone-900 overflow-hidden">
                <span className="flex items-center gap-2">
                  <Baby className={LABEL_ICON_CLASS} aria-hidden="true" />
                  <span>Kids</span>
                </span>
                <input
                  type="number"
                  min="0"
                  value={kids}
                  onChange={(e) => handleKidsCountChange(parseInt(e.target.value) || 0)}
                  className="rounded-[15px] border border-[#f4d77d] bg-[#FFF8Df] px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15 w-full"
                />
              </label>
            </div>

            {/* Kids Ages */}
            {kids > 0 && (
              <div className="grid gap-3 p-4 rounded-[15px] bg-[#fcc000]/5 border border-[#fcc000]/20">
                <p className="text-sm font-medium text-stone-900">Ages of Kids</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {Array.from({ length: kids }).map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      placeholder={`Kid ${index + 1} age`}
                      value={kidsAges[index] || ""}
                      onChange={(e) => handleKidsAgeChange(index, e.target.value)}
                      className="rounded-[15px] border border-[#f4d77d] bg-[#FFF8Df] px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
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

            {!quotation && tripDate && (routeId || isCustomCitySelection()) && vehicleName && (
              <div className="rounded-[15px] bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
                <span className="inline-flex items-center gap-2">
                  <TriangleAlert className={LABEL_ICON_CLASS} aria-hidden="true" />
                  <span>Calculating quotation... If this persists, check browser console for details. Make sure all fields are properly selected.</span>
                </span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !quotation}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-[15px] bg-[#ffc000] px-6 py-3 text-sm font-semibold text-black shadow-[0_16px_30px_rgba(252,192,0,0.28)] transition hover:-translate-y-0.5 hover:bg-[#ffd247] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="spinner w-4 h-4 border-2 border-black border-t-transparent rounded-full" />
                  Processing...
                </>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <Sparkles className={LABEL_ICON_CLASS} aria-hidden="true" />
                  <span>Get Quotation</span>
                </span>
              )}
            </button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}
