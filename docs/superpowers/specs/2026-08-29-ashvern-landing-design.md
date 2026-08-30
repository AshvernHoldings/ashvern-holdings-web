# Ashvern Holdings, Inc. — Corporate Landing Page

Date: 2026-08-29

## Purpose

A single-page corporate presence for Ashvern Holdings, Inc. Not a marketing or
sales site — Ashvern is a Georgia holding company whose stated purpose is to
acquire, hold, and manage equity interests in subsidiaries. The page states what
the company is, its structure, its forthcoming subsidiary, a neutral investor
contact point, and a working contact form.

## Scope

One Next.js project, separate from ridgepoint-saas and ridgepoint-internal, with
its own Supabase project for contact-form storage. No CMS, no auth, no analytics,
no component library beyond Tailwind.

## Sections

1. **Hero** — "Ashvern Holdings, Inc." + one-line description of what it is.
2. **About / Purpose** — holding-company structure, based on the filed Article VII:
   "The Corporation is organized to acquire, hold, and manage equity interests in
   subsidiary companies, and to engage in any lawful act or activity for which
   corporations may be organized under the Georgia Business Corporation Code."
3. **Subsidiaries** — Ridgepoint Dispatch named as a *planned / forthcoming*
   dispatch-services subsidiary, not yet separately incorporated. Phrased so it is
   never presented as an operating business.
4. **Investor Relations** — informational only. States that Ashvern Holdings, Inc.
   welcomes inquiries from investors and gives a contact point. No invitation to
   invest, no terms, no "opportunity" language, no investment CTA. Written to stay
   clear of general-solicitation rules.
5. **Contact** — real form (name, email, optional company, message) posting to a
   Next.js Route Handler that stores the submission in Supabase and sends an email
   notification. Honeypot field for spam. No captcha.
6. **Footer** — incorporated in Georgia; © 2026 Ashvern Holdings, Inc.; mailing
   address 2330 Scenic Hwy S, Snellville, GA 30078.

## Visual identity — "Ledger"

Editorial / legal aesthetic; deliberately not Ridgepoint's navy.

- Ink `#1C1C1A` on warm paper `#FAFAF7`; white cards; taupe hairline borders
  `#E4E0D8`; single accent antique bronze `#8A6D3B` for links and focus rings only.
  Buttons are ink, not colored. Form error red `#B4432E`.
- Type: EB Garamond (headings) + Lato (body). Google Fonts via next/font.
- Layout: single centered column, ~640–720px measure for text, generous vertical
  rhythm. Section labels in small-caps Lato tracking-wide.

## Motion (Emil Kowalski rules)

- Section entrance: opacity 0→1 + translateY 8px→0, ~200ms ease-out, once, on
  scroll into view. Respect `prefers-reduced-motion`.
- Button press: scale 0.98, ~120ms.
- Link underline: 150ms wipe on hover.
- Nothing else animates.

## Backend

- Table `contact_submissions`: `id uuid pk default gen_random_uuid()`,
  `created_at timestamptz default now()`, `name text not null`,
  `email text not null`, `company text`, `message text not null`.
- RLS enabled, no public policy. Writes go through the Route Handler using the
  service_role key (server-only env), which bypasses RLS.
- `app/api/contact/route.ts`: hand-rolled validation (required fields, email
  shape, length caps, honeypot). Insert row; on insert failure return 500. Then
  send Resend email to tbell@ashvernholdings.com; on email failure log and still
  return 200 (the row is the durable record).
- Env (`.env.local`, not committed): `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`,
  `RESEND_API_KEY`, `CONTACT_NOTIFY_TO=tbell@ashvernholdings.com`,
  `CONTACT_NOTIFY_FROM=onboarding@resend.dev` (swap to a verified
  `@ashvernholdings.com` sender before public launch).

## Dependencies

`next`, `react`, `react-dom`, `tailwindcss`, `@supabase/supabase-js`, `resend`.
Nothing else.

## Verification

1. `npm run dev` against real Supabase + Resend keys.
2. Submit the form via browser automation.
3. Confirm the row exists in Supabase (query back via REST with service key).
4. Confirm Resend reports the email sent, and read the received email.
5. Confirm Investor Relations copy reads as neutral/informational.
6. Screenshots at 375px and 1280px.

## Copy stance

Plain declarative sentences. No "empower/unlock/seamless/trusted partner",
no invented metrics, no mission-statement puffery. Say what the entity is and does.
