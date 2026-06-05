import { Router } from "express";
import { db } from "@workspace/db";
import { attractionsTable } from "@workspace/db";
import { eq, and, gte, lte, ilike, sql } from "drizzle-orm";
import {
  ListAttractionsQueryParams,
  CreateAttractionBody,
  GetAttractionParams,
  UpdateAttractionParams,
  UpdateAttractionBody,
  DeleteAttractionParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/attractions", async (req, res) => {
  try {
    const query = ListAttractionsQueryParams.safeParse(req.query);
    const params = query.success ? query.data : {};

    let conditions = [];
    if (params.category) conditions.push(eq(attractionsTable.category, params.category));
    if (params.location) conditions.push(ilike(attractionsTable.location, `%${params.location}%`));
    if (params.search) conditions.push(ilike(attractionsTable.name, `%${params.search}%`));
    if (params.minPrice != null) conditions.push(gte(attractionsTable.price, String(params.minPrice)));
    if (params.maxPrice != null) conditions.push(lte(attractionsTable.price, String(params.maxPrice)));
    if (params.minRating != null) conditions.push(gte(attractionsTable.rating, String(params.minRating)));

    const rows = conditions.length > 0
      ? await db.select().from(attractionsTable).where(and(...conditions))
      : await db.select().from(attractionsTable);

    res.json(rows.map(formatAttraction));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/attractions", async (req, res) => {
  try {
    const body = CreateAttractionBody.parse(req.body);
    const [row] = await db.insert(attractionsTable).values({
      ...body,
      price: String(body.price),
      originalPrice: body.originalPrice != null ? String(body.originalPrice) : undefined,
    }).returning();
    res.status(201).json(formatAttraction(row));
  } catch (err) {
    req.log.error(err);
    res.status(400).json({ error: "Invalid data" });
  }
});

router.get("/attractions/featured", async (req, res) => {
  try {
    const rows = await db.select().from(attractionsTable).where(eq(attractionsTable.isFeatured, true)).limit(8);
    res.json(rows.map(formatAttraction));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/attractions/categories", async (req, res) => {
  try {
    const rows = await db
      .select({ name: attractionsTable.category, count: sql<number>`count(*)::int` })
      .from(attractionsTable)
      .groupBy(attractionsTable.category);
    res.json(rows);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/attractions/:id", async (req, res) => {
  try {
    const { id } = GetAttractionParams.parse({ id: Number(req.params.id) });
    const [row] = await db.select().from(attractionsTable).where(eq(attractionsTable.id, id));
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(formatAttraction(row));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/attractions/:id", async (req, res) => {
  try {
    const { id } = UpdateAttractionParams.parse({ id: Number(req.params.id) });
    const body = UpdateAttractionBody.parse(req.body);
    const updates: Record<string, unknown> = { ...body };
    if (body.price != null) updates.price = String(body.price);
    if (body.originalPrice != null) updates.originalPrice = String(body.originalPrice);
    const [row] = await db.update(attractionsTable).set(updates).where(eq(attractionsTable.id, id)).returning();
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(formatAttraction(row));
  } catch (err) {
    req.log.error(err);
    res.status(400).json({ error: "Invalid data" });
  }
});

router.delete("/attractions/:id", async (req, res) => {
  try {
    const { id } = DeleteAttractionParams.parse({ id: Number(req.params.id) });
    await db.delete(attractionsTable).where(eq(attractionsTable.id, id));
    res.status(204).send();
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

function formatAttraction(row: typeof attractionsTable.$inferSelect) {
  return {
    ...row,
    price: Number(row.price),
    originalPrice: row.originalPrice != null ? Number(row.originalPrice) : null,
    rating: Number(row.rating),
    createdAt: row.createdAt.toISOString(),
  };
}

export default router;
