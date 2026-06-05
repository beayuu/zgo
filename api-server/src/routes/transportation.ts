import { Router } from "express";
import { db } from "@workspace/db";
import { transportationTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  ListTransportationQueryParams,
  CreateTransportationBody,
  GetTransportationParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/transportation", async (req, res) => {
  try {
    const query = ListTransportationQueryParams.safeParse(req.query);
    const params = query.success ? query.data : {};

    const rows = params.type
      ? await db.select().from(transportationTable).where(eq(transportationTable.type, params.type))
      : await db.select().from(transportationTable);

    res.json(rows.map(formatTransportation));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/transportation", async (req, res) => {
  try {
    const body = CreateTransportationBody.parse(req.body);
    const [row] = await db.insert(transportationTable).values({
      ...body,
      price: String(body.price),
    }).returning();
    res.status(201).json(formatTransportation(row));
  } catch (err) {
    req.log.error(err);
    res.status(400).json({ error: "Invalid data" });
  }
});

router.get("/transportation/:id", async (req, res) => {
  try {
    const { id } = GetTransportationParams.parse({ id: Number(req.params.id) });
    const [row] = await db.select().from(transportationTable).where(eq(transportationTable.id, id));
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(formatTransportation(row));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

function formatTransportation(row: typeof transportationTable.$inferSelect) {
  return {
    ...row,
    price: Number(row.price),
    createdAt: row.createdAt.toISOString(),
  };
}

export default router;
