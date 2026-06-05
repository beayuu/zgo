import { pgTable, serial, text, numeric, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const transportationTable = pgTable("transportation", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  description: text("description").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("image_url").notNull(),
  capacity: integer("capacity").notNull(),
  features: jsonb("features").$type<string[]>().notNull().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertTransportationSchema = createInsertSchema(transportationTable).omit({ id: true, createdAt: true });
export type InsertTransportation = z.infer<typeof insertTransportationSchema>;
export type Transportation = typeof transportationTable.$inferSelect;
