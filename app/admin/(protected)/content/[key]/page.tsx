import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { siteContent } from "@/lib/db/schema";
import { getSpec } from "@/lib/admin/content-spec";
import { homeContent } from "@/lib/home-content";
import SectionEditor from "../_components/SectionEditor";

export const dynamic = "force-dynamic";

export default async function EditSectionPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  const spec = getSpec(key);
  if (!spec) notFound();

  const [row] = await db
    .select()
    .from(siteContent)
    .where(eq(siteContent.key, key))
    .limit(1);

  const initial =
    row?.value ?? (homeContent as Record<string, unknown>)[key] ?? {};

  return (
    <div>
      <Link href="/admin/content" className="blog-back" style={{ marginBottom: 18, display: "inline-flex" }}>
        ← Site content
      </Link>
      <h1 style={{ fontSize: 24, fontWeight: 700, margin: "12px 0 4px", color: "var(--cream)" }}>
        {spec.label}
      </h1>
      <p style={{ color: "var(--muted)", margin: "0 0 24px" }}>{spec.description}</p>
      <SectionEditor sectionKey={key} spec={spec} initial={initial} />
    </div>
  );
}
