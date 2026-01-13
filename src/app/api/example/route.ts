import { NextResponse } from "next/server";
import { z } from "zod";

import { createExampleSchema } from "@/schema/api/example";
import * as exampleService from "@/services/example";

/**
 * GET /api/example
 * 全てのExampleを取得
 */
export async function GET() {
	try {
		const examples = await exampleService.getAllExamples();
		return NextResponse.json(examples);
	} catch (error) {
		console.error("API Error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}

/**
 * POST /api/example
 * 新しいExampleを作成
 */
export async function POST(request: Request) {
	try {
		const body = await request.json();

		// Validation
		const parsed = createExampleSchema.parse(body);

		// Service Call
		const result = await exampleService.createExample(parsed);

		return NextResponse.json(result, { status: 201 });
	} catch (error) {
		console.error("API Error:", error);

		if (error instanceof z.ZodError) {
			return NextResponse.json({ error: error.issues }, { status: 400 });
		}

		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
