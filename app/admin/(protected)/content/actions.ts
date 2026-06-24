"use server";

import { revalidatePath } from "next/cache";
import { getAdminUser } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { siteContent } from "@/lib/db/schema";
import { SECTION_SPECS } from "@/lib/admin/content-spec";

export type ActionResult = { ok: true } | { ok: false; error: string };

const VALID_KEYS = new Set(SECTION_SPECS.map((s) => s.key));

/** Persist one homepage section. Auth is re-checked here — server actions are
 *  publicly reachable endpoints, so we never rely on the page guard alone. */
export async function saveSectionAction(
  key: string,
  value: unknown,
): Promise<ActionResult> {
  const user = await getAdminUser();
  if (!user) return { ok: false, error: "Not authorized." };

  if (!VALID_KEYS.has(key)) {
    return { ok: false, error: "Unknown section." };
  }
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return { ok: false, error: "Invalid content shape." };
  }

  try {
    await db
      .insert(siteContent)
      .values({ key, value })
      .onConflictDoUpdate({
        target: siteContent.key,
        set: { value, updatedAt: new Date() },
      });

    revalidatePath("/");
    revalidatePath("/admin/content");
    revalidatePath(`/admin/content/${key}`);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Save failed." };
  }
}
