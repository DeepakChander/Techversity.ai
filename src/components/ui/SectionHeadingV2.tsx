import { cn } from "@/lib/utils";
import { IndexNumeral } from "./IndexNumeral";

/**
 * SectionHeadingV2 — editorial section header.
 * Mono index numeral + serif display headline + optional serif-italic dek.
 */

interface SectionHeadingV2Props {
  index?: string | number;
  indexLabel?: string;
  indexTotal?: string | number;
  title: React.ReactNode;
  dek?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeadingV2({
  index,
  indexLabel,
  indexTotal,
  title,
  dek,
  align = "left",
  className,
  as: Heading = "h2",
}: SectionHeadingV2Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {index !== undefined && (
        <IndexNumeral index={index} label={indexLabel} total={indexTotal} />
      )}
      <Heading
        className={cn(
          "type-display text-[var(--color-ink-primary)]",
          "text-[clamp(2.25rem,5.2vw,4.75rem)]"
        )}
      >
        {title}
      </Heading>
      {dek && (
        <p
          className={cn(
            "type-display-italic text-[var(--color-ink-muted)]",
            "text-[clamp(1rem,1.4vw,1.25rem)] max-w-[52ch]",
            align === "center" && "mx-auto"
          )}
        >
          {dek}
        </p>
      )}
    </div>
  );
}
