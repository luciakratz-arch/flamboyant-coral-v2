import { Router, type IRouter } from "express";
import { gte, lte, and } from "drizzle-orm";
import { db, membersTable, songsTable, eventsTable, announcementsTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/dashboard", async (_req, res): Promise<void> => {
  const [members, songs, events, announcements] = await Promise.all([
    db.select().from(membersTable),
    db.select().from(songsTable).orderBy(songsTable.title),
    db.select().from(eventsTable).orderBy(eventsTable.date),
    db.select().from(announcementsTable).orderBy(announcementsTable.createdAt),
  ]);

  const activeMembers = members.filter((m) => m.status === "active");

  const now = new Date();
  const todayStr = now.toISOString().split("T")[0];
  const thirtyDaysLater = new Date();
  thirtyDaysLater.setDate(now.getDate() + 30);
  const futureStr = thirtyDaysLater.toISOString().split("T")[0];

  const upcomingEvents = events
    .filter((e) => e.date >= todayStr && e.date <= futureStr)
    .slice(0, 5)
    .map((e) => ({
      id: e.id,
      title: e.title,
      date: e.date,
      type: e.type,
      status: e.status,
      arrivalTime: e.arrivalTime ?? null,
      presentationTime: e.presentationTime ?? null,
      outfit: e.outfit ?? null,
      location: e.location ?? null,
      notes: e.notes ?? null,
      createdAt: e.createdAt.toISOString(),
      updatedAt: e.updatedAt.toISOString(),
    }));

  const recentAnnouncements = announcements.slice(-3).reverse().map((a) => ({
    id: a.id,
    title: a.title,
    content: a.content,
    priority: a.priority,
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
  }));

  const grouped: Record<string, typeof songs> = {};
  for (const song of songs) {
    if (!grouped[song.category]) grouped[song.category] = [];
    grouped[song.category].push(song);
  }
  const songsByCategory = Object.entries(grouped).map(([category, songs]) => ({
    category,
    count: songs.length,
    songs: songs.map((s) => ({
      id: s.id,
      title: s.title,
      category: s.category,
      composer: s.composer ?? null,
      lyrics: s.lyrics ?? null,
      sheetMusicUrl: s.sheetMusicUrl ?? null,
      notes: s.notes ?? null,
      createdAt: s.createdAt.toISOString(),
      updatedAt: s.updatedAt.toISOString(),
    })),
  }));

  const currentMonth = now.getMonth() + 1;
  const birthdaysThisMonth = members
    .filter((m) => {
      if (!m.birthday) return false;
      const bMonth = parseInt(m.birthday.split("-")[1], 10);
      return bMonth === currentMonth;
    })
    .map((m) => ({ id: m.id, name: m.name, birthday: m.birthday! }));

  res.json({
    totalMembers: members.length,
    activeMembers: activeMembers.length,
    totalSongs: songs.length,
    totalEvents: events.length,
    upcomingEvents,
    recentAnnouncements,
    songsByCategory,
    birthdaysThisMonth,
  });
});

export default router;
