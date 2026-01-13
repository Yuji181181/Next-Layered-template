# Backend Guidelines

このプロジェクトにおけるバックエンド（API）実装のルールです。
AIはコードを生成する際、必ずこのドキュメントに従ってください。

## 1. Architecture Overview (Layered Architecture)

APIは以下の3層構造（Presentation, Application, Infrastructure）で構成し、責務を明確に分離してください。

### 層の役割定義

1.  **Route Handlers (Interface Layer)**
    - **Path**: `app/api/**/route.ts`
    - **責務**:
        - リクエストの受け取り
        - **Zod** による入力バリデーション（Query, Body, Params）
        - **Better-auth** による認証チェック
        - Service関数の呼び出し
        - レスポンスの整形とステータスコードの決定
        - エラーハンドリング（Try-Catch）
    - **禁止事項**: ビジネスロジックやDB操作を直接書かないこと。

2.  **Services (Application Layer)**
    - **Path**: `src/services/**.ts`
    - **責務**:
        - ビジネスロジックの実装
        - データの加工・計算
        - Repository関数の呼び出し
    - **禁止事項**: HTTPリクエスト/レスポンスオブジェクト（`NextResponse`など）を直接扱わないこと。

3.  **Repositories (Infrastructure Layer)**
    - **Path**: `src/repositories/**.ts`
    - **責務**:
        - **Drizzle ORM** を使用したデータベース操作（CRUD）
        - データの取得・保存のみに集中する
    - **禁止事項**: ビジネスロジックを含めないこと。

## 2. Implementation Rules

### Route Handlers (`route.ts`)
- **Error Handling**: 必ず `try-catch` ブロックで囲み、エラー時は `console.error` でログ出力した後、適切なステータスコード（500, 400, 404等）を返してください。
- **Response**: JSONレスポンスは `NextResponse.json()` を使用してください。

**✅ 実装例 (Route Handler):**
```ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { createSurveyService } from "@/services/survey";
import { surveySchema } from "@/schema/api/survey"; // Zod Schema

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 1. Validation
    const parsed = surveySchema.parse(body);

    // 2. Service Call
    const result = await createSurveyService(parsed);

    // 3. Response
    return NextResponse.json(result, { status: 201 });

  } catch (error) {
    console.error("API Error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
```

### Services (`src/services`)
- **Return Type**: HTTPレスポンスではなく、プレーンなJavaScriptオブジェクトを返してください。
- **Error**: バリデーション以外のビジネスロジックエラー（例：「既に回答済みです」）は、ここで `Error` を throw してください。

### Repositories (`src/repositories`)
- **Drizzle**: DB操作は必ず Drizzle ORM のインスタンス (`db`) を使用してください。
- **Error**: ここでは `try-catch` を**書かないでください**（エラーはServiceやRoute Handlerに伝播させるため）。

**✅ 実装例 (Repository):**
```ts
import { db } from "@/db";
import { surveys } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getSurveyById = async (id: string) => {
  const result = await db.select().from(surveys).where(eq(surveys.id, id));
  return result[0];
};
```

## 3. Validation (Zod)

API作成時には、`schema/api/` ディレクトリ配下に以下のZodスキーマを必ず定義してください。
**レスポンスのスキーマ定義も必須**とし、型安全性を担保してください。

- クエリパラメータ
- パスパラメータ
- リクエストボディー
- レスポンス