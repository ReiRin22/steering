feature: "フロントエンド/16_ui-common/01_menu-header/01_login/ETC001_ログイン"
phase: implement
progress: "Phase 10 完了（2026-05-13）。stories/ 移動・server-test.sh 登録・ETC001-test.js（T10-3v 動画設定+シナリオ11追加）・依存グラフ生成 全チェック PASS。次は /review または INDEX.md を done に更新。"
last_updated: "2026-05-13"
completed_phases:
  - "Phase 0-1: 基盤整備（型定義・ViewModel）✅ 実装済み（設計書なし・逆引き確認済み）"
  - "Phase 2: API・Repository 層（auth.api.ts・BFF auth.*）✅ 実装済み"
  - "Phase 3: 状態管理（use-auth.store.ts + persist）✅ 実装済み"
  - "Phase 4: Hook 層（use-login.ts）✅ 実装済み"
  - "Phase 5: コンポーネント層（LoginOrganism・3Dialog・NotificationPanel・ETC001.tsx）✅ 実装済み"
  - "Phase 6-7: 機能実装・バリデーション（エラーハンドリング・フォームバリデーション）✅ 実装済み"
  - "Phase 8: Storybook（全5コンポーネント story あり）✅ 実装済み"
  - "Phase 9: Storybook テスト（496行・9ファイル）✅ 実装済み"
  - "Phase 10: E2E テスト（ETC001-test.js 294行・10シナリオ）✅ 実装済み"
compact_resume: |
  ## 概要
  ETC001ログイン機能。設計書なしで全Phase実装済み。
  実装コードからの逆引きによる状態把握。

  ## 実装ファイル一覧

  ### Frontend
  - `product/frontend/src/features/16_ui-common/01_menu-header/01_login/`
    - ETC001.tsx（Page・6行）
    - api/auth.api.ts（BFF POST /auth/login）
    - hooks/use-login.ts（handleLogin・cancelledRef・エラーハンドリング）
    - components/organisms/LoginOrganism.tsx（202行・フォーム＋ICカードステップ）
    - components/organisms/PasswordResetDialog.tsx
    - components/organisms/PasswordExpiredDialog.tsx
    - components/organisms/AdminRequestDialog.tsx（180行・管理者依頼）
    - components/molecules/NotificationPanel.tsx（127行・システム通知）
    - test/ETC001-test.js（294行・E2E・10シナリオ）
    - test/*.test.tsx（Vitest・496行・9ファイル）
    - components/organisms/*.stories.tsx（Storybook・5ファイル）

  ### BFF
  - `product/bff/src/features/auth/`
    - auth.controllers.ts（POST /auth/login）
    - auth.services.ts（UpstreamLoginResponse → LoginResponse 変換）
    - auth.clients.ts（Upstream API呼び出し）
    - auth.module.ts
    - auth.controllers.spec.ts（56行・BFFテスト）

  ### Shared
  - `product/front_bff_shared/types/request/auth.request.type.ts`（LoginRequest）
  - `product/front_bff_shared/types/response/auth.response.type.ts`（LoginResponse・LoginErrorResponse）
  - `product/frontend/src/shared/stores/use-auth.store.ts`（Zustand + persist）

  ## スコープ外（未実装・仕様待ち）
  - パスワード期限切れエラーコード（仕様未定）
  - パスワード再設定依頼API（バックエンド未実装）
  - ICカード実読み取り（カードリーダーSDK連携待ち）

  ## 注意事項
  - 設計書（PRD・設計書）は存在しない。テストは実装コードベースで作成済み
  - use-auth.store.ts は shared/stores/ に配置（ETC004メニュー等が参照）
  - storeRegistry に登録済み（ログアウト時の一括クリア対応）
