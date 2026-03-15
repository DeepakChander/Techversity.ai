"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FileText,
  Users,
  Building2,
  CheckCircle2,
  Trophy,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { useGSAP, gsap, ScrollTrigger } from "@/hooks/useGSAP";

const STEP_IMAGES = [
  "/images/how-it-works/step-01.png",
  "/images/how-it-works/step-02.png",
  "/images/how-it-works/step-03.png",
  "/images/how-it-works/step-04.png",
  "/images/how-it-works/step-05.png",
];

const STEP_COLORS = [
  "#1a6dff",
  "#00b4ff",
  "#00e5ff",
  "#7b2ff7",
  "#ff6b6b",
];

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Building2: <Building2 className="w-6 h-6" />,
  CheckCircle2: <CheckCircle2 className="w-6 h-6" />,
  Trophy: <Trophy className="w-6 h-6" />,
};

/* ─── Animated 3D Floating Shapes (per panel) ─── */
function FloatingShapes({ color, index }: { color: string; index: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Rotating ring */}
      <motion.div
        className="absolute -top-20 -right-20 w-[350px] h-[350px] rounded-full border opacity-[0.04]"
        style={{ borderColor: color, borderWidth: "1.5px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 50 + index * 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Counter-rotating ring */}
      <motion.div
        className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full border opacity-[0.03]"
        style={{ borderColor: color, borderWidth: "1px" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating diamond */}
      <motion.div
        className="absolute top-[18%] right-[12%] w-6 h-6 opacity-[0.08]"
        style={{ background: color, borderRadius: "3px", transform: "rotate(45deg)" }}
        animate={{ y: [-15, 15, -15], rotate: [45, 90, 45] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating circles */}
      <motion.div
        className="absolute bottom-[25%] right-[18%] w-4 h-4 rounded-full opacity-[0.1]"
        style={{ background: color }}
        animate={{ y: [8, -12, 8], x: [-4, 8, -4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[45%] left-[8%] w-3 h-3 rounded-full opacity-[0.12]"
        style={{ background: color }}
        animate={{ y: [-8, 12, -8], scale: [1, 1.4, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Triangle */}
      <motion.div
        className="absolute top-[65%] right-[8%] opacity-[0.05]"
        animate={{ y: [0, -16, 0], rotate: [0, 120, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="36" height="36" viewBox="0 0 40 40">
          <polygon points="20,4 36,36 4,36" fill="none" stroke={color} strokeWidth="1.5" />
        </svg>
      </motion.div>

      {/* Hexagon */}
      <motion.div
        className="absolute bottom-[40%] left-[6%] opacity-[0.04]"
        animate={{ rotate: [0, 60, 0], y: [0, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="50" height="50" viewBox="0 0 60 60">
          <polygon points="30,2 56,17 56,43 30,58 4,43 4,17" fill="none" stroke={color} strokeWidth="1.5" />
        </svg>
      </motion.div>

      {/* Plus signs */}
      {[
        { top: "20%", left: "88%", delay: 0 },
        { top: "75%", left: "5%", delay: 1.5 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute opacity-[0.06]"
          style={{ top: pos.top, left: pos.left }}
          animate={{ y: [-6, 6, -6], rotate: [0, 90, 0], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: pos.delay }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16">
            <line x1="8" y1="2" x2="8" y2="14" stroke={color} strokeWidth="1.5" />
            <line x1="2" y1="8" x2="14" y2="8" stroke={color} strokeWidth="1.5" />
          </svg>
        </motion.div>
      ))}

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
        style={{ background: `radial-gradient(circle, ${color}06 0%, transparent 70%)` }}
      />
    </div>
  );
}

/* ════════════════════════════════════════════
   HOW IT WORKS — GSAP Horizontal Scroll + Images + 3D BG
   ════════════════════════════════════════════ */
export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // GSAP horizontal scroll (desktop only)
  useGSAP(() => {
    if (!sectionRef.current || !trackRef.current || isMobile) return;

    const track = trackRef.current;
    const panels = track.querySelectorAll(".hw-panel");
    const totalWidth = panels.length * window.innerWidth;

    gsap.to(track, {
      x: -(totalWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${totalWidth}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(
            Math.floor(self.progress * panels.length),
            panels.length - 1
          );
          setActiveIndex(idx);
        },
      },
    });

    // Animate each panel's content
    panels.forEach((panel) => {
      const content = panel.querySelector(".hw-content");
      const img = panel.querySelector(".hw-image");

      if (content) {
        gsap.from(content.children, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: gsap.getTweensOf(track)[0] as gsap.core.Tween,
            start: "left 80%",
            end: "left 20%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (img) {
        gsap.from(img, {
          x: 80,
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: gsap.getTweensOf(track)[0] as gsap.core.Tween,
            start: "left 75%",
            end: "left 25%",
            toggleActions: "play none none reverse",
          },
        });
      }
    });

    // Progress bar
    const progressBar = sectionRef.current.querySelector(".hw-progress-fill");
    if (progressBar) {
      gsap.to(progressBar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalWidth}`,
          scrub: 1,
        },
      });
    }
  }, [isMobile]);

  /* ─── Mobile: Interactive carousel (no horizontal scroll) ─── */
  if (isMobile) {
    return (
      <section className="relative py-20 overflow-hidden" id="how-it-works">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-[#0b1030] to-bg-primary" />
        <FloatingShapes color={STEP_COLORS[activeIndex]} index={activeIndex} />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] mb-5">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: STEP_COLORS[activeIndex] }} />
              <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-text-muted">How It Works</span>
            </div>
            <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">
              Five Steps to Your{" "}
              <span className="bg-gradient-to-r from-blue-start to-cyan bg-clip-text text-transparent">
                Doctoral Journey
              </span>
            </h2>
          </div>

          {/* Mobile step cards */}
          <div className="space-y-6">
            {HOW_IT_WORKS_STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                {/* Image */}
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4">
                  <Image
                    src={STEP_IMAGES[i]}
                    alt={step.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg backdrop-blur-xl bg-black/30 border border-white/10">
                    <span className="text-xs font-medium" style={{ color: STEP_COLORS[i] }}>
                      Step {String(step.number).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-heading font-bold text-sm"
                      style={{ backgroundColor: STEP_COLORS[i] }}
                    >
                      {String(step.number).padStart(2, "0")}
                    </div>
                    {i < HOW_IT_WORKS_STEPS.length - 1 && (
                      <div className="flex-1 w-px bg-gradient-to-b from-white/10 to-transparent min-h-[20px] mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <div style={{ color: STEP_COLORS[i] }}>{iconMap[step.icon]}</div>
                      <h3 className="text-lg font-heading font-bold text-text-primary">{step.title}</h3>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button href="/apply" variant="outline" size="md">
              Start Your Journey <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>
    );
  }

  /* ─── Desktop: GSAP Horizontal Scroll ─── */
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      id="how-it-works"
    >
      {/* Horizontal scroll track */}
      <div ref={trackRef} className="flex flex-nowrap will-change-transform">
        {HOW_IT_WORKS_STEPS.map((step, i) => (
          <div
            key={step.number}
            className="hw-panel flex-shrink-0 w-screen h-screen flex items-center justify-center relative"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-[#0b1030] to-bg-primary" />

            {/* 3D Floating shapes per panel */}
            <FloatingShapes color={STEP_COLORS[i]} index={i} />

            {/* Background accent glow */}
            <div
              className="absolute inset-0 opacity-[0.05] transition-colors duration-700"
              style={{
                background: `radial-gradient(ellipse at ${40 + i * 8}% ${35 + i * 5}%, ${STEP_COLORS[i]} 0%, transparent 55%)`,
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16">
              {/* Section header only on first panel */}
              {i === 0 && (
                <div className="absolute top-[10vh] left-8 lg:left-16">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] mb-4">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: STEP_COLORS[0] }} />
                    <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-text-muted">How It Works</span>
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-heading font-bold text-text-primary">
                    Five Steps to Your{" "}
                    <span className="bg-gradient-to-r from-blue-start to-cyan bg-clip-text text-transparent">
                      Doctoral Journey
                    </span>
                  </h2>
                </div>
              )}

              {/* Main content grid */}
              <div className="grid grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Left — Content */}
                <div className="hw-content">
                  {/* Large step number */}
                  <div className="mb-4">
                    <span
                      className="text-[100px] lg:text-[140px] font-heading font-bold leading-none"
                      style={{
                        WebkitTextStroke: `2px ${STEP_COLORS[i]}20`,
                        color: "transparent",
                      }}
                    >
                      {String(step.number).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Icon + Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: `${STEP_COLORS[i]}15`,
                        border: `1px solid ${STEP_COLORS[i]}25`,
                      }}
                    >
                      <div style={{ color: STEP_COLORS[i] }}>{iconMap[step.icon]}</div>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary">
                      {step.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-text-secondary text-lg leading-relaxed max-w-md mb-6">
                    {step.description}
                  </p>

                  {/* Step dots */}
                  <div className="flex items-center gap-3">
                    {HOW_IT_WORKS_STEPS.map((_, j) => (
                      <div
                        key={j}
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: j <= i ? "24px" : "8px",
                          backgroundColor: j <= i ? STEP_COLORS[j] : "rgba(255,255,255,0.12)",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Right — Image */}
                <div className="hw-image relative">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    {/* Glow behind image */}
                    <div
                      className="absolute -inset-6 rounded-3xl opacity-15 blur-2xl"
                      style={{ backgroundColor: STEP_COLORS[i] }}
                    />
                    <Image
                      src={STEP_IMAGES[i]}
                      alt={step.title}
                      fill
                      className="object-cover rounded-2xl relative z-10"
                      sizes="50vw"
                      priority={i === 0}
                    />
                    {/* Bottom gradient */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-bg-primary/30 via-transparent to-transparent z-10" />
                    {/* Border */}
                    <div
                      className="absolute inset-0 rounded-2xl border z-20"
                      style={{ borderColor: `${STEP_COLORS[i]}20` }}
                    />
                    {/* Step badge */}
                    <div
                      className="absolute bottom-4 left-4 z-20 px-3 py-1.5 rounded-lg backdrop-blur-xl border border-white/10"
                      style={{ backgroundColor: `${STEP_COLORS[i]}20` }}
                    >
                      <span className="text-xs font-medium" style={{ color: STEP_COLORS[i] }}>
                        Step {String(step.number).padStart(2, "0")} / 05
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar pinned at bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-white/[0.04] z-30 pointer-events-none">
        <div
          className="hw-progress-fill h-full bg-gradient-to-r from-blue-start via-cyan to-coral origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </section>
  );
}
