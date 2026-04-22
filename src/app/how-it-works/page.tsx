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

interface Chapter {
  num: string;
  verb: string;
  tagline: string;
  typicalDuration: string;
  body: string[];
  recipientDoes: string[];
  firmDoes: string[];
}

const CHAPTERS: Chapter[] = [
  {
    num: "01",
    verb: "Qualify",
    tagline: "We read the record — not a CV.",
    typicalDuration: "Weeks 1–2",
    body: [
      "The first exchange is a candid one. A partner reviews your submission against the institution's conferment criteria — looking for sustained impact, codified contribution, and the kind of work that the record is meant to formalise.",
      "We do not shortlist to every candidate. If the pathway is not yet right — because the work is mid-chapter, because the timing is wrong, because another route serves better — we say so plainly.",
    ],
    recipientDoes: [
      "Submit a short written summary of the record.",
      "Attach any supporting material worth reading (publications, press, references).",
      "Name the pathway of interest, if one has been pre-selected.",
    ],
    firmDoes: [
      "Read every submission personally — no forms, no keyword triage.",
      "Respond candidly within 48 hours.",
      "Recommend for or against proceeding, with reasoning.",
    ],
  },
  {
    num: "02",
    verb: "Shortlist",
    tagline: "We identify the institutions that match.",
    typicalDuration: "Weeks 2–4",
    body: [
      "Once qualified, we match the record against the firm's network of accredited partners. The match is specific — not a programme, a category, or a generic recommendation, but a university, a faculty, and a particular fit with the institution's conferment practice.",
      "Where two or more partners are a credible fit, we present both with honest commentary on the trade-offs. The decision remains the recipient's.",
    ],
    recipientDoes: [
      "Review shortlisted institutions with the firm.",
      "Clarify any preferences (region, format, specialisation).",
      "Confirm which institution to proceed with.",
    ],
    firmDoes: [
      "Map the record to each partner's doctoral philosophy.",
      "Prepare comparative notes on fit, format, and timeline.",
      "Provide institutional briefings on accreditation and recognition.",
    ],
  },
  {
    num: "03",
    verb: "Introduce",
    tagline: "We make the introduction, formally.",
    typicalDuration: "Weeks 4–8",
    body: [
      "The introduction is made under the firm's letterhead — a formal correspondence to the institution's conferment committee that outlines the candidate's record and advisory recommendation. This is where the firm's standing with the institution becomes operative.",
      "From this point onwards, the conversation becomes institutional. The committee reads the submission, convenes a review, and responds on their own timetable.",
    ],
    recipientDoes: [
      "Provide any supplementary documentation the committee requests.",
      "Sit for a brief introductory call with the institution (where applicable).",
      "Wait — the committee's process takes its own time.",
    ],
    firmDoes: [
      "Draft and send the formal letter of introduction.",
      "Coordinate all correspondence with the institution.",
      "Keep the recipient informed at each step of the review.",
    ],
  },
  {
    num: "04",
    verb: "Shepherd",
    tagline: "We remain present through every step.",
    typicalDuration: "Weeks 8–20",
    body: [
      "During committee review, the firm is the conduit. We relay questions both directions, translate institutional norms where needed, and hold the recipient's interest in the process when the process feels opaque.",
      "This is where advisory differs from brokerage. Most firms hand over a file and disappear; we remain the contact of record until conferment is formal.",
    ],
    recipientDoes: [
      "Respond to any outstanding clarifications from the institution.",
      "Trust the firm to manage pace and correspondence.",
      "Prepare — quietly — for the conferment.",
    ],
    firmDoes: [
      "Hold fortnightly correspondence with the recipient on progress.",
      "Advocate for the recipient's record with the committee where appropriate.",
      "Advise on any institutional questions that arise.",
    ],
  },
  {
    num: "05",
    verb: "Confer",
    tagline: "You are recognised.",
    typicalDuration: "Final step",
    body: [
      "On approval, the institution issues the formal conferment. For those who wish it, a ceremony is arranged — either at the institution's seat or, where distance requires, via dispatch with the accompanying regalia and documentation.",
      "The firm's role closes at conferment — unless the recipient asks us to continue, which many do. Coordination with alumni networks, subsequent honorary invitations, and the like remain available on request.",
    ],
    recipientDoes: [
      "Attend the conferment, in person or by post, as preferred.",
      "Receive the formal documentation, regalia, and alumni affiliation.",
      "Take a moment — the record is now a matter of institutional record.",
    ],
    firmDoes: [
      "Coordinate the ceremony logistics.",
      "Handle despatch of regalia and certificates where needed.",
      "Remain available for aftercare, at the recipient's request.",
    ],
  },
];

export default function HowItWorksPage() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

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

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;
      const chapters = gsap.utils.toArray<HTMLElement>(".hiw-chapter");
      chapters.forEach((ch) => {
        gsap.from(ch, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ch,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: sectionRef }
  );

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
                  <IndexNumeral index="PROCESS" label="Five verbs" />
                  <div className="mt-10 overflow-hidden">
                    <h1
                      ref={headlineRef}
                      className="type-display text-[var(--color-ink-primary)] leading-[0.92]"
                      style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
                    >
                      How the advisory proceeds.
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
                    Every conferment follows the same unhurried rhythm. Typical duration — four to nine months.
                  </motion.p>
                </div>
              </div>
            </div>
          </section>

          {/* ─── Editorial image ─── */}
          <EditorialImage
            src="/images/editorial/home-advisory.webp"
            alt="A handwritten letter in progress on warm cream paper, fountain pen resting diagonally"
            motion="mask"
            aspect={21 / 9}
            wrapperClassName="w-full"
            sizes="100vw"
          />

          {/* ─── Chapters ─── */}
          <section
            ref={sectionRef}
            className="relative bg-[var(--color-canvas-ivory)]"
          >
            <div className="max-w-[1440px] mx-auto px-8 lg:px-14">
              <ol>
                {CHAPTERS.map((ch, i) => (
                  <li
                    key={ch.num}
                    className={`hiw-chapter grid lg:grid-cols-12 gap-8 lg:gap-14 py-20 lg:py-28 ${
                      i < CHAPTERS.length - 1
                        ? "border-b border-[var(--color-canvas-paper-edge)]"
                        : ""
                    }`}
                  >
                    {/* Left: numeral + verb + meta */}
                    <div className="lg:col-span-4">
                      <div className="lg:sticky lg:top-32">
                        <span
                          className="type-display text-[var(--color-heritage-crimson)] leading-none block"
                          style={{ fontSize: "clamp(4rem, 8vw, 7rem)" }}
                        >
                          {ch.num}
                        </span>
                        <h2
                          className="type-display text-[var(--color-ink-primary)] mt-6 leading-[0.9]"
                          style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
                        >
                          {ch.verb}.
                        </h2>
                        <p className="type-display-italic text-[var(--color-ink-muted)] mt-4 text-[19px] max-w-[28ch]">
                          {ch.tagline}
                        </p>
                        <div className="mt-8 pt-6 border-t border-[var(--color-canvas-paper-edge)]">
                          <span className="type-mono-meta text-[var(--color-ink-muted)]">
                            {ch.typicalDuration.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: body + two columns of actions */}
                    <div className="lg:col-span-8 flex flex-col gap-10">
                      <div className="flex flex-col gap-5">
                        {ch.body.map((para, j) => (
                          <p
                            key={j}
                            className="type-ui text-[var(--color-ink-primary)] text-[17px] leading-[1.65] max-w-[62ch]"
                          >
                            {para}
                          </p>
                        ))}
                      </div>

                      <div className="grid md:grid-cols-2 gap-10 pt-8 border-t border-[var(--color-canvas-paper-edge)]">
                        <div>
                          <span className="type-mono-label text-[var(--color-heritage-crimson)]">
                            The recipient
                          </span>
                          <ul className="mt-5 flex flex-col gap-3">
                            {ch.recipientDoes.map((item) => (
                              <li
                                key={item}
                                className="type-ui text-[var(--color-ink-muted)] text-[15px] leading-[1.55] flex gap-3"
                              >
                                <span
                                  aria-hidden
                                  className="type-mono-meta text-[var(--color-ink-whisper)] pt-1"
                                >
                                  —
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="type-mono-label text-[var(--color-heritage-crimson)]">
                            The firm
                          </span>
                          <ul className="mt-5 flex flex-col gap-3">
                            {ch.firmDoes.map((item) => (
                              <li
                                key={item}
                                className="type-ui text-[var(--color-ink-muted)] text-[15px] leading-[1.55] flex gap-3"
                              >
                                <span
                                  aria-hidden
                                  className="type-mono-meta text-[var(--color-ink-whisper)] pt-1"
                                >
                                  —
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* ─── Closing ─── */}
          <section className="relative bg-[var(--color-canvas-bone)] border-t border-[var(--color-canvas-paper-edge)]">
            <div className="max-w-[1200px] mx-auto px-8 lg:px-14 py-28 lg:py-40 flex flex-col items-center text-center">
              <IndexNumeral index="/" label="The outcome" />
              <p
                className="type-display text-[var(--color-ink-primary)] leading-[1.05] mt-10 max-w-[28ch]"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
              >
                A conferment, formally and quietly achieved.
              </p>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
                <ButtonV2 href="/apply" variant="heritage" size="md" showArrow>
                  Begin the conversation
                </ButtonV2>
                <ButtonV2 href="/faqs" variant="quiet" size="md" showArrow>
                  Read the questions
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
