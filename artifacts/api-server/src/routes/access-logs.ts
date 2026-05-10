import { Router, type IRouter } from "express";
import { db, accessLogsTable } from "@workspace/db";
import { CreateAccessLogBody } from "@workspace/api-zod";
import { desc, gte, sql } from "drizzle-orm";

const router: IRouter = Router();

router.post("/access-logs", async (req, res): Promise<void> => {
  const parsed = CreateAccessLogBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { memberId, memberName } = parsed.data;
  const [log] = await db.insert(accessLogsTable).values({ memberId, memberName }).returning();
  res.status(201).json({ id: log.id, memberId: log.memberId, memberName: log.memberName, accessedAt: log.accessedAt.toISOString() });
});

router.get("/access-logs/summary", async (_req, res): Promise<void> => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const rows = await db
    .select({
      memberId: accessLogsTable.memberId,
      memberName: accessLogsTable.memberName,
      total: sql<number>`count(*)::int`,
      last30Days: sql<number>`count(*) filter (where ${accessLogsTable.accessedAt} >= ${thirtyDaysAgo})::int`,
      lastAccess: sql<string>`max(${accessLogsTable.accessedAt})::text`,
    })
    .from(accessLogsTable)
    .groupBy(accessLogsTable.memberId, accessLogsTable.memberName)
    .orderBy(desc(sql`count(*)`));

  res.json(rows);
});

router.get("/access-logs", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(accessLogsTable)
    .orderBy(desc(accessLogsTable.accessedAt))
    .limit(200);

  res.json(rows.map(r => ({
    id: r.id,
    memberId: r.memberId,
    memberName: r.memberName,
    accessedAt: r.accessedAt.toISOString(),
  })));
});

export default router;
