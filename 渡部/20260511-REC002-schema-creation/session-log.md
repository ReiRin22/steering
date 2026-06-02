# セッションログ

## 2026-05-11 セッション1

### 実施内容
- implement コマンド開始
- 設計書・既存コード・レビュー結果を調査
- .steering/ ディレクトリ作成（state.md / requirements.md / design.md / tasklist.md）
- Phase 0 へ着手する準備完了

### 判断・決定事項
- レビューは FAIL（2026-04-20）だったが、design_detail-REC002_シェーマ作成.md（新版）は INDEX.md F02「design PASS 2026-04-27」と一致 → 実装を進める
- AI実装制約ファイルに GET /bff/favorites が存在せず「GET /bff/templates のレスポンス内の favoriteTemplateIds で初期化」と確認 → Phase 2 で api/get-templates のレスポンス型を確認する
- window global 汚染（canvasUndo/Redo/Clear/FlipHorizontal/Save）は Phase 5 で廃止（forwardRef + useImperativeHandle に変更）
- onSave(imageData) → onConfirm(schemaUuid, base64Image) へのシグネチャ変更が必要（Phase 1 T1-4）
- キャンバスサイズが 400×400（現状）→ 600×600（設計書）に修正必要（Phase 5 T5-3）

### 発見した課題
- DrawingCanvas が ImageData ベースで履歴管理しているが、設計書は DrawOperation[] 型 → Phase 5 で大幅改修が必要
- 現在のテンプレート表示がローカルデータ（assets/templates.ts）のみ。BFF 連携後はAPIから取得に変更が必要

### 次セッションへの引き継ぎ
- Phase 0（T0-1〜T0-6）から開始
- 設計書パス: design_detail-REC002_シェーマ作成.md
- 重要: window global 廃止・DrawOperation 型への統一・600×600対応が Phase 5 のメイン作業
