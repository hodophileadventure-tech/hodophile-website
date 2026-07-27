import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn how Hodophile Adventures plans domestic Pakistan trips with route-first itineraries, private transport, and hotel coordination.",
  alternates: {
    canonical: "/about-us",
  },
  openGraph: {
    title: "About Us",
    description:
      "A Pakistan travel brand focused on Hunza, Skardu, Naran, Kashmir, Swat, Murree, Shogran, Nathia Gali, and Astore.",
    url: absoluteUrl("/about-us"),
  },
};

export default function AboutUsPage() {
  return (
    <PageShell wide>
      {/* Hero Section with Image */}
      <section className="relative mt-0 mx-auto max-w-full overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/editorial/about-us-hero.jpg)',
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />
        
        {/* Content */}
        <div className="relative z-10 mx-auto max-w-[96rem] px-6 lg:px-8 xl:px-10 py-20 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-block mb-4 px-4 py-2 bg-[#fcc000]/20 border border-[#fcc000]/80 rounded-full backdrop-blur-sm">
              <span className="text-[#fcc000] font-semibold text-sm tracking-wide uppercase">Our Story</span>
            </div>
            
            <h1 className="font-serif text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Journey With Pakistan's Most Trusted Travel Partner
            </h1>
            
            <p className="text-xl text-gray-100 max-w-2xl leading-relaxed">
              Since 2021, we've been crafting unforgettable adventures across Pakistan's most breathtaking destinations, one traveler at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mx-auto max-w-[96rem] px-6 lg:px-8 xl:px-10 py-12 lg:py-16">
        <div className="flex flex-wrap gap-8 lg:gap-12">
          <div>
            <p className="text-4xl font-bold text-[#fcc000]">1000+</p>
            <p className="text-stone-600 mt-2 text-lg">Happy Travelers</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[#fcc000]">15+</p>
            <p className="text-stone-600 mt-2 text-lg">Destinations</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[#fcc000]">24/7</p>
            <p className="text-stone-600 mt-2 text-lg">Support Available</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[#fcc000]">100%</p>
            <p className="text-stone-600 mt-2 text-lg">Licensed & Insured</p>
          </div>
        </div>
      </section>

      {/* Why We're Different Section */}
      <section className="mx-auto max-w-[96rem] px-6 lg:px-8 xl:px-10 py-16">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="rounded-2xl border-2 border-[#fcc000] bg-gradient-to-br from-[#fffbf0] to-white p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-[#fcc000] flex items-center justify-center mb-4">
              <span className="text-2xl">ðŸ—ºï¸</span>
            </div>
            <h3 className="text-xl font-semibold text-stone-900 mb-3">Route-First Planning</h3>
            <p className="text-stone-600">We design trips around routes you want to explore, not random packages. Clear paths, better value.</p>
          </div>
          
          <div className="rounded-2xl border-2 border-[#fcc000] bg-gradient-to-br from-[#fffbf0] to-white p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-[#fcc000] flex items-center justify-center mb-4">
              <span className="text-2xl">ðŸ¤</span>
            </div>
            <h3 className="text-xl font-semibold text-stone-900 mb-3">Personal Touch</h3>
            <p className="text-stone-600">Every traveler is unique. Our team listens, plans, and delivers experiences tailored to you.</p>
          </div>
          
          <div className="rounded-2xl border-2 border-[#fcc000] bg-gradient-to-br from-[#fffbf0] to-white p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-[#fcc000] flex items-center justify-center mb-4">
              <span className="text-2xl">âœ¨</span>
            </div>
            <h3 className="text-xl font-semibold text-stone-900 mb-3">Complete Peace of Mind</h3>
            <p className="text-stone-600">From transport to hotels to 24/7 supportâ€”we handle everything so you just focus on making memories.</p>
          </div>
        </div>
      </section>

      {/* Company Profile Section */}
      <section className="mt-8 mx-auto max-w-[96rem] px-6 lg:px-8 xl:px-10 pb-12">
        <div className="mb-12">
          <div className="inline-block mb-4 px-4 py-2 bg-[#fcc000]/10 border border-[#fcc000] rounded-full">
            <span className="text-[#fcc000] font-semibold text-sm tracking-wide uppercase">Learn More</span>
          </div>
          
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold tracking-tight text-stone-900 mb-4">
            Company Profile
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl">
            Explore our journey, vision, team, and what sets us apart in Pakistan's travel industry.
          </p>
        </div>

        <section className="mb-12 rounded-[2rem] border border-[#fcc000]/20 bg-[#fff8e3] p-8 shadow-[0_30px_60px_-28px_rgba(252,192,0,0.55)]">
          <div className="mb-8">
            <h3 className="font-serif text-3xl lg:text-4xl font-semibold tracking-tight text-stone-900">
              Our Team
            </h3>
            <p className="mt-4 max-w-3xl text-stone-700">
              Our leadership and specialist teams work together to make every journey smooth, safe, and unforgettable.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-3xl border border-[#fcc000] bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.25em] text-[#b76d00]">CEO</p>
              <p className="mt-3 text-2xl font-semibold text-stone-900">Sana Masood</p>
              <p className="mt-3 text-stone-700">Leading our vision for safe and inspiring travel across Pakistan.</p>
            </div>
            <div className="rounded-3xl border border-[#fcc000] bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.25em] text-[#b76d00]">Managing Director</p>
              <p className="mt-3 text-2xl font-semibold text-stone-900">Masood Ahmed</p>
              <p className="mt-3 text-stone-700">Driving operational excellence and ensuring our service delivery runs smoothly.</p>
            </div>
            <div className="rounded-3xl border border-[#fcc000] bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.25em] text-[#b76d00]">Director Corporate</p>
              <p className="mt-3 text-2xl font-semibold text-stone-900">Israr Ahmed Siddiqui</p>
              <p className="mt-3 text-stone-700">Strengthening corporate relationships and planning better business travel.</p>
            </div>
            <div className="rounded-3xl border border-[#fcc000] bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.25em] text-[#b76d00]">HR & Admin</p>
              <p className="mt-3 text-2xl font-semibold text-stone-900">Yashar Ahmed Siddiqui</p>
              <p className="mt-3 text-stone-700">Supporting our people and coordinating the team behind every tour.</p>
            </div>
            <div className="rounded-3xl border border-[#fcc000] bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.25em] text-[#b76d00]">Floor Manager</p>
              <p className="mt-3 text-2xl font-semibold text-stone-900">Mamoon</p>
              <p className="mt-3 text-stone-700">Coordinating ground operations so every tour stays organized.</p>
            </div>
            <div className="rounded-3xl border border-[#fcc000] bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.25em] text-[#b76d00]">Manager Operations</p>
              <p className="mt-3 text-2xl font-semibold text-stone-900">Maaz Ahmed Siddiqui</p>
              <p className="mt-3 text-stone-700">Overseeing logistics and ensuring every itinerary is delivered effectively.</p>
            </div>
            <div className="rounded-3xl border border-[#fcc000] bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.25em] text-[#b76d00]">Software Engineer</p>
              <p className="mt-3 text-2xl font-semibold text-stone-900">Qasim Ateeque</p>
              <p className="mt-3 text-stone-700">Building systems that keep our services reliable and responsive.</p>
            </div>
            <div className="rounded-3xl border border-[#fcc000] bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.25em] text-[#b76d00]">Social Media Marketing Executive</p>
              <p className="mt-3 text-2xl font-semibold text-stone-900">Areeba Siddique</p>
              <p className="mt-3 text-stone-700">Sharing our travel stories and inspiring more people to explore Pakistan.</p>
            </div>
            <div className="rounded-3xl border border-[#fcc000] bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.25em] text-[#b76d00]">Video Editor</p>
              <p className="mt-3 text-2xl font-semibold text-stone-900">Sameer Khan</p>
              <p className="mt-3 text-stone-700">Transforming our tours into visuals that reflect the true spirit of travel.</p>
            </div>
            <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-[#fcc000] bg-white p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-[#b76d00]">Sales Executive</p>
                <p className="mt-3 text-2xl font-semibold text-stone-900">Syed Altamash Ali</p>
                <p className="mt-3 text-stone-700">Connecting travelers to the right tour and answering every booking question.</p>
              </div>
              <div className="rounded-3xl border border-[#fcc000] bg-white p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-[#b76d00]">Sales Executive</p>
                <p className="mt-3 text-2xl font-semibold text-stone-900">Abdullah Ahmed</p>
                <p className="mt-3 text-stone-700">Helping travelers choose the best itinerary and supporting smooth bookings.</p>
              </div>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-[2rem] border border-[#fcc000]/30 bg-white shadow-[0_40px_80px_-40px_rgba(252,192,0,0.45)]">
            <div className="relative overflow-hidden">
              <img
                src="/images/editorial/about-us-hierarchy.png"
                alt="Team hierarchy chart"
                className="w-full h-auto object-cover transition-transform duration-500 ease-out hover:scale-[1.02]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>
        </section>

      </section>
    </PageShell>
  );
}
