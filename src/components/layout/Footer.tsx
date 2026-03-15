"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  ArrowUpRight,
  ArrowRight,
  MapPin,
  Globe,
  Shield,
  Sparkles,
} from "lucide-react";
import { SITE_CONFIG, FOOTER_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

/* ─── Infinite scrolling marquee ─── */
function Marquee({
  children,
  speed = 30,
  reverse = false,
}: {
  children: React.ReactNode;
  speed?: number;
  reverse?: boolean;
}) {
  return (
    <div className="overflow-hidden whitespace-nowrap" aria-hidden="true">
      <div
        className="inline-flex"
        style={{
          animation: `marquee ${speed}s linear infinite ${reverse ? "reverse" : ""}`,
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

/* ─── Animated counter for footer stats ─── */
function FooterStat({
  value,
  label,
  delay = 0,
}: {
  value: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="text-2xl md:text-3xl font-heading font-bold text-text-primary tracking-tight mb-1">
        {value}
      </div>
      <div className="text-[10px] text-text-muted uppercase tracking-[0.15em]">
        {label}
      </div>
    </motion.div>
  );
}

/* ─── Animated link with underline reveal ─── */
function FooterLink({
  href,
  children,
  external = false,
  delay = 0,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(ref, { once: true });

  const Component = external ? "a" : Link;
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Component
        ref={ref as any}
        href={href}
        className="group relative inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors duration-300 py-1"
        {...externalProps}
      >
        <span className="relative">
          {children}
          <span className="absolute -bottom-px left-0 w-0 h-px bg-gradient-to-r from-blue-start to-cyan group-hover:w-full transition-all duration-300" />
        </span>
        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
      </Component>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   FOOTER — Premium animated design
   ════════════════════════════════════════════ */
export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 });

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <footer ref={footerRef} className="relative bg-[#060918] overflow-hidden">
      {/* ─── Background effects ─── */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] opacity-[0.03]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(26,109,255,0.8) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* ─── CTA Banner Section ─── */}
      <div ref={ctaRef} className="relative border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <motion.div
            className="relative rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* CTA background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-start/10 via-cyan/5 to-purple/10" />
            <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-3xl" />
            <div className="absolute inset-[0] rounded-3xl border border-white/[0.08]" />

            <div className="relative z-10 px-8 py-12 md:px-12 md:py-14 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <motion.div
                  className="flex items-center gap-2 mb-3 justify-center md:justify-start"
                  initial={{ opacity: 0, x: -12 }}
                  animate={ctaInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <Sparkles className="w-4 h-4 text-cyan" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-cyan">
                    Start Your Journey
                  </span>
                </motion.div>
                <motion.h3
                  className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-2"
                  initial={{ opacity: 0, y: 12 }}
                  animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  Ready to transform your career?
                </motion.h3>
                <motion.p
                  className="text-text-muted text-sm max-w-md"
                  initial={{ opacity: 0, y: 12 }}
                  animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Book a free consultation with our advisory team. No
                  obligation, no pressure — just clarity.
                </motion.p>
              </div>
              <motion.div
                className="flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, y: 12 }}
                animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Button href="/apply" size="md">
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button href="/contact" variant="outline" size="md">
                  Free Consultation
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── Dual marquee decoration ─── */}
      <div className="border-b border-white/[0.03] py-4 space-y-3">
        <Marquee speed={45}>
          {[
            "HONORARY DOCTORATE",
            "DOCTOR OF BUSINESS ADMINISTRATION",
            "DOCTOR OF PHILOSOPHY",
            "ACCREDITED UNIVERSITIES",
            "GLOBAL RECOGNITION",
            "PROFESSIONAL EXCELLENCE",
          ].map((text, i) => (
            <span key={i} className="inline-flex items-center mx-8">
              <span
                className="text-[40px] lg:text-[56px] font-heading font-bold tracking-tight"
                style={{
                  WebkitTextStroke: "1px rgba(255,255,255,0.04)",
                  color: "transparent",
                }}
              >
                {text}
              </span>
              <span className="mx-8 w-2 h-2 rounded-full bg-white/[0.06]" />
            </span>
          ))}
        </Marquee>
        <Marquee speed={50} reverse>
          {[
            "CAREER ADVANCEMENT",
            "ACADEMIC EXCELLENCE",
            "RESEARCH INNOVATION",
            "LEADERSHIP CREDENTIAL",
            "12+ COUNTRIES",
            "4.8/5 SATISFACTION",
          ].map((text, i) => (
            <span key={i} className="inline-flex items-center mx-8">
              <span
                className="text-[32px] lg:text-[44px] font-heading font-bold tracking-tight"
                style={{
                  WebkitTextStroke: "1px rgba(255,255,255,0.03)",
                  color: "transparent",
                }}
              >
                {text}
              </span>
              <span className="mx-8 w-1.5 h-1.5 rounded-full bg-cyan/10" />
            </span>
          ))}
        </Marquee>
      </div>

      {/* ─── Main footer content ─── */}
      <motion.div
        className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 lg:pt-20 pb-8"
        style={{ y: parallaxY, opacity: parallaxOpacity }}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Brand column — spans 4 cols */}
          <motion.div
            className="col-span-2 md:col-span-3 lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <Image
                  src="/images/techversity-logo.jpeg"
                  alt="Techversity.ai"
                  width={44}
                  height={44}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-white/[0.06] group-hover:ring-cyan/30 transition-all duration-500"
                />
              </motion.div>
              <div>
                <span className="font-heading text-lg font-bold text-text-primary block">
                  TECHVERSITY<span className="text-cyan">.AI</span>
                </span>
                <span className="text-[10px] text-text-muted uppercase tracking-[0.2em]">
                  Powering the Techverse
                </span>
              </div>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs mt-4 mb-5">
              Premier admissions advisory connecting accomplished professionals
              with accredited universities worldwide.
            </p>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-cyan transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:bg-cyan/10 group-hover:border-cyan/20 transition-all duration-300">
                <Mail className="w-3.5 h-3.5" />
              </div>
              {SITE_CONFIG.email}
            </a>

            {/* Trust badges */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: Shield, text: "Accredited" },
                { icon: Globe, text: "12+ Countries" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-[10px] text-text-muted"
                >
                  <Icon className="w-3 h-3 text-cyan/60" />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Programs — spans 2 cols */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h4 className="font-heading text-xs font-semibold text-text-primary mb-5 uppercase tracking-[0.15em] flex items-center gap-2">
              <span className="w-4 h-px bg-gradient-to-r from-cyan to-transparent" />
              Programs
            </h4>
            <ul className="space-y-1">
              {FOOTER_LINKS.programs.map((link, i) => (
                <li key={link.href}>
                  <FooterLink href={link.href} delay={0.1 + i * 0.05}>
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company — spans 2 cols */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h4 className="font-heading text-xs font-semibold text-text-primary mb-5 uppercase tracking-[0.15em] flex items-center gap-2">
              <span className="w-4 h-px bg-gradient-to-r from-cyan to-transparent" />
              Company
            </h4>
            <ul className="space-y-1">
              {FOOTER_LINKS.company.map((link, i) => (
                <li key={link.href}>
                  <FooterLink href={link.href} delay={0.15 + i * 0.05}>
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal — spans 2 cols */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h4 className="font-heading text-xs font-semibold text-text-primary mb-5 uppercase tracking-[0.15em] flex items-center gap-2">
              <span className="w-4 h-px bg-gradient-to-r from-cyan to-transparent" />
              Legal
            </h4>
            <ul className="space-y-1">
              {FOOTER_LINKS.legal.map((link, i) => (
                <li key={link.href}>
                  <FooterLink href={link.href} delay={0.2 + i * 0.05}>
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ─── Stats bar ─── */}
        <motion.div
          className="mt-14 pt-8 border-t border-white/[0.04]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <FooterStat value="12+" label="Countries Served" delay={0.5} />
            <FooterStat value="4" label="Partner Universities" delay={0.6} />
            <FooterStat value="98%" label="Acceptance Rate" delay={0.7} />
            <FooterStat value="4.8/5" label="Client Satisfaction" delay={0.8} />
          </div>
        </motion.div>

        {/* ─── Bottom bar ─── */}
        <motion.div
          className="pt-6 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <p className="text-xs text-text-muted" suppressHydrationWarning>
              &copy; {new Date().getFullYear()} Techversity.ai
            </p>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <p className="text-xs text-text-muted">All rights reserved</p>
          </div>

          <p className="text-[11px] text-text-muted/60 max-w-md text-center md:text-right leading-relaxed">
            Techversity.ai is an admissions advisory service. We are not a
            university or degree-granting institution. All degrees are conferred
            by accredited partner universities.
          </p>
        </motion.div>

        {/* ─── Bottom accent line ─── */}
        <motion.div
          className="mt-6 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(26,109,255,0.2), rgba(0,229,255,0.2), rgba(123,47,247,0.2), transparent)",
          }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 1, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </footer>
  );
}
