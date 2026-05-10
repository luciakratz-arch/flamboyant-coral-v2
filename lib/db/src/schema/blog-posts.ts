import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const blogPostsTable = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  imageData: text("image_data"),
  eventId: integer("event_id"),
  authorRole: text("author_role").notNull().default("admin"),
  youtubeUrl: text("youtube_url"),
  instagramUrl: text("instagram_url"),
  externalUrl: text("external_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export type BlogPost = typeof blogPostsTable.$inferSelect;
export type InsertBlogPost = typeof blogPostsTable.$inferInsert;
