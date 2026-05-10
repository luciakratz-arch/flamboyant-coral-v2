import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, studyMaterialsTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/study-materials", async (_req, res): Promise<void> => {
  const rows = await db.select().from(studyMaterialsTable).orderBy(studyMaterialsTable.createdAt);
  res.json(rows.map(serialize));
});

router.post("/study-materials", async (req, res): Promise<void> => {
  const { title, category, mediaType, url, content, description } = req.body;
  if (!title || !category || !mediaType) {
    res.status(400).json({ error: "title, category and mediaType are required" });
    return;
  }
  const [row] = await db.insert(studyMaterialsTable).values({
    title,
    category,
    mediaType,
    url: url ?? null,
    content: content ?? null,
    description: description ?? null,
  }).returning();
  res.status(201).json(serialize(row));
});

router.patch("/study-materials/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const { title, category, mediaType, url, content, description } = req.body;
  const updateData: Record<string, unknown> = {};
  if (title !== undefined) updateData.title = title;
  if (category !== undefined) updateData.category = category;
  if (mediaType !== undefined) updateData.mediaType = mediaType;
  if (url !== undefined) updateData.url = url;
  if (content !== undefined) updateData.content = content;
  if (description !== undefined) updateData.description = description;
  const [row] = await db.update(studyMaterialsTable).set(updateData).where(eq(studyMaterialsTable.id, id)).returning();
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(serialize(row));
});

router.delete("/study-materials/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const [row] = await db.delete(studyMaterialsTable).where(eq(studyMaterialsTable.id, id)).returning();
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.sendStatus(204);
});

function serialize(r: typeof studyMaterialsTable.$inferSelect) {
  return {
    id: r.id,
    title: r.title,
    category: r.category,
    mediaType: r.mediaType,
    url: r.url ?? null,
    content: r.content ?? null,
    description: r.description ?? null,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  };
}

export default router;
