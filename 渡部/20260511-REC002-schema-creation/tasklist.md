# REC002 タスクリスト

## Phase 0: スコープ確定・コンポーネント設計

- [ ] T0-1: LV3 フォルダ監査（非定義フォルダなし確認）
- [ ] T0-1: コンポーネント分割計画（Atom/Molecule/Organism/Page）
- [ ] T0-2: 機能要素・スコープ内/外リスト確認
- [ ] T0-3: ページ境界確認（01_record-creation 内の他LV3との干渉なし確認）
- [ ] T0-4: shared 振り分け洗い出し
  - [ ] MedicalTemplates.tsx → assets/ 留め（LV3固有）
  - [ ] templates.ts → assets/ 留め（LV3固有）
  - [ ] ColorPickerPanel.tsx → shared/components/molecules/ 昇格候補（T6-4 で再判定）
  - [ ] DrawTool 型 → types/ 留め（BFF 境界なし）
  - [ ] DrawOperation 型 → types/ 留め（フロント内部型）
- [ ] T0-5: スコープ外コード確認（SCOPE-OUT タグ済み確認）
- [ ] T0-6: プレースホルダー配置（不要と判断 → 記録）

---

## Phase 1: 基盤整備

- [ ] T1-1: src/ 二重化解消（存在しないので不要 → 記録）
- [ ] T1-1: shared 振り分け実行（今回は移動なし → 記録）
- [ ] T1-2: front_bff_shared の型確認・不足分追加
  - [ ] GET /bff/templates レスポンスに favoriteTemplateIds が含まれるか確認
  - [ ] GET /bff/favorites（設計書差異あり → AI実装制約では GET /bff/templates のみで初期化）
  - [ ] FavoriteToggleRequest, TemplatesResponse, SchemaSaveRequest, SchemaSaveResponse は既存確認
- [ ] T1-3: ViewModel 型定義（LV3/types/schema-creation.types.ts の拡張）
  - [ ] DrawTool, DrawOperation, SchemaCreationMode, SchemaCreationDialogType, SchemaCreationError は既存流用
  - [ ] TemplateViewModel の追加（templateId, name, category, isFavorite）
  - [ ] キャンバスサイズ定数 CANVAS_SIZE = 600 を定義
- [ ] T1-4: REC002.tsx 最小化確認（既に最小形式 → 確認のみ）
  - [ ] Props に onConfirm(schemaUuid, base64Image) を追加
  - [ ] onSave → onConfirm へのシグネチャ変更

---

## Phase 2: API・Repository 層

- [ ] T2-1: api/get-templates.api.ts 実装
  - [ ] GET /bff/templates?category={category} → TemplatesResponse
- [ ] T2-1: api/post-schema.api.ts 実装
  - [ ] POST /bff/schemas → SchemaSaveResponse
- [ ] T2-1: api/put-favorite.api.ts 実装
  - [ ] PUT /bff/templates/{templateId}/favorite → void
- [ ] T2-2: repository/schema-creation.repository.ts 実装
  - [ ] initializeSchemaCreation(category): getTemplates を呼び出し
  - [ ] saveSchema(imageData): postSchema を呼び出し

---

## Phase 3: 状態管理

- [ ] T3-1: stores/schema-creation.store.ts 実装
  - [ ] 全状態定義（activeTool, strokeColor, penSize, undoStack, redoStack, hasDrawContent, selectedBodyPart, isSubmitting, favoriteTemplateIds, dialogType, templates, error）
  - [ ] INITIAL_SCHEMA_CREATION_STATE 定数定義
  - [ ] 全アクション実装（pushUndoStack, undo, redo, clearCanvas, flipCanvas, setActiveTool, setStrokeColor, setPenSize, setSelectedBodyPart, setTemplates, toggleFavorite, setDialogType, setIsSubmitting, setError, reset）
  - [ ] registerStore で storeRegistry に登録

---

## Phase 4: Hook 層

- [ ] T4-1: hooks/useSchemaCreationInit.ts 実装
  - [ ] EVT_INIT01: マウント時に GET /bff/templates?category=全身図 → store.setTemplates
  - [ ] API 失敗時は setDialogType('error') + setError
- [ ] T4-1: hooks/useSchemaCreationActions.ts 実装
  - [ ] handleToolSelect (EVT_UI_SELECT_TOOL)
  - [ ] handleColorChange (EVT_UI_CHANGE_COLOR)
  - [ ] handleWidthChange (EVT_UI_CHANGE_WIDTH)
  - [ ] handleBodyPartChange (EVT_UI_CHANGE_PART) → GET /bff/templates 再取得
  - [ ] handleTemplateLoad (EVT_TEMPLATE_LOAD) → hasDrawContent 時は E005 ダイアログ
  - [ ] handleFavoriteToggle (EVT_FAVORITE_TOGGLE) → 楽観的更新・ロールバック
  - [ ] handleUndo (EVT_UNDO)
  - [ ] handleRedo (EVT_REDO)
  - [ ] handleClear (EVT_CLEAR) → E003 確認ダイアログ後に実行
  - [ ] handleFlip (EVT_FLIP) → hasDrawContent===false 時は無反応
  - [ ] handleImageUpload (EVT_IMAGE_UPLOAD) → E001/E004 バリデーション
  - [ ] handleClipboardPaste (EVT_CLIPBOARD_PASTE) → E006/E007 バリデーション
- [ ] T4-1: hooks/useSchemaCreationSubmit.ts 実装
  - [ ] handleConfirm (EVT_CONFIRM) → E002 ダイアログ → POST → onConfirm(schemaUuid, base64Image)
  - [ ] handleCancel (EVT_CANCEL) → E003 ダイアログ → onCancel

---

## Phase 5: コンポーネント層

- [ ] T5-1: Molecule 抽出・整理
  - [ ] ToolboxPanel.tsx（新規）: ツール選択 + 反転 + 画像取込
  - [ ] TemplateSelectorPanel.tsx（新規）: 部位選択 + テンプレートグリッド + お気に入り
  - [ ] ColorPickerPanel.tsx（既存）: 流用
  - [ ] ConfirmDialog.tsx（新規）: 共通確認ダイアログ（クリア確認・キャンセル確認・空白確認・テンプレート確認）
  - [ ] ErrorDialog.tsx（新規）: 共通エラーダイアログ
- [ ] T5-2: Molecule 実装
  - [ ] ToolboxPanel.tsx 実装
  - [ ] TemplateSelectorPanel.tsx 実装
  - [ ] ConfirmDialog.tsx 実装
  - [ ] ErrorDialog.tsx 実装
- [ ] T5-3: SchemaCreationOrganism.tsx 全面改修
  - [ ] window global 汚染を廃止（canvasRef を useImperativeHandle / forwardRef に変更）
  - [ ] 全フック呼び出し（useSchemaCreationInit, useSchemaCreationActions, useSchemaCreationSubmit）
  - [ ] store cleanup（useEffect cleanup で reset()）
  - [ ] DrawingCanvas を store の undoStack/redoStack 接続に変更
- [ ] T5-3: DrawingCanvas.tsx 改修
  - [ ] キャンバスサイズを 600×600 に変更
  - [ ] DrawingState → DrawOperation[] 型に統一
  - [ ] undoStack 最大50件制限・先頭破棄ロジック追加
  - [ ] window global を ref API に変更（forwardRef + useImperativeHandle）
  - [ ] hasDrawContent 変化を onCanvasChange コールバックで通知
  - [ ] テキストツール: 16px sans-serif 固定・strokeColor 連動
- [ ] T5-4: REC002.tsx は既に RSC 不要（'use client' 付き最小ラッパーのまま）
- [ ] T5-5: REC002.tsx 最小化確認・onConfirm シグネチャ修正
- [ ] T5-6: import パス確認

---

## Phase 6: 機能実装

- [ ] T6-1: 主要操作の完全実装（全 EVT_* の end-to-end 接続確認）
- [ ] T6-2: EVT_FAVORITE_TOGGLE の楽観的更新・ロールバック実装
- [ ] T6-3: EVT_CONFIRM の確定フロー（isSubmitting → POST → onConfirm → reset）
- [ ] T6-3: EVT_CANCEL のキャンセルフロー（E003 → onCancel → reset）
- [ ] T6-4: 二次 shared 昇格チェック（ColorPickerPanel を shared に昇格すべきか最終判断）

---

## Phase 7: バリデーション・エラーハンドリング

- [ ] T7-1: E001〜E007 の全エラーを ErrorDialog / ConfirmDialog で統一表示
- [ ] T7-2: API エラー（E401/E403/E999）の共通エラーダイアログ表示

---

## Phase 8: Storybook

- [ ] T8-1: Storybook セットアップ確認
- [ ] T8-2: molecules story 作成（ToolboxPanel, ColorPickerPanel, TemplateSelectorPanel, ConfirmDialog, ErrorDialog）
- [ ] T8-3: organisms story 作成（SchemaCreationOrganism）
- [ ] T8-4: CI 設定確認

---

## Phase 9: Storybook テスト

- [x] T9-1: API通信対象 storyファイル特定（下記リスト）
- [x] T9-2: MSW設定追加（SchemaCreationOrganism.stories.tsx に commonHandlers/editModeHandlers 定義済み）
- [x] T9-8: vitest.config.ts・vitest.setup.ts・package.json テストスクリプト確認済み
- [x] T9-3: SchemaCreationOrganism.test.tsx 作成済み（MSWありOrganismテスト）
- [x] T9-4: 全storyファイルに fn() 追加（action() → fn() へ置き換え）
- [x] T9-5: SchemaCreationOrganism.test.tsx の AAAパターン確認・修正済み
- [x] T9-6: テスト固有ハンドラー整合確認（Stories.commonHandlers/editModeHandlers 使用）
- [x] T9-7: storyファイル named export 整合確認済み
- [x] T9-9: MSW不要molecules のテストファイル作成（ToolbarPanel/ColorPickerPanel/DrawingToolPanel/FooterActionBar/TemplateSelectorPanel/DrawingCanvas）
- [x] T9-10: vitest.config.ts に coverage セクション（C0 80%/C1 70%/C2 80%）確認済み
- [x] T9-11: .steering/ci.env・package.json テストスクリプト確認済み

## T9-1: API通信対象 storyファイル

| storyファイル | 判定 | 使用APIエンドポイント |
|---|---|---|
| `organisms/SchemaCreationOrganism.stories.tsx` | MSW対象 | `GET /bff/templates?category=...`, `GET /bff/favorites`, `GET /bff/schemas/:schemaUuid`, `POST /bff/schemas`, `PUT /bff/schemas/:schemaUuid`, `POST /bff/favorites`, `DELETE /bff/favorites/:templateId` |
| `organisms/DrawingCanvas.stories.tsx` | MSW不要 | — |
| `molecules/ToolbarPanel.stories.tsx` | MSW不要 | — |
| `molecules/ColorPickerPanel.stories.tsx` | MSW不要 | — |
| `molecules/DrawingToolPanel.stories.tsx` | MSW不要 | — |
| `molecules/FooterActionBar.stories.tsx` | MSW不要 | — |
| `molecules/TemplateSelectorPanel.stories.tsx` | MSW不要 | — |

---

## Phase 10: E2E テスト・ドキュメント

- [ ] T10-1〜T10-7: Phase10 スキル参照

---

## BFF 実装（synchronizer フェーズ）

※ 詳細タスクは `BFF/sync-tasklist.md` を参照

- [ ] BFF Phase 0: 準備（スコープ確定・設計）
- [ ] BFF Phase 1: 型定義（FE / BFF / BE）
- [ ] BFF Phase 2: BE Controller モック実装
- [ ] BFF Phase 3: BFF Service 層実装
- [ ] BFF Phase 4: BFF Client 層実装
- [ ] BFF Phase 5: BFF API ハンドラー実装
- [ ] BFF Phase 6: FE API 関数実装
- [ ] BFF Phase 7: FE Repository 層実装
- [ ] BFF Phase 8: 整合性チェック
- [ ] BFF Phase 9: 基盤要素実装

---

## テストケース一覧（Phase 9-10 で実装）

### 正常系
| # | テストID | テスト内容 |
|---|---------|-----------|
| 1 | TC-INIT-01 | 初期表示: GET /bff/templates が呼ばれ、テンプレートが表示される |
| 2 | TC-INIT-02 | 初期表示: BTN_UNDO/REDO/CLEAR/FLIP が非活性 |
| 3 | TC-DRAW-01 | ペンツールで描画後 hasDrawContent===true になる |
| 4 | TC-DRAW-02 | 描画後 BTN_CLEAR/FLIP が活性化する |
| 5 | TC-UNDO-01 | 描画 → Undo で前の状態に戻る。BTN_REDO が活性化 |
| 6 | TC-REDO-01 | Undo → Redo で操作が再実行される |
| 7 | TC-CLEAR-01 | クリアボタン → 確認ダイアログ表示 → 確認で白紙になる |
| 8 | TC-FLIP-01 | 描画後に反転ボタンで水平反転される |
| 9 | TC-TEMPLATE-01 | テンプレートクリック（描画なし）でキャンバスに表示 |
| 10 | TC-FAVORITE-01 | ★ボタンでお気に入りトグル（楽観的更新・先頭移動） |
| 11 | TC-BODYPART-01 | 部位変更で GET /bff/templates?category=xxx が呼ばれる |
| 12 | TC-CONFIRM-01 | 描画後に確定 → POST /bff/schemas → onConfirm コールバック |
| 13 | TC-CANCEL-01 | 描画なしでキャンセル → ダイアログなしで onCancel コールバック |
| 14 | TC-UPLOAD-01 | PNG ファイルを取込 → キャンバスに表示 |
| 15 | TC-TEXT-01 | テキストツール → Canvas クリック → 入力 → Enter で描画 |

### 異常系（バリデーション・エラー）
| # | テストID | テスト内容 |
|---|---------|-----------|
| 16 | TC-E001-01 | jpg/png 以外のファイル → E001 ダイアログ |
| 17 | TC-E002-01 | 空白で確定 → E002 確認ダイアログ → キャンセルで中断 |
| 18 | TC-E002-02 | 空白で確定 → E002 確認ダイアログ → 確定で POST |
| 19 | TC-E003-01 | 描画ありでキャンセル → E003 確認ダイアログ |
| 20 | TC-E004-01 | 10MB 超ファイル → E004 ダイアログ |
| 21 | TC-E005-01 | 描画後テンプレート選択 → E005 確認ダイアログ |
| 22 | TC-E006-01 | クリップボードアクセス拒否 → E006 ダイアログ |
| 23 | TC-E007-01 | クリップボードに画像以外 → E007 ダイアログ |
| 24 | TC-API-01 | GET /bff/templates 失敗 → 共通エラーダイアログ |
| 25 | TC-API-02 | POST /bff/schemas 失敗 → 共通エラーダイアログ + isSubmitting=false |
| 26 | TC-FAV-02 | お気に入りトグル API 失敗 → ロールバック + エラーダイアログ |

### UI制御
| # | テストID | テスト内容 |
|---|---------|-----------|
| 27 | TC-UI-01 | undoStack 空 → BTN_UNDO 非活性 |
| 28 | TC-UI-02 | redoStack 空 → BTN_REDO 非活性 |
| 29 | TC-UI-03 | hasDrawContent===false → BTN_CLEAR/FLIP 非活性 |
| 30 | TC-UI-04 | isSubmitting===true → BTN_CONFIRM 非活性 |
| 31 | TC-UI-05 | undoStack 最大50件: 超過時に先頭破棄 |
