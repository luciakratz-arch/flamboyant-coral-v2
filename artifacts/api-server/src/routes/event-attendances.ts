import { Router, type IRouter } from "express";
import { eq, and } from "drizzle-orm";
import { db, eventAttendancesTable, membersTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/events/:id/attendances", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const rows = await db
    .select({
      att: eventAttendancesTable,
      member: { id: membersTable.id, name: membersTable.name, voicePart: membersTable.voicePart },
    })
    .from(eventAttendancesTable)
    .innerJoin(membersTable, eq(eventAttendancesTable.memberId, membersTable.id))
    .where(eq(eventAttendancesTable.eventId, id));

  res.json(rows.map(r => ({
    id: r.att.id,
    eventId: r.att.eventId,
    memberId: r.att.memberId,
    memberName: r.member.name,
    voicePart: r.member.voicePart ?? null,
    status: r.att.status,
    updatedAt: r.att.updatedAt.toISOString(),
  })));
});

router.post("/events/:id/attendances", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const { memberId, status } = req.body as { memberId?: number; status?: string };
  if (!memberId || !status || !["confirmed", "declined"].includes(status)) {
    res.status(400).json({ error: "memberId and status (confirmed|declined) required" }); return;
  }

  const member = await db.select().from(membersTable).where(eq(membersTable.id, memberId)).then(r => r[0]);
  if (!member) { res.status(404).json({ error: "Member not found" }); return; }

  const existing = await db
    .select()
    .from(eventAttendancesTable)
    .where(and(eq(eventAttendancesTable.eventId, id), eq(eventAttendancesTable.memberId, memberId)))
    .then(r => r[0]);

  let att;
  if (existing) {
    [att] = await db
      .update(eventAttendancesTable)
      .set({ status, updatedAt: new Date() })
      .where(eq(eventAttendancesTable.id, existing.id))
      .returning();
  } else {
    [att] = await db
      .insert(eventAttendancesTable)
      .values({ eventId: id, memberId, status })
      .returning();
  }

  res.json({
    id: att.id,
    eventId: att.eventId,
    memberId: att.memberId,
    memberName: member.name,
    voicePart: member.voicePart ?? null,
    status: att.status,
    updatedAt: att.updatedAt.toISOString(),
  });
});

export default router;
