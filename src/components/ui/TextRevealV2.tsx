"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

/**
 * TextRevealV2 — word-by-word mask reveal driven by GSAP SplitText.
 * Each word clips from below with a 60ms stagger.
 *
 * Replaces the legacy Framer-Motion-based TextReveal.
 */

type Trigger = "view" | "load";

interface TextRevealV2Props {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  trigger?: Trigger;
  delay?: number;
  stagger?: number;
}

export function TextRevealV2({
  children,
  className,
  as: Component = "h2",
  trigger = "view",
  delay = 0,
  stagger = 0.06,
}: TextRevealV2Props) {
  const hostRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = hostRef.current;
      if (!el) return;

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const split = new SplitText(el, { type: "words,lines", linesClass: "line", wordsClass: "word" });

      gsap.set(split.words, { yPercent: 105, opacity: 0 });

      const anim = gsap.to(split.words, {
        yPercent: 0,
        opacity: 1,
        stagger,
        duration: 0.9,
        ease: "power3.out",
        delay,
        paused: trigger === "view",
      });

      let st: ScrollTrigger | undefined;
      if (trigger === "view") {
        st = ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          onEnter: () => anim.play(),
        });
      } else {
        anim.play();
      }

      return () => {
        st?.kill();
        anim.kill();
        split.revert();
      };
    },
    { scope: hostRef }
  );

  return (
    <Component
      ref={hostRef as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
      className={cn("overflow-hidden", className)}
      style={{ lineHeight: "inherit" }}
    >
      {children}
    </Component>
  );
}
