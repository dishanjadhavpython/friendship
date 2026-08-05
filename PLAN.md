# Plan — Happy Friendship Day

## Concept

One-page celebration site: Hero ("Happy Friendship Day") → one full-screen
chapter per friend, navigated one at a time (swipe / wheel / keyboard / dots)
→ closing thank-you. Each friend gets their own accent color, photo (or a
styled initials fallback), skills, and story. Design direction is warm and
editorial — cream background, amber + a 7-color rotating accent palette,
Caveat script paired with Quicksand sans, GSAP entrance choreography —
chosen deliberately to avoid the generic dark/purple-gradient "AI template"
look. Full rationale: [design-system/happy-friendship-day/MASTER.md](design-system/happy-friendship-day/MASTER.md).

## Build status — done

- [x] Project scaffolded: Vite + React 19 + TypeScript (strict) + Tailwind CSS v4
- [x] Design system researched via the `ui-ux-pro-max` skill (style / color /
      typography / motion / landing / ux / icons / react queries) and documented,
      including where the first auto-generated draft was wrong and why
- [x] Hero: celebration intro, confetti-triggering CTA, ambient drifting background
- [x] Chapter slide: photo or blob-shaped initials-avatar fallback, name, title,
      skills chips, story, optional fun fact / years-of-friendship
- [x] Closing: recap dots (one per friend, in their color), confetti, back-to-top
- [x] Navigation: native CSS scroll-snap (free swipe/wheel) + keyboard
      (arrows/Home/End) + desktop dot rail + mobile Stories-style progress bar
      + per-chapter "next" hint
- [x] Accessibility: `prefers-reduced-motion` handling (GSAP matchMedia + CSS +
      confetti gate), visible focus states, semantic landmarks/heading order,
      4.5:1+ text contrast
- [x] Responsive-checked at mobile (390px) and desktop (1440px) with Playwright
      screenshots (no dev tool guessing)
- [x] Two real bugs found during verification and fixed:
      1. Hero CTA permanently invisible — a `transition-all` CSS class was
         fighting GSAP's per-frame inline style writes. Fixed by scoping the
         transition to `background-color`/`box-shadow` only.
      2. On mobile, a long chapter's fun-fact/years footer text could render
         behind the floating "next" hint. Fixed by moving the hint into its
         own reserved (non-overlapping) flex row instead of floating it over
         scrollable content.
- [x] `CLAUDE.md` and this plan
- [x] Profession theming: each chapter can show a profession badge (icon +
      label) and a matching icon scattered behind it (e.g. a stethoscope
      pattern for a doctor, a hard hat for a civil engineer) — one shared,
      parameterized system (`src/data/professions.ts` + `ProfessionBadge` +
      `ProfessionPattern`), not bespoke per-person designs. Verified across
      6+ professions in-browser, desktop and mobile.
- [x] Marathi content wired in from `description.txt` — kept verbatim (not
      translated) as each person's `story`, since translating would lose the
      actual jokes/voice. Added Noto Sans Devanagari as a font fallback so it
      renders properly instead of falling back to a mismatched system font;
      verified in-browser.
- [x] Titles/skills derived (in English) from what each Marathi description
      actually says — no invented facts about anyone.
- [x] Punk-neon dark mode: a toggle (top-left) switches the whole site from the
      warm light theme to a near-black background with a glowing neon accent
      palette (text-shadow/box-shadow glow on titles, badges, chips, avatar
      halos, CTA, progress dots). Palette and approach grounded in
      `ui-ux-pro-max` (queried "punk neon cyberpunk dark glow"); deliberately
      kept Caveat/Quicksand typography in both themes rather than adopting the
      tool's cyberpunk font suggestion, so light/dark read as one site with two
      moods, not two different sites. Persisted via localStorage. Verified
      desktop, mobile, and with reduced-motion (glow is static styling, not
      animation, so it correctly stays even when motion is reduced).
- [x] Background music: a play/pause button next to the theme toggle plays
      "Jaane Kyun" (Dostana) from `public/song/`, looped. No autoplay —
      browsers block it pre-gesture anyway, and it's rude to blast audio on load.

## Content status

| # | Name | Photo | Profession badge | Title/skills/story |
|---|------|-------|-------------------|---------------------|
| 1 | Aditya | Done | Software Developer | Done — from description.txt |
| 2 | Dishan | Done | Scientist | Done — from description.txt |
| 3 | Gauravi | Done | Civil Servant | Done — from description.txt |
| 4 | Hrutika | Done | Dentist | Done — from description.txt |
| 5 | Mayuri | Done | Nurse | Done — updated from description.txt's revision (was "not much info yet," now a full description) |
| 6 | Mittal | Done | Pharmacist | Done — from description.txt |
| 7 | Pruthiviraj | Done | Doctor | Done — from description.txt |
| 8 | Sahil | Done | Rider | Done — from description.txt |
| 9 | Sakshi | Done | **None given** — no profession theme applied | Done — from description.txt |
| 10 | Ved | Done | Civil Engineer | Done — added in description.txt's latest revision. Title "Ultimate Trip Planner" is his own phrase from the description; "aka Chaddu" (the original filename nickname) kept as a skill chip |

All 10 people now have real photos, titles, skills, and stories from
`description.txt`. One thing still worth your attention, not silently
assumed:
- **Sakshi** wasn't given a profession, so her chapter intentionally has no
  badge/icon pattern — send me her profession if you want one.

Everything else — 8 of 10 people — is fully done: real photo, profession
badge + themed background, and their actual description (kept in Marathi).

## Deployment — live

**https://doa7onstlwg0s.cloudfront.net**

- [x] `terraform/` — S3 (private) + CloudFront (OAC) static hosting, written
      and verified with `fmt`/`init`/`validate` (all pass), plus an
      `expected_account_id` guard (`checks.tf`) against deploying to the
      wrong AWS account.
- [x] AWS credentials configured (`.env`, gitignored) and confirmed working —
      authenticated as account 184589966037, matching the guard.
- [x] `terraform apply` run with your explicit confirmation: 8 resources
      created (S3 bucket `happy-friendship-day-f16eed16`, CloudFront
      distribution `E1DGFUISR452UD`, OAC, bucket policy, encryption,
      versioning, public-access block), 0 errors.
- [x] `deploy.sh` run — site built and synced to S3, CloudFront cache
      invalidated.
- [x] Live site verified with Playwright against the actual CloudFront URL
      (not just localhost): hero, dark-mode-by-default, and a chapter photo
      all load correctly, zero console errors, zero failed/4xx/5xx requests.

Run `./deploy.sh` again after any content change (new friend, edited story,
etc.) to push the update live — it rebuilds and re-syncs automatically.

To tear it down: `terraform -chdir=terraform destroy` (also needs the AWS
credentials sourced from `.env` first).

## Explicitly not done (tell me if you want any of these)

- No custom domain (site would be reachable at CloudFront's own
  `*.cloudfront.net` URL until one is added — see `outputs.tf`)
- No automated test suite — verification so far is manual/Playwright-driven
  during development, not a committed regression suite
- No analytics
- No git repository initialized — nothing is committed yet

## Verifying it yourself

```bash
npm run dev
```

Open the printed `localhost` URL. Click "Meet the Crew," or use the ↓/↑ arrow
keys, swipe (mobile), or the dots on the right / bar at the top to move
between chapters.
