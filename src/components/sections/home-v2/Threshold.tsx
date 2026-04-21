"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ButtonV2 } from "@/components/ui/ButtonV2";
import { IndexNumeral } from "@/components/ui/IndexNumeral";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

/**
 * Threshold — one quiet invitation.
 * Opposite of the typical SaaS fireworks CTA.
 * Single serif line, one heritage button, one mono confidentiality line.
 */

export function Threshold() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const headline = headlineRef.current;
      if (!headline) return;
      const split = new SplitText(headline, { type: "words" });
      gsap.set(split.words, { yPercent: 110, opacity: 0 });
      gsap.to(split.words, {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headline,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--color-canvas-ivory)] border-t border-[var(--color-canvas-paper-edge)]"
    >
      <div className="max-w-[1200px] mx-auto px-8 lg:px-14 py-32 lg:py-48 flex flex-col items-center text-center">
        <IndexNumeral index="08" label="Threshold" total="08" />

        <div className="mt-12 overflow-hidden">
          <p
            ref={headlineRef}
            className="type-display text-[var(--color-ink-primary)] leading-[1.05] max-w-[24ch]"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 5rem)" }}
          >
            If your work merits the record, let us begin the conversation.
          </p>
        </div>

        <div className="mt-16">
          <ButtonV2
            href="/apply"
            variant="heritage"
            size="lg"
            showArrow
            data-cursor-label="begin"
          >
            Begin the conversation
          </ButtonV2>
        </div>

        <div className="mt-10 type-mono-meta text-[var(--color-ink-muted)]">
          RESPONSES WITHIN 48 HOURS · CONFIDENTIAL · NO FEE FOR THE FIRST CONVERSATION
        </div>
      </div>
    </section>
  );
}
