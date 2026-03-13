# TECHVERSITY.AI — Full Website Audit Report

> Reviewed: Every page, every section, every component.
> Date: March 13, 2026
> Total Issues Found: **50+**

---

## SEVERITY LEGEND

| Level | Meaning |
|-------|---------|
| **CRITICAL** | Site-breaking or could damage business/users |
| **MAJOR** | Significantly hurts UX, performance, or quality |
| **MINOR** | Noticeable flaw that should be fixed |
| **NITPICK** | Polish item, low priority |

---

## CRITICAL ISSUES (5)

### 1. Forms Don't Actually Submit Data
**Pages:** `/apply`, `/contact`
**Problem:** Both forms only `console.log()` the data and show a fake success message. No API call, no email, no backend. Users think they submitted an application but **nothing happens**. This is the most damaging bug on the entire site.

### 2. No Page-Level SEO Metadata
**Pages:** ALL subpages (apply, contact, programs, universities, privacy, terms, refund, cookies)
**Problem:** None of these pages export a `metadata` object. Every page shows the same browser tab title "Techversity.ai | Powering the Techverse of Tomorrow". Google sees 12+ pages with identical title/description. **Terrible for SEO.**

### 3. "use client" on Static Pages Blocks Metadata
**Pages:** privacy, terms, refund, cookies
**Problem:** These are pure text pages but marked `"use client"`. In Next.js, you **cannot export `metadata`** from client components. These should be server components — they have zero interactivity.

### 4. Apply Page Shows Raw Slug in Review Step
**Page:** `/apply` (step 4 — review)
**Problem:** The review step displays `honorary-doctorate` instead of "Honorary Doctorate". The raw form value is shown, not a human-readable label.

### 5. No Cookie Consent Banner
**Problem:** The cookie policy page describes analytics cookies, but there's **no actual consent banner** anywhere. This violates GDPR if serving EU users.

---

## PAGE-BY-PAGE REVIEW

---

### HOME PAGE (`/`)

#### Hero Section
| Aspect | Rating | Notes |
|--------|--------|-------|
| Design | Good | Clean gradient bg, mouse parallax orbs, word-by-word reveal |
| Layout | Good | Centered, proper spacing after navbar fix |
| **Bug** | **MAJOR** | FloatingShape component renders an **empty inner div** — the floating up/down animation applies to a child with no dimensions. The shapes don't actually float. |
| **Bug** | **MINOR** | Mouse tracking runs even on mobile/touch devices — wasted performance |
| **Design** | MINOR | 18 spring animations running per frame (6 shapes + 6 orbs) — heavy on low-end devices |
| Content | NITPICK | "98% Acceptance Rate" is unusually high and may reduce credibility |
| Content | MINOR | "Book a Free Call" with Play icon suggests a video, but links to contact form |

#### Programs Section
| Aspect | Rating | Notes |
|--------|--------|-------|
| Design | Good | Clean 2-col grid with glassmorphism cards |
| Layout | Good | Proper centering and padding |
| **Design** | MINOR | "Coming Soon" card is dimmed but still has hover glow effect — confusing |
| Content | Good | Icons, duration, format badges work well |

#### How It Works Section
| Aspect | Rating | Notes |
|--------|--------|-------|
| Design | Good | Clean vertical timeline with numbered steps |
| Layout | Good | Centered in max-w-4xl |
| **Design** | NITPICK | Timeline line fades to transparent — can disappear before reaching next step on tall cards |
| Performance | MINOR | 5 separate IntersectionObserver instances (one per step) |

#### Why Us Section
| Aspect | Rating | Notes |
|--------|--------|-------|
| Design | Good | Split layout with sticky heading |
| Layout | Good | Grid works well on desktop |
| **Content** | NITPICK | "98%" and "4hrs" stats duplicate Hero values — should use shared constants |
| **Design** | MINOR | 8 items all animate from x:30 one by one — feels slow on low connections |

#### Universities Section
| Aspect | Rating | Notes |
|--------|--------|-------|
| Design | Okay | Globe is decorative but not convincing |
| **Bug** | MINOR | CSS longitude lines (`rotateY`) render as flat ovals, not a real globe wireframe |
| **Bug** | MINOR | Marker positions are hardcoded and **don't match** actual university coordinates |
| **Bug** | MINOR | Only 4 hardcoded positions — adding a 5th university would crash the component |
| Layout | Good | Cards grid is clean |

#### FAQ Section
| Aspect | Rating | Notes |
|--------|--------|-------|
| Design | Good | Clean accordion with left heading |
| Layout | Good | 5-col grid split works |
| **Code** | MINOR | Uses array index as React key — should use question text |
| Interaction | Good | Smooth height animation on open/close |

#### Final CTA Section
| Aspect | Rating | Notes |
|--------|--------|-------|
| Design | Good | Aurora background, shimmer text |
| **Content** | **MAJOR** | "Apply Now — It's Free" is misleading. The APPLICATION is free but the service charges advisory fees. Could be seen as deceptive. |
| Layout | Good | Centered with proper padding |

---

### APPLY PAGE (`/apply`)

| Aspect | Rating | Notes |
|--------|--------|-------|
| **Bug** | **CRITICAL** | Form only console.logs — doesn't send data anywhere |
| **Bug** | **CRITICAL** | Review step shows raw slug "honorary-doctorate" not readable label |
| Design | Okay | Multi-step wizard with progress indicator |
| **Design** | MINOR | Progress step connectors hidden on mobile — users see 4 disconnected circles |
| **Bug** | MINOR | Native `<select>` dropdown on dark background — unreadable on some browsers (white bg, dark text) |
| **Bug** | MINOR | Phone field accepts any 5+ character string — "abcde" passes validation |
| **Design** | MINOR | Country is free text — should be a dropdown for data quality |
| **Design** | MINOR | No loading/disabled state on submit button |

---

### CONTACT PAGE (`/contact`)

| Aspect | Rating | Notes |
|--------|--------|-------|
| **Bug** | **CRITICAL** | Form only console.logs — doesn't send data |
| Design | Okay | Clean form layout |
| **Bug** | MINOR | After submit success, no "Send Another" button — must reload page |
| **Design** | MINOR | No loading state on submit button |

---

### PROGRAMS INDEX (`/programs`)

| Aspect | Rating | Notes |
|--------|--------|-------|
| Design | Good | Card grid layout |
| **Bug** | MINOR | All cards animate at once because `useInView` triggers on the full section |
| **Bug** | MINOR | "Coming Soon" badge may be clipped by Card's `overflow-hidden` |

---

### PROGRAM DETAIL PAGES (`/programs/honorary-doctorate`, `/programs/dba`, `/programs/phd`)

| Aspect | Rating | Notes |
|--------|--------|-------|
| Design | Good | Consistent template via ProgramPage component |
| **Design** | MINOR | 70vh hero can overflow on mobile with all content |
| **Bug** | MINOR | Timeline connecting line uses `h-full` in flexbox — may not render correctly |
| **Design** | MINOR | No breadcrumb navigation — user can't go back to /programs easily |
| **Design** | NITPICK | Final CTA section has no animation unlike every other section |
| **Code** | NITPICK | `accentGradient` field defined in data but never used |

---

### UNIVERSITIES PAGE (`/universities`)

| Aspect | Rating | Notes |
|--------|--------|-------|
| Design | Good | Clean card layout |
| **Design** | MINOR | "Apply to {name}" buttons all go to /apply without pre-selecting the university |

---

### LEGAL PAGES (`/privacy`, `/terms`, `/refund`, `/cookies`)

| Aspect | Rating | Notes |
|--------|--------|-------|
| **Bug** | **MAJOR** | Privacy page uses `prose prose-invert` class but `@tailwindcss/typography` plugin is **not installed** — classes may not work |
| **Bug** | MINOR | Privacy page uses `prose prose-invert`, other legal pages don't — inconsistent styling |
| **Code** | MAJOR | All marked `"use client"` unnecessarily — pure static text, should be server components |
| **Content** | NITPICK | No internal cross-links (privacy mentions cookie policy but doesn't link to it) |
| **Content** | MINOR | Refund policy is thin — no mention of processing fees, currency, or dispute process |

---

## LAYOUT & UI COMPONENTS

### Navbar
| Issue | Severity | Details |
|-------|----------|---------|
| **Performance** | **MAJOR** | Scroll handler re-attaches on every scroll event (stale closure with `lastScrollY` in deps) |
| **Accessibility** | **MAJOR** | Dropdowns only work on mouse hover — keyboard users cannot open them. No aria attributes. |
| **Bug** | MINOR | Dropdown has `mt-2` gap — mouse can fall through the gap and close the dropdown |
| **Bug** | MINOR | Logo text width animation causes layout reflow — should use opacity/transform |
| **Accessibility** | MINOR | Mobile menu has no focus trap |

### Footer
| Issue | Severity | Details |
|-------|----------|---------|
| **Bug** | MINOR | Marquee animates to -1920px — wrong on wider/narrower screens |
| Design | NITPICK | 80-120px marquee text is very large and pushes footer content down |

### Preloader
| Issue | Severity | Details |
|-------|----------|---------|
| **Performance** | **MAJOR** | 2.8 second forced wait before ANY content is visible. Terrible for bounce rate. |
| **Bug** | MINOR | Progress bar is fake — deterministic increment, not actual load progress |

### PageTransition
| Issue | Severity | Details |
|-------|----------|---------|
| **Performance** | MAJOR | Combined with Preloader = 3.2 seconds before content is interactive on home page |

### Button Component
| Issue | Severity | Details |
|-------|----------|---------|
| **Bug** | **MAJOR** | `onClick` is NOT passed to Link variant — mobile menu "Apply Now" doesn't close the menu |
| **Bug** | MINOR | `ref` forwarding ignored for link variant |

### Card Component
| Issue | Severity | Details |
|-------|----------|---------|
| **Bug** | **MAJOR** | `useTransform` hook called inside JSX `style` prop — violates Rules of Hooks |
| Performance | MINOR | Tilt effect runs on mobile/touch devices |

### CustomCursor
| Issue | Severity | Details |
|-------|----------|---------|
| **Accessibility** | **MAJOR** | Hides native cursor globally (`cursor: none`). Users with motor impairments lose their system cursor. Custom cursor can become invisible with `mix-blend-difference` on certain backgrounds. |
| **Bug** | MINOR | Touch detection gives false positives on touchscreen laptops |

### TextReveal
| Issue | Severity | Details |
|-------|----------|---------|
| **Security** | **MAJOR** | Uses `innerHTML` directly — potential XSS if content is ever dynamic |
| **Code** | MINOR | Not imported anywhere — dead code |

### GradientText
| Issue | Severity | Details |
|-------|----------|---------|
| **Code** | MINOR | Not imported anywhere — dead code |

---

## PERFORMANCE ISSUES

1. **Preloader + PageTransition = 3.2s delay** before content is visible on home
2. **Three.js packages installed but unused** — ~600KB wasted in node_modules
3. **18 spring animations** running continuously in Hero section
4. **Navbar scroll listener** re-attaches on every scroll (hundreds of times per scroll)
5. **MagneticElement** uses `useState` (causes re-renders) instead of `useMotionValue`
6. **All pages are "use client"** — no static generation, larger JS bundles

---

## ACCESSIBILITY ISSUES

1. **Custom cursor hides native cursor** — motor impairment users affected
2. **Navbar dropdowns keyboard-inaccessible** — no aria attributes, no keyboard open/close
3. **Mobile menu has no focus trap** — Tab key escapes to background elements
4. **No skip-to-content link** for screen reader users
5. **Decorative elements not marked `aria-hidden`** (dot grids, marquee, floating shapes)
6. **Form labels may not be properly associated** — need to verify `htmlFor`/`id` pairing
7. **`prefers-reduced-motion` rule is too aggressive** — sets all animations to 0.01ms which can cause flash artifacts

---

## SUMMARY COUNTS

| Severity | Count |
|----------|-------|
| CRITICAL | 5 |
| MAJOR | 13 |
| MINOR | 30+ |
| NITPICK | 10+ |

---

## TOP 10 PRIORITIES TO FIX

1. **Connect forms to a backend** (apply + contact) — nothing works without this
2. **Add page metadata/SEO** to every subpage
3. **Remove "use client" from static pages** (legal pages) so metadata can be exported
4. **Fix Button onClick for link variant** — mobile menu doesn't close
5. **Fix Card useTransform hook** — Rules of Hooks violation
6. **Reduce preloader to 1s max** or remove entirely
7. **Fix apply page review step** — show readable program names, not slugs
8. **Fix Navbar scroll handler** — use ref instead of state for lastScrollY
9. **Add cookie consent banner** for GDPR compliance
10. **Remove unused packages** (three.js, react-three-fiber, react-three-drei)
