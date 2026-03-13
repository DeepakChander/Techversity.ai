"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getLenis } from "@/hooks/useLenis";

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Reset Lenis scroll position
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    // Fallback: also reset native scroll
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
