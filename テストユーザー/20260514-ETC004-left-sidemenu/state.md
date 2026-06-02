feature: "16_ui-common/01_menu-header/01_left-sidemenu/ETC004_left-sidemenu"
phase: implement
progress: "Phase 9 完了（全46テスト PASS）。次は Phase 10 (E2Eテスト・依存グラフ) から"
last_updated: "2026-05-14"
completed_phases:
  - "Phase 0: スコープ確定・コンポーネント設計 ✅ 2026-05-14"
  - "Phase 1: 基盤整備 ✅ 2026-05-14"
  - "Phase 2: API・Repository 層 ✅ 2026-05-14"
  - "Phase 3: 状態管理 ✅ 2026-05-14"
  - "Phase 4: Hook 層 ✅ 2026-05-14"
  - "Phase 5: コンポーネント層 ✅ 2026-05-14"
  - "Phase 6: 機能実装 ✅ 2026-05-14"
  - "Phase 7: バリデーション・エラーハンドリング ✅ 2026-05-14"
  - "Phase 8: Storybook セットアップ・story作成 ✅ 2026-05-14"
  - "Phase 9: Storybook テスト強化（MSW・Vitest 全46テスト PASS） ✅ 2026-05-14"
compact_resume: |
  ## コンパクト後の再開情報
  完了済み: Phase 0〜8（FE）
  次のタスク: T9-1 API通信が必要なstoryファイルの特定（api/ → repository/ → hooks/ → components の逆トレース）
  実装済みファイル（主要なもの）:
    - features/16_ui-common/01_menu-header/01_left-sidemenu/types/order.types.ts
    - features/16_ui-common/01_menu-header/01_left-sidemenu/types/orderEntry.schema.ts
    - features/16_ui-common/01_menu-header/01_left-sidemenu/api/getOrderHistory.api.ts
    - features/16_ui-common/01_menu-header/01_left-sidemenu/api/getOrderSets.api.ts
    - features/16_ui-common/01_menu-header/01_left-sidemenu/api/searchDrugs.api.ts
    - features/16_ui-common/01_menu-header/01_left-sidemenu/api/postOrder.api.ts
    - features/16_ui-common/01_menu-header/01_left-sidemenu/repository/order.repository.ts
    - features/16_ui-common/01_menu-header/01_left-sidemenu/stores/use-order-entry.store.ts
    - features/16_ui-common/01_menu-header/01_left-sidemenu/hooks/useOrderEntryInit.ts
    - features/16_ui-common/01_menu-header/01_left-sidemenu/hooks/useOrderEntryActions.ts
    - features/16_ui-common/01_menu-header/01_left-sidemenu/hooks/useOrderEntrySubmit.ts
    - features/16_ui-common/01_menu-header/01_left-sidemenu/components/organisms/OrderEntryOrganism.tsx
    - shared/utils/bff-error.ts
    - front_bff_shared/features/orders/orderEntry/types/orderEntry.types.ts
    - front_bff_shared/features/orders/orderEntry/schemas/orderEntry.schema.ts
  注意事項:
    - design_detail なし（ETC004 は docs/01_アプリ配下に md ファイルなし）
    - API 設計は ETC004.tsx の既存実装から逆引き
    - useOrderEntryInit: ダミー患者データ使用（認証ストア未接続）
    - useOrderEntrySubmit: patientId を引数で受け取る設計
    - bff-error.ts は E504（タイムアウト）も追加済み（スキルのサンプルより拡張）
    - T6-4 shared 昇格候補（DrugDetailDialog/AppointmentCalendar/ChartPanel）は次の大規模リファクタリング時に実施予定
</content>
</invoke>