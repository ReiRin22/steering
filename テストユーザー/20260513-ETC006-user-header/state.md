# ETC006 ユーザーヘッダー - 状態管理

```yaml
feature: "16_ui-common/01_menu-header/01_user-header ETC006"
phase: implement
progress: "Phase 9 完了。次は Phase 10 (T10-0: ETC006.tsx → index.tsx リネームから)"
last_updated: "2026-05-14"
completed_phases:
  - "Phase 0: スコープ確定・コンポーネント設計 ✅ 2026-05-13"
  - "Phase 1: 基盤整備 ✅ 2026-05-14"
  - "Phase 2: API・Repository 層 ✅ 2026-05-14"
  - "Phase 3: 状態管理 ✅ 2026-05-14"
  - "Phase 4: Hook 層 ✅ 2026-05-14"
  - "Phase 5: コンポーネント層 ✅ 2026-05-14（セッション開始時点で実装済み）"
  - "Phase 6: 機能実装 ✅ 2026-05-14"
  - "Phase 7: バリデーション・エラーハンドリング ✅ 2026-05-14"
  - "Phase 8: Storybookセットアップ・story作成 ✅ 2026-05-14"
  - "Phase 9: Storybookテスト強化 ✅ 2026-05-14"
compact_resume: |
  ## コンパクト後の再開情報
  完了済み: Phase 0〜7
  次のタスク: Phase 8（Storybook セットアップ確認・molecules/organisms story 作成）

  Phase 6 で実施した変更:
    - useGlobalHeaderActions: ハンドラー型を () → void から (value: boolean) → void に統一
    - useGlobalHeaderSubmit: handleDismissAlert に楽観的更新（先行 setUserAlerts）+ ロールバック実装
    - MenuSettingsDialogMolecule: 「システム設定」タブ追加（4タブ構成）・SettingsPanel 組み込み
    - SettingsPanel: "use client" 追加・未使用 import 削除・onAutoSave タイマーに useRef パターン適用
    - GlobalHeaderOrganism: MenuSettingsDialogMolecule に全設定系 Props を接続
    - GlobalHeader: ハードコードデータに TODO コメント追記
    - index.ts: GlobalHeaderOrganism の export を追加

  実装済みファイル（主要なもの）:
    - stores/use-global-header.store.ts（currentUser/userAlerts/isLoading + 設定state 全部入り）
    - repository/globalHeader.repository.ts（fetchGlobalHeaderData / dismissAlert）
    - api/getCurrentUser.api.ts: GET /current-user
    - api/dismissUserAlert.api.ts: PATCH /user-alerts/{alertId}/dismiss
    - hooks/useGlobalHeaderInit.ts: 初期化（getCurrentUser → store）
    - hooks/useGlobalHeaderActions.ts: 操作（darkMode/theme/autoSave/alerts/autoLogout）
    - hooks/useGlobalHeaderSubmit.ts: 送信（dismissAlert API）
    - ETC006.tsx: Phase 4 フックに接続済み（useState → ストア経由に移行）

  注意事項:
    - 設計書なし。ETC006.tsx の useState から逆引き実装
    - BFF 取得前は assets/medical-data の fallbackUser を使用
    - PatientHeaderOrganism は props なしで独立動作（ETC003 側でデータ管理）
    - useAutoLogout は @shared/hooks/useAutoLogout を使用
    - usePatientData / useAppEventHandlers は患者操作用として残存（ETC006 スコープ内）
```

## Phase 進捗

| Phase | 名前 | 状態 |
|-------|------|------|
| Phase 0 | スコープ確定・コンポーネント設計 | ✅ completed 2026-05-13 |
| Phase 1 | 基盤整備 | ✅ completed 2026-05-14 |
| Phase 2 | API・Repository 層 | ✅ completed 2026-05-14 |
| Phase 3 | 状態管理 | ✅ completed 2026-05-14 |
| Phase 4 | Hook 層 | ✅ completed 2026-05-14 |
| Phase 5 | コンポーネント層 | ✅ completed 2026-05-14 |
| Phase 6 | 機能実装 | ✅ completed 2026-05-14 |
| Phase 7 | バリデーション・エラー | ✅ completed 2026-05-14 |
| Phase 8 | Storybook | ✅ completed 2026-05-14 |
| Phase 9 | Storybook テスト | ✅ completed 2026-05-14 |
| Phase 10 | E2E テスト・依存グラフ | not_started |
