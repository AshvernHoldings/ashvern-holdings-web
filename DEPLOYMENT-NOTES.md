# DEPLOYMENT NOTES

Where hosting for `ashvern-holdings-web` stands, why, and what to do next.

**Status (2026-09-02):** deployed to Netlify. Live at
<https://endearing-conkies-cc79c4.netlify.app>. Custom domain
(`ashvernholdings.com`) DNS is in progress. Vercel was attempted first and
abandoned — history kept below.

---

## Deployed to Netlify (2026-09-02)

- **Live URL:** <https://endearing-conkies-cc79c4.netlify.app>
  (Netlify site id `995bb498-cd1b-4bfa-9113-b3ab922749f9`).
- Deployed from `github.com/AshvernHoldings/ashvern-holdings-web` on a
  **separate Netlify account**, matching the Supabase isolation pattern.
- Env vars (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`,
  `CONTACT_NOTIFY_TO`, `CONTACT_NOTIFY_FROM`) set in Netlify's site environment
  settings.
- **Contact form tested end to end** on the live deployment: submission stored
  in Supabase and notification email delivered.
- **Custom domain:** `ashvernholdings.com` DNS records are being added to point
  at Netlify.

### Access control has been lifted — site is public

The `2026-09-02` access-gate described below is no longer in effect. Verified
`2026-09-10`: both `https://ashvernholdings.com/` and
`https://endearing-conkies-cc79c4.netlify.app/` return `200` on every path
checked, including `/api/keep-alive` — no `app.netlify.com/edge-access`
redirect. When exactly it was lifted (and by whom) isn't recorded; the site
has been fully public for at least some window before this was noticed.

- `KEEP_ALIVE_URL` is set to `https://ashvernholdings.com/api/keep-alive` and
  the `keep-alive` workflow has a verified successful manual run against it
  (`2026-09-10`).
- The site being reachable does **not** mean it's launch-ready — see
  `LAUNCH-BLOCKERS.md`. Item 1 (Resend domain verification) is still
  genuinely unresolved: no Resend DNS records exist for `ashvernholdings.com`
  (checked `2026-09-10`), and `app/api/contact/route.ts` is still running on
  the temporary sandbox workaround in production.
- `contact_submissions` in Supabase has only the 2 pre-launch test rows from
  `2026-09-02` (both from the site owner) — no third-party submissions have
  come in during the time the site was unknowingly public.

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

## Still to do

1. **Confirm the Vercel cleanup landed.** Check that support has removed the
   `AshvernHoldings` Vercel team and waived the accidental Pro invoice, with
   no lingering charge or team membership.
2. **Finish the `ashvernholdings.com` DNS cutover** to Netlify and confirm the
   custom domain + TLS resolve.
3. ~~Lift Netlify access control~~ — already lifted (see above); `KEEP_ALIVE_URL`
   is set and the workflow has a verified successful run.
4. **Clear the Resend-domain launch blocker** — see `LAUNCH-BLOCKERS.md`. This
   is the one real outstanding item: the site is publicly live right now
   without it cleared.

Netlify env vars (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`,
`CONTACT_NOTIFY_TO`, `CONTACT_NOTIFY_FROM`) are already set in the site's
environment settings.
