import Image from "next/image";
import type { GeneratedItinerary, GeneratedItineraryDay, ItineraryActivity } from "@/lib/itinerary-generator";

function ActivityList({ activities }: { activities: ItineraryActivity[] }) {
  if (activities.length === 0) {
    return <p className="text-xs leading-5 text-stone-500">Time to relax or adjust the plan to local conditions.</p>;
  }

  return (
    <ul className="space-y-3">
      {activities.map((activity, index) => (
        <li key={`${activity.title}-${index}`} className="border-l-2 border-[#fcc000] pl-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#816000]">{activity.time}</p>
          <p className="mt-0.5 text-sm font-semibold text-stone-950">{activity.title}</p>
          <p className="mt-1 text-xs leading-5 text-stone-600">{activity.description}</p>
          {activity.distanceKm !== undefined || activity.drivingMinutes !== undefined ? (
            <p className="mt-1 text-[10px] font-medium text-stone-500">
              {activity.distanceKm !== undefined ? `About ${Math.round(activity.distanceKm)} km` : ""}
              {activity.distanceKm !== undefined && activity.drivingMinutes !== undefined ? " · " : ""}
              {activity.drivingMinutes !== undefined
                ? `About ${Math.floor(activity.drivingMinutes / 60)} hr ${activity.drivingMinutes % 60} min driving`
                : ""}
            </p>
          ) : null}
          {activity.visitMinutes !== undefined ? (
            <p className="mt-1 text-[10px] font-medium text-stone-500">Suggested visit: about {activity.visitMinutes} min</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function ItineraryDayCard({ day }: { day: GeneratedItineraryDay }) {
  return (
    <details className="group overflow-hidden rounded-xl border border-stone-200 bg-white" open={day.dayNumber === 1}>
      <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-3 p-4 marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8b6b00]">
        <span>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#816000]">
            {day.date ? `${day.date} · ` : ""}Day {String(day.dayNumber).padStart(2, "0")}
          </span>
          <span className="mt-1 block text-base font-semibold text-stone-950">{day.title}</span>
        </span>
        <span className="text-xs font-semibold text-stone-500 group-open:hidden">View day</span>
        <span className="hidden text-xs font-semibold text-stone-500 group-open:inline">Hide day</span>
      </summary>
      <div className="grid gap-4 border-t border-stone-100 p-4 md:grid-cols-3">
        {day.image ? (
          <div className="relative min-h-40 overflow-hidden rounded-lg bg-stone-100 md:col-span-3">
            <Image src={day.image} alt="" fill sizes="(max-width: 768px) 100vw, 900px" className="object-cover" />
          </div>
        ) : null}
        {day.description ? <p className="text-xs leading-5 text-stone-600 md:col-span-3">{day.description}</p> : null}
        <section aria-label={`Day ${day.dayNumber} morning schedule`} className="rounded-lg bg-stone-50 p-3">
          <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-700">Morning</h3>
          <ActivityList activities={day.morning} />
        </section>
        <section aria-label={`Day ${day.dayNumber} afternoon schedule`} className="rounded-lg bg-stone-50 p-3">
          <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-700">Afternoon</h3>
          <ActivityList activities={day.afternoon} />
        </section>
        <section aria-label={`Day ${day.dayNumber} evening schedule`} className="rounded-lg bg-stone-50 p-3">
          <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-700">Evening</h3>
          <ActivityList activities={day.evening} />
        </section>
        {day.overnight ? (
          <div className="rounded-lg border border-[#f1d77e] bg-[#fff9e8] p-3 text-xs leading-5 md:col-span-3">
            <p className="font-semibold text-stone-950">Overnight · {day.overnight.location}</p>
            <p className="mt-1 text-stone-700">
              {day.overnight.hotelName || "Hotel to be confirmed"}
              {day.overnight.roomName ? ` · ${day.overnight.roomName}` : ""}
            </p>
            <p className="mt-1 text-stone-600">{day.overnight.checkIn} {day.overnight.checkOut}</p>
          </div>
        ) : null}
        {day.notes.length > 0 ? (
          <ul className="space-y-1 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-950 md:col-span-3">
            {day.notes.map((note) => <li key={note}>Note: {note}</li>)}
          </ul>
        ) : null}
      </div>
    </details>
  );
}

export function ItineraryViewer({ itinerary }: { itinerary: GeneratedItinerary }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#e7d28d] bg-[#fffdf8] shadow-[0_12px_36px_rgba(0,0,0,0.07)]" aria-label="Personalized day-by-day itinerary">
      <header className="bg-stone-950 px-5 py-5 text-white sm:px-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#fcc000]">Your personalized journey</p>
        <h2 className="mt-1 font-serif text-2xl font-semibold">{itinerary.title}</h2>
        <p className="mt-1 text-xs text-stone-300">
          {itinerary.durationDays} days · {itinerary.durationNights} nights · {itinerary.travelMode === "air" ? "By air via Skardu" : "By road"} · {itinerary.pace} pace
          {itinerary.travelerCount ? ` · ${itinerary.travelerCount} travelers` : ""}
        </p>
        <p className="mt-1 text-xs text-stone-300">
          {itinerary.vehicleName ? `Vehicle: ${itinerary.vehicleName}` : ""}
          {itinerary.hotelCategory ? `${itinerary.vehicleName ? " · " : ""}Stay category: ${itinerary.hotelCategory}` : ""}
          {itinerary.specialOccasion ? `${itinerary.vehicleName || itinerary.hotelCategory ? " · " : ""}${itinerary.specialOccasion}` : ""}
        </p>
        {itinerary.selectedDestinations.length > 0 ? (
          <p className="mt-2 text-xs text-stone-300">Destinations: {itinerary.selectedDestinations.join(" · ")}</p>
        ) : null}
      </header>
      <div className="space-y-3 p-3 sm:p-5">
        {itinerary.days.map((day) => <ItineraryDayCard key={day.dayNumber} day={day} />)}
      </div>
      {itinerary.notes.length > 0 ? (
        <ul className="space-y-1 border-t border-stone-200 bg-white px-5 py-4 text-xs leading-5 text-stone-600 sm:px-6">
          {itinerary.notes.map((note) => <li key={note}>{note}</li>)}
        </ul>
      ) : null}
      {itinerary.usesOpenStreetMap ? (
        <p className="border-t border-stone-200 bg-white px-5 py-3 text-xs text-stone-500 sm:px-6">
          Location data ©{" "}
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            OpenStreetMap contributors
          </a>{" "}
          (ODbL).
        </p>
      ) : null}
    </section>
  );
}
