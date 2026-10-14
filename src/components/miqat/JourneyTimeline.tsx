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
    <section className="overflow-hidden bg-[var(--surface-page)] px-4 py-12 text-stone-950 sm:px-6 sm:py-16 lg:px-10 lg:py-20 xl:px-14">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.38em] text-[#806700]">Your Journey</p>
          <h2 className="mt-4 font-[var(--font-display)] text-4xl text-stone-950 sm:text-5xl">
            From Consultation to Return
          </h2>
          <p className="mt-4 text-base leading-8 text-stone-600 sm:text-lg">
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
                <div className="rounded-[1.25rem] border border-stone-200 bg-white p-6 shadow-[0_12px_30px_rgba(25,22,16,0.06)]">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:gap-6">
                    <div className="flex-shrink-0">
                      <span className="inline-block rounded-md bg-[#FCC000]/15 px-3 py-1 text-sm font-semibold tracking-[0.18em] text-[#806700]">{index + 1}</span>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:flex-1">
                      <h3 className="font-[var(--font-display)] text-2xl text-stone-950">{step.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-stone-600">{step.detail}</p>
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
