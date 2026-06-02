features/
│
├── 01_diagnosis/                          # LV1: 診療記録・診断管理
│   ├── 01_record-creation/                      # LV2: 診療記録作成・管理
│   │   ├── 01_examination-input/                # LV3: 診察記録入力          [REC001]
│   │   ├── 01_schema-creation/                  # LV3: シェーマ作成機能      [REC002]
│   │   ├── 02_progress-notes/                   # LV3: 経過記録記載機能      [REC003]
│   │   └── 02_handover/                         # LV3: 申し送り機能          [REC004]
│   │
│   ├── 02_medical-info-reference/               # LV2: 診療情報参照・共有・作成
│   │   ├── 01_medical-info-view/                # LV3: 診療情報参照          [REC005]
│   │   ├── 02_medication-history/               # LV3: 薬歴参照              [REC006]
│   │   ├── 03_external-viewer/                  # LV3: 外部ビューワ          [REC007]
│   │   ├── 03_test-results-view/                # LV3: 検査結果参照          [REC008]
│   │   ├── 04_external-medical-info/            # LV3: 他院診療情報参照      [REC009]
│   │   └── 05_health-checkup-view/              # LV3: 健診情報参照          [REC010]
│   │
│   ├── 02_nursing-support/                      # LV2: 看護業務支援（記録・実施）
│   │   └── 06_outpatient-overview/              # LV3: 外来カルテオーバービュー [REC011]
│   │
│   ├── 03_diagnosis-management/                 # LV2: 診断・病名管理
│   │   └── 01_disease-registration/             # LV3: 病名登録              [REC012]
│   │
│   ├── 04_document-management/                  # LV2: 文書作成・管理
│   │   ├── 01_document-creation/                # LV3: 文書作成              [REC013]
│   │   ├── 01_nutrition-plan/                   # LV3: 栄養管理計画書        [REC014]
│   │   ├── 01_medication-summary/               # LV3: 薬剤管理サマリ        [REC015]
│   │   ├── 01_nursing-document/                 # LV3: 看護支援文書作成支援  [REC016]
│   │   ├── 02_received-document/                # LV3: 受領文書取込          [REC017]
│   │   └── 03_document-mgmt/                    # LV3: 文書管理              [REC018]
│   │
│   ├── 05_interdepartmental-request/            # LV2: 他科依頼
│   │   └── 01_dept-request/                     # LV3: 他科依頼              [REC019]
│   │
│   ├── 06_patient-list/                         # LV2: 受診者一覧
│   │   └── 01_patient-list/                     # LV3: 受診者一覧            [REC020]
│   │
│   └── 01_diagnosis_shared/               # LV1 shared
│
├── 02_proxy-input/                              # LV1: 代行入力
│   ├── 01_proxy-entry/                          # LV2: 代行入力
│   │   ├── 01_proxy-input/                      # LV3: 代行入力              [PRI001]
│   │   ├── 02_proxy-approval/                   # LV3: 代行入力承認          [PRI002]
│   │   ├── 03_proxy-order/                      # LV3: 代行入力（オーダ）    [PRI003]
│   │   └── 04_proxy-rejection/                  # LV3: 代行入力差戻し        [PRI004]
│   └── 02_proxy-input_shared/                   # LV1 shared
│
├── 03_patient/                       # LV1: 患者管理
│   ├── 01_patient-basic-info/                   # LV2: 患者基本情報管理
│   │   ├── 01_patient-basic-view/               # LV3: 患者基本情報参照      [PAT001]
│   │   ├── 02_family-keyperson/                 # LV3: 家族・キーパーソン情報 [PAT002]
│   │   ├── 03_allergy-history/                  # LV3: アレルギー・既往歴管理 [PAT003]
│   │   ├── 04_lifestyle-habits/                 # LV3: 生活習慣・嗜好        [PAT004]
│   │   ├── 05_infection-disease/                # LV3: 感染症                [PAT005]
│   │   ├── 06_medical-memo/                     # LV3: 診療メモ              [PAT006]
│   │   ├── 07_acp-info/                         # LV3: ACP情報               [PAT013]
│   │   ├── 08_implant-device/                   # LV3: インプラント・デバイス情報 [PAT014]
│   │   ├── 09_vaccination/                      # LV3: 予防接種              [PAT015]
│   │   └── 10_patient-search/                   # LV3: 患者検索機能          [PAT007]
│   │
│   ├── 02_patient-security/                     # LV2: 患者情報セキュリティ
│   │   ├── 01_access-control/                   # LV3: アクセス制御          [PAT008]
│   │   └── 02_access-log/                       # LV3: アクセスログ管理      [PAT009]
│   │
│   ├── 03_patient-list/                         # LV2: 患者一覧
│   │   ├── 01_patient-list/                     # LV3: 患者一覧              [PAT010]
│   │   ├── 01_disease-patient-list/             # LV3: 指定病名使用患者一覧  [PAT011]
│   │   └── 01_treatment-patient-list/           # LV3: 指定診療行為使用患者一覧 [PAT012]
│   │
│   └── 03_patient_shared/            # LV1 shared
│
├── 04_reception/                    # LV1: 受付・予約管理
│   ├── 01_outpatient-reception/                 # LV2: 外来受付・問診
│   │   ├── 01_reception/                        # LV3: 受付処理              [REG001]
│   │   ├── 02_exam-reservation/                 # LV3: 検査予約              [REG002]
│   │   ├── 02_medical-reservation/              # LV3: 診療予約              [REG003]
│   │   └── 03_questionnaire/                    # LV3: 問診                  [REG004]
│   └── 04_reception_shared/         # LV1 shared
│
├── 05_order/                                 # LV1: オーダリング
│   ├── 01_prescription-order/                   # LV2: 処方オーダー
│   │   ├── 01_order-setting/                    # LV3: オーダー設定（リフィル処方含む） [ORD001]
│   │   ├── 01_drug-info/                        # LV3: 薬剤情報表示          [ORD002]
│   │   ├── 02_allergy-check/                    # LV3: 薬剤アレルギーチェック [ORD003]
│   │   ├── 02_contraindication-check/           # LV3: 併用禁忌チェック      [ORD004]
│   │   ├── 02_duplicate-check/                  # LV3: 重複投薬チェック      [ORD005]
│   │   ├── 02_patient-attribute-check/          # LV3: 患者属性適合性チェック [ORD006]
│   │   ├── 03_outpatient-prescription/          # LV3: 院外処方箋の電子署名・印刷 [ORD007]
│   │   ├── 04_inpatient-prescription/           # LV3: 院内処方箋の電子署名・印刷 [ORD008]
│   │   ├── 05_order-output/                     # LV3: オーダ出力帳票（処方） [ORD009]
│   │   └── 06_order-integration/                # LV3: オーダー連携（処方）  [ORD010]
│   │
│   ├── 02_injection-order/                      # LV2: 注射オーダー
│   │   ├── 01_injection-setting/                # LV3: 注射指示入力・設定    [ORD011]
│   │   ├── 02_injection-output/                 # LV3: オーダ出力帳票（注射） [ORD015]
│   │   └── 03_injection-integration/            # LV3: オーダー連携（注射）  [ORD016]
│   │
│   ├── 03_treatment-order/                      # LV2: 処置オーダー
│   │   ├── 01_treatment-setting/                # LV3: オーダー設定（処置）  [ORD017]
│   │   ├── 02_treatment-output/                 # LV3: オーダ出力帳票（処置） [ORD018]
│   │   └── 03_treatment-integration/            # LV3: オーダー連携（処置）  [ORD019]
│   │
│   ├── 04_guidance-order/                       # LV2: 指導オーダー
│   │   ├── 01_guidance-setting/                 # LV3: オーダー設定（指導）  [ORD020]
│   │   ├── 02_guidance-output/                  # LV3: オーダ出力帳票（指導） [ORD021]
│   │   └── 03_guidance-integration/             # LV3: オーダー連携（指導）  [ORD022]
│   │
│   ├── 05_specimen-order/                       # LV2: 検体検査オーダー
│   │   ├── 01_specimen-setting/                 # LV3: オーダー設定（検体）  [ORD023]
│   │   ├── 02_specimen-integration/             # LV3: オーダー連携（検体）  [ORD024]
│   │   └── 03_specimen-output/                  # LV3: オーダ出力帳票（検体） [ORD025]
│   │
│   ├── 06_physiology-order/                     # LV2: 生理検査オーダー
│   │   ├── 01_physiology-setting/               # LV3: オーダー設定（生理）  [ORD026]
│   │   ├── 02_physiology-output/                # LV3: オーダ出力帳票（生理） [ORD027]
│   │   └── 03_physiology-integration/           # LV3: オーダー連携（生理）  [ORD028]
│   │
│   ├── 07_endoscopy-order/                      # LV2: 内視鏡検査オーダー
│   │   ├── 01_endoscopy-setting/                # LV3: オーダー設定（内視鏡） [ORD029]
│   │   ├── 02_endoscopy-output/                 # LV3: オーダ出力帳票（内視鏡） [ORD030]
│   │   └── 03_endoscopy-integration/            # LV3: オーダー連携（内視鏡） [ORD031]
│   │
│   ├── 08_imaging-order/                        # LV2: 画像検査オーダー
│   │   ├── 01_imaging-setting/                  # LV3: オーダー設定（画像）  [ORD032]
│   │   ├── 02_imaging-check/                    # LV3: チェック（画像）      [ORD033]
│   │   ├── 03_imaging-output/                   # LV3: オーダ出力帳票（画像） [ORD034]
│   │   └── 04_imaging-integration/              # LV3: オーダー連携（画像）  [ORD035]
│   │
│   ├── 09_pathology-order/                      # LV2: 病理検査オーダー
│   │   ├── 01_pathology-setting/                # LV3: オーダー設定（病理）  [ORD036]
│   │   ├── 02_pathology-output/                 # LV3: オーダ出力帳票（病理） [ORD037]
│   │   └── 03_pathology-integration/            # LV3: オーダー連携（病理）  [ORD038]
│   │
│   ├── 10_bacteria-order/                       # LV2: 細菌検査オーダー
│   │   ├── 01_bacteria-setting/                 # LV3: オーダー設定（細菌）  [ORD039]
│   │   ├── 02_bacteria-output/                  # LV3: オーダ出力帳票（細菌） [ORD040]
│   │   └── 03_bacteria-integration/             # LV3: オーダー連携（細菌）  [ORD041]
│   │
│   ├── 11_general-order/                        # LV2: 汎用オーダー
│   │   ├── 01_general-setting/                  # LV3: オーダー設定（汎用）  [ORD042]
│   │   ├── 02_general-output/                   # LV3: オーダ出力帳票（汎用） [ORD043]
│   │   └── 03_general-integration/              # LV3: オーダー連携（汎用）  [ORD044]
│   │
│   ├── 12_composite-order/                      # LV2: 複合オーダー
│   │   ├── 01_composite-setting/                # LV3: オーダー設定（複合）  [ORD045]
│   │   ├── 02_composite-output/                 # LV3: オーダ出力帳票（複合） [ORD046]
│   │   └── 03_composite-integration/            # LV3: オーダー連携（複合）  [ORD047]
│   │
│   ├── 13_meal-order/                           # LV2: 食事オーダー
│   │   ├── 01_meal-setting/                     # LV3: オーダー設定（食事）  [ORD048]
│   │   ├── 02_meal-output/                      # LV3: オーダ出力帳票（食事） [ORD049]
│   │   └── 03_meal-integration/                 # LV3: オーダー連携（食事）  [ORD050]
│   │
│   ├── 14_rehabilitation-order/                 # LV2: リハビリオーダー
│   │   ├── 01_rehab-setting/                    # LV3: オーダー設定（リハビリ） [ORD051]
│   │   ├── 02_rehab-prescription/               # LV3: リハビリ処方箋        [ORD052]
│   │   ├── 03_rehab-plan/                       # LV3: リハビリ計画書        [ORD053]
│   │   └── 04_rehab-integration/                # LV3: オーダー連携（リハビリ） [ORD054]
│   │
│   ├── 15_transfusion-order/                    # LV2: 輸血オーダー
│   │   ├── 01_transfusion-setting/              # LV3: オーダー設定（輸血）  [ORD055]
│   │   └── 02_transfusion-integration/          # LV3: オーダー連携（輸血）  [ORD057]
│   │
│   ├── 16_surgery-order/                        # LV2: 手術オーダー
│   │   ├── 01_surgery-setting/                  # LV3: オーダー設定（手術）  [ORD058]
│   │   └── 02_surgery-integration/              # LV3: オーダー連携（手術）  [ORD060]
│   │
│   ├── 17_dialysis-order/                       # LV2: 透析オーダー
│   │   ├── 01_dialysis-setting/                 # LV3: オーダー設定（透析）  [ORD061]
│   │   └── 02_dialysis-integration/             # LV3: オーダー連携（透析）  [ORD063]
│   │
│   ├── 18_admission-discharge-transfer/         # LV2: 入退院・転棟オーダー
│   │   ├── 01_admission-setting/                # LV3: オーダー設定（入院）  [ORD064]
│   │   ├── 02_admission-output/                 # LV3: オーダ出力帳票（入院） [ORD065]
│   │   ├── 03_admission-integration/            # LV3: オーダー連携（入院）  [ORD066]
│   │   ├── 04_bed-period-mgmt/                  # LV3: 病床・期間管理        [ORD067]
│   │   ├── 05_discharge-setting/                # LV3: オーダー設定（退院）  [ORD068]
│   │   ├── 05_discharge-output/                 # LV3: オーダ出力帳票（退院） [ORD069]
│   │   ├── 05_discharge-integration/            # LV3: オーダー連携（退院）  [ORD070]
│   │   ├── 06_transfer-setting/                 # LV3: オーダー設定（転棟）  [ORD071]
│   │   ├── 06_transfer-output/                  # LV3: オーダ出力帳票（転棟） [ORD072]
│   │   └── 06_transfer-integration/             # LV3: オーダー連携（転棟）  [ORD073]
│   │
│   ├── 19_nursing-care-order/                   # LV2: 看護ケアオーダー
│   │   ├── 01_nursing-care-setting/             # LV3: オーダー設定（看護ケア） [ORD074]
│   │   ├── 02_nursing-care-integration/         # LV3: オーダー連携（看護ケア） [ORD075]
│   │   ├── 03_order-confirm/                    # LV3: オーダー確定          [ORD076]
│   │   └── 04_order-set-registration/           # LV3: オーダリングセット登録 [ORD077]
│   │
│   └── 05_order_shared/                      # LV1 shared
│
├── 06_exam-result/                             # LV1: 検査結果管理
│   ├── 01_result-view/                          # LV2: 検査結果参照・表示
│   │   └── 01_result-display/                   # LV3: 検査結果参照・表示    [RES001]
│   ├── 02_result-input/                         # LV2: 結果入力
│   │   ├── 01_result-entry/                     # LV3: 結果入力              [RES002]
│   │   └── 01_result-notification/              # LV3: 結果通知              [RES003]
│   ├── 03_form-output/                          # LV2: 帳票出力
│   │   └── 01_form-output/                      # LV3: 帳票出力              [RES004]
│   └── 06_exam-results_shared/                  # LV1 shared
│
├── 07_nursing/                       # LV1: 看護管理
│   ├── 01_nursing-operations/                   # LV2: 看護業務管理
│   │   ├── 01_ward-journal/                     # LV3: 病棟日誌              [NUR001]
│   │   ├── 02_nursing-mgmt-journal/             # LV3: 看護管理日誌          [NUR002]
│   │   ├── 03_hospital-journal/                 # LV3: 病院日誌              [NUR003]
│   │   └── 04_outpatient-journal/               # LV3: 外来日誌              [NUR004]
│   ├── 02_bed-utilization/                      # LV2: 空床/稼働率管理
│   │   ├── 01_vacant-bed/                       # LV3: 空床管理              [NUR005]
│   │   └── 02_utilization-rate/                 # LV3: 稼働率管理            [NUR006]
│   └── 07_nursing-management_shared/            # LV1 shared
│
├── 08_nursing-support/                          # LV1: 看護支援
│   ├── 01_bed-management/                       # LV2: 病床管理
│   │   ├── 01_move-registration/                # LV3: 移動情報登録          [NSP001]
│   │   ├── 01_staff-assignment/                 # LV3: 担当者登録・変更      [NSP002]
│   │   ├── 01_worksheet-issue/                  # LV3: ワークシート発行      [NSP003]
│   │   ├── 01_worksheet-input/                  # LV3: ワークシート実施入力  [NSP004]
│   │   └── 01_various-lists/                    # LV3: 各種一覧              [NSP005]
│   ├── 02_movement-management/                  # LV2: 移動情報管理
│   │   └── 01_admission-transfer/               # LV3: 入退院・転棟・転科等  [NSP006]
│   ├── 03_nursing-work-support/                 # LV2: 看護業務支援（記録・実施）
│   │   ├── 01_temperature-chart/                # LV3: 温度板（経過記録表）  [NSP007]
│   │   ├── 02_progress-notes/                   # LV3: 経過記録              [NSP008]
│   │   ├── 03_nursing-database/                 # LV3: 看護データベース(アナムネ) [NSP009]
│   │   ├── 04_summary/                          # LV3: サマリ                [NSP010]
│   │   └── 04_discharge-summary/                # LV3: 退院サマリ            [NSP011]
│   ├── 04_instruction-management/               # LV2: 指示管理（指示受け）
│   │   ├── 01_meal-form-mgmt/                   # LV3: 食事箋管理            [NSP012]
│   │   └── 02_inpatient-instruction/            # LV3: 入院看護指示受け      [NSP013]
│   ├── 05_inpatient-instruction/                # LV2: 入院時・入院中指示
│   │   ├── 01_admission-care-plan/              # LV3: 入院診療計画          [NSP014]
│   │   ├── 02_predictive-instruction/           # LV3: 予測指示              [NSP015]
│   │   ├── 03_brought-medication/               # LV3: 持参薬管理            [NSP016]
│   │   └── 04_meal-change/                      # LV3: 食事変更              [NSP017]
│   ├── 06_medication-injection/                 # LV2: 服薬・注射実施管理
│   │   ├── 01_medication-mgmt/                  # LV3: 服薬管理              [NSP019]
│   │   └── 02_injection-mgmt/                   # LV3: 注射管理              [NSP020]
│   ├── 07_nursing-process/                      # LV2: 看護過程
│   │   ├── 01_nursing-diagnosis/                # LV3: 看護診断              [NSP018]
│   │   ├── 02_problem-list/                     # LV3: 問題点リスト          [NSP019]
│   │   ├── 03_nursing-plan/                     # LV3: 看護計画              [NSP020]
│   │   ├── 04_nursing-intervention/             # LV3: 看護介入              [NSP021]
│   │   ├── 05_nursing-records/                  # LV3: 看護記録              [NSP022]
│   │   └── 06_nursing-evaluation/               # LV3: 看護評価              [NSP023]
│   ├── 08_nursing-evaluation/                   # LV2: 看護評価
│   │   ├── 01_nursing-degree/                   # LV3: 看護度・救護区分      [NSP024]
│   │   ├── 02_nursing-necessity/                # LV3: 看護必要度            [NSP025]
│   │   ├── 03_daily-living-eval/                # LV3: 日常生活機能評価      [NSP026]
│   │   ├── 04_medical-adl-eval/                 # LV3: 医療区分・ADL評価     [NSP027]
│   │   └── 05_urinary-check-list/               # LV3: 尿路確認リスト        [NSP028]
│   ├── 09_wound-management/                     # LV2: 傷病管理支援
│   │   ├── 01_pressure-sore-mgmt/               # LV3: 褥瘡管理              [NSP029]
│   │   ├── 01_pressure-sore-observation/        # LV3: 褥瘡観察（DESIGN-R）  [NSP030]
│   │   ├── 01_pressure-sore-plan/               # LV3: 褥瘡計画書            [NSP031]
│   │   ├── 01_risk-factor-eval/                 # LV3: 危険因子評価表        [NSP032]
│   │   ├── 01_daily-eval/                       # LV3: 日別評価表（様式46）  [NSP033]
│   │   └── 01_monthly-eval/                     # LV3: 月間評価表            [NSP034]
│   ├── 10_regulatory/                           # LV2: 制度系
│   │   ├── 01_nursing-necessity-stats/          # LV3: 看護必要度集計        [NSP035]
│   │   └── 01_medical-category-stats/           # LV3: 医療区分集計          [NSP036]
│   └── 08_nursing-support_shared/               # LV1 shared
│
├── 09_dept-instruction/                         # LV1: 部門指示受け
│   ├── 01_dept-instruction/                     # LV2: 部門指示受け
│   │   ├── 01_outpatient-nursing/               # LV3: 外来看護指示受け      [DEP001]
│   │   ├── 02_lab-instruction/                  # LV3: 検査科指示受け        [DEP002]
│   │   ├── 03_radiology-instruction/            # LV3: 放射線科指示受け      [DEP003]
│   │   ├── 04_nutrition-instruction/            # LV3: 栄養科指示受け        [DEP004]
│   │   ├── 05_surgery-transfusion/              # LV3: 手術・輸血指示受け    [DEP005]
│   │   ├── 06_pharmacy-instruction/             # LV3: 薬剤科指示受け        [DEP006]
│   │   ├── 07_rehab-instruction/                # LV3: リハビリ科指示受け    [DEP007]
│   │   ├── 08_dialysis-instruction/             # LV3: 透析指示受け          [DEP008]
│   │   ├── 09_patient-id-check/                 # LV3: 患者取り違い防止チェック [DEP009]
│   │   ├── 10_instruction-order-edit/           # LV3: 指示受け・指示元オーダ編集 [DEP010]
│   │   └── 11_endoscopy-instruction/            # LV3: 内視鏡検査科指示受け  [DEP011]
│   └── 09_dept-instruction_shared/              # LV1 shared
│
├── 10_integration-internal/                 # LV1: 外部部門システム（院内）
│   ├── 01_medical-admin/                        # LV2: 医事・事務系システム
│   │   └── 01_medical-accounting/               # LV3: 医事会計システム      [EXT001]
│   ├── 02_clinical-info-reporting/              # LV2: 診療情報・報告支援
│   │   ├── 01_form1-outpatient/                 # LV3: 様式1（外来）         [EXT002]
│   │   ├── 01_form1-inpatient/                  # LV3: 様式1（入院）         [EXT003]
│   │   └── 02_dpc/                              # LV3: DPC                   [EXT004]
│   ├── 03_medical-dept-systems/                 # LV2: 医療系部門システム
│   │   ├── 01_specimen-system/                  # LV3: 検体検査システム      [EXT005]
│   │   ├── 01_outsourced-exam/                  # LV3: 外注検査              [EXT006]
│   │   ├── 01_exam-equipment/                   # LV3: 検査機器              [EXT007]
│   │   ├── 02_pacs/                             # LV3: PACS                  [EXT008]
│   │   ├── 02_mwm/                              # LV3: MWM                   [EXT009]
│   │   ├── 02_ris/                              # LV3: RIS                   [EXT010]
│   │   ├── 03_physiology-system/                # LV3: 生理検査システム      [EXT011]
│   │   ├── 03_ecg-bone-density/                 # LV3: 心電図・骨密度        [EXT012]
│   │   ├── 04_endoscopy-system/                 # LV3: 内視鏡システム        [EXT013]
│   │   ├── 05_outsourced-bacteria/              # LV3: 外注細菌検査業者      [EXT014]
│   │   └── 05_outsourced-pathology/             # LV3: 外注病理検査業者      [EXT015]
│   ├── 04_rehab-dept/                           # LV2: リハビリ部門システム
│   │   └── 01_rehab-system/                     # LV3: リハビリシステム      [EXT018]
│   ├── 05_surgery-dialysis/                     # LV2: 手術・透析管理支援
│   │   ├── 01_dialysis-system/                  # LV3: 透析管理システム      [EXT019]
│   │   ├── 02_surgery-system/                   # LV3: 手術室管理システム    [EXT020]
│   │   └── 02_transfusion-system/               # LV3: 輸血管理システム      [EXT021]
│   ├── 06_admission-support/                    # LV2: 入退院支援
│   │   ├── 01_regional-cooperation/             # LV3: 地域連携支援システム  [EXT023]
│   │   └── 02_meal-system/                      # LV3: 給食管理システム      [EXT024]
│   ├── 07_admin-systems/                        # LV2: 事務系システム
│   │   ├── 01_health-checkup-system/            # LV3: 健診システム          [EXT025]
│   │   ├── 02_diagnosis-support/                # LV3: 診断書作成支援システム [EXT026]
│   │   └── 03_revisit-reception/                # LV3: 再来受付機            [EXT027]
│   ├── 08_hr-systems/                           # LV2: 人事管理系システム
│   │   └── 01_attendance-system/                # LV3: 出退勤システム        [EXT028]
│   ├── 09_nursing-staffing/                     # LV2: 看護業務体制・勤務管理支援
│   │   └── 01_shift-system/                     # LV3: 勤務管理システム      [EXT029]
│   ├── 10_inpatient-support/                    # LV2: 入院業務支援系システム
│   │   ├── 01_nurse-call/                       # LV3: ナースコールシステム  [EXT030]
│   │   ├── 02_monitoring-system/                # LV3: 見守りシステム        [EXT031]
│   │   ├── 03_bed-exit-detection/               # LV3: 離床検知システム      [EXT032]
│   │   └── 04_vital-system/                     # LV3: バイタルシステム      [EXT033]
│   ├── 11_auth-infrastructure/                  # LV2: 院内システム認証基盤
│   │   ├── 01_two-factor-auth/                  # LV3: 二要素認証            [EXT034]
│   │   └── 01_sso/                              # LV3: シングルサインオン    [EXT035]
│   ├── 12_user-auth-mgmt/                       # LV2: ユーザー・認証管理
│   │   ├── 01_user-management/                  # LV3: ユーザー管理          [EXT036]
│   │   └── 01_access-control/                   # LV3: アクセス制御          [EXT037]
│   └── 10_integration-internal_shared/      # LV1 shared
│
├── 11_integration-external/                 # LV1: 外部部門システム（院外）
│   ├── 01_regional-external/                    # LV2: 地域・外部連携
│   │   └── 01_care-system/                      # LV3: 介護システム          [EXO001]
│   ├── 02_regional-medical-network/             # LV2: 地域医療情報ネットワーク
│   │   └── 01_regional-network/                 # LV3: 地域医療情報ネットワーク [EXO002]
│   ├── 03_national-platform/                    # LV2: 全国医療情報プラットフォーム
│   │   ├── 01_online-eligibility/               # LV3: オンライン資格確認    [EXO003]
│   │   ├── 02_e-prescription-mgmt/              # LV3: 電子処方箋管理        [EXO004]
│   │   ├── 03_e-chart-sharing/                  # LV3: 電子カルテ共有サービス [EXO005]
│   │   └── 04_specific-checkup/                 # LV3: 特定健診              [EXO006]
│   ├── 04_home-care/                            # LV2: 在宅診療看護連携支援
│   │   └── 01_home-mgmt/                        # LV3: 在宅管理システム      [EXO007]
│   ├── 05_medical-safety/                       # LV2: 医療安全管理
│   │   └── 01_incident-report/                  # LV3: インシデント報告      [EXO008]
│   └── 11_integration-external_shared/      # LV1 shared
│
├── 12_karte-core/                                 # LV1: 電子カルテ共通基盤
│   ├── 01_common-infrastructure/                # LV2: 共通基盤
│   │   ├── 01_auth/                             # LV3: 認証・認可            [PLT001]
│   │   ├── 02_help/                             # LV3: ヘルプ機能            [PLT002]
│   │   ├── 03_notification/                     # LV3: お知らせ・通知        [PLT003]
│   │   ├── 04_error-control/                    # LV3: エラーメッセージ制御  [PLT004]
│   │   ├── 05_log-mgmt/                         # LV3: ログ管理              [PLT005]
│   │   ├── 06_time-mgmt/                        # LV3: 時間管理              [PLT006]
│   │   ├── 07_print/                            # LV3: 印刷機能              [PLT007]
│   │   ├── 08_file-attachment/                  # LV3: ファイル添付／参照    [PLT008]
│   │   ├── 09_calendar/                         # LV3: カレンダー・日付選択  [PLT009]
│   │   └── 10_search-filter/                    # LV3: 検索・フィルタリング  [PLT010]
│   ├── 02_information-sharing/                  # LV2: 情報共有・掲示
│   │   ├── 01_bulletin-board/                   # LV3: 掲示板                [PLT011]
│   │   ├── 01_memo/                             # LV3: 伝言メモ              [PLT012]
│   │   ├── 02_sticky-note/                      # LV3: 付箋機能              [PLT013]
│   │   └── 02_todo/                             # LV3: TODO（付箋）          [PLT014]
│   ├── 03_communication/                        # LV2: コミュニケーション
│   │   └── 01_chat/                             # LV3: チャット              [PLT015]
│   └── 12_karte-core_shared/                      # LV1 shared
│
├── 13_karte-option/                         # LV1: 電子カルテ共通基盤(Harz外オプション)
│   ├── 01_communication/                        # LV2: コミュニケーション
│   │   ├── 01_scheduler/                        # LV3: スケジューラ          [PLO063]
│   │   └── 02_presence/                         # LV3: プレゼンス機能        [PLO064]
│   └── 13_karte-option_shared/              # LV1 shared
│
├── 14_analytics/                           # LV1: データウェアハウス(統計)
│   ├── 01_clinical-stats/                       # LV2: 診療統計
│   │   ├── 01_order-stats/                      # LV3: オーダー統計          [DWH001]
│   │   ├── 01_meal-stats/                       # LV3: 食事集計              [DWH002]
│   │   ├── 02_disease-stats/                    # LV3: 病名統計              [DWH003]
│   │   ├── 03_document-status/                  # LV3: 文書ステータス管理    [DWH003]
│   │   ├── 04_outpatient-count/                 # LV3: 外来患者数集計        [DWH004]
│   │   ├── 04_generic-rate/                     # LV3: ジェネリック使用率    [DWH005]
│   │   ├── 04_disease-classification/           # LV3: 疾患分類表統計        [DWH006]
│   │   ├── 04_radiation-dose/                   # LV3: 被ばく線量管理        [DWH007]
│   │   └── 04_disease-count-output/             # LV3: 指定病名件数出力      [DWH008]
│   ├── 02_management/                           # LV2: 経営系
│   │   ├── 01_wait-time-analysis/               # LV3: 診療時間・待ち時間分析 [DWH011]
│   │   └── 02_hospital-stats/                   # LV3: 病院統計              [DWH012]
│   ├── 03_data-integration/                     # LV2: データ連携
│   │   └── 01_chart-reference/                  # LV3: カルテ参照            [DWH013]
│   └── 14_analytics_shared/                # LV1 shared
│
├── 15_security/                                 # LV1: セキュリティ/アクセス管理（院内システム全体）
│   ├── 01_audit-log/                            # LV2: 操作・監査ログ管理
│   │   └── 01_log-mgmt/                         # LV3: ログ管理              [SEC001]
│   ├── 02_alert-settings/                       # LV2: 通知・監視・アラート設定
│   │   └── 01_alert-setting/                    # LV3: 通知・アラート設定    [SEC002]
│   ├── 03_system-config/                        # LV2: システム設定・パラメータ管理
│   │   └── 01_parameter-setting/                # LV3: 各種パラメーター設定  [SEC003]
│   ├── 04_interface-mgmt/                       # LV2: 外部接続・インターフェース管理
│   │   └── 01_interface-mgmt/                   # LV3: インターフェース管理  [SEC004]
│   └── 15_security_shared/                      # LV1 shared
│
└── 16_ui-common/                              # LV1: メニュー・共通ヘッダ
    ├── 01_menu-header/                          # LV2: メニュー・共通ヘッダ
    │   ├── 01_login/                            # LV3: ログイン画面          [ETC001]
    │   ├── 01_menu/                             # LV3: メニュー面            [ETC002]
    │   ├── 01_patient-header/                   # LV3: 患者情報ヘッダ表示    [ETC003]
    │   ├── 01_left-sidemenu/                    # LV3: カルテ画面左サイドメニュー [ETC004]
    │   ├── 01_right-sidemenu/                   # LV3: カルテ画面右サイドメニュー [ETC005]
    │   └── 01_user-header/                      # LV3: ユーザーヘッダ表示    [ETC006]
    └── 16_ui-common_shared/                   # LV1 shared
