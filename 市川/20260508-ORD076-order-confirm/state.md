feature: "05_order/19_nursing-care-order/03_order-confirm/ORD076_オーダー確定"
phase: done
progress: "/review PASS（2026-05-12）。FE/BFF/BE整合性レビュー（snake_case修正・テスト型修正・BEヘッダー追加・FEエラー通知追加）。BFF 62件全PASS。完了確定。"
last_updated: "2026-05-12"
completed_phases:
  - "Phase 0: スコープ確定・コンポーネント設計 ✅ 2026-05-11"
  - "Phase 1: 基盤整備 ✅ 2026-05-11"
  - "Phase 2: API・Repository 層 ✅ 2026-05-11"
  - "Phase 3: 状態管理 ✅ 2026-05-11"
  - "Phase 4: Hook 層 ✅ 2026-05-11"
  - "Phase 5: コンポーネント層 ✅ 2026-05-11"
  - "Phase 6: 機能実装 ✅ 2026-05-11"
  - "Phase 7: バリデーション・エラーハンドリング ✅ 2026-05-11"
  - "Phase 8: Storybookセットアップ・story作成 ✅ 2026-05-11"
  - "Phase 9: Storybookテスト強化 MSW・Vitest ✅ 2026-05-11"
  - "Phase 10: E2Eテスト事前準備 + テスト・ドキュメント ✅ 2026-05-11"
  - "B1: 型定義・モジュール構成 ✅ 2026-05-11"
  - "B2: Client 層（axios 実装） ✅ 2026-05-11"
  - "B3: Service 層（Client 呼び出し・ViewModel マッピング） ✅ 2026-05-11"
  - "B4: Controller 層（全ヘッダー宣言・orderIds 配列正規化） ✅ 2026-05-11"
  - "B5: テスト（services 28件・controllers 28件 計56件 PASS） ✅ 2026-05-11"
  - "/review PASS: ヘッダー伝達修正・unsafe cast 除去・テスト 1assertion/test 化 ✅ 2026-05-11"
  - "E1: BE Controller モック実装（7エンドポイント・全ヘッダー宣言） ✅ 2026-05-11"
compact_resume: |
  ## コンパクト後の再開情報
  完了済み: Phase 0〜10（FE全フェーズ完了）、B1〜B5（BFF 全フェーズ完了）
  次のタスク: /review で実装レビューを実施
  実装済みファイル（BFF）:
    - bff/src/features/order-confirmation/types/order-confirmation.api.request.ts
    - bff/src/features/order-confirmation/types/order-confirmation.api.response.ts
    - bff/src/features/order-confirmation/types/order-confirmation.type.ts
    - bff/src/features/order-confirmation/order-confirmation.clients.ts
    - bff/src/features/order-confirmation/order-confirmation.services.ts
    - bff/src/features/order-confirmation/order-confirmation.controllers.ts
    - bff/src/features/order-confirmation/order-confirmation.module.ts
    - bff/src/features/order-confirmation/order-confirmation.services.test.ts
    - bff/src/features/order-confirmation/order-confirmation.controllers.test.ts
  実装済みフック:
    - hooks/useOrderConfirmInit.ts（初期化・並列取得）
    - hooks/useOrderConfirmActions.ts（ダイアログ開閉・ナビゲーション。isSubstituteUser を引数で受け取る）
    - hooks/useOrderConfirmSubmit.ts（確定・削除・取り消し・帳票出力）
  コンポーネント構成（設計書より）:
    molecules: PendingOrderRow / ConfirmedOrderRow / PrintDialog / OrderTypeSelectDialog / EditConfirmDialog / RevokeConfirmDialog / ReprintConfirmDialog
    organisms: OrderConfirmPanel
  設計書: docs/01_アプリ/フロントエンド/05_order/19_nursing-care-order/03_order-confirm/design_detail-ORD076_オーダー確定.md
  実装対象: product/frontend/src/features/05_order/19_nursing-care-order/03_order-confirm/
  app page: product/frontend/src/app/order/nursing-care-order/order-confirm/ORD076/page.tsx（現状: return null）
  実装済みファイル（主要）:
    - front_bff_shared/features/orders/orderConfirmed/orderConfirmation/types/request/orderConfirmation.api.request.ts
    - front_bff_shared/features/orders/orderConfirmed/orderConfirmation/types/response/orderConfirmation.api.response.ts
    - features/.../03_order-confirm/types/order-confirm.types.ts
    - features/.../03_order-confirm/api/（7ファイル: getOrders, confirmOrders, deleteOrder, revokeOrder, getForms, outputForms, getOrderTypes）
    - features/.../03_order-confirm/repository/orderConfirm.repository.ts
  注意事項:
    - axiosClient パターン（fetch/NEXT_PUBLIC_BFF_BASE_URL ではなく axiosClient を使用）
    - 設計書は PDF/Excel から直接生成（正式 /design フロー省略）
