import type { GeneratedItinerary } from "@/lib/itinerary-generator";

export function ItineraryViewer({ itinerary }: { itinerary: GeneratedItinerary }) {
  return (
    <section
      className="overflow-hidden rounded-2xl border border-[#e7d28d] bg-[#fffdf8] shadow-[0_12px_36px_rgba(0,0,0,0.07)]"
      aria-label="Personalized day-by-day itinerary"
    >
      <div className="space-y-3 p-3 sm:p-5">
        {itinerary.days.map((day) => (
          <div
            key={day.dayNumber}
            className="flex min-h-[108px] flex-wrap items-center justify-between gap-3 rounded-xl border border-stone-200 bg-white p-4"
          >
            <span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#816000]">
                {day.date ? `${day.date} · ` : ""}Day {String(day.dayNumber).padStart(2, "0")}
              </span>
              <span className="mt-1 block text-base font-semibold text-stone-950">{day.title}</span>
            </span>
            <span className="text-xs font-semibold text-stone-700">View day</span>
          </div>
        ))}
      </div>
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
