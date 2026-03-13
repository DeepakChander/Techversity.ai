"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";

/* ─── animated counter ─── */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1800;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ─── floating shape ─── */

function FloatingShape({
  className,
  depth,
  mouseX,
  mouseY,
  delay = 0,
}: {
  className: string;
  depth: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  delay?: number;
}) {
  const x = useTransform(mouseX, (v: number) => v * depth * 0.02);
  const y = useTransform(mouseY, (v: number) => v * depth * 0.02);
  const springX = useSpring(x, { damping: 30, stiffness: 100 });
  const springY = useSpring(y, { damping: 30, stiffness: 100 });

  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay + 0.8, duration: 1, ease: "easeOut" }}
    >
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{
          duration: 4 + depth,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
      />
    </motion.div>
  );
}

/* ─── word reveal ─── */
const wordVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.6 + i * 0.1,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

/* ─── stats data ─── */
const STATS = [
  { value: 12, suffix: "+", label: "Countries" },
  { value: 4, suffix: "", label: "Partner Universities" },
  { value: 98, suffix: "%", label: "Acceptance Rate" },
  { value: 4, suffix: ".8/5", label: "Client Satisfaction" },
];

/* ════════════════════════════════════════════
   HERO COMPONENT
   ════════════════════════════════════════════ */
export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  /* scroll parallax */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scrollY = useTransform(scrollYProgress, [0, 0.6], [0, -120]);

  /* mouse tracking */
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set(e.clientX - cx);
      mouseY.set(e.clientY - cy);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  /* parallax on background orbs */
  const orbX1 = useTransform(mouseX, (v: number) => v * 0.03);
  const orbY1 = useTransform(mouseY, (v: number) => v * 0.03);
  const orbX2 = useTransform(mouseX, (v: number) => v * -0.02);
  const orbY2 = useTransform(mouseY, (v: number) => v * -0.02);
  const orbX3 = useTransform(mouseX, (v: number) => v * 0.015);
  const orbY3 = useTransform(mouseY, (v: number) => v * 0.015);

  const springOrb1X = useSpring(orbX1, { damping: 40, stiffness: 80 });
  const springOrb1Y = useSpring(orbY1, { damping: 40, stiffness: 80 });
  const springOrb2X = useSpring(orbX2, { damping: 40, stiffness: 80 });
  const springOrb2Y = useSpring(orbY2, { damping: 40, stiffness: 80 });
  const springOrb3X = useSpring(orbX3, { damping: 40, stiffness: 80 });
  const springOrb3Y = useSpring(orbY3, { damping: 40, stiffness: 80 });

  /* headline words */
  const headlineWords = ["Your", "Achievement", "Deserves"];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 bg-[#060918]" />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(26,109,255,0.12)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(0,229,255,0.06)_0%,transparent_50%)]" />

      {/* Aurora orbs with mouse parallax */}
      <motion.div
        className="absolute w-[700px] h-[500px] rounded-full opacity-[0.12]"
        style={{
          background:
            "radial-gradient(ellipse, #1a6dff 0%, transparent 70%)",
          top: "5%",
          left: "5%",
          filter: "blur(100px)",
          x: springOrb1X,
          y: springOrb1Y,
        }}
      />
      <motion.div
        className="absolute w-[600px] h-[450px] rounded-full opacity-[0.08]"
        style={{
          background:
            "radial-gradient(ellipse, #00e5ff 0%, transparent 70%)",
          top: "15%",
          right: "0%",
          filter: "blur(100px)",
          x: springOrb2X,
          y: springOrb2Y,
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[400px] rounded-full opacity-[0.06]"
        style={{
          background:
            "radial-gradient(ellipse, #7b2ff7 0%, transparent 70%)",
          bottom: "10%",
          left: "25%",
          filter: "blur(100px)",
          x: springOrb3X,
          y: springOrb3Y,
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ── FLOATING SHAPES ── */}
      {/* ring */}
      <FloatingShape
        className="top-[15%] left-[8%] w-20 h-20 rounded-full border border-cyan/10"
        depth={3}
        mouseX={mouseX}
        mouseY={mouseY}
        delay={0}
      />
      {/* filled dot */}
      <FloatingShape
        className="top-[20%] right-[12%] w-3 h-3 rounded-full bg-blue-start/30"
        depth={5}
        mouseX={mouseX}
        mouseY={mouseY}
        delay={0.3}
      />
      {/* gradient ring */}
      <FloatingShape
        className="bottom-[25%] left-[12%] w-14 h-14 rounded-full border border-purple/15"
        depth={2}
        mouseX={mouseX}
        mouseY={mouseY}
        delay={0.6}
      />
      {/* small dot */}
      <FloatingShape
        className="bottom-[30%] right-[8%] w-2 h-2 rounded-full bg-cyan/20"
        depth={4}
        mouseX={mouseX}
        mouseY={mouseY}
        delay={0.2}
      />
      {/* hexagon-ish */}
      <FloatingShape
        className="top-[60%] left-[5%] w-10 h-10 rotate-45 border border-blue-start/10 rounded-lg"
        depth={2.5}
        mouseX={mouseX}
        mouseY={mouseY}
        delay={0.4}
      />
      {/* accent dot */}
      <FloatingShape
        className="top-[40%] right-[5%] w-4 h-4 rounded-full bg-coral/15"
        depth={6}
        mouseX={mouseX}
        mouseY={mouseY}
        delay={0.1}
      />

      {/* ── CONTENT ── */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32 lg:pt-40"
        style={{ opacity: scrollOpacity, y: scrollY }}
      >
        {/* Headline - word by word reveal */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-heading font-bold text-text-primary leading-[1.08] tracking-tight mb-3">
          {headlineWords.map((word, i) => (
            <motion.span
              key={word}
              className="inline-block mr-[0.25em]"
              custom={i}
              initial="hidden"
              animate="visible"
              variants={wordVariants}
            >
              {word}
            </motion.span>
          ))}
          <br className="hidden sm:block" />
          <motion.span
            className="inline-block bg-gradient-to-r from-blue-start via-cyan to-blue-mid bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: 0.9,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Academic Recognition
          </motion.span>
        </h1>

        {/* Divider line */}
        <motion.div
          className="mx-auto w-16 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent my-7"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        />

        {/* Subtitle */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-text-secondary/90 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
        >
          We connect accomplished professionals with{" "}
          <span className="text-text-primary font-medium">accredited universities</span>{" "}
          for Honorary Doctorates, DBAs, and PhDs — turning career excellence
          into academic credentials.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          {/* Primary CTA with animated glow */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-start via-cyan to-blue-mid rounded-xl opacity-40 blur-md group-hover:opacity-70 transition-opacity duration-500" />
            <Button href="/apply" size="lg" className="relative">
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
          <Button href="/programs" variant="outline" size="lg">
            Explore Programs
          </Button>
          <Button href="/contact" variant="ghost" size="lg">
            <Play className="w-4 h-4" />
            Book a Free Call
          </Button>
        </motion.div>

        {/* Trust stats bar */}
        <motion.div
          className="inline-flex flex-wrap items-center justify-center gap-6 sm:gap-0 px-8 py-5 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.7 }}
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              {i > 0 && (
                <div className="hidden sm:block w-px h-10 bg-white/[0.08] mx-7" />
              )}
              <div className="text-center px-2">
                <div className="text-2xl sm:text-3xl font-heading font-bold text-text-primary leading-none">
                  <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </span>
                </div>
                <div className="text-[11px] text-text-muted uppercase tracking-widest mt-1.5">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>


      {/* ── BOTTOM GRADIENT FADE ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent z-[5]" />
    </section>
  );
}
