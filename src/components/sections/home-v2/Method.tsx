"use client";

/**
 * Method — compact dark rhythm-break.
 * Three principles presented side-by-side in a single band instead of
 * three 90vh plates. Keeps the dark canvas and gold accent.
 */

const PRINCIPLES = [
  {
    num: "001",
    name: "Discretion",
    body: "We do not publish recipient names without consent. Your consideration is a private matter.",
  },
  {
    num: "002",
    name: "Specificity",
    body: "We do not recommend programmes as a category. We recommend a university, a faculty, and a particular fit.",
  },
  {
    num: "003",
    name: "Shepherding",
    body: "We do not hand over an application and disappear. We remain present — through review, correspondence, and conferment.",
  },
];

export function Method() {
  return (
    <section className="relative bg-[var(--color-ink-primary)] text-[var(--color-canvas-ivory)] border-t border-[var(--color-ink-primary)]">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-14 py-20 lg:py-24">
        {/* Header band */}
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12 pb-8 border-b border-[var(--color-ink-muted)]/30">
          <div>
            <span className="type-mono-label text-[var(--color-signal-gold)]">
              05 / 08 · METHOD
            </span>
            <h2
              className="type-display mt-6 leading-[0.95]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
            >
              Three things we refuse to compromise.
            </h2>
          </div>
          <p className="type-display-italic text-[var(--color-ink-whisper)] text-[16px] max-w-[28ch]">
            Principles worth stating plainly.
          </p>
        </div>

        {/* Three principles in a single band */}
        <ul className="grid md:grid-cols-3 gap-0 md:border-l border-[var(--color-ink-muted)]/30">
          {PRINCIPLES.map((p, i) => (
            <li
              key={p.num}
              className={`py-8 md:py-6 md:px-6 md:border-r border-[var(--color-ink-muted)]/30 ${
                i > 0 ? "border-t md:border-t-0 border-[var(--color-ink-muted)]/30" : ""
              }`}
            >
              <div className="flex items-start gap-5 mb-6">
                <span
                  className="type-display text-[var(--color-signal-gold)] leading-none"
                  style={{ fontSize: "clamp(3rem, 5vw, 4rem)" }}
                >
                  {p.num}
                </span>
              </div>
              <h3
                className="type-display leading-[0.95]"
                style={{ fontSize: "clamp(2rem, 3.2vw, 2.75rem)" }}
              >
                {p.name}.
              </h3>
              <p
                className="type-display-italic mt-4 text-[var(--color-ink-whisper)] text-[15.5px] leading-[1.45]"
                dangerouslySetInnerHTML={{ __html: p.body }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
