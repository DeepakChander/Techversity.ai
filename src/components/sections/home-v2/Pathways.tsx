"use client";

import Link from "next/link";
import { IndexNumeral } from "@/components/ui/IndexNumeral";

/**
 * Pathways — compact vertical editorial list.
 * Replaces the former horizontal scroll rail which consumed
 * ~4 viewports of vertical scroll distance via pin. This compact
 * version renders each pathway as a single row, visible without pinning.
 */

interface Pathway {
  index: string;
  title: string;
  tagline: string;
  meta: string;
  href: string;
  comingSoon?: boolean;
}

const PATHWAYS: Pathway[] = [
  {
    index: "001",
    title: "Honoris Causa",
    tagline: "A formal recognition for work that has already reshaped a field.",
    meta: "By invitation · Portfolio reviewed · Conferment ceremony",
    href: "/programs/honorary-doctorate",
  },
  {
    index: "002",
    title: "Doctor of Business Administration",
    tagline: "Applied research, returning with discipline to practice.",
    meta: "Cohort · 18–36 months · Online + research residencies",
    href: "/programs/dba",
  },
  {
    index: "003",
    title: "Doctor of Philosophy",
    tagline: "An original contribution to knowledge, defended.",
    meta: "Individual supervision · 24–48 months · Dissertation",
    href: "/programs/phd",
  },
  {
    index: "004",
    title: "Bachelor’s & Master’s",
    tagline: "For professionals returning to the record at an earlier chapter.",
    meta: "Programme opening 2026 · To be announced",
    href: "#",
    comingSoon: true,
  },
];

export function Pathways() {
  return (
    <section className="relative bg-[var(--color-canvas-ivory)] border-t border-[var(--color-canvas-paper-edge)]">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-14 py-20 lg:py-28">
        {/* Header band */}
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14 pb-10 border-b border-[var(--color-canvas-paper-edge)]">
          <IndexNumeral index="02" label="Pathways" total="08" />
          <p className="type-display-italic text-[var(--color-ink-muted)] text-[17px] max-w-[40ch]">
            Four recognitions, each answering a different dimension of a life&rsquo;s work.
          </p>
        </div>

        {/* Vertical editorial list */}
        <ol>
          {PATHWAYS.map((p, i) => (
            <li key={p.index}>
              <PathwayRow
                pathway={p}
                position={i + 1}
                total={PATHWAYS.length}
                last={i === PATHWAYS.length - 1}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function PathwayRow({
  pathway,
  position,
  total,
  last,
}: {
  pathway: Pathway;
  position: number;
  total: number;
  last: boolean;
}) {
  const rowClasses = `group grid grid-cols-12 gap-4 md:gap-6 py-7 lg:py-8 ${
    !last ? "border-b border-[var(--color-canvas-paper-edge)]" : ""
  }`;

  const content = (
    <>
      {/* Index */}
      <div className="col-span-2 lg:col-span-1 flex items-start">
        <span className="type-mono-meta text-[var(--color-ink-whisper)]">
          {position.toString().padStart(2, "0")}
        </span>
      </div>

      {/* Title + tagline */}
      <div className="col-span-10 lg:col-span-6">
        <h3
          className="type-display text-[var(--color-ink-primary)] leading-[0.98] transition-colors duration-700 ease-[var(--ease-editorial)] group-hover:text-[var(--color-heritage-crimson)]"
          style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.75rem)" }}
        >
          {pathway.title}.
        </h3>
        <p className="type-display-italic text-[var(--color-ink-muted)] mt-2 text-[16px] max-w-[46ch]">
          {pathway.tagline}
        </p>
      </div>

      {/* Meta */}
      <div className="col-span-12 lg:col-span-4 lg:pt-3">
        <span className="type-mono-meta text-[var(--color-ink-muted)] block">
          {pathway.meta}
        </span>
      </div>

      {/* Arrow */}
      <div className="hidden lg:flex col-span-1 items-start justify-end pt-3">
        {!pathway.comingSoon && (
          <span
            aria-hidden
            className="type-mono-meta text-[var(--color-heritage-crimson)] transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:translate-x-2"
          >
            →
          </span>
        )}
      </div>
    </>
  );

  if (pathway.comingSoon) {
    return <div className={rowClasses}>{content}</div>;
  }

  return (
    <Link href={pathway.href} className={rowClasses}>
      {content}
    </Link>
  );
}
