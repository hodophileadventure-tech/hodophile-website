"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";

import { tourPackages, type TravelStyle } from "@/lib/data/tour-packages";
import { JourneyActions } from "@/components/travel-discovery";
import { rankTripRecommendations, type DurationPreference, type TripPreferences, type RankedTripRecommendation } from "@/lib/trip-intelligence";

const durationOptions: Array<[DurationPreference, string]> = [
  ["weekend", "Up to 3 days"],
  ["4-7", "4-7 days"],
  ["8-12", "8-12 days"],
  ["12-plus", "13+ days"],
];

const monthOptions = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

function formatDestination(slug: string) {
  return slug.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

function buildPlannerHref(packageId: string, destination?: string) {
  const packageItem = tourPackages.find((trip) => trip.id === packageId);
  const query = new URLSearchParams({ inspiration: packageItem?.title ?? "Recommended journey" });
  if (destination) query.set("destination", destination);
  return `/make-my-trip?${query.toString()}`;
}

type Recommendation = RankedTripRecommendation<(typeof tourPackages)[number]>;

function formatStyle(style: TravelStyle) {
  return style === "couples" ? "Couples" : style.charAt(0).toUpperCase() + style.slice(1);
}

function RecommendationCard({ recommendation, hasPreferences }: { recommendation: Recommendation; hasPreferences: boolean }) {
  const { trip, score, reasons, matchedCriteria } = recommendation;
  const matches = reasons.filter((reason) => reason.type === "match").slice(0, 4);
  const mismatches = reasons.filter((reason) => reason.type === "mismatch").slice(0, 2);
  const isStrong = hasPreferences && mismatches.length === 0 && score >= 75 && matchedCriteria.length >= 2;
  const label = !hasPreferences ? "Suggested starting point" : isStrong ? "Strong match" : matchedCriteria.length ? "Good fit" : "Worth considering";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1rem] border border-stone-200 bg-white shadow-[0_12px_30px_rgba(55,55,48,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#d3a900] hover:shadow-[0_18px_38px_rgba(55,55,48,0.1)]">
      <div className="relative aspect-[16/9] overflow-hidden bg-stone-200">
        <Image src={trip.image} alt={trip.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-3 pt-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#ffe28a]">{label}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-bold uppercase tracking-[0.14em] text-stone-500">
          <span>{trip.duration}</span>
          <span>{trip.region === "northern" ? "Northern Pakistan" : "Southern Pakistan"}</span>
          {trip.pace ? <span>{trip.pace} pace</span> : null}
        </div>
        <h3 className="mt-2 font-serif text-2xl leading-tight text-stone-950">{trip.title}</h3>
        <p className="mt-2 text-sm leading-6 text-stone-600">{trip.routeStops.join(" · ")}</p>
        <div className="mt-4 flex items-end justify-between gap-3 border-t border-stone-100 pt-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] text-stone-500">Listed price</p>
            <p className="mt-1 text-lg font-semibold text-[#8b6b00]">PKR {trip.pricePerPerson.toLocaleString()}</p>
          </div>
          <p className="text-right text-xs font-semibold text-stone-600">{trip.departureAvailability === "confirmed" ? "Confirmed departures" : "On request"}</p>
        </div>
        <div className="mt-4 border-l-2 border-[#fcc000] pl-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-stone-500">Why it fits</p>
          <ul className="mt-2 space-y-1.5 text-xs leading-5 text-stone-700">
            {matches.map((reason) => <li key={`${trip.id}-${reason.criterion}`}>✓ {reason.detail}</li>)}
            {mismatches.map((reason) => <li key={`${trip.id}-${reason.criterion}`} className="text-stone-500">Not quite: {reason.detail}</li>)}
            {!hasPreferences ? <li className="text-stone-500">Catalog starting point without a preference match.</li> : null}
          </ul>
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-stone-100 pt-5">
          <Link href={buildPlannerHref(trip.id, trip.destinationSlugs[0])} className="inline-flex min-h-10 flex-1 items-center justify-center rounded-full bg-[#0b0b0b] px-3 text-[10px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-[#282828] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b6b00]">Build this trip</Link>
          <Link href={`/packages/${trip.id}`} className="inline-flex min-h-10 items-center justify-center rounded-full border border-stone-300 bg-white px-3 text-[10px] font-bold uppercase tracking-[0.1em] text-stone-900 transition hover:border-[#8b6b00] hover:text-[#5f4900] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b6b00]">View journey</Link>
          <JourneyActions packageId={trip.id} packageTitle={trip.title} />
        </div>
      </div>
    </article>
  );
}

export function TripMakerRecommendations() {
  const [travelStyle, setTravelStyle] = useState<TravelStyle | "">("");
  const [duration, setDuration] = useState<DurationPreference | "">("");
  const [budget, setBudget] = useState("");
  const [departureMonth, setDepartureMonth] = useState("");
  const [destination, setDestination] = useState("");
  const [region, setRegion] = useState<TripPreferences["region"] | "">("");

  const preferences = useMemo<TripPreferences>(() => ({
    travelStyle: travelStyle || undefined,
    duration: duration || undefined,
    budget: budget ? Number(budget) : undefined,
    departureMonth: departureMonth || undefined,
    destination: destination || undefined,
    region: region || undefined,
  }), [budget, departureMonth, destination, duration, region, travelStyle]);

  const recommendations = useMemo(
    () => rankTripRecommendations(preferences, tourPackages, 5),
    [preferences],
  );
  const hasPreferences = Object.values(preferences).some(Boolean);
  const primaryRecommendations = recommendations.filter((recommendation) => !recommendation.reasons.some((reason) => reason.type === "mismatch"));
  const strongestRecommendations = (primaryRecommendations.length ? primaryRecommendations : recommendations).slice(0, 3);
  const alternativeRecommendations = recommendations.filter((recommendation) => !strongestRecommendations.includes(recommendation)).slice(0, 2);

  return (
    <section className="rounded-[1.5rem] border border-[#e8ddba] bg-[#fffdf8] p-5 shadow-[0_16px_42px_rgba(55,55,48,0.07)] sm:p-7" aria-labelledby="recommendation-heading">
      <div className="max-w-2xl">
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8b6b00]">Start with the journey</p>
        <h2 id="recommendation-heading" className="mt-2 font-serif text-3xl text-stone-950">Tell us what kind of trip you want.</h2>
        <p className="mt-2 text-sm leading-6 text-stone-600">Use as many or as few preferences as you like. We compare the current package catalog, then explain the trade-offs.</p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <label className="text-xs font-semibold text-stone-600">
          Travel style
          <select value={travelStyle} onChange={(event) => setTravelStyle(event.target.value as TravelStyle | "")} className="mt-1 block min-h-11 w-full rounded-xl border border-stone-300 bg-white px-3 text-sm text-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8b6b00]">
            <option value="">Any style</option>
            <option value="adventure">Adventure</option>
            <option value="family">Family</option>
            <option value="couples">Couples</option>
            <option value="tailored">Tailored</option>
          </select>
        </label>
        <label className="text-xs font-semibold text-stone-600">
          Time available
          <select value={duration} onChange={(event) => setDuration(event.target.value as DurationPreference | "")} className="mt-1 block min-h-11 w-full rounded-xl border border-stone-300 bg-white px-3 text-sm text-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8b6b00]">
            <option value="">Any duration</option>
            {durationOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
        <label className="text-xs font-semibold text-stone-600">
          Budget per person · PKR
          <input type="number" min="0" step="5000" value={budget} onChange={(event) => setBudget(event.target.value)} placeholder="No limit" className="mt-1 block min-h-11 w-full rounded-xl border border-stone-300 bg-white px-3 text-sm text-stone-900 placeholder:text-stone-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8b6b00]" />
        </label>
        <label className="text-xs font-semibold text-stone-600">
          Travel month
          <select value={departureMonth} onChange={(event) => setDepartureMonth(event.target.value)} className="mt-1 block min-h-11 w-full rounded-xl border border-stone-300 bg-white px-3 text-sm text-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8b6b00]">
            <option value="">Any month</option>
            {monthOptions.map((month) => <option key={month} value={month}>{month.charAt(0).toUpperCase() + month.slice(1)}</option>)}
          </select>
        </label>
        <label className="text-xs font-semibold text-stone-600">
          Region
          <select value={region} onChange={(event) => setRegion(event.target.value as TripPreferences["region"] | "")} className="mt-1 block min-h-11 w-full rounded-xl border border-stone-300 bg-white px-3 text-sm text-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8b6b00]">
            <option value="">Any region</option>
            <option value="northern">Northern Pakistan</option>
            <option value="southern">Southern Pakistan</option>
          </select>
        </label>
        <label className="text-xs font-semibold text-stone-600">
          Destination in mind
          <select value={destination} onChange={(event) => setDestination(event.target.value)} className="mt-1 block min-h-11 w-full rounded-xl border border-stone-300 bg-white px-3 text-sm text-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8b6b00]">
            <option value="">Let the catalog suggest</option>
            {[...new Set(tourPackages.flatMap((trip) => trip.destinationSlugs))].sort().map((slug) => <option key={slug} value={slug}>{formatDestination(slug)}</option>)}
          </select>
        </label>
      </div>

      <div className="mt-8 border-t border-stone-200 pt-7">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b6b00]">Your Pakistan trip profile</p>
            <h3 className="mt-2 font-serif text-3xl text-stone-950">{hasPreferences ? "A clearer picture of your journey" : "Start with a few ideas"}</h3>
          </div>
          {hasPreferences ? <button type="button" onClick={() => { setTravelStyle(""); setDuration(""); setBudget(""); setDepartureMonth(""); setDestination(""); setRegion(""); }} className="min-h-10 rounded-full border border-stone-300 bg-white px-4 text-xs font-bold uppercase tracking-[0.12em] text-stone-700 transition hover:border-[#8b6b00] hover:text-stone-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b6b00]">Adjust preferences</button> : null}
        </div>
        {hasPreferences ? (
          <dl aria-label="Selected trip preferences" className="mt-5 grid grid-cols-2 divide-x divide-stone-200 border-y border-stone-200 py-4 sm:grid-cols-3 lg:grid-cols-6">
            {travelStyle ? <div className="px-3 first:pl-0"><dt className="text-[10px] uppercase tracking-[0.16em] text-stone-500">Journey style</dt><dd className="mt-1 text-sm font-semibold text-stone-950">{formatStyle(travelStyle)}</dd></div> : null}
            {duration ? <div className="px-3"><dt className="text-[10px] uppercase tracking-[0.16em] text-stone-500">Time away</dt><dd className="mt-1 text-sm font-semibold text-stone-950">{durationOptions.find(([value]) => value === duration)?.[1]}</dd></div> : null}
            {budget ? <div className="px-3"><dt className="text-[10px] uppercase tracking-[0.16em] text-stone-500">Budget ceiling</dt><dd className="mt-1 text-sm font-semibold text-stone-950">PKR {Number(budget).toLocaleString()}</dd></div> : null}
            {departureMonth ? <div className="px-3"><dt className="text-[10px] uppercase tracking-[0.16em] text-stone-500">Travel month</dt><dd className="mt-1 text-sm font-semibold capitalize text-stone-950">{departureMonth}</dd></div> : null}
            {region ? <div className="px-3"><dt className="text-[10px] uppercase tracking-[0.16em] text-stone-500">Region</dt><dd className="mt-1 text-sm font-semibold text-stone-950">{region === "northern" ? "Northern" : "Southern"}</dd></div> : null}
            {destination ? <div className="px-3 last:pr-0"><dt className="text-[10px] uppercase tracking-[0.16em] text-stone-500">Destination</dt><dd className="mt-1 text-sm font-semibold text-stone-950">{formatDestination(destination)}</dd></div> : null}
          </dl>
        ) : <p className="mt-2 text-sm leading-6 text-stone-600">Choose a few preferences and we will shape a focused shortlist from the current package catalog.</p>}

        {hasPreferences ? (
          <div className="mt-8 border-t border-stone-200 pt-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b6b00]">Journey shortlist</p>
            <h3 className="mt-2 font-serif text-3xl text-stone-950">Journeys that fit your trip</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">Primary matches are the strongest factual fits for the profile above. Each card explains the evidence and any trade-off.</p>
          </div>
        ) : null}

        <div className="mt-7">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b6b00]">{hasPreferences ? "Primary matches" : "Suggested starting points"}</p>
          <p className="mt-1 text-sm text-stone-600">{hasPreferences ? "The strongest factual fits for the profile above." : "Neutral catalog starting points until you choose a preference."}</p>
          <div className="mt-4 grid gap-5 lg:grid-cols-3">
            {strongestRecommendations.map((recommendation) => <RecommendationCard key={recommendation.trip.id} recommendation={recommendation} hasPreferences={hasPreferences} />)}
          </div>
        </div>

        {alternativeRecommendations.length ? (
          <div className="mt-8 border-t border-stone-200 pt-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-500">More journeys to consider</p>
            <p className="mt-1 text-sm text-stone-600">Useful alternatives with a documented trade-off.</p>
            <div className="mt-4 grid gap-5 lg:grid-cols-2">
              {alternativeRecommendations.map((recommendation) => <RecommendationCard key={recommendation.trip.id} recommendation={recommendation} hasPreferences={hasPreferences} />)}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}