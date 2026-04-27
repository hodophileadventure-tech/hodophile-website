export interface RouteDistance {
  routeId: string;
  distance: number; // round trip distance in km
  description: string;
}

// Distance data for each route (round trip from Islamabad)
// Note: These include multiple destinations and local sightseeing, not just highway distance
export const routeDistances: RouteDistance[] = [
  {
    routeId: "skardu-hunza-8days",
    distance: 2800, // Skardu, Hunza with local exploration
    description: "Islamabad to Skardu, Hunza and back with local travel",
  },
  {
    routeId: "hunza-naltar-6days",
    distance: 2400, // Hunza and Naltar area exploration
    description: "Islamabad to Hunza, Naltar area and back with local travel",
  },
  {
    routeId: "skardu-basho-6days",
    distance: 2500, // Skardu and Basho with exploration
    description: "Islamabad to Skardu, Basho and back with local travel",
  },
  {
    routeId: "swat-kalam-4days",
    distance: 1100, // Swat valley with exploration
    description: "Islamabad to Swat, Kalam and back with local travel",
  },
  {
    routeId: "kashmir-arangkel-5days",
    distance: 1800, // Kashmir valley, Arangkel and local exploration
    description: "Islamabad to Kashmir, Arangkel, Taobat and back",
  },
  {
    routeId: "naran-babusar-4days",
    distance: 1200, // Naran and Babusar pass exploration
    description: "Islamabad to Naran, Babusar and back with local travel",
  },
];

export function getRouteDistance(routeId: string): number | undefined {
  return routeDistances.find((rd) => rd.routeId === routeId)?.distance;
}
