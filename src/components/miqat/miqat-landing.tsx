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
    <div className="overflow-x-hidden bg-black font-[var(--font-miqat-body)] text-white -mx-4 md:-mx-6 lg:-mx-10 xl:-mx-14 scroll-smooth">
      <div className="">
        <MiqatHero />
      </div>

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
