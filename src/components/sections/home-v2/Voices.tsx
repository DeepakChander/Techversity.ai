"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { IndexNumeral } from "@/components/ui/IndexNumeral";
import { EditorialImage } from "@/components/ui/EditorialImage";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/**
 * Voices — the questions we answer, set editorial.
 * No accordion. Full text visible. Mono counter updates as you scroll.
 */

const QUESTIONS = [
  {
    q: "What distinguishes an Honorary Doctorate from a conferred one?",
    a: "An Honorary Doctorate (Doctor Honoris Causa) recognises the contribution a life&rsquo;s work has already made to its field. Unlike a conferred doctorate, it is awarded on the strength of professional record — not on coursework, residency, or defended dissertation. It is the university&rsquo;s public act of saying: this matter has been settled by the work itself.",
  },
  {
    q: "Who is considered eligible?",
    a: "Our partner institutions look for sustained work of 15 or more years, a clear original contribution to a discipline, evidence of peer or institutional recognition, and a measurable public or sector-wide reach. Our first conversation is a review of your record against those criteria — candidly, and without cost.",
  },
  {
    q: "How long does the process take?",
    a: "An Honorary Doctorate typically takes four to six months from first conversation to conferment. A DBA runs eighteen to thirty-six months; a PhD, twenty-four to forty-eight. Every timeline depends on the institution, the programme, and the pace the recipient is willing to set.",
  },
  {
    q: "Are the degrees accredited?",
    a: "Yes. Every partner institution holds accreditation with its respective national or international body. We work only with institutions whose conferment carries formal recognition — ISO-certified, EU-recognised, or nationally accredited depending on jurisdiction. Full details are published alongside each institution on the network page.",
  },
  {
    q: "What does the advisory fee include?",
    a: "Fees vary by programme and institution. They cover review, introduction, application shepherding, and — where available — attendance at the conferment ceremony. We publish transparent fee schedules on request; there are no hidden costs, and no fees are charged for the initial conversation.",
  },
  {
    q: "Is the firm involved after conferment?",
    a: "On request, yes. Some recipients ask us to coordinate the conferment ceremony, liaise with institution alumni offices, or assist with academic regalia and certification. Others prefer the firm to step back entirely once the conferment is formal. Both are appropriate.",
  },
  {
    q: "What if I am not yet ready to apply?",
    a: "Most conversations we hold are exploratory. We often recommend waiting — whether for a publication, a further chapter of work, or a change in circumstance. The correct time for the record is not necessarily now, and we will say so plainly if that is our reading.",
  },
  {
    q: "How is confidentiality handled?",
    a: "Every conversation, every submitted portfolio, every institutional correspondence is treated as privileged. We do not publish recipient names, case studies, or testimonials without written consent — and in most cases, not even then. The record is yours; the firm&rsquo;s role in establishing it is not.",
  },
];

export function Voices() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(1);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".voice-item");
      items.forEach((item, idx) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => setActive(idx + 1),
          onEnterBack: () => setActive(idx + 1),
        });

        gsap.from(item, {
          opacity: 0,
          y: 30,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
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
      <div className="max-w-[1440px] mx-auto px-8 lg:px-14 py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* ─── Left: pinned masthead ─── */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 flex flex-col gap-8">
              <IndexNumeral
                index={active.toString().padStart(2, "0")}
                total={QUESTIONS.length.toString().padStart(2, "0")}
                label="The voices"
              />
              <h2
                className="type-display text-[var(--color-ink-primary)]"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.25rem)", lineHeight: 0.95 }}
              >
                Questions, read fully.
              </h2>
              <EditorialImage
                src="/images/editorial/home-voices.webp"
                alt="A hand holding the corner of a thick sheaf of cream printed pages, warm natural light"
                motion="mask"
                aspect={4 / 5}
                wrapperClassName="w-full"
                sizes="(max-width: 1024px) 80vw, 30vw"
              />
              <p className="type-display-italic text-[var(--color-ink-muted)] text-[17px] max-w-[32ch]">
                We have not collapsed these into an accordion. A serious audience reads.
              </p>
            </div>
          </div>

          {/* ─── Right: Q&A ─── */}
          <div className="lg:col-span-8">
            <ol className="divide-y divide-[var(--color-canvas-paper-edge)]">
              {QUESTIONS.map((item, i) => (
                <li key={item.q} className="voice-item py-10 lg:py-14">
                  <div className="flex items-baseline gap-6">
                    <span className="type-mono-meta text-[var(--color-ink-whisper)]">
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    <h3
                      className="type-display text-[var(--color-ink-primary)]"
                      style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.125rem)", lineHeight: 1.15 }}
                    >
                      {item.q}
                    </h3>
                  </div>
                  <p
                    className="type-ui text-[var(--color-ink-muted)] text-[17px] leading-[1.65] mt-5 max-w-[62ch] pl-[calc(2rem+24px)]"
                    dangerouslySetInnerHTML={{ __html: item.a }}
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
