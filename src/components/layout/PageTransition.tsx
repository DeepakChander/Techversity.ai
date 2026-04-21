"use client";

import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

/**
 * PageTransition — 2026 editorial.
 * A single ivory curtain descends from the top over 0.55s, then rises
 * off the bottom on exit. The transition reads like a page turn, not
 * a glitch — no gradients, no stair columns.
 *
 * Note: This is the SPA fallback for browsers without View Transitions API.
 * On supporting browsers (Chromium 126+, Safari 18.2+), Next.js 15's
 * native cross-document View Transitions handle the more sophisticated
 * FLIP morphs. This curtain runs underneath as a visual baseline.
 */

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative">
        <motion.div
          className="fixed inset-0 z-[9997] pointer-events-none bg-[var(--color-canvas-ivory)] origin-top"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{
            scaleY: [0, 1, 1, 0],
            transformOrigin: ["top", "top", "bottom", "bottom"],
            transition: {
              duration: 1.0,
              times: [0, 0.4, 0.55, 1],
              ease: [0.76, 0, 0.24, 1],
            },
          }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
