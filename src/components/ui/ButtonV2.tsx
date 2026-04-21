"use client";

import { forwardRef, useRef, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * ButtonV2 — 2026 design-system button.
 *
 * Three variants:
 *   heritage — solid navy, cream text. Primary CTAs.
 *   ghost    — no fill; underline draws on hover; crimson arrow.
 *   quiet    — text-only; crimson arrow after label. For secondary CTAs.
 *
 * All variants support magnetic-layer hover: cursor pulls the label
 * toward it within a small radius, returns with a spring on leave.
 */

type Variant = "heritage" | "ghost" | "quiet";
type Size = "sm" | "md" | "lg";

interface ButtonV2Props {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  showArrow?: boolean;
  magnetic?: boolean;
}

const sizeStyles: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[13px]",
  md: "px-7 py-3.5 text-[14px]",
  lg: "px-9 py-4 text-[15px]",
};

const baseStyles =
  "relative inline-flex items-center justify-center gap-2.5 font-[family-name:var(--font-sans-2026)] font-medium tracking-[0.02em] transition-colors duration-500 ease-[var(--ease-editorial)] select-none";

const variantStyles: Record<Variant, string> = {
  heritage:
    "bg-[var(--color-heritage-navy)] text-[var(--color-canvas-ivory)] hover:bg-[var(--color-heritage-navy-hover)]",
  ghost:
    "bg-transparent text-[var(--color-ink-primary)] border border-[var(--color-ink-primary)]/30 hover:border-[var(--color-ink-primary)]",
  quiet:
    "bg-transparent text-[var(--color-ink-primary)] hover:text-[var(--color-heritage-crimson)] px-0 py-2",
};

export const ButtonV2 = forwardRef<HTMLButtonElement, ButtonV2Props>(
  (
    {
      children,
      variant = "heritage",
      size = "md",
      href,
      className,
      onClick,
      type = "button",
      disabled = false,
      showArrow = false,
      magnetic = true,
    },
    ref
  ) => {
    const hostRef = useRef<HTMLSpanElement>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!magnetic || disabled) return;
      const host = hostRef.current;
      if (!host) return;
      const rect = host.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      setOffset({ x: relX * 0.22, y: relY * 0.3 });
    };

    const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

    const classes = cn(
      baseStyles,
      variant !== "quiet" && sizeStyles[size],
      variantStyles[variant],
      disabled && "opacity-40 pointer-events-none",
      className
    );

    const inner = (
      <motion.span
        ref={hostRef}
        className={cn(
          "inline-flex items-center gap-2.5 relative",
          variant === "ghost" && "link-editorial-ghost"
        )}
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: "spring", stiffness: 240, damping: 22, mass: 0.5 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <span className="relative z-10">{children}</span>
        {showArrow && (
          <span
            aria-hidden
            className={cn(
              "inline-block transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:translate-x-1",
              variant === "quiet" && "text-[var(--color-heritage-crimson)]"
            )}
          >
            →
          </span>
        )}
      </motion.span>
    );

    if (href) {
      return (
        <Link href={href} className={cn(classes, "group")} onClick={onClick}>
          {inner}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={cn(classes, "group")}
      >
        {inner}
      </button>
    );
  }
);

ButtonV2.displayName = "ButtonV2";
