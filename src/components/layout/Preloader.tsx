"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const PARTICLES = Array.from({ length: 24 }, (_, i) => {
  const angle = (i / 24) * Math.PI * 2;
  const seed = Math.sin(i * 9301 + 49297) * 0.5 + 0.5;
  const radius = 70 + seed * 50;
  return {
    startX: Math.cos(angle) * radius,
    startY: Math.sin(angle) * radius,
    burstX: Math.cos(angle) * 80,
    burstY: Math.sin(angle) * 80,
    color: i < 8 ? "#3A82FF" : i < 16 ? "#22D3EE" : "#ff6b6b",
    size: 1 + seed * 2,
  };
});

export function Preloader() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [phase, setPhase] = useState<"scatter" | "converge" | "reveal">("scatter");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const convergeTimer = setTimeout(() => setPhase("converge"), 400);
    const revealTimer = setTimeout(() => setPhase("reveal"), 1000);
    const timeout = setTimeout(() => setIsLoading(false), 1500);

    return () => {
      clearTimeout(convergeTimer);
      clearTimeout(revealTimer);
      clearTimeout(timeout);
    };
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9998] bg-white flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Phoenix particle convergence */}
          <motion.div
            className="relative w-36 h-36 mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {PARTICLES.map((p, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  background: p.color,
                  width: p.size,
                  height: p.size,
                  top: "50%",
                  left: "50%",
                  boxShadow: `0 0 8px ${p.color}`,
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
                  duration: phase === "scatter" ? 0.2 : 0.5,
                  delay: phase === "scatter" ? i * 0.015 : i * 0.01,
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
              transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
            >
              <Image
                src="/images/techversity-logo.jpeg"
                alt="Techversity.ai"
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover shadow-[0_0_30px_rgba(0,229,255,0.3)]"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Brand name */}
          <motion.div
            className="font-heading text-xl font-bold text-slate-900"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            TECHVERSITY<span className="text-blue-start">.AI</span>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="w-40 h-0.5 bg-slate-200 rounded-full overflow-hidden mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blue-start via-cyan to-coral rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
