# LAUNCH BLOCKERS — do not make this site public until these are cleared

## 1. Contact-form notification email is a temporary workaround

**Status:** working in development only, pointed at the wrong mailbox.

**What's wrong now**

- The Resend account has no verified sending domain, so Resend is in sandbox
  mode: it will only deliver mail to the account-owner address
  (`tbell@ashvernholdingsllc.com` — note the `llc`).
- To keep testing unblocked, `.env.local` currently has:
  - `CONTACT_NOTIFY_TO=tbell@ashvernholdingsllc.com` (should be
    `tbell@ashvernholdings.com`, the address shown on the site)
  - `CONTACT_NOTIFY_FROM=onboarding@resend.dev` (Resend's shared sender)
- If this ships as-is, contact-form notifications go to the wrong inbox, and any
  attempt to point them at `tbell@ashvernholdings.com` will silently fail
  (submissions still get stored in Supabase, but nobody is emailed).

**Real fix**

1. Verify `ashvernholdings.com` (or `ashvernholdingsllc.com`) at
   <https://resend.com/domains> and add the DNS records it asks for.
2. In `.env.local` (and the production environment):
   - set `CONTACT_NOTIFY_FROM` to an address on the verified domain,
     e.g. `hello@ashvernholdings.com`
   - set `CONTACT_NOTIFY_TO` to `tbell@ashvernholdings.com`
3. Submit the form once and confirm the email arrives.

Reference in code: `app/api/contact/route.ts`, the block marked
`⚠️ TEMPORARY WORKAROUND`.

## 2. Sender domain / production environment

- Move `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`,
  `CONTACT_NOTIFY_TO`, `CONTACT_NOTIFY_FROM` into the host's env settings
  (Vercel project env, etc.) — they are only in `.env.local` right now.
- Point a real domain at the deployment.
