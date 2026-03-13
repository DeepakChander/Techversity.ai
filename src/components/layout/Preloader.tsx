"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Deterministic particle positions (pre-computed, no Math.random())
const PARTICLES = Array.from({ length: 20 }, (_, i) => {
  const angle = (i / 20) * Math.PI * 2;
  // Use seeded pseudo-random based on index instead of Math.random()
  const seed = Math.sin(i * 9301 + 49297) * 0.5 + 0.5;
  const radius = 80 + seed * 40;
  return {
    startX: Math.cos(angle) * radius,
    startY: Math.sin(angle) * radius,
    burstX: Math.cos(angle) * 60,
    burstY: Math.sin(angle) * 60,
    angle,
    color: i < 7 ? "#1a6dff" : i < 14 ? "#00e5ff" : "#ff6b6b",
  };
});

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"scatter" | "converge" | "reveal">("scatter");

  useEffect(() => {
    const convergeTimer = setTimeout(() => setPhase("converge"), 800);
    const revealTimer = setTimeout(() => setPhase("reveal"), 1800);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Deterministic increment based on current value
        return prev + 8 + (prev % 3) * 4;
      });
    }, 80);

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      clearTimeout(convergeTimer);
      clearTimeout(revealTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9998] bg-bg-primary flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Phoenix particle convergence animation */}
          <motion.div
            className="relative w-40 h-40 mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {PARTICLES.map((p, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  background: p.color,
                  top: "50%",
                  left: "50%",
                  boxShadow: `0 0 6px ${p.color}`,
                }}
                initial={{
                  x: p.startX,
                  y: p.startY,
                  opacity: 0,
                  scale: 0,
                }}
                animate={
                  phase === "scatter"
                    ? { x: p.startX, y: p.startY, opacity: 1, scale: 1 }
                    : phase === "converge"
                    ? { x: 0, y: 0, opacity: 1, scale: 1.5 }
                    : { x: p.burstX, y: p.burstY, opacity: 0, scale: 0 }
                }
                transition={{
                  duration: phase === "scatter" ? 0.3 : 0.8,
                  delay: phase === "scatter" ? i * 0.03 : i * 0.02,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Center logo */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={
                phase === "converge" || phase === "reveal"
                  ? { opacity: 1, scale: 1 }
                  : {}
              }
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
            >
              <Image
                src="/images/techversity-logo.jpeg"
                alt="Techversity.ai"
                width={72}
                height={72}
                className="w-[72px] h-[72px] rounded-full object-cover shadow-[0_0_30px_rgba(0,229,255,0.3)]"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Brand name */}
          <motion.div
            className="font-heading text-2xl font-bold text-text-primary mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            TECHVERSITY<span className="text-cyan">.AI</span>
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-start via-cyan to-coral rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Percentage */}
          <motion.span
            className="mt-3 text-xs text-text-muted font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Math.min(Math.round(progress), 100)}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
