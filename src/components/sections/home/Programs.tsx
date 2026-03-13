"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Briefcase, GraduationCap, BookOpen, ArrowRight, Clock, Monitor } from "lucide-react";
import { PROGRAMS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

const iconMap: Record<string, React.ReactNode> = {
  Award: <Award className="w-7 h-7" />,
  Briefcase: <Briefcase className="w-7 h-7" />,
  GraduationCap: <GraduationCap className="w-7 h-7" />,
  BookOpen: <BookOpen className="w-7 h-7" />,
};

export function Programs() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      className="relative py-14 lg:py-20 overflow-hidden"
      id="programs"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-blue-start/[0.04] blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <motion.span
            className="inline-block text-sm font-medium text-cyan uppercase tracking-widest mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Our Programs
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Choose Your Path to{" "}
            <span className="bg-gradient-to-r from-blue-start to-cyan bg-clip-text text-transparent">
              Academic Excellence
            </span>
          </motion.h2>
          <motion.p
            className="text-text-secondary max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            From honorary recognition to rigorous research programs, find the
            right fit for your professional journey.
          </motion.p>
        </div>

        {/* Program cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PROGRAMS.map((program, i) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i + 0.3 }}
            >
              <div
                className={`group relative h-full rounded-2xl bg-white/[0.03] border border-white/[0.08] p-7 lg:p-8 transition-all duration-500 hover:bg-white/[0.06] hover:border-white/[0.15] hover:shadow-[0_8px_40px_rgba(26,109,255,0.1)] ${
                  program.comingSoon ? "opacity-50" : ""
                }`}
              >
                {/* Coming Soon badge */}
                {program.comingSoon && (
                  <div className="absolute top-5 right-5 px-3 py-1 rounded-full bg-orange/20 border border-orange/30 text-xs text-orange font-medium">
                    Coming Soon
                  </div>
                )}

                {/* Featured indicator */}
                {program.featured && !program.comingSoon && (
                  <div className="absolute top-5 right-5 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-xs text-cyan font-medium">
                    Popular
                  </div>
                )}

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-start/20 to-cyan/20 flex items-center justify-center text-cyan mb-6 group-hover:scale-110 transition-transform duration-300">
                  {iconMap[program.icon]}
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-heading font-bold text-text-primary mb-3">
                  {program.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  {program.description}
                </p>

                {/* Meta info */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center gap-1.5 text-xs text-text-muted">
                    <Clock className="w-3.5 h-3.5 text-cyan/60" />
                    {program.duration}
                  </div>
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <div className="flex items-center gap-1.5 text-xs text-text-muted">
                    <Monitor className="w-3.5 h-3.5 text-cyan/60" />
                    {program.format}
                  </div>
                </div>

                {/* CTA */}
                {!program.comingSoon && (
                  <Button
                    href={program.href}
                    variant="ghost"
                    size="sm"
                    className="group/btn"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                )}

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-start/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
