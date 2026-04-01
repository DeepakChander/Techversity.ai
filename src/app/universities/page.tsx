"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ArrowRight,
  Globe,
  Shield,
  Search,
  GraduationCap,
  Building2,
  Users,
  FlaskConical,
  BadgeCheck,
  Route,
  ChevronDown,
  ExternalLink,
  Award,
  BookOpen,
  Handshake,
  Star,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import {
  UNIVERSITIES,
  UNIVERSITY_REGIONS,
  COLLABORATION_MODEL,
  IMPACT_STATS,
  ACCREDITATIONS,
} from "@/lib/constants";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PreFooter } from "@/components/layout/PreFooter";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useGSAP, gsap } from "@/hooks/useGSAP";

// ─── Icon map for collaboration model ───
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  FlaskConical,
  BadgeCheck,
  Users,
  Route,
};

// ════════════════════════════════════════════
// 1. HERO SECTION
// ════════════════════════════════════════════
function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scrollY = useTransform(scrollYProgress, [0, 0.6], [0, -80]);

  // GSAP character-by-character reveal
  useGSAP(() => {
    if (!headlineRef.current) return;
    const chars = headlineRef.current.querySelectorAll(".hero-char");
    gsap.fromTo(
      chars,
      { opacity: 0, y: 40, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        stagger: 0.025,
        ease: "power3.out",
        delay: 0.2,
      }
    );
  }, []);

  const headlineParts = [
    { text: "A Global Network of", gradient: false },
    { text: "Academic Excellence", gradient: true },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background layers - light theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-white" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(58,130,255,0.08)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(14,165,233,0.05)_0%,transparent_50%)]" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32 lg:pt-36"
        style={{ opacity: scrollOpacity, y: scrollY }}
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-slate-200 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <Globe className="w-4 h-4 text-blue-start" />
          <span className="text-sm text-slate-600">
            Trusted Academic Partners Across{" "}
            <span className="text-slate-900 font-medium">3 Continents</span>
          </span>
        </motion.div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-heading font-bold text-slate-900 leading-[1.08] tracking-tight mb-6"
        >
          {headlineParts[0].text.split("").map((char, i) => (
            <span
              key={`l1-${i}`}
              className="hero-char inline-block opacity-0"
              style={{ display: char === " " ? "inline" : "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
          <br className="hidden sm:block" />
          {headlineParts[1].text.split("").map((char, i) => (
            <span
              key={`l2-${i}`}
              className="hero-char inline-block opacity-0 bg-gradient-to-r from-blue-start via-[#0EA5E9] to-blue-mid bg-clip-text text-transparent"
              style={{ display: char === " " ? "inline" : "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* Divider */}
        <motion.div
          className="mx-auto w-20 h-px bg-gradient-to-r from-transparent via-blue-start/50 to-transparent mb-6"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        />

        {/* Subtitle */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
        >
          We partner exclusively with{" "}
          <span className="text-slate-900 font-medium">accredited institutions</span>{" "}
          committed to academic excellence, ensuring your credentials carry{" "}
          <span className="text-slate-900 font-medium">global recognition</span> and
          institutional prestige.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-start via-[#0EA5E9] to-blue-mid rounded-xl opacity-40 blur-md group-hover:opacity-70 transition-opacity duration-500" />
            <Button href="#universities" size="lg" className="relative">
              Explore Universities
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
          <Button href="/contact" variant="outline" size="lg">
            Partner With Us
            <Handshake className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          className="inline-flex flex-wrap items-center justify-center gap-6 sm:gap-0 px-8 py-5 rounded-2xl bg-white border border-slate-200 shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.7 }}
        >
          {[
            { icon: Shield, label: "All Universities Accredited", color: "text-blue-start" },
            { icon: Globe, label: "Globally Recognized Credentials", color: "text-blue-mid" },
            { icon: GraduationCap, label: "Doctoral-Level Programs", color: "text-purple" },
            { icon: Award, label: "Institutional Prestige", color: "text-orange" },
          ].map((item, i) => (
            <div key={item.label} className="flex items-center">
              {i > 0 && (
                <div className="hidden sm:block w-px h-8 bg-slate-200 mx-6" />
              )}
              <div className="flex items-center gap-2 px-2">
                <item.icon className={`w-4 h-4 ${item.color}`} />
                <span className="text-xs sm:text-sm text-slate-500">{item.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
      >
        <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">
          Discover our partners
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-[5]" />
    </section>
  );
}

// ════════════════════════════════════════════
// 2. GLOBAL UNIVERSITY NETWORK
// ════════════════════════════════════════════
function GlobalNetworkSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll(".network-header > *"), {
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-28 overflow-hidden bg-slate-50">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="network-header text-center mb-12">
          <span className="inline-block text-sm font-medium text-blue-start uppercase tracking-widest mb-4">
            Global Presence
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-slate-900 mb-5">
            Our University{" "}
            <span className="bg-gradient-to-r from-blue-start to-[#0EA5E9] bg-clip-text text-transparent">
              Network
            </span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Partner institutions spanning across continents, offering globally
            recognized credentials to professionals worldwide.
          </p>
        </div>

        {/* Globe decorative element + Region Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Decorative globe element */}
          <motion.div
            className="lg:col-span-3 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-lg mx-auto aspect-square flex items-center justify-center relative">
              {/* Concentric rings */}
              <div className="absolute w-[85%] h-[85%] rounded-full border border-slate-200" />
              <div className="absolute w-[65%] h-[65%] rounded-full border border-slate-200/80" />
              <div className="absolute w-[45%] h-[45%] rounded-full border border-slate-200/60" />
              <div className="absolute w-[25%] h-[25%] rounded-full bg-gradient-to-br from-blue-start/10 to-[#0EA5E9]/10 border border-blue-start/20" />

              {/* Center globe icon */}
              <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-blue-start to-[#0EA5E9] flex items-center justify-center shadow-lg shadow-blue-start/20">
                <Globe className="w-10 h-10 text-white" />
              </div>

              {/* Region dots on the rings */}
              <motion.div
                className="absolute top-[12%] left-[50%] -translate-x-1/2"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-lg">
                  🇺🇸
                </div>
              </motion.div>
              <motion.div
                className="absolute top-[35%] right-[10%]"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-lg">
                  🇪🇺
                </div>
              </motion.div>
              <motion.div
                className="absolute bottom-[25%] left-[12%]"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-lg">
                  🌍
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Region breakdown */}
          <div className="lg:col-span-2 space-y-4">
            {[
              {
                region: "North America",
                flag: "🇺🇸",
                universities: 2,
                programs: 5,
                description: "Leading institutions in the United States specializing in professional doctoral programs.",
              },
              {
                region: "Europe",
                flag: "🇪🇺",
                universities: 2,
                programs: 4,
                description: "EU-recognized universities offering cross-cultural research and doctoral studies.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.region}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-start/30 hover:shadow-md transition-all duration-500"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{item.flag}</span>
                  <h3 className="text-lg font-heading font-semibold text-slate-900">
                    {item.region}
                  </h3>
                </div>
                <p className="text-slate-500 text-sm mb-4">{item.description}</p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-blue-start" />
                    <span className="text-sm text-slate-600">
                      {item.universities} Universities
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-blue-mid" />
                    <span className="text-sm text-slate-600">
                      {item.programs} Programs
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════
// 3. PARTNER UNIVERSITIES SHOWCASE
// ════════════════════════════════════════════
function UniversitiesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedProgram, setSelectedProgram] = useState("All Programs");

  const filteredUniversities = UNIVERSITIES.filter((uni) => {
    const matchesSearch =
      uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.specializations.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesRegion =
      selectedRegion === "All Regions" || uni.region === selectedRegion;
    const matchesProgram =
      selectedProgram === "All Programs" ||
      (uni.programs as readonly string[]).includes(selectedProgram);
    return matchesSearch && matchesRegion && matchesProgram;
  });

  useGSAP(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll(".showcase-header > *"), {
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="universities"
      className="relative py-20 lg:py-28 overflow-hidden bg-white"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="showcase-header text-center mb-12">
          <span className="inline-block text-sm font-medium text-blue-start uppercase tracking-widest mb-4">
            Our Partners
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-slate-900 mb-5">
            Partner{" "}
            <span className="bg-gradient-to-r from-blue-start to-[#0EA5E9] bg-clip-text text-transparent">
              Universities
            </span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Each institution is carefully selected for its academic standards,
            accreditation status, and commitment to professional education.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 max-w-3xl mx-auto">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search universities, locations, or specializations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-start/40 focus:ring-2 focus:ring-blue-start/10 transition-all duration-300"
            />
          </div>

          {/* Region filter */}
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-600 text-sm focus:outline-none focus:border-blue-start/40 appearance-none cursor-pointer"
          >
            {UNIVERSITY_REGIONS.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>

          {/* Program filter */}
          <select
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-600 text-sm focus:outline-none focus:border-blue-start/40 appearance-none cursor-pointer"
          >
            <option value="All Programs">All Programs</option>
            <option value="Honorary Doctorate">Honorary Doctorate</option>
            <option value="DBA">DBA</option>
            <option value="PhD">PhD</option>
          </select>
        </div>

        {/* Results count */}
        <div className="text-center mb-8">
          <span className="text-sm text-slate-500">
            Showing{" "}
            <span className="text-slate-900 font-medium">
              {filteredUniversities.length}
            </span>{" "}
            {filteredUniversities.length === 1 ? "university" : "universities"}
          </span>
        </div>

        {/* University Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredUniversities.map((uni, i) => (
              <motion.div
                key={uni.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="h-full overflow-hidden rounded-2xl bg-white border border-slate-200 hover:border-blue-start/30 hover:shadow-lg transition-all duration-500">
                  {/* Card header */}
                  <div className="relative p-6 pb-4">
                    {/* Featured badge */}
                    {uni.featured && (
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-start/20">
                        <Star className="w-3 h-3 text-blue-start" />
                        <span className="text-[10px] text-blue-start font-medium uppercase tracking-wider">
                          Featured
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-4 mb-4">
                      {/* University emblem */}
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-slate-200 flex items-center justify-center">
                        <span className="text-3xl">{uni.flag}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-heading font-bold text-slate-900">
                          {uni.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {uni.location}
                          <span className="text-slate-300 mx-1">|</span>
                          <span className="text-slate-500 text-xs">Est. {uni.established}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 text-sm leading-relaxed mb-5">
                      {uni.fullDescription}
                    </p>

                    {/* Accreditation badge */}
                    <div className="flex items-center gap-2 mb-5">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 border border-green-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-xs text-green-700 font-medium">
                          {uni.accreditation}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-slate-200 mx-6" />

                  {/* Programs & Specializations */}
                  <div className="p-6 pt-4">
                    {/* Programs */}
                    <div className="mb-4">
                      <h4 className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-medium">
                        Available Programs
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {uni.programs.map((prog) => (
                          <span
                            key={prog}
                            className="text-xs px-3 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-100"
                          >
                            {prog}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Specializations */}
                    <div className="mb-5">
                      <h4 className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-medium">
                        Specializations
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {uni.specializations.map((spec) => (
                          <span
                            key={spec}
                            className="text-xs px-3 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-100"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button href="/apply" variant="primary" size="sm" className="flex-1">
                        Apply Now
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                      <Button href="/contact" variant="outline" size="sm">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredUniversities.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg mb-2">No universities found</p>
            <p className="text-slate-400 text-sm">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ════════════════════════════════════════════
// 4. FEATURED UNIVERSITIES SPOTLIGHT
// ════════════════════════════════════════════
function FeaturedUniversities() {
  const sectionRef = useRef<HTMLElement>(null);
  const featured = UNIVERSITIES.filter((u) => u.featured);

  useGSAP(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll(".featured-header > *"), {
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-28 overflow-hidden bg-slate-50">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="featured-header text-center mb-14">
          <span className="inline-block text-sm font-medium text-orange uppercase tracking-widest mb-4">
            Spotlight
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-slate-900 mb-5">
            Featured{" "}
            <span className="bg-gradient-to-r from-orange to-coral bg-clip-text text-transparent">
              Institutions
            </span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Our strategic partners leading the way in professional doctoral education.
          </p>
        </div>

        {/* Featured cards - large format */}
        <div className="space-y-8">
          {featured.map((uni, i) => (
            <motion.div
              key={uni.id}
              className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 hover:border-blue-start/30 hover:shadow-lg transition-all duration-700"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              {/* Gradient accent bar */}
              <div className="h-1 bg-gradient-to-r from-blue-start via-[#0EA5E9] to-blue-mid" />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                {/* Left - Institution info */}
                <div className="lg:col-span-2 p-8 lg:p-12">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-slate-200 flex items-center justify-center">
                      <span className="text-4xl">{uni.flag}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-heading font-bold text-slate-900">
                        {uni.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-500">{uni.location}</span>
                        <span className="text-slate-300">|</span>
                        <span className="text-slate-500 text-sm">Founded {uni.established}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-600 leading-relaxed text-base mb-8 max-w-2xl">
                    {uni.fullDescription}
                  </p>

                  {/* Programs offered */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    {uni.programs.map((prog) => (
                      <div
                        key={prog}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 border border-blue-100"
                      >
                        <GraduationCap className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-blue-700 font-medium">{prog}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Button href="/apply" size="md">
                      Apply to {uni.name}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button href="/contact" variant="ghost" size="md">
                      Request Information
                    </Button>
                  </div>
                </div>

                {/* Right - Stats & accreditation */}
                <div className="p-8 lg:p-12 lg:border-l border-t lg:border-t-0 border-slate-200 bg-slate-50/50">
                  <h4 className="text-xs text-slate-500 uppercase tracking-wider mb-6 font-medium">
                    Institution Details
                  </h4>

                  <div className="space-y-5">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Accreditation</div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-slate-900 text-sm font-medium">
                          {uni.accreditation}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-slate-500 mb-1">Region</div>
                      <span className="text-slate-900 text-sm">{uni.region}</span>
                    </div>

                    <div>
                      <div className="text-xs text-slate-500 mb-1">Established</div>
                      <span className="text-slate-900 text-sm">{uni.established}</span>
                    </div>

                    <div>
                      <div className="text-xs text-slate-500 mb-2">Specializations</div>
                      <div className="flex flex-wrap gap-1.5">
                        {uni.specializations.map((spec) => (
                          <span
                            key={spec}
                            className="text-[10px] px-2 py-1 rounded-md bg-purple-50 text-purple-700"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════
// 5. ACADEMIC COLLABORATION MODEL
// ════════════════════════════════════════════
function CollaborationModel() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll(".collab-header > *"), {
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
    });

    gsap.from(sectionRef.current.querySelectorAll(".collab-card"), {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current.querySelector(".collab-grid"),
        start: "top 85%",
        once: true,
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-28 overflow-hidden bg-white">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="collab-header text-center mb-14">
          <span className="inline-block text-sm font-medium text-purple uppercase tracking-widest mb-4">
            How We Work Together
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-slate-900 mb-5">
            Academic{" "}
            <span className="bg-gradient-to-r from-purple to-blue-mid bg-clip-text text-transparent">
              Collaboration
            </span>{" "}
            Model
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Our partnerships are built on shared commitment to academic integrity,
            professional development, and global impact.
          </p>
        </div>

        {/* Collaboration cards */}
        <div className="collab-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COLLABORATION_MODEL.map((item, i) => {
            const Icon = ICON_MAP[item.icon] || FlaskConical;
            return (
              <div
                key={item.title}
                className="collab-card group relative p-6 rounded-2xl bg-white border border-slate-200 hover:border-purple/30 hover:shadow-md transition-all duration-500 hover:-translate-y-1"
              >
                {/* Step number */}
                <div className="absolute top-4 right-4 text-xs text-slate-300 font-heading font-bold">
                  0{i + 1}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple/10 to-blue-start/10 border border-slate-200 flex items-center justify-center mb-5 group-hover:shadow-md transition-shadow duration-500">
                  <Icon className="w-5 h-5 text-purple" />
                </div>

                <h3 className="text-base font-heading font-semibold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Bottom gradient line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple to-blue-mid opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl" />
              </div>
            );
          })}
        </div>

        {/* Visual connector */}
        <div className="hidden lg:flex items-center justify-center mt-12">
          <div className="flex items-center gap-3">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-purple/40" />
            <div className="px-5 py-2.5 rounded-full bg-slate-50 border border-slate-200">
              <span className="text-sm text-slate-500">
                All degrees conferred directly by{" "}
                <span className="text-slate-900 font-medium">partner universities</span>
              </span>
            </div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-purple/40" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════
// 6. ACCREDITATION & RECOGNITION
// ════════════════════════════════════════════
function AccreditationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll(".accred-header > *"), {
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-28 overflow-hidden bg-slate-50">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="accred-header text-center mb-14">
          <span className="inline-block text-sm font-medium text-blue-start uppercase tracking-widest mb-4">
            Trust & Recognition
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-slate-900 mb-5">
            Accreditation &{" "}
            <span className="bg-gradient-to-r from-[#0EA5E9] to-blue-mid bg-clip-text text-transparent">
              Recognition
            </span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Every partner university meets rigorous accreditation standards,
            ensuring your credentials are recognized worldwide.
          </p>
        </div>

        {/* Accreditation badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {ACCREDITATIONS.map((accred, i) => (
            <motion.div
              key={accred.name}
              className="relative p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-start/30 hover:shadow-md transition-all duration-500 text-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Badge icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-slate-200 flex items-center justify-center mx-auto mb-4 group-hover:shadow-md transition-shadow duration-500">
                <Shield className="w-6 h-6 text-blue-start" />
              </div>
              <h3 className="text-sm font-heading font-semibold text-slate-900 mb-2">
                {accred.name}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-3">
                {accred.description}
              </p>
              <span className="inline-block text-[10px] px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                {accred.region}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Trust statement */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <Shield className="w-8 h-8 text-blue-start mx-auto mb-4" />
            <p className="text-slate-600 leading-relaxed">
              Techversity.ai works exclusively with universities that hold{" "}
              <span className="text-slate-900 font-medium">recognized accreditation</span>.
              We verify accreditation status regularly and maintain transparent relationships
              with all partner institutions. All academic decisions, including admissions and
              degree conferral, are made{" "}
              <span className="text-slate-900 font-medium">exclusively by the university</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════
// 7. STUDENT IMPACT & GLOBAL REACH
// ════════════════════════════════════════════
function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll(".impact-header > *"), {
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-28 overflow-hidden bg-white">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="impact-header text-center mb-14">
          <span className="inline-block text-sm font-medium text-blue-mid uppercase tracking-widest mb-4">
            Our Impact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-slate-900 mb-5">
            Global Reach &{" "}
            <span className="bg-gradient-to-r from-blue-start to-[#0EA5E9] bg-clip-text text-transparent">
              Student Impact
            </span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Numbers that reflect our commitment to connecting professionals
            with world-class academic opportunities.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {IMPACT_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-start/30 hover:shadow-md transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-2">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.label === "Satisfaction Score" ? 1 : 0}
                />
              </div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest leading-tight">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════
// 8. BECOME A PARTNER UNIVERSITY
// ════════════════════════════════════════════
function PartnerSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll(".partner-content > *"), {
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
      },
    });
  }, []);

  const benefits = [
    { title: "Global Student Pipeline", description: "Access accomplished professionals from 12+ countries seeking doctoral programs" },
    { title: "End-to-End Admissions Support", description: "We handle candidate screening, documentation, and enrollment logistics" },
    { title: "Brand Visibility", description: "Showcase your institution to a premium audience of senior professionals" },
    { title: "Quality Candidates", description: "Pre-qualified applicants with verified professional achievements" },
    { title: "Flexible Partnership Models", description: "Customizable collaboration structures that align with your institutional goals" },
    { title: "Marketing & Outreach", description: "Co-branded campaigns and digital presence across our platform" },
  ];

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-28 overflow-hidden bg-slate-50">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <div className="partner-content">
            <span className="inline-block text-sm font-medium text-orange uppercase tracking-widest mb-4">
              For Institutions
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-slate-900 mb-6">
              Become a{" "}
              <span className="bg-gradient-to-r from-orange to-coral bg-clip-text text-transparent">
                Partner University
              </span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Join our growing network of accredited institutions and connect
              with accomplished professionals seeking academic recognition.
              We bring the candidates — you provide the excellence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange to-coral rounded-xl opacity-30 blur-md group-hover:opacity-60 transition-opacity duration-500" />
                <Button href="/contact" size="lg" className="relative bg-gradient-to-r from-orange to-coral">
                  Partner With Us
                  <Handshake className="w-5 h-5" />
                </Button>
              </div>
              <Button href="/contact" variant="outline" size="lg">
                Request Partnership Info
              </Button>
            </div>
          </div>

          {/* Right - Benefits grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                className="p-5 rounded-xl bg-white border border-slate-200 hover:border-orange/30 hover:shadow-md transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-4 h-4 text-orange" />
                </div>
                <h3 className="text-sm font-heading font-semibold text-slate-900 mb-1.5">
                  {benefit.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════
// 9. FINAL CTA SECTION
// ════════════════════════════════════════════
function FinalCTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll(".final-cta-content > *"), {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Dark contrast background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-start/20" />

      {/* Content */}
      <div className="final-cta-content relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
          Your Next Chapter Starts{" "}
          <span className="bg-gradient-to-r from-blue-start via-[#0EA5E9] to-coral bg-[length:200%_auto] bg-clip-text text-transparent shimmer-text">
            Here
          </span>
        </h2>

        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Connect with our partner universities and take the first step toward
          earning the academic recognition your career deserves.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button href="/apply" size="lg" className="!bg-white !text-slate-900 hover:!bg-slate-100">
            Start Your Application
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button href="/programs" variant="outline" size="lg" className="!border-white/30 !text-white hover:!bg-white/10">
            Explore Programs
          </Button>
          <Button href="/contact" variant="ghost" size="lg" className="!text-white/80 hover:!text-white hover:!bg-white/10">
            Schedule a Free Consultation
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#0EA5E9]" />
            <span>
              <strong className="text-white">100%</strong> Accredited Partners
            </span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-orange" />
            <span>
              Rated <strong className="text-white">4.8/5</strong> by clients
            </span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-mid" />
            <span>
              <strong className="text-white">12+</strong> Countries Served
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════
// DISCLAIMER
// ════════════════════════════════════════════
function Disclaimer() {
  return (
    <section className="py-12 border-t border-slate-200 bg-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-xs text-slate-400 leading-relaxed">
          Techversity.ai is an admissions advisory service. We facilitate
          connections between candidates and accredited universities but do
          not directly grant degrees. All academic decisions, including
          admissions and degree conferral, are made exclusively by the
          respective university. University partnerships and program
          availability may change. Please contact us for the most current
          information.
        </p>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════
// PAGE COMPONENT
// ════════════════════════════════════════════
export default function UniversitiesPage() {
  return (
    <>
      <div className="main-content">
        <Navbar />
        <main>
          <HeroSection />
          <GlobalNetworkSection />
          <UniversitiesShowcase />
          <FeaturedUniversities />
          <CollaborationModel />
          <AccreditationSection />
          <ImpactSection />
          <PartnerSection />
          <FinalCTASection />
          <Disclaimer />
        </main>
      </div>
      <PreFooter />
      <Footer />
    </>
  );
}
