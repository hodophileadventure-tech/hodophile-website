export const siteConfig = {
  name: "Hodophile Adventures",
  shortName: "Hodophile Adventures",
  description:
    "Curated domestic tours across Pakistan with premium route planning, private transport, and elegant travel experiences.",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://hodophiletours.com",
  email: "masood.ahmed@hodophile.pk",
  phone: "+92337777460",
  whatsapp: "+923377774460",
  location: "Hodophile Adventure, Plot# 111-113C, Dupatta Gali, PECHS, Block2, Tariq Road, Karachi, Pakistan, 75400",
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/tours", label: "Tours" },
  { href: "/honeymoon-packages", label: "Honeymoon Packages" },
  { href: "/umrah-packages", label: "Umrah Packages" },
  { href: "/about-us", label: "About Us" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact-us", label: "Contact Us" },
];

export type TourMenuItem = {
  label: string;
  href: string;
  description?: string;
};

export type TourMenuGroup = {
  label: string;
  href: string;
  items: TourMenuItem[];
};

export const tourMenu: TourMenuGroup[] = [
  {
    label: "Northern Tours",
    href: "/tours/northern-tours",
    items: [
      {
        label: "Hunza Valley Tour Packages",
        href: "/tours/northern-tours/hunza-valley-tour-packages",
        description: "Alpine scenery, boutique stays, and curated mountain circuits.",
      },
      {
        label: "Skardu Valley Tour Packages",
        href: "/tours/northern-tours/skardu-valley-tour-packages",
        description: "Lakes, forts, and premium glacial landscapes.",
      },
      {
        label: "Astor Valley Tour Packages",
        href: "/tours/northern-tours/astor-valley-tour-packages",
        description: "Remote valley routes with river views, mountain scenery, and calm pacing.",
      },
      {
        label: "Naran Valley Tour Packages",
        href: "/tours/northern-tours/naran-valley-tour-packages",
        description: "Road journeys, river views, and summer family travel.",
      },
      {
        label: "Kashmir Valley Tour Packages",
        href: "/tours/northern-tours/kashmir-valley-tour-packages",
        description: "Soft mountain landscapes and elegant getaway planning.",
      },
      {
        label: "Swat Valley Tour Packages",
        href: "/tours/northern-tours/swat-valley-tour-packages",
        description: "Green valleys and calm domestic routes.",
      },
      {
        label: "Chitral Tour Packages",
        href: "/tours/northern-tours/chitral-tour-packages",
        description: "Valley routes, heritage stays, and scenic northwestern travel.",
      },
    ],
  },
  {
    label: "Southern Tours",
    href: "/tours/southern-tours",
    items: [
      {
        label: "Ormara Beach Packages",
        href: "/tours/southern-tours/ormara-beach-packages",
        description: "Refined coastal itineraries for private groups and family departures.",
      },
      {
        label: "Gorakh Hill Packages",
        href: "/tours/southern-tours/gorakh-hill-packages",
        description: "Cool-weather highland escapes with sunset viewpoints and overnight options.",
      },
      {
        label: "Quetta Ziyarat Packages",
        href: "/tours/southern-tours/quetta-ziyarat-packages",
        description: "City and mountain-edge itineraries with smooth domestic travel planning.",
      },
      {
        label: "Moola Chotok Packages",
        href: "/tours/southern-tours/moola-chotok-packages",
        description: "Adventure-led southern routes with natural canyon and spring views.",
      },
      {
        label: "Charna Island Packages",
        href: "/tours/southern-tours/charna-island-packages",
        description: "Short coastal getaways with sea activities and easy departure planning.",
      },
      {
        label: "Bhit Khori Day Packages",
        href: "/tours/southern-tours/bhit-khori-day-packages",
        description: "Fast coastal day escapes with curated transport and route support.",
      },
      {
        label: "Bhit Khori Night Packages",
        href: "/tours/southern-tours/bhit-khori-night-packages",
        description: "Night retreat options with beachside pacing and group-friendly planning.",
      },
    ],
  },
];

export const allTourRoutes = tourMenu.flatMap((group) => [group.href, ...group.items.map((item) => item.href)]);

export const destinationGallerySlugs = ["hunza", "skardu", "naran", "kashmir", "swat"];
export const destinationGalleryRoutes = destinationGallerySlugs.map((slug) => `/destinations/${slug}`);

export type Destination = {
  name: string;
  image: string;
  description: string;
  season: string;
  duration?: string;
  priceFrom?: string;
};

export const destinations: Destination[] = [
  {
    name: "Hunza",
    image: "/images/destinations/hunza-custom.jpg",
    description: "Terraced valleys, dramatic peaks, and heritage villages for scenic slow travel.",
    season: "May to October",
    duration: "6 Days",
    priceFrom: "From PKR 95,000",
  },
  {
    name: "Skardu",
    image: "/images/destinations/skardu-1080x1920.png",
    description: "Alpine lakes, forts, and cinematic mountain routes for immersive northern tours.",
    season: "April to October",
    duration: "7 Days",
    priceFrom: "From PKR 120,000",
  },
  {
    name: "Naran",
    image: "/images/destinations/naran-hd.jpg",
    description: "River valleys, emerald meadows, and summer road journeys with crisp mountain air.",
    season: "May to September",
    duration: "4 Days",
    priceFrom: "From PKR 62,000",
  },
  {
    name: "Swat",
    image: "/images/destinations/swat-hd.jpg",
    description: "Pine landscapes and calm valleys tailored for family and group travelers.",
    season: "April to November",
    duration: "4 Days",
    priceFrom: "From PKR 58,000",
  },
  {
    name: "Kashmir",
    image: "/images/destinations/kashmir.jpg",
    description: "Soft green hills and elegant getaways designed for couples and private groups.",
    season: "All Year",
    duration: "5 Days",
    priceFrom: "From PKR 82,000",
  },
];

export type FeaturedTour = {
  name: string;
  image: string;
  duration: string;
  description: string;
  highlights: string[];
  priceFrom?: string;
};

export const featuredTours: FeaturedTour[] = [
  {
    name: "Hunza Signature Escape",
    image: "/images/destinations/hunza.avif",
    duration: "6 Days / 5 Nights",
    description: "A refined Hunza route with private transfers, curated scenic stops, and mountain-view stays.",
    highlights: ["Private transport", "Boutique stays", "Curated stops"],
    priceFrom: "From PKR 95,000",
  },
  {
    name: "Skardu Lakes and Valleys",
    image: "/images/destinations/skardu.jpg",
    duration: "7 Days / 6 Nights",
    description: "A premium itinerary for alpine lakes, heritage forts, and immersive northern landscapes.",
    highlights: ["Family friendly", "Photography route", "Flexible pacing"],
    priceFrom: "From PKR 120,000",
  },
  {
    name: "Kashmir Scenic Retreat",
    image: "/images/destinations/kashmir.jpg",
    duration: "5 Days / 4 Nights",
    description: "A calm travel plan for soft mountain scenery, elegant stays, and uninterrupted valley time.",
    highlights: ["Couple ready", "Private option", "Custom add-ons"],
    priceFrom: "From PKR 82,000",
  },
];

export const featuredPackages = [
  {
    name: "Hunza Summer Escape",
    duration: "6 Days / 5 Nights",
    description:
      "Scenic domestic travel through Hunza, Altit, Baltit, and the Karakoram viewpoints.",
    highlights: ["Private transport", "Hotel stay", "Driver guide"],
  },
  {
    name: "Skardu Lakes and Valleys",
    duration: "7 Days / 6 Nights",
    description:
      "A premium route for travelers who want alpine lakes, forts, and slow-paced exploration.",
    highlights: ["Family friendly", "Custom stops", "Photography spots"],
  },
  {
    name: "Murree and Nathia Gali Weekend",
    duration: "3 Days / 2 Nights",
    description:
      "Fast domestic getaway for couples, families, and corporate groups from major Pakistan cities.",
    highlights: ["Weekend plan", "Budget options", "24/7 support"],
  },
];

export type DestinationHighlight = {
  name: string;
  bestFor: string;
  season: string;
};

export const destinationHighlights: DestinationHighlight[] = [
  {
    name: "Hunza",
    bestFor: "Mountain scenery and heritage stays",
    season: "May to October",
  },
  {
    name: "Skardu",
    bestFor: "Alpine lakes and dramatic landscapes",
    season: "April to October",
  },
  {
    name: "Naran",
    bestFor: "Road trips, rivers, and family travel",
    season: "May to September",
  },
  {
    name: "Swat",
    bestFor: "Green valleys and relaxed domestic tours",
    season: "April to November",
  },
  {
    name: "Islamabad",
    bestFor: "City stopovers and private transfers",
    season: "All year",
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  intro: string;
  destinations: string[];
  highlights: string[];
  sections: Array<{
    heading: string;
    body: string[];
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  hero?: string;
  heroAlt?: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "hunza-valley-travel-guide",
    title: "Hunza Valley: the best route for a balanced mountain holiday",
    category: "Hunza travel guide",
    excerpt:
      "Hunza works well for travelers who want scenic roads, heritage villages, and a calmer pace. The trip feels complete when you plan time for Altit, Baltit, Eagle’s Nest, and the upper Hunza viewpoints instead of treating the valley as a quick stop.",
    intro:
      "Hunza is one of the most rewarding domestic travel destinations in Pakistan because it balances scenery, culture, and comfort. A good Hunza plan is never only about reaching the valley. It is about pacing the route, choosing the right stops, and giving yourself enough time to enjoy viewpoints, heritage sites, and the mountain atmosphere without turning the trip into a rushed transfer.",
    destinations: ["Hunza"],
    highlights: [
      "Best for May to October travel",
      "Ideal for families and first-time northern travelers",
      "Plan 5 to 7 days for a comfortable circuit",
    ],
    sections: [
      {
        heading: "Why Hunza feels different from other northern trips",
        body: [
          "Hunza works best when travelers want a route that feels polished and scenic without being overwhelming. The drive itself is a major part of the experience, and the valley rewards travelers who like slower mornings, photographic stops, and a balance between sightseeing and rest.",
          "For many families, Hunza is the destination that introduces them to serious northern travel. The road to the valley is long enough to feel like a proper journey, but the route is still manageable when the trip is planned with realistic overnight stops and an appropriate hotel category.",
        ],
      },
      {
        heading: "What to include in a Hunza itinerary",
        body: [
          "A practical Hunza itinerary should usually include Karimabad, Altit Fort, Baltit Fort, Eagle’s Nest, and enough time for one or two upper Hunza viewpoints. If the group wants more movement, Passu, Attabad Lake, and the suspension bridge area can be added without making the trip feel crowded.",
          "Travelers often underestimate how much the valley benefits from a relaxed schedule. Two busy sightseeing days can be enough for highlights, but the trip feels better when at least one evening is kept light so guests can enjoy the mountain setting and the hotel rather than rushing between stops.",
        ],
      },
      {
        heading: "Who Hunza suits best",
        body: [
          "Hunza is a strong choice for couples, families, and private groups that want a scenic holiday with a comfortable pace. It is especially useful for travelers who want reliable hotel options and a route that can be planned around clear weather windows.",
          "If you are traveling with children or older family members, Hunza usually works better than more remote routes because the trip has more established stops and more predictable hotel planning than off-beat destinations.",
        ],
      },
    ],
    faqs: [
      {
        question: "How many days are enough for Hunza?",
        answer:
          "Five to seven days is the most practical range. That gives enough time for the road journey, the main valley sights, and at least one relaxed day for viewpoints and rest.",
      },
      {
        question: "When is the best season for Hunza?",
        answer:
          "May through October is the most reliable window for scenic travel, with summer offering the easiest conditions for families and first-time visitors.",
      },
    ],
    hero: "/images/destinations/hunza-custom.jpg",
    heroAlt: "Hunza valley mountains",
  },
  {
    slug: "skardu-lakes-and-valleys-guide",
    title: "Skardu: lakes, forts, and the kind of trip that needs extra time",
    category: "Skardu travel guide",
    excerpt:
      "Skardu is not a one-day destination. The valley rewards slower planning with lake visits, glacier views, forts, and evening stays that let travelers enjoy the altitude without rushing the drive.",
    intro:
      "Skardu is one of Pakistan’s most dramatic travel destinations, but it only feels enjoyable when the route is planned with patience. The valley is large, the distances between landmarks can be significant, and weather conditions can change the rhythm of a day. That is why a Skardu trip should be treated as an experience with proper pacing rather than a checklist of landmarks.",
    destinations: ["Skardu"],
    highlights: [
      "Best for April to October departures",
      "Great for photography and family group travel",
      "Add buffer time for long road sections and weather changes",
    ],
    sections: [
      {
        heading: "Why Skardu needs a longer itinerary",
        body: [
          "Skardu offers some of the most impressive scenery in northern Pakistan, but the valley is not compact. Lake visits, fort stops, and side trips can take more time than travelers expect, especially if they want to keep the journey comfortable for a family group.",
          "Because the drive itself is long, the best Skardu itineraries include a real recovery period after arrival. That gives the group time to settle in, adjust to the altitude, and enjoy the city and its surroundings without turning the first evening into another rushed road segment.",
        ],
      },
      {
        heading: "How to structure a Skardu trip",
        body: [
          "A strong Skardu itinerary usually mixes classic valley sightseeing with one or two longer excursions. Travellers often include Upper Kachura Lake, Shangrila area, Shigar Fort, and the easier-access viewpoints before choosing whether to add more remote lakes or glacial stops.",
          "When time allows, a well-spaced itinerary can also include Hussainabad, the town areas around Skardu, and a more relaxed evening schedule so the trip does not become physically tiring.",
        ],
      },
      {
        heading: "What travelers should prepare for",
        body: [
          "The biggest Skardu planning mistake is underestimating travel time. Good transport, clear overnight plans, and realistic stop planning matter more here than on a shorter city route. Travelers also need to be comfortable with cooler evenings, especially when visiting in shoulder seasons.",
          "Photography travelers usually benefit from early starts and a trip plan that leaves enough flexibility for weather. Skardu is at its best when the group is not forced to keep to an overly tight schedule.",
        ],
      },
    ],
    faqs: [
      {
        question: "How many days should a Skardu trip have?",
        answer:
          "Seven days or more is ideal if you want a proper road trip with sightseeing and some recovery time. Shorter trips can work, but they feel rushed.",
      },
      {
        question: "Is Skardu good for families?",
        answer:
          "Yes, especially when the trip is planned with comfortable transport, well-timed breaks, and hotel coordination that keeps the group settled after the long drive.",
      },
    ],
    hero: "/images/destinations/skardu.jpg",
    heroAlt: "Skardu lakes and mountains",
  },
  {
    slug: "naran-saif-ul-malook-summer-road-trip-guide",
    title: "Naran and Saif-ul-Malook: a classic summer road trip",
    category: "Naran travel guide",
    excerpt:
      "Naran is one of the easiest northern routes to plan for families because the journey is familiar, the scenery changes quickly, and the valley connects naturally to Saif-ul-Malook, Lulusar, and nearby river stops.",
    intro:
      "Naran remains one of the most approachable mountain trips for families in Pakistan because it gives travelers the feeling of a real northern escape without the same logistical complexity as some of the deeper valley routes. The main reason it stays popular is the mix of easy scenic access, river-side moments, and classic summer stops that feel rewarding even on a shorter itinerary.",
    destinations: ["Naran"],
    highlights: [
      "Best for May to September",
      "Strong option for short and mid-length road trips",
      "Works well when paired with Shogran or Kaghan",
    ],
    sections: [
      {
        heading: "Why Naran is still such a dependable choice",
        body: [
          "Naran is often the destination that travelers recommend to friends first because the route is recognizable, the valley has clear seasonal appeal, and the trip can be adapted to both short breaks and longer family holidays. It is especially useful for groups that want scenic travel without committing to the longest mountain routes.",
          "The valley works because the experience is easy to understand. Travelers can plan around the road, the river, a handful of key attractions, and a hotel stay that gives them a simple, relaxing base for the whole trip.",
        ],
      },
      {
        heading: "What to see beyond the main town",
        body: [
          "A proper Naran itinerary should not stop at the town itself. Saif-ul-Malook is the classic highlight, but Lulusar, the river corridor, and nearby viewpoints can add depth to the trip when the timing is right.",
          "If the group wants to stretch the route, Naran also pairs naturally with Kaghan and Shogran. That combination gives the trip more visual variety and makes the journey feel like a fuller domestic holiday rather than a single-destination stopover.",
        ],
      },
      {
        heading: "Who should choose Naran",
        body: [
          "Naran is one of the best options for first-time northern travelers, mixed-age families, and travelers who want a balanced road trip with fewer moving parts than more remote destinations. It is also a practical choice when the group wants a shorter trip length but still wants a mountain setting.",
          "The valley is particularly strong for summer travel because it fits neatly into school holidays, family schedules, and weekend extensions from major cities.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the best time to visit Naran?",
        answer:
          "May through September is the safest and most enjoyable period for a standard Naran itinerary.",
      },
      {
        question: "Can Naran be combined with another destination?",
        answer:
          "Yes. It pairs well with Shogran, Kaghan, and other northern route combinations when the total trip length is planned realistically.",
      },
    ],
    hero: "/images/destinations/naran-hd.jpg",
    heroAlt: "Naran valley and lake",
  },
  {
    slug: "astore-and-fairy-meadows-off-beat-north-guide",
    title: "Astore and Fairy Meadows: for travelers who want a quieter route",
    category: "Off-beat north",
    excerpt:
      "Astore and Fairy Meadows suit travelers who want a more remote mountain experience. The routes are more demanding, but the landscapes feel untouched, especially when you plan the jeep transfer, overnight stay, and weather buffer properly.",
    intro:
      "Astore and Fairy Meadows are for travelers who want a northern trip that feels more remote, quieter, and less commercial. These destinations need more planning than the standard valley routes, but that extra effort is part of what makes them memorable. The key is to prepare for road conditions, jeep access, and overnight logistics before departure.",
    destinations: ["Astore", "Fairy Meadows"],
    highlights: [
      "Best for adventurous travelers and repeat visitors",
      "Requires careful transport and hotel planning",
      "Ideal when combined with Skardu or Hunza",
    ],
    sections: [
      {
        heading: "Why these destinations feel more special",
        body: [
          "Astore and Fairy Meadows attract travelers who want a quieter mountain experience. Instead of busy valley traffic or a very familiar tourist circuit, the route feels more personal and more dependent on planning. That usually appeals to travelers who have already seen the more common northern destinations.",
          "The reward is space, silence, and a stronger sense of mountain isolation. For many guests, that atmosphere is more valuable than ticking off a larger number of stops.",
        ],
      },
      {
        heading: "What the route requires",
        body: [
          "These trips need extra care around vehicle choice, road timing, and hotel selection. Astore is better when the road plan is realistic and the group is comfortable with a calmer pace. Fairy Meadows adds another layer because the final access is more demanding and should be treated as part of the adventure.",
          "Travelers should also plan for the possibility of weather-related delays and keep a buffer in both the outward and return journeys. That makes the experience more enjoyable and less stressful.",
        ],
      },
      {
        heading: "Who should book this route",
        body: [
          "This combination suits travelers who like wilderness, photography, and less crowded locations. It is especially good for repeat visitors to the north who want something beyond the classic Hunza or Skardu circuit.",
          "If someone is planning their first-ever northern holiday and wants a very easy route, Astore and Fairy Meadows are usually not the first recommendation. But for travelers wanting a memorable off-beat journey, they are excellent.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Fairy Meadows suitable for every traveler?",
        answer:
          "Not always. It is better for travelers who are comfortable with a more active and less predictable mountain experience.",
      },
      {
        question: "Why pair Astore with other destinations?",
        answer:
          "Because the route becomes more efficient and balanced when combined with nearby northern destinations like Hunza or Skardu.",
      },
    ],
    hero: "/images/editorial/editorial-3.jpg",
    heroAlt: "Astore and Fairy Meadows landscape",
  },
  {
    slug: "kashmir-swat-family-and-couple-travel-guide",
    title: "Kashmir and Swat: green valley trips for families and couples",
    category: "Family travel guide",
    excerpt:
      "Kashmir and Swat are the best choices for travelers who want softer scenery, easier pacing, and hotel choices that work for couples or families. These destinations are a good fit for shorter plans with scenic drives and relaxed evenings.",
    intro:
      "Kashmir and Swat are excellent destinations when the goal is a gentler domestic trip rather than a high-altitude adventure. These valleys are especially attractive for couples, family groups, and travelers who want a more relaxed schedule with scenic roads, greenery, and comfortable hotel planning.",
    destinations: ["Kashmir", "Swat"],
    highlights: [
      "Good for April to November travel windows",
      "Works well for family holidays and honeymoon-style trips",
      "Can be planned as a 4 to 6 day route",
    ],
    sections: [
      {
        heading: "Why green valleys remain popular",
        body: [
          "Kashmir and Swat feel accessible because they offer scenery without demanding the same level of physical or logistical commitment as the deeper northern routes. That makes them appealing to travelers who want greenery, mountain air, and a polished holiday without extended road fatigue.",
          "These destinations also work well for travelers who care about hotel comfort and an easier daily rhythm. The trip can feel restful instead of constantly scheduled.",
        ],
      },
      {
        heading: "How to plan the stay",
        body: [
          "A good Kashmir or Swat itinerary should leave room for rest, local sightseeing, and evening downtime. These destinations do not need to be overpacked to feel satisfying. In fact, travelers usually enjoy them more when they keep the schedule light and scenic.",
          "That makes them a natural fit for honeymoon couples, parents traveling with children, and small private groups that want the trip to feel comfortable rather than demanding.",
        ],
      },
      {
        heading: "Best use cases for these routes",
        body: [
          "Kashmir and Swat are often the right answer when a traveler asks for a balanced route with easy pacing and attractive scenery. They also work well as shorter holidays around work schedules or school breaks.",
          "If the group wants calm travel with a more lush landscape, these are among the strongest options in the domestic Pakistan travel lineup.",
        ],
      },
    ],
    faqs: [
      {
        question: "Are Kashmir and Swat suitable for family travel?",
        answer:
          "Yes. Their softer pacing and hotel-friendly nature make them very practical for families.",
      },
      {
        question: "Can Kashmir and Swat work as honeymoon trips?",
        answer:
          "Yes. They are among the easiest destinations to shape into a quiet couple-friendly getaway.",
      },
    ],
    hero: "/images/destinations/kashmir.jpg",
    heroAlt: "Kashmir valley",
  },
  {
    slug: "murree-nathia-gali-shogran-weekend-guide",
    title: "Murree, Nathia Gali, and Shogran: shorter escapes that still feel scenic",
    category: "Weekend guide",
    excerpt:
      "If the group needs a shorter journey, these hill destinations are easy to combine into a clean weekend trip. Murree and Nathia Gali suit quick departures, while Shogran adds a more natural, peaceful stop for travelers who want a little more time in the hills.",
    intro:
      "Murree, Nathia Gali, and Shogran are valuable because they solve a different travel need than the big northern routes. They are the destinations people choose when they want a shorter break, less driving, and a trip that still gives them fresh air, mountain views, and a sense of escape.",
    destinations: ["Murree", "Nathia Gali", "Shogran"],
    highlights: [
      "Best for 2 to 4 day plans",
      "Useful for family groups and corporate outings",
      "Simple route choice when travelers want less driving",
    ],
    sections: [
      {
        heading: "Why these routes work so well for short holidays",
        body: [
          "Murree and Nathia Gali are easy to understand as quick mountain escapes, while Shogran adds a calmer and more scenic layer for travelers who want something a little less crowded. Together they provide a flexible set of options for short domestic plans.",
          "These routes are especially useful for groups that cannot commit to longer road trips but still want to stay somewhere cooler and more scenic than the city.",
        ],
      },
      {
        heading: "How to make a short trip feel complete",
        body: [
          "The trick with a short hill trip is not to overbook it. A good weekend route should include enough time for road travel, hotel check-in, a few viewpoint stops, and proper rest. That makes the trip feel like a real break rather than a very busy outing.",
          "Shogran can be especially helpful in that format because it gives travelers a quieter overnight experience and a more natural atmosphere than a fast city-to-hill turnaround.",
        ],
      },
      {
        heading: "Who should book this category",
        body: [
          "This category is best for families, small corporate teams, and couples who want a quick reset. It also works for travelers who are testing a domestic trip for the first time and want a shorter, lower-risk route before booking a longer northern holiday.",
          "For many travelers, these destinations are the easiest entry point into the broader Pakistan travel experience.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long should a Murree or Nathia Gali trip be?",
        answer:
          "Two to three days is enough for a simple and comfortable hill escape, especially for weekend departures.",
      },
      {
        question: "Can Shogran be added to a short trip?",
        answer:
          "Yes, but it works best when the route is kept realistic and the number of stops is limited.",
      },
    ],
    hero: "/images/destinations/murree.jpg",
    heroAlt: "Murree hills",
  },
];

export const servicePillars = [
  "Private transport and flexible stops",
  "Hotel coordination for every route",
  "Custom itineraries for families and groups",
  "SEO-ready service pages for each destination",
];

export function absoluteUrl(pathname: string) {
  return new URL(pathname, siteConfig.siteUrl).toString();
}
