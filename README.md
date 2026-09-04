# Ashvern Holdings, Inc. — corporate site

> ⚠️ **NOT READY FOR PUBLIC LAUNCH.** The contact-form notification email is a
> temporary sandbox workaround pointed at the wrong mailbox. Read
> [`LAUNCH-BLOCKERS.md`](./LAUNCH-BLOCKERS.md) and clear every item before this
> goes live.

Single-page corporate presence for Ashvern Holdings, Inc. Next.js 16 (App
Router), Tailwind v4. Current visual identity is "Bold Signature": a
full-bleed photographic hero (Archivo display type overlaid on the image)
and a recurring amber "seal arc" brand shape, Inter for body/UI. Six
sections: Hero, Purpose, Subsidiaries, Investor Relations, Contact,
Footer. The contact form stores submissions in Supabase and sends an
email notification via Resend.

## Status

- Built, dependencies installed, `npm run build` passes.
- Supabase project `jpvnewcqdpozpdcrwntx` is live; `contact_submissions` table
  created (see `supabase/schema.sql`).
- Contact form verified end to end: submission stored in Supabase **and**
  notification email delivered (`last_event: delivered` via Resend).
- **Deployed to Netlify** at <https://endearing-conkies-cc79c4.netlify.app>
  and at the custom domain <https://ashvernholdings.com> (env vars set in the
  Netlify site settings). Netlify access control has been lifted — both URLs
  are publicly reachable (`200`, confirmed 2026-09-04) — and the DNS cutover
  is complete. See [`DEPLOYMENT-NOTES.md`](./DEPLOYMENT-NOTES.md) (note: that
  file's own status line still says access-gated/DNS-in-progress as of
  2026-09-02 — it predates this and hasn't been updated to match).
- **"Bold Signature" visual redesign merged to `master` 2026-09-04** (PR #2)
  and confirmed live in production — see `BUILD_PLAN.md` and
  `docs/superpowers/specs/2026-09-04-ashvern-landing-redesign-bold.md`. The
  prior "Atrium" redesign attempt (PR #1) was closed unmerged the same day.
- Local dev still uses `.env.local`, which is git-ignored and already populated
  on this machine.

## Run it

```
npm install     # first time only
npm run dev      # http://localhost:3000
```

To stop a stray dev server on Windows: `taskkill /F /IM node.exe`.

## Setting up a fresh environment

1. `npm install`
2. Create a Supabase project (separate from Ridgepoint). In its SQL editor, run
   `supabase/schema.sql`.
3. `cp .env.example .env.local` and fill in:
   - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` — Supabase → Project Settings → API
   - `RESEND_API_KEY` — resend.com, **sending-access** permission is enough
   - `CONTACT_NOTIFY_TO` / `CONTACT_NOTIFY_FROM` — see the note in `.env.example`
     and `LAUNCH-BLOCKERS.md`
4. `npm run dev`

## How the contact form works

`app/contact-form.tsx` posts JSON to `app/api/contact/route.ts`, which:

1. validates the fields and drops honeypot hits silently,
2. inserts a row into `contact_submissions` using the service-role key
   (RLS is on with no public policy, so nothing else can read or write it),
3. sends a plain-text notification email to `CONTACT_NOTIFY_TO` with `reply_to`
   set to the submitter. If the email fails it is logged and the request still
   succeeds — the stored row is the record of truth.

Read submissions in the Supabase table editor.

## Keeping Supabase awake

Supabase pauses a free-tier project after 7 days with no activity.
`app/api/keep-alive/route.ts` runs a HEAD count on `contact_submissions` (no
rows transferred) so any hit counts as activity.
`.github/workflows/keep-alive.yml` calls that route Mon & Thu via `curl` (plus
manual `workflow_dispatch`) — GitHub Actions, not Netlify Scheduled Functions,
whose free-tier availability wasn't confirmed. This repo is public, so Actions
minutes are unlimited.

Set the `KEEP_ALIVE_URL` GitHub Actions **repository variable** to the deployed
route (e.g. `https://<host>/api/keep-alive`) for the workflow to work. It fails
while the site is behind Netlify access control — lift that, or exempt
`/api/keep-alive`, first.

## Layout of the code

| Path | What |
| --- | --- |
| `app/page.tsx` | The page — all six sections (server component) |
| `app/contact-form.tsx` | Contact form (client component) |
| `app/seal-arc.tsx` | The recurring amber "seal arc" brand-shape component |
| `app/nav-scroll.tsx` | Client component: toggles the nav's solid background past the hero |
| `app/api/contact/route.ts` | Validation + Supabase insert + Resend email |
| `app/api/keep-alive/route.ts` | HEAD count on `contact_submissions` — free-tier keep-alive |
| `.github/workflows/keep-alive.yml` | Scheduled `curl` of the keep-alive route (Mon & Thu) |
| `app/globals.css` | "Bold Signature" design system: tokens, type, motion, licensed-image citations |
| `app/layout.tsx` | Fonts (next/font) and metadata |
| `supabase/schema.sql` | `contact_submissions` table + RLS |
| `BUILD_PLAN.md` | Build/verification log for the current ("Bold Signature") redesign |
| `docs/superpowers/specs/2026-09-04-ashvern-landing-redesign-bold.md` | Current visual-identity design record |
| `docs/superpowers/specs/2026-08-29-ashvern-landing-design.md` | Original site design record (content/structure, still accurate) |

## Before going public

See [`LAUNCH-BLOCKERS.md`](./LAUNCH-BLOCKERS.md) — every item there must be
cleared. In short: verify a domain in Resend and move `CONTACT_NOTIFY_TO` back to
`tbell@ashvernholdings.com`. Netlify env vars are already set; remaining
deployment steps (DNS cutover, lifting access control) are in
[`DEPLOYMENT-NOTES.md`](./DEPLOYMENT-NOTES.md).
