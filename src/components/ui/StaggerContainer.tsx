"use client";

import { motion, type Variants } from "framer-motion";
import { staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number;
  as?: "div" | "ul" | "section";
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  delayChildren = 0.1,
  once = true,
  amount = 0.2,
  as = "div",
}: StaggerContainerProps) {
  const Component = motion.create(as);

  return (
    <Component
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={staggerContainer(staggerDelay, delayChildren)}
    >
      {children}
    </Component>
  );
}
