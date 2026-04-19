import { neon } from '@neondatabase/serverless';
import { drizzle as drizzle$1 } from 'drizzle-orm/neon-http';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { pgTable, timestamp, boolean, jsonb, decimal, varchar, integer, text, uuid, time, date } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

const url = "postgresql://neondb_owner:npg_cEgyTMV9rm6P@ep-lively-mud-amo579cx-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
const isLocal = /localhost|127\.0\.0\.1/.test(url);
const db = isLocal ? drizzle(new Pool({ connectionString: url })) : drizzle$1(neon(url));

const properties = pgTable("properties", {
  id: uuid("id").primaryKey().defaultRandom(),
  titleEn: varchar("title_en", { length: 255 }).notNull(),
  titleEs: varchar("title_es", { length: 255 }).notNull(),
  descriptionEn: text("description_en"),
  descriptionEs: text("description_es"),
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  zone: varchar("zone", { length: 100 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  // sale | rent
  status: varchar("status", { length: 50 }).notNull().default("available"),
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  areaSqft: decimal("area_sqft", { precision: 10, scale: 2 }),
  address: varchar("address", { length: 255 }),
  lat: decimal("lat", { precision: 10, scale: 7 }),
  lng: decimal("lng", { precision: 10, scale: 7 }),
  images: jsonb("images").$type().default([]),
  features: jsonb("features").$type().default([]),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
const blogPosts = pgTable("blog_posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: varchar("slug", { length: 200 }).unique().notNull(),
  titleEn: varchar("title_en", { length: 255 }).notNull(),
  titleEs: varchar("title_es", { length: 255 }).notNull(),
  contentEn: text("content_en"),
  // HTML del TipTap
  contentEs: text("content_es"),
  excerptEn: varchar("excerpt_en", { length: 500 }),
  excerptEs: varchar("excerpt_es", { length: 500 }),
  coverImage: varchar("cover_image", { length: 500 }),
  published: boolean("published").default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
const pageContent = pgTable("page_content", {
  id: uuid("id").primaryKey().defaultRandom(),
  key: varchar("key", { length: 100 }).unique().notNull(),
  // hero.title
  valueEn: text("value_en").notNull(),
  valueEs: text("value_es").notNull(),
  updatedAt: timestamp("updated_at").defaultNow()
});
const leads = pgTable("leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 150 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  message: text("message"),
  source: varchar("source", { length: 50 }).notNull(),
  // contact | property | appointment
  propertyId: uuid("property_id").references(() => properties.id),
  status: varchar("status", { length: 50 }).default("new"),
  // new | contacted | closed
  createdAt: timestamp("created_at").defaultNow()
});
const availabilitySlots = pgTable("availability_slots", {
  id: uuid("id").primaryKey().defaultRandom(),
  date: date("date").notNull(),
  timeStart: time("time_start").notNull(),
  timeEnd: time("time_end").notNull(),
  isBooked: boolean("is_booked").default(false),
  createdAt: timestamp("created_at").defaultNow()
});
const appointments = pgTable("appointments", {
  id: uuid("id").primaryKey().defaultRandom(),
  leadId: uuid("lead_id").notNull().references(() => leads.id),
  slotId: uuid("slot_id").notNull().references(() => availabilitySlots.id),
  status: varchar("status", { length: 50 }).default("pending"),
  // pending | confirmed | cancelled
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow()
});
const adminUsers = pgTable("admin_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 150 }).unique().notNull(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
relations(leads, ({ one, many }) => ({
  property: one(properties, {
    fields: [leads.propertyId],
    references: [properties.id]
  }),
  appointments: many(appointments)
}));
relations(appointments, ({ one }) => ({
  lead: one(leads, {
    fields: [appointments.leadId],
    references: [leads.id]
  }),
  slot: one(availabilitySlots, {
    fields: [appointments.slotId],
    references: [availabilitySlots.id]
  })
}));

export { availabilitySlots as a, appointments as b, blogPosts as c, db as d, properties as e, adminUsers as f, leads as l, pageContent as p };
