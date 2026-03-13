"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { WHY_US_POINTS } from "@/lib/constants";

export function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      className="relative py-14 lg:py-20 overflow-hidden"
      id="why-us"
    >
      {/* Background accents */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-start/[0.04] blur-[100px]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-cyan/[0.03] blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left - Heading */}
          <div className="lg:sticky lg:top-32">
            <motion.span
              className="inline-block text-sm font-medium text-cyan uppercase tracking-widest mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              Why Choose Us
            </motion.span>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-6 leading-[1.15]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Why{" "}
              <span className="bg-gradient-to-r from-blue-start to-cyan bg-clip-text text-transparent">
                Techversity
              </span>
              <span className="text-cyan">.AI</span>?
            </motion.h2>

            <motion.p
              className="text-text-secondary text-lg max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              We&apos;re not a degree mill. We&apos;re a bridge between your
              professional excellence and legitimate academic recognition.
            </motion.p>

            {/* Decorative stats */}
            <motion.div
              className="flex gap-8 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div>
                <div className="text-3xl font-heading font-bold text-cyan">98%</div>
                <div className="text-xs text-text-muted mt-1">Acceptance Rate</div>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <div className="text-3xl font-heading font-bold text-cyan">4hrs</div>
                <div className="text-xs text-text-muted mt-1">Response Time</div>
              </div>
            </motion.div>
          </div>

          {/* Right - Trust bullets */}
          <div className="space-y-3">
            {WHY_US_POINTS.map((point, i) => (
              <motion.div
                key={point.title}
                className="group relative flex items-start gap-4 p-5 rounded-xl border border-transparent hover:bg-white/[0.03] hover:border-white/[0.08] transition-all duration-300"
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  delay: 0.1 * i + 0.2,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Checkmark */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan/10 flex items-center justify-center text-cyan mt-0.5">
                  <Check className="w-4 h-4" />
                </div>

                <div>
                  <h4 className="text-text-primary font-semibold mb-1">
                    {point.title}
                  </h4>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
