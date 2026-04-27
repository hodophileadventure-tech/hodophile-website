export interface Room {
  name: string;
  price?: number;
  peak?: number;
  blossom?: number;
  off?: number;
  double?: number;
  triple?: number;
  quad?: number;
  low?: number | number[];
  high?: number | number[];
  extra_mattress?: number;
}

export interface Hotel {
  id: string;
  name: string;
  city: "Skardu" | "Hunza" | "Swat" | "Kashmir" | "Khaplu" | "Shogran";
  rooms: Room[];
  seasons?: {
    peak?: string;
    blossom?: string;
    off?: string;
    [key: string]: string | undefined;
  };
}

export const hotels: Hotel[] = [
  {
    id: "skardu-dera-lamsa",
    name: "Skardu Dera Lamsa",
    city: "Skardu",
    seasons: {
      peak: "June - September",
      blossom: "March - May",
      off: "August - February",
    },
    rooms: [
      {
        name: "Lamsa Executive Room",
        peak: 35000,
        blossom: 26999,
        off: 21850,
      },
      {
        name: "Dera Deluxe Room",
        peak: 30000,
        blossom: 22500,
        off: 19500,
      },
      {
        name: "Dera Family Suite",
        peak: 55000,
        blossom: 35999,
        off: 31999,
      },
      {
        name: "Heritage Villa",
        peak: 79900,
        blossom: 60999,
        off: 45999,
      },
    ],
  },
  {
    id: "hispar-hotel-skardu",
    name: "Hispar Hotel Skardu",
    city: "Skardu",
    rooms: [
      { name: "Standard", price: 12000 },
      { name: "Deluxe", price: 16000 },
      { name: "Deluxe Family", price: 16000 },
      { name: "Deluxe Plus", price: 18000 },
      { name: "Deluxe Family Plus", price: 18000 },
    ],
  },
  {
    id: "khoj-hotel-skardu",
    name: "Khoj Hotel Skardu",
    city: "Skardu",
    seasons: {
      peak: "May - September",
      off: "September - February",
    },
    rooms: [
      {
        name: "River Edge King Hammock Villa",
        peak: 52000,
        off: 42000,
      },
      {
        name: "River View Loft Villa",
        peak: 48000,
        off: 38000,
      },
      {
        name: "River View Family Villa",
        peak: 48000,
        off: 38000,
      },
      {
        name: "River Edge Loft Hammock Villa",
        peak: 57000,
        off: 47000,
      },
    ],
  },
  {
    id: "khar-hotel-skardu",
    name: "Khar Hotel Skardu",
    city: "Skardu",
    rooms: [
      {
        name: "Twin Master",
        peak: 35000,
        off: 35000,
      },
      {
        name: "Master",
        peak: 32500,
        off: 32500,
      },
    ],
  },
  {
    id: "ifq-premier-skardu",
    name: "IFQ Premier Skardu",
    city: "Skardu",
    rooms: [
      { name: "Standard", price: 20000 },
      { name: "Deluxe", price: 25000 },
    ],
  },
  {
    id: "qayam-hotels-skardu",
    name: "Qayam Hotels Skardu",
    city: "Skardu",
    rooms: [
      {
        name: "Deluxe",
        low: 16000,
        high: 27000,
      },
      {
        name: "Executive",
        low: 20000,
        high: 30000,
      },
      {
        name: "Fort Rooms",
        low: 21000,
        high: 34500,
      },
    ],
  },
  {
    id: "maple-resort-skardu",
    name: "Maple Resort Skardu",
    city: "Skardu",
    rooms: [
      {
        name: "Executive Hut",
        price: 24999,
      },
      {
        name: "Premium Chalet",
        price: 34999,
      },
      {
        name: "Deluxe Rooms",
        price: 26500, // average
      },
    ],
  },
  {
    id: "himmel-hotel-skardu",
    name: "Himmel Hotel Skardu",
    city: "Skardu",
    rooms: [
      { name: "Standard", price: 18000 },
      { name: "Deluxe", price: 22000 },
      { name: "Executive", price: 28000 },
      { name: "Presidential", price: 55000 },
    ],
  },
  {
    id: "shangrila-resort-skardu",
    name: "Shangrila Resort Skardu",
    city: "Skardu",
    rooms: [
      { name: "Mountain View Room", price: 18000 },
      { name: "Lake Side Junior Room", price: 35000 },
      { name: "Shangrila View Room", price: 40000 },
      { name: "Lake Side Room", price: 50000 },
      { name: "Lake Side Deluxe Room", price: 55000 },
      { name: "Family Room", price: 60000 },
      { name: "Executive Suite", price: 65000 },
      { name: "Swiss Cottage", price: 75000 },
      { name: "Swiss Villa", price: 110000 },
      { name: "2 Bedroom Suite", price: 125000 },
      { name: "3 Bedroom Suite", price: 155000 },
      { name: "Shangrila Chalet", price: 210000 },
    ],
  },
  {
    id: "gumaan-resort-skardu",
    name: "Gumaan Resort Skardu",
    city: "Skardu",
    seasons: {
      peak: "June - September",
      off: "September - December",
    },
    rooms: [
      { name: "Deluxe Hut", price: 26000 },
      { name: "Executive Hut", price: 30000 },
      { name: "Presidential Suite", price: 39000 },
      { name: "Family Suite", price: 45000 },
    ],
  },
  {
    id: "mulberry-hotel-hunza",
    name: "Mulberry Hotel Hunza",
    city: "Hunza",
    rooms: [
      { name: "Deluxe", price: 16500 },
      { name: "Executive", price: 19500 },
      { name: "Family Hut", price: 38500 },
    ],
  },
  {
    id: "hermes-hotel-hunza",
    name: "Hermes Hotel Hunza",
    city: "Hunza",
    rooms: [
      { name: "Standard", price: 8500 },
      { name: "Deluxe", price: 13500 },
    ],
  },
  {
    id: "offto-resort-hunza",
    name: "Offto Resort Hunza",
    city: "Hunza",
    seasons: {
      low: "Jan - May, Oct - Dec",
      high: "June - September",
    },
    rooms: [
      {
        name: "1 Chalet Bedroom",
        low: 22000,
        high: 27000,
      },
      {
        name: "2 Chalet Bedroom",
        low: 43000,
        high: 53000,
      },
      {
        name: "3 Chalet Villa",
        low: 81000,
        high: 86000,
        extra_mattress: 3000,
      },
      {
        name: "Orchard Hut 1 Bed",
        low: 19000,
        high: 23000,
      },
      {
        name: "Orchard Hut 2 Bed",
        low: 33000,
        high: 45000,
      },
    ],
  },
  {
    id: "farme-resort-hunza",
    name: "Farme Resort Hunza",
    city: "Hunza",
    rooms: [
      { name: "Standard Room (Double)", double: 12000 },
      { name: "Standard Room (Triple)", triple: 14000 },
      { name: "Deluxe Balcony Room (Double)", double: 20000 },
      { name: "Deluxe Balcony Room (Triple)", triple: 23000 },
      { name: "Deluxe Terrace Room (Double)", double: 25000 },
      { name: "Deluxe Terrace Room (Triple)", triple: 28000 },
      { name: "Panoramic Room (Double)", double: 30000 },
      { name: "Panoramic Room (Triple)", triple: 35000 },
      { name: "Junior Suite (Double)", double: 35000 },
      { name: "Junior Suite (Triple)", triple: 38000 },
      { name: "Junior Suite (Quad)", quad: 41000 },
      { name: "Penthouse Suite (Double)", double: 50000 },
      { name: "Penthouse Suite (Quad)", quad: 60000 },
      { name: "Presidential Suite (Double)", double: 55000 },
      { name: "Presidential Suite (Quad)", quad: 65000 },
    ],
  },
  {
    id: "qayam-hotels-hunza",
    name: "Qayam Hotels Hunza",
    city: "Hunza",
    rooms: [
      {
        name: "Standard (Double)",
        low: 8000,
        high: 9500,
      },
      {
        name: "Standard (Triple)",
        low: 10500,
        high: 11000,
      },
      {
        name: "Deluxe",
        low: 10500,
        high: 12500,
      },
      {
        name: "Executive (Double)",
        low: 12000,
        high: 14500,
      },
      {
        name: "Executive (Triple)",
        low: 15000,
        high: 16500,
      },
    ],
  },
  {
    id: "eagle-nest-swat",
    name: "Eagle Nest Swat",
    city: "Swat",
    rooms: [
      { name: "Standard", price: 5000 },
      { name: "Deluxe", price: 7000 },
    ],
  },
  {
    id: "blue-ocean-kalam",
    name: "Blue Ocean Kalam",
    city: "Swat",
    rooms: [
      { name: "Couple", price: 6000 },
      { name: "Standard", price: 7500 },
      { name: "Executive", price: 10500 },
      { name: "Suite", price: 18000 },
    ],
  },
  {
    id: "swat-palace-hotel",
    name: "Swat Palace Hotel",
    city: "Swat",
    rooms: [
      { name: "Deluxe Twin", price: 14500 },
      { name: "Executive King", price: 16500 },
      { name: "Presidential Suite", price: 30000 },
    ],
  },
  {
    id: "kuwait-continental-swat",
    name: "Kuwait Continental Swat",
    city: "Swat",
    rooms: [
      { name: "Budget Room", price: 5999 },
      { name: "Standard", price: 11999 },
      { name: "Deluxe", price: 13999 },
      { name: "Family Deluxe", price: 14999 },
      { name: "Presidential", price: 17999 },
    ],
  },
  {
    id: "bulj-al-swat",
    name: "Bulj Al Swat Hotel",
    city: "Swat",
    rooms: [
      { name: "Standard Room", price: 15500 },
      { name: "Deluxe Room", price: 22000 },
    ],
  },
  {
    id: "north-palace-khaplu",
    name: "North Palace Khaplu",
    city: "Khaplu",
    rooms: [
      { name: "Budget Suite", price: 5999 },
      { name: "Deluxe Suite", price: 15000 },
      { name: "Premium Suite", price: 29999 },
    ],
  },
  {
    id: "semari-resort-kashmir",
    name: "Semari Resort Kashmir",
    city: "Kashmir",
    rooms: [
      { name: "Camps", price: 15000 },
      { name: "Huts", price: 27000 },
      { name: "Cottages", price: 34000 },
    ],
  },
  {
    id: "spruce-resort-shogran",
    name: "Spruce Resort Shogran",
    city: "Shogran",
    rooms: [
      { name: "Standard", price: 13000 },
      { name: "Deluxe", price: 17000 },
      { name: "Luxury Suite", price: 52000 },
    ],
  },
  {
    id: "spruce-resort-khanian",
    name: "Spruce Resort Khanian",
    city: "Shogran",
    rooms: [
      { name: "Standard", price: 13500 },
      { name: "Luxury Family", price: 39500 },
      { name: "Presidential Suite", price: 65500 },
    ],
  },
];

export function getHotelsByCity(
  city: string
): Hotel[] {
  return hotels.filter((h) => h.city === city);
}

export function getHotelById(id: string): Hotel | undefined {
  return hotels.find((h) => h.id === id);
}
