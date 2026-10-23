export type NorthernAirTour = {
  id: string;
  title: string;
  image: string;
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
};

export const northernAirTours: NorthernAirTour[] = [
  {
    id: "skardu-hunza-8-days",
    title: "Skardu & Hunza · 8 Days by Air",
    image: "/images/northern-air-tours/skardu-hunza-8-days.webp",
    itinerary: [
      { day: 1, title: "Arrive in Skardu", description: "Fly to Skardu, visit Shangrila Resort and Upper Kachura Lake, then stay overnight in Skardu." },
      { day: 2, title: "Shigar Valley", description: "Visit Manthoka Waterfall, Shigar Fort and Sarfaranga Cold Desert. Optional activities include jeep safari, quad biking, horse riding and paragliding. Overnight in Skardu." },
      { day: 3, title: "Basho Meadows", description: "Travel by 4x4 toward Basho Meadows, with stops at Sadpara Lake, Bara Pani, Kala Pani and Sheosar Lake. Return to Skardu for the night." },
      { day: 4, title: "Chunda Valley", description: "Explore Chunda Valley and Skardu local bazaar. Overnight in Skardu." },
      { day: 5, title: "Travel to Hunza", description: "Drive to Hunza via Three Mountains Junction and Rakaposhi View Point. Visit Altit and Baltit Forts, then stay overnight in Hunza." },
      { day: 6, title: "Upper Hunza and Khunjerab", description: "Visit Attabad Lake, Passu Cones, Hussaini Suspension Bridge and Khunjerab Pass. Boating and jet-ski activities are optional. Overnight in Hunza." },
      { day: 7, title: "Travel to Gilgit", description: "Travel to Gilgit City and stay overnight." },
      { day: 8, title: "Departure", description: "Travel toward Islamabad; confirm the return flight and final transfer arrangements when booking." },
    ],
  },
  {
    id: "skardu-4-days",
    title: "Skardu · 4 Days",
    image: "/images/northern-air-tours/skardu-4-days.webp",
    itinerary: [
      { day: 1, title: "Arrive in Skardu", description: "Airport pickup, visit Shangrila Resort and Upper Kachura Lake, then stay overnight in Skardu." },
      { day: 2, title: "Deosai National Park", description: "Travel by 4x4 to Deosai, stopping at Sadpara Lake, Bara Pani and Kala Pani, and visit Sheosar Lake. Overnight in Skardu." },
      { day: 3, title: "Kharmang and Shigar", description: "Visit Manthoka and Khamosh Waterfalls, Shigar Valley, Shigar Fort and Sarfaranga Cold Desert. Optional local activities are available. Overnight in Skardu." },
      { day: 4, title: "Departure", description: "Transfer to Skardu Airport; tour services end." },
    ],
  },
  {
    id: "skardu-5-days",
    title: "Skardu · 5 Days",
    image: "/images/northern-air-tours/skardu-5-days.webp",
    itinerary: [
      { day: 1, title: "Arrive in Skardu", description: "Airport pickup, visit Shangrila Resort, Upper Kachura Lake and Soq Valley. Overnight in Skardu." },
      { day: 2, title: "Basho Meadows", description: "Travel by 4x4 to Basho Meadows and Basho Bridge, enjoy the valley, then return to Skardu for the night." },
      { day: 3, title: "Shigar Valley", description: "Visit Manthoka Waterfall, Shigar Valley, Shigar Fort and Sarfaranga Cold Desert. Optional local activities are available. Overnight in Skardu." },
      { day: 4, title: "Chunda Valley", description: "Travel by 4x4 to Satpara and Chunda Valley, enjoy the views and return to Skardu for the night." },
      { day: 5, title: "Departure", description: "Transfer to Skardu Airport; tour services end." },
    ],
  },
  {
    id: "skardu-6-days",
    title: "Skardu · 6 Days",
    image: "/images/northern-air-tours/skardu-6-days.webp",
    itinerary: [
      { day: 1, title: "Arrive in Skardu", description: "Airport pickup, visit Shangrila Resort, Upper Kachura Lake and Soq Valley. Overnight in Skardu." },
      { day: 2, title: "Shigar Valley", description: "Visit Manthoka Waterfall, Shigar Valley, Shigar Fort and Sarfaranga Cold Desert. Optional local activities are available. Overnight in Skardu." },
      { day: 3, title: "Deosai National Park", description: "Travel by 4x4 to Deosai, stopping at Sadpara Lake, Bara Pani and Kala Pani, and visit Sheosar Lake. Overnight in Skardu." },
      { day: 4, title: "Basho Meadows", description: "Travel by 4x4 toward Basho Meadows and Basho Bridge. Enjoy the views, then return to Skardu for the night." },
      { day: 5, title: "Chunda Valley", description: "Travel by 4x4 to Satpara and Chunda Valley, enjoy the scenery and return to Skardu for the night." },
      { day: 6, title: "Departure", description: "Transfer to Skardu Airport; tour services end." },
    ],
  },
  {
    id: "skardu-7-days",
    title: "Skardu · 7 Days",
    image: "/images/northern-air-tours/skardu-7-days.webp",
    itinerary: [
      { day: 1, title: "Arrive in Skardu", description: "Airport pickup, visit Shangrila Resort and Upper Kachura Lake. Dinner and overnight stay in Skardu." },
      { day: 2, title: "Deosai National Park", description: "Travel by 4x4 to Deosai, stopping at Sadpara Lake, Bara Pani and Kala Pani, and visit Sheosar Lake. Overnight in Skardu." },
      { day: 3, title: "Shigar Valley", description: "Visit Katpana Desert, Shigar View Point, Blind Lake, Serena Shigar Fort and Sarfaranga Cold Desert. Optional activities are available. Overnight in Skardu." },
      { day: 4, title: "Khaplu Valley", description: "Visit Serena Khaplu Palace, Chaqchan Mosque, a local lake and Khaplu View Point, then return to Skardu for the night." },
      { day: 5, title: "Basho Meadows", description: "Travel by 4x4 to Basho Meadows and Basho Bridge, enjoy the views, then return to Skardu for the night." },
      { day: 6, title: "Kharmang Valley", description: "Visit Manthoka and Khamosh Waterfalls, then return to Skardu for the night." },
      { day: 7, title: "Departure", description: "Transfer to Skardu Airport; tour services end." },
    ],
  },
  {
    id: "skardu-8-days",
    title: "Skardu · 8 Days",
    image: "/images/northern-air-tours/skardu-8-days.webp",
    itinerary: [
      { day: 1, title: "Arrive in Skardu", description: "Airport pickup, visit Shangrila Resort and Upper Kachura Lake. Overnight in Skardu." },
      { day: 2, title: "Deosai National Park", description: "Travel by 4x4 to Deosai, stopping at Sadpara Lake, Bara Pani and Kala Pani, and visit Sheosar Lake. Overnight in Skardu." },
      { day: 3, title: "Kharmang Valley", description: "Visit Manthoka Waterfall and Kharmang Valley, then return to Skardu for the night." },
      { day: 4, title: "Naltar Valley", description: "Travel toward Naltar Lakes, enjoy time by the lake and stay overnight in Naltar Valley." },
      { day: 5, title: "Basho Meadows", description: "Travel by 4x4 to Basho Meadows and Basho Bridge, enjoy the views and stay overnight in Basho." },
      { day: 6, title: "Shigar Valley", description: "Visit Katpana Desert, Shigar View Point, Blind Lake, Serena Shigar Fort and Sarfaranga Cold Desert. Optional activities are available. Overnight in Skardu." },
      { day: 7, title: "Deosai excursion", description: "Take a full-day 4x4 excursion to Deosai, with stops including Kala Pani, Bara Pani, Ali Malik and Sheosar Lake. Return to Skardu for the night." },
      { day: 8, title: "Departure", description: "Transfer to Skardu Airport; tour services end." },
    ],
  },
  {
    id: "skardu-hunza-7-days",
    title: "Skardu & Hunza · 7 Days",
    image: "/images/northern-air-tours/skardu-hunza-7-days.webp",
    itinerary: [
      { day: 1, title: "Arrive in Skardu", description: "Fly to Skardu, visit Shangrila Resort, Upper Kachura Lake and Soq Valley. Overnight in Skardu." },
      { day: 2, title: "Travel to Hunza", description: "Travel via Three Mountains Junction and Rakaposhi View Point. Visit Altit and Baltit Forts, then stay overnight in Hunza." },
      { day: 3, title: "Upper Hunza and Khunjerab", description: "Visit Attabad Lake, Passu Cones, Khunjerab Pass and Hussaini Suspension Bridge. Optional lake activities are available. Overnight in Hunza." },
      { day: 4, title: "Return to Skardu", description: "Travel approximately six hours to Skardu and stay overnight." },
      { day: 5, title: "Shigar Valley", description: "Visit Manthoka Waterfall, Shigar Fort and Sarfaranga Cold Desert. Optional activities are available. Overnight in Skardu." },
      { day: 6, title: "Deosai or Basho", description: "Take a 4x4 excursion toward Deosai or Basho, with stops at Sadpara Lake, Bara Pani, Kala Pani and Sheosar Lake. Overnight in Skardu." },
      { day: 7, title: "Departure", description: "Transfer to Skardu Airport; tour services end." },
    ],
  },
  {
    id: "skardu-deosai-8-days",
    title: "Skardu & Deosai · 8 Days",
    image: "/images/northern-air-tours/skardu-deosai-8-days.webp",
    itinerary: [
      { day: 1, title: "Arrive in Skardu", description: "The poster itinerary starts with arrival at Skardu Airport, a visit to Shangrila Resort and Upper Kachura Lake, then an overnight stay in Skardu." },
      { day: 2, title: "Travel to Hunza", description: "Travel via Three Mountains Junction and Rakaposhi View Point. Visit Baltit Fort and Karimabad Bazaar, then stay overnight in Hunza." },
      { day: 3, title: "Upper Hunza", description: "Visit Attabad Lake, Passu Rainbow Bridge, Hussaini Suspension Bridge and Altit Fort, then return to Hunza for the night." },
      { day: 4, title: "Return to Skardu", description: "Travel toward Skardu with a stop at Astak Nala, then stay overnight in Skardu." },
      { day: 5, title: "Kharmang and Shigar", description: "Visit Manthoka Waterfall, then travel to Shigar Valley, Shigar Fort and Sarfaranga Cold Desert. Optional activities are available. Overnight in Skardu." },
      { day: 6, title: "Deosai National Park", description: "Travel by 4x4 to Deosai, visiting Kala Pani, Bara Pani and Sheosar Lake, then return to Skardu for the night." },
      { day: 7, title: "Basho Meadows", description: "Visit Basho Meadows, the historic Basho hanging rock and Basho Forest. Enjoy riverside leisure time, then stay overnight in Skardu." },
      { day: 8, title: "Departure", description: "Transfer to Skardu Airport; the poster notes the tour ends with return to Karachi." },
    ],
  },
  {
    id: "skardu-minimerg-8-days",
    title: "Skardu & Minimerg · 8 Days",
    image: "/images/northern-air-tours/skardu-minimerg-8-days.webp",
    itinerary: [
      { day: 1, title: "Arrive in Skardu", description: "The poster itinerary starts with arrival at Skardu Airport, hotel check-in and time to explore Skardu Bazaar and Katpana Cold Desert. Overnight in Skardu." },
      { day: 2, title: "Shigar Valley", description: "Visit Blue Lake, Serena Shigar Fort and Sarfaranga Cold Desert. Optional jeep safari, quad biking, horse riding and paragliding are available. Overnight in Skardu." },
      { day: 3, title: "Minimerg via Deosai", description: "Travel by 4x4 via Deosai, stopping at Sadpara Lake, Bara Pani, Kala Pani and Sheosar Lake, with photography at Burzil Top. Stay overnight in Chillam Chowki or Domel." },
      { day: 4, title: "Domel Valley", description: "Continue through Domel Valley, enjoy riverside and forest leisure time, and visit Rainbow and Crystal Lake. Stay overnight in camps." },
      { day: 5, title: "Return to Skardu", description: "Return to Skardu via the same route, stopping at points along the way. Check in to the hotel and stay overnight in Skardu." },
      { day: 6, title: "Manthoka Waterfall", description: "Visit Manthoka Waterfall and enjoy leisure time by the river. Return to the hotel for the night." },
      { day: 7, title: "Shangrila and Upper Kachura", description: "Visit Shangrila Resort, Upper Kachura Lake and Soq Valley. Overnight in Skardu." },
      { day: 8, title: "Departure", description: "Enjoy the final morning in Skardu, then transfer to the airport for the return flight." },
    ],
  },
  {
    id: "skardu-minimerg-bilamik-8-days",
    title: "Skardu, Minimerg & Bilamik · 8 Days",
    image: "/images/northern-air-tours/skardu-minimerg-bilamik-8-days.webp",
    itinerary: [
      { day: 1, title: "Arrive in Skardu", description: "Fly from Karachi to Skardu, visit Shangrila Resort and Upper Kachura Lake, then check in and stay overnight in Skardu." },
      { day: 2, title: "Shigar Valley", description: "Visit Blue Lake, Serena Shigar Fort and Sarfaranga Cold Desert. Optional jeep safari, quad biking, horse riding and paragliding are available. Overnight in Skardu." },
      { day: 3, title: "Minimerg via Deosai", description: "Travel by 4x4 via Deosai, stopping at Sadpara Lake, Bara Pani, Kala Pani and Sheosar Lake, with photography at Burzil Top. Stay overnight in Chillam Chowki or Domel." },
      { day: 4, title: "Domel Valley", description: "Continue through Domel Valley, enjoy riverside and forest leisure time, and visit Rainbow and Crystal Lake. Stay overnight in camps." },
      { day: 5, title: "Return to Skardu", description: "Return to Skardu via the same route, stopping at points along the way. Check in to the hotel and stay overnight in Skardu." },
      { day: 6, title: "Manthoka Waterfall", description: "Visit Manthoka Waterfall and enjoy leisure time by the river. Return to the hotel for the night." },
      { day: 7, title: "Bilamik Valley", description: "Travel by 4x4 Prado to Bilamik Valley and spend the day exploring. Return to Skardu for the night." },
      { day: 8, title: "Departure", description: "Enjoy the final morning in Skardu, then transfer to the airport for the return flight." },
    ],
  },
];
