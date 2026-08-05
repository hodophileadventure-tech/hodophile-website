"use client";

import { useState } from 'react';
import DestinationCard from './DestinationCard';
import { motion } from 'framer-motion';
import {
  premiumTabs,
  premiumDestinations,
  readyToBookDestinations,
  exclusiveOffers,
} from '@/lib/data/premiumDestinations';

export default function DestinationSection() {
  const [active, setActive] = useState(premiumTabs[0].id);

  const heading = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const tabsVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const cardsContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };

  return (
    <section className="mx-auto max-w-[96rem] px-4 py-16">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }}>
        <motion.h2 variants={heading} className="text-center text-4xl md:text-5xl font-semibold text-[#111111]">
          Where Will Your Next Adventure Begin?
        </motion.h2>
        <motion.p variants={heading} className="mt-3 text-center text-sm text-stone-600">
          Explore Pakistan's most breathtaking destinations and exclusive journeys crafted by Hodophile.
        </motion.p>

        <motion.div variants={tabsVariants} className="mt-8 flex items-center justify-center">
          <div className="relative rounded-[14px] bg-white/60 backdrop-blur-md px-3 py-2 shadow-[0_6px_20px_rgba(2,6,23,0.04)]">
            <div role="tablist" aria-label="Premium destination tabs" className="flex gap-3 overflow-x-auto no-scrollbar">
              {premiumTabs.map((t) => {
                const activeTab = active === t.id;
                return (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={activeTab}
                    aria-controls={`panel-${t.id}`}
                    onClick={() => setActive(t.id)}
                    className={`relative px-4 py-2 text-sm font-semibold transition-colors focus:outline-none ${
                      activeTab ? 'text-[#FCC000]' : 'text-[#111111] hover:text-[#b77f00]'
                    }`}
                  >
                    <span>{t.label}</span>
                    {activeTab ? (
                      <motion.span layoutId="tab-underline" className="absolute left-2 right-2 -bottom-2 h-1 rounded-full bg-[#FCC000] shadow-[0_6px_12px_rgba(252,192,0,0.12)]" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        <motion.div variants={cardsContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {(
            active === 'ready'
              ? readyToBookDestinations
              : active === 'offers'
              ? exclusiveOffers
              : premiumDestinations
          ).map((d) => (
            <motion.div key={d.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <DestinationCard item={d} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
