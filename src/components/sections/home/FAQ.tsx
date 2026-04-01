"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "@/lib/constants";
import { useGSAP, gsap } from "@/hooks/useGSAP";

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="relative">
      {/* Active left border */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full bg-gradient-to-b from-blue-start to-cyan"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ originY: 0 }}
      />

      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-5 px-4 text-left group"
        aria-expanded={isOpen}
      >
        <h4
          className={`font-medium text-base transition-colors duration-200 ${
            isOpen ? "text-slate-900" : "text-slate-600"
          } group-hover:text-slate-900`}
        >
          {question}
        </h4>
        <motion.div
          className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mt-0.5"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <Minus className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
              opacity: { duration: 0.3, delay: 0.1 },
            }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-5 text-slate-500 text-sm leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mx-4" />
    </div>
  );
}

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);

  const visibleFAQs = showAll ? FAQS : FAQS.slice(0, 5);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from(sectionRef.current.querySelectorAll(".faq-header > *"), {
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-28 bg-slate-50" id="faq">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left heading */}
          <div className="faq-header lg:col-span-2 lg:sticky lg:top-32 lg:self-start">
            <span className="inline-block text-sm font-medium text-blue-start uppercase tracking-widest mb-4">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
              Questions? We&apos;ve Got Answers
            </h2>
            <p className="text-slate-600">
              Can&apos;t find what you&apos;re looking for? Contact our team for
              a personalized response.
            </p>
          </div>

          {/* Right accordion */}
          <div className="lg:col-span-3">
            <div className="space-y-0">
              {visibleFAQs.map((faq, i) => (
                <AccordionItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === i}
                  onToggle={() =>
                    setOpenIndex(openIndex === i ? null : i)
                  }
                />
              ))}
            </div>

            {!showAll && FAQS.length > 5 && (
              <motion.button
                onClick={() => setShowAll(true)}
                className="mt-6 px-6 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-sm hover:bg-slate-100 hover:text-slate-900 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Show All {FAQS.length} Questions
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
