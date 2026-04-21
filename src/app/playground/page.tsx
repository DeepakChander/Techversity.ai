"use client";

import { ButtonV2 } from "@/components/ui/ButtonV2";
import { IndexNumeral } from "@/components/ui/IndexNumeral";
import { SectionHeadingV2 } from "@/components/ui/SectionHeadingV2";
import { EditorialLink } from "@/components/ui/EditorialLink";
import { CardV2 } from "@/components/ui/CardV2";
import { TextRevealV2 } from "@/components/ui/TextRevealV2";
import { MagneticV2 } from "@/components/ui/MagneticV2";
import { ScrollPin } from "@/components/ui/ScrollPin";

export default function Playground() {
  return (
    <main
      className="bg-[var(--color-canvas-ivory)] text-[var(--color-ink-primary)] min-h-screen"
      style={{ fontFamily: "var(--font-sans-2026)" }}
    >
      {/* ─── Page header ─── */}
      <header className="px-10 lg:px-20 pt-24 pb-16 border-b border-[var(--color-canvas-paper-edge)]">
        <IndexNumeral index="00" label="Design System · 2026" total="07" />
        <h1 className="type-display mt-6 text-[clamp(3rem,7vw,6rem)]">
          The playground.
        </h1>
        <p className="type-display-italic text-[var(--color-ink-muted)] mt-4 text-[1.25rem] max-w-[50ch]">
          Every primitive of the redesign, rendered in isolation for review.
        </p>
      </header>

      {/* ─── Type system ─── */}
      <Section index="01" label="Type" title="Three registers.">
        <div className="grid lg:grid-cols-3 gap-14">
          <TypeSpec
            name="Display serif — Fraunces"
            usage="H1, chapter plates, program titles"
            example="The record a life's work earns."
            className="type-display text-[2.5rem]"
          />
          <TypeSpec
            name="UI sans — Inter"
            usage="Nav, body, CTAs, card copy"
            example="Techversity introduces accomplished professionals to the universities that recognise them."
            className="type-ui text-[1.0625rem]"
          />
          <TypeSpec
            name="Mono — JetBrains Mono"
            usage="Indexes, metadata, timestamps"
            example="PROGRAM 001 · HONORARY DOCTORATE"
            className="type-mono-meta"
          />
        </div>
      </Section>

      {/* ─── Color system ─── */}
      <Section index="02" label="Colour" title="European editorial.">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <Swatch name="canvas-ivory" hex="#F5F2EC" role="Default background" />
          <Swatch name="canvas-bone" hex="#FAF8F4" role="Secondary surface" />
          <Swatch name="ink-primary" hex="#1A1816" role="Primary text" dark />
          <Swatch name="ink-muted" hex="#5A554E" role="Secondary text" dark />
          <Swatch name="ink-whisper" hex="#A39E94" role="Tertiary text" />
          <Swatch name="heritage-navy" hex="#1E2A47" role="Brand primary" dark />
          <Swatch name="heritage-crimson" hex="#8C2A2A" role="Editorial accent" dark />
          <Swatch name="signal-gold" hex="#C8A96A" role="Honorary moment" />
          <Swatch name="paper-edge" hex="#EDE7DB" role="Borders & dividers" />
        </div>
      </Section>

      {/* ─── Buttons ─── */}
      <Section index="03" label="Buttons" title="Invitation, never urgency.">
        <div className="flex flex-wrap gap-6 items-center">
          <ButtonV2 variant="heritage" showArrow>
            Begin the conversation
          </ButtonV2>
          <ButtonV2 variant="ghost" showArrow>
            Explore programmes
          </ButtonV2>
          <ButtonV2 variant="quiet" showArrow>
            Read more
          </ButtonV2>
        </div>
        <p className="type-mono-meta text-[var(--color-ink-muted)] mt-8">
          Hover — magnetic pull within a small radius. Try it.
        </p>
      </Section>

      {/* ─── Links ─── */}
      <Section index="04" label="Links" title="The underline draws.">
        <div className="flex flex-col gap-5 text-[1.25rem] type-ui">
          <EditorialLink href="#">Explore the programme network</EditorialLink>
          <EditorialLink href="#" arrow={false}>
            An inline quiet link without arrow
          </EditorialLink>
        </div>
      </Section>

      {/* ─── Cards ─── */}
      <Section index="05" label="Cards" title="Quiet fill, paper edge.">
        <div className="grid md:grid-cols-3 gap-6">
          {["Qualify", "Shortlist", "Introduce"].map((v, i) => (
            <CardV2 key={v} interactive>
              <IndexNumeral index={i + 1} />
              <h3 className="type-display text-[2.5rem] mt-5">{v}</h3>
              <p className="type-ui text-[var(--color-ink-muted)] mt-4 text-[15px]">
                A placeholder gloss for the principle. Body copy lives here.
              </p>
            </CardV2>
          ))}
        </div>
      </Section>

      {/* ─── TextRevealV2 ─── */}
      <Section index="06" label="Text reveal" title="Words rise from beneath.">
        <TextRevealV2
          as="p"
          className="type-display text-[clamp(2rem,4.5vw,3.75rem)] max-w-[28ch]"
        >
          Scroll this into view. Each word lifts on a 60-millisecond stagger.
        </TextRevealV2>
      </Section>

      {/* ─── Magnetic ─── */}
      <Section index="07" label="Magnetic" title="Weighted hover.">
        <MagneticV2 strength={0.5}>
          <span className="type-display text-[var(--color-heritage-navy)] text-[4rem]">
            Techversity
          </span>
        </MagneticV2>
      </Section>

      {/* ─── ScrollPin ─── */}
      <Section index="08" label="Pin" title="Sticky-stack demo.">
        <ScrollPin distance={1.5}>
          <div className="h-screen flex items-center justify-center bg-[var(--color-canvas-bone)] border border-[var(--color-canvas-paper-edge)]">
            <div className="text-center">
              <IndexNumeral index="01" label="The record" />
              <p className="type-display text-[clamp(2.5rem,5vw,4rem)] mt-6">
                This panel pins for 1.5 viewports.
              </p>
            </div>
          </div>
        </ScrollPin>
      </Section>

      <footer className="px-10 lg:px-20 py-16 border-t border-[var(--color-canvas-paper-edge)]">
        <IndexNumeral index="/" label="End of playground" />
        <p className="type-display-italic text-[var(--color-ink-muted)] mt-4 text-[1.25rem]">
          Phase 0 foundations — ready for Phase 1.
        </p>
      </footer>
    </main>
  );
}

function Section({
  index,
  label,
  title,
  children,
}: {
  index: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-10 lg:px-20 py-24 border-b border-[var(--color-canvas-paper-edge)]">
      <SectionHeadingV2
        index={index}
        indexLabel={label}
        title={title}
        className="mb-14"
      />
      {children}
    </section>
  );
}

function TypeSpec({
  name,
  usage,
  example,
  className,
}: {
  name: string;
  usage: string;
  example: string;
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="type-mono-label text-[var(--color-heritage-crimson)]">{name}</div>
        <div className="type-mono-meta text-[var(--color-ink-whisper)] mt-1">{usage}</div>
      </div>
      <div className={className}>{example}</div>
    </div>
  );
}

function Swatch({
  name,
  hex,
  role,
  dark = false,
}: {
  name: string;
  hex: string;
  role: string;
  dark?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="aspect-square border border-[var(--color-canvas-paper-edge)]"
        style={{ backgroundColor: hex }}
      />
      <div className={dark ? "text-[var(--color-ink-primary)]" : "text-[var(--color-ink-primary)]"}>
        <div className="type-mono-label">{name}</div>
        <div className="type-mono-meta text-[var(--color-ink-muted)] mt-1">{hex}</div>
        <div className="text-[13px] mt-0.5 text-[var(--color-ink-muted)]">{role}</div>
      </div>
    </div>
  );
}
