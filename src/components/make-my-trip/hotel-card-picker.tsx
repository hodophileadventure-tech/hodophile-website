"use client";

import Image from "next/image";
import { useState } from "react";

import type { Hotel } from "@/lib/data/hotels";

type HotelCardPickerProps = {
  hotels: Hotel[];
  selectedHotelId: string;
  label: string;
  onSelect: (hotelId: string) => void;
};

export function HotelCardPicker({ hotels, selectedHotelId, label, onSelect }: HotelCardPickerProps) {
  const [showAll, setShowAll] = useState(false);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const selectedIndex = hotels.findIndex((hotel) => hotel.id === selectedHotelId);
  const visibleHotels = showAll || selectedIndex > 3 ? hotels : hotels.slice(0, 4);

  if (hotels.length === 0) {
    return <p className="text-xs text-stone-500">No hotel options are listed for this stay.</p>;
  }

  return (
    <div>
      <div role="group" aria-label={label} className="grid gap-2 sm:grid-cols-2">
        {visibleHotels.map((hotel) => {
          const isSelected = selectedHotelId === hotel.id;

          return (
            <button
              key={hotel.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelect(hotel.id)}
              className={`flex min-h-20 min-w-0 items-center gap-3 border p-2 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b6b00] ${isSelected ? "border-[#b98d00] bg-[#fff9e8] ring-1 ring-[#fcc000]/50" : "border-stone-300 bg-white hover:border-[#b98d00]"}`}
            >
              {hotel.image && !failedImages.includes(hotel.id) ? (
                <Image
                  src={hotel.image}
                  alt=""
                  width={96}
                  height={72}
                  unoptimized
                  className="h-[4.5rem] w-24 shrink-0 object-cover"
                  onError={() => setFailedImages((current) => current.includes(hotel.id) ? current : [...current, hotel.id])}
                />
              ) : null}
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-semibold text-stone-950">{hotel.name}</span>
                <span className="mt-1 block text-[10px] text-stone-600">{hotel.city}</span>
                <span className="mt-1 block text-[10px] text-stone-500">{hotel.rooms.length} room {hotel.rooms.length === 1 ? "option" : "options"}</span>
              </span>
              {isSelected ? <span aria-hidden="true" className="mr-1 flex h-5 w-5 shrink-0 items-center justify-center bg-[#fcc000] text-[10px] font-bold text-stone-950">✓</span> : null}
            </button>
          );
        })}
      </div>
      {hotels.length > 4 && !showAll && selectedIndex <= 3 ? (
        <button type="button" onClick={() => setShowAll(true)} className="mt-2 min-h-9 px-1 text-xs font-semibold text-stone-700 underline decoration-[#fcc000] underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8b6b00]">
          Show all {hotels.length} hotels
        </button>
      ) : null}
    </div>
  );
}