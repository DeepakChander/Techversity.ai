"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { IndexNumeral } from "@/components/ui/IndexNumeral";
import { EditorialImage } from "@/components/ui/EditorialImage";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/**
 * Advisory — the five verbs.
 * Left column pinned with heading. Right column scrolls through chapters.
 * The aggressive act of restraint: verbs alone carry the visual weight.
 *
 * Qualify. Shortlist. Introduce. Shepherd. Confer.
 */

const CHAPTERS = [
  {
    num: "01",
    verb: "Qualify",
    line: "We review a life&rsquo;s work — not a CV.",
  },
  {
    num: "02",
    verb: "Shortlist",
    line: "We identify the universities that match.",
  },
  {
    num: "03",
    verb: "Introduce",
    line: "We make the introduction, formally.",
  },
  {
    num: "04",
    verb: "Shepherd",
    line: "We remain present through every step of consideration.",
  },
  {
    num: "05",
    verb: "Confer",
    line: "You are recognised.",
  },
];

export function Advisory() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const chapters = gsap.utils.toArray<HTMLElement>(".advisory-chapter");
      chapters.forEach((ch) => {
        gsap.from(ch, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ch,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--color-canvas-ivory)] border-t border-[var(--color-canvas-paper-edge)]"
    >
      <div className="max-w-[1440px] mx-auto px-8 lg:px-14 py-20 lg:py-24">
        {/* Header band — 2-col: text left, correspondence image right */}
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-12 pb-8 border-b border-[var(--color-canvas-paper-edge)]">
          <div className="lg:col-span-7">
            <IndexNumeral index="03" label="The advisory" total="08" />
            <h2
              className="type-display mt-6 text-[var(--color-ink-primary)]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)", lineHeight: 0.95 }}
            >
              The advisory, in five verbs.
            </h2>
            <p className="type-display-italic text-[var(--color-ink-muted)] mt-5 text-[16px] max-w-[30ch]">
              Every conferment follows the same unhurried rhythm. Average · 4–9 months.
            </p>
          </div>
          <div className="lg:col-span-5">
            <EditorialImage
              src="/images/editorial/home-advisory.webp"
              alt="A handwritten letter in progress on warm cream paper, fountain pen resting diagonally"
              motion="parallax"
              aspect={16 / 9}
              wrapperClassName="w-full"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>

        {/* Five chapters on one row */}
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4">
          {CHAPTERS.map((ch) => (
            <li
              key={ch.num}
              className="advisory-chapter py-6 lg:py-4 lg:px-5 lg:border-r border-[var(--color-canvas-paper-edge)] last:border-r-0 border-b lg:border-b-0 border-[var(--color-canvas-paper-edge)] last:border-b-0"
            >
              <span className="type-mono-label text-[var(--color-heritage-crimson)]">
                {ch.num}
              </span>
              <h3
                className="type-display text-[var(--color-ink-primary)] leading-[0.95] mt-4"
                style={{ fontSize: "clamp(2.25rem, 3.4vw, 3rem)" }}
              >
                {ch.verb}.
              </h3>
              <p
                className="type-display-italic text-[var(--color-ink-muted)] mt-3 text-[15px] leading-[1.4]"
                dangerouslySetInnerHTML={{ __html: ch.line }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
