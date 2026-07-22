import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listHotelsWithPrices() {
  try {
    const hotels = await prisma.hotel.findMany({
      include: {
        rooms: {
          include: {
            seasonalPrices: true,
          },
        },
      },
      orderBy: [
        { city: 'asc' },
        { name: 'asc' },
      ],
    });

    if (hotels.length === 0) {
      console.log('No hotels found in the database.');
      return;
    }

    let output = '';
    let currentCity = '';

    for (const hotel of hotels) {
      // Add city header if it changed
      if (hotel.city !== currentCity) {
        if (currentCity !== '') {
          output += '\n'; // Add spacing between cities
        }
        output += `\n=== ${hotel.city.toUpperCase()} ===\n\n`;
        currentCity = hotel.city;
      }

      output += `${hotel.name}\n`;
      output += `  Address: ${hotel.address || 'N/A'}\n`;
      output += `  Rating: ${hotel.rating ? hotel.rating + '/5' : 'N/A'}\n`;

      if (hotel.rooms.length === 0) {
        output += '  Rooms: No rooms listed\n';
      } else {
        output += '  Rooms:\n';
        for (const room of hotel.rooms) {
          output += `    - ${room.roomType} (Capacity: ${room.capacity})\n`;
          output += `      Base Price: PKR ${room.basePricePerNight}/night\n`;

          if (room.seasonalPrices.length > 0) {
            output += '      Seasonal Prices:\n';
            for (const sp of room.seasonalPrices) {
              const startDate = new Date(sp.startDate).toLocaleDateString();
              const endDate = new Date(sp.endDate).toLocaleDateString();
              output += `        - ${sp.season}: PKR ${sp.pricePerNight}/night (${startDate} - ${endDate})\n`;
            }
          }
        }
      }
      output += '\n';
    }

    console.log(output);
    
    // Write to file
    const fs = require('fs');
    fs.writeFileSync(
      'HOTELS_WITH_ROOM_TYPES.txt',
      output,
      'utf-8'
    );
    console.log('\n✓ List saved to HOTELS_WITH_ROOM_TYPES.txt');

  } catch (error) {
    console.error('Error fetching hotels:', error);
  } finally {
    await prisma.$disconnect();
  }
}

listHotelsWithPrices();
