import fs from 'fs';
import path from 'path';

// Import with require fallback for CommonJS compatibility
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

let hotels: any = [];

try {
  const hotelsPath = path.join(__dirname, '../src/lib/data/hotels.ts');
  // For ts-node, we need to read and parse directly
  const content = fs.readFileSync(hotelsPath, 'utf-8');
  // Extract the hotels export using regex
  const exportMatch = content.match(/export const hotels: Hotel\[\] = \[([\s\S]*?)\];/);
  if (!exportMatch) {
    console.error('Could not parse hotels from file');
    process.exit(1);
  }
} catch (err) {
  console.error('Error loading hotels:', err);
  process.exit(1);
}

function formatPrice(price: number | undefined): string {
  if (!price) return 'N/A';
  return `PKR ${price.toLocaleString()}`;
}

function formatPriceRange(low: number | undefined, high: number | undefined): string {
  if (low && high) {
    return `PKR ${low.toLocaleString()} - ${high.toLocaleString()}`;
  }
  if (low) return formatPrice(low);
  if (high) return formatPrice(high);
  return 'N/A';
}

function generateHotelsList(): string {
  // Group hotels by city
  const hotelsByCity: Record<string, typeof hotels> = {};
  
  for (const hotel of hotels) {
    if (!hotelsByCity[hotel.city]) {
      hotelsByCity[hotel.city] = [];
    }
    hotelsByCity[hotel.city].push(hotel);
  }

  // Sort cities alphabetically
  const sortedCities = Object.keys(hotelsByCity).sort();

  let output = `HODOPHILE - HOTELS WITH ROOM TYPES AND PRICES
Generated: ${new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
})}
${'='.repeat(80)}\n\n`;

  for (const city of sortedCities) {
    output += `\n${'='.repeat(80)}\n`;
    output += `${city.toUpperCase()}\n`;
    output += `${'='.repeat(80)}\n\n`;

    const cityHotels = hotelsByCity[city].sort((a, b) => a.name.localeCompare(b.name));

    for (const hotel of cityHotels) {
      output += `${hotel.name}\n`;
      output += `-`.repeat(hotel.name.length) + '\n';

      // Add season information if available
      if (hotel.seasons) {
        output += 'Seasons:\n';
        for (const [seasonKey, seasonValue] of Object.entries(hotel.seasons)) {
          if (seasonValue) {
            output += `  • ${seasonKey}: ${seasonValue}\n`;
          }
        }
        output += '\n';
      }

      // Add room information
      output += 'Room Types:\n';
      
      for (const room of hotel.rooms) {
        output += `\n  ${room.name}\n`;
        
        // Determine price display
        if (room.price !== undefined) {
          output += `    Price: ${formatPrice(room.price)}\n`;
        } else if (room.peak !== undefined || room.blossom !== undefined || room.off !== undefined) {
          output += '    Seasonal Prices:\n';
          if (room.peak !== undefined) output += `      • Peak: ${formatPrice(room.peak)}\n`;
          if (room.blossom !== undefined) output += `      • Blossom: ${formatPrice(room.blossom)}\n`;
          if (room.off !== undefined) output += `      • Off-season: ${formatPrice(room.off)}\n`;
        } else if (room.low !== undefined || room.high !== undefined) {
          output += `    Price Range: ${formatPriceRange(
            Array.isArray(room.low) ? room.low[0] : room.low,
            Array.isArray(room.high) ? room.high[0] : room.high
          )}\n`;
        } else if (room.double !== undefined || room.triple !== undefined || room.quad !== undefined) {
          output += '    Occupancy-Based Prices:\n';
          if (room.double !== undefined) output += `      • Double: ${formatPrice(room.double)}\n`;
          if (room.triple !== undefined) output += `      • Triple: ${formatPrice(room.triple)}\n`;
          if (room.quad !== undefined) output += `      • Quad: ${formatPrice(room.quad)}\n`;
        }

        // Add extra services if available
        if (room.extra_mattress !== undefined) {
          output += `    Extra Mattress: ${formatPrice(room.extra_mattress)}\n`;
        }
      }

      output += '\n';
    }
  }

  output += `\n${'='.repeat(80)}\n`;
  output += `SUMMARY STATISTICS\n`;
  output += `${'='.repeat(80)}\n\n`;
  output += `Total Cities: ${sortedCities.length}\n`;
  output += `Total Hotels: ${hotels.length}\n`;
  
  let totalRooms = 0;
  for (const hotel of hotels) {
    totalRooms += hotel.rooms.length;
  }
  output += `Total Room Types: ${totalRooms}\n\n`;

  output += `Cities:\n`;
  for (const city of sortedCities) {
    const hotelCount = hotelsByCity[city].length;
    output += `  • ${city}: ${hotelCount} hotel${hotelCount > 1 ? 's' : ''}\n`;
  }

  return output;
}

// Generate the list
const hotelsList = generateHotelsList();

// Write to file
const filePath = path.join(process.cwd(), 'HOTELS_WITH_ROOM_TYPES.txt');
fs.writeFileSync(filePath, hotelsList, 'utf-8');

console.log('✓ Hotel list generated successfully!');
console.log(`✓ File saved to: ${filePath}`);
console.log(`✓ Total lines: ${hotelsList.split('\n').length}`);
