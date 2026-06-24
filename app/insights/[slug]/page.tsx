import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedPostBySlug } from "@/lib/db/queries";
import { renderMarkdown } from "@/lib/markdown";

export const dynamic = "force-dynamic";

function fmtDate(d: Date | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return { title: "Insight — Vinika" };
  return {
    title: `${post.title} — Vinika`,
    description: post.excerpt ?? undefined,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const html = await renderMarkdown(post.body || "");

  return (
    <main style={{ minHeight: "100vh" }}>
      <nav className="nav2">
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-white.png"
            alt="Vinika"
            style={{ height: 24, width: "auto", display: "block" }}
          />
        </Link>
        <Link href="/insights" className="blog-back">
          ← All insights
        </Link>
      </nav>

      <article className="blog-shell">
        <div
          style={{
            display: "flex",
            gap: 14,
            alignItems: "center",
            flexWrap: "wrap",
            fontFamily: "'Geist Mono', monospace",
            fontSize: 12,
            letterSpacing: "0.08em",
            color: "var(--amber)",
            marginBottom: 22,
          }}
        >
          <span>{post.category ?? "INSIGHT"}</span>
          <span style={{ color: "rgba(245,225,200,0.35)" }}>
            {[fmtDate(post.publishedAt), post.readTime].filter(Boolean).join("  ·  ")}
          </span>
        </div>

        <h1
          style={{
            margin: "0 0 18px",
            fontSize: "clamp(34px,5vw,58px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.04,
            color: "var(--cream)",
            textWrap: "balance",
          }}
        >
          {post.title}
        </h1>

        {post.excerpt && (
          <p
            style={{
              fontSize: 19,
              lineHeight: 1.6,
              color: "var(--muted)",
              margin: "0 0 36px",
            }}
          >
            {post.excerpt}
          </p>
        )}

        {post.coverImageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImageUrl}
            alt={post.title}
            style={{
              width: "100%",
              borderRadius: 18,
              border: "1px solid var(--line)",
              margin: "0 0 36px",
              display: "block",
            }}
          />
        )}

        <div
          style={{
            height: 1,
            background: "var(--line)",
            margin: "0 0 36px",
          }}
        />

        <div className="prose-vinika" dangerouslySetInnerHTML={{ __html: html }} />

        <div style={{ marginTop: 56, paddingTop: 28, borderTop: "1px solid var(--line)" }}>
          <Link href="/#contact" className="btn-accent" style={{ padding: "12px 24px" }}>
            Start a conversation →
          </Link>
        </div>
      </article>
    </main>
  );
}
