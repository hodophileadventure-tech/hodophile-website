import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/page-shell";
import { TourLanding } from "@/components/tour-landing";
import { tourPackages } from "@/lib/data/tour-packages";
import { absoluteUrl, destinations, tourMenu, whatsappUrl } from "@/lib/site";
import { buildPageSchema } from "@/lib/seo/structured-data";

type TourPackagePageProps = {
  params: Promise<{ region: string; slug: string }>;
};

function resolveRegion(region: string) {
  return tourMenu.find((group) => group.href.endsWith(`/${region}`));
}

function resolveItem(region: string, slug: string) {
  const group = resolveRegion(region);
  if (!group) {
    return { group: null, item: null };
  }

  const item = group.items.find((entry) => entry.href.endsWith(`/${slug}`));
  return { group, item };
}

function getDestinationTagsFromSlug(slug: string): string[] {
  const lower = slug.toLowerCase();
  const tags: string[] = [];

  if (lower.includes("hunza")) tags.push("hunza");
  if (lower.includes("skardu")) tags.push("skardu");
  if (lower.includes("kashmir")) tags.push("kashmir");
  if (lower.includes("swat")) tags.push("swat");
  if (lower.includes("naran")) tags.push("naran");
  if (lower.includes("shogran")) tags.push("shogran");
  if (lower.includes("astor")) tags.push("skardu");

  return tags.length ? tags : ["swat"];
}

function buildRouteContent(label: string) {
  const lower = label.toLowerCase();

  const genericIncludes = [
    "Private or shared transport depending on trip structure",
    "Hotel coordination and route planning support",
    "Guidance for scenic stops and smooth daily pacing",
    "On-ground support for route changes and travel coordination",
  ];

  const genericExcludes = [
    "Personal shopping, extra meals, and beverages",
    "Entry tickets and optional activities",
    "Travel insurance and medical emergencies",
    "Any cost caused by weather, landslides, or force majeure",
  ];

  if (lower.includes("astore") || lower.includes("minimarg") || lower.includes("minimerg")) {
    return {
      summary: "A six-day Islamabad-origin sample itinerary through Chilas, Astore, Rama, Minimarg, Deosai, and the Rupal Valley. Minimarg/Burzil access is subject to current permissions, security clearance, and road conditions; confirm approval before travel.",
      itinerary: [
        { day: "Day 1", title: "Islamabad to Chilas", description: "Depart Islamabad early and travel north with planned prayer, meal, and rest stops. Babusar Top may be used only when open and safe; otherwise follow the confirmed Karakoram Highway route. Overnight in Chilas or Bonar Das." },
        { day: "Day 2", title: "Chilas to Astore and Rama", description: "After breakfast, travel toward Astore. Transfer to a local jeep where required and visit Rama Meadows and Rama Lake if access and timing allow. Overnight in the confirmed Rama-area accommodation." },
        { day: "Day 3", title: "Astore to Minimarg via Burzil", description: "Travel to Chilam Check Post and onward toward Minimarg only after required permissions and security clearance are confirmed. Visit Burzil Pass, Domail, and Rainbow Lake as access, weather, and daylight permit. Overnight at confirmed lodging or camp; options depend on availability and approval." },
        { day: "Day 4", title: "Deosai and Sheosar Lake", description: "Take a full-day 4x4 route toward Deosai, visiting Sheosar Lake, Kala Pani, and Bara Pani when roads and conditions permit. Wildlife sightings are never guaranteed. Overnight in Tarishing at the confirmed guesthouse or equivalent." },
        { day: "Day 5", title: "Rupal Valley and return to Chilas", description: "Explore Tarishing and the Rupal Face viewpoint. A Rupal Valley jeep excursion or Nanga Parbat Base Camp hike is optional and must be matched to fitness, weather, available time, and local guide advice. Continue toward Chilas only if the day's road schedule allows; otherwise an extra overnight is required." },
        { day: "Day 6", title: "Chilas to Islamabad", description: "Return to Islamabad with meal and rest stops. The Babusar route is conditional on seasonal opening and safety; use the confirmed alternate route if it is closed. Arrival time depends on road, weather, and traffic." },
      ],
      includes: genericIncludes,
      excludes: genericExcludes,
      hotel: "The sample uses Chilas/Bonar Das, Rama, Minimarg/Domail, and Tarishing overnights. Exact properties, camping arrangements, and availability must be confirmed in the written quotation.",
      vehicle: "A suitable vehicle is needed for Islamabad–Astore road travel; local 4x4 jeeps are required for some Rama, Minimarg, Deosai, and Rupal sections. Confirm each vehicle leg and its cost in writing.",
      pricing: "Final pricing depends on group size, room sharing, local jeep requirements, accommodation availability, permissions, and the confirmed route. Permit or access approval is not guaranteed by submitting an inquiry.",
      faqs: [
        { question: "Can every traveler visit Minimarg and Burzil?", answer: "Access is controlled and may require advance permission or security clearance. Eligibility and requirements can vary. Confirm with the relevant authorities and our team before booking; the itinerary must not proceed without approval." },
        { question: "Is the Nanga Parbat Base Camp hike included?", answer: "No, not automatically. The hike is optional and depends on fitness, guide availability, weather, and time. Confirm the plan and any charges before travel." },
        { question: "Is Babusar Top guaranteed on the return?", answer: "No. Babusar is seasonal and weather-dependent. If it is closed or unsafe, the return uses the confirmed alternate road route." },
        { question: "Is six days enough for this route?", answer: "It is a demanding sample with long mountain-road days. The Rupal excursion may need to be shortened or dropped, and an extra Chilas overnight may be needed if road timing or conditions require it." },
      ],
    };
  }

  if (lower.includes("hunza")) {
    return {
      summary: "An eight-day Islamabad-origin sample itinerary for Hunza, Upper Hunza, Khunjerab Pass, and an optional Naltar excursion, paced with overnight stops on the Karakoram Highway.",
      itinerary: [
        { day: "Day 1", title: "Islamabad to Chilas", description: "Depart Islamabad in the morning and travel north via Besham and Dasu, with meal and rest stops. Arrive in Chilas in the evening and overnight at the confirmed hotel." },
        { day: "Day 2", title: "Chilas to Hunza", description: "Continue toward Hunza, stopping at the Nanga Parbat viewpoint near Raikot, the three-mountain-junction viewpoint near Jaglot, and Rakaposhi viewpoint as timing and access allow. Check in and overnight in Hunza." },
        { day: "Day 3", title: "Karimabad and historic forts", description: "Explore Karimabad and visit Baltit and Altit forts, subject to opening hours and entry arrangements. Allow time for the bazaar and valley viewpoints; overnight in Hunza." },
        { day: "Day 4", title: "Attabad Lake and Upper Hunza", description: "Travel north to Attabad Lake, Passu Cones, and the Hussaini area. Boating and bridge access are optional and depend on local operation, conditions, and charges. Overnight in Gulmit or Passu, as confirmed." },
        { day: "Day 5", title: "Sost and Khunjerab Pass", description: "Continue to Sost and visit Khunjerab Pass only if the road is open and current access requirements are met. Return to the confirmed Upper Hunza accommodation; border access and timing can change." },
        { day: "Day 6", title: "Naltar Valley excursion", description: "Travel via Gilgit and use a local 4x4 for Naltar if road and weather conditions permit. Lake walks, skiing, and other activities are seasonal and optional unless listed in the booking confirmation. Overnight in Gilgit." },
        { day: "Day 7", title: "Gilgit to Chilas", description: "Begin the return south with planned rest and meal stops. Overnight in Chilas to avoid combining the full mountain route with the Islamabad drive." },
        { day: "Day 8", title: "Chilas to Islamabad", description: "Continue to Islamabad via the confirmed highway route, with stops based on traffic, weather, and road conditions. Tour concludes on arrival." },
      ],
      includes: genericIncludes,
      excludes: genericExcludes,
      hotel: "The sample uses overnight stays in Chilas, Hunza, Upper Hunza, Gilgit, and Chilas on return. Confirm hotel names, room sharing, and meal plan in the package quotation.",
      vehicle: "Confirm the Islamabad–Hunza vehicle plan, any local Upper Hunza transport, and the separate 4x4 jeep for Naltar. Optional boating, fort tickets, and activities are included only if stated in writing.",
      pricing: "Final pricing depends on group size, room sharing, hotel selection, transport, Naltar jeep arrangements, and which optional activities are included.",
      faqs: [
        { question: "Why is this itinerary eight days instead of five?", answer: "The Islamabad–Hunza road journey, Upper Hunza and Khunjerab excursions, Naltar detour, and return require substantial driving. Overnight stops make the sample more realistic and avoid an unsafe single-day return drive." },
        { question: "Is Khunjerab Pass guaranteed to be open?", answer: "No. Road opening, weather, security conditions, and access rules can change. Confirm current access before travel; the itinerary may need adjustment." },
        { question: "Is Naltar included in the package price?", answer: "Naltar jeep transport and activities are included only if listed in the written quotation. Availability depends on weather and road conditions." },
        { question: "Can the trip start from Lahore?", answer: "This sample starts and ends in Islamabad. Lahore pickup or transport can be discussed separately and may change the route, duration, and price." },
      ],
    };
  }

  if (lower.includes("skardu")) {
    return {
      summary: "A seven-day Islamabad-origin sample itinerary for Skardu, Upper Kachura, Deosai, and Shigar, with overnight transit stops in Chilas on the outward and return journeys.",
      itinerary: [
        { day: "Day 1", title: "Islamabad to Chilas", description: "Depart Islamabad and travel north with planned meal and rest stops. The route may use Babusar Top when the pass is open and safe, or the Karakoram Highway via Besham according to season and road conditions. Overnight in Chilas." },
        { day: "Day 2", title: "Chilas to Skardu", description: "Travel toward Skardu via the Gilgit–Skardu route, allowing time for mountain-road conditions and stops. Check in on arrival and keep the evening relaxed." },
        { day: "Day 3", title: "Kachura lakes and Soq Valley", description: "Visit the Kachura area, including Shangrila and Upper Kachura Lake. The Upper Kachura walk includes an uphill trail; access, boating, entry fees, and other activities depend on local operation and package inclusions." },
        { day: "Day 4", title: "Deosai National Park and Sheosar Lake", description: "Take a full-day 4x4 excursion to Deosai and Sheosar Lake if the route is open and conditions permit. Stops at Kala Pani and Bara Pani depend on access and timing. Carry warm layers and follow local safety guidance." },
        { day: "Day 5", title: "Shigar Valley and Cold Desert", description: "Explore Shigar Fort and the valley, then visit Katpana Cold Desert as timing allows. Paramotoring, jeep rides, and other activities are optional and available only when locally operating; confirm charges before booking." },
        { day: "Day 6", title: "Skardu to Chilas", description: "Begin the return drive via the Gilgit–Skardu route with rest and meal stops. Overnight in Chilas rather than combining this mountain drive with the onward Islamabad leg." },
        { day: "Day 7", title: "Chilas to Islamabad", description: "Continue to Islamabad via the confirmed highway route. Stops depend on route choice, traffic, weather, and road conditions; the tour ends on arrival." },
      ],
      includes: genericIncludes,
      excludes: genericExcludes,
      hotel: "The sample includes overnight stays in Chilas, Skardu, and Chilas on return. Confirm hotel names, room sharing, and meal plan in the package quotation.",
      vehicle: "Confirm the Islamabad–Chilas and Gilgit–Skardu transport plan, plus a suitable 4x4 for Deosai. Local jeeps and activities are included only if listed in writing.",
      pricing: "Final pricing depends on group size, room sharing, hotel selection, road route, Deosai 4x4 arrangements, and optional activities.",
      faqs: [
        { question: "Is Babusar Top part of the Islamabad route?", answer: "Only when it is seasonally open and safe. The operator may use the Karakoram Highway instead; confirm the route before departure." },
        { question: "Is Deosai accessible year-round?", answer: "No. Access is seasonal and depends on weather, road, and local conditions. Deosai and Sheosar visits may be changed or omitted when unsafe or inaccessible." },
        { question: "Are Deosai jeeps and activities included?", answer: "A suitable 4x4 and optional activities are included only when specifically stated in the written quotation." },
        { question: "Can this trip be completed in six days?", answer: "The sample uses seven days to allow overnight stops on both long road legs. Shortening it may require removing destinations or accepting longer driving days." },
      ],
    };
  }

  if (lower.includes("naran")) {
    return {
      summary: "A four-day sample route based on the Naran–Babusar itinerary: arrive in Naran, explore a lake route, take a weather-dependent Babusar excursion, then return.",
      itinerary: [
        { day: "Day 1", title: "Drive to Naran", description: "Travel via Balakot and Kaghan, with rest and meal stops along the way. Settle into Naran for the evening." },
        { day: "Day 2", title: "Lake and valley day", description: "Choose Saif-ul-Malook or Lulusar according to road access, weather, and the confirmed itinerary. Local jeep trips and lake activities may cost extra unless included in writing." },
        { day: "Day 3", title: "Babusar Top excursion", description: "Visit Babusar Top only when the road is open and conditions allow. Confirm the day's route and return plan with the tour manager." },
        { day: "Day 4", title: "Return journey", description: "Depart Naran and return toward the confirmed drop-off city, with stops based on timing and road conditions." },
      ],
      includes: genericIncludes,
      excludes: genericExcludes,
      hotel: "Accommodation and room-sharing basis must be confirmed in the selected package quotation.",
      vehicle: "Vehicle and local jeep arrangements depend on group size and route conditions; confirm what is included before payment.",
      pricing: "Final pricing depends on dates, room sharing, transport, and any local jeep or activity charges.",
      faqs: [
        { question: "Is Babusar Top always accessible?", answer: "No. Access depends on season, weather, and road conditions. Confirm availability close to travel." },
        { question: "Are lake jeeps included?", answer: "Local jeep rides and optional activities are included only when stated in your written package details." },
        { question: "Can this sample route be changed?", answer: "Yes. Ask the team to confirm the route against your dates, group, and road access before booking." },
      ],
    };
  }

  if (lower.includes("swat")) {
    return {
      summary: "A four-day sample route based on the Swat–Kalam itinerary, with an overnight base in Kalam and a separate, road-dependent Mahodand excursion.",
      itinerary: [
        { day: "Day 1", title: "Mingora to Kalam", description: "Travel through Bahrain toward Kalam, allowing time for stops and the mountain road. Check in and rest on arrival." },
        { day: "Day 2", title: "Ushu Forest and Matiltan", description: "Explore the forest and Matiltan viewpoints with short walks where conditions permit, then return to Kalam." },
        { day: "Day 3", title: "Mahodand Lake excursion", description: "A full-day local 4x4 excursion may be planned when road and weather conditions allow. Confirm jeep arrangements and any extra charges in writing." },
        { day: "Day 4", title: "Return via Bahrain", description: "Return toward Mingora or the confirmed departure point. Additional stops depend on travel time and road conditions." },
      ],
      includes: genericIncludes,
      excludes: genericExcludes,
      hotel: "Accommodation and room-sharing basis must be confirmed in the selected package quotation.",
      vehicle: "A local 4x4 may be required for Mahodand and other rough-road sections; confirm whether it is included.",
      pricing: "Final pricing depends on dates, room sharing, transport, and local 4x4 requirements.",
      faqs: [
        { question: "Is Mahodand Lake part of every trip?", answer: "No. The excursion depends on access, weather, and the package selected. Confirm it before booking." },
        { question: "Do we need a local jeep?", answer: "Some rough-road excursions require a local 4x4. Your written itinerary should state whether this cost is included." },
        { question: "Can the pace be adjusted for families?", answer: "Discuss group needs and preferred pacing with the team before confirming the itinerary." },
      ],
    };
  }

  if (lower.includes("kashmir")) {
    return {
      summary: "A five-day sample route based on the Kashmir–Arang Kel itinerary. Taobat and other sensitive or remote sections remain subject to current access, security guidance, and local requirements.",
      itinerary: [
        { day: "Day 1", title: "Muzaffarabad to Neelum Valley", description: "Meet in Muzaffarabad and travel toward the confirmed overnight base, with stops planned around road conditions and daylight." },
        { day: "Day 2", title: "Kel and Arang Kel", description: "Travel to Kel and arrange the hike or locally available access option. The steep climb and overnight plan should match the group's ability and confirmed lodging." },
        { day: "Day 3", title: "Neelum Valley villages", description: "Explore accessible villages and viewpoints, allowing time for road travel and local conditions." },
        { day: "Day 4", title: "Optional Taobat route", description: "A Taobat excursion is subject to current security guidance, permissions, road access, and timing. Confirm feasibility before departure." },
        { day: "Day 5", title: "Return to Muzaffarabad", description: "Return with stops as timing allows. Exact departure and drop-off details are set in the confirmed itinerary." },
      ],
      includes: genericIncludes,
      excludes: genericExcludes,
      hotel: "Guesthouse or hotel category and overnight location must be confirmed for the selected package and dates.",
      vehicle: "Local jeeps and last-mile transport may be required. Confirm each vehicle segment and its price in writing.",
      pricing: "Final pricing depends on route access, overnight locations, room sharing, and vehicle requirements.",
      faqs: [
        { question: "Is Taobat guaranteed on this route?", answer: "No. Access and security conditions can change. Confirm current feasibility with the team and local authorities." },
        { question: "Is the Arang Kel hike suitable for everyone?", answer: "The climb is steep. Travelers should consider their fitness and confirm the current access arrangements before booking." },
        { question: "Can the route change after booking?", answer: "Road, security, and local conditions can require changes. The confirmed package terms explain how itinerary adjustments are handled." },
      ],
    };
  }

  if (lower.includes("chitral")) {
    return {
      summary: "This Chitral route combines scenic mountain travel, heritage town stops, and comfortable valley pacing for travelers who want a northern journey that feels both cultural and cinematic.",
      itinerary: [
        { day: "Day 1", title: "Arrival and hotel check-in", description: "Travel to Chitral and settle into the accommodation after a scenic drive through the valley corridor." },
        { day: "Day 2", title: "Local sights and mountain viewpoints", description: "Explore the town, surrounding viewpoints, and characteristic spaces that define Chitral's landscape and pace." },
        { day: "Day 3", title: "Leisure, dining and onward movement", description: "Spend time enjoying local food, village atmosphere, and flexible sightseeing before the final route departure." },
      ],
      includes: [
        "Transport support from arrival to departure",
        "Accommodation arranged for the selected route",
        "Route planning and local guidance on route pacing",
        "Support for hotel and daily schedule coordination",
      ],
      excludes: [
        "Personal shopping and beverages",
        "Local attraction tickets or optional extras",
        "Travel insurance and emergency medical costs",
        "Any road or weather-related unplanned expenses",
      ],
      hotel: "Hotel category depends on your room sharing preference and season. We recommend confirming the room type before final payment.",
      vehicle: "Vehicle type is selected based on group size, route length, and mountain access. 4x4 may be used on uneven or remote sections when required.",
      pricing: "Pricing varies by season, hotel category, room sharing, and vehicle selection. Exact rates are confirmed once your dates and group size are finalized.",
      faqs: [
        { question: "What is included in the Chitral package?", answer: "Accommodation, route planning, transport support, and standard travel coordination are generally included. Optional tickets or extras are not included unless specifically stated." },
        { question: "Can I customize the hotel or room type?", answer: "Yes. We can usually adjust the room category, sharing basis, and vehicle selection to fit your comfort level and budget before booking." },
        { question: "Will the route change because of weather?", answer: "Mountain travel is weather-sensitive. If access is affected, we adapt the route to the safest operational plan and keep the trip comfortable and realistic." },
      ],
    };
  }

  if (lower.includes("hunza") || lower.includes("skardu") || lower.includes("naran") || lower.includes("swat") || lower.includes("kashmir")) {
    return {
      summary: `This ${label} route is designed for travelers who want scenic variety, a comfortable daily pace, and strong route coordination across mountain sections, valley viewpoints, and accommodation planning.`,
      itinerary: [],
      includes: genericIncludes,
      excludes: genericExcludes,
      hotel: "We match the hotel category to the route, season, and whether you want a standard, deluxe, or premium-room experience for your group.",
      vehicle: "A comfortable private vehicle is used for the route, with heavier mountain access or luggage needs reviewed ahead of booking to ensure comfort and safety.",
      pricing: "Starting prices vary by room sharing, hotel category, vehicle type, and season. We confirm the exact per-person rate once your trip dates and occupancy are confirmed.",
      faqs: [
        { question: "Is this package suitable for families or couples?", answer: "Yes. The route is structured to work well for families, couples, and private groups with flexible pacing and comfortable overnight planning." },
        { question: "What affects the price the most?", answer: "Hotel category, room sharing, season, and vehicle type usually drive the final price more than the destination itself." },
        { question: "What if the route is interrupted by weather?", answer: "We revise the plan to safer stops or alternative scenic points and notify travelers early so the trip remains smooth and secure." },
      ],
    };
  }

  return {
    summary: `${label} is planned to balance scenic highlights, comfortable overnight stays, and a route that feels exciting without becoming rushed.`,
    itinerary: [],
    includes: genericIncludes,
    excludes: genericExcludes,
    hotel: "Accommodation is selected according to the route, room-sharing plan, and the travel style you prefer for the trip.",
    vehicle: "Vehicle choice is matched to the group size and road conditions so the route feels comfortable and well supported.",
    pricing: "The final amount depends on occupancy, hotel grade, vehicle type, and trip length. We recommend confirming exact pricing before departure.",
    faqs: [
      { question: "Can I customize this route?", answer: "Yes. We can align the hotel category, daily route plan, and transport setup to your preferred travel rhythm and budget." },
      { question: "How early should I book?", answer: "Booking early is best, especially for peak seasons, because room availability and vehicle choice become tighter as dates approach." },
      { question: "Do weather changes affect the plan?", answer: "They can. We keep the itinerary flexible and select the safest practical route whenever local conditions change." },
    ],
  };
}

function getPackageImage(slug: string) {
  const normalized = slug.toLowerCase();
  if (normalized.includes("hunza")) return "/images/destinations/hunza-custom.webp";
  if (normalized.includes("skardu")) return "/images/destinations/skardu-1080x1920.webp";
  if (normalized.includes("astor")) return "/images/destinations/hunza-custom.webp";
  if (normalized.includes("naran") || normalized.includes("kaghan")) return "/images/destinations/naran-hd.webp";
  if (normalized.includes("swat")) return "/images/destinations/swat-hd.webp";
  if (
    normalized.includes("kashmir") ||
    normalized.includes("beach") ||
    normalized.includes("gwadar") ||
    normalized.includes("ormara") ||
    normalized.includes("charna") ||
    normalized.includes("bhit") ||
    normalized.includes("moola") ||
    normalized.includes("gorakh") ||
    normalized.includes("quetta")
  ) {
    return "/images/destinations/kashmir.webp";
  }
  return destinations[0]?.image ?? "/images/destinations/hunza.avif";
}

export async function generateStaticParams() {
  return tourMenu.flatMap((group) => {
    const region = group.href.split("/").filter(Boolean).at(-1) ?? "";
    return group.items.map((item) => ({
      region,
      slug: item.href.split("/").filter(Boolean).at(-1) ?? "",
    }));
  });
}

export async function generateMetadata({ params }: TourPackagePageProps): Promise<Metadata> {
  const { region, slug } = await params;
  const { item } = resolveItem(region, slug);

  if (!item) {
    return {};
  }

  const description = item.description ?? `${item.label} by Hodophile Adventures with curated route support.`;

  return {
    title: item.label,
    description,
    alternates: {
      canonical: item.href,
    },
    openGraph: {
      title: item.label,
      description,
      url: absoluteUrl(item.href),
    },
  };
}

export default async function TourPackagePage({ params }: TourPackagePageProps) {
  const { region, slug } = await params;
  const { group, item } = resolveItem(region, slug);

  if (!group || !item) {
    notFound();
  }

  const routeContent = buildRouteContent(item.label);
  const matchingPackages = tourPackages.filter((tourPackage) =>
    getDestinationTagsFromSlug(slug).some((tag) =>
      tourPackage.destinationSlugs.includes(tag) || tourPackage.title.toLowerCase().includes(tag),
    ),
  );

  return (
    <>
      <JsonLd
        data={buildPageSchema({
          title: item.label,
          description: item.description ?? `${item.label} by Hodophile Adventures with curated route support.`,
          url: item.href,
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Tours", url: "/tours" },
            { name: group.label, url: group.href },
            { name: item.label, url: item.href },
          ],
        })}
      />
      <PageShell wide>
        <TourLanding
          eyebrow={group.label}
          title={item.label}
          description={
            item.description ?? routeContent.summary
          }
          image={getPackageImage(slug)}
          highlights={["Tailored itinerary", "Route support", "Private options", "Booking assistance"]}
          ctaHref="/make-my-trip"
          ctaLabel="Request This Package"
        />

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] xl:gap-8">
          <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)] md:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Route overview</p>
            <h2 className="mt-3 font-serif text-3xl text-stone-900">Why this journey works</h2>
            <p className="mt-4 text-sm leading-7 text-stone-600">{routeContent.summary}</p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4">
                <p className="text-sm font-semibold text-stone-900">Hotel plan</p>
                <p className="mt-2 text-sm leading-7 text-stone-600">{routeContent.hotel}</p>
              </div>
              <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4">
                <p className="text-sm font-semibold text-stone-900">Vehicle plan</p>
                <p className="mt-2 text-sm leading-7 text-stone-600">{routeContent.vehicle}</p>
              </div>
              <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4">
                <p className="text-sm font-semibold text-stone-900">Pricing clarity</p>
                <p className="mt-2 text-sm leading-7 text-stone-600">{routeContent.pricing}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#fcc000] bg-[#fff8df] p-6 shadow-sm md:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Fast answer</p>
            <h2 className="mt-3 font-serif text-3xl text-stone-900">What drives the final price</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-700">
              <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#fcc000]" /><span>Room sharing and hotel category</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#fcc000]" /><span>Vehicle type and number of travel days</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#fcc000]" /><span>Seasonality and road conditions</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#fcc000]" /><span>Any custom add-ons or upgraded room requests</span></li>
            </ul>
          </div>
        </section>

        {routeContent.itinerary.length ? (
          <section className="mt-10 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)] md:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Sample route plan</p>
            <h2 className="mt-3 font-serif text-3xl text-stone-900">A day-by-day example</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-600">
              This is a planning example, not a confirmed departure itinerary. Stops and timing depend on your package, dates, access, and local conditions; confirm the final schedule in writing.
            </p>
            <div className="mt-6 space-y-5">
              {routeContent.itinerary.map((entry) => (
                <div key={entry.day} className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
                  <p className="text-[11px] uppercase tracking-[0.32em] text-[#a37a00]">{entry.day}</p>
                  <h3 className="mt-2 text-xl font-semibold text-stone-900">{entry.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-stone-600">{entry.description}</p>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="mt-10 flex flex-col gap-4 border-y border-stone-300 py-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Package-specific itinerary</p>
              <h2 className="mt-2 font-serif text-2xl text-stone-900">See the day plan on each package.</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-stone-600">This destination page does not have one approved day-by-day plan for every departure. Open a package below to review its itinerary and confirm the final schedule with our team.</p>
            </div>
            <a href="#available-departures" className="shrink-0 text-sm font-semibold text-[#8b6b00] underline decoration-[#d9a407]/50 underline-offset-4">Browse available packages</a>
          </section>
        )}

        <section className="mt-10 grid gap-6 lg:grid-cols-2 xl:gap-8">
          <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)] md:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Included</p>
            <h2 className="mt-3 font-serif text-3xl text-stone-900">What&apos;s usually covered</h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-stone-600">
              {routeContent.includes.map((item) => (
                <li key={item} className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#fcc000]" /><span>{item}</span></li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)] md:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Not included</p>
            <h2 className="mt-3 font-serif text-3xl text-stone-900">What is usually separate</h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-stone-600">
              {routeContent.excludes.map((item) => (
                <li key={item} className="flex items-start gap-3"><span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#0b0b0b]" /><span>{item}</span></li>
              ))}
            </ul>
          </div>
        </section>

        <section id="available-departures" className="mt-10 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)] md:p-8">
          <div className="flex items-end justify-between gap-4 border-b border-stone-200 pb-5">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Available departures</p>
              <h2 className="mt-3 font-serif text-3xl text-stone-900">{matchingPackages.length} matching packages</h2>
            </div>
            <Link href="/tours" className="text-sm font-medium text-stone-600 transition hover:text-[#8b6b00]">View all tours</Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {matchingPackages.map((pkg) => (
              <article key={pkg.id} className="group rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 transition hover:-translate-y-1 hover:border-[#fcc000] hover:bg-[#fff8df]">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#9a7600]">{pkg.duration}</p>
                <Link href={`/packages/${pkg.id}`} className="block">
                  <h3 className="mt-3 font-serif text-2xl leading-tight text-stone-900">{pkg.title}</h3>
                </Link>
                <p className="mt-3 text-sm text-stone-600">{pkg.departure}</p>
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-stone-200 pt-3">
                  <span className="text-sm font-semibold text-stone-900">PKR {pkg.pricePerPerson.toLocaleString()}</span>
                  <Link href={`/packages/${pkg.id}`} className="text-xs uppercase tracking-[0.16em] text-stone-500 group-hover:text-[#8b6b00]">View route ↗</Link>
                </div>
                <a
                  href={whatsappUrl(`Hi Hodophile, I am interested in ${pkg.title}. Please confirm availability and the best current price.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#1f6b4a] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#174f37]"
                >
                  Check availability
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)] md:p-8">
          <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Frequently asked</p>
          <h2 className="mt-3 font-serif text-3xl text-stone-900">Questions travelers usually ask</h2>
          <div className="mt-6 space-y-4">
            {routeContent.faqs.map((faq) => (
              <details key={faq.question} className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4">
                <summary className="cursor-pointer text-sm font-semibold text-stone-900">{faq.question}</summary>
                <p className="mt-3 text-sm leading-7 text-stone-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-[#fcc000] bg-[#fff8df] p-6 shadow-sm md:p-8">
          <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Need a custom plan?</p>
          <h2 className="mt-3 font-serif text-3xl text-stone-900">Tell us your dates and we will tailor the route around you.</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/make-my-trip" className="inline-flex rounded-full bg-[#0b0b0b] px-5 py-3 text-sm font-semibold !text-white transition hover:bg-black">Customize this trip</a>
            <a href={whatsappUrl(`Hi Hodophile, I want to book the ${item.label} package. Please share availability and the best current price.`)} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full border border-[#0b0b0b] px-5 py-3 text-sm font-semibold text-stone-900 transition hover:border-[#fcc000] hover:bg-[#fcc000]/10">WhatsApp a travel expert</a>
          </div>
        </section>
      </PageShell>
    </>
  );
}