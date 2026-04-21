import type { Metadata } from "next";
import Image from "next/image";

import { PageShell } from "@/components/page-shell";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Make My Trip",
  description:
    "A trip request page for domestic Pakistan itineraries, route selection, and travel planning.",
  alternates: {
    canonical: "/make-my-trip",
  },
  openGraph: {
    title: "Make My Trip",
    description: "Submit your travel details and request a custom domestic Pakistan plan.",
    url: absoluteUrl("/make-my-trip"),
  },
};

export default function MakeMyTripPage() {
  return (
    <PageShell>
      <section className="relative -mx-6 overflow-hidden px-6 py-12 lg:-mx-8 lg:px-8">
        <div className="absolute inset-0">
          <Image
            src="/images/editorial/editorial-5.jpg"
            alt="Scenic Pakistan travel background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(12,12,12,0.68)_0%,rgba(12,12,12,0.42)_52%,rgba(252,192,0,0.16)_100%)]" />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-5xl items-center justify-center py-8">
          <div className="w-[calc(100%-64px)] max-w-[420px] rounded-[15px] border border-white/20 bg-white/94 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-sm md:p-5">
            <div className="mb-6 text-center">
              <p className="text-[11px] uppercase tracking-[0.38em] text-[#8a6a00]">Plan my Journey</p>
              <h1 className="mt-3 font-serif text-3xl leading-tight text-stone-900 sm:text-[2.6rem]">
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
                <select className="rounded-[15px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15">
                  <option>Starting Point</option>
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
                Choose destination *
                <select className="rounded-[15px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15">
                  <option>Trip Destination</option>
                  <option>Skardu</option>
                  <option>Hunza</option>
                  <option>Hunza &amp; Skardu</option>
                  <option>Swat</option>
                  <option>Swat &amp; Shogran</option>
                  <option>Neelum Valley Kashmir</option>
                  <option>Shogran &amp; Kashmir</option>
                  <option>Nathia Gali</option>
                  <option>Nathia Gali &amp; Dhirkot</option>
                  <option>Murree &amp; Nathia Gali</option>
                  <option>Nathia Gali &amp; Shogran</option>
                  <option>Dhirkot</option>
                  <option>Shogran &amp; Dhirkot</option>
                  <option>Fairy Meadows</option>
                  <option>Naran &amp; Shogran (Closed for winter)</option>
                  <option>Naran (Closed for winter)</option>
                  <option>Naran &amp; Dhirkot (Closed for winter)</option>
                </select>
              </label>

              <label className="grid gap-2 text-sm font-medium text-stone-900">
                Trip duration *
                <select className="rounded-[15px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15">
                  <option>Number of days</option>
                  <option>2 Days</option>
                  <option>3 Days</option>
                  <option>4 Days</option>
                  <option>5 Days</option>
                  <option>6 Days</option>
                  <option>7 Days</option>
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

              <div className="grid gap-4">
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
                    defaultValue="0"
                    className="rounded-[15px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-medium text-stone-900">
                Ages (all kids)
                <input
                  type="text"
                  placeholder="Enter kids' ages"
                  className="rounded-[15px] border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#fcc000] focus:ring-4 focus:ring-[#fcc000]/15"
                />
              </label>

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
        </div>
      </section>
    </PageShell>
  );
}