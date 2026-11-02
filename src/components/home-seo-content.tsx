import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";

const travelServices = [
  {
    icon: "🧭",
    title: "Travel Planning Services in Pakistan",
    description: "Personalized itineraries shaped around your interests, travel dates, and budget.",
  },
  {
    icon: "🚙",
    title: "Private Tours in Pakistan",
    description: "Private transport and flexible stops for a more personal journey.",
  },
  {
    icon: "✨",
    title: "Customized Tours in Pakistan",
    description: "Tailor-made routes with room to adjust the pace and places you visit.",
  },
  {
    icon: "🇵🇰",
    title: "Domestic Tours in Pakistan",
    description: "Weekend escapes and longer journeys across Pakistan's regions.",
  },
  {
    icon: "🏔️",
    title: "Adventure Tours in Pakistan",
    description: "Outdoor routes, jeep safaris, and mountain experiences planned with local context.",
  },
  {
    icon: "🗺️",
    title: "Guided Tours in Pakistan",
    description: "Local insight and practical support throughout your itinerary.",
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Family Travel Services",
    description: "Comfortable schedules and route planning for families traveling together.",
  },
  {
    icon: "👥",
    title: "Group Tours in Pakistan",
    description: "Travel coordination for friends, clubs, and organized groups.",
  },
  {
    icon: "🏢",
    title: "Corporate Travel Services",
    description: "Itinerary planning for team outings, retreats, and business travel.",
  },
  {
    icon: "🌍",
    title: "International Travel Services",
    description: "Travel-planning assistance for select international trips.",
  },
  {
    icon: "🌙",
    title: "Umrah Travel Services",
    description: "Pilgrimage planning and support through MIQAT by Hodophile.",
  },
  {
    icon: "🛎️",
    title: "Hotel Booking Assistance",
    description: "Help coordinating stays and transport to fit your route.",
  },
];

const faqs = [
  {
    question: "Which is the best affordable tour company in Pakistan?",
    answer:
      "Hodophile plans private, guided, family, and adventure journeys across Pakistan. Request a quote to compare the route, inclusions, and costs for your dates.",
  },
  {
    question: "How do I choose a trusted tour operator in Pakistan?",
    answer:
      "Compare clear written quotes, confirmed inclusions, recent guest feedback, route experience, and how the team communicates before and during a trip.",
  },
  {
    question: "Can I book a private tour in Pakistan?",
    answer:
      "Yes. Ask us about private transport, flexible stops, accommodation, and an itinerary suited to your group and travel dates.",
  },
  {
    question: "Is Pakistan safe for tourists?",
    answer:
      "Conditions vary by destination and date. Check current official travel advisories and weather updates, and confirm local route conditions before setting out.",
  },
  {
    question: "Do you offer family and couple tour packages?",
    answer:
      "Yes. We can help plan family and couple trips with suitable routes, stays, transport, and a pace that fits your group.",
  },
  {
    question: "Do you help foreign tourists visit Pakistan?",
    answer:
      "We can discuss itinerary planning, local transport, accommodation, and cultural guidance. Travelers should confirm visa and entry requirements through official sources.",
  },
  {
    question: "Do you provide tours from Karachi?",
    answer:
      "We can help plan private and group journeys from Karachi to destinations across Pakistan. Contact us to discuss transport and dates.",
  },
  {
    question: "How can I book a tour with Hodophile?",
    answer:
      "Share your destination, travel month, and group size using the trip-plan form, or contact our team for an itinerary and quote.",
  },
];

export function HomeSeoSections() {
  return (
    <>
      <section className="site-section-gap w-full bg-[#f7f3ea] px-6 py-12 lg:px-10 lg:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow text-stone-600">Why travelers choose us</p>
            <h2 className="display-serif mt-4 text-4xl leading-tight text-stone-950 sm:text-5xl">
              Best Tour Operator in Pakistan You Can Trust
            </h2>
            <p className="mt-5 text-base leading-8 text-stone-700">
              Choosing a tour operator is about more than the starting price. Route planning, clear communication, suitable stays, and transport that fits the journey all matter. We learn about your travel dates, group, and interests before suggesting an itinerary.
            </p>
            <p className="mt-4 text-base leading-8 text-stone-700">
              Explore our <Link href="/about-us" className="font-semibold text-[#806000] underline underline-offset-4">approach to travel planning</Link>, or share your plans and ask for a quote.
            </p>
            <Link href="/make-my-trip" className="site-button-primary mt-7 inline-flex !text-black">
              Get a free trip plan
            </Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              ["🧭", "Local route knowledge"],
              ["🛡️", "Safety-conscious planning"],
              ["✦", "Clear itinerary details"],
              ["💛", "Pricing shared before booking"],
            ].map(([icon, item]) => (
              <li key={item} className="group relative overflow-hidden rounded-[1.4rem] border border-[#d6c89f]/70 bg-white p-5 shadow-[0_12px_36px_rgba(54,44,18,0.06)] transition duration-500 hover:-translate-y-1 hover:border-[#c39a21] hover:shadow-[0_20px_44px_rgba(54,44,18,0.12)]">
                <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fcc000]/15 text-2xl transition duration-500 group-hover:rotate-[-6deg] group-hover:bg-[#fcc000]/25" aria-hidden="true">{icon}</span>
                <span className="block text-sm font-semibold text-stone-800">{item}</span>
                <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#fcc000]/10 blur-2xl transition duration-500 group-hover:bg-[#fcc000]/25" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="services" className="site-section-gap w-full scroll-mt-24 px-6 py-12 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow text-stone-600">What we do</p>
          <h2 className="display-serif mt-4 max-w-3xl text-4xl leading-tight text-stone-950 sm:text-5xl">
            Pakistan Tours and Travel Services We Offer
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-stone-600">
            From choosing a route to coordinating the details, our travel services help make planning a Pakistan journey more straightforward.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {travelServices.map((service) => (
              <article key={service.title} className="group relative isolate overflow-hidden rounded-[1.4rem] border border-stone-200/80 bg-white p-6 shadow-[0_12px_36px_rgba(54,44,18,0.05)] transition duration-500 hover:-translate-y-1.5 hover:border-[#c39a21]/70 hover:shadow-[0_22px_48px_rgba(54,44,18,0.12)]">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#e7d8ad] bg-gradient-to-br from-[#fff9e8] to-[#f8edcb] text-2xl shadow-sm transition duration-500 group-hover:scale-105 group-hover:rotate-[-4deg]" aria-hidden="true">{service.icon}</span>
                <h3 className="mt-5 font-[var(--font-display)] text-xl leading-tight text-stone-950">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-600">{service.description}</p>
                <span className="pointer-events-none absolute -bottom-12 -right-8 -z-10 h-32 w-32 rounded-full bg-[#fcc000]/10 blur-2xl transition duration-500 group-hover:bg-[#fcc000]/20" aria-hidden="true" />
              </article>
            ))}
          </div>
          <div className="relative mt-7 flex flex-wrap items-center justify-between gap-5 overflow-hidden rounded-[1.5rem] border border-[#fcc000]/20 bg-[radial-gradient(circle_at_95%_0%,rgba(252,192,0,0.2),transparent_35%),linear-gradient(135deg,#171717,#262218)] p-6 text-white shadow-[0_20px_50px_rgba(0,0,0,0.16)] sm:p-8">
            <div className="relative z-10 flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#fcc000]/15 text-2xl" aria-hidden="true">💬</span>
              <p className="max-w-2xl text-sm leading-7 text-white/75">Not sure which option fits? Tell us what you have in mind and we can discuss the next steps.</p>
            </div>
            <Link href="/contact-us" className="site-button-primary relative z-10 !text-black">Talk to a travel expert <span className="ml-2" aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="site-section-gap w-full border-y border-stone-200 bg-[#fbfaf7] px-6 py-12 lg:px-10 lg:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          <article className="group rounded-[1.5rem] border border-stone-200/80 bg-white p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] transition duration-500 hover:-translate-y-1.5 hover:border-[#c39a21]/70 hover:shadow-[0_22px_48px_rgba(54,44,18,0.12)] sm:p-7">
            <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fcc000]/15 text-2xl transition duration-500 group-hover:rotate-[-5deg]" aria-hidden="true">🧳</span>
            <p className="eyebrow text-stone-500">Flexible travel</p>
            <h2 className="display-serif mt-4 text-3xl leading-tight text-stone-950">Tour Operator in Pakistan for Every Type of Traveler</h2>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              Choose a private departure, a group journey, or a more tailored itinerary. We plan around the travel style, pace, and practical needs you share with us.
            </p>
          </article>
          <article className="group rounded-[1.5rem] border border-stone-200/80 bg-white p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] transition duration-500 hover:-translate-y-1.5 hover:border-[#c39a21]/70 hover:shadow-[0_22px_48px_rgba(54,44,18,0.12)] sm:p-7">
            <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fcc000]/15 text-2xl transition duration-500 group-hover:rotate-[-5deg]" aria-hidden="true">✍️</span>
            <p className="eyebrow text-stone-500">Made for your route</p>
            <h2 className="display-serif mt-4 text-3xl leading-tight text-stone-950">Best Travel Company in Pakistan for Customized Tours</h2>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              A customized trip can include your preferred destinations, dates, accommodation, and stops. We help shape the route and explain what can fit within your time and budget.
            </p>
          </article>
          <article className="group rounded-[1.5rem] border border-stone-200/80 bg-white p-6 shadow-[0_14px_38px_rgba(54,44,18,0.06)] transition duration-500 hover:-translate-y-1.5 hover:border-[#c39a21]/70 hover:shadow-[0_22px_48px_rgba(54,44,18,0.12)] sm:p-7">
            <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fcc000]/15 text-2xl transition duration-500 group-hover:rotate-[-5deg]" aria-hidden="true">🚘</span>
            <p className="eyebrow text-stone-500">Your own pace</p>
            <h2 className="display-serif mt-4 text-3xl leading-tight text-stone-950">Private Tour Operator in Pakistan</h2>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              A private itinerary gives your group more flexibility to plan breaks and sightseeing. Mountain routes and activities are always subject to local conditions and availability.
            </p>
          </article>
        </div>
      </section>

      <section className="site-section-gap w-full px-6 py-12 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow text-stone-600">Destinations and experiences</p>
          <h2 className="display-serif mt-4 max-w-3xl text-4xl leading-tight text-stone-950 sm:text-5xl">
            Pakistan Tourism Company with Strong Local Expertise
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-stone-600">
            Plan a journey through Pakistan&apos;s mountain regions, historic cities, and scenic valleys, with route details matched to the time you have.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["🏔️", "Mountain Travel Experiences", "Karakoram scenery, Fairy Meadows, and the Deosai Plains."],
              ["🏛️", "Heritage Tours in Pakistan", "Historic places including Lahore Fort, Badshahi Mosque, Taxila, and Mohenjo-daro."],
              ["🎨", "Cultural Tours in Pakistan", "Regional food, music, craft traditions, and local history."],
              ["🌄", "Scenic Tours in Pakistan", "Swat Valley, Neelum Valley, and Naran Kaghan."],
              ["🥾", "Adventure Tourism in Pakistan", "Trekking, lake camps, and high-altitude drives, planned around conditions."],
              ["✨", "Journeys shaped around you", "Choose the places and experiences that match your interests and travel pace."],
            ].map(([icon, title, description]) => (
              <article key={title} className="group relative overflow-hidden rounded-[1.4rem] border border-stone-200/80 bg-white p-6 shadow-[0_12px_36px_rgba(54,44,18,0.05)] transition duration-500 hover:-translate-y-1 hover:border-[#c39a21]/70 hover:shadow-[0_20px_44px_rgba(54,44,18,0.11)]">
                <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fcc000]/15 text-2xl transition duration-500 group-hover:scale-105 group-hover:rotate-[-4deg]" aria-hidden="true">{icon}</span>
                <h3 className="font-[var(--font-display)] text-xl text-stone-950">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-600">{description}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 max-w-4xl text-sm leading-7 text-stone-600">
            Explore <Link href="/destinations" className="font-semibold text-[#806000] underline underline-offset-4">popular Pakistan destinations</Link> and compare routes before deciding where to go.
          </p>
        </div>
      </section>

      <section className="site-section-gap w-full bg-[#f7f3ea] px-6 py-12 lg:px-10 lg:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <article className="group relative overflow-hidden rounded-[1.75rem] border border-[#d7c58d]/60 bg-white p-7 shadow-[0_20px_60px_rgba(54,44,18,0.08)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(54,44,18,0.13)] sm:p-9">
            <span className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fcc000]/15 text-2xl" aria-hidden="true">💛</span>
            <p className="eyebrow text-stone-600">Fair value</p>
            <h2 className="display-serif mt-4 text-3xl leading-tight text-stone-950 sm:text-4xl">
              Affordable Tour Operator in Pakistan with Honest Pricing
            </h2>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              A useful quote makes the route and inclusions easy to understand. We can discuss transport, stays, guide arrangements, and possible upgrades before you decide.
            </p>
            <Link href="/make-my-trip" className="site-button-primary mt-6 inline-flex !text-black">Get an exact quote</Link>
          </article>
          <article className="group relative overflow-hidden rounded-[1.75rem] border border-[#d7c58d]/60 bg-white p-7 shadow-[0_20px_60px_rgba(54,44,18,0.08)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(54,44,18,0.13)] sm:p-9">
            <span className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fcc000]/15 text-2xl" aria-hidden="true">🗺️</span>
            <p className="eyebrow text-stone-600">Guided journeys</p>
            <h2 className="display-serif mt-4 text-3xl leading-tight text-stone-950 sm:text-4xl">
              Best Guided Tours in Pakistan for Families, Couples, and Groups
            </h2>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              Ask about guided trips, family itineraries, couple getaways, and small-group travel. We can also discuss local transport and cultural guidance for visitors planning a trip to Pakistan.
            </p>
            <Link href="/tours" className="mt-6 inline-flex min-h-11 items-center font-semibold text-stone-900 underline decoration-[#fcc000] underline-offset-4">Explore guided tours</Link>
          </article>
        </div>
      </section>

      <section className="site-section-gap w-full px-6 py-12 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow text-stone-600">Simple and clear</p>
          <h2 className="display-serif mt-4 text-4xl leading-tight text-stone-950 sm:text-5xl">How Our Travel Planning Process Works</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-stone-600">Our travel planning starts with your goals and moves step by step toward a practical itinerary.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Tell us your plan", "Share your destination, dates, budget, and interests."],
              ["Get your itinerary", "We suggest a route and outline the travel arrangements."],
              ["Confirm the details", "Review the itinerary, inclusions, and quote before booking."],
              ["Enjoy your journey", "Travel with the confirmed plan and contact details for support."],
            ].map(([title, description], index) => (
              <article key={title} className="group rounded-[1.4rem] border border-stone-200/80 bg-white p-5 shadow-[0_12px_32px_rgba(54,44,18,0.05)] transition duration-500 hover:-translate-y-1 hover:border-[#c39a21]/60 hover:shadow-[0_18px_42px_rgba(54,44,18,0.1)]">
                <p className="text-sm font-bold tracking-[0.18em] text-[#8b6b00]">0{index + 1}</p>
                <span className="mt-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#fcc000]/15 text-lg" aria-hidden="true">{["📝", "🧭", "🤝", "🌄"][index]}</span>
                <h3 className="mt-4 font-[var(--font-display)] text-xl text-stone-950">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function HomeKarachiSection() {
  return (
    <section id="karachi" className="site-section-gap w-full scroll-mt-24 bg-[radial-gradient(circle_at_92%_10%,rgba(252,192,0,0.2),transparent_32%),linear-gradient(135deg,#111111,#242016)] px-6 py-12 text-white lg:px-10 lg:py-16">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="eyebrow text-[#fcc000]">Karachi departures</p>
          <h2 className="display-serif mt-4 max-w-3xl text-4xl leading-tight sm:text-5xl">Best Tour Operator in Karachi</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/75">
            Planning a trip from Karachi? We can help coordinate private and group journeys to Hunza, Skardu, Swat, Murree, and other destinations across Pakistan. Ask about your route, transport, and airport transfers when requesting a quote.
          </p>
        </div>
        <Link href="/make-my-trip" className="site-button-primary !text-black">Plan a trip from Karachi <span className="ml-2" aria-hidden="true">↗</span></Link>
      </div>
    </section>
  );
}

export function HomeFaqSection() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />
      <section id="faq" className="site-section-gap w-full scroll-mt-24 bg-[#fbfaf7] px-6 py-12 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow text-stone-600">Quick answers</p>
          <h2 className="display-serif mt-4 text-4xl text-stone-950 sm:text-5xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-sm leading-7 text-stone-600">
            Need help choosing a route? <Link href="/contact-us" className="font-semibold text-[#806000] underline underline-offset-4">Contact our team</Link> to discuss your plans.
          </p>
          <div className="mt-8 divide-y divide-stone-200 border-y border-stone-200">
            {faqs.map((faq) => (
              <article key={faq.question} className="group relative overflow-hidden rounded-[1.25rem] border border-stone-200/80 bg-white p-5 shadow-[0_10px_30px_rgba(54,44,18,0.04)] transition duration-500 hover:-translate-y-0.5 hover:border-[#c39a21]/60 hover:shadow-[0_16px_38px_rgba(54,44,18,0.09)] sm:p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fcc000]/15 text-lg font-semibold text-[#745800]" aria-hidden="true">?</span>
                  <div>
                    <h3 className="font-[var(--font-display)] text-xl text-stone-950">{faq.question}</h3>
                    <p className="mt-2 text-sm leading-7 text-stone-600">{faq.answer}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
