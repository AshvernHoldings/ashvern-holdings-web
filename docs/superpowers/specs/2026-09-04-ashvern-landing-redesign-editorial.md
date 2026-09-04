# Ashvern Holdings — visual identity redesign: "Atrium"

Date: 2026-09-04
Status: proposed design, documented for async review (see `BUILD_PLAN.md` for build status once work starts)
Branch: `redesign/atrium-editorial` (new branch, not merged to `master`)

## Why

The current identity ("dark navy / corporate," `353fde3`) replaces "Ledger," the
original warm-paper/serif identity. This spec replaces the dark-navy identity in
turn, on a new branch, as a full visual reconsideration — content and backend
untouched. It does not modify `master` or the live site.

## Reference research

Visually inspected three real holding/luxury sites for inspiration (screenshots
taken via browser automation, not just described from memory):

- **Gabiano Holding** (gabiano.it) — near-black ground, one bold accent color,
  confident negative space, imagery replaced by large abstract graphic shapes
  rather than photography. Taken from it: *confidence through scale and
  negative space*, not through saturation.
- **Tohshin Partners Holdings** (tohshin-hd.co.jp) — light, restrained ground
  with a faint grid texture, one tiny accent color, extreme whitespace, sharp
  type-size contrast between a huge display headline and a small tracked-out
  subtitle. Taken from it: *minimalism and type-scale contrast* as the source
  of authority, not density of content.
- **Swiss Diamond Group** (swissdiamondgroup.com) — cream/off-white ground,
  navy + muted gold restrained brand palette, sans-serif structure paired with
  an italic serif used only for accent words, full-bleed rich (not
  desaturated) photography. Taken from it: *the pairing convention itself*
  (structural sans + expressive serif) and *full-bleed, naturally colored
  imagery* rather than filtered/scrimmed photos.

None of the three is dark-navy-plus-gold, which is the palette being retired
here — Swiss Diamond's navy+gold is close to Ashvern's current one, which is
exactly why it's being avoided as a direct copy: same underlying formula
(neutral ground + one restrained accent + serif/sans pairing), different hue
and different fonts, so the result is recognizably new rather than a
re-skin.

## Palette

Returns to a light, warm-neutral ground (structurally similar to the
original "Ledger" attempt, which was abandoned only because the identity
moved to dark, not because the approach was wrong) — but with a new accent
hue and new type, so it isn't a re-run of "Ledger."

| Token | Value | Use | Contrast on paper |
|---|---|---|---|
| `--paper` | `#F7F5F0` | page background | — |
| `--card` | `#FFFFFF` | raised surfaces: subsidiary entry, form fields | — |
| `--ink` | `#1B1A17` | headings, body text | 15.97:1 |
| `--muted` | `#635F54` | eyebrows, captions, footer | 5.85:1 |
| `--line` | `#E3DFD3` | hairline borders | — |
| `--accent` | `#2F4638` | links, focus rings, blockquote rule, button, one accent word per section | 9.39:1 |
| `--error` | `#A6432E` | form error text | 5.56:1 |

Contrast ratios computed against `--paper` (WCAG relative-luminance formula);
all clear AA (4.5:1) for normal text, most clear AAA (7:1). Verified the same
way the dark-navy identity's ratios were script-checked.

`--accent` is a deep, muted bottle/pine green — not gold, not navy. It reads
institutional and quiet rather than warm-luxury-gold or corporate-navy, and
gives the page exactly one color decision instead of a full secondary
palette, matching the "restraint, not saturation" brief.

## Typography

- **Display / headings:** Fraunces (Google Fonts, variable, optical sizing +
  italic). Used at large sizes for `h1`/`h2`, weight ~340–460. Its warm,
  slightly soft serif character carries the "editorial, considered" read
  without being a repeat of EB Garamond (already tried and retired) or a
  generic corporate slab.
- **Body / UI / labels:** Public Sans (Google Fonts). Clean, neutral,
  government-grade legible grotesque — used for body copy, nav-less section
  eyebrows (uppercase, tracked-out), form labels, footer, button text.
- Pairing logic mirrors Swiss Diamond Group's structural-sans +
  expressive-serif convention, inverted in emphasis: serif carries the
  display voice, sans carries structure — the more common convention for
  corporate/institutional elegance.
- One accent word per major section heading set in Fraunces italic, `--accent`
  color, echoing Swiss Diamond's "single flourish word" technique — used at
  most once per section, never as a running style.
- Both loaded via `next/font/google`, replacing the single `Inter` family
  entirely. No new font-loading mechanism.

## Layout

- Same six sections, same order, same copy (Hero, Purpose, Subsidiaries,
  Investor Relations, Contact, Footer) — this is a restyle, not a
  restructure.
- No navigation bar is added — none exists today and the brief doesn't ask
  for one; adding one would be scope beyond "visual redesign."
- Wider outer margins and a slightly narrower text measure (`--measure:
  38rem`, down from 40rem) to read as more considered/less dense, per the
  Tohshin whitespace cue.
- Hero image goes full-bleed-within-shell at a larger aspect (currently a
  small inset figure) with natural color instead of the navy scrim/desaturate
  treatment — the ground is light now, so the same licensed photo doesn't
  need darkening to sit into it.
- Section-heading treatment gets the Tohshin-style scale contrast: large
  Fraunces heading next to a small tracked Public Sans eyebrow, more size
  delta than the current identity uses.
- Subsidiary entry and form fields move from a dark card (`--navy-card`) to
  a white card (`--card`) with a hairline border, sitting on the paper
  ground — same "raised surface" concept, new light-mode values.

## Imagery

Reuses the two existing photos already in `public/img/` — both previously
verified as Pexels "Free to use" (commercial use, no attribution required,
modification permitted), documented in `app/globals.css`:

- `city-hero.webp` — dusk skyline (Shlok Rana, Pexels)
- `tower-facade.webp` — glass-and-steel facade close-up (Lana, Pexels)

No new images sourced for this pass. Reasoning: the brief asks for
"visually rich without being busy" imagery, and per the reference research
even the more image-heavy sites (Swiss Diamond) lean on a small number of
large, well-treated photos rather than many — the richness comes from scale
and natural color, not photo count. The existing two photos are already
licensed, verified, and thematically correct (skyline, architecture); this
pass changes their *treatment* (larger, full-bleed, natural color, no navy
scrim) rather than sourcing replacements. If review calls for a third image
(e.g., for the Subsidiaries or Investor Relations section), that's a
follow-up with its own license verification — flagged here as an open
option, not committed to.

## Motion

Replaces the current CSS-only `animation-timeline: view()` reveal with
`framer-motion`, per explicit instruction to use it:

- Section entrance: `whileInView`, `opacity 0→1` + `y: 12px→0`,
  `duration: 0.6s`, `ease: [0.16, 1, 0.3, 1]`, `viewport={{ once: true,
  amount: 0.15 }}`.
- Hero content: same entrance, no delay, runs on load rather than on
  scroll-into-view (it's already in view).
- Stagger: within a section, the eyebrow/heading/body stack uses
  `staggerChildren: 0.08` so text arrives as a quiet cascade rather than
  all at once.
- Button: `whileTap={{ scale: 0.98 }}`, matching the existing feel.
- Link underline: kept as the existing CSS `background-size` wipe (150ms) —
  correct tool already, no reason to move it to JS.
- All `motion.*` entrance animation is wrapped so `useReducedMotion()` skips
  the `y` transform and animates opacity only (still respects the intent of
  "confirm loaded" without motion) — verified by testing with
  `prefers-reduced-motion: reduce` forced in the browser.
- Nothing else animates. No page transitions, no parallax, no 3D — matches
  "subtle, smooth motion, not flashy 3D."

## What does not change

- Article VII quote — copied verbatim from the current `page.tsx`, byte for
  byte.
- Investor Relations disclaimer paragraph — same sentences, same neutral
  tone, no restyle that adds emphasis (no bold, no color, no larger type)
  beyond the section's normal body style.
- Ridgepoint Dispatch description — "in formation," not yet separately
  incorporated, not operating.
- Contact form: `app/contact-form.tsx` and `app/api/contact/route.ts` logic
  untouched (Supabase insert + Resend email). Only its CSS classes restyle.
- `investing@ashvernholdings.com` as the IR contact address.
- Footer mailing address: 2330 Scenic Hwy S, Snellville, GA 30078.
- `app/api/keep-alive/route.ts` and the GitHub Actions workflow — unrelated
  to this change, untouched.

## Dependencies added

`framer-motion` only. Everything else (Tailwind v4, `next/font/google`,
Supabase client, Resend) is already in the project and unchanged.

## Verification plan

1. Diff `page.tsx` text content against `master` — every user-visible string
   in the five constrained sections above must be byte-identical (a simple
   diff of extracted text nodes, not just "looks the same").
2. `npm run build` passes.
3. Manual browser check at 375px and 1280px (and one mid-breakpoint,
   ~820px).
4. Submit the contact form end-to-end against real Supabase + Resend (same
   method as the original spec's verification) and confirm the row lands
   and the email arrives.
5. Force `prefers-reduced-motion: reduce` in the browser and confirm
   entrance animations degrade to opacity-only / instant.
6. Push the branch, open a PR (or confirm Netlify's branch-deploy picks it
   up), and confirm a **deploy-preview URL distinct from production**
   before calling this done. Do not merge to `master`.

## Branch / deploy

- Branch: `redesign/atrium-editorial`, off current `master`.
- Push the branch and open a PR against `master` so Netlify's PR/branch
  deploy produces a preview URL (no `netlify.toml` exists — deploy config
  lives in the Netlify dashboard's existing GitHub connection).
- Record the preview URL in `BUILD_PLAN.md` once available. No action on
  `master`, no production deploy, no DNS/Netlify-settings changes.
