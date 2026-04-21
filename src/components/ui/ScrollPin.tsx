"use client";

import { useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/**
 * ScrollPin — pins its child to the viewport for a given scroll distance.
 * Falls back to a normal flow on prefers-reduced-motion and on narrow (<768px) viewports
 * (pinning is bad UX on short mobile viewports).
 */

interface ScrollPinProps {
  children: ReactNode;
  /** Pin distance as a multiple of viewport height. 1 = one viewport worth of scroll. */
  distance?: number;
  className?: string;
  /** If true, disables pinning on mobile (< 768px) — usually desired */
  disableOnMobile?: boolean;
}

export function ScrollPin({
  children,
  distance = 1,
  className,
  disableOnMobile = true,
}: ScrollPinProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;
      if (disableOnMobile && window.innerWidth < 768) return;

      const st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => `+=${window.innerHeight * distance}`,
        pin: true,
        pinSpacing: true,
      });

      return () => st.kill();
    },
    { scope: ref, dependencies: [distance, disableOnMobile] }
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
