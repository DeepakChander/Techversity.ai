"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  Award,
  Briefcase,
  GraduationCap,
  ArrowRight,
  Clock,
  Sparkles,
} from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { MagneticElement } from "@/components/ui/MagneticElement";

type IconProps = { className?: string; style?: React.CSSProperties };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, React.ComponentType<IconProps>> = {
  Award: Award as any,
  Briefcase: Briefcase as any,
  GraduationCap: GraduationCap as any,
};

type NavChild = (typeof NAV_LINKS)[1] extends {
  children: readonly (infer C)[];
}
  ? C
  : never;

/* ─── Animated hamburger icon ─── */
function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="w-6 h-6 relative flex flex-col items-center justify-center">
      <motion.span
        className="absolute w-5 h-[1.5px] bg-text-primary rounded-full"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 0 : -4,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="absolute w-5 h-[1.5px] bg-text-primary rounded-full"
        animate={{
          opacity: isOpen ? 0 : 1,
          scaleX: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute w-5 h-[1.5px] bg-text-primary rounded-full"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? 0 : 4,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

/* ─── Animated nav link underline ─── */
function NavLink({
  href,
  children,
  isActive,
  hasDropdown,
  isDropdownOpen,
  onKeyDown,
  ariaExpanded,
}: {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  hasDropdown?: boolean;
  isDropdownOpen?: boolean;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  ariaExpanded?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className="relative flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg"
      style={{
        color: isHovered || isActive
          ? "var(--color-text-primary)"
          : "var(--color-text-secondary)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-expanded={ariaExpanded}
      aria-haspopup={hasDropdown ? "true" : undefined}
      onKeyDown={onKeyDown}
    >
      {children}
      {hasDropdown && (
        <motion.div
          animate={{ rotate: isDropdownOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.div>
      )}
      {/* Animated underline */}
      <motion.span
        className="absolute bottom-0.5 left-4 right-4 h-px rounded-full"
        style={{
          background:
            "linear-gradient(90deg, var(--color-blue-start), var(--color-cyan))",
        }}
        initial={false}
        animate={{
          scaleX: isHovered || isActive ? 1 : 0,
          opacity: isHovered || isActive ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
    </Link>
  );
}

/* ════════════════════════════════════════════
   NAVBAR — Premium animated navigation
   ════════════════════════════════════════════ */
export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [hoveredChild, setHoveredChild] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastScrollY = useRef(0);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { scrollY } = useScroll();

  // Track scroll direction and progress
  useMotionValueEvent(scrollY, "change", (latest) => {
    const isScrollingDown = latest > lastScrollY.current;
    setHidden(isScrollingDown && latest > 300);
    setScrollProgress(Math.min(latest / 100, 1));
    lastScrollY.current = latest;
  });

  const isScrolled = scrollProgress > 0.5;

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setHoveredChild(null);
    }, 200);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    label: string,
    hasChildren: boolean
  ) => {
    if (!hasChildren) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveDropdown(activeDropdown === label ? null : label);
    }
    if (e.key === "Escape") {
      setActiveDropdown(null);
    }
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-px z-50"
          style={{
            background:
              "linear-gradient(90deg, var(--color-blue-start), var(--color-cyan), var(--color-purple))",
            width: `${scrollProgress * 100}%`,
            opacity: isScrolled ? 0.6 : 0,
          }}
        />

        <nav
          className="mx-auto transition-all duration-700 ease-out"
          style={{
            marginTop: isScrolled ? "12px" : "0px",
            marginLeft: isScrolled ? "16px" : "0px",
            marginRight: isScrolled ? "16px" : "0px",
            borderRadius: isScrolled ? "16px" : "0px",
            backgroundColor: isScrolled
              ? "rgba(10, 14, 39, 0.7)"
              : "transparent",
            backdropFilter: isScrolled ? "blur(24px) saturate(180%)" : "none",
            WebkitBackdropFilter: isScrolled
              ? "blur(24px) saturate(180%)"
              : "none",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: isScrolled
              ? "rgba(255,255,255,0.06)"
              : "transparent",
            boxShadow: isScrolled
              ? "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)"
              : "none",
          }}
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-[72px]">
              {/* ─── Logo ─── */}
              <Link href="/" className="flex items-center gap-3 group relative">
                <MagneticElement strength={0.1}>
                  <motion.div
                    className="relative w-10 h-10 flex items-center justify-center"
                    whileHover={{ scale: 1.08 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}
                  >
                    {/* Logo glow on hover */}
                    <div className="absolute inset-0 rounded-full bg-cyan/0 group-hover:bg-cyan/20 blur-xl transition-all duration-500" />
                    <Image
                      src="/images/techversity-logo.jpeg"
                      alt="Techversity.ai"
                      width={40}
                      height={40}
                      className="relative w-10 h-10 rounded-full object-cover ring-2 ring-white/[0.08] group-hover:ring-cyan/30 transition-all duration-500"
                      priority
                    />
                  </motion.div>
                </MagneticElement>
                <motion.span
                  className="font-heading text-xl font-bold text-text-primary hidden sm:block"
                  animate={{
                    opacity: isScrolled ? 0 : 1,
                    width: isScrolled ? 0 : "auto",
                    marginLeft: isScrolled ? 0 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                >
                  TECHVERSITY
                  <span className="text-cyan">.AI</span>
                </motion.span>
              </Link>

              {/* ─── Desktop Navigation ─── */}
              <div className="hidden lg:flex items-center gap-0.5">
                {NAV_LINKS.map((link) => {
                  const hasChildren = "children" in link;
                  return (
                    <div
                      key={link.label}
                      className="relative"
                      onMouseEnter={() =>
                        hasChildren
                          ? handleDropdownEnter(link.label)
                          : undefined
                      }
                      onMouseLeave={handleDropdownLeave}
                    >
                      <MagneticElement strength={0.12}>
                        <NavLink
                          href={link.href}
                          hasDropdown={hasChildren}
                          isDropdownOpen={activeDropdown === link.label}
                          ariaExpanded={
                            hasChildren
                              ? activeDropdown === link.label
                              : undefined
                          }
                          onKeyDown={(e) =>
                            handleKeyDown(e, link.label, hasChildren)
                          }
                        >
                          {link.label}
                        </NavLink>
                      </MagneticElement>

                      {/* ─── Premium Mega Dropdown ─── */}
                      {hasChildren && (
                        <AnimatePresence>
                          {activeDropdown === link.label && (
                            <motion.div
                              initial={{ opacity: 0, y: 12, scale: 0.97 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 8, scale: 0.97 }}
                              transition={{
                                duration: 0.3,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[440px]"
                              role="menu"
                            >
                              <div
                                className="rounded-2xl overflow-hidden"
                                style={{
                                  background:
                                    "linear-gradient(180deg, rgba(17,22,51,0.97) 0%, rgba(10,14,39,0.98) 100%)",
                                  backdropFilter: "blur(32px)",
                                  WebkitBackdropFilter: "blur(32px)",
                                  border: "1px solid rgba(255,255,255,0.07)",
                                  boxShadow:
                                    "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.04)",
                                }}
                              >
                                {/* Dropdown header with gradient accent */}
                                <div className="relative px-5 pt-5 pb-3">
                                  <div
                                    className="absolute top-0 left-5 right-5 h-px"
                                    style={{
                                      background:
                                        "linear-gradient(90deg, transparent, rgba(0,229,255,0.3), transparent)",
                                    }}
                                  />
                                  <div className="flex items-center gap-2">
                                    <Sparkles className="w-3 h-3 text-cyan/50" />
                                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
                                      Doctoral Programs
                                    </p>
                                  </div>
                                </div>

                                {/* Program items */}
                                <div className="px-2 pb-2">
                                  {(
                                    link.children as unknown as NavChild[]
                                  ).map((child, index: number) => {
                                    const IconComponent =
                                      ICON_MAP[child.icon] || null;
                                    const accent = child.accent;
                                    const duration = child.duration;
                                    const isHovered =
                                      hoveredChild === child.label;

                                    return (
                                      <motion.div
                                        key={child.label}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                          delay: index * 0.06,
                                          duration: 0.25,
                                          ease: [0.22, 1, 0.36, 1],
                                        }}
                                      >
                                        <Link
                                          href={child.href}
                                          className="relative flex items-start gap-4 px-4 py-4 rounded-xl transition-all duration-250 group"
                                          role="menuitem"
                                          onMouseEnter={() =>
                                            setHoveredChild(child.label)
                                          }
                                          onMouseLeave={() =>
                                            setHoveredChild(null)
                                          }
                                          onClick={() =>
                                            setActiveDropdown(null)
                                          }
                                          style={{
                                            backgroundColor: isHovered
                                              ? `${accent}0a`
                                              : "transparent",
                                          }}
                                        >
                                          {/* Left accent bar */}
                                          <motion.div
                                            className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
                                            style={{
                                              backgroundColor: accent,
                                            }}
                                            initial={{
                                              scaleY: 0,
                                              opacity: 0,
                                            }}
                                            animate={{
                                              scaleY: isHovered ? 1 : 0,
                                              opacity: isHovered ? 1 : 0,
                                            }}
                                            transition={{ duration: 0.2 }}
                                          />

                                          {/* Icon container */}
                                          <motion.div
                                            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                                            animate={{
                                              backgroundColor: isHovered
                                                ? `${accent}15`
                                                : "rgba(255,255,255,0.03)",
                                              borderColor: isHovered
                                                ? `${accent}25`
                                                : "rgba(255,255,255,0.06)",
                                              scale: isHovered ? 1.05 : 1,
                                            }}
                                            transition={{ duration: 0.2 }}
                                            style={{
                                              border: "1px solid",
                                            }}
                                          >
                                            {IconComponent && (
                                              <IconComponent
                                                className="w-[18px] h-[18px]"
                                                style={{
                                                  color: isHovered
                                                    ? accent
                                                    : "var(--color-text-muted)",
                                                }}
                                              />
                                            )}
                                          </motion.div>

                                          {/* Content */}
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                              <span
                                                className="text-sm font-medium transition-colors duration-200"
                                                style={{
                                                  color: isHovered
                                                    ? "#ffffff"
                                                    : "var(--color-text-primary)",
                                                }}
                                              >
                                                {child.label}
                                              </span>
                                              <motion.div
                                                animate={{
                                                  opacity: isHovered ? 1 : 0,
                                                  x: isHovered ? 0 : -4,
                                                }}
                                                transition={{ duration: 0.2 }}
                                              >
                                                <ArrowRight
                                                  className="w-3.5 h-3.5"
                                                  style={{
                                                    color: isHovered
                                                      ? accent
                                                      : "var(--color-text-muted)",
                                                  }}
                                                />
                                              </motion.div>
                                            </div>
                                            <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                                              {child.description}
                                            </p>
                                            {duration && (
                                              <div className="flex items-center gap-1.5 mt-2">
                                                <Clock className="w-3 h-3 text-text-muted/50" />
                                                <span className="text-[11px] text-text-muted/60">
                                                  {duration}
                                                </span>
                                              </div>
                                            )}
                                          </div>
                                        </Link>
                                      </motion.div>
                                    );
                                  })}
                                </div>

                                {/* Dropdown footer with CTA */}
                                <div className="px-5 py-3.5 border-t border-white/[0.05] bg-white/[0.015]">
                                  <div className="flex items-center justify-between">
                                    <Link
                                      href="/programs"
                                      className="flex items-center gap-1.5 text-xs text-text-muted hover:text-cyan transition-colors group/link"
                                      onClick={() => setActiveDropdown(null)}
                                    >
                                      <span>View all programs</span>
                                      <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                                    </Link>
                                    <Link
                                      href="/apply"
                                      className="flex items-center gap-1.5 text-xs font-medium text-cyan hover:text-text-primary transition-colors"
                                      onClick={() => setActiveDropdown(null)}
                                    >
                                      Apply Now
                                      <ArrowRight className="w-3 h-3" />
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* ─── Desktop CTA ─── */}
              <div className="hidden lg:flex items-center gap-3">
                <MagneticElement strength={0.08}>
                  <div className="relative group">
                    {/* Animated glow */}
                    <motion.div
                      className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-500"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--color-blue-start), var(--color-cyan))",
                      }}
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <Button href="/apply" size="sm" className="relative">
                      Apply Now
                    </Button>
                  </div>
                </MagneticElement>
              </div>

              {/* ─── Mobile Toggle ─── */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden relative p-2 text-text-primary hover:bg-white/[0.05] rounded-xl transition-colors"
                aria-label={isMobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileOpen}
              >
                <HamburgerIcon isOpen={isMobileOpen} />
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* ─── Mobile Menu (Full-screen overlay) ─── */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-bg-primary/80 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              className="fixed inset-0 z-40 lg:hidden flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="dialog"
              aria-label="Mobile navigation menu"
            >
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-primary to-[#080b20]" />

              {/* Subtle pattern */}
              <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              <div className="relative flex flex-col items-center justify-center h-full gap-4 px-8 py-24">
                {/* Nav links */}
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                    transition={{
                      delay: i * 0.08,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="text-center w-full max-w-sm"
                  >
                    <Link
                      href={link.href}
                      onClick={() =>
                        !("children" in link) && setIsMobileOpen(false)
                      }
                      className="text-3xl font-heading font-bold text-text-primary hover:text-cyan transition-colors inline-block"
                    >
                      {link.label}
                    </Link>

                    {/* Sub-items for Programs */}
                    {"children" in link && (
                      <motion.div
                        className="mt-3 flex flex-col items-stretch gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                      >
                        {(link.children as unknown as NavChild[]).map(
                          (child, j) => {
                            const IconComponent =
                              ICON_MAP[child.icon] || null;
                            const accent = child.accent;
                            return (
                              <motion.div
                                key={child.label}
                                initial={{ opacity: 0, x: -16 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: 0.35 + j * 0.06,
                                  duration: 0.4,
                                }}
                              >
                                <Link
                                  href={child.href}
                                  onClick={() => setIsMobileOpen(false)}
                                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] active:scale-[0.98] transition-all"
                                >
                                  <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{
                                      backgroundColor: `${accent}12`,
                                      border: `1px solid ${accent}20`,
                                    }}
                                  >
                                    {IconComponent && (
                                      <IconComponent
                                        className="w-4.5 h-4.5"
                                        style={{ color: accent }}
                                      />
                                    )}
                                  </div>
                                  <div className="text-left flex-1">
                                    <div className="text-sm font-medium text-text-primary">
                                      {child.label}
                                    </div>
                                    <div className="text-xs text-text-muted mt-0.5">
                                      {child.description}
                                    </div>
                                  </div>
                                  <ArrowRight className="w-4 h-4 text-text-muted/40" />
                                </Link>
                              </motion.div>
                            );
                          }
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                ))}

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{
                    delay: 0.4,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mt-6 w-full max-w-sm"
                >
                  <Button
                    href="/apply"
                    size="lg"
                    className="w-full justify-center"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    Apply Now
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <div className="text-center mt-3">
                    <Link
                      href="/contact"
                      onClick={() => setIsMobileOpen(false)}
                      className="text-sm text-text-muted hover:text-cyan transition-colors"
                    >
                      Or book a free consultation
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
