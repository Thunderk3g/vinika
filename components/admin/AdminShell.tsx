import { ReactNode } from "react";
import Link from "next/link";
import AdminNav from "./AdminNav";
import SignOutButton from "./SignOutButton";

export default function AdminShell({
  userEmail,
  children,
}: {
  userEmail: string;
  children: ReactNode;
}) {
  return (
    <div className="adm-shell">
      <aside className="adm-side">
        <Link
          href="/admin"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            padding: "4px 12px 18px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-white.png"
            alt="Vinika"
            style={{ height: 22, width: "auto", display: "block" }}
          />
          <span
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.12em",
              color: "var(--muted)",
            }}
          >
            CMS
          </span>
        </Link>
        <AdminNav />
      </aside>

      <div>
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            padding: "16px clamp(22px,4vw,44px)",
            borderBottom: "1px solid var(--line)",
            position: "sticky",
            top: 0,
            background: "rgba(10,49,101,0.85)",
            backdropFilter: "blur(12px)",
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: 12,
              color: "var(--muted)",
            }}
          >
            {userEmail}
          </span>
          <SignOutButton />
        </header>
        <main className="adm-main">{children}</main>
      </div>
    </div>
  );
}
