# REC002 シェーマ作成機能 - スコープ宣言・受入条件

## スコープ宣言

- **実装対象**: `product/frontend/src/features/01_diagnosis/01_record-creation/01_schema-creation/`
- **設計書**: `docs/01_アプリ/フロントエンド/01_diagnosis/01_record-creation/design_detail-REC002_シェーマ作成.md`
- **AI実装制約**: `docs/01_アプリ/フロントエンド/01_diagnosis/01_record-creation/フロントエンド個別詳細設計書_【REC002】シェーマ作成機能_AI実装制約.md`
- **対象レイヤー**: フロントエンド（UI / 状態表示 / 操作イベント / Canvas描画制御）のみ
- **生成しないもの**: BFF・バックエンドのコード

## 受入条件

### 画面表示
- [ ] 600×600px 白背景のキャンバスが表示される
- [ ] ヘッダーに「シェーマ作成」タイトルが表示される
- [ ] 元に戻す・やり直す・クリアボタンが表示される
- [ ] 6種類の描画ツールが表示される（ペン・四角・円・テキスト・スプレー・消しゴム）
- [ ] カラーピッカー（16色パレット + HEX入力）が表示される
- [ ] 線の太さスライダー（1〜20）が表示される
- [ ] 反転ボタン・画像取込ボタンが表示される
- [ ] 部位選択ドロップダウンが表示される（初期値「全身図」）
- [ ] テンプレート一覧が3列グリッドで表示される（お気に入りを先頭）
- [ ] キャンセル・確定ボタンが表示される

### UI制御
- [ ] BTN_UNDO: undoStack.length===0 で非活性
- [ ] BTN_REDO: redoStack.length===0 で非活性
- [ ] BTN_CLEAR: hasDrawContent===false で非活性
- [ ] BTN_FLIP: hasDrawContent===false で非活性
- [ ] BTN_CONFIRM: isSubmitting===true で非活性（多重送信防止）

### 操作イベント（業務的）
- [ ] EVT_INIT01: 初期表示時に GET /bff/templates?category=全身図 を呼び出す
- [ ] EVT_UNDO: 直前操作を取り消す
- [ ] EVT_REDO: Undo を再実行する
- [ ] EVT_CLEAR: 確認ダイアログ後に白紙にする（Undo 対象）
- [ ] EVT_FLIP: hasDrawContent===true 時のみ水平反転
- [ ] EVT_IMAGE_UPLOAD: jpg/png・10MB 以下のみ受付
- [ ] EVT_CLIPBOARD_PASTE: Ctrl+V で画像を貼り付け
- [ ] EVT_TEMPLATE_LOAD: 描画あり時は E005 確認ダイアログ
- [ ] EVT_FAVORITE_TOGGLE: 楽観的更新。API 失敗時はロールバック
- [ ] EVT_DRAW: 描画完了時に undoStack に保存、redoStack クリア
- [ ] EVT_CANCEL: hasDrawContent===true 時は E003 確認ダイアログ
- [ ] EVT_CONFIRM: 空白時は E002 確認ダイアログ。POST /bff/schemas → onConfirm(schemaUuid, base64Image)

### エラーハンドリング
- [ ] E001: jpg/png 以外 → ダイアログ表示
- [ ] E002: 空白確定 → 確認ダイアログ
- [ ] E003: 描画ありキャンセル → 確認ダイアログ
- [ ] E004: 10MB 超 → ダイアログ表示
- [ ] E005: 描画ありテンプレート選択 → 確認ダイアログ
- [ ] E006: クリップボードアクセス拒否 → ダイアログ
- [ ] E007: クリップボードに画像以外 → ダイアログ
- [ ] E401/E403/E999: API エラー → 共通エラーダイアログ

## スコープ外
- 縦反転（FlipVertical）→ `[SCOPE-OUT: REC002]` 済み
- BFF・バックエンドのコード生成
- `GET /bff/schemas/{schemaUuid}`（編集モード）→ 今回は新規作成モードのみ対応
