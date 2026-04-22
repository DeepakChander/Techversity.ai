"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IndexNumeral } from "@/components/ui/IndexNumeral";
import { ButtonV2 } from "@/components/ui/ButtonV2";
import { EditorialImage } from "@/components/ui/EditorialImage";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

/**
 * Programs index — magazine table-of-contents.
 * Reference: Aristide Benoist indexed project list;
 *            Matthew Galloway typographic restraint.
 */

interface PathwayEntry {
  index: string;
  title: string;
  tagline: string;
  meta: string[];
  href: string;
  comingSoon?: boolean;
  body: string;
}

const PATHWAYS: PathwayEntry[] = [
  {
    index: "001",
    title: "Honorary Doctorate",
    tagline:
      "A formal recognition for work that has already reshaped a field.",
    meta: ["By invitation", "Portfolio reviewed", "4–6 months"],
    href: "/programs/honorary-doctorate",
    body: "Awarded by the university on the strength of professional record — not on coursework, residency, or defended dissertation. For careers whose contribution has already settled.",
  },
  {
    index: "002",
    title: "Doctor of Business Administration",
    tagline: "Applied research returning, with discipline, to practice.",
    meta: ["Cohort", "18–36 months", "Online + residencies"],
    href: "/programs/dba",
    body: "A professional doctorate built for senior operators who want to contribute original research to business practice — rigor without abandoning application.",
  },
  {
    index: "003",
    title: "Doctor of Philosophy",
    tagline: "An original contribution to knowledge, defended.",
    meta: ["Individual supervision", "24–48 months", "Dissertation"],
    href: "/programs/phd",
    body: "The traditional research doctorate, pursued one-to-one with a supervisor. For the record that requires formal academic scholarship and a defended thesis.",
  },
  {
    index: "004",
    title: "Bachelor’s & Master’s",
    tagline:
      "For professionals returning to the record at an earlier chapter.",
    meta: ["Programme opening 2026", "To be announced"],
    href: "#",
    comingSoon: true,
    body: "Formal credentials for accomplished professionals whose careers preceded their degrees. Details forthcoming.",
  },
];

export default function ProgramsPage() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const h = headlineRef.current;
    if (!h) return;
    const split = new SplitText(h, { type: "words" });
    gsap.set(split.words, { yPercent: 110, opacity: 0 });
    gsap.to(split.words, {
      yPercent: 0,
      opacity: 1,
      duration: 1.1,
      stagger: 0.06,
      ease: "power3.out",
      delay: 0.2,
    });
  }, []);

  return (
    <>
      <div className="main-content">
        <Navbar />
        <main>
          {/* ─── Header ─── */}
          <section className="relative bg-[var(--color-canvas-ivory)] border-b border-[var(--color-canvas-paper-edge)]">
            <div className="max-w-[1440px] mx-auto px-8 lg:px-14 pt-40 lg:pt-48 pb-20 lg:pb-28">
              <div className="grid lg:grid-cols-12 gap-10 items-end">
                <div className="lg:col-span-9">
                  <IndexNumeral
                    index="THE PROGRAMMES"
                    label="Four offered"
                  />
                  <div className="mt-10 overflow-hidden">
                    <h1
                      ref={headlineRef}
                      className="type-display text-[var(--color-ink-primary)] leading-[0.92]"
                      style={{ fontSize: "clamp(3rem, 9vw, 8.5rem)" }}
                    >
                      Four pathways to the record.
                    </h1>
                  </div>
                </div>
                <div className="lg:col-span-3">
                  <motion.p
                    className="type-display-italic text-[var(--color-ink-muted)] text-[19px] max-w-[36ch]"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Each recognises a different dimension of a life&rsquo;s work. One always fits.
                  </motion.p>
                </div>
              </div>
            </div>
          </section>

          {/* ─── Establishing shot ─── */}
          <EditorialImage
            src="/images/editorial/programs-establishing.webp"
            alt="An older hand resting on the worn caramel-leather arm of a chair, a single unadorned ring on the third finger"
            motion="mask"
            aspect={21 / 9}
            wrapperClassName="w-full"
            sizes="100vw"
          />

          {/* ─── Magazine TOC ─── */}
          <section className="relative bg-[var(--color-canvas-ivory)]">
            <div className="max-w-[1440px] mx-auto px-8 lg:px-14">
              <ol>
                {PATHWAYS.map((p, i) => (
                  <li
                    key={p.index}
                    className="border-b border-[var(--color-canvas-paper-edge)] last:border-b-0"
                  >
                    <PathwayRow
                      pathway={p}
                      position={i + 1}
                      total={PATHWAYS.length}
                    />
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* ─── Closing threshold ─── */}
          <section className="relative bg-[var(--color-canvas-bone)] border-t border-[var(--color-canvas-paper-edge)]">
            <div className="max-w-[1200px] mx-auto px-8 lg:px-14 py-24 lg:py-32 flex flex-col items-center text-center">
              <IndexNumeral index="/" label="Uncertain which fits?" />
              <p
                className="type-display text-[var(--color-ink-primary)] leading-[1.05] mt-10 max-w-[32ch]"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
              >
                Begin with a conversation. The pathway will become clear.
              </p>
              <div className="mt-10">
                <ButtonV2 href="/apply" variant="heritage" size="md" showArrow>
                  Begin the conversation
                </ButtonV2>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

function PathwayRow({
  pathway,
  position,
  total,
}: {
  pathway: PathwayEntry;
  position: number;
  total: number;
}) {
  const rowClasses =
    "group relative grid lg:grid-cols-12 gap-6 lg:gap-10 py-12 lg:py-16";

  const content = (
    <>
      {/* Index */}
      <div className="lg:col-span-2">
        <IndexNumeral index={pathway.index} />
        <div className="type-mono-meta text-[var(--color-ink-whisper)] mt-3">
          {position.toString().padStart(2, "0")} / {total.toString().padStart(2, "0")}
        </div>
      </div>

      {/* Title block */}
      <div className="lg:col-span-6">
        <h2
          className="type-display text-[var(--color-ink-primary)] leading-[0.95] transition-colors duration-700 ease-[var(--ease-editorial)] group-hover:text-[var(--color-heritage-crimson)]"
          style={{ fontSize: "clamp(2.25rem, 5.2vw, 4.75rem)" }}
        >
          {pathway.title}.
        </h2>
        <p className="type-display-italic text-[var(--color-ink-muted)] mt-5 text-[20px] max-w-[44ch]">
          {pathway.tagline}
        </p>
        <p className="type-ui text-[var(--color-ink-muted)] mt-6 text-[16px] leading-[1.6] max-w-[58ch]">
          {pathway.body}
        </p>
      </div>

      {/* Metadata + CTA */}
      <div className="lg:col-span-4 flex flex-col justify-between gap-8">
        <ul className="flex flex-col gap-2">
          {pathway.meta.map((m) => (
            <li key={m} className="type-mono-meta text-[var(--color-ink-muted)]">
              · {m}
            </li>
          ))}
        </ul>
        {!pathway.comingSoon && (
          <div className="flex items-center gap-3 type-mono-label text-[var(--color-heritage-crimson)]">
            <span className="link-editorial">Read the chapter</span>
            <span
              aria-hidden
              className="transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:translate-x-2"
            >
              →
            </span>
          </div>
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
