import { eq } from "drizzle-orm";

import { db } from "@/db";
import { examples, type NewExample } from "@/db/schema";

/**
 * Example Repository
 * データベース操作のみを担当（ビジネスロジックは含めない）
 */

export const findAllExamples = async () => {
	return await db.select().from(examples);
};

export const findExampleById = async (id: number) => {
	const result = await db.select().from(examples).where(eq(examples.id, id));
	return result[0];
};

export const createExample = async (data: NewExample) => {
	const result = await db.insert(examples).values(data);
	return result[0].insertId;
};

export const updateExample = async (id: number, data: Partial<NewExample>) => {
	await db.update(examples).set(data).where(eq(examples.id, id));
};

export const deleteExample = async (id: number) => {
	await db.delete(examples).where(eq(examples.id, id));
};
