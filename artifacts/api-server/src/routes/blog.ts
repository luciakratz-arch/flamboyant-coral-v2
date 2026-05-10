import { Router } from "express";
import { db, blogPostsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/blog", async (req, res) => {
  const posts = await db
    .select()
    .from(blogPostsTable)
    .orderBy(blogPostsTable.createdAt);
  res.json(posts.reverse());
});

router.get("/blog/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const [post] = await db.select().from(blogPostsTable).where(eq(blogPostsTable.id, id));
  if (!post) return res.status(404).json({ error: "Post não encontrado" });
  res.json(post);
});

router.post("/blog", async (req, res) => {
  const { title, content, imageData, eventId, authorRole, youtubeUrl, instagramUrl, externalUrl } = req.body;
  if (!title || !content) return res.status(400).json({ error: "Título e conteúdo são obrigatórios" });
  const [post] = await db.insert(blogPostsTable).values({
    title,
    content,
    imageData: imageData ?? null,
    eventId: eventId ?? null,
    authorRole: authorRole ?? "admin",
    youtubeUrl: youtubeUrl ?? null,
    instagramUrl: instagramUrl ?? null,
    externalUrl: externalUrl ?? null,
  }).returning();
  res.status(201).json(post);
});

router.patch("/blog/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, imageData, eventId, youtubeUrl, instagramUrl, externalUrl } = req.body;
  const [post] = await db.update(blogPostsTable)
    .set({
      ...(title !== undefined && { title }),
      ...(content !== undefined && { content }),
      ...(imageData !== undefined && { imageData }),
      ...(eventId !== undefined && { eventId }),
      ...(youtubeUrl !== undefined && { youtubeUrl }),
      ...(instagramUrl !== undefined && { instagramUrl }),
      ...(externalUrl !== undefined && { externalUrl }),
    })
    .where(eq(blogPostsTable.id, id))
    .returning();
  if (!post) return res.status(404).json({ error: "Post não encontrado" });
  res.json(post);
});

router.delete("/blog/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await db.delete(blogPostsTable).where(eq(blogPostsTable.id, id));
  res.status(204).send();
});

export default router;
