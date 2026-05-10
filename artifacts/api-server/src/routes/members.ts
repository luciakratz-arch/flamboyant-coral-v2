import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, membersTable } from "@workspace/db";
import {
  ListMembersQueryParams,
  CreateMemberBody,
  UpdateMemberBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/members/stats", async (req, res): Promise<void> => {
  const all = await db.select().from(membersTable);
  const active = all.filter((m) => m.status === "active").length;
  const inactive = all.filter((m) => m.status === "inactive").length;

  const now = new Date();
  const currentMonth = now.getMonth() + 1;

  const birthdays = all
    .filter((m) => {
      if (!m.birthday) return false;
      const bMonth = parseInt(m.birthday.split("-")[1], 10);
      return bMonth === currentMonth;
    })
    .map((m) => ({
      id: m.id,
      name: m.name,
      birthday: m.birthday!,
    }));

  res.json({ total: all.length, active, inactive, birthdays });
});

router.get("/members", async (req, res): Promise<void> => {
  const query = ListMembersQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  const { status } = query.data;
  let rows;
  if (status === "active") {
    rows = await db.select().from(membersTable).where(eq(membersTable.status, "active"));
  } else if (status === "inactive") {
    rows = await db.select().from(membersTable).where(eq(membersTable.status, "inactive"));
  } else {
    rows = await db.select().from(membersTable);
  }

  res.json(rows.map(serializeMember));
});

router.post("/members", async (req, res): Promise<void> => {
  const parsed = CreateMemberBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [member] = await db.insert(membersTable).values({
    name: parsed.data.name,
    voicePart: parsed.data.voicePart ?? null,
    role: parsed.data.role ?? "corista",
    phone: parsed.data.phone ?? null,
    email: parsed.data.email ?? null,
    cpf: parsed.data.cpf ?? null,
    rg: parsed.data.rg ?? null,
    birthday: parsed.data.birthday ?? null,
    startDate: parsed.data.startDate,
    endDate: parsed.data.endDate ?? null,
    status: parsed.data.status ?? "active",
    profilePhoto: parsed.data.profilePhoto ?? null,
    notes: parsed.data.notes ?? null,
  }).returning();

  res.status(201).json(serializeMember(member));
});

router.get("/members/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "ID inválido" }); return; }

  const [member] = await db.select().from(membersTable).where(eq(membersTable.id, id));
  if (!member) { res.status(404).json({ error: "Integrante não encontrado" }); return; }

  res.json(serializeMember(member));
});

router.patch("/members/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "ID inválido" }); return; }

  const parsed = UpdateMemberBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const updateData: Record<string, unknown> = {};
  const d = parsed.data;
  const nullIfEmpty = (v: string | null | undefined) => (v === "" ? null : v ?? null);
  if (d.name !== undefined) updateData.name = d.name;
  if (d.voicePart !== undefined) updateData.voicePart = nullIfEmpty(d.voicePart);
  if (d.role !== undefined) updateData.role = nullIfEmpty(d.role);
  if (d.phone !== undefined) updateData.phone = nullIfEmpty(d.phone);
  if (d.email !== undefined) updateData.email = nullIfEmpty(d.email);
  if (d.cpf !== undefined) updateData.cpf = nullIfEmpty(d.cpf);
  if (d.rg !== undefined) updateData.rg = nullIfEmpty(d.rg);
  if (d.birthday !== undefined) updateData.birthday = nullIfEmpty(d.birthday);
  if (d.startDate !== undefined) updateData.startDate = d.startDate;
  if (d.endDate !== undefined) updateData.endDate = nullIfEmpty(d.endDate);
  if (d.status !== undefined) updateData.status = d.status;
  if (d.profilePhoto !== undefined) updateData.profilePhoto = nullIfEmpty(d.profilePhoto);
  if (d.notes !== undefined) updateData.notes = nullIfEmpty(d.notes);

  const [member] = await db.update(membersTable).set(updateData).where(eq(membersTable.id, id)).returning();
  if (!member) { res.status(404).json({ error: "Integrante não encontrado" }); return; }

  res.json(serializeMember(member));
});

router.delete("/members/:id", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "ID inválido" }); return; }

  const [member] = await db.delete(membersTable).where(eq(membersTable.id, id)).returning();
  if (!member) { res.status(404).json({ error: "Integrante não encontrado" }); return; }

  res.sendStatus(204);
});

function serializeMember(m: typeof membersTable.$inferSelect) {
  return {
    id: m.id,
    name: m.name,
    voicePart: m.voicePart ?? null,
    role: m.role ?? "corista",
    phone: m.phone ?? null,
    email: m.email ?? null,
    cpf: m.cpf ?? null,
    rg: m.rg ?? null,
    birthday: m.birthday ?? null,
    startDate: m.startDate,
    endDate: m.endDate ?? null,
    status: m.status,
    profilePhoto: m.profilePhoto ?? null,
    notes: m.notes ?? null,
    createdAt: m.createdAt.toISOString(),
    updatedAt: m.updatedAt.toISOString(),
  };
}

export default router;
