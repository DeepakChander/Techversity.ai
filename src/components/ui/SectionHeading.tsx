"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem, EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
  gradient?: boolean;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  light = false,
  className,
  gradient = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      className={cn(
        "max-w-3xl mb-16",
        align === "center" && "mx-auto text-center",
        className
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer(0.12, 0)}
    >
      {label && (
        <motion.div
          variants={staggerItem}
          className="flex items-center gap-2 mb-4"
          style={{ justifyContent: align === "center" ? "center" : "flex-start" }}
        >
          <span
            className="inline-block w-8 h-px"
            style={{
              background: "linear-gradient(90deg, var(--color-cyan), transparent)",
            }}
          />
          <span
            className={cn(
              "text-xs font-medium uppercase tracking-[0.2em]",
              "text-blue-start"
            )}
          >
            {label}
          </span>
          <span
            className="inline-block w-8 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, var(--color-cyan))",
            }}
          />
        </motion.div>
      )}

      <motion.h2
        variants={staggerItem}
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-[1.1] tracking-tight",
          gradient
            ? "bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 bg-clip-text text-transparent"
            : "text-slate-900"
        )}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={staggerItem}
          className={cn(
            "mt-4 text-base md:text-lg leading-relaxed max-w-2xl",
            align === "center" && "mx-auto",
            "text-slate-600"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
