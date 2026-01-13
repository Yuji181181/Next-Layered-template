# Next.js Layered Template

レイヤードアーキテクチャを採用したNext.jsのテンプレートリポジトリ

## 技術スタック

### Backend / Database
- **Framework**: Next.js 16 (App Router) - Route Handlers
- **Database**: TiDB (MySQL)
- **ORM**: Drizzle ORM
- **Auth**: Better-auth
- **Validation**: Zod

### Frontend
- **Styling**: TailwindCSS
- **State/Fetching**: SWR
- **Component Logic**: React Hooks pattern

### Testing & Quality
- **Unit/Integration**: Vitest
- **E2E**: Playwright
- **Linter/Formatter**: Biome
- **Type Checking**: TypeScript (Strict)

### Tools & Environment
- **Package Manager**: pnpm
- **MCP Servers**: context7, mysql, next-devtools, brave-search, puppeteer

## Architecture & Directory Rules

### Layered Architecture Responsibilities
以下の責務分離を厳守する構成

1. **Presentation (Frontend)**: `app/(routes)/...` (UI & SWR)
2. **Interface (API)**: `app/api/...` (Route Handlers, Validation, Auth)
3. **Application (Service)**: `src/services/...` (Business Logic, Transaction)
4. **Domain/Infra**: `src/db/schema.ts`, `src/repositories/...` (Drizzle)

### Directory Structure
- **`src/components/common`**: 汎用UIパーツ（Button, Input等）。Pure Tailwindで実装
- **`src/components/domain`**: 機能単位のコンポーネント
- **`src/hooks`**: ロジックを切り出したカスタムフック
- **`src/services`**: ビジネスロジック
- **`src/repositories`**: DB操作

## Setup

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Environment Variables
```bash
cp .env.example .env.local
```
`.env.local` を編集して `DATABASE_URL` 等を設定してください

### 3. Database Setup
```bash
pnpm run db:push
```

### 4. Configure MCP Servers (For Claude Code)
MCPサーバーを設定してください
プロジェクトルートの `.claude/mcp.json` を参考に、Claudeの設定ファイルに追記します

MCPサーバー:
- `context7`: 最新ドキュメント参照
- `mysql`: DB操作・事実確認
- `next-devtools`: アプリ状態監視
- `brave-search`: トラブルシューティング

## Operation Commands

| コマンド | 説明 |
|----------|------|
| `pnpm run dev` | 開発サーバー起動|
| `pnpm run build` | プロダクションビルド |
| `pnpm run lint` | Biome によるコードチェック・自動修正 |
| `pnpm run typecheck` | TypeScript 型チェック |
| `pnpm run db:push` | DBスキーマの適用 |
| `pnpm run test` | ユニットテスト・統合テスト (Vitest) |
| `pnpm run playwright` | E2Eテスト (Playwright) |

## Testing Strategy

このプロジェクトでは、**統合テスト**と**E2Eテスト**を重視します。

1. **統合テスト (Vitest)**: `pnpm run test`
   - API/Service層と実際のDBとの連携検証
2. **E2Eテスト (Playwright)**: `pnpm run playwright`
   - ブラウザを通じたユーザーストーリー検証