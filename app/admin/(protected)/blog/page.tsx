import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

function fmt(d: Date | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function BlogListPage() {
  const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.updatedAt));

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 4px", color: "var(--cream)" }}>
            Blog
          </h1>
          <p style={{ color: "var(--muted)", margin: 0 }}>Create and manage insight posts.</p>
        </div>
        <Link href="/admin/blog/new" className="btn-accent btn-sm">
          + New post
        </Link>
      </div>

      <div className="adm-card" style={{ padding: 0, overflow: "hidden" }}>
        {posts.length === 0 ? (
          <div style={{ padding: 28, color: "var(--muted)" }}>No posts yet.</div>
        ) : (
          <table className="adm-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Category</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id}>
                  <td>
                    <Link
                      href={`/admin/blog/${p.id}`}
                      style={{ color: "var(--cream)", textDecoration: "none", fontWeight: 600 }}
                    >
                      {p.title}
                    </Link>
                    <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>/{p.slug}</div>
                  </td>
                  <td>
                    <span className={`adm-pill ${p.status}`}>{p.status}</span>
                  </td>
                  <td style={{ color: "var(--muted)" }}>{p.category ?? "—"}</td>
                  <td style={{ color: "var(--muted)" }}>{fmt(p.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
