"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/**
 * EditorialImage — next/image wrapped with tasteful scroll-driven motion.
 *
 * motion="mask"     — horizontal clip-path reveal on intersection (0.9s)
 * motion="kenburns" — slow scroll-scrubbed zoom from 1 → 1.08
 * motion="parallax" — image translates at 0.85x scroll speed
 * motion="fade"     — opacity+y rise on intersection
 * motion="none"     — static
 *
 * All motion respects prefers-reduced-motion.
 */

export type EditorialMotion = "mask" | "kenburns" | "parallax" | "fade" | "none";

interface EditorialImageProps {
  src: string;
  alt: string;
  /** Aspect ratio expressed as width/height (e.g. 16/9). Use 0 to let Next.js read intrinsic. */
  aspect?: number;
  motion?: EditorialMotion;
  /** Priority load (above-the-fold heroes) */
  priority?: boolean;
  className?: string;
  /** Class for the wrapping <div> — sizing, positioning */
  wrapperClassName?: string;
  /** Optional overlay (e.g. crimson tint, darkening gradient) on top of the image */
  overlay?: React.ReactNode;
  /** sizes attribute for next/image responsive handling */
  sizes?: string;
}

export function EditorialImage({
  src,
  alt,
  aspect,
  motion = "mask",
  priority = false,
  className,
  wrapperClassName,
  overlay,
  sizes = "100vw",
}: EditorialImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = wrapRef.current;
      if (!el) return;
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced || motion === "none") return;

      const img = el.querySelector<HTMLElement>("[data-editorial-img]");
      if (!img) return;

      if (motion === "mask") {
        gsap.set(img, { clipPath: "inset(0 100% 0 0)" });
        gsap.to(img, {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      } else if (motion === "kenburns") {
        gsap.fromTo(
          img,
          { scale: 1.0 },
          {
            scale: 1.08,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      } else if (motion === "parallax") {
        gsap.fromTo(
          img,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      } else if (motion === "fade") {
        gsap.fromTo(
          img,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: wrapRef, dependencies: [motion] }
  );

  const aspectStyle = aspect ? { aspectRatio: String(aspect) } : undefined;

  return (
    <div
      ref={wrapRef}
      className={cn("relative overflow-hidden", wrapperClassName)}
      style={aspectStyle}
    >
      <div data-editorial-img className="absolute inset-0 w-full h-full will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn("object-cover", className)}
        />
      </div>
      {overlay}
    </div>
  );
}
