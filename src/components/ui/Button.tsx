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
    "bg-gradient-to-r from-blue-start to-blue-mid text-white shadow-lg shadow-blue-start/20 hover:shadow-xl hover:shadow-blue-start/30",
  secondary:
    "bg-slate-100 text-slate-900 border border-slate-200 hover:bg-slate-200",
  outline:
    "bg-transparent text-slate-900 border border-slate-300 hover:bg-slate-50 hover:border-slate-400",
  ghost:
    "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100",
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
