import Link from "next/link";
import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import CtaStrip from "@/components/CtaStrip";
import { services } from "@/lib/services-content";

export const metadata: Metadata = {
  title: "Services — Vinika",
  description:
    "Five ways we move your business forward — brand strategy, business consulting, market expansion, digital transformation, and growth advisory.",
};

const mono = "'Geist Mono', monospace";

export default function ServicesPage() {
  return (
    <PageShell>
      {/* ── HEADER ───────────────────────────────────────────── */}
      <header
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "0 auto",
          padding:
            "clamp(140px,20vh,200px) clamp(20px,5vw,64px) clamp(50px,7vh,90px)",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 560,
            height: 560,
            maxWidth: "80vw",
            background:
              "radial-gradient(circle,rgba(224,160,69,.12),rgba(224,160,69,0) 62%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative" }}>
          <p className="eyebrow">SERVICES</p>
          <h1
            style={{
              margin: "16px 0 0",
              fontSize: "clamp(40px,6.4vw,92px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              maxWidth: "15ch",
              textWrap: "balance",
              color: "var(--cream)",
            }}
          >
            Five ways we move your business forward.
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
            Each engagement follows the same logic — find the real problem,
            design the bet, build the methodology, and deliver something that
            changes the numbers.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              marginTop: 36,
            }}
          >
            {services.map((svc) => (
              <a key={svc.id} href={`#${svc.id}`} className="chip-link">
                {svc.title}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* ── SERVICE BLOCKS ───────────────────────────────────── */}
      {services.map((svc) => (
        <section
          key={svc.id}
          id={svc.id}
          style={{
            padding: "clamp(56px,8vh,100px) clamp(20px,5vw,64px)",
            borderTop: "1px solid var(--line)",
            scrollMarginTop: 90,
          }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                flexWrap: "wrap",
                gap: 18,
              }}
            >
              <span
                style={{
                  fontFamily: mono,
                  fontSize: 14,
                  letterSpacing: "0.12em",
                  color: "var(--amber)",
                }}
              >
                {svc.n}
              </span>
              <h2
                style={{
                  margin: 0,
                  fontSize: "clamp(30px,4.4vw,60px)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.02,
                  color: "var(--cream)",
                }}
              >
                {svc.title}
              </h2>
            </div>

            <p
              style={{
                margin: "20px 0 0",
                maxWidth: 620,
                fontSize: "clamp(16px,1.7vw,21px)",
                lineHeight: 1.6,
                color: "rgba(245,225,200,.7)",
              }}
            >
              {svc.lead}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
                gap: 18,
                marginTop: 40,
              }}
            >
              {/* THE PROBLEM */}
              <div className="glass-card reveal-up" style={{ padding: "30px 28px" }}>
                <p className="eyebrow">THE PROBLEM</p>
                <p
                  style={{
                    margin: "16px 0 0",
                    fontSize: 15.5,
                    lineHeight: 1.6,
                    color: "rgba(245,225,200,.78)",
                  }}
                >
                  {svc.problem}
                </p>
              </div>

              {/* OUR APPROACH */}
              <div className="glass-card reveal-up" style={{ padding: "30px 28px" }}>
                <p className="eyebrow">OUR APPROACH</p>
                <p
                  style={{
                    margin: "16px 0 0",
                    fontSize: 15.5,
                    lineHeight: 1.6,
                    color: "rgba(245,225,200,.78)",
                  }}
                >
                  {svc.approach}
                </p>
              </div>

              {/* METHODOLOGY */}
              <div className="glass-card reveal-up" style={{ padding: "30px 28px" }}>
                <p className="eyebrow">METHODOLOGY</p>
                <ul
                  style={{
                    listStyle: "none",
                    margin: "16px 0 0",
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  {svc.method.map((m) => (
                    <li
                      key={m}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        fontSize: 15,
                        lineHeight: 1.45,
                        color: "rgba(245,225,200,.82)",
                      }}
                    >
                      <span
                        aria-hidden
                        style={{
                          flex: "none",
                          width: 6,
                          height: 6,
                          marginTop: 7,
                          borderRadius: "50%",
                          background: "var(--amber)",
                        }}
                      />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* DELIVERABLES */}
              <div className="glass-card reveal-up" style={{ padding: "30px 28px" }}>
                <p className="eyebrow">DELIVERABLES</p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 9,
                    marginTop: 18,
                  }}
                >
                  {svc.deliverables.map((d) => (
                    <span key={d} className="svc-tag">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <Link href="/work" className="svc-link">
                See related case studies →
              </Link>
            </div>
          </div>
        </section>
      ))}

      <CtaStrip
        title="Not sure where to start?"
        blurb="Tell us the goal. We'll point you to the right engagement — and the fastest path to it."
      />
    </PageShell>
  );
}
