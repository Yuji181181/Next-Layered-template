# Frontend Coding Guidelines

このプロジェクトにおけるフロントエンド実装のルールです。
AIはコードを生成する際、必ずこのドキュメントに従ってください。

## 1. Component Implementation (基本構造)

### コンポーネント定義
- **Function Declaration**: `React.FC` は使用せず、通常の関数コンポーネントとして定義してください。
- **Type Definition**: Propsの型定義は `interface` ではなく `type` を推奨し、コンポーネントの直上に記述してください。
- **Props Destructuring**: Propsは引数部分で分割代入（Destructuring）して受け取ってください。

### エクスポート設定
- **Named Export**: リファクタリングの容易性と一貫性のため、`export default` は使用せず、必ず `export const` (Named Export) を使用してください。

**実装例:**
```tsx
type UserCardProps = {
  name: string;
  age: number;
};

// 正しい書き方
export const UserCard = ({ name, age }: UserCardProps) => {
  return (
    <div className="border p-4">
      <p>{name} ({age})</p>
    </div>
  );
};
```

## 2. Next.js App Router Rules

### 'use client' の明記
- **Client Components**: 以下の機能を使用するファイルは、必ずファイルの**最上部（1行目）**に `'use client';` を記述してください。
    - React Hooks (`useState`, `useEffect`, `useCallback` など)
    - Data Fetching Hooks (`useSWR` など)
    - イベントリスナー (`onClick`, `onChange` など)
    - ブラウザ専用API (`window`, `document` など)
- **Server Components**: 上記の機能を使用しないコンポーネントは、デフォルトの Server Component のままとし、`'use client'` は記述しないでください。

## 3. Styling (Pure Tailwind CSS)

- **No UI Libraries**: `shadcn/ui`, `MUI`, `Chakra UI` などのコンポーネントライブラリは**使用しません**。
- **Pure Tailwind**: 標準のHTMLタグ（`div`, `button`, `input` 等）に対し、直接 Tailwind CSS のユーティリティクラスを適用してスタイリングを行ってください。
- **Components Location**:
    - 汎用パーツ（Button等）は `src/components/common` に配置してください。
    - 機能パーツ（Form等）は `src/components/domain` に配置してください。
