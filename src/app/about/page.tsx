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
import { EditorialImage } from "@/components/ui/EditorialImage";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

export default function AboutPage() {
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
                  <IndexNumeral index="ABOUT" label="The firm" />
                  <div className="mt-10 overflow-hidden">
                    <h1
                      ref={headlineRef}
                      className="type-display text-[var(--color-ink-primary)] leading-[0.92]"
                      style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
                    >
                      An advisory, not a university.
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
                    Techversity introduces, vets, and shepherds. The university confers.
                  </motion.p>
                </div>
              </div>
            </div>
          </section>

          {/* ─── Who we are ─── */}
          <section className="relative bg-[var(--color-canvas-bone)] border-b border-[var(--color-canvas-paper-edge)]">
            <div className="max-w-[1440px] mx-auto px-8 lg:px-14 py-24 lg:py-32">
              <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
                <div className="lg:col-span-4">
                  <IndexNumeral index="01" label="The firm" total="05" />
                  <h2
                    className="type-display mt-8 text-[var(--color-ink-primary)]"
                    style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)", lineHeight: 0.95 }}
                  >
                    What we are.
                  </h2>
                </div>
                <div className="lg:col-span-8">
                  <p className="type-ui text-[var(--color-ink-primary)] text-[18px] leading-[1.65] max-w-[62ch]">
                    Techversity is an advisory. We do not confer degrees — we introduce accomplished professionals to the accredited institutions that do. The firm operates as the intermediary the process has always needed, sitting between a recipient whose record merits recognition and an institution with the authority to formalise it.
                  </p>
                  <p className="type-ui text-[var(--color-ink-primary)] text-[18px] leading-[1.65] max-w-[62ch] mt-6">
                    The posture is European-editorial: discreet, measured, unhurried. We work with a small network of accredited universities in Switzerland, Malta, France, Georgia, the United States, and across the European Union — chosen for the depth of their conferment practice, not the breadth of their advertising.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ─── Who we serve ─── */}
          <section className="relative bg-[var(--color-canvas-ivory)] border-b border-[var(--color-canvas-paper-edge)]">
            <div className="max-w-[1440px] mx-auto px-8 lg:px-14 py-24 lg:py-32">
              <div className="grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-4">
                  <IndexNumeral index="02" label="The audience" total="05" />
                  <h2
                    className="type-display mt-8 text-[var(--color-ink-primary)]"
                    style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)", lineHeight: 0.95 }}
                  >
                    Who we serve.
                  </h2>
                  <p className="type-display-italic text-[var(--color-ink-muted)] mt-6 text-[18px] max-w-[32ch]">
                    The record should be legible before the conversation begins.
                  </p>
                </div>
                <div className="lg:col-span-8">
                  <ul className="grid md:grid-cols-2 gap-0 border-t border-l border-[var(--color-canvas-paper-edge)]">
                    {[
                      {
                        title: "Senior practitioners",
                        body: "Professionals with fifteen or more years of sustained work in a single discipline. Not beginners seeking credentials — people whose credentials are already the work itself.",
                      },
                      {
                        title: "Founders and operators",
                        body: "Those who have built, scaled, or led institutions of consequence. Technology, finance, medicine, the arts, public policy, industry.",
                      },
                      {
                        title: "Authors and scholars",
                        body: "Those who have codified their work — through books, papers, patents, or bodies of research that have shaped a field.",
                      },
                      {
                        title: "Institutional leaders",
                        body: "Chairs, trustees, presidents, and long-tenured executives whose contribution is a matter of record in their sector.",
                      },
                    ].map((item, i) => (
                      <li
                        key={item.title}
                        className="border-r border-b border-[var(--color-canvas-paper-edge)] p-8 bg-[var(--color-canvas-bone)]"
                      >
                        <span className="type-mono-meta text-[var(--color-heritage-crimson)]">
                          {(i + 1).toString().padStart(2, "0")}
                        </span>
                        <h3 className="type-display text-[var(--color-ink-primary)] mt-4 text-[22px]">
                          {item.title}
                        </h3>
                        <p className="type-ui text-[var(--color-ink-muted)] text-[15.5px] mt-3 leading-[1.55]">
                          {item.body}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ─── How we differ ─── */}
          <section className="relative bg-[var(--color-ink-primary)] text-[var(--color-canvas-ivory)]">
            <div className="max-w-[1440px] mx-auto px-8 lg:px-14 py-24 lg:py-32">
              <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
                <div className="lg:col-span-4">
                  <IndexNumeral index="03" label="The distinction" total="05" />
                  <h2
                    className="type-display mt-8 leading-[0.95]"
                    style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)" }}
                  >
                    What we are not.
                  </h2>
                  <p className="type-display-italic text-[var(--color-ink-whisper)] mt-6 text-[18px] max-w-[32ch]">
                    The market is crowded with services that sound like us. None of them are.
                  </p>
                </div>
                <div className="lg:col-span-8">
                  <ul className="flex flex-col gap-0 border-t border-[var(--color-ink-muted)]/30">
                    {[
                      {
                        contrast: "Not a credential mill.",
                        body: "We do not sell degrees. We do not guarantee outcomes in exchange for payment. The institution confers on the strength of a record — and if the record is not yet sufficient, we say so before a single fee is discussed.",
                      },
                      {
                        contrast: "Not an admissions consultant.",
                        body: "Admissions consultants optimise applications. We build relationships between accomplished people and the institutions that recognise them. The letter of introduction bears the firm’s name and standing — not a template.",
                      },
                      {
                        contrast: "Not a broker.",
                        body: "Brokers transact and exit. We remain present from qualification through conferment — months of correspondence, committee liaison, and ceremony coordination. Our role ends when the record is formally established, not when the introduction is made.",
                      },
                      {
                        contrast: "Not a volume operation.",
                        body: "We work with fewer than forty recipients in a given year. Each engagement is assigned to a named partner. There is no queue, no batch processing, and no account manager rotating between files.",
                      },
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="py-8 border-b border-[var(--color-ink-muted)]/30"
                      >
                        <h3
                          className="type-display text-[var(--color-signal-gold)] leading-[1.1]"
                          style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
                        >
                          {item.contrast}
                        </h3>
                        <p className="type-ui text-[var(--color-ink-whisper)] text-[16.5px] leading-[1.65] mt-4 max-w-[58ch]">
                          {item.body}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ─── The founding ─── */}
          <section className="relative bg-[var(--color-canvas-bone)] border-t border-[var(--color-canvas-paper-edge)]">
            <div className="max-w-[1440px] mx-auto px-8 lg:px-14 py-24 lg:py-32">
              <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
                <div className="lg:col-span-4">
                  <IndexNumeral index="04" label="The founding" total="05" />
                  <h2
                    className="type-display mt-8 text-[var(--color-ink-primary)]"
                    style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)", lineHeight: 0.95 }}
                  >
                    Why this firm exists.
                  </h2>
                </div>
                <div className="lg:col-span-8">
                  <p className="type-ui text-[var(--color-ink-primary)] text-[18px] leading-[1.65] max-w-[62ch]">
                    Techversity was founded in 2019 on a single observation: accomplished professionals — people whose life&rsquo;s work had already shaped industries, institutions, and disciplines — had no reliable path to the academic recognition their records merited. Universities confer, but they do not recruit. Professionals achieve, but they do not apply.
                  </p>
                  <p className="type-ui text-[var(--color-ink-primary)] text-[18px] leading-[1.65] max-w-[62ch] mt-6">
                    The gap was structural. The firm was built to occupy it — an intermediary with standing at both ends. We cultivated relationships with accredited institutions across Europe and the United States, studied how conferment committees evaluate candidates, and designed an advisory practice around one commitment: the recipient&rsquo;s record arrives at the right institution, in the right form, at the right time.
                  </p>
                  <p className="type-ui text-[var(--color-ink-muted)] text-[18px] leading-[1.65] max-w-[62ch] mt-6">
                    Seven years and eight partner institutions later, the practice has not changed. The firm remains small by intention. Every engagement is assigned to a named partner. We still read every submission personally. And we still say no more often than we say yes — because the record must be legible before the conversation begins.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ─── Establishing image ─── */}
          <EditorialImage
            src="/images/editorial/programs-establishing.webp"
            alt="An older hand resting on the worn caramel-leather arm of a chair"
            motion="mask"
            aspect={21 / 9}
            wrapperClassName="w-full"
            sizes="100vw"
          />

          {/* ─── Closing threshold ─── */}
          <section className="relative bg-[var(--color-canvas-ivory)] border-t border-[var(--color-canvas-paper-edge)]">
            <div className="max-w-[1200px] mx-auto px-8 lg:px-14 py-28 lg:py-40 flex flex-col items-center text-center">
              <IndexNumeral index="05" label="Threshold" total="05" />
              <p
                className="type-display text-[var(--color-ink-primary)] leading-[1.05] mt-10 max-w-[28ch]"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
              >
                If your record merits the record, let&rsquo;s begin.
              </p>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
                <ButtonV2 href="/apply" variant="heritage" size="md" showArrow>
                  Begin the conversation
                </ButtonV2>
                <ButtonV2 href="/how-it-works" variant="quiet" size="md" showArrow>
                  Read the process
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
