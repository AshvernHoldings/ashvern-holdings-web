# Bold Signature — Build Status

Branch: `redesign/bold-signature` (off `master`, not merged).
Spec: `docs/superpowers/specs/2026-09-04-ashvern-landing-redesign-bold.md`
Plan: `docs/superpowers/plans/2026-09-04-ashvern-bold-signature.md`

## What was built

- Full-bleed hero photograph (`public/img/skyline-hero.jpg`, San Francisco
  skyline at sunset, Pexels-licensed — see `app/globals.css` for the
  citation) filling the viewport, with bold Archivo display type overlaid
  directly on the image.
- A recurring "seal arc" brand shape (`app/seal-arc.tsx`) — a flat amber
  quarter-circle bleeding off a corner of the hero and every section below
  it, plus the footer.
- Minimal, transparent overlay nav (`app/nav-scroll.tsx` +
  `.site-nav` CSS) that crossfades to a solid dark bar past the hero.
- Palette repointed from navy/gold to near-black/amber (`--ink`, `--accent`
  now `#d98a2b`) across `app/globals.css`; fonts swapped to Archivo
  (display) + Inter (body), both via `next/font/google`.
- `tower-facade.webp` reused full-bleed/dark-scrimmed as the About/Purpose
  section background. `city-hero.webp` dropped from the layout (too flat
  for full-bleed scale) but left in the repo, unused.
- All motion is CSS-only (no new dependency) — reuses `master`'s existing
  `.reveal` scroll-animation pattern for sections below the hero, and adds
  matching `@media (prefers-reduced-motion: no-preference)`-gated
  `@keyframes` for the hero image/text fade-in and the seal arc's
  entrance.
- `app/contact-form.tsx` required **no changes** — it only ever referenced
  global CSS classes (`.field`, `input`, `button.submit`, etc.), which
  already picked up the new palette once the shared tokens were repointed.

## Verification results

1. **Constrained content byte-identical to `master`.** Confirmed via
   `git diff master -- app/page.tsx`: every changed line in the Article
   VII blockquote, the Ridgepoint Dispatch "in formation" paragraph, both
   Investor Relations paragraphs, the IR email, and the footer
   address/copyright is a pure indentation shift from the new wrapper
   `<div className="shell">` elements — no character of the actual text
   changed.
2. **Contact form, end-to-end, for real.** Submitted a test row via
   browser automation (`npm run dev` against real Supabase + Resend keys).
   Confirmed the row via a direct Supabase REST query
   (`id: 7edd2f93-c5ac-47d0-98d3-dbe79e40c8a2`), then deleted it. The
   `/api/contact` POST returned `200` with no error logged, meaning the
   Resend send call didn't throw — the notification goes to
   `tbell@ashvernholdingsllc.com`, an inbox this session can't read, so
   actual delivery should be spot-checked there.
3. **Desktop rendering.** Verified visually at 1600px via browser
   automation: hero, nav crossfade, About/Purpose, Subsidiaries, Investor
   Relations, Contact, and footer all render correctly, seal arc recurs
   correctly in every section.
   - Caught and fixed a real bug during this pass: the mobile-only
     "Contact" nav link was showing *alongside* the full desktop nav at
     1600px, because its CSS rule sat after the desktop media query in
     source order and won the cascade tie. Fixed by raising its
     selector specificity (`.links.links--mobile-only`) instead of
     relying on source order.
4. **Mobile rendering — not directly verified this session.** The
   browser automation tool's `resize_window` call reported success but
   the resulting screenshot stayed at the desktop 1278px viewport both
   times it was tried; stopped retrying rather than loop on it.
   Responsiveness was instead verified by code inspection: the nav's
   `@media (min-width: 52rem)` breakpoint (desktop links vs. mobile
   wordmark+Contact) and the hero headline's `clamp(2.5rem, 8vw, 5.5rem)`
   sizing use the same fluid-typography technique already proven in the
   shipped predecessor site. **Please load the deploy preview on an
   actual phone before treating mobile as verified.**
5. **`prefers-reduced-motion` gating.** Not toggled live in a browser this
   session (no emulation tool available), but verified by direct
   inspection of `app/globals.css`: all four new `animation:` declarations
   (hero image, hero text, seal-arc entrance) sit inside
   `@media (prefers-reduced-motion: no-preference)` blocks, matching the
   same gating already used by `master`'s pre-existing `.reveal` rule.
6. **`npm run build`** — clean, no errors or warnings.

## Open items for review

- Mobile visual check (see #4 above) — the design should hold up fine per
  the CSS, but hasn't been eyeballed on a real narrow viewport this
  session.
- Resend delivery to `tbell@ashvernholdingsllc.com` — spot-check that
  inbox for the test-submission notification (subject will reference
  "Bold Signature Verification").
- Deploy-preview URL — to be filled in after pushing (see below).

## Deploy preview

_Not yet pushed — filled in after `git push -u origin redesign/bold-signature`._
