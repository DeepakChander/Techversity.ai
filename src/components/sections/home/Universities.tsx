"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Globe } from "lucide-react";
import { UNIVERSITIES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerItem, EASE } from "@/lib/animations";

export function Universities() {
  return (
    <section
      className="relative py-20 lg:py-28 overflow-hidden"
      id="universities"
    >
      {/* Subtle accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.05]"
        style={{
          background: "radial-gradient(circle, #3A82FF 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          label="Partner Universities"
          title="Accredited Institutions Worldwide"
          subtitle="Our carefully selected university partners span across continents, offering globally recognized credentials."
          light
        />

        {/* Globe illustration placeholder */}
        <motion.div
          className="relative mb-14 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full max-w-md aspect-square mx-auto flex items-center justify-center relative">
            {/* Decorative rings */}
            <div className="absolute inset-0 rounded-full border border-slate-200 opacity-50" />
            <div className="absolute inset-6 rounded-full border border-slate-200 opacity-40" />
            <div className="absolute inset-12 rounded-full border border-slate-200 opacity-30" />
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-50 to-cyan/10 border border-blue-100 flex items-center justify-center">
              <Globe className="w-10 h-10 text-blue-start" />
            </div>

            {/* Floating location pins */}
            {[
              { top: "15%", left: "20%", delay: 0 },
              { top: "25%", right: "15%", delay: 0.2 },
              { bottom: "20%", left: "15%", delay: 0.4 },
              { bottom: "30%", right: "20%", delay: 0.6 },
            ].map((pos, i) => (
              <motion.div
                key={i}
                className="absolute w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center"
                style={pos}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + (pos.delay || 0), type: "spring", stiffness: 300 }}
              >
                <MapPin className="w-3.5 h-3.5 text-blue-start" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* University cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {UNIVERSITIES.map((uni, i) => (
            <motion.div
              key={uni.id}
              className="group h-full rounded-2xl bg-white border border-slate-200 p-6 transition-all duration-500 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-start/[0.06] hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: EASE.default }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{uni.flag}</span>
                <div>
                  <h4 className="font-heading font-semibold text-slate-900 text-sm">
                    {uni.name}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="w-3 h-3" />
                    {uni.location}
                  </div>
                </div>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">
                {uni.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {uni.programs.map((prog) => (
                  <span
                    key={prog}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-start border border-blue-100"
                  >
                    {prog}
                  </span>
                ))}
              </div>
              <Button
                href="/universities"
                variant="ghost"
                size="sm"
                className="text-xs group/btn !text-blue-start hover:!bg-blue-50"
              >
                Learn More
                <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-slate-400 mt-10 max-w-lg mx-auto">
          Techversity.ai is an admissions advisory service. We facilitate
          connections between candidates and accredited universities but do not
          grant degrees.
        </p>
      </div>
    </section>
  );
}
