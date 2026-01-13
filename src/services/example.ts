import type { NewExample } from "@/db/schema";
import * as exampleRepository from "@/repositories/example";
import type {
	CreateExampleInput,
	UpdateExampleInput,
} from "@/schema/api/example";

/**
 * Example Service
 * ビジネスロジックを担当（HTTPレスポンスは扱わない）
 */

export const getAllExamples = async () => {
	return await exampleRepository.findAllExamples();
};

export const getExampleById = async (id: number) => {
	const example = await exampleRepository.findExampleById(id);

	if (!example) {
		throw new Error("Example not found");
	}

	return example;
};

export const createExample = async (input: CreateExampleInput) => {
	const data: NewExample = {
		name: input.name,
		description: input.description ?? null,
	};

	const insertId = await exampleRepository.createExample(data);
	return await exampleRepository.findExampleById(insertId);
};

export const updateExample = async (id: number, input: UpdateExampleInput) => {
	// 存在確認
	const existing = await exampleRepository.findExampleById(id);
	if (!existing) {
		throw new Error("Example not found");
	}

	await exampleRepository.updateExample(id, input);
	return await exampleRepository.findExampleById(id);
};

export const deleteExample = async (id: number) => {
	// 存在確認
	const existing = await exampleRepository.findExampleById(id);
	if (!existing) {
		throw new Error("Example not found");
	}

	await exampleRepository.deleteExample(id);
};
