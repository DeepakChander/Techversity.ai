// ============================================
// TECHVERSITY.AI - Reusable Animation Variants
// ============================================
// Performance rules:
// - ONLY animate transform, opacity, filter, clip-path (GPU-composited)
// - Use IntersectionObserver (whileInView) for scroll-triggered animations
// - Stagger with 80-150ms delays
// - Standard easing: [0.22, 1, 0.36, 1] (custom ease-out)

import type { Variants, Transition } from "framer-motion";

// ─── Standard easing curves ───
export const EASE = {
  default: [0.22, 1, 0.36, 1] as const,
  smooth: [0.16, 1, 0.3, 1] as const,
  bounce: [0.34, 1.56, 0.64, 1] as const,
  gentle: [0.4, 0, 0.2, 1] as const,
};

// ─── Standard durations ───
export const DURATION = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.7,
  slower: 1.0,
} as const;

// ─── Fade Up (primary entrance animation) ───
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE.default },
  },
};

// ─── Fade Down ───
export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE.default },
  },
};

// ─── Fade In (no direction) ───
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE.default },
  },
};

// ─── Scale In ───
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE.default },
  },
};

// ─── Slide from Left ───
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE.default },
  },
};

// ─── Slide from Right ───
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE.default },
  },
};

// ─── Blur Fade Up (premium entrance) ───
export const blurFadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE.default },
  },
};

// ─── Stagger Container ───
export const staggerContainer = (
  staggerDelay = 0.1,
  delayChildren = 0.1
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

// ─── Stagger Item (use as child of stagger container) ───
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE.default },
  },
};

// ─── Scale stagger item ───
export const staggerScaleItem: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: EASE.default },
  },
};

// ─── Section heading animation ───
export const sectionHeading: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE.default },
  },
};

// ─── Line draw animation ───
export const lineReveal: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: EASE.default },
  },
};

// ─── Viewport settings ───
export const viewport = {
  once: true,
  amount: 0.2 as const,
};

export const viewportMore = {
  once: true,
  amount: 0.4 as const,
};

// ─── Spring config presets ───
export const spring = {
  gentle: { type: "spring" as const, stiffness: 200, damping: 20, mass: 0.5 },
  snappy: { type: "spring" as const, stiffness: 400, damping: 17 },
  bouncy: { type: "spring" as const, stiffness: 300, damping: 10, mass: 0.5 },
} as const;

// ─── Hover presets ───
export const hoverScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: spring.snappy as Transition,
};

export const hoverLift = {
  whileHover: { y: -4 },
  transition: { duration: 0.3, ease: EASE.default } as Transition,
};

// ─── Navbar animation variants ───
export const navbarDropdown: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: EASE.smooth },
  },
  exit: {
    opacity: 0,
    y: 8,
    scale: 0.97,
    transition: { duration: 0.2, ease: EASE.default },
  },
};

export const mobileMenuOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const mobileMenuItem = (index: number): Variants => ({
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: index * 0.08,
      duration: 0.5,
      ease: EASE.default,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
    transition: { duration: 0.2 },
  },
});
