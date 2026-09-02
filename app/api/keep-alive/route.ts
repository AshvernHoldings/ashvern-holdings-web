import { createClient } from "@supabase/supabase-js";

// Trivial Supabase read that resets the free-tier inactivity timer so the
// project isn't paused after 7 days of no traffic. Pinged on a schedule by
// .github/workflows/keep-alive.yml. A GET Route Handler that hits the database
// is dynamic by default, so no caching config is needed.

export async function GET() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.error("Supabase env vars are not set");
    return Response.json({ error: "Server is not configured." }, { status: 500 });
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false },
  });

  // HEAD count: no rows transferred, just enough of a query to count as activity.
  const { count, error } = await supabase
    .from("contact_submissions")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error("keep-alive query failed:", error);
    return Response.json({ error: "Query failed." }, { status: 500 });
  }

  return Response.json({ ok: true, count: count ?? 0, at: new Date().toISOString() });
}
