"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  FileText,
  Clock,
  BookOpen,
  Plus,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import type { ProgramPageData } from "@/lib/programs-data";

export function ProgramPage({ data }: { data: ProgramPageData }) {
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <div className="main-content">
      <Navbar />
      <main>
        {/* Hero */}
        <section
          ref={heroRef}
          className="relative min-h-[70vh] flex items-center pt-32 pb-20 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-[#0d1235] to-bg-primary" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: `radial-gradient(ellipse at 60% 40%, ${data.accentColor}33 0%, transparent 70%)`,
            }}
          />

          <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs text-text-muted uppercase tracking-widest">
                {data.subtitle}
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text-primary mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {data.title}
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-text-secondary max-w-2xl mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {data.heroDescription}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08]">
                <Clock className="w-4 h-4 text-cyan" />
                <span className="text-sm text-text-secondary">
                  {data.duration}
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08]">
                <BookOpen className="w-4 h-4 text-cyan" />
                <span className="text-sm text-text-secondary">
                  {data.format}
                </span>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button href="/apply" size="lg">
                Apply Now
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Free Consultation
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Overview */}
        <section className="py-20 lg:py-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <motion.h2
              className="text-3xl font-heading font-bold text-text-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Program Overview
            </motion.h2>
            <motion.p
              className="text-text-secondary text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {data.overview}
            </motion.p>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 lg:py-24 bg-bg-surface/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.h2
              className="text-3xl font-heading font-bold text-text-primary mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Key Benefits
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.benefits.map((benefit, i) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="p-6 h-full">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-start/20 to-cyan/20 flex items-center justify-center text-cyan mb-4">
                      <Check className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading font-semibold text-text-primary mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-20 lg:py-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <motion.h2
              className="text-3xl font-heading font-bold text-text-primary mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              The Process
            </motion.h2>
            <div className="space-y-8">
              {data.process.map((step, i) => (
                <motion.div
                  key={step.step}
                  className="flex gap-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-heading font-bold text-lg flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${data.accentColor}, #00e5ff)`,
                      }}
                    >
                      {step.step}
                    </div>
                    {i < data.process.length - 1 && (
                      <div className="w-px h-full bg-white/10 mt-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <h3 className="font-heading font-semibold text-text-primary text-lg mb-2">
                      {step.title}
                    </h3>
                    <p className="text-text-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Eligibility & Documents */}
        <section className="py-20 lg:py-24 bg-bg-surface/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Eligibility */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-6">
                  Eligibility
                </h2>
                <ul className="space-y-3">
                  {data.eligibility.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" />
                      <span className="text-text-secondary text-sm">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Documents */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-6">
                  Required Documents
                </h2>
                <ul className="space-y-3">
                  {data.documents.map((doc, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-text-muted flex-shrink-0 mt-0.5" />
                      <span className="text-text-secondary text-sm">
                        {doc}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        {data.faqs.length > 0 && (
          <section className="py-20 lg:py-24">
            <div className="max-w-3xl mx-auto px-6 lg:px-8">
              <motion.h2
                className="text-3xl font-heading font-bold text-text-primary mb-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Frequently Asked Questions
              </motion.h2>
              <div className="space-y-0">
                {data.faqs.map((faq, i) => (
                  <div key={i}>
                    <button
                      onClick={() =>
                        setOpenFaq(openFaq === i ? null : i)
                      }
                      className="w-full flex items-start justify-between gap-4 py-5 text-left group"
                    >
                      <h4
                        className={`font-medium transition-colors ${
                          openFaq === i
                            ? "text-text-primary"
                            : "text-text-secondary"
                        }`}
                      >
                        {faq.question}
                      </h4>
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center text-text-muted">
                        {openFaq === i ? (
                          <Minus className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </div>
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="pb-5 text-text-muted text-sm leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="h-px bg-white/[0.06]" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-20 lg:py-24">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-text-secondary text-lg mb-8">
              Take the first step toward your {data.title}. Apply now or
              schedule a free consultation with our advisory team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/apply" size="lg">
                Apply Now
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Book a Free Call
              </Button>
            </div>
          </div>
        </section>
      </main>
      </div>
      <Footer />
    </>
  );
}
