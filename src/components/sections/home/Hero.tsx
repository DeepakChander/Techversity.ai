"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";

const STATS = [
  { value: "12+", label: "Countries" },
  { value: "4", label: "Partner Universities" },
  { value: "4.8/5", label: "Client Satisfaction" },
];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scrollOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scrollY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-[#0d1235] to-bg-primary" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(26,109,255,0.08)_0%,transparent_70%)]" />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.07]"
          style={{
            background: "radial-gradient(circle, #1a6dff 0%, transparent 70%)",
            top: "10%",
            left: "15%",
            filter: "blur(80px)",
            animation: "aurora-1 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, #00e5ff 0%, transparent 70%)",
            top: "20%",
            right: "10%",
            filter: "blur(80px)",
            animation: "aurora-2 25s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full opacity-[0.04]"
          style={{
            background: "radial-gradient(circle, #7b2ff7 0%, transparent 70%)",
            bottom: "20%",
            left: "40%",
            filter: "blur(80px)",
            animation: "aurora-3 18s ease-in-out infinite",
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24"
        style={{ opacity: scrollOpacity, y: scrollY }}
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
          <span className="text-xs text-text-muted font-medium tracking-wide uppercase">
            Premier Admissions Advisory
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-text-primary leading-[1.1] tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Your Achievement Deserves{" "}
          <span className="bg-gradient-to-r from-blue-start via-cyan to-blue-mid bg-clip-text text-transparent">
            Academic Recognition
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          We connect accomplished professionals with accredited universities for
          Honorary Doctorates, DBAs, and PhDs — turning career excellence into
          academic credentials.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <Button href="/apply" size="lg">
            Start Your Journey
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button href="/programs" variant="outline" size="lg">
            Explore Programs
          </Button>
          <Button href="/contact" variant="ghost" size="lg">
            <Play className="w-4 h-4" />
            Book a Free Call
          </Button>
        </motion.div>

        {/* Trust stats */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-3">
              {i > 0 && (
                <div className="w-px h-8 bg-white/10 -ml-4 sm:-ml-6 mr-4 sm:mr-6 hidden sm:block" />
              )}
              <div className="text-center sm:text-left">
                <div className="text-2xl font-heading font-bold text-cyan">
                  {stat.value}
                </div>
                <div className="text-xs text-text-muted uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        style={{ opacity: scrollOpacity }}
      >
        <span className="text-xs text-text-muted tracking-widest uppercase">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
