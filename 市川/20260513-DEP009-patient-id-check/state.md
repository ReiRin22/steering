feature: "09_dept-instruction/DEP009-patient-id-check"
phase: implement
progress: "FE Phase 0〜10 完了（2026-05-13）。BFF B1〜B4・BE E1 が残タスク。"
last_updated: "2026-05-13"
completed_phases:
  - "Phase 0: スコープ確定・コンポーネント設計 ✅ 2026-05-13"
  - "Phase 1: 基盤整備 ✅ 2026-05-13"
  - "Phase 2: API・Repository 層 ✅ 2026-05-13"
  - "Phase 3: 状態管理（Zustand） ✅ 2026-05-13"
  - "Phase 4: Hook 層 ✅ 2026-05-13"
  - "Phase 5: コンポーネント層 ✅ 2026-05-13"
  - "Phase 6: 機能実装 ✅ 2026-05-13"
  - "Phase 7: バリデーション・エラーハンドリング ✅ 2026-05-13"
  - "Phase 8: Storybook ✅ 2026-05-13"
  - "Phase 9: Storybookテスト ✅ 2026-05-13"
  - "Phase 10: E2Eテスト事前準備 ✅ 2026-05-13（T10-5/T10-6 は実サーバー起動時に手動検証）"
compact_resume: |
  ## コンパクト後の再開情報
  完了済み: FE Phase 0〜10
  次のタスク: BFF B1-1（types/定義）または BE E1-1（C# record）
  主要実装ファイル:
    FE:
      - 09_patient-id-check/api/{5エンドポイント}.ts
      - 09_patient-id-check/repository/usePatientIdCheck.ts
      - 09_patient-id-check/stores/usePatientIdCheckStore.ts
      - 09_patient-id-check/hooks/{6フック}.ts
      - 09_patient-id-check/components/molecules/{7コンポーネント}.tsx
      - 09_patient-id-check/components/molecules/{7コンポーネント}.stories.tsx
      - _shared/components/organisms/PatientIdCheckOrganism.tsx
      - _shared/components/organisms/PatientIdCheckOrganism.stories.tsx
      - 09_patient-id-check/DEP009.tsx（Page層）
      - 09_patient-id-check/test/{8テストファイル}.test.tsx
      - 09_patient-id-check/test/DEP009-test.js（E2E）
    Shared:
      - front_bff_shared/features/dept-instruction/patient-id-check/types/{request/response}.ts
      - front_bff_shared/features/dept-instruction/patient-id-check/schemas/patientIdCheck.schema.ts
    CI:
      - .claude/scripts/server-test.sh（DEP009 case 追加済み）
  注意事項:
    - E2E（T10-5）とStorybookテスト確認（T10-6）は実サーバー起動時に手動実施が必要
    - BFF Controller に X-Tenant-Id / X-Correlation-Id / Authorization の @Headers() 必須
    - BE PatientIdCheckMockController.cs は未実装
    - TODO: checkedBy を staffId に置き換え（現在 userName 流用 in usePatientIdCheckSubmit.ts）
    - store.applyBarcodeRead は順序割り当て（patient → item → practitioner）
