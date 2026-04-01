# Techversity.ai — Complete Redesign Implementation Plan

## Research Foundation
- **KnowledgeHut.com** analyzed (competitor benchmark)
- **35+ websites** researched across EdTech, SaaS, design-forward, and agency categories
- **21st.dev** component library catalogued (1,500+ components)
- **Current codebase** audited (Next.js 16, React 19, Framer Motion, GSAP, Three.js, Tailwind 4)
- **Tech stack comparison** completed across frameworks, animation libs, component systems

---

## Recommended Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| **Framework** | Next.js 16 (App Router) — *keep current* | Best ecosystem for content + interactivity, RSC for SEO |
| **React** | React 19 — *keep current* | Latest features, server components |
| **Styling** | Tailwind CSS 4 — *keep current* | Industry standard, all component libs built on it |
| **Primary Animations** | Framer Motion 12 — *keep current* | 90% of all animations — declarative, React-native |
| **Scroll Animations** | GSAP + ScrollTrigger — *keep current* | Complex scroll sequences, horizontal scrolling |
| **Smooth Scroll** | Lenis — *keep current* | Buttery scroll feel |
| **3D** | Three.js + React Three Fiber — *keep current* | Interactive globe, network sphere |
| **UI Base** | shadcn/ui (Radix primitives) — **ADD** | Accessible, unstyled, copy-paste components |
| **Animated Components** | Aceternity UI + Magic UI + 21st.dev — **ADD** | 350+ pre-built animated components |
| **Icons** | Lucide React — *keep current* | Clean, consistent |
| **Fonts** | Space Grotesk (display) + Inter (body) — *keep, refine* | Add tighter letter-spacing for premium feel |
| **Forms** | React Hook Form + Zod — *keep current* | Already solid |
| **Image Optimization** | Next.js Image — *keep current* | Auto WebP/AVIF, lazy loading |
| **Deployment** | Vercel — **RECOMMENDED** | Optimal for Next.js, edge functions, analytics |

**What's changing:** We're not replacing the stack — we're enhancing it with shadcn/ui, Aceternity UI, Magic UI, and 21st.dev animated components. The architecture stays the same.

---

## Design System Refinements

### Color Palette (Enhanced)

**Keep the current Deep Navy + Cyan/Blue palette, but refine:**

```
Background Primary:    #0a0e27 (keep — deep navy)
Background Surface:    #111633 (keep — card surfaces)
Background Subtle:     #1a1f4a (keep — hover states)

Accent Primary:        #1a6dff → #3A82FF (slightly brighter blue)
Accent Cyan:           #00e5ff → #22D3EE (standardize to Tailwind cyan-400)
Accent Purple:         #7b2ff7 (keep)
Accent Coral:          #ff6b6b (keep — for CTAs and warnings)
Accent Orange:         #ff8c42 (keep — for highlights)

Text Primary:          #ffffff (keep)
Text Secondary:        #e2e8f0 (keep)
Text Muted:            #8892b0 → #94A3B8 (standardize to Tailwind slate-400)

Glass:                 rgba(255, 255, 255, 0.05) (keep)
Glass Border:          rgba(255, 255, 255, 0.08) (slightly subtler, Vercel-style)

Light sections:        #ffffff / #f8fafc (keep for contrast sections)
```

### Typography Refinements

```
Display Font:     Space Grotesk, weight 700-800
                  Letter-spacing: -0.04em (tighter for premium feel)
                  Line-height: 1.1-1.15

Body Font:        Inter, weight 400-500
                  Letter-spacing: -0.01em
                  Line-height: 1.5-1.625

Scale:            14 / 16 / 18 / 24 / 32 / 48 / 64 / 80px
Section padding:  96-128px vertical (desktop), 48-64px (mobile)
Spacing grid:     4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128px
```

### Animation Performance Rules (Non-Negotiable)

1. **ONLY animate:** `transform`, `opacity`, `filter`, `clip-path` (GPU-composited)
2. **NEVER animate:** `width`, `height`, `margin`, `top`, `left`, `background-color` transitions on large elements
3. **Use IntersectionObserver** for all scroll-triggered animations (zero main-thread cost)
4. **Stagger animations** with 80-150ms delays (never simultaneous)
5. **Disable off-screen animations** — disconnect observers when not visible
6. **`prefers-reduced-motion`** — always provide reduced-motion alternatives
7. **Lazy-load** heavy components (3D, complex animations) with `next/dynamic`
8. **Target:** LCP < 2.5s, INP < 200ms, CLS < 0.1

### Standard Animation Variants (Reusable)

```tsx
// Fade up on scroll (primary entrance animation)
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

// Stagger container
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

// Scale in
const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

// Slide from left
const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

// Slide from right
const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};
```

---

# PHASED IMPLEMENTATION PLAN

---

## PHASE 1: Foundation & Design System (Week 1-2)

### 1.1 Install Component Libraries
- Install shadcn/ui CLI and initialize
- Add Aceternity UI components (copy-paste)
- Add Magic UI components (copy-paste)
- Browse 21st.dev for specific components needed
- Set up component directory structure: `components/ui/`, `components/magicui/`, `components/aceternity/`

### 1.2 Refine Design Tokens
- Update `globals.css` with refined color palette
- Add tighter letter-spacing to display headings (-0.04em)
- Standardize spacing to 8px grid
- Add section padding utilities (py-24 md:py-32 lg:py-40)
- Create reusable animation variant constants file (`lib/animations.ts`)

### 1.3 Create Reusable Animation Components
- `<RevealOnScroll>` — wrapper using Framer Motion `whileInView`
- `<StaggerContainer>` — parent for staggered child animations
- `<AnimatedCounter>` — number counter animation on viewport entry
- `<TextReveal>` — word-by-word text reveal (refine existing)
- `<GradientText>` — animated gradient text (refine existing)

### 1.4 Performance Infrastructure
- Set up `prefers-reduced-motion` global handler
- Create `next/dynamic` lazy loading pattern for heavy components
- Add `@next/bundle-analyzer` for tracking bundle size
- Set up Lighthouse CI in development workflow

---

## PHASE 2: Global Layout Components (Week 2-3)

### 2.1 Navbar Redesign
**Inspired by:** KnowledgeHut mega menu + Supabase transparent→solid transition + Linear subtle animations

**Structure:**
```
┌─────────────────────────────────────────────────────────────────┐
│ Logo     Programs ▾   Universities   About ▾   Resources ▾   [Apply Now] │
└─────────────────────────────────────────────────────────────────┘
```

**Sections & Features:**
- **Transparent → Solid transition** on scroll (like Supabase)
- **Mega menu for "Programs"** dropdown:
  - Left column: Program categories (Honorary Doctorate, DBA, PhD, Masters)
  - Right column: Featured program card with image + CTA
  - Smooth height animation on open/close
- **"Resources" dropdown:** Blog, FAQs, How It Works
- **"About" dropdown:** About Us, Universities, Accreditations
- **CTA button:** "Apply Now" — primary blue, always visible
- **Mobile:** Hamburger → full-screen overlay with backdrop blur, staggered menu items

**Animations:**
- Background: `backdrop-filter: blur(12px)` + opacity transition on scroll
- Dropdown: Framer Motion `AnimatePresence` with `scaleY` origin top
- Menu items: Staggered fade-up (80ms delay per item)
- Mobile hamburger: Morphing icon animation (bars → X)
- Active link: Subtle bottom border slide animation

**Component source:** Aceternity `floating-navbar` or 21st.dev navbar variants

---

### 2.2 Footer Redesign
**Inspired by:** KnowledgeHut comprehensive footer + Vercel minimal elegance

**Structure:**
```
┌─────────────────────────────────────────────────────────┐
│ [Pre-Footer CTA Section — Full-width gradient banner]   │
│ "Ready to Transform Your Career?"                       │
│ [Apply Now]  [Book Consultation]                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ LOGO + Tagline    Programs     University    Company    │
│                   - Doctorate  - Partners    - About    │
│                   - DBA        - Regions     - Contact  │
│                   - PhD        - Accredit.   - Blog     │
│                   - Masters                  - Careers  │
│                                                         │
│ [Social Icons]    Resources    Legal         Contact    │
│ LinkedIn          - Blog       - Privacy     - Email    │
│ Twitter           - FAQs       - Terms       - Phone    │
│ Instagram         - Events     - Refund      - WhatsApp │
│ YouTube                        - Cookies               │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ © 2026 Techversity.ai — All rights reserved             │
│ [Partner logos marquee — scrolling accreditation badges] │
└─────────────────────────────────────────────────────────┘
```

**Animations:**
- Pre-footer CTA: Gradient background animation (15s loop)
- Footer columns: Staggered fade-up on scroll into view
- Social icons: Scale + color transition on hover
- Partner logos: Infinite CSS marquee scroll
- Links: Underline slide-in animation on hover

---

### 2.3 Page Transitions
**Keep existing** stair-step column overlay effect — it's distinctive and performant.
- Refine timing (slightly faster, 400ms per step)
- Add route-aware color theming per page

### 2.4 Preloader
**Keep existing** particle preloader — it's premium.
- Ensure it only shows on initial load (not route changes)
- Add progress indicator

---

## PHASE 3: Homepage Redesign (Week 3-5)

### 3.1 Hero Section
**Inspired by:** Stripe mesh gradients + Codecademy "developer language" headline + Brilliant interactive elements + MasterClass cinematic premium feel

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ [Animated gradient mesh background — WebGL or CSS]          │
│                                                             │
│  ┌──────────────────────────┐  ┌──────────────────────────┐ │
│  │                          │  │                          │ │
│  │  Tagline (small text)    │  │  3D Network Sphere       │ │
│  │                          │  │  (keep existing Three.js) │ │
│  │  Transform Your Career   │  │                          │ │
│  │  with a Globally         │  │  OR                      │ │
│  │  Recognized Degree       │  │                          │ │
│  │                          │  │  Animated illustration   │ │
│  │  Subtitle paragraph      │  │  of learning/growth      │ │
│  │                          │  │                          │ │
│  │  [Apply Now] [Learn More]│  │                          │ │
│  │                          │  │                          │ │
│  └──────────────────────────┘  └──────────────────────────┘ │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ ★ 4.8/5 Rating  |  500+ Graduates  |  15+ Countries │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Animations:**
- **Background:** Animated gradient mesh (CSS `background-size: 400% 400%` with `gradient-shift` keyframes — lighter than WebGL, still premium)
- **Headline:** Staggered word-by-word reveal (100ms per word) using Framer Motion
- **Subtitle:** Fade-up 200ms after headline completes
- **CTAs:** Scale-in 200ms after subtitle
- **3D Sphere:** Keep existing, but lazy-load with `next/dynamic` (SSR: false)
- **Trust bar:** Slide-up + counter animation for numbers
- **NO scroll hijacking, NO parallax on the hero**

**Component sources:**
- Aceternity `hero-highlight` for gradient text effects
- Magic UI `animated-gradient-text` for headline
- 21st.dev hero variants for layout inspiration

---

### 3.2 Social Proof / Trust Bar
**Inspired by:** KnowledgeHut "Trusted by" + Coursera partner logos + 21st.dev marquee components

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  "Trusted by Leading Organizations Worldwide"               │
│                                                             │
│  ← [Logo] [Logo] [Logo] [Logo] [Logo] [Logo] [Logo] →      │
│     (infinite scrolling marquee, pause on hover)             │
│                                                             │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐         │
│  │ 500+ │  │ 15+  │  │ 98%  │  │ 4.8  │  │ 50+  │         │
│  │Grads │  │Count.│  │Satisf│  │Rating│  │Univ. │         │
│  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘         │
└─────────────────────────────────────────────────────────────┘
```

**Animations:**
- Logo marquee: Pure CSS `translateX` infinite scroll (Magic UI `marquee` component)
- Stat counters: Animated count-up on viewport entry (Framer Motion `AnimateNumber` or NumberFlow)
- Section: Fade-up on scroll

---

### 3.3 Programs Section (Bento Grid)
**Inspired by:** Aceternity bento grid + Linear modular components + Apple product grid

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  "Our Programs"                                             │
│  "World-Class Degrees for Ambitious Professionals"          │
│                                                             │
│  ┌────────────────────────┐  ┌───────────┐  ┌───────────┐  │
│  │                        │  │           │  │           │  │
│  │  Honorary Doctorate    │  │   DBA     │  │   PhD     │  │
│  │  (Large featured card) │  │           │  │           │  │
│  │                        │  │           │  │           │  │
│  │  Icon + Description    │  │  Icon +   │  │  Icon +   │  │
│  │  + Key stats           │  │  Desc +   │  │  Desc +   │  │
│  │  [Learn More →]        │  │  CTA      │  │  CTA      │  │
│  │                        │  │           │  │           │  │
│  └────────────────────────┘  └───────────┘  └───────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Master's Programs (wide card)                       │   │
│  │  Description + CTA                                   │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Animations:**
- Cards: Staggered fade-up entrance (100ms delay per card)
- Hover: 3D tilt effect (keep existing) + glow border + scale(1.02)
- Mouse-following spotlight: Radial gradient follows cursor across grid (Stripe-inspired)
- Card icons: Subtle bounce animation on hover

**Component sources:**
- Aceternity `bento-grid` or `feature-section-with-bento-grid`
- Keep existing 3D Card component, enhanced with spotlight effect

---

### 3.4 How It Works Section
**Inspired by:** KnowledgeHut step process + Linear clean presentation + Apple scroll storytelling

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  "How It Works"                                             │
│  "Your Journey in 5 Simple Steps"                          │
│                                                             │
│  ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐      │
│  │  1  │────│  2  │────│  3  │────│  4  │────│  5  │      │
│  │     │    │     │    │     │    │     │    │     │      │
│  │Apply│    │Eval │    │Enrol│    │Study│    │Grad │      │
│  │     │    │     │    │     │    │     │    │     │      │
│  └─────┘    └─────┘    └─────┘    └─────┘    └─────┘      │
│                                                             │
│  [Detailed description of currently active step]           │
│  [with illustration/animation for that step]               │
└─────────────────────────────────────────────────────────────┘
```

**Two options (pick one):**

**Option A — Horizontal Scroll (Current):**
- Keep GSAP horizontal scroll on desktop
- Refine: Add progress indicator bar
- Add step number counter animation
- Mobile: Stack vertically with timeline connector

**Option B — Interactive Steps (Recommended):**
- Replace horizontal scroll with clickable/scrollable step cards
- Each step reveals content below when scrolled into view
- Connected by an animated SVG line (draw-on-scroll effect)
- More accessible, works better on all devices
- Uses IntersectionObserver — each step activates as user scrolls

**Animations:**
- Step cards: Staggered entrance with fade-up
- Connecting line: SVG stroke animation (`stroke-dashoffset`) on scroll
- Active step: Scale up + glow effect
- Step content: Crossfade transition between steps
- Step numbers: Counter animation

---

### 3.5 Why Choose Us Section
**Inspired by:** KnowledgeHut career acceleration cards + Brilliant gamification clarity + Vercel clean grid

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  "Why Techversity.ai?"                                      │
│  "What Sets Us Apart"                                       │
│                                                             │
│  [Light background section for contrast]                    │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ 🎓           │  │ 🌍           │  │ ⚡           │      │
│  │ Globally     │  │ International│  │ Fast-Track   │      │
│  │ Recognized   │  │ Faculty      │  │ Completion   │      │
│  │              │  │              │  │              │      │
│  │ Description  │  │ Description  │  │ Description  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ 💼           │  │ 🤝           │  │ 📊           │      │
│  │ Career       │  │ Dedicated    │  │ Research     │      │
│  │ Support      │  │ Mentorship   │  │ Guidance     │      │
│  │              │  │              │  │              │      │
│  │ Description  │  │ Description  │  │ Description  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Animations:**
- Section: Light background for contrast (alternating dark/light pattern)
- Cards: Staggered fade-up (2 rows × 3 cols, row by row)
- Icons: Animated on hover (scale + color shift)
- Card hover: Subtle lift + shadow (transform: translateY(-4px))
- Optional: Lottie animated icons instead of static Lucide icons

---

### 3.6 Universities Section
**Inspired by:** KnowledgeHut certification partners + 21st.dev world map + Coursera university logos

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  "Our Global University Network"                            │
│  "Partner Universities Across 15+ Countries"                │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                                                      │   │
│  │           [Interactive Globe]                        │   │
│  │           (keep existing Three.js globe)             │   │
│  │           with animated connection lines             │   │
│  │           highlighting university locations          │   │
│  │                                                      │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  ← [Univ Card] [Univ Card] [Univ Card] [Univ Card] →      │
│     (horizontal carousel with auto-scroll)                   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Accreditation badges marquee                         │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Animations:**
- Globe: Keep existing, add pulsing dots at university locations
- University cards: Carousel with smooth slide transition
- Cards hover: Flip or expand to show more details
- Accreditation badges: Infinite marquee scroll
- Connection lines on globe: Animated arc drawing between locations

---

### 3.7 Testimonials Section
**Inspired by:** Aceternity animated-testimonials + KnowledgeHut reviews + MasterClass cinematic cards

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  "What Our Graduates Say"                                    │
│  "Success Stories from Techversity.ai Alumni"                │
│                                                             │
│  ← [Testimonial] [Testimonial] [Testimonial] →             │
│                                                             │
│  Each card:                                                 │
│  ┌──────────────────────────┐                               │
│  │  ★★★★★                   │                               │
│  │  "Quote text here..."    │                               │
│  │                          │                               │
│  │  [Photo] Name            │                               │
│  │          Title, Company  │                               │
│  │          Program: DBA    │                               │
│  └──────────────────────────┘                               │
│                                                             │
│  [View All Stories →]                                        │
└─────────────────────────────────────────────────────────────┘
```

**Animations:**
- Infinite horizontal marquee (two rows, opposite directions) — Magic UI `marquee` component
- Pause on hover to read
- Cards: Glass morphism effect with subtle glow
- Stars: Shimmer animation on entrance
- Or: Aceternity `animated-testimonials` with auto-cycling featured testimonial

---

### 3.8 FAQ Section
**Inspired by:** shadcn/ui accordion + KnowledgeHut collapsible FAQs

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  "Frequently Asked Questions"                                │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ ▶ What programs does Techversity.ai offer?          │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │ ▼ How long do programs take to complete?            │    │
│  │   Answer content with smooth height animation...    │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │ ▶ Are the degrees internationally recognized?       │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │ ▶ What is the application process?                  │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  [Still have questions? Contact Us →]                        │
└─────────────────────────────────────────────────────────────┘
```

**Animations:**
- Accordion open/close: Framer Motion `AnimatePresence` with height animation
- Chevron rotation: 180° rotate on toggle
- Content: Fade-in with slight translateY
- Section entrance: Staggered reveal of FAQ items

**Component:** shadcn/ui `Accordion` (built on Radix, accessible by default)

---

### 3.9 Final CTA Section
**Inspired by:** Stripe gradient CTA + KnowledgeHut career acceleration

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  [Animated gradient background]                              │
│                                                             │
│     "Ready to Take the Next Step?"                          │
│     "Join 500+ professionals who've transformed             │
│      their careers with Techversity.ai"                      │
│                                                             │
│     [Apply Now]       [Book a Consultation]                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Animations:**
- Background: Animated gradient (CSS `gradient-shift` keyframes, 15s loop)
- Text: Fade-up on scroll
- Buttons: Spring-based scale on hover
- Optional: Particle/sparkle effect behind text (lightweight CSS-only)

---

## PHASE 4: Programs Pages Redesign (Week 5-7)

### 4.1 Programs Hub Page (`/programs`)
**Inspired by:** KnowledgeHut course domains + Coursera structured paths + Udacity career framing

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  Hero: "Explore Our Programs"                                │
│  "Choose the degree that matches your ambitions"            │
│                                                             │
│  [Filter tabs: All | Doctorate | Masters | Professional]    │
│                                                             │
│  ┌────────────────────────┐  ┌────────────────────────┐     │
│  │  Honorary Doctorate    │  │  DBA                   │     │
│  │  [Image/Illustration]  │  │  [Image/Illustration]  │     │
│  │  Duration | Level      │  │  Duration | Level      │     │
│  │  Brief description     │  │  Brief description     │     │
│  │  Key highlights (3)    │  │  Key highlights (3)    │     │
│  │  [Learn More →]        │  │  [Learn More →]        │     │
│  └────────────────────────┘  └────────────────────────┘     │
│                                                             │
│  ┌────────────────────────┐  ┌────────────────────────┐     │
│  │  PhD                   │  │  Master's Programs     │     │
│  │  ...                   │  │  ...                   │     │
│  └────────────────────────┘  └────────────────────────┘     │
│                                                             │
│  [Comparison table: side-by-side program comparison]        │
│  [CTA: "Not sure which program? Take our quiz →"]          │
└─────────────────────────────────────────────────────────────┘
```

**Animations:**
- Filter tabs: Animated underline/background slide on active tab (Framer Motion `layoutId`)
- Cards: Staggered entrance + spotlight hover effect
- Comparison table: Fade-in rows on scroll

---

### 4.2 Individual Program Pages (`/programs/[slug]`)
**Inspired by:** KnowledgeHut course pages + MasterClass premium feel + Udacity career framing

**Section-by-section:**

#### Section 1: Program Hero
```
┌─────────────────────────────────────────────────────────────┐
│  [Gradient background with subtle pattern]                   │
│                                                             │
│  Breadcrumb: Programs > Honorary Doctorate                  │
│                                                             │
│  ┌──────────────────────┐  ┌──────────────────────────────┐ │
│  │  HONORARY DOCTORATE  │  │  Key Facts Card              │ │
│  │                      │  │  ┌────────────────────────┐  │ │
│  │  Earn Recognition    │  │  │ Duration: 6-12 months  │  │ │
│  │  for Your Life's     │  │  │ Format: Online + Visit │  │ │
│  │  Work                │  │  │ Level: Doctoral        │  │ │
│  │                      │  │  │ Accredited: Yes ✓      │  │ │
│  │  [Apply Now]         │  │  └────────────────────────┘  │ │
│  │  [Download Brochure] │  │                              │ │
│  └──────────────────────┘  └──────────────────────────────┘ │
│                                                             │
│  ★★★★★ 4.9/5 from 120+ graduates                          │
└─────────────────────────────────────────────────────────────┘
```

#### Section 2: Program Overview (light background)
- Left: Rich text description with key highlights
- Right: Image or illustration of the program experience
- Animation: Alternating slide-left / slide-right reveal

#### Section 3: Who Is This For?
- Persona cards (3-4 ideal candidate profiles)
- Each card: Icon + title + description
- Animation: Staggered fade-up

#### Section 4: Program Benefits
- 6 benefit cards in 2×3 grid (or 3×2 on mobile)
- Each: Icon + title + description
- Animation: Staggered entrance with subtle hover lift
- Light background section

#### Section 5: Curriculum / What You'll Learn
- Accordion-style expandable modules
- Each module: Number + title + topic list
- Component: shadcn/ui Accordion
- Animation: Smooth height transition, chevron rotate

#### Section 6: University & Accreditation
- University partner card with logo, name, location, description
- Accreditation badges row
- Animation: Fade-up with badge shimmer

#### Section 7: Testimonials
- 2-3 graduate testimonials specific to this program
- Carousel or stacked cards
- Photo, name, title, quote, program outcome
- Animation: Crossfade auto-cycle or horizontal scroll

#### Section 8: Pricing & Enrollment
```
┌─────────────────────────────────────────────────────────────┐
│  "Investment in Your Future"                                 │
│                                                             │
│  ┌─────────────────────────────┐                            │
│  │  Program Fee                │                            │
│  │  $X,XXX                     │                            │
│  │                             │                            │
│  │  ✓ Full program access      │                            │
│  │  ✓ University certificate   │                            │
│  │  ✓ Mentorship sessions      │                            │
│  │  ✓ Research guidance        │                            │
│  │                             │                            │
│  │  [Apply Now]                │                            │
│  │  [Book Consultation]        │                            │
│  │                             │                            │
│  │  💬 Need help? Chat with us │                            │
│  └─────────────────────────────┘                            │
│                                                             │
│  [Payment plans available — learn more]                      │
└─────────────────────────────────────────────────────────────┘
```

#### Section 9: FAQ (program-specific)
- Program-specific FAQs in accordion
- Same component as homepage FAQ

#### Section 10: Related Programs
- Horizontal card scroll of other programs
- "You might also be interested in..." framing
- Animation: Swipe/drag carousel

#### Section 11: Sticky CTA Bar (Mobile)
- Fixed bottom bar on mobile: "[Program Name] — [Apply Now]"
- Appears after scrolling past hero
- Animation: Slide up from bottom

---

## PHASE 5: Universities Page Redesign (Week 7-8)

### Layout:
```
┌─────────────────────────────────────────────────────────────┐
│  Hero: "Our Global University Network"                       │
│  "Partnered with World-Class Institutions"                  │
│                                                             │
│  [Interactive 3D Globe — keep existing]                      │
│  with animated arcs connecting university locations          │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  "Partner Universities" (light background)                   │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ [Univ Logo]  │  │ [Univ Logo]  │  │ [Univ Logo]  │      │
│  │ Name         │  │ Name         │  │ Name         │      │
│  │ Country      │  │ Country      │  │ Country      │      │
│  │ Programs     │  │ Programs     │  │ Programs     │      │
│  │ [Learn More] │  │ [Learn More] │  │ [Learn More] │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  "How Our University Partnerships Work"                      │
│  [Step-by-step collaboration model]                         │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  "Accreditations & Recognition"                             │
│  [Badge grid with hover details]                            │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  [Impact Stats — animated counters]                         │
│  15+ Countries | 50+ Programs | 500+ Graduates | 98% Sat.  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  [CTA: "Explore Programs at Our Partner Universities"]      │
└─────────────────────────────────────────────────────────────┘
```

**Animations:**
- Globe: Keep existing + add animated connection arcs (Three.js)
- University cards: Staggered entrance + hover flip for more details
- Stats: Animated counter on viewport entry
- Collaboration model: Step-by-step reveal with connecting SVG line animation
- Accreditation badges: Subtle pulse on hover

---

## PHASE 6: Application & Contact Pages (Week 8-9)

### 6.1 Apply Page (`/apply`)
**Inspired by:** KnowledgeHut enrollment flow + shadcn/ui form components + Clerk auth pages

**Keep existing multi-step form, enhance with:**
- Progress stepper at top with animated fill between steps
- Step transition: Slide left/right with crossfade
- Form validation: Inline with shake animation on error
- Success screen: Confetti or celebration animation (Lottie)
- Sticky sidebar on desktop showing program summary

**Component:** shadcn/ui form components (Input, Select, RadioGroup, Textarea)

### 6.2 Contact Page (`/contact`)
**Inspired by:** Cal.com clean forms + KnowledgeHut multiple contact methods

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  "Get in Touch"                                              │
│                                                             │
│  ┌──────────────────────┐  ┌──────────────────────────────┐ │
│  │  Contact Form         │  │  Contact Info               │ │
│  │  - Name               │  │  📧 Email                   │ │
│  │  - Email              │  │  📞 Phone                   │ │
│  │  - Program Interest   │  │  💬 WhatsApp                │ │
│  │  - Message            │  │  📍 Location                │ │
│  │  [Send Message]       │  │                             │ │
│  │                       │  │  Office Hours               │ │
│  │                       │  │  Mon-Fri, 9am-6pm           │ │
│  └──────────────────────┘  └──────────────────────────────┘ │
│                                                             │
│  [FAQ section below: common pre-sales questions]            │
└─────────────────────────────────────────────────────────────┘
```

**Animations:**
- Form fields: Focus ring animation + label float
- Submit button: Loading spinner → success checkmark animation
- Contact cards: Staggered fade-in from right

---

## PHASE 7: Additional Pages & Polish (Week 9-11)

### 7.1 Blog/Resources Hub (NEW PAGE — if needed)
**Inspired by:** KnowledgeHut blog + Vercel blog

- Grid of article cards with category filters
- Featured article hero
- Search functionality
- Tags/categories with animated filter transitions

### 7.2 About Page (NEW PAGE — if needed)
- Company story with timeline
- Team section with photo cards
- Mission/Vision/Values with icon cards
- Stats section with animated counters

### 7.3 Legal Pages (Privacy, Terms, Refund, Cookies)
- Clean typographic layout
- Table of contents with smooth scroll anchors
- Minimal animations — just section fade-ins

### 7.4 404 Page
- Creative illustration or animation
- Search suggestion
- Quick links to main pages
- Playful copy

---

## PHASE 8: Final Polish & Performance (Week 11-12)

### 8.1 Accessibility Audit
- [ ] All interactive elements keyboard navigable
- [ ] ARIA labels on custom components
- [ ] Color contrast ratios (4.5:1 body, 3:1 headings)
- [ ] Screen reader testing
- [ ] Focus visible indicators
- [ ] `prefers-reduced-motion` respected everywhere

### 8.2 Performance Optimization
- [ ] Lighthouse score > 90 on all pages
- [ ] LCP < 2.5s on all pages
- [ ] INP < 200ms
- [ ] CLS < 0.1
- [ ] Bundle analysis — remove unused code
- [ ] Image optimization audit (all using next/image)
- [ ] Font loading optimization (display: swap, preload)
- [ ] 3D components lazy-loaded

### 8.3 SEO
- [ ] Metadata on all pages (title, description, og:image)
- [ ] Structured data (Course schema, Organization schema)
- [ ] Sitemap generation
- [ ] robots.txt
- [ ] Canonical URLs

### 8.4 Cross-Browser & Device Testing
- [ ] Chrome, Firefox, Safari, Edge
- [ ] iOS Safari, Android Chrome
- [ ] Desktop: 1280px, 1440px, 1920px
- [ ] Tablet: 768px, 1024px
- [ ] Mobile: 375px, 390px, 414px

### 8.5 Micro-Interactions Audit
- [ ] All buttons have hover/active states
- [ ] Links have hover underline animations
- [ ] Form inputs have focus animations
- [ ] Loading states have skeleton/shimmer effects
- [ ] Toasts/notifications have entrance/exit animations
- [ ] Scroll-to-top button with smooth animation

---

## Component Shopping List

### From shadcn/ui (install via CLI):
- Accordion, Button, Card, Dialog, Dropdown Menu, Input, Label, Navigation Menu, Select, Separator, Sheet (mobile nav), Tabs, Textarea, Toast, Tooltip

### From Aceternity UI (copy-paste):
- `floating-navbar` — animated sticky nav
- `bento-grid` — program cards layout
- `hero-highlight` — gradient text highlight
- `3d-card` — interactive tilt cards
- `animated-testimonials` — cycling testimonials
- `sparkles` — sparkle text/button effect
- `text-generate-effect` — typewriter text reveal
- `background-beams` — subtle background effect
- `moving-border` — animated border button
- `infinite-moving-cards` — auto-scrolling card carousel

### From Magic UI (copy-paste):
- `marquee` — infinite scrolling logo/testimonial bar
- `animated-gradient-text` — gradient text animation
- `number-ticker` — animated counter
- `hero-video-dialog` — video modal for program previews
- `dock` — macOS-style navigation (optional)
- `blur-fade` — blur-to-clear entrance animation
- `particles` — lightweight particle background
- `shimmer-button` — shimmer CTA button

### From 21st.dev (browse & install):
- Hero section variants (284 options to choose from)
- Pricing section components (49 options)
- Footer components (14 options)
- Specific Framer Motion components (108 tagged)

---

## Timeline Summary

| Phase | Scope | Duration | Priority |
|-------|-------|----------|----------|
| **Phase 1** | Foundation & Design System | Week 1-2 | 🔴 Critical |
| **Phase 2** | Global Layout (Navbar, Footer, Transitions) | Week 2-3 | 🔴 Critical |
| **Phase 3** | Homepage (9 sections) | Week 3-5 | 🔴 Critical |
| **Phase 4** | Programs Pages (Hub + 4 program pages) | Week 5-7 | 🟡 High |
| **Phase 5** | Universities Page | Week 7-8 | 🟡 High |
| **Phase 6** | Application & Contact Pages | Week 8-9 | 🟡 High |
| **Phase 7** | Additional Pages & New Content | Week 9-11 | 🟢 Medium |
| **Phase 8** | Polish, Performance, A11y, SEO | Week 11-12 | 🔴 Critical |

---

## Key Design Principles

1. **Dark premium aesthetic** with strategic light sections for contrast
2. **Content-first** — animations enhance, never distract from the message
3. **Performance-obsessed** — only GPU-accelerated animations, lazy-load heavy components
4. **Conversion-optimized** — CTAs visible at every scroll depth, trust signals prominent
5. **Mobile-first** — every section must work beautifully on 375px
6. **Accessible** — keyboard navigable, screen reader friendly, reduced motion support
7. **Consistent** — same animation patterns, timing, and easing across the entire site
8. **Progressive disclosure** — don't overwhelm, reveal information as user needs it

---

*Research base: KnowledgeHut.com, Coursera, MasterClass, Brilliant.org, Duolingo, Codecademy, Udacity, Skillshare, Pluralsight, DataCamp, Scrimba, Frontend Masters, Educative.io, Boot.dev, Linear.app, Vercel.com, Stripe.com, Notion.so, Figma.com, Framer.com, Supabase.com, Railway.app, Resend.com, Cal.com, Clerk.dev, Apple.com, Lottie/Airbnb, Awwwards winners, GSAP showcases, 21st.dev, Aceternity UI, Magic UI, shadcn/ui, Syntax UI, Hover.dev, Eldora UI, Animata*
