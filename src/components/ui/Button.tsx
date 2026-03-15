"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

const variants = {
  primary:
    "bg-gradient-to-r from-blue-start to-blue-mid text-white hover:shadow-[0_0_30px_rgba(26,109,255,0.4)]",
  secondary:
    "bg-bg-surface-light text-text-primary border border-glass-border hover:bg-blue-start/20",
  outline:
    "bg-transparent text-text-primary gradient-border hover:bg-glass",
  ghost:
    "bg-transparent text-text-secondary hover:text-text-primary hover:bg-glass",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      href,
      className,
      onClick,
      type = "button",
      disabled = false,
    },
    ref
  ) => {
    const classes = cn(
      "relative inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 font-sans",
      variants[variant],
      sizes[size],
      disabled && "opacity-50 cursor-not-allowed",
      className
    );

    const motionProps = {
      whileHover: disabled ? {} : { scale: 1.02 },
      whileTap: disabled ? {} : { scale: 0.98 },
      transition: { type: "spring" as const, stiffness: 400, damping: 17 },
    };

    if (href) {
      return (
        <motion.div {...motionProps} className="inline-flex">
          <Link href={href} className={classes} onClick={onClick}>
            {children}
          </Link>
        </motion.div>
      );
    }

    return (
      <motion.button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={classes}
        {...motionProps}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
