"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useGSAP, gsap, ScrollTrigger } from "@/hooks/useGSAP";

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

function AnimatedLine({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="h-px w-full"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(26,109,255,0.3), rgba(0,229,255,0.3), rgba(26,109,255,0.3), transparent)",
      }}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

export function PreFooter() {
  const sectionRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [activeQuote, setActiveQuote] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Auto-rotate quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % QUOTES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // GSAP letter-by-letter reveal for the brand name
  useGSAP(() => {
    if (!brandRef.current) return;

    const chars = brandRef.current.querySelectorAll(".brand-char");
    if (chars.length === 0) return;

    gsap.from(chars, {
      y: 80,
      opacity: 0,
      rotateX: -90,
      duration: 0.8,
      stagger: 0.04,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: brandRef.current,
        start: "top 85%",
        once: true,
      },
    });
  }, []);

  const brandText = "TECHVERSITY";
  const aiText = ".AI";

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-36 overflow-hidden"
    >
      {/* Background layers */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-[#080b20] to-[#060918]" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle, rgba(26,109,255,0.8) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* Top separator line */}
        <AnimatedLine />

        {/* Main brand display */}
        <div className="py-16 lg:py-24 text-center">
          {/* Brand name - massive typography */}
          <div
            ref={brandRef}
            className="mb-12"
            style={{ perspective: "1000px" }}
          >
            <h2
              className="font-heading font-bold leading-[0.85] tracking-tighter whitespace-nowrap"
              style={{ fontSize: "clamp(3rem, 10vw, 10rem)" }}
            >
              {brandText.split("").map((char, i) => (
                <span
                  key={i}
                  className="brand-char inline-block brand-stroke-char"
                  style={{
                    WebkitTextStroke: "1.5px rgba(255,255,255,0.12)",
                    color: "transparent",
                    transition: "color 0.3s ease, -webkit-text-stroke 0.3s ease",
                  } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    const el = e.target as HTMLSpanElement;
                    el.style.color = "rgba(26,109,255,0.6)";
                    el.style.setProperty("-webkit-text-stroke", "1.5px rgba(26,109,255,0.4)");
                  }}
                  onMouseLeave={(e) => {
                    const el = e.target as HTMLSpanElement;
                    el.style.color = "transparent";
                    el.style.setProperty("-webkit-text-stroke", "1.5px rgba(255,255,255,0.12)");
                  }}
                >
                  {char}
                </span>
              ))}
              <span className="brand-char inline-block">
                <span
                  className="bg-gradient-to-r from-cyan to-blue-mid bg-clip-text text-transparent"
                  style={{
                    WebkitTextStroke: "0px transparent",
                  } as React.CSSProperties}
                >
                  {aiText}
                </span>
              </span>
            </h2>
          </div>

          {/* Tagline */}
          <motion.p
            className="text-text-muted text-sm uppercase tracking-[0.25em] mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Powering the Techverse of Tomorrow
          </motion.p>

          {/* Animated quote carousel */}
          <motion.div
            className="max-w-3xl mx-auto min-h-[100px] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
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
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-xl md:text-2xl lg:text-3xl font-heading font-light text-text-secondary/80 leading-relaxed text-center italic">
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
              {/* Invisible placeholder for height */}
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
            transition={{ delay: 1, duration: 0.5 }}
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
                      activeQuote === i
                        ? "var(--color-cyan)"
                        : "rgba(255,255,255,0.15)",
                    transform: activeQuote === i ? "scale(1.5)" : "scale(1)",
                    boxShadow:
                      activeQuote === i
                        ? "0 0 12px rgba(0,229,255,0.5)"
                        : "none",
                  }}
                />
              </button>
            ))}
          </motion.div>
        </div>

        {/* Bottom separator line */}
        <AnimatedLine delay={0.3} />
      </div>
    </section>
  );
}
