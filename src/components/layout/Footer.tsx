"use client";

import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { FOOTER_LINKS } from "@/lib/constants";
import { IndexNumeral } from "@/components/ui/IndexNumeral";

/**
 * Footer — 2026 editorial masthead.
 * Four rows:
 *   1. Wordmark + mission (serif)
 *   2. Sitemap (4 columns, mono labels + serif links)
 *   3. Credentials (serif paragraph + quiet institutions row)
 *   4. Legal rail (mono)
 *
 * No marquees. No counters. No social icons as trophies.
 * The footer is calm — this is not the final fireworks.
 */

/* ─── A serif link with editorial underline ─── */
function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const cls =
    "relative link-editorial inline-block text-[15px] text-[var(--color-ink-primary)] hover:text-[var(--color-heritage-crimson)] transition-colors duration-500 ease-[var(--ease-editorial)]";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/* ─── Column in the sitemap masthead ─── */
function SitemapColumn({
  label,
  links,
}: {
  label: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="type-mono-label text-[var(--color-heritage-crimson)]">{label}</div>
      <ul className="flex flex-col gap-3.5">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <FooterLink href={link.href}>{link.label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });

  return (
    <footer
      ref={ref}
      className="relative bg-[var(--color-canvas-ivory)] border-t border-[var(--color-canvas-paper-edge)]"
    >
      <div className="max-w-[1440px] mx-auto px-8 lg:px-14">
        {/* ═══ ROW 1 — Wordmark + mission ═══ */}
        <div className="pt-28 pb-20 border-b border-[var(--color-canvas-paper-edge)]">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 overflow-hidden">
              <motion.div
                className="type-display text-[var(--color-ink-primary)] leading-[0.88] tracking-[-0.03em]"
                style={{ fontSize: "clamp(5rem, 16vw, 13rem)" }}
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              >
                Techversity.
              </motion.div>
            </div>
            <div className="lg:col-span-4">
              <motion.p
                className="type-display-italic text-[var(--color-ink-muted)] text-[1.25rem] leading-[1.4] max-w-[32ch]"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.9,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Techversity introduces accomplished professionals to the universities that recognise them.
              </motion.p>
            </div>
          </div>
        </div>

        {/* ═══ ROW 2 — Sitemap masthead ═══ */}
        <div className="py-20 grid grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14 border-b border-[var(--color-canvas-paper-edge)]">
          <div className="lg:col-span-3 flex flex-col gap-5">
            <IndexNumeral index="/" label="Masthead" />
            <p className="type-display-italic text-[var(--color-ink-muted)] text-[15px] max-w-[28ch]">
              The network, the firm, the record.
            </p>
          </div>
          <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-8">
            <SitemapColumn label="Programmes" links={FOOTER_LINKS.programs} />
            <SitemapColumn label="Network" links={FOOTER_LINKS.university} />
            <SitemapColumn label="Firm" links={FOOTER_LINKS.company} />
            <SitemapColumn label="Resources" links={FOOTER_LINKS.resources} />
          </div>
        </div>

        {/* ═══ ROW 3 — Credentials ═══ */}
        <div className="py-16 grid lg:grid-cols-12 gap-10 border-b border-[var(--color-canvas-paper-edge)]">
          <div className="lg:col-span-4">
            <IndexNumeral index="001" label="Credentials" />
          </div>
          <div className="lg:col-span-8">
            <p className="type-ui text-[var(--color-ink-primary)] text-[17px] leading-[1.6] max-w-[58ch]">
              Every partner institution is accredited by its respective national or international accreditation body. Techversity does not confer degrees; we introduce, shepherd, and advise.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5">
              {["ISO 9001:2015", "National Accreditation", "EU Recognised", "Est. 2019"].map(
                (cred) => (
                  <span
                    key={cred}
                    className="type-mono-meta text-[var(--color-ink-muted)]"
                  >
                    {cred}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* ═══ ROW 4 — Legal rail ═══ */}
        <div className="py-10 flex flex-col-reverse lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="type-mono-meta text-[var(--color-ink-muted)]">
            © {new Date().getFullYear()} Techversity Advisory · All rights reserved
          </div>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="type-mono-meta text-[var(--color-ink-muted)] hover:text-[var(--color-heritage-crimson)] transition-colors duration-500 ease-[var(--ease-editorial)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
