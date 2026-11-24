import type { TourExperience, TravelStyle } from "./tour-packages";

export type TourDiscoveryPriceGroup = {
  title: string;
  rows: Array<{ label: string; price: string }>;
  note?: string;
};

export type TourDiscoveryIdea = {
  id: string;
  title: string;
  description: string;
  region: "northern" | "southern";
  destinationSlugs: string[];
  routeStops: string[];
  duration: string;
  image: string;
  travelStyles: TravelStyle[];
  experiences: TourExperience[];
  routeHighlights: string[];
  bestFor: string;
  pace: "Fast" | "Moderate" | "Relaxed";
  pricePerPerson?: number;
  detailHref?: string;
  pricingGroups?: TourDiscoveryPriceGroup[];
  itinerary?: Array<{ day: string; title: string; description: string }>;
  includes?: string[];
  excludes?: string[];
  notes?: string[];
};

export const tourDiscoveryIdeas: TourDiscoveryIdea[] = [
  {
    id: "swat-kalam-malam-jabba-8-days",
    title: "Swat, Kalam & Malam Jabba · 8 Days",
    description: "An eight-day group journey from Karachi or Islamabad through Swat, Malam Jabba, Bahrain, Kalam, and Mahodand Lake.",
    region: "northern",
    destinationSlugs: ["swat", "kalam", "malam-jabba"],
    routeStops: ["Karachi", "Islamabad", "Swat", "Malam Jabba", "Bahrain", "Kalam", "Ushu Forest", "Palogha Valley", "Mahodand Lake"],
    duration: "8 Days / 7 Nights",
    image: "/images/package-cards/images__tour-packages__01.webp",
    travelStyles: ["family", "couples", "adventure", "tailored"],
    experiences: ["mountains", "nature", "adventure"],
    routeHighlights: ["Kalam valley", "Malam Jabba"],
    bestFor: "A short northern escape",
    pace: "Moderate",
    pricePerPerson: 33700,
    pricingGroups: [
      {
        title: "Direct from Islamabad · without Islamabad stay",
        rows: [
          { label: "Quad sharing", price: "PKR 33,700 per person" },
          { label: "Triple sharing", price: "PKR 35,700 per person" },
          { label: "Couple sharing", price: "PKR 39,500 per person" },
          { label: "Single person", price: "PKR 58,700 per person" },
        ],
      },
      {
        title: "With 2 nights Islamabad stay · stay and food",
        rows: [
          { label: "Quad sharing", price: "PKR 36,900 per person" },
          { label: "Couple sharing", price: "PKR 114,000 per person" },
          { label: "Triple sharing", price: "PKR 49,000 per person" },
          { label: "Single person", price: "PKR 114,000 per couple" },
        ],
        note: "Rates and units are transcribed as shown on the supplied poster; confirm the room configuration and rate basis before booking.",
      },
    ],
    includes: [
      "Hotel accommodation",
      "Luxury transport",
      "Breakfast and dinner as specified",
      "Tolls and taxes",
      "Tour guide",
      "Bonfire",
      "Jeep ride to Mahodand Lake",
    ],
    excludes: [
      "Train meals",
      "Breakfast on Day 7",
      "Dinner on Day 6",
      "Transfers to and from the bus or railway station in Islamabad",
    ],
    notes: [
      "Chairlift and zipline fees at Malam Jabba are not listed among the inclusions; confirm their cost before booking.",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Karachi departure",
        description: "Depart Karachi by bus; one meal is included. Meals during train travel are not included if traveling by train.",
      },
      {
        day: "Day 2",
        title: "Arrival in Rawalpindi / Islamabad",
        description: "Arrive in Rawalpindi or Islamabad and transfer to the hotel using your own transport, such as Uber or Yango. Check in, have dinner, and stay overnight. Hotel dinner is for guests booked on the tour.",
      },
      {
        day: "Day 3",
        title: "Islamabad to Swat and Malam Jabba",
        description: "Depart early for Swat via the Swat Expressway, with sightseeing along the way and views of the Swat River. Visit Malam Jabba; chairlift and zipline activities are optional. Check in to the hotel for dinner and the night stay in Malam Jabba or Bahrain.",
      },
      {
        day: "Day 4",
        title: "Malam Jabba to Kalam",
        description: "Depart early for Kalam, sightseeing along the river and passing through Bahrain. Check in to the Kalam hotel, explore Kalam Bazaar at leisure, and stay overnight after dinner.",
      },
      {
        day: "Day 5",
        title: "Mahodand Lake excursion",
        description: "Travel by 4x4 jeep to Mahodand Lake, visiting Ushu Forest and Palogha Valley along the way. Enjoy a boat ride and leisure time at the lake, then return to Kalam for dinner and the night stay.",
      },
      {
        day: "Day 6",
        title: "Kalam to Islamabad",
        description: "Check out and depart for Islamabad with sightseeing stops along the way. Tour services end on arrival in Islamabad. Karachi participants may check in to a hotel for the night; dinner is not included.",
      },
      {
        day: "Day 7",
        title: "Islamabad departure for Karachi",
        description: "Check out before noon. Breakfast is not included. Travel to the bus or railway station using your own transport and depart for Karachi.",
      },
      {
        day: "Day 8",
        title: "Arrival in Karachi",
        description: "Arrive in Karachi and conclude the tour.",
      },
    ],
  },
  {
    id: "kashmir-arangkel-3-days",
    title: "Neelum Valley, Kel & Arang Kel",
    description: "A three-day Islamabad tour to Keran, Kel, and Arang Kel in Neelum Valley.",
    region: "northern",
    destinationSlugs: ["kashmir", "neelum-valley", "arang-kel"],
    routeStops: ["Islamabad", "Keran", "Neelum Valley", "Kel", "Arang Kel", "Kutton Waterfall"],
    duration: "3 Days / 2 Nights",
    image: "/images/package-cards/destination-kashmir-valley-recommendation.webp",
    travelStyles: ["family", "couples", "adventure", "tailored"],
    experiences: ["mountains", "lakes-valleys", "nature", "adventure"],
    routeHighlights: ["Keran", "Kel", "Arang Kel", "Kutton Waterfall"],
    bestFor: "A short Neelum Valley escape",
    pace: "Fast",
    pricePerPerson: 22000,
    includes: ["Accommodation", "Luxury transport", "Breakfast", "Tolls and taxes", "Tour guide", "Bonfire"],
    itinerary: [
      {
        day: "Day 1",
        title: "Islamabad to Keran",
        description: "Depart for Keran with breakfast on the way. Make short sightseeing stops at Kashmir Waterfall, Dhani Waterfall, the Neelum Jhelum Hydropower Project, and Chilana LOC. Arrive in Keran or Upper Neelum Valley for the overnight stay.",
      },
      {
        day: "Day 2",
        title: "Keran, Kel, and Arang Kel",
        description: "Depart for Kel and take a short Doli ride to reach the trail. Trek to Arang Kel for approximately 30–45 minutes on a dusty, rugged trail if accessible. Spend leisure time there, return to Kel, then drive back to Keran for hotel check-in and the night stay.",
      },
      {
        day: "Day 3",
        title: "Keran to Islamabad",
        description: "Depart for Islamabad with a short stop at Kutton Waterfall. Return to Islamabad for participant drop-off; tour services end on arrival.",
      },
    ],
    notes: [
      "The Arang Kel trek is approximately 30–45 minutes on a dusty, rugged trail and depends on access.",
      "Confirm the current rate and package configuration for your requested dates.",
    ],
  },
  {
    id: "swat-kalam-malam-jabba-shogran-10-days",
    title: "Swat, Kalam, Malam Jabba & Shogran",
    description: "A relaxed ten-day journey through Swat, Malam Jabba, Kalam, and Shogran, with time for valley sightseeing and scenic excursions.",
    region: "northern",
    destinationSlugs: ["swat", "kalam", "malam-jabba", "shogran"],
    routeStops: ["Swat", "Kalam", "Malam Jabba", "Shogran"],
    duration: "10 Days / 9 Nights",
    image: "/images/package-cards/images__tour-packages__08.webp",
    travelStyles: ["family", "couples", "adventure", "tailored"],
    experiences: ["mountains", "nature", "adventure"],
    routeHighlights: ["Kalam valley", "Malam Jabba", "Shogran highlands"],
    bestFor: "A longer northern circuit",
    pace: "Relaxed",
    itinerary: [
      {
        day: "Day 1",
        title: "Islamabad to Swat Valley",
        description: "Pick up from the designated location in Islamabad and travel toward Swat Valley via the Swat Motorway. Enjoy mountain scenery and a refreshment break en route. Arrive in Mingora, check in, and visit Fizagat Park for riverside views and an evening walk along the Swat River. Dinner and overnight in Swat (Mingora). Estimated drive: 5–6 hours, excluding extended stops.",
      },
      {
        day: "Day 2",
        title: "Swat Valley Exploration",
        description: "After breakfast, visit Marghazar Valley and the historic White Palace, including its gardens and traditional architecture. Return toward Saidu Sharif to explore Swat Museum and, subject to access, the nearby Butkara Stupa. Enjoy leisure time at Mingora Bazaar before returning to the hotel for dinner and overnight in Swat.",
      },
      {
        day: "Day 3",
        title: "Swat to Malam Jabba",
        description: "After breakfast, check out and drive through mountain scenery and pine forests to Malam Jabba Ski Resort. The chairlift, ziplining, and other resort activities are optional and subject to operation. Enjoy the mountain views and resort surroundings, then check in for dinner and overnight in Malam Jabba. Estimated drive from Mingora: 1–1.5 hours.",
      },
      {
        day: "Day 4",
        title: "Malam Jabba to Kalam Valley",
        description: "After breakfast, check out and travel along the scenic Swat River route toward Kalam. Stop at Madyan for sightseeing and refreshments, then continue through Bahrain for river views and time at the local bazaar. Arrive in Kalam, check in, and explore Kalam Bazaar and the riverside before dinner and overnight. Estimated drive: 4–5 hours, excluding sightseeing stops.",
      },
      {
        day: "Day 5",
        title: "Kalam Valley & Ushu Forest",
        description: "After breakfast, explore the upper Kalam region. Visit Ushu Forest and enjoy its pine-lined mountain scenery, then continue to Matiltan Valley for mountain and waterfall views. Take time for viewpoints, photography, and leisure before returning to Kalam for dinner and overnight.",
      },
      {
        day: "Day 6",
        title: "Mahodand Lake Excursion",
        description: "After an early breakfast, take a local 4x4 jeep through Ushu Valley to Mahodand Lake, passing forests, mountain streams, and alpine scenery. Enjoy the lake and surrounding snow-capped peaks; boating and photography are optional and subject to availability. Return to Kalam in the afternoon for dinner and overnight. This is a full-day excursion; access depends on season, weather, and road conditions, and a 4x4 jeep is required.",
      },
      {
        day: "Day 7",
        title: "Kalam to Shogran Valley",
        description: "After breakfast, check out from Kalam and travel back through Swat via Bahrain, Madyan, and Mingora, then continue through the Hazara region toward Balakot and Kewai. Take refreshment and meal breaks en route, ascend to Shogran, and check in for dinner and overnight. This long transfer takes approximately 9–11 hours or more depending on traffic and road conditions.",
      },
      {
        day: "Day 8",
        title: "Siri Paye Meadows Excursion",
        description: "After breakfast, take a 4x4 jeep along the mountain tracks to Siri Lake and Paye Meadows. Enjoy views of Makra Peak, time in the meadows, photography, and leisure before returning to Shogran in the afternoon. Dinner and overnight in Shogran. The excursion depends on weather, road conditions, and meadow accessibility.",
      },
      {
        day: "Day 9",
        title: "Shogran, Kewai & Balakot Exploration",
        description: "After breakfast, enjoy a relaxed morning in Shogran and explore the village and nearby viewpoints. Descend to Kewai Waterfall for photography, then continue to Balakot for local sightseeing, a riverside stop near the Kunhar River, markets, and refreshments. Return to Shogran for dinner and overnight.",
      },
      {
        day: "Day 10",
        title: "Shogran to Islamabad",
        description: "After breakfast, check out from Shogran and travel through Kaghan Valley and Mansehra, with short refreshment stops, then continue toward Islamabad via the Hazara Motorway. Arrive for drop-off at the designated location. Tour services end.",
      },
    ],
  },
  {
    id: "skardu-manthoka-basho-10-days",
    title: "Skardu, Manthoka & Basho",
    description: "A relaxed ten-day Baltistan journey through Skardu, Shigar, Kharmang, and Basho Valley, with lake, desert, heritage, and nature excursions.",
    region: "northern",
    destinationSlugs: ["skardu", "manthoka", "basho"],
    routeStops: ["Skardu", "Upper Kachura Lake", "Shigar Valley", "Sadpara Lake", "Manthoka Waterfall", "Katpana Cold Desert", "Basho Suspension Bridge", "Basho Valley"],
    duration: "10 Days / 9 Nights",
    image: "/images/package-cards/images__tour-packages__23.webp",
    travelStyles: ["family", "adventure", "tailored"],
    experiences: ["mountains", "nature", "offbeat"],
    routeHighlights: ["Upper Kachura Lake", "Shigar Fort and Sarfaranga Cold Desert", "Manthoka Waterfall", "Basho meadows and pine forests"],
    bestFor: "Baltistan's waterfalls and forests",
    pace: "Relaxed",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Skardu & Scenic Exploration",
        description: "Arrive at Skardu Airport by flight from Islamabad and meet the Hodophile Adventures representative for a hotel transfer and check-in. Have breakfast or lunch depending on arrival time, then visit Shangrila Resort and Lower Kachura Lake for scenic views and photography. Optional boating is subject to availability. Return for dinner and overnight in Skardu.",
      },
      {
        day: "Day 2",
        title: "Upper Kachura Lake & Skardu Valley",
        description: "After breakfast, visit Upper Kachura Lake for a peaceful walk and mountain scenery. Optional boating and local activities are available, subject to availability. Have lunch at a local restaurant and visit Blind Lake (Zarba Cho) if accessible. Return to Skardu for photography, relaxation, and time at Skardu Bazaar, then have dinner and overnight in Skardu.",
      },
      {
        day: "Day 3",
        title: "Shigar Valley & Sarfaranga Cold Desert",
        description: "After breakfast, explore Shigar Valley and historic Shigar Fort, including its traditional Balti architecture and cultural heritage. Visit Amburik Mosque, then enjoy the landscapes of Sarfaranga Cold Desert, photography, optional desert activities, and nearby villages and viewpoints. Return to Skardu for dinner and overnight.",
      },
      {
        day: "Day 4",
        title: "Sadpara Lake & Skardu Heritage",
        description: "After breakfast, visit Sadpara Lake for mountain scenery and leisure time. Continue to Manthal Buddha Rock to see its historical Buddhist carvings, then visit Kharpocho Fort for panoramic views of Skardu city. Return to the hotel for dinner and overnight in Skardu, with time for local shopping and exploration.",
      },
      {
        day: "Day 5",
        title: "Manthoka Waterfall & Kharmang Valley",
        description: "After breakfast, drive along the Indus River toward Kharmang Valley and Manthoka Waterfall. Explore the green surroundings and viewpoints, take photographs, and enjoy time at the picnic area with lunch at a local restaurant or picnic spot. Visit nearby streams and trout farms where accessible, then return to Skardu for dinner and overnight. The drive is approximately 2–2.5 hours each way, depending on road conditions and stops.",
      },
      {
        day: "Day 6",
        title: "Skardu Leisure & Local Experiences",
        description: "Enjoy breakfast and a relaxed morning. Visit Katpana Cold Desert and its sand dunes against the mountain landscape, explore local handicraft shops and Skardu Bazaar, and try traditional Balti cuisine if desired. Spend the afternoon relaxing at the hotel or visiting nearby viewpoints. Dinner and overnight in Skardu.",
      },
      {
        day: "Day 7",
        title: "Skardu to Basho Valley",
        description: "After breakfast, check out and travel toward Basho Suspension Bridge. Transfer to a local 4x4 jeep for the mountain track and adventurous drive into Basho Valley. Explore its meadows, pine forests, and mountain scenery, then check in at a local guesthouse or designated camping accommodation. Dinner and overnight in Basho. The final stretch requires a suitable 4x4 jeep; accommodation is more basic than Skardu city hotels.",
      },
      {
        day: "Day 8",
        title: "Basho Valley Exploration & Nature Experience",
        description: "After breakfast, enjoy a peaceful morning in Basho Valley. Explore the meadows, pine forests, and scenic streams on nature walks, take photographs, and visit local village surroundings to experience traditional Balti hospitality. Enjoy a picnic lunch, leisure time, and optional short hikes with a local guide. Dinner and overnight in Basho Valley.",
      },
      {
        day: "Day 9",
        title: "Basho Valley to Skardu",
        description: "After breakfast, enjoy final moments in Basho Valley, check out, and board the 4x4 jeep back to Basho Suspension Bridge. Continue to Skardu with refreshment stops, check in at the hotel, and spend the afternoon at leisure or shopping for local handicrafts and souvenirs. Dinner and overnight in Skardu.",
      },
      {
        day: "Day 10",
        title: "Departure from Skardu",
        description: "After breakfast, check out and transfer to Skardu Airport for flight check-in formalities. Board the flight to Islamabad and conclude Hodophile Adventures services.",
      },
    ],
  },
  {
    id: "hunza-naltar-10-days",
    title: "10 Days Naran, Hunza & Naltar",
    description: "A ten-day group journey through Naran, Hunza, and Naltar Valley, including Naltar's alpine lakes and Hunza's historic forts.",
    region: "northern",
    destinationSlugs: ["naran", "hunza", "naltar"],
    routeStops: ["Naran", "Hunza", "Naltar Valley"],
    duration: "10 Days / 9 Nights",
    image: "/images/package-cards/images__tour-packages__13.webp",
    travelStyles: ["family", "couples", "adventure", "tailored"],
    experiences: ["mountains", "lakes-valleys", "nature", "romance"],
    routeHighlights: ["Naltar Alpine Lakes", "Baltit Fort", "Attabad Lake", "Khunjerab Pass"],
    bestFor: "A northern group circuit",
    pace: "Relaxed",
    pricePerPerson: 39000,
    detailHref: "/tours/featured/hunza-naltar",
  },
  {
    id: "hunza-skardu-12-days",
    title: "Hunza & Skardu",
    description: "A relaxed twelve-day journey from Islamabad through Naran, Chilas, Hunza, Gilgit, and Skardu, returning by flight from Skardu to Islamabad.",
    region: "northern",
    destinationSlugs: ["hunza", "skardu"],
    routeStops: ["Islamabad", "Naran", "Chilas", "Hunza", "Gilgit", "Skardu"],
    duration: "12 Days / 11 Nights",
    image: "/images/package-cards/images__tour-packages__09.webp",
    travelStyles: ["family", "couples", "adventure", "tailored"],
    experiences: ["mountains", "lakes-valleys", "nature", "romance"],
    routeHighlights: ["Babusar Top", "Baltit and Altit Forts", "Attabad Lake and Upper Hunza", "Gilgit", "Shigar Valley", "Deosai and Sheosar Lake"],
    bestFor: "A two-region mountain circuit",
    pace: "Relaxed",
    notes: [
      "Babusar Top is seasonal; when it is closed, the route must change via Besham and the Karakoram Highway.",
      "Khunjerab Pass and Deosai access, local activities, and the return flight depend on current conditions and availability.",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Islamabad to Naran Valley",
        description: "Pick up from the designated location in Islamabad and travel toward Kaghan Valley via Abbottabad, Balakot, and Kaghan. Enjoy Kunhar River views, scenic photography and refreshment stops, then check in at Naran. Explore Naran Bazaar and the valley in the evening. Dinner and overnight in Naran. Estimated drive: 5–6 hours.",
      },
      {
        day: "Day 2",
        title: "Naran to Chilas via Babusar Top",
        description: "After breakfast, check out and travel to Babusar Top for mountain views, photography, and refreshments, then descend toward Chilas with views of the Indus River and surrounding mountains. Check in for dinner and overnight in Chilas. Babusar Top is seasonal and generally open in summer; when officially closed, reroute via Besham and the Karakoram Highway.",
      },
      {
        day: "Day 3",
        title: "Chilas to Hunza Valley",
        description: "After breakfast, travel along the Karakoram Highway through the Gilgit region toward Karimabad. Stop at Rakaposhi Viewpoint for panoramic views, photography, and refreshments, then continue to Hunza for hotel check-in and a relaxed evening. Dinner and overnight in Hunza. Estimated drive: 5–7 hours, depending on stops and road conditions.",
      },
      {
        day: "Day 4",
        title: "Karimabad & Hunza Heritage Exploration",
        description: "After breakfast, visit historic Baltit Fort and explore its architecture and Hunza heritage. Browse Karimabad Bazaar for handicrafts and local products, enjoy lunch at a local restaurant, then visit Altit Fort and historic Altit village for its heritage and valley views. Return to the hotel for dinner and overnight in Hunza.",
      },
      {
        day: "Day 5",
        title: "Attabad Lake & Upper Hunza Exploration",
        description: "After breakfast, explore Upper Hunza and visit turquoise Attabad Lake. Optional boating and jet skiing are subject to availability. Visit Hussaini Suspension Bridge and surrounding mountain landscapes, have lunch at a local restaurant, then explore Gulmit village with time for photography and cultural discovery. Return to the hotel for dinner and overnight in Hunza.",
      },
      {
        day: "Day 6",
        title: "Passu Cones, Borith Lake & Khunjerab Excursion",
        description: "After breakfast, visit Passu Cones and Borith Lake, then continue toward Khunjerab Pass if road and border access permit. Enjoy high-altitude scenery and photography stops along the Karakoram Highway before returning to Hunza for dinner and overnight. Khunjerab is a full-day excursion; if weather, roads, or border restrictions prevent access, explore Gulmit and Passu instead.",
      },
      {
        day: "Day 7",
        title: "Hunza to Gilgit Valley",
        description: "After breakfast, check out and drive along the Karakoram Highway to Gilgit, with an optional stop at Rakaposhi Viewpoint. Visit Kargah Buddha subject to access, then explore Gilgit Bazaar and nearby surroundings with free time for shopping and refreshments. Check in for dinner and overnight in Gilgit. Estimated drive from central Hunza: 2–3 hours.",
      },
      {
        day: "Day 8",
        title: "Gilgit to Skardu Valley",
        description: "After breakfast, check out and travel along the scenic Gilgit–Skardu Road, enjoying Indus River and mountain views with photography stops, refreshments, and lunch along the way. Arrive in Skardu, check in, and enjoy a relaxed evening. Dinner and overnight in Skardu. Estimated drive: 5–7 hours, depending on stops and road conditions.",
      },
      {
        day: "Day 9",
        title: "Skardu Lakes & Scenic Exploration",
        description: "After breakfast, visit Shangrila Resort, Lower Kachura Lake, and Upper Kachura Lake. Enjoy optional boating and photography, have lunch at a local restaurant, then explore Katpana Cold Desert and its mountain-backed sand dunes. Return for sunset photography, dinner, and overnight in Skardu.",
      },
      {
        day: "Day 10",
        title: "Shigar Valley & Cultural Exploration",
        description: "After breakfast, visit Shigar Valley and historic Shigar Fort to explore traditional Balti architecture. Continue to Amburik Mosque and Sarfaranga Cold Desert, with time for local villages, viewpoints, lunch, and refreshments. Return to Skardu for a leisurely evening, dinner, and overnight.",
      },
      {
        day: "Day 11",
        title: "Deosai Plains & Sheosar Lake Excursion",
        description: "After an early breakfast, travel in a suitable 4x4 vehicle into Deosai National Park. Explore the high-altitude plateau, grasslands, and mountain scenery, visit Sheosar Lake, and enjoy viewpoints and a picnic lunch where permitted. Return to Skardu for dinner and overnight. This is a full-day excursion; Deosai generally opens in summer after snow clearance. Outside the operating season, visit Sadpara Lake, Manthal Buddha Rock, and Kharpocho Fort instead.",
      },
      {
        day: "Day 12",
        title: "Departure from Skardu",
        description: "After breakfast, check out and transfer to Skardu Airport for flight check-in formalities. Board the flight to Islamabad and conclude the Hunza and Skardu journey.",
      },
    ],
  },
  {
    id: "naran-shogran-9-days",
    title: "Naran & Shogran",
    description: "A relaxed five-day Naran and Shogran getaway with Lake Saif-ul-Malook and Siri Paye Meadows excursions.",
    region: "northern",
    destinationSlugs: ["naran", "shogran"],
    routeStops: ["Islamabad", "Naran", "Lake Saif-ul-Malook", "Kewai", "Shogran", "Siri Paye Meadows"],
    duration: "5 Days / 4 Nights",
    image: "/images/package-cards/images__tour-packages__43.webp",
    travelStyles: ["family", "couples", "adventure", "tailored"],
    experiences: ["mountains", "lakes-valleys", "nature", "romance"],
    routeHighlights: ["Lake Saif-ul-Malook", "Naran Valley", "Shogran", "Siri Paye Meadows"],
    bestFor: "A twin-valley getaway",
    pace: "Relaxed",
    itinerary: [
      {
        day: "Day 1",
        title: "Islamabad to Naran",
        description: "Depart from the designated location in Islamabad via Abbottabad, Mansehra, and Balakot. Enjoy scenic views along the Kaghan Valley route with refreshment and photography stops. Arrive in Naran, check in, and enjoy the evening at leisure. Estimated drive: 6–8 hours, depending on traffic and road conditions. Overnight in Naran.",
      },
      {
        day: "Day 2",
        title: "Lake Saif-ul-Malook",
        description: "After breakfast, take an optional local 4x4 jeep excursion to Lake Saif-ul-Malook for alpine scenery, lake views, and photography. Lake access depends on weather, snow, and track conditions. Return to Naran, explore the local bazaar, and enjoy the evening at leisure. Overnight in Naran.",
      },
      {
        day: "Day 3",
        title: "Naran to Shogran",
        description: "After breakfast, check out and drive through the scenic Kaghan Valley toward Kewai. Transfer to a local 4x4 jeep for the uphill journey to Shogran, check in, and enjoy the peaceful surroundings, nearby viewpoints, and pine forests. The Shogran access road is steep; local 4x4 transport is generally required. Overnight in Shogran.",
      },
      {
        day: "Day 4",
        title: "Siri Paye Meadows",
        description: "After breakfast, take an optional 4x4 jeep excursion to Siri Paye Meadows. Enjoy panoramic mountain views, green pastures, photography, and time to explore the landscape, then return to Shogran for a relaxed evening. Access depends on weather, snow, and jeep-track conditions. Overnight in Shogran.",
      },
      {
        day: "Day 5",
        title: "Shogran to Islamabad",
        description: "After breakfast, check out from Shogran and descend to Kewai by local 4x4 jeep. Continue toward Balakot and Islamabad, arriving with memories of Naran and Shogran.",
      },
    ],
  },
  {
    id: "ranikot-fort-2-days",
    title: "Ranikot Fort Weekend",
    description: "A short southern escape to Ranikot Fort. Ask us to confirm the route, dates, and current quotation.",
    region: "southern",
    destinationSlugs: ["ranikot"],
    routeStops: ["Ranikot Fort"],
    duration: "2 Days / 1 Night",
    image: "/images/package-cards/images__tour-packages__30.webp",
    travelStyles: ["family", "adventure", "tailored"],
    experiences: ["nature", "culture", "offbeat"],
    routeHighlights: ["Ranikot Fort"],
    bestFor: "A short heritage escape",
    pace: "Moderate",
  },
  {
    id: "charo-machi-2-days",
    title: "Charo Machi Weekend",
    description: "A short southern escape to Charo Machi. Ask us to confirm the route, dates, and current quotation.",
    region: "southern",
    destinationSlugs: ["charo-machi"],
    routeStops: ["Charo Machi"],
    duration: "2 Days / 1 Night",
    image: "/images/package-cards/images__tour-packages__34.webp",
    travelStyles: ["family", "adventure", "tailored"],
    experiences: ["nature", "adventure", "offbeat"],
    routeHighlights: ["Charo Machi"],
    bestFor: "A short offbeat adventure",
    pace: "Fast",
  },
];
