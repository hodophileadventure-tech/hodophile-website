import { getRouteById, getVehiclePrice } from "./data/routes";
import { getHotelById } from "./data/hotels";
import { calculateJeepCost } from "./data/jeeps";
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
  const route = getRouteById(input.routeId);
  if (!route) return null;

  const transportCost = getVehiclePrice(input.routeId, input.vehicleName);
  if (!transportCost) return null;

  const hotel = getHotelById(input.hotelId);
  if (!hotel) return null;

  const selectedRoom = hotel.rooms.find((r) => r.name === input.roomId);
  if (!selectedRoom) return null;

  const season = getSeasonFromDate(input.tripDate);
  const roomPrice = getRoomPrice(selectedRoom, season);

  if (roomPrice === 0) return null;

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
}

export function formatPKR(amount: number): string {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
