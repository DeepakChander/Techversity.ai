"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp, viewport as defaultViewport } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  once?: boolean;
  amount?: number;
  as?: "div" | "section" | "article" | "li";
}

export function RevealOnScroll({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  once = true,
  amount = 0.2,
  as = "div",
}: RevealOnScrollProps) {
  const Component = motion.create(as);

  return (
    <Component
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      transition={delay > 0 ? { delay } : undefined}
    >
      {children}
    </Component>
  );
}
