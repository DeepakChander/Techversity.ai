"use client";

import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  gradient?: string;
}

export function GradientText({
  children,
  as: Tag = "span",
  className,
  gradient = "from-blue-start via-cyan to-coral",
}: GradientTextProps) {
  return (
    <Tag
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        gradient,
        className
      )}
    >
      {children}
    </Tag>
  );
}
