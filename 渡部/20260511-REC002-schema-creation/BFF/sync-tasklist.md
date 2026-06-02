# 3層同期実装タスクリスト — REC002 シェーマ作成

## Phase 0: 準備（スコープ確定・設計）

- [x] S0-1: DB 構造の理解（tmp/ 参照）
- [x] S0-2: API 分析（マスタアクセスパターン・PostgreSQL 操作推定・実装順序決定）
- [x] S0-3: ViewModel 設計（外部レスポンス型 → ViewModel 型の変換ロジック概要）
- [x] S0-4: infrastructure_scope の判断（none / auth / realtime / all）
- [x] S0-5: タスク分解完了（本タスクリスト作成完了）
- [ ] S0-6: state.md 更新（progress: "sync準備完了。次は Phase 1 から"）

---

## Phase 1: 型定義（FE / BFF / BE）

- [ ] S1-1: BE リクエスト型・レスポンス型定義（C# record / class）
  - `GetSchemaResponse`（schemaUuid / imageData / createdAt / updatedAt）
  - `GetTemplatesResponse`（templates[] / templateId / category / thumbnailUrl / imageUrl / isFavorite / favoriteOrder）
  - `PostSchemaRequest`（patientId / soapId / imageData / cursorPosition）
  - `PostSchemaResponse`（schemaUuid / insertedAt）
  - `PutSchemaRequest`（imageData）
  - `PutSchemaResponse`（schemaUuid / updatedAt）

- [ ] S1-2: BFF internal 型定義（`*.api.request.ts` / `*.api.response.ts`）
  - `schemas.api.request.ts`（PostSchemaRequest / PutSchemaRequest）
  - `schemas.api.response.ts`（GetSchemaResponse / PostSchemaResponse / PutSchemaResponse）
  - `templates.api.response.ts`（GetTemplatesResponse）

- [ ] S1-3: BFF → FE 共有型定義（`front_bff_shared/features/schema/types/responses/*.response.ts`）
  - `schema.response.ts`（SchemaResponse）
  - `templates.response.ts`（TemplatesResponse）
  - `save-schema.response.ts`（SaveSchemaResponse）
  - `update-schema.response.ts`（UpdateSchemaResponse）

- [ ] S1-4: FE ViewModel 型定義（`features/schema/types/*.type.ts`）
  - `schema.type.ts`（SchemaViewModel / SaveSchemaResult / UpdateSchemaResult）
  - `template.type.ts`（TemplateViewModel / TemplatesViewModel）

- [ ] S1-5: Zod スキーマ定義（`front_bff_shared/features/schema/schemas/*.schema.ts`）
  - `schema.schema.ts`（SchemaResponseSchema / PostSchemaRequestSchema / PutSchemaRequestSchema / SaveSchemaResponseSchema / UpdateSchemaResponseSchema）
  - `template.schema.ts`（TemplateSchema / TemplatesResponseSchema）

---

## Phase 2: BE Controller モック実装

- [ ] S2-1: Controller 実装 — IF 仕様に沿った固定値を返す
  - `GET /api/v1/schemas/{schemaUuid}` — 固定Base64画像を返す
  - `GET /api/v1/templates?category={category}` — 固定テンプレート一覧を返す
  - `POST /api/v1/schemas` — リクエストを受け取り固定UUIDを返す
  - `PUT /api/v1/schemas/{schemaUuid}` — リクエストを受け取り固定日時を返す
  ※ 全エンドポイントに X-Tenant-Id / X-Correlation-ID / Authorization の [FromHeader] を宣言する

- [ ] S2-2: Program.cs へのルーティング登録確認
  - `SchemasController` を DI コンテナに登録
  - `/api/v1/schemas` エンドポイントがマッピングされることを確認

- [ ] S2-3: Swagger 定義確認（BE の OpenAPI ドキュメント生成）
  - Swagger UI で `/api/v1/schemas/{schemaUuid}` GET が表示されることを確認
  - リクエスト・レスポンス型が正しく表示されることを確認

---

## Phase 3: BFF Client 層

- [ ] S3-1: `*.clients.ts` 実装 — axios で BE エンドポイントを呼び出す
  - `schemas.clients.ts`
    - `getSchema(schemaUuid: string): Promise<GetSchemaResponse>`
    - `postSchema(request: PostSchemaRequest): Promise<PostSchemaResponse>`
    - `putSchema(schemaUuid: string, request: PutSchemaRequest): Promise<PutSchemaResponse>`
  - `templates.clients.ts`
    - `getTemplates(category?: string): Promise<GetTemplatesResponse>`
  ※ BFF 層にモックデータを置かない。BE がモック中でも axios.get/post で BE を呼ぶ実装にする

---

## Phase 4: BFF Service 層

- [ ] S4-1: `*.services.ts` 実装 — Client 呼び出し・データ整形・ViewModel マッピング
  - `schemas.services.ts`
    - `getSchema(schemaUuid: string): Promise<SchemaViewModel>` — `createdAt` / `updatedAt` 除外
    - `postSchema(request: PostSchemaRequest): Promise<SaveSchemaResult>` — そのままコピー
    - `putSchema(schemaUuid: string, request: PutSchemaRequest): Promise<UpdateSchemaResult>` — `updatedAt` 除外
  - `templates.services.ts`
    - `getTemplates(category?: string): Promise<TemplatesViewModel>` — `favoriteOrder` 除外
  ※ HTTP レスポンス操作（status / header 設定）は Service に書かない

- [ ] S4-2: 変換ロジックの単体テスト（`*.services.test.ts`）
  - `schemas.services.test.ts`
    - `getSchema` が `createdAt` / `updatedAt` を除外することを検証
    - `putSchema` が `updatedAt` を除外することを検証
  - `templates.services.test.ts`
    - `getTemplates` が `favoriteOrder` を除外することを検証

---

## Phase 5: BFF Controller 層

- [ ] S5-1: `*.controllers.ts` 実装 — エンドポイント定義・共通ヘッダー受け取り・Service 呼び出し
  - `schemas.controllers.ts`
    - `GET /bff/schemas/:schemaUuid`
    - `POST /bff/schemas`
    - `PUT /bff/schemas/:schemaUuid`
  - `templates.controllers.ts`
    - `GET /bff/templates`
  ※ 全エンドポイントに X-Tenant-Id / X-Correlation-ID / Authorization の @Headers() を宣言する

- [ ] S5-2: Controller 統合テスト（`*.controllers.test.ts`）
  - `schemas.controllers.test.ts`
    - GET / POST / PUT エンドポイントが正しく Service を呼び出すことを検証
  - `templates.controllers.test.ts`
    - GET エンドポイントが正しく Service を呼び出すことを検証

---

## Phase 6: Module 登録

- [ ] S6-1: `*.module.ts` 作成 — Controller / Service / Client を NestJS モジュールに登録
  - `schemas.module.ts`（SchemasController / SchemasService / SchemasClient）
  - `templates.module.ts`（TemplatesController / TemplatesService / TemplatesClient）

- [ ] S6-2: `app.module.ts` へのインポート確認
  - `SchemasModule` / `TemplatesModule` が imports に追加されていることを確認

---

## Phase 7: FE API 層・Repository 層

- [ ] S7-1: `api/*.api.ts` 実装 — BFF エンドポイント呼び出し（axiosClient 使用）
  - `getSchema.api.ts`
    - `GET /bff/schemas/:schemaUuid`
  - `getTemplates.api.ts`
    - `GET /bff/templates?category={category}`
  - `postSchema.api.ts`
    - `POST /bff/schemas`
  - `putSchema.api.ts`
    - `PUT /bff/schemas/:schemaUuid`

- [ ] S7-2: `repository/*.repository.ts` 実装 — 並列呼び出し・保存処理
  - `schemaRepository.ts`
    - `loadSchema(schemaUuid: string): Promise<SchemaViewModel>`
    - `saveSchema(request: PostSchemaRequest): Promise<SaveSchemaResult>`
    - `updateSchema(schemaUuid: string, imageData: string): Promise<UpdateSchemaResult>`
  - `templateRepository.ts`
    - `loadTemplates(category?: string): Promise<TemplatesViewModel>`

- [ ] S7-3: API 層の単体テスト（MSW でモック）
  - `getSchema.api.test.ts`
  - `getTemplates.api.test.ts`
  - `postSchema.api.test.ts`
  - `putSchema.api.test.ts`

---

## Phase 8: 整合性チェック

- [ ] S8-1: 型の整合性（`front_bff_shared/` の型が BFF の `*.type.ts` と構造一致）
  - `SchemaResponse` === `GetSchemaResponse`（除外フィールドを除く）
  - `TemplatesResponse` === `GetTemplatesResponse`（除外フィールドを除く）
  - `SaveSchemaResponse` === `PostSchemaResponse`
  - `UpdateSchemaResponse` === `PutSchemaResponse`（除外フィールドを除く）

- [ ] S8-2: エラーコードの整合性（BFF が返すエラーコードが一覧に登録済み）
  - `UNAUTHORIZED` / `FORBIDDEN` / `NOT_FOUND` / `VALIDATION_ERROR` / `CONFLICT` / `SYSTEM_ERROR` が一覧に登録済みか確認

- [ ] S8-3: エンドポイントカバレッジ（設計書の API 一覧と実装が全て対応）
  - 設計書の API 数: 4本
  - BFF Controller エンドポイント数: 4本
  - FE api/ 関数数: 4本
  - 全て一致することを確認

---

## Phase 9: 基盤要素実装

**infrastructure_scope: all の場合**: Phase 9 全タスク必須

- [ ] S9-1: 認証・セッション管理（JWT検証・AuthGuard・authStore・Cookie管理）
  - `AuthGuard` を全 BFF エンドポイントに適用
  - `authStore.ts` 実装（JWT トークン管理・ログイン状態管理）
  - Cookie による HttpOnly セッション管理

- [ ] S9-2: ミドルウェア層（security.middleware / decryption.middleware / RequestContext）
  - `security.middleware.ts` 実装（CSRFトークン検証・XSS対策）
  - `decryption.middleware.ts` 実装（暗号化されたリクエストボディの復号）
  - `RequestContext` 実装（X-Correlation-ID / X-Tenant-Id のスレッドローカル保存）

- [ ] S9-3: リアルタイム通知（NotificationGateway / useNotification / notification.store）
  - `NotificationGateway.ts` 実装（Socket.io による WebSocket 通信）
  - `useNotification.ts` 実装（通知受信・表示フック）
  - `notification.store.ts` 実装（通知一覧管理）

- [ ] S9-4: i18n リソース管理（front_bff_shared/i18n/ の labels / validation / errors）
  - `front_bff_shared/i18n/ja/labels.json` — UI表示ラベル
  - `front_bff_shared/i18n/ja/validation.json` — バリデーションメッセージ
  - `front_bff_shared/i18n/ja/errors.json` — エラーメッセージ

- [ ] S9-5: 監査ログ（auditLogClient.ts 実装・送信タイミング確認）
  - `auditLogClient.ts` 実装（監査ログ送信 API 呼び出し）
  - 監査対象操作（EVT_CONFIRM / EVT_INIT_SCHEMA）で送信

- [ ] S9-6: Store ライフサイクル管理（storeRegistry.ts / tenantStore.ts 実装）
  - `storeRegistry.ts` 実装（全 Store の初期化・破棄を一括管理）
  - `tenantStore.ts` 実装（テナント切り替え時の Store クリア）

---

## 生成日時

2026-05-21
