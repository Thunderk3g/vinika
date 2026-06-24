import {
  pgTable,
  pgEnum,
  text,
  jsonb,
  uuid,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

/**
 * Editable homepage content, stored one row per top-level section
 * (hero, audiences, services, process, stories, insights, faq, contact).
 * `value` holds the section's typed JSON (see lib/home-content.ts shapes).
 * The public site assembles a HomeContent object from these rows; the admin
 * CRM edits one section at a time.
 */
export const siteContent = pgTable("site_content", {
  key: text("key").primaryKey(),
  value: jsonb("value").$type<unknown>().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const blogStatus = pgEnum("blog_status", ["draft", "published"]);

export const blogPosts = pgTable(
  "blog_posts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    excerpt: text("excerpt"),
    body: text("body").notNull().default(""), // markdown
    coverImageUrl: text("cover_image_url"),
    category: text("category"),
    author: text("author"),
    readTime: text("read_time"),
    status: blogStatus("status").notNull().default("draft"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    statusIdx: index("blog_posts_status_idx").on(t.status, t.publishedAt),
  }),
);

export type SiteContentRow = typeof siteContent.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;

/** Appointment / "book a call" requests from the site chat assistant. */
export const appointmentStatus = pgEnum("appointment_status", [
  "new",
  "contacted",
  "scheduled",
  "closed",
]);

export const appointments = pgTable("appointments", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  preferredTime: text("preferred_time"),
  goal: text("goal"),
  source: text("source").notNull().default("chat"),
  status: appointmentStatus("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Appointment = typeof appointments.$inferSelect;
export type NewAppointment = typeof appointments.$inferInsert;
