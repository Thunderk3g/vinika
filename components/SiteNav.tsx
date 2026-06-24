"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS: [string, string][] = [
  ["/services", "Services"],
  ["/work", "Work"],
  ["/about", "About"],
  ["/insights", "Insights"],
];

function Wordmark() {
  return (
    <Link
      href="/"
      style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none", color: "var(--cream)" }}
    >
      <span
        style={{
          width: 11,
          height: 11,
          borderRadius: "50%",
          background: "var(--amber)",
          boxShadow: "0 0 14px rgba(224,160,69,.7)",
        }}
      />
      <span style={{ fontWeight: 700, fontSize: 19, letterSpacing: "0.14em" }}>VINIKA</span>
    </Link>
  );
}

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <nav className="nav2">
        <Wordmark />
        <div className="nav2-links">
          {LINKS.map(([href, label]) => (
            <Link key={href} href={href} className={isActive(href) ? "active" : undefined}>
              {label}
            </Link>
          ))}
          <Link href="/#contact" className="nav-cta">
            Start a conversation
          </Link>
        </div>
        <button
          className="nav2-burger"
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          style={{
            flexDirection: "column",
            gap: 5,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 6,
          }}
        >
          <span style={{ width: 22, height: 2, background: "var(--cream)" }} />
          <span style={{ width: 22, height: 2, background: "var(--cream)" }} />
        </button>
      </nav>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99,
          background: "rgba(10,49,101,0.97)",
          backdropFilter: "blur(8px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 8,
          padding: "0 clamp(20px,5vw,64px)",
          transform: open ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.5s cubic-bezier(0.76,0,0.24,1)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          style={{
            position: "absolute",
            top: 20,
            right: "clamp(20px,5vw,64px)",
            background: "transparent",
            border: "none",
            color: "var(--cream)",
            fontSize: 30,
            lineHeight: 1,
            cursor: "pointer",
          }}
        >
          ×
        </button>
        {LINKS.map(([href, label]) => (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            style={{
              fontSize: "clamp(2rem,8vw,3rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--cream)",
              textDecoration: "none",
            }}
          >
            {label}
          </Link>
        ))}
        <Link
          href="/#contact"
          onClick={() => setOpen(false)}
          style={{
            fontSize: "clamp(2rem,8vw,3rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--amber)",
            textDecoration: "none",
          }}
        >
          Contact
        </Link>
      </div>
    </>
  );
}
