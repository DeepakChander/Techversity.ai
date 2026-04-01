"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Award, Briefcase, GraduationCap, BookOpen, ArrowRight, Clock, Monitor } from "lucide-react";
import { PROGRAMS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { useGSAP, gsap, ScrollTrigger } from "@/hooks/useGSAP";

const iconMap: Record<string, React.ReactNode> = {
  Award: <Award className="w-7 h-7" />,
  Briefcase: <Briefcase className="w-7 h-7" />,
  GraduationCap: <GraduationCap className="w-7 h-7" />,
  BookOpen: <BookOpen className="w-7 h-7" />,
};

function ProgramCard({
  program,
  className,
}: {
  program: (typeof PROGRAMS)[number];
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useTransform(mouseY, [0, 1], [3, -3]);
  const rotateY = useTransform(mouseX, [0, 1], [-3, 3]);
  const springRotateX = useSpring(rotateX, { damping: 30, stiffness: 200 });
  const springRotateY = useSpring(rotateY, { damping: 30, stiffness: 200 });

  const glowBg = useTransform(
    [mouseX, mouseY],
    ([mx, my]: number[]) =>
      `radial-gradient(500px circle at ${mx * 100}% ${my * 100}%, rgba(26,109,255,0.06), transparent 40%)`
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`program-card ${className || ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className={`group relative h-full rounded-2xl bg-white border border-slate-200/80 p-7 lg:p-8 transition-all duration-500 hover:border-blue-200 hover:shadow-[0_8px_40px_rgba(26,109,255,0.08)] ${
          program.comingSoon ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        {/* Cursor-following glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: glowBg }}
        />

        {/* Coming Soon badge */}
        {program.comingSoon && (
          <div className="absolute top-5 right-5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs text-orange-600 font-medium z-10">
            Coming Soon
          </div>
        )}

        {/* Featured indicator */}
        {program.featured && !program.comingSoon && (
          <div className="absolute top-5 right-5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs text-blue-600 font-medium z-10">
            Popular
          </div>
        )}

        {/* Icon */}
        <div className="relative z-10 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 flex items-center justify-center text-blue-start mb-6 group-hover:scale-110 transition-transform duration-300">
          {iconMap[program.icon]}
        </div>

        {/* Title */}
        <h3 className="relative z-10 text-xl lg:text-2xl font-heading font-bold text-slate-900 mb-3">
          {program.title}
        </h3>

        {/* Description */}
        <p className="relative z-10 text-slate-600 text-sm leading-relaxed mb-6">
          {program.description}
        </p>

        {/* Meta info */}
        <div className="relative z-10 flex items-center gap-3 mb-5">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Clock className="w-3.5 h-3.5 text-blue-start/60" />
            {program.duration}
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-300" />
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Monitor className="w-3.5 h-3.5 text-blue-start/60" />
            {program.format}
          </div>
        </div>

        {/* CTA */}
        {!program.comingSoon && (
          <div className="relative z-10">
            <Button href={program.href} variant="ghost" size="sm" className="group/btn !text-blue-start hover:!bg-blue-50">
              Learn More
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function Programs() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.from(sectionRef.current.querySelectorAll(".programs-header > *"), {
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

    gsap.from(sectionRef.current.querySelectorAll(".program-card"), {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current.querySelector(".programs-grid"),
        start: "top 85%",
        once: true,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 overflow-hidden bg-slate-50"
      id="programs"
    >
      {/* Subtle background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-blue-start/[0.03] blur-[200px]" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="programs-header text-center mb-14">
          <span className="inline-block text-sm font-medium text-blue-start uppercase tracking-widest mb-4">
            Our Programs
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-slate-900 mb-5">
            Choose Your Path to{" "}
            <span className="bg-gradient-to-r from-blue-start to-cyan bg-clip-text text-transparent">
              Academic Excellence
            </span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            From honorary recognition to rigorous research programs, find the
            right fit for your professional journey.
          </p>
        </div>

        {/* Bento grid */}
        <div className="programs-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-auto">
          <ProgramCard
            program={PROGRAMS[0]}
            className="md:col-span-1 lg:col-span-2 lg:row-span-2"
          />
          <ProgramCard
            program={PROGRAMS[1]}
            className="md:col-span-1 lg:col-span-2"
          />
          <ProgramCard
            program={PROGRAMS[2]}
            className="md:col-span-1 lg:col-span-1"
          />
          <ProgramCard
            program={PROGRAMS[3]}
            className="md:col-span-1 lg:col-span-1"
          />
        </div>
      </div>
    </section>
  );
}
