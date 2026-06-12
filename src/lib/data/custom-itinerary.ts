const cityLegDistance: Record<string, Record<string, number>> = {
  Islamabad: {
    Rawalpindi: 20,
    "Nathia Gali": 90,
    Swat: 280,
    Shogran: 190,
    Naran: 230,
    Kashmir: 180,
    Chilas: 500,
    Hunza: 820,
    Skardu: 950,
    Khaplu: 1050,
  },
  Swat: {
    "Nathia Gali": 300,
    Shogran: 260,
    Naran: 340,
    Kashmir: 500,
    Chilas: 750,
    Hunza: 1020,
    Skardu: 1180,
    Khaplu: 1280,
  },
  Shogran: {
    "Nathia Gali": 200,
    Naran: 180,
    Kashmir: 260,
    Chilas: 650,
    Hunza: 920,
    Skardu: 1080,
    Khaplu: 1180,
  },
  Naran: {
    "Nathia Gali": 240,
    Kashmir: 220,
    Chilas: 280,
    Hunza: 360,
    Skardu: 420,
    "Fairy Meadows": 90,
    Astore: 500,
    Khaplu: 520,
  },
  Kashmir: {
    "Nathia Gali": 180,
    Chilas: 820,
    Hunza: 920,
    Skardu: 1050,
    Khaplu: 1150,
  },
  "Fairy Meadows": {
    Astore: 140,
    Naran: 90,
    Hunza: 360,
    Skardu: 420,
  },
  Astore: {
    "Fairy Meadows": 140,
    Hunza: 230,
    Skardu: 320,
    Naran: 500,
  },
  Chilas: {
    Hunza: 250,
    Skardu: 420,
    Khaplu: 520,
  },
  Hunza: {
    Skardu: 250,
    Khaplu: 350,
  },
  Skardu: {
    Khaplu: 120,
  },
};

function normalizeCity(city: string): string {
  // Normalize by trimming and removing any parenthetical suffixes like " (Arrival)" or " (Return)"
  // Also collapse known aliases (e.g., "Arangkel" -> "Arang Kel") if needed.
  let s = city.trim();
  // Remove parenthetical notes
  const parenIndex = s.indexOf("(");
  if (parenIndex !== -1) {
    s = s.slice(0, parenIndex).trim();
  }
  // Normalize common spacing variants
  return s;
}

function getEdgeDistance(fromCity: string, toCity: string): number {
  const from = normalizeCity(fromCity);
  const to = normalizeCity(toCity);

  if (from === to) return 0;

  const directDistance = cityLegDistance[from]?.[to] ?? cityLegDistance[to]?.[from];
  if (typeof directDistance !== "number") {
    throw new Error(`Missing route edge: ${from} ↔ ${to}. Add this connection to ROUTE_GRAPH for deterministic pricing.`);
  }

  return directDistance;
}

export function validateCustomItineraryRoute(cities: string[]): void {
  if (cities.length === 0) return;

  const cleanedCities = cities.map(normalizeCity);
  getEdgeDistance("Islamabad", cleanedCities[0]);

  for (let index = 1; index < cleanedCities.length; index += 1) {
    getEdgeDistance(cleanedCities[index - 1], cleanedCities[index]);
  }

  getEdgeDistance(cleanedCities[cleanedCities.length - 1], "Islamabad");
}

export function estimateCustomItineraryDistance(cities: string[]): number {
  if (cities.length === 0) return 0;

  validateCustomItineraryRoute(cities);

  const cleanedCities = cities.map(normalizeCity);
  let totalDistance = getEdgeDistance("Islamabad", cleanedCities[0]);

  for (let index = 1; index < cleanedCities.length; index += 1) {
    totalDistance += getEdgeDistance(cleanedCities[index - 1], cleanedCities[index]);
  }

  totalDistance += getEdgeDistance(cleanedCities[cleanedCities.length - 1], "Islamabad");
  return totalDistance;
}

export function estimateCustomVehicleDays(nightsByCity: Record<string, number>): number {
  const totalNights = Object.values(nightsByCity).reduce((sum, nights) => sum + Math.max(0, nights), 0);
  // Vehicle days should reflect the number of nights the vehicle is required.
  // Previously we added one day per city which inflated rental days for multi-city itineraries.
  // Use total nights as a closer approximation to vehicle usage days.
  return Math.max(1, totalNights);
}

export const ROUTE_GRAPH = cityLegDistance;
