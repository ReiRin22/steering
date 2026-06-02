---
feature: "フロントエンド/01_diagnosis/06_patient-list/REC020_受診者一覧"
phase: implement
progress: "Phase 8 確認中。stories/フォルダ未作成・package.json/ci.env 未登録を確認済み。T8-1〜T8-5 から再確認する"
last_updated: "2026-05-14"
completed_phases:
  - "Phase 0〜7: 元実装済み（2026-05-08以前）"
  - "Phase 8（部分）: stories.tsx は components/molecules|organisms/ 直下に存在するが stories/ 分離未実施"
compact_resume: |
  ## コンパクト後の再開情報
  完了済み: Phase 0〜7（元実装済み）
  次のタスク: T8-4 story title 確認（規定形式チェック）→ T10-1 stories/フォルダ移動
  実装済みファイル（主要なもの）:
    - src/features/01_diagnosis/06_patient-list/01_patient-list/REC020.tsx
    - src/features/01_diagnosis/06_patient-list/01_patient-list/api/getReceptionPatients.api.ts
    - src/features/01_diagnosis/06_patient-list/01_patient-list/components/molecules/FilterBar.tsx
    - src/features/01_diagnosis/06_patient-list/01_patient-list/components/molecules/PatientList.tsx
    - src/features/01_diagnosis/06_patient-list/01_patient-list/components/organisms/ReceptionPatientListOrganism.tsx
    - src/features/01_diagnosis/06_patient-list/01_patient-list/hooks/useReceptionPatients.ts
    - src/features/01_diagnosis/06_patient-list/01_patient-list/types/receptionPatientList.types.ts
    - src/features/01_diagnosis/06_patient-list/01_patient-list/test/{*.test.tsx, REC020-test.js}
  注意事項:
    - stories/ フォルダ分離未実施（T10-1 相当が残タスク）
    - package.json に test:REC020 / test:e2e:REC020 スクリプトなし（T9-11 相当が残タスク）
    - ci.env の VITEST_SCRIPT / E2E_SCRIPT に REC020 未登録（T9-11 相当が残タスク）
    - server-test.sh には REC020 登録済み
    - vitest coverage config は vitest.coverage-rec020-ord023.config.ts として存在（REC020+ORD023 共有）
