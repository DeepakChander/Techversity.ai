"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Clock, Star, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="relative py-16 lg:py-24 overflow-hidden"
    >
      {/* Aurora Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-[#0a1235] to-bg-primary" />
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute w-[600px] h-[400px] rounded-full opacity-[0.12]"
            style={{
              background: "radial-gradient(ellipse, #1a6dff 0%, transparent 70%)",
              top: "10%",
              left: "10%",
              filter: "blur(80px)",
              animation: "aurora-1 15s ease-in-out infinite",
            }}
          />
          <div
            className="absolute w-[500px] h-[350px] rounded-full opacity-[0.08]"
            style={{
              background: "radial-gradient(ellipse, #00e5ff 0%, transparent 70%)",
              top: "30%",
              right: "10%",
              filter: "blur(80px)",
              animation: "aurora-2 18s ease-in-out infinite",
            }}
          />
          <div
            className="absolute w-[400px] h-[300px] rounded-full opacity-[0.06]"
            style={{
              background: "radial-gradient(ellipse, #7b2ff7 0%, transparent 70%)",
              bottom: "10%",
              left: "30%",
              filter: "blur(80px)",
              animation: "aurora-3 20s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text-primary mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Ready to Earn the Title{" "}
          <span className="bg-gradient-to-r from-blue-start via-cyan to-coral bg-clip-text text-transparent shimmer-text">
            You Deserve?
          </span>
        </motion.h2>

        <motion.p
          className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Join accomplished professionals from 12+ countries who have turned
          their career achievements into academic recognition.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button href="/apply" size="lg">
            Apply Now — It&apos;s Free
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Schedule a Free Consultation
          </Button>
        </motion.div>

        {/* Trust counters */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm text-text-muted"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan" />
            <span>
              Response within <strong className="text-text-primary">4 hours</strong>
            </span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-orange" />
            <span>
              Rated <strong className="text-text-primary">4.8/5</strong> by clients
            </span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan" />
            <span>
              <strong className="text-text-primary">100%</strong> Refund Guarantee
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
