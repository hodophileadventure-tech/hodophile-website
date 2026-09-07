"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { formatPKR } from "@/lib/currency";
import { umrahPackages, type UmrahPackage } from "@/lib/data/umrah-packages";
import { whatsappUrl } from "@/lib/site";

const durationOptions = [15, 20] as const;
const tierOrder = ["SAFAR", "NOOR", "SUKOON", "BARAKAH", "RAHAT", "MANZIL", "REHMAT", "HARAMAIN", "AAFIYAT", "MAQAM"] as const;

function startingPrice(pkg: UmrahPackage) {
  return Math.min(...Object.values(pkg.prices));
}

function inquiryMessage(pkg: UmrahPackage) {
  return `Hi Hodophile, I'm interested in the ${pkg.name} ${pkg.duration}-day Umrah package. Please share availability and booking details.`;
}

function HotelBlock({ city, hotel, distance }: { city: string; hotel: string; distance: string }) {
  return (
    <div className="border-l-2 border-[#FCC000] pl-4">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#777]">{city}</p>
      <p className="mt-2 font-medium text-[#111]">{hotel}</p>
      <p className="mt-1 text-sm text-[#666]">{distance}</p>
    </div>
  );
}

function PackageCard({ pkg }: { pkg: UmrahPackage }) {
  return (
    <article className="flex h-full flex-col border border-[#dedbd2] bg-white">
      <div className="border-b border-[#ebe8e0] px-5 py-5 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#777]">{pkg.originalTier} tier</p>
            <h3 className="mt-2 font-[var(--font-miqat-heading)] text-3xl text-[#111]">{pkg.name}</h3>
          </div>
          <p className="whitespace-nowrap border border-[#d7b200] px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#5d4b00]">{pkg.duration} days</p>
        </div>
        {pkg.tagline ? <p className="mt-3 text-sm text-[#666]">{pkg.tagline}</p> : null}
      </div>

      <div className="grid gap-5 px-5 py-5 sm:grid-cols-2 sm:px-6">
        <HotelBlock city="Makkah hotel" hotel={pkg.makkah.hotel} distance={pkg.makkah.distance} />
        <HotelBlock city="Madinah hotel" hotel={pkg.madinah.hotel} distance={pkg.madinah.distance} />
      </div>

      <div className="mt-auto border-t border-[#ebe8e0] bg-[#f7f5ef] px-5 py-5 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#777]">From</p>
            <p className="mt-1 text-xl font-semibold text-[#111]">{formatPKR(startingPrice(pkg))}</p>
          </div>
          <p className="text-right text-xs leading-5 text-[#666]">Quint to double<br />room options</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href={`/umrah-packages/${pkg.id}`} className="inline-flex items-center justify-center bg-[#FCC000] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#e6b100]">
            View package
          </Link>
          <a href={whatsappUrl(inquiryMessage(pkg))} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center border border-[#1d1d1d] px-4 py-3 text-sm font-semibold text-[#1d1d1d] transition hover:bg-[#1d1d1d] hover:text-white">
            Ask an expert
          </a>
        </div>
      </div>
    </article>
  );
}

export function UmrahPackages() {
  const [selectedDuration, setSelectedDuration] = useState<15 | 20>(20);
  const packages = useMemo(
    () => umrahPackages.filter((pkg) => pkg.duration === selectedDuration).sort((a, b) => tierOrder.indexOf(a.name as (typeof tierOrder)[number]) - tierOrder.indexOf(b.name as (typeof tierOrder)[number])),
    [selectedDuration]
  );

  return (
    <section id="miqat-packages" className="bg-[#f4f1eb] px-4 py-16 text-[#111] sm:px-6 lg:px-10 xl:px-14" aria-labelledby="miqat-packages-heading">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 border-b border-[#d6d1c5] pb-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8b7000]">MIQAT packages</p>
            <h2 id="miqat-packages-heading" className="mt-3 font-[var(--font-miqat-heading)] text-4xl leading-tight sm:text-5xl">Clear choices for a considered journey.</h2>
            <p className="mt-4 text-base leading-8 text-[#5d5a54]">Compare the accommodation and room occupancy options already available in our 15 and 20 day Umrah packages.</p>
          </div>
          <div className="flex shrink-0 gap-2" aria-label="Package duration">
            {durationOptions.map((duration) => (
              <button key={duration} type="button" onClick={() => setSelectedDuration(duration)} aria-pressed={selectedDuration === duration} className={`border px-5 py-3 text-sm font-semibold transition ${selectedDuration === duration ? "border-[#FCC000] bg-[#FCC000] text-black" : "border-[#aaa59b] bg-transparent text-[#4b4945] hover:border-[#111]"}`}>
                {duration} days
              </button>
            ))}
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-sm leading-7 text-[#66615a]">Prices are shown per person by room occupancy. Availability, flight routing, and final hotel confirmation are reviewed during booking.</p>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">{packages.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}</div>

        <div className="mt-10 border border-[#d6d1c5] bg-white p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8b7000]">Booking clarity</p>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-[#5d5a54]">Package pricing is subject to availability and travel dates. Airline routing, hotel confirmation, and the final booking details are confirmed with the MIQAT team.</p>
        </div>
      </div>
    </section>
  );
}
