"use client";

import { MiqatCTA } from "@/components/miqat/MiqatCTA";
import { MiqatHero } from "@/components/miqat/MiqatHero";
import { UmrahPackages } from "@/components/miqat/UmrahPackages";
import { SacredPlaces } from "@/components/miqat/SacredPlaces";
import { Testimonials } from "@/components/miqat/Testimonials";
import { JourneyTimeline } from "@/components/miqat/JourneyTimeline";
import { WhyMiqat } from "@/components/miqat/WhyMiqat";

export function MiqatLanding() {
  return (
    <div className="-mx-4 overflow-x-hidden bg-[var(--surface-page)] text-[var(--text-primary)] scroll-smooth md:-mx-6 lg:-mx-10 xl:-mx-14">
      <div className="">
        <MiqatHero />
      </div>

      <section className="border-y border-stone-300 bg-[var(--surface-page)] px-4 py-8 sm:px-6 lg:px-10 xl:px-14" aria-label="MIQAT package information">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["15 & 20 days", "Package durations"],
            ["Makkah + Madinah", "Accommodation options"],
            ["Quint to double", "Room occupancy pricing"],
            ["Package inquiry", "Dedicated booking form"],
          ].map(([value, label]) => (
            <div key={label} className="border-l border-[#FCC000] pl-4">
              <p className="text-lg font-semibold text-stone-950">{value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-stone-600">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="">
        <WhyMiqat />
      </div>

      <div className="">
        <UmrahPackages />
      </div>

      <div className="">
        <JourneyTimeline />
      </div>

      <div className="">
        <SacredPlaces />
      </div>

      <div className="">
        <Testimonials />
      </div>

      <div className="">
        <MiqatCTA />
      </div>
    </div>
  );
}
