# LAUNCH BLOCKERS — do not make this site public until these are cleared

## 1. Contact-form notification email — RESOLVED (2026-09-11)

`ashvernholdings.com` is verified at <https://resend.com/domains> (status
"verified", DKIM verified, both SPF CNAMEs verified). `.env.local` and
Netlify's production environment now have:

- `CONTACT_NOTIFY_FROM=hello@ashvernholdings.com`
- `CONTACT_NOTIFY_TO=tbell@ashvernholdings.com`

`app/api/contact/route.ts` no longer carries the sandbox-workaround comment
or the `onboarding@resend.dev` fallback.

## 2. Sender domain / production environment

- Move `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`,
  `CONTACT_NOTIFY_TO`, `CONTACT_NOTIFY_FROM` into the host's env settings
  (Vercel project env, etc.) — they are only in `.env.local` right now.
- Point a real domain at the deployment.
