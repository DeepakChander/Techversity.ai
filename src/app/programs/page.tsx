"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Briefcase, GraduationCap, BookOpen, ArrowRight, Clock, Monitor } from "lucide-react";
import { PROGRAMS } from "@/lib/constants";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PreFooter } from "@/components/layout/PreFooter";
import { Button } from "@/components/ui/Button";
import { EASE } from "@/lib/animations";

const iconMap: Record<string, React.ReactNode> = {
  Award: <Award className="w-10 h-10" />,
  Briefcase: <Briefcase className="w-10 h-10" />,
  GraduationCap: <GraduationCap className="w-10 h-10" />,
  BookOpen: <BookOpen className="w-10 h-10" />,
};

export default function ProgramsPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <div className="main-content">
        <Navbar />
        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-20">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-white" />
            <div
              className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.08]"
              style={{
                background: "radial-gradient(circle, #3A82FF 0%, transparent 70%)",
                filter: "blur(120px)",
              }}
              aria-hidden="true"
            />
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-slate-900 mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                Our Programs
              </motion.h1>
              <motion.p
                className="text-lg text-slate-600 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                From honorary recognition to rigorous research degrees, find the
                path that matches your professional journey.
              </motion.p>
            </div>
          </section>

          {/* Program cards */}
          <section ref={ref} className="py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {PROGRAMS.map((program, i) => (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.15, duration: 0.6, ease: EASE.default }}
                  >
                    <div
                      className={`group relative h-full rounded-2xl bg-white border border-slate-200 p-8 transition-all duration-500 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-start/[0.06] ${
                        program.comingSoon ? "opacity-60 pointer-events-none" : ""
                      }`}
                    >
                      {program.comingSoon && (
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs text-orange-600 font-medium">
                          Coming Soon
                        </div>
                      )}
                      {program.featured && !program.comingSoon && (
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs text-blue-start font-medium">
                          Popular
                        </div>
                      )}
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan/10 border border-blue-100 flex items-center justify-center text-blue-start mb-6 group-hover:scale-105 transition-transform duration-300">
                        {iconMap[program.icon]}
                      </div>
                      <h2 className="text-2xl font-heading font-bold text-slate-900 mb-3">
                        {program.title}
                      </h2>
                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {program.description}
                      </p>
                      <div className="flex gap-3 mb-6 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-50 border border-slate-100">
                          <Clock className="w-3 h-3 text-blue-start/60" />
                          {program.duration}
                        </span>
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-50 border border-slate-100">
                          <Monitor className="w-3 h-3 text-blue-start/60" />
                          {program.format}
                        </span>
                      </div>
                      {!program.comingSoon && (
                        <Button href={program.href} variant="ghost" size="sm" className="!text-blue-start hover:!bg-blue-50">
                          Learn More
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
      <PreFooter />
      <Footer />
    </>
  );
}
