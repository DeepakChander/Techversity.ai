"use client";

import { useRef, useState, ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * MagneticV2 — wrap any element to make it follow the cursor within a radius.
 * Springy return to origin on leave. Disables on touch.
 */

interface MagneticV2Props {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export function MagneticV2({ children, strength = 0.3, className }: MagneticV2Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    setOffset({ x: relX * strength, y: relY * strength });
  };

  const handleLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={offset}
      transition={{ type: "spring", stiffness: 200, damping: 18, mass: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
