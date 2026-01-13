import { NextResponse } from "next/server";
import { z } from "zod";

import { updateExampleSchema } from "@/schema/api/example";
import * as exampleService from "@/services/example";

type Params = {
	params: Promise<{ id: string }>;
};

/**
 * GET /api/example/[id]
 * 特定のExampleを取得
 */
export async function GET(_request: Request, { params }: Params) {
	try {
		const { id } = await params;
		const numId = Number.parseInt(id, 10);

		if (Number.isNaN(numId)) {
			return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
		}

		const example = await exampleService.getExampleById(numId);
		return NextResponse.json(example);
	} catch (error) {
		console.error("API Error:", error);

		if (error instanceof Error && error.message === "Example not found") {
			return NextResponse.json({ error: "Not Found" }, { status: 404 });
		}

		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}

/**
 * PATCH /api/example/[id]
 * Exampleを更新
 */
export async function PATCH(request: Request, { params }: Params) {
	try {
		const { id } = await params;
		const numId = Number.parseInt(id, 10);

		if (Number.isNaN(numId)) {
			return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
		}

		const body = await request.json();
		const parsed = updateExampleSchema.parse(body);

		const result = await exampleService.updateExample(numId, parsed);
		return NextResponse.json(result);
	} catch (error) {
		console.error("API Error:", error);

		if (error instanceof z.ZodError) {
			return NextResponse.json({ error: error.issues }, { status: 400 });
		}

		if (error instanceof Error && error.message === "Example not found") {
			return NextResponse.json({ error: "Not Found" }, { status: 404 });
		}

		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}

/**
 * DELETE /api/example/[id]
 * Exampleを削除
 */
export async function DELETE(_request: Request, { params }: Params) {
	try {
		const { id } = await params;
		const numId = Number.parseInt(id, 10);

		if (Number.isNaN(numId)) {
			return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
		}

		await exampleService.deleteExample(numId);
		return new NextResponse(null, { status: 204 });
	} catch (error) {
		console.error("API Error:", error);

		if (error instanceof Error && error.message === "Example not found") {
			return NextResponse.json({ error: "Not Found" }, { status: 404 });
		}

		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
