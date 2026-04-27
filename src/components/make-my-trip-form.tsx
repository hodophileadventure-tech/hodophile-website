"use client";

import { useState } from "react";

export function MakeMyTripForm() {
  const [startingPoint, setStartingPoint] = useState("");
  const [destination, setDestination] = useState("");
  const [transportation, setTransportation] = useState("road");
  const [minDays, setMinDays] = useState(0);
  const [kidsCount, setKidsCount] = useState(0);
  const [kidsAges, setKidsAges] = useState<string[]>([]);

  const getMinimumDays = (dest: string, mode: string, start: string) => {
    if (mode !== "road") return 0;

    // Minimum durations for Lahore, Islamabad, or Rawalpindi starting points
    const northernStartMapping: { [key: string]: number } = {
      "Hunza & Naltar": 6,
      "Skardu & Basho": 6,
      "Hunza & Skardu": 8,
      "Swat Kalam & Malam Jabba": 4,
      "Kashmir Arangkel & Taobat": 5,
      "Swat Kalam, Malam Jabba & Shogran": 6,
      "Kashmir Arangkel & Shogran": 5,
      "Naran & Babusar": 4,
    };

    // Default mappings for other starting points
    const defaultMapping: { [key: string]: number } = {
      "Hunza & Naltar": 10,
      "Skardu & Basho": 10,
      "Hunza & Skardu": 12,
      "Swat Kalam & Malam Jabba": 8,
      "Kashmir Arangkel & Taobat": 9,
      "Swat Kalam, Malam Jabba & Shogran": 10,
      "Kashmir Arangkel & Shogran": 9,
      "Naran & Babusar": 8,
    };

    const isNorthernStart = ["Lahore", "Islamabad", "Rawalpindi"].includes(start);
    const mapping = isNorthernStart ? northernStartMapping : defaultMapping;

    return mapping[dest] || 0;
  };

  const handleStartingPointChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStart = e.target.value;
    setStartingPoint(newStart);
    setMinDays(getMinimumDays(destination, transportation, newStart));
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDest = e.target.value;
    setDestination(newDest);
    setMinDays(getMinimumDays(newDest, transportation, startingPoint));
  };

  const handleTransportationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMode = e.target.value;
    setTransportation(newMode);
    setMinDays(getMinimumDays(destination, newMode, startingPoint));
  };

  const handleKidsCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value, 10) || 0;
    setKidsCount(count);
    setKidsAges(Array(count).fill(""));
  };

  const handleKidsAgeChange = (index: number, value: string) => {
    const newAges = [...kidsAges];
    newAges[index] = value;
    setKidsAges(newAges);
  };

  return (
    <div className="w-[calc(100%-64px)] max-w-[420px] rounded-[15px] border border-white/20 bg-white/94 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-sm md:p-5">
      <div className="mb-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.38em] text-[#8a6a00]">Plan my Journey</p>
        <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-[2.6rem]">
          plan my journey here
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-stone-600">
          Share your dates, destination, budget, and vehicle preference. We will shape a refined domestic itinerary with Hodophile style and support.
        </p>
      </div>

      <form className="grid gap-4">
        <label className="grid gap-2 text-sm font-medium text-stone-900">
          Choose your trip start date *
          <input
            type="date"
            className="rounded-[15px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-stone-900">
          Choose starting point *
          <select 
            value={startingPoint}
            onChange={handleStartingPointChange}
            className="rounded-[15px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
          >
            <option value="">Starting Point</option>
            <option>Karachi</option>
            <option>Lahore</option>
            <option>Islamabad</option>
            <option>Rawalpindi</option>
            <option>Skardu Airport</option>
            <option>Multan</option>
            <option>Other</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-stone-900">
          Tour type *
          <select className="rounded-[15px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15">
            <option>Select tour type</option>
            <option>Private Tour</option>
            <option>Group Tour</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-stone-900">
          Transportation mode *
          <select 
            value={transportation}
            onChange={handleTransportationChange}
            className="rounded-[15px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
          >
            <option value="road">By Road</option>
            <option value="air">By Air</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-stone-900">
          Choose destination *
          <select 
            value={destination}
            onChange={handleDestinationChange}
            className="rounded-[15px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
          >
            <option value="">Trip Destination</option>
            <option>Hunza & Skardu</option>
            <option>Hunza & Naltar</option>
            <option>Skardu & Basho</option>
            <option>Swat Kalam & Malam Jabba</option>
            <option>Swat & Shogran</option>
            <option>Swat Kalam, Malam Jabba & Shogran</option>
            <option>Neelum Valley Kashmir</option>
            <option>Kashmir Arangkel & Taobat</option>
            <option>Kashmir Arangkel & Shogran</option>
            <option>Shogran & Kashmir</option>
            <option>Nathia Gali & Dhirkot</option>
            <option>Murree & Nathia Gali</option>
            <option>Nathia Gali & Shogran</option>
            <option>Shogran & Dhirkot</option>
            <option>Fairy Meadows</option>
            <option>Naran & Babusar</option>
            <option>Naran & Shogran (Closed for winter)</option>
            <option>Naran & Dhirkot (Closed for winter)</option>
          </select>
        </label>

        {minDays > 0 && (
          <div className="rounded-[15px] bg-[#fcc000]/10 px-4 py-3 text-sm text-stone-900">
            <strong>Minimum tour duration for this route:</strong> {minDays} days
          </div>
        )}

        <label className="grid gap-2 text-sm font-medium text-stone-900">
          Trip duration *
          <select className="rounded-[15px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15">
            <option>Number of days</option>
            {Array.from({ length: 15 - (minDays > 0 ? minDays - 1 : 1) }, (_, i) => {
              const days = (minDays > 0 ? minDays : 2) + i;
              return (
                <option key={days} value={days}>
                  {days} Days
                </option>
              );
            })}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-stone-900">
          Select trip budget *
          <select className="rounded-[15px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15">
            <option>Trip budget</option>
            <option>Economy</option>
            <option>Deluxe</option>
            <option>Executive</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-stone-900">
          Adults *
          <input
            type="number"
            min="1"
            defaultValue="2"
            className="rounded-[15px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-stone-900">
          Kids
          <input
            type="number"
            min="0"
            value={kidsCount}
            onChange={handleKidsCountChange}
            className="rounded-[15px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
          />
        </label>

        {kidsCount > 0 && (
          <div className="grid gap-3">
            <p className="text-sm font-medium text-stone-900">Ages (all kids)</p>
            {Array.from({ length: kidsCount }).map((_, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Kid ${index + 1} age`}
                value={kidsAges[index] || ""}
                onChange={(e) => handleKidsAgeChange(index, e.target.value)}
                className="rounded-[15px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
              />
            ))}
          </div>
        )}

        <label className="grid gap-2 text-sm font-medium text-stone-900">
          No of rooms required *
          <select className="rounded-[15px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5+</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-stone-900">
          Choose your vehicle *
          <select className="rounded-[15px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15">
            <option>Vehicle</option>
            <option>Toyota Corolla</option>
            <option>Honda BR-V</option>
            <option>Prado / Land Cruiser</option>
            <option>Grand Cabin (HiAce)</option>
            <option>Coaster</option>
          </select>
        </label>

        <button
          type="submit"
          className="mt-1 inline-flex w-full items-center justify-center rounded-[15px] bg-[#ffc000] px-6 py-3 text-sm font-semibold text-black shadow-[0_16px_30px_rgba(252,192,0,0.28)] transition hover:-translate-y-0.5 hover:bg-[#ffd247]"
        >
          Design My Trip
        </button>
      </form>
    </div>
  );
}
