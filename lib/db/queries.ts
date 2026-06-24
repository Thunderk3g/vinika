import "server-only";
import { and, desc, eq } from "drizzle-orm";
import { db } from "./index";
import { siteContent, blogPosts, type BlogPost } from "./schema";
import { homeContent, type HomeContent } from "../home-content";

/**
 * Assemble the homepage content from the `site_content` rows, falling back to
 * the static seed (lib/home-content.ts) for any missing section or if the DB
 * is unreachable — so the public site never breaks on a content/DB issue.
 */
export async function getHomeContent(): Promise<HomeContent> {
  try {
    const rows = await db.select().from(siteContent);
    if (!rows.length) return homeContent;
    const map = new Map(rows.map((r) => [r.key, r.value]));
    const pick = <K extends keyof HomeContent>(key: K): HomeContent[K] =>
      (map.get(key) as HomeContent[K] | undefined) ?? homeContent[key];
    return {
      hero: pick("hero"),
      audiences: pick("audiences"),
      services: pick("services"),
      process: pick("process"),
      stories: pick("stories"),
      insights: pick("insights"),
      faq: pick("faq"),
      contact: pick("contact"),
    };
  } catch (err) {
    console.error("[queries] getHomeContent fell back to seed:", err);
    return homeContent;
  }
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    return await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.status, "published"))
      .orderBy(desc(blogPosts.publishedAt));
  } catch (err) {
    console.error("[queries] getPublishedPosts failed:", err);
    return [];
  }
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const [row] = await db
      .select()
      .from(blogPosts)
      .where(and(eq(blogPosts.slug, slug), eq(blogPosts.status, "published")))
      .limit(1);
    return row ?? null;
  } catch (err) {
    console.error("[queries] getPublishedPostBySlug failed:", err);
    return null;
  }
}
