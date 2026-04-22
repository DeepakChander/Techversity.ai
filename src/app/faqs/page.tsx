"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IndexNumeral } from "@/components/ui/IndexNumeral";
import { ButtonV2 } from "@/components/ui/ButtonV2";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

interface QA {
  q: string;
  a: string;
}

interface Topic {
  id: string;
  label: string;
  questions: QA[];
}

const TOPICS: Topic[] = [
  {
    id: "eligibility",
    label: "Eligibility & consideration",
    questions: [
      {
        q: "Who is considered?",
        a: "Our partner institutions look for sustained work of fifteen or more years, a clear original contribution to a discipline, evidence of peer or institutional recognition, and a measurable public or sector-wide reach. Our first conversation is a review of your record against those criteria — candidly, and without cost.",
      },
      {
        q: "What distinguishes an Honorary Doctorate from a conferred one?",
        a: "An Honorary Doctorate (Doctor Honoris Causa) recognises the contribution a life's work has already made to its field. Unlike a conferred doctorate, it is awarded on the strength of professional record — not on coursework, residency, or defended dissertation.",
      },
      {
        q: "Do I need prior academic credentials?",
        a: "No. The Honorary pathway is explicitly for those whose record does not depend on prior degrees. The DBA and PhD pathways carry their own academic prerequisites, which we walk through at qualification.",
      },
      {
        q: "What if I am not yet ready to apply?",
        a: "Most conversations we hold are exploratory. We often recommend waiting — whether for a publication, a further chapter of work, or a change in circumstance. The correct time for the record is not necessarily now, and we will say so plainly if that is our reading.",
      },
    ],
  },
  {
    id: "process",
    label: "The advisory process",
    questions: [
      {
        q: "How does the advisory differ from an admissions consultant?",
        a: "Most admissions consultants handle applications. We shepherd a relationship. From first conversation to conferment, a partner at the firm remains your point of contact — the letter of introduction, the correspondence with the committee, and the conferment logistics all run through us.",
      },
      {
        q: "Can I choose the institution?",
        a: "Yes, when there is a credible match. We present shortlisted institutions with honest commentary on the trade-offs — timeline, specialisation, format, region — and the recipient chooses. Where two or more institutions are a genuine fit, we will say so plainly.",
      },
      {
        q: "How much time does it require from me?",
        a: "Far less than most expect. The firm handles the paperwork and correspondence; the recipient provides the record, sits for an introductory conversation, and responds to any direct institutional queries. Typical total active time is five to ten hours across the engagement.",
      },
    ],
  },
  {
    id: "timeline",
    label: "Timeline & effort",
    questions: [
      {
        q: "How long does the process take?",
        a: "An Honorary Doctorate typically takes four to six months from first conversation to conferment. A DBA runs eighteen to thirty-six months; a PhD, twenty-four to forty-eight. Every timeline depends on the institution, the programme, and the pace the recipient is willing to set.",
      },
      {
        q: "Can the process be accelerated?",
        a: "Rarely, and never by us. Institutional review moves at institutional pace — for good reasons. What we can do is ensure no avoidable delay on the firm's side: submissions land promptly, correspondence is reciprocal, and committee questions are turned around the same week.",
      },
    ],
  },
  {
    id: "fees",
    label: "Fees & refunds",
    questions: [
      {
        q: "What does the advisory fee include?",
        a: "Fees vary by programme and institution. They cover review, introduction, application shepherding, and — where available — attendance at the conferment ceremony. We publish transparent fee schedules on request; there are no hidden costs, and no fees are charged for the initial conversation.",
      },
      {
        q: "Are fees refundable if I am not accepted?",
        a: "If no partner institution accepts your application, all advisory fees paid are returned in full. The firm does not earn fees for work that does not result in conferment. Partial refunds apply if the recipient withdraws mid-process — see the Refund Policy for specifics.",
      },
      {
        q: "Are there institutional fees separate from the advisory?",
        a: "Yes. The institution sets its own conferment or tuition fees, which are paid directly to them. These are distinct from the advisory fee and are disclosed in full before the recipient commits to an institution.",
      },
    ],
  },
  {
    id: "confidentiality",
    label: "Confidentiality & discretion",
    questions: [
      {
        q: "How is confidentiality handled?",
        a: "Every conversation, every submitted portfolio, every institutional correspondence is treated as privileged. We do not publish recipient names, case studies, or testimonials without written consent — and in most cases, not even then. The record is yours; the firm's role in establishing it is not.",
      },
      {
        q: "Will the institution know the firm is involved?",
        a: "Yes — the letter of introduction is on Techversity letterhead. But the relationship between the firm and the recipient is not disclosed beyond what is necessary for the committee's review.",
      },
      {
        q: "Can I work with the firm under a pseudonym or intermediary?",
        a: "For the advisory itself, no — institutional conferments require real identity. However, many recipients ask us to handle public or press aspects of the conferment discreetly, and we do.",
      },
    ],
  },
  {
    id: "aftercare",
    label: "After conferment",
    questions: [
      {
        q: "Is the firm involved after conferment?",
        a: "On request, yes. Some recipients ask us to coordinate the conferment ceremony, liaise with institution alumni offices, or assist with academic regalia and certification. Others prefer the firm to step back entirely once the conferment is formal. Both are appropriate.",
      },
      {
        q: "Can I pursue further degrees through the firm?",
        a: "Many recipients do. A DBA, PhD, or honorary conferment often becomes a foundation for further scholarship or board appointments — and where another pathway is a natural next step, we facilitate the introduction.",
      },
    ],
  },
];

export default function FAQsPage() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTopic, setActiveTopic] = useState<string>(TOPICS[0].id);

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
      const topics = gsap.utils.toArray<HTMLElement>(".faq-topic");
      topics.forEach((topic) => {
        ScrollTrigger.create({
          trigger: topic,
          start: "top 40%",
          end: "bottom 40%",
          onEnter: () => setActiveTopic(topic.dataset.topic || ""),
          onEnterBack: () => setActiveTopic(topic.dataset.topic || ""),
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
                  <IndexNumeral index="QUESTIONS" label="Read fully" />
                  <div className="mt-10 overflow-hidden">
                    <h1
                      ref={headlineRef}
                      className="type-display text-[var(--color-ink-primary)] leading-[0.92]"
                      style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
                    >
                      What we are asked, and our answers.
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
                    We have not collapsed these into an accordion. A serious audience reads.
                  </motion.p>
                </div>
              </div>
            </div>
          </section>

          {/* ─── Topic index + questions ─── */}
          <section ref={sectionRef} className="relative bg-[var(--color-canvas-ivory)]">
            <div className="max-w-[1440px] mx-auto px-8 lg:px-14 py-20 lg:py-24">
              <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
                {/* Left: sticky topic index */}
                <aside className="lg:col-span-3">
                  <div className="lg:sticky lg:top-32">
                    <span className="type-mono-label text-[var(--color-heritage-crimson)]">
                      Topics
                    </span>
                    <ul className="mt-6 flex flex-col gap-3">
                      {TOPICS.map((t, i) => (
                        <li key={t.id}>
                          <a
                            href={`#${t.id}`}
                            className={`group flex items-baseline gap-3 transition-colors duration-500 ease-[var(--ease-editorial)] ${
                              activeTopic === t.id
                                ? "text-[var(--color-heritage-crimson)]"
                                : "text-[var(--color-ink-primary)] hover:text-[var(--color-heritage-crimson)]"
                            }`}
                          >
                            <span className="type-mono-meta text-[var(--color-ink-whisper)] shrink-0">
                              {(i + 1).toString().padStart(2, "0")}
                            </span>
                            <span className="type-ui text-[15px] leading-[1.4]">
                              {t.label}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>

                {/* Right: topics + questions */}
                <div className="lg:col-span-9">
                  {TOPICS.map((topic, ti) => (
                    <div
                      key={topic.id}
                      id={topic.id}
                      data-topic={topic.id}
                      className="faq-topic pt-12 pb-16 border-b border-[var(--color-canvas-paper-edge)] last:border-b-0 scroll-mt-32"
                    >
                      <div className="flex items-baseline gap-4 mb-10">
                        <span className="type-mono-label text-[var(--color-heritage-crimson)]">
                          {(ti + 1).toString().padStart(2, "0")}
                        </span>
                        <h2
                          className="type-display text-[var(--color-ink-primary)]"
                          style={{
                            fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
                            lineHeight: 1,
                          }}
                        >
                          {topic.label}.
                        </h2>
                      </div>

                      <ol className="divide-y divide-[var(--color-canvas-paper-edge)]">
                        {topic.questions.map((qa, qi) => (
                          <li key={qi} className="py-8 lg:py-10">
                            <div className="flex items-baseline gap-5">
                              <span className="type-mono-meta text-[var(--color-ink-whisper)] shrink-0">
                                {(qi + 1).toString().padStart(2, "0")}
                              </span>
                              <h3
                                className="type-display text-[var(--color-ink-primary)]"
                                style={{
                                  fontSize: "clamp(1.25rem, 2vw, 1.625rem)",
                                  lineHeight: 1.2,
                                }}
                              >
                                {qa.q}
                              </h3>
                            </div>
                            <p className="type-ui text-[var(--color-ink-muted)] text-[16.5px] leading-[1.65] mt-4 max-w-[62ch] pl-[calc(2rem+20px)]">
                              {qa.a}
                            </p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ─── Closing ─── */}
          <section className="relative bg-[var(--color-canvas-bone)] border-t border-[var(--color-canvas-paper-edge)]">
            <div className="max-w-[1200px] mx-auto px-8 lg:px-14 py-28 lg:py-40 flex flex-col items-center text-center">
              <IndexNumeral index="/" label="Still a question?" />
              <p
                className="type-display text-[var(--color-ink-primary)] leading-[1.05] mt-10 max-w-[30ch]"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
              >
                Write to the firm. A partner will answer.
              </p>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
                <ButtonV2 href="/contact" variant="heritage" size="md" showArrow>
                  Write to the firm
                </ButtonV2>
                <ButtonV2 href="/apply" variant="quiet" size="md" showArrow>
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
