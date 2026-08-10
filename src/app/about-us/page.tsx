import type { Metadata } from "next";

import { AboutTeamTabDropdown } from "@/components/about-team-tab-dropdown";
import { PageShell } from "@/components/page-shell";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Hodophile Adventures, its leadership, vision, mission, travel rewards program, and commitment to safe and memorable experiences.",
  alternates: {
    canonical: "/about-us",
  },
  openGraph: {
    title: "About Us",
    description:
      "Founded in 2021 in Karachi, Hodophile Adventures is a government-licensed travel company creating memorable journeys across Pakistan and beyond.",
    url: absoluteUrl("/about-us"),
  },
};

export default function AboutUsPage() {
  return (
    <PageShell wide>
      <section className="relative mt-0 mx-auto max-w-full overflow-hidden rounded-[2rem] border-2 border-[#fcc000]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/images/editorial/about-us-hero.jpg)",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />

        <div className="relative z-10 mx-auto max-w-[96rem] px-6 py-20 lg:px-8 lg:py-32 xl:px-10">
          <div className="max-w-3xl">
            <div className="mb-4 inline-block rounded-full border border-[#fcc000]/80 bg-[#fcc000]/20 px-4 py-2 backdrop-blur-sm">
              <span className="text-sm font-semibold uppercase tracking-wide text-[#fcc000]">Our Story</span>
            </div>

            <h1 className="mb-6 font-serif text-5xl font-bold tracking-tight text-white lg:text-6xl">
              Journey With Pakistan&apos;s Most Trusted Travel Partner
            </h1>

            <p className="max-w-2xl text-xl leading-relaxed text-gray-100">
              Travel has the power to broaden perspectives, create lasting memories, and bring people closer to the world around them.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[96rem] rounded-[2rem] border-2 border-[#fcc000] px-6 py-12 lg:px-8 lg:py-16 xl:px-10">
        <div className="flex flex-wrap gap-8 lg:gap-12">
          <div>
            <p className="text-4xl font-bold text-[#fcc000]">2021</p>
            <p className="mt-2 text-lg text-stone-600">Founded</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[#fcc000]">500+</p>
            <p className="mt-2 text-lg text-stone-600">Happy Travelers</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[#fcc000]">50+</p>
            <p className="mt-2 text-lg text-stone-600">Tours Conducted</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[#fcc000]">20+</p>
            <p className="mt-2 text-lg text-stone-600">Destinations Covered</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[#fcc000]">4.9★</p>
            <p className="mt-2 text-lg text-stone-600">Customer Rating</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-[#fcc000]">24/7</p>
            <p className="mt-2 text-lg text-stone-600">Customer Support</p>
          </div>
        </div>
      </section>

      <AboutTeamTabDropdown />

      <section className="mx-auto mt-8 max-w-[96rem] rounded-[2rem] border-2 border-[#fcc000] px-6 pb-12 lg:px-8 xl:px-10">
        <div className="mb-12">
          <div className="mb-4 inline-block rounded-full border border-[#fcc000] bg-[#fcc000]/10 px-4 py-2">
            <span className="text-sm font-semibold uppercase tracking-wide text-[#fcc000]">Learn More</span>
          </div>

          <h2 className="mb-4 font-serif text-4xl font-semibold tracking-tight text-stone-900 lg:text-5xl">
            About Hodophile Adventures
          </h2>
          <p className="max-w-2xl text-lg text-stone-600">
            Discover our story, values, team, and the services that make every journey safe, seamless, and memorable.
          </p>
        </div>

        <div className="space-y-12 rounded-[2rem] border-2 border-[#fcc000]">
          <section className="rounded-[2rem] border-2 border-[#fcc000] bg-white p-8 shadow-[0_30px_60px_-28px_rgba(252,192,0,0.22)]">
            <h3 className="mb-6 font-serif text-3xl font-semibold tracking-tight text-stone-900 lg:text-4xl">
              CEO&apos;s Message
            </h3>
            <div className="space-y-4 text-stone-700">
              <p>
                Welcome to <span className="font-semibold text-stone-900">Hodophile Adventures</span>.
              </p>
              <p>
                Travel has the power to broaden perspectives, create lasting memories, and bring people closer to the world around them. At Hodophile Adventures, we are committed to making every journey safe, seamless, and truly memorable through exceptional service, meticulous planning, and an unwavering focus on customer satisfaction.
              </p>
              <p>
                As a government-licensed travel company, we proudly offer domestic and international tours, corporate travel solutions, customized holiday packages, and Umrah services, ensuring every journey is thoughtfully planned and executed with excellence.
              </p>
              <p>
                Our vision is to become a globally recognized travel brand, known for professionalism, innovation, and service excellence. We continuously strive to enhance every aspect of our offerings by embracing new destinations, strengthening strategic partnerships, and delivering experiences that exceed our customers&apos; expectations.
              </p>
              <p>
                At Hodophile Adventures, we believe that every journey is unique. Whether you are seeking adventure, relaxation, cultural exploration, business travel, or a spiritual pilgrimage, our dedicated team is committed to creating experiences that leave a lasting impression.
              </p>
              <p>
                Thank you for placing your trust in us. We look forward to being a part of your next unforgettable journey.
              </p>
              <div className="border-t border-stone-200 pt-4">
                <p className="font-semibold text-stone-900">Sana Masood</p>
                <p className="text-stone-700">Chief Executive Officer</p>
                <p className="text-stone-700">Hodophile Adventures</p>
              </div>
            </div>
          </section>

          <section className="grid gap-8 rounded-[2rem] border-2 border-[#fcc000] lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[2rem] border border-[#fcc000]/20 bg-white p-8 shadow-[0_30px_60px_-28px_rgba(252,192,0,0.22)]">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fcc000]/20 text-2xl">🧭</div>
                <h3 className="font-serif text-3xl font-semibold tracking-tight text-stone-900 lg:text-4xl">
                  About Us
                </h3>
              </div>
              <div className="space-y-4 text-stone-700">
                <p>
                  Founded in 2021 in Karachi, Hodophile Adventures is a government-licensed travel company dedicated to creating exceptional travel experiences across Pakistan. Built on a passion for exploration and customer satisfaction, we specialize in delivering safe, well-organized, and memorable journeys.
                </p>
                <p>
                  From transportation and accommodation to itinerary planning and on-ground support, we manage every aspect of your trip so you can travel with complete peace of mind. Whether you are traveling solo, with family, on your honeymoon, as part of a corporate group, or with friends, our experienced team provides personalized solutions tailored to your needs.
                </p>
                <p>
                  Driven by professionalism, transparency, and 24/7 customer support, Hodophile Adventures has earned the trust of travelers seeking reliable and affordable travel experiences.
                </p>
                <p className="italic text-stone-600">Take memories, leave footprints.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-[#fcc000]/20 bg-[#fff8e3] p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fcc000]/20 text-xl">👁️</div>
                  <h4 className="font-semibold text-stone-900">Vision</h4>
                </div>
                <p className="text-stone-700">
                  To become a globally recognized travel brand, trusted for delivering exceptional, affordable, and sustainable travel experiences that inspire unforgettable journeys.
                </p>
              </div>
              <div className="rounded-[2rem] border border-[#fcc000]/20 bg-[#fff8e3] p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fcc000]/20 text-xl">🎯</div>
                  <h4 className="font-semibold text-stone-900">Mission</h4>
                </div>
                <p className="text-stone-700">
                  To create unforgettable travel experiences by delivering exceptional service, personalized journeys, and seamless travel solutions while building lasting relationships with every traveler.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border-2 border-[#fcc000] bg-white p-8 shadow-[0_30px_60px_-28px_rgba(252,192,0,0.22)]">
            <div className="mb-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#b76d00]">Local Expertise</p>
                <h3 className="font-serif text-3xl font-semibold tracking-tight text-stone-900 lg:text-4xl">
                  Global Standards
                </h3>
                <ul className="mt-6 space-y-4 text-stone-700">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#fcc000] text-xs font-bold text-stone-900">✓</span>
                    <span>Ground-level destination knowledge across Pakistan, from mountain routes to cultural hotspots.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#fcc000] text-xs font-bold text-stone-900">✓</span>
                    <span>Professional planning and responsive support built around traveler comfort and safety.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#fcc000] text-xs font-bold text-stone-900">✓</span>
                    <span>Transparent itineraries, trusted logistics, and premium service standards from start to finish.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#fcc000] text-xs font-bold text-stone-900">✓</span>
                    <span>Personalized experiences tailored to your pace, preferences, and travel goals.</span>
                  </li>
                </ul>
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-[#fcc000]/30 bg-[#fff8e3] p-3 shadow-[0_22px_50px_-28px_rgba(252,192,0,0.28)]">
                <img
                  src="/images/editorial/local-expertise-global-standards.png"
                  alt="Local expertise with global standards"
                  className="h-full w-full rounded-[1.5rem] object-cover"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-3xl border border-stone-200 bg-[#fff8e3] p-6">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fcc000]/20 text-xl">🧳</div>
                  <h4 className="font-semibold text-stone-900">Personalized Travel Experiences</h4>
                </div>
                <p className="text-stone-700">
                  Every traveler is unique, and so is every journey. We design customized, hassle-free travel experiences tailored to your preferences, ensuring exceptional value, comfort, and unforgettable memories.
                </p>
              </div>
              <div className="rounded-3xl border border-stone-200 bg-[#fff8e3] p-6">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fcc000]/20 text-xl">🏔️</div>
                  <h4 className="font-semibold text-stone-900">Explore Pakistan Like Never Before</h4>
                </div>
                <p className="text-stone-700">
                  From the majestic mountains of Hunza, Skardu, and Naran to the pristine beaches of Balochistan, we offer carefully curated tours, camping adventures, cultural experiences, and hidden gems that showcase the true beauty of Pakistan.
                </p>
              </div>
              <div className="rounded-3xl border border-stone-200 bg-[#fff8e3] p-6">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fcc000]/20 text-xl">💰</div>
                  <h4 className="font-semibold text-stone-900">Transparent Pricing</h4>
                </div>
                <p className="text-stone-700">
                  Enjoy competitive and transparent pricing with no hidden charges. Every inclusion and cost is clearly communicated before you book, ensuring complete peace of mind.
                </p>
              </div>
              <div className="rounded-3xl border border-stone-200 bg-[#fff8e3] p-6">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fcc000]/20 text-xl">🌿</div>
                  <h4 className="font-semibold text-stone-900">Sustainable Tourism</h4>
                </div>
                <p className="text-stone-700">
                  We are committed to responsible travel by supporting local communities, preserving cultural heritage, protecting the environment, and promoting sustainable tourism practices for future generations.
                </p>
              </div>
              <div className="rounded-3xl border border-stone-200 bg-[#fff8e3] p-6">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fcc000]/20 text-xl">📝</div>
                  <h4 className="font-semibold text-stone-900">Attention to Detail</h4>
                </div>
                <p className="text-stone-700">
                  From meticulously planned itineraries and comfortable accommodations to weather monitoring and timely logistics, every aspect of your journey is managed with precision and care.
                </p>
              </div>
              <div className="rounded-3xl border border-stone-200 bg-[#fff8e3] p-6">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fcc000]/20 text-xl">🗣️</div>
                  <h4 className="font-semibold text-stone-900">Professional Tour Guides</h4>
                </div>
                <p className="text-stone-700">
                  Our experienced bilingual tour guides combine local expertise, historical knowledge, and professional hospitality to make every trip informative, safe, and enjoyable.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border-2 border-[#fcc000] bg-white p-8 shadow-[0_30px_60px_-28px_rgba(252,192,0,0.22)]">
            <h3 className="mb-6 font-serif text-3xl font-semibold tracking-tight text-stone-900 lg:text-4xl">
              What Makes Us Unique
            </h3>
            <div className="space-y-8 text-stone-700">
              <p>
                We believe travel should become more rewarding every time you explore with us. It should create lifelong memories and meaningful experiences. We go beyond ordinary travel by focusing on exceptional customer service, innovation, value, and long-term relationships with our travelers.
              </p>

              <div className="rounded-3xl border border-stone-200 bg-[#fff8e3] p-6">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fcc000]/20 text-xl">🎁</div>
                  <h4 className="font-semibold text-stone-900">Pakistan&apos;s First Travel Rewards Program</h4>
                </div>
                <p className="mb-3">
                  We are proud to introduce Pakistan&apos;s first-ever Travel Rewards Program, designed to reward our valued travelers for choosing Hodophile Adventures.
                </p>
                <p>
                  After completing your first tour, you become eligible for exclusive benefits, exciting gifts, and special discounts on future adventures. The more you travel with us, the more rewards you unlock—making every journey more memorable and rewarding.
                </p>
              </div>

              <div className="rounded-3xl border border-stone-200 bg-[#fff8e3] p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fcc000]/20 text-xl">🏷️</div>
                  <h5 className="font-semibold text-stone-900">Exclusive Loyalty Rewards</h5>
                </div>
                <p className="mb-4 text-stone-700">
                  At Hodophile Adventures, we value our returning travelers. Our Travel Rewards Program recognizes your continued trust by offering exclusive discounts and benefits on every adventure.
                </p>
                <div className="space-y-2 text-sm text-stone-700">
                  <div className="flex items-center justify-between border-b border-stone-200 py-2">
                    <span className="font-medium text-stone-900">First Tour</span>
                    <span>Standard Price</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-stone-200 py-2">
                    <span className="font-medium text-stone-900">Second Tour</span>
                    <span>10% Discount</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-stone-200 py-2">
                    <span className="font-medium text-stone-900">Third Tour</span>
                    <span>15% Discount</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="font-medium text-stone-900">Fourth Tour</span>
                    <span className="font-semibold text-[#fcc000]">Complimentary Tour*</span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-stone-600">*Terms & Conditions Apply.</p>
              </div>

              <div className="rounded-3xl border border-stone-200 bg-[#fff8e3] p-6">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fcc000]/20 text-xl">🧰</div>
                  <h4 className="font-semibold text-stone-900">Complimentary Travel Kit</h4>
                </div>
                <p>
                  At Hodophile Adventures, we believe it&apos;s the little details that make every journey special. Our complimentary Travel Kit includes thoughtfully selected essentials to enhance your comfort and convenience throughout your trip.
                </p>
                <p className="mt-3">
                  We are proud to be one of the few travel companies in Pakistan offering this value-added service, ensuring our travelers enjoy a hassle-free and memorable experience from the very beginning of their journey.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border-2 border-[#fcc000] bg-[#fff8e3] p-8 shadow-[0_30px_60px_-28px_rgba(252,192,0,0.55)]">
            <h3 className="mb-6 font-serif text-3xl font-semibold tracking-tight text-stone-900 lg:text-4xl">
              Our Promise
            </h3>
            <p className="max-w-3xl text-stone-700">
              At Hodophile Adventures, your safety, comfort, and satisfaction are at the heart of everything we do. We are committed to delivering transparent pricing, reliable service, professional tour management, and unforgettable travel experiences.
            </p>
            <p className="mt-4 max-w-3xl text-stone-700">
              Whether you&apos;re planning a family vacation, a corporate retreat, a honeymoon, or an adventurous getaway, our goal is to exceed your expectations and create memories that last a lifetime.
            </p>
            <p className="mt-6 text-xl font-semibold text-stone-900">Travel with confidence. Travel with Hodophile Adventures.</p>
          </section>
        </div>
      </section>
    </PageShell>
  );
}
