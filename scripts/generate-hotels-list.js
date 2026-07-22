// Simple Node.js script to generate hotels list
const fs = require('fs');
const path = require('path');

// Read the hotels TypeScript file
const hotelsFilePath = path.join(__dirname, '../src/lib/data/hotels.ts');
const hotelsContent = fs.readFileSync(hotelsFilePath, 'utf-8');

// Extract just the data array using a regex
// This is fragile but works for this specific case
function parseHotelsData() {
  // Find the export const hotels array
  const arrayStart = hotelsContent.indexOf('export const hotels: Hotel[] = [');
  const arrayEnd = hotelsContent.lastIndexOf('];', hotelsContent.length);
  
  if (arrayStart === -1 || arrayEnd === -1) {
    console.error('Could not find hotels array in source file');
    process.exit(1);
  }

  const arrayContent = hotelsContent.substring(arrayStart + 34, arrayEnd + 1); // +34 to skip "export const hotels: Hotel[] = "
  
  // Evaluate the array - use Function instead of eval for safety
  try {
    const hotelsFn = new Function('return ' + arrayContent);
    return hotelsFn();
  } catch (err) {
    console.error('Error parsing hotels:', err.message);
    process.exit(1);
  }
}

const hotels = parseHotelsData();

function formatPrice(price) {
  if (!price) return 'N/A';
  return `PKR ${price.toLocaleString()}`;
}

function formatPriceRange(low, high) {
  if (low && high) {
    return `PKR ${low.toLocaleString()} - ${high.toLocaleString()}`;
  }
  if (low) return formatPrice(low);
  if (high) return formatPrice(high);
  return 'N/A';
}

function generateHotelsList() {
  // Group hotels by city
  const hotelsByCity = {};
  
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
          const lowPrice = Array.isArray(room.low) ? room.low[0] : room.low;
          const highPrice = Array.isArray(room.high) ? room.high[0] : room.high;
          output += `    Price Range: ${formatPriceRange(lowPrice, highPrice)}\n`;
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
const filePath = path.join(__dirname, '../HOTELS_WITH_ROOM_TYPES.txt');
fs.writeFileSync(filePath, hotelsList, 'utf-8');

console.log('✓ Hotel list generated successfully!');
console.log(`✓ File saved to: ${filePath}`);
console.log(`✓ Total lines: ${hotelsList.split('\n').length}`);
console.log(`✓ Total hotels: ${hotels.length}`);
