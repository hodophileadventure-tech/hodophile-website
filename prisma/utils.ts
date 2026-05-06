/**
 * Utility functions for generating readable IDs for database entities
 */

export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove multiple hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

export function generateDestinationId(slug: string): string {
  return `dest-${slug}`;
}

export function generateHotelId(city: string, hotelName: string): string {
  const citySlug = createSlug(city);
  const hotelSlug = createSlug(hotelName);
  return `hotel-${citySlug}-${hotelSlug}`;
}

export function generateHotelRoomId(hotelId: string, roomType: string): string {
  const roomSlug = createSlug(roomType);
  return `${hotelId}-room-${roomSlug}`;
}

export function generateSeasonalPriceId(roomId: string, season: string): string {
  return `${roomId}-${season}`;
}

export function generateVehicleId(vehicleName: string): string {
  const slug = createSlug(vehicleName);
  return `vehicle-${slug}`;
}

export function generateTourId(slug: string): string {
  return `tour-${slug}`;
}

export function generateLeadId(phone: string): string {
  const timestamp = Date.now();
  return `lead-${phone}-${timestamp}`;
}

export function generateBookingId(tourId: string, date: string): string {
  return `booking-${tourId}-${date}`;
}

export function generateReviewId(tourId: string): string {
  const timestamp = Date.now();
  return `review-${tourId}-${timestamp}`;
}

export function generateRouteId(slug: string): string {
  return `route-${slug}`;
}
