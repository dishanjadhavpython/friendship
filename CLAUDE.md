# Happy Friendship Day

A one-page interactive site: a celebration hero, then one full-screen "chapter"
per friend (photo, title, skills, story), then a closing thank-you. Built as a
personal gift/tribute — the whole point is that friends get added by editing
one data file, not by touching components.

See [PLAN.md](PLAN.md) for project status and content checklist, and
[design-system/happy-friendship-day/MASTER.md](design-system/happy-friendship-day/MASTER.md)
for the full design rationale (colors, type, motion, and *why* — generated with
the `ui-ux-pro-max` skill, then hand-corrected where the raw tool output
mismatched the brief).

## Adding or editing a friend

Edit **`src/data/friends.ts`** only. Each array entry is one friend:

```ts
{
  name: "Priya Sharma",
  title: "The One Who Remembers Everything",
  image: "priya.jpg",       // optional — filename in public/friend-images/
  accent: "teal",           // optional — omit to auto-rotate through the palette
  profession: "doctor",     // optional — see src/data/professions.ts for keys; adds a badge + icon background
  skills: ["Emergency taxi", "Unofficial therapist", "Meme curator"],
  story: "How you met, an inside joke, what makes them them...",
  funFact: "Has never once shown up on time.",
  sinceYear: 2016,          // optional — shows "N years of friendship"
}
```

To add a photo: drop the image file into `public/friend-images/` and set
`image` to its filename. No photo yet is fine — a styled initials avatar in
that chapter's color is shown automatically and looks intentional, not broken.

`story` can be in any language/script — it's rendered with a Devanagari font
fallback (see Structure below) specifically because the current content is in
Marathi. If you add content in another non-Latin script, you'll likely need to
add that script's Google Font to the `index.html` link tag and to the
`--font-sans` fallback chain in `src/index.css`, the same way.

To add a new profession (beyond the ones already in `src/data/professions.ts`):
add a key with a `label` and a Phosphor icon import — `ChapterSlide` picks up
the badge and background icon pattern automatically from that one entry.

Site-wide copy (hero title/subtitle, closing message) lives in
`src/data/site.ts`.

Both files are plain data — no other file needs to change to add a friend, and
the story adds a new full-screen chapter (with its own accent color, progress
dot, and mobile progress-bar segment) automatically.

## Stack

Vite + React 19 + TypeScript (strict) + Tailwind CSS v4 (CSS-first `@theme`
config, no `tailwind.config.js`) + GSAP (`@gsap/react`'s `useGSAP` hook) +
`@phosphor-icons/react` + `canvas-confetti`. No router, no backend — everything
is one client-side page.

## Theme (light / punk-neon dark)

A toggle in the top-left (`ThemeToggle.tsx`) flips `<html class="dark">` via
`ThemeProvider`/`useTheme()` (`src/lib/theme.tsx`), persisted to
`localStorage`. It's a manual toggle, not a `prefers-color-scheme` follower —
**defaults to dark** on a first visit (no stored preference); once toggled,
the explicit choice (either direction) is remembered on future visits.

Two mechanisms handle re-theming, matched to how each color is used elsewhere:

1. **Tailwind-class tokens** (`bg-cream`, `text-espresso`, `bg-amber`, etc.):
   `.dark { --color-cream: ...; }` in `index.css` redefines the same `@theme`
   variables. Because Tailwind v4 utilities reference these as real CSS
   variables (not compile-time values), every existing `bg-cream`/`text-espresso`
   usage across the app re-themes automatically — no component changes needed.
2. **Per-friend dynamic accents** (inline `style={{ color: accent }}`, which
   Tailwind can't see to begin with — see below): `src/data/accents.ts` has
   `ACCENTS` (warm, light) and `ACCENTS_DARK` (punk neon) sharing the same keys.
   `accentFor(key, index, theme)` resolves the right hex for the current theme;
   `App.tsx` passes `theme` (from `useTheme()`) into every `accentFor` call.

Neon glow (`src/lib/glow.ts` — `glowBox`/`glowText`) returns `undefined` in
light mode and a multi-layer colored shadow in dark mode, so it can be spread
into any `style` object with no branching at the call site. Components that
need it call `useTheme()` themselves (Context, not prop-drilled) — see
`SkillChip`, `ProfessionBadge`, `Avatar`, `ScrollHint`, `Progress`,
`ChapterSlide`, `Hero`, `ClosingSlide`. `confetti.ts`'s `celebrate(theme)`
swaps its palette the same way.

The neon palette + "avoid pure #000000 (OLED smear), glow via text/box-shadow,
use sparingly on body text" approach came from `ui-ux-pro-max`'s style/ux
domains (queried for "punk neon cyberpunk dark glow") — see MASTER.md. Fonts
(Caveat/Quicksand) deliberately stay the same in both themes even though the
raw tool output suggested Orbitron/JetBrains Mono for cyberpunk — swapping
fonts too would make light/dark feel like two unrelated sites rather than one
identity with two moods.

## Background music

`MusicPlayer.tsx` (next to the theme toggle) is a play/pause button wired to
a hidden `<audio loop>` pointed at `public/song/`. It does **not** autoplay —
browsers block audio-with-sound before a user gesture anyway, and it's bad
manners to blast music on load regardless. To change the track, drop a new
file in `public/song/` and update `SONG_SRC` in `MusicPlayer.tsx`.

## Deployment (AWS via Terraform) — live

**https://doa7onstlwg0s.cloudfront.net**

`terraform/` provisions a private S3 bucket (`happy-friendship-day-f16eed16`)
+ CloudFront distribution (`E1DGFUISR452UD`, Origin Access Control, not the
deprecated OAI) hosting the built site — `npm run build`'s `dist/` output,
not the source. No custom domain is wired up; the live URL is CloudFront's
own `*.cloudfront.net` domain. See the comment in `outputs.tf` for how to add
a real domain later (ACM cert in us-east-1 + `aliases` + Route53).

Credentials live in `.env` at the project root (gitignored — `AWS_ACCESS_KEY_ID`
/ `AWS_SECRET_ACCESS_KEY` / `AWS_ACCOUNT_ID` / region vars). Terraform's AWS
provider (`provider.tf`) doesn't hardcode them; source `.env` into the shell
before any `terraform`/`aws` command:

```bash
set -a && source .env && set +a
```

`terraform/terraform.tfvars` (gitignored) sets `expected_account_id` from
`.env`'s `AWS_ACCOUNT_ID`. `checks.tf`'s `check` block compares the
authenticated account against it on every plan/apply and fails fast (clear
error, not a silent wrong-account deploy) if they don't match.

**To push a content update live** (after adding/editing a friend, for
example), from the project root:

```bash
set -a && source .env && set +a && ./deploy.sh
```

This rebuilds and re-syncs `dist/` to S3 and invalidates the CloudFront
cache. Re-run it after every content change.

**Infra changes** (rare — this is for editing `terraform/*.tf` itself, not
content): `cd terraform`, source `.env` the same way, then the usual
`terraform plan` / `terraform apply`. `terraform destroy` tears everything
down; CloudFront distributions take a few minutes to create/destroy either
way — that's normal, not a hang (creation took ~3 minutes here).

**Verified end-to-end**, not just "should work": `fmt`/`init`/`validate`
clean, `plan` reviewed before `apply` (which needed your explicit
confirmation — it creates real, billable resources), `apply` completed with
0 errors, and the live CloudFront URL was checked with Playwright afterward
(hero + a chapter's photo render correctly, zero console errors, zero
failed/4xx/5xx requests) — not just assumed from the AWS CLI's "success" output.

**Verified so far** (still no actual AWS credentials in this environment):
`terraform fmt`, `init`, and `validate` all pass — the configuration,
including the new account-ID guard, is syntactically and internally correct.
`terraform plan` gets exactly as far as it did before adding the guard —
planning the credential-independent `random_id.bucket_suffix` resource, then
failing on `No valid credential sources found` — confirming the guard didn't
introduce any new error, and that missing authentication remains the only
blocker.

## Structure

```
src/
  data/
    friends.ts       — the file you actually edit
    site.ts           — hero/closing copy
    accents.ts         — light + dark(neon) accent palettes, accentFor(key, index, theme)
    professions.ts       — profession → {label, Phosphor icon} lookup
  components/
    Hero.tsx            — celebration intro + confetti-triggering CTA
    ChapterSlide.tsx     — one friend's full-screen chapter
    ClosingSlide.tsx      — thank-you + recap + confetti
    Avatar.tsx             — photo w/ organic blob frame, falls back to initials
    SkillChip.tsx            — accent-colored skill pill
    ProfessionBadge.tsx       — profession icon + label (solid in light, glow outline in dark)
    ProfessionPattern.tsx      — that profession's icon scattered behind the chapter
    Progress.tsx               — ProgressRail (desktop) + ProgressBar (mobile, Stories-style)
    ScrollHint.tsx               — floating/inline "next" affordance
    AmbientBackground.tsx         — decorative blurred blobs + drifting particles (hero/closing only)
    ThemeToggle.tsx                — light/dark toggle button
    MusicPlayer.tsx                 — play/pause button for the background track
  hooks/
    useStoryNavigation.ts   — scroll-snap chapter tracking, keyboard nav, goTo/next/prev
    useReducedMotion.ts      — reactive prefers-reduced-motion
  lib/
    theme.tsx                — ThemeProvider/useTheme (Context + localStorage + <html class="dark">)
    glow.ts                   — glowBox/glowText: dark-mode-only shadow helpers
    confetti.ts                 — canvas-confetti wrapper, theme-aware palette, reduced-motion-gated
    css-vars.ts                   — TS helper type for CSS custom properties in style props
public/
  friend-images/                — drop friend photos here
  song/                            — background track (MusicPlayer.tsx reads SONG_SRC from here)
design-system/happy-friendship-day/MASTER.md   — full design rationale
```

## Commands

```bash
npm run dev       # start dev server (Vite)
npm run build     # typecheck (tsc -b) + production build
npm run preview   # preview the production build
```

## How navigation actually works

`.story` (the `<main>` wrapper) is a native CSS `scroll-snap-type: y mandatory`
container — this is *not* scroll-jacked/hijacked JS. Wheel, trackpad, and touch
swipe all just work via the browser natively. `useStoryNavigation` layers three
things on top:

1. An `IntersectionObserver` that tracks which chapter is >50% visible → drives
   `activeIndex`, which each `ChapterSlide` uses to trigger its entrance
   animation and which the progress indicators highlight.
2. A global keyboard listener (arrows / Home / End) that calls `scrollIntoView`
   on the target section.
3. `goTo` / `next` / `prev`, used by the CTA, dots, and the per-chapter "next" hint.

This was a deliberate choice over GSAP ScrollTrigger pin/scrub: the
`ui-ux-pro-max` `style` and `ux` domains both flag continuous parallax/scroll-jacking
as poor for performance, accessibility, and motion sickness. Discrete
snap-to-section chapters give the same "one story beat at a time" feel without
those costs, and degrade to a plain scrollable page if JS or animation is off.

## Conventions / things that will bite you if changed carelessly

- **Never add `transition-all`, `transition-transform`, or `transition-opacity`
  to an element that a GSAP timeline also animates.** The always-on CSS
  transition fights GSAP's per-frame inline style writes; we hit this for real
  on the Hero CTA (it fixed at `opacity: 0` permanently — see git history /
  the Motion section of MASTER.md for the full story). Scope hover transitions
  to `background-color` / `border-color` / `box-shadow` / `filter` instead.
- **Chapter accent colors are plain inline styles (`style={{ color: accent }}`),
  not Tailwind classes.** Tailwind can't see dynamically-built class strings
  like `` `text-${accent}` `` at build time, so per-friend theming is done via
  the resolved hex value directly rather than fighting the JIT scanner.
- **Every GSAP entrance timeline is wrapped in
  `gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", ...)`.**
  Under reduced motion, content must render at its final state instantly, not
  "the same animation but shorter." Confetti (`src/lib/confetti.ts`) checks the
  same media query independently before firing.
- **`friends.ts` intentionally has no `id` field.** Keys are derived from
  `name + index` in `App.tsx`. Don't add a required `id` — it adds friction to
  the one workflow (typing a friend's details) this whole project is optimized for.
- **Profession theming is one parameterized system (icon + label), not 9 bespoke
  designs.** `ProfessionPattern` scatters whichever Phosphor icon the profession
  maps to across a *fixed* set of 12 positions/sizes/rotations — only the icon
  shape and accent color change per chapter. This keeps every profession visually
  distinct without needing hand-illustrated art per job, and keeps the scatter
  rhythm consistent site-wide. If you add a profession, you're adding one icon
  import, not a new layout.
- **Don't assume white text on an accent color is readable — check both themes.**
  Light-mode accents are deep 600/700-tier colors (white text is fine). The
  dark-mode neon equivalents (`ACCENTS_DARK`) are much brighter — neon yellow
  `#FFE800` or green `#39FF14` with white text fails contrast badly. That's why
  `ProfessionBadge` uses a solid fill in light mode but a glowing *outline*
  (accent text/border on a near-transparent tint) in dark mode instead of just
  keeping the solid fill. If you add a new solid-accent-fill element, check
  contrast in dark mode specifically, don't assume the light-mode treatment
  transfers.

## Skills available in this project

`.claude/skills/` has several design skills vendored from
[nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
(full source kept in `vendor/ui-ux-pro-max-skill/` for updates via `git pull`):
`ui-ux-pro-max` (the one used for this project — searchable style/color/type/motion/UX database),
plus `design`, `design-system`, `banner-design`, `brand`, `slides`, `ui-styling`.
Consult `ui-ux-pro-max`'s `--domain` search before making any visual design
decision on this project rather than guessing — see MASTER.md for the exact
queries already run.
