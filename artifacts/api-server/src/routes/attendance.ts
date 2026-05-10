import { Router } from "express";
import { db } from "@workspace/db";
import { attendanceSessionsTable, attendanceRecordsTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { randomBytes } from "crypto";

const router = Router();

router.post("/attendance/sessions", async (req, res): Promise<void> => {
  const { eventId, durationMinutes = 60 } = req.body;
  if (!eventId) {
    res.status(400).json({ error: "eventId obrigatório" });
    return;
  }
  const token = randomBytes(16).toString("hex");
  const expiresAt = new Date(Date.now() + durationMinutes * 60 * 1000);
  const [session] = await db.insert(attendanceSessionsTable).values({
    eventId,
    token,
    durationMinutes,
    expiresAt,
  }).returning();
  res.status(201).json(session);
});

router.get("/attendance/sessions/event/:eventId", async (req, res): Promise<void> => {
  const eventId = parseInt(req.params.eventId, 10);
  const sessions = await db.select().from(attendanceSessionsTable)
    .where(eq(attendanceSessionsTable.eventId, eventId))
    .orderBy(attendanceSessionsTable.createdAt);
  res.json(sessions);
});

router.get("/attendance/sessions/token/:token", async (req, res): Promise<void> => {
  const [session] = await db.select().from(attendanceSessionsTable)
    .where(eq(attendanceSessionsTable.token, req.params.token));
  if (!session) {
    res.status(404).json({ error: "Sessão não encontrada" });
    return;
  }
  res.json(session);
});

router.delete("/attendance/sessions/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  await db.delete(attendanceSessionsTable).where(eq(attendanceSessionsTable.id, id));
  res.status(204).send();
});

router.post("/attendance/checkin", async (req, res): Promise<void> => {
  const { token, memberId, memberName, voicePart } = req.body;
  if (!token || !memberId || !memberName) {
    res.status(400).json({ error: "token, memberId e memberName são obrigatórios" });
    return;
  }
  const [session] = await db.select().from(attendanceSessionsTable)
    .where(eq(attendanceSessionsTable.token, token));
  if (!session) {
    res.status(404).json({ error: "Sessão não encontrada" });
    return;
  }
  if (new Date() > session.expiresAt) {
    res.status(410).json({ error: "Sessão expirada" });
    return;
  }
  const existing = await db.select().from(attendanceRecordsTable).where(
    and(
      eq(attendanceRecordsTable.sessionId, session.id),
      eq(attendanceRecordsTable.memberId, memberId)
    )
  );
  if (existing.length > 0) {
    res.status(409).json({ error: "Presença já registrada nesta sessão", record: existing[0] });
    return;
  }
  const [record] = await db.insert(attendanceRecordsTable).values({
    sessionId: session.id,
    eventId: session.eventId,
    memberId,
    memberName,
    voicePart: voicePart ?? null,
  }).returning();
  res.status(201).json(record);
});

router.get("/attendance/records/session/:sessionId", async (req, res): Promise<void> => {
  const sessionId = parseInt(req.params.sessionId, 10);
  const records = await db.select().from(attendanceRecordsTable)
    .where(eq(attendanceRecordsTable.sessionId, sessionId))
    .orderBy(attendanceRecordsTable.checkedInAt);
  res.json(records);
});

router.get("/attendance/records/event/:eventId", async (req, res): Promise<void> => {
  const eventId = parseInt(req.params.eventId, 10);
  const records = await db.select().from(attendanceRecordsTable)
    .where(eq(attendanceRecordsTable.eventId, eventId))
    .orderBy(attendanceRecordsTable.checkedInAt);
  res.json(records);
});

export default router;
