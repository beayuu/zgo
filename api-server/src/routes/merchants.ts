import { Router } from "express";
import { db } from "@workspace/db";
import { bookingsTable, attractionsTable } from "@workspace/db";
import { eq, desc, sum, count, sql } from "drizzle-orm";

const router = Router();

const DEMO_MERCHANT_ID = 1;

router.get("/merchants/dashboard", async (req, res) => {
  try {
    const attractions = await db.select().from(attractionsTable).where(eq(attractionsTable.merchantId, DEMO_MERCHANT_ID));
    const attractionIds = attractions.map(a => a.id);

    let allBookings: any[] = [];
    for (const id of attractionIds) {
      const bs = await db.select().from(bookingsTable).where(eq(bookingsTable.attractionId, id));
      allBookings = allBookings.concat(bs);
    }

    const totalRevenue = allBookings.filter(b => b.status === "confirmed").reduce((sum, b) => sum + Number(b.totalAmount), 0);
    const pendingBookings = allBookings.filter(b => b.status === "pending").length;

    // Monthly revenue (last 6 months)
    const monthlyRevenue = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthStr = d.toLocaleString("default", { month: "short", year: "2-digit" });
      const monthPrefix = d.toISOString().slice(0, 7);
      const monthBookings = allBookings.filter(b => b.createdAt.toISOString().startsWith(monthPrefix) && b.status === "confirmed");
      monthlyRevenue.push({
        month: monthStr,
        revenue: monthBookings.reduce((s, b) => s + Number(b.totalAmount), 0),
        bookings: monthBookings.length,
      });
    }

    const recentBookings = allBookings
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5)
      .map(b => ({ ...b, totalAmount: Number(b.totalAmount), createdAt: b.createdAt.toISOString() }));

    const topAttractions = attractions.slice(0, 5).map(a => ({
      ...a,
      price: Number(a.price),
      originalPrice: a.originalPrice != null ? Number(a.originalPrice) : null,
      rating: Number(a.rating),
      createdAt: a.createdAt.toISOString(),
    }));

    res.json({
      totalAttractions: attractions.length,
      totalBookings: allBookings.length,
      totalRevenue,
      pendingBookings,
      monthlyRevenue,
      recentBookings,
      topAttractions,
    });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/merchants/attractions", async (req, res) => {
  try {
    const rows = await db.select().from(attractionsTable).where(eq(attractionsTable.merchantId, DEMO_MERCHANT_ID));
    res.json(rows.map(a => ({ ...a, price: Number(a.price), originalPrice: a.originalPrice != null ? Number(a.originalPrice) : null, rating: Number(a.rating), createdAt: a.createdAt.toISOString() })));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/merchants/bookings", async (req, res) => {
  try {
    const attractions = await db.select({ id: attractionsTable.id }).from(attractionsTable).where(eq(attractionsTable.merchantId, DEMO_MERCHANT_ID));
    const attractionIds = attractions.map(a => a.id);

    let allBookings: any[] = [];
    for (const id of attractionIds) {
      const bs = await db.select().from(bookingsTable).where(eq(bookingsTable.attractionId, id));
      allBookings = allBookings.concat(bs);
    }

    res.json(allBookings.map(b => ({ ...b, totalAmount: Number(b.totalAmount), createdAt: b.createdAt.toISOString() })));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
