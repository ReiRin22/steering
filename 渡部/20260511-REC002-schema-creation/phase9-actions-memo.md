# Phase 9 args / actions メモ

## hooks/ 操作イベント一覧

| フック名 | 操作関数 | 引数型 | 対応コンポーネント |
|---|---|---|---|
| useSchemaCreationActions | handleToolSelect | (tool: DrawTool) => void | DrawingToolPanel |
| useSchemaCreationActions | handleColorChange | (color: string) => void | DrawingToolPanel / ColorPickerPanel |
| useSchemaCreationActions | handleWidthChange | (size: number) => void | DrawingToolPanel |
| useSchemaCreationActions | handleChangePart | (category: string) => Promise<TemplatesResponse> | TemplateSelectorPanel |
| useSchemaCreationActions | handleFavoriteToggle | (templateId: string) => Promise<void> | TemplateSelectorPanel |
| useSchemaCreationActions | handleDraw | (op: DrawOperation) => void | DrawingCanvas |
| useSchemaCreationActions | handleFlip | (op: DrawOperation) => void | ToolbarPanel |
| useSchemaCreationActions | handleUndo | () => DrawOperation \| undefined | ToolbarPanel |
| useSchemaCreationActions | handleRedo | () => DrawOperation \| undefined | ToolbarPanel |
| useSchemaCreationActions | handleClear | (op: DrawOperation) => void | ToolbarPanel |
| useSchemaCreationSubmit | handleConfirm | (imageData: string) => Promise<void> | SchemaCreationOrganism (FooterActionBar経由) |
| useSchemaCreationInit | - | - | SchemaCreationOrganism（初期化専用。外部操作なし） |

## Phase 9 argTypes 候補

各コンポーネントに追加予定の argTypes:

### SchemaCreationOrganism

```ts
argTypes: {
  onConfirm: { action: 'confirmed' },
  onCancel: { action: 'cancelled' },
}
```

### DrawingToolPanel

```ts
argTypes: {
  onToolSelect: { action: 'tool-selected' },
  onColorChange: { action: 'color-changed' },
  onWidthChange: { action: 'width-changed' },
}
```

### TemplateSelectorPanel

```ts
argTypes: {
  onBodyPartChange: { action: 'body-part-changed' },
  onTemplateSelect: { action: 'template-selected' },
  onFavoriteToggle: { action: 'favorite-toggled' },
  onImageImport: { action: 'image-imported' },
}
```

### ToolbarPanel

```ts
argTypes: {
  onUndo: { action: 'undo' },
  onRedo: { action: 'redo' },
  onClear: { action: 'clear' },
  onFlip: { action: 'flip' },
}
```

### FooterActionBar

```ts
argTypes: {
  onCancel: { action: 'cancelled' },
  onConfirm: { action: 'confirmed' },
}
```

### ColorPickerPanel

```ts
argTypes: {
  onChange: { action: 'color-changed' },
}
```

### DrawingCanvas

```ts
argTypes: {
  onCanvasChange: { action: 'canvas-changed' },
}
```

## 備考

- API 通信が発生するフック: `useSchemaCreationInit`（`/bff/templates`・`/bff/favorites`）、`useSchemaCreationActions.handleChangePart`（`/bff/templates`）、`useSchemaCreationActions.handleFavoriteToggle`（`/bff/favorites`）、`useSchemaCreationSubmit.handleConfirm`（`/bff/schemas`）
- MSW が必要なコンポーネント: `SchemaCreationOrganism`（初期化・保存API呼び出しを含む）
- `DrawingCanvas` は `forwardRef` を使用。story では `ref` を渡さなくてよい（内部ハンドル不使用）
