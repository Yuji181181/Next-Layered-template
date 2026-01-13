import { describe, expect, it } from "vitest";

import { createExampleSchema, updateExampleSchema } from "./example";

describe("createExampleSchema", () => {
	it("validates correct input", () => {
		const result = createExampleSchema.safeParse({
			name: "Test Example",
			description: "This is a test",
		});
		expect(result.success).toBe(true);
	});

	it("requires name field", () => {
		const result = createExampleSchema.safeParse({
			description: "This is a test",
		});
		expect(result.success).toBe(false);
	});

	it("rejects empty name", () => {
		const result = createExampleSchema.safeParse({
			name: "",
		});
		expect(result.success).toBe(false);
	});

	it("allows optional description", () => {
		const result = createExampleSchema.safeParse({
			name: "Test",
		});
		expect(result.success).toBe(true);
	});

	it("rejects name over 255 characters", () => {
		const result = createExampleSchema.safeParse({
			name: "a".repeat(256),
		});
		expect(result.success).toBe(false);
	});
});

describe("updateExampleSchema", () => {
	it("allows partial updates", () => {
		const result = updateExampleSchema.safeParse({
			name: "Updated Name",
		});
		expect(result.success).toBe(true);
	});

	it("allows empty object", () => {
		const result = updateExampleSchema.safeParse({});
		expect(result.success).toBe(true);
	});
});
