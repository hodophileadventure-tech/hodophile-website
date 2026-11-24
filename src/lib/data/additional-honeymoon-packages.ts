export type AdditionalHoneymoonPackage = {
  slug: string;
  name: string;
  duration: string;
  detail: string;
  price?: string;
  image: string;
  title: string;
  description: string;
  overview: string;
  attractions: string[];
  itinerary?: { day: string; title: string; description: string }[];
  includes: string[];
  excluded: string[];
  bookingPolicy: string[];
  childPolicy: string[];
  mealsMenu: { breakfast: string; dinner: string };
  detailSections: { title: string; content: string[] }[];
};

const sharedIncludes = [
  "Private couple transport with driver",
  "Hotel accommodation on sharing basis",
  "Breakfast as per hotel plan",
  "Route planning and trip coordination",
  "Basic sightseeing as per itinerary",
];

const sharedExcluded = [
  "Personal expenses and shopping",
  "Entry tickets, jeep rides, and optional activities unless mentioned",
  "Lunch and extra meals not listed",
  "Travel insurance",
  "Extra charges caused by weather, road closures, or itinerary changes",
];

const sharedBookingPolicy = [
  "A 50% advance payment confirms the booking.",
  "The remaining payment is due before departure.",
  "Hotels, transport, and activities remain subject to availability at confirmation.",
  "Package tier, room category, and final route are confirmed in the quotation.",
];

const sharedChildPolicy = [
  "Package rates are quoted per couple unless otherwise confirmed.",
  "Children, extra adults, or additional rooms can be added on request.",
  "Any child or extra-person charges will be shared in the final quotation.",
];

const sharedMeals = {
  breakfast: "Daily breakfast at the hotel as per the selected meal plan.",
  dinner: "Dinner can be arranged where included in the selected hotel/package tier.",
};

const honeymoonPackages: Array<
  Omit<
    AdditionalHoneymoonPackage,
    "title" | "description" | "overview" | "attractions" | "itinerary" | "includes" | "excluded" | "bookingPolicy" | "childPolicy" | "mealsMenu" | "detailSections"
  > & { standard: string; deluxe: string; executive: string; attractions: string[]; itinerary?: { day: string; title: string; description: string }[] }
> = [
  {
    slug: "moonlit-hunza-skardu-8-days",
    name: "Moonlit Hunza & Skardu Honeymoon",
    duration: "8 Days / 7 Nights",
    detail: "A romantic 8-day Hunza and Skardu honeymoon with mountain valleys, lakeside views, and per-couple Standard, Deluxe, and Executive options.",
    price: "PKR 220,000 / couple",
    image: "/images/package-cards/images__honeymoon__hunza-deluxe.webp",
    standard: "PKR 220,000",
    deluxe: "PKR 300,000",
    executive: "PKR 400,000",
    attractions: ["Hunza Valley", "Karimabad", "Attabad Lake", "Skardu", "Shangrila/Upper Kachura area", "Mountain viewpoints"],
    itinerary: [
      { day: "Day 1", title: "Arrive in Skardu", description: "Arrive in Skardu as per the confirmed travel plan. Visit Shangrila Resort and Upper Kachura Lake, then stay overnight in Skardu." },
      { day: "Day 2", title: "Shigar Valley", description: "Visit Manthoka Waterfall, Shigar Fort, and Sarfaranga Cold Desert. Optional activities include jeep safari, quad biking, horse riding, and paragliding. Overnight in Skardu." },
      { day: "Day 3", title: "Basho Meadows", description: "Travel by 4x4 toward Basho Meadows, with stops at Sadpara Lake, Bara Pani, Kala Pani, and Sheosar Lake. Return to Skardu for the night." },
      { day: "Day 4", title: "Chunda Valley", description: "Explore Chunda Valley and Skardu local bazaar. Overnight in Skardu." },
      { day: "Day 5", title: "Travel to Hunza", description: "Drive to Hunza via Three Mountains Junction and Rakaposhi View Point. Visit Altit and Baltit Forts, then stay overnight in Hunza." },
      { day: "Day 6", title: "Upper Hunza and Khunjerab", description: "Visit Attabad Lake, Passu Cones, Hussaini Suspension Bridge, and Khunjerab Pass. Boating and jet-ski activities are optional. Overnight in Hunza." },
      { day: "Day 7", title: "Travel to Gilgit", description: "Travel to Gilgit City and stay overnight." },
      { day: "Day 8", title: "Departure", description: "Departure as per the confirmed travel plan and return arrangements." },
    ],
  },
  {
    slug: "skardu-lakeside-love-retreat-6-days",
    name: "Skardu Lakeside Love Retreat",
    duration: "6 Days / 5 Nights",
    detail: "A dreamy 6-day Skardu couple escape with serene lakes, cool valleys, and tiered per-couple pricing.",
    price: "PKR 150,000 / couple",
    image: "/images/package-cards/destination-skardu-mountains-detail.webp",
    standard: "PKR 150,000",
    deluxe: "PKR 230,000",
    executive: "PKR 340,000",
    attractions: ["Skardu Valley", "Upper Kachura Lake", "Shigar or local viewpoints", "Katpana/Cold Desert area", "Riverside scenery"],
    itinerary: [
      { day: "Day 1", title: "Arrive in Skardu", description: "Arrive in Skardu as per the confirmed travel plan. Visit Shangrila Resort, Upper Kachura Lake, and Soq Valley. Overnight in Skardu." },
      { day: "Day 2", title: "Shigar Valley", description: "Visit Manthoka Waterfall, Shigar Valley, Shigar Fort, and Sarfaranga Cold Desert. Optional local activities are available. Overnight in Skardu." },
      { day: "Day 3", title: "Deosai National Park", description: "Travel by 4x4 to Deosai, stopping at Sadpara Lake, Bara Pani, and Kala Pani, and visit Sheosar Lake. Overnight in Skardu." },
      { day: "Day 4", title: "Basho Meadows", description: "Travel by 4x4 toward Basho Meadows and Basho Bridge. Enjoy the views, then return to Skardu for the night." },
      { day: "Day 5", title: "Chunda Valley", description: "Travel by 4x4 to Satpara and Chunda Valley, enjoy the scenery, and return to Skardu for the night." },
      { day: "Day 6", title: "Departure", description: "Departure/transfer as per the confirmed travel plan." },
    ],
  },
  {
    slug: "fairy-meadows-moonlight-escape-5-days",
    name: "Fairy Meadows Moonlight Escape",
    duration: "5 Days / 4 Nights",
    detail: "A magical 5-day Fairy Meadows honeymoon for couples who want starry nights, alpine meadows, and unforgettable views.",
    price: "PKR 140,000 / couple",
    image: "/images/destinations/fairy-meadows-unsplash.webp",
    standard: "PKR 140,000",
    deluxe: "PKR 220,000",
    executive: "PKR 330,000",
    attractions: ["Fairy Meadows", "Nanga Parbat viewpoints", "Alpine meadows", "Beyal Camp area (as accessible)", "Scenic jeep track experience"],
    itinerary: [
      { day: "Day 1", title: "Islamabad to Chilas", description: "Travel from Islamabad to Chilas, stopping at Balakot, Lulusar Lake, and Babusar Top. Dinner and overnight stay in Chilas." },
      { day: "Day 2", title: "Raikot Bridge to Fairy Meadows", description: "Travel to Raikot Bridge, take a 4x4 jeep to Tattu Village (about 2 hours), then trek 3-4 hours to Fairy Meadows. Dinner, bonfire, and overnight stay." },
      { day: "Day 3", title: "Beyal Camp and Fairy Meadows", description: "Hike to Beyal Camp for views of Nanga Parbat, return to Fairy Meadows, and visit Reflection Lake." },
      { day: "Day 4", title: "Return Trek and Drive", description: "Trek back to Tattu Village, take a jeep to Chilas or Naran, then check in for dinner and overnight stay." },
      { day: "Day 5", title: "Return Journey", description: "Depart for Islamabad or Lahore, with stops en route as per the travel plan." },
    ],
  },
  {
    slug: "astore-valley-romance-trail-6-days",
    name: "Astore Valley Romance Trail",
    duration: "6 Days / 5 Nights",
    detail: "A peaceful 6-day Astore honeymoon through green valleys and mountain landscapes with Standard, Deluxe, and Executive tiers.",
    price: "PKR 160,000 / couple",
    image: "/images/package-cards/images__astore-ready.webp",
    standard: "PKR 160,000",
    deluxe: "PKR 245,000",
    executive: "PKR 325,000",
    attractions: ["Astore Valley", "Rama Meadows (seasonal)", "Rama Lake area (as accessible)", "Mountain streams", "Scenic valley drives"],
    itinerary: [
      {
        day: "Day 01",
        title: "Islamabad to Chilas",
        description:
          "• Early morning departure from Islamabad.\n• Drive through Hazara Motorway, Balakot and Kaghan Valley.\n• Visit Naran and Lulusar Lake.\n• Cross the scenic Babusar Top, subject to road accessibility.\n• Arrival in Chilas and hotel check-in.\n• Dinner and relaxation.\nNight stay: Chilas.",
      },
      {
        day: "Day 02",
        title: "Chilas to Astore & Rama Meadows",
        description:
          "• Breakfast at the hotel.\n• Departure towards Astore Valley.\n• Enjoy scenic mountain and riverside views along the journey.\n• Arrival in Astore and hotel check-in.\n• Visit the beautiful Rama Meadows.\n• Enjoy peaceful walks surrounded by pine forests and mountains.\n• Romantic photography amidst natural landscapes.\n• Return to the hotel.\nNight stay: Astore.",
      },
      {
        day: "Day 03",
        title: "Rama Lake Exploration",
        description:
          "• Breakfast at the hotel.\n• Departure towards Rama Lake.\n• Enjoy a scenic jeep ride and hike, depending on road conditions.\n• Witness breathtaking views of snow-covered mountains.\n• Spend quality time beside the peaceful alpine lake.\n• Enjoy a romantic picnic surrounded by nature.\n• Return to the hotel for a relaxing evening.\nNight stay: Astore.",
      },
      {
        day: "Day 04",
        title: "Minimarg, Domel & Rainbow Lake",
        description:
          "• Early morning breakfast.\n• Departure via 4×4 jeep towards Minimarg.\n• Travel through Chilam and Burzil Pass.\n• Explore the picturesque Minimarg Valley.\n• Visit Domel Valley and Rainbow Lake.\n• Enjoy intimate moments surrounded by lush green meadows and crystal-clear water.\n• Couple photography and leisure time.\n• Return to Astore before evening, subject to travel conditions.\nNight stay: Astore.",
      },
      {
        day: "Day 05",
        title: "Astore to Naran",
        description:
          "• Breakfast and hotel check-out.\n• Departure towards Naran via Chilas.\n• Scenic drive through Babusar Top.\n• Photography stops along the journey.\n• Arrival in Naran and hotel check-in.\n• Enjoy an evening walk along the Kunhar River.\n• Romantic dinner and leisure time.\nNight stay: Naran.",
      },
      {
        day: "Day 06",
        title: "Naran to Islamabad",
        description:
          "• Breakfast at the hotel.\n• Hotel check-out and departure towards Islamabad.\n• Travel through Kaghan, Balakot and Mansehra.\n• Refreshment and photography stops along the way.\n• Arrival in Islamabad.\n• End of a memorable romantic journey.",
      },
    ],
  },
  {
    slug: "skardu-astore-dream-getaway-8-days",
    name: "Skardu & Astore Dream Getaway",
    duration: "8 Days / 7 Nights",
    detail: "An enchanting 8-day Skardu and Astore couple journey combining lakes, valleys, and romantic mountain scenery.",
    price: "PKR 220,000 / couple",
    image: "/images/package-cards/skardu-home-card.webp",
    standard: "PKR 220,000",
    deluxe: "PKR 300,000",
    executive: "PKR 400,000",
    attractions: ["Skardu", "Astore Valley", "Lakes and riverside views", "Mountain passes (seasonal access)", "Scenic photo stops"],
      itinerary: [
      {
        day: "Day 01",
        title: "Islamabad to Chilas",
        description: "- Early morning departure from Islamabad.\n- Drive through Hazara Motorway, Balakot and Kaghan Valley.\n- Visit Lulusar Lake and Babusar Top, subject to accessibility.\n- Arrival in Chilas and hotel check-in.\n- Dinner and relaxation.\nNight stay: Chilas.",
      },
      {
        day: "Day 02",
        title: "Chilas to Skardu",
        description: "- Breakfast and hotel check-out.\n- Departure towards Skardu via Jaglot.\n- Enjoy breathtaking views along the Indus River.\n- Arrival in Skardu and hotel check-in.\n- Explore Skardu city and the local bazaar.\n- Enjoy a relaxing evening together.\nNight stay: Skardu.",
      },
      {
        day: "Day 03",
        title: "Kachura Lakes & Soq Valley",
        description: "- Breakfast at the hotel.\n- Visit Shangrila Resort and Lower Kachura Lake.\n- Explore the picturesque Upper Kachura Lake.\n- Enjoy an optional romantic boating experience.\n- Visit Soq Valley and enjoy its peaceful natural surroundings.\n- Couple photography and riverside leisure time.\n- Return to the hotel.\nNight stay: Skardu.",
      },
      {
        day: "Day 04",
        title: "Shigar Valley & Cold Desert",
        description: "- Breakfast at the hotel.\n- Explore the magnificent Sarfaranga Cold Desert.\n- Optional ATV and jeep safari activities.\n- Visit the historic Shigar Fort.\n- Explore the traditional villages and beautiful landscapes of Shigar Valley.\n- Enjoy sunset photography and a romantic evening.\nNight stay: Skardu.",
      },
      {
        day: "Day 05",
        title: "Skardu to Astore via Deosai",
        description: "- Early morning breakfast and hotel check-out.\n- Departure via 4×4 jeep towards Deosai National Park.\n- Sightseeing at Sadpara Lake.\n- Explore Deosai Plains, Bara Pani and Kala Pani.\n- Visit the magnificent Sheosar Lake.\n- Enjoy panoramic mountain views and couple photography.\n- Continue towards Astore via Chilam Chowki.\n- Hotel check-in and relaxation.\nNight stay: Astore.",
      },
      {
        day: "Day 06",
        title: "Minimarg, Domel & Rainbow Lake",
        description: "- Early morning breakfast.\n- Departure via 4×4 jeep towards Minimarg.\n- Cross the breathtaking Burzil Pass.\n- Explore the picturesque Minimarg Valley.\n- Visit Domel Valley and Rainbow Lake.\n- Enjoy peaceful moments amidst lush green meadows.\n- Romantic photography and leisure time.\n- Return to Astore.\nNight stay: Astore.",
      },
      {
        day: "Day 07",
        title: "Astore to Naran",
        description: "- Early morning breakfast and hotel check-out.\n- Departure towards Naran via Chilas.\n- Cross Babusar Top.\n- Enjoy scenic photography stops along the journey.\n- Arrival in Naran and hotel check-in.\n- Evening walk beside the Kunhar River.\n- Romantic dinner and relaxation.\nNight stay: Naran.",
      },
      {
        day: "Day 08",
        title: "Naran to Islamabad",
        description: "- Breakfast at the hotel.\n- Hotel check-out and departure towards Islamabad.\n- Drive through Kaghan Valley, Balakot and Mansehra.\n- Refreshment stops along the way.\n- Arrival and drop-off in Islamabad.\n- End of a memorable romantic journey.",
      },
    ],
  },
  {
    slug: "swat-sweetheart-mini-escape-3-days",
    name: "Swat Sweetheart Mini Escape",
    duration: "3 Days / 2 Nights",
    detail: "A short and sweet 3-day Swat honeymoon break with river views, cool breezes, and cozy couple time.",
    price: "PKR 100,000 / couple",
    image: "/images/package-cards/images__swat-valley.webp",
    standard: "PKR 100,000",
    deluxe: "PKR 150,000",
    executive: "PKR 200,000",
    attractions: ["Swat Valley", "Malam Jabba area (optional)", "Fizagat/river viewpoints", "Local markets", "Scenic valley drives"],
      itinerary: [
      {
        day: "Day 01",
        title: "Islamabad to Swat & Malam Jabba",
        description: "- Early morning departure from Islamabad.\n- Travel through Swat Motorway.\n- Arrival in Swat Valley.\n- Visit the beautiful Malam Jabba Ski Resort.\n- Enjoy an optional chairlift and zipline experience.\n- Explore scenic mountain viewpoints.\n- Romantic photography amidst the picturesque landscapes.\n- Departure towards Fizagat and hotel check-in.\n- Enjoy a relaxing evening together.\nNight stay: Swat.",
      },
      {
        day: "Day 02",
        title: "Bahrain & Kalam Valley Exploration",
        description: "- Breakfast at the hotel.\n- Departure towards Kalam Valley.\n- Explore Bahrain and its beautiful riverside surroundings.\n- Visit the enchanting Ushu Forest.\n- Explore the scenic Matiltan Waterfall, subject to road accessibility.\n- Enjoy peaceful nature walks and couple photography.\n- Hotel check-in at Kalam.\n- Spend a romantic evening beside the Swat River.\nNight stay: Kalam.",
      },
      {
        day: "Day 03",
        title: "Kalam to Islamabad",
        description: "- Breakfast at the hotel.\n- Enjoy a peaceful morning surrounded by mountains.\n- Hotel check-out and departure towards Islamabad.\n- Scenic drive through Bahrain, Madyan and Swat Valley.\n- Refreshment and photography stops along the journey.\n- Arrival and drop-off in Islamabad.\n- End of a beautiful romantic escape.",
      },
    ],
  },
  {
    slug: "kashmir-whispering-hills-retreat-3-days",
    name: "Kashmir Whispering Hills Retreat",
    duration: "3 Days / 2 Nights",
    detail: "A romantic 3-day Kashmir getaway with lush green hills, riverside moments, and peaceful couple stays.",
    price: "PKR 100,000 / couple",
    image: "/images/package-cards/destination-kashmir-valley-detail.webp",
    standard: "PKR 100,000",
    deluxe: "PKR 150,000",
    executive: "PKR 200,000",
    attractions: ["Azad Kashmir valleys", "Keran or nearby riverside views", "Scenic viewpoints", "Pine-covered hills", "Relaxed couple time"],
      itinerary: [
      {
        day: "Day 01",
        title: "Islamabad to Kashmir & Keran",
        description: "- Early morning departure from Islamabad.\n- Scenic drive towards Muzaffarabad.\n- Visit Dhani Waterfall.\n- Explore the beautiful landscapes of Neelum Valley.\n- Short sightseeing stop at Kundal Shahi.\n- Arrival in Keran and hotel check-in.\n- Enjoy breathtaking views of the Neelum River.\n- Romantic riverside walk and photography.\n- Dinner and relaxation.\nNight stay: Keran.",
      },
      {
        day: "Day 02",
        title: "Upper Neelum & Sharda Exploration",
        description: "- Breakfast at the hotel.\n- Departure towards Upper Neelum.\n- Witness panoramic views of the valley and surrounding mountains.\n- Continue towards the picturesque Sharda Valley.\n- Explore Sharda village and its historic heritage.\n- Enjoy scenic riverside views and peaceful nature walks.\n- Spend quality time together amidst breathtaking landscapes.\n- Return to Keran for a cozy evening.\nNight stay: Keran.",
      },
      {
        day: "Day 03",
        title: "Keran to Islamabad via Kutton",
        description: "- Breakfast and hotel check-out.\n- Departure towards Kutton Valley.\n- Visit the beautiful Kutton Waterfall.\n- Enjoy scenic photography and refreshments.\n- Continue towards Islamabad via Muzaffarabad.\n- Arrival and drop-off in Islamabad.\n- End of a memorable romantic getaway.\nOvernight stay summary\nDestination	Nights\nKeran	2\nTotal	2 Nights\n\nRomantic highlights\n- Romantic riverside accommodation in Keran.\n- Panoramic mountain views from Upper Neelum.\n- Peaceful walks through Kashmir's natural landscapes.\n- Waterfall photography at Dhani and Kutton.\n- Cozy evenings overlooking the Neelum River.\n- Candlelight dinner (optional arrangement).",
      },
    ],
  },
  {
    slug: "swat-valley-lovers-hideaway-4-days",
    name: "Swat Valley Lovers' Hideaway",
    duration: "4 Days / 3 Nights",
    detail: "A charming 4-day Swat honeymoon with valley scenery, relaxed pacing, and Standard, Deluxe, and Executive per-couple tiers.",
    price: "PKR 120,000 / couple",
    image: "/images/destinations/swat-hd.webp",
    standard: "PKR 120,000",
    deluxe: "PKR 180,000",
    executive: "PKR 220,000",
    attractions: ["Swat Valley", "Mingora/Malam Jabba surroundings", "Riverside spots", "Green hills", "Local sightseeing"],
      itinerary: [
      {
        day: "Day 01",
        title: "Islamabad to Swat & Malam Jabba",
        description: "- Early morning departure from Islamabad.\n- Travel through the scenic Swat Motorway.\n- Arrival in Swat Valley.\n- Visit Malam Jabba Ski Resort.\n- Enjoy optional chairlift and zipline activities.\n- Explore panoramic mountain viewpoints.\n- Enjoy couple photography amidst beautiful landscapes.\n- Departure towards Fizagat and hotel check-in.\n- Dinner and leisure time.\nNight stay: Swat.",
      },
      {
        day: "Day 02",
        title: "Swat to Kalam Valley",
        description: "- Breakfast and hotel check-out.\n- Departure towards Kalam via Madyan and Bahrain.\n- Explore Bahrain's riverside landscapes.\n- Arrival in Kalam and hotel check-in.\n- Visit the enchanting Ushu Forest.\n- Enjoy romantic walks through the pine forest.\n- Explore Kalam Bazaar.\n- Spend a peaceful evening beside the Swat River.\nNight stay: Kalam.",
      },
      {
        day: "Day 03",
        title: "Mahodand Lake & Matiltan Waterfall",
        description: "- Breakfast at the hotel.\n- Departure via 4×4 jeep towards Mahodand Lake.\n- Explore the scenic Matiltan Valley.\n- Visit Matiltan Waterfall.\n- Enjoy breathtaking views of snow-covered mountains and alpine meadows.\n- Explore the magnificent Mahodand Lake.\n- Enjoy optional boating and horseback riding.\n- Romantic lakeside picnic and couple photography.\n- Return to Kalam for a cozy evening.\nNight stay: Kalam.",
      },
      {
        day: "Day 04",
        title: "Kalam to Islamabad",
        description: "- Breakfast and hotel check-out.\n- Departure towards Islamabad.\n- Scenic drive through Bahrain, Madyan and Swat Valley.\n- Refreshment and photography stops along the way.\n- Arrival and drop-off in Islamabad.\n- End of an unforgettable romantic journey.",
      },
    ],
  },
  {
    slug: "kashmir-riverside-romance-4-days",
    name: "Kashmir Riverside Romance",
    duration: "4 Days / 3 Nights",
    detail: "A serene 4-day Kashmir couple escape with flowing rivers, forest views, and romantic mountain calm.",
    price: "PKR 120,000 / couple",
    image: "/images/package-cards/images__kashmir-ready.webp",
    standard: "PKR 120,000",
    deluxe: "PKR 180,000",
    executive: "PKR 220,000",
    attractions: ["Neelum/Kashmir riverside areas", "Scenic bridges and viewpoints", "Green valleys", "Peaceful stays", "Nature walks (easy)"],
      itinerary: [
      {
        day: "Day 01",
        title: "Islamabad to Keran",
        description: "- Early morning departure from Islamabad.\n- Scenic drive through Muzaffarabad towards Neelum Valley.\n- Visit Dhani Waterfall.\n- Explore Kutton Waterfall and its natural surroundings.\n- Arrival in Keran and hotel check-in.\n- Enjoy mesmerizing views of the Neelum River.\n- Romantic riverside walk and couple photography.\n- Dinner and relaxation.\nNight stay: Keran.",
      },
      {
        day: "Day 02",
        title: "Upper Neelum & Sharda Valley",
        description: "- Breakfast and hotel check-out.\n- Visit Upper Neelum for panoramic valley views.\n- Departure towards Sharda.\n- Enjoy scenic riverside photography stops.\n- Explore the historic Sharda Peeth ruins, subject to access.\n- Discover the natural beauty of Sharda Valley.\n- Hotel check-in.\n- Spend a peaceful evening overlooking the Neelum River.\nNight stay: Sharda.",
      },
      {
        day: "Day 03",
        title: "Kel & Arang Kel Exploration",
        description: "- Early morning breakfast.\n- Departure towards Kel.\n- Experience the traditional cable car ride towards Arang Kel.\n- Enjoy a scenic uphill hike to Arang Kel.\n- Explore lush green meadows and charming wooden cottages.\n- Witness breathtaking panoramic mountain views.\n- Enjoy a romantic picnic and couple photography.\n- Return to Sharda before evening.\n- Dinner and leisure time.\nNight stay: Sharda.",
      },
      {
        day: "Day 04",
        title: "Sharda to Islamabad",
        description: "- Early morning breakfast and hotel check-out.\n- Departure towards Islamabad via Keran and Muzaffarabad.\n- Enjoy scenic riverside views along the journey.\n- Refreshment and photography stops.\n- Arrival and drop-off in Islamabad.\n- End of a beautiful romantic journey.",
      },
    ],
  },
  {
    slug: "naran-cozy-couples-escape-3-days",
    name: "Naran Cozy Couples Escape",
    duration: "3 Days / 2 Nights",
    detail: "A cozy 3-day Naran honeymoon with cool weather, valley charm, and easy romantic sightseeing.",
    price: "PKR 100,000 / couple",
    image: "/images/destinations/naran-hd.webp",
    standard: "PKR 100,000",
    deluxe: "PKR 150,000",
    executive: "PKR 200,000",
    attractions: ["Naran Valley", "Kunhar River", "Naran Bazaar", "Nearby scenic viewpoints", "Mountain scenery"],
      itinerary: [
      {
        day: "Day 01",
        title: "Islamabad to Naran",
        description: "- Early morning departure from Islamabad.\n- Travel through Hazara Motorway, Mansehra and Balakot.\n- Enjoy scenic views of the beautiful Kaghan Valley.\n- Photography stops along the Kunhar River.\n- Arrival in Naran and hotel check-in.\n- Explore Naran Bazaar.\n- Enjoy a romantic riverside walk.\n- Dinner and relaxation at the hotel.\nNight stay: Naran.",
      },
      {
        day: "Day 02",
        title: "Lake Saif-ul-Malook, Lulusar Lake & Babusar Top",
        description: "- Early morning breakfast at the hotel.\n- Departure via 4×4 jeep towards Lake Saif-ul-Malook.\n- Explore the enchanting lake surrounded by majestic mountains.\n- Enjoy couple photography and peaceful lakeside moments.\n- Return to Naran and departure towards Babusar Top.\n- Explore the scenic landscapes of Batakundi and Jalkhad.\n- Visit the magnificent Lulusar Lake.\n- Witness breathtaking panoramic views from Babusar Top.\n- Return to Naran for a cozy evening.\n- Romantic dinner and leisure time.\nNight stay: Naran.",
      },
      {
        day: "Day 03",
        title: "Naran to Islamabad",
        description: "- Breakfast at the hotel.\n- Enjoy a peaceful morning surrounded by mountains.\n- Hotel check-out and departure towards Islamabad.\n- Scenic drive through Kaghan Valley and Balakot.\n- Refreshment and photography stops along the journey.\n- Arrival and drop-off in Islamabad.\n- End of an unforgettable romantic getaway.",
      },
    ],
  },
  {
    slug: "naran-shogran-meadow-romance-4-days",
    name: "Naran & Shogran Meadow Romance",
    duration: "4 Days / 3 Nights",
    detail: "A lovely 4-day Naran and Shogran honeymoon with meadows, pine forests, and per-couple tier options.",
    price: "PKR 120,000 / couple",
    image: "/images/package-cards/images__honeymoon__naran-shogran.webp",
    standard: "PKR 120,000",
    deluxe: "PKR 180,000",
    executive: "PKR 220,000",
    attractions: ["Naran", "Shogran", "Siri Paye area (seasonal/jeep access)", "Pine forests", "Valley viewpoints"],
      itinerary: [
      {
        day: "Day 01",
        title: "Islamabad to Naran",
        description: "- Early morning departure from Islamabad.\n- Travel through Hazara Motorway, Mansehra and Balakot.\n- Enjoy the scenic landscapes of Kaghan Valley.\n- Photography stops along the Kunhar River.\n- Arrival in Naran and hotel check-in.\n- Explore Naran Bazaar.\n- Enjoy a romantic riverside walk.\n- Dinner and relaxation.\nNight stay: Naran.",
      },
      {
        day: "Day 02",
        title: "Saif-ul-Malook, Lulusar Lake & Babusar Top",
        description: "- Early morning breakfast at the hotel.\n- Departure via 4×4 jeep towards Lake Saif-ul-Malook.\n- Explore the enchanting lake and surrounding mountains.\n- Enjoy romantic lakeside moments and couple photography.\n- Return to Naran and departure towards Babusar Top.\n- Sightseeing at Batakundi and Jalkhad.\n- Visit the magnificent Lulusar Lake.\n- Enjoy breathtaking panoramic views from Babusar Top.\n- Return to Naran for dinner and relaxation.\nNight stay: Naran.",
      },
      {
        day: "Day 03",
        title: "Naran to Shogran & Siri Paye Meadows",
        description: "- Early morning breakfast and hotel check-out.\n- Departure towards Kiwai.\n- Transfer to a local 4×4 jeep for Shogran.\n- Continue towards the breathtaking Siri Paye Meadows.\n- Explore lush green landscapes and panoramic mountain views.\n- Enjoy romantic nature walks and couple photography.\n- Optional horseback riding experience.\n- Return to Shogran and hotel check-in.\n- Spend a cozy evening surrounded by pine forests.\nNight stay: Shogran.",
      },
      {
        day: "Day 04",
        title: "Shogran to Islamabad",
        description: "- Breakfast with beautiful mountain views.\n- Enjoy a peaceful morning exploring Shogran.\n- Hotel check-out and departure towards Kiwai.\n- Visit Kiwai Waterfall.\n- Continue towards Islamabad via Balakot and Mansehra.\n- Refreshment stops along the journey.\n- Arrival and drop-off in Islamabad.\n- End of a memorable romantic getaway.",
      },
    ],
  },
  {
    slug: "shogran-cloud-kissed-getaway-2-days",
    name: "Shogran Cloud-Kissed Getaway",
    duration: "2 Days / 1 Night",
    detail: "A quick 2-day Shogran honeymoon retreat for couples who want misty meadows and a peaceful overnight escape.",
    price: "PKR 65,000 / couple",
    image: "/images/destinations/shogran-siri-paye.png",
    standard: "PKR 65,000",
    deluxe: "PKR 90,000",
    executive: "PKR 120,000",
    attractions: ["Shogran", "Pine meadows", "Scenic viewpoints", "Cool mountain air", "Short nature walks"],
      itinerary: [
      {
        day: "Day 01",
        title: "Islamabad to Shogran & Siri Paye Meadows",
        description: "- Early morning departure from Islamabad.\n- Travel through Hazara Motorway, Mansehra and Balakot.\n- Arrival at Kiwai and transfer to a local 4×4 jeep.\n- Departure towards the picturesque Shogran Valley.\n- Explore the breathtaking Siri Paye Meadows.\n- Enjoy panoramic views of Makra Peak and surrounding mountains.\n- Romantic nature walks through lush green meadows.\n- Optional horseback riding experience.\n- Enjoy couple photography amidst mesmerizing landscapes.\n- Return to Shogran and hotel check-in.\n- Spend a cozy evening surrounded by pine forests.\n- Romantic dinner and relaxation.\nNight stay: Shogran.",
      },
      {
        day: "Day 02",
        title: "Shogran to Islamabad",
        description: "- Breakfast overlooking the beautiful mountains.\n- Enjoy a peaceful morning walk through Shogran's pine forests.\n- Spend leisure time amidst nature.\n- Hotel check-out and jeep transfer towards Kiwai.\n- Visit Kiwai Waterfall.\n- Enjoy refreshments and couple photography.\n- Departure towards Islamabad via Balakot and Mansehra.\n- Arrival and drop-off in Islamabad.\n- End of a delightful romantic getaway.",
      },
    ],
  },
  {
    slug: "swat-shogran-forever-views-5-days",
    name: "Swat & Shogran Forever Views",
    duration: "5 Days / 4 Nights",
    detail: "A beautiful 5-day Swat and Shogran honeymoon blending green valleys, meadows, and romantic scenic drives.",
    price: "PKR 140,000 / couple",
    image: "/images/package-cards/images__destinations__swat-unsplash.webp",
    standard: "PKR 140,000",
    deluxe: "PKR 190,000",
    executive: "PKR 240,000",
    attractions: ["Swat Valley", "Shogran", "Siri Paye area (seasonal)", "River and meadow views", "Scenic stops"],
      itinerary: [
      {
        day: "Day 01",
        title: "Islamabad to Swat & Malam Jabba",
        description: "- Early morning departure from Islamabad.\n- Travel through the scenic Swat Motorway.\n- Arrival in Swat Valley.\n- Visit Malam Jabba Ski Resort.\n- Enjoy optional chairlift and zipline activities.\n- Explore panoramic mountain viewpoints.\n- Romantic photography amidst beautiful landscapes.\n- Departure towards Fizagat and hotel check-in.\n- Dinner and relaxation.\nNight stay: Swat.",
      },
      {
        day: "Day 02",
        title: "Swat to Kalam Valley",
        description: "- Breakfast and hotel check-out.\n- Departure towards Kalam via Madyan and Bahrain.\n- Enjoy scenic riverside views in Bahrain.\n- Arrival in Kalam Valley.\n- Explore the enchanting Ushu Forest.\n- Visit Matiltan Waterfall, subject to accessibility.\n- Enjoy romantic nature walks and couple photography.\n- Hotel check-in at Kalam.\n- Spend a peaceful evening beside the Swat River.\nNight stay: Kalam.",
      },
      {
        day: "Day 03",
        title: "Kalam to Balakot",
        description: "- Early morning breakfast and hotel check-out.\n- Departure towards Balakot via Bahrain, Swat Motorway and Hazara Motorway.\n- Enjoy scenic mountain and riverside views along the journey.\n- Refreshment stops at suitable locations.\n- Arrival in Balakot and hotel check-in.\n- Enjoy a relaxing evening overlooking the Kunhar River, depending on arrival time.\n- Dinner and overnight relaxation.\nNight stay: Balakot.",
      },
      {
        day: "Day 04",
        title: "Shogran & Siri Paye Meadows",
        description: "- Breakfast and hotel check-out.\n- Departure towards Kiwai.\n- Transfer to a local 4×4 jeep towards Shogran.\n- Explore the breathtaking Siri Paye Meadows.\n- Enjoy panoramic views of Makra Peak.\n- Romantic walks through lush green meadows.\n- Optional horseback riding experience.\n- Couple photography amidst picturesque landscapes.\n- Return to Shogran and hotel check-in.\n- Spend a cozy evening surrounded by pine forests.\nNight stay: Shogran.",
      },
      {
        day: "Day 05",
        title: "Shogran to Islamabad",
        description: "- Breakfast overlooking the beautiful mountains.\n- Enjoy a peaceful morning walk through Shogran.\n- Hotel check-out and jeep transfer towards Kiwai.\n- Visit Kiwai Waterfall.\n- Enjoy refreshments and couple photography.\n- Departure towards Islamabad via Balakot and Mansehra.\n- Arrival and drop-off in Islamabad.\n- End of an unforgettable romantic journey.",
      },
    ],
  },
  {
    slug: "kashmir-shogran-serenity-escape-5-days",
    name: "Kashmir & Shogran Serenity Escape",
    duration: "5 Days / 4 Nights",
    detail: "A calming 5-day Kashmir and Shogran couple journey with rivers, forests, and misty meadow moments.",
    price: "PKR 140,000 / couple",
    image: "/images/package-cards/images__honeymoon__naran-shogran-neelum.webp",
    standard: "PKR 140,000",
    deluxe: "PKR 190,000",
    executive: "PKR 240,000",
    attractions: ["Azad Kashmir/Kashmir valleys", "Shogran", "Riverside scenery", "Pine forests", "Mountain viewpoints"],
      itinerary: [
      {
        day: "Day 01",
        title: "Islamabad to Kashmir & Keran",
        description: "- Early morning departure from Islamabad.\n- Scenic drive through Muzaffarabad towards Neelum Valley.\n- Visit the breathtaking Dhani Waterfall.\n- Explore Kutton Waterfall and its natural surroundings.\n- Arrival in Keran and hotel check-in.\n- Enjoy mesmerizing views of the Neelum River.\n- Romantic riverside walk and couple photography.\n- Dinner and relaxation.\nNight stay:** Keran.",
      },
      {
        day: "Day 02",
        title: "Upper Neelum, Sharda & Arang Kel",
        description: "- Early morning breakfast and hotel check-out.\n- Visit Upper Neelum for panoramic valley views.\n- Departure towards Sharda and onward to Kel.\n- Experience the traditional cable car ride towards Arang Kel.\n- Enjoy a scenic uphill hike to Arang Kel.\n- Explore lush green meadows and traditional wooden cottages.\n- Romantic nature walks and couple photography.\n- Return to Sharda and hotel check-in.\n- Dinner and relaxation beside the Neelum River.\nNight stay:** Sharda.",
      },
      {
        day: "Day 03",
        title: "Sharda to Balakot",
        description: "- Early morning breakfast and hotel check-out.\n- Departure towards Balakot via Keran and Muzaffarabad.\n- Enjoy breathtaking riverside and mountain landscapes.\n- Refreshment and photography stops along the journey.\n- Arrival in Balakot and hotel check-in.\n- Enjoy a peaceful evening beside the Kunhar River.\n- Dinner and leisure time.\nNight stay:** Balakot.",
      },
      {
        day: "Day 04",
        title: "Shogran & Siri Paye Meadows",
        description: "- Breakfast and hotel check-out.\n- Departure towards Kiwai.\n- Transfer to a local 4×4 jeep towards Shogran.\n- Explore the enchanting Siri Paye Meadows.\n- Enjoy panoramic views of Makra Peak and surrounding mountains.\n- Romantic walks through lush green meadows.\n- Optional horseback riding experience.\n- Couple photography amidst breathtaking landscapes.\n- Return to Shogran and hotel check-in.\n- Spend a cozy evening surrounded by pine forests.\nNight stay:** Shogran.",
      },
      {
        day: "Day 05",
        title: "Shogran to Islamabad",
        description: "- Breakfast overlooking the beautiful mountains.\n- Enjoy a peaceful morning walk through Shogran.\n- Hotel check-out and jeep transfer towards Kiwai.\n- Visit Kiwai Waterfall.\n- Enjoy refreshments and photography.\n- Departure towards Islamabad via Balakot and Mansehra.\n- Arrival and drop-off in Islamabad.\n- End of an unforgettable romantic journey.",
      },
    ],
  },
  {
    slug: "grand-northern-love-expedition-10-days",
    name: "Grand Northern Love Expedition",
    duration: "10 Days / 9 Nights",
    detail: "A grand 10-day honeymoon across Hunza, Skardu, and Fairy Meadows for couples seeking the ultimate northern romance.",
    price: "PKR 250,000 / couple",
    image: "/images/package-cards/skardu-hunza-home-card.webp",
    standard: "PKR 250,000",
    deluxe: "PKR 330,000",
    executive: "PKR 430,000",
    attractions: ["Hunza Valley", "Skardu", "Fairy Meadows", "Lakes and mountain passes", "Iconic northern viewpoints"],
      itinerary: [
      {
        day: "Day 01",
        title: "Islamabad to Chilas",
        description: "- Early morning departure from Islamabad.\n- Travel through Hazara Motorway, Balakot and Kaghan Valley.\n- Explore the beautiful landscapes of Naran.\n- Visit Lulusar Lake.\n- Cross the breathtaking Babusar Top.\n- Arrival in Chilas and hotel check-in.\n- Dinner and relaxation.\nNight stay: Chilas.",
      },
      {
        day: "Day 02",
        title: "Chilas to Hunza Valley",
        description: "- Breakfast and hotel check-out.\n- Departure towards Hunza via Karakoram Highway.\n- Visit the Junction Point of Three Mountain Ranges.\n- Photography stop at Rakaposhi Viewpoint.\n- Arrival in Hunza and hotel check-in.\n- Explore Karimabad Bazaar.\n- Enjoy a romantic evening overlooking the mountains.\nNight stay: Hunza.",
      },
      {
        day: "Day 03",
        title: "Attabad Lake, Passu Cones & Hussaini Bridge",
        description: "- Breakfast at the hotel.\n- Visit the magnificent Attabad Lake.\n- Enjoy an optional romantic boating experience.\n- Explore Gulmit and Upper Hunza.\n- Visit Hussaini Suspension Bridge.\n- Couple photography at the iconic Passu Cones.\n- Visit Borith Lake, subject to accessibility.\n- Return to the hotel for dinner and relaxation.\nNight stay: Hunza.",
      },
      {
        day: "Day 04",
        title: "Hunza Heritage & Skardu Transfer",
        description: "- Early morning breakfast and hotel check-out.\n- Visit Baltit Fort, subject to opening hours.\n- Departure towards Skardu via Jaglot.\n- Enjoy scenic landscapes along the Indus River.\n- Refreshment and photography stops.\n- Arrival in Skardu and hotel check-in.\n- Dinner and overnight relaxation.\nNight stay: Skardu.",
      },
      {
        day: "Day 05",
        title: "Shangrila, Upper Kachura & Soq Valley",
        description: "- Breakfast at the hotel.\n- Visit Shangrila Resort and Lower Kachura Lake.\n- Explore the picturesque Upper Kachura Lake.\n- Optional romantic boating experience.\n- Visit the peaceful Soq Valley.\n- Enjoy riverside leisure time and couple photography.\n- Return to the hotel for a cozy evening.\nNight stay: Skardu.",
      },
      {
        day: "Day 06",
        title: "Shigar Valley & Sarfaranga Cold Desert",
        description: "- Breakfast at the hotel.\n- Explore Sarfaranga Cold Desert.\n- Enjoy optional ATV rides and jeep safari activities.\n- Visit the historic Shigar Fort.\n- Explore traditional villages and scenic landscapes.\n- Enjoy a romantic sunset and couple photography.\n- Return to the hotel.\nNight stay: Skardu.",
      },
      {
        day: "Day 07",
        title: "Skardu to Astore via Deosai",
        description: "- Early morning breakfast and hotel check-out.\n- Departure via 4×4 jeep towards Deosai National Park.\n- Sightseeing at Sadpara Lake.\n- Explore Deosai Plains, Bara Pani and Kala Pani.\n- Visit the magnificent Sheosar Lake.\n- Enjoy panoramic mountain views and romantic photography.\n- Continue towards Astore via Chilam Chowki.\n- Hotel check-in and relaxation.\nNight stay: Astore.",
      },
      {
        day: "Day 08",
        title: "Minimarg, Domel & Rainbow Lake",
        description: "- Early morning breakfast.\n- Departure via 4×4 jeep towards Minimarg.\n- Cross the breathtaking Burzil Pass.\n- Explore the picturesque Minimarg Valley.\n- Visit Domel Valley and Rainbow Lake.\n- Enjoy peaceful moments amidst lush green landscapes.\n- Romantic lakeside moments and couple photography.\n- Return to Astore for dinner and relaxation.\nNight stay: Astore.",
      },
      {
        day: "Day 09",
        title: "Astore to Naran",
        description: "- Early morning breakfast and hotel check-out.\n- Departure towards Naran via Chilas and Babusar Top.\n- Enjoy breathtaking mountain landscapes.\n- Scenic photography and refreshment stops.\n- Arrival in Naran and hotel check-in.\n- Romantic evening walk beside the Kunhar River.\n- Dinner and leisure time.\nNight stay: Naran.",
      },
      {
        day: "Day 10",
        title: "Naran to Islamabad",
        description: "- Breakfast at the hotel.\n- Hotel check-out and departure towards Islamabad.\n- Scenic drive through Kaghan Valley and Balakot.\n- Refreshment stops along the journey.\n- Arrival and drop-off in Islamabad.\n- End of an unforgettable romantic expedition.",
      },
    ],
  },
  {
    slug: "valleys-of-love-grand-tour-7-days",
    name: "Valleys of Love Grand Tour",
    duration: "7 Days / 6 Nights",
    detail: "A romantic 7-day journey through Swat, Kashmir, and Shogran with lush valleys, rivers, and meadows.",
    price: "PKR 220,000 / couple",
    image: "/images/package-cards/kashmir-swat-shogran.webp",
    standard: "PKR 220,000",
    deluxe: "PKR 290,000",
    executive: "PKR 330,000",
    attractions: ["Swat", "Kashmir valleys", "Shogran", "Riverside and meadow views", "Scenic mountain drives"],
      itinerary: [
      {
        day: "Day 01",
        title: "Islamabad to Swat & Malam Jabba",
        description: "- Early morning departure from Islamabad.\n- Travel through the scenic Swat Motorway.\n- Arrival in Swat Valley.\n- Visit Malam Jabba Ski Resort.\n- Enjoy optional chairlift and zipline activities.\n- Explore panoramic mountain viewpoints.\n- Romantic couple photography.\n- Departure towards Fizagat and hotel check-in.\n- Dinner and relaxation.\nNight stay: Swat.",
      },
      {
        day: "Day 02",
        title: "Kalam Valley & Ushu Forest",
        description: "- Breakfast and hotel check-out.\n- Departure towards Kalam via Madyan and Bahrain.\n- Enjoy beautiful riverside views in Bahrain.\n- Explore the enchanting Ushu Forest.\n- Visit Matiltan Waterfall, subject to accessibility.\n- Romantic nature walks and couple photography.\n- Explore Kalam Bazaar.\n- Hotel check-in and a peaceful riverside evening.\nNight stay: Kalam.",
      },
      {
        day: "Day 03",
        title: "Kalam to Muzaffarabad",
        description: "- Early morning breakfast and hotel check-out.\n- Departure towards Muzaffarabad via Swat Motorway and Hazara Motorway.\n- Enjoy scenic mountain landscapes along the journey.\n- Refreshment stops at suitable locations.\n- Arrival in Muzaffarabad and hotel check-in.\n- Enjoy a relaxing evening.\n- Dinner and overnight relaxation.\nNight stay: Muzaffarabad.",
      },
      {
        day: "Day 04",
        title: "Neelum Valley, Keran & Upper Neelum",
        description: "- Breakfast and hotel check-out.\n- Departure towards Neelum Valley.\n- Visit Dhani Waterfall.\n- Explore Kutton Waterfall.\n- Arrival in Keran and hotel check-in.\n- Visit Upper Neelum for breathtaking panoramic views.\n- Enjoy romantic riverside walks and couple photography.\n- Dinner overlooking the beautiful Neelum River, subject to hotel location.\nNight stay: Keran.",
      },
      {
        day: "Day 05",
        title: "Keran to Balakot",
        description: "- Breakfast and hotel check-out.\n- Enjoy peaceful morning moments beside the Neelum River.\n- Departure towards Balakot via Muzaffarabad.\n- Scenic photography and refreshment stops.\n- Arrival in Balakot and hotel check-in.\n- Enjoy a relaxing evening beside the Kunhar River.\n- Dinner and leisure time.\nNight stay: Balakot.",
      },
      {
        day: "Day 06",
        title: "Shogran & Siri Paye Meadows",
        description: "- Breakfast and hotel check-out.\n- Departure towards Kiwai.\n- Transfer to a local 4×4 jeep towards Shogran.\n- Explore the breathtaking Siri Paye Meadows.\n- Enjoy panoramic views of Makra Peak.\n- Romantic walks through lush green meadows.\n- Optional horseback riding experience.\n- Couple photography amidst cloud-covered landscapes.\n- Return to Shogran and hotel check-in.\n- Enjoy a cozy evening surrounded by pine forests.\nNight stay: Shogran.",
      },
      {
        day: "Day 07",
        title: "Shogran to Islamabad",
        description: "- Breakfast overlooking the beautiful mountains.\n- Enjoy a peaceful morning walk through Shogran.\n- Hotel check-out and jeep transfer towards Kiwai.\n- Visit Kiwai Waterfall.\n- Enjoy refreshments and couple photography.\n- Departure towards Islamabad via Balakot and Mansehra.\n- Arrival and drop-off in Islamabad.\n- End of an unforgettable romantic journey.",
      },
    ],
  },
  {
    slug: "murree-misty-moments-retreat-2-days",
    name: "Murree Misty Moments Retreat",
    duration: "2 Days / 1 Night",
    detail: "A sweet 2-day Murree honeymoon getaway with cool hills, pine trees, and a cozy couple stay.",
    price: "PKR 55,000 / couple",
    image: "/images/package-cards/images__honeymoon__murree-tour.webp",
    standard: "PKR 55,000",
    deluxe: "PKR 80,000",
    executive: "PKR 110,000",
    attractions: ["Murree hills", "Mall Road area", "Pine forests", "Scenic viewpoints", "Relaxed evening strolls"],
      itinerary: [
      {
        day: "Day 01",
        title: "Islamabad to Murree & Patriata",
        description: "- Morning departure from Islamabad.\n- Scenic drive through Murree Expressway.\n- Visit Patriata (New Murree).\n- Enjoy an optional chairlift and cable car experience.\n- Witness breathtaking views of forest-covered mountains.\n- Romantic nature walks and couple photography.\n- Departure towards Murree and hotel check-in.\n- Explore the famous Mall Road.\n- Enjoy local shopping and refreshments.\n- Romantic dinner and a cozy evening together.\nNight stay: Murree.",
      },
      {
        day: "Day 02",
        title: "Nathia Gali & Islamabad Return",
        description: "- Breakfast overlooking the beautiful mountains.\n- Hotel check-out and departure towards Nathia Gali.\n- Explore the scenic landscapes of Dunga Gali.\n- Enjoy a peaceful walk along a section of the Pipeline Track.\n- Explore Nathia Gali's charming surroundings.\n- Couple photography amidst lush green pine forests.\n- Enjoy refreshments at a local café.\n- Departure towards Islamabad.\n- Arrival and drop-off in Islamabad.\n- End of a beautiful romantic getaway.",
      },
    ],
  },
  {
    slug: "murree-kashmir-romantic-escape-5-days",
    name: "Murree & Kashmir Romantic Escape",
    duration: "5 Days / 4 Nights",
    detail: "A charming 5-day Murree and Kashmir honeymoon combining hill-station charm with Kashmir's romantic valleys.",
    price: "PKR 140,000 / couple",
    image: "/images/package-cards/images__honeymoon__murree-shogran.webp",
    standard: "PKR 140,000",
    deluxe: "PKR 190,000",
    executive: "PKR 240,000",
    attractions: ["Murree", "Azad Kashmir valleys", "Scenic hill roads", "Riverside and forest views", "Couple-friendly sightseeing"],
      itinerary: [
      {
        day: "Day 01",
        title: "Islamabad to Murree & Patriata",
        description: "- Morning departure from Islamabad.\n- Scenic drive through Murree Expressway.\n- Visit Patriata (New Murree).\n- Enjoy an optional chairlift and cable car experience.\n- Explore breathtaking mountain and forest views.\n- Romantic nature walks and couple photography.\n- Arrival in Murree and hotel check-in.\n- Explore the famous Mall Road.\n- Enjoy a romantic dinner and cozy evening.\nNight stay: Murree.",
      },
      {
        day: "Day 02",
        title: "Murree to Kashmir & Keran",
        description: "- Early morning breakfast and hotel check-out.\n- Departure towards Muzaffarabad via Kohala.\n- Continue towards the picturesque Neelum Valley.\n- Visit Dhani Waterfall.\n- Explore Kutton Waterfall, subject to available daylight.\n- Arrival in Keran and hotel check-in.\n- Enjoy mesmerizing views of the Neelum River.\n- Romantic riverside walk and leisure time.\n- Dinner and relaxation.\nNight stay: Keran.",
      },
      {
        day: "Day 03",
        title: "Upper Neelum & Sharda Valley",
        description: "- Breakfast at the hotel.\n- Visit Upper Neelum for panoramic mountain and valley views.\n- Enjoy romantic photography amidst beautiful landscapes.\n- Departure towards Sharda Valley.\n- Explore the historic Sharda Peeth ruins, subject to access.\n- Enjoy peaceful riverside moments.\n- Hotel check-in at Sharda.\n- Spend a cozy evening overlooking the Neelum River.\nNight stay: Sharda.",
      },
      {
        day: "Day 04",
        title: "Kel & Arang Kel Exploration",
        description: "- Early morning breakfast.\n- Departure towards Kel.\n- Experience the traditional cable car ride towards Arang Kel.\n- Enjoy a scenic uphill hike to Arang Kel.\n- Explore lush green meadows and charming wooden cottages.\n- Witness breathtaking panoramic mountain views.\n- Enjoy a romantic picnic surrounded by nature.\n- Couple photography and leisure time.\n- Return to Sharda before evening.\n- Romantic dinner and relaxation.\nNight stay: Sharda.",
      },
      {
        day: "Day 05",
        title: "Sharda to Islamabad",
        description: "- Early morning breakfast and hotel check-out.\n- Departure towards Islamabad via Keran and Muzaffarabad.\n- Enjoy scenic mountain and riverside landscapes.\n- Refreshment and photography stops along the journey.\n- Arrival and drop-off in Islamabad.\n- End of an unforgettable romantic escape.",
      },
    ],
  },
];

export const additionalHoneymoonPackages: Record<string, AdditionalHoneymoonPackage> = Object.fromEntries(
  honeymoonPackages.map((item) => {
    const tierText = `Standard: ${item.standard} per couple | Deluxe: ${item.deluxe} per couple | Executive: ${item.executive} per couple`;
    return [
      item.slug,
      {
        slug: item.slug,
        name: item.name,
        duration: item.duration,
        detail: item.detail,
        price: item.price,
        image: item.image,
        title: item.name,
        description: `${item.name} — ${item.duration}. ${tierText}.`,
        overview: `${item.detail} This couple package is available in Standard, Deluxe, and Executive tiers so you can choose the comfort level that fits your honeymoon plans.`,
        attractions: item.attractions,
        ...(item.itinerary ? { itinerary: item.itinerary } : {}),
        includes: sharedIncludes,
        excluded: sharedExcluded,
        bookingPolicy: sharedBookingPolicy,
        childPolicy: sharedChildPolicy,
        mealsMenu: sharedMeals,
        detailSections: [
          {
            title: "Package tiers & pricing (per couple)",
            content: [
              `Standard: ${item.standard} per couple`,
              `Deluxe: ${item.deluxe} per couple`,
              `Executive: ${item.executive} per couple`,
              "Final inclusions, hotel names, transport type, and sightseeing depend on the selected tier and travel dates.",
            ],
          },
          {
            title: "Trip planning",
            content: [
              "The itinerary can be tailored around your preferred dates, departure city, pace, and hotel category.",
              "Route order, travel times, and sightseeing stops may be adjusted based on weather, road conditions, and accessibility.",
            ],
          },
          {
            title: "Traveler notes",
            content: [
              "Carry comfortable clothing, essential medicines, valid ID/CNIC, and a power bank.",
              "Jeep rides, entry tickets, and optional activities are payable separately unless clearly included in your final quotation.",
            ],
          },
        ],
      },
    ];
  })
) as Record<string, AdditionalHoneymoonPackage>;