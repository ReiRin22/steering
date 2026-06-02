feature: "09_dept-instruction/DEP002-lab-instruction"
phase: implement
progress: "/review PASS（2026-05-12）。4回のサイクルを経て High 0件・Medium 0件。23テスト全通過。完了。"
last_updated: "2026-05-12"
completed_phases:
  - "Phase 0: スコープ確定・コンポーネント設計 ✅ 2026-05-12"
  - "Phase 1: 基盤整備 ✅ 2026-05-12"
  - "Phase 2: API・Repository 層 ✅ 2026-05-12"
  - "Phase 3: 状態管理 ✅ 2026-05-12"
  - "Phase 4: Hook 層 ✅ 2026-05-12"
  - "Phase 5: コンポーネント層 ✅ 2026-05-12"
  - "Phase 6: 機能実装 ✅ 2026-05-12"
  - "Phase 7: 仕上げ・アクセシビリティ ✅ 2026-05-12"
  - "Phase 8: Storybookセットアップ・story作成 ✅ 2026-05-12"
  - "Phase 9: Storybookテスト・Vitest ✅ 2026-05-12"
  - "Phase 10: E2Eテスト事前準備 + ドキュメント ✅ 2026-05-12"
compact_resume: |
  ## コンパクト後の再開情報
  完了済み: FE Phase 0〜10 全完了
  次のタスク: B1-1 BFF ディレクトリ・モジュール作成（deptInstruction.module.ts）
  FE テスト: 23テスト / 5ファイル — 全通過
  E2E 準備完了:
    - server-test.sh に DEP002 エントリ追加済み
    - DEP002-test.js 作成済み（02_lab-instruction/test/DEP002-test.js）
    - README.md 作成済み
  注意事項:
    - BFF URL: http://localhost:3001/api（MSW ハンドラに使用）
    - DEP001 既存実装は触らない
    - react-hooks/set-state-in-effect は eslint-disable ブロックで抑制
