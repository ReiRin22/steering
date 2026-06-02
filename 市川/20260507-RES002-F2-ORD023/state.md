---
feature: "RES002/F2_ORD023_検体検査オーダー"
phase: done
progress: "/review PASS（2026-05-11）。Medium/Low 全修正完了。BFF 34件・FE 52件 全PASS。ORD023 完了。"
last_updated: "2026-05-11"
completed_phases:
  - "Step 1-5: Shared型・BE Models・BE Controller・BFF upstream型・BFF re-export型 ✅"
  - "Step 6: BFF Client（axiosClient本実装） ✅"
  - "Step 7: BFF Service ✅"
  - "Step 8: BFF Controller ✅"
  - "Step 9: BFF Module + app.module.ts ✅"
  - "Step 10: MSW handlers（3エンドポイント・型ガード対応） ✅"
  - "Step 11-14: FE types/hooks/stores/api ✅"
  - "Step 15-16: FE Molecules（5件）/Organisms（3件） ✅"
  - "Step 17: SpecimenOrderEntryFeature.tsx ✅"
  - "Step 18-22: 既存ファイル修正7箇所（MOD-1〜MOD-7） ✅"
  - "Step 23-24: BFF/FE tests（26 + 16 = 42件） ✅"
  - "Step 25: Storybook story（4 Stories） ✅"
  - "Step 26-28: typecheck + BFF/FE test実行 PASS ✅"
  - "/review FAIL修正: H-1〜H-4 解消 ✅"
  - "再レビュー全指摘修正: High 1件 + Medium 4件 + Low 3件 解消 ✅"
compact_resume: |
  ## /review PASS（2026-05-11）— ORD023 完了

  BFF 34件・FE 52件 全PASS。

  最終 Medium/Low 修正内容（2026-05-11）:
  - getSpecimenItems サービステスト追加（BFF services.test.ts）
  - HistoryList/SetsList accessibility対応（role="button"・tabIndex・onKeyDown）
  - HistoryList テスト補強（C2 toHaveBeenCalledWith・C3 エラー表示）
  - removeGroup TODO コメント追加
  - テスト名修正（5.4系）
  - index.ts barrel export 追加
