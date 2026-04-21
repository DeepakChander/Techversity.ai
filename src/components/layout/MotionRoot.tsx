"use client";

import { MotionConfig } from "motion/react";

/**
 * MotionRoot — wraps children with MotionConfig so every motion/react
 * animation honors the OS-level `prefers-reduced-motion: reduce` setting.
 * Users who have reduced motion enabled get transforms skipped to their
 * final value — no opt-in required at the component level.
 */
export function MotionRoot({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
