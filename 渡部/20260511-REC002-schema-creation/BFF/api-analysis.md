# Synchronizer実装計画_【REC002】シェーマ作成

## API一覧分析

### 抽出結果
- **API数**: 4本
- **マスタアクセスあり**: 0本（Direct: 0本, Indirect: 0本, Unknown: 0本）
- **マスタアクセスなし**: 4本
- **特記事項**: Canvas描画データのみを扱うため、master-domain-service への直接アクセスなし

### API詳細

| No | 画面名 | API | メソッド | マスタアクセス | マスタ種別 | 対象テーブル | 推定PostgreSQL操作 | 複雑度 |
|----|--------|-----|---------|--------------|-----------|------------|------------------|--------|
| 1 | シェーマ作成 | /bff/schemas/{schemaUuid} | GET | None | - | tenant.trn_document または tenant.trn_clinical_record | SELECT * WHERE schema_uuid = ? | Simple |
| 2 | シェーマ作成 | /bff/templates | GET | None | - | tenant.mst_document_template または cmn.mst_template | SELECT * WHERE category = ? (OR all) | Medium |
| 3 | シェーマ作成 | /bff/schemas | POST | None | - | tenant.trn_document + tenant.trn_clinical_record | INSERT INTO trn_document ... (imageData as Base64 PNG) | Medium |
| 4 | シェーマ作成 | /bff/schemas/{schemaUuid} | PUT | None | - | tenant.trn_document + his_document (自動) | UPDATE trn_document SET imageData = ... WHERE schema_uuid = ? | Medium |

---

## マスタアクセスパターン

### Direct Access (BFF → master-domain-service)
**該当なし**

### Indirect Access (BFF → master-bff → master-domain-service)
**該当なし**

### No Master Access (BFF → execution-domain-service)
- **API 1**: `GET /bff/schemas/{schemaUuid}` — 既存シェーマ読込（編集時）
  - 対象テーブル: `tenant.trn_document` または `tenant.trn_clinical_record`
  - PostgreSQL操作: `SELECT * FROM tenant.trn_document WHERE schema_uuid = ?`
  
- **API 2**: `GET /bff/templates` — テンプレート一覧取得
  - 対象テーブル: `tenant.mst_document_template` または `cmn.mst_template`（要確認）
  - PostgreSQL操作: `SELECT * FROM mst_template WHERE category = ? OR all`
  
- **API 3**: `POST /bff/schemas` — シェーマ新規保存
  - 対象テーブル: `tenant.trn_document`（シェーマをdocumentとして保存）
  - PostgreSQL操作: `INSERT INTO tenant.trn_document (imageData, ...) VALUES (?, ...)`
  - 注意: imageData は Base64エンコード済みPNG画像
  
- **API 4**: `PUT /bff/schemas/{schemaUuid}` — シェーマ更新保存
  - 対象テーブル: `tenant.trn_document`
  - PostgreSQL操作: `UPDATE tenant.trn_document SET imageData = ?, updated_at = NOW() WHERE schema_uuid = ?`
  - 履歴: `his_document` へ自動記録（トリガー）

---

## DB 構造サマリ参照（S0-1）

### 対象テーブル（推定）

REC002（シェーマ作成）で使用する可能性のあるテーブル:

#### tenant スキーマ

| テーブル | 論理名 | 用途 | 操作推定 |
|---|---|---|---|
| `tenant.trn_document` | 文書管理トラン | シェーマを document として保存 | SELECT/INSERT/UPDATE |
| `tenant.trn_clinical_record` | 診療記録トラン | シェーマを clinical_record として保存（代替） | SELECT/INSERT/UPDATE |
| `tenant.mst_document_template` | 文書テンプレートマスタ | テンプレート定義 | SELECT |

#### cmn スキーマ（要確認）

| テーブル | 論理名 | 用途 | 操作推定 |
|---|---|---|---|
| `cmn.mst_template`（存在する場合） | 共通テンプレートマスタ | 全テナント共通のテンプレート | SELECT |

**注意**: `cmn.mst_template` が存在しない場合は `tenant.mst_document_template` を使用する。

### FK 依存関係（DB 構造サマリより）

```
tenant.trn_document
  ├─→ tenant.mst_patient (patient_id)
  └─→ tenant.trn_encounter (encounter_id)

tenant.trn_clinical_record
  ├─→ tenant.trn_encounter (encounter_id)
  └─→ tenant.trn_document (document_id) ※ document として保存する場合
```

---

## PostgreSQL 操作推定

### API 1: GET /bff/schemas/{schemaUuid}

**バックエンド API**: `GET /api/v1/schemas/{schemaUuid}`

**対象テーブル**: `tenant.trn_document`

**PostgreSQL 操作**:
```sql
SELECT 
  document_id AS schemaUuid,
  content_text AS imageData,  -- Base64エンコード済みPNG
  created_at AS createdAt,
  updated_at AS updatedAt
FROM tenant.trn_document
WHERE document_id = ?
  AND document_type_code = 'SCHEMA'  -- シェーマ種別
  AND is_active = TRUE;
```

**複雑度**: Simple（単一テーブル・主キー検索）

---

### API 2: GET /bff/templates

**バックエンド API**: `GET /api/v1/templates?category={category}`

**対象テーブル**: `tenant.mst_document_template` または `cmn.mst_template`

**PostgreSQL 操作** (category 指定時):
```sql
SELECT 
  template_id AS templateId,
  category AS category,
  thumbnail_url AS thumbnailUrl,
  image_url AS imageUrl,
  is_favorite AS isFavorite,  -- ユーザーごとのお気に入り情報（要JOI N）
  favorite_order AS favoriteOrder
FROM tenant.mst_document_template
WHERE category = ?
  AND is_active = TRUE
ORDER BY favorite_order ASC NULLS LAST, template_id ASC;
```

**PostgreSQL 操作** (category 省略時):
```sql
SELECT 
  template_id AS templateId,
  category AS category,
  thumbnail_url AS thumbnailUrl,
  image_url AS imageUrl,
  is_favorite AS isFavorite,
  favorite_order AS favoriteOrder
FROM tenant.mst_document_template
WHERE is_active = TRUE
ORDER BY favorite_order ASC NULLS LAST, category ASC, template_id ASC;
```

**複雑度**: Medium（単一テーブル・WHERE句あり・ORDER BY）

**注意**: `isFavorite` と `favoriteOrder` はユーザーごとの設定のため、`tenant.rel_user_favorite_template` のような関連テーブルとの JOIN が必要な可能性あり。

---

### API 3: POST /bff/schemas

**バックエンド API**: `POST /api/v1/schemas`

**対象テーブル**: `tenant.trn_document`

**PostgreSQL 操作**:
```sql
INSERT INTO tenant.trn_document (
  patient_id,
  encounter_id,
  document_type_code,
  document_title,
  document_status,
  content_text,  -- Base64エンコード済みPNG画像
  author_user_id,
  created_at,
  created_by,
  updated_at,
  updated_by
) VALUES (
  ?, -- patientId
  ?, -- soapId（encounter_id に相当）
  'SCHEMA',
  'シェーマ',
  'FINAL',
  ?, -- imageData（Base64）
  ?, -- 操作者ユーザーID
  NOW(),
  ?, -- 操作者
  NOW(),
  ?  -- 操作者
)
RETURNING document_id AS schemaUuid;
```

**複雑度**: Simple-Medium（単一テーブル・単純INSERT・RETURNING句あり）

**注意**: `content_text` フィールドに Base64 PNG を保存する。`file_path` / `file_size` は使用しない（Base64として保存するため）。

---

### API 4: PUT /bff/schemas/{schemaUuid}

**バックエンド API**: `PUT /api/v1/schemas/{schemaUuid}`

**対象テーブル**: `tenant.trn_document` + `tenant.his_document`（自動）

**PostgreSQL 操作**:
```sql
UPDATE tenant.trn_document
SET 
  content_text = ?,  -- 新しいBase64エンコード済みPNG
  updated_at = NOW(),
  updated_by = ?
WHERE document_id = ?
  AND is_active = TRUE
RETURNING updated_at AS updatedAt;
```

**履歴記録** (自動トリガー):
```sql
-- トリガーが自動実行
INSERT INTO tenant.his_document (
  document_id,
  operation_type,
  operation_at,
  operation_by,
  -- 変更前の全カラム
  ...
) VALUES (
  ?,
  'UPDATE',
  NOW(),
  ?,
  ...
);
```

**複雑度**: Simple-Medium（単一テーブル・単純UPDATE・RETURNING句あり + 履歴自動記録）

---

## FK 依存関係

```
tenant.trn_document (シェーマを保存)
  ├─→ tenant.mst_patient (patient_id)
  └─→ tenant.trn_encounter (encounter_id / soapId)

tenant.mst_document_template (テンプレート)
  └─→ （FK なし、マスタテーブル）
```

---

## 実装順序推定

### Phase 1: BE Controller mocks（Master APIs 優先）

**該当なし** — マスタアクセスなし

### Phase 2: master-bff（スキップ — Indirect access なし）

**該当なし**

### Phase 3: execution-bff

**Group A (read系)**:
1. `GET /api/v1/schemas/{schemaUuid}` — 既存シェーマ読込
2. `GET /api/v1/templates?category={category}` — テンプレート一覧取得

**Group B (write系)**:
3. `POST /api/v1/schemas` — シェーマ新規保存
4. `PUT /api/v1/schemas/{schemaUuid}` — シェーマ更新保存

### Phase 4: FE（API → Repository → Hooks）

- `getSchema.api.ts`
- `getTemplates.api.ts`
- `postSchema.api.ts`
- `putSchema.api.ts`
- `schemaRepository.ts`
- `useSchemaInit.ts`（初期化フック）
- `useSchemaActions.ts`（描画操作フック）
- `useSchemaSubmit.ts`（保存フック）

---

## 特記事項

### imageData の扱い

- **形式**: Base64エンコード済みPNG画像
- **保存先**: `tenant.trn_document.content_text` フィールド
- **注意**: 
  - `file_path` / `file_size` フィールドは使用しない
  - Base64文字列のサイズ制限を考慮する（PostgreSQL の TEXT型は 1GB まで）
  - フロントエンドで 600×600px の Canvas → Base64 PNG に変換するため、サイズは概ね 100KB〜500KB 程度

### テンプレート一覧の扱い

- **お気に入り情報**: ユーザーごとに異なる
- **実装方法**: 
  - 方法1: `tenant.rel_user_favorite_template` テーブルを JOIN
  - 方法2: `tenant.mst_document_template` に `favorite_user_ids[]` カラムを持たせる（配列型）
- **要確認**: DB 構造サマリでは `mst_document_template` テーブルの詳細が未確認のため、Phase 1 で DDL を確認する

### SOAP記録との連携

- `soapId` はリクエストに含まれるが、`tenant.trn_encounter.encounter_id` に相当する
- シェーマは「診療記録（SOAP記録）に添付される図」として扱われる
- REC001（診療記録作成）との連携が必要（カーソル位置への挿入）

---

## 生成日時

2026-05-21
