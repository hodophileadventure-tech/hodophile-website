const cityBaseDistanceFromIslamabad: Record<string, number> = {
  Islamabad: 0,
  Rawalpindi: 20,
  "Nathia Gali": 180,
  Swat: 700,
  Shogran: 520,
  Naran: 600,
  Kashmir: 650,
  Chilas: 1400,
  Hunza: 1800,
  Skardu: 2200,
  Khaplu: 2300,
};

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
    Khaplu: 520,
  },
  Kashmir: {
    "Nathia Gali": 180,
    Chilas: 820,
    Hunza: 920,
    Skardu: 1050,
    Khaplu: 1150,
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
  return city.trim();
}

function getLegDistance(fromCity: string, toCity: string): number {
  const from = normalizeCity(fromCity);
  const to = normalizeCity(toCity);

  if (from === to) return 0;

  return (
    cityLegDistance[from]?.[to] ??
    cityLegDistance[to]?.[from] ??
    Math.round(((cityBaseDistanceFromIslamabad[from] ?? 350) + (cityBaseDistanceFromIslamabad[to] ?? 350)) * 0.55)
  );
}

export function estimateCustomItineraryDistance(cities: string[]): number {
  if (cities.length === 0) return 0;

  const cleanedCities = cities.map(normalizeCity);
  let totalDistance = getLegDistance("Islamabad", cleanedCities[0]);

  for (let index = 1; index < cleanedCities.length; index += 1) {
    totalDistance += getLegDistance(cleanedCities[index - 1], cleanedCities[index]);
  }

  totalDistance += getLegDistance(cleanedCities[cleanedCities.length - 1], "Islamabad");
  return totalDistance;
}

export function estimateCustomVehicleDays(nightsByCity: Record<string, number>): number {
  const totalNights = Object.values(nightsByCity).reduce((sum, nights) => sum + Math.max(0, nights), 0);
  const cityCount = Object.keys(nightsByCity).length;
  return Math.max(1, totalNights + cityCount);
}
