feature: "diagnosis/01_record-creation/REC002_シェーマ作成"
phase: implement
progress: "Phase 9 完了。次は Phase 10（T10-1: Next.jsルートパス確認）から"
last_updated: "2026-05-12"
completed_phases:
  - "Phase 2: API・Repository 層 ✅ 2026-05-11"
  - "Phase 3: 状態管理 ✅ 2026-05-11"
  - "Phase 4: Hook 層 ✅ 2026-05-11"
  - "Phase 5: コンポーネント層 ✅ 2026-05-11"
  - "Phase 8: Storybookセットアップ・story作成 ✅ 2026-05-12"
  - "Phase 9: Storybookテスト強化（MSW・Vitest）✅ 2026-05-12"
compact_resume: |
  ## 再開情報
  完了済み: Phase 2〜5, Phase 8, Phase 9
  次のタスク: T10-1 Next.jsルートパス確認
  設計書パス: docs/01_アプリ/フロントエンド/01_diagnosis/01_record-creation/design_detail-REC002_シェーマ作成.md
  実装パス: product/frontend/src/features/01_diagnosis/01_record-creation/01_schema-creation/
  実装済みファイル（Phase 5）:
    - components/organisms/DrawingCanvas.tsx（forwardRef + useImperativeHandle で window global を廃止）
    - components/organisms/SchemaCreationOrganism.tsx（hooks統合・store reset cleanup・molecules組み合わせ）
    - components/molecules/ToolbarPanel.tsx
    - components/molecules/DrawingToolPanel.tsx
    - components/molecules/ColorPickerPanel.tsx（既存）
    - components/molecules/TemplateSelectorPanel.tsx
    - components/molecules/FooterActionBar.tsx
    - assets/templates.ts（import パス修正: ../components/MedicalTemplates → ./MedicalTemplates）
  注意事項:
    - components/DrawingCanvas.tsx・ColorPicker.tsx・MedicalTemplates.tsx は旧ファイルとして残存（削除はPhase完了後に確認）
    - DrawingCanvas は forwardRef + DrawingCanvasHandle 型で undo/redo/clear/flipHorizontal/save を公開
    - SchemaCreationOrganism の useEffect cleanup で useSchemaCreationStore.getState().reset() を実装済み
    - onConfirm(schemaUuid, base64Image) シグネチャに統一済み
    - ConfirmDialog・ErrorDialog は Phase 7 でダイアログ実装時に追加予定（設計書のダイアログ定義をそのとき参照）
