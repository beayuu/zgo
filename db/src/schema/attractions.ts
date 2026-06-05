import { pgTable, serial, text, numeric, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const attractionsTable = pgTable("attractions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  location: text("location").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: numeric("original_price", { precision: 10, scale: 2 }),
  rating: numeric("rating", { precision: 3, scale: 2 }).notNull().default("0"),
  reviewCount: integer("review_count").notNull().default(0),
  duration: text("duration").notNull(),
  imageUrl: text("image_url").notNull(),
  images: jsonb("images").$type<string[]>().notNull().default([]),
  inclusions: jsonb("inclusions").$type<string[]>().notNull().default([]),
  meetingPoint: text("meeting_point"),
  schedule: text("schedule"),
  isFeatured: boolean("is_featured").notNull().default(false),
  merchantId: integer("merchant_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertAttractionSchema = createInsertSchema(attractionsTable).omit({ id: true, createdAt: true, rating: true, reviewCount: true });
export type InsertAttraction = z.infer<typeof insertAttractionSchema>;
export type Attraction = typeof attractionsTable.$inferSelect;
