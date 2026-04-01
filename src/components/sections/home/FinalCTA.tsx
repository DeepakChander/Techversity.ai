"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Star, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EASE } from "@/lib/animations";

export function FinalCTA() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-blue-start/20">
      {/* Aurora Background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute w-[800px] h-[500px] rounded-full opacity-[0.12]"
          style={{
            background: "radial-gradient(ellipse, #3A82FF 0%, transparent 70%)",
            top: "0%",
            left: "5%",
            filter: "blur(100px)",
            animation: "aurora-1 15s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[600px] h-[400px] rounded-full opacity-[0.08]"
          style={{
            background: "radial-gradient(ellipse, #0EA5E9 0%, transparent 70%)",
            top: "20%",
            right: "5%",
            filter: "blur(100px)",
            animation: "aurora-2 18s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[400px] h-[300px] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(ellipse, #7c3aed 0%, transparent 70%)",
            bottom: "0%",
            left: "30%",
            filter: "blur(80px)",
            animation: "aurora-3 20s ease-in-out infinite",
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: EASE.default }}
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
          Ready to Earn the Title{" "}
          <span className="bg-gradient-to-r from-blue-start via-cyan to-purple bg-[length:200%_auto] bg-clip-text text-transparent shimmer-text">
            You Deserve?
          </span>
        </h2>

        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Join accomplished professionals from 12+ countries who have turned
          their career achievements into academic recognition.
        </p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-start via-cyan to-blue-mid rounded-xl opacity-40 blur-md group-hover:opacity-60 transition-opacity duration-500" />
            <Button href="/apply" size="lg" className="relative !bg-white !text-slate-900 hover:!shadow-xl">
              Start Your Application
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
          <Button href="/contact" variant="outline" size="lg" className="!text-white !border-white/30 hover:!bg-white/10">
            Schedule a Free Consultation
          </Button>
        </motion.div>

        {/* Trust counters */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm text-slate-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan" />
            <span>
              Response within{" "}
              <strong className="text-white">4 hours</strong>
            </span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400" />
            <span>
              Rated <strong className="text-white">4.8/5</strong> by clients
            </span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>
              <strong className="text-white">100%</strong> Refund Guarantee
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
