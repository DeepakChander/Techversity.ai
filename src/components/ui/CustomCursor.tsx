"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * CustomCursor — 2026 contextual halo.
 *
 * Default: 20px soft circle with cream edge, mix-blend difference for contrast.
 * On interactive: grows to 64px.
 * If the interactive element has `data-cursor-label="view"`, the label renders
 * inside the cursor in mono.
 * If the element has `data-cursor="heritage"`, the halo inverts to crimson.
 * Disabled on touch devices.
 */

type Mode = "default" | "interactive" | "heritage";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [mode, setMode] = useState<Mode>("default");
  const [label, setLabel] = useState<string | null>(null);
  const [isHidden, setIsHidden] = useState(true);
  const [isTouch, setIsTouch] = useState(false);

  const x = useSpring(cursorX, { damping: 28, stiffness: 350, mass: 0.4 });
  const y = useSpring(cursorY, { damping: 28, stiffness: 350, mass: 0.4 });

  useEffect(() => {
    const isPointerFine = window.matchMedia("(pointer: fine)").matches;
    const hasTouchPoints = navigator.maxTouchPoints > 0;
    if (!isPointerFine || (hasTouchPoints && "ontouchstart" in window)) {
      setIsTouch(true);
      return;
    }

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsHidden(false);
    };

    const handleLeave = () => setIsHidden(true);

    const handleOver = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive =
        target.closest(
          "a, button, [role='button'], [data-cursor-label], [data-cursor]"
        ) as HTMLElement | null;
      if (!interactive) {
        setMode("default");
        setLabel(null);
        return;
      }
      const cursorAttr = interactive.dataset.cursor;
      const labelAttr = interactive.dataset.cursorLabel;
      setMode(cursorAttr === "heritage" ? "heritage" : "interactive");
      setLabel(labelAttr ?? null);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseover", handleOver);
    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseover", handleOver);
    };
  }, [cursorX, cursorY]);

  if (isTouch) return null;

  const size = mode === "default" ? 20 : 64;
  const bg =
    mode === "heritage"
      ? "var(--color-heritage-crimson)"
      : mode === "interactive"
        ? "var(--color-ink-primary)"
        : "transparent";
  const border =
    mode === "default"
      ? "1px solid var(--color-ink-primary)"
      : "0px solid transparent";
  const color =
    mode === "default" ? "transparent" : "var(--color-canvas-ivory)";

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center rounded-full"
      style={{ x, y, mixBlendMode: "difference" }}
      animate={{
        width: size,
        height: size,
        opacity: isHidden ? 0 : 1,
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <motion.div
        className="rounded-full absolute inset-0"
        animate={{ background: bg, border }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
      {label && mode !== "default" && (
        <span
          className="relative type-mono-label"
          style={{ color, fontSize: 10 }}
        >
          {label}
        </span>
      )}
    </motion.div>
  );
}
