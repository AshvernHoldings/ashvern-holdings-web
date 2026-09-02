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

### Not yet public — access is gated

As of 2026-09-02 the site sits behind **Netlify access control**: every path,
including `/api/*`, returns `401` and the `app.netlify.com/edge-access` login
redirect to anyone without a Netlify session. This is fine for review but means:

- the site is not reachable by the public or by search engines yet;
- **the keep-alive cron (`.github/workflows/keep-alive.yml`) cannot reach
  `/api/keep-alive`** until this is lifted. Remove the site access
  restriction (or allow `/api/keep-alive` specifically) before relying on the
  workflow, then set the `KEEP_ALIVE_URL` repo variable and run it once.

See `LAUNCH-BLOCKERS.md` for the Resend-domain work still outstanding before
public launch.

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
3. **Lift Netlify access control** so the site (and `/api/keep-alive`) is
   publicly reachable, then set the `KEEP_ALIVE_URL` GitHub Actions repo
   variable to `https://<public-host>/api/keep-alive` and trigger the
   `keep-alive` workflow once to verify.
4. **Clear the Resend-domain launch blocker** — see `LAUNCH-BLOCKERS.md`.

Netlify env vars (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`,
`CONTACT_NOTIFY_TO`, `CONTACT_NOTIFY_FROM`) are already set in the site's
environment settings.
