import { Router } from "express";
import { db } from "@workspace/db";
import { bookingsTable, attractionsTable, packagesTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import {
  CreateBookingBody,
  GetBookingParams,
  CancelBookingParams,
} from "@workspace/api-zod";

const router = Router();

const DEMO_USER_ID = 1;

router.get("/bookings", async (req, res) => {
  try {
    const rows = await db
      .select()
      .from(bookingsTable)
      .where(eq(bookingsTable.userId, DEMO_USER_ID))
      .orderBy(desc(bookingsTable.createdAt));
    res.json(rows.map(formatBooking));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/bookings", async (req, res) => {
  try {
    const body = CreateBookingBody.parse(req.body);
    let attractionName = "ZamGo Experience";
    let imageUrl = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800";

    if (body.attractionId) {
      const [attr] = await db.select().from(attractionsTable).where(eq(attractionsTable.id, body.attractionId));
      if (attr) { attractionName = attr.name; imageUrl = attr.imageUrl; }
    } else if (body.packageId) {
      const [pkg] = await db.select().from(packagesTable).where(eq(packagesTable.id, body.packageId));
      if (pkg) { attractionName = pkg.name; imageUrl = pkg.imageUrl; }
    }

    const price = body.attractionId
      ? (await db.select().from(attractionsTable).where(eq(attractionsTable.id, body.attractionId!)))[0]?.price ?? "0"
      : (await db.select().from(packagesTable).where(eq(packagesTable.id, body.packageId!)))[0]?.price ?? "0";

    const totalAmount = Number(price) * body.guestCount;
    const bookingReference = `ZG${Date.now().toString().slice(-8)}`;

    const [row] = await db.insert(bookingsTable).values({
      bookingReference,
      userId: DEMO_USER_ID,
      attractionId: body.attractionId ?? null,
      packageId: body.packageId ?? null,
      transportationId: body.transportationId ?? null,
      attractionName,
      imageUrl,
      date: body.date,
      time: body.time,
      guestCount: body.guestCount,
      totalAmount: String(totalAmount),
      status: "confirmed",
      paymentMethod: body.paymentMethod,
    }).returning();
    res.status(201).json(formatBooking(row));
  } catch (err) {
    req.log.error(err);
    res.status(400).json({ error: "Invalid data" });
  }
});

router.get("/bookings/:id", async (req, res) => {
  try {
    const { id } = GetBookingParams.parse({ id: Number(req.params.id) });
    const [row] = await db.select().from(bookingsTable).where(eq(bookingsTable.id, id));
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(formatBooking(row));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/bookings/:id/cancel", async (req, res) => {
  try {
    const { id } = CancelBookingParams.parse({ id: Number(req.params.id) });
    const [row] = await db.update(bookingsTable).set({ status: "cancelled" }).where(eq(bookingsTable.id, id)).returning();
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(formatBooking(row));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

function formatBooking(row: typeof bookingsTable.$inferSelect) {
  return {
    ...row,
    totalAmount: Number(row.totalAmount),
    createdAt: row.createdAt.toISOString(),
  };
}

export default router;
