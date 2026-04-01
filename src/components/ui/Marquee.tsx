"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
}

export function Marquee({
  children,
  className,
  speed = 30,
  reverse = false,
  pauseOnHover = true,
  vertical = false,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group overflow-hidden",
        vertical ? "flex flex-col" : "flex",
        className
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "flex shrink-0",
          vertical ? "flex-col" : "",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{
          animation: `marquee${vertical ? "-vertical" : ""} ${speed}s linear infinite ${reverse ? "reverse" : ""}`,
        }}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0",
          vertical ? "flex-col" : "",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{
          animation: `marquee${vertical ? "-vertical" : ""} ${speed}s linear infinite ${reverse ? "reverse" : ""}`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
