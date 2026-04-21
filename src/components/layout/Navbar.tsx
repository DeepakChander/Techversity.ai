"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { IndexNumeral } from "@/components/ui/IndexNumeral";
import { ButtonV2 } from "@/components/ui/ButtonV2";
import { cn } from "@/lib/utils";

/**
 * Navbar — 2026 editorial.
 * Fixed top, 72px tall. Wordmark (serif) · centered nav (sans) · quiet CTA.
 * No background until 80px scroll → solid ivory with paper-edge underline.
 * Scroll-direction detection hides/shows nav.
 * Mega-menu is a 3-column editorial spread (no icon grid).
 * "Schedule a conversation" replaces all "Apply Now" aggression.
 */

type NavChild = {
  label: string;
  href: string;
  description: string;
  duration?: string;
};

/* ─── Animated serif underline ─── */
function NavUnderline({ active }: { active: boolean }) {
  return (
    <motion.span
      aria-hidden
      className="absolute left-0 right-0 bottom-[-10px] h-px bg-[var(--color-heritage-crimson)] origin-left"
      initial={false}
      animate={{ scaleX: active ? 1 : 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

/* ─── Editorial mega-menu ─── */
function MegaMenu({
  link,
  onClose,
}: {
  link: (typeof NAV_LINKS)[number];
  onClose: () => void;
}) {
  const children = "children" in link ? (link.children as unknown as NavChild[]) : [];
  const isPrograms = link.label === "Programs";

  return (
    <motion.div
      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[min(92vw,900px)]"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      role="menu"
    >
      <div className="bg-[var(--color-canvas-ivory)] border border-[var(--color-canvas-paper-edge)] grid grid-cols-12 gap-0">
        {/* Left: index + heading */}
        <div className="col-span-4 p-8 border-r border-[var(--color-canvas-paper-edge)]">
          <IndexNumeral
            index={isPrograms ? "001" : "002"}
            label={isPrograms ? "The programmes" : "The firm"}
          />
          <h3 className="type-display text-[2.25rem] mt-5 text-[var(--color-ink-primary)]">
            {isPrograms ? "Four pathways." : "Our method."}
          </h3>
          <p className="type-display-italic text-[var(--color-ink-muted)] mt-3 text-[15px] max-w-[24ch]">
            {isPrograms
              ? "Each recognises a different dimension of a life's work."
              : "How we review, introduce, and shepherd."}
          </p>
        </div>

        {/* Right: editorial list */}
        <ul className="col-span-8 divide-y divide-[var(--color-canvas-paper-edge)]">
          {children.map((child) => (
            <li key={child.label}>
              <Link
                href={child.href}
                onClick={onClose}
                className="group flex items-start gap-6 px-8 py-6 hover:bg-[var(--color-canvas-bone)] transition-colors duration-500 ease-[var(--ease-editorial)]"
                role="menuitem"
              >
                <div className="flex-1">
                  <div className="type-display text-[1.5rem] text-[var(--color-ink-primary)] group-hover:text-[var(--color-heritage-crimson)] transition-colors duration-500 ease-[var(--ease-editorial)]">
                    {child.label}
                  </div>
                  <div className="type-ui text-[14px] text-[var(--color-ink-muted)] mt-1 max-w-[42ch]">
                    {child.description}
                  </div>
                </div>
                <span
                  aria-hidden
                  className="type-mono-meta text-[var(--color-ink-whisper)] group-hover:text-[var(--color-heritage-crimson)] transition-colors duration-500 pt-2"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/* ─── Hamburger (3 rules, rewrites to X) ─── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="w-6 h-5 relative flex flex-col items-stretch justify-between">
      <motion.span
        className="h-px bg-[var(--color-ink-primary)] origin-right"
        animate={{ rotate: open ? -45 : 0, y: open ? 10 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="h-px bg-[var(--color-ink-primary)]"
        animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="h-px bg-[var(--color-ink-primary)] origin-right"
        animate={{ rotate: open ? 45 : 0, y: open ? -9 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
    const down = latest > lastY.current;
    setHidden(down && latest > 300 && !mobileOpen && !active);
    lastY.current = latest;
  });

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const enter = useCallback((label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActive(label);
  }, []);
  const leave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setActive(null), 200);
  }, []);
  const close = useCallback(() => setActive(null), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -80 }}
        animate={{ y: hidden ? -80 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={cn(
            "transition-colors duration-500 ease-[var(--ease-editorial)]",
            scrolled
              ? "bg-[var(--color-canvas-ivory)] border-b border-[var(--color-canvas-paper-edge)]"
              : "bg-transparent border-b border-transparent"
          )}
        >
          <nav
            className="max-w-[1440px] mx-auto px-8 lg:px-14"
            role="navigation"
            aria-label="Main navigation"
          >
            <div className="flex items-center justify-between h-[72px]">
              {/* ─── Wordmark ─── */}
              <Link
                href="/"
                className="type-display text-[22px] text-[var(--color-ink-primary)] tracking-[-0.01em]"
                onClick={close}
              >
                Techversity
              </Link>

              {/* ─── Centered desktop nav ─── */}
              <div className="hidden lg:flex items-center gap-10">
                {NAV_LINKS.filter((l) => l.label !== "Home").map((link) => {
                  const hasChildren = "children" in link;
                  const isActive = active === link.label;
                  return (
                    <div
                      key={link.label}
                      className="relative"
                      onMouseEnter={() => hasChildren && enter(link.label)}
                      onMouseLeave={leave}
                    >
                      <Link
                        href={link.href}
                        className="relative text-[14px] tracking-[0.02em] text-[var(--color-ink-primary)] hover:text-[var(--color-heritage-crimson)] transition-colors duration-500 ease-[var(--ease-editorial)] py-2 font-[family-name:var(--font-sans-2026)]"
                        aria-expanded={hasChildren ? isActive : undefined}
                        aria-haspopup={hasChildren ? "true" : undefined}
                      >
                        {link.label}
                        <NavUnderline active={isActive} />
                      </Link>

                      <AnimatePresence>
                        {hasChildren && isActive && (
                          <MegaMenu link={link} onClose={close} />
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* ─── Desktop CTA ─── */}
              <div className="hidden lg:block">
                <ButtonV2 href="/apply" variant="quiet" size="sm" showArrow>
                  Schedule a conversation
                </ButtonV2>
              </div>

              {/* ─── Mobile toggle ─── */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden p-2 -mr-2"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                <HamburgerIcon open={mobileOpen} />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* ─── Mobile overlay ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden bg-[var(--color-canvas-ivory)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Mobile navigation"
          >
            <div className="h-full flex flex-col justify-between px-8 pt-24 pb-14">
              {/* Links */}
              <ul className="flex flex-col gap-8">
                {NAV_LINKS.filter((l) => l.label !== "Home").map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.1 + i * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobile}
                      className="type-display text-[clamp(2.25rem,9vw,3.5rem)] text-[var(--color-ink-primary)] block leading-none"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-5"
              >
                <ButtonV2
                  href="/apply"
                  variant="heritage"
                  size="md"
                  showArrow
                  onClick={closeMobile}
                  className="w-full justify-center"
                >
                  Schedule a conversation
                </ButtonV2>
                <div className="type-mono-meta text-[var(--color-ink-muted)] text-center">
                  RESPONSES WITHIN 48 HOURS · CONFIDENTIAL
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
