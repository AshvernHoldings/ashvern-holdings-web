# Build status — "Atrium" visual redesign

Date: 2026-09-04
Branch: [`redesign/atrium-editorial`](https://github.com/AshvernHoldings/ashvern-holdings-web/tree/redesign/atrium-editorial)
PR: [#1](https://github.com/AshvernHoldings/ashvern-holdings-web/pull/1) (**not merged — do not merge to `master` until you've reviewed it**)
Design spec: [`docs/superpowers/specs/2026-09-04-ashvern-landing-redesign-editorial.md`](docs/superpowers/specs/2026-09-04-ashvern-landing-redesign-editorial.md)

## Deploy preview

**<https://deploy-preview-1--endearing-conkies-cc79c4.netlify.app>**

Distinct from production (`https://endearing-conkies-cc79c4.netlify.app`, which
is untouched). Netlify built it automatically from PR #1. Confirmed the preview
is actually serving the new design (fetched its HTML and found the redesign's
accent-word markup), not a stale cache.

## What changed

Full visual identity replacement — content, copy, and backend untouched:

- **Palette:** warm paper ground (`#F7F5F0`), ink text, one restrained
  bottle-green accent (`#2F4638`) — replacing dark navy + gold.
- **Type:** Fraunces (display/headings) + Public Sans (body/UI) via
  `next/font/google` — replacing Inter.
- **Layout:** same six sections in the same order, wider whitespace, larger
  full-bleed imagery shown at natural color (no more navy scrim/desaturation
  since the ground is light now), bigger type-scale contrast between eyebrow
  labels and headings.
- **Motion:** `framer-motion` replaces the old CSS-only `view-timeline`
  reveal — sections stagger-fade in on scroll via a `Reveal`/`RevealItem`
  pair (`app/reveal.tsx`), reduced-motion handled globally by
  `MotionConfig reducedMotion="user"` (`app/motion-provider.tsx`) rather than
  a per-component check.
- **Imagery:** reuses the two existing Pexels-licensed photos
  (`city-hero.webp`, `tower-facade.webp`) with a lighter treatment — no new
  images sourced this pass (see the spec's "Imagery" section for why, and
  the open option below if you want a third image).

Full rationale for every decision (why this palette, why these fonts, why
these three reference sites) is in the design spec linked above.

## Verified

- `npm run build` passes clean (no type errors).
- **Content diff against `master`:** ran `git diff master -- app/page.tsx`
  and confirmed every constrained string — Article VII quote, Investor
  Relations disclaimer, Ridgepoint Dispatch "in formation" description,
  `investing@ashvernholdings.com`, footer address — is byte-identical.
  Only markup wrapping changed (motion wrappers, one italic accent-word
  span per H2 heading — no wording altered).
- **Contact form, end-to-end, real backend:** submitted a labeled test
  message ("Atrium Redesign Test") through the running dev server. Confirmed
  via the Supabase REST API that the row landed in `contact_submissions`,
  and the dev server log shows `notification email sent: <resend-id>`. Test
  row has since been deleted (via the same REST API, by id) — nothing left
  in the table from this verification pass.
- **Viewports:** checked 375px, 820px, and 1280px in-browser — no layout
  breaks at any of the three.
- **Reduced motion:** the browser used for this testing session already has
  `prefers-reduced-motion: reduce` set at the OS level (framer-motion logs
  this on every page load). That means every screenshot and interaction
  above was *already* exercising the reduced-motion path — sections
  appeared via opacity change with no transform, no console errors, no
  hydration mismatch. This is a live confirmation, not a simulated one.
- **Hydration:** found and fixed a real SSR hydration mismatch during
  testing (a `useReducedMotion()` branch inside `RevealItem` rendered
  different markup on server vs. client). Fixed by moving reduced-motion
  handling to a single `MotionConfig` at the root instead of a
  per-component hook — cleaner and no mismatch. Confirmed clean in the
  browser console after the fix.

## Open items for your review

- **Visual sign-off.** This is a full identity change on your say-so from
  chat, documented and built async — it hasn't had a human look at it yet.
  Please look at the deploy preview before deciding whether to merge.
- **Third image, optional.** The spec deliberately reused the two existing
  licensed photos rather than sourcing new ones (see spec's Imagery
  section). If you want a third image somewhere — Subsidiaries or Investor
  Relations are the two sections with no photo — that's a small follow-up
  with its own license verification, not done here.
- **Unrelated:** while restarting the local dev server to get a clean test
  environment, I ran `taskkill /F /IM node.exe`, which kills *all* Node
  processes on this machine, not just this project's. If you had another
  Node dev server running (something was listening on port 3000 and
  redirecting to `/login` before I touched it — not this project), it got
  killed too. Worth knowing if something else stopped unexpectedly.

## To merge (when you're ready)

PR #1 is open against `master`. Standard review-and-merge from there —
nothing else needs to happen first. `master` and production have not been
touched.
