export type MapCoordinate = [longitude: number, latitude: number];

export interface TransportLocation {
  name: string;
  coordinate: MapCoordinate;
}

const locations: Record<string, TransportLocation> = {
  "islamabad": { name: "Islamabad", coordinate: [73.0479, 33.6844] },
  "rawalpindi": { name: "Rawalpindi", coordinate: [73.0169, 33.5651] },
  "lahore": { name: "Lahore", coordinate: [74.3587, 31.5204] },
  "multan": { name: "Multan", coordinate: [71.5249, 30.1575] },
  "karachi": { name: "Karachi", coordinate: [67.0011, 24.8607] },
  "nathia gali": { name: "Nathia Gali", coordinate: [73.3861, 34.0725] },
  "swat": { name: "Swat", coordinate: [72.3601, 34.7717] },
  "shogran": { name: "Shogran", coordinate: [73.492, 34.629] },
  "naran": { name: "Naran", coordinate: [73.6501, 34.9092] },
  "kashmir": { name: "Kashmir", coordinate: [73.4712, 34.3704] },
  "muzaffarabad": { name: "Muzaffarabad", coordinate: [73.4711, 34.3704] },
  "fairy meadows": { name: "Fairy Meadows", coordinate: [74.5789292, 35.3872034] },
  "raikot bridge": { name: "Raikot Bridge", coordinate: [74.5919012, 35.49296] },
  "astore": { name: "Astore", coordinate: [74.856, 35.343] },
  "chilas": { name: "Chilas", coordinate: [74.096, 35.420] },
  "hunza": { name: "Hunza", coordinate: [74.65, 36.3167] },
  "karimabad": { name: "Karimabad", coordinate: [74.65, 36.3167] },
  "skardu": { name: "Skardu", coordinate: [75.6333, 35.2971] },
  "khaplu": { name: "Khaplu", coordinate: [76.337, 35.156] },
  "murree": { name: "Murree", coordinate: [73.3903, 33.907] },
  "naltar": { name: "Naltar", coordinate: [74.187, 36.19] },
  "naltar valley": { name: "Naltar Valley", coordinate: [74.187, 36.19] },
  "sharda": { name: "Sharda", coordinate: [74.18, 34.79] },
  "taobat": { name: "Taobat", coordinate: [74.34, 34.83] },
  "arangkel": { name: "Arang Kel", coordinate: [74.36, 34.81] },
  "arang kel": { name: "Arang Kel", coordinate: [74.36, 34.81] },
  "keran": { name: "Keran", coordinate: [73.91, 34.59] },
  "gilgit": { name: "Gilgit", coordinate: [74.308, 35.92] },
};

function normalizeLocationName(name: string): string {
  return name.trim().replace(/\s+\([^)]*\)$/, "").toLocaleLowerCase("en");
}

export function getTransportLocation(name: string): TransportLocation | undefined {
  return locations[normalizeLocationName(name)];
}

export function getCanonicalLocationName(name: string): string | undefined {
  return getTransportLocation(name)?.name;
}
