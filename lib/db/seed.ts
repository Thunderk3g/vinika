import { config } from "dotenv";
config({ path: ".env.local" });

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { siteContent, blogPosts } from "./schema";
import { homeContent } from "../home-content";

const samplePosts = [
  {
    slug: "why-most-growth-plans-fail-in-the-first-90-days",
    title: "Why most growth plans fail in the first 90 days",
    excerpt:
      "The plan is rarely the problem. The first 90 days of execution is where momentum is won or quietly lost.",
    category: "STRATEGY",
    author: "Vinika",
    readTime: "6 min read",
    body: `Most growth plans don't fail because the strategy was wrong. They fail in the first 90 days — in the gap between the deck and the doing.

## The three traps

1. **Too many bets.** A plan that tries to move every metric moves none. Pick the one or two levers that actually compound.
2. **No owner.** Every initiative needs a single accountable name, not a committee.
3. **No early signal.** If you can't see progress in six weeks, you can't course-correct in twelve.

## What good looks like

A disciplined first quarter sequences the work, instruments the leading indicators, and protects the team's focus. Momentum is a habit — and habits are built early.`,
  },
  {
    slug: "positioning-is-a-decision-not-a-tagline",
    title: "Positioning is a decision, not a tagline",
    excerpt:
      "Positioning isn't the words on your homepage. It's the set of choices about who you're for and what you refuse to be.",
    category: "BRANDING",
    author: "Vinika",
    readTime: "4 min read",
    body: `Teams treat positioning like a copywriting exercise. It isn't. Positioning is a series of hard decisions made *before* a single word is written.

## Decide these first

- **Who you are for** — and, just as important, who you are not for.
- **The frame** — the category you want to be compared in.
- **The proof** — the one thing you can defend better than anyone.

The tagline is the *output*. Get the decision right and the words get easy.`,
  },
  {
    slug: "the-compounding-cost-of-unmade-decisions",
    title: "The compounding cost of unmade decisions",
    excerpt:
      "Indecision is a decision — to keep paying interest on a problem you haven't named.",
    category: "OPERATIONS",
    author: "Vinika",
    readTime: "5 min read",
    body: `Every unmade decision is a small tax on the whole organization. The roadmap that's "still being discussed." The pricing change that's "almost ready." Each one quietly compounds.

## Why it compounds

Open decisions consume attention, create rework, and erode trust in the system. The cost isn't the decision itself — it's the dozens of smaller choices that stall behind it.

## The fix

Name the decision, name the owner, name the date. Make the call with the information you have. A good decision made on time beats a perfect one made too late.`,
  },
];

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("Missing DATABASE_URL");
  const sql = postgres(url, { max: 1 });
  const db = drizzle(sql);

  console.log("[seed] writing site_content sections…");
  const sections: [string, unknown][] = [
    ["hero", homeContent.hero],
    ["audiences", homeContent.audiences],
    ["services", homeContent.services],
    ["process", homeContent.process],
    ["stories", homeContent.stories],
    ["insights", homeContent.insights],
    ["faq", homeContent.faq],
    ["contact", homeContent.contact],
  ];
  for (const [key, value] of sections) {
    await db
      .insert(siteContent)
      .values({ key, value })
      .onConflictDoNothing({ target: siteContent.key });
  }

  console.log("[seed] writing sample blog posts…");
  for (const p of samplePosts) {
    await db
      .insert(blogPosts)
      .values({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        body: p.body,
        category: p.category,
        author: p.author,
        readTime: p.readTime,
        status: "published",
        publishedAt: new Date(),
      })
      .onConflictDoNothing({ target: blogPosts.slug });
  }

  await sql.end();
  console.log("[seed] done ✓");
}

main().catch((err) => {
  console.error("[seed] failed:", err);
  process.exit(1);
});
