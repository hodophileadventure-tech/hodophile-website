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
      className="relative mt-[6rem] overflow-x-hidden bg-[#F7F6F2] px-4 py-8 sm:px-6 lg:flex lg:min-h-[calc(100svh-7rem)] lg:flex-col lg:justify-center lg:px-8 lg:py-6 xl:px-12"
      style={{
        backgroundImage:
          "radial-gradient(circle at top left, rgba(252,192,0,0.05), transparent 28%), radial-gradient(circle at bottom right, rgba(17,17,17,0.02), transparent 30%)",
      }}
    >
      <div className="mx-auto max-w-[1520px]">
        <motion.div
          variants={introItemVariants}
          className="mb-2 flex justify-center py-2"
        >
          <h2 className="italic text-[3.2rem] leading-tight tracking-[-0.06em] text-[#FCC000] md:text-[3.9rem] lg:text-[4.4rem]" style={{ fontFamily: "'Great Vibes', 'Brush Script MT', cursive" }}>
            Why Hodophile
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-0 border-y border-[#D8D6D0] md:grid-cols-2 xl:grid-cols-5">
          {pillars.map((pillar, index) => (
            <motion.article
              key={pillar.number}
              variants={pillarVariants}
              custom={index}
              className="group relative flex min-h-[10rem] flex-col justify-start px-2 py-2 transition-[transform] duration-300 md:px-3 md:py-3 xl:min-h-[12rem] xl:border-l xl:px-4 xl:py-3 first:border-l-0 xl:first:pl-0"
            >
              <div className="flex items-center gap-3">
                <motion.span
                  variants={pillarItemVariants}
                  className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#FCC000] md:text-[0.75rem]"
                >
                  {pillar.number}
                </motion.span>
                <span className="h-px w-11 bg-[#D8D6D0] transition-all duration-300 group-hover:w-12 group-hover:bg-[#FCC000]" />
              </div>

              <div className="mt-1 flex min-h-[110px] items-end justify-center overflow-visible md:min-h-[120px] xl:min-h-[135px]">
                <motion.div
                  variants={pillarItemVariants}
                  className="flex justify-center"
                  style={{ transform: `translateY(${pillar.imageLift}px)` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pillar.image}
                    alt={pillar.eyebrow}
                    className="h-auto max-h-[135px] w-auto max-w-[82%] object-contain transition duration-300 group-hover:scale-[1.02] md:max-h-[150px] xl:max-h-[165px]"
                  />
                </motion.div>
              </div>

              <motion.div className="mt-2 border-t border-[#D8D6D0] pt-2" variants={textGroupVariants}>
                <motion.p
                  variants={textItemVariants}
                  className="text-[0.71rem] font-serif font-bold uppercase tracking-[0.15em] text-[#FCC000] leading-[0.25] text-center sm:text-[0.76rem] md:text-[0.88rem] xl:text-[0.94rem]"
                >
                  {pillar.eyebrow.split("\n").map((line, lineIndex) => (
                    <span key={`${pillar.number}-eyebrow-${lineIndex}`} className="block">
                      {line}
                    </span>
                  ))}
                </motion.p>

                <motion.h3
                  variants={textItemVariants}
                  className="mt-2 font-serif text-[1rem] leading-[1.03] tracking-[-0.04em] text-[#111111] text-center md:text-[1.08rem] xl:text-[1.18rem]"
                >
                  {pillar.title.split("\n").map((line, lineIndex) => (
                    <span key={`${pillar.number}-title-${lineIndex}`} className="block">
                      {line}
                    </span>
                  ))}
                </motion.h3>

                <motion.p
                  variants={textItemVariants}
                  className="mt-2 text-[0.78rem] leading-5 text-[#555555] text-center md:text-[0.82rem]"
                >
                  {pillar.description}
                </motion.p>
                <span className="mt-3 block h-px w-6 bg-transparent transition-all duration-300 group-hover:w-10 group-hover:bg-[#FCC000]" />
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
