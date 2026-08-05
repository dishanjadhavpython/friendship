# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/happy-friendship-day/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Happy Friendship Day
**Generated:** 2026-08-02 (synthesized manually from ui-ux-pro-max — see note below)
**Category:** Personal / Immersive Storytelling Experience
**Design Dials:** Variance 7/10 (Balanced / Modern) | Motion 7/10 (Standard) | Density 3/10 (Spacious)

> **Note on provenance:** the first `--design-system` run (query: "friendship day celebration ... cinematic") returned **Modern Dark (Cinema Mobile)** — a near-black, indigo-glow style keyed to "Developer tools, fintech dashboards, streaming platforms." That's a mismatch for a warm personal tribute; "cinematic" pulled in dev-tool associations. This file replaces that draft with a synthesis from several follow-up `--domain` queries (`style`, `color`, `typography`, `gsap`, `landing`, `ux`, `icons`, `--stack react`) run with warmer, more accurate keywords. Query log:
> - `--domain style "joyful colorful celebration warm playful vibrant personal storytelling scrapbook"` → **Parallax Storytelling** pattern selected (full-screen chapters, progressive disclosure) over Memphis/Aurora/Glassmorphism/Bento alternatives
> - `--domain color "warm sunset golden joyful friendship celebration optimistic"` + `"vibrant party celebration multicolor confetti festive"` → warm terracotta/amber/rose anchors
> - `--domain typography "warm friendly personal celebratory expressive"` → **Handwritten Charm** (Caveat + Quicksand) selected over Playful/Soft-Rounded/Kids/Friendly-SaaS alternatives
> - `--domain landing "personal narrative story one at a time chapters celebration"` → **Scroll-Triggered Storytelling** (chapters, "each chapter has distinct color", progress indicator)
> - `--domain gsap "full screen story chapters sequential one at a time reveal"` → Standard Scroll Reveal tier (stagger 0.06–0.08, power2.out, 400–600ms)
> - `--domain ux "keyboard navigation swipe gesture full screen sections reduced motion"` → reduced-motion + keyboard-nav are High severity; avoid scroll-jacking (`ScrollTrigger.create()` flagged as a motion-sickness anti-pattern)
> - `--domain icons "navigation arrows minimal outline"` → Phosphor Icons, outline weight
> - `--stack react "component architecture animation performance"` → small focused components, profile before optimizing

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Background | `#FFFBF3` | `--color-cream` | Page background (light mode only — no dark mode) |
| Background (soft) | `#FFF6E8` | `--color-cream-soft` | Rarely used alt surface |
| Foreground | `#2B1B12` | `--color-espresso` | Body text, headings |
| Foreground (muted) | `#6B5B4F` | `--color-espresso-soft` | Subtitles, secondary text |
| Border | `#EFE1CC` | `--color-line` | Hairline separators |
| Brand / Primary | `#D97706` | `--color-amber` | Hero title accent, primary CTA, links, focus ring |
| Brand (hover) | `#B45309` | `--color-amber-dark` | CTA hover state |

**Chapter accent rotation** — each friend is auto-assigned the next color below (cycling); override per-friend via the `accent` field in `src/data/friends.ts`. This directly implements the landing pattern's "each chapter has distinct color, progressive reveal":

| Name | Hex | Order |
|------|-----|-------|
| terracotta | `#C2410C` | 1 |
| rose | `#E11D48` | 2 |
| sage | `#059669` | 3 |
| teal | `#0E7490` | 4 |
| plum | `#A21CAF` | 5 |
| sunset | `#DB2777` | 6 (also the Closing slide's accent) |
| gold | `#CA8A04` | 7 |

**Color notes:** warm editorial cream + amber, no dark mode — this is a daytime-celebration palette, not the dark/cinematic style the raw tool output first suggested.

### Typography

- **Display/script accent:** Caveat (600–700) — hero "Happy", each chapter's fun title, closing signature. Used sparingly, never for body copy.
- **Body/UI:** Quicksand (400–700) — everything else (headings, paragraphs, chips, buttons).
- **Mood:** handwritten, personal, warm, invitation-like — deliberately not a generic SaaS sans (Inter/Manrope) throughout, which is what most AI-generated sites default to.
- **Google Fonts:** `https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Quicksand:wght@400;500;600;700&display=swap` (loaded via `<link>` in `index.html`, not `@import`, to avoid a render-blocking CSS request)

### Spacing

Density 3/10 (Spacious) — generous whitespace, one idea per screen (each chapter is a full `100dvh` section). No fixed spacing scale was hand-authored; Tailwind's default scale is used directly since v4's utilities already cover this range.

### Shadows

Soft, accent-tinted shadows rather than neutral gray — e.g. the CTA button uses `shadow-amber-600/30`, and each avatar/photo casts a shadow tinted with its own chapter accent (`${accent}55`) rather than a generic black shadow. This is a deliberate "not generic" choice: neutral drop shadows are one of the most common AI-template tells.

---

## Component Specs (as implemented)

### Buttons (`.hero-cta`, `.closing-restart`)

```css
/* Primary — Hero CTA */
background: var(--color-amber);
color: white;
border-radius: 9999px; /* full pill */
padding: 1rem 2rem;
font-weight: 600;
box-shadow: 0 ... rgba(amber, 0.3);
transition-property: background-color, box-shadow; /* NEVER opacity/transform — see Motion note */
```

```css
/* Secondary — Closing restart */
background: transparent;
border: 1px solid color-mix(espresso, 20% opacity);
color: var(--color-espresso-soft);
border-radius: 9999px;
transition-property: color, border-color, background-color; /* transition-colors */
```

### Avatar / photo frame (`Avatar.tsx`)

Organic "blob" shape via `border-radius: 63% 37% 54% 46% / 43% 47% 53% 57%` (and a mirrored variant, alternating by chapter index) instead of a plain rounded rectangle or circle — a deliberate signature motif, chosen specifically to avoid the generic-rounded-square-photo look. Falls back to a chapter-accent-colored initials avatar when no photo is set or the image fails to load — the site should look intentional before any photos are added, not broken.

### Skill chip (`SkillChip.tsx`)

Pill, 1px accent-tinted border, accent text on a very light accent-tinted fill (`${accent}14` background, `${accent}55` border) — never a flat gray badge.

### Progress indicators (`Progress.tsx`)

Two responsive variants, not one compromise:
- **Desktop (`md:` and up):** vertical dot rail, fixed right edge, one dot per chapter in that chapter's accent.
- **Mobile:** Instagram/Snapchat-Stories-style segmented bar across the top, filling as you progress.

---

## Style Guidelines

**Style:** Warm Editorial Storytelling (custom synthesis — not a single catalog entry)

**Keywords:** warm, cream, handwritten accents, organic shapes, full-screen chapters, progressive color per chapter, confetti celebration, daytime/light-only

**Best for:** personal tributes, invitations, celebration microsites, narrative portfolios — explicitly *not* the dashboard/fintech/dev-tool territory the raw "cinematic" query first suggested.

**Key effects:** `expo.out` for hero/closing entrances, `power2.out` for chapter content stagger (both drawn from the gsap domain search); soft accent-tinted blurred blobs + upward-drifting dot particles for ambient motion; confetti burst (canvas-confetti) on entering the story and on reaching the closing slide.

### Page Pattern

**Pattern name:** Scroll-Triggered Storytelling (landing domain), implemented via **discrete full-screen chapters** rather than continuous scrub/pin parallax.

- **Why not true parallax:** the `style` domain flags Parallax Storytelling as Performance ❌ Poor / Accessibility ❌ Poor (motion), and the `ux` domain separately flags `ScrollTrigger.create()`-driven scroll-jacking as a motion-sickness anti-pattern. CSS `scroll-snap-type: y mandatory` gives the same "one chapter at a time" feel natively — free swipe on mobile, free wheel/trackpad on desktop, no scroll-jacking, works with `prefers-reduced-motion` by just dropping to `scroll-snap-type: none`.
- **Section order:** Hero (celebration) → one full-screen chapter per friend, in `src/data/friends.ts` order → Closing (thank-you + recap).
- **CTA placement:** Hero's "Meet the Crew" button (also triggers the first confetti burst) + a persistent low-key "next" hint per chapter + a "Back to the top" ghost button on Closing.
- **Color strategy:** progressive — each chapter shifts to its own accent (see rotation above), tying the desktop dot rail / mobile progress bar / avatar glow / skill chips / story eyebrow all to one color per chapter.

---

## Motion

**Entrance stagger** (Hero and each Chapter, on becoming active) — Standard tier from the gsap domain search:

```js
gsap.timeline({ defaults: { ease: "power2.out" } })
  .from(".chapter-eyebrow", { opacity: 0, y: 16, duration: 0.45 })
  .from(".chapter-avatar",  { opacity: 0, scale: 0.92, y: 24, duration: 0.55 }, "-=0.25")
  .from(".chapter-name",    { opacity: 0, y: 20, duration: 0.5 }, "-=0.35")
  // ...title, skills (stagger 0.06), story, footer
```

Hero uses `expo.out` instead (a slightly more premium/decisive feel for the one-time grand entrance vs. the repeatable chapter reveals).

**Reduced motion:** every timeline is wrapped in `gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", ...)` — under reduced motion, content renders at its final state with no animation at all (not just "shorter"), confetti never fires, and `.story` drops `scroll-snap-type` to `none`. Verified in-browser with Playwright's `reducedMotion: "reduce"` emulation.

**Hard-won rule — do not add CSS `transition-*` classes on `opacity`/`transform` to any element a GSAP timeline also targets.** The Hero CTA originally had `transition-all hover:-translate-y-0.5`; the always-on CSS transition fought GSAP's per-frame inline `opacity`/`transform` writes on load and left the button permanently stuck at its pre-animation state (opacity: 0). Fixed by scoping its transition to `background-color, box-shadow` only. If you add a new interactive element inside an animated section, scope its hover transition to color/shadow/filter properties, never `transform`/`opacity`/`all`.

---

## Anti-Patterns (Do NOT Use)

- ❌ Corporate templates, generic SaaS layouts
- ❌ Dark mode / cinematic glow (rejected during design-system selection — wrong mood for this brief)
- ❌ Emojis as icons — use SVG (this project uses `@phosphor-icons/react`)
- ❌ Missing `cursor-pointer` on clickable elements
- ❌ `transition-all`/`transition-transform` on any element also driven by a GSAP tween (see Motion note above)
- ❌ Low contrast text — maintain 4.5:1 minimum (espresso-on-cream and white-on-amber both verified well above this)
- ❌ Instant state changes — always transition (150–300ms)
- ❌ Invisible focus states — this project sets a global `:focus-visible` amber outline

---

## Pre-Delivery Checklist

- [x] No emojis used as icons (Phosphor SVG icons only)
- [x] `cursor-pointer` on all clickable elements
- [x] Hover states with smooth transitions (150–300ms), scoped to non-GSAP properties
- [x] Text contrast 4.5:1 minimum (espresso `#2B1B12` on cream `#FFFBF3`; white on amber `#D97706`)
- [x] Focus states visible for keyboard navigation (`:focus-visible` global rule)
- [x] `prefers-reduced-motion` respected (GSAP matchMedia + CSS media query + confetti gate)
- [x] Responsive: verified at 375–390px (mobile) and 1440px (desktop) with Playwright
- [x] No content hidden behind fixed navbars (progress bar/rail are small and non-blocking)
- [x] No horizontal scroll on mobile
- [x] Semantic HTML (`main`, `section[aria-labelledby]`, sequential `h1`→`h2`)
