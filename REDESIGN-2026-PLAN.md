# Techversity.ai — 2026 Redesign Implementation Plan

**Status:** Draft — awaiting sign-off before Phase 0 kick-off
**Last updated:** 2026-04-21
**Author:** Codified from 4-stream research pass (trend signal, tech stack, education competitive set, 40+ premium references)

---

## 0. The north star

### What we're building toward

A doctoral/executive-education advisory site that reads as **70% institutional, 30% modern** — closer to J.P. Morgan Private Bank or Brunswick Group than to Reforge or Maven, but with contemporary page-craft (scroll-driven WebGL moments, editorial type pairings, Lenis-smooth scroll, View Transitions between routes).

The audience is 40+, accomplished, and suspicious of anything that smells of hustle. Every design decision defaults toward **restraint, gravitas, and specificity** over decoration.

### The opportunity (and why it's big)

Techversity's *direct* competitors — Sudaco, OOE, Chartered Management Institute — are all low-tier WordPress-template sites. The entire category is visually under-designed. Simply reaching "looks serious" puts Techversity in perceived parity with tier-1 business schools, not with the advisory-firm peers it currently reads alongside.

### Aesthetic position

**Anchor lane:** Institutional-luxury (Montfort, PrimeAsia Leather, SUTÉRA)
**Spine:** Editorial (Pentagram Tablet, Ravi Klaassens, Jennifer Heintz)
**"Wow" moment:** ONE immersive-3D anchor on the Hero (Cartier Watches & Wonders, Clay Boan, Fluid Glass)
**Differentiator sections:** Bold-expressive where we break rhythm intentionally (Lando Norris, Terminal Industries)
**One wild card:** Used once for the "About / accreditation journey" chapter break (Obsidian Assembly, Blue Desert)

### Hard rules — what this redesign REFUSES to ship

- No glassmorphism. No aurora / gradient mesh blobs. No frosted cards.
- No dark-first default (dark mode becomes a *toggle*, not the baseline).
- No muted-autoplay stock video in hero.
- No decorative parallax blobs / floating shapes.
- No "bento grid" homepage (category cliché).
- No generic custom cursor dot.
- No emoji-in-nav or playful-wink copy anywhere serious.
- No default Inter/Satoshi pastel SaaS template tone.
- No "Apply Now" urgency red button — CTAs *invite*, not urge.

---

## 1. Tech stack — the 2026 baseline

All decisions below are grounded in the research. Versions assume current stable as of April 2026.

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15** App Router | Already in use — keep |
| Styling | **Tailwind v4** (upgrade) | Rust/Oxide engine is 3.5–5× faster; `@theme` CSS-native config; first-class `@container`. This redesign is the right moment to migrate. |
| Component primitives | **shadcn/ui v4** on Radix | Design-system-as-source. Sonner for toasts, cmdk if we add a command menu. |
| Declarative animation | **Motion** (`motion/react` — formerly Framer Motion) | React component transitions, layout, enter/exit. |
| Scroll choreography | **GSAP + ScrollTrigger + SplitText** via **`@gsap/react`** (`useGSAP`) | Webflow acquisition made the entire club MIT-free. This is the single biggest upgrade from the current Framer-Motion-only stack — scrubbed timelines, pinning, and SplitText effects the existing stack cannot do cleanly. |
| Smooth scroll | **Lenis** (darkroom.engineering) | Wins on every axis over Locomotive. Sync to GSAP ticker. |
| Perf hooks | **Hamo** (darkroom.engineering) | `useRect`, `useWindowSize`, `useIntersectionObserver` — pairs with Lenis. |
| 3D (isolated moments only) | **React Three Fiber + Drei** | Single-canvas pattern shared across sections (Clay Boan model). Lazy-loaded via `next/dynamic({ ssr: false })`. |
| Fonts | **`next/font`** with variable fonts via CSS variable mode | Self-hosted, privacy-safe, no FOUT/CLS, static-export compatible. |
| Images | **`next-image-export-optimizer`** | Works with `output: 'export'` on Hostinger. Emits AVIF/WebP with responsive srcsets at build time. |
| Route transitions | **View Transitions API** (Next 15 `unstable_ViewTransition`) as progressive enhancement | Cross-document transitions shipped in Chromium/Safari. Graceful degrade for Firefox. |
| CSS-native effects | Scroll-driven animations + container queries | Free perf wins. `@supports` fallbacks. |
| Skipped | Locomotive, Spline, Theatre.js, Barba, React Spring | See research — all redundant or replaced. |

**GSAP + Lenis sync snippet** (to live in a root client component):
```ts
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```

---

## 2. Design system — the "publication-grade" foundation

This is the most important part of the plan. Every phase downstream references this system by name. If the system is right, every page snaps into place.

### 2.1 Type system — three typefaces, three registers

Based on what actually ships on current Awwwards winners, and the rule "serif display + neo-grotesque body + mono accent":

| Register | Typeface | Role |
|---|---|---|
| **Display serif** | **Editorial New** (Pangram Pangram) — or Fraunces Variable (free alternative) | Hero H1s, chapter plates, program titles. Set at 96–180px, -0.02em tracking, 0.9 line-height. |
| **UI sans** | **ABC Diatype** (Dinamo) — or Inter Variable (free alternative) | Nav, body, UI labels, CTAs, card copy. Set at 14–18px with generous 1.6 line-height for readability. |
| **Mono accent** | **JetBrains Mono** or **GT America Mono** | Section indexes (00 / 01 / 02), metadata rows (duration · format · location), timestamps, legal footer. Always uppercase, 11–13px, tracked +0.08em. |

**Rule:** Every headline is a serif. Every UI element is a sans. Every label / index / meta / timestamp is mono. No exceptions — this is the "publication voice" the user asked for.

**License note:** Premium faces (Editorial New, Diatype) ≈ $250–450 one-time per family. If budget blocks, Fraunces Variable + Inter Variable + JetBrains Mono is an acceptable free stack that still reads editorial.

### 2.2 Color system — "European Editorial" palette

Research converged on cream/bone + single heritage accent. Recommendation:

| Token | Hex | Use |
|---|---|---|
| `canvas-ivory` | `#F5F2EC` | Default background (everything) |
| `canvas-bone` | `#FAF8F4` | Secondary surfaces, card fills |
| `ink-primary` | `#1A1816` | All primary text (warm black, never pure) |
| `ink-muted` | `#5A554E` | Secondary text, captions |
| `ink-whisper` | `#A39E94` | Tertiary text, disabled |
| `heritage-navy` | `#1E2A47` | Brand primary — nav, primary CTAs, serif accents |
| `heritage-crimson` | `#8C2A2A` | The single editorial accent — section index numerals, link underlines, one word per headline maximum |
| `signal-gold` | `#C8A96A` | Reserved — only the "Honorary Doctorate" hero moment and any conferment visual |
| `paper-edge` | `#EDE7DB` | Dividers, quiet borders |

Dark mode becomes an *optional* toggle (Phase 7), not the default.

**Why this over current blue:** The current `#1A6DFF` / cyan-gradient palette reads "modern SaaS" — exactly what a doctoral audience is trained to distrust. Cream + navy + crimson codes as heritage, editorial, premium-advisory. Every tier-1 business school uses a variant of this.

### 2.3 Motion principles

1. **Stillness as default.** A section with no motion on first render reads as confident, not empty.
2. **Entry easing:** custom cubic-bezier `(0.22, 1, 0.36, 1)` — every component enters with this, 0.6–0.9s.
3. **Scroll-anchored choreography, never decorative float.** Every moving thing moves because a scroll position demands it.
4. **Single canvas.** All 3D lives in one persistent `<Canvas>` mounted at the layout level, with scenes toggling via intersection observers (Clay Boan pattern).
5. **Cursor as narrator.** Not a replacement dot. A soft contextual halo that grows/softens on interactive elements. Disabled on touch.
6. **Respect `prefers-reduced-motion`.** All scroll-scrubbed effects short-circuit to final state.

### 2.4 Grid + spacing

- 12-column grid, 1440px max-width container with 120px outer margins on desktop
- Vertical rhythm on 4px baseline — type scale snaps to it
- Section spacing: 120px mobile, 160–200px desktop (generous breath between sections — part of the "calm authority")

### 2.5 Component primitives to rebuild

Everything in `src/components/ui/` and `src/components/layout/` gets rebuilt against the new system. Full list in Phase 0.

---

## 3. Scope and sequencing

**Rollout mode: (B) — phase-by-phase, review between each.** Nothing moves to the next phase until the previous is merged and acceptance-tested in a browser.

### Phase order and rationale

| Phase | Name | Why this order |
|---|---|---|
| 0 | Foundations | Design system + tech migration. Everything downstream depends on this. Must land first. |
| 1 | Global shell | Navbar, footer, preloader, cursor, transitions. Visible on every page — ship before content work so every phase inherits the new chrome. |
| 2 | Home page (8 sections) | Highest-traffic surface. Biggest perceived-quality lift. |
| 3 | Programs | Core conversion surface. Index + Honorary Doctorate + DBA + PhD details. |
| 4 | Universities | Trust / credibility surface. Second highest for conversion influence. |
| 5 | Conversion flows | Apply + Contact. Form design matters disproportionately. |
| 6 | Legal / utility | Privacy, Terms, Refund, Cookies — bundled. Simple template. |
| 7 | Polish | Perf pass, a11y pass, mobile pass, optional dark-mode toggle, route-transition choreography. |

---

## 4. PHASE 0 — Foundations

**Goal:** Stand up the new stack and design system. No user-facing changes visible yet.

### 0.1 Tech migration tasks

- [ ] Upgrade Tailwind 3 → 4 via `npx @tailwindcss/upgrade`. Migrate `tailwind.config.ts` → `@theme` in `globals.css`.
- [ ] Add dependencies: `motion`, `gsap`, `@gsap/react`, `lenis`, `hamo`, `three`, `@react-three/fiber`, `@react-three/drei`, `next-image-export-optimizer`.
- [ ] Remove `framer-motion` (replace imports with `motion/react`).
- [ ] Wire Lenis in root client component; sync to GSAP ticker.
- [ ] Configure `next/font` for Editorial New (or Fraunces), ABC Diatype (or Inter), JetBrains Mono. Expose as CSS variables `--font-display`, `--font-sans`, `--font-mono`.
- [ ] Set up one persistent R3F `<Canvas>` at root layout, gated by `next/dynamic({ ssr: false })`. Empty scene until Phase 2.

### 0.2 Design-system tokens

- [ ] Put color tokens into `@theme` in `globals.css`.
- [ ] Define type scale: `text-display-xl`, `text-display-lg`, `text-display-md`, `text-body-lg`, `text-body`, `text-body-sm`, `text-mono-label`, `text-mono-sm`.
- [ ] Define motion tokens: `--ease-editorial: cubic-bezier(0.22, 1, 0.36, 1)`, duration scale.
- [ ] Spacing tokens on 4px baseline.

### 0.3 Rebuild primitive components

Every component below gets rebuilt to the new system. Keep the old file as a `.legacy.tsx` sibling until Phase 2 is signed off; then delete.

- `ui/Button.tsx` — three variants: `heritage` (solid navy), `ghost` (underline-on-hover), `quiet` (just text with crimson arrow). Magnetic-layer hover (two offset copies sliding in opposite directions).
- `ui/Link.tsx` — editorial link with animated underline, draws from SVG `strokeDashoffset`.
- `ui/SectionHeading.tsx` — mono index number (crimson) + serif headline. Used on every section.
- `ui/IndexNumeral.tsx` — the mono "01 / 08" pattern used as section markers.
- `ui/Card.tsx` — cream fill, 1px paper-edge border, no shadow by default.
- `ui/Magnetic.tsx` — the magnetic-layer button wrapper.
- `ui/TextReveal.tsx` — rewrite using GSAP SplitText instead of Framer Motion word-split.
- `ui/Cursor.tsx` — soft contextual halo. 20px diffuse circle at rest, scales to 64px + invert on interactives.
- `ui/ScrollPin.tsx` — wrapper that pins its child to viewport via ScrollTrigger for a given scroll distance.

### 0.4 Acceptance

A blank `/playground` route rendering each primitive, screenshotted and checked on desktop + mobile + reduced-motion.

---

## 5. PHASE 1 — Global shell

**Goal:** Ship the new navbar, footer, preloader, cursor, and route transitions. After this merges, every page on the old design will inherit the new chrome — the rest of the phases replace the middle.

### 1.1 Navbar redesign

- **Inspiration:** Montfort (institutional-luxury), Thibaud Allie (editorial), Pentagram
- **Aesthetic lane:** Institutional-luxury
- **Layout:** Fixed top, 72px tall. Three zones — `[Wordmark] [Nav links centered] [Quiet CTA right]`. No background on hero; solid ivory with 1px paper-edge bottom border after 80px of scroll.
- **Wordmark:** "Techversity" set in Editorial New, small. Subtle serif matches the body's voice.
- **Nav links:** ABC Diatype, 14px, tracked +0.02em. Five links max — *Programs · Universities · About · Insights · Contact*. Each gets an animated crimson underline on hover (SVG stroke draw).
- **Programs mega-menu:** Triggered on hover. Editorial 3-column spread — left column lists the four programs with serif names + mono duration meta; center column shows a rotating photographic plate; right column is a single quiet CTA ("Begin the conversation").
- **CTA:** "Schedule a conversation" as a `quiet` button — text + crimson arrow, no pill background. This replaces every "Apply Now" aggression.
- **Motion:** Scroll direction detection — scroll down hides nav (translate -100%), scroll up restores. View Transitions handle the border-fade on scroll. Mega-menu uses Motion layout animations.
- **Mobile:** Full-screen overlay with serif headings, staggered in via GSAP. Close via top-right X.

### 1.2 Footer redesign

- **Inspiration:** Pentagram Tablet (dense editorial), J.P. Morgan Private Bank, Vast Space
- **Aesthetic lane:** Editorial + institutional-luxury
- **Replace:** The current marquee + animated counters. A 2026 premium footer is calm, not a final fireworks show.
- **Layout (4-row editorial spread):**
  - **Row 1 (hero mark):** "Techversity" wordmark at 200px Editorial New, set against an ivory canvas. One-line mission statement beneath in serif italic.
  - **Row 2 (masthead):** 4-column sitemap — Programs / Universities / Insights / Firm. Mono category labels, serif link names.
  - **Row 3 (credentials):** A small serif paragraph stating accreditation partners, with quiet logo wall (grayscale, lockup-equal, not ranked).
  - **Row 4 (legal):** Mono row — copyright · ISO · privacy · terms · refund · cookies · sitemap. Small print, all lowercase, slightly off-black.
- **Motion:** Footer mark slow-fades in at 20% viewport intersection. No marquees.
- **Copy example for row 1:** "Techversity introduces accomplished professionals to the institutions that recognize them."

### 1.3 Preloader redesign

- **Inspiration:** Utopia Tokyo (loading-as-UI), Obsidian Assembly (numbered stepping)
- **Current state:** Custom preloader exists — rebuild it.
- **Design:** Solid ivory screen. Center — a mono counter counting 00 → 100 *in real time* as assets load (not fake). Beneath: "Establishing the record." On complete, screen splits horizontally and lifts off, revealing the hero beneath via GSAP with a 0.9s ease-out.
- **Duration:** Real asset-tied, capped at 2.2s. If assets load faster, hold at 100% for 400ms then exit — premium brands are allowed to be deliberate.

### 1.4 Page transitions

- **Inspiration:** Clay Boan (single-canvas continuity), React 19 `<ViewTransition>`
- **Strategy:** Native View Transitions API via Next 15's `unstable_ViewTransition`.
- **Between all routes:** Old page's serif headline morphs (FLIP) toward the new page's position while the rest cross-fades over 0.45s. Feels like pages of a book turning, not like navigation.
- **Specific transitions:**
  - Home → Program detail: program's card title morphs into the program page's H1.
  - Programs index → any program: same card-to-H1 FLIP.
  - Any page → Contact: fade-to-ivory with a 2-frame hold, giving a "we're pausing to listen" moment.

### 1.5 Custom cursor

- **Inspiration:** Thibaud Allie, NaughtyDuk (softened), Siena Film
- **Design:** Default — 20px soft cream-bordered circle, mix-blend-mode exclusion. On interactive hover — grows to 64px, picks up the element's label in mono inside the cursor (e.g., "view →"). On heritage CTAs — inverts to crimson.
- **Touch devices:** Cursor disabled; hover states map to compact active states.

### 1.6 Acceptance for Phase 1

Ship to `main`. Verify on Chrome / Safari / Firefox / iOS Safari / Android Chrome. Lighthouse perf ≥ 85 mobile / 95 desktop.

---

## 6. PHASE 2 — Home page (8 sections)

**Goal:** Replace every section of the home page with a distinct, lane-mixed composition. Total page height should *compress* vs. current — denser sections, more use of sticky-stack, less vertical stacking of near-identical blocks.

Current order: Hero → SocialProof → Programs → HowItWorks → WhyUs → Universities → FAQ → FinalCTA.

New order (and naming): **Hero → Record → Pathways → Advisory → Confidants (universities) → Method → Voices (FAQ) → Threshold (pre-footer)**

### 2.1 Hero ("The Seal")

- **Goal:** Stop the user. Establish gravitas in the first 0.6s.
- **Inspiration:** Cartier Watches & Wonders (immersive-3D alcove), Clay Boan (single-canvas), Fluid Glass (refraction), Montfort (ambient shader wallpaper)
- **Aesthetic lane:** Institutional-luxury + Immersive-3D (the *one* 3D moment)
- **Layout:** Full-bleed viewport. Left 60% — hero typography. Right 40% — a WebGL canvas rendering an abstract conferment seal (concentric rings + a slow-rotating gold-leaf core, baked Blender lighting).
- **Type:**
  - **Mono kicker** (12px, crimson, tracked): `EST. 2019 · ADVISORY`
  - **H1**: Set in Editorial New, 140–180px on desktop: *"The record a life's work earns."*
  - **Sub**: Diatype, 20px, ink-muted, 1.55 line-height: "Techversity introduces accomplished professionals to the universities that recognize them — for Honorary Doctorates, DBAs, and PhDs."
  - **CTA row**: two quiet buttons — "Begin the conversation" (heritage) and "Explore programs" (ghost)
- **Motion:**
  - On load — headline splits word-by-word via GSAP SplitText, rises 24px with 60ms stagger over 1.1s, `ease-editorial`.
  - The 3D seal rotates at 0.04rad/s continuously. Scroll from 0 → 400px drives the seal's dissolve — outer rings break into gold-leaf particles that drift toward "The Record" section header beneath.
  - Cursor-driven glass refraction: a subtle lens follows the cursor over the seal.
- **Unique element:** The gold-leaf particle dissolve that *becomes* the next section's ornament — inspired by Ruinart's La Fresque, Clay Boan's continuous canvas.
- **Copy direction:** Remove "Premier admissions advisory" language — too on-the-nose. Lead with the human outcome ("the record"), not the product.

### 2.2 Record (was SocialProof)

- **Goal:** Quantitative credibility, *quietly.*
- **Inspiration:** J.P. Morgan Private Bank (AUM as trust signal), Heidelberg CCUS (editorial-grade numbers), Terminal Industries (oversized numerals)
- **Aesthetic lane:** Editorial
- **Layout:** Full-width band on canvas-bone. Four stats in a single horizontal rail, but **each stat gets a full-width sticky moment as you scroll** (sticky-stack pattern, Codrops Sticky Grid Scroll tutorial, Mar 2026).
  - Stat 1 — "12+" / "Countries served"
  - Stat 2 — "10+" / "Partner universities"
  - Stat 3 — "98%" / "Acceptance rate"
  - Stat 4 — "4.8 / 5" / "Client satisfaction"
- **Type:** Numerals set in Editorial New at 320px, kerned tight. Labels in mono, 13px, tracked.
- **Motion:** GSAP ScrollTrigger. Each stat pins for ~80vh, numerals count up (not from 0 — a premium touch: start at ~85% of target and count the last mile, like a lens focusing). Dissolves into the next stat.
- **Unique element:** "Counting the last mile" — this is specific to us, not a clone of count-from-zero. Reads more confident.
- **Copy note:** Instead of "Client satisfaction" — rename to "Recipient satisfaction." The audience are recipients, not clients.

### 2.3 Pathways (was Programs)

- **Goal:** Introduce the four programs with the weight of editorial spreads, not with quick-scan cards.
- **Inspiration:** Evolve (Awwwards SOTD — project grid that expands to case study inline), Jennifer Heintz (3-typeface voice system), MERSI Architecture (diptych layout)
- **Aesthetic lane:** Editorial
- **Layout:** Four horizontal editorial spreads, one per program. Each spread is 100vh tall. Left half — serif program name + index numeral + 2-sentence editorial. Right half — a single large photograph OR the program's own small WebGL glyph.
  - 01 · Honorary Doctorate
  - 02 · Doctor of Business Administration
  - 03 · Doctor of Philosophy
  - 04 · Bachelor's & Master's *(Coming Soon)*
- **Type:** Program names in Editorial New at 110px. Meta row in mono ("4–6 months · Portfolio-based · By invitation").
- **Motion:** Horizontal scroll-snap rail — vertical page scroll translates into horizontal rail advance (GSAP ScrollTrigger horizontal). On hover, the right-side imagery does a subtle 1.5s shader pan. Clicking a spread → View Transitions FLIP the program name to the detail page's H1.
- **Unique element:** The H1 **FLIP-morph to the detail page is the navigation event** — no "Learn More" buttons. Clicking the spread = reading the chapter.
- **Note:** This replaces the current card grid. The duration was already stripped in the recent edit — consistent with the rule that invitation-only programs don't lead with a months number.

### 2.4 Advisory (was HowItWorks)

- **Goal:** Demystify the advisory process without making it feel transactional.
- **Inspiration:** Vast Space (chronological milestones gallery), Brunswick Group (posture), Heidrick & Struggles (thought-leadership spine)
- **Aesthetic lane:** Institutional-luxury + Editorial
- **Layout:** Sticky-pinned "chapter scroll." Left column — a sticky serif heading ("The Advisory"). Right column — five chapter plates that scroll past:
  1. **Qualify** — mono "01" + serif "We review a life's work."
  2. **Shortlist** — mono "02" + serif "We identify the institutions that match."
  3. **Introduce** — mono "03" + serif "We make the introduction, formally."
  4. **Shepherd** — mono "04" + serif "We guide every step of the consideration."
  5. **Confer** — mono "05" + serif "You are recognized."
- **Type:** Chapter numerals in JetBrains Mono crimson at 14px. Chapter verbs in Editorial New at 96px.
- **Motion:** Each chapter plate fades in as the next one replaces it in the right column. Left heading stays pinned for the entire section length (~500vh).
- **Unique element:** The *verbs* carry the entire visual weight. "Qualify. Shortlist. Introduce. Shepherd. Confer." — nothing else on the right side of the viewport. The site's most aggressive act of restraint.

### 2.5 Confidants (was Universities)

- **Goal:** Present partner universities as four editorial institutional portraits — not a logo wall of equals (the OOE mistake called out in research).
- **Inspiration:** Ravi Klaassens (image-as-margin), PrimeAsia Leather (logo wall as crest), Jacky Winter Gallery (museum-wall metadata)
- **Aesthetic lane:** Editorial
- **Layout:** Four institutional portraits. Each is a horizontal editorial card ~60vh tall:
  - Left third — large architectural photo of the campus (or an illustrated seal if photography is not yet licensed)
  - Middle third — university name in Editorial New, city in mono, 2-sentence institutional story
  - Right third — three facts presented as museum-wall metadata: *"Accreditation: ISO 9001:2015 · Recognition: National · Programs: Hon. Doctorate, DBA, PhD"*
- **Motion:** Each card enters via its photo, which grows from 85% scale on scroll-intersection. The metadata type-scrambles into place over 0.6s via SplitText.
- **Unique element:** The metadata row read as gallery-placard rather than feature-card. Borrows authority from museum display conventions.
- **CTA underneath:** A single quiet link — "Read the full network →" to `/universities`.

### 2.6 Method (was WhyUs)

- **Goal:** Three differentiators, presented as a principles essay.
- **Inspiration:** Siena Film Foundation (serialized "ADMIT ONE 001"), Artem Shcherban (kinetic type), General Condition (parenthetical annotations)
- **Aesthetic lane:** Bold-expressive (this is the one section where we break rhythm intentionally)
- **Layout:** Three full-width "manifesto plates," one principle each, stacked vertically. No cards, no grids.
  - **PRINCIPLE 001 — Discretion**: "We do not publish recipient names without consent. Your consideration is a private matter."
  - **PRINCIPLE 002 — Specificity**: "We do not recommend programs as a category. We recommend a university, a faculty, and a fit."
  - **PRINCIPLE 003 — Shepherding**: "We do not hand over an application and disappear. We remain present until conferment."
- **Type:** "PRINCIPLE 00X" in mono, crimson. Principle names in Editorial New at 180px. Body in serif italic at 28px.
- **Motion:** As each principle scrolls into view, the numeral counts "001 → 002 → 003" at the top of the section (sticky). Headline letters animate in via variable-font weight morph (light → bold) over scroll distance — inspired by Artem Shcherban.
- **Unique element:** The numeral persists at the top of the viewport and updates on scroll — functions as a table-of-contents-in-motion.

### 2.7 Voices (was FAQ)

- **Goal:** Replace the mechanical accordion FAQ with a human-voiced Q&A read as editorial.
- **Inspiration:** Pentagram Tablet (column-first editorial), ByChudy (dual-column captions)
- **Aesthetic lane:** Editorial
- **Layout:** Two-column editorial spread. Left column pinned — serif heading "Voices" + short intro paragraph. Right column — 6–8 questions, each a full editorial item (question as Editorial New 32px, answer as Diatype 17px in a narrow measure). No accordion collapse — the full text is visible.
- **Motion:** Questions scroll normally in the right column. On hover, the current question's serif color shifts from ink-primary → heritage-crimson. A single mono index "02/08" updates as you scroll.
- **Unique element:** Removing the accordion is the design choice. A premium audience *reads*. Accordions are for commodity content.

### 2.8 Threshold (was FinalCTA)

- **Goal:** One quiet invitation, no visual theater.
- **Inspiration:** J.P. Morgan Private Bank, Brunswick Group, Montfort
- **Aesthetic lane:** Institutional-luxury
- **Layout:** Single 60vh section. Centered, narrow. One serif line: *"If your work merits the record, let's begin the conversation."* One quiet heritage CTA. One mono sub-line: "RESPONSES WITHIN 48 HOURS · CONFIDENTIAL"
- **Motion:** Headline fades in over 0.9s on intersection. Nothing else moves.
- **Unique element:** This is the *opposite* of a typical site's final CTA (big buttons, urgency, stacked social proof). The restraint signals the audience is expected to be serious.

---

## 7. PHASE 3 — Programs (index + 3 details)

### 3.1 Programs index (`/programs`)

- **Layout:** Magazine table-of-contents. Mono header "THE PROGRAMS · 004 OFFERED". Four editorial entries in a vertical stack (not cards). Each entry — index numeral + program name (Editorial New, 80px) + 2-sentence serif pitch + metadata row. Hover — the entire row's type shifts to heritage-crimson via variable-font weight morph.
- **Motion:** Entries enter with a horizontal left-to-right mask reveal (Codrops SVG mask transitions pattern). Hover → slight magnetic pull toward cursor.
- **Reference:** Aristide Benoist's indexed project list; Matthew Galloway's typographic restraint.

### 3.2 Honorary Doctorate detail (`/programs/honorary-doctorate`)

This is the flagship program page — the highest craft ceiling of any page in the site.

- **Inspiration:** Cartier W&W (immersive 3D alcove), Siena Film Foundation (serialized artifact motif), The Blue Desert (chapter-based narrative)
- **Hero:** Full-viewport. An actual animated gold-leaf seal in R3F (the "Honoris Causa" seal) — slowly rotating, scroll-driven dissolve into gold particles. Left of seal — serif H1 *"Honoris Causa."* Mono kicker "PROGRAM 001 · HONORARY DOCTORATE."
- **Section 1 — The recognition:** 2-column editorial spread. Serif paragraph explaining what Honorary Doctorate is, to an audience that already understands it — so the tone is *recognition of their knowledge*, not explanation.
- **Section 2 — Who is considered:** Museum-wall metadata grid. Six traits ("Industry impact · Original contribution · Published or otherwise codified work · Peer recognition · 15+ years of sustained work · Public or institutional reach") each with a short serif gloss.
- **Section 3 — The process:** 4-chapter sticky scroll (like Advisory on home) — *Review · Match · Introduce · Confer.* Each chapter plate introduces who-does-what at that step.
- **Section 4 — Recipient profiles (mock/anonymized):** Three recipient editorial portraits. Full headshot, recipient's name, title, field, 1-paragraph story. Borrowed from Heidrick's thought-leadership profile pattern.
- **Section 5 — Timeline:** Horizontal scroll. A single "conferment journey" with 6 dated milestones (D-0 first conversation → D+180 conferment). Inspired by Vast Space's milestones gallery.
- **Section 6 — The recognition artefact:** A quiet institutional footer moment — a mono enumeration of what the recipient actually receives (official certificate, robed conferment ceremony where possible, academic regalia, inclusion in institution alumni directory).
- **Closing CTA:** "Begin a private conversation." Quiet. One button.
- **Unique element:** The gold-leaf particle dissolve *persists across the page* — particles released from the hero seal occasionally drift across later sections via a shared R3F canvas. Subtle. Never flashy.

### 3.3 DBA detail (`/programs/dba`)

- **Inspiration:** HBS Executive Education (transformation copy), Wharton (filterable metadata)
- **Hero:** Serif H1 *"Research that returns to practice."* No 3D — this program is grounded, practical. Hero background is a single large photograph of a seminar-room setting.
- **Section 1 — What a DBA is:** Editorial explanation differentiating DBA from PhD (applied research vs. theoretical).
- **Section 2 — Partner programs:** 3 editorial cards for the DBA-offering universities. Each lists duration, cohort size, specializations.
- **Section 3 — The dissertation model:** Serif walkthrough — research proposal → supervision → defense. Visual: A timeline infographic using the Heidelberg CCUS "editorial-grade data" treatment.
- **Section 4 — FAQs specific to DBA.**
- **Closing CTA:** Same pattern.
- **Difference from Honorary:** Less 3D, more editorial/utilitarian. A DBA candidate wants details; the page delivers them calmly.

### 3.4 PhD detail (`/programs/phd`)

- **Inspiration:** Oxford Saïd aesthetic (heritage serif), Pentagram Tablet (dense editorial column)
- **Hero:** Serif H1 *"Original contribution to knowledge."* Mono kicker "PROGRAM 003 · DOCTOR OF PHILOSOPHY."
- **Sections:** Similar skeleton to DBA, but framed around *originality and academic rigor* rather than applied research. Longer dissertation treatment.
- **Unique element:** Includes a short "published dissertations" editorial gallery — each sample dissertation gets a serif title, abstract, and the partner university. Presented like a journal's published issues.

---

## 8. PHASE 4 — Universities

### 4.1 Universities index (`/universities`)

- **Inspiration:** Ravi Klaassens (image-as-margin), MERSI Architecture (diptych spreads), Getty Tracing Art (institutional data as narrative)
- **Layout:** A full-page vertical sequence of university editorial spreads. Each spread is ~100vh.
  - Left — single full-bleed architectural photo
  - Right — university name in Editorial New + location in mono + 3-paragraph institutional story + metadata block + "programs offered" row
- **Motion:** Sticky-stacked — each spread pins for ~100vh while its photograph parallaxes sub-pixel (Ravi Klaassens pattern). Advance to next university is a full vertical mask reveal.
- **Unique element:** Each university gets the weight of a 2-page magazine feature. This is the single best conversion asset on the site because it *differentiates the partners from each other* — which every competitor fails to do.
- **Proprietary artefact idea (from research — "Own an annual publication"):** Add a small footer block — "The Techversity Network Report 2026 — download (PDF, 18 pages)." This single PDF positions Techversity as category-authoritative.

### 4.2 University detail pages (if needed)

Low priority for Phase 4. Individual pages per university may or may not be needed; the editorial spreads on the index page may be sufficient. **Decision needed from you:** do we want `/universities/[slug]` dedicated pages? If yes — template mirrors Program detail structure but focused on the institution, not the program.

---

## 9. PHASE 5 — Conversion flows

### 5.1 Apply (`/apply`)

- **Inspiration:** Minerva University (three-word triads), Brunswick Group (posture), private-banking contact experiences
- **Design:** Two-column layout. Left — a serif editorial introduction ("Every application is read by a partner — not a form processor. Please take your time.") + a single mono metadata block ("RESPONSE WITHIN 48 HOURS · HUMAN REVIEWED · CONFIDENTIAL"). Right — a *deliberately* slow multi-step form with serif field labels, single-field-per-step progression (like Typeform but editorial).
- **Motion:** Fields enter with a 0.6s mask reveal. Step progression uses View Transitions — the current step's serif label FLIP-morphs to the next step's heading.
- **Unique element:** The form *feels* like a private-banker's intake document. Fonts, pacing, language. No progress bar with "Step 3 of 8" — instead, an editorial "You are on Chapter II of V."
- **Validation:** Inline, with serif error copy. No red error borders — instead, a crimson single-line note in the margin.

### 5.2 Contact (`/contact`)

- **Inspiration:** Montfort (quiet institutional), J.P. Morgan Private Bank
- **Layout:** Narrow editorial page. Serif heading "A private conversation." One paragraph explaining what to expect. One email address (set as actual serif, not a mailto-styled button). One lightweight form below — 4 fields — name, title, country, message — set in serif.
- **Motion:** Hero intersects → serif heading fades in. That is all.
- **Unique element:** The email address is rendered larger than the form. Because that's what a senior audience actually wants to use.

---

## 10. PHASE 6 — Legal / utility

Privacy, Terms, Refund, Cookies.

- **Template:** Single editorial long-read layout. Mono kicker ("POLICY · PRIVACY"). Serif H1. Body set in Diatype at 17px with a 680px max-measure column. Serif H2s for sections.
- **Motion:** None. This is content that the reader needs to focus on.
- **Reference:** Pentagram's Tablet Magazine microsite — editorial long-read treatment.

---

## 11. PHASE 7 — Polish

### 7.1 Performance pass
- Lighthouse targets: ≥ 90 mobile / ≥ 98 desktop
- Critical path: ≤ 120KB JS over the wire on first paint
- LCP ≤ 2.2s on 4G throttle
- Audit: lazy-load R3F canvas on scroll-into-view if it's not the home hero; verify all `next/image` calls use `next-image-export-optimizer`
- Verify GSAP tree-shakes (import from `gsap` not `gsap/all`)

### 7.2 Accessibility pass
- All motion respects `prefers-reduced-motion` — scroll-pinned sections fall back to vertical stack; 3D canvas swaps to a still rendered image; cursor replacement disables
- Color contrast: ink-primary on canvas-ivory ≥ 12:1; heritage-crimson on canvas-ivory ≥ 7:1
- All forms keyboard-navigable with visible focus (serif underline, not browser-default blue ring)
- Screen reader: verify the editorial navigation (mono "PROGRAM 001 · HONORARY DOCTORATE") announces clearly; if not, add visually-hidden alt text

### 7.3 Mobile polish
- Sticky-stack patterns convert to vertical-stacked sections with mask-reveal entrances instead of pinning (pinning is bad UX on short mobile viewports)
- H1 display sizes scale 180px → 56px on 390px-wide; Editorial New's character count per line caps at 12
- 3D canvas on mobile: render at 0.5× DPR + stop rotation to save battery
- Cursor: disabled entirely — replaced by a subtle active-state underline on tap

### 7.4 Dark mode toggle (optional but recommended)
- Add a quiet toggle in the footer (not the navbar — navbar stays pristine).
- Dark palette: `canvas-ink #121010`, `ink-cream #F0EAD8`, `heritage-navy` brightens to `#5A7CB6`, `heritage-crimson` shifts to `#C36868`. Gold becomes `#E3C892`.
- Persistent via `localStorage`. Respects `prefers-color-scheme` on first visit.

### 7.5 Route transition choreography
- Implement the FLIP transitions from Phase 1.4 with real content (Program name → H1 morphs).
- Test cross-browser: Chromium/Safari get the View Transitions API; Firefox gets a graceful cross-fade.

---

## 12. Open decisions (need your call before Phase 0 starts)

These are the three blockers between this plan and execution. Everything else I can proceed on:

1. **Typefaces — licensed or free?** Premium recommendation: Editorial New + ABC Diatype + JetBrains Mono (~$700 one-time, best-in-class). Free alternative: Fraunces Variable + Inter Variable + JetBrains Mono (acceptable, still editorial-caliber). Which?
2. **Color palette confirmation** — sign-off on the "European Editorial" palette (ivory + navy + crimson + gold for honorary moment) as the new brand direction? This is a *significant* shift from the current blue/cyan.
3. **University detail pages** (Phase 4.2) — yes or no? If yes, we need to source content for 4 full institutional profiles. If no, the editorial spreads on the index page stand alone.

---

## 13. What this plan does NOT include (scope discipline)

- Copywriting pass — I've proposed headlines and structure throughout, but final copy (especially for long-read sections like Honorary Doctorate detail, Advisory process, university institutional stories) needs either you or a copywriter. I can draft first passes if you want, but it's a separable effort.
- CMS — plan assumes content stays in TypeScript files under `src/lib/`. If you want a headless CMS (Sanity, Contentful, Payload) for copy/images later, that's a separate initiative.
- Photography — several sections assume licensed photography we don't currently have (campus shots for universities, seminar-room for DBA hero, recipient headshots). Plan can ship on placeholder/illustrated seals until photography is commissioned.
- Internationalization — plan is English-first. Multilingual can come later; the editorial layouts already accommodate dual-language caption pairs (ByChudy pattern) if needed.
- Analytics, cookie banner wiring, SEO metadata — addressed lightly in Phase 6, but full SEO pass can happen in parallel.

---

## 14. First concrete action (if approved)

Phase 0 kick-off — one PR:
1. Tailwind v4 migration
2. `framer-motion` → `motion` swap
3. New dependencies installed (GSAP, Lenis, Hamo, R3F, Drei, next-image-export-optimizer)
4. Design tokens committed to `@theme` in `globals.css`
5. Fonts wired via `next/font`
6. Lenis + GSAP ticker sync in root client component
7. `/playground` route with every primitive from §4.3 rendered for review

Estimated effort: ~6–10 hours of work on my side. No user-visible changes until Phase 1 merges.

---

*End of plan. Awaiting sign-off on the three open decisions in §12, then Phase 0 begins.*
