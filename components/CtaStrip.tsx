import Link from "next/link";

type Cta = { label: string; href: string };

export default function CtaStrip({
  title,
  blurb,
  primary = { label: "Start a conversation", href: "/#contact" },
  secondary,
}: {
  title: string;
  blurb: string;
  primary?: Cta;
  secondary?: Cta;
}) {
  return (
    <section
      style={{
        position: "relative",
        zIndex: 5,
        padding: "clamp(70px,11vh,140px) clamp(20px,5vw,64px)",
        borderTop: "1px solid var(--line)",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 680,
          height: 680,
          maxWidth: "90vw",
          background: "radial-gradient(circle,rgba(224,160,69,.13),rgba(224,160,69,0) 60%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
        <h2
          style={{
            margin: 0,
            fontSize: "clamp(34px,5.4vw,72px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            color: "var(--cream)",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            margin: "22px auto 0",
            maxWidth: 440,
            fontSize: 17,
            lineHeight: 1.6,
            color: "var(--muted)",
          }}
        >
          {blurb}
        </p>
        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: 34,
          }}
        >
          <Link href={primary.href} className="btn-accent">
            {primary.label}
          </Link>
          {secondary && (
            <Link href={secondary.href} className="btn-ghost">
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
