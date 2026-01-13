# Development Workflow

開発を開始する際の標準ワークフローです。
このフローに従って開発を進めてください。

## Phase 1: Planning (Design First)
* まず、コマンド `/spec` を実行して設計を行ってください。

## Phase 2: Implementation & Testing (TDD)
1.  **テスト作成**: 要件・設計が決まったら、**実装の前にまずテストコードを作成**してください。
2.  **実装**: 作成したテストを通すためのコードを実装してください。
    - フロントエンドは `frontend-guidelines`、バックエンドは `backend-guidelines` スキルを参照すること。
3.  **検証**: テストを実行し、結果を確認してください。
    - **Unit/Integration**: `pnpm test`
    - **E2E**: `pnpm playwright test`
4.  **修正**: テストが成功するまで、実装の修正と再テストを繰り返してください。

## Phase 3: Local Review Loop & Commit
1.  **レビュー実行**: CodeRabbit CLI等を使用し、変更差分のレビューを取得する。
    - *Tip: `review-judgment` スキルを参照して妥当性を検証する。*
2.  **妥当性検証**: 指摘を評価・修正し、再度テストを通す。
3.  **コミット**:
    - `git commit` を実行する。
    - **重要**: `.claude/settings.json` の設定により、自動的に `Biome` と `Typecheck` が走ります。エラーが出た場合は修正してください。

## Phase 4: PR & Remote Review Loop
* ローカルでの品質が保証されたら、コマンド `/pr-create` を実行してください。

## Phase 5: Final Handover
1.  全ての自動レビュー工程を終え、テストが通っている状態でユーザーに報告する。
2.  ユーザーの最終確認とマージを待つ。