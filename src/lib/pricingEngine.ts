import { getRouteById, getVehiclePrice } from "./data/routes";
import { getHotelById } from "./data/hotels";
import { calculateJeepCost } from "./data/jeeps";
import { getRouteDistance } from "./data/distances";
import { currentFuelPrices, fuelConsumption } from "./data/fuel";
import type { Room } from "./data/hotels";

export interface QuotationInput {
  routeId: string;
  vehicleName: string;
  hotelId: string;
  roomId: string; // identifier for the selected room
  numberOfRooms: number;
  adults: number;
  kids: number;
  jeepAddons?: { id: string; quantity: number }[];
  tripDate: string; // ISO date string
}

export interface QuotationBreakdown {
  transportCost: number;
  hotelCost: number;
  jeepAddonsCost: number;
  subtotal: number;
  markupAmount: number; // 30% markup
  totalCost: number;
  perPersonCost: number;
  details: {
    route: string;
    vehicle: string;
    hotel: string;
    roomType: string;
    numberOfRooms: number;
    numberOfGuests: number;
    jeepAddonsDetails: string[];
  };
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

// Calculate transport cost based on fuel consumption and distance
function calculateTransportCost(
  vehicleName: string,
  routeId: string
): number | null {
  const distance = getRouteDistance(routeId);
  if (!distance) {
    console.warn(`Distance not found for route: ${routeId}`);
    return null;
  }

  let fuelType: "petrol" | "diesel" = "petrol";
  let consumption = 8; // default
  let profitMargin = 1.5; // 50% profit margin on fuel costs

  // Determine fuel type and consumption for each vehicle
  if (vehicleName === "Toyota Corolla") {
    consumption = fuelConsumption.corolla.petrol;
    fuelType = "petrol";
  } else if (vehicleName === "Honda BRV") {
    consumption = fuelConsumption.brv.petrol; // default to petrol
    fuelType = "petrol";
  } else if (vehicleName === "Prado") {
    consumption = fuelConsumption.prado.diesel; // Prado typically diesel
    fuelType = "diesel";
  } else if (vehicleName.includes("Grand Cabin")) {
    consumption = vehicleName.includes("Diesel")
      ? fuelConsumption.grandCabin.diesel
      : fuelConsumption.grandCabin.petrol;
    fuelType = vehicleName.includes("Diesel") ? "diesel" : "petrol";
  } else if (vehicleName.includes("Coaster")) {
    consumption = fuelConsumption.coaster.diesel;
    fuelType = "diesel";
  } else {
    // Fallback for unknown vehicles
    console.warn(`Unknown vehicle type: ${vehicleName}, using defaults`);
  }

  // Calculate fuel needed
  const fuelNeeded = distance / consumption;
  const fuelPrice = fuelType === "petrol" ? currentFuelPrices.petrol : currentFuelPrices.diesel;
  const baseFuelCost = Math.round(fuelNeeded * fuelPrice);

  // Add driver allowance, maintenance, tolls, wear & tear via profit margin
  const transportCost = Math.round(baseFuelCost * profitMargin);

  console.debug(`Transport calc - Vehicle: ${vehicleName}, Distance: ${distance}km, Consumption: ${consumption}km/l, Fuel: ${fuelNeeded}l, Cost: ${transportCost}`);

  return transportCost;
}

function getRoomPrice(room: Room, season: string): number {
  // Try season-specific price first
  if (season === "peak" && room.peak) return room.peak;
  if (season === "blossom" && room.blossom) return room.blossom;
  if (season === "off" && room.off) return room.off;

  // Fall back to low/high pricing
  if (season === "peak" || season === "high") {
    if (Array.isArray(room.high)) return room.high[0];
    if (room.high) return room.high;
  }
  if (season === "off" || season === "low") {
    if (Array.isArray(room.low)) return room.low[0];
    if (room.low) return room.low;
  }

  // Fall back to fixed price
  if (room.price) return room.price;

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

export function calculateQuotation(
  input: QuotationInput
): QuotationBreakdown | null {
  try {
    const route = getRouteById(input.routeId);
    if (!route) {
      console.warn(`Route not found: ${input.routeId}`);
      return null;
    }

    // Use fuel-based transport cost calculation
    const transportCost = calculateTransportCost(input.vehicleName, input.routeId);
    if (transportCost === null) {
      console.warn(`Transport cost calculation failed for vehicle: ${input.vehicleName}, route: ${input.routeId}`);
      return null;
    }

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

    const hotelCost = roomPrice * input.numberOfRooms;

    let jeepAddonsCost = 0;
    const jeepDetails: string[] = [];
    if (input.jeepAddons && input.jeepAddons.length > 0) {
      jeepAddonsCost = calculateJeepCost(input.jeepAddons);
      // You can enhance this to get addon names
      jeepDetails.push(`Jeep addons: ${input.jeepAddons.length} selected`);
    }

    const subtotal = transportCost + hotelCost + jeepAddonsCost;
    
    // Add 30% markup
    const MARKUP_PERCENTAGE = 0.30;
    const markupAmount = Math.round(subtotal * MARKUP_PERCENTAGE);
    const totalCost = subtotal + markupAmount;
    
    const numberOfGuests = input.adults + input.kids;
    const perPersonCost =
      numberOfGuests > 0 ? Math.round(totalCost / numberOfGuests) : 0;

    console.log(`Quotation calculated successfully - Transport: ${transportCost}, Hotel: ${hotelCost}, Total: ${totalCost}`);

    return {
      transportCost,
      hotelCost,
      jeepAddonsCost,
      subtotal,
      markupAmount,
      totalCost,
      perPersonCost,
      details: {
        route: route.name,
        vehicle: input.vehicleName,
        hotel: hotel.name,
        roomType: selectedRoom.name,
        numberOfRooms: input.numberOfRooms,
        numberOfGuests,
        jeepAddonsDetails: jeepDetails,
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
