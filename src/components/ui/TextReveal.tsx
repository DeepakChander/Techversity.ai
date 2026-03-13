"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  type?: "words" | "chars" | "lines";
  stagger?: number;
  duration?: number;
  delay?: number;
  scrollTrigger?: boolean;
}

export function TextReveal({
  children,
  as: Tag = "h2",
  className = "",
  type = "words",
  stagger = 0.05,
  duration = 0.8,
  delay = 0,
  scrollTrigger = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;
    const text = children;
    let elements: string[] = [];

    if (type === "chars") {
      elements = text.split("");
    } else if (type === "words") {
      elements = text.split(" ");
    } else {
      elements = text.split("\n");
    }

    // Build HTML with spans
    el.innerHTML = elements
      .map((item, i) => {
        const content = type === "words" && i < elements.length - 1 ? item + "&nbsp;" : item;
        return `<span style="display:inline-block;overflow:hidden;vertical-align:top;"><span class="reveal-item" style="display:inline-block;transform:translateY(120%)">${content}</span></span>`;
      })
      .join("");

    const items = el.querySelectorAll(".reveal-item");

    const tl = gsap.timeline({
      delay,
      ...(scrollTrigger
        ? {
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }
        : {}),
    });

    tl.to(items, {
      y: 0,
      duration,
      stagger,
      ease: "power3.out",
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [children, type, stagger, duration, delay, scrollTrigger]);

  return <Tag ref={containerRef as React.RefObject<HTMLHeadingElement>} className={className}>{children}</Tag>;
}
