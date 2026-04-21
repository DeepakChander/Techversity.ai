"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import type { ProgramPageData } from "@/lib/programs-data";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IndexNumeral } from "@/components/ui/IndexNumeral";
import { ButtonV2 } from "@/components/ui/ButtonV2";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

interface ProgramPageV2Props {
  data: ProgramPageData;
  programNumber: string;
  programLabel: string;
  subtitle: string;
}

/**
 * ProgramPageV2 — 2026 editorial program detail.
 * Reuses existing ProgramPageData; reimagines the layout per the redesign plan.
 */
export function ProgramPageV2({
  data,
  programNumber,
  programLabel,
  subtitle,
}: ProgramPageV2Props) {
  return (
    <>
      <div className="main-content">
        <Navbar />
        <main>
          <Hero
            data={data}
            programNumber={programNumber}
            programLabel={programLabel}
            subtitle={subtitle}
          />
          <Overview data={data} />
          <Eligibility data={data} />
          <Process data={data} />
          <Structure data={data} />
          <Documents data={data} />
          <FAQs data={data} />
          <Threshold data={data} />
        </main>
      </div>
      <Footer />
    </>
  );
}

/* ─── Hero ─── */
function Hero({
  data,
  programNumber,
  programLabel,
  subtitle,
}: ProgramPageV2Props) {
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
    <section className="relative bg-[var(--color-canvas-ivory)] border-b border-[var(--color-canvas-paper-edge)]">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-14 pt-36 lg:pt-44 pb-24 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <IndexNumeral
              index={`PROGRAM ${programNumber}`}
              label={programLabel}
            />
            <div className="mt-10 overflow-hidden">
              <h1
                ref={headlineRef}
                className="type-display text-[var(--color-ink-primary)] leading-[0.92]"
                style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)" }}
              >
                {data.title}.
              </h1>
            </div>
            <motion.p
              className="type-display-italic text-[var(--color-ink-muted)] mt-8 text-[22px] max-w-[32ch]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {subtitle}
            </motion.p>
          </div>

          <div className="lg:col-span-4">
            <motion.dl
              className="grid grid-cols-2 gap-6 pt-6 border-t border-[var(--color-canvas-paper-edge)]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>
                <dt className="type-mono-label text-[var(--color-heritage-crimson)]">
                  Duration
                </dt>
                <dd className="type-ui text-[var(--color-ink-primary)] text-[15px] mt-2">
                  {data.duration}
                </dd>
              </div>
              <div>
                <dt className="type-mono-label text-[var(--color-heritage-crimson)]">
                  Format
                </dt>
                <dd className="type-ui text-[var(--color-ink-primary)] text-[15px] mt-2">
                  {data.format}
                </dd>
              </div>
            </motion.dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Overview — editorial + stats ─── */
function Overview({ data }: { data: ProgramPageData }) {
  return (
    <section className="relative bg-[var(--color-canvas-bone)] border-b border-[var(--color-canvas-paper-edge)]">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-14 py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <IndexNumeral index="01" label="The recognition" total="07" />
            <h2
              className="type-display mt-8 text-[var(--color-ink-primary)]"
              style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)", lineHeight: 0.95 }}
            >
              What is a {data.title}.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="type-ui text-[var(--color-ink-primary)] text-[18px] leading-[1.6] max-w-[62ch]">
              {data.overview}
            </p>

            <dl className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 pt-10 border-t border-[var(--color-canvas-paper-edge)]">
              {data.overviewStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="type-mono-label text-[var(--color-heritage-crimson)]">
                    {stat.label}
                  </dt>
                  <dd
                    className="type-display text-[var(--color-ink-primary)] mt-3 tabular-nums"
                    style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
                  >
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Eligibility — museum-wall metadata grid ─── */
function Eligibility({ data }: { data: ProgramPageData }) {
  return (
    <section className="relative bg-[var(--color-canvas-ivory)] border-b border-[var(--color-canvas-paper-edge)]">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-14 py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <IndexNumeral index="02" label="Consideration" total="07" />
            <h2
              className="type-display mt-8 text-[var(--color-ink-primary)]"
              style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)", lineHeight: 0.95 }}
            >
              Who is considered.
            </h2>
            <p className="type-display-italic text-[var(--color-ink-muted)] mt-6 text-[18px] max-w-[32ch]">
              The record should be legible before the conversation begins.
            </p>
          </div>
          <div className="lg:col-span-8">
            <ul className="grid md:grid-cols-2 gap-0 border-t border-l border-[var(--color-canvas-paper-edge)]">
              {data.eligibility.map((trait, i) => (
                <li
                  key={i}
                  className="border-r border-b border-[var(--color-canvas-paper-edge)] p-8 bg-[var(--color-canvas-bone)]"
                >
                  <span className="type-mono-meta text-[var(--color-heritage-crimson)]">
                    TRAIT {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <p className="type-ui text-[var(--color-ink-primary)] text-[17px] mt-4 leading-[1.55]">
                    {trait}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Process — sticky chapter scroll ─── */
function Process({ data }: { data: ProgramPageData }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;
      const steps = gsap.utils.toArray<HTMLElement>(".process-step");
      steps.forEach((step) => {
        gsap.from(step, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 82%",
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
      className="relative bg-[var(--color-canvas-bone)] border-b border-[var(--color-canvas-paper-edge)]"
    >
      <div className="max-w-[1440px] mx-auto px-8 lg:px-14 py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <IndexNumeral index="03" label="The process" total="07" />
              <h2
                className="type-display mt-8 text-[var(--color-ink-primary)]"
                style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)", lineHeight: 0.95 }}
              >
                How we proceed.
              </h2>
            </div>
          </div>
          <div className="lg:col-span-8">
            <ul>
              {data.process.map((step) => (
                <li
                  key={step.step}
                  className="process-step py-10 lg:py-14 border-b border-[var(--color-canvas-paper-edge)] last:border-b-0"
                >
                  <div className="flex items-baseline gap-5">
                    <span className="type-mono-label text-[var(--color-heritage-crimson)]">
                      {step.step.toString().padStart(2, "0")}
                    </span>
                    <h3
                      className="type-display text-[var(--color-ink-primary)]"
                      style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1 }}
                    >
                      {step.title}.
                    </h3>
                  </div>
                  <p className="type-ui text-[var(--color-ink-muted)] text-[17px] mt-5 leading-[1.6] max-w-[62ch] pl-[calc(1.5rem+12px)]">
                    {step.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Structure — phases ─── */
function Structure({ data }: { data: ProgramPageData }) {
  return (
    <section className="relative bg-[var(--color-canvas-ivory)] border-b border-[var(--color-canvas-paper-edge)]">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-14 py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-4">
            <IndexNumeral index="04" label="Structure" total="07" />
          </div>
          <div className="lg:col-span-8">
            <h2
              className="type-display text-[var(--color-ink-primary)]"
              style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)", lineHeight: 0.95 }}
            >
              {data.programStructure.title}.
            </h2>
            <p className="type-display-italic text-[var(--color-ink-muted)] mt-6 text-[19px] max-w-[52ch]">
              {data.programStructure.description}
            </p>
          </div>
        </div>

        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {data.programStructure.phases.map((phase, i) => (
            <li
              key={phase.name}
              className="bg-[var(--color-canvas-bone)] border border-[var(--color-canvas-paper-edge)] p-8"
            >
              <span className="type-mono-meta text-[var(--color-heritage-crimson)]">
                {(i + 1).toString().padStart(2, "0")} · {phase.duration}
              </span>
              <h3
                className="type-display text-[var(--color-ink-primary)] mt-5"
                style={{ fontSize: "clamp(1.5rem, 2.2vw, 1.875rem)", lineHeight: 1.1 }}
              >
                {phase.name}.
              </h3>
              <ul className="mt-6 space-y-3 pt-5 border-t border-[var(--color-canvas-paper-edge)]">
                {phase.items.map((item) => (
                  <li
                    key={item}
                    className="type-ui text-[var(--color-ink-muted)] text-[14.5px] leading-[1.55]"
                  >
                    — {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─── Documents ─── */
function Documents({ data }: { data: ProgramPageData }) {
  return (
    <section className="relative bg-[var(--color-canvas-bone)] border-b border-[var(--color-canvas-paper-edge)]">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-14 py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <IndexNumeral index="05" label="Required" total="07" />
            <h2
              className="type-display mt-8 text-[var(--color-ink-primary)]"
              style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)", lineHeight: 0.95 }}
            >
              What we will ask for.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <ol className="flex flex-col">
              {data.documents.map((doc, i) => (
                <li
                  key={i}
                  className="flex items-start gap-6 py-6 border-b border-[var(--color-canvas-paper-edge)] last:border-b-0"
                >
                  <span className="type-mono-meta text-[var(--color-ink-whisper)] pt-1">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="type-ui text-[var(--color-ink-primary)] text-[17px] leading-[1.55]">
                    {doc}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQs — editorial Q&A (no accordion) ─── */
function FAQs({ data }: { data: ProgramPageData }) {
  return (
    <section className="relative bg-[var(--color-canvas-ivory)] border-b border-[var(--color-canvas-paper-edge)]">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-14 py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <IndexNumeral index="06" label="Voices" total="07" />
            <h2
              className="type-display mt-8 text-[var(--color-ink-primary)]"
              style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)", lineHeight: 0.95 }}
            >
              Questions we are asked.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <ol className="divide-y divide-[var(--color-canvas-paper-edge)]">
              {data.faqs.map((faq, i) => (
                <li key={i} className="py-8 lg:py-10">
                  <div className="flex items-baseline gap-5">
                    <span className="type-mono-meta text-[var(--color-ink-whisper)]">
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    <h3
                      className="type-display text-[var(--color-ink-primary)]"
                      style={{ fontSize: "clamp(1.25rem, 2vw, 1.625rem)", lineHeight: 1.2 }}
                    >
                      {faq.question}
                    </h3>
                  </div>
                  <p className="type-ui text-[var(--color-ink-muted)] text-[16px] leading-[1.65] mt-4 max-w-[62ch] pl-[calc(2rem+20px)]">
                    {faq.answer}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Threshold — closing invitation ─── */
function Threshold({ data }: { data: ProgramPageData }) {
  return (
    <section className="relative bg-[var(--color-canvas-ivory)]">
      <div className="max-w-[1200px] mx-auto px-8 lg:px-14 py-32 lg:py-48 flex flex-col items-center text-center border-t border-[var(--color-canvas-paper-edge)]">
        <IndexNumeral index="07" label="Threshold" total="07" />
        <p
          className="type-display text-[var(--color-ink-primary)] leading-[1.05] mt-12 max-w-[30ch]"
          style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
        >
          If this pathway fits your record, let us begin.
        </p>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-5">
          <ButtonV2 href="/apply" variant="heritage" size="lg" showArrow>
            Begin the {data.title} conversation
          </ButtonV2>
          <ButtonV2 href="/programs" variant="quiet" size="md" showArrow>
            Explore other pathways
          </ButtonV2>
        </div>
        <div className="mt-10 type-mono-meta text-[var(--color-ink-muted)]">
          RESPONSES WITHIN 48 HOURS · CONFIDENTIAL · NO FEE FOR THE FIRST CONVERSATION
        </div>
      </div>
      <InternalNav />
    </section>
  );
}

/* ─── Internal navigation between program pages ─── */
function InternalNav() {
  const links = [
    { href: "/programs/honorary-doctorate", label: "Honorary Doctorate", num: "001" },
    { href: "/programs/dba", label: "Doctor of Business Administration", num: "002" },
    { href: "/programs/phd", label: "Doctor of Philosophy", num: "003" },
  ];

  return (
    <nav
      className="max-w-[1440px] mx-auto px-8 lg:px-14 py-12 border-t border-[var(--color-canvas-paper-edge)]"
      aria-label="Other programmes"
    >
      <div className="flex items-center justify-between gap-6 flex-wrap">
        <span className="type-mono-meta text-[var(--color-ink-muted)]">
          OTHER PROGRAMMES
        </span>
        <ul className="flex items-center gap-8 flex-wrap">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group inline-flex items-center gap-3 type-ui text-[var(--color-ink-primary)] hover:text-[var(--color-heritage-crimson)] transition-colors duration-500 ease-[var(--ease-editorial)]"
              >
                <span className="type-mono-meta text-[var(--color-ink-whisper)] group-hover:text-[var(--color-heritage-crimson)] transition-colors duration-500">
                  {link.num}
                </span>
                <span className="link-editorial">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
