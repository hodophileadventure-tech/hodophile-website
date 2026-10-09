import { getTourPackageById } from "./tour-packages";

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

export const featuredTourTermsAndConditions: TourDetailSection[] = [
  {
    title: "Terms & conditions",
    content: [
      "Our Terms & Conditions are strictly followed and applied.",
      "We encourage you to read and agree carefully before booking a trip with us.",
      "HODOPHILE ADVENTURES reserves the right to cancel a trip without prior notice for any reasons deemed appropriate by them. In such a case the registered participants will receive a full refund.",
      "Due to situations like weather, local politics, transport, best interest of the client, or other factors beyond the control of management, the itinerary can change. If alterations are necessary, management will decide the best alternative while keeping the interests of the whole group in mind. We will try our best to visit other main points if changes are required.",
    ],
  },
  {
    title: "SECTION 2: Strictly Prohibited",
    content: [
      "The members shall not be indulged in any act reflecting moral or character failing during the activities.",
      "Using drugs or being found in any party to drug sale or possession is strictly prohibited. If anyone is found or caught using any kind of drug, they will be expelled from the trip right away on the spot and the person will not be eligible for any kind of refund.",
      "Management reserves the right to terminate or regret any participant due to indiscipline and the person will not be eligible for any kind of refund.",
      "Smoking in the transport is strictly prohibited. Use of violent behavior including altercation, insinuations of indecent kind, verbal and physical abuse and assault, aggravated behavior, or any other act amounting to unbecoming of a member are strictly prohibited.",
    ],
  },
  {
    title: "SECTION 3: Respect and Privacy",
    content: [
      "All members would give extra care for the local environmental care. Garbage (tins, water bottles, wrappers etc.) shall be suitably disposed without polluting water sources.",
    ],
  },
  {
    title: "SECTION 4: Rights of Management",
    content: [
      "Management reserves the right to use event photos for electronic/digital media. If anyone has concerns, we will blur their face.",
      "The decision of the food menu will be completely in the hands of the management.",
    ],
  },
  {
    title: "SECTION 5: VEHICLE DEMAGE",
    content: [
      "HODOPHILE ADVENTURES will not pay any vehicle charges in case of road closed due to heavy snowfall or landslide.",
      "On steep ascends in mountainous areas, the air conditioning of the vehicle could be turned off to prevent from overheating. As we know the vehicle is machinery, so if it breaks down at any point for any reason, then the management will not be responsible for that.",
      "In case of damage of vehicle, hotels and the club's equipment i.e. trekking sticks, rain coats, rafting pedals, shoes and many others by any of the participants, the particular participant will be held responsible and payable for that damaged.",
      "The check-out time of the hotels is at 12:00 PM and check-in time is at 2:00 PM. So, if the tour arrives ahead of time, all the participants will patiently wait for the rooms.",
    ],
  },
  {
    title: "SECTION 6: INSURANCE & NATURAL DISASTERS",
    content: [
      "Travel insurance is not covered in the tour price. You can arrange travel insurance with your preferred insurance company.",
      "We will try our possible level best and care will be taken for the safety of members; still, each venture can be fraught with endangers of unforeseen natural disasters like avalanches and crevasse falls or any other accidents, and sometimes such disasters cannot be ruled out. In any such type of accident during the whole tour, the company, group leader and the tour organizers will not be held responsible in any form.",
      "In case of unforeseen events like land sliding, any extra costs incurred won't be the responsibility of the management.",
      "In case of theft, loss or damage to personal belongings during the duration of the trip, management will not be held responsible in any case.",
      "Tours inherit the risks of injuries or health issues at times. Participants need to consider these risks before booking their trips. In case of any mishap, injury or accident, the management will not be held responsible in any form.",
      "All activities shall be done by members on their own accord and HODOPHILE ADVENTURES Pakistan will not be responsible for any mishaps whatsoever.",
      "HODOPHILE ADVENTURES shall not be responsible for anything not mentioned explicitly.",
    ],
  },
  {
    title: "SECTION 7: Cancellation & Booking Policy",
    content: [
      "When you make a booking, kindly view the terms & conditions which reflects the cancellation, refund with booking terms & conditions. If you find difficulty in cancelling, you can get the same cancelled by calling our numbers. Cancellation of your request may require a minimum processing time, subject to specific terms and conditions applicable to the type of tour.",
      "There may be a full cancellation penalty on our booked tours, which are cancelled after the cancellation deadline mentioned in the terms and conditions.",
      "You agree to bear the full cost of any booking and cancellation fees for any services booked but not utilized for any reason. In some cases, HODOPHILE ADVENTURES may charge cancellation or amendment fees in addition to those imposed by travel service providers.",
      "HODOPHILE ADVENTURES reserves the right to decline any booking for any reason and shall not be held liable for any resulting claims of losses or compensation. In such an event, HODOPHILE ADVENTURES shall refund to you all unutilized money collected from you for that.",
      "For bookings which have already been paid by you, when cancelled, refunds will be made based on the refund policy mentioned in terms and conditions while making the booking. For corporate or customized tours, it may take between 15 to 25 working days for the amount to get credited into your account. Refund policies may vary for every tour and service.",
      "Cancellation policy is subject to change. It is purely depending upon the cancellation policy of respective hotels. In peak seasons, some hotels may charge 100% cancellation.",
      "Cancellation Policy: 48 HRS or less, 100% cancellation charges of the advanced amount apply. More than 48 HRS, 50% cancellation charges of the advanced amount apply. 4 days or more, no cancellation charges. No amount will be refunded if any person leaves the trip at any stage due to any reason.",
    ],
  },
];

export type FeaturedTourCard = {
  slug: string;
  canonicalPackageId?: string;
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
  hoverVideo?: string;
  priceFrom?: string;
};

const distinctFeaturedTourCards: FeaturedTourCard[] = [
  {
    slug: "skardu-deosai",
    title: "10 Days Skardu, Shigar & Shangrila",
    homeImage: "/images/package-cards/images__featured-tours__skardu-deosai.jpg.webp",
    heroImage: "/images/package-cards/images__destinations__skardu.webp",
    duration: "10 Days / 7 Nights",
    priceFrom: "Rs. 39,000",
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
        note: "Prices are per person and exclude round-trip tickets between Karachi and Islamabad.",
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
      "4x4 Jeep ride",
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
    hoverVideo: "/videos/skardu-shigar-shangrila.mp4",
  },
  {
    slug: "hunza-naltar",
    title: "10 Days Naran, Hunza & Naltar",
    homeImage: "/images/package-cards/images__featured-tours__hunza-naltar.jpg.webp",
    heroImage: "/images/package-cards/images__destinations__naltar-valley-pakistan.webp",
    duration: "10 Days / 9 Nights",
    priceFrom: "Rs. 39,000",
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
        note: "Prices are per person and exclude round-trip tickets between Karachi and Islamabad.",
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
      "4x4 Jeep ride",
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
    hoverVideo: "/videos/hunza-naltar.mp4",
  },
];

const canonicalFeaturedAliases: Record<string, string> = {
  "kashmir-taobat": "seasonal-11",
  "hunza-skardu": "hunza-skardu-naran-12-days",
};

const canonicalFeaturedTourCards = Object.entries(canonicalFeaturedAliases).map(([slug, packageId]) => {
  const tourPackage = getTourPackageById(packageId);
  if (!tourPackage) throw new Error(`Missing canonical journey for featured alias ${slug}`);

  const listedPrice = tourPackage.priceOnRequest
    ? "Price on request"
    : `PKR ${tourPackage.pricePerPerson.toLocaleString()}`;
  const pricingRows = tourPackage.sharingPrices
    ? [
        { label: "Quad sharing", price: `PKR ${tourPackage.sharingPrices.quad.toLocaleString()}` },
        { label: "Triple sharing", price: `PKR ${tourPackage.sharingPrices.triple.toLocaleString()}` },
        { label: "Twin sharing", price: `PKR ${tourPackage.sharingPrices.twin.toLocaleString()}` },
        { label: "Solo", price: `PKR ${tourPackage.sharingPrices.solo.toLocaleString()}` },
      ]
    : [{ label: "Per person", price: listedPrice }];

  return {
    slug,
    canonicalPackageId: tourPackage.id,
    title: tourPackage.title,
    homeImage: tourPackage.image,
    heroImage: tourPackage.image,
    duration: tourPackage.duration,
    priceFrom: tourPackage.priceOnRequest ? listedPrice : `${listedPrice} per person`,
    summary: tourPackage.description,
    description: tourPackage.description,
    overview: tourPackage.description,
    attractions: tourPackage.routeStops,
    pricingGroups: [{ title: "Listed price", rows: pricingRows }],
    includes: tourPackage.includes ?? [],
    servicesIncluded: tourPackage.includes ?? [],
    servicesExcluded: tourPackage.excludes ?? [],
    importantNotes: tourPackage.notes ?? [],
    bookingPolicy: ["Request your dates to confirm current availability and package details."],
    highlights: tourPackage.routeHighlights ?? tourPackage.routeStops,
    itinerary: tourPackage.itinerary ?? [],
  } satisfies FeaturedTourCard;
});

export const featuredTourCards: FeaturedTourCard[] = [
  ...distinctFeaturedTourCards,
  ...canonicalFeaturedTourCards,
];

const featuredTourDisplayOrder = [
  "hunza-skardu",
  "hunza-naltar",
  "skardu-deosai",
  "kashmir-taobat",
] as const;

const featuredTourDisplayOrderIndex = new Map(
  featuredTourDisplayOrder.map((slug, index) => [slug, index]),
);

export const orderedFeaturedTourCards = [...featuredTourCards].sort((a, b) => {
  const aIndex = featuredTourDisplayOrderIndex.get(a.slug as (typeof featuredTourDisplayOrder)[number]) ?? Number.MAX_SAFE_INTEGER;
  const bIndex = featuredTourDisplayOrderIndex.get(b.slug as (typeof featuredTourDisplayOrder)[number]) ?? Number.MAX_SAFE_INTEGER;
  return aIndex - bIndex;
});

export const featuredTourRoutePaths = featuredTourCards.map((tour) => `/tours/featured/${tour.slug}`);
export const indexableFeaturedTourRoutePaths = featuredTourCards
  .filter((tour) => !tour.canonicalPackageId)
  .map((tour) => `/tours/featured/${tour.slug}`);

export function getFeaturedTourBySlug(slug: string) {
  return featuredTourCards.find((tour) => tour.slug === slug);
}
