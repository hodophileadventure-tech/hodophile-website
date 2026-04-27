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
    image: "/images/destinations/hunza.avif",
    description: "Terraced valleys, dramatic peaks, and heritage villages for scenic slow travel.",
    season: "May to October",
    duration: "6 Days",
    priceFrom: "From PKR 95,000",
  },
  {
    name: "Skardu",
    image: "/images/destinations/skardu.jpg",
    description: "Alpine lakes, forts, and cinematic mountain routes for immersive northern tours.",
    season: "April to October",
    duration: "7 Days",
    priceFrom: "From PKR 120,000",
  },
  {
    name: "Naran",
    image: "/images/destinations/naran-saif.jpg",
    description: "River valleys, emerald meadows, and summer road journeys with crisp mountain air.",
    season: "May to September",
    duration: "4 Days",
    priceFrom: "From PKR 62,000",
  },
  {
    name: "Swat",
    image: "/images/destinations/swat.jpg",
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

export const blogPosts = [
  {
    title: "Best time to visit northern Pakistan",
    category: "Travel planning",
    excerpt:
      "A practical month-by-month guide to help travelers pick the right domestic route and weather window.",
  },
  {
    title: "How to pack for a Skardu trip",
    category: "Packing guide",
    excerpt:
      "What to carry for cold nights, long drives, photography stops, and family travel in the north.",
  },
  {
    title: "What a good domestic tour package should include",
    category: "Tour checklist",
    excerpt:
      "Use this checklist to compare transport, hotel quality, support, and itinerary transparency.",
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
