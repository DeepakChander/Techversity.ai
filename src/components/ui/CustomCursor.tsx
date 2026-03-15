"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const trailX = useSpring(cursorX, { damping: 40, stiffness: 200, mass: 0.8 });
  const trailY = useSpring(cursorY, { damping: 40, stiffness: 200, mass: 0.8 });

  useEffect(() => {
    // Only hide on pure pointer devices (no touchscreen)
    const isPointerFine = window.matchMedia("(pointer: fine)").matches;
    const hasTouchPoints = navigator.maxTouchPoints > 0;

    if (!isPointerFine || (hasTouchPoints && "ontouchstart" in window)) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = () => setIsHidden(true);

    const handleElementHover = (e: Event) => {
      const target = e.target as HTMLElement;
      const isLink = target.tagName === "A" || target.closest("a");
      const isButton = target.tagName === "BUTTON" || target.closest("button");
      const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT";

      if (isInput) {
        setIsHovering(false);
      } else if (isLink || isButton || target.dataset.cursor === "pointer") {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleElementHover);

    // Don't hide native cursor - just add our custom one on top
    // This preserves accessibility for motor-impaired users

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleElementHover);
    };
  }, [cursorX, cursorY]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x, y }}
        aria-hidden="true"
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{
            width: isHovering ? 40 : 10,
            height: isHovering ? 40 : 10,
            opacity: isHidden ? 0 : 1,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            background: isHovering
              ? "rgba(0, 229, 255, 0.08)"
              : "linear-gradient(135deg, #1a6dff, #00e5ff, #ff6b6b)",
            border: isHovering ? "1.5px solid rgba(0, 229, 255, 0.4)" : "none",
            mixBlendMode: "screen",
          }}
        />
      </motion.div>

      {/* Trailing dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: trailX, y: trailY }}
        aria-hidden="true"
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-cyan/30"
          animate={{
            opacity: isHidden || isHovering ? 0 : 0.5,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </>
  );
}
