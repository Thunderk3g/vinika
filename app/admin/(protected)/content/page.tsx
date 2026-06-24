import Link from "next/link";
import { db } from "@/lib/db";
import { siteContent } from "@/lib/db/schema";
import { SECTION_SPECS } from "@/lib/admin/content-spec";

export const dynamic = "force-dynamic";

export default async function ContentPage() {
  const rows = await db.select({ key: siteContent.key }).from(siteContent);
  const present = new Set(rows.map((r) => r.key));

  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 700, margin: "0 0 6px", color: "var(--cream)" }}>
        Site content
      </h1>
      <p style={{ color: "var(--muted)", margin: "0 0 28px" }}>
        Edit each section of the homepage. Changes publish to the live site immediately.
      </p>
      <div style={{ display: "grid", gap: 12 }}>
        {SECTION_SPECS.map((spec) => (
          <Link
            key={spec.key}
            href={`/admin/content/${spec.key}`}
            className="adm-card"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              textDecoration: "none",
            }}
          >
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "var(--cream)" }}>
                {spec.label}
              </div>
              <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 4 }}>
                {spec.description}
              </div>
            </div>
            <span
              className="adm-pill"
              style={{ color: present.has(spec.key) ? "var(--amber)" : "var(--muted)" }}
            >
              {present.has(spec.key) ? "Edit →" : "Set up →"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
