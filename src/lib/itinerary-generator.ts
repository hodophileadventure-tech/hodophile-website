import { getHotelById } from "@/lib/data/hotels";
import { getJeepAddonById, packageJeepRideOptions } from "@/lib/data/jeeps";
import { itineraryAttractions, itineraryDestinationImages, type AttractionPeriod, type ItineraryAttraction } from "@/lib/data/itinerary-attractions";
import type { CustomCityHotelStay } from "@/lib/data/custom-city-stays";

export type ItineraryPace = "relaxed" | "balanced" | "adventure";
export type ItineraryTravelMode = "road" | "air";

export interface ItineraryRouteLeg {
  from: string;
  to: string;
  distanceKm: number;
  durationSeconds: number | null;
}

export interface ItineraryPresetDay {
  day: string;
  title: string;
  description: string;
}

export interface ItineraryHotelChoice {
  hotelId: string;
  roomId: string;
}

export interface ItineraryActivity {
  time: string;
  title: string;
  description: string;
  kind: "travel" | "sightseeing" | "meal" | "hotel" | "optional" | "leisure";
  attractionId?: string;
  distanceKm?: number;
  drivingMinutes?: number;
  visitMinutes?: number;
}

export interface ItineraryAttractionRouteLeg {
  fromAttractionId: string;
  toAttractionId: string;
  distanceKm: number;
  durationSeconds: number | null;
}

export interface ItineraryAttractionRouteGroup {
  city: string;
  attractionIds: string[];
}

export interface GeneratedItineraryDay {
  dayNumber: number;
  date: string;
  title: string;
  description: string;
  destination: string;
  image?: string;
  morning: ItineraryActivity[];
  afternoon: ItineraryActivity[];
  evening: ItineraryActivity[];
  overnight?: {
    location: string;
    hotelName?: string;
    roomName?: string;
    checkIn: string;
    checkOut: string;
  };
  notes: string[];
}

export interface GeneratedItinerary {
  title: string;
  travelMode: ItineraryTravelMode;
  pace: ItineraryPace;
  durationDays: number;
  durationNights: number;
  travelerCount?: number;
  vehicleName?: string;
  hotelCategory?: string;
  specialOccasion?: string;
  selectedDestinations: string[];
  usesOpenStreetMap: boolean;
  notes: string[];
  days: GeneratedItineraryDay[];
}

export interface ItineraryGeneratorInput {
  selectedCities: string[];
  nightsByCity: Record<string, number>;
  title?: string;
  routeSequence?: string[];
  tripDate: string;
  startingPoint: string;
  travelMode: ItineraryTravelMode;
  pace: ItineraryPace;
  hotelCategory?: string;
  vehicleName?: string;
  specialOccasion?: string;
  durationDays?: number;
  hotelId?: string;
  roomId?: string;
  multiCityHotels?: Record<string, ItineraryHotelChoice>;
  singleCityHotelStays?: Array<{ hotelId: string; roomId: string; nights: number }>;
  customCityHotelStays?: CustomCityHotelStay[];
  routeLegs?: ItineraryRouteLeg[];
  attractionRouteLegs?: ItineraryAttractionRouteLeg[];
  presetDays?: ItineraryPresetDay[];
  packageItinerary?: string;
  jeepRideNames?: string[];
  jeepAddonIds?: string[];
  travelerCount?: number;
}

const DAY_START_MINUTES = 8 * 60;
const SIGHTSEEING_DAY_START_MINUTES = 9 * 60;
const SIGHTSEEING_DAY_END_MINUTES = 20 * 60;
const PACE_VISIT_BUDGET_MINUTES: Record<ItineraryPace, number> = {
  relaxed: 240,
  balanced: 360,
  adventure: 420,
};
const PERIOD_START: Record<AttractionPeriod, number> = {
  morning: 9 * 60,
  afternoon: 13 * 60 + 30,
  evening: 18 * 60,
};
const PERIOD_END: Record<AttractionPeriod, number> = {
  morning: 12 * 60,
  afternoon: 17 * 60,
  evening: 20 * 60,
};

function normalizeCity(city: string): string {
  return city.trim().replace(/\s+\([^)]*\)$/, "").toLocaleLowerCase("en");
}

function formatClock(totalMinutes: number): string {
  const normalized = ((totalMinutes % (24 * 60)) + 24 * 60) % (24 * 60);
  const hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  const suffix = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 || 12;
  return `${displayHour}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

function getDayDate(tripDate: string, dayNumber: number): string {
  if (!tripDate) return "";
  const date = new Date(`${tripDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  date.setDate(date.getDate() + dayNumber - 1);
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function getPeriod(minutes: number): AttractionPeriod {
  if (minutes < 12 * 60) return "morning";
  if (minutes < 17 * 60) return "afternoon";
  return "evening";
}

function getTripMonth(tripDate: string): number {
  const month = Number(tripDate.slice(5, 7));
  return Number.isInteger(month) && month >= 1 && month <= 12 ? month : 5;
}

function getPackagePresetDays(
  input: ItineraryGeneratorInput,
  durationDays: number,
): Map<number, ItineraryPresetDay> {
  const days = new Map<number, ItineraryPresetDay>();
  const description = input.packageItinerary ?? "";
  for (const segment of description.split(/\s*\|\s*|\r?\n/)) {
    const match = /^Days?\s+(\d+)(?:\s*[-–]\s*(\d+))?\s*:\s*(.+)$/i.exec(segment.trim());
    if (!match) continue;
    const firstDay = Number(match[1]);
    const lastDay = Number(match[2] ?? match[1]);
    const details = match[3].trim().replace(/\s+/g, " ");
    for (let dayNumber = firstDay; dayNumber <= Math.min(lastDay, durationDays); dayNumber += 1) {
      days.set(dayNumber, {
        day: `Day ${dayNumber}`,
        title: details,
        description: `Selected package schedule: ${details}. Confirm exact timings and overnight arrangements with the operator.`,
      });
    }
  }
  (input.presetDays ?? []).forEach((day, index) => {
    const match = /\d+/.exec(day.day);
    days.set(match ? Number(match[0]) : index + 1, day);
  });
  return days;
}

function isAttractionAvailable(attraction: ItineraryAttraction, month: number): boolean {
  return !attraction.availableMonths || attraction.availableMonths.includes(month);
}

function getAttractionsForCity(city: string): ItineraryAttraction[] {
  const normalizedCity = normalizeCity(city);
  if (normalizedCity === "malam jabba") {
    return itineraryAttractions.filter((attraction) => attraction.id === "swat-malam-jabba");
  }
  if (normalizedCity === "kashmir") {
    return itineraryAttractions.filter((attraction) =>
      ["keran", "neelum", "sharda", "arangkel", "taobat", "kashmir"].includes(normalizeCity(attraction.city)),
    );
  }
  return itineraryAttractions.filter((attraction) => normalizeCity(attraction.city) === normalizedCity);
}

function getScheduledAttractions(
  city: string,
  input: ItineraryGeneratorInput,
  month: number,
  selectedRides: string[],
): ItineraryAttraction[] {
  const attractions = getAttractionsForCity(city).filter((attraction) =>
    isAttractionAvailable(attraction, month) &&
    (!attraction.requiresJeep || Boolean(getSelectedJeepForCity(selectedRides, city))),
  );
  const basho = attractions.find((attraction) => attraction.id === "skardu-basho");
  const deosai = attractions.find((attraction) => attraction.id === "skardu-deosai");
  if (!basho || !deosai) return attractions;

  const nights = input.nightsByCity[city] ?? 0;
  const preferredExcursion = nights >= 3 && input.pace !== "relaxed" ? deosai : basho;
  return attractions.filter((attraction) =>
    attraction.id !== "skardu-basho" && attraction.id !== "skardu-deosai" ||
    attraction.id === preferredExcursion.id,
  );
}

export function getItineraryAttractionRouteGroups(
  input: ItineraryGeneratorInput,
): ItineraryAttractionRouteGroup[] {
  const month = getTripMonth(input.tripDate);
  const selectedRides = selectedJeepNames(input);
  const groups = new Map<string, ItineraryAttraction[]>();
  for (const city of input.selectedCities) {
    const attractions = getScheduledAttractions(city, input, month, selectedRides);
    if (normalizeCity(city) === "kashmir") {
      const selectedAreas = new Set((input.customCityHotelStays ?? []).map((stay) => normalizeCity(stay.location)));
      for (const attraction of attractions) {
        const area = normalizeCity(attraction.city);
        if (attraction.coordinate && attraction.routeMode !== "walking" &&
            (selectedAreas.has(area) || area === "kashmir")) {
          groups.set(area, [...(groups.get(area) ?? []), attraction]);
        }
      }
      continue;
    }

    const routable = attractions.filter((attraction) =>
      attraction.coordinate && attraction.routeMode !== "walking",
    );
    if (routable.length > 0) groups.set(normalizeCity(city), routable);
  }

  return [...groups.entries()]
    .map(([city, attractions]) => ({
      city,
      attractionIds: attractions.map((attraction) => attraction.id),
    }))
    .filter((group) => group.attractionIds.length > 1);
}

function getStayArea(city: string, input: ItineraryGeneratorInput, stayIndex: number): string {
  if (normalizeCity(city) !== "kashmir") return city;
  return input.customCityHotelStays?.[stayIndex]?.location ?? city;
}

function getCityImage(city: string): string | undefined {
  const normalized = normalizeCity(city);
  const match = Object.entries(itineraryDestinationImages).find(([name]) => normalizeCity(name) === normalized);
  if (match) return match[1];
  if (["keran", "neelum", "sharda", "arangkel", "taobat"].includes(normalized)) {
    return itineraryDestinationImages.Kashmir;
  }
  return undefined;
}

function getRouteLeg(
  routeLegs: ItineraryRouteLeg[],
  from: string,
  to: string,
): ItineraryRouteLeg | undefined {
  const fromName = normalizeCity(from);
  const toName = normalizeCity(to);
  return routeLegs.find((leg) =>
    normalizeCity(leg.from) === fromName && normalizeCity(leg.to) === toName,
  );
}

function getScheduleSlot(day: GeneratedItineraryDay, period: AttractionPeriod): ItineraryActivity[] {
  return day[period];
}

function createActivity(
  time: string,
  title: string,
  description: string,
  kind: ItineraryActivity["kind"],
  extra: Partial<Pick<ItineraryActivity, "distanceKm" | "drivingMinutes" | "visitMinutes">> = {},
): ItineraryActivity {
  return { time, title, description, kind, ...extra };
}

function getHotelDetails(hotelId: string, roomId: string): { hotelName?: string; roomName?: string } {
  const hotel = getHotelById(hotelId);
  return {
    hotelName: hotel?.name,
    roomName: hotel?.rooms.find((room) => room.name === roomId)?.name ?? (roomId || undefined),
  };
}

function getNightHotel(
  input: ItineraryGeneratorInput,
  city: string,
  cityNight: number,
  singleCityNight: number,
  kashmirNight: number,
): { hotelId: string; roomId: string; location?: string } {
  const isKashmir = normalizeCity(city) === "kashmir";
  const kashmirStays = input.customCityHotelStays ?? [];
  if (isKashmir && kashmirStays[kashmirNight - 1]) {
    const stay = kashmirStays[kashmirNight - 1];
    return { hotelId: stay.hotelId, roomId: stay.roomId, location: stay.location };
  }

  const splitStay = input.singleCityHotelStays ?? [];
  let nightsBefore = 0;
  for (const stay of splitStay) {
    nightsBefore += Math.max(0, stay.nights);
    if (singleCityNight <= nightsBefore) return { hotelId: stay.hotelId, roomId: stay.roomId };
  }

  const citySelection = input.multiCityHotels?.[city] ??
    Object.entries(input.multiCityHotels ?? {}).find(([name]) => normalizeCity(name) === normalizeCity(city))?.[1];
  if (citySelection) return citySelection;
  return { hotelId: input.hotelId ?? "", roomId: input.roomId ?? "" };
}

function selectedJeepNames(input: ItineraryGeneratorInput): string[] {
  const byId = (input.jeepAddonIds ?? [])
    .map((id) => getJeepAddonById(id)?.name)
    .filter((name): name is string => Boolean(name));
  const packageRides = (input.jeepRideNames ?? []);
  return [...new Set([...byId, ...packageRides])];
}

function getSelectedJeepForCity(names: string[], city: string): string | undefined {
  const normalizedCity = normalizeCity(city);
  const matchingPackageRide = packageJeepRideOptions.find((ride) =>
    (normalizeCity(ride.city) === normalizedCity ||
      (normalizeCity(ride.city) === "kashmir" && ["keran", "neelum", "sharda", "arangkel", "taobat"].includes(normalizedCity))) &&
    names.includes(ride.name),
  );
  if (matchingPackageRide) return matchingPackageRide.name;
  return names.find((name) => {
    const lowerName = name.toLocaleLowerCase("en");
    return lowerName.includes(normalizedCity) ||
      (normalizedCity === "kashmir" && (lowerName.includes("ratti gali") || lowerName.includes("taobat"))) ||
      (normalizedCity === "swat" && lowerName.includes("kalam")) ||
      (normalizedCity === "shogran" && lowerName.includes("shogran"));
  });
}

function newDay(dayNumber: number, input: ItineraryGeneratorInput, destination: string): GeneratedItineraryDay {
  return {
    dayNumber,
    date: getDayDate(input.tripDate, dayNumber),
    title: destination ? `Day ${dayNumber} · ${destination}` : `Day ${dayNumber} · Travel`,
    description: "",
    destination,
    image: getCityImage(destination),
    morning: [],
    afternoon: [],
    evening: [],
    notes: [],
  };
}

function addTravelLeg(
  day: GeneratedItineraryDay,
  input: ItineraryGeneratorInput,
  from: string,
  to: string,
  nextDepartureMinutes: number,
): number {
  if (normalizeCity(from) === normalizeCity(to)) return nextDepartureMinutes;
  const leg = getRouteLeg(input.routeLegs ?? [], from, to);
  const durationMinutes = leg?.durationSeconds === null || leg?.durationSeconds === undefined
    ? undefined
    : Math.ceil(leg.durationSeconds / 60);
  const arrivalMinutes = durationMinutes === undefined
    ? undefined
    : nextDepartureMinutes + durationMinutes;
  const time = arrivalMinutes === undefined
    ? `Suggested ${formatClock(nextDepartureMinutes)} departure`
    : `${formatClock(nextDepartureMinutes)}–${formatClock(arrivalMinutes)}`;
  const description = [
    durationMinutes === undefined
      ? "Driving-time estimate is unavailable; confirm timing with the local operator."
      : `Estimated driving time: about ${Math.floor(durationMinutes / 60)} hr ${durationMinutes % 60} min.`,
    leg ? `Route distance: about ${Math.round(leg.distanceKm)} km.` : "Route distance is not available for this leg.",
    "Road conditions, weather, traffic, and stops can change actual travel times.",
  ].join(" ");
  const period = getPeriod(nextDepartureMinutes);
  getScheduleSlot(day, period).push(createActivity(time, `Travel: ${from} to ${to}`, description, "travel", {
    distanceKm: leg?.distanceKm,
    drivingMinutes: durationMinutes,
  }));
  return arrivalMinutes === undefined ? nextDepartureMinutes + 90 : arrivalMinutes + 30;
}

function addAttraction(
  day: GeneratedItineraryDay,
  attraction: ItineraryAttraction,
  period: AttractionPeriod,
  time: string,
): void {
  const details = [
    attraction.description,
    `Suggested visit: about ${attraction.recommendedVisitMinutes} minutes.`,
    attraction.accessNote,
  ].filter(Boolean).join(" ");
  getScheduleSlot(day, period).push({
    ...createActivity(
    time,
    attraction.name,
    details,
    "sightseeing",
    { visitMinutes: attraction.recommendedVisitMinutes },
    ),
    attractionId: attraction.id,
  });
  if (attraction.seasonalNote) day.notes.push(attraction.seasonalNote);
}

function getAttractionRouteLeg(
  routeLegs: ItineraryAttractionRouteLeg[],
  fromAttractionId: string,
  toAttractionId: string,
): ItineraryAttractionRouteLeg | undefined {
  return routeLegs.find((leg) =>
    leg.fromAttractionId === fromAttractionId && leg.toAttractionId === toAttractionId,
  );
}

function getAttractionStartTime(
  currentMinutes: number,
  period: AttractionPeriod,
  visitMinutes: number,
  availableUntil: number,
): number | undefined {
  const periods: AttractionPeriod[] = ["morning", "afternoon", "evening"];
  const preferredPeriodIndex = periods.indexOf(period);
  for (const candidatePeriod of periods.slice(preferredPeriodIndex)) {
    const start = Math.max(currentMinutes, PERIOD_START[candidatePeriod]);
    if (start + visitMinutes <= Math.min(PERIOD_END[candidatePeriod], availableUntil)) {
      return start;
    }
  }
  return undefined;
}

function addLocalDayActivities(
  day: GeneratedItineraryDay,
  city: string,
  input: ItineraryGeneratorInput,
  month: number,
  attractionIndexByCity: Map<string, number>,
  scheduledIds: Set<string>,
  includeJeepRide: boolean,
  selectedRides: string[],
  availableFrom = SIGHTSEEING_DAY_START_MINUTES,
  availableUntil = SIGHTSEEING_DAY_END_MINUTES,
): void {
  const candidates = getScheduledAttractions(city, input, month, selectedRides);
  const normalizedCity = normalizeCity(city);
  let cursor = attractionIndexByCity.get(normalizedCity) ?? 0;
  let currentMinutes = Math.max(availableFrom, SIGHTSEEING_DAY_START_MINUTES);
  let totalMinutes = 0;
  let previousAttraction: ItineraryAttraction | undefined;
  while (cursor < candidates.length) {
    const attraction = candidates[cursor];
    if (scheduledIds.has(attraction.id)) {
      cursor += 1;
      continue;
    }

    const routeLeg = previousAttraction
      ? getAttractionRouteLeg(input.attractionRouteLegs ?? [], previousAttraction.id, attraction.id)
      : undefined;
    let transferMinutes = 0;
    if (previousAttraction && !routeLeg) {
      day.notes.push("Driving time between these sightseeing stops is unavailable; confirm local travel timing before departure.");
      break;
    }
    if (routeLeg) {
      if (routeLeg.durationSeconds === null) {
        day.notes.push("Driving time between these sightseeing stops is unavailable; confirm local travel timing before departure.");
        break;
      }
      transferMinutes = Math.ceil(routeLeg.durationSeconds / 60);
    }

    const startMinutes = getAttractionStartTime(
      currentMinutes + transferMinutes,
      attraction.bestTime,
      attraction.recommendedVisitMinutes,
      availableUntil,
    );
    if (
      startMinutes === undefined ||
      totalMinutes + transferMinutes + attraction.recommendedVisitMinutes > PACE_VISIT_BUDGET_MINUTES[input.pace]
    ) {
      break;
    }

    if (routeLeg && previousAttraction && transferMinutes > 0) {
      const travelPeriod = getPeriod(currentMinutes);
      getScheduleSlot(day, travelPeriod).push(createActivity(
        `${formatClock(currentMinutes)}–${formatClock(currentMinutes + transferMinutes)}`,
        `Travel: ${previousAttraction.name} to ${attraction.name}`,
        "OpenRouteService driving estimate between mapped attraction locations. Actual traffic and access conditions can change the journey.",
        "travel",
        { distanceKm: routeLeg.distanceKm, drivingMinutes: transferMinutes },
      ));
    }

    scheduledIds.add(attraction.id);
    addAttraction(day, attraction, getPeriod(startMinutes), `Suggested ${formatClock(startMinutes)}`);
    totalMinutes += transferMinutes + attraction.recommendedVisitMinutes;
    currentMinutes = startMinutes + attraction.recommendedVisitMinutes;
    previousAttraction = attraction;
    cursor += 1;
  }
  attractionIndexByCity.set(normalizedCity, cursor);

  if (previousAttraction === undefined) {
    day.afternoon.push(createActivity("Flexible", "Leisure time", "Keep this time flexible for rest, local conditions, or activities arranged with your guide.", "leisure"));
  }
  if (includeJeepRide) {
    const jeepRide = getSelectedJeepForCity(selectedRides, city);
    if (jeepRide) {
      day.afternoon.push(createActivity(
        "As arranged",
        jeepRide,
        "Selected optional jeep experience. Confirm operating conditions and the final pickup time locally.",
        "optional",
      ));
    }
  }
}

function assignOvernight(
  day: GeneratedItineraryDay,
  input: ItineraryGeneratorInput,
  city: string,
  cityNight: number,
  singleCityNight: number,
  kashmirNight: number,
  lastNight: boolean,
): void {
  const stay = getNightHotel(input, city, cityNight, singleCityNight, kashmirNight);
  const hotel = getHotelDetails(stay.hotelId, stay.roomId);
  const location = stay.location ?? city;
  day.overnight = {
    location,
    hotelName: hotel.hotelName,
    roomName: hotel.roomName,
    checkIn: "Suggested check-in after 2:00 PM; confirm the selected hotel's policy.",
    checkOut: lastNight
      ? "Check out by 12:00 PM on the following day; confirm the selected hotel's policy."
      : "If changing hotels the next day, check out by 12:00 PM; confirm the selected hotel's policy.",
  };
  day.evening.push(createActivity(
    "After arrival",
    hotel.hotelName ? `Check in at ${hotel.hotelName}` : `Overnight in ${location}`,
    hotel.roomName ? `Selected room: ${hotel.roomName}.` : "Accommodation details should be confirmed before travel.",
    "hotel",
  ));
}

function addMealBreaks(day: GeneratedItineraryDay, hasTravel: boolean): void {
  if (day.morning.length === 0) {
    day.morning.push(createActivity("08:00", "Breakfast and get ready", "Suggested start to the day; confirm the timing with your hotel or guide.", "meal"));
  } else {
    day.morning.unshift(createActivity("Before departure", "Breakfast", "Meal timing and venue to be confirmed with your hotel or guide.", "meal"));
  }
  if (day.afternoon.length === 0 || hasTravel) {
    day.afternoon.push(createActivity(
      hasTravel ? "Along the route" : "13:00",
      "Lunch and refreshment break",
      "Suggested break; restaurant and timing depend on the day's route.",
      "meal",
    ));
  }
  if (day.overnight && day.evening.every((activity) => activity.kind !== "meal")) {
    day.evening.push(createActivity("19:00", "Dinner and rest", "Meal arrangements depend on the selected package and hotel.", "meal"));
  }
}

export function generateItinerary(input: ItineraryGeneratorInput): GeneratedItinerary {
  const selectedCities = input.selectedCities.filter((city) => city.trim().length > 0);
  const normalizedNights = selectedCities.map((city) => ({
    city,
    nights: Number.isInteger(input.nightsByCity[city]) ? Math.max(0, input.nightsByCity[city]) : 0,
  }));
  const durationNights = normalizedNights.reduce((total, stay) => total + stay.nights, 0);
  const durationDays = Math.max(1, input.durationDays ?? durationNights + 1);
  const presetDays = getPackagePresetDays(input, durationDays);
  const days = Array.from({ length: durationDays }, (_, index) =>
    newDay(index + 1, input, ""),
  );
  const notes = [
    "Itinerary timings are suggestions. Confirm schedules, local access, weather, and road conditions before departure.",
    "Driving distances and durations are shown only when the existing route service provides them; actual conditions may differ.",
  ];
  if (input.travelMode === "air") {
    notes.push("By Air trips use Skardu as the ground-tour hub. Air tickets to and from Skardu are not included.");
  }

  const month = getTripMonth(input.tripDate);
  const selectedRides = selectedJeepNames(input);
  const usesOpenStreetMap = input.selectedCities.some((city) =>
    getScheduledAttractions(city, input, month, selectedRides)
      .some((attraction) => Boolean(attraction.coordinate && attraction.openStreetMapElement)),
  );
  const attractionRouteGroups = getItineraryAttractionRouteGroups(input);
  if (usesOpenStreetMap) {
    notes.push("Mapped attraction coordinates are credited to OpenStreetMap contributors; road estimates use OpenRouteService where a verified route is available.");
  }
  if (attractionRouteGroups.length > 0 && (input.attractionRouteLegs?.length ?? 0) === 0) {
    notes.push("Local attraction drive times are not available yet. No unverified time or distance has been assumed.");
  }
  const attractionIndexByCity = new Map<string, number>();
  const scheduledAttractionIds = new Set<string>();
  const orderedOvernights = normalizedNights
    .map((stay, routeIndex) => ({ ...stay, routeIndex }))
    .filter((stay) => stay.nights > 0);
  let nextDayIndex = 0;
  let lastRouteIndex = -1;
  let currentLocation = input.travelMode === "air" ? "Skardu" : input.startingPoint;
  const routeSequence = input.routeSequence?.length
    ? input.routeSequence
    : [input.startingPoint, ...selectedCities];
  let routeSequenceIndex = routeSequence.findIndex((stop) =>
    normalizeCity(stop) === normalizeCity(currentLocation),
  );
  let singleCityNight = 0;
  let kashmirNight = 0;

  for (const overnight of orderedOvernights) {
    const arrivalDay = days[nextDayIndex];
    if (!arrivalDay) break;
    const targetSequenceIndex = routeSequence.findIndex((stop, index) =>
      index > routeSequenceIndex && normalizeCity(stop) === normalizeCity(overnight.city),
    );
    const routeStops = targetSequenceIndex >= 0
      ? routeSequence.slice(routeSequenceIndex + 1, targetSequenceIndex + 1)
      : normalizedNights.slice(lastRouteIndex + 1, overnight.routeIndex + 1).map((stay) => stay.city);
    if (routeStops.length === 0 && normalizeCity(currentLocation) !== normalizeCity(overnight.city)) {
      routeStops.push(overnight.city);
    }
    let departureMinutes = DAY_START_MINUTES;
    let from = currentLocation;
    let hasTravel = false;
    const travelledLegs: Array<{ from: string; to: string }> = [];
    for (const stop of routeStops) {
      if (normalizeCity(stop) === normalizeCity(from)) continue;
      travelledLegs.push({ from, to: stop });
      departureMinutes = addTravelLeg(arrivalDay, input, from, stop, departureMinutes);
      from = stop;
      hasTravel = true;
    }
    if (normalizeCity(from) !== normalizeCity(overnight.city)) {
      travelledLegs.push({ from, to: overnight.city });
      departureMinutes = addTravelLeg(arrivalDay, input, from, overnight.city, departureMinutes);
      hasTravel = true;
    }

    arrivalDay.destination = overnight.city;
    arrivalDay.image = getCityImage(overnight.city);
    arrivalDay.title = hasTravel
      ? `Day ${arrivalDay.dayNumber} · Travel to ${overnight.city}`
      : `Day ${arrivalDay.dayNumber} · ${overnight.city}`;
    if (hasTravel) {
      arrivalDay.description = `Travel from ${currentLocation} to ${overnight.city}. Sightseeing is kept light on the arrival day.`;
      const knownLegs = input.routeLegs ?? [];
      const relevantLegs = travelledLegs.map(({ from: legFrom, to }) => getRouteLeg(knownLegs, legFrom, to));
      const hasKnownDurations = relevantLegs.every((leg) => leg?.durationSeconds !== null && leg?.durationSeconds !== undefined);
      const totalDrivingMinutes = relevantLegs.reduce(
        (total, leg) => total + (leg?.durationSeconds ? leg.durationSeconds / 60 : 0),
        0,
      );
      if (hasKnownDurations && totalDrivingMinutes <= 180) {
        addLocalDayActivities(
          arrivalDay,
          getStayArea(overnight.city, input, kashmirNight),
          input,
          month,
          attractionIndexByCity,
          scheduledAttractionIds,
          false,
          selectedRides,
          departureMinutes,
        );
      }
      if (hasKnownDurations && totalDrivingMinutes > 480) {
        arrivalDay.notes.push("This is a long transfer day. Confirm the practical departure time and any required transit overnight with the operator.");
      }
    } else {
      arrivalDay.description = `Begin exploring ${overnight.city} at a relaxed pace.`;
      addLocalDayActivities(
        arrivalDay,
        overnight.city,
        input,
        month,
        attractionIndexByCity,
        scheduledAttractionIds,
        false,
        selectedRides,
      );
    }

    const firstNightNumber = singleCityNight + 1;
    for (let night = 1; night <= overnight.nights; night += 1) {
      const dayIndex = nextDayIndex + night - 1;
      const day = days[dayIndex];
      if (!day) break;
      if (night > 1) {
        day.destination = overnight.city;
        day.image = getCityImage(overnight.city);
        day.title = `Day ${day.dayNumber} · ${overnight.city}`;
        day.description = `Explore ${overnight.city} with a ${input.pace} pace and time for breaks.`;
        addLocalDayActivities(
          day,
          getStayArea(overnight.city, input, kashmirNight),
          input,
          month,
          attractionIndexByCity,
          scheduledAttractionIds,
          night === 2,
          selectedRides,
        );
      }
      const isKashmir = normalizeCity(overnight.city) === "kashmir";
      if (isKashmir) kashmirNight += 1;
      assignOvernight(
        day,
        input,
        overnight.city,
        night,
        firstNightNumber + night - 1,
        kashmirNight,
        night === overnight.nights,
      );
    }
    singleCityNight = firstNightNumber + overnight.nights - 1;
    nextDayIndex += overnight.nights;
    lastRouteIndex = overnight.routeIndex;
    currentLocation = overnight.city;
    routeSequenceIndex = targetSequenceIndex >= 0
      ? targetSequenceIndex
      : routeSequence.findIndex((stop) => normalizeCity(stop) === normalizeCity(currentLocation));
  }

  const returnDayIndex = input.durationDays ? durationDays - 1 : nextDayIndex;
  const returnDay = days[Math.min(returnDayIndex, durationDays - 1)];
  if (returnDay && durationNights === 0 && selectedCities.length > 0) {
    let departureMinutes = DAY_START_MINUTES;
    let from = currentLocation;
    const dayTripStops = routeSequence.slice(routeSequenceIndex + 1);
    for (const stop of dayTripStops.length > 0 ? dayTripStops : selectedCities) {
      if (normalizeCity(stop) === normalizeCity(from)) continue;
      departureMinutes = addTravelLeg(returnDay, input, from, stop, departureMinutes);
      from = stop;
    }
    if (input.travelMode === "air") {
      returnDay.evening.push(createActivity(
        "Departure",
        "Return to Skardu Airport",
        "The flight to and from Skardu is not included; confirm flight arrangements separately.",
        "travel",
      ));
    } else if (normalizeCity(from) !== normalizeCity(input.startingPoint)) {
      addTravelLeg(returnDay, input, from, input.startingPoint, departureMinutes);
    }
    returnDay.destination = selectedCities[selectedCities.length - 1];
    returnDay.image = getCityImage(returnDay.destination);
    returnDay.title = `Day ${returnDay.dayNumber} · Day trip`;
  } else if (returnDay && orderedOvernights.length > 0) {
    returnDay.morning.unshift(createActivity(
      "Before departure",
      "Hotel check-out",
      "Settle any personal extras and confirm the hotel's check-out time before leaving.",
      "hotel",
    ));
    const remainingStops = routeSequence.slice(routeSequenceIndex + 1);
    let departureMinutes = DAY_START_MINUTES;
    let from = currentLocation;
    if (input.travelMode === "air") {
      if (normalizeCity(from) !== "skardu") {
        departureMinutes = addTravelLeg(returnDay, input, from, "Skardu", departureMinutes);
      }
      returnDay.evening.push(createActivity(
        "Departure",
        "Return to Skardu Airport",
        "The flight to and from Skardu is not included; confirm flight arrangements separately.",
        "travel",
      ));
    } else {
      for (const stop of remainingStops) {
        if (normalizeCity(stop) === normalizeCity(from)) continue;
        departureMinutes = addTravelLeg(returnDay, input, from, stop, departureMinutes);
        from = stop;
      }
      if (normalizeCity(from) !== normalizeCity(input.startingPoint)) {
        addTravelLeg(returnDay, input, from, input.startingPoint, departureMinutes);
      }
    }
    returnDay.destination = input.travelMode === "air" ? "Skardu" : input.startingPoint;
    returnDay.image = getCityImage(returnDay.destination);
    returnDay.title = `Day ${returnDay.dayNumber} · Return journey`;
    returnDay.description = input.travelMode === "air"
      ? "Return by ground transport to Skardu Airport; flight tickets are separate."
      : `Return from ${currentLocation} to ${input.startingPoint}.`;
  }

  for (const day of days) {
    const presetDay = presetDays.get(day.dayNumber);
    if (presetDay) {
      day.title = `Day ${day.dayNumber} · ${presetDay.title}`;
      day.description = presetDay.description;
    }
    if (input.travelMode === "air" && !day.notes.includes("Air tickets to and from Skardu are not included.")) {
      day.notes.push("Air tickets to and from Skardu are not included.");
    }
    if (day.morning.length === 0 && day.afternoon.length === 0 && day.evening.length === 0) {
      if (!presetDay) day.title = `Day ${day.dayNumber} · Package travel day`;
      day.description ||= "This day is part of the selected package duration. Confirm the transport and overnight arrangements with the operator.";
      day.notes.push("No drive time or hotel has been assumed for this package travel day.");
    }
    addMealBreaks(day, day.morning.concat(day.afternoon, day.evening).some((activity) => activity.kind === "travel"));
    day.notes = [...new Set(day.notes)];
  }

  if (input.selectedCities.some((city) => normalizeCity(city) === "kashmir") && month >= 6 && month <= 10) {
    notes.push("Taobat stays are offered only from June through October; access remains subject to local conditions.");
  }
  const scheduledOptionalActivities = new Set(
    days.flatMap((day) => [...day.morning, ...day.afternoon, ...day.evening])
      .filter((activity) => activity.kind === "optional")
      .map((activity) => activity.title),
  );
  const unscheduledRides = selectedRides.filter((ride) => !scheduledOptionalActivities.has(ride));
  if (unscheduledRides.length > 0) {
    notes.push(`Selected optional experience(s) not placed into a sightseeing block: ${unscheduledRides.join(", ")}. Confirm timing and local access with the operator.`);
  }
  if (input.vehicleName) notes.push(`Selected transport: ${input.vehicleName}.`);
  if (input.hotelCategory) notes.push(`Accommodation category: ${input.hotelCategory}.`);

  return {
    title: input.title || (input.selectedCities.length ? input.selectedCities.join(" + ") : "Selected tour"),
    travelMode: input.travelMode,
    pace: input.pace,
    durationDays,
    durationNights,
    travelerCount: input.travelerCount,
    vehicleName: input.vehicleName,
    hotelCategory: input.hotelCategory,
    specialOccasion: input.specialOccasion,
    selectedDestinations: [...input.selectedCities],
    usesOpenStreetMap,
    notes,
    days,
  };
}
