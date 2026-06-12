export type NodeType = "TOURIST" | "TRANSIT";

export interface Node {
  name: string;
  type: NodeType;
}

export interface Edge {
  from: string;
  to: string;
  distanceKm: number;
}

export type AdjacencyGraph = Record<string, Record<string, number>>;

export const NODES: Node[] = [
  { name: "Islamabad", type: "TRANSIT" },
  { name: "Rawalpindi", type: "TRANSIT" },
  { name: "Nathia Gali", type: "TOURIST" },
  { name: "Swat", type: "TOURIST" },
  { name: "Shogran", type: "TOURIST" },
  { name: "Naran", type: "TOURIST" },
  { name: "Kashmir", type: "TOURIST" },
  { name: "Fairy Meadows", type: "TOURIST" },
  { name: "Astore", type: "TOURIST" },
  { name: "Chilas", type: "TRANSIT" },
  { name: "Raikot Bridge", type: "TRANSIT" },
  { name: "Hunza", type: "TOURIST" },
  { name: "Skardu", type: "TOURIST" },
  { name: "Khaplu", type: "TRANSIT" },
];

export const EDGES: Edge[] = [
  { from: "Islamabad", to: "Rawalpindi", distanceKm: 20 },
  { from: "Islamabad", to: "Nathia Gali", distanceKm: 90 },
  { from: "Islamabad", to: "Swat", distanceKm: 280 },
  { from: "Islamabad", to: "Shogran", distanceKm: 190 },
  { from: "Islamabad", to: "Naran", distanceKm: 230 },
  { from: "Islamabad", to: "Kashmir", distanceKm: 180 },
  { from: "Islamabad", to: "Chilas", distanceKm: 500 },
  { from: "Islamabad", to: "Hunza", distanceKm: 820 },
  { from: "Islamabad", to: "Skardu", distanceKm: 950 },
  { from: "Islamabad", to: "Khaplu", distanceKm: 1050 },

  { from: "Swat", to: "Nathia Gali", distanceKm: 300 },
  { from: "Swat", to: "Shogran", distanceKm: 260 },
  { from: "Swat", to: "Naran", distanceKm: 340 },
  { from: "Swat", to: "Kashmir", distanceKm: 500 },
  { from: "Swat", to: "Chilas", distanceKm: 750 },
  { from: "Swat", to: "Hunza", distanceKm: 1020 },
  { from: "Swat", to: "Skardu", distanceKm: 1180 },
  { from: "Swat", to: "Khaplu", distanceKm: 1280 },

  { from: "Shogran", to: "Nathia Gali", distanceKm: 200 },
  { from: "Shogran", to: "Naran", distanceKm: 180 },
  { from: "Shogran", to: "Kashmir", distanceKm: 260 },
  { from: "Shogran", to: "Chilas", distanceKm: 650 },
  { from: "Shogran", to: "Hunza", distanceKm: 920 },
  { from: "Shogran", to: "Skardu", distanceKm: 1080 },
  { from: "Shogran", to: "Khaplu", distanceKm: 1180 },

  { from: "Naran", to: "Nathia Gali", distanceKm: 240 },
  { from: "Naran", to: "Kashmir", distanceKm: 220 },
  { from: "Naran", to: "Chilas", distanceKm: 280 },
  { from: "Naran", to: "Hunza", distanceKm: 360 },
  { from: "Naran", to: "Skardu", distanceKm: 420 },
  { from: "Naran", to: "Fairy Meadows", distanceKm: 90 },
  { from: "Naran", to: "Astore", distanceKm: 500 },
  { from: "Naran", to: "Khaplu", distanceKm: 520 },

  { from: "Kashmir", to: "Nathia Gali", distanceKm: 180 },
  { from: "Kashmir", to: "Chilas", distanceKm: 820 },
  { from: "Kashmir", to: "Hunza", distanceKm: 920 },
  { from: "Kashmir", to: "Skardu", distanceKm: 1050 },
  { from: "Kashmir", to: "Khaplu", distanceKm: 1150 },

  { from: "Fairy Meadows", to: "Astore", distanceKm: 140 },
  { from: "Fairy Meadows", to: "Naran", distanceKm: 90 },
  { from: "Fairy Meadows", to: "Hunza", distanceKm: 360 },
  { from: "Fairy Meadows", to: "Skardu", distanceKm: 420 },
  { from: "Fairy Meadows", to: "Raikot Bridge", distanceKm: 17 },

  { from: "Raikot Bridge", to: "Chilas", distanceKm: 90 },

  { from: "Astore", to: "Hunza", distanceKm: 230 },
  { from: "Astore", to: "Skardu", distanceKm: 320 },

  { from: "Chilas", to: "Hunza", distanceKm: 250 },
  { from: "Chilas", to: "Skardu", distanceKm: 420 },
  { from: "Chilas", to: "Khaplu", distanceKm: 520 },

  { from: "Hunza", to: "Skardu", distanceKm: 250 },
  { from: "Hunza", to: "Khaplu", distanceKm: 350 },

  { from: "Skardu", to: "Khaplu", distanceKm: 120 },
];

export function buildGraph(edges: Edge[]): AdjacencyGraph {
  const graph: AdjacencyGraph = {};

  for (const edge of edges) {
    if (!graph[edge.from]) graph[edge.from] = {};
    if (!graph[edge.to]) graph[edge.to] = {};

    graph[edge.from][edge.to] = edge.distanceKm;
    graph[edge.to][edge.from] = edge.distanceKm;
  }

  return graph;
}

function normalizeCity(city: string): string {
  let s = city.trim();
  const parenIndex = s.indexOf("(");
  if (parenIndex !== -1) {
    s = s.slice(0, parenIndex).trim();
  }
  return s;
}

function findShortestPathDistance(
  fromCity: string,
  toCity: string,
  graph: AdjacencyGraph
): number {
  const from = normalizeCity(fromCity);
  const to = normalizeCity(toCity);
  if (from === to) return 0;

  if (!graph[from]) {
    throw new Error(`Unknown node in route graph: ${from}`);
  }
  if (!graph[to]) {
    throw new Error(`Unknown node in route graph: ${to}`);
  }

  const distances: Record<string, number> = {};
  const visited = new Set<string>();
  const nodes = Object.keys(graph);

  for (const node of nodes) {
    distances[node] = Infinity;
  }
  distances[from] = 0;

  while (visited.size < nodes.length) {
    let current: string | undefined;
    let currentDistance = Infinity;

    for (const node of nodes) {
      if (!visited.has(node) && distances[node] < currentDistance) {
        currentDistance = distances[node];
        current = node;
      }
    }

    if (!current || currentDistance === Infinity) break;
    if (current === to) break;

    visited.add(current);
    const neighbors = graph[current];
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
    throw new Error(`Missing route path: ${from} ↔ ${to}. Add a valid path to ROUTE_GRAPH for deterministic pricing.`);
  }

  return result;
}

export function getRouteDistance(route: string[], graph: AdjacencyGraph): number {
  if (route.length === 0) return 0;

  const cleanedRoute = route.map(normalizeCity);
  let totalDistance = 0;

  for (let index = 1; index < cleanedRoute.length; index += 1) {
    totalDistance += findShortestPathDistance(cleanedRoute[index - 1], cleanedRoute[index], graph);
  }

  return totalDistance;
}

export function validateRoute(route: string[], graph: AdjacencyGraph): string[] {
  const errors: string[] = [];
  const cleanedRoute = route.map(normalizeCity);

  for (let index = 1; index < cleanedRoute.length; index += 1) {
    try {
      findShortestPathDistance(cleanedRoute[index - 1], cleanedRoute[index], graph);
    } catch (error) {
      if (error instanceof Error) {
        errors.push(error.message);
      } else {
        errors.push(`Unknown route validation failure between ${cleanedRoute[index - 1]} and ${cleanedRoute[index]}`);
      }
    }
  }

  return errors;
}

export const ROUTE_GRAPH = buildGraph(EDGES);

export function estimateCustomItineraryDistance(cities: string[]): number {
  if (cities.length === 0) return 0;

  const cleanedCities = cities.map(normalizeCity);
  return getRouteDistance(["Islamabad", ...cleanedCities, "Islamabad"], ROUTE_GRAPH);
}

export function estimateCustomVehicleDays(nightsByCity: Record<string, number>): number {
  const totalNights = Object.values(nightsByCity).reduce((sum, nights) => sum + Math.max(0, nights), 0);
  return Math.max(1, totalNights);
}
