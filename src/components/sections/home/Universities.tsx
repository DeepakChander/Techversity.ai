"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, ArrowRight, Globe } from "lucide-react";
import { UNIVERSITIES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function Universities() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      className="relative py-14 lg:py-20 overflow-hidden"
      id="universities"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-start/[0.04] blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.span
            className="inline-block text-sm font-medium text-cyan uppercase tracking-widest mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Partner Universities
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Accredited Institutions{" "}
            <span className="bg-gradient-to-r from-blue-start to-cyan bg-clip-text text-transparent">
              Worldwide
            </span>
          </motion.h2>
          <motion.p
            className="text-text-secondary max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our carefully selected university partners span across continents,
            offering globally recognized credentials.
          </motion.p>
        </div>

        {/* Globe + Map visual */}
        <motion.div
          className="relative w-full max-w-md mx-auto aspect-square mb-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Globe wireframe */}
          <div className="absolute inset-0 rounded-full border border-blue-start/20">
            {/* Latitude lines */}
            {[25, 45, 65, 85].map((pct) => (
              <div
                key={pct}
                className="absolute left-1/2 -translate-x-1/2 rounded-full border border-blue-start/10"
                style={{
                  width: `${pct}%`,
                  height: `${pct}%`,
                  top: `${(100 - pct) / 2}%`,
                }}
              />
            ))}
            {/* Longitude lines */}
            {[0, 45, 90, 135].map((deg) => (
              <div
                key={deg}
                className="absolute inset-0 rounded-full border border-blue-start/10"
                style={{ transform: `rotateY(${deg}deg)` }}
              />
            ))}
          </div>

          {/* Glowing center */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-start/10 to-transparent" />
          <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-blue-start/5 to-cyan/5 blur-xl" />

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Globe className="w-16 h-16 text-cyan/20" />
          </div>

          {/* Location markers */}
          {UNIVERSITIES.map((uni, i) => {
            const positions = [
              { top: "32%", left: "22%" },
              { top: "28%", left: "18%" },
              { top: "26%", left: "65%" },
              { top: "30%", left: "60%" },
            ];
            const pos = positions[i];
            return (
              <motion.div
                key={uni.id}
                className="absolute z-10 group"
                style={pos}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.15, type: "spring" }}
              >
                <div className="relative">
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-cyan/30 animate-ping" />
                  <div className="relative w-3 h-3 rounded-full bg-cyan shadow-[0_0_12px_rgba(0,229,255,0.5)]" />
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-bg-surface/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10 whitespace-nowrap">
                      <span className="text-xs text-text-primary font-medium">
                        {uni.flag} {uni.name}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Connecting arcs */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
            <defs>
              <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1a6dff" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#00e5ff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#1a6dff" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path
              d="M88,128 Q200,60 260,104"
              stroke="url(#arcGrad)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="4,4"
            >
              <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="2s" repeatCount="indefinite" />
            </path>
            <path
              d="M72,112 Q200,200 240,120"
              stroke="url(#arcGrad)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="4,4"
            >
              <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="2.5s" repeatCount="indefinite" />
            </path>
          </svg>
        </motion.div>

        {/* University cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {UNIVERSITIES.map((uni, i) => (
            <motion.div
              key={uni.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
            >
              <div className="group h-full rounded-2xl bg-white/[0.03] border border-white/[0.08] p-6 transition-all duration-500 hover:bg-white/[0.06] hover:border-white/[0.15] hover:shadow-[0_8px_40px_rgba(26,109,255,0.08)]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{uni.flag}</span>
                  <div>
                    <h4 className="font-heading font-semibold text-text-primary text-sm">
                      {uni.name}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-text-muted">
                      <MapPin className="w-3 h-3" />
                      {uni.location}
                    </div>
                  </div>
                </div>
                <p className="text-text-muted text-xs leading-relaxed mb-4">
                  {uni.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {uni.programs.map((prog) => (
                    <span
                      key={prog}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-blue-start/10 text-blue-mid"
                    >
                      {prog}
                    </span>
                  ))}
                </div>
                <Button
                  href="/universities"
                  variant="ghost"
                  size="sm"
                  className="text-xs group/btn"
                >
                  Learn More
                  <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          className="text-center text-xs text-text-muted mt-10 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.6 } : {}}
          transition={{ delay: 1 }}
        >
          Techversity.ai is an admissions advisory service. We facilitate
          connections between candidates and accredited universities but do not
          grant degrees.
        </motion.p>
      </div>
    </section>
  );
}
