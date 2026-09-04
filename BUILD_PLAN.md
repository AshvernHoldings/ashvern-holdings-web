# Bold Signature — Build Status

**Merged to `master` and live in production as of 2026-09-04.** Built on
`redesign/bold-signature` (off `master`), PR #2, merge commit `7c29f1f`;
the branch was deleted after merge (fully merged, safe). PR #1 ("Atrium,"
the previous redesign attempt) was closed unmerged the same day.

Spec: `docs/superpowers/specs/2026-09-04-ashvern-landing-redesign-bold.md`
Plan: `docs/superpowers/plans/2026-09-04-ashvern-bold-signature.md`

## What was built

- Full-bleed hero photograph (`public/img/skyline-hero.jpg`, downtown
  Atlanta skyline at sunset, Pexels-licensed — see `app/globals.css` for
  the citation) filling the viewport, with bold Archivo display type
  overlaid directly on the image. (Swapped from an initial San Francisco
  photo in a follow-up pass — see "Hero image swap" below.)
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

## Hero image swap (follow-up pass, same day)

The original hero (San Francisco skyline, KEHN HERMANO/Pexels) didn't
match the page's own "Holding Company · Georgia" eyebrow copy. Replaced
with a new photo sourced the same careful way:

- File: `public/img/skyline-hero.jpg` (same filename, same import site —
  content replaced in place).
- Source: Pexels, photo ID 11599618 —
  <https://www.pexels.com/photo/city-of-atlanta-at-sunset-11599618/>
- Photographer: Connor Scott McManus
  (<https://www.pexels.com/@connorscottmcmanus/>)
- License: Pexels License ("Free to use"), confirmed on the photo page
  2026-09-04.
- Original resolution: 6004×4008.
- Downtown Atlanta skyline at sunset, dramatic magenta/pink sky filling
  roughly the top two-thirds of the frame — same compositional shape
  (dark buildings/rooftops at the bottom, under the headline's gradient
  scrim) as the photo it replaces, so no CSS changes were needed.
- Citations updated in `app/globals.css` (includes a note on the
  supersession) and in the design spec's Imagery section.
- Re-verified after the swap: `npm run build` clean; `git diff master --
  app/page.tsx` re-run and still shows only indentation changes around
  the constrained legal text (Article VII, Ridgepoint, IR, footer); the
  new image renders full-bleed with legible overlaid text at 1600px — if
  anything the amber seal arc reads with more contrast against this sky
  than it did against the original. Mobile viewport still not directly
  screenshotted (same `resize_window` limitation as before); no CSS
  changed in this pass, so the responsive behavior verified earlier by
  code inspection still applies unchanged.

## Open items — still unresolved after merge

- Mobile visual check — never actually screenshotted across either build
  pass (the browser tool's `resize_window` reported success but the
  screenshot stayed at the desktop viewport both times, in two separate
  sessions). Verified instead by reading the CSS (`clamp()` sizing, the
  `52rem` nav breakpoint), which didn't change between passes. Worth an
  actual phone check.
- Resend delivery to `tbell@ashvernholdingsllc.com` for this redesign's
  test submission was never independently confirmed — only that
  `/api/contact` returned `200` with no logged error. Spot-check that
  inbox if you want certainty (subject will reference "Bold Signature
  Verification"). Separately, `README.md` records an earlier, fully
  confirmed Resend delivery (`last_event: delivered`) from testing done
  before this redesign — the notification pipeline itself is known-good,
  just not re-confirmed end-to-end this time.
- `city-hero.webp` (one of the two original licensed photos) is unused in
  this design — left in the repo, unreferenced.

## Merge and production status

- PR #2: <https://github.com/AshvernHoldings/ashvern-holdings-web/pull/2>
  — **merged** to `master` (merge commit `7c29f1f`, 2026-09-04).
- Netlify deploy preview (used for pre-merge review, no longer relevant
  now the branch is deleted):
  <https://deploy-preview-2--endearing-conkies-cc79c4.netlify.app>
- **Production confirmed serving this build**: both
  <https://endearing-conkies-cc79c4.netlify.app> and the custom domain
  <https://ashvernholdings.com> return `200` and serve the new hero image
  (`skyline-hero.*.jpg`) — checked via the actual served HTML with
  `curl`, not just Netlify's commit-status API, which stayed `pending`
  long after the site had already updated (don't trust that API alone to
  confirm a production deploy went out).
- PR #1 ("Atrium") closed unmerged, with a comment pointing to PR #2 as
  what shipped instead.
