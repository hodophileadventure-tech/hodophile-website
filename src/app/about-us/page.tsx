import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { Accordion } from "@/components/accordion";
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
              <span className="text-2xl">🗺️</span>
            </div>
            <h3 className="text-xl font-semibold text-stone-900 mb-3">Route-First Planning</h3>
            <p className="text-stone-600">We design trips around routes you want to explore, not random packages. Clear paths, better value.</p>
          </div>
          
          <div className="rounded-2xl border-2 border-[#fcc000] bg-gradient-to-br from-[#fffbf0] to-white p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-[#fcc000] flex items-center justify-center mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-semibold text-stone-900 mb-3">Personal Touch</h3>
            <p className="text-stone-600">Every traveler is unique. Our team listens, plans, and delivers experiences tailored to you.</p>
          </div>
          
          <div className="rounded-2xl border-2 border-[#fcc000] bg-gradient-to-br from-[#fffbf0] to-white p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-[#fcc000] flex items-center justify-center mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-xl font-semibold text-stone-900 mb-3">Complete Peace of Mind</h3>
            <p className="text-stone-600">From transport to hotels to 24/7 support—we handle everything so you just focus on making memories.</p>
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

        <Accordion
          items={[
            {
              title: "CEO's Message",
              content: (
                <div className="space-y-4">
                  <p>
                    At Hodophile Adventures, we are committed to providing safe, professional, and
                    affordable travel experiences for corporate clients, families, and individual
                    travelers. As a government-licensed tour company, our goal is to create memorable
                    journeys with exceptional service.
                  </p>
                  <p>
                    From our beginnings in Karachi to serving travelers across Pakistan, we are proud
                    to have earned the trust of countless clients exploring destinations like Hunza,
                    Skardu, Naran, Ormara, and beyond. As we continue to grow, our vision is to expand
                    across Asia and become a globally recognized travel brand.
                  </p>
                  <p>
                    No matter the season, we look forward to welcoming you on an unforgettable adventure.
                  </p>
                  <p className="pt-2 font-semibold text-stone-900">Sana Masood</p>
                  <p className="text-stone-700">CEO, Hodophile Adventures</p>
                </div>
              ),
            },
            {
              title: "About Us",
              content: (
                <div className="space-y-4">
                  <p>
                    Founded in 2021 in Karachi, Hodophile Adventures is a government-licensed travel
                    company driven by a passion for creating unforgettable journeys. Today, we proudly
                    serve travelers across Pakistan with carefully planned tours and exceptional customer
                    service.
                  </p>
                  <p>
                    We handle every aspect of your trip—from transportation and accommodation to seamless
                    travel planning—so you can focus on making memories. Whether you're traveling solo,
                    with family, on your honeymoon, in a group, or for business, our experienced team
                    delivers safe, affordable, and personalized travel experiences.
                  </p>
                  <p>
                    With a commitment to quality, professionalism, and 24/7 support, Hodophile Adventures
                    has earned the trust of travelers and is recognized as one of Karachi's leading travel
                    companies.
                  </p>
                  <p className="pt-2 italic text-stone-700">Take memories, leave footprints.</p>
                </div>
              ),
            },
            {
              title: "Vision",
              content: (
                <p>
                  To become the region's most trusted travel brand by delivering innovative, affordable,
                  and responsible travel experiences that inspire lasting customer satisfaction.
                </p>
              ),
            },
            {
              title: "Mission",
              content: (
                <p>
                  To create unforgettable travel experiences by exceeding expectations through exceptional
                  service, personalized journeys, and lasting relationships with every traveler.
                </p>
              ),
            },
            {
              title: "Why Choose Us",
              content: (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-stone-200 bg-white p-4">
                    <h4 className="font-semibold text-stone-900 mb-2">Quality Service</h4>
                    <p className="text-sm text-stone-700">
                      We create personalized, hassle-free journeys tailored to your preferences, ensuring
                      exceptional value, comfort, and memorable experiences.
                    </p>
                  </div>
                  <div className="rounded-lg border border-stone-200 bg-white p-4">
                    <h4 className="font-semibold text-stone-900 mb-2">Diverse Experiences</h4>
                    <p className="text-sm text-stone-700">
                      From the majestic mountains of Hunza and Skardu to the serene beaches of Balochistan,
                      we offer unique tours, camping adventures, and authentic cultural experiences across
                      Pakistan.
                    </p>
                  </div>
                  <div className="rounded-lg border border-stone-200 bg-white p-4">
                    <h4 className="font-semibold text-stone-900 mb-2">Transparent Pricing</h4>
                    <p className="text-sm text-stone-700">
                      Enjoy competitive prices with no hidden charges. Every inclusion and cost is clearly
                      communicated before you book.
                    </p>
                  </div>
                  <div className="rounded-lg border border-stone-200 bg-white p-4">
                    <h4 className="font-semibold text-stone-900 mb-2">Sustainable Tourism</h4>
                    <p className="text-sm text-stone-700">
                      We promote responsible travel by supporting local communities, preserving cultural
                      heritage, protecting nature, and encouraging sustainable tourism practices.
                    </p>
                  </div>
                  <div className="rounded-lg border border-stone-200 bg-white p-4">
                    <h4 className="font-semibold text-stone-900 mb-2">Attention to Detail</h4>
                    <p className="text-sm text-stone-700">
                      From carefully planned itineraries and timely schedules to weather monitoring and
                      budget management, every detail is thoughtfully handled.
                    </p>
                  </div>
                  <div className="rounded-lg border border-stone-200 bg-white p-4">
                    <h4 className="font-semibold text-stone-900 mb-2">Professional Tour Guides</h4>
                    <p className="text-sm text-stone-700">
                      Our experienced bilingual guides combine local expertise, historical knowledge, and
                      professional service to make every journey informative, safe, and enjoyable.
                    </p>
                  </div>
                </div>
              ),
            },
            {
              title: "Our Team",
              content: (
                <div className="space-y-6">
                  <p className="text-stone-700">
                    Our professional and passionate team at Hodophile Adventures is dedicated to
                    understanding your travel needs and delivering seamless experiences. With expert
                    planning, personalized support, and a commitment to excellence, we ensure every journey
                    exceeds your expectations.
                  </p>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-[#fcc000]/30 bg-[#fffbf0] p-4">
                      <p className="font-semibold text-[#fcc000]">CEO</p>
                      <p className="text-stone-900 mt-1">Sana Masood</p>
                    </div>
                    
                    <div className="rounded-lg border border-[#fcc000]/30 bg-[#fffbf0] p-4">
                      <p className="font-semibold text-[#fcc000]">HR</p>
                      <p className="text-stone-900 mt-1">Yashar Ahmed Siddiqui</p>
                    </div>
                    
                    <div className="rounded-lg border border-[#fcc000]/30 bg-[#fffbf0] p-4">
                      <p className="font-semibold text-[#fcc000]">Manager Operations</p>
                      <p className="text-stone-900 mt-1">Maaz Ahmed Siddiqui</p>
                    </div>
                    
                    <div className="rounded-lg border border-[#fcc000]/30 bg-[#fffbf0] p-4">
                      <p className="font-semibold text-[#fcc000]">Web Developer</p>
                      <p className="text-stone-900 mt-1">Qasim Ateeque</p>
                    </div>
                    
                    <div className="rounded-lg border border-[#fcc000]/30 bg-[#fffbf0] p-4">
                      <p className="font-semibold text-[#fcc000]">Social Media Manager</p>
                      <p className="text-stone-900 mt-1">Areeba Siddique</p>
                    </div>
                    
                    <div className="rounded-lg border border-[#fcc000]/30 bg-[#fffbf0] p-4">
                      <p className="font-semibold text-[#fcc000]">Video Editor</p>
                      <p className="text-stone-900 mt-1">Sameer Khan</p>
                    </div>
                    
                    <div className="rounded-lg border border-[#fcc000]/30 bg-[#fffbf0] p-4 sm:col-span-2">
                      <p className="font-semibold text-[#fcc000]">Sales Executives</p>
                      <div className="text-stone-900 mt-2 space-y-1">
                        <p>Syed Altamash</p>
                        <p>Abdullah</p>
                        <p>Maqsood Ahmed</p>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              title: "What Makes Us Unique",
              content: (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-stone-900 mb-3">Pakistan's First Travel Loyalty Card</h4>
                    <p className="text-stone-700 mb-3">
                      We are proud to introduce Pakistan's first-ever travel Loyalty Card, designed to reward
                      our valued travelers. After completing your first tour with us, you receive exclusive
                      benefits, exciting gifts, and special discounts on future adventures.
                    </p>
                    <p className="text-stone-700">
                      The more you explore with Hodophile Adventures, the more rewards you unlock — making
                      every journey more memorable and rewarding.
                    </p>
                  </div>

                  <div className="rounded-lg bg-stone-50 p-4 border border-stone-200">
                    <h5 className="font-semibold text-stone-900 mb-4">Exclusive Loyalty Rewards</h5>
                    <p className="text-sm text-stone-700 mb-4">
                      At Hodophile Adventures, we value our returning travelers. Our Loyalty Program rewards
                      your continued trust with exciting discounts and benefits on every adventure.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm py-2 border-b border-stone-200">
                        <span className="font-medium text-stone-900">First Tour</span>
                        <span className="text-stone-700">Full Price</span>
                      </div>
                      <div className="flex justify-between items-center text-sm py-2 border-b border-stone-200">
                        <span className="font-medium text-stone-900">Second Tour</span>
                        <span className="text-stone-700">10% Discount</span>
                      </div>
                      <div className="flex justify-between items-center text-sm py-2 border-b border-stone-200">
                        <span className="font-medium text-stone-900">Third Tour</span>
                        <span className="text-stone-700">15% Discount</span>
                      </div>
                      <div className="flex justify-between items-center text-sm py-2">
                        <span className="font-medium text-stone-900">Fourth Tour</span>
                        <span className="text-stone-700 font-semibold text-[#fcc000]">Free of Cost</span>
                      </div>
                    </div>
                    <p className="text-sm text-stone-700 mt-4 pt-4 border-t border-stone-200">
                      The more you travel with us, the more you save — making every journey with Hodophile
                      Adventures even more rewarding.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-stone-900 mb-3">Complimentary Travel Kit</h4>
                    <p className="text-stone-700 mb-3">
                      At Hodophile Adventures, we take care of the little details that make your journey
                      comfortable. Our specially designed Travel Kit includes essential items to help you
                      travel with ease, so you can spend more time enjoying your destination and less time
                      worrying about necessities.
                    </p>
                    <p className="text-stone-700">
                      We are proud to be among the first travel companies in Pakistan to introduce this
                      thoughtful service for our travelers.
                    </p>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </section>
    </PageShell>
  );
}