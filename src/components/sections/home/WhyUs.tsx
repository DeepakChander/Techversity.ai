"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { WHY_US_POINTS } from "@/lib/constants";
import { useGSAP, gsap } from "@/hooks/useGSAP";

function AnimatedCheckmark({ delay = 0 }: { delay?: number }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="flex-shrink-0"
    >
      <motion.circle
        cx="10"
        cy="10"
        r="9"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-blue-start/30"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
      />
      <motion.path
        d="M6 10.5L9 13.5L14.5 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-blue-start"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: delay + 0.3, ease: "easeOut" }}
      />
    </svg>
  );
}

export function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!headingRef.current) return;

    // Character-by-character reveal for main heading
    const chars = headingRef.current.querySelectorAll(".why-char");
    gsap.from(chars, {
      opacity: 0,
      y: 60,
      rotateX: 90,
      duration: 0.8,
      stagger: 0.025,
      ease: "power3.out",
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        once: true,
      },
    });
  }, []);

  const headingText = "Why Techversity.AI?";

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 overflow-hidden"
      id="why-us"
    >
      {/* Subtle background accents */}
      <div className="absolute top-20 left-10 w-80 h-80 rounded-full bg-blue-start/[0.03] blur-[150px]" aria-hidden="true" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-cyan/[0.03] blur-[150px]" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left - Heading with character reveal */}
          <div className="lg:sticky lg:top-32">
            <motion.span
              className="inline-block text-sm font-medium text-blue-start uppercase tracking-widest mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Why Choose Us
            </motion.span>

            <div ref={headingRef} className="mb-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-[1.15]" style={{ perspective: "800px" }}>
                {headingText.split("").map((char, i) => (
                  <span
                    key={i}
                    className="why-char inline-block"
                    style={{
                      display: char === " " ? "inline" : "inline-block",
                      color:
                        char === "." || (i >= 15 && i <= 17)
                          ? "#0EA5E9"
                          : i >= 4 && i <= 14
                          ? "transparent"
                          : "#0f172a",
                      backgroundImage:
                        i >= 4 && i <= 14
                          ? "linear-gradient(to right, #3A82FF, #0EA5E9)"
                          : "none",
                      backgroundClip: i >= 4 && i <= 14 ? "text" : "unset",
                      WebkitBackgroundClip: i >= 4 && i <= 14 ? "text" : "unset",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h2>
            </div>

            <motion.p
              className="text-slate-600 text-lg max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              We&apos;re not a degree mill. We&apos;re a bridge between your
              professional excellence and legitimate academic recognition.
            </motion.p>

            {/* Decorative stats */}
            <motion.div
              className="flex gap-8 mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <div>
                <div className="text-3xl font-heading font-bold text-blue-start">
                  98%
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Acceptance Rate
                </div>
              </div>
              <div className="w-px bg-slate-200" />
              <div>
                <div className="text-3xl font-heading font-bold text-blue-start">
                  4hrs
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Response Time
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right - Trust bullets with spring animation + SVG checkmark draw */}
          <div className="space-y-3">
            {WHY_US_POINTS.map((point, i) => (
              <motion.div
                key={point.title}
                className="group relative flex items-start gap-4 p-5 rounded-xl border border-transparent hover:bg-slate-50 hover:border-slate-200 transition-all duration-300"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.08 * i + 0.2,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
              >
                {/* Active left border on hover */}
                <div className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-gradient-to-b from-blue-start to-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* SVG Checkmark with draw animation */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mt-0.5">
                  <AnimatedCheckmark delay={0.08 * i + 0.3} />
                </div>

                <div>
                  <h4 className="text-slate-900 font-semibold mb-1">
                    {point.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
