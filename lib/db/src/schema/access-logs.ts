import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";

export const accessLogsTable = pgTable("access_logs", {
  id: serial("id").primaryKey(),
  memberId: integer("member_id").notNull(),
  memberName: text("member_name").notNull(),
  accessedAt: timestamp("accessed_at", { withTimezone: true }).notNull().defaultNow(),
});

export type AccessLog = typeof accessLogsTable.$inferSelect;
