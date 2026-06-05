import { pgTable, serial, text, numeric, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const packagesTable = pgTable("packages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: numeric("original_price", { precision: 10, scale: 2 }),
  imageUrl: text("image_url").notNull(),
  rating: numeric("rating", { precision: 3, scale: 2 }).notNull().default("0"),
  reviewCount: integer("review_count").notNull().default(0),
  duration: text("duration").notNull(),
  inclusions: jsonb("inclusions").$type<string[]>().notNull().default([]),
  highlights: jsonb("highlights").$type<string[]>().notNull().default([]),
  savingsPercent: integer("savings_percent"),
  isFeatured: boolean("is_featured").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertPackageSchema = createInsertSchema(packagesTable).omit({ id: true, createdAt: true, rating: true, reviewCount: true });
export type InsertPackage = z.infer<typeof insertPackageSchema>;
export type TourPackage = typeof packagesTable.$inferSelect;
