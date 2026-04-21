import { cn } from "@/lib/utils";

/**
 * CardV2 — 2026 editorial card.
 * Quiet bone fill, 1px paper-edge border, no shadow.
 * Hover: border firms up to ink-whisper. That's it.
 */

interface CardV2Props {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
  interactive?: boolean;
}

export function CardV2({
  children,
  className,
  as: Component = "article",
  interactive = false,
}: CardV2Props) {
  return (
    <Component
      className={cn(
        "relative bg-[var(--color-canvas-bone)] border border-[var(--color-canvas-paper-edge)]",
        "p-7 lg:p-9 transition-colors duration-500 ease-[var(--ease-editorial)]",
        interactive && "hover:border-[var(--color-ink-whisper)] cursor-pointer",
        className
      )}
    >
      {children}
    </Component>
  );
}
