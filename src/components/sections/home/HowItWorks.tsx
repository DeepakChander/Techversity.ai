"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Users,
  Building2,
  CheckCircle2,
  Trophy,
  ArrowRight,
} from "lucide-react";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EASE } from "@/lib/animations";

const STEP_COLORS = [
  "#3A82FF",
  "#0EA5E9",
  "#7c3aed",
  "#10b981",
  "#f97316",
];

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Building2: <Building2 className="w-6 h-6" />,
  CheckCircle2: <CheckCircle2 className="w-6 h-6" />,
  Trophy: <Trophy className="w-6 h-6" />,
};

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      className="relative py-20 lg:py-28 bg-slate-50 overflow-hidden"
      id="how-it-works"
    >
      {/* Subtle background accents */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.06]"
        style={{
          background: `radial-gradient(circle, ${STEP_COLORS[activeStep]} 0%, transparent 70%)`,
          filter: "blur(120px)",
          transition: "background 0.5s ease",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          label="How It Works"
          title="Your Journey in 5 Simple Steps"
          subtitle="From application to graduation, we guide you every step of the way with personalized support."
          light
        />

        {/* Desktop: Interactive steps with content panel */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
          {/* Left: Step selector */}
          <div className="col-span-5 space-y-2">
            {HOW_IT_WORKS_STEPS.map((step, i) => {
              const isActive = activeStep === i;
              const color = STEP_COLORS[i];

              return (
                <motion.button
                  key={step.number}
                  onClick={() => setActiveStep(i)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-300 group relative ${
                    isActive
                      ? "bg-white border-slate-200 shadow-lg shadow-slate-200/50"
                      : "bg-transparent border-transparent hover:bg-white/60 hover:border-slate-200"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: EASE.default }}
                >
                  {/* Active left bar */}
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
                      style={{ backgroundColor: color }}
                      layoutId="step-indicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="flex items-start gap-4">
                    {/* Step number */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-heading font-bold text-sm transition-all duration-300"
                      style={{
                        backgroundColor: isActive ? `${color}15` : "#f1f5f9",
                        color: isActive ? color : "#94a3b8",
                        border: `1px solid ${isActive ? `${color}25` : "#e2e8f0"}`,
                      }}
                    >
                      {String(step.number).padStart(2, "0")}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className="transition-colors duration-300"
                          style={{ color: isActive ? color : "#94a3b8" }}
                        >
                          {iconMap[step.icon]}
                        </div>
                        <h3
                          className={`font-heading font-semibold text-base transition-colors duration-300 ${
                            isActive ? "text-slate-900" : "text-slate-600"
                          }`}
                        >
                          {step.title}
                        </h3>
                      </div>
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-slate-500 text-sm leading-relaxed mt-2"
                          >
                            {step.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right: Active step content card */}
          <div className="col-span-7 lg:sticky lg:top-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.4, ease: EASE.default }}
                className="bg-white rounded-2xl border border-slate-200 p-10 shadow-xl shadow-slate-200/50"
              >
                {/* Large step number */}
                <span
                  className="text-[120px] font-heading font-bold leading-none"
                  style={{
                    WebkitTextStroke: `2px ${STEP_COLORS[activeStep]}15`,
                    color: "transparent",
                  }}
                >
                  {String(HOW_IT_WORKS_STEPS[activeStep].number).padStart(2, "0")}
                </span>

                {/* Icon + Title */}
                <div className="flex items-center gap-3 mb-4 -mt-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: `${STEP_COLORS[activeStep]}12`,
                      border: `1px solid ${STEP_COLORS[activeStep]}25`,
                    }}
                  >
                    <div style={{ color: STEP_COLORS[activeStep] }}>
                      {iconMap[HOW_IT_WORKS_STEPS[activeStep].icon]}
                    </div>
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-slate-900">
                    {HOW_IT_WORKS_STEPS[activeStep].title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  {HOW_IT_WORKS_STEPS[activeStep].description}
                </p>

                {/* Step progress dots */}
                <div className="flex items-center gap-3">
                  {HOW_IT_WORKS_STEPS.map((_, j) => (
                    <button
                      key={j}
                      onClick={() => setActiveStep(j)}
                      className="h-2 rounded-full transition-all duration-500 hover:opacity-80"
                      style={{
                        width: j === activeStep ? "32px" : "8px",
                        backgroundColor:
                          j <= activeStep ? STEP_COLORS[j] : "#e2e8f0",
                      }}
                      aria-label={`Step ${j + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: Stacked cards */}
        <div className="lg:hidden space-y-4">
          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
            >
              <div className="flex gap-4">
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-heading font-bold text-sm"
                    style={{ backgroundColor: STEP_COLORS[i] }}
                  >
                    {String(step.number).padStart(2, "0")}
                  </div>
                  {i < HOW_IT_WORKS_STEPS.length - 1 && (
                    <div className="flex-1 w-px bg-gradient-to-b from-slate-200 to-transparent min-h-[20px] mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div style={{ color: STEP_COLORS[i] }}>
                      {iconMap[step.icon]}
                    </div>
                    <h3 className="text-lg font-heading font-bold text-slate-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Button href="/apply" variant="primary" size="md">
            Start Your Journey
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
