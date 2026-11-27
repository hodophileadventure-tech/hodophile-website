import { getRouteById } from "./data/routes";
import { getHotelById } from "./data/hotels";
import { calculateJeepCost, getJeepAddonById } from "./data/jeeps";
import { getRouteDistance } from "./data/distances";
import { estimateCustomItineraryDistance, estimateCustomVehicleDays } from "./data/custom-itinerary";
import { getVehicleRate } from "./data/vehicleRates";
import { currentFuelPrices } from "./data/fuel";
import { getMandatoryJeepCost } from "./data/routeActivities";
import {
  calculateTransportExpense,
  type TransportCostSettings,
  type TransportVehicleConfiguration,
} from "./transport/calculations";
import type { Room } from "./data/hotels";
import type { PromotionSummary } from "./promotions/promotion-types";
import type { CustomCityHotelStay } from "./data/custom-city-stays";

const BREAKFAST_COST_PER_PERSON_PER_DAY = 500;

export interface QuotationInput {
  routeId: string;
  vehicleName: string;
  hotelId?: string;
  roomId?: string; // identifier for the selected room
  hotelCategory?: string;
  singleCityHotelStays?: Array<{
    hotelId: string;
    roomId: string;
    nights: number;
    location?: string;
  }>;
  customCityHotelStays?: CustomCityHotelStay[];
  multiCityHotels?: Record<string, { hotelId: string; roomId: string }>;
  multiCityNights?: Record<string, number>; // nights for each city
  customCities?: string[]; // cities for custom itinerary
  customRouteLabel?: string; // label for custom route
  travelMode?: "road" | "air";
  startingPoint?: string;
  routeDestinations?: string[];
  includeIslamabadTransit?: boolean;
  numberOfRooms: number;
  adults: number;
  kids: number;
  jeepAddons?: { id: string; quantity: number }[];
  mandatoryJeepCost?: number; // Mandatory jeep cost for this route (e.g., Deosai for 12-day tour)
  jeepCount?: number; // optional number of jeeps requested for mandatory jeep activities
  tripDate: string; // ISO date string
}

export interface QuotationBreakdown {
  transportCost: number;
  hotelCost: number;
  breakfastCost: number;
  jeepAddonsCost: number;
  subtotal: number;
  markupAmount: number; // applied profit margin based on subtotal tier
  totalCost: number;
  perPersonCost: number;
  promotion?: PromotionSummary;
  details: {
    route: string;
    vehicle: string;
    hotel: string;
    roomType: string;
    accommodationType?: string;
    numberOfRooms: number;
    numberOfGuests: number;
    jeepAddonsDetails: string[];
  };
  transportBreakdown?: {
    fuelCost: number;
    maintenanceCost?: number;
    rentalCost: number;
    tollTax: number;
    distance: number;
    fuelNeeded: number;
    dailyRate: number;
    vehicleDays: number;
    fuelPricePerLiter?: number;
    averageKmPerLiter?: number;
  };
}

export interface ServerTransportOptions {
  distanceKm?: number;
  vehicleConfiguration?: TransportVehicleConfiguration | null;
  settings?: TransportCostSettings;
}

function getSeasonFromDate(date: string): "peak" | "blossom" | "off" | "fixed" {
  const d = new Date(date);
  const month = d.getMonth() + 1; // 1-12

  // Peak: June - September (6-9)
  if (month >= 6 && month <= 9) return "peak";

  // Blossom: March - May (3-5)
  if (month >= 3 && month <= 5) return "blossom";

  // Off-season: August - February (8,12-2)
  // Note: Off-season can vary, so we default to "off"
  return "off";
}

// Calculate transport cost using dynamic pricing: fuel cost + daily rental rate + toll/tax
export function calculateTransportCost(
  vehicleName: string,
  routeId: string,
  vehicleDays: number = 8, // Default 8 days for multi-city tours; adjust as needed
  distanceOverride?: number,
  travelMode?: "road" | "air",
  vehicleConfiguration?: TransportVehicleConfiguration | null,
  transportSettings?: TransportCostSettings,
):
  | {
      totalCost: number;
      fuelCost: number;
      rentalCost: number;
      tollTax: number;
      distance: number;
      fuelNeeded: number;
      maintenanceCost: number;
      fuelPricePerLiter: number;
      averageKmPerLiter: number;
      dailyRate: number;
      vehicleDays: number;
    }
  | null {
  const vehicleRate = getVehicleRate(vehicleName);
  if (!vehicleRate) {
    console.warn(`Vehicle rate not found for: ${vehicleName}`);
    return null;
  }

  // Normalize vehicle name to the canonical name
  const effectiveVehicleName = vehicleRate.name;

  // Air-mode ground distance is supplied by the server's Skardu-based road route.
  if (travelMode === "air" && distanceOverride === undefined) {
    console.warn("Air transport pricing requires a server-calculated Skardu road route.");
    return null;
  }
  let distance = travelMode === "air"
    ? distanceOverride
    : distanceOverride ?? getRouteDistance(routeId);
  if (distance === undefined || distance === null) {
    console.warn(`Distance not found for route: ${routeId}`);
    return null;
  }

  const configuredFuelPrice =
    vehicleConfiguration?.fuelPricePerLiter ??
    (vehicleConfiguration?.fuelType === "diesel"
      ? transportSettings?.dieselPricePerLiter
      : transportSettings?.petrolPricePerLiter);
  const effectiveVehicleConfiguration = vehicleConfiguration
    ? {
        ...vehicleConfiguration,
        fuelPricePerLiter: configuredFuelPrice ??
          (vehicleRate.fuelType === "diesel"
            ? vehicleRate.fuelPrice ?? currentFuelPrices.diesel
            : currentFuelPrices.petrol),
      }
    : null;
  const configuredExpense = effectiveVehicleConfiguration && transportSettings
    ? calculateTransportExpense(distance, effectiveVehicleConfiguration, transportSettings)
    : null;
  const distanceAllowance = transportSettings && !configuredExpense
    ? distance * transportSettings.additionalDistancePercent / 100 + transportSettings.additionalDistanceKm
    : 0;
  const effectiveDistance = configuredExpense?.totalDistanceKm ?? distance + distanceAllowance;
  const fuelNeeded = configuredExpense?.fuelLiters ?? effectiveDistance / vehicleRate.consumption;
  const fuelPrice = configuredExpense?.fuelPricePerLiter ??
    (vehicleRate.fuelType === "diesel"
      ? vehicleRate.fuelPrice ?? currentFuelPrices.diesel
      : currentFuelPrices.petrol);
  const fuelCost = configuredExpense?.fuelExpense ?? Math.round(fuelNeeded * fuelPrice);
  const maintenanceCost = configuredExpense?.maintenanceExpense ?? 0;
  distance = effectiveDistance;

  // Calculate rental cost
  // Allow special rental/toll overrides for air travel (Prado rule)
  let effectiveDailyRate = vehicleRate.dailyRate;
  let effectiveTollTax = vehicleRate.tollTax;
  if (travelMode === "air" && vehicleName === "Prado") {
    effectiveDailyRate = 10000; // per-user rule: Prado rent 10,000 for air trips
    effectiveTollTax = 0; // no toll tax for air trips
  }

  const rentalCost = effectiveDailyRate * vehicleDays;

  // Total transport cost (fuel + rental + toll/tax)
  const totalCost = fuelCost + maintenanceCost + rentalCost + effectiveTollTax;

  console.debug(
    `Transport: ${effectiveVehicleName} | Distance: ${distance}km | Consumption: ${effectiveVehicleConfiguration?.averageKmPerLiter ?? vehicleRate.consumption}km/L | Fuel: ${fuelNeeded.toFixed(1)}L × ${fuelPrice}PKR = ${fuelCost}PKR | Maintenance: ${maintenanceCost}PKR | Rental: ${effectiveDailyRate}PKR × ${vehicleDays}days = ${rentalCost}PKR | Toll/Tax: ${effectiveTollTax}PKR | Total: ${totalCost}PKR`
  );
  return {
    totalCost,
    fuelCost,
    maintenanceCost,
    rentalCost,
    tollTax: effectiveTollTax,
    distance,
    fuelNeeded,
    fuelPricePerLiter: fuelPrice,
    averageKmPerLiter: effectiveVehicleConfiguration?.averageKmPerLiter ?? vehicleRate.consumption,
    dailyRate: effectiveDailyRate,
    vehicleDays,
  };
}

function getRoomPrice(room: Room, season: string): number {
  // Always use base price if available
  if (room.price) return room.price;

  // Fall back to season-specific price
  if (season === "peak" && room.peak) return room.peak;
  if (season === "blossom" && room.blossom) return room.blossom;
  if (season === "off" && room.off) return room.off;

  // Use high/low values when specific season pricing is unavailable
  if (season === "peak" || season === "high") {
    if (Array.isArray(room.high)) return room.high[0];
    if (room.high) return room.high;
    if (Array.isArray(room.blossom)) return room.blossom[0];
    if (room.blossom) return room.blossom;
    if (Array.isArray(room.low)) return room.low[0];
    if (room.low) return room.low;
  }

  if (season === "blossom") {
    if (room.blossom) return room.blossom;
    if (Array.isArray(room.high)) return room.high[0];
    if (room.high) return room.high;
    if (Array.isArray(room.low)) return room.low[0];
    if (room.low) return room.low;
  }

  if (season === "off" || season === "low") {
    if (Array.isArray(room.low)) return room.low[0];
    if (room.low) return room.low;
    if (Array.isArray(room.high)) return room.high[0];
    if (room.high) return room.high;
  }

  // Fall back to occupancy-specific price (avg of double/triple/quad)
  const prices = [];
  if (room.double) prices.push(room.double);
  if (room.triple) prices.push(room.triple);
  if (room.quad) prices.push(room.quad);
  if (prices.length > 0) {
    return Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
  }

  return 0;
}

function getAccommodationType(category?: string): string {
  if (!category) return "Standard";
  const normalized = category.toLowerCase();
  if (normalized.includes("executive")) return "Executive";
  if (normalized.includes("deluxe")) return "Deluxe";
  if (normalized.includes("standard")) return "Standard";
  return category;
}

function calculateSingleCityHotelCost(
  stays: Array<{ hotelId: string; roomId: string; nights: number; location?: string }>,
  tripDate: string,
  numberOfRooms: number
): { hotelCost: number; hotelName: string; roomType: string } | null {
  const season = getSeasonFromDate(tripDate);
  let totalHotelCost = 0;
  const hotelNames: string[] = [];
  const roomNames: string[] = [];

  for (const stay of stays) {
    if (!stay.hotelId || !stay.roomId || stay.nights <= 0) continue;

    const hotel = getHotelById(stay.hotelId);
    if (!hotel) {
      console.warn(`Hotel not found for single-city stay: ${stay.hotelId}`);
      continue;
    }

    const selectedRoom = hotel.rooms.find((r) => r.name === stay.roomId);
    if (!selectedRoom) {
      console.warn(`Room not found: ${stay.roomId} in hotel ${hotel.name}`);
      continue;
    }

    const roomPrice = getRoomPrice(selectedRoom, season);
    if (roomPrice === 0) {
      console.warn(`Room price is 0 for: ${selectedRoom.name}, season: ${season}`);
      continue;
    }

    const stayCost = roomPrice * numberOfRooms * stay.nights;
    totalHotelCost += stayCost;
    hotelNames.push(stay.location ? `${hotel.name} (${stay.location})` : hotel.name);
    roomNames.push(`${selectedRoom.name} (${stay.nights} nights)`);
  }

  if (hotelNames.length === 0) {
    return null;
  }

  return {
    hotelCost: totalHotelCost,
    hotelName: hotelNames.join(" + "),
    roomType: roomNames.join(" | "),
  };
}

export function calculateQuotation(
  input: QuotationInput,
  serverTransportOptions?: ServerTransportOptions,
): QuotationBreakdown | null {
  try {
    const route = getRouteById(input.routeId);
    const isCustomItinerary = !route && Boolean(input.customCities && input.customCities.length > 0);

    if (!isCustomItinerary && !route) {
      console.warn(`Route not found: ${input.routeId}`);
      return null;
    }

    const customDistance = isCustomItinerary
      ? input.travelMode === "air"
        ? serverTransportOptions?.distanceKm
        : serverTransportOptions?.distanceKm ?? estimateCustomItineraryDistance(input.customCities || [])
      : undefined;
    const transportDistance = input.travelMode === "air"
      ? serverTransportOptions?.distanceKm
      : customDistance;
    const effectiveCustomNights = input.multiCityNights ??
      (input.singleCityHotelStays && input.singleCityHotelStays.length > 0
        ? input.singleCityHotelStays.reduce<Record<string, number>>((acc, stay) => {
            const city = input.customCities?.[0] || "Unknown";
            acc[city] = (acc[city] || 0) + Math.max(0, stay.nights);
            return acc;
          }, {})
        : {});
    const nightsFromCityMap = Object.values(input.multiCityNights || {}).reduce(
      (total, nights) => total + Math.max(0, nights),
      0,
    );
    const nightsFromSingleCityStays = (input.singleCityHotelStays || []).reduce(
      (total, stay) => total + Math.max(0, stay.nights),
      0,
    );
    const nightsFromCustomCityStays = (input.customCityHotelStays || []).reduce(
      (total, stay) => total + Math.max(0, stay.nights),
      0,
    );
    const hasCustomNightSelection = Boolean(
      input.multiCityNights || input.singleCityHotelStays?.length || input.customCityHotelStays?.length,
    );
    const customTripNights = Math.max(
      nightsFromCityMap,
      nightsFromSingleCityStays,
      nightsFromCustomCityStays,
    );
    const tripDays = isCustomItinerary
      ? Math.max(1, (hasCustomNightSelection ? customTripNights : 1) + 1)
      : Math.max(1, route?.duration || 1);
    const breakfastCost = (input.adults + input.kids) * tripDays * BREAKFAST_COST_PER_PERSON_PER_DAY;
    const customVehicleDays = isCustomItinerary ? estimateCustomVehicleDays(effectiveCustomNights) : undefined;

    // Use dynamic transport cost calculation with vehicle rental rates
    if (input.travelMode === "air" && transportDistance === undefined) {
      console.warn("Air quotation requires a server-calculated Skardu road route.");
      return null;
    }

    const transportResult = calculateTransportCost(
      input.vehicleName,
      input.routeId,
      isCustomItinerary ? customVehicleDays : route?.vehicleDays,
      transportDistance,
      input.travelMode,
      isCustomItinerary || input.travelMode === "air" ? serverTransportOptions?.vehicleConfiguration : null,
      isCustomItinerary || input.travelMode === "air" ? serverTransportOptions?.settings : undefined,
    );
    if (transportResult === null) {
      console.warn(`Transport cost calculation failed for vehicle: ${input.vehicleName}, route: ${input.routeId}`);
      return null;
    }
    const transportCost = transportResult.totalCost;

    // Handle multi-city hotels or single hotel
    let hotelCost = 0;
    let hotelName = "Unknown";
    let roomType = "Unknown";

    if (input.multiCityHotels && input.multiCityNights) {
      // Multi-city tour: calculate costs for each city
      const season = getSeasonFromDate(input.tripDate);
      let totalHotelCost = 0;
      const hotelNames: string[] = [];

      for (const [city, nights] of Object.entries(input.multiCityNights)) {
        if (nights <= 0) continue;
        const cityHotelInfo = input.multiCityHotels[city];
        if (!cityHotelInfo) continue;

        const hotel = getHotelById(cityHotelInfo.hotelId);
        if (!hotel) {
          console.warn(`Hotel not found for city ${city}: ${cityHotelInfo.hotelId}`);
          continue;
        }

        const selectedRoom = hotel.rooms.find((r) => r.name === cityHotelInfo.roomId);
        if (!selectedRoom) {
          console.warn(`Room not found: ${cityHotelInfo.roomId} in hotel ${hotel.name}`);
          continue;
        }

        const roomPrice = getRoomPrice(selectedRoom, season);
        if (roomPrice === 0) {
          console.warn(`Room price is 0 for: ${selectedRoom.name}, season: ${season}`);
          continue;
        }

        const cityCost = roomPrice * input.numberOfRooms * nights;
        totalHotelCost += cityCost;
        const hotelStayLabel = hotel.city === city || city.startsWith(`${hotel.city} (`)
          ? city
          : `${hotel.city} stay for ${city}`;
        hotelNames.push(`${hotel.name} (${hotelStayLabel})`);

        console.debug(`City ${city}: ${selectedRoom.name} @ ${roomPrice} × ${input.numberOfRooms} rooms × ${nights} nights = ${cityCost}`);
      }

      hotelCost = totalHotelCost;
      hotelName = hotelNames.join(" + ");
      if (input.customCityHotelStays?.length) {
        const kashmirStays = calculateSingleCityHotelCost(
          input.customCityHotelStays,
          input.tripDate,
          input.numberOfRooms,
        );
        if (!kashmirStays) return null;
        hotelCost += kashmirStays.hotelCost;
        hotelName = [hotelName, kashmirStays.hotelName].filter(Boolean).join(" + ");
        roomType = kashmirStays.roomType;
      }
    } else if (input.singleCityHotelStays && input.singleCityHotelStays.length > 0) {
      const singleCityHotelResult = calculateSingleCityHotelCost(
        input.singleCityHotelStays,
        input.tripDate,
        input.numberOfRooms
      );

      if (!singleCityHotelResult) {
        console.warn(`Single-city hotel cost calculation failed`);
        return null;
      }

      hotelCost = singleCityHotelResult.hotelCost;
      hotelName = singleCityHotelResult.hotelName;
      roomType = singleCityHotelResult.roomType;
    } else if (input.hotelId && input.roomId) {
      // Single-city tour
      const hotel = getHotelById(input.hotelId);
      if (!hotel) {
        console.warn(`Hotel not found: ${input.hotelId}`);
        return null;
      }

      const selectedRoom = hotel.rooms.find((r) => r.name === input.roomId);
      if (!selectedRoom) {
        console.warn(`Room not found: ${input.roomId} in hotel ${hotel.name}`);
        console.debug(`Available rooms:`, hotel.rooms.map(r => r.name));
        return null;
      }

      const season = getSeasonFromDate(input.tripDate);
      const roomPrice = getRoomPrice(selectedRoom, season);

      if (roomPrice === 0) {
        console.warn(`Room price is 0 for: ${selectedRoom.name}, season: ${season}`);
        return null;
      }

      // Calculate nights: for an 8-day trip, that's 7 nights (duration - 1)
      // For custom itineraries, use the provided nights; for routes, use duration - 1
      const numberOfNights = isCustomItinerary 
        ? (input.multiCityNights ? Object.values(input.multiCityNights).reduce((a, b) => a + b, 0) : 1)
        : Math.max(1, (route?.duration || 1) - 1);
      hotelCost = roomPrice * input.numberOfRooms * numberOfNights;
      hotelName = hotel.name;
    } else {
      console.warn(`No hotel information provided for quotation`);
      return null;
    }

    const routeJeepCostPerJeep = getMandatoryJeepCost(route?.id || input.routeId);
    // Air-mode Astore/Fairy Meadows rides use the server-priced destination fees below.
    // Derive mandatory activity costs from the selected package route.
    let actualMandatoryJeepCost = 0;
    const perJeep = input.customCities ? 0 : routeJeepCostPerJeep;
    const estimatedJeepCount = Math.ceil((input.adults + input.kids) / 6) || 1;
    if (perJeep && perJeep > 0) {
      actualMandatoryJeepCost = perJeep * Math.max(1, estimatedJeepCount);
    }

    let jeepAddonsCost = 0;
    const jeepDetails: string[] = [];
    // Add mandatory jeep costs
    if (actualMandatoryJeepCost > 0) {
      jeepAddonsCost += actualMandatoryJeepCost;
      jeepDetails.push(`Mandatory jeep activity: ${actualMandatoryJeepCost}`);
    }

    // Add optional jeep addons
    if (input.jeepAddons && input.jeepAddons.length > 0) {
      const additionalJeepCost = calculateJeepCost(input.jeepAddons);
      jeepAddonsCost += additionalJeepCost;
      jeepDetails.push(
        ...input.jeepAddons.flatMap(({ id, quantity }) => {
          const addon = getJeepAddonById(id);
          return addon ? [`${addon.name} (${quantity} jeep${quantity === 1 ? "" : "s"})`] : [];
        }),
      );
    }

    const subtotal = transportCost + hotelCost + breakfastCost + jeepAddonsCost;
    
    const profitPercentage = subtotal < 500_000
      ? 0.25
      : subtotal < 1_000_000
      ? 0.15
      : 0.10;

    const existingMarkupAmount = Math.round(subtotal * profitPercentage);
    const currentTotal = subtotal + existingMarkupAmount;
    const additionalMarkupAmount = Math.round(currentTotal * 0.2);
    const markupAmount = existingMarkupAmount + additionalMarkupAmount;
    const totalCost = currentTotal + additionalMarkupAmount;
    
    const numberOfGuests = input.adults + input.kids;
    const perPersonCost =
      numberOfGuests > 0 ? Math.round(totalCost / numberOfGuests) : 0;

    console.log(`Quotation calculated successfully - Transport: ${transportCost}, Hotel: ${hotelCost}, Total: ${totalCost}`);

    return {
      transportCost,
      hotelCost,
      breakfastCost,
      jeepAddonsCost,
      subtotal,
      markupAmount,
      totalCost,
      perPersonCost,
      details: {
        route: isCustomItinerary ? (input.customRouteLabel || "Custom Itinerary") : (route?.name || "Unknown"),
        vehicle: input.vehicleName,
        hotel: hotelName,
        roomType,
        accommodationType: getAccommodationType(input.hotelCategory),
        numberOfRooms: input.numberOfRooms,
        numberOfGuests,
        jeepAddonsDetails: jeepDetails,
      },
        transportBreakdown: transportResult && {
          fuelCost: transportResult.fuelCost,
          maintenanceCost: transportResult.maintenanceCost,
          rentalCost: transportResult.rentalCost,
          tollTax: transportResult.tollTax,
          distance: transportResult.distance,
          fuelNeeded: transportResult.fuelNeeded,
          dailyRate: transportResult.dailyRate,
          vehicleDays: transportResult.vehicleDays,
          fuelPricePerLiter: transportResult.fuelPricePerLiter,
          averageKmPerLiter: transportResult.averageKmPerLiter,
        },
    };
  } catch (error) {
    console.error(`Error calculating quotation:`, error);
    return null;
  }
}

export function formatPKR(amount: number): string {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
