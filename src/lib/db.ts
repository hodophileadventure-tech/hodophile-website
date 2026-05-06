import prisma from './prisma';
import { generateLeadId, generateBookingId, generateReviewId, createSlug } from '../../prisma/utils';

// ============== DESTINATIONS ==============

export async function getDestinations() {
  return prisma.destination.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      image: true,
      region: true,
      bestSeason: true,
    },
  });
}

export async function getDestinationBySlug(slug: string) {
  return prisma.destination.findUnique({
    where: { slug },
    include: {
      hotels: {
        include: {
          rooms: true,
        },
      },
      tours: true,
    },
  });
}

// ============== HOTELS ==============

export async function getHotels(destinationId?: string) {
  return prisma.hotel.findMany({
    where: destinationId ? { destinationId } : {},
    include: {
      rooms: {
        include: {
          seasonalPrices: true,
        },
      },
    },
  });
}

export async function getHotelsByCity(city: string) {
  return prisma.hotel.findMany({
    where: { city },
    include: {
      rooms: true,
      destination: true,
    },
  });
}

export async function getHotelById(id: string) {
  return prisma.hotel.findUnique({
    where: { id },
    include: {
      rooms: {
        include: {
          seasonalPrices: true,
          bookings: true,
        },
      },
      destination: true,
    },
  });
}

// ============== HOTEL ROOMS ==============

export async function getRoomsByHotel(hotelId: string) {
  return prisma.hotelRoom.findMany({
    where: { hotelId },
    include: {
      seasonalPrices: true,
      hotel: true,
    },
  });
}

export async function calculateRoomPrice(
  roomId: string,
  numberOfNights: number,
  checkInDate: Date,
) {
  const room = await prisma.hotelRoom.findUnique({
    where: { id: roomId },
    include: {
      seasonalPrices: true,
    },
  });

  if (!room) return null;

  // Find applicable seasonal price
  const seasonal = room.seasonalPrices.find(
    (sp: { startDate: Date; endDate: Date; pricePerNight: number }) =>
      checkInDate >= sp.startDate && checkInDate <= sp.endDate,
  );

  const pricePerNight = seasonal?.pricePerNight || room.basePricePerNight;
  return pricePerNight * numberOfNights;
}

// ============== LEADS ==============

export async function createLead(data: {
  name: string;
  phone: string;
  email?: string;
  route?: string;
  vehicle?: string;
  hotel?: string;
  rooms?: number;
  adultsCount?: number;
  kidsCount?: number;
  totalPrice?: number;
  message?: string;
}) {
  return prisma.lead.create({
    data: {
      id: generateLeadId(data.phone),
      ...data,
      rooms: data.rooms || 1,
      adultsCount: data.adultsCount || 2,
      kidsCount: data.kidsCount || 0,
    },
  });
}

export async function getLeadsByPhone(phone: string) {
  return prisma.lead.findMany({
    where: { phone },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getRecentLeads(limit = 10) {
  return prisma.lead.findMany({
    take: limit,
    orderBy: { createdAt: 'desc' },
  });
}

export async function updateLeadStatus(id: string, status: string) {
  return prisma.lead.update({
    where: { id },
    data: { status },
  });
}

// ============== BOOKINGS ==============

export async function createBooking(data: {
  tourId: string;
  roomId: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  numberOfRooms: number;
  numberOfNights: number;
  checkInDate: Date;
  checkOutDate: Date;
  adultsCount: number;
  kidsCount: number;
  totalPrice: number;
  specialRequests?: string;
}) {
  const checkInDateStr = data.checkInDate.toISOString().split('T')[0]; // YYYY-MM-DD format
  return prisma.booking.create({
    data: {
      id: generateBookingId(data.tourId, checkInDateStr),
      ...data,
      status: 'pending',
    },
    include: {
      tour: true,
      room: {
        include: {
          hotel: true,
        },
      },
    },
  });
}

export async function getBookingsByClient(clientPhone: string) {
  return prisma.booking.findMany({
    where: { clientPhone },
    include: {
      tour: true,
      room: {
        include: {
          hotel: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getBookingById(id: string) {
  return prisma.booking.findUnique({
    where: { id },
    include: {
      tour: {
        include: {
          destination: true,
          vehicle: true,
        },
      },
      room: {
        include: {
          hotel: true,
        },
      },
    },
  });
}

// ============== TOURS ==============

export async function getTours(destinationId?: string) {
  return prisma.tour.findMany({
    where: destinationId ? { destinationId } : {},
    include: {
      destination: true,
      vehicle: true,
    },
  });
}

export async function getTourBySlug(slug: string) {
  return prisma.tour.findUnique({
    where: { slug },
    include: {
      destination: true,
      vehicle: true,
    },
  });
}

// ============== REVIEWS ==============

export async function getApprovedReviews(limit = 10) {
  return prisma.review.findMany({
    where: { approved: true },
    take: limit,
    orderBy: { createdAt: 'desc' },
  });
}

export async function createReview(data: {
  name: string;
  email?: string;
  tourName: string;
  hotelName?: string;
  rating: number;
  comment: string;
  image?: string;
}) {
  const tourSlug = createSlug(data.tourName);
  return prisma.review.create({
    data: {
      id: generateReviewId(tourSlug),
      ...data,
      approved: false, // Require approval
    },
  });
}

export async function getPendingReviews() {
  return prisma.review.findMany({
    where: { approved: false },
    orderBy: { createdAt: 'asc' },
  });
}

export async function approveReview(id: string) {
  return prisma.review.update({
    where: { id },
    data: { approved: true },
  });
}

// ============== VEHICLES ==============

export async function getVehicles() {
  return prisma.vehicle.findMany();
}

export async function getVehicleById(id: string) {
  return prisma.vehicle.findUnique({
    where: { id },
    include: {
      tours: true,
    },
  });
}
