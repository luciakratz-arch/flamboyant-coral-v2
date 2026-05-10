import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { eventsTable } from "./events";
import { membersTable } from "./members";

export const attendanceSessionsTable = pgTable("attendance_sessions", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id").notNull().references(() => eventsTable.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  durationMinutes: integer("duration_minutes").notNull().default(60),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const attendanceRecordsTable = pgTable("attendance_records", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").notNull().references(() => attendanceSessionsTable.id, { onDelete: "cascade" }),
  eventId: integer("event_id").notNull().references(() => eventsTable.id, { onDelete: "cascade" }),
  memberId: integer("member_id").notNull().references(() => membersTable.id, { onDelete: "cascade" }),
  memberName: text("member_name").notNull(),
  voicePart: text("voice_part"),
  checkedInAt: timestamp("checked_in_at", { withTimezone: true }).notNull().defaultNow(),
});

export type AttendanceSession = typeof attendanceSessionsTable.$inferSelect;
export type AttendanceRecord = typeof attendanceRecordsTable.$inferSelect;
