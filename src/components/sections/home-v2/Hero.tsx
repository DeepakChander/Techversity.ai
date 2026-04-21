"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import { IndexNumeral } from "@/components/ui/IndexNumeral";
import { ButtonV2 } from "@/components/ui/ButtonV2";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

/**
 * Hero — "The Seal"
 * Left 60%: editorial typography (mono kicker, serif H1, italic sub, CTA row)
 * Right 40%: an animated SVG conferment seal — concentric rings, gold core,
 *            rotates at 0.04rad/s, scroll-driven opacity fade.
 *
 * Motion:
 *   - H1 words rise from 105% via SplitText on mount.
 *   - Sub fades up 0.9s in with editorial ease.
 *   - Seal dissolves outward as scroll progresses past the hero.
 *   - The 3D WebGL seal upgrade is deferred to Phase 7 polish.
 */
export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sealRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const headline = headlineRef.current;
      if (headline && !prefersReduced) {
        const split = new SplitText(headline, { type: "words" });
        gsap.set(split.words, { yPercent: 110, opacity: 0 });
        gsap.to(split.words, {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.055,
          ease: "power3.out",
          delay: 0.15,
        });
      }

      const seal = sealRef.current;
      if (seal && !prefersReduced) {
        gsap.to(seal, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
          opacity: 0,
          scale: 1.4,
          rotate: 180,
          ease: "none",
        });
      }
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] lg:min-h-screen bg-[var(--color-canvas-ivory)] flex items-center overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto w-full px-8 lg:px-14 pt-32 pb-16 lg:pt-36 lg:pb-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* ─── Left: editorial typography ─── */}
          <div className="lg:col-span-7 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <IndexNumeral index="EST. 2019" label="Advisory" />
            </motion.div>

            <div className="mt-8 overflow-hidden">
              <h1
                ref={headlineRef}
                className="type-display text-[var(--color-ink-primary)] leading-[0.92]"
                style={{ fontSize: "clamp(3.5rem, 9vw, 8.25rem)" }}
              >
                The record a life&rsquo;s work earns.
              </h1>
            </div>

            <motion.p
              className="type-ui text-[var(--color-ink-muted)] max-w-[48ch] mt-10 text-[18px] leading-[1.55]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Techversity introduces accomplished professionals to the universities that recognise them — for Honorary Doctorates, DBAs, and PhDs.
            </motion.p>

            <motion.div
              className="mt-12 flex flex-wrap items-center gap-5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ButtonV2
                href="/apply"
                variant="heritage"
                size="md"
                showArrow
                data-cursor-label="apply"
              >
                Begin the conversation
              </ButtonV2>
              <ButtonV2
                href="/programs"
                variant="quiet"
                size="md"
                showArrow
              >
                Explore programmes
              </ButtonV2>
            </motion.div>
          </div>

          {/* ─── Right: conferment seal ─── */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Seal ref={sealRef} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ─── Scroll hint ─── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="type-mono-meta text-[var(--color-ink-muted)]">SCROLL</span>
        <motion.span
          className="block w-px h-10 bg-[var(--color-ink-muted)] origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

/* ─── The animated SVG conferment seal ─── */
const Seal = (() => {
  const Component = ({ ref }: { ref: React.Ref<SVGSVGElement> }) => {
    return (
      <svg
        ref={ref}
        width="480"
        height="480"
        viewBox="0 0 480 480"
        className="w-[280px] md:w-[400px] lg:w-[480px] aspect-square"
        style={{ filter: "drop-shadow(0 24px 60px rgba(26, 24, 22, 0.08))" }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="seal-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E3C892" />
            <stop offset="70%" stopColor="#C8A96A" />
            <stop offset="100%" stopColor="#A0884D" />
          </radialGradient>
          <linearGradient id="seal-ring-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E2A47" />
            <stop offset="100%" stopColor="#1A1816" />
          </linearGradient>
        </defs>

        {/* Outer rotating ring with engraved micro-text ticks */}
        <g
          style={{
            transformOrigin: "240px 240px",
            animation: "seal-spin 80s linear infinite",
          }}
        >
          <circle
            cx="240"
            cy="240"
            r="220"
            fill="none"
            stroke="var(--color-ink-primary)"
            strokeWidth="1"
            opacity="0.3"
          />
          {/* 60 micro ticks around the perimeter */}
          {Array.from({ length: 60 }).map((_, i) => {
            const angle = (i / 60) * Math.PI * 2;
            const r1 = 220;
            const r2 = i % 5 === 0 ? 210 : 215;
            const x1 = 240 + Math.cos(angle) * r1;
            const y1 = 240 + Math.sin(angle) * r1;
            const x2 = 240 + Math.cos(angle) * r2;
            const y2 = 240 + Math.sin(angle) * r2;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="var(--color-ink-primary)"
                strokeWidth="1"
                opacity={i % 5 === 0 ? 0.5 : 0.2}
              />
            );
          })}
        </g>

        {/* Middle ring — static */}
        <circle
          cx="240"
          cy="240"
          r="180"
          fill="none"
          stroke="var(--color-canvas-paper-edge)"
          strokeWidth="1"
        />

        {/* Middle inscription ring — counter-rotates */}
        <g
          style={{
            transformOrigin: "240px 240px",
            animation: "seal-spin-reverse 120s linear infinite",
          }}
        >
          <circle
            cx="240"
            cy="240"
            r="150"
            fill="none"
            stroke="#1E2A47"
            strokeWidth="0.5"
            strokeDasharray="4 8"
            opacity="0.4"
          />
        </g>

        {/* Inner seal — gold core */}
        <circle
          cx="240"
          cy="240"
          r="110"
          fill="url(#seal-core)"
          opacity="0.95"
        />

        {/* Inner border ring */}
        <circle
          cx="240"
          cy="240"
          r="100"
          fill="none"
          stroke="#1A1816"
          strokeWidth="1"
          opacity="0.4"
        />

        {/* Center inscription */}
        <text
          x="240"
          y="218"
          textAnchor="middle"
          className="type-mono-label"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.28em",
          }}
          fill="#1A1816"
          opacity="0.7"
        >
          HONORIS
        </text>
        <text
          x="240"
          y="252"
          textAnchor="middle"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "40px",
            fontWeight: 400,
          }}
          fill="#1A1816"
        >
          T
        </text>
        <text
          x="240"
          y="280"
          textAnchor="middle"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.28em",
          }}
          fill="#1A1816"
          opacity="0.7"
        >
          CAUSA
        </text>

        <style>{`
          @keyframes seal-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes seal-spin-reverse {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
        `}</style>
      </svg>
    );
  };
  Component.displayName = "Seal";
  return Component;
})();
