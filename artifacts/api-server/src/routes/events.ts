import { Router, type IRouter } from "express";
import { eq, and, gte, lte } from "drizzle-orm";
import { db, eventsTable, eventSetlistTable, songsTable } from "@workspace/db";
import {
  ListEventsQueryParams,
  CreateEventBody,
  UpdateEventBody,
  UpdateEventSetlistBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/events/upcoming", async (_req, res): Promise<void> => {
  const today = new Date();
  const thirtyDaysLater = new Date();
  thirtyDaysLater.setDate(today.getDate() + 30);

  const todayStr = today.toISOString().split("T")[0];
  const futureStr = thirtyDaysLater.toISOString().split("T")[0];

  const rows = await db.select().from(eventsTable)
    .where(and(
      gte(eventsTable.date, todayStr),
      lte(eventsTable.date, futureStr)
    ))
    .orderBy(eventsTable.date);

  res.json(rows.map(serializeEvent));
});

router.get("/events", async (req, res): Promise<void> => {
  const query = ListEventsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  let rows;
  if (query.data.month && query.data.year) {
    const month = String(query.data.month).padStart(2, "0");
    const year = String(query.data.year);
    const startDate = `${year}-${month}-01`;
    const endMonth = query.data.month === 12 ? 1 : query.data.month + 1;
    const endYear = query.data.month === 12 ? query.data.year + 1 : query.data.year;
    const endDate = `${String(endYear)}-${String(endMonth).padStart(2, "0")}-01`;

    rows = await db.select().from(eventsTable)
      .where(and(
        gte(eventsTable.date, startDate),
        lte(eventsTable.date, endDate)
      ))
      .orderBy(eventsTable.date);
  } else {
    rows = await db.select().from(eventsTable).orderBy(eventsTable.date);
  }

  res.json(rows.map(serializeEvent));
});

/** Batch create events (for recurrence) — not in OpenAPI spec */
router.post("/events/batch", async (req, res): Promise<void> => {
  const events = req.body?.events;
  if (!Array.isArray(events) || events.length === 0) {
    res.status(400).json({ error: "events array is required" });
    return;
  }

  const inserted = [];
  for (const ev of events) {
    const parsed = CreateEventBody.safeParse(ev);
    if (!parsed.success) {
      res.status(400).json({ error: `Invalid event: ${parsed.error.message}` });
      return;
    }
    const [event] = await db.insert(eventsTable).values({
      title: parsed.data.title,
      date: parsed.data.date,
      type: parsed.data.type,
      status: parsed.data.status ?? "confirmado",
      planningStatus: (parsed.data as any).planningStatus ?? "planejada",
      arrivalTime: parsed.data.arrivalTime ?? null,
      presentationTime: parsed.data.presentationTime ?? null,
      outfit: parsed.data.outfit ?? null,
      location: parsed.data.location ?? null,
      mapsUrl: (parsed.data as any).mapsUrl ?? null,
      notes: parsed.data.notes ?? null,
      recurrenceGroupId: (parsed.data as any).recurrenceGroupId ?? null,
    }).returning();
    inserted.push(serializeEvent(event));
  }

  res.status(201).json({ created: inserted.length, events: inserted });
});

router.post("/events", async (req, res): Promise<void> => {
  const parsed = CreateEventBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [event] = await db.insert(eventsTable).values({
    title: parsed.data.title,
    date: parsed.data.date,
    type: parsed.data.type,
    status: parsed.data.status ?? "confirmado",
    planningStatus: (parsed.data as any).planningStatus ?? "planejada",
    arrivalTime: parsed.data.arrivalTime ?? null,
    presentationTime: parsed.data.presentationTime ?? null,
    outfit: parsed.data.outfit ?? null,
    location: parsed.data.location ?? null,
    mapsUrl: (parsed.data as any).mapsUrl ?? null,
    notes: parsed.data.notes ?? null,
    recurrenceGroupId: (parsed.data as any).recurrenceGroupId ?? null,
  }).returning();

  res.status(201).json(serializeEvent(event));
});

router.get("/events/:id/setlist", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const rows = await db
    .select({ song: songsTable })
    .from(eventSetlistTable)
    .innerJoin(songsTable, eq(eventSetlistTable.songId, songsTable.id))
    .where(eq(eventSetlistTable.eventId, id))
    .orderBy(eventSetlistTable.position);

  res.json(rows.map(serializeSetlistSong));
});

router.put("/events/:id/setlist", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const parsed = UpdateEventSetlistBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  await db.delete(eventSetlistTable).where(eq(eventSetlistTable.eventId, id));

  if (parsed.data.songIds.length > 0) {
    await db.insert(eventSetlistTable).values(
      parsed.data.songIds.map((songId, position) => ({
        eventId: id,
        songId,
        position,
      }))
    );
  }

  const rows = await db
    .select({ song: songsTable })
    .from(eventSetlistTable)
    .innerJoin(songsTable, eq(eventSetlistTable.songId, songsTable.id))
    .where(eq(eventSetlistTable.eventId, id))
    .orderBy(eventSetlistTable.position);

  res.json(rows.map(serializeSetlistSong));
});

router.get("/events/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const [event] = await db.select().from(eventsTable).where(eq(eventsTable.id, id));
  if (!event) { res.status(404).json({ error: "Event not found" }); return; }

  res.json(serializeEvent(event));
});

router.patch("/events/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const parsed = UpdateEventBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const updateData: Record<string, unknown> = {};
  if (parsed.data.title !== undefined) updateData.title = parsed.data.title;
  if (parsed.data.date !== undefined) updateData.date = parsed.data.date;
  if (parsed.data.type !== undefined) updateData.type = parsed.data.type;
  if (parsed.data.status !== undefined) updateData.status = parsed.data.status;
  if ((parsed.data as any).planningStatus !== undefined) updateData.planningStatus = (parsed.data as any).planningStatus;
  if (parsed.data.arrivalTime !== undefined) updateData.arrivalTime = parsed.data.arrivalTime;
  if (parsed.data.presentationTime !== undefined) updateData.presentationTime = parsed.data.presentationTime;
  if (parsed.data.outfit !== undefined) updateData.outfit = parsed.data.outfit;
  if (parsed.data.location !== undefined) updateData.location = parsed.data.location;
  if ((parsed.data as any).mapsUrl !== undefined) updateData.mapsUrl = (parsed.data as any).mapsUrl;
  if (parsed.data.notes !== undefined) updateData.notes = parsed.data.notes;

  const updateFuture = (parsed.data as any).updateFuture === true;

  if (updateFuture) {
    const [currentEvent] = await db.select().from(eventsTable).where(eq(eventsTable.id, id));
    if (!currentEvent) { res.status(404).json({ error: "Event not found" }); return; }

    if (currentEvent.recurrenceGroupId) {
      const batchData = { ...updateData };
      delete batchData.date; // each event keeps its own date

      await db.update(eventsTable)
        .set(batchData)
        .where(and(
          eq(eventsTable.recurrenceGroupId, currentEvent.recurrenceGroupId),
          gte(eventsTable.date, currentEvent.date)
        ));

      const [updated] = await db.select().from(eventsTable).where(eq(eventsTable.id, id));
      res.json(serializeEvent(updated));
      return;
    }
  }

  const [event] = await db.update(eventsTable).set(updateData).where(eq(eventsTable.id, id)).returning();
  if (!event) { res.status(404).json({ error: "Event not found" }); return; }

  res.json(serializeEvent(event));
});

router.delete("/events/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const deleteFuture = req.query.deleteFuture === "true";
  const deleteSimilar = req.query.deleteSimilar === "true";

  if (deleteFuture || deleteSimilar) {
    const [currentEvent] = await db.select().from(eventsTable).where(eq(eventsTable.id, id));
    if (!currentEvent) { res.status(404).json({ error: "Event not found" }); return; }

    if (deleteFuture && currentEvent.recurrenceGroupId) {
      await db.delete(eventsTable).where(
        and(
          eq(eventsTable.recurrenceGroupId, currentEvent.recurrenceGroupId),
          gte(eventsTable.date, currentEvent.date)
        )
      );
    } else if (deleteSimilar) {
      // Delete all events with same title and type, from this date onwards
      await db.delete(eventsTable).where(
        and(
          eq(eventsTable.title, currentEvent.title),
          eq(eventsTable.type, currentEvent.type),
          gte(eventsTable.date, currentEvent.date)
        )
      );
    } else {
      await db.delete(eventsTable).where(eq(eventsTable.id, id));
    }
    res.sendStatus(204);
    return;
  }

  const [event] = await db.delete(eventsTable).where(eq(eventsTable.id, id)).returning();
  if (!event) { res.status(404).json({ error: "Event not found" }); return; }

  res.sendStatus(204);
});

function serializeEvent(e: typeof eventsTable.$inferSelect) {
  return {
    id: e.id,
    title: e.title,
    date: e.date,
    type: e.type,
    status: e.status,
    planningStatus: e.planningStatus ?? "planejada",
    arrivalTime: e.arrivalTime ?? null,
    presentationTime: e.presentationTime ?? null,
    outfit: e.outfit ?? null,
    location: e.location ?? null,
    mapsUrl: e.mapsUrl ?? null,
    notes: e.notes ?? null,
    recurrenceGroupId: e.recurrenceGroupId ?? null,
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
  };
}

function serializeSetlistSong(r: { song: typeof songsTable.$inferSelect }) {
  return {
    id: r.song.id,
    title: r.song.title,
    category: r.song.category,
    composer: r.song.composer ?? null,
    lyrics: r.song.lyrics ?? null,
    sheetMusicUrl: r.song.sheetMusicUrl ?? null,
    playbackUrl: r.song.playbackUrl ?? null,
    notes: r.song.notes ?? null,
    createdAt: r.song.createdAt.toISOString(),
    updatedAt: r.song.updatedAt.toISOString(),
  };
}

export default router;
