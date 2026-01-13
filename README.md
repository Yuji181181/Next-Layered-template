# Next.js Layered Template

レイヤードアーキテクチャを採用したNext.js テンプレートリポジトリです。

## 🚀 Tech Stack

| カテゴリ | 技術 |
|---------|------|
| **Framework** | Next.js 16 (App Router) |
| **Database** | TiDB / MySQL + Drizzle ORM |
| **Auth** | Better-auth |
| **Validation** | Zod |
| **Styling** | TailwindCSS (Pure) |
| **State/Fetching** | SWR |
| **Testing** | Vitest + Playwright |
| **Linter/Formatter** | Biome |
| **Package Manager** | pnpm |

## 📁 ディレクトリ構造

```
src/
├── app/
│   ├── (routes)/          # Presentation Layer - Pages
│   └── api/               # Interface Layer - Route Handlers
├── components/
│   ├── common/            # 汎用UIパーツ (Button, Input等)
│   └── domain/            # 機能単位コンポーネント
├── db/
│   ├── index.ts           # Drizzle DB instance
│   └── schema.ts          # Drizzle schema definitions
├── hooks/                 # カスタムフック (useXxx.ts)
├── repositories/          # Infrastructure Layer - DB操作
├── services/              # Application Layer - ビジネスロジック
└── schema/
    └── api/               # Zod validation schemas
```

## 🏗️ Architecture

レイヤードアーキテクチャに基づく責務分離:

1. **Presentation (Frontend)**: `app/(routes)/...` - UI & SWR
2. **Interface (API)**: `app/api/...` - Route Handlers, Validation, Auth
3. **Application (Service)**: `src/services/...` - Business Logic
4. **Domain/Infra**: `src/db/schema.ts`, `src/repositories/...` - Drizzle ORM

## 🛠️ セットアップ

### 1. 依存関係のインストール

```bash
pnpm install
```

### 2. 環境変数の設定

```bash
cp .env.example .env.local
```

`.env.local` を編集して、データベース接続情報を設定してください。

### 3. データベースのセットアップ

```bash
# スキーマをDBにプッシュ
pnpm db:push
```

### 4. 開発サーバーの起動

```bash
pnpm dev
```

[http://localhost:3000](http://localhost:3000) でアプリケーションにアクセスできます。


### 5. Claude Code / MCP Setup (Optional)

Claude Code を使用して開発する場合、MCPサーバーを設定することで Context7 や MySQL ツールを利用できます。
プロジェクトルートにある `.claude/mcp.json` の内容を Claude の設定ファイルに追加してください。

**Windows (PowerShell):**
```powershell
$configPath = "$env:APPDATA\Claude\claude_desktop_config.json"
# 手動で設定を追加するか、必要なツールを選択してインストールしてください
```

**推奨MCPサーバー:**
- `context7`: Next.js/Better-auth の最新ドキュメント参照
- `mysql`: データベースの操作
- `puppeteer`: Playwright テスト作成支援

## 📝 コマンド一覧


| コマンド | 説明 |
|----------|------|
| `pnpm dev` | 開発サーバー起動 (Turbopack) |
| `pnpm build` | プロダクションビルド |
| `pnpm start` | プロダクションサーバー起動 |
| `pnpm lint` | Biome によるコードチェック・自動修正 |
| `pnpm test` | Vitest によるユニットテスト |
| `pnpm test:ui` | Vitest UI でテスト実行 |
| `pnpm playwright` | Playwright による E2E テスト |
| `pnpm typecheck` | TypeScript 型チェック |
| `pnpm db:generate` | Drizzle マイグレーション生成 |
| `pnpm db:push` | スキーマを DB にプッシュ |

## 🧪 テスト

### ユニットテスト

```bash
pnpm test
```

### E2E テスト

```bash
# Playwright ブラウザをインストール
npx playwright install

# E2E テスト実行
pnpm playwright
```

## 📚 関連ドキュメント

- [設計ドキュメント (SPEC)](./docs/SPEC.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Biome Documentation](https://biomejs.dev)

## 📄 License

MIT
