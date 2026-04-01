"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Star, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EASE } from "@/lib/animations";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scrollY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white" />

      {/* Decorative gradient orbs */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute w-[700px] h-[700px] rounded-full opacity-[0.15]"
          style={{
            background: "radial-gradient(circle, #3A82FF 0%, transparent 70%)",
            top: "-10%",
            right: "-10%",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.1]"
          style={{
            background: "radial-gradient(circle, #0EA5E9 0%, transparent 70%)",
            bottom: "0%",
            left: "-5%",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.08]"
          style={{
            background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
            top: "40%",
            left: "50%",
            filter: "blur(100px)",
          }}
        />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      {/* ── CONTENT ── */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-28 lg:pt-36"
        style={{ opacity: scrollOpacity, y: scrollY }}
      >
        {/* Eyebrow badge */}
        <motion.div
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: EASE.default }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-blue-start animate-pulse" />
          <span className="text-xs text-blue-start tracking-wide font-medium">
            Premier Admissions Advisory
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-heading font-bold text-slate-900 leading-[1.04] tracking-[-0.03em] mb-7"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: EASE.default }}
        >
          Where Achievement Meets
          <br />
          <span className="bg-gradient-to-r from-blue-start via-cyan to-purple bg-clip-text text-transparent">
            Academic Recognition
          </span>
        </motion.h1>

        {/* Thin gradient divider */}
        <motion.div
          className="mx-auto w-20 h-px bg-gradient-to-r from-transparent via-blue-start/30 to-transparent mb-7"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        />

        {/* Subtitle */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          We connect accomplished professionals with{" "}
          <span className="text-slate-900 font-medium">
            accredited universities
          </span>{" "}
          for Honorary Doctorates, DBAs, and PhDs — transforming career
          excellence into academic credentials.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-start to-cyan rounded-xl opacity-20 blur-lg group-hover:opacity-35 transition-opacity duration-500" />
            <Button href="/apply" size="lg" className="relative">
              Begin Your Journey
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
          <Button href="/programs" variant="outline" size="lg">
            Explore Programs
          </Button>
        </motion.div>

        {/* Trust counters inline */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm text-slate-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500" />
            <span>
              Rated <strong className="text-slate-900">4.8/5</strong>
            </span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-300 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald" />
            <span>
              <strong className="text-slate-900">100%</strong> Accredited
            </span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-300 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-start" />
            <span>
              Response in <strong className="text-slate-900">4 hours</strong>
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.12], [1, 0]) }}
      >
        <span className="text-[10px] text-slate-400 uppercase tracking-[0.2em]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </motion.div>
      </motion.div>

      {/* ── BOTTOM FADE ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-[5]" />
    </section>
  );
}
