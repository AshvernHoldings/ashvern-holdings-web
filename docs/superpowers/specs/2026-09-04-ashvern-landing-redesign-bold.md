# Ashvern Holdings — Bold Signature Redesign

Date: 2026-09-04

## Why

Third visual pass at the same one-page corporate site. The first
(`353fde3`, "dark navy / corporate") and second (`redesign/atrium-editorial`,
"Atrium," PR #1, not merged) both treated photography as a supporting
element inside a text-led, neutral-background layout. This pass inverts
that: the photograph is the entire visual statement, not an inset next to
the text.

Atrium is left alone on its own branch, abandoned but not deleted. This is
a new branch off `master`, not an iteration on Atrium.

## Reference points

- **Gabiano Holding** (gabiano.it) — bold red circular shapes bleeding off
  screen edges as a repeating brand signature. Taken from it: *a single
  graphic shape, repeated consistently, becomes the memorable mark* — not
  the specific shape or color, which would be a copy rather than an
  original signature.
- **Swiss Diamond Group** — restrained, minimal nav that stays out of the
  photography's way. Taken from it: transparent nav over the hero,
  collapsing to a solid bar only once the user has scrolled past the image.

## Brand-shape signature — the seal arc

A single quarter-circle, flat-filled, bleeding off a corner of the
viewport — visually closer to a wax seal or an ink stamp than a decorative
blob, which fits a company whose entire stated purpose is *holding* things
officially. It appears:

- Large (~35–45vw diameter) bleeding off the top-right corner of the hero,
  overlapping the photograph.
- Small (~80–120px) anchored in one corner of every section below the
  hero, and in the footer — same corner-bleed logic every time. Repetition
  in a fixed position is what makes it a signature rather than a one-off
  hero flourish.

Rendered as an inline SVG quarter-circle (a single `<path>`), not an image
asset.

## Color — "Ashvern Amber"

`#D98A2B`, a saturated brass/marigold, used only for the seal shape, links,
focus rings, and button fills. Not Gabiano's red, and deliberately not
another navy: this is the third identity for this page, and both
predecessors used a metallic-gold-family accent (`#cba96a` warm gold on
navy, then `#8A6D3B` antique bronze on paper). Amber continues that thread
but saturated and bold instead of muted or desaturated — and it sits as a
confident warm/orange counterpoint against the cool blues and greys of
skyline and glass photography (complementary contrast, not clashing).

Alternative considered and rejected: a cobalt/electric-blue arc. Rejected
because it would recede rather than pop against blue-toned architectural
photography, and it carries no continuity with the site's two prior
identities.

## Typography

- Display/headlines: **Archivo**, weight 700/900. A grotesk with real
  weight and presence — bold and confident rather than editorial, and
  distinct from Atrium's serif (Fraunces).
- Body/nav/UI: **Inter**, weights 400/500/600. Neutral, highly legible,
  already used in the original identity.
- Both loaded via `next/font/google` — no new dependency.

## Navigation

Fixed position, transparent over the hero. Left: small tracked-caps
wordmark "ASHVERN HOLDINGS" in Inter, white. Right (desktop only): About,
Subsidiaries, Investor Relations, Contact — white text, amber underline on
hover/focus. Mobile: wordmark + a single "Contact" link only; no hamburger
menu or off-canvas panel to build for four links.

Past the hero, the bar crossfades (150ms) to a near-black
(`rgba(20,18,14,0.85)`), backdrop-blurred background so it stays legible
over the dark sections below.

## Imagery

**New hero photo** — sourced this session:

- File: `public/img/skyline-hero.jpg` — San Francisco skyline at sunset
  from a hillside overlook, Transamerica Pyramid as the focal point, warm
  pastel sky filling roughly the top two-thirds of the frame.
- Source: Pexels, photo ID 3584437 —
  <https://www.pexels.com/photo/city-skyline-during-golden-hour-3584437/>
- Photographer: KEHN HERMANO (<https://pexels.com/@brotherkehn/>)
- License: Pexels License ("Free to use" — free for commercial and
  personal use, no attribution required, modification permitted),
  confirmed on the photo page at time of sourcing.
- Original resolution: 6000×4000.
- Why this one over other golden-hour skyline candidates: the sky
  dominates roughly two-thirds of the frame, which is exactly the negative
  space the headline needs, and the palette (dusk pink/gold) sits
  comfortably alongside the amber accent instead of competing with it.

**Existing photos:**

- `tower-facade.webp` (Lana, Pexels — previously verified, see
  `app/globals.css`) — reused full-bleed, dark-scrimmed, as the background
  of the About/Purpose section. Its abstract glass grid already reads as
  moody/dark and doesn't need a dramatic sky to work at that smaller,
  supporting scale.
- `city-hero.webp` (Shlok Rana, Pexels — previously verified) — dropped
  from the layout. Its flat, hazy dusk skyline doesn't hold up at
  full-bleed, viewport-filling scale the way it did as a small inset
  figure in the previous two designs. Left in the repo, unused.

Subsidiaries, Investor Relations, and Contact get no photo — see below.

## Section-by-section layout

1. **Hero** — `skyline-hero.jpg` full-bleed, 100dvh. Nav overlaid. Large
   Archivo headline ("Ashvern Holdings, Inc.") + one-line description in
   Inter, both white, positioned in the open-sky area of the frame. A
   bottom-anchored gradient scrim (transparent → `rgba(10,9,7,0.6)`) sits
   under the text zone only, for legibility — the photo itself stays
   unfiltered elsewhere, since the brief is a rich photo, not a darkened
   one. Seal arc bleeds off the top-right corner, overlapping the image.
   Small scroll-cue at the bottom center.
2. **About / Purpose** (Article VII, verbatim) — `tower-facade.webp`
   full-bleed background, scrimmed dark (`rgba(17,15,11,0.82)` flat, since
   this section needs to read as body-copy-legible rather than
   photo-forward). White/off-white text, small seal arc in a corner.
3. **Subsidiaries** (Ridgepoint Dispatch, "in formation," verbatim wording)
   — solid near-black ground `#14120E`, no photo. Same corner arc.
4. **Investor Relations** (non-solicitation disclaimer, verbatim) — same
   near-black ground. Same corner arc.
5. **Contact** — same near-black ground. Existing `ContactForm` restyled
   to the new palette (dark fields, white text, amber focus rings) —
   markup and Supabase/Resend logic untouched.
6. **Footer** — near-black, small seal arc, address/legal text unchanged
   from master.

## Motion

`master` (this branch's base) already has a pure-CSS scroll-reveal for the
`.reveal` class — `animation-timeline: view()`, gated behind
`@supports` and `@media (prefers-reduced-motion: no-preference)`, no JS,
no dependency. (Atrium's `framer-motion` dependency lives only on the
abandoned `redesign/atrium-editorial` branch and isn't part of this one —
reusing it here would mean adding it back for no reason.) Keep using the
same CSS-only technique throughout instead of introducing framer-motion:

- Sections below the hero keep the existing `.reveal` treatment as-is.
- Hero: a plain CSS `@keyframes` fade+scale-in on load (opacity 0→1, scale
  1.03→1, ~350ms ease-out), gated the same way behind
  `prefers-reduced-motion: no-preference`. Seal arc fades/scales in
  slightly after via `animation-delay`.
- Nav background crossfade: a CSS `transition` on `background`/`backdrop-filter`
  toggled by a small scroll-position class (vanilla JS, one `scroll`
  listener with a boolean toggle — no library).
- Nothing looping, nothing parallax.

No new dependency.

## What does not change

- Article VII blockquote — byte-identical to `master`.
- Investor Relations non-solicitation paragraph — byte-identical.
- Ridgepoint Dispatch "in formation" wording — byte-identical.
- Footer address (2330 Scenic Hwy S, Snellville, GA 30078) and copyright
  line — byte-identical.
- `investing@ashvernholdings.com` as the IR contact.
- `app/api/contact/route.ts`, `app/contact-form.tsx` logic, and
  `supabase/schema.sql` — untouched. Only the form's visual styling
  changes.

## Verification plan

1. `git diff master -- <content areas>` to confirm the "does not change"
   text blocks above are byte-identical, not just visually similar.
2. `npm run dev` against real Supabase + Resend keys; submit the contact
   form via browser automation; confirm the row in Supabase and the
   Resend email; delete the test row afterward.
3. Screenshots at 375px and 1280px+ (and a genuinely wide viewport, since
   this is a full-bleed layout).
4. Confirm `prefers-reduced-motion: reduce` disables the hero/section/nav
   transitions.
5. `next build` clean.

## Dependencies

None added. `next/font/google` already used on `master`; motion stays
CSS-only per the existing `.reveal` pattern.
