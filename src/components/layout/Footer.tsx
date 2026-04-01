"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  ArrowUpRight,
  ArrowRight,
  Globe,
  Shield,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Sparkles,
  Phone,
  MapPin,
} from "lucide-react";
import { SITE_CONFIG, FOOTER_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import {
  staggerContainer,
  staggerItem,
  fadeUp,
  lineReveal,
  EASE,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

/* ─── Social links ─── */
const SOCIAL_LINKS = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

/* ─── Animated link with underline reveal ─── */
function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const Component = external ? "a" : Link;
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <motion.li variants={staggerItem}>
      <Component
        href={href}
        className="group relative inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors duration-300 py-1.5"
        {...(externalProps as any)}
      >
        <span className="relative">
          {children}
          <span className="absolute -bottom-px left-0 w-0 h-px bg-gradient-to-r from-blue-start to-cyan group-hover:w-full transition-all duration-300" />
        </span>
        {external && (
          <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        )}
      </Component>
    </motion.li>
  );
}

/* ─── Footer column ─── */
function FooterColumn({
  title,
  links,
  delay = 0,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
  delay?: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay }}
    >
      <h4 className="font-heading text-xs font-semibold text-white mb-5 uppercase tracking-[0.15em] flex items-center gap-2">
        <span className="w-4 h-px bg-gradient-to-r from-blue-start to-transparent" />
        {title}
      </h4>
      <motion.ul
        className="space-y-0.5"
        variants={staggerContainer(0.05, delay)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {links.map((link) => (
          <FooterLink key={link.href + link.label} href={link.href}>
            {link.label}
          </FooterLink>
        ))}
      </motion.ul>
    </motion.div>
  );
}

/* ─── Stats ─── */
const FOOTER_STATS = [
  { value: 12, suffix: "+", label: "Countries Served" },
  { value: 4, suffix: "", label: "Partner Universities" },
  { value: 98, suffix: "%", label: "Acceptance Rate" },
  { value: 4.8, suffix: "/5", label: "Client Satisfaction", decimals: 1 },
];

/* ─── Marquee texts ─── */
const MARQUEE_ROW_1 = [
  "HONORARY DOCTORATE",
  "DOCTOR OF BUSINESS ADMINISTRATION",
  "DOCTOR OF PHILOSOPHY",
  "ACCREDITED UNIVERSITIES",
  "GLOBAL RECOGNITION",
  "PROFESSIONAL EXCELLENCE",
];

const MARQUEE_ROW_2 = [
  "CAREER ADVANCEMENT",
  "ACADEMIC EXCELLENCE",
  "RESEARCH INNOVATION",
  "LEADERSHIP CREDENTIAL",
  "12+ COUNTRIES",
  "4.8/5 SATISFACTION",
];

/* ════════════════════════════════════════════
   FOOTER — Premium animated design
   ════════════════════════════════════════════ */
export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 });

  return (
    <footer ref={footerRef} className="relative bg-slate-900 overflow-hidden">
      {/* ─── Background effects ─── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] opacity-[0.05]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(58,130,255,0.6) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* ─── CTA Banner Section ─── */}
      <div ref={ctaRef} className="relative border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <motion.div
            className="relative rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE.default }}
          >
            {/* CTA background with animated gradient */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(-45deg, rgba(58,130,255,0.12), rgba(34,211,238,0.08), rgba(123,47,247,0.1), rgba(58,130,255,0.12))",
                backgroundSize: "400% 400%",
                animation: "gradient-shift 15s ease infinite",
              }}
            />
            <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-3xl" />
            <div className="absolute inset-[0] rounded-3xl border border-white/[0.08]" />

            <div className="relative z-10 px-8 py-12 md:px-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left max-w-lg">
                <motion.div
                  className="flex items-center gap-2 mb-3 justify-center md:justify-start"
                  initial={{ opacity: 0, x: -12 }}
                  animate={ctaInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <Sparkles className="w-4 h-4 text-blue-start" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-blue-start">
                    Start Your Journey
                  </span>
                </motion.div>
                <motion.h3
                  className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white mb-3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  Ready to transform your career?
                </motion.h3>
                <motion.p
                  className="text-slate-400 text-sm md:text-base max-w-md"
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
          {MARQUEE_ROW_1.map((text, i) => (
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
          {MARQUEE_ROW_2.map((text, i) => (
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
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 lg:pt-20 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Brand column — spans 4 cols */}
          <motion.div
            className="col-span-2 md:col-span-3 lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-3 mb-5 group"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <Image
                  src="/images/techversity-logo.jpeg"
                  alt="Techversity.ai"
                  width={44}
                  height={44}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-white/[0.1] group-hover:ring-blue-start/40 transition-all duration-500"
                />
              </motion.div>
              <div>
                <span className="font-heading text-lg font-bold text-white block">
                  TECHVERSITY<span className="text-blue-start">.AI</span>
                </span>
                <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">
                  Powering the Techverse
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mt-4 mb-6">
              Premier admissions advisory connecting accomplished professionals
              with accredited universities worldwide.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-6">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-blue-start transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center group-hover:bg-blue-start/10 group-hover:border-blue-start/20 transition-all duration-300">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                {SITE_CONFIG.email}
              </a>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-blue-start hover:bg-blue-start/10 hover:border-blue-start/20 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: Shield, text: "Accredited" },
                { icon: Globe, text: "12+ Countries" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-[10px] text-slate-400"
                >
                  <Icon className="w-3 h-3 text-blue-start/60" />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Programs — 2 cols */}
          <div className="lg:col-span-2">
            <FooterColumn title="Programs" links={FOOTER_LINKS.programs} delay={0.1} />
          </div>

          {/* University — 2 cols */}
          <div className="lg:col-span-2">
            <FooterColumn title="University" links={FOOTER_LINKS.university} delay={0.15} />
          </div>

          {/* Company — 2 cols */}
          <div className="lg:col-span-2">
            <FooterColumn title="Company" links={FOOTER_LINKS.company} delay={0.2} />
          </div>

          {/* Legal — 2 cols */}
          <div className="hidden md:block lg:col-span-2">
            <FooterColumn title="Legal" links={FOOTER_LINKS.legal} delay={0.25} />
          </div>
        </div>

        {/* ─── Stats bar ─── */}
        <motion.div
          className="mt-14 pt-8 border-t border-white/[0.04]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {FOOTER_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.4 + i * 0.1,
                  duration: 0.6,
                  ease: EASE.default,
                }}
              >
                <div className="text-2xl md:text-3xl font-heading font-bold text-white tracking-tight mb-1">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals || 0}
                  />
                </div>
                <div className="text-[10px] text-slate-500 uppercase tracking-[0.15em]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── Mobile Legal links (shown on small screens) ─── */}
        <div className="md:hidden mb-8">
          <FooterColumn title="Legal" links={FOOTER_LINKS.legal} />
        </div>

        {/* ─── Bottom bar ─── */}
        <motion.div
          className="pt-6 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <p className="text-xs text-slate-500" suppressHydrationWarning>
              &copy; {new Date().getFullYear()} Techversity.ai
            </p>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <p className="text-xs text-slate-500">All rights reserved</p>
          </div>

          <p className="text-[11px] text-slate-500/60 max-w-md text-center md:text-right leading-relaxed">
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
              "linear-gradient(90deg, transparent, rgba(58,130,255,0.2), rgba(34,211,238,0.2), rgba(123,47,247,0.2), transparent)",
          }}
          variants={lineReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1.5 }}
        />
      </div>
    </footer>
  );
}
