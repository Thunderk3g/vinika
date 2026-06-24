import { config } from "dotenv";
config({ path: ".env.local" });

import postgres from "postgres";

/**
 * Idempotent RLS + grant setup for the public Data API.
 *
 * The Next.js app talks to Postgres as the `postgres` role (superuser, which
 * bypasses RLS), so these policies do not affect server-side reads/writes.
 * They exist purely as defense-in-depth for the PostgREST Data API reachable
 * with the publishable/anon key: published blog posts and site content are
 * world-readable; drafts and all writes are not exposed to anon/authenticated.
 */
async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("Missing DATABASE_URL");
  const sql = postgres(url, { max: 1 });

  await sql.unsafe(`
    alter table public.site_content enable row level security;
    alter table public.blog_posts  enable row level security;

    drop policy if exists site_content_read on public.site_content;
    create policy site_content_read on public.site_content
      for select to anon, authenticated using (true);

    drop policy if exists blog_posts_read_published on public.blog_posts;
    create policy blog_posts_read_published on public.blog_posts
      for select to anon, authenticated using (status = 'published');

    grant usage on schema public to anon, authenticated;
    grant select on public.site_content to anon, authenticated;
    grant select on public.blog_posts  to anon, authenticated;

    -- appointments are private: RLS on, no anon/authenticated grants or policies.
    -- All writes go through the server (postgres superuser), never the Data API.
    alter table public.appointments enable row level security;
  `);

  const [{ count: contentCount }] = await sql`select count(*)::int from public.site_content`;
  const [{ count: blogCount }] = await sql`select count(*)::int from public.blog_posts`;
  const [{ count: publishedCount }] =
    await sql`select count(*)::int from public.blog_posts where status = 'published'`;

  console.log("[policies] RLS enabled + grants applied ✓");
  console.log(`[policies] site_content rows: ${contentCount}`);
  console.log(`[policies] blog_posts rows: ${blogCount} (published: ${publishedCount})`);

  await sql.end();
}

main().catch((err) => {
  console.error("[policies] failed:", err);
  process.exit(1);
});
