export type FeaturedTourDay = {
  day: string;
  title: string;
  description: string;
};

export type TourPricingRow = {
  label: string;
  price: string;
};

export type TourPricingGroup = {
  title: string;
  rows: TourPricingRow[];
  note?: string;
};

export type TourDetailSection = {
  title: string;
  content: string[];
};

export type FeaturedTourCard = {
  slug: string;
  title: string;
  homeImage: string;
  heroImage: string;
  duration: string;
  summary: string;
  description: string;
  overview?: string;
  attractions?: string[];
  pricingGroups?: TourPricingGroup[];
  childPolicy?: string[];
  addons?: string[];
  meals?: {
    breakfast: string;
    dinner: string;
  };
  includes?: string[];
  servicesIncluded?: string[];
  servicesExcluded?: string[];
  importantNotes?: string[];
  bookingPolicy?: string[];
  detailSections?: TourDetailSection[];
  highlights: string[];
  itinerary: FeaturedTourDay[];
};

export const featuredTourCards: FeaturedTourCard[] = [
  {
    slug: "kashmir-taobat",
    title: "9 Days Kashmir, Arangkel & Taobat",
    homeImage: "/images/featured-tours/9days-kashmir-taobat.jpg.jpeg",
    heroImage: "/images/destinations/kashmir.jpg",
    duration: "9 Days / 8 Nights",
    summary: "A standard group tour from Karachi through Islamabad into Kashmir, Taobat, and Arangkel.",
    description:
      "Travel from Karachi to Kashmir on a value-focused group tour with Sharda Valley, Taobat, Arangkel, and high-altitude views along the way.",
    overview:
      "Embark on a 9-day journey into the serene beauty of Northern Pakistan, exploring the pristine valleys of Kashmir, Taobat, and ArangKel. Begin with the enchanting Naran Valley, Babusar Top, and the glacial waters of Lulusar Lake and Jheel Saif-ul-Malook, then venture to Sharda and Taobat for lush greenery and scenic rivers. Experience the thrill of a 4x4 jeep ride to ArangKel, ‘Heaven on Earth,’ where sunsets over verdant meadows will leave you spellbound. Along the way, discover historic bridges, sparkling waterfalls, and the unspoiled charm of Nagar Valley, all while enjoying comfortable accommodations, delicious local meals, and the guidance of expert tour leaders. This tour blends adventure, tranquility, and breathtaking landscapes into an unforgettable escape from the ordinary.",
    attractions: [
      "Hazara Motorway",
      "Naran Valley",
      "Kunhar River",
      "Lulusar Lake",
      "Babusar Top",
      "Jheel Saif-ul-Malook",
      "Sohni Waterfall",
      "Kiwai Waterfall",
      "Naltar Valley",
      "Naltar Lakes",
      "Snow Leopards",
      "Satrangi Lake",
      "Naltar Ski Resort",
      "Hunza Valley",
      "Karakoram Highway",
      "Chilas",
      "Juglot",
      "3 Mountain Junction",
      "Nanga Parbat View Point",
      "Baltit Fort",
      "Karimabad Bazaar",
      "Attabad Lake",
      "Khunjerab Pass",
      "Passu Cones",
      "Rainbow Suspension Bridge",
      "Balakot",
    ],
    pricingGroups: [
      {
        title: "With 2 Nights Islamabad Stay",
        rows: [
          { label: "Quad - 4 Person Sharing", price: "Rs. 40,500" },
          { label: "Triple - 3 Person Sharing", price: "Rs. 45,000" },
          { label: "Twin - 2 Person Sharing", price: "Rs. 55,000" },
          { label: "Solo/Single Person", price: "Rs. 75,000" },
        ],
        note:
          "Includes 2 nights in Islamabad for Karachi members. Transport tickets between Karachi and Islamabad are not included.",
      },
      {
        title: "Direct Islamabad Joiners",
        rows: [
          { label: "Quad - 4 Person Sharing", price: "Rs. 37,500" },
          { label: "Triple - 3 Person Sharing", price: "Rs. 41,500" },
          { label: "Twin - 2 Person Sharing", price: "Rs. 51,500" },
          { label: "Solo/Single Person", price: "Rs. 71,000" },
        ],
        note:
          "For travelers joining directly from Islamabad. Karachi-Islamabad transport is not included.",
      },
    ],
    childPolicy: [
      "Below 3 years: Free of cost, no seat provided (laps with parent).",
      "3 to 7 years: 50% charge, folding/jumper seat provided.",
      "Above 7 years: 100% charge with a full seat.",
    ],
    meals: {
      breakfast: "Anda, Paratha, Tea, Channa, Omelet on rotation.",
      dinner:
        "Chicken Karahi, Handi, BBQ, Chicken Fried Rice, Vegetables, Daal, Raita, Salad, Naan on rotation.",
    },
    includes: [
      "Hotel accommodations on shared room basis",
      "Luxury ground transport",
      "Breakfasts and dinners as per itinerary",
      "Tolls and taxes",
      "Tour guide services",
      "Bonfire and scenic phone photography",
    ],
    servicesIncluded: [
      "Half-board meals (breakfast and dinner)",
      "Quad/4-person sharing hotel rooms",
      "Luxury transport with driver and guide",
      "All tolls and taxes",
      "Basic first aid kit",
    ],
    servicesExcluded: [
      "Entry tickets for forts, parks, museums, and heaters",
      "Porters for personal equipment",
      "Extra expenses due to landslides or road blocks",
      "Trekking equipment, water sports, and extra local rides",
      "Heater or air conditioner charges",
      "Tea, mineral water, cold drinks, and hotel room service charges",
      "Emergency evacuation, medical insurance, laundry, and personal calls",
    ],
    importantNotes: [
      "Package uses 3-4 person room sharing; mattresses may be provided when needed.",
      "Fuel price increases of Rs. 10-20 per liter may result in an extra charge of Rs. 1,000–2,000 per person.",
      "Weather, landslides, political activity, or road closures may require itinerary changes.",
    ],
    bookingPolicy: [
      "Reserve your seat with 50% advance payment 7 days before the tour date.",
      "Send payment confirmation screenshot or bank transfer receipt after payment.",
      "Remaining payment is due 3 days before departure from Karachi or on departure day in Islamabad.",
    ],
    detailSections: [
      {
        title: "Tour Includes",
        content: [
          "Hotel accommodations on sharing basis",
          "Luxury transport and tour manager services",
          "Breakfast and dinner as noted in the itinerary",
          "All tolls and taxes",
          "Basic first aid kit and scenic photography support",
        ],
      },
      {
        title: "Tour Notes",
        content: [
          "Departure from Karachi is by bus or train; airline travel is available upon request.",
          "Meals on bus/train are not included in the package.",
          "Hotel check-in time starts at 2:00 PM.",
          "First-night dinner is served between 9:30 PM and 10:00 PM.",
          "Local pickups from Islamabad/Rawalpindi are available on request for an extra charge.",
        ],
      },
      {
        title: "Refund Policy",
        content: [
          "50% refund if cancellation is made 7 days before the event.",
          "30% refund if cancellation is made 3 days before the event.",
          "0% refund if cancellation is made one day before the event.",
        ],
      },
      {
        title: "Terms & Conditions",
        content: [
          "Minimum group size is 10 participants; trips may be canceled for low registration with a full refund or transfer.",
          "No refunds for natural disasters, route closures, or circumstances beyond company control.",
          "Hodophile Adventures is not responsible for train bogie or coach conditions or late arrival/departure schedules.",
          "Travelers are responsible for their own baggage and must carry only 10kg of cargo.",
          "Separate rooms for married couples are available but charged extra.",
        ],
      },
      {
        title: "Traveler's Instruction",
        content: [
          "A separate room for twin sharing will be allotted to married couples only, but will be charged extra as mentioned above.",
          "In case of any Change in tour plan (due to unavoidable Conditions as mentioned above, resulting in a change of cost, the extra amount will be paid by the guest on a sharing basis.",
          "Team Hodophile adventures are not responsible for Train Bogies or Coaches' condition, also not responsible for late timing arrival or departure, as it's beyond our control...",
          "Don't pollute the environment; you will be charged for it.",
          "Please ensure following the team leader's instructions.",
          "Be thoughtful of not failing any ethical integrity.",
          "Make sure you travel like a family and make all its members safe and connected while respecting the Locals, their Cultures, religious & beliefs.",
          "Package price calculated as per current fuel prices. If the fuel prices rise up to Rs. 10-20, we will charge @Rs. 1,000 to 2,000/head extra.",
        ],
      },
    ],
    highlights: [
      "Hazara Motorway",
      "Sharda Valley",
      "Taobat and Arang Kel",
      "Naltar Valley",
      "Naltar Lakes",
      "Satrangi Lake",
      "Naltar Ski Resort",
      "Jheel Saif-ul-Malook",
      "Babusar Top",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Departure from Karachi",
        description:
          "Depart from Karachi by bus or train. Meals on transit are not included, and airline travel is available on request for the next day.",
      },
      {
        day: "Day 2",
        title: "Arrival in Islamabad",
        description:
          "Arrive in Rawalpindi/Islamabad and transfer to the hotel by your own conveyance or private transport. Airport/station pickup is available on request for an extra charge.",
      },
      {
        day: "Day 3",
        title: "Sharda Valley",
        description:
          "Leave Islamabad via Murree Expressway. Stop at Dhani Waterfall, Chillana LOC, the hydro power project, and Keran River point before reaching Sharda for check-in and dinner.",
      },
      {
        day: "Day 4",
        title: "Taobat Valley",
        description:
          "Depart for Taobat Valley, transfer by 4x4 Jeep from Sharda, and visit Halmat Village en route. Enjoy free time in Taobat and overnight at Corner View Cottage or equivalent.",
      },
      {
        day: "Day 5",
        title: "Arangkel Trek",
        description:
          "Travel from Taobat to Kel, cross the river by doli/cable car, trek to Arangkel, and explore the alpine village before sunset. Overnight at Corner Cottage/Wanderlust or equivalent.",
      },
      {
        day: "Day 6",
        title: "Nagar Valley",
        description:
          "Return to Kel, travel toward Sharda/Keran, visit Sharda Bridge and the Sharda River, and check in at Ibex Cottage, Keran Resort, or equivalent.",
      },
      {
        day: "Day 7",
        title: "Return to Islamabad",
        description:
          "Depart for Islamabad with a short stop at Kundal Shahi Waterfall, then arrive in Rawalpindi/Islamabad. Tour ends for Islamabad members; Karachi members stay overnight in Islamabad without food included.",
      },
      {
        day: "Day 8",
        title: "Karachi Departure",
        description:
          "Check out and travel to the bus terminal or railway station by own conveyance. Drop facility is available on request for an extra charge. Breakfast is not included for Karachi participants.",
      },
      {
        day: "Day 9",
        title: "Arrival in Karachi",
        description: "Arrive back in Karachi and complete the tour.",
      },
    ],
  },
  {
    slug: "skardu-deosai",
    title: "10 Days Skardu, Shigar & Shangrila",
    homeImage: "/images/featured-tours/10days-skardu-deosai.jpg.jpeg",
    heroImage: "/images/destinations/skardu.jpg",
    duration: "10 Days / 7 Nights",
    summary: "A rugged Skardu route with Shangrila, Shigar Fort, Sarfranga Cold Desert, and Deosai.",
    description:
      "This circuit delivers the best of Skardu's dramatic landscapes, historic heritage, and the surreal Deosai plateau in one compact trip.",
    overview:
      "Discover the magic of northern Pakistan on this 10-day adventure through Skardu, Shigar, and Shangrila. Marvel at snow-capped peaks, crystal-clear lakes, cascading waterfalls, and the vast Deosai and Basho Valleys. Explore historic forts, serene alpine landscapes, and hidden gems like Sarfaranga Cold Desert and Manthokha Waterfall. An unforgettable journey of breathtaking scenery, adventure, and culture awaits!",
    attractions: [
      "Hazara Motorway",
      "Besham",
      "Karakoram Highway",
      "Chilas",
      "Juglot",
      "3 Mountain Junction",
      "Nanga Parbat View Point",
      "Astak Nala",
      "Skardu",
      "Shangrila Resort",
      "Upper Kachura Lake",
      "Lower Kachura Lake",
      "Shigar Fort",
      "Sarfranga Cold Desert",
      "Manthokha Waterfall",
      "Naran Valley",
      "Kunhar River",
      "Babusar Top",
      "Jheel Saif-ul-Malook",
      "Lulusar Lake",
      "Sohni Waterfall",
    ],
    pricingGroups: [
      {
        title: "With Islamabad Stay",
        rows: [
          { label: "Quad-4 Person Sharing", price: "Rs. 42,000" },
          { label: "Triple-3 Person Sharing", price: "Rs. 45,000" },
          { label: "Twin-2 Person Sharing", price: "Rs. 49,000" },
          { label: "Solo Single Room", price: "Rs. 77,000" },
        ],
        note: "Prices are per person and exclude round-trip tickets between Karachi and Islamabad.",
      },
      {
        title: "Without Islamabad Stay",
        rows: [
          { label: "Quad-4 Person Sharing", price: "Rs. 39,000" },
          { label: "Triple-3 Person Sharing", price: "Rs. 43,000" },
          { label: "Twin-2 Person Sharing", price: "Rs. 47,000" },
          { label: "Solo Single Room", price: "Rs. 67,000" },
        ],
      },
    ],
    childPolicy: [
      "Below 3 years: Free of cost, no seat provided (lap seating with parent).",
      "3 to 7 years: 50% charged, folding/jumper seat provided.",
      "Above 7 years: 100% charged with full seat.",
    ],
    meals: {
      breakfast: "Anda, Paratha, Tea, Channa, Omelet (rotating menu)",
      dinner: "Chicken Karahi, Handi, BBQ, Chicken Fried Rice, Vegetables, Daal, Raita, Salad, Naan (rotation)",
    },
    includes: [
      "Hotel accommodations on sharing basis",
      "Luxury transport",
      "Breakfasts and dinners as noted",
      "Tolls and taxes",
      "Tour guide services",
      "Bonfire and scenic phone photography",
    ],
    servicesIncluded: [
      "Half-board meals as per itinerary",
      "Quad/4-person room sharing basis",
      "Luxury Grand Cabin or Coaster transport",
      "Tour manager/guide services",
      "Basic first aid kit",
      "All tolls and taxes",
    ],
    servicesExcluded: [
      "Fort, park, museum, and heater entry tickets",
      "Porters for personal equipment",
      "Extra expenses from landslides or roadblocks",
      "Trekking equipment and water sports fees",
      "Heater or air conditioner charges",
      "Extra ride charges (Jeep, Careem, Uber)",
      "Tea, mineral water, cold drinks, and hotel room services",
      "Personal insurance, evacuation, laundry, and phone calls",
    ],
    importantNotes: [
      "Package price is based on current fuel costs. If fuel prices rise by Rs. 10-20, an extra Rs. 1,000–2,000 per person may apply.",
      "This itinerary can change because of weather, road closures, political activities, or conditions beyond the organizer's control.",
      "Train baggage allowance is 10 kg per person; guests are responsible for their own luggage.",
    ],
    bookingPolicy: [
      "Reserve a seat with 50% advance payment at least 7 days before departure.",
      "Send payment confirmation screenshot or transfer receipt after payment.",
      "Remaining payment is due 3 days before departure from Karachi or on departure day in Islamabad.",
    ],
    detailSections: [
      {
        title: "Details",
        content: [
          "Departure from Karachi by bus or train; air travel on request for additional charges.",
          "Meals on the bus or train are not included in the package.",
          "Airport/station pickup is available on request for an extra charge.",
          "Hotel check-in begins at 2:00 PM.",
          "First-night dinner is served in rooms between 9:30 PM and 10:00 PM.",
          "The tour begins in Chilas on Day 3 with the Hazara Motorway route.",
        ],
      },
      {
        title: "Menu During Trip",
        content: [
          "Breakfast: Anda, Paratha, Tea, Channa, Omelet on rotation.",
          "Dinner: Chicken Karahi, Handi, BBQ, Chicken Fried Rice, Vegetables, Daal, Raita, Salad, Naan on rotation.",
        ],
      },
      {
        title: "Refund Policy",
        content: [
          "50% refund if cancellation occurs 7 days before the tour.",
          "30% refund if cancellation occurs 3 days before the tour.",
          "0% refund if cancellation occurs one day before the tour.",
        ],
      },
      {
        title: "Terms & Conditions",
        content: [
          "Minimum group size is 10 participants. If the trip is canceled due to low registration, guests may receive a full refund or transfer to the next trip.",
          "No refunds are provided for natural disasters, road closures, or other circumstances beyond the organizer's control.",
          "Personal weapons, drugs, and alcohol are strictly prohibited.",
          "Sightseeing tickets for forts are not included in the package.",
        ],
      },
      {
        title: "Traveler's Instruction",
        content: [
          "A separate room for twin sharing will be allotted to married couples only, but will be charged extra as mentioned above.",
          "In case of any Change in tour plan (due to unavoidable Conditions as mentioned above, resulting in a change of cost, the extra amount will be paid by the guest on a sharing basis.",
          "Team Hodophile adventures are not responsible for Train Bogies or Coaches' condition, also not responsible for late timing arrival or departure, as it's beyond our control...",
          "Don't pollute the environment; you will be charged for it.",
          "Please ensure following the team leader's instructions.",
          "Be thoughtful of not failing any ethical integrity.",
          "Make sure you travel like a family and make all its members safe and connected while respecting the Locals, their Cultures, religious & beliefs.",
          "Package price calculated as per current fuel prices. If the fuel prices rise up to Rs. 10-20, we will charge @Rs. 1,000 to 2,000/head extra.",
        ],
      },
    ],
    highlights: ["Saif-ul-Malook", "Baltit & Altit Forts", "Deosai Meadows", "Shigar Fort", "Attabad Lake", "Passu Cones"],
    itinerary: [
      {
        day: "Day 1",
        title: "Departure from Karachi",
        description: "Departure from Karachi via bus or train. Meals in bus/train are not included; airline travel is available on request for the next day.",
      },
      {
        day: "Day 2",
        title: "Arrival in Islamabad",
        description: "Arrive in Rawalpindi/Islamabad and transfer to your hotel via own conveyance (Uber/Careem or private transport).",
      },
      {
        day: "Day 3",
        title: "Travel to Chilas",
        description: "Tour begins. Depart Islamabad at 4:00 AM via Hazara Motorway. Breakfast at Balakot/Besham, with possible Babusar Top route if open. Stops at Kiwai Waterfall, Sohni Waterfall, Lulusar Lake, and Babusar Top. Arrive in Chilas by 8:00 PM.",
      },
      {
        day: "Day 4",
        title: "Skardu via Astak Nala",
        description: "Breakfast and departure for Skardu at 9:00 AM. Short stop at Astak Nala, then visit Upper and Lower Kachura Lakes including Shangrila Resort. Overnight stay in Skardu View Point or equivalent.",
      },
      {
        day: "Day 5",
        title: "Shigar Fort & Sarfranga Desert",
        description: "Breakfast and departure to Manthokha Waterfall and Shigar Valley. Visit Shigar Fort and Sarfranga Cold Desert, then return to Skardu in the evening.",
      },
      {
        day: "Day 6",
        title: "Deosai via 4x4 Jeep",
        description: "Early departure for a full-day 4x4 jeep expedition to Deosai/Basho Meadows. Return to Skardu for dinner and overnight stay.",
      },
      {
        day: "Day 7",
        title: "Travel to Hunza",
        description: "Depart for Hunza at 9:00 AM with stops at 3 Mountain Junction and Rakaposhi viewpoint. Arrive in Hunza, visit Baltit and Altit Fort, and explore Karimabad Bazaar.",
      },
      {
        day: "Day 8",
        title: "Upper Hunza & Khunjerab Pass",
        description: "Visit Attabad Lake and travel toward Khunjerab Pass/China Border or explore Gulmit and Borith Lake. See Passu Cones and the Hussaini Suspension Bridge before returning to the hotel.",
      },
      {
        day: "Day 9",
        title: "Travel to Naran Valley",
        description: "Depart in the morning for Naran Valley, with a short stop at Kunhar River and a river rafting opportunity. Arrive and check in at Hotel Kings Inn or equivalent.",
      },
      {
        day: "Day 10",
        title: "Jheel Saif-ul-Malook & Islamabad",
        description: "Visit Jheel Saif-ul-Malook, then return to Islamabad. Tour ends for Islamabad members; Karachi members stay in a hotel in Islamabad without food included.",
      },
      {
        day: "Day 11",
        title: "Karachi Departure",
        description: "Check out and transfer to the bus terminal or railway station via own conveyance. Drop facility available on request for a charge. No breakfast included for Karachi participants.",
      },
      {
        day: "Day 12",
        title: "Arrival in Karachi",
        description: "Arrive back in Karachi and conclude the trip.",
      },
    ],
  },
  {
    slug: "hunza-skardu",
    title: "12 Days Naran, Hunza, Skardu, Shigar & Deosai",
    homeImage: "/images/featured-tours/12days-hunza-skardu.jpg.jpeg",
    heroImage: "/images/destinations/featured-skardu-hunza-2.jpg",
    duration: "12 Days / 11 Nights",
    summary: "Naran, Hunza, Skardu, Shigar, and Deosai combined into a bold northern journey.",
    description:
      "Naran is the Kaghan Valley's lively heart with pine-scented air and the glacial Kunhar River. Hunza is a crown jewel of mountains and lakes. Skardu brings raw high-altitude landscapes, while Deosai delivers the legendary 'Land of Giants'.",
    overview:
      "Experience the ultimate northern Pakistan adventure on this 12-day journey through Naran, Hunza, Skardu, Shigar, and Deosai. From the glacial waters of Kunhar River and iconic Jheel Saif-ul-Malook in Naran to the serene turquoise of Attabad Lake and the historic Baltit and Altit Forts in Hunza, every stop is a feast for the eyes. Marvel at the rugged landscapes of Skardu, explore the Shangrila Resort, Shigar Fort, and the Sarfaranga Cold Desert, and witness the untamed beauty of Deosai—Pakistan’s high-altitude ‘Land of Giants.’ Along the way, traverse legendary routes like the Karakoram Highway and Hazara Motorway, cross the iconic Rainbow Suspension Bridge, and stand in awe at the mighty Rakaposhi and Nanga Parbat viewpoints. This tour blends breathtaking scenery, rich heritage, and thrilling adventure into one unforgettable journey.",
    attractions: [
      "Hazara Motorway",
      "Karakoram Highway",
      "Chilas",
      "Juglot",
      "3 Mountain Junction",
      "Nanga Parbat View Point",
      "Karimabad Bazaar",
      "Baltit Fort",
      "Altit Fort",
      "Upper Hunza",
      "Passu Cones",
      "Attabad Lake",
      "Khunjerab Pass",
      "Hussaini Bridge",
      "Gojal",
      "Royal Garden",
      "Astak Nala",
      "Skardu",
      "Shangrila Resort",
      "Upper Kachura Lake",
      "Shigar Fort",
      "Sarfranga Cold Desert",
      "Manthokha Waterfall",
      "Naran Valley",
      "Kunhar River",
      "Babusar Top",
      "Jheel Saif-ul-Malook",
      "Lulusar Lake",
      "Sohni Waterfall",
    ],
    pricingGroups: [
      {
        title: "With Islamabad Stay",
        rows: [
          { label: "Quad-4 Person Sharing", price: "Rs. 49,700" },
          { label: "Triple-3 Person Sharing", price: "Rs. 52,700" },
          { label: "Twin-2 Person Sharing", price: "Rs. 58,700" },
          { label: "Solo Single Room", price: "Rs. 94,700" },
        ],
      },
      {
        title: "Without Islamabad Stay",
        rows: [
          { label: "Quad-4 Person Sharing", price: "Rs. 46,700" },
          { label: "Triple-3 Person Sharing", price: "Rs. 49,700" },
          { label: "Twin-2 Person Sharing", price: "Rs. 53,700" },
          { label: "Solo Single Room", price: "Rs. 81,700" },
        ],
      },
    ],
    childPolicy: [
      "Below 3 years: Free of cost, no seat provided (lap seating with parent).",
      "3 to 7 years: 50% charged with folding/jumper seat provided.",
      "Above 7 years: 100% charged with full seat.",
    ],
    meals: {
      breakfast: "Anda, Paratha, Tea, Channa, Omelet on rotation.",
      dinner: "Chicken Pulao, Shami Kebabs, Chicken Karahi, Handi, BBQ, Chicken Fried Rice, Vegetables, Daal, Raita, Salad, Naan, Cold Drink on rotation.",
    },
    includes: [
      "Hotel accommodations",
      "Luxury transport",
      "4x4 Prado and local jeep rides",
      "Breakfasts and dinners",
      "Tolls and taxes",
      "Tour guide",
      "Bonfire and scenic phone photography",
    ],
    servicesIncluded: [
      "Half-board meals as noted in itinerary",
      "Quad/4-person sharing room basis",
      "Luxury Grand Cabin or Coaster transport",
      "Tour manager/guide services",
      "Basic first aid kit",
      "All tolls and taxes",
    ],
    servicesExcluded: [
      "Fort, park, museum, and heater entry tickets",
      "Porters for personal equipment",
      "Extra expenses due to landslides or roadblocks",
      "Trekking equipment and water sports costs",
      "Heater or air conditioner charges",
      "Extra Jeep/Careem/Uber charges",
      "Tea, mineral water, cold drinks, and room services",
      "Personal insurance, evacuation, laundry, and phone calls",
    ],
    importantNotes: [
      "Separate twin-sharing rooms are charged extra and allotted only to married couples.",
      "Package pricing is based on current fuel costs; a fuel spike may add Rs. 1,000–2,000 per person.",
      "Weather, landslides, route closures, or political events may require itinerary changes.",
    ],
    bookingPolicy: [
      "Reserve a seat with 50% advance payment 7 days before departure.",
      "Send payment confirmation screenshot or transfer receipt after payment.",
      "Remaining payment due 3 days before departure from Karachi or on departure day in Islamabad.",
    ],
    detailSections: [
      {
        title: "Details",
        content: [
          "Departure from Karachi by bus or train; airline option available on request.",
          "Meals on the bus/train are not included.",
          "Airport/station pickup is available on request for an extra charge.",
          "Hotel check-in starts from 2:00 PM.",
          "First-night dinner is served in rooms between 9:30 PM and 10:00 PM.",
          "The tour begins in Chilas on Day 3 after the Hazara Motorway leg.",
        ],
      },
      {
        title: "Menu During Trip",
        content: [
          "Breakfast includes Anda, Paratha, Tea, Channa, and Omelet on rotation.",
          "Dinner includes Chicken Pulao, Shami Kebabs, Chicken Karahi, Handi, BBQ, Chicken Fried Rice, Vegetables, Daal, Raita, Salad, and Naan on rotation.",
        ],
      },
      {
        title: "Refund Policy",
        content: [
          "50% refund if cancellation is made 7 days before the event.",
          "30% refund if cancellation is made 3 days before the event.",
          "0% refund if cancellation is made one day before the event.",
        ],
      },
      {
        title: "Terms & Conditions",
        content: [
          "Minimum group size is 10; trips canceled due to low registration may receive a full refund or transfer.",
          "No refunds for natural disasters, road closures, or events beyond human control.",
          "Hodophile Adventures can cancel or change bookings and terms at any time.",
          "Personal weapons, drugs, and alcohol are not permitted.",
          "Sightseeing tickets for forts are not included.",
        ],
      },
      {
        title: "Traveler's Instruction",
        content: [
          "A separate room for twin sharing will be allotted to married couples only, but will be charged extra as mentioned above.",
          "In case of any Change in tour plan (due to unavoidable Conditions as mentioned above, resulting in a change of cost, the extra amount will be paid by the guest on a sharing basis.",
          "Team Hodophile adventures are not responsible for Train Bogies or Coaches' condition, also not responsible for late timing arrival or departure, as it's beyond our control...",
          "Don't pollute the environment; you will be charged for it.",
          "Please ensure following the team leader's instructions.",
          "Be thoughtful of not failing any ethical integrity.",
          "Make sure you travel like a family and make all its members safe and connected while respecting the Locals, their Cultures, religious & beliefs.",
          "Package price calculated as per current fuel prices. If the fuel prices rise up to Rs. 10-20, we will charge @Rs. 1,000 to 2,000/head extra.",
        ],
      },
    ],
    highlights: ["Saif-ul-Malook", "Baltit & Altit Forts", "Deosai Meadows", "Shigar Fort", "Attabad Lake", "Passu Cones"],
    itinerary: [
      {
        day: "Day 1",
        title: "Departure from Karachi",
        description: "Departure from Karachi via bus or train. Meals in bus/train are not included; airline travel is available on request.",
      },
      {
        day: "Day 2",
        title: "Arrival in Islamabad",
        description: "Arrive in Rawalpindi/Islamabad and transfer to your hotel using your own conveyance.",
      },
      {
        day: "Day 3",
        title: "Travel to Chilas",
        description: "Tour begins. Depart Islamabad at 4:00 AM via Hazara Motorway. Breakfast at Balakot/Besham, with stops at Kiwai Waterfall, Sohni Waterfall, Lulusar Lake, and Babusar Top. Arrive in Chilas by 8:00 PM.",
      },
      {
        day: "Day 4",
        title: "Skardu via Astak Nala",
        description: "Depart for Skardu at 9:00 AM. Visit Astak Nala, then Upper and Lower Kachura Lakes including Shangrila Resort.",
      },
      {
        day: "Day 5",
        title: "Shigar Fort & Sarfranga",
        description: "Visit Manthokha Waterfall, then Shigar Valley and Shigar Fort, followed by the Sarfranga Cold Desert.",
      },
      {
        day: "Day 6",
        title: "Deosai via 4x4 Jeep",
        description: "Full-day 4x4 jeep expedition to Deosai/Basho Meadows, then return to Skardu for dinner and overnight.",
      },
      {
        day: "Day 7",
        title: "Travel to Hunza",
        description: "Depart for Hunza at 9:00 AM with stops at 3 Mountain Junction and Rakaposhi viewpoint. Visit Baltit and Altit Forts and Karimabad Bazaar.",
      },
      {
        day: "Day 8",
        title: "Upper Hunza & Khunjerab Pass",
        description: "Visit Attabad Lake and travel toward Khunjerab Pass/China Border or explore Gulmit and Borith Lake. See Passu Cones and Hussaini Suspension Bridge.",
      },
      {
        day: "Day 9",
        title: "Travel to Naran Valley",
        description: "Depart early for Naran Valley with a stop at Kunhar River and a river rafting opportunity. Arrive in Naran and check in.",
      },
      {
        day: "Day 10",
        title: "Jheel Saif-ul-Malook & Islamabad",
        description: "Visit Jheel Saif-ul-Malook, then return to Islamabad. Tour ends for Islamabad members; Karachi members stay overnight with no food included.",
      },
      {
        day: "Day 11",
        title: "Karachi Departure",
        description: "Check out and transfer to the bus terminal or railway station via your own conveyance. Drop facility available on request; breakfast not included for Karachi members.",
      },
      {
        day: "Day 12",
        title: "Arrival in Karachi",
        description: "Arrive in Karachi and conclude the tour.",
      },
    ],
  },
  {
    slug: "hunza-naltar",
    title: "10 Days Naran, Hunza & Naltar",
    homeImage: "/images/featured-tours/10days-hunza-naltar.jpg.jpeg",
    heroImage: "/images/destinations/naltar-valley-pakistan.jpg",
    duration: "10 Days / 9 Nights",
    summary: "A refreshing northern route with Naran Valley, Hunza heritage, and alpine Naltar lakes.",
    description:
      "This tour pairs Naran's highland meadows with Hunza's mountains and the blue lakes of Naltar for a balanced, scenic northern escape.",
    overview:
      "Embark on a breathtaking 10-day journey through northern Pakistan’s most iconic destinations, including Naran, Hunza, and Naltar Valley. This group tour takes you along the scenic Hazara Motorway and Karakoram Highway, offering stunning views of snow-capped peaks, crystal-clear lakes, cascading waterfalls, and mighty rivers. Explore the enchanting Naltar Lakes, Naltar Ski Resort, and Satrangi Lake, and witness the majestic Passu Cones, Baltit Fort, and Attabad Lake in Hunza. Experience the thrill of high-altitude adventure at Khunjerab Pass, walk across the iconic Rainbow Suspension Bridge, and enjoy the serene beauty of Jheel Saif-ul-Malook and Babusar Top. With a perfect blend of natural wonders, cultural heritage, and adventure, this tour promises an unforgettable exploration of Pakistan’s northern treasures.",
    attractions: [
      "Hazara Motorway",
      "Naran Valley",
      "Kunhar River",
      "Lulusar Lake",
      "Babusar Top",
      "Jheel Saif-ul-Malook",
      "Sohni Waterfall",
      "Kiwai Waterfall",
      "Naltar Valley",
      "Naltar Lakes",
      "Snow Leopards",
      "Satrangi Lake",
      "Naltar Ski Resort",
      "Hunza Valley",
      "Karakoram Highway",
      "Chilas",
      "Juglot",
      "3 Mountain Junction",
      "Nanga Parbat View Point",
      "Baltit Fort",
      "Karimabad Bazaar",
      "Attabad Lake",
      "Khunjerab Pass",
      "Passu Cones",
      "Rainbow/Hussaini Suspension Bridge",
      "Balakot",
    ],
    pricingGroups: [
      {
        title: "With Islamabad Stay",
        rows: [
          { label: "Quad-4 Person Sharing", price: "Rs. 42,000" },
          { label: "Triple-3 Person Sharing", price: "Rs. 45,000" },
          { label: "Twin-2 Person Sharing", price: "Rs. 49,000" },
          { label: "Solo Single Room", price: "Rs. 77,000" },
        ],
      },
      {
        title: "Without Islamabad Stay",
        rows: [
          { label: "Quad-4 Person Sharing", price: "Rs. 39,000" },
          { label: "Triple-3 Person Sharing", price: "Rs. 43,000" },
          { label: "Twin-2 Person Sharing", price: "Rs. 47,000" },
          { label: "Solo Single Room", price: "Rs. 67,000" },
        ],
      },
    ],
    childPolicy: [
      "Below 3 years: Free of cost, no seat provided (lap seating with parent).",
      "3 to 7 years: 50% charged with folding/jumper seat provided.",
      "Above 7 years: 100% charged with full seat.",
    ],
    meals: {
      breakfast: "Anda, Paratha, Tea, Channa, Omelet on rotation.",
      dinner: "Chicken Karahi, Handi, BBQ, Chicken Fried Rice, Vegetables, Daal, Raita, Salad, Naan on rotation.",
    },
    includes: [
      "Hotel accommodations",
      "Luxury transport",
      "Breakfasts and dinners",
      "Tolls and taxes",
      "Tour guide",
      "Bonfire and scenic phone photography",
    ],
    servicesIncluded: [
      "Half-board meals as mentioned in itinerary",
      "Quad/4-person room sharing basis",
      "Luxury Grand Cabin or Coaster transport",
      "Tour manager/guide services",
      "Basic first aid kit",
      "All tolls and taxes",
    ],
    servicesExcluded: [
      "Entry tickets for forts, parks, museums, and heaters",
      "Porters for personal equipment",
      "Extra expenses due to landslides or roadblocks",
      "Trekking equipment and water sports activities",
      "Heater or air conditioner charges",
      "Extra Jeep/Careem/Uber charges",
      "Tea, mineral water, cold drinks, and room services",
      "Personal insurance, evacuation, laundry, and phone calls",
    ],
    importantNotes: [
      "Accommodation is designed for 3-4 person room sharing; rooms may include mattresses and bed sharing.",
      "Fuel surcharges may apply if fuel prices rise.",
      "Unexpected weather or road closures may require itinerary changes.",
    ],
    bookingPolicy: [
      "Reserve a seat with 50% advance payment at least 7 days before departure.",
      "Send payment confirmation screenshot or transfer receipt after payment.",
      "Remaining payment due 3 days before departure from Karachi or on departure day in Islamabad.",
    ],
    detailSections: [
      {
        title: "Details",
        content: [
          "Departure from Karachi by bus or train; airline option available on request.",
          "Meals on the bus/train are not included.",
          "Airport/station pickup is available on request for an extra charge.",
          "Hotel check-in starts from 2:00 PM.",
          "First-night dinner is served in rooms between 9:30 PM and 10:00 PM.",
          "The tour begins on Day 3 in Chilas after the Hazara Motorway leg.",
        ],
      },
      {
        title: "Menu During Trip",
        content: [
          "Breakfast includes Anda, Paratha, Tea, Channa, and Omelet on rotation.",
          "Dinner includes Chicken Karahi, Handi, BBQ, Chicken Fried Rice, Vegetables, Daal, Raita, Salad, and Naan on rotation.",
        ],
      },
      {
        title: "Refund Policy",
        content: [
          "50% refund if cancellation is made 7 days before the event.",
          "30% refund if cancellation is made 3 days before the event.",
          "0% refund if cancellation is made one day before the event.",
        ],
      },
      {
        title: "Terms & Conditions",
        content: [
          "Minimum group size is 10; trips canceled due to low registration may receive a full refund or transfer.",
          "No refunds for natural disasters, road closures, or events beyond human control.",
          "Hodophile Adventures can cancel or change bookings and terms at any time.",
          "Personal weapons, drugs, and alcohol are not permitted.",
          "Sightseeing tickets for forts are not included.",
        ],
      },
      {
        title: "Traveler's Instruction",
        content: [
          "A separate room for twin sharing will be allotted to married couples only, but will be charged extra as mentioned above.",
          "In case of any Change in tour plan (due to unavoidable Conditions as mentioned above, resulting in a change of cost, the extra amount will be paid by the guest on a sharing basis.",
          "Team Hodophile adventures are not responsible for Train Bogies or Coaches' condition, also not responsible for late timing arrival or departure, as it's beyond our control...",
          "Don't pollute the environment; you will be charged for it.",
          "Please ensure following the team leader's instructions.",
          "Be thoughtful of not failing any ethical integrity.",
          "Make sure you travel like a family and make all its members safe and connected while respecting the Locals, their Cultures, religious & beliefs.",
          "Package price calculated as per current fuel prices. If the fuel prices rise up to Rs. 10-20, we will charge @Rs. 1,000 to 2,000/head extra.",
        ],
      },
    ],
    highlights: ["Naltar Alpine Lakes", "Baltit Fort", "Attabad Lake", "Hunza Heritage", "Kunhar River", "Saif-ul-Malook"],
    itinerary: [
      {
        day: "Day 1",
        title: "Departure from Karachi",
        description: "Depart from Karachi via bus or train. Meals in bus/train are not included; airline option available on request.",
      },
      {
        day: "Day 2",
        title: "Arrival in Islamabad",
        description: "Arrive in Rawalpindi/Islamabad and transfer to your hotel using your own conveyance.",
      },
      {
        day: "Day 3",
        title: "Travel to Chilas",
        description: "Depart Islamabad at 4:00 AM via Hazara Motorway. Breakfast at Balakot/Besham with stops at Kiwai Waterfall, Sohni Waterfall, and Lulusar Lake. Arrive in Chilas by 8:00 PM.",
      },
      {
        day: "Day 4",
        title: "Naltar Valley & Hunza",
        description: "Travel to Naltar Valley, transfer to a 4x4 jeep in Nomal, and explore Naltar Lakes if weather permits. Continue to Hunza and check in.",
      },
      {
        day: "Day 5",
        title: "Upper Hunza",
        description: "Visit Attabad Lake and travel toward Khunjerab Pass/China Border or explore Gulmit and Borith Lake. See Passu Cones and Rainbow Suspension Bridge.",
      },
      {
        day: "Day 6",
        title: "Nagar Valley",
        description: "Visit Baltit Fort, Karimabad Bazaar, Hoper Glacier, and Nagar Natural Cricket Ground before returning to the hotel.",
      },
      {
        day: "Day 7",
        title: "Travel to Naran Valley",
        description: "Depart for Naran Valley with stops at Nanga Parbat View Point, 3 Mountain Junction, and Kunhar River. Arrive in Naran and check in.",
      },
      {
        day: "Day 8",
        title: "Jheel Saif-ul-Malook & Islamabad",
        description: "Visit Jheel Saif-ul-Malook, then return to Rawalpindi/Islamabad. Tour ends for Islamabad members; Karachi members stay overnight with no food included.",
      },
      {
        day: "Day 9",
        title: "Departure for Karachi",
        description: "Check out and travel to the bus terminal or railway station via own conveyance. Drop facility available on request; breakfast not included for Karachi participants.",
      },
      {
        day: "Day 10",
        title: "Arrival in Karachi",
        description: "Arrive in Karachi and conclude the tour.",
      },
    ],
  },
];

export const featuredTourRoutePaths = featuredTourCards.map((tour) => `/tours/featured/${tour.slug}`);

export function getFeaturedTourBySlug(slug: string) {
  return featuredTourCards.find((tour) => tour.slug === slug);
}