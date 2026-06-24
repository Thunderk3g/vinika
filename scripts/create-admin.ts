import { config } from "dotenv";
config({ path: ".env.local" });

import postgres from "postgres";

/**
 * Provision (or confirm) a Supabase Auth admin user for the CMS.
 *
 *   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='strong-pass' pnpm tsx scripts/create-admin.ts
 *
 * Talks to the GoTrue REST API directly (no supabase-js, so no Node WebSocket
 * dependency): signs the user up, then sets email_confirmed_at directly in
 * Postgres so the account can sign in without an email round-trip, and finally
 * verifies the password via the token endpoint.
 */
async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const dbUrl = process.env.DATABASE_URL;

  if (!email || !password) throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD");
  if (!url || !key || !dbUrl) throw new Error("Missing Supabase env vars");

  const headers = { apikey: key, "Content-Type": "application/json" };

  console.log(`[admin] signing up ${email}…`);
  const signupRes = await fetch(`${url}/auth/v1/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  });
  if (!signupRes.ok) {
    const text = await signupRes.text();
    if (/already|registered|exists/i.test(text)) {
      console.log("[admin] user already exists — confirming email only.");
    } else {
      throw new Error(`Sign-up failed (${signupRes.status}): ${text}`);
    }
  }

  // Confirm the email directly so the account can log in immediately.
  const sql = postgres(dbUrl, { max: 1 });
  const rows = await sql`
    update auth.users
       set email_confirmed_at = coalesce(email_confirmed_at, now())
     where email = ${email}
     returning id
  `;
  await sql.end();
  if (rows.length === 0) {
    throw new Error("User row not found after sign-up — check Supabase Auth settings.");
  }
  console.log("[admin] email confirmed ✓");

  // Verify the credentials actually work via the password grant.
  const tokenRes = await fetch(`${url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  });
  const tokenBody = await tokenRes.json();
  if (!tokenRes.ok || !tokenBody.access_token) {
    throw new Error(`Sign-in verification failed (${tokenRes.status}): ${JSON.stringify(tokenBody)}`);
  }

  console.log("\n[admin] ✅ admin ready — log in at /admin/login");
  console.log(`[admin]    email: ${email}`);
}

main().catch((err) => {
  console.error("[admin] failed:", err);
  process.exit(1);
});
