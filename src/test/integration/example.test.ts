import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { exampleService } from "../../services/example";
import { db } from "../../db";
import { examples } from "../../db/schema";
import { sql } from "drizzle-orm";

// 統合テストサンプル
// 実際にDBに接続して動作確認を行う
describe("Integration: Example Service", () => {
	// テスト準備: テーブルのクリーンアップなど
	beforeAll(async () => {
		// 注意: 本番DBに接続しないよう、環境変数をテスト用に切り替える必要があります
		await db.delete(examples);
	});

	afterAll(async () => {
		await db.delete(examples);
	});

	it("should create and retrieve an example", async () => {
		// 1. 作成
		const newExample = await exampleService.create({
			name: "Integration Test",
			description: "Testing via Vitest",
		});

		expect(newExample).toBeDefined();
		expect(newExample.id).toBeDefined();
		expect(newExample.name).toBe("Integration Test");

		// 2. 取得
		const fetched = await exampleService.getById(newExample.id);
		expect(fetched).toBeDefined();
		expect(fetched?.name).toBe("Integration Test");
	});
});
