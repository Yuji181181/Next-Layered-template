import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
	test("has correct title", async ({ page }) => {
		await page.goto("/");

		// Next.jsのデフォルトタイトルまたはカスタムタイトルを確認
		await expect(page).toHaveTitle(/Next/);
	});

	test("renders main content", async ({ page }) => {
		await page.goto("/");

		// ページが正常に読み込まれることを確認
		await expect(page.locator("main")).toBeVisible();
	});
});
