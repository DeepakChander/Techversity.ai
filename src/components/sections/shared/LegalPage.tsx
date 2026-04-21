"use client";

import { Fragment } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IndexNumeral } from "@/components/ui/IndexNumeral";
import { EditorialLink } from "@/components/ui/EditorialLink";
import { type LegalPageContent, formatInline } from "@/lib/legal-data";

/**
 * LegalPage — editorial long-read template.
 * No motion. Reader focus is the design.
 * Reference: Pentagram's Tablet Magazine microsite.
 */

interface LegalPageProps {
  content: LegalPageContent;
}

const PEERS: { slug: string; label: string }[] = [
  { slug: "privacy", label: "Privacy" },
  { slug: "terms", label: "Terms" },
  { slug: "refund", label: "Refunds" },
  { slug: "cookies", label: "Cookies" },
];

export function LegalPage({ content }: LegalPageProps) {
  return (
    <>
      <div className="main-content">
        <Navbar />
        <main className="bg-[var(--color-canvas-ivory)]">
          {/* ─── Header ─── */}
          <section className="border-b border-[var(--color-canvas-paper-edge)]">
            <div className="max-w-[1200px] mx-auto px-8 lg:px-14 pt-40 lg:pt-48 pb-20 lg:pb-28">
              <IndexNumeral index={content.kicker} />
              <h1
                className="type-display text-[var(--color-ink-primary)] mt-10 leading-[0.95] max-w-[22ch]"
                style={{ fontSize: "clamp(2.75rem, 6.5vw, 5.75rem)" }}
              >
                {content.title}
              </h1>
              <p className="type-display-italic text-[var(--color-ink-muted)] mt-8 text-[19px] max-w-[52ch]">
                {content.dek}
              </p>
              <div className="mt-14 pt-8 border-t border-[var(--color-canvas-paper-edge)] flex items-center justify-between flex-wrap gap-4">
                <span className="type-mono-meta text-[var(--color-ink-muted)]">
                  LAST UPDATED · {content.updated.toUpperCase()}
                </span>
                <span className="type-mono-meta text-[var(--color-ink-whisper)]">
                  {content.sections.length.toString().padStart(2, "0")} SECTIONS
                </span>
              </div>
            </div>
          </section>

          {/* ─── Body — single 680px column ─── */}
          <section className="relative">
            <div className="max-w-[1200px] mx-auto px-8 lg:px-14 py-24 lg:py-32">
              <div className="max-w-[680px] mx-auto lg:mx-0 lg:ml-[max(0,calc(50%-340px))]">
                {content.sections.map((section, i) => (
                  <div
                    key={i}
                    className="mb-16 last:mb-0 pb-16 last:pb-0 border-b last:border-b-0 border-[var(--color-canvas-paper-edge)]"
                  >
                    {section.title && (
                      <div className="flex items-baseline gap-5 mb-7">
                        <span className="type-mono-label text-[var(--color-heritage-crimson)]">
                          {(i + 1).toString().padStart(2, "0")}
                        </span>
                        <h2
                          className="type-display text-[var(--color-ink-primary)]"
                          style={{
                            fontSize: "clamp(1.625rem, 2.6vw, 2.125rem)",
                            lineHeight: 1.15,
                          }}
                        >
                          {section.title}
                        </h2>
                      </div>
                    )}
                    <div className="flex flex-col gap-6">
                      {section.blocks.map((block, j) =>
                        block.kind === "p" ? (
                          <p
                            key={j}
                            className="type-ui text-[var(--color-ink-primary)] text-[17px] leading-[1.65]"
                          >
                            <Inline text={block.text ?? ""} />
                          </p>
                        ) : (
                          <ul key={j} className="flex flex-col gap-4 pl-0">
                            {(block.items ?? []).map((item, k) => (
                              <li
                                key={k}
                                className="type-ui text-[var(--color-ink-primary)] text-[17px] leading-[1.65] flex gap-4"
                              >
                                <span
                                  aria-hidden
                                  className="type-mono-meta text-[var(--color-ink-whisper)] pt-[0.45em]"
                                >
                                  —
                                </span>
                                <span>
                                  <Inline text={item} />
                                </span>
                              </li>
                            ))}
                          </ul>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── Peer navigation ─── */}
          <section className="border-t border-[var(--color-canvas-paper-edge)] bg-[var(--color-canvas-bone)]">
            <nav
              aria-label="Other policies"
              className="max-w-[1200px] mx-auto px-8 lg:px-14 py-14 lg:py-20"
            >
              <div className="flex items-center justify-between gap-6 flex-wrap mb-10">
                <span className="type-mono-label text-[var(--color-heritage-crimson)]">
                  Other policies
                </span>
                <EditorialLink href="/contact">
                  Write to the firm
                </EditorialLink>
              </div>
              <ul className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {PEERS.map((peer) => {
                  const isCurrent = peer.slug === content.slug;
                  return (
                    <li key={peer.slug}>
                      {isCurrent ? (
                        <span className="type-display text-[var(--color-ink-whisper)] select-none" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
                          {peer.label}.
                        </span>
                      ) : (
                        <Link
                          href={`/${peer.slug}`}
                          className="type-display text-[var(--color-ink-primary)] hover:text-[var(--color-heritage-crimson)] transition-colors duration-500 ease-[var(--ease-editorial)]"
                          style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
                        >
                          {peer.label}.
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

/* ─── Inline formatter — renders **bold** and [link](href) ─── */
function Inline({ text }: { text: string }) {
  const tokens = formatInline(text);
  return (
    <>
      {tokens.map((tok, i) => {
        if (typeof tok === "string") return <Fragment key={i}>{tok}</Fragment>;
        if (tok.type === "strong") {
          return (
            <strong
              key={i}
              className="font-medium text-[var(--color-ink-primary)]"
            >
              {tok.label}
            </strong>
          );
        }
        if (tok.type === "link") {
          if (tok.href.startsWith("mailto:") || tok.href.startsWith("http")) {
            return (
              <a
                key={i}
                href={tok.href}
                className="link-editorial text-[var(--color-heritage-crimson)]"
                target={tok.href.startsWith("http") ? "_blank" : undefined}
                rel={tok.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {tok.label}
              </a>
            );
          }
          return (
            <Link
              key={i}
              href={tok.href}
              className="link-editorial text-[var(--color-heritage-crimson)]"
            >
              {tok.label}
            </Link>
          );
        }
        return null;
      })}
    </>
  );
}
