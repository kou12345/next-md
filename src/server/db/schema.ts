import { int, mysqlTable, text, timestamp } from "drizzle-orm/mysql-core";

export const messages = mysqlTable("messages", {
  id: int("id").primaryKey().autoincrement(),
  userId: text("user_id").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
