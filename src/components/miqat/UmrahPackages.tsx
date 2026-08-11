"use client";

import { useMemo, useState } from "react";
import { umrahPackages, type UmrahPackage } from "@/lib/data/umrah-packages";
import { formatPKR } from "@/lib/currency";
import Link from "next/link";

const durationOptions = [15, 20] as const;

const tierOrder = [
  "SAFAR",
  "NOOR",
  "SUKOON",
  "BARAKAH",
  "RAHAT",
  "MANZIL",
  "REHMAT",
  "HARAMAIN",
  "AAFIYAT",
  "MAQAM",
] as const;

function packagePriority(pkg: UmrahPackage) {
  return tierOrder.indexOf(pkg.name as (typeof tierOrder)[number]);
}

function packageLabel(pkg: UmrahPackage) {
  return pkg.name;
}

function packageHeadline(pkg: UmrahPackage) {
  return `${packageLabel(pkg)} · ${pkg.duration} Days`;
}

function packageAccentStyle(pkg: UmrahPackage) {
  if (pkg.name === "MAQAM") {
    return "border-[#FCC000]/80 bg-[#111111]";
  }
  if (pkg.name === "HARAMAIN" || pkg.name === "AAFIYAT") {
    return "border-[#FCC000]/50 bg-[#0F0F0F]";
  }
  return "border-[#333333] bg-[#0B0B0B]";
}

const pricingKeys = [
  { label: "Quint", field: "quint" as const },
  { label: "Quad", field: "quad" as const },
  { label: "Triple", field: "triple" as const },
  { label: "Double", field: "double" as const },
];

export function UmrahPackages() {
  const [selectedDuration, setSelectedDuration] = useState<15 | 20>(20);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const packages = useMemo(
    () =>
      umrahPackages
        .filter((pkg) => pkg.duration === selectedDuration)
        .sort((a, b) => packagePriority(a) - packagePriority(b)),
    [selectedDuration]
  );

  const activePackage = packages.find((pkg) => pkg.id === selectedPackage) ?? null;

  return (
    <section id="miqat-packages" className="bg-black px-4 py-12 sm:px-6 lg:px-10 xl:px-14">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.38em] text-[#FCC000]">Umrah Packages</p>
          <h2 className="mt-4 font-[var(--font-miqat-heading)] text-4xl text-white sm:text-5xl">
            Find the journey that fits you.
          </h2>
          <p className="mt-5 text-base leading-8 text-[#D8D8D8] sm:text-lg">
            Carefully selected accommodation options in Makkah and Madinah, with flexible room occupancy and 15 or 20 day packages.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {durationOptions.map((duration) => (
              <button
                key={duration}
                type="button"
                onClick={() => setSelectedDuration(duration)}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                  selectedDuration === duration
                    ? "border-[#FCC000] bg-[#FCC000] text-black"
                    : "border-[#6B6B6B] bg-black text-[#D8D8D8] hover:border-[#FCC000]/70 hover:text-white"
                }`}
              >
                {duration} Days
              </button>
            ))}
          </div>

          <p className="mt-4 inline-flex items-center gap-2 text-sm text-[#BDBDBD]">
            <span>September • October • November 2026</span>
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#FCC000]" />
            <span className="inline-flex items-center gap-2">
              <svg className="h-4 w-4 text-[#FCC000]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 1.5a8.5 8.5 0 0 1 8.5 8.5c0 1.2-.27 2.35-.76 3.39L15 13.25V11h-2v3.25L4.26 15.39A8.48 8.48 0 0 1 3.5 12a8.5 8.5 0 0 1 8.5-8.5Z" fill="currentColor"/>
              </svg>
              Direct Flight
            </span>
          </p>
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-2">
          {packages.map((pkg, index) => (
            <article
              key={pkg.id}
              className={`group overflow-hidden rounded-[2rem] border ${packageAccentStyle(pkg)} shadow-[0_20px_60px_rgba(0,0,0,0.24)] transition duration-300 hover:-translate-y-1`}
            >
              <div className="rounded-t-[1.75rem] border-b border-white/10 bg-[#0F0F0F] px-6 py-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-[#B9B9B9]">{packageLabel(pkg)}</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">{packageHeadline(pkg)}</h3>
                    {pkg.tagline ? (
                      <p className="mt-2 text-sm uppercase tracking-[0.24em] text-[#E0C45D]">{pkg.tagline}</p>
                    ) : null}
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#FCC000]/50 bg-white/5 px-3 py-2 text-sm font-semibold text-[#FCC000]">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 2l1.35 3.41L17 6.5l-2.6 2.26L15.1 12 12 10.16 8.9 12l.7-3.24L7 6.5l3.65-.09L12 2Z" fill="currentColor"/>
                    </svg>
                    Popular
                  </div>
                </div>
              </div>

              <div className="space-y-4 border-b border-white/10 bg-white px-6 py-6 text-[#1C1C1C] sm:px-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-black/10 bg-[#F8F7F3] p-5">
                    <div className="flex items-center gap-3 text-sm uppercase tracking-[0.30em] text-[#8A8A8A]">
                      <svg className="h-4 w-4 text-[#FCC000]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M4 12h16M14 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Makkah</span>
                    </div>
                    <p className="mt-4 text-base font-semibold text-[#0F0F0F]">{pkg.makkah.hotel}</p>
                    <p className="mt-2 text-sm text-[#5D5D5D]">{pkg.makkah.distance}</p>
                  </div>

                  <div className="rounded-[1.5rem] border border-black/10 bg-[#F8F7F3] p-5">
                    <div className="flex items-center gap-3 text-sm uppercase tracking-[0.30em] text-[#8A8A8A]">
                      <svg className="h-4 w-4 text-[#FCC000]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M4 12h16M14 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Madinah</span>
                    </div>
                    <p className="mt-4 text-base font-semibold text-[#0F0F0F]">{pkg.madinah.hotel}</p>
                    <p className="mt-2 text-sm text-[#5D5D5D]">{pkg.madinah.distance}</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#090909] px-6 py-6 sm:px-8">
                <p className="text-xs uppercase tracking-[0.32em] text-[#B9B9B9]">Room Options</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-4">
                  {pricingKeys.map((pricing) => (
                    <div key={pricing.field} className="rounded-[1.5rem] border border-white/10 bg-[#0E0E0E] px-4 py-4 text-center">
                      <p className="text-[0.72rem] uppercase tracking-[0.34em] text-[#999999]">{pricing.label}</p>
                      <p className="mt-3 text-lg font-semibold text-white">{formatPKR(pkg.prices[pricing.field])}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm leading-7 text-[#BDBDBD]">Select a package to request a tailored Umrah booking from our expert team.</p>
                    {pkg.tagline ? (
                      <p className="mt-2 text-sm font-medium uppercase tracking-[0.24em] text-[#E0C45D]">
                        {pkg.tagline}
                      </p>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedPackage(pkg.id)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FCC000] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#e6b100]"
                  >
                    View Package
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M4 12h16M14 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {activePackage ? (
          <div className="mt-10 rounded-[2rem] border border-white/10 bg-[#111111] p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.38em] text-[#FCC000]">Package Details</p>
                <h3 className="mt-3 text-3xl font-semibold text-white">{activePackage.name}</h3>
                <p className="mt-2 text-base leading-7 text-[#D8D8D8]">{activePackage.duration} Days · Direct Flight · Available for September, October and November 2026.</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPackage(null)}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-[#D8D8D8] transition hover:border-[#FCC000] hover:text-white"
              >
                Close details
              </button>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-[1.75rem] border border-white/10 bg-[#0F0F0F] p-6">
                <p className="text-xs uppercase tracking-[0.32em] text-[#B9B9B9]">Accommodation</p>
                <div className="mt-6 space-y-5 text-[#E6E6E6]">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-[#BBBBBB]">Makkah Hotel</p>
                    <p className="mt-2 text-lg font-semibold text-white">{activePackage.makkah.hotel}</p>
                    <p className="mt-1 text-sm text-[#B9B9B9]">{activePackage.makkah.distance}</p>
                  </div>

                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-[#BBBBBB]">Madinah Hotel</p>
                    <p className="mt-2 text-lg font-semibold text-white">{activePackage.madinah.hotel}</p>
                    <p className="mt-1 text-sm text-[#B9B9B9]">{activePackage.madinah.distance}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-[#0F0F0F] p-6">
                <p className="text-xs uppercase tracking-[0.32em] text-[#B9B9B9]">Pricing</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {pricingKeys.map((pricing) => (
                    <div key={pricing.field} className="rounded-[1.5rem] bg-[#131313] p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-[#B9B9B9]">{pricing.label}</p>
                      <p className="mt-3 text-2xl font-semibold text-white">{formatPKR(activePackage.prices[pricing.field])}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href="/umrah-packages/book"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FCC000] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#e6b100]"
                >
                  Enquire Now
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 12h16M14 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-10 rounded-[2rem] border border-white/10 bg-[#070707] p-6 sm:p-8">
          <p className="text-sm uppercase tracking-[0.38em] text-[#FCC000]">Important Information</p>
          <ul className="mt-5 space-y-3 text-[#C1C1C1] text-sm leading-7">
            <li>Prices are subject to availability and may change depending on travel dates and airline availability.</li>
            <li>Hotel confirmation is subject to availability and will be finalized upon booking.</li>
            <li>Direct flights are included where available; exact airline schedules will be confirmed during booking.</li>
            <li>Please contact our Umrah specialists for the latest availability and booking confirmation.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
