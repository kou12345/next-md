import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, int, text, datetime, varchar } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const messages = mysqlTable("messages", {
	id: int("id").autoincrement().notNull(),
	roomId: int("room_id").notNull(),
	userId: text("user_id").notNull(),
	userName: text("user_name").notNull(),
	messageText: text("message_text").notNull(),
	createdAt: datetime("created_at", { mode: 'string'}).default(sql`CURRENT_TIMESTAMP`),
},
(table) => {
	return {
		messagesId: primaryKey(table.id),
	}
});

export const rooms = mysqlTable("rooms", {
	id: int("id").autoincrement().notNull(),
	roomName: varchar("room_name", { length: 255 }).notNull(),
	createdAt: datetime("created_at", { mode: 'string'}).default(sql`CURRENT_TIMESTAMP`),
},
(table) => {
	return {
		roomsId: primaryKey(table.id),
	}
});