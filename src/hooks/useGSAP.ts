"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Run a GSAP animation with automatic cleanup */
export function useGSAP(
  callback: (ctx: gsap.Context) => void,
  deps: React.DependencyList = [],
  scope?: React.RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      callback(ctx);
    }, scope?.current || undefined);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Create a ScrollTrigger animation */
export function useScrollTrigger(
  triggerRef: React.RefObject<HTMLElement | null>,
  animation: (el: HTMLElement) => gsap.core.Timeline | gsap.core.Tween,
  options?: ScrollTrigger.Vars
) {
  useEffect(() => {
    if (!triggerRef.current) return;

    const el = triggerRef.current;
    const tween = animation(el);

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      end: "bottom 15%",
      ...options,
      animation: tween,
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export { gsap, ScrollTrigger };
