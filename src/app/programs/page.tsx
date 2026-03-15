"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Briefcase, GraduationCap, BookOpen, ArrowRight } from "lucide-react";
import { PROGRAMS } from "@/lib/constants";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PreFooter } from "@/components/layout/PreFooter";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

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
        <section className="relative pt-32 pb-20">
          <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-[#0d1235] to-bg-primary" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text-primary mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Our Programs
            </motion.h1>
            <motion.p
              className="text-lg text-text-secondary max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              From honorary recognition to rigorous research degrees, find the
              path that matches your professional journey.
            </motion.p>
          </div>
        </section>

        <section ref={ref} className="py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PROGRAMS.map((program, i) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                >
                  <Card
                    className={`p-8 h-full group ${
                      program.comingSoon ? "opacity-60" : ""
                    }`}
                  >
                    {program.comingSoon && (
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-orange/20 border border-orange/30 text-xs text-orange font-medium">
                        Coming Soon
                      </div>
                    )}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-start/20 to-cyan/20 flex items-center justify-center text-cyan mb-6">
                      {iconMap[program.icon]}
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-text-primary mb-3">
                      {program.title}
                    </h2>
                    <p className="text-text-secondary mb-4 leading-relaxed">
                      {program.description}
                    </p>
                    <div className="flex gap-3 mb-6 text-xs text-text-muted">
                      <span className="px-3 py-1 rounded-md bg-white/[0.05]">
                        {program.duration}
                      </span>
                      <span className="px-3 py-1 rounded-md bg-white/[0.05]">
                        {program.format}
                      </span>
                    </div>
                    {!program.comingSoon && (
                      <Button href={program.href} variant="outline" size="sm">
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    )}
                  </Card>
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
