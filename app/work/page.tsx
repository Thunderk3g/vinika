import Link from "next/link";
import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import CtaStrip from "@/components/CtaStrip";
import { caseStudies, getStudy, FEATURED_SLUG } from "@/lib/work-content";

export const metadata: Metadata = {
  title: "Case Studies — Vinika",
  description: "Engagements where strategy turned into measurable, durable growth.",
};

const PAD = "clamp(20px,5vw,64px)";

export default function WorkPage() {
  const featured = getStudy(FEATURED_SLUG) ?? caseStudies[0];
  const rest = caseStudies.filter((c) => c.slug !== featured.slug);

  return (
    <PageShell>
      {/* HEADER */}
      <header
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "0 auto",
          padding: `clamp(140px,20vh,200px) ${PAD} clamp(50px,7vh,80px)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "34%",
            right: "-6%",
            width: 520,
            height: 520,
            maxWidth: "80vw",
            background: "radial-gradient(circle,rgba(224,160,69,.1),rgba(224,160,69,0) 62%)",
            pointerEvents: "none",
          }}
        />
        <p className="eyebrow">CASE STUDIES</p>
        <h1
          style={{
            margin: "22px 0 0",
            fontSize: "clamp(40px,6.4vw,92px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            maxWidth: "14ch",
            textWrap: "balance",
            color: "var(--cream)",
          }}
        >
          Outcomes, not deliverables.
        </h1>
        <p style={{ margin: "30px 0 0", maxWidth: 560, fontSize: "clamp(16px,1.6vw,20px)", lineHeight: 1.6, color: "var(--muted)" }}>
          A selection of engagements where strategy turned into measurable, durable growth.
        </p>
      </header>

      {/* FEATURED */}
      <section style={{ position: "relative", zIndex: 5, maxWidth: 1280, margin: "0 auto", padding: `0 ${PAD} clamp(30px,5vh,60px)` }}>
        <Link
          href={`/work/${featured.slug}`}
          className="grid-2-collapse story-card"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: 0,
            minHeight: "unset",
            padding: 0,
            borderRadius: 28,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "clamp(34px,4vw,60px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 40,
              minHeight: 380,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <span className="eyebrow">FEATURED</span>
              <span className="svc-tag">{featured.sector}</span>
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: "clamp(26px,3.2vw,44px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.05, color: "var(--cream)" }}>
                {featured.title}
              </h2>
              <p style={{ margin: "18px 0 0", maxWidth: "46ch", fontSize: 16, lineHeight: 1.6, color: "var(--muted)" }}>
                {featured.summary}
              </p>
              <div style={{ marginTop: 26, fontSize: 15, fontWeight: 600, color: "var(--amber)" }}>Read case study →</div>
            </div>
          </div>
          <div
            style={{
              background: "linear-gradient(150deg,rgba(224,160,69,.18),rgba(245,225,200,.02))",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 40,
              minHeight: 380,
            }}
          >
            <div style={{ fontSize: "clamp(64px,10vw,128px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.9, color: "var(--cream)" }}>
              {featured.metric}
            </div>
            <div style={{ marginTop: 12, fontSize: 15, color: "var(--muted)" }}>{featured.metricLabel}</div>
          </div>
        </Link>
      </section>

      {/* GRID */}
      <section style={{ position: "relative", zIndex: 5, maxWidth: 1280, margin: "0 auto", padding: `clamp(20px,4vh,40px) ${PAD} clamp(60px,9vh,110px)` }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 22 }}>
          {rest.map((cs) => (
            <Link
              key={cs.slug}
              href={`/work/${cs.slug}`}
              className="story-card reveal-up"
              style={{ display: "flex", flexDirection: "column", minHeight: "unset", padding: 0, overflow: "hidden", borderRadius: 24 }}
            >
              <div
                style={{
                  aspectRatio: "16/10",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(150deg,rgba(224,160,69,.13),rgba(245,225,200,.015))",
                }}
              >
                <div style={{ fontSize: "clamp(44px,5vw,68px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, color: "var(--cream)" }}>
                  {cs.metric}
                </div>
                <div style={{ marginTop: 8, fontSize: 13, color: "var(--muted)" }}>{cs.metricLabel}</div>
              </div>
              <div style={{ padding: "26px 28px 30px" }}>
                <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, letterSpacing: "0.1em", color: "var(--muted-2)" }}>
                  {cs.sector}
                </div>
                <h3 style={{ margin: "12px 0 0", fontSize: 20, fontWeight: 600, lineHeight: 1.3, textWrap: "pretty", color: "var(--cream)" }}>
                  {cs.title}
                </h3>
                <div style={{ marginTop: 20, fontSize: 14, fontWeight: 500, color: "var(--muted)" }}>Read case study →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CtaStrip
        title="Your story could be next."
        blurb="Let's talk about the outcome you're chasing — and how we'd get you there."
      />
    </PageShell>
  );
}
