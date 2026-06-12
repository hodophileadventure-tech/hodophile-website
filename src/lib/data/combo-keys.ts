export const ON_ROUTE_COMBINATION_KEYS = new Set<string>([
  "Astore",
  "Fairy Meadows",
  "Hunza",
  "Naran",
  "Skardu",
  "Astore + Fairy Meadows",
  "Astore + Hunza",
  "Astore + Naran",
  "Astore + Skardu",
  "Fairy Meadows + Hunza",
  "Fairy Meadows + Naran",
  "Fairy Meadows + Skardu",
  "Hunza + Naran",
  "Hunza + Skardu",
  "Kashmir + Shogran",
  "Murree + Nathia Gali",
  "Naran + Shogran",
  "Murree + Shogran",
  "Murree + Swat",
  "Murree + Kashmir",
  "Nathia Gali + Shogran",
  "Nathia Gali + Swat",
  "Nathia Gali + Kashmir",
  "Shogran + Swat",
  "Shogran + Kashmir",
  "Swat + Kashmir",
  "Astore + Fairy Meadows + Hunza",
  "Astore + Fairy Meadows + Naran",
  "Astore + Fairy Meadows + Skardu",
  "Astore + Hunza + Naran",
  "Astore + Hunza + Skardu",
  "Astore + Naran + Skardu",
  "Fairy Meadows + Hunza + Naran",
  "Fairy Meadows + Hunza + Skardu",
  "Fairy Meadows + Naran + Skardu",
  "Hunza + Naran + Skardu",
  "Kashmir + Shogran + Murree",
  "Kashmir + Shogran + Swat",
  "Murree + Nathia Gali + Shogran",
  "Murree + Nathia Gali + Swat",
  "Murree + Nathia Gali + Kashmir",
  "Murree + Shogran + Swat",
  "Murree + Shogran + Kashmir",
  "Kalam + Malam Jabba + Swat",
  "Balakot + Kashmir + Kalam + Malam Jabba + Swat",
  "Murree + Swat + Kashmir",
  "Naran + Swat + Shogran",
  "Nathia Gali + Shogran + Swat",
  "Nathia Gali + Shogran + Kashmir",
  "Nathia Gali + Swat + Kashmir",
  "Shogran + Swat + Kashmir",
  "Astore + Fairy Meadows + Hunza + Naran",
  "Astore + Fairy Meadows + Hunza + Skardu",
  "Astore + Fairy Meadows + Naran + Skardu",
  "Astore + Hunza + Naran + Skardu",
  "Fairy Meadows + Hunza + Naran + Skardu",
  "Astore + Fairy Meadows + Hunza + Naran + Skardu",
  "Murree + Nathia Gali + Shogran + Swat",
  "Murree + Nathia Gali + Shogran + Kashmir",
  "Murree + Nathia Gali + Swat + Kashmir",
  "Murree + Shogran + Swat + Kashmir",
  "Nathia Gali + Shogran + Swat + Kashmir",
  "Naran + Swat + Shogran + Kashmir",
  "Murree + Nathia Gali + Shogran + Swat + Kashmir + Naran",
]);

export function normalizeComboKey(cities: string[]): string {
  return [...new Set(cities.map((city) => city.trim()).filter(Boolean))]
    .map((city) => city.replace(/\s+/g, " ").trim())
    .sort((a, b) => a.localeCompare(b))
    .join(" + ");
}

export function normalizeComboKeyFromString(key: string): string {
  return normalizeComboKey(key.split(" + "));
}

export function isValidCombination(selectedCities: string[]): boolean {
  if (!selectedCities || selectedCities.length === 0) return true;
  return ON_ROUTE_COMBINATION_KEYS.has(normalizeComboKey(selectedCities));
}
