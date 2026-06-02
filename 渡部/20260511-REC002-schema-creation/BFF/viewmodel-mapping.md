# ViewModel 設計_【REC002】シェーマ作成

## 外部レスポンス型 → ViewModel 型

---

### API 1: GET /bff/schemas/{schemaUuid}

#### 外部レスポンス型（BE）

```typescript
// Backend: GET /api/v1/schemas/{schemaUuid}
// Response: SchemaResponse
{
  schemaUuid: string;      // document_id (UUID)
  imageData: string;       // Base64エンコード済みPNG画像
  createdAt: string;       // ISO 8601形式
  updatedAt: string;       // ISO 8601形式
}
```

#### BFF internal 型

```typescript
// BFF: schemas.api.response.ts
export interface GetSchemaResponse {
  schemaUuid: string;
  imageData: string;  // Base64 PNG
  createdAt: string;
  updatedAt: string;
}
```

#### ViewModel 型（FE）

```typescript
// Frontend: schema.type.ts
export type SchemaViewModel = {
  schemaUuid: string;
  imageData: string;  // Base64 PNG（Canvasへの描画用）
};
```

#### 変換ロジック

- **除外フィールド**: `createdAt` / `updatedAt` はフロントエンド表示に不要（Canvas描画のみ）
- **変換処理**: そのままコピー（`schemaUuid` / `imageData`）
- **実装場所**: BFF Service 層

```typescript
// BFF Service 層
function mapToSchemaViewModel(response: GetSchemaResponse): SchemaViewModel {
  return {
    schemaUuid: response.schemaUuid,
    imageData: response.imageData,
  };
}
```

---

### API 2: GET /bff/templates

#### 外部レスポンス型（BE）

```typescript
// Backend: GET /api/v1/templates?category={category}
// Response: TemplatesResponse
{
  templates: Array<{
    templateId: string;
    category: string;
    thumbnailUrl: string;
    imageUrl: string;
    isFavorite: boolean;
    favoriteOrder: number | null;
  }>;
}
```

#### BFF internal 型

```typescript
// BFF: templates.api.response.ts
export interface GetTemplatesResponse {
  templates: Array<{
    templateId: string;
    category: string;
    thumbnailUrl: string;
    imageUrl: string;
    isFavorite: boolean;
    favoriteOrder: number | null;
  }>;
}
```

#### ViewModel 型（FE）

```typescript
// Frontend: template.type.ts
export type TemplateViewModel = {
  templateId: string;
  category: string;
  thumbnailUrl: string;
  imageUrl: string;
  isFavorite: boolean;
};

export type TemplatesViewModel = {
  templates: TemplateViewModel[];
};
```

#### 変換ロジック

- **除外フィールド**: `favoriteOrder` はフロントエンド表示に不要（ソート済みで渡されるため）
- **変換処理**: 
  - `favoriteOrder` を除外
  - お気に入りテンプレートを先頭に配置（BFF Service 層でソート済み）
- **実装場所**: BFF Service 層

```typescript
// BFF Service 層
function mapToTemplatesViewModel(response: GetTemplatesResponse): TemplatesViewModel {
  return {
    templates: response.templates.map(t => ({
      templateId: t.templateId,
      category: t.category,
      thumbnailUrl: t.thumbnailUrl,
      imageUrl: t.imageUrl,
      isFavorite: t.isFavorite,
    })),
  };
}
```

---

### API 3: POST /bff/schemas

#### リクエスト型（FE）

```typescript
// Frontend: postSchema.api.request.ts
export type PostSchemaRequest = {
  patientId: string;
  soapId: string;
  imageData: string;  // Base64エンコード済みPNG
  cursorPosition: number;
};
```

#### 外部レスポンス型（BE）

```typescript
// Backend: POST /api/v1/schemas
// Response: CreateSchemaResponse
{
  schemaUuid: string;   // 新規作成されたシェーマのUUID
  insertedAt: number;   // REC001のテキストカーソル位置
}
```

#### BFF internal 型

```typescript
// BFF: schemas.api.response.ts
export interface PostSchemaResponse {
  schemaUuid: string;
  insertedAt: number;
}
```

#### ViewModel 型（FE）

```typescript
// Frontend: schema.type.ts
export type SaveSchemaResult = {
  schemaUuid: string;
  insertedAt: number;
};
```

#### 変換ロジック

- **変換処理**: そのままコピー
- **実装場所**: BFF Service 層

```typescript
// BFF Service 層
function mapToSaveSchemaResult(response: PostSchemaResponse): SaveSchemaResult {
  return {
    schemaUuid: response.schemaUuid,
    insertedAt: response.insertedAt,
  };
}
```

---

### API 4: PUT /bff/schemas/{schemaUuid}

#### リクエスト型（FE）

```typescript
// Frontend: putSchema.api.request.ts
export type PutSchemaRequest = {
  schemaUuid: string;    // path parameter
  imageData: string;     // Base64エンコード済みPNG
};
```

#### 外部レスポンス型（BE）

```typescript
// Backend: PUT /api/v1/schemas/{schemaUuid}
// Response: UpdateSchemaResponse
{
  schemaUuid: string;   // 更新されたシェーマのUUID
  updatedAt: string;    // ISO 8601形式
}
```

#### BFF internal 型

```typescript
// BFF: schemas.api.response.ts
export interface PutSchemaResponse {
  schemaUuid: string;
  updatedAt: string;
}
```

#### ViewModel 型（FE）

```typescript
// Frontend: schema.type.ts
export type UpdateSchemaResult = {
  schemaUuid: string;
};
```

#### 変換ロジック

- **除外フィールド**: `updatedAt` はフロントエンド表示に不要（楽観的更新で即座に反映するため）
- **変換処理**: `schemaUuid` のみコピー
- **実装場所**: BFF Service 層

```typescript
// BFF Service 層
function mapToUpdateSchemaResult(response: PutSchemaResponse): UpdateSchemaResult {
  return {
    schemaUuid: response.schemaUuid,
  };
}
```

---

## front_bff_shared 型定義

### Response 型（BFF → FE 共有）

```typescript
// front_bff_shared/features/schema/types/responses/schema.response.ts
export interface SchemaResponse {
  schemaUuid: string;
  imageData: string;
}

// front_bff_shared/features/schema/types/responses/templates.response.ts
export interface TemplatesResponse {
  templates: Array<{
    templateId: string;
    category: string;
    thumbnailUrl: string;
    imageUrl: string;
    isFavorite: boolean;
  }>;
}

// front_bff_shared/features/schema/types/responses/save-schema.response.ts
export interface SaveSchemaResponse {
  schemaUuid: string;
  insertedAt: number;
}

// front_bff_shared/features/schema/types/responses/update-schema.response.ts
export interface UpdateSchemaResponse {
  schemaUuid: string;
}
```

### Request 型（FE → BFF 共有）

```typescript
// front_bff_shared/features/schema/types/requests/post-schema.request.ts
export interface PostSchemaRequest {
  patientId: string;
  soapId: string;
  imageData: string;
  cursorPosition: number;
}

// front_bff_shared/features/schema/types/requests/put-schema.request.ts
export interface PutSchemaRequest {
  imageData: string;
}
```

---

## Zod スキーマ定義

```typescript
// front_bff_shared/features/schema/schemas/schema.schema.ts
import { z } from 'zod';

export const SchemaResponseSchema = z.object({
  schemaUuid: z.string().uuid(),
  imageData: z.string().min(1),
});

export const TemplateSchema = z.object({
  templateId: z.string(),
  category: z.string(),
  thumbnailUrl: z.string().url(),
  imageUrl: z.string().url(),
  isFavorite: z.boolean(),
});

export const TemplatesResponseSchema = z.object({
  templates: z.array(TemplateSchema),
});

export const PostSchemaRequestSchema = z.object({
  patientId: z.string(),
  soapId: z.string(),
  imageData: z.string().min(1),
  cursorPosition: z.number().int().min(0),
});

export const PutSchemaRequestSchema = z.object({
  imageData: z.string().min(1),
});

export const SaveSchemaResponseSchema = z.object({
  schemaUuid: z.string().uuid(),
  insertedAt: z.number().int().min(0),
});

export const UpdateSchemaResponseSchema = z.object({
  schemaUuid: z.string().uuid(),
});
```

---

## 変換ロジック一覧

| API | 外部レスポンス型 | ViewModel 型 | 変換処理 | 実装場所 |
|---|---|---|---|---|
| GET /bff/schemas/{schemaUuid} | `GetSchemaResponse` | `SchemaViewModel` | `createdAt` / `updatedAt` 除外 | BFF Service |
| GET /bff/templates | `GetTemplatesResponse` | `TemplatesViewModel` | `favoriteOrder` 除外 | BFF Service |
| POST /bff/schemas | `PostSchemaResponse` | `SaveSchemaResult` | そのままコピー | BFF Service |
| PUT /bff/schemas/{schemaUuid} | `PutSchemaResponse` | `UpdateSchemaResult` | `updatedAt` 除外 | BFF Service |

---

## 生成日時

2026-05-21
