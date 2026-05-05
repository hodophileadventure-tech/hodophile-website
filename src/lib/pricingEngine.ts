import { getRouteById } from "./data/routes";
import { getHotelById } from "./data/hotels";
import { calculateJeepCost } from "./data/jeeps";
import { getRouteDistance } from "./data/distances";
import { getVehicleRate } from "./data/vehicleRates";
import { currentFuelPrices } from "./data/fuel";
import type { Room } from "./data/hotels";
import prisma from "./prisma";

type PricingConfigRow = {
  transportBaseMultiplier: number;
  peakMultiplier: number;
  blossomMultiplier: number;
  offMultiplier: number;
  markupPercentage: number;
  fuelSurchargePercentage: number;
};

const DEFAULT_PRICING_CONFIG: PricingConfigRow = {
  transportBaseMultiplier: 1,
  peakMultiplier: 1.3,
  blossomMultiplier: 1.15,
  offMultiplier: 0.85,
  markupPercentage: 30,
  fuelSurchargePercentage: 0,
};

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

async function getPricingConfig(): Promise<PricingConfigRow> {
  try {
    const config = await prisma.pricingConfig.findFirst({
      orderBy: { updatedAt: 'desc' },
    });

    if (!config) {
      return DEFAULT_PRICING_CONFIG;
    }

    return {
      transportBaseMultiplier: config.transportBaseMultiplier ?? DEFAULT_PRICING_CONFIG.transportBaseMultiplier,
      peakMultiplier: config.peakMultiplier ?? DEFAULT_PRICING_CONFIG.peakMultiplier,
      blossomMultiplier: config.blossomMultiplier ?? DEFAULT_PRICING_CONFIG.blossomMultiplier,
      offMultiplier: config.offMultiplier ?? DEFAULT_PRICING_CONFIG.offMultiplier,
      markupPercentage: config.markupPercentage ?? DEFAULT_PRICING_CONFIG.markupPercentage,
      fuelSurchargePercentage: config.fuelSurchargePercentage ?? DEFAULT_PRICING_CONFIG.fuelSurchargePercentage,
    };
  } catch (error) {
    console.warn('Error loading pricing config, using defaults:', error);
    return DEFAULT_PRICING_CONFIG;
  }
}

// Get room price from database by season
async function getRoomPriceFromDB(
  roomId: string,
  season: "peak" | "blossom" | "off" | "fixed"
): Promise<number | null> {
  try {
    const room = await prisma.hotelRoom.findUnique({
      where: { id: roomId },
    });
    if (!room) return null;

    if (season === "fixed") {
      return room.basePricePerNight;
    }

    const seasonalPrice = await prisma.seasonalPrice.findFirst({
      where: {
        roomId: roomId,
        season: season as "peak" | "blossom" | "off",
      },
    });

    const multiplier =
      season === "peak"
        ? 1.3
        : season === "blossom"
        ? 1.15
        : 0.85;
    const expectedSeasonalPrice = Math.round(room.basePricePerNight * multiplier);

    if (seasonalPrice && seasonalPrice.pricePerNight === expectedSeasonalPrice) {
      return seasonalPrice.pricePerNight;
    }

    return expectedSeasonalPrice;
  } catch (error) {
    console.warn(`Error fetching room price from DB for room ${roomId}:`, error);
    return null;
  }
}

// Get route-specific transport pricing if available
async function getTransportPricingByRoute(routeId: string, vehicleId: string) {
  try {
    const pricing = await prisma.transportPricing.findUnique({
      where: { 
        routeId_vehicleId: {
          routeId,
          vehicleId,
        }
      },
    });
    return pricing;
  } catch (error) {
    console.warn(`Error fetching transport pricing for route ${routeId} and vehicle ${vehicleId}:`, error);
    return null;
  }
}

// Get vehicle price per km from database
async function getVehiclePriceFromDB(vehicleName: string): Promise<number | null> {
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { name: vehicleName },
    });

    return vehicle?.pricePerKm || null;
  } catch (error) {
    console.warn(`Error fetching vehicle price from DB for ${vehicleName}:`, error);
    return null;
  }
}

// Calculate transport cost using DB data
async function calculateTransportCostFromDB(
  vehicleName: string,
  routeId: string,
  vehicleDays: number = 8,
  season: "peak" | "blossom" | "off" | "fixed" = "off"
): Promise<number | null> {
  try {
    const distance = getRouteDistance(routeId);
    if (!distance) {
      console.warn(`Distance not found for route: ${routeId}`);
      return null;
    }

    const pricingConfig = await getPricingConfig();
    const seasonalMultiplier =
      season === "peak"
        ? pricingConfig.peakMultiplier
        : season === "blossom"
          ? pricingConfig.blossomMultiplier
          : season === "off"
            ? pricingConfig.offMultiplier
            : 1;

    // Get vehicle to find its ID
    const vehicle = await prisma.vehicle.findUnique({
      where: { name: vehicleName },
    });
    
    if (!vehicle) {
      console.warn(`Vehicle not found: ${vehicleName}`);
      return calculateTransportCost(vehicleName, routeId, vehicleDays);
    }

    // Try route & vehicle-specific transport pricing first
    const routePricing = await getTransportPricingByRoute(routeId, vehicle.id);
    
    if (routePricing) {
      // Use editable formula: (Km ÷ consumption) × fuelPrice + dailyRate × days
      const fuelCost = Math.round((distance / routePricing.vehicleAverageConsumption) * routePricing.fuelPricePerLiter);
      const rentalCost = routePricing.dailyRentalRate * vehicleDays;
      const baseTransportCost = fuelCost + rentalCost;
      
      // Apply seasonal multiplier
      const costWithSeason = baseTransportCost * seasonalMultiplier;
      
      // Apply global fuel surcharge
      const fuelSurcharge = Math.round(costWithSeason * (pricingConfig.fuelSurchargePercentage / 100));
      const transportCost = Math.round(costWithSeason + fuelSurcharge);

      console.debug(
        `Route Transport: ${routeId} | Vehicle: ${vehicleName} | Distance: ${distance}km | Consumption: ${routePricing.vehicleAverageConsumption}km/L | Fuel: (${distance}÷${routePricing.vehicleAverageConsumption})×${routePricing.fuelPricePerLiter}=${fuelCost}PKR | Rental: ${routePricing.dailyRentalRate}×${vehicleDays}=${rentalCost}PKR | Base: ${baseTransportCost}PKR | Seasonal (×${seasonalMultiplier}): ${costWithSeason}PKR | Total: ${transportCost}PKR`
      );
      return transportCost;
    }

    // Fallback to vehicle-based pricing
    const vehiclePrice = await getVehiclePriceFromDB(vehicleName);
    if (!vehiclePrice) {
      console.warn(`Vehicle price not found in DB for: ${vehicleName}`);
      return calculateTransportCost(vehicleName, routeId, vehicleDays);
    }

    // Editable DB-backed transport formula
    // pricePerKm × distance × base multiplier × seasonal multiplier
    const baseTransportCost = vehiclePrice * distance * pricingConfig.transportBaseMultiplier * seasonalMultiplier;
    const fuelSurcharge = Math.round(baseTransportCost * (pricingConfig.fuelSurchargePercentage / 100));
    const transportCost = Math.round(
      baseTransportCost + fuelSurcharge
    );

    console.debug(
      `DB Transport: ${vehicleName} | Price/km: ${vehiclePrice} PKR | Distance: ${distance}km | Total: ${transportCost}PKR`
    );
    return transportCost;
  } catch (error) {
    console.warn(`Error calculating transport cost from DB:`, error);
    return calculateTransportCost(vehicleName, routeId, vehicleDays);
  }
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

export function normalizeId(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^ -]+/g, "")
    .replace(/[^ -\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function findHotelByIdOrName(hotelId: string | undefined) {
  if (!hotelId) return null;
  const normalizedHotelId = normalizeId(hotelId);

  const hotel = await prisma.hotel.findFirst({
    where: {
      OR: [
        { id: hotelId },
        { id: { contains: normalizedHotelId } },
        { name: { contains: hotelId, mode: 'insensitive' } },
        { name: { contains: normalizedHotelId, mode: 'insensitive' } },
      ],
    },
  });

  return hotel;
}

export async function calculateQuotation(
  input: QuotationInput
): Promise<QuotationBreakdown | null> {
  try {
    const route = getRouteById(input.routeId);
    if (!route) {
      console.warn(`Route not found: ${input.routeId}`);
      return null;
    }

    const season = getSeasonFromDate(input.tripDate);

    // Use database transport cost calculation
    const transportCost = await calculateTransportCostFromDB(
      input.vehicleName,
      input.routeId,
      route.vehicleDays,
      season
    );
    if (transportCost === null) {
      console.warn(`Transport cost calculation failed for vehicle: ${input.vehicleName}, route: ${input.routeId}`);
      return null;
    }

    // Handle multi-city hotels or single hotel
    let hotelCost = 0;
    let hotelName = "Unknown";

    if (input.multiCityHotels && input.multiCityNights) {
      // Multi-city tour: calculate costs for each city using DB
      let totalHotelCost = 0;
      const hotelNames: string[] = [];

      for (const [city, nights] of Object.entries(input.multiCityNights)) {
        const cityHotelInfo = input.multiCityHotels[city];
        if (!cityHotelInfo) continue;

        try {
          // Fetch hotel and room from DB
          let hotelFromDB = await prisma.hotel.findUnique({
            where: { id: cityHotelInfo.hotelId },
            include: { rooms: true },
          });

          if (!hotelFromDB) {
            hotelFromDB = await prisma.hotel.findFirst({
              where: {
                OR: [
                  { id: cityHotelInfo.hotelId },
                  { id: { contains: normalizeId(cityHotelInfo.hotelId) } },
                  { name: { contains: cityHotelInfo.hotelId, mode: 'insensitive' } },
                  { name: { contains: normalizeId(cityHotelInfo.hotelId), mode: 'insensitive' } },
                ],
              },
              include: { rooms: true },
            });
          }

          if (!hotelFromDB) {
            console.warn(`Hotel not found in DB for city ${city}: ${cityHotelInfo.hotelId}`);
            continue;
          }

          // Try to find room by ID, then by roomType name
          let roomFromDB = await prisma.hotelRoom.findUnique({
            where: { id: cityHotelInfo.roomId },
          });

          if (!roomFromDB) {
            roomFromDB = await prisma.hotelRoom.findFirst({
              where: {
                hotelId: hotelFromDB.id,
                roomType: cityHotelInfo.roomId,
              },
            });
          }

          if (!roomFromDB) {
            // Try by roomType name
            roomFromDB = await prisma.hotelRoom.findFirst({
              where: {
                hotelId: cityHotelInfo.hotelId,
                roomType: cityHotelInfo.roomId,
              },
            });
          }

          if (!roomFromDB) {
            console.warn(`Room not found in DB: ${cityHotelInfo.roomId} in hotel ${cityHotelInfo.hotelId}`);
            continue;
          }

          const roomPrice = await getRoomPriceFromDB(roomFromDB.id, season);
          if (!roomPrice) {
            console.warn(`Room price is 0 for: ${roomFromDB.roomType}, season: ${season}`);
            continue;
          }

          const cityCost = roomPrice * input.numberOfRooms * nights;
          totalHotelCost += cityCost;
          hotelNames.push(`${hotelFromDB.name} (${city})`);

          console.debug(`City ${city}: ${roomFromDB.roomType} @ ${roomPrice} × ${input.numberOfRooms} rooms × ${nights} nights = ${cityCost}`);
        } catch (error) {
          console.warn(`Error processing city ${city}:`, error);
          continue;
        }
      }

      hotelCost = totalHotelCost;
      hotelName = hotelNames.join(" + ");
    } else if (input.hotelId && input.roomId) {
      // Single-city tour using DB
      try {
        let hotelFromDB = await prisma.hotel.findUnique({
          where: { id: input.hotelId },
        });

        if (!hotelFromDB) {
          hotelFromDB = await findHotelByIdOrName(input.hotelId);
        }

        if (!hotelFromDB) {
          console.warn(`Hotel not found in DB: ${input.hotelId}`);
          return null;
        }

        // Try to find room by ID, then by roomType name
        let roomFromDB = await prisma.hotelRoom.findUnique({
          where: { id: input.roomId },
        });

        if (!roomFromDB) {
          // Try by roomType name
          roomFromDB = await prisma.hotelRoom.findFirst({
            where: {
              hotelId: input.hotelId,
              roomType: input.roomId,
            },
          });
        }

        if (!roomFromDB) {
          console.warn(`Room not found in DB: ${input.roomId} in hotel ${input.hotelId}`);
          return null;
        }

        const roomPrice = await getRoomPriceFromDB(roomFromDB.id, season);
        if (!roomPrice) {
          console.warn(`Room price is 0 for: ${roomFromDB.roomType}, season: ${season}`);
          return null;
        }

        // Calculate nights: for an 8-day trip, that's 7 nights (duration - 1)
        const numberOfNights = Math.max(1, route.duration - 1);
        hotelCost = roomPrice * input.numberOfRooms * numberOfNights;
        hotelName = hotelFromDB.name;
      } catch (error) {
        console.warn(`Error fetching hotel/room from DB:`, error);
        // Fallback to static data
        const hotel = getHotelById(input.hotelId);
        if (!hotel) {
          console.warn(`Hotel not found in static data: ${input.hotelId}`);
          return null;
        }

        const selectedRoom = hotel.rooms.find((r) => r.name === input.roomId);
        if (!selectedRoom) {
          console.warn(`Room not found: ${input.roomId} in hotel ${hotel.name}`);
          return null;
        }

        const roomPrice = getRoomPrice(selectedRoom, season);
        if (roomPrice === 0) {
          console.warn(`Room price is 0 for: ${selectedRoom.name}, season: ${season}`);
          return null;
        }

        const numberOfNights = Math.max(1, route.duration - 1);
        hotelCost = roomPrice * input.numberOfRooms * numberOfNights;
        hotelName = hotel.name;
      }
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
    
    const pricingConfig = await getPricingConfig();
    const markupAmount = Math.round(subtotal * (pricingConfig.markupPercentage / 100));
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
