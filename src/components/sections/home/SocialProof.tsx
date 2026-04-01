"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { EASE } from "@/lib/animations";

const STATS = [
  { value: 12, suffix: "+", label: "Countries Served", decimals: 0 },
  { value: 4, suffix: "", label: "Partner Universities", decimals: 0 },
  { value: 98, suffix: "%", label: "Acceptance Rate", decimals: 0 },
  { value: 4.8, suffix: "/5", label: "Client Satisfaction", decimals: 1 },
];

export function SocialProof() {
  return (
    <section className="relative py-10 lg:py-14 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: EASE.default }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: EASE.default }}
            >
              <div className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-1.5 tracking-tight">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </div>
              <div className="text-[11px] text-slate-500 uppercase tracking-[0.12em]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
