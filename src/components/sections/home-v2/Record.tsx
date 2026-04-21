"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { IndexNumeral } from "@/components/ui/IndexNumeral";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/**
 * Record — compact horizontal band.
 * Four stats in a single row. "Last-mile" counter animation on intersection.
 * No sticky scroll; the whole section is visible in one viewport.
 */

interface Stat {
  value: number;
  suffix: string;
  decimals: number;
  label: string;
  startFrom: number;
}

const STATS: Stat[] = [
  { value: 12, suffix: "+", decimals: 0, label: "Countries served", startFrom: 10 },
  { value: 10, suffix: "+", decimals: 0, label: "Partner universities", startFrom: 8 },
  { value: 98, suffix: "%", decimals: 0, label: "Acceptance rate", startFrom: 82 },
  { value: 4.8, suffix: "/5", decimals: 1, label: "Recipient satisfaction", startFrom: 4.0 },
];

export function Record() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const counters = gsap.utils.toArray<HTMLElement>(".record-counter");
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) {
        counters.forEach((counterEl, idx) => {
          const stat = STATS[idx];
          if (!counterEl || !stat) return;
          counterEl.textContent = stat.value.toFixed(stat.decimals);
        });
        return;
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {
          counters.forEach((counterEl, idx) => {
            const stat = STATS[idx];
            if (!counterEl || !stat) return;
            const obj = { val: stat.startFrom };
            gsap.to(obj, {
              val: stat.value,
              duration: 1.6,
              delay: idx * 0.12,
              ease: "power2.out",
              onUpdate: () => {
                counterEl.textContent = obj.val.toFixed(stat.decimals);
              },
            });
          });
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--color-canvas-bone)] border-y border-[var(--color-canvas-paper-edge)]"
    >
      <div className="max-w-[1440px] mx-auto px-8 lg:px-14 py-16 lg:py-24">
        {/* Header band */}
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10 lg:mb-14">
          <IndexNumeral index="01" label="The record" total="08" />
          <p className="type-display-italic text-[var(--color-ink-muted)] text-[17px] max-w-[36ch]">
            A measured account of the firm&rsquo;s work.
          </p>
        </div>

        {/* Horizontal 4-col stat grid */}
        <ul className="grid grid-cols-2 lg:grid-cols-4 border-t border-[var(--color-canvas-paper-edge)]">
          {STATS.map((stat, i) => (
            <li
              key={stat.label}
              className={`record-stat py-8 lg:py-12 ${
                i < STATS.length - 1 ? "lg:border-r border-[var(--color-canvas-paper-edge)]" : ""
              } ${i < 2 ? "border-b lg:border-b-0 border-[var(--color-canvas-paper-edge)]" : ""} ${
                i % 2 === 0 ? "lg:pr-8" : "lg:px-8"
              } ${i === 0 ? "lg:pl-0" : ""} ${i === 2 ? "border-r border-[var(--color-canvas-paper-edge)] lg:border-r" : ""}`}
            >
              <span className="type-mono-meta text-[var(--color-ink-whisper)]">
                {(i + 1).toString().padStart(2, "0")}
              </span>
              <div className="type-display text-[var(--color-ink-primary)] tabular-nums leading-none mt-3 flex items-start">
                <span
                  className="record-counter inline-block"
                  style={{ fontSize: "clamp(3rem, 6vw, 5.25rem)" }}
                >
                  {stat.startFrom.toFixed(stat.decimals)}
                </span>
                <span
                  className="text-[var(--color-heritage-crimson)] ml-1"
                  style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.875rem)" }}
                >
                  {stat.suffix}
                </span>
              </div>
              <p className="type-ui text-[var(--color-ink-muted)] text-[14px] mt-4 max-w-[18ch]">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
