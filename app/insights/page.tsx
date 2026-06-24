import Link from "next/link";
import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import NewsletterForm from "@/components/NewsletterForm";
import { getPublishedPosts } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Insights — Vinika",
  description: "Thinking worth your time on strategy, branding, and operations.",
};

function fmtMonthYear(d: Date | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

const WRAP_PAD = "0 clamp(20px,5vw,64px)";

export default async function InsightsIndex({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: rawCategory } = await searchParams;
  const allPosts = await getPublishedPosts();

  // Distinct categories (preserve newest-first order of appearance)
  const categories: string[] = [];
  for (const p of allPosts) {
    if (p.category && !categories.includes(p.category)) categories.push(p.category);
  }

  const selected = rawCategory?.trim() || null;
  const isAll = !selected || selected.toLowerCase() === "all";

  const visiblePosts = isAll
    ? allPosts
    : allPosts.filter(
        (p) => (p.category ?? "").toLowerCase() === selected!.toLowerCase()
      );

  const featured = visiblePosts[0] ?? null;
  const gridPosts = featured ? visiblePosts.slice(1) : [];

  const chips: { label: string; href: string; active: boolean }[] = [
    {
      label: "All",
      href: "/insights",
      active: isAll,
    },
    ...categories.map((c) => ({
      label: c,
      href: `/insights?category=${encodeURIComponent(c)}`,
      active: !isAll && c.toLowerCase() === selected!.toLowerCase(),
    })),
  ];

  return (
    <PageShell>
      {/* ============================ HEADER ============================ */}
      <header
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding:
            "clamp(140px,20vh,200px) clamp(20px,5vw,64px) clamp(40px,6vh,70px)",
        }}
      >
        <p className="eyebrow">INSIGHTS</p>
        <h1
          style={{
            margin: "18px 0 22px",
            fontSize: "clamp(40px,6.4vw,92px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.02,
            color: "var(--cream)",
            maxWidth: "14ch",
            textWrap: "balance",
          }}
        >
          Thinking worth your time.
        </h1>
        <p
          style={{
            margin: 0,
            color: "var(--muted)",
            fontSize: "clamp(16px,1.4vw,18px)",
            lineHeight: 1.6,
            maxWidth: 560,
          }}
        >
          Sharp, opinionated writing on strategy, brand, and growth — no fluff, no
          recycled best-practice lists.
        </p>
      </header>

      {allPosts.length === 0 ? (
        <section
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: `clamp(20px,5vh,60px) ${"clamp(20px,5vw,64px)"} clamp(80px,12vh,140px)`,
          }}
        >
          <p style={{ color: "var(--muted)", fontSize: 17 }}>
            No posts published yet.
          </p>
        </section>
      ) : (
        <>
          {/* ===================== FEATURED ARTICLE ===================== */}
          {featured && (
            <section
              style={{
                maxWidth: 1280,
                margin: "0 auto",
                padding: WRAP_PAD,
              }}
            >
              <Link
                href={`/insights/${featured.slug}`}
                className="grid-2-collapse insight-featured"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.15fr 1fr",
                  gap: 0,
                  borderRadius: 28,
                  border: "1px solid var(--line)",
                  background: "var(--surface)",
                  overflow: "hidden",
                  textDecoration: "none",
                  color: "var(--cream)",
                  transition: "border-color 0.3s",
                }}
              >
                {/* Left gradient panel */}
                <div
                  style={{
                    minHeight: 360,
                    display: "flex",
                    alignItems: "flex-end",
                    padding: 30,
                    background:
                      "linear-gradient(150deg,rgba(224,160,69,0.2),rgba(245,225,200,0.02))",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Geist Mono', ui-monospace, monospace",
                      fontSize: 12,
                      letterSpacing: "0.1em",
                      padding: "8px 14px",
                      borderRadius: 100,
                      background: "rgba(10,49,101,0.5)",
                      border: "1px solid var(--line-strong)",
                      color: "var(--cream)",
                    }}
                  >
                    {`FEATURED${featured.category ? ` · ${featured.category}` : ""}`}
                  </span>
                </div>

                {/* Right content */}
                <div
                  style={{
                    padding: "clamp(34px,4vw,56px)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "clamp(26px,3.2vw,46px)",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.08,
                      color: "var(--cream)",
                      textWrap: "balance",
                    }}
                  >
                    {featured.title}
                  </h2>
                  {featured.excerpt && (
                    <p
                      style={{
                        margin: "18px 0 0",
                        fontSize: 16,
                        lineHeight: 1.6,
                        color: "var(--muted)",
                      }}
                    >
                      {featured.excerpt}
                    </p>
                  )}
                  <div
                    style={{
                      marginTop: 26,
                      fontSize: 14,
                      color: "var(--muted-2)",
                    }}
                  >
                    {[featured.readTime, fmtMonthYear(featured.publishedAt)]
                      .filter(Boolean)
                      .join("  ·  ")}
                  </div>
                </div>
              </Link>
            </section>
          )}

          {/* ===================== CATEGORY FILTER ===================== */}
          {categories.length > 0 && (
            <section
              style={{
                maxWidth: 1280,
                margin: "0 auto",
                padding: `clamp(36px,5vh,56px) clamp(20px,5vw,64px) clamp(20px,3vh,28px)`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                {chips.map((chip) => (
                  <Link
                    key={chip.href}
                    href={chip.href}
                    className={`chip-link${chip.active ? " active" : ""}`}
                  >
                    {chip.label}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ======================= ARTICLE GRID ====================== */}
          <section
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: `clamp(20px,3vh,30px) clamp(20px,5vw,64px) clamp(80px,12vh,130px)`,
            }}
          >
            {gridPosts.length === 0 ? (
              <p style={{ color: "var(--muted)", fontSize: 16 }}>
                {featured
                  ? "That's the only piece in this category — for now."
                  : "No posts in this category yet."}
              </p>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
                  gap: 22,
                }}
              >
                {gridPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/insights/${post.slug}`}
                    className="insight-card"
                  >
                    <div className="insight-thumb">
                      <span
                        style={{
                          fontFamily: "'Geist Mono', ui-monospace, monospace",
                          fontSize: 11,
                          letterSpacing: "0.1em",
                          padding: "6px 12px",
                          borderRadius: 100,
                          background: "rgba(10,49,101,0.5)",
                          border: "1px solid var(--line-strong)",
                          color: "var(--cream)",
                        }}
                      >
                        {post.category ?? "INSIGHT"}
                      </span>
                    </div>
                    <h3
                      style={{
                        margin: "18px 0 0",
                        fontSize: 20,
                        fontWeight: 600,
                        lineHeight: 1.3,
                        letterSpacing: "-0.01em",
                        color: "var(--cream)",
                      }}
                    >
                      {post.title}
                    </h3>
                    <div
                      style={{
                        marginTop: 10,
                        fontSize: 13,
                        color: "rgba(245,225,200,0.45)",
                      }}
                    >
                      {[post.readTime, fmtMonthYear(post.publishedAt)]
                        .filter(Boolean)
                        .join("  ·  ")}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* ===================== NEWSLETTER CTA ====================== */}
          <section
            style={{
              borderTop: "1px solid var(--line)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* faint amber radial glow */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: "-30%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "min(900px,90vw)",
                height: 500,
                background:
                  "radial-gradient(closest-side,rgba(224,160,69,0.14),rgba(224,160,69,0))",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "relative",
                maxWidth: 1280,
                margin: "0 auto",
                padding:
                  "clamp(70px,12vh,130px) clamp(20px,5vw,64px) clamp(90px,14vh,150px)",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "clamp(30px,4.4vw,56px)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  color: "var(--cream)",
                  textWrap: "balance",
                }}
              >
                One sharp idea, twice a month.
              </h2>
              <p
                style={{
                  margin: "18px auto 32px",
                  maxWidth: 520,
                  fontSize: "clamp(15px,1.3vw,17px)",
                  lineHeight: 1.6,
                  color: "var(--muted)",
                }}
              >
                No noise. Just the thinking we&rsquo;d want if we were in your seat.
              </p>
              <NewsletterForm />
            </div>
          </section>
        </>
      )}
    </PageShell>
  );
}
