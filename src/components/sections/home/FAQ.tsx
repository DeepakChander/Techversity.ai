"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "@/lib/constants";

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
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
      >
        <h4
          className={`font-medium text-base transition-colors duration-200 ${
            isOpen ? "text-text-primary" : "text-text-secondary"
          } group-hover:text-text-primary`}
        >
          {question}
        </h4>
        <motion.div
          className="flex-shrink-0 w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center text-text-muted mt-0.5"
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
            <p className="px-4 pb-5 text-text-muted text-sm leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mx-4" />
    </motion.div>
  );
}

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);

  const visibleFAQs = showAll ? FAQS : FAQS.slice(0, 5);

  return (
    <section ref={sectionRef} className="relative py-14 lg:py-20" id="faq">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left heading */}
          <div className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start">
            <motion.span
              className="inline-block text-sm font-medium text-cyan uppercase tracking-widest mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              FAQ
            </motion.span>
            <motion.h2
              className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Questions? We&apos;ve Got Answers
            </motion.h2>
            <motion.p
              className="text-text-secondary"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Can&apos;t find what you&apos;re looking for? Contact our team for
              a personalized response.
            </motion.p>
          </div>

          {/* Right accordion */}
          <div className="lg:col-span-3">
            <div className="space-y-0">
              {visibleFAQs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === i}
                  onToggle={() =>
                    setOpenIndex(openIndex === i ? null : i)
                  }
                  index={i}
                />
              ))}
            </div>

            {!showAll && FAQS.length > 5 && (
              <motion.button
                onClick={() => setShowAll(true)}
                className="mt-6 px-6 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-text-secondary text-sm hover:bg-white/[0.08] hover:text-text-primary transition-all duration-300"
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
