"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type StatItem = {
  value: number;
  suffix: string;
  label: string;
};

const statItems: StatItem[] = [
  { value: 25, suffix: "+", label: "Successful Groups" },
  { value: 1000, suffix: "+", label: "Pilgrims Served" },
  { value: 24, suffix: "/7", label: "Customer Support" },
  { value: 5, suffix: "★", label: "Service Rating" },
];

function Counter({ value, suffix }: Pick<StatItem, "value" | "suffix">) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.85 });
  const shouldReduceMotion = useReducedMotion();
  const base = useMotionValue(0);
  const smooth = useSpring(base, { stiffness: 90, damping: 24 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) {
      return;
    }

    const controls = animate(base, value, {
      duration: shouldReduceMotion ? 0 : 1.5,
      ease: [0.16, 1, 0.3, 1],
    });
    const unsubscribe = smooth.on("change", (latest) => {
      setDisplay(Math.round(latest));
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [base, inView, shouldReduceMotion, smooth, value]);

  return (
    <span ref={ref} className="text-5xl font-semibold leading-none tracking-[-0.02em] text-[#FDFBF7] sm:text-6xl">
      {display}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="rounded-[2rem] bg-[#0F5132] px-6 py-14 sm:px-10" aria-label="MIQAT statistics">
      <div className="mx-auto grid max-w-[92rem] gap-8 sm:grid-cols-2 xl:grid-cols-4">
        {statItems.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="rounded-2xl border border-white/20 bg-white/5 p-6"
          >
            <Counter value={stat.value} suffix={stat.suffix} />
            <p className="mt-3 text-sm uppercase tracking-[0.14em] text-[#FDFBF7]/80">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
