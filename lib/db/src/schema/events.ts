import { pgTable, text, serial, timestamp, date, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { songsTable } from "./songs";
import { membersTable } from "./members";

export const eventsTable = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: date("date").notNull(),
  type: text("type").notNull().default("ensaio"),
  status: text("status").notNull().default("confirmado"),
  planningStatus: text("planning_status").notNull().default("planejada"),
  arrivalTime: text("arrival_time"),
  presentationTime: text("presentation_time"),
  outfit: text("outfit"),
  location: text("location"),
  mapsUrl: text("maps_url"),
  notes: text("notes"),
  recurrenceGroupId: text("recurrence_group_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const eventSetlistTable = pgTable("event_setlist", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id").notNull().references(() => eventsTable.id, { onDelete: "cascade" }),
  songId: integer("song_id").notNull().references(() => songsTable.id, { onDelete: "cascade" }),
  position: integer("position").notNull().default(0),
});

export const eventAttendancesTable = pgTable("event_attendances", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id").notNull().references(() => eventsTable.id, { onDelete: "cascade" }),
  memberId: integer("member_id").notNull().references(() => membersTable.id, { onDelete: "cascade" }),
  status: text("status").notNull(), // 'confirmed' | 'declined'
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertEventSchema = createInsertSchema(eventsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof eventsTable.$inferSelect;
export type EventSetlist = typeof eventSetlistTable.$inferSelect;
export type EventAttendance = typeof eventAttendancesTable.$inferSelect;
