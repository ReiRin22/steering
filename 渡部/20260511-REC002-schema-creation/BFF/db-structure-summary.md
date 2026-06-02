# DB 構造サマリ — REC002 シェーマ作成

## スキーマ構成

```
PostgreSQL DB: emr
├── cmn スキーマ      ── 全テナント共通・読み取り専用
├── sys スキーマ      ── プラットフォーム管理・読み取り専用
├── t_{org_code} スキーマ  ── テナント個別・読み書き可能
```

---

## cmn スキーマ（全テナント共通・読み取り専用）

REC002（シェーマ作成）で使用する可能性のあるマスタテーブル:

| テーブル | 論理名 | 用途 |
|---|---|---|
| `cmn.mst_code` | 汎用コードマスタ | 共通コード（単位・ステータス等） |
| `cmn.mst_code_type` | コード種別マスタ | コード分類定義 |
| `cmn.mst_standard_disease` | 標準病名マスタ | ICD-10 ベースの病名 |
| `cmn.mst_icd10` | ICD-10 マスタ | WHO 標準病名コード |

---

## tenant スキーマ（テナント個別・読み書き）

### マスタテーブル

| テーブル | 論理名 | 用途 | 操作推定 |
|---|---|---|---|
| `tenant.mst_patient` | 患者マスタ | 患者基本情報 | SELECT |
| `tenant.mst_organization` | 組織マスタ | 医療機関情報 | SELECT |
| `tenant.mst_department` | 部門マスタ | 診療科情報 | SELECT |
| `tenant.mst_doctor` | 医師マスタ | 医師情報 | SELECT |
| `tenant.mst_document_type` | 文書種別マスタ | 文書分類定義 | SELECT |
| `tenant.mst_document_template` | 文書テンプレートマスタ | テンプレート定義 | SELECT |
| `tenant.mst_clinical_note_type` | 診療記録種別マスタ | 記録分類定義 | SELECT |

### トランザクションテーブル（REC002 関連）

| テーブル | 論理名 | 用途 | 操作推定 |
|---|---|---|---|
| `tenant.trn_encounter` | 受診・入院エピソード | 患者の1回の受診または入院 | SELECT/INSERT/UPDATE |
| `tenant.trn_document` | 文書管理トラン | 各種文書（診療記録、同意書等） | SELECT/INSERT/UPDATE |
| `tenant.trn_clinical_record` | 診療記録トラン | 診療経過記録 | SELECT/INSERT/UPDATE |

### 履歴テーブル（自動記録）

| テーブル | 論理名 | 用途 |
|---|---|---|
| `tenant.his_clinical_record` | 診療記録履歴 | trn_clinical_record の変更履歴（トリガー自動記録） |

---

## FK 依存関係

```
tenant.trn_clinical_record
  ├─→ tenant.trn_encounter (encounter_id)
  └─→ tenant.trn_document (document_id) ※ document として保存する場合

tenant.trn_encounter
  ├─→ tenant.mst_organization (organization_id)
  ├─→ tenant.mst_patient (patient_id)
  ├─→ tenant.mst_department (department_code)
  └─→ tenant.mst_doctor (attending_doctor_id)

tenant.trn_document
  ├─→ tenant.mst_patient (patient_id)
  └─→ tenant.trn_encounter (encounter_id)
```

**実装順序推定**:
1. **cmn マスタ GET APIs** — 最優先（BFF 初期化時に必要）
   - `cmn.mst_code`（共通コード）
   - `cmn.mst_standard_disease`（標準病名）※ シェーマ作成で病名入力がある場合
2. **tenant マスタ GET APIs** — FK なしのテーブルから
   - `tenant.mst_organization`
   - `tenant.mst_patient`
   - `tenant.mst_department`
   - `tenant.mst_doctor`
   - `tenant.mst_document_type`
3. **tenant トランザクション GET APIs** — 親テーブル実装後
   - `tenant.trn_encounter`（患者・診療科等のマスタ参照）
4. **tenant トランザクション POST/PUT APIs** — 最後
   - `tenant.trn_document`（encounter 参照）
   - `tenant.trn_clinical_record`（encounter・document 参照）

---

## PostgreSQL 操作推定ルール

| プレフィックス | 操作推定 | 複雑度 |
|---|---|---|
| `mst_*` | SELECT（マスタ参照） | Simple-Medium |
| `trn_*` | INSERT/UPDATE/DELETE（トランザクション） | Medium-Complex |
| `his_*` | INSERT のみ（自動記録、直接操作禁止） | N/A（アプリからは操作しない） |
| `rel_*` | INSERT/DELETE（関連） | Simple |

---

## REC002 シェーマ作成の想定シナリオ

1. **シェーマ新規作成**:
   - `POST /api/v1/clinical-records` → `INSERT INTO tenant.trn_clinical_record`
   - `POST /api/v1/documents` → `INSERT INTO tenant.trn_document`（シェーマを document として保存）
   
2. **既存シェーマの読み込み**:
   - `GET /api/v1/clinical-records/{recordId}` → `SELECT * FROM tenant.trn_clinical_record WHERE record_id = ?`
   - `GET /api/v1/clinical-records?encounterId={encounterId}` → `SELECT * FROM tenant.trn_clinical_record WHERE encounter_id = ?`

3. **シェーマの保存（上書き）**:
   - `PUT /api/v1/clinical-records/{recordId}` → `UPDATE tenant.trn_clinical_record SET ... WHERE record_id = ?`
   - 履歴: `his_clinical_record` へ自動記録（トリガー）

---

## スキーマ権限ルール

| ロール | 対象スキーマ | 権限 |
|---|---|---|
| `role_app_{org_code}` | `t_{org_code}` | 読み書き |
| `role_app_{org_code}` | `cmn` | 読み取りのみ |
| `role_app_{org_code}` | `sys` | 読み取りのみ |

**BE 実装の制約**:
- `cmn` / `sys` スキーマへの INSERT/UPDATE/DELETE は実装しない
- テナント接続時は `search_path = t_{org_code}, cmn, sys, public` を設定
- 履歴テーブル（`his_*`）への直接操作は禁止（トリガー自動記録のみ）

---

## 生成日時

2026-05-21
