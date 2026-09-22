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
  includes: string[];
  excluded: string[];
  bookingPolicy: string[];
  childPolicy: string[];
  mealsMenu: { breakfast: string; dinner: string };
  detailSections: { title: string; content: string[] }[];
};

const sharedIncludes = [
  "Hotel accommodation",
  "Private transport with driver",
  "Breakfast as per hotel plan",
  "Route coordination and booking support",
];

const sharedExcluded = [
  "Personal expenses and shopping",
  "Entry tickets and optional activities",
  "Travel insurance",
  "Extra charges caused by weather or road closures",
];

const sharedBookingPolicy = [
  "A 50% advance confirms the booking.",
  "Remaining payment is due before departure.",
  "Hotels and activities remain subject to availability.",
];

const sharedChildPolicy = [
  "Below 3 years: Free without a separate seat.",
  "3 to 7 years: 50% charge with a child seat where available.",
  "Above 7 years: Full charge with a full seat.",
];

const sharedMeals = {
  breakfast: "Tea, paratha, omelet, channa, and seasonal hotel breakfast.",
  dinner: "Pakistani dinner menu with chicken, rice, vegetables, daal, roti, raita, and salad.",
};

const sourcePackages: Array<Omit<AdditionalHoneymoonPackage, "title" | "description" | "overview" | "attractions" | "includes" | "excluded" | "bookingPolicy" | "childPolicy" | "mealsMenu" | "detailSections"> & { title: string }> = [
  { slug: "naran-shogran-neelum-9days", name: "Naran, Shogran & Neelum Valley", duration: "9 Days / 8 Nights", detail: "A two-valley escape combining Kashmir's rivers and meadows with Naran and Shogran's alpine lakes.", price: "PKR 210,000", image: "/images/honeymoon/naran-shogran-neelum.webp", title: "Naran Shogran Neelum Valley 9 Days Tour" },
  { slug: "naran-kaghan-azad-kashmir-7days", name: "Naran, Kaghan & Azad Kashmir", duration: "7 Days / 6 Nights", detail: "A romantic route through Neelum Valley, Shogran, Naran, Saif-ul-Malook, and Babusar Top.", price: "PKR 210,000", image: "/images/honeymoon/azad-kashmir-naran-shogran.webp", title: "Naran Kaghan Azad Kashmir 7 Days Tour" },
  { slug: "naran-shogran-luxury-5days", name: "Naran & Shogran Luxury Escape", duration: "5 Days / 4 Nights", detail: "A private luxury journey through Shogran meadows, Naran Valley, Saif-ul-Malook, and Babusar Top.", price: "PKR 245,000", image: "/images/honeymoon/naran-shogran-luxury.webp", title: "Naran Shogran Luxury 5 Days" },
  { slug: "naran-kaghan-3days", name: "Naran Kaghan Short Escape", duration: "3 Days / 2 Nights", detail: "A compact couples route covering Naran, Lulusar Lake, Babusar Top, and Saif-ul-Malook.", price: "PKR 80,000", image: "/images/honeymoon/naran-kaghan-short.webp", title: "Naran Kaghan 3 Days Tour" },
  { slug: "naran-shogran-economy-5days", name: "Naran Shogran Economy Couple Tour", duration: "5 Days / 4 Nights", detail: "A comfortable, value-led private route with two jeep excursions and scenic valley stays.", price: "PKR 70,000", image: "/images/honeymoon/naran-shogran-alt.webp", title: "Naran Shogran Economy 5 Days" },
  { slug: "ratti-gali-lake-3days", name: "Ratti Gali Lake Escape", duration: "3 Days / 2 Nights", detail: "A scenic Neelum Valley journey with a jeep transfer and trek to the jewel-blue Ratti Gali Lake.", price: "PKR 40,000", image: "/images/honeymoon/ratti-gali-lake.webp", title: "Ratti Gali Lake 3 Days Tour" },
  { slug: "naran-neelum-2023", name: "Naran & Neelum Valley", duration: "6 Days / 5 Nights", detail: "A combined valley route linking Naran's lakes with Keran, Sharda, and Arang Kel.", price: "PKR 88,500", image: "/images/honeymoon/naran-neelum.webp", title: "Naran Neelum Tour" },
  { slug: "hunza-naltar-day", name: "Naltar Valley Day Escape", duration: "1 Day", detail: "A private day route from Gilgit to Naltar's colorful lakes, pine forests, and cool mountain air.", price: "PKR 25,000", image: "/images/honeymoon/naltar-day-escape.webp", title: "One Day Naltar Valley Tour" },
  { slug: "hunza-famree-5days", name: "Famree Resort Hunza", duration: "5 Days / 4 Nights", detail: "A lakeside Hunza stay with private transport, resort comfort, and curated valley excursions.", price: "PKR 197,500", image: "/images/honeymoon/hunza-deluxe.webp", title: "5 Day Famree Resort Hunza" },
  { slug: "hunza-honeymoon-air-5days", name: "Premium Hunza Honeymoon by Air", duration: "5 Days / 4 Nights", detail: "A private flight-based honeymoon with luxury hotels, Attabad Lake, Naltar, and historic forts.", price: "PKR 450,000 / couple", image: "/images/honeymoon/hero.webp", title: "Premium Hunza Honeymoon by Air" },
  { slug: "darbar-hunza-4days", name: "Darbar Hotel Hunza Executive Escape", duration: "4 Days / 3 Nights", detail: "A short executive Hunza itinerary by air with Darbar Hotel, Karimabad, forts, and Attabad Lake.", price: "PKR 300,000", image: "/images/honeymoon/banjosa-tolipeer.webp", title: "Darbar Hotel Hunza 4 Days" },
  { slug: "attabad-lake-hunza-air-4days", name: "Attabad Lake Hunza Premium Tour", duration: "4 Days / 3 Nights", detail: "A lakeside Hunza escape by air with a premium resort, boating, Passu Cones, and private transfers.", price: "PKR 420,000 / couple", image: "/images/honeymoon/murree-swat.webp", title: "Attabad Lake Hunza 4 Days by Air" },
  { slug: "luxury-pakistan-air-14days", name: "Luxury Pakistan Tour by Air", duration: "14 Days / 13 Nights", detail: "An elevated journey connecting Lahore, Islamabad, Hunza, and Skardu with premium stays and private transport.", price: "$2,500 / person", image: "/images/honeymoon/swat-kalam.webp", title: "Luxury 14 Day Pakistan Tour by Air" },
  { slug: "hunza-road-7days", name: "Hunza Valley via Naran", duration: "7 Days / 6 Nights", detail: "A classic road journey through Naran, Babusar Top, Hunza, Attabad Lake, and Khunjerab Pass.", price: "PKR 137,500", image: "/images/honeymoon/naran-shogran-alt-2.webp", title: "7 Day Hunza Valley Itinerary via Naran" },
  { slug: "hunza-cherry-blossom", name: "Hunza Cherry Blossom Spring", duration: "7 Days / 6 Nights", detail: "A spring photography escape through Hunza and Nagar when the orchards bloom against snow-capped peaks.", price: "PKR 125,000", image: "/images/honeymoon/murree-tour.webp", title: "Hunza Cherry Blossom Spring Package" },
  { slug: "hunza-gilgit-10days", name: "Hunza Gilgit Private Trip", duration: "10 Days / 9 Nights", detail: "A private road circuit through Naran, Hunza, Khunjerab, Gilgit, and Skardu highlights.", price: "PKR 375,000", image: "/images/honeymoon/neelum-valley.webp", title: "10 Days Hunza Gilgit Private Trip" },
  { slug: "swat-kalam-deluxe-5days", name: "Swat Kalam Deluxe Vacation", duration: "5 Days / 4 Nights", detail: "A deluxe Swat and Kalam escape with Ushu Forest, Mahodand Lake, Malam Jabba, and premium stays.", price: "PKR 225,000 / couple", image: "/images/honeymoon/swat-valley-deluxe.webp", title: "5 Day Swat Kalam Deluxe Vacation" },
  { slug: "pc-bhurban-couple-3days", name: "PC Bhurban Couple Escape", duration: "3 Days / 2 Nights", detail: "A premium Murree honeymoon stay with Mall Road, Kashmir Point, Pindi Point, and Ayubia.", price: "PKR 185,000 / couple", image: "/images/honeymoon/murree-shogran.webp", title: "PC Bhurban Couple Tour 3 Days" },
  { slug: "murree-shogran-3days", name: "Murree Shogran Couple Tour", duration: "3 Days / 2 Nights", detail: "A short couple journey through Murree's viewpoints and Shogran's green meadows.", price: "PKR 100,000 / couple", image: "/images/honeymoon/swat-valley-deluxe-couple.webp", title: "Murree Shogran 3 Days" },
  { slug: "naran-shogran-economy-4days", name: "Naran Shogran Economy Escape", duration: "4 Days / 3 Nights", detail: "An affordable private route through Naran, Shogran, Saif-ul-Malook, and Siri Paye.", price: "PKR 110,000", image: "/images/honeymoon/naran-shogran-alt-3.webp", title: "Naran Shogran Economy 4 Days" },
  { slug: "neelum-valley-3days", name: "Neelum Valley Short Escape", duration: "3 Days / 2 Nights", detail: "A compact Kashmir itinerary through Muzaffarabad, Keran, Sharda, and Upper Neelum.", price: "PKR 48,500", image: "/images/honeymoon/kashmir-arangkel.webp", title: "Neelum Valley 3 Days" },
];

const packageImageMap: Record<string, string> = {
  "naran-shogran-neelum-9days": "/images/honeymoon/naran-shogran-neelum.webp",
  "naran-kaghan-azad-kashmir-7days": "/images/honeymoon/azad-kashmir-naran-shogran.webp",
  "naran-shogran-luxury-5days": "/images/honeymoon/naran-shogran-luxury.webp",
  "naran-kaghan-3days": "/images/honeymoon/naran-kaghan-short.webp",
  "naran-shogran-economy-5days": "/images/honeymoon/naran-shogran-alt.webp",
  "ratti-gali-lake-3days": "/images/honeymoon/ratti-gali-lake.webp",
  "naran-neelum-2023": "/images/honeymoon/naran-neelum.webp",
  "hunza-naltar-day": "/images/honeymoon/naltar-day-escape.webp",
  "hunza-famree-5days": "/images/honeymoon/hunza-deluxe.webp",
  "hunza-honeymoon-air-5days": "/images/honeymoon/hero.webp",
  "darbar-hunza-4days": "/images/honeymoon/banjosa-tolipeer.webp",
  "attabad-lake-hunza-air-4days": "/images/honeymoon/murree-swat.webp",
  "luxury-pakistan-air-14days": "/images/honeymoon/swat-kalam.webp",
  "hunza-road-7days": "/images/honeymoon/naran-shogran-alt-2.webp",
  "hunza-cherry-blossom": "/images/honeymoon/murree-tour.webp",
  "hunza-gilgit-10days": "/images/honeymoon/neelum-valley.webp",
  "swat-kalam-deluxe-5days": "/images/honeymoon/swat-valley-deluxe.webp",
  "pc-bhurban-couple-3days": "/images/honeymoon/murree-shogran.webp",
  "murree-shogran-3days": "/images/honeymoon/swat-valley-deluxe-couple.webp",
  "naran-shogran-economy-4days": "/images/honeymoon/naran-shogran-alt-3.webp",
  "neelum-valley-3days": "/images/honeymoon/kashmir-arangkel.webp",
};

export const additionalHoneymoonPackages: Record<string, AdditionalHoneymoonPackage> = Object.fromEntries(
  sourcePackages.map((item) => [
    item.slug,
    {
      ...item,
      image: packageImageMap[item.slug] ?? item.image,
      description: item.detail,
      overview: item.detail,
      attractions: [item.name, "Scenic viewpoints", "Local culture", "Comfortable private travel"],
      includes: sharedIncludes,
      excluded: sharedExcluded,
      bookingPolicy: sharedBookingPolicy,
      childPolicy: sharedChildPolicy,
      mealsMenu: sharedMeals,
      detailSections: [
        { title: "Package planning", content: ["The itinerary can be adjusted around your preferred dates, hotel category, and group size.", "Road and weather conditions may require practical changes to the route."] },
        { title: "Traveler notes", content: ["Carry comfortable clothing, essential medicines, personal documents, and a power bank.", "Optional activities and entry fees are payable separately unless confirmed in the final quotation."] },
      ],
    },
  ]),
) as Record<string, AdditionalHoneymoonPackage>;
