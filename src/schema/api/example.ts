import { z } from "zod";

/**
 * Example リソースの Zod スキーマ定義
 * Request/Response の両方で使用
 */

// 作成リクエスト
export const createExampleSchema = z.object({
	name: z.string().min(1, "名前は必須です").max(255, "名前は255文字以内です"),
	description: z.string().max(1000, "説明は1000文字以内です").optional(),
});

// 更新リクエスト
export const updateExampleSchema = z.object({
	name: z.string().min(1).max(255).optional(),
	description: z.string().max(1000).optional(),
});

// レスポンス
export const exampleResponseSchema = z.object({
	id: z.number(),
	name: z.string(),
	description: z.string().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

// 配列レスポンス
export const examplesResponseSchema = z.array(exampleResponseSchema);

// 型エクスポート
export type CreateExampleInput = z.infer<typeof createExampleSchema>;
export type UpdateExampleInput = z.infer<typeof updateExampleSchema>;
export type ExampleResponse = z.infer<typeof exampleResponseSchema>;
