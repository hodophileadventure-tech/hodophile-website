const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const slug = 'kashmir-taobat';
  const id = `tour-${slug}`;
  // check if exists
  const existing = await prisma.tour.findUnique({ where: { slug } });
  if (existing) {
    console.log('Tour already exists:', existing.name);
    await prisma.$disconnect();
    return;
  }

  // Find destination id for 'kashmir'
  const dest = await prisma.destination.findUnique({ where: { slug: 'kashmir' } });
  if (!dest) {
    console.error('Destination with slug "kashmir" not found. Aborting.');
    await prisma.$disconnect();
    return;
  }

  // pick a vehicle (first available)
  const vehicle = await prisma.vehicle.findFirst();
  if (!vehicle) {
    console.error('No vehicle found. Aborting.');
    await prisma.$disconnect();
    return;
  }

  const tourData = {
    id,
    name: '9 Days Kashmir, Arangkel & Taobat',
    slug,
    description:
      'Embark on a 9-day journey exploring Kashmir, Taobat and ArangKel with scenic meadows, lakes and jeep rides to ArangKel.',
    image: '/images/destinations/kashmir.jpg',
    duration: 9,
    destinationId: dest.id,
    vehicleId: vehicle.id,
    basePricePerPerson: 51500,
    maxGroupSize: 40,
    minGroupSize: 6,
    itinerary: JSON.stringify([
      { day: 1, title: 'Departure from Karachi', description: 'Depart from Karachi by bus or train.' },
      { day: 2, title: 'Arrival in Islamabad', description: 'Arrive and rest.' },
      { day: 3, title: 'Sharda Valley', description: 'Visit Sharda.' },
      { day: 4, title: 'Taobat Valley', description: 'Jeep transfer to Taobat.' },
      { day: 5, title: 'Arangkel Trek', description: 'Trek to Arangkel.' },
      { day: 6, title: 'Nagar Valley', description: 'Explore Nagar.' },
      { day: 7, title: 'Return to Islamabad', description: 'Return via Kundal Shahi.' },
      { day: 8, title: 'Karachi Departure', description: 'Travel back.' },
      { day: 9, title: 'Arrival in Karachi', description: 'Trip ends.' },
    ]),
    included: JSON.stringify(['Hotel accommodations', 'Transport', 'Jeep ride', 'Breakfasts and dinners']),
    excluded: JSON.stringify(['Airfare', 'Personal expenses']),
  };

  const created = await prisma.tour.create({ data: tourData });
  console.log('Created tour:', created.name);
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
