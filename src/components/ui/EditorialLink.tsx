"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * EditorialLink — text link with SVG-draw underline on hover.
 * The underline uses CSS transform scaleX so it's GPU-accelerated.
 */

interface EditorialLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
  arrow?: boolean;
}

export function EditorialLink({
  href,
  children,
  external = false,
  className,
  arrow = true,
}: EditorialLinkProps) {
  const target = external ? "_blank" : undefined;
  const rel = external ? "noopener noreferrer" : undefined;

  const content = (
    <span className={cn("group inline-flex items-center gap-2", className)}>
      <span className="link-editorial relative">{children}</span>
      {arrow && (
        <span
          aria-hidden
          className="inline-block text-[var(--color-heritage-crimson)] transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:translate-x-1"
        >
          →
        </span>
      )}
    </span>
  );

  if (external) {
    return (
      <a href={href} target={target} rel={rel}>
        {content}
      </a>
    );
  }

  return <Link href={href}>{content}</Link>;
}
