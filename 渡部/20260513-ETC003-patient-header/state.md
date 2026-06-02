feature: "フロントエンド/16_ui-common/01_menu-header/01_patient-header/ETC003_患者情報ヘッダ表示"
phase: implement
progress: "Phase 9 完了。次は Phase 10 (T10-0: ETC003.tsx → index.tsx リネーム) から"
last_updated: "2026-05-13"
completed_phases:
  - "Phase 0: スコープ確定・コンポーネント設計 ✅ 2026-05-13"
  - "Phase 1: 基盤整備 ✅ 2026-05-13"
  - "Phase 2: API・Repository 層 ✅ 2026-05-13"
  - "Phase 3: 状態管理 ✅ 2026-05-13"
  - "Phase 4: Hook 層 ✅ 2026-05-13"
  - "Phase 5: コンポーネント層 ✅ 2026-05-13"
  - "Phase 6: 機能実装 ✅ 2026-05-13"
  - "Phase 8: Storybookセットアップ・story作成 ✅ 2026-05-13"
  - "Phase 9: Storybookテスト強化 MSW・Vitest ✅ 2026-05-13"
compact_resume: |
  ## 概要
  ETC003 患者情報ヘッダ表示。Phase 0〜6 + Phase 8 + Phase 9 完了。Phase 7（バリデーション）は未実施。

  ## 完了済み: Phase 0〜6 + Phase 8 + Phase 9

  ### Phase 9（完了）
  - T9-1: MSW対象: PatientHeaderOrganism / MSW不要: molecules 9本 + dialogs 10本 特定
  - T9-2: PatientHeaderOrganism.stories.tsx に commonHandlers / newPatientHandlers / errorHandlers named export 追加
  - T9-3: test/PatientHeaderOrganism.test.tsx 作成（setupServer + composeStories + AAA・6テスト）
  - T9-4: molecules 9本・organisms 11本の全 stories を fn() に変換
  - T9-5〜T9-7: PatientHeaderOrganism AAA テスト実装・独立化・handlers 整合確認
  - T9-8: vitest.config.ts: jsdom/setupFiles/coverage（C0=80/C1=70/C2=80）設定済み
  - T9-9: molecules 9本のテストファイル作成（C0/C1/C2 カバー）
  - T9-10: coverage thresholds + reporter=['text','json','html','lcov'] 設定済み
  - T9-11: ci.env VITEST_SCRIPT=test:ETC003 / package.json test:ETC003 スクリプト追加
  - 全テスト: 10ファイル 69テスト PASS

  ## 次のタスク: T10-0 ETC003.tsx → index.tsx リネーム

  ## 実装済みファイル（主要）
  product/frontend/src/features/16_ui-common/01_menu-header/01_patient-header/
    - test/PatientHeaderOrganism.test.tsx（MSW + composeStories）
    - test/ConsultationStatusMolecule.test.tsx
    - test/MedicalInfoSharingBadge.test.tsx
    - test/NewPatientBadge.test.tsx
    - test/PatientAlertsMolecule.test.tsx
    - test/PatientAvatarMolecule.test.tsx
    - test/PatientInfoGridMolecule.test.tsx
    - test/PatientStatusBarMolecule.test.tsx
    - test/PrescriptionStatusBadge.test.tsx
    - test/PrivacyModePanelMolecule.test.tsx
    - components/organisms/PatientHeaderOrganism.stories.tsx（commonHandlers/newPatientHandlers/errorHandlers）
    - components/molecules/*.stories.tsx（fn() 追加済み・9本）
    - components/organisms/*.stories.tsx（fn() 追加済み・11本）

  ## 注意事項
  - Phase 7（バリデーション・エラーハンドリング）は未実施（ユーザー指示によりスキップ）
  - @storybook/experimental-addon-test は --legacy-peer-deps で install（vitest@4.x との peer conflict）
  - MSW handlers は絶対URL: http://localhost:3001/api/...
  - onUnhandledRequest: 'warn'（'error'ではなく warn にしている）
