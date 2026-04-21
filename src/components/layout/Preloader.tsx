"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Preloader — 2026 editorial.
 * Solid ivory screen, mono counter tied to real asset load.
 * Minimum 900ms hold on 100 before exit — premium brands pause.
 * On complete: screen splits horizontally (top half up, bottom half down)
 * revealing the hero beneath over 1.1s with the editorial ease.
 */

const MIN_DURATION = 1400;
const HOLD_AT_FULL = 500;

export function Preloader() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const startRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
    startRef.current = performance.now();

    if (typeof document === "undefined") return;

    const readyState = document.readyState;
    const alreadyComplete = readyState === "complete";

    let rafId = 0;
    const tick = () => {
      const elapsed = performance.now() - startRef.current;
      const timeBasedProgress = Math.min(100, (elapsed / MIN_DURATION) * 100);
      setProgress((prev) => Math.max(prev, Math.floor(timeBasedProgress)));
      if (timeBasedProgress < 100) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onLoad = () => {
      const elapsed = performance.now() - startRef.current;
      const remaining = Math.max(0, MIN_DURATION - elapsed);
      setTimeout(() => {
        setProgress(100);
        setTimeout(() => setIsLoading(false), HOLD_AT_FULL);
      }, remaining);
    };

    if (alreadyComplete) {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9998] pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          {/* Top half */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2 bg-[var(--color-canvas-ivory)] flex items-end justify-center"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="pb-4 overflow-hidden">
              <motion.span
                className="type-display block text-[clamp(3rem,7vw,6rem)] text-[var(--color-ink-primary)]"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              >
                Techversity
              </motion.span>
            </div>
          </motion.div>

          {/* Bottom half */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-[var(--color-canvas-ivory)] flex items-start justify-center"
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="pt-6 text-center">
              <div className="type-mono-label text-[var(--color-ink-muted)]">
                Establishing the record
              </div>
              <div className="type-mono-meta text-[var(--color-heritage-crimson)] mt-3 text-[13px]">
                {progress.toString().padStart(3, "0")} / 100
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
