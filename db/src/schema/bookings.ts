import { pgTable, serial, text, numeric, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const bookingsTable = pgTable("bookings", {
  id: serial("id").primaryKey(),
  bookingReference: text("booking_reference").notNull().unique(),
  userId: integer("user_id").notNull(),
  attractionId: integer("attraction_id"),
  packageId: integer("package_id"),
  transportationId: integer("transportation_id"),
  attractionName: text("attraction_name").notNull(),
  imageUrl: text("image_url").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  guestCount: integer("guest_count").notNull(),
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("confirmed"),
  paymentMethod: text("payment_method"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertBookingSchema = createInsertSchema(bookingsTable).omit({ id: true, createdAt: true, bookingReference: true });
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookingsTable.$inferSelect;
