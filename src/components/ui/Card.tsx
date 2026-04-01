"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
  glow?: boolean;
}

export function Card({
  children,
  className,
  tilt = true,
  glow = true,
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useTransform(mouseY, [0, 1], [5, -5]);
  const rotateY = useTransform(mouseX, [0, 1], [-5, 5]);
  const springRotateX = useSpring(rotateX, { damping: 30, stiffness: 200 });
  const springRotateY = useSpring(rotateY, { damping: 30, stiffness: 200 });

  // Compute glow gradient from mouse position
  const glowBackground = useTransform(
    [mouseX, mouseY],
    ([mx, my]: number[]) =>
      `radial-gradient(600px circle at ${mx * 100}% ${my * 100}%, rgba(58,130,255,0.06), transparent 40%)`
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current || !tilt) return;
      const rect = ref.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [tilt, mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative rounded-2xl overflow-hidden group",
        "bg-white border border-slate-200",
        "transition-shadow duration-500",
        "hover:shadow-lg hover:shadow-blue-start/[0.08] hover:border-blue-200",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: tilt ? springRotateX : 0,
        rotateY: tilt ? springRotateY : 0,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow effect following cursor */}
      {glow && (
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: glowBackground }}
        />
      )}
      {children}
    </motion.div>
  );
}
