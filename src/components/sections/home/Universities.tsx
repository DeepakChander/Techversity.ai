"use client";

import { useRef, Suspense } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { UNIVERSITIES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { useGSAP, gsap } from "@/hooks/useGSAP";
import dynamic from "next/dynamic";

const GlobeCanvas = dynamic(
  () => import("@/components/three/Globe").then((mod) => mod.GlobeCanvas),
  { ssr: false }
);

export function Universities() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from(sectionRef.current.querySelectorAll(".uni-header > *"), {
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

    gsap.from(sectionRef.current.querySelectorAll(".uni-card"), {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current.querySelector(".uni-grid"),
        start: "top 85%",
        once: true,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 overflow-hidden"
      id="universities"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-start/[0.04] blur-[150px]" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="uni-header text-center mb-10">
          <span className="inline-block text-sm font-medium text-cyan uppercase tracking-widest mb-4">
            Partner Universities
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-5">
            Accredited Institutions{" "}
            <span className="bg-gradient-to-r from-blue-start to-cyan bg-clip-text text-transparent">
              Worldwide
            </span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Our carefully selected university partners span across continents,
            offering globally recognized credentials.
          </p>
        </div>

        {/* 3D Globe */}
        <motion.div
          className="relative mb-14"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Suspense
            fallback={
              <div className="w-full aspect-square max-w-md mx-auto flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-cyan/20 border-t-cyan animate-spin" />
              </div>
            }
          >
            <GlobeCanvas />
          </Suspense>
        </motion.div>

        {/* University cards */}
        <div className="uni-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {UNIVERSITIES.map((uni) => (
            <div
              key={uni.id}
              className="uni-card group h-full rounded-2xl bg-white/[0.03] border border-white/[0.08] p-6 transition-all duration-500 hover:bg-white/[0.06] hover:border-white/[0.15] hover:shadow-[0_8px_40px_rgba(26,109,255,0.08)] hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{uni.flag}</span>
                <div>
                  <h4 className="font-heading font-semibold text-text-primary text-sm">
                    {uni.name}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-text-muted">
                    <MapPin className="w-3 h-3" />
                    {uni.location}
                  </div>
                </div>
              </div>
              <p className="text-text-muted text-xs leading-relaxed mb-4">
                {uni.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {uni.programs.map((prog) => (
                  <span
                    key={prog}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-blue-start/10 text-blue-mid"
                  >
                    {prog}
                  </span>
                ))}
              </div>
              <Button
                href="/universities"
                variant="ghost"
                size="sm"
                className="text-xs group/btn"
              >
                Learn More
                <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-text-muted mt-10 max-w-lg mx-auto opacity-60">
          Techversity.ai is an admissions advisory service. We facilitate
          connections between candidates and accredited universities but do not
          grant degrees.
        </p>
      </div>
    </section>
  );
}
