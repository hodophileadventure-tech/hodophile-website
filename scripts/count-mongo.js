const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const results = {};
  try {
    results.Destination = await prisma.destination.count();
    results.Vehicle = await prisma.vehicle.count();
    results.PricingConfig = await prisma.pricingConfig.count();
    results.Hotel = await prisma.hotel.count();
    results.HotelRoom = await prisma.hotelRoom.count();
    results.SeasonalPrice = await prisma.seasonalPrice.count();
    results.Tour = await prisma.tour.count();
    results.Lead = await prisma.lead.count();
    results.Booking = await prisma.booking.count();
    results.Review = await prisma.review.count();
    results.TransportPricing = await prisma.transportPricing.count();
    results.Route = await prisma.route.count();
  } catch (e) {
    console.error('Error querying counts:', e.message || e);
  } finally {
    await prisma.$disconnect();
  }
  console.table(results);
}

main();
