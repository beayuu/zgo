import { Router } from "express";
import { db } from "@workspace/db";
import { bookingsTable, attractionsTable, usersTable } from "@workspace/db";
import { count, sum } from "drizzle-orm";

const router = Router();

router.get("/admin/stats", async (req, res) => {
  try {
    const [userCount] = await db.select({ count: count() }).from(usersTable);
    const [attractionCount] = await db.select({ count: count() }).from(attractionsTable);
    const allBookings = await db.select().from(bookingsTable);

    const totalRevenue = allBookings.filter(b => b.status === "confirmed").reduce((s, b) => s + Number(b.totalAmount), 0);
    const confirmed = allBookings.filter(b => b.status === "confirmed").length;
    const pending = allBookings.filter(b => b.status === "pending").length;
    const cancelled = allBookings.filter(b => b.status === "cancelled").length;

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

    res.json({
      totalUsers: userCount?.count ?? 0,
      totalMerchants: 3,
      totalBookings: allBookings.length,
      totalRevenue,
      activeAttractions: attractionCount?.count ?? 0,
      pendingBookings: pending,
      monthlyRevenue,
      bookingsByStatus: { confirmed, pending, cancelled },
    });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/admin/users", async (req, res) => {
  try {
    const rows = await db.select().from(usersTable);
    res.json(rows.map(u => ({ ...u, createdAt: u.createdAt.toISOString() })));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/admin/bookings", async (req, res) => {
  try {
    const rows = await db.select().from(bookingsTable);
    res.json(rows.map(b => ({ ...b, totalAmount: Number(b.totalAmount), createdAt: b.createdAt.toISOString() })));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
