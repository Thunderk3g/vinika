import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import CtaStrip from "@/components/CtaStrip";
import { getStudy } from "@/lib/work-content";

const PAD = "clamp(20px,5vw,64px)";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getStudy(slug);
  return {
    title: study ? `${study.title} — Vinika` : "Case Study — Vinika",
    description: study?.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getStudy(slug);
  if (!study) notFound();

  return (
    <PageShell>
      {/* HERO */}
      <header style={{ position: "relative", maxWidth: 1100, margin: "0 auto", padding: `clamp(130px,18vh,190px) ${PAD} clamp(40px,6vh,70px)` }}>
        <Link href="/work" className="blog-back">
          ← All case studies
        </Link>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 30, alignItems: "center" }}>
          <span className="eyebrow">CASE STUDY</span>
          {study.tags.map((t) => (
            <span key={t} className="svc-tag">
              {t}
            </span>
          ))}
        </div>
        <h1
          style={{
            margin: "26px 0 0",
            fontSize: "clamp(36px,5.6vw,76px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.02,
            maxWidth: "18ch",
            textWrap: "balance",
            color: "var(--cream)",
          }}
        >
          {study.title}
        </h1>
        <p style={{ margin: "28px 0 0", maxWidth: 600, fontSize: "clamp(16px,1.6vw,20px)", lineHeight: 1.6, color: "var(--muted)" }}>
          {study.summary}
        </p>
      </header>

      {/* HERO METRICS */}
      <section style={{ position: "relative", zIndex: 5, maxWidth: 1100, margin: "0 auto", padding: `0 ${PAD} clamp(50px,7vh,90px)` }}>
        <div
          style={{
            borderRadius: 28,
            border: "1px solid var(--line)",
            background: "linear-gradient(150deg,rgba(224,160,69,.16),rgba(245,225,200,.02))",
            padding: "clamp(34px,4vw,56px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
            gap: 30,
          }}
        >
          {study.heroMetrics.map((m) => (
            <div key={m.label}>
              <div style={{ fontSize: "clamp(40px,5vw,68px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, color: "var(--cream)" }}>
                {m.value}
              </div>
              <div style={{ marginTop: 8, fontSize: 14, color: "rgba(245,225,200,0.7)" }}>{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* NARRATIVE SECTIONS */}
      {study.sections.map((sec) => (
        <section key={sec.n} style={{ position: "relative", zIndex: 5, padding: `clamp(50px,7vh,90px) ${PAD}`, borderTop: "1px solid var(--line)" }}>
          <div
            className="grid-2-collapse"
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "minmax(160px,0.55fr) 1.45fr",
              gap: "clamp(24px,4vw,60px)",
            }}
          >
            <div>
              <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, letterSpacing: "0.14em", color: "var(--amber)" }}>
                {sec.n}
              </div>
              <h2 style={{ margin: "14px 0 0", fontSize: "clamp(24px,2.8vw,40px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.08, color: "var(--cream)" }}>
                {sec.title}
              </h2>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: "clamp(16px,1.55vw,19px)", lineHeight: 1.65, color: "rgba(245,225,200,0.72)", textWrap: "pretty" }}>
                {sec.body}
              </p>
              {sec.points && sec.points.length > 0 && (
                <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 14 }}>
                  {sec.points.map((pt) => (
                    <div key={pt} style={{ display: "flex", gap: 13, alignItems: "flex-start" }}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--amber)", marginTop: 8, flexShrink: 0 }} />
                      <span style={{ fontSize: 15, lineHeight: 1.55, color: "rgba(245,225,200,0.66)" }}>{pt}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* PULL QUOTE */}
      <section style={{ position: "relative", zIndex: 5, padding: `clamp(56px,9vh,110px) ${PAD}`, borderTop: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 920, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: "clamp(24px,3.4vw,46px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.25, textWrap: "balance", color: "var(--cream)" }}>
            &ldquo;{study.quote.text}&rdquo;
          </div>
          <div style={{ marginTop: 28, fontSize: 15, color: "var(--muted-2)" }}>{study.quote.attribution}</div>
        </div>
      </section>

      <CtaStrip
        title="Want results like these?"
        blurb="Every engagement starts with a conversation about the outcome you're after."
        secondary={{ label: "More case studies", href: "/work" }}
      />
    </PageShell>
  );
}
