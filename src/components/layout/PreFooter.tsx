"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { EASE } from "@/lib/animations";

const QUOTES = [
  {
    text: "Your experience is your qualification. Your ambition is your path.",
    emphasis: "experience",
  },
  {
    text: "The world recognizes those who dare to elevate beyond the ordinary.",
    emphasis: "elevate",
  },
  {
    text: "Excellence is not a destination — it is the standard you set every single day.",
    emphasis: "standard",
  },
];

export function PreFooter() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [activeQuote, setActiveQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % QUOTES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-36 overflow-hidden bg-slate-50"
    >
      {/* Subtle accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, #3A82FF 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* Top separator line */}
        <motion.div
          className="h-px w-full mb-16"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(58,130,255,0.2), rgba(14,165,233,0.2), rgba(58,130,255,0.2), transparent)",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE.default }}
        />

        {/* Brand display */}
        <div className="text-center">
          <motion.h2
            className="font-heading font-bold leading-[0.85] tracking-tighter text-slate-200"
            style={{ fontSize: "clamp(3rem, 10vw, 10rem)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            TECHVERSITY<span className="text-blue-start/20">.AI</span>
          </motion.h2>

          <motion.p
            className="text-slate-400 text-sm uppercase tracking-[0.25em] mt-6 mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Powering the Techverse of Tomorrow
          </motion.p>

          {/* Animated quote carousel */}
          <motion.div
            className="max-w-3xl mx-auto min-h-[100px] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="relative w-full">
              {QUOTES.map((quote, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 flex items-center justify-center"
                  initial={false}
                  animate={{
                    opacity: activeQuote === i ? 1 : 0,
                    y: activeQuote === i ? 0 : 12,
                    filter: activeQuote === i ? "blur(0px)" : "blur(4px)",
                  }}
                  transition={{ duration: 0.6, ease: EASE.default }}
                >
                  <p className="text-xl md:text-2xl lg:text-3xl font-heading font-light text-slate-500 leading-relaxed text-center italic">
                    &ldquo;
                    {quote.text.split(quote.emphasis).map((part, j, arr) => (
                      <span key={j}>
                        {part}
                        {j < arr.length - 1 && (
                          <span className="bg-gradient-to-r from-blue-start to-cyan bg-clip-text text-transparent font-medium not-italic">
                            {quote.emphasis}
                          </span>
                        )}
                      </span>
                    ))}
                    &rdquo;
                  </p>
                </motion.div>
              ))}
              <p className="invisible text-xl md:text-2xl lg:text-3xl font-heading font-light leading-relaxed text-center">
                &ldquo;{QUOTES[0].text}&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Quote dots */}
          <motion.div
            className="flex items-center justify-center gap-2 mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {QUOTES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveQuote(i)}
                className="group relative p-1"
                aria-label={`Quote ${i + 1}`}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor:
                      activeQuote === i ? "#3A82FF" : "#cbd5e1",
                    transform: activeQuote === i ? "scale(1.5)" : "scale(1)",
                    boxShadow:
                      activeQuote === i
                        ? "0 0 12px rgba(58,130,255,0.4)"
                        : "none",
                  }}
                />
              </button>
            ))}
          </motion.div>
        </div>

        {/* Bottom separator line */}
        <motion.div
          className="h-px w-full mt-16"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(58,130,255,0.2), rgba(14,165,233,0.2), rgba(58,130,255,0.2), transparent)",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1.2, ease: EASE.default }}
        />
      </div>
    </section>
  );
}
