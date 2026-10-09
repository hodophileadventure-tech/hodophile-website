import type { RouteItineraryDay } from "./routes";
export type TourDeparture = {
  id: string;
  journeyId: string;
  destinationSlugs: string[];
  label: string;
  pricePerPerson: number;
};

export type TravelStyle = "family" | "couples" | "adventure" | "tailored";
export type TourExperience = "mountains" | "lakes-valleys" | "beaches" | "nature" | "adventure" | "romance" | "culture" | "offbeat";

export type TourPackage = {
  id: string;
  title: string;
  description: string;
  region: "northern" | "southern";
  destinationSlugs: string[];
  routeStops: string[];
  routeHighlights?: string[];
  itinerary?: RouteItineraryDay[];
  bestFor?: string;
  pace?: "Fast" | "Moderate" | "Relaxed";
  image: string;
  duration: string;
  pricePerPerson: number;
  priceOnRequest?: boolean;
  priceWithoutIslamabadStay?: number;
  sharingPrices?: {
    quad: number;
    triple: number;
    twin: number;
    solo: number;
  };
  sharingPricesWithoutIslamabadStay?: {
    quad: number;
    triple: number;
    twin: number;
    solo: number;
  };
  couplePrice?: number;
  scheduleNote?: string;
  blockedDepartureMonths?: string[];
  departureAvailability: "confirmed" | "on-request";
  departures: TourDeparture[];
  travelStyles: TravelStyle[];
  experiences: TourExperience[];
  transport?: string[];
  includes?: string[];
  excludes?: string[];
  notes?: string[];
};

const northernTransport = ["Comfortable transport", "Tour manager", "Bonfire"];

export const tourPackages: TourPackage[] = [
  {
    id: "skardu-deosai-air-3-days",
    title: "Skardu, Deosai & Naran by Road",
    description: "A six-day private road journey from Islamabad through Chilas and Skardu, across the Deosai plateau, and onward to Naran.",
    region: "northern",
    destinationSlugs: ["skardu", "naran"],
    image: "/images/package-cards/images__tour-packages__03.webp",
    routeStops: ["Islamabad", "Chilas", "Skardu", "Deosai", "Naran"],
    routeHighlights: ["Kiwai Waterfall", "Lulusar Lake", "Babusar Top", "Shangrila Resort", "Deosai plateau", "Naran"],
    bestFor: "A private highland road circuit",
    pace: "Relaxed",
    travelStyles: ["adventure", "family", "tailored"],
    experiences: ["mountains", "nature", "adventure"],
    duration: "6 Days / 5 Nights",
    pricePerPerson: 45000,
    priceOnRequest: true,
    scheduleNote: "Six-day private tour from Islamabad; pickup and drop-off in Islamabad.",
    departureAvailability: "on-request",
    departures: [],
    transport: ["Private road transport from Islamabad", "4x4 jeep for Deosai"],
    includes: ["Hotel accommodation", "Luxury transport", "Breakfasts", "Tolls and taxes", "Driver-cum-tour guide", "Bonfire"],
    excludes: ["Personal expenses", "Optional quad bike, jeep safari, and horse riding in Shigar/Sarfaranga"],
    itinerary: [
      {
        day: "Day 1",
        title: "Islamabad to Chilas",
        description: "Depart Islamabad for Chilas at 5:00 AM, approximately a 9–10 hour journey. Stop at Kiwai Waterfall and Lulusar Lake, then Babusar Top before reaching Chilas for dinner and the night stay.",
      },
      {
        day: "Day 2",
        title: "Chilas to Skardu",
        description: "Depart for Skardu after breakfast. Stop at Three Mountains Junction and Astak Nala, then reach Skardu, visit Shangrila Resort, check in, have dinner, and stay overnight.",
      },
      {
        day: "Day 3",
        title: "Kharmang, Manthoka and Shigar",
        description: "Travel toward Kharmang Valley and visit Manthoka Waterfall. Spend leisure time at Manthoka, then visit Shigar Valley and Shigar Fort before returning to Skardu. Visit Sarfaranga Cold Desert; optional quad biking, jeep safari, and horse riding are self-paid. Dinner and night stay in Skardu.",
      },
      {
        day: "Day 4",
        title: "Deosai excursion",
        description: "Travel to Deosai by 4x4 jeep. Stop at Sadpara Lake, Bara Pani, and Kala Pani, then reach Sheosar Lake and spend leisure time before returning to the hotel for dinner and the night stay.",
      },
      {
        day: "Day 5",
        title: "Skardu to Naran",
        description: "After breakfast, travel toward Naran and revisit selected points along the route. Reach Naran, check in to the hotel, and stay overnight in Burwai.",
      },
      {
        day: "Day 6",
        title: "Naran to Islamabad",
        description: "Travel from Naran toward Islamabad. Stop at Kiwai Waterfall and continue to Islamabad, where tour services end.",
      },
    ],
  },
  {
    id: "skardu-deosai-basho-air-5-days",
    title: "Skardu & Basho by Air",
    description: "Explore Skardu's alpine scenery and Basho's pine forests on a five-day air-linked escape.",
    region: "northern",
    destinationSlugs: ["skardu"],
    image: "/images/package-cards/images__tour-packages__14.webp",
    routeStops: ["Skardu", "Basho"],
    routeHighlights: ["Basho forest valley"],
    bestFor: "Mountain and forest",
    pace: "Moderate",
    travelStyles: ["adventure", "couples", "tailored"],
    experiences: ["mountains", "nature", "offbeat"],
    duration: "5 Days",
    pricePerPerson: 60000,
    couplePrice: 90000,
    scheduleNote: "KDU-to-KDU by air; flights from Karachi, Lahore, or Islamabad",
    departureAvailability: "on-request",
    departures: [],
    transport: ["Corolla G/X for 2 days", "Land Cruiser Prado for 2 days (1992-95 model)"],
    excludes: ["Air tickets", "Airport pick and drop"],
  },
  {
    id: "skardu-khaplu-deosai-basho-air-7-days",
    title: "Skardu & Khaplu",
    description: "A 10-day road journey from Karachi through Chilas, Skardu, Khaplu, and Naran with scenic valley stops and cultural landmarks.",
    region: "northern",
    destinationSlugs: ["skardu", "khaplu"],
    image: "/images/package-cards/images__tour-packages__21.webp",
    routeStops: ["Chilas", "Skardu", "Khaplu", "Naran", "Islamabad"],
    routeHighlights: ["Upper Kachura Lake", "Manthoka and Khamosh Waterfalls", "Khaplu Fort", "Chaqchan Mosque"],
    bestFor: "Baltistan road circuit",
    pace: "Relaxed",
    travelStyles: ["adventure", "family", "tailored"],
    experiences: ["mountains", "lakes-valleys", "nature", "adventure", "culture"],
    duration: "10 Days / 9 Nights",
    pricePerPerson: 47500,
    priceWithoutIslamabadStay: 43500,
    couplePrice: 109000,
    scheduleNote: "Departure from Karachi via bus; tour services start in Chilas and end in Islamabad",
    departureAvailability: "on-request",
    departures: [],
    transport: ["Road transport from Karachi", "4x4 access where required"],
    excludes: ["Train meals", "Self-paid boating, zipline, rafting, and local activities", "Own transport to Islamabad/Rawalpindi hotel or station"],
    itinerary: [
      { day: "Day 1", title: "Departure from Karachi", description: "Depart from Karachi by bus with one meal included. Train travel is possible, but train meals are not included." },
      { day: "Day 2", title: "Rawalpindi / Islamabad", description: "Reach Rawalpindi or Islamabad, transfer to the hotel using own transport such as Uber or Yango, then check in for dinner and the night stay." },
      { day: "Day 3", title: "Islamabad to Chilas", description: "Tour services begin here. Depart at 5:00 AM after breakfast and travel 11–13 hours via Besham and Dassu along the Indus River, with a stop at Summer Nala. Check in at Chilas for dinner and the night stay." },
      { day: "Day 4", title: "Chilas to Skardu Valley", description: "Travel toward Skardu with a stop at Askole Nala. Visit Upper Kachura Lake for boating and zipline activities, then visit Shangrila Resort before checking in late at the Skardu hotel." },
      { day: "Day 5", title: "Skardu to Khaplu", description: "Travel to Khaplu with visits to Manthoka Waterfall and Khamosh Waterfall. Enjoy leisure time, then reach Khaplu late for dinner and the night stay." },
      { day: "Day 6", title: "Khaplu to Skardu", description: "Visit Chaqchan Mosque and Khaplu Fort, then drive west with a stop at Kashal Agri Garden in Ghowari before returning to Skardu for dinner and the night stay." },
      { day: "Day 7", title: "Skardu to Besham / Naran Valley", description: "Depart after breakfast with a stop at the Kunhar River. River rafting may be available if Naran is open. Check in at the Besham or Naran hotel for dinner and the night stay." },
      { day: "Day 8", title: "Naran Valley to Islamabad", description: "Check out early, depart for Islamabad with sightseeing stops, and reach Islamabad. Tour services end here. Karachi participants may require an additional hotel night; dinner is not included." },
      { day: "Day 9", title: "Departure for Karachi", description: "Check out before noon. Breakfast is not included. Travel to the bus or railway station using own transport and depart for Karachi." },
      { day: "Day 10", title: "Arrival in Karachi", description: "Reach Karachi and conclude the journey with the trip memories." },
    ],
  },
  {
    id: "skardu-hunza-air-7-days",
    title: "Skardu & Hunza by Air",
    description: "A flight-linked journey connecting Hunza villages with Skardu's mountain landscapes.",
    region: "northern",
    destinationSlugs: ["skardu", "hunza"],
    image: "/images/package-cards/images__destinations__featured-skardu-hunza.webp",
    routeStops: ["Skardu", "Hunza"],
    routeHighlights: ["Air-linked Skardu and Hunza valley stays"],
    bestFor: "Two-valley journey",
    pace: "Moderate",
    travelStyles: ["family", "couples", "tailored"],
    experiences: ["mountains", "lakes-valleys", "nature", "romance"],
    duration: "7 Days",
    pricePerPerson: 100000,
    couplePrice: 180000,
    scheduleNote: "KDU-to-KDU by air; flights from Karachi, Lahore, or Islamabad",
    departureAvailability: "on-request",
    departures: [],
    transport: ["Corolla G/X for 4 days", "Land Cruiser Prado for 2 days (1992-95 model)"],
    excludes: ["Air tickets", "Airport pick and drop"],
  },
  {
    id: "ormara-beach-camping",
    title: "Ormara Beach Night Camping",
    description: "Spend the night on the Makran coast with a beachside camp and a weekend rhythm away from the city.",
    region: "southern",
    destinationSlugs: ["ormara"],
    image: "/images/package-cards/images__tour-packages__ormara-beach-camping.png",
    routeStops: ["Ormara Coast"],
    routeHighlights: ["Beachside overnight camp"],
    bestFor: "Coastal camping",
    pace: "Relaxed",
    travelStyles: ["adventure", "family", "tailored"],
    experiences: ["beaches", "nature", "adventure", "offbeat"],
    duration: "2 Days / 1 Night",
    pricePerPerson: 13500,
    scheduleNote: "Every weekend: Saturday morning to Sunday evening",
    departureAvailability: "on-request",
    departures: [],
    itinerary: [
      {
        day: "Day 1",
        title: "Karachi to Ormara",
        description: "Meet at 8:00 AM at the parking area opposite Saima One Mall near Millennium Mall, then depart Karachi at 8:30 AM. Take a short break at Winder around 11:00 AM and continue to Ormara, arriving around 5:00 PM to settle into camp or a room. Enjoy beach time and activities, hi-tea at 6:00 PM, sunset, dinner at 10:00 PM, and a bonfire with music or a movie before resting by the beach around midnight.",
      },
      {
        day: "Day 2",
        title: "Ormara to Karachi",
        description: "Wake at 6:30 AM for sunrise and a beach walk. Have breakfast at 7:30 AM and depart at 8:30 AM, stopping at Princess of Hope and Kund Malir View Point. Take a lunch break at Winder around 2:30 PM, depart at 3:30 PM, and reach Karachi around 6:00 PM.",
      },
    ],
    notes: ["Private weekday trips are available for groups of 12-20 people."],
  },
  {
    id: "swat-kalam-shogran-10-days",
    title: "Swat, Kalam, Malam Jabba & Shogran",
    description: "A six-day private journey from Islamabad through Malam Jabba, Kalam, Balakot, and Shogran.",
    region: "northern",
    destinationSlugs: ["swat", "shogran"],
    image: "/images/package-cards/images__tour-packages__02.webp",
    routeStops: ["Islamabad", "Malam Jabba", "Kalam", "Ushu Forest", "Balakot", "Shogran"],
    routeHighlights: ["Malam Jabba", "Ushu Forest", "Mahudand Lake", "Balakot", "Siri and Paye Meadows"],
    bestFor: "A varied six-day valley and meadow circuit",
    pace: "Relaxed",
    travelStyles: ["family", "couples", "tailored"],
    experiences: ["mountains", "lakes-valleys", "nature", "romance"],
    duration: "6 Days",
    pricePerPerson: 42000,
    priceOnRequest: true,
    scheduleNote: "Six-day private tour from Islamabad.",
    departureAvailability: "on-request",
    departures: [],
    transport: ["Honda BR-V", "4x4 jeep transfer for Ushu Forest and Shogran"],
    includes: ["Accommodation", "Breakfast", "Tolls and taxes", "Tour guide", "Bonfire"],
    excludes: ["Chairlift, zipline, and other Malam Jabba activities", "Entry tickets and optional activities", "Paragliding, speedboat, and jet ski in Khanpur"],
    itinerary: [
      {
        day: "Day 1",
        title: "Islamabad to Malam Jabba and Kalam",
        description: "Depart for Swat, have breakfast on the way, and travel to Malam Jabba. Spend leisure time there; zipline, chairlift, and other activities are not included. Continue to Kalam, check in to the hotel, and stay overnight.",
      },
      {
        day: "Day 2",
        title: "Kalam and Bahrain Bazaar",
        description: "Travel to Kalam via Bahrain Bazaar. Arrive in the evening, check in to the hotel, explore the local market, and stay overnight in Kalam Valley.",
      },
      {
        day: "Day 3",
        title: "Ushu Forest and Mahudand Lake",
        description: "Depart for Ushu Forest by 4x4 jeep and transfer into a local jeep for the forest. Visit Palogha Valley, Matiltan Waterfall, and Mahudand Lake, then return to the hotel in Kalam for the night.",
      },
      {
        day: "Day 4",
        title: "Kalam to Balakot",
        description: "Depart for Balakot via Shangle Top and Hazara Motorway. Stop at the Kunhar River, reach Balakot, and stay overnight.",
      },
      {
        day: "Day 5",
        title: "Balakot to Shogran",
        description: "Visit Kiwai Waterfall, then travel to Shogran by 4x4 jeep. Visit Siri and Paye Meadows if accessible. Stay overnight in Shogran.",
      },
      {
        day: "Day 6",
        title: "Shogran to Islamabad",
        description: "Depart for Islamabad via Kiwai Waterfall, transfer to the BR-V, and continue toward Islamabad. Visit Khanpur Dam if time allows; paragliding, speedboat, and jet ski activities are optional and not included. Drop-off in Islamabad.",
      },
    ],
  },
  {
    id: "kashmir-shogran-9-days",
    title: "Kashmir, Shogran & Murree",
    description: "A six-day private tour from Islamabad through Keran and Muzaffarabad to Shogran, with a Murree pickup.",
    region: "northern",
    destinationSlugs: ["kashmir", "shogran"],
    image: "/images/package-cards/images__tour-packages__06.webp",
    routeStops: ["Murree", "Neelum Valley", "Keran", "Muzaffarabad", "Shogran", "Kiwai", "Islamabad"],
    routeHighlights: ["Neelum Jhelum viewpoint", "Dhani Waterfall", "Kundal Shahi Waterfall", "Red Fort Muzaffarabad", "Siri and Paye Meadows"],
    bestFor: "A private Kashmir and Shogran circuit",
    pace: "Relaxed",
    travelStyles: ["family", "couples", "tailored"],
    experiences: ["mountains", "lakes-valleys", "nature", "romance"],
    duration: "6 Days / 5 Nights",
    pricePerPerson: 39000,
    priceOnRequest: true,
    scheduleNote: "Six-day private tour from Islamabad; Day 1 pickup is listed from Murree.",
    departureAvailability: "on-request",
    departures: [],
    transport: ["Corolla GLi", "4x4 jeep transfer for Shogran"],
    includes: ["Accommodation", "Breakfast", "Tolls and taxes", "Driver-cum-guide", "Bonfire"],
    itinerary: [
      {
        day: "Day 1",
        title: "Murree to Keran",
        description: "Pick up from Murree and depart for Neelum Valley. Visit the Neelum Jhelum Hydropower viewpoint, an LOC viewpoint, Kashmir Waterfall, and Dhani Waterfall. Stay overnight in Keran.",
      },
      {
        day: "Day 2",
        title: "Keran to Muzaffarabad",
        description: "After breakfast, explore Keran and its surroundings. Depart for Muzaffarabad via Kundal Shahi Waterfall, visit Red Fort Muzaffarabad and the local market, then stay overnight in Muzaffarabad.",
      },
      {
        day: "Day 3",
        title: "Muzaffarabad to Shogran",
        description: "Depart for Shogran via Balakot and stop at Kiwai Waterfall. Transfer to a 4x4 jeep for the journey to Shogran, check in to the hotel, and explore the meadows. Stay overnight in Shogran.",
      },
      {
        day: "Day 4",
        title: "Siri and Paye Meadows",
        description: "After breakfast, explore Siri and Paye Meadows if accessible. Spend leisure time in Shogran and stay overnight.",
      },
      {
        day: "Day 5",
        title: "Shogran to Islamabad",
        description: "After breakfast, depart for Kiwai. Transfer to the car and return to Islamabad, visiting Dino Valley if time allows. Stay overnight in Islamabad.",
      },
      {
        day: "Day 6",
        title: "Islamabad departure",
        description: "Check out of the hotel by 12:00 noon and drop off at Rawalpindi Railway Station.",
      },
    ],
  },
  {
    id: "hunza-skardu-naran-12-days",
    title: "Skardu & Hunza",
    description: "An eight-day private road journey from Islamabad through Chilas and Hunza to Skardu, Deosai, and Naran.",
    region: "northern",
    destinationSlugs: ["hunza", "skardu", "naran"],
    image: "/images/package-cards/images__tour-packages__05.webp",
    routeStops: ["Islamabad", "Chilas", "Hunza", "Khunjerab Pass", "Attabad Lake", "Skardu", "Deosai", "Naran"],
    routeHighlights: ["Babusar Top", "Baltit Fort and Karimabad Bazaar", "Khunjerab Pass", "Attabad Lake", "Passu Cones", "Deosai plateau"],
    bestFor: "A private Hunza and Skardu road circuit",
    pace: "Relaxed",
    travelStyles: ["adventure", "family", "tailored"],
    experiences: ["mountains", "lakes-valleys", "nature", "adventure"],
    duration: "8 Days / 7 Nights",
    pricePerPerson: 68000,
    priceOnRequest: true,
    scheduleNote: "Eight-day private tour from Islamabad; route and dates to confirm.",
    departureAvailability: "on-request",
    departures: [],
    transport: ["Road transport from Islamabad", "Local jeep for Deosai", "Local transport for Khunjerab Pass as required"],
    includes: ["Hotel accommodation", "Luxury transport", "Breakfasts", "Tolls and taxes", "Tour guide", "Bonfire"],
    excludes: ["Water sports at Attabad Lake", "Optional activities and entry charges"],
    itinerary: [
      {
        day: "Day 1",
        title: "Islamabad to Chilas",
        description: "Pick up participants from Islamabad and depart for Chilas at 5:00 AM for an approximately 9–10 hour journey. Stop at Kiwai Waterfall and Lulusar Lake, then Babusar Top and Three Mountains Junction. Continue to Chilas for dinner and the night stay.",
      },
      {
        day: "Day 2",
        title: "Chilas to Hunza",
        description: "Depart for Hunza and stop at Sohni Waterfall and Moon Restaurant if time allows, then Lulusar Lake, Babusar Top, Three Mountains Junction, and Rakaposhi viewpoint. Arrive in Hunza, check in, visit Baltit Fort and Karimabad Bazaar, then have dinner and stay overnight.",
      },
      {
        day: "Day 3",
        title: "Khunjerab Pass and Upper Hunza",
        description: "Travel toward Khunjerab Pass. Visit Attabad Lake; boating and other water sports are optional and not included. Explore Khunjerab Pass and stop at Passu Cones and Hussaini Suspension Bridge, then return to Hunza for dinner and the night stay.",
      },
      {
        day: "Day 4",
        title: "Hunza to Skardu",
        description: "Travel approximately seven hours toward Skardu. Stop at Jaglot JSR and Astak Nala, arrive in Skardu, visit Shangrila Resort, check in, have dinner, and stay overnight.",
      },
      {
        day: "Day 5",
        title: "Manthoka and Shigar",
        description: "Depart for Manthoka Waterfall and spend leisure time there. Visit Shigar Valley and Shigar Fort, then Sarfaranga Cold Desert. Activities such as quad biking, jeep safari, and horse riding are optional and not included. Dinner and night stay in Skardu.",
      },
      {
        day: "Day 6",
        title: "Deosai excursion",
        description: "Travel to Deosai by 4x4 jeep. Stop at Sadpara Lake, Bara Pani, and Kala Pani, then reach Sheosar Lake and spend leisure time before returning to the hotel for dinner and the night stay.",
      },
      {
        day: "Day 7",
        title: "Skardu to Naran",
        description: "Depart for Naran after breakfast and stop at the Kunhar River. River rafting may be available at additional cost. Continue to Naran or Burwai for dinner and the night stay.",
      },
      {
        day: "Day 8",
        title: "Naran to Islamabad",
        description: "Depart for Islamabad after breakfast and stop at Kiwai Waterfall. Continue to Islamabad; tour services end on arrival.",
      },
    ],
  },
  {
    id: "skardu-deosai-naran-10-days",
    title: "Skardu, Deosai & Naran",
    description: "A 10-day coach journey from Karachi via Islamabad through Chilas, Skardu, Deosai, and Naran, returning to Karachi.",
    region: "northern",
    destinationSlugs: ["skardu", "naran"],
    image: "/images/package-cards/images__featured-tours__10days-skardu-deosai.jpg.webp",
    routeStops: ["Karachi", "Islamabad", "Chilas", "Skardu", "Deosai", "Naran"],
    routeHighlights: ["Babusar Top", "Shangrila Resort", "Manthoka Waterfall", "Shigar Fort", "Deosai plateau", "Kunhar River"],
    bestFor: "A full coach and highland circuit",
    pace: "Relaxed",
    travelStyles: ["adventure", "family", "tailored"],
    experiences: ["mountains", "lakes-valleys", "nature", "adventure"],
    duration: "10 Days",
    pricePerPerson: 47500,
    couplePrice: 109000,
    priceWithoutIslamabadStay: 43500,
    scheduleNote: "The listed itinerary starts from Karachi by bus and joins the northern route in Islamabad.",
    departureAvailability: "on-request",
    departures: [],
    transport: ["Youtong return bus tickets between Karachi and Islamabad", "Comfortable road transport", "4x4 jeep for Deosai"],
    includes: ["Youtong return bus tickets Karachi-Islamabad-Karachi", "2 nights Islamabad stay", "Dinner for Islamabad stay (one side)", "Standard hotel on quad-sharing basis", "Half-board meals", ...northernTransport],
    notes: ["With two Islamabad hotel nights: quad sharing PKR 47,500 per person or couple sharing PKR 109,000 per couple. Directly joining from Islamabad without those nights: quad sharing PKR 43,500 per person or couple sharing PKR 99,000 per couple."],
    itinerary: [
      {
        day: "Day 1",
        title: "Karachi to Islamabad",
        description: "Depart Karachi by bus. One meal is included on the bus; train meals are not included if travelling by train.",
      },
      {
        day: "Day 2",
        title: "Islamabad",
        description: "Reach Rawalpindi or Islamabad and travel to the hotel using your own transport, such as Uber or Yango. Check in for dinner and the night stay. The tour starts here for guests who booked the trip with the company.",
      },
      {
        day: "Day 3",
        title: "Islamabad to Chilas",
        description: "After breakfast, depart for Chilas at 5:00 AM for a long journey of approximately 11–13 hours. Stop at Balakot and Kiwai Waterfall, then at Lulusar Lake and Babusar Top before reaching Chilas for hotel check-in, dinner, and the night stay.",
      },
      {
        day: "Day 4",
        title: "Chilas to Skardu",
        description: "After breakfast, depart for Skardu and stop at Astak Nala. At Upper Kachura Lake, enjoy boating and zipline activities, then visit Shangrila Resort. Continue to Skardu for a late hotel check-in, dinner, and the night stay.",
      },
      {
        day: "Day 5",
        title: "Skardu, Manthoka and Shigar",
        description: "After breakfast, visit Manthoka Waterfall and spend leisure time at the resort. Visit Shigar Valley and Shigar Fort, then Sarfaranga Cold Desert. Activities such as quad biking, jeep safari, paragliding, and motor gliding are available at additional cost. Dinner and night stay.",
      },
      {
        day: "Day 6",
        title: "Deosai excursion",
        description: "After breakfast, travel to Deosai by 4x4 jeep to see the plateau scenery. Visit Bara Pani, Kala Pani, and Sheosar Lake, then return to the hotel for dinner and the night stay.",
      },
      {
        day: "Day 7",
        title: "Skardu to Naran",
        description: "After breakfast, depart for Naran via Burwai, stopping at the Kunhar River. River rafting may be available at additional cost. Continue to Naran for hotel check-in, dinner, and the night stay.",
      },
      {
        day: "Day 8",
        title: "Naran to Islamabad",
        description: "After an early wake-up and hotel check-out, travel to Islamabad with sightseeing stops along the way. Tour services end on arrival in Islamabad. An overnight hotel stay is available for Karachi guests; dinner is not included.",
      },
      {
        day: "Day 9",
        title: "Islamabad to Karachi",
        description: "Check out before 12:00 noon. Breakfast is not included. Travel to the bus or railway station using your own transport, such as Uber or Yango, and depart for Karachi.",
      },
      {
        day: "Day 10",
        title: "Arrival in Karachi",
        description: "Arrive in Karachi and conclude the journey.",
      },
    ],
  },
  {
    id: "seasonal-11",
    title: "Kashmir with Arang Kel & Taobat",
    description: "A five-day tour from Islamabad through Sharda, Kel, Arang Kel, Taobat, and Keran, with a return via Kutton Waterfall.",
    region: "northern",
    destinationSlugs: ["kashmir"],
    routeStops: ["Islamabad", "Sharda", "Kel", "Arang Kel", "Taobat", "Keran", "Kutton Waterfall"],
    routeHighlights: ["Neelum Jhelum Hydropower viewpoint", "LOC viewpoint", "Arang Kel", "Taobat", "Kutton Waterfall"],
    bestFor: "A five-day Neelum Valley and Arang Kel journey",
    image: "/images/package-cards/images__tour-packages__10.webp",
    duration: "5 Days",
    pricePerPerson: 46500,
    priceWithoutIslamabadStay: 42500,
    sharingPrices: { quad: 46500, triple: 48500, twin: 52500, solo: 76500 },
    sharingPricesWithoutIslamabadStay: { quad: 42500, triple: 44500, twin: 46500, solo: 62500 },
    scheduleNote: "Five-day private tour from Islamabad; schedule and access are subject to local conditions.",
    departureAvailability: "on-request",
    departures: [],
    travelStyles: ["family", "couples", "tailored"],
    experiences: ["mountains", "lakes-valleys", "nature", "romance"],
    transport: ["Corolla GLi", "4x4 jeep between Kel and Taobat", "Doli cable-car crossing to Arang Kel"],
    includes: ["Accommodation", "Breakfast", "Tolls and taxes", "Driver-cum-guide", "Bonfire"],
    itinerary: [
      {
        day: "Day 1",
        title: "Islamabad to Sharda",
        description: "Depart for Sharda Valley with breakfast on the way. Visit the Neelum Jhelum Hydropower viewpoint and an LOC viewpoint, then arrive in Sharda for the night stay.",
      },
      {
        day: "Day 2",
        title: "Sharda to Arang Kel",
        description: "After breakfast, travel to Kel and continue to Arang Kel. Cross the river by Doli cable car, then trek approximately 45 minutes to Arang Kel. Spend free time exploring and stay overnight in Arang Kel.",
      },
      {
        day: "Day 3",
        title: "Arang Kel to Taobat",
        description: "Return to Kel by Doli and transfer to a 4x4 jeep for Taobat. Enjoy the scenery en route, reach Taobat Bala, cross the river bridge to access the hotel, and stay overnight in Taobat.",
      },
      {
        day: "Day 4",
        title: "Taobat to Keran",
        description: "After breakfast, travel by 4x4 jeep back to Kel, change vehicles, and continue to Keran. Spend free time exploring and stay overnight in Keran.",
      },
      {
        day: "Day 5",
        title: "Keran to Islamabad",
        description: "After breakfast, check out and depart for Islamabad. Visit Kutton Waterfall, continue to Islamabad, and drop off participants. Tour services end on arrival.",
      },
    ],
    notes: [
      "Quad sharing from PKR 46,500 with Islamabad stays, or PKR 42,500 without them.",
      "Room rates: triple PKR 48,500, twin PKR 52,500, solo PKR 76,500.",
    ],
  },
  {
    id: "seasonal-53",
    title: "02 Days Gorakh Hill Station",
    description: "A short Gorakh Hill journey; confirm itinerary, access, and current availability for requested dates.",
    region: "southern",
    destinationSlugs: ["gorakh"],
    routeStops: ["Gorakh Hill"],
    bestFor: "Highland weekend",
    image: "/images/package-cards/images__tour-packages__27.webp",
    duration: "2 Days / 1 Night",
    pricePerPerson: 16500,
    priceWithoutIslamabadStay: 16500,
    sharingPrices: { quad: 16500, triple: 17500, twin: 18500, solo: 18500 },
    sharingPricesWithoutIslamabadStay: { quad: 16500, triple: 17500, twin: 18500, solo: 18500 },
    scheduleNote: "Departure dates available on request",
    departureAvailability: "on-request",
    departures: [],
    travelStyles: ["adventure", "family", "tailored"],
    experiences: ["mountains", "nature", "offbeat"],
    notes: [
      "Quad sharing from PKR 16,500 with Islamabad stays, or PKR 16,500 without them.",
      "Room rates: triple PKR 17,500, twin PKR 18,500, solo PKR 18,500.",
    ],
  },
  {
    id: "seasonal-54",
    title: "02 Days Moola Chotok",
    description: "A short Moola Chotok journey; confirm itinerary, access, and current availability for requested dates.",
    region: "southern",
    destinationSlugs: ["moola"],
    routeStops: ["Moola Chotok"],
    bestFor: "Canyon adventure",
    image: "/images/package-cards/images__tour-packages__28.webp",
    duration: "2 Days / 1 Night",
    pricePerPerson: 16000,
    priceWithoutIslamabadStay: 16000,
    sharingPrices: { quad: 16000, triple: 17000, twin: 18000, solo: 18000 },
    sharingPricesWithoutIslamabadStay: { quad: 16000, triple: 17000, twin: 18000, solo: 18000 },
    scheduleNote: "Departure dates available on request",
    departureAvailability: "on-request",
    departures: [],
    travelStyles: ["adventure", "family", "tailored"],
    experiences: ["nature", "adventure", "offbeat"],
    notes: [
      "Quad sharing from PKR 16,000 with Islamabad stays, or PKR 16,000 without them.",
      "Room rates: triple PKR 17,000, twin PKR 18,000, solo PKR 18,000.",
    ],
  },
];

export function getTourPackagesForDestination(destinationSlug: string) {
  return tourPackages.filter((tourPackage) => tourPackage.destinationSlugs.includes(destinationSlug));
}

export function getTourPackageById(id: string) {
  return tourPackages.find((tourPackage) => tourPackage.id === id);
}

export function getTourPackagesForRegion(region: TourPackage["region"]) {
  return tourPackages.filter((tourPackage) => tourPackage.region === region);
}

export function getTourPackagesForTravelStyle(travelStyle: TravelStyle) {
  return tourPackages.filter((tourPackage) => tourPackage.travelStyles.includes(travelStyle));
}