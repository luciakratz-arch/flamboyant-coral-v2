import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const songsTable = pgTable("songs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  composer: text("composer"),
  lyrics: text("lyrics"),
  notes: text("notes"),
  // Vídeo de estudo (YouTube ou Drive)
  videoUrl: text("video_url"),
  // Partitura
  sheetMusicUrl: text("sheet_music_url"),
  // Áudios gerais
  audioOriginalUrl: text("audio_original_url"),
  audioArranjoUrl: text("audio_arranjo_url"),
  playbackUrl: text("playback_url"),
  // Naipes individuais
  sopranoUrl: text("soprano_url"),
  mezzoUrl: text("mezzo_url"),
  contraltoUrl: text("contralto_url"),
  tenorUrl: text("tenor_url"),
  baritonoUrl: text("baritono_url"),
  baixoUrl: text("baixo_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertSongSchema = createInsertSchema(songsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertSong = z.infer<typeof insertSongSchema>;
export type Song = typeof songsTable.$inferSelect;
