# REC002 シェーマ作成機能 - 実装方針

## アーキテクチャ

```
REC002.tsx（最小ラッパー）
  └── SchemaCreationOrganism.tsx  ← 'use client' / hooks呼び出し集約
        ├── DrawingCanvas.tsx（Organism）← Canvas描画ロジック / undoStack管理
        ├── molecules/
        │   ├── ColorPickerPanel.tsx     ← 既存流用
        │   ├── ToolboxPanel.tsx         ← 新規: ツール選択・線幅・反転・画像取込
        │   └── TemplateSelectorPanel.tsx ← 新規: 部位選択・テンプレートグリッド・お気に入り
        └── ダイアログ群（共通 Dialog コンポーネント使用）
```

## 状態管理（Phase 3: Zustand）

```typescript
// LV3/stores/schema-creation.store.ts
{
  activeTool: DrawTool           // 'pen' | 'rectangle' | 'circle' | 'text' | 'spray' | 'eraser'
  strokeColor: string            // '#000000'
  penSize: number                // 2
  undoStack: DrawOperation[]     // 最大50件
  redoStack: DrawOperation[]     // 最大50件
  hasDrawContent: boolean        // undoStack判定
  selectedBodyPart: string       // '全身図'
  isSubmitting: boolean          // false
  favoriteTemplateIds: string[]  // []
  dialogType: SchemaCreationDialogType | null  // ダイアログ制御
  templates: TemplateItem[]      // APIから取得
  error: SchemaCreationError | null
}
```

## API 層（Phase 2）

```
LV3/api/
  get-templates.api.ts    → GET /bff/templates?category={category}
  post-schema.api.ts      → POST /bff/schemas
  put-favorite.api.ts     → PUT /bff/templates/{templateId}/favorite
```

## Repository 層（Phase 2）

```
LV3/repository/
  schema-creation.repository.ts
    initializeSchemaCreation()  → 並列: getTemplates('全身図') ※お気に入りは PUT で管理
    saveSchema(imageData)       → postSchema
```

## Hook 層（Phase 4）

```
LV3/hooks/
  useSchemaCreationInit.ts     → EVT_INIT01: テンプレート取得・ストアセット
  useSchemaCreationActions.ts  → UI操作ハンドラー群（ツール・色・線幅・部位変更・テンプレート・お気に入り）
  useSchemaCreationSubmit.ts   → EVT_CONFIRM/EVT_CANCEL: 保存・キャンセル処理
```

## DrawingCanvas の改修方針

- `window global` 汚染を廃止 → `useImperativeHandle` + `ref` に変更
- `DrawingState` の ImageData ベース → `DrawOperation` 型（設計書準拠）に統一
- キャンバスサイズを 400×400 → 600×600 に修正
- `hasDrawContent` の判定を store に委譲

## コールバック変更

現状: `onSave(imageData: string)`
変更後: `onConfirm(schemaUuid: string, base64Image: string)` / `onCancel()`
