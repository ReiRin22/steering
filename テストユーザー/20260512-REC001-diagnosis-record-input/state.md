feature: "フロントエンド/01_diagnosis/01_record-creation/REC001_診察記録入力"
phase: implement
progress: "Phase 9 完了（2026-05-13）。54テスト全通過。次は Phase 10 (T10-1: Next.jsルートパスの確認) から"
last_updated: "2026-05-13"
completed_phases:
  - "Phase 0: スコープ確定・コンポーネント設計（T0-1〜T0-6）"
  - "Phase 1: 基盤整備（T1-1〜T1-3）"
  - "Phase 2: API・Repository 層（T2-1〜T2-2）✅ 2026-05-12"
  - "Phase 3: 状態管理（T3-1）✅ 2026-05-12"
  - "Phase 4: Hook 層（T4-1a〜T4-1e）✅ 2026-05-12"
  - "Phase 5: コンポーネント層（T5-1〜T5-7）✅ 2026-05-12"
  - "Phase 6: 機能実装（T6-1〜T6-4）✅ 2026-05-12"
  - "Phase 7: バリデーション・エラーハンドリング（T7-1〜T7-4）✅ 2026-05-12"
  - "Phase 8: Storybook（T8-1〜T8-5）✅ 2026-05-12"
  - "Phase 9: Storybookテスト強化（T9-1〜T9-11）✅ 2026-05-13"
compact_resume: |
  ## コンパクト後の再開情報
  完了済み: Phase 0〜7
  次のタスク: Phase 8 T8-1 Storybookセットアップ確認

  ## Phase 7 で実装したファイル
  - shared/utils/bff-error.ts（BffApiError + classifyHttpError 新規作成）
  - types/recordInput.schema.ts（Zod: E001未来日・E002禁則文字）
  - api/*.api.ts（全11ファイルの throw を classifyHttpError に統一）
  - hooks/useRecordInputSubmit.ts（Zodバリデーション統合 + E401リダイレクト + toast.error）
  - hooks/useRecordInputInit.ts（初期表示失敗 → throw err、下書き失敗 → toast.error）
  - hooks/useRecordInputActions.ts（E401リダイレクト + toast.error）
  - hooks/useDraftActions.ts（E401リダイレクト + toast.error）
  - hooks/useMyCommentActions.ts（E401リダイレクト + toast.error）
  - components/molecules/RecordInputHeaderMolecule.tsx（validationErrors props + role="alert"）

  ## 注意事項
  - グローバル app/error.tsx が存在するため機能固有の error.tsx は不要
  - _scope_out/ の console.log は除外（スコープ外）
  - .gitkeep は hooks/ api/ repository/ stores/ の4か所から削除済み
</content>
</invoke>