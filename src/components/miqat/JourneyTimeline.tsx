"use client";

import { motion } from "framer-motion";

const steps = [
  { title: "Consultation", detail: "A private discussion to understand your needs and preferences." },
  { title: "Ticket booking", detail: "Flight and ticket coordination to secure preferred schedules and seats." },
  { title: "Visa Processing", detail: "End-to-end documentation and guidance for a smooth approval process." },
  { title: "Hotel Confirmation", detail: "Secure premium hotel stays and confirmations before departure." },
  { title: "Transportation", detail: "Comfortable private transfers and on-ground support throughout your trip." },
  { title: "Departure", detail: "A seamless start with flight coordination and pre-trip support." },
  { title: "Makkah", detail: "Arrive with comfort and begin your sacred rituals with confidence." },
  { title: "Madinah", detail: "Experience calm, premium stays and guided spiritual visits." },
  { title: "Return", detail: "Conclude your journey supported by our attentive post-trip care." },
];

export function JourneyTimeline() {
  return (
    <section className="snap-start min-h-[calc(100vh-var(--site-header-height))] overflow-hidden bg-black px-4 py-4 text-white sm:px-6 lg:px-10 xl:px-14">
      <div className="mx-auto min-h-[calc(100vh-var(--site-header-height))] w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.38em] text-[#FCC000]">Your Journey</p>
          <h2 className="mt-4 font-[var(--font-miqat-heading)] text-4xl text-white sm:text-5xl">
            From Consultation to Return
          </h2>
          <p className="mt-4 text-base leading-8 text-[#B5B5B5] sm:text-lg">
            A clear and elegant path, designed to feel calm, organized and deeply reassuring.
          </p>
        </div>

        <div className="mt-12">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                className="relative"
              >
                <div className="rounded-[1.4rem] border border-white/10 bg-[#0A0A0A]/90 p-6 shadow-[0_12px_35px_rgba(0,0,0,0.24)]">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:gap-6">
                    <div className="flex-shrink-0">
                      <span className="inline-block rounded-md bg-black/60 px-3 py-1 text-sm font-semibold tracking-[0.18em] text-[#FCC000]">{index + 1}</span>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:flex-1">
                      <h3 className="font-[var(--font-miqat-heading)] text-2xl text-white">{step.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-[#B5B5B5]">{step.detail}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
