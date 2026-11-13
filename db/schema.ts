// schema.ts
import { sql } from 'drizzle-orm';
import {
  foreignKey,
  integer,
  text,
  sqliteTable,
} from "drizzle-orm/sqlite-core";

export const podcasts = sqliteTable("podcasts", {
  id: integer('id').primaryKey(),
  name: text().notNull(),
  description: text().notNull(),
  logo: text().notNull(),
});

export const posts = sqliteTable("posts", {
  id: integer('id').primaryKey(),
  podcastId: integer("podcast_id"),
  identifier: text().notNull().unique(),
  title: text().notNull(),
  description: text(),
  image: text().notNull(),
  audio: text().notNull(),
  publishDate: text('publish_date').notNull().default(sql`(current_timestamp)`),
  updateDate: text('update_date').notNull().default(sql`(current_timestamp)`),
}, (table) => [
  foreignKey({
    columns: [table.podcastId],
    foreignColumns: [podcasts.id],
    name: "posts_podcast_id_fkey",
  }),
]);
