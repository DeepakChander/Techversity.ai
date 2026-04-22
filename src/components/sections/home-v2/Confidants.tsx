"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { IndexNumeral } from "@/components/ui/IndexNumeral";
import { EditorialLink } from "@/components/ui/EditorialLink";
import { UNIVERSITIES } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/**
 * Confidants — four featured institutional editorial portraits.
 * Reads from `UNIVERSITIES` in constants; filters to `featured: true`.
 * The full network (all 8 partners) lives on /universities.
 */

const FEATURED = UNIVERSITIES.filter((u) => u.featured).slice(0, 4);

export function Confidants() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const cards = gsap.utils.toArray<HTMLElement>(".confidant-card");
      cards.forEach((card) => {
        const illustration = card.querySelector<HTMLElement>(".confidant-illustration");
        if (illustration) {
          gsap.from(illustration, {
            scale: 0.88,
            opacity: 0.4,
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 30%",
              scrub: 1,
            },
          });
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--color-canvas-bone)] border-t border-[var(--color-canvas-paper-edge)]"
    >
      <div className="max-w-[1440px] mx-auto px-8 lg:px-14 py-20 lg:py-24">
        {/* Header band */}
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12 pb-8 border-b border-[var(--color-canvas-paper-edge)]">
          <div>
            <IndexNumeral index="04" label="The network" total="08" />
            <h2
              className="type-display mt-6 text-[var(--color-ink-primary)]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)", lineHeight: 0.95 }}
            >
              The institutions that do the conferring.
            </h2>
          </div>
          <p className="type-display-italic text-[var(--color-ink-muted)] text-[16px] max-w-[30ch]">
            The network is small by design. Breadth is for logo walls.
          </p>
        </div>

        {/* 2×2 compact grid */}
        <ul className="grid md:grid-cols-2 gap-0 border-t border-l border-[var(--color-canvas-paper-edge)]">
          {FEATURED.map((u, i) => (
            <li
              key={u.id}
              className="confidant-card grid grid-cols-5 gap-5 p-7 lg:p-9 border-r border-b border-[var(--color-canvas-paper-edge)]"
            >
              {/* Plate */}
              <div className="col-span-2">
                <div className="confidant-illustration aspect-square bg-[var(--color-canvas-ivory)] border border-[var(--color-canvas-paper-edge)] flex items-center justify-center relative overflow-hidden">
                  <span
                    className="type-display text-[var(--color-ink-primary)] opacity-10 select-none"
                    style={{ fontSize: "clamp(5rem, 10vw, 8rem)", lineHeight: 0.8 }}
                  >
                    {u.name.charAt(0)}
                  </span>
                  <div
                    className="absolute left-4 right-4 bottom-4 h-px"
                    style={{ backgroundColor: `#${u.accent}`, opacity: 0.4 }}
                  />
                  <span className="absolute top-3 left-3 type-mono-meta text-[var(--color-ink-whisper)] text-[10px]">
                    {(i + 1).toString().padStart(3, "0")}
                  </span>
                </div>
              </div>

              {/* Editorial */}
              <div className="col-span-3 flex flex-col justify-between gap-4">
                <div>
                  <span className="type-mono-meta text-[var(--color-ink-whisper)] text-[10px]">
                    CONFIDANT {(i + 1).toString().padStart(3, "0")}
                  </span>
                  <h3
                    className="type-display text-[var(--color-ink-primary)] mt-1"
                    style={{ fontSize: "clamp(1.25rem, 1.8vw, 1.625rem)", lineHeight: 1.05 }}
                  >
                    {u.name}
                  </h3>
                  <p className="type-ui text-[var(--color-ink-muted)] mt-3 text-[13.5px] leading-[1.5]">
                    {u.location}
                  </p>
                </div>

                <dl className="grid grid-cols-2 gap-3 pt-3 border-t border-[var(--color-canvas-paper-edge)]">
                  <div>
                    <dt className="type-mono-meta text-[var(--color-heritage-crimson)] text-[10px]">
                      Accreditation
                    </dt>
                    <dd className="type-ui text-[var(--color-ink-primary)] text-[12px] mt-1 leading-[1.35]">
                      {u.accreditation}
                    </dd>
                  </div>
                  <div>
                    <dt className="type-mono-meta text-[var(--color-heritage-crimson)] text-[10px]">
                      Programmes
                    </dt>
                    <dd className="type-ui text-[var(--color-ink-primary)] text-[12px] mt-1 leading-[1.35]">
                      {u.programs.map((p) => p.replace("Honorary Doctorate", "Hon. Doctorate")).join(" · ")}
                    </dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12 pt-8 border-t border-[var(--color-canvas-paper-edge)] flex flex-wrap items-center justify-between gap-6">
          <p className="type-display-italic text-[var(--color-ink-muted)] text-[16px] max-w-[40ch]">
            The full network of {UNIVERSITIES.length} institutions lives on the network page.
          </p>
          <EditorialLink href="/universities">
            Read the full network
          </EditorialLink>
        </div>
      </div>
    </section>
  );
}
