import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function bad(error: string, status = 400) {
  return Response.json({ error }, { status });
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return bad("Invalid request.");
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const company = String(body.company ?? "").trim();
  const message = String(body.message ?? "").trim();
  const honeypot = String(body.website ?? "").trim();

  // Bot filled the hidden field — accept silently, store nothing.
  if (honeypot) return Response.json({ ok: true });

  if (!name || !email || !message)
    return bad("Name, email, and message are all required.");
  if (!EMAIL_RE.test(email)) return bad("Please enter a valid email address.");
  if (
    name.length > 200 ||
    email.length > 320 ||
    company.length > 200 ||
    message.length > 5000
  )
    return bad("One or more fields is too long.");

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.error("Supabase env vars are not set");
    return bad("Server is not configured. Please email us directly.", 500);
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
  const { error: dbError } = await supabase
    .from("contact_submissions")
    .insert({ name, email, company: company || null, message });

  if (dbError) {
    console.error("contact_submissions insert failed:", dbError);
    return bad("Something went wrong on our end. Please try again.", 500);
  }

  // Row is saved — the durable record. Email is best-effort notification.
  //
  // ⚠️ TEMPORARY WORKAROUND — MUST FIX BEFORE PUBLIC LAUNCH (see LAUNCH-BLOCKERS.md)
  // Resend is in sandbox mode: with no verified domain it only delivers to the
  // account-owner address, so CONTACT_NOTIFY_TO in .env.local is currently set to
  // tbell@ashvernholdingsllc.com and CONTACT_NOTIFY_FROM to the shared
  // onboarding@resend.dev sender. Real fix: verify ashvernholdings.com at
  // resend.com/domains, set CONTACT_NOTIFY_FROM to an address on that domain, and
  // set CONTACT_NOTIFY_TO back to tbell@ashvernholdings.com. Until then, form
  // submissions notify the wrong mailbox / would silently fail to notify at all.
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      const { data: mailData, error: mailError } = await resend.emails.send({
        from: process.env.CONTACT_NOTIFY_FROM || "onboarding@resend.dev",
        to: process.env.CONTACT_NOTIFY_TO || "tbell@ashvernholdings.com",
        replyTo: email,
        subject: `Contact form — ${name}`,
        text: [
          `Name:    ${name}`,
          `Email:   ${email}`,
          `Company: ${company || "—"}`,
          "",
          message,
        ].join("\n"),
      });
      if (mailError) console.error("notification email failed:", mailError);
      else console.log("notification email sent:", mailData?.id);
    } catch (e) {
      console.error("notification email threw:", e);
    }
  } else {
    console.warn("RESEND_API_KEY not set — skipped notification email");
  }

  return Response.json({ ok: true });
}
