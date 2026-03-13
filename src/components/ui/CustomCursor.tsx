"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [cursorLabel, setCursorLabel] = useState("");

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  // Trailing dot springs (must be called unconditionally)
  const trailX = useSpring(cursorX, { damping: 40, stiffness: 200, mass: 0.8 });
  const trailY = useSpring(cursorY, { damping: 40, stiffness: 200, mass: 0.8 });

  useEffect(() => {
    // Detect touch device
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = () => setIsHidden(true);

    // Detect hoverable elements
    const handleElementHover = (e: Event) => {
      const target = e.target as HTMLElement;
      const isLink = target.tagName === "A" || target.closest("a");
      const isButton = target.tagName === "BUTTON" || target.closest("button");
      const isCard = target.closest("[data-cursor='card']");
      const customLabel =
        target.dataset?.cursorLabel ||
        target.closest("[data-cursor-label]")?.getAttribute("data-cursor-label");

      if (customLabel) {
        setIsHovering(true);
        setCursorLabel(customLabel);
      } else if (isLink || isButton || isCard || target.dataset.cursor === "pointer") {
        setIsHovering(true);
        setCursorLabel("");
      } else {
        setIsHovering(false);
        setCursorLabel("");
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleElementHover);

    // Hide default cursor
    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleElementHover);
      document.body.style.cursor = "";
    };
  }, [cursorX, cursorY]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x, y }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center"
          animate={{
            width: isHovering ? (cursorLabel ? 80 : 48) : 12,
            height: isHovering ? (cursorLabel ? 80 : 48) : 12,
            opacity: isHidden ? 0 : 1,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            background: isHovering
              ? "rgba(255,255,255,0.1)"
              : "linear-gradient(135deg, #1a6dff, #00e5ff, #ff6b6b)",
            border: isHovering ? "2px solid rgba(255,255,255,0.8)" : "none",
            backdropFilter: isHovering ? "blur(4px)" : "none",
          }}
        >
          {cursorLabel && (
            <span className="text-[10px] text-white font-medium uppercase tracking-wider">
              {cursorLabel}
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* Trailing dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: trailX, y: trailY }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-cyan/40"
          animate={{
            opacity: isHidden || isHovering ? 0 : 0.6,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </>
  );
}
