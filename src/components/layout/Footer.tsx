"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG, FOOTER_LINKS } from "@/lib/constants";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <footer
      ref={ref}
      className="relative bg-[#080b1e] border-t border-white/[0.05]"
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Marquee decoration */}
      <div className="overflow-hidden border-b border-white/[0.05] py-6">
        <motion.div
          className="whitespace-nowrap"
          animate={{ x: [0, -1920] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="inline-block text-[80px] lg:text-[120px] font-heading font-bold tracking-tight mx-8"
              style={{
                WebkitTextStroke: "1px rgba(255,255,255,0.06)",
                color: "transparent",
              }}
            >
              POWERING THE TECHVERSE OF TOMORROW
            </span>
          ))}
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <motion.div
            className="col-span-2 md:col-span-3 lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <Image
                src="/images/techversity-logo.jpeg"
                alt="Techversity.ai"
                width={44}
                height={44}
                className="w-11 h-11 rounded-full object-cover"
              />
              <span className="font-heading text-xl font-bold text-text-primary">
                TECHVERSITY<span className="text-cyan">.AI</span>
              </span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs mt-4">
              {SITE_CONFIG.description}
            </p>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="inline-flex items-center gap-2 mt-4 text-sm text-text-secondary hover:text-cyan transition-colors"
            >
              <Mail className="w-4 h-4" />
              {SITE_CONFIG.email}
            </a>
          </motion.div>

          {/* Programs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-heading text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
              Programs
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.programs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-text-primary transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-heading text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-text-primary transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-heading text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Techversity.ai. All rights
            reserved.
          </p>
          <p className="text-xs text-text-muted max-w-lg text-center md:text-right">
            Techversity.ai is an admissions advisory service. We are not a
            university or degree-granting institution.
          </p>
        </div>
      </div>
    </footer>
  );
}
