#!/usr/bin/env python3
"""
Generate a comprehensive list of all hotels with room types and prices
from the hotels.ts data file.
"""

import json
import re
import sys
from pathlib import Path
from datetime import datetime

def format_price(price):
    """Format a price value as PKR."""
    if price is None:
        return 'N/A'
    return f"PKR {price:,}"

def format_price_range(low, high):
    """Format a price range."""
    if low and high:
        return f"PKR {low:,} - {high:,}"
    if low:
        return format_price(low)
    if high:
        return format_price(high)
    return 'N/A'

def extract_hotels_data():
    """Extract hotels data from TypeScript file."""
    hotels_file = Path(__file__).parent.parent / 'src' / 'lib' / 'data' / 'hotels.ts'
    
    with open(hotels_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the hotels array
    start = content.find('export const hotels: Hotel[] = [')
    end = content.find('];', start) + 2
    
    hotels_str = content[start + 33:end - 2]  # Extract just the array content
    
    # We need to evaluate this JavaScript. Since it's complex, let's parse it manually
    # Split by hotels (entries starting with {id:)
    hotel_blocks = re.findall(r'\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}(?:,|\s)', hotels_str)
    
    # For simpler approach, use Node.js to evaluate
    return None  # Fall back to Node.js

def generate_with_node():
    """Use Node.js to process the hotels."""
    import subprocess
    import os
    
    node_script = '''
    const fs = require('fs');
    const path = require('path');
    
    // Read and parse the hotels file
    const tsFile = path.join(__dirname, '../src/lib/data/hotels.ts');
    const content = fs.readFileSync(tsFile, 'utf-8');
    
    // Extract the array
    const start = content.indexOf('export const hotels: Hotel[] = [') + 33;
    const end = content.lastIndexOf('];');
    const arrayStr = content.substring(start, end + 1);
    
    // Parse as JavaScript
    const hotels = eval('(' + arrayStr + ')');
    
    // Now generate the output
    const formatPrice = (price) => {
        if (!price) return 'N/A';
        return `PKR ${price.toLocaleString()}`;
    };
    
    const formatPriceRange = (low, high) => {
        if (low && high) return `PKR ${low.toLocaleString()} - ${high.toLocaleString()}`;
        if (low) return formatPrice(low);
        if (high) return formatPrice(high);
        return 'N/A';
    };
    
    // Group by city
    const byCity = {};
    for (const hotel of hotels) {
        if (!byCity[hotel.city]) byCity[hotel.city] = [];
        byCity[hotel.city].push(hotel);
    }
    
    const cities = Object.keys(byCity).sort();
    let output = `HODOPHILE - HOTELS WITH ROOM TYPES AND PRICES
Generated: ${new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
${'='.repeat(80)}

`;
    
    for (const city of cities) {
        output += `
${'='.repeat(80)}
${city.toUpperCase()}
${'='.repeat(80)}

`;
        const cityHotels = byCity[city].sort((a, b) => a.name.localeCompare(b.name));
        
        for (const hotel of cityHotels) {
            output += `${hotel.name}
${'-'.repeat(hotel.name.length)}
`;
            
            if (hotel.seasons) {
                output += 'Seasons:\\n';
                for (const [key, val] of Object.entries(hotel.seasons)) {
                    if (val) output += `  • ${key}: ${val}\\n`;
                }
                output += '\\n';
            }
            
            output += 'Room Types:\\n';
            
            for (const room of hotel.rooms) {
                output += `\\n  ${room.name}\\n`;
                
                if (room.price !== undefined) {
                    output += `    Price: ${formatPrice(room.price)}\\n`;
                } else if (room.peak || room.blossom || room.off) {
                    output += '    Seasonal Prices:\\n';
                    if (room.peak) output += `      • Peak: ${formatPrice(room.peak)}\\n`;
                    if (room.blossom) output += `      • Blossom: ${formatPrice(room.blossom)}\\n`;
                    if (room.off) output += `      • Off-season: ${formatPrice(room.off)}\\n`;
                } else if (room.low || room.high) {
                    const low = Array.isArray(room.low) ? room.low[0] : room.low;
                    const high = Array.isArray(room.high) ? room.high[0] : room.high;
                    output += `    Price Range: ${formatPriceRange(low, high)}\\n`;
                } else if (room.double || room.triple || room.quad) {
                    output += '    Occupancy-Based Prices:\\n';
                    if (room.double) output += `      • Double: ${formatPrice(room.double)}\\n`;
                    if (room.triple) output += `      • Triple: ${formatPrice(room.triple)}\\n`;
                    if (room.quad) output += `      • Quad: ${formatPrice(room.quad)}\\n`;
                }
                
                if (room.extra_mattress) {
                    output += `    Extra Mattress: ${formatPrice(room.extra_mattress)}\\n`;
                }
            }
            output += '\\n';
        }
    }
    
    output += `
${'='.repeat(80)}
SUMMARY STATISTICS
${'='.repeat(80)}

Total Cities: ${cities.length}
Total Hotels: ${hotels.length}
Total Room Types: ${hotels.reduce((sum, h) => sum + h.rooms.length, 0)}

Cities:
`;
    
    for (const city of cities) {
        const count = byCity[city].length;
        output += `  • ${city}: ${count} hotel${count > 1 ? 's' : ''}\\n`;
    }
    
    const outFile = path.join(__dirname, '../HOTELS_WITH_ROOM_TYPES.txt');
    fs.writeFileSync(outFile, output, 'utf-8');
    
    console.log('✓ Hotel list generated successfully!');
    console.log(`✓ File saved to: ${outFile}`);
    console.log(`✓ Total hotels: ${hotels.length}`);
    '''
    
    script_path = Path(__file__).parent / 'temp-gen.js'
    with open(script_path, 'w') as f:
        f.write(node_script)
    
    os.system(f'node "{script_path}"')
    script_path.unlink()

if __name__ == '__main__':
    generate_with_node()
