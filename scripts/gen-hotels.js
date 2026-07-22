const fs = require('fs');
const path = require('path');

// Read the hotels TypeScript file
const hotelsFile = path.join(__dirname, '../src/lib/data/hotels.ts');
const content = fs.readFileSync(hotelsFile, 'utf-8');

// Extract the hotels array more carefully
const arrayStart = content.indexOf('export const hotels: Hotel[] = [') + 33;
const arrayEnd = content.indexOf('];', arrayStart);

if (arrayStart === -1 || arrayEnd === -1) {
  console.error('Could not find hotels array');
  process.exit(1);
}

const arrayContent = content.substring(arrayStart, arrayEnd + 1);

// Use Function to safely evaluate the array
let hotels;
try {
  const evalFn = new Function('return ' + arrayContent);
  hotels = evalFn();
  
  if (!Array.isArray(hotels)) {
    throw new Error('hotels is not an array');
  }
} catch (err) {
  console.error('Error parsing hotels:', err.message);
  process.exit(1);
}

console.log('Parsed ' + hotels.length + ' hotels');

function formatPrice(price) {
  if (!price) return 'N/A';
  return 'PKR ' + price.toLocaleString();
}

function formatPriceRange(low, high) {
  if (low && high) {
    return 'PKR ' + low.toLocaleString() + ' - ' + high.toLocaleString();
  }
  if (low) return formatPrice(low);
  if (high) return formatPrice(high);
  return 'N/A';
}

// Group by city
const byCity = {};
for (const hotel of hotels) {
  if (!byCity[hotel.city]) {
    byCity[hotel.city] = [];
  }
  byCity[hotel.city].push(hotel);
}

const cities = Object.keys(byCity).sort();

let output = 'HODOPHILE - HOTELS WITH ROOM TYPES AND PRICES\n';
output += 'Generated: ' + new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}) + '\n';
output += '='.repeat(80) + '\n\n';

for (const city of cities) {
  output += '\n' + '='.repeat(80) + '\n';
  output += city.toUpperCase() + '\n';
  output += '='.repeat(80) + '\n\n';
  
  const cityHotels = byCity[city].sort((a, b) => a.name.localeCompare(b.name));
  
  for (const hotel of cityHotels) {
    output += hotel.name + '\n';
    output += '-'.repeat(hotel.name.length) + '\n';
    
    if (hotel.seasons) {
      output += 'Seasons:\n';
      for (const [key, val] of Object.entries(hotel.seasons)) {
        if (val) {
          output += '  ' + String.fromCharCode(8226) + ' ' + key + ': ' + val + '\n';
        }
      }
      output += '\n';
    }
    
    output += 'Room Types:\n';
    
    for (const room of hotel.rooms) {
      output += '\n  ' + room.name + '\n';
      
      if (room.price !== undefined) {
        output += '    Price: ' + formatPrice(room.price) + '\n';
      } else if (room.peak !== undefined || room.blossom !== undefined || room.off !== undefined) {
        output += '    Seasonal Prices:\n';
        if (room.peak !== undefined) {
          output += '      ' + String.fromCharCode(8226) + ' Peak: ' + formatPrice(room.peak) + '\n';
        }
        if (room.blossom !== undefined) {
          output += '      ' + String.fromCharCode(8226) + ' Blossom: ' + formatPrice(room.blossom) + '\n';
        }
        if (room.off !== undefined) {
          output += '      ' + String.fromCharCode(8226) + ' Off-season: ' + formatPrice(room.off) + '\n';
        }
      } else if (room.low !== undefined || room.high !== undefined) {
        const low = Array.isArray(room.low) ? room.low[0] : room.low;
        const high = Array.isArray(room.high) ? room.high[0] : room.high;
        output += '    Price Range: ' + formatPriceRange(low, high) + '\n';
      } else if (room.double !== undefined || room.triple !== undefined || room.quad !== undefined) {
        output += '    Occupancy-Based Prices:\n';
        if (room.double !== undefined) {
          output += '      ' + String.fromCharCode(8226) + ' Double: ' + formatPrice(room.double) + '\n';
        }
        if (room.triple !== undefined) {
          output += '      ' + String.fromCharCode(8226) + ' Triple: ' + formatPrice(room.triple) + '\n';
        }
        if (room.quad !== undefined) {
          output += '      ' + String.fromCharCode(8226) + ' Quad: ' + formatPrice(room.quad) + '\n';
        }
      }
      
      if (room.extra_mattress !== undefined) {
        output += '    Extra Mattress: ' + formatPrice(room.extra_mattress) + '\n';
      }
    }
    output += '\n';
  }
}

output += '\n' + '='.repeat(80) + '\n';
output += 'SUMMARY STATISTICS\n';
output += '='.repeat(80) + '\n\n';
output += 'Total Cities: ' + cities.length + '\n';
output += 'Total Hotels: ' + hotels.length + '\n';

let totalRooms = 0;
for (const hotel of hotels) {
  totalRooms += hotel.rooms.length;
}
output += 'Total Room Types: ' + totalRooms + '\n\n';

output += 'Cities:\n';
for (const city of cities) {
  const count = byCity[city].length;
  output += '  ' + String.fromCharCode(8226) + ' ' + city + ': ' + count + ' hotel' + (count > 1 ? 's' : '') + '\n';
}

const outFile = path.join(__dirname, '../HOTELS_WITH_ROOM_TYPES.txt');
fs.writeFileSync(outFile, output, 'utf-8');

console.log('OK - Hotel list generated successfully!');
console.log('File: ' + outFile);
console.log('Lines: ' + output.split('\n').length);
