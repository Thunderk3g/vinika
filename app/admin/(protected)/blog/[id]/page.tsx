import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import BlogForm from "../_components/BlogForm";
import type { BlogFormInput } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
  if (!post) notFound();

  const initial: BlogFormInput = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt ?? "",
    body: post.body ?? "",
    coverImageUrl: post.coverImageUrl ?? "",
    category: post.category ?? "",
    author: post.author ?? "",
    readTime: post.readTime ?? "",
    status: post.status,
  };

  return (
    <div>
      <Link href="/admin/blog" className="blog-back" style={{ marginBottom: 16, display: "inline-flex" }}>
        ← Blog
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "12px 0 20px" }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: "var(--cream)" }}>
          Edit post
        </h1>
        <span className={`adm-pill ${post.status}`}>{post.status}</span>
        {post.status === "published" && (
          <a
            href={`/insights/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="blog-back"
          >
            View live ↗
          </a>
        )}
      </div>
      <BlogForm mode="edit" postId={post.id} initial={initial} />
    </div>
  );
}
