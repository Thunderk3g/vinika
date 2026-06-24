import Link from "next/link";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { blogPosts, siteContent } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

async function counts() {
  try {
    const [c] = await db.select({ n: sql<number>`count(*)::int` }).from(siteContent);
    const [p] = await db.select({ n: sql<number>`count(*)::int` }).from(blogPosts);
    const [pub] = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(blogPosts)
      .where(sql`status = 'published'`);
    return { sections: c?.n ?? 0, posts: p?.n ?? 0, published: pub?.n ?? 0 };
  } catch {
    return { sections: 0, posts: 0, published: 0 };
  }
}

export default async function Dashboard() {
  const { sections, posts, published } = await counts();
  const cards = [
    { label: "Content sections", value: sections, href: "/admin/content", cta: "Edit content" },
    { label: "Blog posts", value: posts, href: "/admin/blog", cta: "Manage blog" },
    { label: "Published posts", value: published, href: "/admin/blog", cta: "Manage blog" },
  ];
  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 6px", color: "var(--cream)" }}>
        Dashboard
      </h1>
      <p style={{ color: "var(--muted)", margin: "0 0 28px" }}>
        Manage the Vinika website content and blog.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 16,
        }}
      >
        {cards.map((c) => (
          <div key={c.label} className="adm-card">
            <div style={{ fontSize: 38, fontWeight: 700, color: "var(--amber)", lineHeight: 1 }}>
              {c.value}
            </div>
            <div style={{ color: "var(--muted)", fontSize: 14, margin: "8px 0 16px" }}>
              {c.label}
            </div>
            <Link href={c.href} className="btn-ghost btn-sm">
              {c.cta} →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
