export type FeaturedTourDay = {
  day: string;
  title: string;
  description: string;
};

export type FeaturedTourCard = {
  slug: string;
  title: string;
  homeImage: string;
  heroImage: string;
  duration: string;
  summary: string;
  description: string;
  highlights: string[];
  itinerary: FeaturedTourDay[];
};

export const featuredTourCards: FeaturedTourCard[] = [
  {
    slug: "kashmir-taobat",
    title: "9 Days Kashmir & Taobat",
    homeImage: "/images/featured-tours/9days-kashmir-taobat.jpg.jpeg",
    heroImage: "/images/destinations/kashmir.jpg",
    duration: "9 Days / 8 Nights",
    summary: "A calm Kashmir circuit with Taobat, Arang Kel, and scenic valley transfers.",
    description:
      "This route focuses on forested landscapes, river crossings, and comfortable pacing so travelers can enjoy Kashmir without rush.",
    highlights: ["Taobat valley", "Arang Kel", "Private transfer", "Family friendly"],
    itinerary: [
      {
        day: "Day 1",
        title: "Departure and Muzaffarabad arrival",
        description: "Travel toward Muzaffarabad, settle in, and enjoy an easy first evening in Kashmir.",
      },
      {
        day: "Day 2",
        title: "Sharda route",
        description: "Move along the river road toward Sharda with scenic stops and a relaxed hotel check-in.",
      },
      {
        day: "Day 3",
        title: "Kel and upper valley journey",
        description: "Continue toward Kel, take in the mountain views, and prepare for the Taobat sector.",
      },
      {
        day: "Day 4",
        title: "Taobat excursion",
        description: "Spend the day exploring Taobat and its remote alpine surroundings.",
      },
      {
        day: "Day 5",
        title: "Arang Kel experience",
        description: "Visit Arang Kel for the best panoramic mountain viewpoints on the route.",
      },
      {
        day: "Day 6",
        title: "Leisure and local exploration",
        description: "Keep the pace slow with local sightseeing, photography stops, and restful downtime.",
      },
      {
        day: "Day 7",
        title: "Return toward Muzaffarabad",
        description: "Begin the return leg with breaks for meals, photos, and smooth transfers.",
      },
      {
        day: "Day 8",
        title: "Overnight on the return route",
        description: "Use the final travel night for a comfortable stop before the last drive home.",
      },
      {
        day: "Day 9",
        title: "Trip completion",
        description: "Wrap up the journey and return with a complete Kashmir experience.",
      },
    ],
  },
  {
    slug: "skardu-deosai",
    title: "10 Days Skardu, Shigar & Shangrila",
    homeImage: "/images/featured-tours/10days-skardu-deosai.jpg.jpeg",
    heroImage: "/images/destinations/skardu.jpg",
    duration: "10 Days / 9 Nights",
    summary: "Experience the best of Skardu with Shigar Fort, Cold Desert, and pristine lakes.",
    description:
      "A complete Skardu circuit featuring Deosai, Shigar Valley with its historic fort, Sarfranga Cold Desert, and the stunning Shangrila Resort at Upper Kachura Lake.",
    highlights: ["Deosai Meadows", "Shigar Fort", "Sarfranga Desert", "Shangrila Resort", "Upper & Lower Kachura Lakes"],
    itinerary: [
      {
        day: "Day 1",
        title: "Departure from Karachi",
        description: "Depart from Karachi via Bus or Train.",
      },
      {
        day: "Day 2",
        title: "Arrival in Islamabad",
        description: "Reach Rawalpindi/Islamabad. Hotel check-in, dinner served in room.",
      },
      {
        day: "Day 3",
        title: "Journey to Chilas",
        description: "Early morning departure at 4:00 AM via Hazara Motorway. Breakfast at Balakot/Besham. Short stops at Kiwai waterfall, Sohni Waterfall, Lulusar Lake, and Babusar Top. Reach Chilas by 8:00 PM.",
      },
      {
        day: "Day 4",
        title: "3 Mountains Range & Shangrila",
        description: "Departure for Skardu at 9:00 AM. Stops at Nanga Parbat View Point, 3-Mountain Junction, and Astak Nala. Visit Upper & Lower Kachura Lakes and Shangrila Resort. Overnight in Skardu.",
      },
      {
        day: "Day 5",
        title: "Shigar Fort & Sarfranga Desert",
        description: "Early breakfast, departure for Manthoka Waterfall at 8:00 AM. Visit Shigar Valley, Shigar Fort, and Sarfranga Cold Desert. Return to Skardu by evening.",
      },
      {
        day: "Day 6",
        title: "Deosai Plains via 4x4 Jeep",
        description: "Full-day expedition to Deosai/Basho Meadows using 4x4 Jeeps. Experience the 'Land of Giants' high-altitude plateau.",
      },
      {
        day: "Day 7",
        title: "Journey to Naran Valley",
        description: "Early breakfast. Estimated 10-12 hour drive to Naran Valley. Arrival and hotel check-in.",
      },
      {
        day: "Day 8",
        title: "Naran Leisure & Return to Islamabad",
        description: "Early breakfast. Visit Jheel Saif-ul-Malook. Departure for Islamabad. Arrival and hotel check-in (Karachi members only).",
      },
      {
        day: "Day 9",
        title: "Departure for Karachi",
        description: "Check-out and travel to Bus Terminal/Railway Station. Departure for Karachi.",
      },
      {
        day: "Day 10",
        title: "Arrival in Karachi",
        description: "Arrive in Karachi. End of tour.",
      },
    ],
  },
  {
    slug: "hunza-skardu",
    title: "12 Days Naran, Hunza, Skardu, Shigar & Deosai",
    homeImage: "/images/featured-tours/12days-hunza-skardu.jpg.jpeg",
    heroImage: "/images/destinations/featured-skardu-hunza-2.jpg",
    duration: "12 Days / 11 Nights",
    summary: "The ultimate northern Pakistan adventure: Naran, Hunza, Skardu, Shigar, and the legendary Deosai Plains.",
    description:
      "A comprehensive tour combining the best of Pakistan's north. Experience Naran's Saif-ul-Malook, Hunza's historic forts and breathtaking views, Skardu's dramatic landscapes, Shigar's heritage fort, and the otherworldly Deosai 'Land of Giants' plateau.",
    highlights: ["Saif-ul-Malook", "Baltit & Altit Forts", "Deosai Meadows", "Shigar Fort", "Attabad Lake", "Passu Cones"],
    itinerary: [
      {
        day: "Day 1",
        title: "Departure from Karachi",
        description: "Depart from Karachi via Bus or Train.",
      },
      {
        day: "Day 2",
        title: "Arrival in Islamabad",
        description: "Reach Rawalpindi/Islamabad. Hotel check-in with dinner served in room.",
      },
      {
        day: "Day 3",
        title: "Journey to Chilas via Hazara Motorway",
        description: "Early morning 4:00 AM departure via Hazara Motorway (12-hour journey). Breakfast at Balakot/Besham. Scenic stops at Kiwai waterfall, Sohni Waterfall, Lulusar Lake, and Babusar Top. Reach Chilas by 8:00 PM.",
      },
      {
        day: "Day 4",
        title: "3 Mountains Range & Shangrila Lakes",
        description: "9:00 AM departure for Skardu. Stops at Nanga Parbat View Point, 3-Mountain Junction, and Astak Nala. Visit Upper & Lower Kachura Lakes and Shangrila Resort. Overnight in Skardu.",
      },
      {
        day: "Day 5",
        title: "Shigar Fort & Sarfranga Cold Desert",
        description: "Breakfast followed by 8:00 AM departure for Manthoka Waterfall. Explore Shigar Valley, historic Shigar Fort, and the stunning Sarfranga Cold Desert. Return to Skardu.",
      },
      {
        day: "Day 6",
        title: "Deosai Expedition via 4x4 Jeep",
        description: "Full-day adventure to Deosai/Basho Meadows using 4x4 Jeeps. Experience the high-altitude 'Land of Giants' plateau with breathtaking views.",
      },
      {
        day: "Day 7",
        title: "Transfer to Hunza Valley",
        description: "9:00 AM departure for Hunza Valley. Scenic stops at 3-Mountain Junction and Rakaposhi viewpoint. Visit Baltit/Altit Forts and Karimabad Bazar. Overnight in Hunza.",
      },
      {
        day: "Day 8",
        title: "China Border & Upper Hunza",
        description: "Breakfast followed by exploration of Attabad Lake, journey toward Khunjerab Pass/China Border, Passu Cones, and Rainbow/Hussaini Suspension Bridge. Return to hotel by evening.",
      },
      {
        day: "Day 9",
        title: "Journey to Naran Valley",
        description: "Breakfast and departure for Naran Valley (10-hour journey). Scenic stops at Kunhar River for river rafting opportunity. Reach Naran and check-in.",
      },
      {
        day: "Day 10",
        title: "Naran Leisure & Return to Islamabad",
        description: "Breakfast followed by visit to Jheel Saif-ul-Malook. Leisure time, then departure for Islamabad. Arrival and hotel check-in (for Karachi members).",
      },
      {
        day: "Day 11",
        title: "Departure for Karachi",
        description: "Check-out from hotel and travel to Bus Terminal/Railway Station. Departure for Karachi.",
      },
      {
        day: "Day 12",
        title: "Arrival in Karachi",
        description: "Arrive in Karachi. End of unforgettable northern adventure.",
      },
    ],
  },
  {
    slug: "hunza-naltar",
    title: "10 Days Naran, Hunza & Naltar",
    homeImage: "/images/featured-tours/10days-hunza-naltar.jpg.jpeg",
    heroImage: "/images/destinations/naltar-valley-pakistan.jpg",
    duration: "10 Days / 9 Nights",
    summary: "A perfect blend of Naran's meadows, Hunza's heritage, and Naltar's hidden alpine beauty.",
    description:
      "Discover the best of northern Pakistan combining Naran Valley with its iconic Saif-ul-Malook, Hunza's majestic forts and turquoise lakes, and the serene, lesser-known Naltar Valley with its pristine alpine lakes.",
    highlights: ["Naltar Alpine Lakes", "Baltit Fort", "Attabad Lake", "Hunza Heritage", "Kunhar River", "Saif-ul-Malook"],
    itinerary: [
      {
        day: "Day 1",
        title: "Departure from Karachi",
        description: "Depart from Karachi via Bus or Train.",
      },
      {
        day: "Day 2",
        title: "Arrival in Islamabad",
        description: "Reach Rawalpindi/Islamabad. Hotel check-in with dinner served in room.",
      },
      {
        day: "Day 3",
        title: "Journey to Chilas",
        description: "Early morning 4:00 AM departure via Hazara Motorway (12-hour journey). Breakfast at Balakot/Besham. Short stops at scenic waterfalls and Lulusar Lake. Reach Chilas by 8:00 PM.",
      },
      {
        day: "Day 4",
        title: "Naltar Valley & Hunza Arrival",
        description: "Departure for Naltar Valley, transfer to 4x4 Jeeps at Nomal, explore Naltar Lakes (weather permitting). Continue journey towards Hunza Valley. Reach Hunza and check-in. Overnight in Hunza.",
      },
      {
        day: "Day 5",
        title: "Upper Hunza & China Border",
        description: "Breakfast followed by departure for Attabad Lake. Journey toward Khunjerab Pass/China Border or explore Gulmit & Borith Lake. Visit Passu Cones and Rainbow/Hussaini Suspension Bridge. Return by evening.",
      },
      {
        day: "Day 6",
        title: "Nagar Valley Heritage",
        description: "Breakfast and departure for Baltit Fort. Visit Baltit Fort & Karimabad Traditional Bazar. Explore Hoper Glacier and Nagar Natural Cricket Ground. Return to hotel.",
      },
      {
        day: "Day 7",
        title: "Journey to Naran Valley",
        description: "Breakfast and departure for Naran Valley. Scenic stops at Nanga Parbat View Point, 3-Mountain Junction, and Kunhar River (river rafting opportunity). Reach Naran Valley and check-in.",
      },
      {
        day: "Day 8",
        title: "Naran Leisure & Return to Islamabad",
        description: "Breakfast followed by visit to Jheel Saif-ul-Malook. Leisure time and then departure for Islamabad. Arrival and hotel check-in (for Karachi members).",
      },
      {
        day: "Day 9",
        title: "Departure for Karachi",
        description: "Check-out from hotel and travel to Bus Terminal/Railway Station. Departure for Karachi.",
      },
      {
        day: "Day 10",
        title: "Arrival in Karachi",
        description: "Arrive in Karachi. End of tour with memories of Hunza, Naltar, and Naran.",
      },
    ],
  },
];

export const featuredTourRoutePaths = featuredTourCards.map((tour) => `/tours/featured/${tour.slug}`);

export function getFeaturedTourBySlug(slug: string) {
  return featuredTourCards.find((tour) => tour.slug === slug);
}