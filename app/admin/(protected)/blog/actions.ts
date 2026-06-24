"use server";

import { revalidatePath } from "next/cache";
import { and, eq, ne } from "drizzle-orm";
import { z } from "zod";
import { getAdminUser } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";

export type ActionResult<T = undefined> =
  | { ok: true; data: T }
  | { ok: false; error: string };

const postSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase words separated by hyphens"),
  excerpt: z.string().trim().optional().default(""),
  body: z.string().optional().default(""),
  coverImageUrl: z
    .string()
    .trim()
    .refine((v) => v === "" || /^https?:\/\//i.test(v), "Cover image must be an http(s) URL")
    .optional()
    .default(""),
  category: z.string().trim().optional().default(""),
  author: z.string().trim().optional().default(""),
  readTime: z.string().trim().optional().default(""),
  status: z.enum(["draft", "published"]),
});

export type BlogFormInput = z.input<typeof postSchema>;

function revalidateBlog(slug?: string) {
  revalidatePath("/admin/blog");
  revalidatePath("/insights");
  revalidatePath("/");
  if (slug) revalidatePath(`/insights/${slug}`);
}

export async function createPostAction(
  input: BlogFormInput,
): Promise<ActionResult<{ id: string }>> {
  const user = await getAdminUser();
  if (!user) return { ok: false, error: "Not authorized." };

  const parsed = postSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }
  const v = parsed.data;

  try {
    const [clash] = await db
      .select({ id: blogPosts.id })
      .from(blogPosts)
      .where(eq(blogPosts.slug, v.slug))
      .limit(1);
    if (clash) return { ok: false, error: `Slug "${v.slug}" is already in use.` };

    const [row] = await db
      .insert(blogPosts)
      .values({
        title: v.title,
        slug: v.slug,
        excerpt: v.excerpt || null,
        body: v.body ?? "",
        coverImageUrl: v.coverImageUrl || null,
        category: v.category || null,
        author: v.author || null,
        readTime: v.readTime || null,
        status: v.status,
        publishedAt: v.status === "published" ? new Date() : null,
      })
      .returning({ id: blogPosts.id });
    if (!row) return { ok: false, error: "Insert returned no row — please retry." };

    revalidateBlog(v.slug);
    return { ok: true, data: { id: row.id } };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Create failed." };
  }
}

export async function updatePostAction(
  id: string,
  input: BlogFormInput,
): Promise<ActionResult> {
  const user = await getAdminUser();
  if (!user) return { ok: false, error: "Not authorized." };

  const parsed = postSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }
  const v = parsed.data;

  try {
    const [existing] = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, id))
      .limit(1);
    if (!existing) return { ok: false, error: "Post not found." };

    const [clash] = await db
      .select({ id: blogPosts.id })
      .from(blogPosts)
      .where(and(eq(blogPosts.slug, v.slug), ne(blogPosts.id, id)))
      .limit(1);
    if (clash) return { ok: false, error: `Slug "${v.slug}" is already in use.` };

    const publishedAt =
      v.status === "published" ? existing.publishedAt ?? new Date() : null;

    await db
      .update(blogPosts)
      .set({
        title: v.title,
        slug: v.slug,
        excerpt: v.excerpt || null,
        body: v.body ?? "",
        coverImageUrl: v.coverImageUrl || null,
        category: v.category || null,
        author: v.author || null,
        readTime: v.readTime || null,
        status: v.status,
        publishedAt,
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.id, id));

    revalidateBlog(v.slug);
    if (existing.slug !== v.slug) revalidatePath(`/insights/${existing.slug}`);
    return { ok: true, data: undefined };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Update failed." };
  }
}

export async function deletePostAction(id: string): Promise<ActionResult> {
  const user = await getAdminUser();
  if (!user) return { ok: false, error: "Not authorized." };
  try {
    const [row] = await db
      .delete(blogPosts)
      .where(eq(blogPosts.id, id))
      .returning({ slug: blogPosts.slug });
    if (!row) return { ok: false, error: "Post not found." };
    revalidateBlog(row.slug);
    return { ok: true, data: undefined };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Delete failed." };
  }
}
