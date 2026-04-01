"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
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
  Route,
  HelpCircle,
} from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { MagneticElement } from "@/components/ui/MagneticElement";
import {
  navbarDropdown,
  mobileMenuOverlay,
  mobileMenuItem,
  EASE,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

type IconProps = { className?: string; style?: React.CSSProperties };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, React.ComponentType<IconProps>> = {
  Award: Award as any,
  Briefcase: Briefcase as any,
  GraduationCap: GraduationCap as any,
  Sparkles: Sparkles as any,
  Route: Route as any,
  HelpCircle: HelpCircle as any,
};

type NavChild = {
  label: string;
  href: string;
  description: string;
  icon: string;
  accent: string;
  duration?: string;
};

/* ─── Animated hamburger icon ─── */
function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="w-6 h-6 relative flex flex-col items-center justify-center">
      <motion.span
        className="absolute w-5 h-[1.5px] bg-slate-900 rounded-full"
        animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 0 : -4 }}
        transition={{ duration: 0.3, ease: EASE.default }}
      />
      <motion.span
        className="absolute w-5 h-[1.5px] bg-slate-900 rounded-full"
        animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute w-5 h-[1.5px] bg-slate-900 rounded-full"
        animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? 0 : 4 }}
        transition={{ duration: 0.3, ease: EASE.default }}
      />
    </div>
  );
}

/* ─── Desktop nav link with animated underline ─── */
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
        color:
          isHovered || isActive
            ? "#0f172a"
            : "#64748b",
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
          transition={{ duration: 0.25, ease: EASE.default }}
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.div>
      )}
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
        transition={{ duration: 0.25, ease: EASE.default }}
      />
    </Link>
  );
}

/* ─── Dropdown menu item ─── */
function DropdownItem({
  child,
  index,
  onClose,
}: {
  child: NavChild;
  index: number;
  onClose: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = ICON_MAP[child.icon] || null;
  const accent = child.accent;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.25, ease: EASE.default }}
    >
      <Link
        href={child.href}
        className="relative flex items-start gap-4 px-4 py-4 rounded-xl transition-all duration-250 group"
        role="menuitem"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClose}
        style={{ backgroundColor: isHovered ? `${accent}0a` : "transparent" }}
      >
        {/* Left accent bar */}
        <motion.div
          className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
          style={{ backgroundColor: accent }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{
            scaleY: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Icon */}
        <motion.div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          animate={{
            backgroundColor: isHovered ? `${accent}12` : "#f8fafc",
            borderColor: isHovered ? `${accent}30` : "#e2e8f0",
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.2 }}
          style={{ border: "1px solid" }}
        >
          {IconComponent && (
            <IconComponent
              className="w-[18px] h-[18px]"
              style={{
                color: isHovered ? accent : "var(--color-text-muted)",
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
                color: isHovered ? "#0f172a" : "#334155",
              }}
            >
              {child.label}
            </span>
            <motion.div
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -4 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight
                className="w-3.5 h-3.5"
                style={{
                  color: isHovered ? accent : "var(--color-text-muted)",
                }}
              />
            </motion.div>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
            {child.description}
          </p>
          {child.duration && (
            <div className="flex items-center gap-1.5 mt-2">
              <Clock className="w-3 h-3 text-slate-400" />
              <span className="text-[11px] text-slate-400">
                {child.duration}
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Mega dropdown panel ─── */
function MegaDropdown({
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
      variants={navbarDropdown}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn(
        "absolute top-full left-1/2 -translate-x-1/2 pt-4",
        isPrograms ? "w-[460px]" : "w-[380px]"
      )}
      role="menu"
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.98)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        {/* Header */}
        <div className="relative px-5 pt-5 pb-3">
          <div
            className="absolute top-0 left-5 right-5 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(58,130,255,0.2), transparent)",
            }}
          />
          <div className="flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-blue-start/50" />
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
              {isPrograms ? "Doctoral Programs" : link.label}
            </p>
          </div>
        </div>

        {/* Items */}
        <div className="px-2 pb-2">
          {children.map((child, index) => (
            <DropdownItem
              key={child.label}
              child={child}
              index={index}
              onClose={onClose}
            />
          ))}
        </div>

        {/* Footer CTA */}
        {isPrograms && (
          <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <Link
                href="/programs"
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-start transition-colors group/link"
                onClick={onClose}
              >
                <span>View all programs</span>
                <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/apply"
                className="flex items-center gap-1.5 text-xs font-medium text-blue-start hover:text-blue-mid transition-colors"
                onClick={onClose}
              >
                Apply Now
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   NAVBAR — Premium animated navigation
   ════════════════════════════════════════════ */
export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastScrollY = useRef(0);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { scrollY } = useScroll();

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

  const handleDropdownEnter = useCallback((label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(label);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, label: string, hasChildren: boolean) => {
      if (!hasChildren) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setActiveDropdown((prev) => (prev === label ? null : label));
      }
      if (e.key === "Escape") {
        setActiveDropdown(null);
      }
    },
    []
  );

  const closeDropdown = useCallback(() => setActiveDropdown(null), []);
  const closeMobile = useCallback(() => setIsMobileOpen(false), []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: EASE.default }}
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
              ? "rgba(255, 255, 255, 0.85)"
              : "transparent",
            backdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "none",
            WebkitBackdropFilter: isScrolled
              ? "blur(20px) saturate(180%)"
              : "none",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: isScrolled
              ? "rgba(0,0,0,0.06)"
              : "transparent",
            boxShadow: isScrolled
              ? "0 4px 24px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)"
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
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <div className="absolute inset-0 rounded-full bg-blue-start/0 group-hover:bg-blue-start/10 blur-xl transition-all duration-500" />
                    <Image
                      src="/images/techversity-logo.jpeg"
                      alt="Techversity.ai"
                      width={40}
                      height={40}
                      className="relative w-10 h-10 rounded-full object-cover ring-2 ring-slate-200 group-hover:ring-blue-start/30 transition-all duration-500"
                      priority
                    />
                  </motion.div>
                </MagneticElement>
                <motion.span
                  className="font-heading text-xl font-bold text-slate-900 hidden sm:block"
                  animate={{
                    opacity: isScrolled ? 0 : 1,
                    width: isScrolled ? 0 : "auto",
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                >
                  TECHVERSITY
                  <span className="text-blue-start">.AI</span>
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

                      {/* Mega Dropdown */}
                      {hasChildren && (
                        <AnimatePresence>
                          {activeDropdown === link.label && (
                            <MegaDropdown
                              link={link}
                              onClose={closeDropdown}
                            />
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
                    <motion.div
                      className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-500"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--color-blue-start), var(--color-cyan))",
                      }}
                      animate={{ scale: [1, 1.05, 1] }}
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
                className="lg:hidden relative p-2 text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
                aria-label={isMobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileOpen}
              >
                <HamburgerIcon isOpen={isMobileOpen} />
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* ─── Mobile Menu ─── */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-white/80 backdrop-blur-sm lg:hidden"
              variants={mobileMenuOverlay}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={closeMobile}
            />

            <motion.div
              className="fixed inset-0 z-40 lg:hidden flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="dialog"
              aria-label="Mobile navigation menu"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-slate-50" />
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              <div className="relative flex flex-col items-center justify-center h-full gap-4 px-8 py-24">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.label}
                    variants={mobileMenuItem(i)}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-center w-full max-w-sm"
                  >
                    <Link
                      href={link.href}
                      onClick={() =>
                        !("children" in link) && closeMobile()
                      }
                      className="text-3xl font-heading font-bold text-slate-900 hover:text-blue-start transition-colors inline-block"
                    >
                      {link.label}
                    </Link>

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
                                  onClick={closeMobile}
                                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 active:scale-[0.98] transition-all"
                                >
                                  <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
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
                                    <div className="text-sm font-medium text-slate-900">
                                      {child.label}
                                    </div>
                                    <div className="text-xs text-slate-500 mt-0.5">
                                      {child.description}
                                    </div>
                                  </div>
                                  <ArrowRight className="w-4 h-4 text-slate-400" />
                                </Link>
                              </motion.div>
                            );
                          }
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                ))}

                {/* CTA */}
                <motion.div
                  variants={mobileMenuItem(NAV_LINKS.length)}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="mt-6 w-full max-w-sm"
                >
                  <Button
                    href="/apply"
                    size="lg"
                    className="w-full justify-center"
                    onClick={closeMobile}
                  >
                    Apply Now
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <div className="text-center mt-3">
                    <Link
                      href="/contact"
                      onClick={closeMobile}
                      className="text-sm text-slate-500 hover:text-blue-start transition-colors"
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
