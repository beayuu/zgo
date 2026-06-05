import { Router } from "express";
import { db } from "@workspace/db";
import { reviewsTable, usersTable, attractionsTable } from "@workspace/db";
import { eq, and, desc, avg, sql } from "drizzle-orm";
import {
  ListReviewsQueryParams,
  CreateReviewBody,
} from "@workspace/api-zod";

const router = Router();

const DEMO_USER_ID = 1;

router.get("/reviews", async (req, res) => {
  try {
    const query = ListReviewsQueryParams.safeParse(req.query);
    const params = query.success ? query.data : {};

    let conditions = [];
    if (params.attractionId != null) conditions.push(eq(reviewsTable.attractionId, params.attractionId));
    if (params.packageId != null) conditions.push(eq(reviewsTable.packageId, params.packageId));

    const rows = conditions.length > 0
      ? await db.select().from(reviewsTable).where(and(...conditions)).orderBy(desc(reviewsTable.createdAt))
      : await db.select().from(reviewsTable).orderBy(desc(reviewsTable.createdAt)).limit(20);

    res.json(rows.map(formatReview));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/reviews", async (req, res) => {
  try {
    const body = CreateReviewBody.parse(req.body);
    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, DEMO_USER_ID));

    const [row] = await db.insert(reviewsTable).values({
      userId: DEMO_USER_ID,
      userName: user?.name ?? "Guest",
      userAvatar: user?.avatarUrl ?? null,
      attractionId: body.attractionId ?? null,
      packageId: body.packageId ?? null,
      rating: body.rating,
      comment: body.comment,
    }).returning();

    if (body.attractionId) {
      const [agg] = await db
        .select({ avg: avg(reviewsTable.rating), count: sql<number>`count(*)::int` })
        .from(reviewsTable)
        .where(eq(reviewsTable.attractionId, body.attractionId));
      await db.update(attractionsTable).set({
        rating: String(Number(agg.avg ?? 0).toFixed(2)),
        reviewCount: agg.count,
      }).where(eq(attractionsTable.id, body.attractionId));
    }

    res.status(201).json(formatReview(row));
  } catch (err) {
    req.log.error(err);
    res.status(400).json({ error: "Invalid data" });
  }
});

function formatReview(row: typeof reviewsTable.$inferSelect) {
  return {
    ...row,
    createdAt: row.createdAt.toISOString(),
  };
}

export default router;
