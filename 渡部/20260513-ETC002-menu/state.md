feature: "ui-common/ETC002_menu"
phase: implement
progress: "Phase 8 完了（PASS）。次は Phase 9 (T9-1: API通信ありstory特定) から"
last_updated: "2026-05-13"
completed_phases:
  - "Phase 0: スコープ確定・コンポーネント設計 ✅ 2026-05-13"
  - "Phase 1: 基盤整備 ✅ 2026-05-13"
  - "Phase 2: API・Repository 層 ✅ 2026-05-13"
  - "Phase 3: 状態管理 ✅ 2026-05-13（Zustand ストア不要と判断・全状態が useState で完結）"
  - "Phase 4: Hook 層 ✅ 2026-05-13"
  - "Phase 5: コンポーネント層 ✅ 2026-05-13（13 molecule 抽出・TypeScript 0エラー）"
  - "Phase 6: 機能実装 ✅ 2026-05-13（12イベント全実装・楽観的更新N/A・TypeScript 0エラー）"
  - "Phase 7: バリデーション・エラーハンドリング ✅ 2026-05-13（BffApiError統一・stores/.gitkeep削除・TSエラー0件）"
  - "Phase 8: Storybookセットアップ・story作成 ✅ 2026-05-13（molecules 18stories・organisms 6stories・全title修正・phase9メモ作成）"
compact_resume: |
  ## コンパクト後の再開情報
  完了済み: Phase 0〜5
  次のタスク: T6-1 お気に入り・設定保存の実装確認
  実装済みファイル（主要なもの）:
    - types/theme.type.ts, notification.type.ts, menu-item.type.ts, internal-mail.type.ts
    - api/getMenuItems.api.ts
    - hooks/useMenuItems.ts, useMenuActions.ts, useNotificationActions.ts
    - organisms/MenuOrganism.tsx（テーマ・通知・レイアウト統合）
    - organisms/MenuSection.tsx（メニュー + 設定ダイアログ）
    - organisms/InternalMail.tsx（院内メール）
    - molecules/MailFilterBar, MailTable, MailPreview, ComposeMail（InternalMail 分解）
    - molecules/FavoriteMenus, MenuItemList, ThemeColorTab, MenuVisibilityTab, FavoritesTab, PasswordTab（MenuSection 分解）
    - molecules/DoctorBadges, NotificationItem, NotificationDialog（MenuOrganism 分解）
  注意事項:
    - Zustand ストアなし。全状態は MenuOrganism/InternalMail の useState で管理。
    - FavoriteMenus/MenuItemList は useRouter 使用（Next.js FW フック・許容）。
    - 送信フック不要（API保存なし・設定はローカル状態のみ）。
