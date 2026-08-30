# Ashvern Holdings, Inc. — corporate site

> ⚠️ **NOT READY FOR PUBLIC LAUNCH.** The contact-form notification email is a
> temporary sandbox workaround pointed at the wrong mailbox. Read
> [`LAUNCH-BLOCKERS.md`](./LAUNCH-BLOCKERS.md) and clear every item before this
> goes live.

Single-page corporate presence for Ashvern Holdings, Inc. Next.js 16 (App
Router), Tailwind v4, EB Garamond / Lato. Six sections: Hero, Purpose,
Subsidiaries, Investor Relations, Contact, Footer. The contact form stores
submissions in Supabase and sends an email notification via Resend.

## Status

- Built, dependencies installed, `npm run build` passes.
- Supabase project `jpvnewcqdpozpdcrwntx` is live; `contact_submissions` table
  created (see `supabase/schema.sql`).
- Contact form verified end to end: submission stored in Supabase **and**
  notification email delivered (`last_event: delivered` via Resend).
- Runs in development only. Env vars live in `.env.local`, which is git-ignored
  and already populated on this machine.

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

## Layout of the code

| Path | What |
| --- | --- |
| `app/page.tsx` | The page — all six sections (server component) |
| `app/contact-form.tsx` | Contact form (client component) |
| `app/api/contact/route.ts` | Validation + Supabase insert + Resend email |
| `app/globals.css` | "Ledger" design system: tokens, type, motion |
| `app/layout.tsx` | Fonts (next/font) and metadata |
| `supabase/schema.sql` | `contact_submissions` table + RLS |
| `docs/superpowers/specs/2026-08-29-ashvern-landing-design.md` | Design record |

## Before going public

See [`LAUNCH-BLOCKERS.md`](./LAUNCH-BLOCKERS.md) — every item there must be
cleared. In short: verify a domain in Resend and move `CONTACT_NOTIFY_TO` back to
`tbell@ashvernholdings.com`, move env vars into the host, point a real domain at
the deployment.
