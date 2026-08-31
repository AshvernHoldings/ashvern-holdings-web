# DEPLOYMENT NOTES

Where hosting for `ashvern-holdings-web` stands, why, and what to do next.

**Status (2026-08-30):** not deployed. Vercel was attempted and abandoned;
the plan is now Netlify. See below.

---

## Vercel attempt — abandoned

A Vercel deployment was attempted for this project and hit two real problems:

### 1. Vercel's free tier prohibits commercial use

Vercel's free **Hobby** plan is explicitly for non-commercial use only. This
site is the corporate presence for Ashvern Holdings, Inc., which is a
commercial use, so Hobby is not a legitimate option here — a paid plan would
be required to host it on Vercel at all.

### 2. A separate Vercel Team defaulted to a paid Pro subscription

To keep this account-level separate from Ridgepoint's Vercel projects (the
same isolation approach used for Supabase), a new Vercel **Team**
(`AshvernHoldings`) was created. Creating that team unexpectedly landed on an
**active Pro subscription** — a real payment method attached, a real invoice
accruing — which was not the intended cost.

**Open support ticket:** a Vercel support request is open asking that

- the `AshvernHoldings` team be removed, and
- the accidental Pro invoice be waived.

This is unresolved as of the date above.

---

## Decision: use Netlify for this project

Move `ashvern-holdings-web` to **Netlify** instead of Vercel, specifically for
this project:

- **Commercial use is allowed on the free tier.** Netlify's free (Starter)
  tier explicitly permits commercial use, which Vercel's free tier does not.
  That removes the "must pay just to host a small corporate site" problem.
- **Account separation is preserved.** A **separate Netlify account** — same
  pattern as the separate Supabase account — keeps Ashvern's hosting
  isolated from Ridgepoint's infrastructure without the paid-team surprise
  that Vercel produced.

This decision is scoped to this project; it does not change hosting for any
Ridgepoint project.

---

## Next session — pick up here

1. **Confirm the Vercel cleanup landed.** Check that support has removed the
   `AshvernHoldings` Vercel team and waived the accidental Pro invoice, with
   no lingering charge or team membership.
2. **Create a new, separate Netlify account** for Ashvern (not tied to any
   Ridgepoint Netlify/Vercel login).
3. **Deploy `ashvern-holdings-web` on Netlify** from
   `github.com/AshvernHoldings/ashvern-holdings-web`, and connect the
   `ashvernholdings.com` domain to **Netlify**, not Vercel.

When deploying, the environment variables currently only in `.env.local`
(`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`,
`CONTACT_NOTIFY_TO`, `CONTACT_NOTIFY_FROM`) must be set in Netlify's site
environment settings — see `LAUNCH-BLOCKERS.md`, which also lists the
Resend-domain work that must be done before the site is public.
