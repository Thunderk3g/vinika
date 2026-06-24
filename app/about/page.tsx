import type { CSSProperties } from "react";
import PageShell from "@/components/PageShell";
import CtaStrip from "@/components/CtaStrip";
import { team } from "@/lib/about-content";

export const metadata = {
  title: "About — Vinika",
  description:
    "Vinika is a senior growth partner for businesses ready to make a decisive move — strategists who ship and stay accountable through execution.",
};

/* Shared section frame: top border + responsive padding + centered inner column. */
const sectionStyle: CSSProperties = {
  position: "relative",
  zIndex: 5,
  padding: "clamp(70px,11vh,130px) clamp(20px,5vw,64px)",
  borderTop: "1px solid var(--line)",
};
const innerStyle: CSSProperties = { maxWidth: 1280, margin: "0 auto" };

const h2Style: CSSProperties = {
  margin: 0,
  fontWeight: 700,
  letterSpacing: "-0.02em",
  lineHeight: 1.05,
  color: "var(--cream)",
};

const philosophy: { num: string; title: string; body: string }[] = [
  {
    num: "i.",
    title: "Clarity beats complexity",
    body: "The best strategy is the one your team can actually act on. We cut to the few decisions that matter.",
  },
  {
    num: "ii.",
    title: "Outcomes over output",
    body: "We don't sell decks by the pound. We're measured by what changes in your business, not what we hand over.",
  },
  {
    num: "iii.",
    title: "In the room, not above it",
    body: "We embed alongside your team and stay accountable through execution — not just the strategy phase.",
  },
];

const approach: { letter: string; title: string; body: string }[] = [
  {
    letter: "A.",
    title: "We start with the truth",
    body: "Before any recommendation, we get to the real constraints — the ones inside the org, not just the market.",
  },
  {
    letter: "B.",
    title: "We make the bet explicit",
    body: "A sharp, prioritized plan with clear sequencing and the metrics that prove it's working.",
  },
  {
    letter: "C.",
    title: "We stay until it sticks",
    body: "Execution support and advisory keep momentum compounding long after the strategy is signed off.",
  },
];

const stats: { value: string; label: string }[] = [
  { value: "120+", label: "Engagements delivered" },
  { value: "9", label: "Markets entered" },
  { value: "$2.1B", label: "Client revenue influenced" },
];

const whyVinika: { title: string; body: string }[] = [
  {
    title: "A senior team, always",
    body: "No junior hand-off. The people who win the work do the work.",
  },
  {
    title: "Execution, included",
    body: "We help you ship — not just decide. Strategy and delivery under one roof.",
  },
  {
    title: "Accountable to outcomes",
    body: "We measure ourselves by your numbers, not our hours.",
  },
  {
    title: "Built to move fast",
    body: "Small, decisive, and free of the bureaucracy that slows big firms down.",
  },
];

export default function AboutPage() {
  return (
    <PageShell>
      {/* 1) HEADER */}
      <header
        style={{
          position: "relative",
          zIndex: 5,
          maxWidth: 1280,
          margin: "0 auto",
          padding:
            "clamp(140px,20vh,200px) clamp(20px,5vw,64px) clamp(60px,9vh,110px)",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 560,
            height: 560,
            maxWidth: "80vw",
            background:
              "radial-gradient(circle,rgba(224,160,69,.13),rgba(224,160,69,0) 60%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative" }}>
          <p className="eyebrow">ABOUT VINIKA</p>
          <h1
            style={{
              margin: "20px 0 0",
              fontSize: "clamp(40px,6.4vw,92px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.04,
              maxWidth: "16ch",
              textWrap: "balance",
              color: "var(--cream)",
            }}
          >
            We're not a consultancy. We're a growth partner.
          </h1>
          <p
            style={{
              margin: "28px 0 0",
              maxWidth: 560,
              fontSize: "clamp(16px,1.6vw,20px)",
              lineHeight: 1.6,
              color: "var(--muted)",
            }}
          >
            Vinika exists for businesses that are done with incremental —
            leaders ready to make a decisive move and need a partner who'll make
            it with them.
          </p>
        </div>
      </header>

      {/* 2) WHO WE ARE */}
      <section style={sectionStyle}>
        <div
          className="grid-2-collapse"
          style={{
            ...innerStyle,
            display: "grid",
            gridTemplateColumns: "minmax(220px,0.8fr) 1.4fr",
            gap: "clamp(30px,5vw,80px)",
          }}
        >
          <div>
            <p className="eyebrow">01 — WHO WE ARE</p>
            <h2
              style={{ ...h2Style, marginTop: 16, fontSize: "clamp(26px,3vw,40px)" }}
            >
              Strategists who ship.
            </h2>
          </div>
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(18px,2vw,26px)",
                lineHeight: 1.5,
                color: "rgba(245,225,200,.82)",
              }}
            >
              We're a small, senior team of operators, strategists, and brand
              builders. We've scaled companies, entered new markets, and rebuilt
              brands from the inside — so we know the difference between a plan
              that looks good in a deck and one that survives contact with
              reality.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
                gap: 24,
                marginTop: 48,
              }}
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <div
                    style={{
                      fontSize: "clamp(34px,4vw,52px)",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      color: "var(--amber)",
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      marginTop: 6,
                      fontSize: 14,
                      color: "rgba(245,225,200,.55)",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3) PHILOSOPHY */}
      <section style={sectionStyle}>
        <div style={innerStyle}>
          <p className="eyebrow">02 — OUR PHILOSOPHY</p>
          <h2
            style={{
              ...h2Style,
              marginTop: 16,
              fontSize: "clamp(28px,3.6vw,52px)",
              maxWidth: "20ch",
            }}
          >
            Three beliefs that shape everything we do.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 18,
              marginTop: 48,
            }}
          >
            {philosophy.map((p) => (
              <article
                key={p.num}
                className="glass-card reveal-up"
                style={{ padding: "34px 30px" }}
              >
                <div
                  style={{
                    fontFamily: '"Geist Mono", ui-monospace, monospace',
                    fontSize: 14,
                    letterSpacing: "0.04em",
                    color: "var(--amber)",
                  }}
                >
                  {p.num}
                </div>
                <h3
                  style={{
                    margin: "16px 0 10px",
                    fontSize: 22,
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    color: "var(--cream)",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: "var(--muted-2)",
                  }}
                >
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4) APPROACH */}
      <section style={sectionStyle}>
        <div
          className="grid-2-collapse"
          style={{
            ...innerStyle,
            display: "grid",
            gridTemplateColumns: "minmax(220px,0.8fr) 1.4fr",
            gap: "clamp(30px,5vw,80px)",
          }}
        >
          <div>
            <p className="eyebrow">03 — OUR APPROACH</p>
            <h2
              style={{ ...h2Style, marginTop: 16, fontSize: "clamp(26px,3vw,40px)" }}
            >
              Diagnose first. Decide fast. Build together.
            </h2>
          </div>
          <div>
            {approach.map((a, i) => (
              <div
                key={a.letter}
                style={{
                  display: "flex",
                  gap: 22,
                  padding: "26px 0",
                  borderTop: "1px solid var(--line-strong)",
                  borderBottom:
                    i === approach.length - 1
                      ? "1px solid var(--line-strong)"
                      : undefined,
                }}
              >
                <div
                  style={{
                    flex: "none",
                    fontFamily: '"Geist Mono", ui-monospace, monospace',
                    fontSize: 14,
                    color: "var(--muted-2)",
                  }}
                >
                  {a.letter}
                </div>
                <div>
                  <h3
                    style={{
                      margin: "0 0 8px",
                      fontSize: 20,
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                      color: "var(--cream)",
                    }}
                  >
                    {a.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: "var(--muted-2)",
                      maxWidth: "52ch",
                    }}
                  >
                    {a.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5) TEAM */}
      <section style={sectionStyle}>
        <div style={innerStyle}>
          <p className="eyebrow">04 — OUR TEAM</p>
          <h2
            style={{ ...h2Style, marginTop: 16, fontSize: "clamp(26px,3vw,40px)" }}
          >
            Senior by default.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
              gap: 18,
              marginTop: 48,
            }}
          >
            {team.map((m) => (
              <article
                key={m.name}
                className="glass-card reveal-up"
                style={{ overflow: "hidden" }}
              >
                <div
                  style={{
                    aspectRatio: "1 / 1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "linear-gradient(150deg,rgba(224,160,69,.16),rgba(245,225,200,.02))",
                  }}
                >
                  <span
                    style={{
                      fontSize: 64,
                      fontWeight: 700,
                      letterSpacing: "0.02em",
                      color: "rgba(245,225,200,.85)",
                    }}
                  >
                    {m.initials}
                  </span>
                </div>
                <div style={{ padding: "22px 24px" }}>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: "var(--cream)",
                    }}
                  >
                    {m.name}
                  </div>
                  <div
                    style={{ marginTop: 4, fontSize: 14, color: "var(--muted-2)" }}
                  >
                    {m.role}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6) WHY VINIKA */}
      <section style={sectionStyle}>
        <div style={innerStyle}>
          <p className="eyebrow">05 — WHY VINIKA</p>
          <h2
            style={{
              ...h2Style,
              marginTop: 16,
              fontSize: "clamp(28px,3.6vw,52px)",
              maxWidth: "20ch",
            }}
          >
            What you get that a traditional firm won't give you.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
              gap: 18,
              marginTop: 48,
            }}
          >
            {whyVinika.map((w) => (
              <article
                key={w.title}
                className="glass-card"
                style={{ padding: "30px 28px" }}
              >
                <h3
                  style={{
                    margin: "0 0 10px",
                    fontSize: 19,
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    color: "var(--cream)",
                  }}
                >
                  {w.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "var(--muted-2)",
                  }}
                >
                  {w.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7) CLOSING CTA */}
      <CtaStrip
        title="Let's build what's next."
        blurb="Tell us where you want to go. We'll show you the path — and walk it with you."
      />
    </PageShell>
  );
}
