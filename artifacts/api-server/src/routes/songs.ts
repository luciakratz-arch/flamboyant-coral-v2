import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, songsTable } from "@workspace/db";
import {
  ListSongsQueryParams,
  CreateSongBody,
  UpdateSongBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/songs/categories", async (_req, res): Promise<void> => {
  const songs = await db.select().from(songsTable).orderBy(songsTable.title);

  const grouped: Record<string, typeof songs> = {};
  for (const song of songs) {
    if (!grouped[song.category]) grouped[song.category] = [];
    grouped[song.category].push(song);
  }

  const result = Object.entries(grouped).map(([category, songs]) => ({
    category,
    count: songs.length,
    songs: songs.map(serializeSong),
  }));

  res.json(result);
});

router.get("/songs", async (req, res): Promise<void> => {
  const query = ListSongsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  let rows;
  if (query.data.category) {
    rows = await db.select().from(songsTable).where(eq(songsTable.category, query.data.category)).orderBy(songsTable.title);
  } else {
    rows = await db.select().from(songsTable).orderBy(songsTable.title);
  }

  res.json(rows.map(serializeSong));
});

router.post("/songs", async (req, res): Promise<void> => {
  const parsed = CreateSongBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const d = parsed.data;
  const [song] = await db.insert(songsTable).values({
    title: d.title,
    category: d.category,
    composer: d.composer ?? null,
    lyrics: d.lyrics ?? null,
    notes: d.notes ?? null,
    videoUrl: d.videoUrl ?? null,
    sheetMusicUrl: d.sheetMusicUrl ?? null,
    audioOriginalUrl: d.audioOriginalUrl ?? null,
    audioArranjoUrl: d.audioArranjoUrl ?? null,
    playbackUrl: d.playbackUrl ?? null,
    sopranoUrl: d.sopranoUrl ?? null,
    mezzoUrl: d.mezzoUrl ?? null,
    contraltoUrl: d.contraltoUrl ?? null,
    tenorUrl: d.tenorUrl ?? null,
    baritonoUrl: d.baritonoUrl ?? null,
    baixoUrl: d.baixoUrl ?? null,
  }).returning();

  res.status(201).json(serializeSong(song));
});

router.get("/songs/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const [song] = await db.select().from(songsTable).where(eq(songsTable.id, id));
  if (!song) { res.status(404).json({ error: "Song not found" }); return; }

  res.json(serializeSong(song));
});

router.patch("/songs/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const parsed = UpdateSongBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const d = parsed.data;
  const updateData: Record<string, unknown> = {};
  if (d.title !== undefined) updateData.title = d.title;
  if (d.category !== undefined) updateData.category = d.category;
  if (d.composer !== undefined) updateData.composer = d.composer;
  if (d.lyrics !== undefined) updateData.lyrics = d.lyrics;
  if (d.notes !== undefined) updateData.notes = d.notes;
  if (d.videoUrl !== undefined) updateData.videoUrl = d.videoUrl;
  if (d.sheetMusicUrl !== undefined) updateData.sheetMusicUrl = d.sheetMusicUrl;
  if (d.audioOriginalUrl !== undefined) updateData.audioOriginalUrl = d.audioOriginalUrl;
  if (d.audioArranjoUrl !== undefined) updateData.audioArranjoUrl = d.audioArranjoUrl;
  if (d.playbackUrl !== undefined) updateData.playbackUrl = d.playbackUrl;
  if (d.sopranoUrl !== undefined) updateData.sopranoUrl = d.sopranoUrl;
  if (d.mezzoUrl !== undefined) updateData.mezzoUrl = d.mezzoUrl;
  if (d.contraltoUrl !== undefined) updateData.contraltoUrl = d.contraltoUrl;
  if (d.tenorUrl !== undefined) updateData.tenorUrl = d.tenorUrl;
  if (d.baritonoUrl !== undefined) updateData.baritonoUrl = d.baritonoUrl;
  if (d.baixoUrl !== undefined) updateData.baixoUrl = d.baixoUrl;

  const [song] = await db.update(songsTable).set(updateData).where(eq(songsTable.id, id)).returning();
  if (!song) { res.status(404).json({ error: "Song not found" }); return; }

  res.json(serializeSong(song));
});

router.delete("/songs/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const [song] = await db.delete(songsTable).where(eq(songsTable.id, id)).returning();
  if (!song) { res.status(404).json({ error: "Song not found" }); return; }

  res.sendStatus(204);
});

function serializeSong(s: typeof songsTable.$inferSelect) {
  return {
    id: s.id,
    title: s.title,
    category: s.category,
    composer: s.composer ?? null,
    lyrics: s.lyrics ?? null,
    notes: s.notes ?? null,
    videoUrl: s.videoUrl ?? null,
    sheetMusicUrl: s.sheetMusicUrl ?? null,
    audioOriginalUrl: s.audioOriginalUrl ?? null,
    audioArranjoUrl: s.audioArranjoUrl ?? null,
    playbackUrl: s.playbackUrl ?? null,
    sopranoUrl: s.sopranoUrl ?? null,
    mezzoUrl: s.mezzoUrl ?? null,
    contraltoUrl: s.contraltoUrl ?? null,
    tenorUrl: s.tenorUrl ?? null,
    baritonoUrl: s.baritonoUrl ?? null,
    baixoUrl: s.baixoUrl ?? null,
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
  };
}

export default router;
