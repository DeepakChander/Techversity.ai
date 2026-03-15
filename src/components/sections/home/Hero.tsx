"use client";

import { useRef, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import dynamic from "next/dynamic";

const NetworkSphereCanvas = dynamic(
  () =>
    import("@/components/three/NetworkSphere").then(
      (mod) => mod.NetworkSphereCanvas
    ),
  { ssr: false }
);

/* ════════════════════════════════════════════
   HERO — Premium, restrained, purposeful
   ════════════════════════════════════════════ */
export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scrollY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 bg-[#050816]" />

      {/* Single radial gradient — restrained */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(26,109,255,0.07)_0%,transparent_55%)]" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
        aria-hidden="true"
      />

      {/* ── 3D NETWORK SPHERE ── */}
      <Suspense fallback={null}>
        <NetworkSphereCanvas />
      </Suspense>

      {/* ── CONTENT ── */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-28 lg:pt-36"
        style={{ opacity: scrollOpacity, y: scrollY }}
      >
        {/* Eyebrow badge */}
        <motion.div
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.07] mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-cyan" style={{ animation: "pulse-glow 2s ease-in-out infinite" }} />
          <span className="text-xs text-text-muted tracking-wide font-medium">
            Premier Admissions Advisory
          </span>
        </motion.div>

        {/* Headline — fluid typography */}
        <motion.h1
          className="hero-headline font-heading font-bold text-text-primary leading-[1.04] tracking-[-0.03em] mb-7"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.4,
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Where Achievement Meets
          <br />
          <span className="bg-gradient-to-r from-blue-start via-cyan to-blue-mid bg-clip-text text-transparent">
            Academic Recognition
          </span>
        </motion.h1>

        {/* Thin gradient divider */}
        <motion.div
          className="mx-auto w-16 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent mb-7"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        />

        {/* Subtitle */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-text-secondary/80 max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          We connect accomplished professionals with{" "}
          <span className="text-text-primary font-medium">
            accredited universities
          </span>{" "}
          for Honorary Doctorates, DBAs, and PhDs — transforming career
          excellence into academic credentials.
        </motion.p>

        {/* CTAs — two only */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-start to-cyan rounded-xl opacity-25 blur-lg group-hover:opacity-45 transition-opacity duration-500" />
            <Button href="/apply" size="lg" className="relative">
              Begin Your Journey
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
          <Button href="/programs" variant="outline" size="lg">
            Explore Programs
          </Button>
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
        <span className="text-[10px] text-text-muted/60 uppercase tracking-[0.2em]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-text-muted/40" />
        </motion.div>
      </motion.div>

      {/* ── BOTTOM FADE ── */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg-primary to-transparent z-[5]" />
    </section>
  );
}
