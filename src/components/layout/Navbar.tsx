"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { MagneticElement } from "@/components/ui/MagneticElement";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 50);
      setHidden(currentY > lastScrollY && currentY > 300);
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when mobile menu is open
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

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <nav
          className={`mx-auto transition-all duration-500 ${
            isScrolled
              ? "mt-3 mx-4 lg:mx-8 rounded-2xl bg-bg-primary/60 backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <motion.div
                  className="relative w-10 h-10 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <Image
                    src="/images/techversity-logo.jpeg"
                    alt="Techversity.ai"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                    priority
                  />
                </motion.div>
                <motion.span
                  className="font-heading text-xl font-bold text-text-primary hidden sm:block"
                  animate={{
                    opacity: isScrolled ? 0 : 1,
                    width: isScrolled ? 0 : "auto",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  TECHVERSITY
                  <span className="text-cyan">.AI</span>
                </motion.span>
              </Link>

              {/* Desktop Nav */}
              <div className="hidden lg:flex items-center gap-1">
                {NAV_LINKS.map((link) => (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() =>
                      "children" in link
                        ? setActiveDropdown(link.label)
                        : undefined
                    }
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <MagneticElement strength={0.15}>
                      <Link
                        href={link.href}
                        className="flex items-center gap-1 px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-white/[0.05]"
                      >
                        {link.label}
                        {"children" in link && (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </Link>
                    </MagneticElement>

                    {/* Dropdown - Bento style mega menu */}
                    {"children" in link && (
                      <AnimatePresence>
                        {activeDropdown === link.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-80 rounded-xl bg-bg-surface/90 backdrop-blur-2xl border border-white/[0.08] shadow-2xl overflow-hidden"
                          >
                            <div className="p-2">
                              {link.children.map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  className="block px-4 py-3 rounded-lg hover:bg-white/[0.05] transition-colors group"
                                >
                                  <div className="text-sm font-medium text-text-primary group-hover:text-cyan transition-colors">
                                    {child.label}
                                  </div>
                                  <div className="text-xs text-text-muted mt-0.5">
                                    {child.description}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ))}
              </div>

              {/* Desktop CTA with glow pulse */}
              <div className="hidden lg:flex items-center gap-3">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-start to-cyan rounded-xl opacity-30 blur-sm animate-pulse" />
                  <Button href="/apply" size="sm" className="relative">
                    Apply Now
                  </Button>
                </div>
              </div>

              {/* Mobile Toggle */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden p-2 text-text-primary hover:bg-white/[0.05] rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-bg-primary/95 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="text-center"
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="text-3xl font-heading font-bold text-text-primary hover:text-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                  {"children" in link && (
                    <div className="mt-3 flex flex-col items-center gap-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setIsMobileOpen(false)}
                          className="text-base text-text-muted hover:text-text-primary transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-4"
              >
                <Button
                  href="/apply"
                  size="lg"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Apply Now
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
