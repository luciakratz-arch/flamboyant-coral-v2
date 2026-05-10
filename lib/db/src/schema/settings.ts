import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";

export const coralSettingsTable = pgTable("coral_settings", {
  id: serial("id").primaryKey(),
  logoData: text("logo_data"),
  signatureData: text("signature_data"),
  coralName: text("coral_name"),
  conductorName: text("conductor_name"),
  producerName: text("producer_name"),
  primaryColor: text("primary_color"),
  secondaryColor: text("secondary_color"),
  rhName: text("rh_name"),
  rhPassword: text("rh_password"),
  adminPassword: text("admin_password"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export type CoralSettings = typeof coralSettingsTable.$inferSelect;
