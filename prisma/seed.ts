import { PrismaClient } from '@prisma/client';
import { hotels } from '../src/lib/data/hotels';
import { routes } from '../src/lib/data/routes';
import { vehicleRates } from '../src/lib/data/vehicleRates';
import {
  generateDestinationId,
  generateHotelId,
  generateHotelRoomId,
  generateSeasonalPriceId,
  generateVehicleId,
  generateTourId,
} from './utils';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting comprehensive database seeding...\n');

  // ============== DESTINATIONS ==============
  console.log('📍 Creating destinations...');
  const destinations = await Promise.all([
    prisma.destination.upsert({
      where: { slug: 'skardu' },
      update: {},
      create: {
        id: generateDestinationId('skardu'),
        name: 'Skardu',
        slug: 'skardu',
        description: 'Gateway to the Himalayas with pristine lakes, snow-capped peaks, and adventure activities.',
        region: 'Northern Areas',
        bestSeason: 'May-September',
        elevation: 2228,
        difficulty: 'challenging',
      },
    }),
    prisma.destination.upsert({
      where: { slug: 'hunza-valley' },
      update: {},
      create: {
        id: generateDestinationId('hunza-valley'),
        name: 'Hunza Valley',
        slug: 'hunza-valley',
        description: 'Stunning mountain scenery with the world-famous Hunza Valley hospitality.',
        region: 'Northern Areas',
        bestSeason: 'June-September',
        elevation: 1500,
        difficulty: 'moderate',
        image: '/images/destinations/hunza.avif',
      },
    }),
    prisma.destination.upsert({
      where: { slug: 'swat' },
      update: {},
      create: {
        id: generateDestinationId('swat'),
        name: 'Swat',
        slug: 'swat',
        description: 'Green valley with lush forests, rivers, and cultural heritage sites.',
        region: 'Khyber Pakhtunkhwa',
        bestSeason: 'April-October',
        elevation: 1200,
        difficulty: 'easy',
      },
    }),
    prisma.destination.upsert({
      where: { slug: 'kashmir' },
      update: {},
      create: {
        id: generateDestinationId('kashmir'),
        name: 'Kashmir',
        slug: 'kashmir',
        description: 'Paradise on earth with lakes, mountains, and breathtaking natural beauty.',
        region: 'Kashmir',
        bestSeason: 'April-September',
        elevation: 1600,
        difficulty: 'easy',
      },
    }),
    prisma.destination.upsert({
      where: { slug: 'khaplu' },
      update: {},
      create: {
        id: generateDestinationId('khaplu'),
        name: 'Khaplu',
        slug: 'khaplu',
        description: 'Royal heritage town with historic palaces and mountain views.',
        region: 'Northern Areas',
        bestSeason: 'May-September',
        elevation: 2600,
        difficulty: 'moderate',
      },
    }),
    prisma.destination.upsert({
      where: { slug: 'shogran' },
      update: {},
      create: {
        id: generateDestinationId('shogran'),
        name: 'Shogran',
        slug: 'shogran',
        description: 'High altitude meadow with pine forests and panoramic views.',
        region: 'Khyber Pakhtunkhwa',
        bestSeason: 'May-September',
        elevation: 2240,
        difficulty: 'moderate',
      },
    }),
    prisma.destination.upsert({
      where: { slug: 'islamabad' },
      update: {},
      create: {
        id: generateDestinationId('islamabad'),
        name: 'Islamabad',
        slug: 'islamabad',
        description: 'Capital city with modern amenities and nearby natural attractions.',
        region: 'Islamabad',
        bestSeason: 'Year-round',
        elevation: 507,
        difficulty: 'easy',
      },
    }),
    prisma.destination.upsert({
      where: { slug: 'nathia-gali' },
      update: {},
      create: {
        id: generateDestinationId('nathia-gali'),
        name: 'Nathia Gali',
        slug: 'nathia-gali',
        description: 'Hill station with pine forests and cooler climate.',
        region: 'Khyber Pakhtunkhwa',
        bestSeason: 'May-September',
        elevation: 2515,
        difficulty: 'easy',
      },
    }),
    prisma.destination.upsert({
      where: { slug: 'naran' },
      update: {},
      create: {
        id: generateDestinationId('naran'),
        name: 'Naran',
        slug: 'naran',
        description: 'Popular hill station with beautiful lakes and green meadows.',
        region: 'Khyber Pakhtunkhwa',
        bestSeason: 'June-September',
        elevation: 2410,
        difficulty: 'easy',
      },
    }),
    prisma.destination.upsert({
      where: { slug: 'chilas' },
      update: {},
      create: {
        id: generateDestinationId('chilas'),
        name: 'Chilas',
        slug: 'chilas',
        description: 'Gateway to the north with historic rock carvings and Indus Valley views.',
        region: 'Northern Areas',
        bestSeason: 'April-September',
        elevation: 1220,
        difficulty: 'moderate',
      },
    }),
  ]);
  console.log(`✅ Created ${destinations.length} destinations\n`);

  // ============== VEHICLES ==============
  console.log('🚗 Creating vehicles...');
  const vehicles = await Promise.all([
    prisma.vehicle.upsert({
      where: { name: 'Toyota Corolla' },
      update: {},
      create: {
        id: generateVehicleId('Toyota Corolla'),
        name: 'Toyota Corolla',
        type: 'Sedan',
        capacity: 5,
        pricePerKm: 35,
        description: 'Fuel-efficient sedan for comfortable city and highway travel',
      },
    }),
    prisma.vehicle.upsert({
      where: { name: 'Honda BRV' },
      update: {},
      create: {
        id: generateVehicleId('Honda BRV'),
        name: 'Honda BRV',
        type: 'SUV',
        capacity: 5,
        pricePerKm: 45,
        description: 'Compact SUV perfect for small groups and mountain roads',
      },
    }),
    prisma.vehicle.upsert({
      where: { name: 'Prado' },
      update: {},
      create: {
        id: generateVehicleId('Prado'),
        name: 'Prado',
        type: 'SUV',
        capacity: 7,
        pricePerKm: 100,
        description: 'Premium SUV with excellent off-road capability',
      },
    }),
    prisma.vehicle.upsert({
      where: { name: 'Grand Cabin Petrol' },
      update: {},
      create: {
        id: generateVehicleId('Grand Cabin Petrol'),
        name: 'Grand Cabin Petrol',
        type: 'Van',
        capacity: 8,
        pricePerKm: 65,
        description: 'Spacious van for larger groups, petrol engine',
      },
    }),
    prisma.vehicle.upsert({
      where: { name: 'Grand Cabin Diesel' },
      update: {},
      create: {
        id: generateVehicleId('Grand Cabin Diesel'),
        name: 'Grand Cabin Diesel',
        type: 'Van',
        capacity: 8,
        pricePerKm: 65,
        description: 'Spacious van for larger groups, diesel engine',
      },
    }),
    prisma.vehicle.upsert({
      where: { name: 'Coaster 4C' },
      update: {},
      create: {
        id: generateVehicleId('Coaster 4C'),
        name: 'Coaster 4C',
        type: 'Coach',
        capacity: 30,
        pricePerKm: 90,
        description: 'Coach for large group tours',
      },
    }),
    prisma.vehicle.upsert({
      where: { name: 'Coaster 5C' },
      update: {},
      create: {
        id: generateVehicleId('Coaster 5C'),
        name: 'Coaster 5C',
        type: 'Coach',
        capacity: 35,
        pricePerKm: 100,
        description: 'Larger coach for big group tours',
      },
    }),
    prisma.vehicle.upsert({
      where: { name: 'Toyota Fortuner' },
      update: {},
      create: {
        id: generateVehicleId('Toyota Fortuner'),
        name: 'Toyota Fortuner',
        type: 'SUV',
        capacity: 7,
        pricePerKm: 50,
        description: 'Spacious SUV perfect for family tours',
      },
    }),
    prisma.vehicle.upsert({
      where: { name: 'Jeep Grand Cherokee' },
      update: {},
      create: {
        id: generateVehicleId('Jeep Grand Cherokee'),
        name: 'Jeep Grand Cherokee',
        type: 'Jeep',
        capacity: 5,
        pricePerKm: 40,
        description: 'Rugged jeep for mountain adventures',
      },
    }),
  ]);
  console.log(`✅ Created ${vehicles.length} vehicles\n`);

  // ============== PRICING CONFIG ==============
  console.log('⚙️ Creating pricing config...');
  await prisma.pricingConfig.upsert({
    where: { id: 'pricing-config-default' },
    update: {
      transportBaseMultiplier: 1,
      peakMultiplier: 1.3,
      blossomMultiplier: 1.15,
      offMultiplier: 0.85,
      markupPercentage: 30,
      fuelSurchargePercentage: 0,
    },
    create: {
      id: 'pricing-config-default',
      transportBaseMultiplier: 1,
      peakMultiplier: 1.3,
      blossomMultiplier: 1.15,
      offMultiplier: 0.85,
      markupPercentage: 30,
      fuelSurchargePercentage: 0,
    },
  });
  console.log('✅ Pricing config ready\n');

  // ============== HOTELS & ROOMS ==============
  console.log('🏨 Creating hotels and rooms...');

  let hotelCount = 0, roomCount = 0;
  
  // Map city names for destination lookup
  const cityMap: { [key: string]: string } = {
    'Skardu': 'skardu',
    'Hunza': 'hunza-valley',
    'Swat': 'swat',
    'Kashmir': 'kashmir',
    'Khaplu': 'khaplu',
    'Shogran': 'shogran',
    'Islamabad': 'islamabad',
    'Nathia Gali': 'nathia-gali',
    'Naran': 'naran',
    'Chilas': 'chilas',
  };

  for (const hotelData of hotels) {
    const destSlug = cityMap[hotelData.city];
    const dest = destinations.find(d => d.slug === destSlug);
    if (!dest) continue;

    const hotelId = generateHotelId(hotelData.city, hotelData.name);
    const hotel = await prisma.hotel.upsert({
      where: { name: hotelData.name },
      update: {},
      create: { id: hotelId, name: hotelData.name, destinationId: dest.id, city: hotelData.city },
    });
    hotelCount++;

    for (const room of hotelData.rooms) {
      // Extract base price from various fields
      let basePrice = 0;
      if (room.price) basePrice = room.price;
      else if (room.peak) basePrice = room.peak;
      else if (room.low && !Array.isArray(room.low)) basePrice = room.low;
      else if (room.high && !Array.isArray(room.high)) basePrice = room.high;
      else if (room.double) basePrice = room.double;
      else if (room.triple) basePrice = room.triple;
      else if (room.quad) basePrice = room.quad;
      else if (Array.isArray(room.low)) basePrice = room.low[0] || 0;
      else if (Array.isArray(room.high)) basePrice = room.high[0] || 0;

      if (basePrice === 0) continue;

      const roomId = generateHotelRoomId(hotelId, room.name);
      const hotelRoom = await prisma.hotelRoom.upsert({
        where: { hotelId_roomType: { hotelId: hotel.id, roomType: room.name } },
        update: {},
        create: {
          id: roomId,
          hotelId: hotel.id,
          roomType: room.name,
          capacity: room.quad ? 4 : room.triple ? 3 : 2,
          basePricePerNight: basePrice,
        },
      });

      // Create seasonal prices
      await Promise.all([
        prisma.seasonalPrice.create({
          data: {
            id: generateSeasonalPriceId(roomId, 'peak'),
            roomId: hotelRoom.id,
            season: 'peak',
            startDate: new Date('2026-06-01'),
            endDate: new Date('2026-09-30'),
            pricePerNight: Math.floor(basePrice * 1.3),
          },
        }).catch(() => {}),
        prisma.seasonalPrice.create({
          data: {
            id: generateSeasonalPriceId(roomId, 'blossom'),
            roomId: hotelRoom.id,
            season: 'blossom',
            startDate: new Date('2026-03-01'),
            endDate: new Date('2026-05-31'),
            pricePerNight: Math.floor(basePrice * 1.15),
          },
        }).catch(() => {}),
        prisma.seasonalPrice.create({
          data: {
            id: generateSeasonalPriceId(roomId, 'off'),
            roomId: hotelRoom.id,
            season: 'off',
            startDate: new Date('2026-10-01'),
            endDate: new Date('2026-02-28'),
            pricePerNight: Math.floor(basePrice * 0.85),
          },
        }).catch(() => {}),
      ]);
      roomCount++;
    }
  }
  console.log(`✅ Created ${hotelCount} hotels with ${roomCount} rooms\n`);

  // ============== TOURS ==============
  console.log('🎫 Creating tours...');
  const tours = await Promise.all([
    prisma.tour.upsert({
      where: { slug: 'skardu-hunza-8days' },
      update: {},
      create: {
        id: generateTourId('skardu-hunza-8days'),
        name: 'Skardu & Hunza',
        slug: 'skardu-hunza-8days',
        description: '8-day adventure combining Skardu lakes and Hunza Valley',
        duration: 8,
        destinationId: destinations.find(d => d.slug === 'skardu')!.id,
        vehicleId: vehicles.find(v => v.name === 'Prado')!.id,
        basePricePerPerson: 85000,
        maxGroupSize: 7,
        minGroupSize: 2,
      },
    }),
    prisma.tour.upsert({
      where: { slug: 'hunza-naltar-6days' },
      update: {},
      create: {
        id: generateTourId('hunza-naltar-6days'),
        name: 'Hunza & Naltar',
        slug: 'hunza-naltar-6days',
        description: '6-day journey through Hunza Valley and Naltar Lakes',
        duration: 6,
        destinationId: destinations.find(d => d.slug === 'hunza-valley')!.id,
        vehicleId: vehicles.find(v => v.name === 'Honda BRV')!.id,
        basePricePerPerson: 65000,
        maxGroupSize: 5,
        minGroupSize: 2,
      },
    }),
    prisma.tour.upsert({
      where: { slug: 'swat-kalam-4days' },
      update: {},
      create: {
        id: generateTourId('swat-kalam-4days'),
        name: 'Swat Kalam Adventure',
        slug: 'swat-kalam-4days',
        description: '4-day tour of Swat Valley and Kalam',
        duration: 4,
        destinationId: destinations.find(d => d.slug === 'swat')!.id,
        vehicleId: vehicles.find(v => v.name === 'Honda BRV')!.id,
        basePricePerPerson: 35000,
        maxGroupSize: 5,
        minGroupSize: 2,
      },
    }),
  ]);
  console.log(`✅ Created ${tours.length} tours\n`);

  // ============== ROUTES ==============
  console.log('🛣️ Creating routes...');
  const routeRecords = await Promise.all(
    routes.map((route) =>
      prisma.route.upsert({
        where: { slug: route.slug },
        update: {},
        create: {
          id: route.id,
          name: route.name,
          slug: route.slug,
          duration: route.duration,
          city: route.city,
          vehicles: JSON.stringify(route.vehicles),
        },
      })
    )
  );
  console.log(`✅ Created ${routeRecords.length} routes\n`);

  // ============== TRANSPORT PRICING ==============
  console.log('🚗 Creating transport pricing per route & vehicle...');
  let transportPricingCount = 0;
  
  for (const route of routeRecords) {
    for (const vehicleRate of vehicleRates) {
      const vehicleId = generateVehicleId(vehicleRate.name);
      await prisma.transportPricing.upsert({
        where: {
          routeId_vehicleId: {
            routeId: route.id,
            vehicleId: vehicleId,
          },
        },
        update: {
          fuelPricePerLiter: 403,
          dailyRentalRate: vehicleRate.dailyRate,
          vehicleAverageConsumption: vehicleRate.consumption,
        },
        create: {
          routeId: route.id,
          vehicleId: vehicleId,
          fuelPricePerLiter: 403,
          dailyRentalRate: vehicleRate.dailyRate,
          vehicleAverageConsumption: vehicleRate.consumption,
        },
      });
      transportPricingCount++;
    }
  }
  console.log(`✅ Created ${transportPricingCount} transport pricing entries (${routeRecords.length} routes × ${vehicleRates.length} vehicles)\n`);

  console.log('✨ Comprehensive seeding completed!\n');
  console.log('📊 Summary:');
  console.log(`  ✅ ${destinations.length} Destinations`);
  console.log(`  ✅ ${vehicles.length} Vehicles`);
  console.log(`  ✅ ${hotelCount} Hotels with ${roomCount} Room Types`);
  console.log(`  ✅ ${tours.length} Tours`);
  console.log(`  ✅ ${routeRecords.length} Routes`);
  console.log(`  ✅ ${transportPricingCount} Transport Pricing entries (per route & vehicle)`);
  console.log('  ✅ Dynamic Seasonal Pricing (Peak +30%, Blossom +15%, Off -15%)\n');

}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
