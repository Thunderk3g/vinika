import Link from "next/link";

const monoLabel = {
  fontFamily: "'Geist Mono', monospace",
  fontSize: 12,
  letterSpacing: "0.14em",
  color: "rgba(245,225,200,0.4)",
  marginBottom: 4,
} as const;

export default function SiteFooter() {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 5,
        padding: "clamp(56px,8vh,90px) clamp(20px,5vw,64px) 40px",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          className="grid-2-collapse"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr",
            gap: 40,
            paddingBottom: 54,
            borderBottom: "1px solid var(--line)",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <span
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  background: "var(--amber)",
                  boxShadow: "0 0 14px rgba(224,160,69,.7)",
                }}
              />
              <span style={{ fontWeight: 700, fontSize: 19, letterSpacing: "0.14em", color: "var(--cream)" }}>
                VINIKA
              </span>
            </div>
            <p style={{ margin: "20px 0 0", maxWidth: "34ch", fontSize: 15, lineHeight: 1.6, color: "var(--muted-2)" }}>
              A strategic growth studio helping ambitious businesses elevate, expand, and excel.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            <div style={monoLabel}>EXPLORE</div>
            <Link href="/services" className="foot-link">Services</Link>
            <Link href="/work" className="foot-link">Case Studies</Link>
            <Link href="/about" className="foot-link">About</Link>
            <Link href="/insights" className="foot-link">Insights</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            <div style={monoLabel}>CONNECT</div>
            <a href="mailto:hello@vinika.com" className="foot-link">hello@vinika.com</a>
            <Link href="/#contact" className="foot-link">Start a conversation</Link>
            <a href="#" className="foot-link">LinkedIn</a>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            flexWrap: "wrap",
            paddingTop: 26,
          }}
        >
          <div style={{ fontSize: 13, color: "rgba(245,225,200,0.35)" }}>
            © 2026 Vinika. All rights reserved.
          </div>
          <div
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: 12,
              letterSpacing: "0.1em",
              color: "rgba(245,225,200,0.35)",
            }}
          >
            ELEVATE · EXPAND · EXCEL
          </div>
        </div>
      </div>
    </footer>
  );
}
