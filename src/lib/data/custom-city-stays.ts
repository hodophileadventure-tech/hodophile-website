export type ShogranStayLocation = "Balakot" | "Shogran";

export const CUSTOM_CITY_MINIMUM_NIGHTS: Readonly<Record<string, number>> = {
  Skardu: 3,
  Hunza: 2,
  Astore: 3,
  Kashmir: 2,
  Swat: 2,
  "Fairy Meadows": 2,
  Shogran: 0,
  "Nathia Gali": 0,
  Murree: 0,
  "Malam Jabba": 0,
};

export function getMinimumCustomCityNights(city: string): number {
  return CUSTOM_CITY_MINIMUM_NIGHTS[city] ?? 1;
}

export function getCitiesWithOvernightStays(
  cities: readonly string[],
  nightsByCity: Readonly<Record<string, number>>,
): string[] {
  return cities.filter((city) => (nightsByCity[city] ?? 0) > 0);
}

export function getCustomCityHotelLocation(
  city: string,
  selectedCities: readonly string[],
  shogranStayLocation?: ShogranStayLocation,
): string {
  if (city === "Malam Jabba") return "Swat";
  if (city !== "Shogran") return city;
  if (shogranStayLocation) return shogranStayLocation;
  return selectedCities.some((selectedCity) => selectedCity !== "Shogran") ? "Balakot" : "Shogran";
}

export function getHotelStayLabel(destinationCity: string, hotelCity: string): string {
  if (destinationCity === hotelCity) return destinationCity;
  if (destinationCity.startsWith(`${hotelCity} (`)) return hotelCity;
  return `${hotelCity} stay for ${destinationCity}`;
}
