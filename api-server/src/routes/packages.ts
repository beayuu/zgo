import { Router } from "express";
import { db } from "@workspace/db";
import { packagesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  CreatePackageBody,
  GetPackageParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/packages", async (req, res) => {
  try {
    const rows = await db.select().from(packagesTable);
    res.json(rows.map(formatPackage));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/packages", async (req, res) => {
  try {
    const body = CreatePackageBody.parse(req.body);
    const [row] = await db.insert(packagesTable).values({
      ...body,
      price: String(body.price),
      originalPrice: body.originalPrice != null ? String(body.originalPrice) : undefined,
    }).returning();
    res.status(201).json(formatPackage(row));
  } catch (err) {
    req.log.error(err);
    res.status(400).json({ error: "Invalid data" });
  }
});

router.get("/packages/:id", async (req, res) => {
  try {
    const { id } = GetPackageParams.parse({ id: Number(req.params.id) });
    const [row] = await db.select().from(packagesTable).where(eq(packagesTable.id, id));
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(formatPackage(row));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

function formatPackage(row: typeof packagesTable.$inferSelect) {
  return {
    ...row,
    price: Number(row.price),
    originalPrice: row.originalPrice != null ? Number(row.originalPrice) : null,
    rating: Number(row.rating),
    createdAt: row.createdAt.toISOString(),
  };
}

export default router;
