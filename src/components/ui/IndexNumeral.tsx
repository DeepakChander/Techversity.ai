import { cn } from "@/lib/utils";

/**
 * IndexNumeral — mono "00 / 08" or "PROGRAM 001" style section markers.
 * The only place heritage-crimson appears outside of headline accents.
 */

interface IndexNumeralProps {
  index: string | number;
  label?: string;
  total?: string | number;
  className?: string;
}

const formatIndex = (value: string | number) => {
  if (typeof value === "string") return value;
  return value.toString().padStart(2, "0");
};

export function IndexNumeral({ index, label, total, className }: IndexNumeralProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 type-mono-label text-[var(--color-heritage-crimson)]",
        className
      )}
    >
      <span>{formatIndex(index)}</span>
      {total && (
        <>
          <span className="text-[var(--color-ink-whisper)]" aria-hidden>
            /
          </span>
          <span className="text-[var(--color-ink-whisper)]">{formatIndex(total)}</span>
        </>
      )}
      {label && (
        <span
          className="ml-1 text-[var(--color-ink-muted)]"
          style={{ letterSpacing: "0.14em" }}
        >
          {label}
        </span>
      )}
    </span>
  );
}
