import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, announcementsTable } from "@workspace/db";
import {
  CreateAnnouncementBody,
  UpdateAnnouncementBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/announcements", async (_req, res): Promise<void> => {
  const rows = await db.select().from(announcementsTable).orderBy(announcementsTable.createdAt);
  res.json(rows.map(serialize));
});

router.post("/announcements", async (req, res): Promise<void> => {
  const parsed = CreateAnnouncementBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [a] = await db.insert(announcementsTable).values({
    title: parsed.data.title,
    content: parsed.data.content,
    priority: parsed.data.priority ?? "normal",
  }).returning();

  res.status(201).json(serialize(a));
});

router.patch("/announcements/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const parsed = UpdateAnnouncementBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const updateData: Record<string, unknown> = {};
  if (parsed.data.title !== undefined) updateData.title = parsed.data.title;
  if (parsed.data.content !== undefined) updateData.content = parsed.data.content;
  if (parsed.data.priority !== undefined) updateData.priority = parsed.data.priority;

  const [a] = await db.update(announcementsTable).set(updateData).where(eq(announcementsTable.id, id)).returning();
  if (!a) { res.status(404).json({ error: "Announcement not found" }); return; }

  res.json(serialize(a));
});

router.delete("/announcements/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const [a] = await db.delete(announcementsTable).where(eq(announcementsTable.id, id)).returning();
  if (!a) { res.status(404).json({ error: "Announcement not found" }); return; }

  res.sendStatus(204);
});

function serialize(a: typeof announcementsTable.$inferSelect) {
  return {
    id: a.id,
    title: a.title,
    content: a.content,
    priority: a.priority,
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
  };
}

export default router;
