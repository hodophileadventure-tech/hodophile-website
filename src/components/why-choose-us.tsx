"use client";

import { motion, useReducedMotion } from "framer-motion";

type WhyChoosePillar = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageLift: number;
  highlight?: string;
};

const pillars: WhyChoosePillar[] = [
  {
    number: "01",
    eyebrow: "TAILOR-MADE JOURNEYS",
    title: "",
    description:
      "Every itinerary is thoughtfully designed around your interests, travel style, budget, and pace. From adventure and family holidays to luxury escapes and Umrah, every journey is uniquely yours.",
    image: "/images/editorial/tailor-made-journeys.png",
    imageLift: 8,
  },
  {
    number: "02",
    eyebrow: "LOCAL EXPERTISE,\nGLOBAL STANDARDS",
    title: "",
    description:
      "Explore destinations with experienced local guides and trusted travel partners. Enjoy authentic experiences, seamless planning, and professional service at every step.",
    image: "/images/editorial/hodophile_cutout_4.png",
    imageLift: 24,
  },
  {
    number: "03",
    eyebrow: "SEAMLESS TRAVEL\nEXPERIENCE",
    title: "",
    description:
      "We take care of flights, accommodation, visas, transportation, and logistics. Relax and enjoy your journey while we handle every detail from start to finish.",
    image: "/images/editorial/hodophile_cutout_1.png",
    imageLift: 0,
  },
  {
    number: "04",
    eyebrow: "AUTHENTIC &\nMEMORABLE\nEXPERIENCES",
    title: "",
    description:
      "Go beyond sightseeing with carefully curated cultural, adventure, and spiritual journeys. Create meaningful memories through experiences that inspire, connect, and last a lifetime.",
    image: "/images/editorial/hodophile_cutout_3.png",
    imageLift: 18,
  },
  {
    number: "05",
    eyebrow: "TRUSTED SUPPORT,\nANYTIME",
    title: "",
    description:
      "Our dedicated team is available before, during, and after your trip. Count on prompt assistance and reliable guidance whenever you need it.",
    highlight: "24/7 TRAVEL SUPPORT",
    image: "/images/editorial/hodophile_cutout_2.png",
    imageLift: 6,
  },
];

export function WhyChooseUs() {
  const reduceMotion = useReducedMotion();
  const easing = [0.22, 1, 0.36, 1] as const;

  const sectionVariants = {
    hidden: {},
    visible: {
      transition: reduceMotion
        ? { duration: 0 }
        : {
            delayChildren: 0,
            staggerChildren: 0.08,
          },
    },
  };

  const introGroupVariants = {
    hidden: {},
    visible: {
      transition: reduceMotion
        ? { duration: 0 }
        : {
            delayChildren: 0,
            staggerChildren: 0.08,
          },
    },
  };

  const introItemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion ? { duration: 0 } : { duration: 0.6, ease: easing },
    },
  };

  const pillarVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: reduceMotion
        ? { duration: 0 }
        : {
            duration: 0.82,
            ease: easing,
            delay: 0.18 + index * 0.15,
            when: "beforeChildren" as const,
            delayChildren: 0.1,
            staggerChildren: 0.06,
          },
    }),
  };

  const pillarItemVariants = {
    hidden: { opacity: 0, y: 14, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: reduceMotion ? { duration: 0 } : { duration: 0.42, ease: easing },
    },
  };

  const textGroupVariants = {
    hidden: {},
    visible: {
      transition: reduceMotion
        ? { duration: 0 }
        : { delayChildren: 0.05, staggerChildren: 0.06 },
    },
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion ? { duration: 0 } : { duration: 0.38, ease: easing },
    },
  };

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className="relative mt-24 overflow-x-hidden px-4 py-20 sm:px-6 lg:px-8 xl:px-12"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 30%, rgba(252,192,0,0.08), transparent 35%), radial-gradient(circle at 80% 70%, rgba(17,17,17,0.03), transparent 40%)",
      }}
    >
      <div className="mx-auto max-w-[1600px]">
        {/* Section Header */}
        <motion.div
          variants={introGroupVariants}
          className="mb-20 text-center"
        >
          <motion.div variants={introItemVariants} className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-yellow-400" />
            <p className="text-xs uppercase tracking-[0.35em] text-yellow-600 font-bold">
              WHY CHOOSE HODOPHILE
            </p>
            <div className="h-px w-8 bg-yellow-400" />
          </motion.div>
          
          <motion.h2
            variants={introItemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-4 text-stone-950 leading-tight"
          >
            Five Reasons to Travel with Us
          </motion.h2>
          
          <motion.p
            variants={introItemVariants}
            className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed"
          >
            Excellence in every detail, from planning to return home
          </motion.p>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-5">
          {pillars.map((pillar, index) => (
            <motion.article
              key={pillar.number}
              variants={pillarVariants}
              custom={index}
              className="group relative rounded-2xl border border-stone-200/50 bg-white/60 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-yellow-400/40 hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
            >
              {/* Gradient accent on hover */}
              <div className="absolute inset-0 rounded-2xl p-px bg-gradient-to-br from-yellow-400/0 via-transparent to-yellow-400/0 group-hover:from-yellow-400/20 group-hover:to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="relative p-6 lg:p-7 flex flex-col h-full">
                {/* Number Badge */}
                <motion.div
                  variants={pillarItemVariants}
                  className="inline-flex items-center gap-3 mb-6"
                >
                  <span className="text-3xl lg:text-4xl font-serif font-bold text-yellow-400">
                    {pillar.number}
                  </span>
                  <div className="h-0.5 w-8 bg-gradient-to-r from-yellow-400 to-transparent rounded-full" />
                </motion.div>

                {/* Image Section */}
                <div className="mb-6 h-48 lg:h-56 flex items-center justify-center overflow-hidden -mx-6 px-6">
                  <motion.div
                    variants={pillarItemVariants}
                    className="flex justify-center transition duration-300 group-hover:scale-105"
                    style={{ transform: `translateY(${pillar.imageLift}px)` }}
                  >
                    <img
                      src={pillar.image}
                      alt={pillar.eyebrow}
                      className="h-auto max-h-56 w-auto max-w-[90%] object-contain drop-shadow-lg"
                    />
                  </motion.div>
                </div>

                {/* Text Content */}
                <motion.div className="flex-1 flex flex-col" variants={textGroupVariants}>
                  <motion.p
                    variants={textItemVariants}
                    className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-600 leading-tight mb-3"
                  >
                    {pillar.eyebrow.split("\n").map((line, lineIndex) => (
                      <span key={`${pillar.number}-eyebrow-${lineIndex}`} className="block">
                        {line}
                      </span>
                    ))}
                  </motion.p>

                  {pillar.highlight && (
                    <motion.div
                      variants={textItemVariants}
                      className="inline-flex items-center gap-2 mb-3 px-3 py-2 rounded-lg bg-yellow-100/60 border border-yellow-200/50"
                    >
                      <span className="text-xs font-bold text-yellow-700">{pillar.highlight}</span>
                    </motion.div>
                  )}

                  <motion.p
                    variants={textItemVariants}
                    className="text-sm leading-relaxed text-stone-700 flex-1"
                  >
                    {pillar.description}
                  </motion.p>

                  {/* Accent line */}
                  <motion.div
                    variants={textItemVariants}
                    className="mt-4 h-1 w-8 bg-gradient-to-r from-yellow-400 to-transparent rounded-full"
                  />
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-lg text-stone-600 mb-6">
            Ready for an unforgettable journey?
          </p>
          <motion.a
            href="/make-my-trip"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary inline-flex gap-2"
          >
            Start Planning Today
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
