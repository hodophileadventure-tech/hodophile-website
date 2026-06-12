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
    "Raikot Bridge": 17,
  },
  "Raikot Bridge": {
    "Fairy Meadows": 17,
    Chilas: 90,
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

function getDirectDistance(fromCity: string, toCity: string): number | undefined {
  const from = normalizeCity(fromCity);
  const to = normalizeCity(toCity);
  if (from === to) return 0;
  return cityLegDistance[from]?.[to] ?? cityLegDistance[to]?.[from];
}

function getGraphNeighbors(city: string): Record<string, number> {
  const normalizedCity = normalizeCity(city);
  const neighbors: Record<string, number> = {};

  for (const [source, targets] of Object.entries(cityLegDistance)) {
    const normalizedSource = normalizeCity(source);
    for (const [target, distance] of Object.entries(targets)) {
      const normalizedTarget = normalizeCity(target);
      if (normalizedSource === normalizedCity) {
        neighbors[normalizedTarget] = Math.min(neighbors[normalizedTarget] ?? Infinity, distance);
      }
      if (normalizedTarget === normalizedCity) {
        neighbors[normalizedSource] = Math.min(neighbors[normalizedSource] ?? Infinity, distance);
      }
    }
  }

  return neighbors;
}

function findShortestRouteDistance(fromCity: string, toCity: string): number {
  const from = normalizeCity(fromCity);
  const to = normalizeCity(toCity);
  if (from === to) return 0;

  const direct = getDirectDistance(from, to);
  if (typeof direct === "number") return direct;

  const allCities = new Set<string>();
  for (const [source, targets] of Object.entries(cityLegDistance)) {
    allCities.add(normalizeCity(source));
    for (const target of Object.keys(targets)) {
      allCities.add(normalizeCity(target));
    }
  }

  const distances: Record<string, number> = {};
  const visited = new Set<string>();
  for (const city of allCities) {
    distances[city] = Infinity;
  }
  distances[from] = 0;

  while (visited.size < allCities.size) {
    let currentCity: string | undefined;
    let currentDistance = Infinity;

    for (const city of allCities) {
      if (!visited.has(city) && distances[city] < currentDistance) {
        currentDistance = distances[city];
        currentCity = city;
      }
    }

    if (!currentCity || currentDistance === Infinity) break;
    if (currentCity === to) break;

    visited.add(currentCity);
    const neighbors = getGraphNeighbors(currentCity);
    for (const [neighbor, weight] of Object.entries(neighbors)) {
      if (visited.has(neighbor)) continue;
      const newDistance = currentDistance + weight;
      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
      }
    }
  }

  const result = distances[to];
  if (result === Infinity) {
    throw new Error(`Missing route path: ${from} ↔ ${to}. Add this connection to ROUTE_GRAPH for deterministic pricing.`);
  }

  return result;
}

export function validateCustomItineraryRoute(cities: string[]): void {
  if (cities.length === 0) return;

  const cleanedCities = cities.map(normalizeCity);
  findShortestRouteDistance("Islamabad", cleanedCities[0]);

  for (let index = 1; index < cleanedCities.length; index += 1) {
    findShortestRouteDistance(cleanedCities[index - 1], cleanedCities[index]);
  }

  findShortestRouteDistance(cleanedCities[cleanedCities.length - 1], "Islamabad");
}

export function estimateCustomItineraryDistance(cities: string[]): number {
  if (cities.length === 0) return 0;

  const cleanedCities = cities.map(normalizeCity);
  let totalDistance = findShortestRouteDistance("Islamabad", cleanedCities[0]);

  for (let index = 1; index < cleanedCities.length; index += 1) {
    totalDistance += findShortestRouteDistance(cleanedCities[index - 1], cleanedCities[index]);
  }

  totalDistance += findShortestRouteDistance(cleanedCities[cleanedCities.length - 1], "Islamabad");
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
