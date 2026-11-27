export type AttractionPeriod = "morning" | "afternoon" | "evening";

export interface ItineraryAttraction {
  id: string;
  city: string;
  name: string;
  description: string;
  recommendedVisitMinutes: number;
  bestTime: AttractionPeriod;
  availableMonths?: readonly number[];
  seasonalNote?: string;
  accessNote?: string;
  requiresJeep?: boolean;
}

export const itineraryDestinationImages: Readonly<Record<string, string>> = {
  Hunza: "/images/package-cards/images__destinations__hunza-custom.webp",
  Skardu: "/images/custom-skardu.jpg",
  Naran: "/images/package-cards/images__destinations__naran.webp",
  Astore: "/images/custom-astore.jpg",
  Kashmir: "/images/package-cards/destination-kashmir-valley-planner.webp",
  Swat: "/images/package-cards/destination-swat-valley-planner.webp",
  "Malam Jabba": "/images/custom-malam-jabba.jpg",
  "Fairy Meadows": "/images/package-cards/destination-fairy-meadows-planner.webp",
  Shogran: "/images/custom-shogran.jpg",
  "Nathia Gali": "/images/custom-nathia-gali.png",
  Murree: "/images/package-cards/images__honeymoon__murree-tour.webp",
};

export const itineraryAttractions: readonly ItineraryAttraction[] = [
  { id: "hunza-baltit-fort", city: "Hunza", name: "Baltit Fort", description: "Explore the historic fort above Karimabad and its views across the valley.", recommendedVisitMinutes: 90, bestTime: "morning" },
  { id: "hunza-altit-fort", city: "Hunza", name: "Altit Fort", description: "Visit the restored fort and the surrounding heritage garden.", recommendedVisitMinutes: 90, bestTime: "afternoon" },
  { id: "hunza-karimabad-bazaar", city: "Hunza", name: "Karimabad Bazaar", description: "Browse local crafts, food, and small shops in Karimabad.", recommendedVisitMinutes: 60, bestTime: "evening" },
  { id: "hunza-attabad-lake", city: "Hunza", name: "Attabad Lake", description: "Take in the lake scenery; water activities depend on local operators and conditions.", recommendedVisitMinutes: 120, bestTime: "morning", accessNote: "Boating and other water activities are optional and may cost extra." },
  { id: "hunza-passu-cones", city: "Hunza", name: "Passu Cones", description: "Pause at the roadside viewpoints for photographs of the Passu peaks.", recommendedVisitMinutes: 45, bestTime: "afternoon" },
  { id: "hunza-hussaini-bridge", city: "Hunza", name: "Hussaini Suspension Bridge", description: "View the suspension bridge and surrounding river valley.", recommendedVisitMinutes: 60, bestTime: "afternoon", accessNote: "Crossing the bridge is optional and requires care." },
  { id: "hunza-eagles-nest", city: "Hunza", name: "Eagle's Nest", description: "Enjoy a panoramic viewpoint over the Hunza and Nagar valleys.", recommendedVisitMinutes: 60, bestTime: "evening" },
  { id: "hunza-khunjerab-pass", city: "Hunza", name: "Khunjerab Pass", description: "Take a high-altitude excursion toward the border-area pass.", recommendedVisitMinutes: 180, bestTime: "morning", availableMonths: [5, 6, 7, 8, 9, 10], seasonalNote: "High-altitude access and opening dates vary; confirm current road and weather conditions." },

  { id: "skardu-shangrila", city: "Skardu", name: "Shangrila Resort and Lower Kachura Lake", description: "Visit the lakeside resort area and enjoy the Lower Kachura scenery.", recommendedVisitMinutes: 120, bestTime: "morning" },
  { id: "skardu-upper-kachura", city: "Skardu", name: "Upper Kachura Lake", description: "Spend time beside the clear lake and surrounding mountain landscape.", recommendedVisitMinutes: 120, bestTime: "morning" },
  { id: "skardu-shigar-fort", city: "Skardu", name: "Shigar Fort", description: "Explore the restored fort and learn about local Balti heritage.", recommendedVisitMinutes: 90, bestTime: "afternoon" },
  { id: "skardu-sarfaranga", city: "Skardu", name: "Sarfaranga Cold Desert", description: "Visit the high-altitude desert landscape and nearby viewpoints.", recommendedVisitMinutes: 90, bestTime: "afternoon", accessNote: "Quad biking, horse riding, and jeep activities are optional and may cost extra." },
  { id: "skardu-katpana", city: "Skardu", name: "Katpana Desert", description: "See the sand dunes and mountain scenery near Skardu.", recommendedVisitMinutes: 60, bestTime: "evening" },
  { id: "skardu-manthoka", city: "Skardu", name: "Manthoka Waterfall", description: "Visit the waterfall area and take a short nature break.", recommendedVisitMinutes: 90, bestTime: "morning" },
  { id: "skardu-khaplu-fort", city: "Skardu", name: "Khaplu Fort", description: "Explore the historic fort and its cultural setting in Khaplu.", recommendedVisitMinutes: 90, bestTime: "afternoon" },
  { id: "skardu-basho", city: "Skardu", name: "Basho Valley", description: "Take a scenic valley excursion and enjoy time among the mountain landscapes.", recommendedVisitMinutes: 240, bestTime: "morning", availableMonths: [5, 6, 7, 8, 9, 10], seasonalNote: "Road access and conditions vary by season.", accessNote: "A suitable 4x4 jeep may be required." },
  { id: "skardu-deosai", city: "Skardu", name: "Deosai National Park", description: "Explore the high plateau and its open landscapes when access is available.", recommendedVisitMinutes: 360, bestTime: "morning", availableMonths: [6, 7, 8, 9], seasonalNote: "Access is seasonal and depends on snow clearance, weather, and local road conditions.", accessNote: "A 4x4 jeep is required." },

  { id: "swat-mingora", city: "Swat", name: "Mingora", description: "Explore Mingora's main market area and nearby town sights.", recommendedVisitMinutes: 90, bestTime: "afternoon" },
  { id: "swat-fizagat", city: "Swat", name: "Fizagat Park", description: "Take a relaxed riverside walk and enjoy views of the Swat River.", recommendedVisitMinutes: 60, bestTime: "evening" },
  { id: "swat-malam-jabba", city: "Swat", name: "Malam Jabba", description: "Enjoy mountain views and the resort area; activities depend on season and operations.", recommendedVisitMinutes: 180, bestTime: "morning", seasonalNote: "Skiing and other resort activities are seasonal and subject to operation." },
  { id: "swat-kalam", city: "Swat", name: "Kalam", description: "Explore the valley town and its riverside and mountain scenery.", recommendedVisitMinutes: 120, bestTime: "afternoon" },
  { id: "swat-mahodand", city: "Swat", name: "Mahodand Lake", description: "Visit the lake and surrounding alpine scenery when the route is accessible.", recommendedVisitMinutes: 240, bestTime: "morning", availableMonths: [5, 6, 7, 8, 9, 10], seasonalNote: "Access depends on weather and road conditions.", accessNote: "A local 4x4 jeep may be required." },
  { id: "swat-ushu-forest", city: "Swat", name: "Ushu Forest", description: "Enjoy a nature stop among the forested mountain surroundings.", recommendedVisitMinutes: 90, bestTime: "afternoon", seasonalNote: "Walking conditions can change with weather." },
  { id: "swat-bahrain", city: "Swat", name: "Bahrain", description: "Pause in the riverside town for local views and refreshments.", recommendedVisitMinutes: 60, bestTime: "afternoon" },
  { id: "swat-blue-water", city: "Swat", name: "Blue Water", description: "Visit the scenic water and valley area when local access permits.", recommendedVisitMinutes: 90, bestTime: "afternoon", seasonalNote: "Confirm access and local conditions before departure." },

  { id: "kashmir-keran", city: "Keran", name: "Keran Riverside", description: "Enjoy a relaxed riverside walk and views of the Neelum Valley.", recommendedVisitMinutes: 90, bestTime: "evening" },
  { id: "kashmir-neelum", city: "Neelum", name: "Neelum Valley Viewpoints", description: "Take in the river and forest scenery from accessible local viewpoints.", recommendedVisitMinutes: 90, bestTime: "morning" },
  { id: "kashmir-sharda", city: "Sharda", name: "Sharda", description: "Explore the riverside surroundings and the historic settlement.", recommendedVisitMinutes: 120, bestTime: "morning" },
  { id: "kashmir-arangkel", city: "Arangkel", name: "Arangkel", description: "Enjoy the hilltop village scenery and time for a relaxed walk.", recommendedVisitMinutes: 180, bestTime: "morning", accessNote: "The approach involves an uphill walk; confirm current access and local transport arrangements." },
  { id: "kashmir-taobat", city: "Taobat", name: "Taobat Valley", description: "Explore the upper valley scenery when the route is open.", recommendedVisitMinutes: 180, bestTime: "morning", availableMonths: [6, 7, 8, 9, 10], seasonalNote: "The Make My Trip planner offers Taobat stays from June through October only; verify current road conditions." },
  { id: "kashmir-ratti-gali", city: "Kashmir", name: "Ratti Gali Lake", description: "Plan a high-altitude lake excursion when seasonal access allows.", recommendedVisitMinutes: 360, bestTime: "morning", availableMonths: [6, 7, 8, 9], seasonalNote: "High-altitude access is seasonal and weather-dependent.", accessNote: "A local 4x4 jeep and trek may be required." },

  { id: "naran-bazaar", city: "Naran", name: "Naran Bazaar", description: "Browse the town and take a break beside the Kunhar River.", recommendedVisitMinutes: 60, bestTime: "evening" },
  { id: "naran-saif-ul-malook", city: "Naran", name: "Saif-ul-Malook Lake", description: "Visit the lake and enjoy the surrounding mountain scenery.", recommendedVisitMinutes: 240, bestTime: "morning", availableMonths: [5, 6, 7, 8, 9, 10], seasonalNote: "Access changes with snow and road conditions.", accessNote: "A local jeep is commonly used; confirm availability and charges." },
  { id: "naran-babusar", city: "Naran", name: "Babusar Top", description: "Stop at the high mountain pass for views when the route is open.", recommendedVisitMinutes: 90, bestTime: "morning", availableMonths: [6, 7, 8, 9, 10], seasonalNote: "The pass is seasonal; closures and opening dates depend on weather and authorities." },
  { id: "naran-kaghan", city: "Naran", name: "Kaghan Valley", description: "Enjoy scenic valley stops along the Kunhar River and mountain road.", recommendedVisitMinutes: 120, bestTime: "afternoon" },

  { id: "astore-rama-meadows", city: "Astore", name: "Rama Meadows", description: "Spend time in the meadow landscape with views of the surrounding mountains.", recommendedVisitMinutes: 180, bestTime: "morning", availableMonths: [5, 6, 7, 8, 9, 10], seasonalNote: "Access is weather-dependent." },
  { id: "astore-rama-lake", city: "Astore", name: "Rama Lake", description: "Plan a lake visit when the access route and weather allow.", recommendedVisitMinutes: 240, bestTime: "morning", availableMonths: [6, 7, 8, 9], seasonalNote: "High-altitude access is seasonal and conditions can change.", accessNote: "A 4x4 jeep may be required." },
  { id: "astore-minimerg", city: "Astore", name: "Minimerg and White Peaks", description: "Consider a remote valley excursion subject to permits and local access.", recommendedVisitMinutes: 360, bestTime: "morning", availableMonths: [6, 7, 8, 9], seasonalNote: "Access, permissions, and road conditions must be confirmed locally.", accessNote: "A suitable 4x4 jeep and prior access confirmation are required." },

  { id: "fairy-meadows-base", city: "Fairy Meadows", name: "Fairy Meadows", description: "Enjoy the alpine meadow setting and views of the Nanga Parbat region.", recommendedVisitMinutes: 240, bestTime: "afternoon", availableMonths: [5, 6, 7, 8, 9, 10], seasonalNote: "Trekking route and weather conditions are seasonal.", accessNote: "Access involves a jeep track and hiking; arrange local operators." },
  { id: "fairy-meadows-beyal", city: "Fairy Meadows", name: "Beyal Camp Viewpoint", description: "Consider a further walk toward Beyal Camp if the group and conditions allow.", recommendedVisitMinutes: 300, bestTime: "morning", availableMonths: [5, 6, 7, 8, 9, 10], seasonalNote: "Trek access depends on weather and trail conditions.", accessNote: "Requires a trek; not suitable for every traveler." },
  { id: "fairy-meadows-raikot", city: "Fairy Meadows", name: "Raikot Bridge", description: "Pause at the bridge and local trailhead area before or after the meadow excursion.", recommendedVisitMinutes: 45, bestTime: "afternoon", accessNote: "A local jeep is required for the jeep-track section." },

  { id: "shogran-siri-paye", city: "Shogran", name: "Siri Paye Meadows", description: "Visit the meadows for open views and time outdoors when the route is accessible.", recommendedVisitMinutes: 240, bestTime: "morning", availableMonths: [5, 6, 7, 8, 9, 10, 11], seasonalNote: "Access may be affected by weather and road conditions.", accessNote: "A local 4x4 jeep is commonly required." },
  { id: "shogran-meadows", city: "Shogran", name: "Shogran Meadows", description: "Enjoy the forest and mountain scenery around the hill station.", recommendedVisitMinutes: 90, bestTime: "afternoon" },

  { id: "nathia-mukshpuri", city: "Nathia Gali", name: "Mukshpuri Trail", description: "Take a nature walk on the trail if weather and group fitness allow.", recommendedVisitMinutes: 240, bestTime: "morning", seasonalNote: "Trail conditions vary with weather.", accessNote: "A hike is required; choose a suitable pace." },
  { id: "nathia-ayubia", city: "Nathia Gali", name: "Ayubia National Park", description: "Explore the forest setting and designated walking areas.", recommendedVisitMinutes: 120, bestTime: "morning" },
  { id: "nathia-pipeline-track", city: "Nathia Gali", name: "Pipeline Track", description: "Enjoy a relaxed forest walk along the trail.", recommendedVisitMinutes: 120, bestTime: "afternoon", seasonalNote: "Walking conditions depend on weather." },
  { id: "nathia-dunga-gali", city: "Nathia Gali", name: "Dunga Gali", description: "Stop for a short walk and views in the hill-station area.", recommendedVisitMinutes: 60, bestTime: "evening" },

  { id: "murree-mall-road", city: "Murree", name: "Mall Road", description: "Take an evening stroll through the central shopping and dining area.", recommendedVisitMinutes: 90, bestTime: "evening" },
  { id: "murree-kashmir-point", city: "Murree", name: "Kashmir Point", description: "Enjoy a viewpoint stop and a relaxed walk.", recommendedVisitMinutes: 60, bestTime: "afternoon" },
  { id: "murree-patriata", city: "Murree", name: "Patriata (New Murree)", description: "Visit the hill-station area; any optional attractions are subject to operating hours and separate charges.", recommendedVisitMinutes: 180, bestTime: "morning", accessNote: "Chairlift and cable-car tickets, if operating, are optional and may cost extra." },
  { id: "murree-pindi-point", city: "Murree", name: "Pindi Point", description: "Pause at the viewpoint and take in the surrounding hills.", recommendedVisitMinutes: 60, bestTime: "afternoon" },
];
