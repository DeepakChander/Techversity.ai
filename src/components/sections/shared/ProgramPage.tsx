"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, Check, FileText, Clock, BookOpen, Plus, Minus,
  Crown, TrendingUp, Globe, Zap, Rocket, Users, Search, Award,
  Laptop, Lightbulb, GraduationCap, Mic, BarChart, Settings,
  Shield, Quote, ChevronRight, MapPin, Star,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GradientText } from "@/components/ui/GradientText";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PreFooter } from "@/components/layout/PreFooter";
import { EASE } from "@/lib/animations";
import type { ProgramPageData } from "@/lib/programs-data";
import Link from "next/link";

type IconProps = { className?: string; style?: React.CSSProperties };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const asIcon = (c: any): React.ComponentType<IconProps> => c;
const ICON_MAP: Record<string, React.ComponentType<IconProps>> = {
  Crown: asIcon(Crown), TrendingUp: asIcon(TrendingUp), Globe: asIcon(Globe),
  Zap: asIcon(Zap), Rocket: asIcon(Rocket), Users: asIcon(Users),
  Search: asIcon(Search), Award: asIcon(Award), Laptop: asIcon(Laptop),
  BookOpen: asIcon(BookOpen), Lightbulb: asIcon(Lightbulb),
  GraduationCap: asIcon(GraduationCap), Mic: asIcon(Mic),
  BarChart: asIcon(BarChart), Settings: asIcon(Settings),
};

const fadeInUp = {
  initial: { opacity: 0, y: 24 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-50px" as const },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

function SectionLabel({ label, accent }: { label: string; accent: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 mb-5">
      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
      <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-slate-500">{label}</span>
    </div>
  );
}

function SectionTitle({ title, description, accent, center = true }: {
  title: string; description?: string; accent: string; center?: boolean;
}) {
  return (
    <motion.div className={`mb-12 lg:mb-16 ${center ? "text-center" : ""}`} {...fadeInUp}>
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">{title}</h2>
      {description && (
        <p className={`text-lg leading-relaxed text-slate-600 ${center ? "max-w-2xl mx-auto" : "max-w-3xl"}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}

export function ProgramPage({ data }: { data: ProgramPageData }) {
  const heroRef = useRef<HTMLElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activePhase, setActivePhase] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, 60]);

  return (
    <>
      <div className="main-content">
        <Navbar />
        <main id="main-content">
          {/* Breadcrumb */}
          <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-24 pb-0 relative z-10">
            <nav className="flex items-center gap-2 text-xs text-slate-500" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/programs" className="hover:text-slate-900 transition-colors">Programs</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-900">{data.title}</span>
            </nav>
          </div>

          {/* ========== 1. HERO ========== */}
          <section ref={heroRef} className="relative min-h-[75vh] flex items-center pt-8 pb-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-white to-white" />
            <div className="absolute inset-0 opacity-[0.06]" style={{
              background: `radial-gradient(ellipse at 70% 30%, ${data.accentColor}33 0%, transparent 60%)`,
            }} aria-hidden="true" />

            <motion.div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8" style={{ opacity: heroOpacity, y: heroY }}>
              <div className="grid lg:grid-cols-[1fr,auto] gap-12 items-center">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: data.accentColor }} />
                    <span className="text-xs text-slate-600 uppercase tracking-widest">{data.subtitle}</span>
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-heading font-bold text-slate-900 mb-6 leading-[1.1]">
                    {data.title}
                  </h1>

                  <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-8 leading-relaxed">{data.heroDescription}</p>

                  <div className="flex flex-wrap gap-3 mb-10">
                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <Clock className="w-4 h-4" style={{ color: data.accentColor }} />
                      <span className="text-sm text-slate-700">{data.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <BookOpen className="w-4 h-4" style={{ color: data.accentColor }} />
                      <span className="text-sm text-slate-700">{data.format}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button href="/apply" size="lg">Apply Now <ArrowRight className="w-5 h-5" /></Button>
                    <Button href="/contact" variant="outline" size="lg">Free Consultation</Button>
                  </div>
                </motion.div>

                {/* Stats card */}
                <motion.div className="hidden lg:block" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
                  <div className="w-[280px] rounded-2xl bg-white border border-slate-200 p-6 shadow-lg shadow-slate-200/50">
                    <div className="space-y-5">
                      {data.overviewStats.map((stat, i) => (
                        <div key={stat.label}>
                          <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{stat.label}</div>
                          <div className="text-2xl font-heading font-bold" style={{ color: data.accentColor }}>{stat.value}</div>
                          {i < data.overviewStats.length - 1 && <div className="mt-4 h-px bg-slate-100" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* ========== 2. OVERVIEW ========== */}
          <section className="py-20 lg:py-28 bg-slate-50">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                <motion.div {...fadeInUp}>
                  <SectionLabel label="Overview" accent={data.accentColor} />
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-6">Program Overview</h2>
                  <p className="text-slate-600 text-lg leading-relaxed">{data.overview}</p>
                </motion.div>
                <motion.div className="grid grid-cols-2 gap-4" {...fadeInUp}>
                  {data.overviewStats.map((stat, i) => (
                    <motion.div key={stat.label} className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm"
                      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                      <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">{stat.label}</div>
                      <div className="text-2xl font-heading font-bold" style={{ color: data.accentColor }}>{stat.value}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* ========== 3. BENEFITS ========== */}
          <section className="py-20 lg:py-28 relative">
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12 lg:mb-16">
                <SectionLabel label="Why Choose This Program" accent={data.accentColor} />
                <SectionTitle title="Key Benefits" description="What sets this program apart and how it will transform your professional trajectory." accent={data.accentColor} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {data.benefits.map((benefit, i) => {
                  const IconComponent = ICON_MAP[benefit.icon] || asIcon(Check);
                  return (
                    <motion.div key={benefit.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}>
                      <Card className="p-6 h-full" tilt glow>
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                          style={{ backgroundColor: `${data.accentColor}12`, border: `1px solid ${data.accentColor}20` }}>
                          <IconComponent className="w-5 h-5" style={{ color: data.accentColor }} />
                        </div>
                        <h3 className="font-heading font-semibold text-slate-900 text-lg mb-2">{benefit.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{benefit.description}</p>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ========== 4. CURRICULUM ========== */}
          <section className="py-20 lg:py-28 bg-slate-50">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <SectionLabel label="Curriculum" accent={data.accentColor} />
                <SectionTitle title={data.programStructure.title} description={data.programStructure.description} accent={data.accentColor} />
              </div>
              <div className="flex flex-wrap gap-2 justify-center mb-10">
                {data.programStructure.phases.map((phase, i) => (
                  <motion.button key={phase.name} onClick={() => setActivePhase(i)}
                    className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{
                      backgroundColor: activePhase === i ? `${data.accentColor}12` : "white",
                      border: `1px solid ${activePhase === i ? `${data.accentColor}30` : "#e2e8f0"}`,
                      color: activePhase === i ? data.accentColor : "#64748b",
                    }}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                    {phase.name}
                  </motion.button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={activePhase} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }} className="max-w-3xl mx-auto">
                  <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-heading font-semibold text-slate-900 text-lg">{data.programStructure.phases[activePhase].name}</h3>
                      <span className="text-sm font-medium px-3 py-1 rounded-full"
                        style={{ backgroundColor: `${data.accentColor}12`, color: data.accentColor }}>
                        {data.programStructure.phases[activePhase].duration}
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {data.programStructure.phases[activePhase].items.map((item, i) => (
                        <motion.li key={item} className="flex items-start gap-3" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                          <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: data.accentColor }} />
                          <span className="text-slate-600 text-sm">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </section>

          {/* ========== 5. ELIGIBILITY & DOCUMENTS ========== */}
          <section className="py-20 lg:py-28">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <SectionLabel label="Requirements" accent={data.accentColor} />
                <SectionTitle title="Eligibility & Documents" description="What you need to qualify and the documents required for your application." accent={data.accentColor} />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm" {...fadeInUp}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${data.accentColor}12`, border: `1px solid ${data.accentColor}20` }}>
                      <Shield className="w-5 h-5" style={{ color: data.accentColor }} />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-slate-900">Eligibility Criteria</h3>
                  </div>
                  <ul className="space-y-3">
                    {data.eligibility.map((item, i) => (
                      <motion.li key={item} className="flex items-start gap-3" initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                        <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: data.accentColor }} />
                        <span className="text-slate-600 text-sm leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm"
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.6 }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${data.accentColor}12`, border: `1px solid ${data.accentColor}20` }}>
                      <FileText className="w-5 h-5" style={{ color: data.accentColor }} />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-slate-900">Required Documents</h3>
                  </div>
                  <ul className="space-y-3">
                    {data.documents.map((doc, i) => (
                      <motion.li key={doc} className="flex items-start gap-3" initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                        <FileText className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
                        <span className="text-slate-600 text-sm leading-relaxed">{doc}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ========== 6. APPLICATION PROCESS ========== */}
          <section className="py-20 lg:py-28 bg-slate-50">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <SectionLabel label="How It Works" accent={data.accentColor} />
                <SectionTitle title="Application Process" description="A clear, step-by-step journey from application to achievement." accent={data.accentColor} />
              </div>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-px hidden md:block"
                  style={{ background: `linear-gradient(180deg, transparent, ${data.accentColor}20, transparent)` }} />
                <div className="space-y-6">
                  {data.process.map((step, i) => (
                    <motion.div key={step.step} className="flex gap-6 md:gap-8" initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                      <div className="flex flex-col items-center shrink-0">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-heading font-bold text-lg relative z-10"
                          style={{ background: `linear-gradient(135deg, ${data.accentColor}, ${data.accentColor}80)`, boxShadow: `0 4px 20px ${data.accentColor}25` }}>
                          {step.step}
                        </div>
                        {i < data.process.length - 1 && <div className="w-px flex-1 mt-2 min-h-[24px] md:hidden" style={{ backgroundColor: `${data.accentColor}15` }} />}
                      </div>
                      <div className="pb-6 pt-1">
                        <h3 className="font-heading font-semibold text-slate-900 text-lg mb-2">{step.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-lg">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ========== 7. SPECIALIZATIONS ========== */}
          <section className="py-20 lg:py-28">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <SectionLabel label="Focus Areas" accent={data.accentColor} />
                <SectionTitle title={data.specializations.title} description={data.specializations.description} accent={data.accentColor} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {data.specializations.areas.map((area, i) => (
                  <motion.div key={area.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group">
                    <div className="h-full p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300">
                      <div className="w-2 h-2 rounded-full mb-4" style={{ backgroundColor: data.accentColor }} />
                      <h3 className="font-heading font-semibold text-slate-900 mb-2">{area.name}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{area.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ========== 8. ADVISORY BOARD ========== */}
          <section className="py-20 lg:py-28 bg-slate-50">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <SectionLabel label="Leadership" accent={data.accentColor} />
                <SectionTitle title={data.advisoryBoard.title} description={data.advisoryBoard.description} accent={data.accentColor} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {data.advisoryBoard.members.map((member, i) => (
                  <motion.div key={member.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                    <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center hover:shadow-md transition-all duration-300">
                      <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-heading font-bold"
                        style={{ backgroundColor: `${data.accentColor}12`, border: `1px solid ${data.accentColor}20`, color: data.accentColor }}>
                        {member.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                      <h4 className="font-heading font-semibold text-slate-900 text-sm mb-1">{member.name}</h4>
                      <p className="text-xs text-slate-500 mb-1">{member.role}</p>
                      <p className="text-[11px]" style={{ color: data.accentColor }}>{member.affiliation}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ========== 9. ACCREDITATION ========== */}
          <section className="py-20 lg:py-28">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="grid lg:grid-cols-[1fr,1.2fr] gap-12 items-start">
                <motion.div {...fadeInUp}>
                  <SectionLabel label="Trust & Verification" accent={data.accentColor} />
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">{data.accreditation.title}</h2>
                  <p className="text-slate-600 text-lg leading-relaxed">{data.accreditation.description}</p>
                </motion.div>
                <motion.div className="space-y-3" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.1 }}>
                  {data.accreditation.points.map((point, i) => (
                    <motion.div key={point} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-sm"
                      initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                      <Shield className="w-4 h-4 shrink-0 mt-0.5" style={{ color: data.accentColor }} />
                      <span className="text-slate-600 text-sm leading-relaxed">{point}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* ========== 10. TESTIMONIALS ========== */}
          {data.testimonials.length > 0 && (
            <section className="py-20 lg:py-28 bg-slate-50">
              <div className="max-w-5xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-12">
                  <SectionLabel label="Success Stories" accent={data.accentColor} />
                  <SectionTitle title="What Our Alumni Say" description="Hear from professionals who have transformed their careers." accent={data.accentColor} />
                </div>
                <div className="relative">
                  <AnimatePresence mode="wait">
                    <motion.div key={activeTestimonial} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="max-w-3xl mx-auto">
                      <div className="rounded-2xl bg-white border border-slate-200 p-8 md:p-10 text-center shadow-sm">
                        <Quote className="w-8 h-8 mx-auto mb-6 opacity-20" style={{ color: data.accentColor }} />
                        <p className="text-slate-700 text-lg md:text-xl leading-relaxed mb-8 italic">
                          &ldquo;{data.testimonials[activeTestimonial].quote}&rdquo;
                        </p>
                        <div>
                          <div className="font-heading font-semibold text-slate-900">{data.testimonials[activeTestimonial].name}</div>
                          <div className="text-sm text-slate-500 mt-1">{data.testimonials[activeTestimonial].title}</div>
                          <div className="flex items-center justify-center gap-1.5 mt-2">
                            <MapPin className="w-3 h-3" style={{ color: data.accentColor }} />
                            <span className="text-xs" style={{ color: data.accentColor }}>{data.testimonials[activeTestimonial].country}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  <div className="flex items-center justify-center gap-2 mt-8">
                    {data.testimonials.map((_, i) => (
                      <button key={i} onClick={() => setActiveTestimonial(i)}
                        className="w-2 h-2 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: activeTestimonial === i ? data.accentColor : "#cbd5e1",
                          transform: activeTestimonial === i ? "scale(1.3)" : "scale(1)",
                        }}
                        aria-label={`View testimonial ${i + 1}`} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ========== 11. FAQ ========== */}
          {data.faqs.length > 0 && (
            <section className="py-20 lg:py-28">
              <div className="max-w-3xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-12">
                  <SectionLabel label="Common Questions" accent={data.accentColor} />
                  <SectionTitle title="Frequently Asked Questions" accent={data.accentColor} />
                </div>
                <div className="space-y-0">
                  {data.faqs.map((faq, i) => (
                    <motion.div key={faq.question} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                      <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-start justify-between gap-4 py-5 text-left group" aria-expanded={openFaq === i}>
                        <h4 className={`font-medium transition-colors ${openFaq === i ? "text-slate-900" : "text-slate-600"}`}>{faq.question}</h4>
                        <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                          style={{ backgroundColor: openFaq === i ? `${data.accentColor}15` : "#f1f5f9" }}>
                          {openFaq === i ? <Minus className="w-4 h-4" style={{ color: data.accentColor }} /> : <Plus className="w-4 h-4 text-slate-400" />}
                        </div>
                      </button>
                      <AnimatePresence>
                        {openFaq === i && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                            <p className="pb-5 text-slate-500 text-sm leading-relaxed">{faq.answer}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div className="h-px bg-slate-200" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ========== FINAL CTA ========== */}
          <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-blue-start/20">
            <div className="absolute inset-0 opacity-[0.06]" style={{
              background: `radial-gradient(ellipse at 50% 50%, ${data.accentColor} 0%, transparent 60%)`,
            }} />
            <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
              <motion.div {...fadeInUp}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] mb-6">
                  <Star className="w-3 h-3" style={{ color: data.accentColor }} />
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-slate-400">Take the Next Step</span>
                </div>
              </motion.div>
              <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-5" {...fadeInUp}>
                Ready to Begin Your{" "}
                <GradientText gradient={data.accentGradient}>{data.title}</GradientText>{" "}
                Journey?
              </motion.h2>
              <motion.p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto" initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                Apply now or schedule a free consultation — no obligation, no pressure.
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <Button href="/apply" size="lg" className="!bg-white !text-slate-900 hover:!shadow-xl">
                  Apply Now <ArrowRight className="w-5 h-5" />
                </Button>
                <Button href="/contact" variant="outline" size="lg" className="!text-white !border-white/30 hover:!bg-white/10">
                  Book a Free Consultation
                </Button>
              </motion.div>
            </div>
          </section>

          {/* Sticky Mobile CTA */}
          <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden">
            <div className="bg-white/90 backdrop-blur-xl border-t border-slate-200 px-4 py-3">
              <div className="flex gap-3">
                <Button href="/apply" size="sm" className="flex-1">Apply Now</Button>
                <Button href="/contact" variant="outline" size="sm" className="flex-1">Enquire</Button>
              </div>
            </div>
          </div>
        </main>
        <PreFooter />
      </div>
      <Footer />
    </>
  );
}
