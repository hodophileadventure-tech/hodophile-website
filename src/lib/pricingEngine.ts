import { getRouteById } from "./data/routes";
import { getHotelById } from "./data/hotels";
import { calculateJeepCost } from "./data/jeeps";
import { getRouteDistance } from "./data/distances";
import { getVehicleRate } from "./data/vehicleRates";
import { currentFuelPrices } from "./data/fuel";
import type { Room } from "./data/hotels";

export interface QuotationInput {
  routeId: string;
  vehicleName: string;
  hotelId?: string;
  roomId?: string; // identifier for the selected room
  multiCityHotels?: Record<string, { hotelId: string; roomId: string }>;
  multiCityNights?: Record<string, number>; // nights for each city
  numberOfRooms: number;
  adults: number;
  kids: number;
  jeepAddons?: { id: string; quantity: number }[];
  mandatoryJeepCost?: number; // Mandatory jeep cost for this route (e.g., Deosai for 12-day tour)
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

// Calculate transport cost using dynamic pricing: fuel cost + daily rental rate + toll/tax
function calculateTransportCost(
  vehicleName: string,
  routeId: string,
  vehicleDays: number = 8 // Default 8 days for multi-city tours; adjust as needed
): number | null {
  const vehicleRate = getVehicleRate(vehicleName);
  if (!vehicleRate) {
    console.warn(`Vehicle rate not found for: ${vehicleName}`);
    return null;
  }

  const distance = getRouteDistance(routeId);
  if (!distance) {
    console.warn(`Distance not found for route: ${routeId}`);
    return null;
  }

  // Get fuel price based on vehicle fuel type
  const fuelPrice =
    vehicleRate.fuelType === "diesel"
      ? currentFuelPrices.diesel
      : currentFuelPrices.petrol;

  // Calculate fuel cost
  const fuelNeeded = distance / vehicleRate.consumption;
  const fuelCost = Math.round(fuelNeeded * fuelPrice);

  // Calculate rental cost
  const rentalCost = vehicleRate.dailyRate * vehicleDays;

  // Total transport cost (fuel + rental + toll/tax)
  const totalCost = fuelCost + rentalCost + vehicleRate.tollTax;

  console.debug(
    `Transport: ${vehicleName} | Distance: ${distance}km | Consumption: ${vehicleRate.consumption}km/L | Fuel: ${fuelNeeded.toFixed(1)}L × ${fuelPrice}PKR = ${fuelCost}PKR | Rental: ${vehicleRate.dailyRate}PKR × ${vehicleDays}days = ${rentalCost}PKR | Toll/Tax: ${vehicleRate.tollTax}PKR | Total: ${totalCost}PKR`
  );
  return totalCost;
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

    // Use dynamic transport cost calculation with vehicle rental rates
    const transportCost = calculateTransportCost(
      input.vehicleName,
      input.routeId,
      route.vehicleDays
    );
    if (transportCost === null) {
      console.warn(`Transport cost calculation failed for vehicle: ${input.vehicleName}, route: ${input.routeId}`);
      return null;
    }

    // Handle multi-city hotels or single hotel
    let hotelCost = 0;
    let hotelName = "Unknown";

    if (input.multiCityHotels && input.multiCityNights) {
      // Multi-city tour: calculate costs for each city
      const season = getSeasonFromDate(input.tripDate);
      let totalHotelCost = 0;
      const hotelNames: string[] = [];

      for (const [city, nights] of Object.entries(input.multiCityNights)) {
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
        hotelNames.push(`${hotel.name} (${city})`);

        console.debug(`City ${city}: ${selectedRoom.name} @ ${roomPrice} × ${input.numberOfRooms} rooms × ${nights} nights = ${cityCost}`);
      }

      hotelCost = totalHotelCost;
      hotelName = hotelNames.join(" + ");
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
      const numberOfNights = Math.max(1, route.duration - 1);
      hotelCost = roomPrice * input.numberOfRooms * numberOfNights;
      hotelName = hotel.name;
    } else {
      console.warn(`No hotel information provided for quotation`);
      return null;
    }

    let jeepAddonsCost = 0;
    const jeepDetails: string[] = [];
    
    // Add mandatory jeep costs
    if (input.mandatoryJeepCost && input.mandatoryJeepCost > 0) {
      jeepAddonsCost += input.mandatoryJeepCost;
      jeepDetails.push(`Mandatory jeep activity: ${input.mandatoryJeepCost}`);
    }
    
    // Add optional jeep addons
    if (input.jeepAddons && input.jeepAddons.length > 0) {
      const additionalJeepCost = calculateJeepCost(input.jeepAddons);
      jeepAddonsCost += additionalJeepCost;
      jeepDetails.push(`Additional jeep addons: ${input.jeepAddons.length} selected`);
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
        hotel: hotelName,
        roomType: input.roomId || "Multiple",
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
