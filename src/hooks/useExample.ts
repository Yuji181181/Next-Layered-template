"use client";

import useSWR from "swr";

import type { ExampleResponse } from "@/schema/api/example";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

/**
 * Exampleデータ取得のカスタムフック
 * SWRを使用したデータフェッチングとキャッシュ管理
 */
export const useExamples = () => {
	const { data, error, isLoading, mutate } = useSWR<ExampleResponse[]>(
		"/api/example",
		fetcher,
	);

	return {
		examples: data ?? [],
		isLoading,
		isError: !!error,
		mutate,
	};
};

export const useExample = (id: number | null) => {
	const { data, error, isLoading, mutate } = useSWR<ExampleResponse>(
		id ? `/api/example/${id}` : null,
		fetcher,
	);

	return {
		example: data,
		isLoading,
		isError: !!error,
		mutate,
	};
};
