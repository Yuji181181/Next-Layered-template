import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * サンプルテーブル: examples
 * 基本的なCRUD操作のテンプレートとして使用
 */
export const examples = mysqlTable("examples", {
	id: int("id").primaryKey().autoincrement(),
	name: varchar("name", { length: 255 }).notNull(),
	description: varchar("description", { length: 1000 }),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// 型エクスポート
export type Example = typeof examples.$inferSelect;
export type NewExample = typeof examples.$inferInsert;
