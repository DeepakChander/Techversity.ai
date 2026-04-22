"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IndexNumeral } from "@/components/ui/IndexNumeral";
import { ButtonV2 } from "@/components/ui/ButtonV2";
import { UNIVERSITIES } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

/**
 * Universities — editorial institutional portraits.
 * Each partner gets a full editorial spread with illustration plate +
 * museum-wall metadata. Not a logo wall of equals.
 *
 * Reference: Ravi Klaassens (image-as-margin), MERSI Architecture
 *            (diptych spreads), Getty Tracing Art (institutional data
 *            as narrative).
 */

/* Fallback accent if a university omits its own. Accent is read primarily
   from the university's `accent` field on UNIVERSITIES, falling back here. */
const FALLBACK_ACCENT = "#1E2A47";

export default function UniversitiesPage() {
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
                    index="THE NETWORK"
                    label={`${UNIVERSITIES.length} confidants`}
                  />
                  <div className="mt-10 overflow-hidden">
                    <h1
                      ref={headlineRef}
                      className="type-display text-[var(--color-ink-primary)] leading-[0.92]"
                      style={{ fontSize: "clamp(3rem, 9vw, 8.5rem)" }}
                    >
                      Four institutions that do the conferring.
                    </h1>
                  </div>
                </div>
                <div className="lg:col-span-3">
                  <motion.p
                    className="type-display-italic text-[var(--color-ink-muted)] text-[19px] max-w-[34ch]"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  >
                    The network is small by design. Breadth is for logo walls — depth is for recipients.
                  </motion.p>
                </div>
              </div>
            </div>
          </section>

          {/* ─── Four institutional spreads ─── */}
          <section className="relative bg-[var(--color-canvas-ivory)]">
            <ul>
              {UNIVERSITIES.map((u, i) => (
                <li key={u.id}>
                  <UniversitySpread
                    university={u}
                    position={i + 1}
                    total={UNIVERSITIES.length}
                    accent={"accent" in u && u.accent ? `#${u.accent}` : FALLBACK_ACCENT}
                  />
                </li>
              ))}
            </ul>
          </section>

          {/* ─── The Network Report ─── */}
          <section className="relative bg-[var(--color-canvas-bone)] border-t border-[var(--color-canvas-paper-edge)]">
            <div className="max-w-[1440px] mx-auto px-8 lg:px-14 py-20 lg:py-28">
              <div className="grid lg:grid-cols-12 gap-10 items-end">
                <div className="lg:col-span-8">
                  <IndexNumeral index="/" label="The network report" />
                  <h2
                    className="type-display text-[var(--color-ink-primary)] mt-8 leading-[0.95]"
                    style={{ fontSize: "clamp(2.25rem, 5vw, 4.25rem)" }}
                  >
                    The Techversity Network Report 2026.
                  </h2>
                  <p className="type-display-italic text-[var(--color-ink-muted)] mt-6 text-[19px] max-w-[54ch]">
                    An annual editorial on each institution — its accreditation, its doctoral philosophy, and the recipient profile it best suits. Eighteen pages, issued every March.
                  </p>
                </div>
                <div className="lg:col-span-4 flex lg:justify-end">
                  <ButtonV2 href="/contact" variant="ghost" size="md" showArrow>
                    Request the report
                  </ButtonV2>
                </div>
              </div>
            </div>
          </section>

          {/* ─── Closing threshold ─── */}
          <section className="relative bg-[var(--color-canvas-ivory)] border-t border-[var(--color-canvas-paper-edge)]">
            <div className="max-w-[1200px] mx-auto px-8 lg:px-14 py-28 lg:py-40 flex flex-col items-center text-center">
              <p
                className="type-display text-[var(--color-ink-primary)] leading-[1.05] max-w-[28ch]"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
              >
                Uncertain which institution fits?
              </p>
              <p className="type-display-italic text-[var(--color-ink-muted)] mt-5 text-[19px] max-w-[44ch]">
                The match is part of the advisory. We will recommend on reading your record.
              </p>
              <div className="mt-12">
                <ButtonV2 href="/apply" variant="heritage" size="md" showArrow>
                  Begin the conversation
                </ButtonV2>
              </div>
              <div className="mt-8 type-mono-meta text-[var(--color-ink-muted)]">
                RESPONSES WITHIN 48 HOURS · CONFIDENTIAL
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

/* ─── Individual institutional editorial spread ─── */
function UniversitySpread({
  university,
  position,
  total,
  accent,
}: {
  university: (typeof UNIVERSITIES)[number];
  position: number;
  total: number;
  accent: string;
}) {
  const spreadRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const plate = spreadRef.current?.querySelector<HTMLElement>(".university-plate");
      if (plate) {
        gsap.from(plate, {
          scale: 0.9,
          opacity: 0.4,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: spreadRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
        });
      }

      const metas = spreadRef.current?.querySelectorAll<HTMLElement>(".university-meta");
      if (metas && metas.length > 0) {
        gsap.from(metas, {
          opacity: 0,
          y: 30,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: spreadRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      }
    },
    { scope: spreadRef }
  );

  return (
    <div
      ref={spreadRef}
      className="max-w-[1440px] mx-auto px-8 lg:px-14 py-20 lg:py-32 border-b border-[var(--color-canvas-paper-edge)] last:border-b-0"
    >
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* ─── Left: plate illustration ─── */}
        <div className="lg:col-span-5">
          <div className="university-plate relative aspect-[4/5] bg-[var(--color-canvas-bone)] border border-[var(--color-canvas-paper-edge)] overflow-hidden">
            {/* Architectural serif initial */}
            <span
              className="absolute inset-0 flex items-center justify-center type-display text-[var(--color-ink-primary)] select-none"
              style={{
                fontSize: "clamp(14rem, 30vw, 24rem)",
                lineHeight: 0.8,
                opacity: 0.1,
              }}
            >
              {university.name.charAt(0)}
            </span>

            {/* Accent hairline */}
            <div
              className="absolute bottom-12 left-12 right-12 h-px"
              style={{ backgroundColor: accent, opacity: 0.5 }}
            />

            {/* Corner meta */}
            <span className="absolute top-10 left-10 type-mono-meta text-[var(--color-ink-whisper)]">
              {position.toString().padStart(3, "0")}
            </span>
            <span className="absolute top-10 right-10 type-mono-meta text-[var(--color-ink-whisper)]">
              {position.toString().padStart(2, "0")} / {total.toString().padStart(2, "0")}
            </span>
            <span className="absolute bottom-10 left-10 type-mono-meta text-[var(--color-ink-muted)]">
              {university.region.toUpperCase()}
            </span>
            <span className="absolute bottom-10 right-10 type-mono-meta text-[var(--color-ink-muted)]">
              EST. {university.established}
            </span>
          </div>
        </div>

        {/* ─── Right: editorial ─── */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          <div>
            <span className="type-mono-meta text-[var(--color-ink-whisper)] university-meta">
              CONFIDANT {position.toString().padStart(3, "0")} · {university.location.toUpperCase()}
            </span>
            <h2
              className="type-display text-[var(--color-ink-primary)] university-meta mt-5"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 0.95 }}
            >
              {university.name}.
            </h2>
            <p className="type-display-italic text-[var(--color-ink-muted)] university-meta mt-6 text-[20px] max-w-[54ch]">
              {university.description}
            </p>
            <p className="type-ui text-[var(--color-ink-primary)] university-meta mt-6 text-[16.5px] leading-[1.6] max-w-[60ch]">
              {university.fullDescription}
            </p>
          </div>

          {/* Museum-wall metadata */}
          <dl className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-8 pt-8 border-t border-[var(--color-canvas-paper-edge)] university-meta">
            <div>
              <dt className="type-mono-label text-[var(--color-heritage-crimson)]">
                Accreditation
              </dt>
              <dd className="type-ui text-[var(--color-ink-primary)] text-[15px] mt-3">
                {university.accreditation}
              </dd>
            </div>
            <div>
              <dt className="type-mono-label text-[var(--color-heritage-crimson)]">
                Established
              </dt>
              <dd className="type-ui text-[var(--color-ink-primary)] text-[15px] mt-3">
                {university.established}
              </dd>
            </div>
            <div>
              <dt className="type-mono-label text-[var(--color-heritage-crimson)]">
                Region
              </dt>
              <dd className="type-ui text-[var(--color-ink-primary)] text-[15px] mt-3">
                {university.region}
              </dd>
            </div>
          </dl>

          {/* Programmes + specializations */}
          <div className="grid md:grid-cols-2 gap-10 university-meta">
            <div>
              <span className="type-mono-label text-[var(--color-heritage-crimson)]">
                Programmes offered
              </span>
              <ul className="mt-4 flex flex-col gap-2">
                {university.programs.map((p) => (
                  <li
                    key={p}
                    className="type-ui text-[var(--color-ink-primary)] text-[16px]"
                  >
                    — {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="type-mono-label text-[var(--color-heritage-crimson)]">
                Specialisations
              </span>
              <ul className="mt-4 flex flex-col gap-2">
                {university.specializations.map((s) => (
                  <li
                    key={s}
                    className="type-display-italic text-[var(--color-ink-muted)] text-[16px]"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
