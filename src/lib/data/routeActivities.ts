// Maps routes to their included/mandatory jeep activities and other location-based activities
export interface RouteActivity {
  name: string;
  location: string; // City or location name
  day: number; // Which day of the itinerary
  isJeepRequired: boolean;
  cost?: number; // Additional cost if not included
  description: string;
  included?: boolean; // Is this included in the base price?
}

export interface RouteActivitiesMap {
  routeId: string;
  activities: RouteActivity[];
  mandatoryJeepCost?: number; // Total mandatory jeep cost for this route
}

export const routeActivities: Record<string, RouteActivitiesMap> = {
  "skardu-hunza-8days": {
    routeId: "skardu-hunza-8days",
    activities: [
      {
        name: "Arrival & Skardu Orientation",
        location: "Skardu",
        day: 1,
        isJeepRequired: false,
        description: "Arrive in Skardu. Check-in and rest.",
      },
      {
        name: "Deosai Plains Exploration",
        location: "Skardu",
        day: 2,
        isJeepRequired: true,
        cost: 15000,
        description: "Full day jeep tour of Deosai Plains - scenic meadows and alpine beauty.",
        included: false,
      },
      {
        name: "Hunza Valley Tour",
        location: "Hunza",
        day: 4,
        isJeepRequired: false,
        description: "Explore Hunza Valley villages and attractions.",
      },
    ],
    mandatoryJeepCost: 0, // Not mandatory
  },

  "skardu-basho-6days": {
    routeId: "skardu-basho-6days",
    activities: [
      {
        name: "Skardu Arrival",
        location: "Skardu",
        day: 1,
        isJeepRequired: false,
        description: "Arrive in Skardu. Check-in at hotel.",
      },
      {
        name: "Basho Valley Exploration",
        location: "Skardu",
        day: 2,
        isJeepRequired: true,
        cost: 15000,
        description: "Jeep tour through scenic Basho Valley.",
        included: false,
      },
      {
        name: "Fairy Meadows Trek",
        location: "Skardu",
        day: 3,
        isJeepRequired: true,
        cost: 25000,
        description: "Jeep ride to Fairy Meadows base camp.",
        included: false,
      },
    ],
    mandatoryJeepCost: 0,
  },

  "naran-hunza-skardu-deosai-12days": {
    routeId: "naran-hunza-skardu-deosai-12days",
    activities: [
      {
        name: "Travel to Islamabad",
        location: "Islamabad",
        day: 1,
        isJeepRequired: false,
        description: "Depart for Islamabad via bus/train.",
      },
      {
        name: "Islamabad to Naran",
        location: "Naran",
        day: 2,
        isJeepRequired: false,
        description: "Arrive Naran. Check-in at hotel.",
      },
      {
        name: "Naran Valley Exploration",
        location: "Naran",
        day: 3,
        isJeepRequired: false,
        description: "Explore Kaghan Valley and scenic spots.",
      },
      {
        name: "Hunza Valley Scenic Drive",
        location: "Hunza",
        day: 4,
        isJeepRequired: false,
        description: "Drive through beautiful Hunza Valley.",
      },
      {
        name: "Hunza Local Attractions",
        location: "Hunza",
        day: 5,
        isJeepRequired: false,
        description: "Visit Hunza villages, orchards, and viewpoints.",
      },
      {
        name: "Skardu Arrival & Exploration",
        location: "Skardu",
        day: 6,
        isJeepRequired: false,
        description: "Drive to Skardu. Explore local attractions.",
      },
      {
        name: "Shigar Fort & Valley Tour",
        location: "Skardu",
        day: 7,
        isJeepRequired: false,
        description: "Visit historic Shigar Fort and surrounding valley.",
      },
      {
        name: "Deosai Plains Jeep Tour",
        location: "Skardu",
        day: 8,
        isJeepRequired: true,
        cost: 20000,
        description:
          "Full day jeep expedition to Deosai Plains - experience the meadows at 4,114m elevation.",
        included: false,
      },
      {
        name: "Skardu to Islamabad",
        location: "Islamabad",
        day: 9,
        isJeepRequired: false,
        description: "Drive back to Islamabad.",
      },
      {
        name: "Rest & Shopping",
        location: "Islamabad",
        day: 10,
        isJeepRequired: false,
        description: "Rest day. Optional shopping and city exploration.",
      },
      {
        name: "Return Journey",
        location: "Transit",
        day: 11,
        isJeepRequired: false,
        description: "Depart Islamabad via bus/train.",
      },
      {
        name: "Arrival at Home",
        location: "Transit",
        day: 12,
        isJeepRequired: false,
        description: "Arrive at destination.",
      },
    ],
    // Deosai Plains is the main jeep activity - typically should be included or offered
    mandatoryJeepCost: 20000, // Make Deosai mandatory for this tour
  },

  "skardu-shigar-shangrila-10days": {
    routeId: "skardu-shigar-shangrila-10days",
    activities: [
      {
        name: "Travel to ISB",
        location: "Islamabad",
        day: 1,
        isJeepRequired: false,
        description: "Depart for Islamabad.",
      },
      {
        name: "ISB to Chilas",
        location: "Chilas",
        day: 2,
        isJeepRequired: false,
        description: "Arrive in Chilas. Check-in at hotel.",
      },
      {
        name: "Chilas to Skardu",
        location: "Skardu",
        day: 3,
        isJeepRequired: false,
        description: "Scenic drive to Skardu.",
      },
      {
        name: "Skardu Exploration",
        location: "Skardu",
        day: 4,
        isJeepRequired: false,
        description: "Explore Skardu city and local attractions.",
      },
      {
        name: "Shigar & Shangrila Valley",
        location: "Skardu",
        day: 5,
        isJeepRequired: false,
        description: "Visit Shigar Fort and Shangrila resort.",
      },
      {
        name: "Deosai Plains Option",
        location: "Skardu",
        day: 6,
        isJeepRequired: true,
        cost: 20000,
        description: "Optional jeep tour of Deosai Plains.",
        included: false,
      },
      {
        name: "Naran Exploration",
        location: "Naran",
        day: 7,
        isJeepRequired: false,
        description: "Drive to Naran. Explore Kaghan Valley.",
      },
      {
        name: "Naran to ISB",
        location: "Islamabad",
        day: 8,
        isJeepRequired: false,
        description: "Return to Islamabad.",
      },
      {
        name: "Rest & Shopping",
        location: "Islamabad",
        day: 9,
        isJeepRequired: false,
        description: "Rest day. Optional shopping.",
      },
      {
        name: "Return Home",
        location: "Transit",
        day: 10,
        isJeepRequired: false,
        description: "Depart for home.",
      },
    ],
    mandatoryJeepCost: 0,
  },

  "naran-hunza-naltar-10days": {
    routeId: "naran-hunza-naltar-10days",
    activities: [
      {
        name: "Travel to ISB",
        location: "Islamabad",
        day: 1,
        isJeepRequired: false,
        description: "Depart for Islamabad.",
      },
      {
        name: "ISB to Chilas",
        location: "Chilas",
        day: 2,
        isJeepRequired: false,
        description: "Arrive Chilas. Check-in at hotel.",
      },
      {
        name: "Hunza Valley Scenic Tour",
        location: "Hunza",
        day: 3,
        isJeepRequired: false,
        description: "Scenic drive through Hunza Valley.",
      },
      {
        name: "Hunza Exploration",
        location: "Hunza",
        day: 4,
        isJeepRequired: false,
        description: "Explore Hunza villages and local attractions.",
      },
      {
        name: "Hunza Adventures",
        location: "Hunza",
        day: 5,
        isJeepRequired: false,
        description: "More Hunza valley exploration.",
      },
      {
        name: "Naran Valley Arrival",
        location: "Naran",
        day: 6,
        isJeepRequired: false,
        description: "Drive to Naran. Explore Kaghan Valley.",
      },
      {
        name: "Naltar Lake & Scenic Views",
        location: "Naran",
        day: 7,
        isJeepRequired: true,
        cost: 23000,
        description: "Jeep excursion to Naltar Lake and alpine meadows.",
        included: false,
      },
      {
        name: "Naran to ISB",
        location: "Islamabad",
        day: 8,
        isJeepRequired: false,
        description: "Return to Islamabad.",
      },
      {
        name: "ISB Rest",
        location: "Islamabad",
        day: 9,
        isJeepRequired: false,
        description: "Rest day in Islamabad.",
      },
      {
        name: "Depart Home",
        location: "Transit",
        day: 10,
        isJeepRequired: false,
        description: "Return home.",
      },
    ],
    mandatoryJeepCost: 0,
  },

  "kashmir-taobat-9days": {
    routeId: "kashmir-taobat-9days",
    activities: [
      {
        name: "Karachi Departure",
        location: "Karachi",
        day: 1,
        isJeepRequired: false,
        description:
          "Departure from Karachi via bus or train. Meals during transit are not included.",
      },
      {
        name: "Islamabad Arrival & Check-in",
        location: "Islamabad",
        day: 2,
        isJeepRequired: false,
        description:
          "Arrive in Rawalpindi/Islamabad. Self-transfer to hotel. Dinner is served for the Karachi group upon scheduled arrival window.",
      },
      {
        name: "Islamabad to Sharda Valley",
        location: "Sharda",
        day: 3,
        isJeepRequired: false,
        description:
          "Tour starts from Islamabad with scenic drive via Murree Expressway. En-route short stops include Dhani Waterfall, Chilliana LOC, Hydropower Project, and Keran LOC point.",
      },
      {
        name: "Sharda to Taobat (4x4 Transfer)",
        location: "Taobat",
        day: 4,
        isJeepRequired: true,
        included: true,
        description:
          "Travel from Sharda to Taobat via 4x4 jeep. Visit Halmat village on the way and enjoy free exploration time in Taobat Valley.",
      },
      {
        name: "Taobat to Arangkel",
        location: "Arangkel",
        day: 5,
        isJeepRequired: true,
        included: true,
        description:
          "Jeep transfer toward Kel, doli/cable-car crossing, and trek to Arangkel. Evening free time for sunset and valley views.",
      },
      {
        name: "Arangkel to Keran/Sharda Belt",
        location: "Nagar Valley / Keran",
        day: 6,
        isJeepRequired: false,
        description:
          "Trek back to Kel, continue toward Sharda/Keran, and visit Sharda Bridge and riverside points before hotel check-in.",
      },
      {
        name: "Return to Islamabad",
        location: "Islamabad",
        day: 7,
        isJeepRequired: false,
        description:
          "Breakfast and departure for Islamabad with short stop at Kundal Shahi Waterfall. Tour ends here for Islamabad participants.",
      },
      {
        name: "Karachi Departure Leg",
        location: "Islamabad to Karachi",
        day: 8,
        isJeepRequired: false,
        description:
          "Check-out and self-transfer to bus terminal or railway station for departure to Karachi. Breakfast is not included.",
      },
      {
        name: "Karachi Arrival",
        location: "Karachi",
        day: 9,
        isJeepRequired: false,
        description: "Arrival in Karachi. End of services.",
      },
    ],
    // 4x4 segments are included in this group package.
    mandatoryJeepCost: 0,
  },
};

export function getRouteActivities(routeId: string): RouteActivitiesMap | null {
  return routeActivities[routeId] || null;
}

export function getMandatoryJeepCost(routeId: string): number {
  return routeActivities[routeId]?.mandatoryJeepCost || 0;
}

export function getJeepActivitiesForRoute(routeId: string): RouteActivity[] {
  const activities = routeActivities[routeId];
  if (!activities) return [];
  return activities.activities.filter((a) => a.isJeepRequired);
}
