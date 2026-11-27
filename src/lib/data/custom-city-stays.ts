export type ShogranStayLocation = "Balakot" | "Shogran";
export type KashmirStayLocation = "Keran" | "Neelum" | "Sharda" | "Arangkel" | "Taobat";
export type CustomCityHotelStay = {
  city: string;
  location: KashmirStayLocation;
  hotelId: string;
  roomId: string;
  nights: number;
};

const KASHMIR_STAY_LOCATIONS: readonly KashmirStayLocation[] = [
  "Keran",
  "Neelum",
  "Sharda",
  "Arangkel",
];

export function isTaobatAvailable(month: number): boolean {
  return month >= 6 && month <= 10;
}

export function getKashmirStayLocations(nightNumber: number, month: number): KashmirStayLocation[] {
  const locations = nightNumber === 1
    ? ["Keran", "Neelum"] as const
    : KASHMIR_STAY_LOCATIONS;
  return isTaobatAvailable(month) && nightNumber > 1
    ? [...locations, "Taobat"]
    : [...locations];
}

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
  "Malam Jabba": 1,
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
