"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { IndexNumeral } from "@/components/ui/IndexNumeral";
import { EditorialLink } from "@/components/ui/EditorialLink";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/**
 * Confidants — four institutional editorial portraits.
 * NOT a logo wall of equals. Each partner gets the weight of a
 * half-spread magazine feature: large architectural-style illustration,
 * serif name, museum-wall metadata row.
 */

interface University {
  index: string;
  name: string;
  location: string;
  story: string;
  accreditation: string;
  recognition: string;
  programs: string;
  accent: string;
}

const UNIVERSITIES: University[] = [
  {
    index: "001",
    name: "CC University",
    location: "Washington, D.C., United States",
    story:
      "A modern university known for rigorous professional doctorates and a measured, senior cohort.",
    accreditation: "ISO 9001:2015",
    recognition: "Nationally Accredited",
    programs: "Hon. Doctorate · DBA · PhD",
    accent: "1E2A47",
  },
  {
    index: "002",
    name: "Washington Digital University",
    location: "Seattle, United States",
    story:
      "Pioneer of convergent digital–academic doctoral programmes for accomplished professionals.",
    accreditation: "Nationally Accredited",
    recognition: "Online Doctoral Authority",
    programs: "Hon. Doctorate · DBA",
    accent: "5A554E",
  },
  {
    index: "003",
    name: "Euro-Asian University",
    location: "Tallinn, Estonia",
    story:
      "An EU-recognised bridge between Eastern and Western academic traditions, digitally advanced.",
    accreditation: "EU Recognised",
    recognition: "National + International",
    programs: "Hon. Doctorate · PhD",
    accent: "8C2A2A",
  },
  {
    index: "004",
    name: "ESDST",
    location: "European Union",
    story:
      "Doctoral conferments across multiple EU member states, rooted in pan-European scholarship.",
    accreditation: "EU Recognised",
    recognition: "Multi-State Conferment",
    programs: "Hon. Doctorate · DBA · PhD",
    accent: "C8A96A",
  },
];

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
              Four institutions that do the conferring.
            </h2>
          </div>
          <p className="type-display-italic text-[var(--color-ink-muted)] text-[16px] max-w-[30ch]">
            The network is small by design. Breadth is for logo walls.
          </p>
        </div>

        {/* 2×2 compact grid on desktop, 1-col on mobile */}
        <ul className="grid md:grid-cols-2 gap-0 border-t border-l border-[var(--color-canvas-paper-edge)]">
          {UNIVERSITIES.map((u) => (
            <li
              key={u.index}
              className="confidant-card grid grid-cols-5 gap-5 p-7 lg:p-9 border-r border-b border-[var(--color-canvas-paper-edge)]"
            >
              {/* ─── Left: plate ─── */}
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
                    {u.index}
                  </span>
                </div>
              </div>

              {/* ─── Right: editorial ─── */}
              <div className="col-span-3 flex flex-col justify-between gap-4">
                <div>
                  <span className="type-mono-meta text-[var(--color-ink-whisper)]">
                    CONFIDANT {u.index}
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

                {/* Compact metadata */}
                <dl className="grid grid-cols-2 gap-3 pt-3 border-t border-[var(--color-canvas-paper-edge)]">
                  <div>
                    <dt className="type-mono-meta text-[var(--color-heritage-crimson)] text-[10px]">
                      Accreditation
                    </dt>
                    <dd className="type-ui text-[var(--color-ink-primary)] text-[12px] mt-1">
                      {u.accreditation}
                    </dd>
                  </div>
                  <div>
                    <dt className="type-mono-meta text-[var(--color-heritage-crimson)] text-[10px]">
                      Programmes
                    </dt>
                    <dd className="type-ui text-[var(--color-ink-primary)] text-[12px] mt-1">
                      {u.programs}
                    </dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12 pt-8 border-t border-[var(--color-canvas-paper-edge)] flex flex-wrap items-center justify-between gap-6">
          <p className="type-display-italic text-[var(--color-ink-muted)] text-[16px] max-w-[40ch]">
            The full institutional record lives on the network page.
          </p>
          <EditorialLink href="/universities">
            Read the full network
          </EditorialLink>
        </div>
      </div>
    </section>
  );
}
