import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, coralSettingsTable } from "@workspace/db";
import { UpdateSettingsBody } from "@workspace/api-zod";

const router: IRouter = Router();

async function getOrCreateSettings() {
  const rows = await db.select().from(coralSettingsTable);
  if (rows.length > 0) return rows[0];
  const [created] = await db.insert(coralSettingsTable).values({}).returning();
  return created;
}

function serializeSettings(s: typeof coralSettingsTable.$inferSelect) {
  return {
    id: s.id,
    logoData: s.logoData ?? null,
    signatureData: s.signatureData ?? null,
    coralName: s.coralName ?? null,
    conductorName: s.conductorName ?? null,
    producerName: s.producerName ?? null,
    primaryColor: s.primaryColor ?? null,
    secondaryColor: s.secondaryColor ?? null,
    rhName: s.rhName ?? null,
    rhPassword: s.rhPassword ?? null,
    adminPassword: s.adminPassword ?? null,
    updatedAt: s.updatedAt.toISOString(),
  };
}

router.get("/settings", async (_req, res): Promise<void> => {
  const settings = await getOrCreateSettings();
  res.json(serializeSettings(settings));
});

router.patch("/settings", async (req, res): Promise<void> => {
  const parsed = UpdateSettingsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const settings = await getOrCreateSettings();
  const updateData: Record<string, unknown> = {};
  if (parsed.data.logoData !== undefined) updateData.logoData = parsed.data.logoData;
  if (parsed.data.signatureData !== undefined) updateData.signatureData = parsed.data.signatureData;
  if (parsed.data.coralName !== undefined) updateData.coralName = parsed.data.coralName;
  if (parsed.data.conductorName !== undefined) updateData.conductorName = parsed.data.conductorName;
  if (parsed.data.producerName !== undefined) updateData.producerName = parsed.data.producerName;
  if (parsed.data.primaryColor !== undefined) updateData.primaryColor = parsed.data.primaryColor;
  if (parsed.data.secondaryColor !== undefined) updateData.secondaryColor = parsed.data.secondaryColor;
  if ((parsed.data as any).rhName !== undefined) updateData.rhName = (parsed.data as any).rhName;
  if ((parsed.data as any).rhPassword !== undefined) updateData.rhPassword = (parsed.data as any).rhPassword;
  if ((parsed.data as any).adminPassword !== undefined) updateData.adminPassword = (parsed.data as any).adminPassword;

  const [updated] = await db.update(coralSettingsTable)
    .set(updateData)
    .where(eq(coralSettingsTable.id, settings.id))
    .returning();

  res.json(serializeSettings(updated));
});

export default router;
