# 設計ドキュメント (SPEC)

## 概要

このドキュメントは、機能の設計・仕様を記述するためのテンプレートです。

---

## 1. 要件

### 機能要件

- [ ] 要件1: ここに機能要件を記述
- [ ] 要件2: ここに機能要件を記述

### 非機能要件

- [ ] パフォーマンス: レスポンスタイム < 200ms
- [ ] セキュリティ: 認証・認可の要件
- [ ] 可用性: 99.9%

---

## 2. API設計

### エンドポイント一覧

| Method | Path | 説明 |
|--------|------|------|
| GET | `/api/resource` | リソース一覧取得 |
| POST | `/api/resource` | リソース作成 |
| GET | `/api/resource/:id` | リソース詳細取得 |
| PATCH | `/api/resource/:id` | リソース更新 |
| DELETE | `/api/resource/:id` | リソース削除 |

### リクエスト/レスポンス例

```json
// POST /api/resource - Request
{
  "name": "string",
  "description": "string"
}

// Response - 201 Created
{
  "id": 1,
  "name": "string",
  "description": "string",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

---

## 3. データベース設計

### テーブル定義

```sql
CREATE TABLE resource (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(1000),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### ER図

```
[User] 1 --- N [Resource]
```

---

## 4. 画面設計

### ページ構成

- `/` - ホーム
- `/resource` - リソース一覧
- `/resource/:id` - リソース詳細

### ワイヤーフレーム

（ここにワイヤーフレームを記載）

---

## 5. 承認

- [ ] 設計者: 
- [ ] レビュアー: 
- [ ] 承認日: 

---

> **Note**: このドキュメントはユーザーの承認を得てから実装を開始してください。
