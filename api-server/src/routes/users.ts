import { Router } from "express";
import { db } from "@workspace/db";
import { usersTable, bookingsTable, favoritesTable, attractionsTable, reviewsTable } from "@workspace/db";
import { eq, desc, count, and } from "drizzle-orm";
import { AddFavoriteParams, RemoveFavoriteParams } from "@workspace/api-zod";

const router = Router();

const DEMO_USER_ID = 1;

router.get("/users/me", async (req, res) => {
  try {
    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, DEMO_USER_ID));
    if (!user) return res.status(404).json({ error: "Not found" });
    res.json({ ...user, createdAt: user.createdAt.toISOString() });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/users/me/dashboard", async (req, res) => {
  try {
    const bookings = await db.select().from(bookingsTable).where(eq(bookingsTable.userId, DEMO_USER_ID)).orderBy(desc(bookingsTable.createdAt));
    const today = new Date().toISOString().split("T")[0];

    const upcoming = bookings.filter(b => b.date >= today && b.status === "confirmed");
    const completed = bookings.filter(b => b.date < today && b.status === "confirmed");
    const totalSpent = bookings.filter(b => b.status === "confirmed").reduce((sum, b) => sum + Number(b.totalAmount), 0);

    const [favCount] = await db.select({ count: count() }).from(favoritesTable).where(eq(favoritesTable.userId, DEMO_USER_ID));

    res.json({
      totalBookings: bookings.length,
      upcomingTrips: upcoming.length,
      completedTrips: completed.length,
      totalSpent,
      recentBookings: bookings.slice(0, 5).map(b => ({ ...b, totalAmount: Number(b.totalAmount), createdAt: b.createdAt.toISOString() })),
      upcomingBookings: upcoming.slice(0, 5).map(b => ({ ...b, totalAmount: Number(b.totalAmount), createdAt: b.createdAt.toISOString() })),
      savedAttractions: favCount?.count ?? 0,
    });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/users/me/favorites", async (req, res) => {
  try {
    const favs = await db.select({ attractionId: favoritesTable.attractionId }).from(favoritesTable).where(eq(favoritesTable.userId, DEMO_USER_ID));
    if (favs.length === 0) return res.json([]);
    const ids = favs.map(f => f.attractionId);
    const attractions = await db.select().from(attractionsTable);
    const filtered = attractions.filter(a => ids.includes(a.id));
    res.json(filtered.map(a => ({ ...a, price: Number(a.price), originalPrice: a.originalPrice != null ? Number(a.originalPrice) : null, rating: Number(a.rating), createdAt: a.createdAt.toISOString() })));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/users/me/favorites/:attractionId", async (req, res) => {
  try {
    const { attractionId } = AddFavoriteParams.parse({ attractionId: Number(req.params.attractionId) });
    const existing = await db.select().from(favoritesTable).where(and(eq(favoritesTable.userId, DEMO_USER_ID), eq(favoritesTable.attractionId, attractionId)));
    if (existing.length === 0) {
      await db.insert(favoritesTable).values({ userId: DEMO_USER_ID, attractionId });
    }
    res.json({ message: "Added to favorites" });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/users/me/favorites/:attractionId", async (req, res) => {
  try {
    const { attractionId } = RemoveFavoriteParams.parse({ attractionId: Number(req.params.attractionId) });
    await db.delete(favoritesTable).where(and(eq(favoritesTable.userId, DEMO_USER_ID), eq(favoritesTable.attractionId, attractionId)));
    res.status(204).send();
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
