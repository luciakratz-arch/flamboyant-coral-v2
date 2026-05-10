import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const STUDY_MEDIA_TYPES = ["video", "pdf", "audio", "text", "photo"] as const;
export type StudyMediaType = typeof STUDY_MEDIA_TYPES[number];

export const STUDY_THEMATIC_CATEGORIES = [
  "Vocalise",
  "Aula",
  "Documentário",
  "Reportagem",
  "Concerto",
  "Ensaio",
  "Material de Apoio",
  "Outro",
] as const;
export type StudyThematicCategory = typeof STUDY_THEMATIC_CATEGORIES[number];

export const studyMaterialsTable = pgTable("study_materials", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  mediaType: text("media_type").notNull().default("video"),
  url: text("url"),
  content: text("content"),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertStudyMaterialSchema = createInsertSchema(studyMaterialsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertStudyMaterial = z.infer<typeof insertStudyMaterialSchema>;
export type StudyMaterial = typeof studyMaterialsTable.$inferSelect;
