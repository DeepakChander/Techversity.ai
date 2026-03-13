"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight, Globe, Shield } from "lucide-react";
import { UNIVERSITIES } from "@/lib/constants";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function UniversitiesPage() {
  return (
    <>
      <div className="main-content">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20">
          <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-[#0d1235] to-bg-primary" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text-primary mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Partner Universities
            </motion.h1>
            <motion.p
              className="text-lg text-text-secondary max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              We partner exclusively with accredited institutions committed to
              academic excellence and professional development.
            </motion.p>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="py-12 border-y border-white/[0.05]">
          <div className="max-w-5xl mx-auto px-6 flex flex-wrap items-center justify-center gap-8 text-sm text-text-muted">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan" />
              <span>All Universities Accredited</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan" />
              <span>Globally Recognized Credentials</span>
            </div>
          </div>
        </section>

        {/* University Cards */}
        <section className="py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {UNIVERSITIES.map((uni, i) => (
                <motion.div
                  key={uni.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="p-8 h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-4xl">{uni.flag}</span>
                      <div>
                        <h2 className="text-xl font-heading font-bold text-text-primary">
                          {uni.name}
                        </h2>
                        <div className="flex items-center gap-1 text-sm text-text-muted">
                          <MapPin className="w-4 h-4" />
                          {uni.location}
                        </div>
                      </div>
                    </div>
                    <p className="text-text-secondary mb-6 leading-relaxed">
                      {uni.description}
                    </p>
                    <div className="mb-6">
                      <h4 className="text-xs text-text-muted uppercase tracking-wider mb-2">
                        Available Programs
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {uni.programs.map((prog) => (
                          <span
                            key={prog}
                            className="text-xs px-3 py-1 rounded-lg bg-blue-start/10 text-blue-mid border border-blue-start/20"
                          >
                            {prog}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button href="/apply" variant="outline" size="sm">
                      Apply to {uni.name}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-12 border-t border-white/[0.05]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-xs text-text-muted leading-relaxed">
              Techversity.ai is an admissions advisory service. We facilitate
              connections between candidates and accredited universities but do
              not directly grant degrees. All academic decisions, including
              admissions and degree conferral, are made exclusively by the
              respective university.
            </p>
          </div>
        </section>
      </main>
      </div>
      <Footer />
    </>
  );
}
