"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Star, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useGSAP, gsap } from "@/hooks/useGSAP";

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from(sectionRef.current.querySelectorAll(".cta-content > *"), {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Aurora Background - enhanced */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-[#0a1235] to-bg-primary" />
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute w-[800px] h-[500px] rounded-full opacity-[0.15]"
            style={{
              background:
                "radial-gradient(ellipse, #1a6dff 0%, transparent 70%)",
              top: "0%",
              left: "5%",
              filter: "blur(100px)",
              animation: "aurora-1 15s ease-in-out infinite",
            }}
          />
          <div
            className="absolute w-[600px] h-[400px] rounded-full opacity-[0.1]"
            style={{
              background:
                "radial-gradient(ellipse, #00e5ff 0%, transparent 70%)",
              top: "20%",
              right: "5%",
              filter: "blur(100px)",
              animation: "aurora-2 18s ease-in-out infinite",
            }}
          />
          <div
            className="absolute w-[500px] h-[350px] rounded-full opacity-[0.08]"
            style={{
              background:
                "radial-gradient(ellipse, #ff6b6b 0%, transparent 70%)",
              bottom: "0%",
              left: "30%",
              filter: "blur(100px)",
              animation: "aurora-3 20s ease-in-out infinite",
            }}
          />
          <div
            className="absolute w-[400px] h-[300px] rounded-full opacity-[0.06]"
            style={{
              background:
                "radial-gradient(ellipse, #7b2ff7 0%, transparent 70%)",
              top: "40%",
              left: "50%",
              filter: "blur(80px)",
              animation: "aurora-1 22s ease-in-out infinite reverse",
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="cta-content relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text-primary mb-6 leading-tight">
          Ready to Earn the Title{" "}
          <span className="bg-gradient-to-r from-blue-start via-cyan to-coral bg-[length:200%_auto] bg-clip-text text-transparent shimmer-text">
            You Deserve?
          </span>
        </h2>

        <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Join accomplished professionals from 12+ countries who have turned
          their career achievements into academic recognition.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-start via-cyan to-blue-mid rounded-xl opacity-40 blur-md group-hover:opacity-60 transition-opacity duration-500" />
            <Button href="/apply" size="lg" className="relative">
              Start Your Application
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
          <Button href="/contact" variant="outline" size="lg">
            Schedule a Free Consultation
          </Button>
        </div>

        {/* Trust counters */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm text-text-muted">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan" />
            <span>
              Response within{" "}
              <strong className="text-text-primary">4 hours</strong>
            </span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-orange" />
            <span>
              Rated <strong className="text-text-primary">4.8/5</strong> by
              clients
            </span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan" />
            <span>
              <strong className="text-text-primary">100%</strong> Refund
              Guarantee
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
