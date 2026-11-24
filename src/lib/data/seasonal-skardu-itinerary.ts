export interface CityStay {
  city: string;
  nights: number;
}

const ROAD_STOPOVER_CITIES = new Set(["Naran", "Chilas", "Besham"]);

function addNightsToSkardu(stays: CityStay[], nights: number): CityStay[] {
  if (nights === 0) return stays;

  return stays.map((stay) =>
    stay.city === "Skardu"
      ? { ...stay, nights: Math.max(0, stay.nights + nights) }
      : stay,
  );
}

export function getSeasonalSkarduStays(
  stays: readonly CityStay[],
  travelMode: "road" | "air",
  month: number,
): CityStay[] {
  if (!stays.some((stay) => stay.city === "Skardu")) {
    return stays.map((stay) => ({ ...stay }));
  }

  const islamabadStays = stays.filter((stay) => stay.city === "Islamabad");
  const stopovers = stays.filter((stay) => ROAD_STOPOVER_CITIES.has(stay.city));
  const destinationStays = stays.filter(
    (stay) => stay.city !== "Islamabad" && !ROAD_STOPOVER_CITIES.has(stay.city),
  );

  if (travelMode === "air") {
    const nightsToReassign = stays
      .filter((stay) => stay.city === "Islamabad" || ROAD_STOPOVER_CITIES.has(stay.city))
      .reduce((total, stay) => total + stay.nights, 0);

    return addNightsToSkardu(destinationStays, nightsToReassign);
  }

  if (month >= 5 && month <= 11) {
    const removedStopoverNights = stopovers
      .filter((stay) => stay.city !== "Naran")
      .reduce((total, stay) => total + stay.nights, 0);
    const adjustedDestinations = addNightsToSkardu(destinationStays, removedStopoverNights);
    const naranStay = stays.find((stay) => stay.city === "Naran") ?? { city: "Naran", nights: 1 };

    return [
      ...islamabadStays,
      ...adjustedDestinations,
      { ...naranStay },
    ];
  }

  const chilasStay = stays.find((stay) => stay.city === "Chilas") ?? { city: "Chilas", nights: 1 };
  const naranStay = stays.find((stay) => stay.city === "Naran");
  const beshamStay = stays.find((stay) => stay.city === "Besham") ?? {
    city: "Besham",
    nights: naranStay?.nights ?? 1,
  };
  const existingStopoverNights = stopovers.reduce((total, stay) => total + stay.nights, 0);
  const winterStopoverNights = chilasStay.nights + beshamStay.nights;
  const adjustedDestinations = addNightsToSkardu(
    destinationStays,
    existingStopoverNights - winterStopoverNights,
  );

  return [
    ...islamabadStays,
    { ...chilasStay },
    ...adjustedDestinations,
    { ...beshamStay },
  ];
}
