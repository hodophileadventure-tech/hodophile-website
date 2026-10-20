import { JourneyCard } from "@/components/journey-card";
import Image from "next/image";

type AdventureItineraryDay = {
  day: string;
  plan: string;
};

type AdventureTour = {
  title: string;
  summary: string;
  duration: string;
  image?: string;
  altitude?: string;
  grade?: string;
  itinerary: AdventureItineraryDay[];
};

const summitExpeditions: AdventureTour[] = [
  {
    title: "Rakaposhi Expedition (7,788m), Pakistan 2027",
    summary:
      "A high-altitude expedition in Nagar Valley, approaching Rakaposhi via Minapin and Tagafari, with a prolonged acclimatisation and climbing period.",
    duration: "40 days",
    image: "/images/adventure/rakaposhi-expedition.jpg",
    altitude: "7,788m",
    grade: "Strenuous",
    itinerary: [
      { day: "Day 1", plan: "Arrive in Islamabad." },
      { day: "Day 2", plan: "Drive to Chilas (461 km; about 8 hours)." },
      { day: "Day 3", plan: "Drive to Minapin (220 km; about 7 hours)." },
      { day: "Day 4", plan: "Trek to Tagafari (3,700m; about 6 hours)." },
      { day: "Day 5", plan: "Trek to base camp (3,900m; about 4 hours)." },
      { day: "Days 6–35", plan: "Acclimatisation and climbing period." },
      { day: "Day 36", plan: "Trek to Tagafari (about 4 hours)." },
      { day: "Day 37", plan: "Trek to Minapin (about 7 hours)." },
      { day: "Day 38", plan: "Drive to Chilas (220 km; about 7 hours)." },
      { day: "Day 39", plan: "Drive to Islamabad (480 km; about 10 hours)." },
      { day: "Day 40", plan: "Departure from Islamabad." },
    ],
  },
  {
    title: "Broad Peak Expedition, Pakistan 2027",
    summary:
      "A Karakoram climbing expedition to Broad Peak (8,051m), reached via Skardu, Askoli, the Baltoro Glacier, and Concordia.",
    duration: "40–45 days (itinerary: 45 days)",
    image: "/images/adventure/broad-peak-expedition.jpg",
    altitude: "8,051m",
    grade: "High-altitude mountaineering",
    itinerary: [
      { day: "Day 1", plan: "Arrive in Islamabad." },
      { day: "Day 2", plan: "Fly from Islamabad to Skardu (2,230m; about 45 minutes)." },
      { day: "Day 3", plan: "Sightseeing and expedition preparation in Skardu." },
      { day: "Day 4", plan: "Drive from Skardu to Askoli (about 8 hours)." },
      { day: "Day 5", plan: "Trek to Johla (3,100m; about 5 hours)." },
      { day: "Day 6", plan: "Trek to Paju (3,380m; about 6 hours)." },
      { day: "Day 7", plan: "Trek to Khoburtse (3,760m; about 7 hours)." },
      { day: "Day 8", plan: "Trek to Urdukas (4,130m; about 4 hours)." },
      { day: "Day 9", plan: "Acclimatisation at Urdukas (4,130m)." },
      { day: "Day 10", plan: "Trek to Goro II (4,250m; about 7 hours)." },
      { day: "Day 11", plan: "Trek to Concordia (4,600m; about 5 hours)." },
      { day: "Day 12", plan: "Trek to Broad Peak Base Camp (5,000m; about 4 hours)." },
      { day: "Days 13–35", plan: "Climbing and acclimatisation period." },
      { day: "Day 36", plan: "Packing day at Broad Peak Base Camp." },
      { day: "Day 37", plan: "Trek from base camp to Goro II." },
      { day: "Day 38", plan: "Trek from Goro II to Khoburtse." },
      { day: "Day 39", plan: "Trek back to Paju (3,380m; about 5–6 hours)." },
      { day: "Day 40", plan: "Trek back to Johla (3,170m; about 7 hours)." },
      { day: "Day 41", plan: "Trek back to Askoli (3,050m; about 3–4 hours)." },
      { day: "Day 42", plan: "Drive back to Skardu (about 7 hours)." },
      { day: "Day 43", plan: "Fly from Skardu to Islamabad (about 45 minutes)." },
      { day: "Day 44", plan: "Contingency day in Islamabad for delays." },
      { day: "Day 45", plan: "Departure from Islamabad." },
    ],
  },
  {
    title: "Laila Peak Expedition (6,096m), Pakistan 2026",
    summary:
      "A Karakoram climbing journey through Skardu and Hushe Valley, followed by a trek to Laila Peak Base Camp and a climbing period.",
    duration: "25–35 days (itinerary: 23 days)",
    image: "/images/adventure/laila-peak-expedition.png",
    altitude: "6,096m",
    grade: "Climbing and mountaineering",
    itinerary: [
      { day: "Day 1", plan: "Arrive in Islamabad." },
      { day: "Day 2", plan: "Take the mountain-view flight to Skardu (2,230m)." },
      { day: "Day 3", plan: "Sightseeing and expedition preparation in Skardu." },
      { day: "Day 4", plan: "Drive to Hushe (3,170m; about 5–6 hours)." },
      { day: "Day 5", plan: "Trek to Saicho (3,330m; about 4 hours)." },
      { day: "Day 6", plan: "Trek to base camp (4,535m; about 5 hours)." },
      { day: "Days 7–17", plan: "Acclimatisation and climbing period." },
      { day: "Day 18", plan: "Trek back to Saicho (3,330m; about 5 hours)." },
      { day: "Day 19", plan: "Trek back to Hushe (3,170m; about 4 hours)." },
      { day: "Day 20", plan: "Drive back to Skardu via Khaplu Valley (about 6 hours)." },
      { day: "Day 21", plan: "Fly from Skardu to Islamabad." },
      { day: "Day 22", plan: "Contingency day in Islamabad for delays." },
      { day: "Day 23", plan: "Departure from Islamabad." },
    ],
  },
  {
    title: "Gasherbrum I Expedition, Pakistan 2026",
    summary:
      "An expedition to Gasherbrum I (8,080m), crossing the Baltoro Glacier to Concordia and onward to base camp in the central Karakoram.",
    duration: "62 days stated (itinerary: 45 days)",
    image: "/images/adventure/gasherbrum-i-expedition.png",
    altitude: "8,080m",
    grade: "Challenging technical climb",
    itinerary: [
      { day: "Day 1", plan: "Arrive in Islamabad." },
      { day: "Day 2", plan: "Rest and preparation in Islamabad." },
      { day: "Day 3", plan: "Fly from Islamabad to Skardu (2,230m; about 45 minutes)." },
      { day: "Day 4", plan: "Sightseeing and preparation in Skardu." },
      { day: "Day 5", plan: "Drive from Skardu to Askoli (3,000m; about 7 hours)." },
      { day: "Day 6", plan: "Trek from Askoli to Johla (3,100m; about 4 hours)." },
      { day: "Day 7", plan: "Trek to Paju (3,380m; about 6 hours)." },
      { day: "Day 8", plan: "Trek to Khoburtse (3,760m; about 7 hours)." },
      { day: "Day 9", plan: "Trek to Urdukas (4,130m; about 4 hours)." },
      { day: "Day 10", plan: "Acclimatisation at Urdukas (4,130m)." },
      { day: "Day 11", plan: "Trek to Goro II (4,250m; about 7 hours)." },
      { day: "Day 12", plan: "Trek to Concordia (4,600m; about 5 hours)." },
      { day: "Day 13", plan: "Trek to Gasherbrum Base Camp (5,000m; about 4 hours)." },
      { day: "Days 14–37", plan: "Climbing and acclimatisation period." },
      { day: "Day 38", plan: "Trek back to Khoburtse (3,560m; about 7 hours)." },
      { day: "Day 39", plan: "Trek back to Paju (3,380m; about 6 hours)." },
      { day: "Day 40", plan: "Trek back to Johla (3,170m; about 7 hours)." },
      { day: "Day 41", plan: "Trek back to Askoli (3,050m; about 4 hours)." },
      { day: "Day 42", plan: "Drive back to Skardu via Shigar Valley (about 7 hours)." },
      { day: "Day 43", plan: "Fly from Skardu to Islamabad." },
      { day: "Day 44", plan: "Contingency day in Islamabad for delays." },
      { day: "Day 45", plan: "Departure from Islamabad." },
    ],
  },
  {
    title: "Gasherbrum II Expedition, Pakistan 2027",
    summary:
      "A Karakoram expedition to Gasherbrum II (8,035m), following the Baltoro Glacier route from Askoli through Concordia to base camp.",
    duration: "45–50 days (itinerary: 45 days)",
    image: "/images/adventure/gasherbrum-ii-expedition.png",
    altitude: "8,035m",
    grade: "High-altitude mountaineering",
    itinerary: [
      { day: "Day 1", plan: "Arrive in Islamabad." },
      { day: "Day 2", plan: "Take the mountain-view flight to Skardu (2,228m)." },
      { day: "Day 3", plan: "Sightseeing and preparation in Skardu." },
      { day: "Day 4", plan: "Drive to Askoli (3,075m; about 7 hours)." },
      { day: "Day 5", plan: "Trek to Johla (3,100m; about 6 hours)." },
      { day: "Day 6", plan: "Trek to Paju (3,380m; about 5 hours)." },
      { day: "Day 7", plan: "Trek to Khoburtse (3,500m; about 6 hours)." },
      { day: "Day 8", plan: "Trek to Urdukas (4,130m; about 4 hours)." },
      { day: "Day 9", plan: "Acclimatisation day." },
      { day: "Day 10", plan: "Trek to Goro II (4,250m; about 7 hours)." },
      { day: "Day 11", plan: "Trek to Concordia (4,600m; about 5 hours)." },
      { day: "Day 12", plan: "Trek to Gasherbrum Base Camp (5,000m; about 4 hours)." },
      { day: "Days 13–37", plan: "Climbing and acclimatisation period." },
      { day: "Day 38", plan: "Trek back to Khoburtse (3,560m; about 7 hours)." },
      { day: "Day 39", plan: "Trek back to Paju (3,380m; about 6 hours)." },
      { day: "Day 40", plan: "Trek back to Johla (3,170m; about 7 hours)." },
      { day: "Day 41", plan: "Trek back to Askoli (3,050m; about 4 hours)." },
      { day: "Day 42", plan: "Drive back to Skardu (about 7 hours)." },
      { day: "Day 43", plan: "Fly from Skardu to Islamabad." },
      { day: "Day 44", plan: "Contingency day for delays." },
      { day: "Day 45", plan: "Departure from Islamabad." },
    ],
  },
];

const trekkingTours: AdventureTour[] = [
  {
    title: "Nangma Valley Trek 2026",
    summary:
      "A 12-day Karakoram trek from Skardu through Khaplu and Kanday to Nangma Valley, Mingulu Broq, and Amin Brakk Base Camp.",
    duration: "12 days",
    image: "/images/adventure/nangma-valley.png",
    altitude: "3,170m at Kanday",
    grade: "Easy",
    itinerary: [
      { day: "Day 1", plan: "Arrive in Islamabad." },
      { day: "Day 2", plan: "Take the 45-minute flight to Skardu (2,230m)." },
      { day: "Day 3", plan: "Free day in Skardu." },
      { day: "Day 4", plan: "Drive from Skardu to Khaplu (2,500m; about 3 hours)." },
      { day: "Day 5", plan: "Drive from Khaplu to Kanday, then walk to Mingulu Broq (about 2 hours driving and 4 hours walking)." },
      { day: "Day 6", plan: "Trek from Mingulu Broq to Nangma Valley." },
      { day: "Day 7", plan: "Trek to Amin Brakk Base Camp and return to Nangma Valley Base Camp." },
      { day: "Day 8", plan: "Trek back to Kanday (3,170m; about 5 hours)." },
      { day: "Day 9", plan: "Travel to Skardu via Khaplu Valley (listed as 6 hours; source itinerary labels this as walking)." },
      { day: "Day 10", plan: "Fly back to Islamabad." },
      { day: "Day 11", plan: "Contingency day in Islamabad in case of delays." },
      { day: "Day 12", plan: "Departure from Islamabad." },
    ],
  },
  {
    title: "K2 Base Camp Trek 2027",
    summary:
      "A 20-day Karakoram trek from Islamabad and Skardu across the Baltoro Glacier to Concordia, Broad Peak Base Camp, and K2 Base Camp.",
    duration: "20 days",
    image: "/images/adventure/k2-base-camp-trek.jpg",
    altitude: "5,150m",
    grade: "Challenging",
    itinerary: [
      { day: "Day 1", plan: "Arrive in Islamabad." },
      { day: "Day 2", plan: "Fly from Islamabad to Skardu (2,230m; about 45 minutes)." },
      { day: "Day 3", plan: "Sightseeing and preparation in Skardu." },
      { day: "Day 4", plan: "Drive from Skardu to Jhola via Askole (3,075m; about 8 hours)." },
      { day: "Day 5", plan: "Trek to Paiju (21 km; 3,420m; about 6 hours)." },
      { day: "Day 6", plan: "Trek to Khoburtse (15 km; 3,795m; about 7 hours)." },
      { day: "Day 7", plan: "Trek to Urdukas (6 km; 3,900m; about 4 hours)." },
      { day: "Day 8", plan: "Acclimatisation and rest day." },
      { day: "Day 9", plan: "Trek to Goro (12 km; 4,295m; about 7 hours)." },
      { day: "Day 10", plan: "Trek to Concordia (12 km; 4,500m; about 5 hours)." },
      { day: "Day 11", plan: "Trek to Broad Peak Base Camp (6 km; 4,800m; about 4 hours)." },
      { day: "Day 12", plan: "Trek to K2 Base Camp and return to Concordia (11 km; 5,150m; about 6 hours)." },
      { day: "Day 13", plan: "Trek back to Goro (12 km; 4,295m; about 6 hours)." },
      { day: "Day 14", plan: "Trek back to Khoburtse (14 km; 3,795m; about 7 hours)." },
      { day: "Day 15", plan: "Trek back to Paiju (15 km; 3,420m; about 5 hours)." },
      { day: "Day 16", plan: "Trek back to Jhola (21 km; 3,150m; about 5 hours)." },
      { day: "Day 17", plan: "Drive back to Skardu (141 km; 2,230m; about 8 hours)." },
      { day: "Day 18", plan: "Fly back to Islamabad (about 45 minutes)." },
      { day: "Day 19", plan: "Contingency day in case of delays." },
      { day: "Day 20", plan: "Departure from Islamabad." },
    ],
  },
  {
    title: "Nanga Parbat Base Camp Trek 2026",
    summary:
      "A nine-day trek from Islamabad via the Karakoram Highway to Fairy Meadows and the Nanga Parbat Base Camp, returning through Chilas.",
    duration: "9 days",
    image: "/images/adventure/nanga-parbat-base-camp.jpg",
    altitude: "3,500m at base camp",
    grade: "Trekking",
    itinerary: [
      { day: "Day 1", plan: "Arrive in Islamabad." },
      { day: "Day 2", plan: "Drive from Islamabad to Naran or Chilas (461 km; about 8–9 hours)." },
      { day: "Day 3", plan: "Drive and trek to Fairy Meadows (3,300m; about 6 hours)." },
      { day: "Day 4", plan: "Trek to Nanga Parbat Base Camp (3,500m; about 6 hours)." },
      { day: "Day 5", plan: "Trek back to Fairy Meadows (3,300m; about 6 hours)." },
      { day: "Day 6", plan: "Travel back to Naran (about 6 hours)." },
      { day: "Day 7", plan: "Drive back to Islamabad (about 8 hours)." },
      { day: "Day 8", plan: "Sightseeing day in Islamabad." },
      { day: "Day 9", plan: "Departure from Islamabad." },
    ],
  },
  {
    title: "Marsur Rock Trek, Skardu",
    summary:
      "A day trek from Skardu to the Marsur Rock viewpoint above Hussainabad, with views over the Indus River, Skardu Valley, and the Cold Desert.",
    duration: "Day trip",
    image: "/images/adventure/marsur-rock.png",
    grade: "Day hike",
    itinerary: [
      { day: "Early morning", plan: "Depart from Skardu for Hussainabad." },
      { day: "Morning", plan: "Take a jeep or 4x4 from Hussainabad toward the trailhead; the supplied estimate is about 20–30 minutes each way." },
      { day: "Late morning", plan: "Cross the bridge by the spring and follow the stream. After about an hour, take the steeper second trail at the fork." },
      { day: "Midday", plan: "Continue uphill over rocky terrain, keeping a steady pace and taking care with footing." },
      { day: "Early afternoon", plan: "Reach Marsur Rock. The supplied estimate is about 2–3 hours uphill; allow time for the viewpoint and lunch." },
      { day: "Afternoon", plan: "Retrace the trail to the jeep pickup point; the supplied return estimate is about 1–1.5 hours." },
      { day: "Evening", plan: "Return by jeep to Hussainabad and continue to Skardu." },
    ],
  },
  {
    title: "Fairy Meadows Trek",
    summary:
      "A five-day journey from Islamabad to Fairy Meadows, with a 4x4 jeep ride to Tattu Village and a hike to Beyal Camp beneath Nanga Parbat.",
    duration: "5 days",
    image: "/images/adventure/fairy-meadows.png",
    grade: "Trekking",
    itinerary: [
      { day: "Day 1", plan: "Travel from Islamabad to Chilas, stopping at Balakot, Lulusar Lake, and Babusar Top. Dinner and overnight stay in Chilas." },
      { day: "Day 2", plan: "Travel to Raikot Bridge, take a 4x4 jeep to Tattu Village (about 2 hours), then trek 3–4 hours to Fairy Meadows. Dinner, bonfire, and overnight campsite stay." },
      { day: "Day 3", plan: "Hike to Beyal Camp for views of Nanga Parbat, return to Fairy Meadows, and visit Reflection Lake." },
      { day: "Day 4", plan: "Trek back to Tattu Village, take a jeep to Chilas or Naran, then check in for dinner and overnight stay." },
      { day: "Day 5", plan: "Depart for Islamabad or Lahore, with stops en route; the supplied itinerary notes evening drop-off in Islamabad." },
    ],
  },
  {
    title: "Miachar Kho Meadows Tour, Nagar",
    summary:
      "A day trip from Karimabad through Nagar and Minapin to Miacher, followed by a local 4x4 ride to alpine meadows with views of Rakaposhi and Diran Peak.",
    duration: "Day trip",
    image: "/images/adventure/miachar-kho-meadows.png",
    grade: "Day outing",
    itinerary: [
      { day: "Morning", plan: "Depart Karimabad and drive through Nagar and Minapin to Miacher." },
      { day: "Daytime", plan: "Take a local 4x4 along the rocky mountain track to Kho Meadows. Walk the alpine grasslands and enjoy views of Rakaposhi, Diran Peak, and the surrounding Nagar mountains." },
      { day: "Afternoon", plan: "Have a picnic lunch, then return through Miacher Village, Minapin, and Nagar to Karimabad." },
    ],
  },
  {
    title: "Kharfaq Lake Trek",
    summary:
      "A two-day trek from Skardu to Kharfaq Valley, climbing to the alpine lake for an overnight camp before returning through Ghanche District.",
    duration: "2 days",
    image: "/images/adventure/kharfaq-lake.png",
    grade: "Trekking",
    itinerary: [
      { day: "Day 1", plan: "Drive from Skardu along the Khaplu road to Kharfaq Valley. Trek about 2 km uphill (around 3 hours) through rocky hills and alpine terrain to Kharfaq Lake; camp overnight beside the lake." },
      { day: "Day 2", plan: "Explore the lake and its surroundings, descend by the same trail to Kharfaq Village, then drive back to Skardu through Ghanche’s valleys and towns." },
    ],
  },
  {
    title: "Bayes Water Channel Trek (Death Trek), Budalas",
    summary:
      "A day trek from Karimabad via Nagar and Chalt to Budalas, following sections of the Bayas Daas irrigation channel across exposed mountain terrain.",
    duration: "Day trip",
    image: "/images/adventure/bayes-water-channel.png",
    grade: "Exposed mountain route",
    itinerary: [
      { day: "Morning", plan: "Travel from Karimabad through Aliabad and Nagar to Chalt, then take the local mountain route to Budalas and meet a local guide." },
      { day: "Daytime", plan: "Hike beside sections of the Bayas Daas irrigation channel. The supplied route description warns of rough terrain, exposed cliff tunnels, and narrow sections; follow local guidance and exercise caution." },
      { day: "Afternoon", plan: "Rest at a suitable viewpoint, return to Budalas by the same route, then drive through Chalt, Nagar, and Aliabad to Karimabad." },
    ],
  },
];

const beyondSummitBaseCampTours = trekkingTours.filter(
  (tour) =>
    tour.title.startsWith("K2 Base Camp Trek") ||
    tour.title.startsWith("Nanga Parbat Base Camp Trek"),
);
const dedicatedTrekkingTours = trekkingTours.filter(
  (tour) => !beyondSummitBaseCampTours.includes(tour),
);

function TourCard({ tour }: { tour: AdventureTour }) {
  return (
    <JourneyCard
      image={tour.image}
      imageAlt={`${tour.title} mountain view`}
      imageSizes="(max-width: 1024px) 100vw, 50vw"
      imageHeight="h-40 sm:h-48"
      eyebrow={tour.duration}
      title={tour.title}
      badge={tour.grade}
      counter={tour.altitude}
      bodyClassName="p-5 sm:p-6"
    >
      <p className="line-clamp-2 flex-1 text-sm leading-6 text-white/75">{tour.summary}</p>
      <details className="group mt-5 border-t border-white/15 pt-4">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-white [&::-webkit-details-marker]:hidden">
          View itinerary
          <span className="text-lg text-[#fcc000] transition-transform group-open:rotate-45" aria-hidden="true">
            +
          </span>
        </summary>
        <ol className="mt-4 space-y-3">
          {tour.itinerary.map((item) => (
            <li key={`${tour.title}-${item.day}`} className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3 text-sm leading-6">
              <span className="font-semibold text-[#fcc000]">{item.day}</span>
              <span className="text-white/75">{item.plan}</span>
            </li>
          ))}
        </ol>
      </details>
    </JourneyCard>
  );
}

function TourSection({
  id,
  eyebrow,
  title,
  description,
  tours,
  emptyMessage,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  tours: AdventureTour[];
  emptyMessage?: string;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-10 sm:py-14">
      <div className="mb-6 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#806700]">{eyebrow}</p>
        <h2 className="mt-3 font-[var(--font-display)] text-3xl tracking-[-0.025em] text-stone-950 sm:text-4xl">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-7 text-stone-600 sm:text-base">{description}</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {tours.map((tour) => (
          <TourCard key={tour.title} tour={tour} />
        ))}
      </div>
      {tours.length === 0 && emptyMessage ? (
        <p className="rounded-2xl border border-dashed border-stone-300 bg-white/70 px-5 py-6 text-sm leading-6 text-stone-600">
          {emptyMessage}
        </p>
      ) : null}
    </section>
  );
}

export function AdventureToursContent() {
  return (
    <>
      <section className="relative left-1/2 -mt-20 w-screen -translate-x-1/2 overflow-hidden bg-[#101010] text-white">
        <div className="relative min-h-[88vh]">
          <Image
            src="/images/editorial/adventure-routes.webp"
            alt="Hiker looking across a mountain lake"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <video
            src="/videos/adventure-hero.mp4"
            poster="/images/editorial/adventure-routes.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            controls={false}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="relative z-10 flex min-h-[88vh] w-full items-end px-6 pb-14 pt-40 lg:px-16 lg:pb-20">
            <div className="max-w-5xl text-white">
              <p className="eyebrow">Hodophile Adventures · Pakistan</p>
              <h1 className="display-serif mt-5 max-w-4xl text-3xl font-normal leading-[1.08] sm:text-4xl">
                Adventure Tours
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-white/85 sm:text-base sm:leading-7">
                Explore the itineraries shared so far for Pakistan&apos;s mountain expeditions and base-camp treks.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <TourSection
          id="beyond-the-summit"
          eyebrow="Expeditions and base-camp treks"
          title="Beyond the Summit"
          description="Karakoram climbing expeditions, including the K2 and Nanga Parbat base-camp treks."
          tours={[...summitExpeditions, ...beyondSummitBaseCampTours]}
        />
        <TourSection
          id="trekking-tours"
          eyebrow="Mountain trekking"
          title="Beyond the Beaten Path"
          description="Explore day hikes, alpine meadows, and multi-day trekking routes across Pakistan."
          tours={dedicatedTrekkingTours}
        />
      </div>
    </>
  );
}
