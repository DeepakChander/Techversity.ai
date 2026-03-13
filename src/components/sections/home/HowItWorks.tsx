"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FileText,
  Users,
  Building2,
  CheckCircle2,
  Trophy,
} from "lucide-react";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Building2: <Building2 className="w-6 h-6" />,
  CheckCircle2: <CheckCircle2 className="w-6 h-6" />,
  Trophy: <Trophy className="w-6 h-6" />,
};

function StepCard({
  step,
  index,
  total,
}: {
  step: (typeof HOW_IT_WORKS_STEPS)[number];
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-6 lg:gap-10"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Timeline column */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Step number circle */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-start to-cyan flex items-center justify-center text-white font-heading font-bold text-sm shadow-[0_0_20px_rgba(0,229,255,0.2)] relative z-10">
          {String(step.number).padStart(2, "0")}
        </div>
        {/* Connecting line */}
        {index < total - 1 && (
          <div className="flex-1 w-px bg-gradient-to-b from-cyan/30 to-transparent min-h-[80px]" />
        )}
      </div>

      {/* Content card */}
      <div className="flex-1 pb-8 lg:pb-10">
        <div className="group rounded-2xl bg-white/[0.03] border border-white/[0.08] p-6 lg:p-8 transition-all duration-500 hover:bg-white/[0.06] hover:border-white/[0.15] hover:shadow-[0_8px_40px_rgba(26,109,255,0.08)]">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-start/20 to-cyan/20 flex items-center justify-center text-cyan mb-5 group-hover:scale-110 transition-transform duration-300">
            {iconMap[step.icon]}
          </div>

          {/* Title */}
          <h3 className="text-xl lg:text-2xl font-heading font-bold text-text-primary mb-3">
            {step.title}
          </h3>

          {/* Description */}
          <p className="text-text-secondary text-sm leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <section
      className="relative py-14 lg:py-20 overflow-hidden"
      id="how-it-works"
    >
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-start/[0.03] blur-[150px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-12">
          <motion.span
            className="inline-block text-sm font-medium text-cyan uppercase tracking-widest mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            How It Works
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Five Steps to Your{" "}
            <span className="bg-gradient-to-r from-blue-start to-cyan bg-clip-text text-transparent">
              Doctoral Journey
            </span>
          </motion.h2>
          <motion.p
            className="text-text-secondary max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our streamlined process makes it simple to get started.
          </motion.p>
        </div>

        {/* Timeline steps */}
        <div>
          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <StepCard
              key={step.number}
              step={step}
              index={i}
              total={HOW_IT_WORKS_STEPS.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
