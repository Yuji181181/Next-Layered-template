# Claude Code Agent Guidelines

## 1. Role & Objective
あなたは、高度な自律性を持つフルスタックエンジニアです。
単にコードを書くだけでなく、外部ツール（CodeRabbit, GitHub Copilot）からのコードレビューを**批判的に評価**し、妥当な指摘のみを取り入れて品質を高めることが最大の責務です。

## 2. Tech Stack

### Backend / Database
- **Framework**: Next.js (App Router) - **Route Handlers** をAPIとして主軸に使用
- **Database**: TiDB (MySQL compatible)
- **ORM**: Drizzle ORM
- **Auth**: Better-auth
- **Validation**: Zod

### Frontend
- **Styling**: TailwindCSS
- **State/Fetching**: SWR
- **Component Logic**: React Hooks pattern

### Testing & Quality
- **Unit/Integration**: Vitest, Testing Library
- **E2E**: **Playwright** (実行コマンド: `pnpm playwright test`)
- **Linter/Formatter**: Biome
- **Type Checking**: TypeScript (Strict)

### Tools & Environment
- **Package Manager**: pnpm
- **Environment**: Claude Code
- **CLI Tools**: `gh` (GitHub CLI), `coderabbit` (CLI)

## 3. Architecture & Directory Rules

### Layered Architecture Responsibilities
以下の責務分離を厳守すること。
1.  **Presentation (Frontend)**: `app/(routes)/...` (UI & SWR)
2.  **Interface (API)**: `app/api/...` (Route Handlers, Validation, Auth)
3.  **Application (Service)**: `src/services/...` (Business Logic, Transaction)
4.  **Domain/Infra**: `src/db/schema.ts`, `src/repositories/...` (Drizzle)

### Directory Structure Rules
- **`src/components/common`**: 汎用UIパーツ（Button, Input等）。Shadcn等は使用せず、Pure Tailwindで実装する。
- **`src/components/domain`**: 機能単位のコンポーネント（LoginForm, UserCard等）。
- **`src/hooks`**: ロジックを切り出したカスタムフック。ファイル名は `useXxx.ts` とする。
- **`src/services`**: ビジネスロジック
- **`src/repositories`**: DB操作

### Directory Structure Tree
```text
src/
├── app/                  # ルーティングとAPIエンドポイント
│   ├── (routes)/         # 画面ページ (layout.tsx, page.tsx)
│   └── api/              # API Route Handlers (Interface Layer)
│       └── [resource]/
│           └── route.ts
├── components/           # Reactコンポーネント
│   ├── common/           # 汎用パーツ (Button, Input, Modal)
│   │   └── Button.tsx
│   └── domain/           # ドメイン機能パーツ
│       ├── auth/
│       │   └── LoginForm.tsx
│       └── user/
│           └── UserCard.tsx
├── hooks/                # カスタムフック (useFormInput.ts など)
├── services/             # ビジネスロジック (src直下)
├── repositories/         # DB操作 (src直下)
├── db/                   # DB設定
├── lib/                  # Utils
├── schema/               # Zod
└── types/                # TypeScript型
```

## 4. Operation Commands
- **Test (Unit)**: `pnpm test` (or `pnpm vitest`)
- **Test (E2E)**: `pnpm playwright test`
- **Lint**: `pnpm biome check --apply`
- **Type Check**: `pnpm tsc --noEmit`
- **Schema Push**: `pnpm drizzle-kit push`