#!/usr/bin/env python3
"""
実装チェックリスト.xlsxをJSONに変換
openpyxlなしでxlsxを解析（zipとしてXMLを読む）
"""
import json
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

XLSX_PATH = "実装チェックリスト.xlsx"
OUTPUT_JSON = "checklist-data.json"

def parse_xlsx_as_zip(xlsx_path):
    """xlsxをzipとして開き、sharedStrings.xmlとsheet1.xmlを解析"""
    result = []

    with zipfile.ZipFile(xlsx_path, 'r') as z:
        # sharedStrings.xml から文字列テーブルを取得
        shared_strings = []
        try:
            with z.open('xl/sharedStrings.xml') as f:
                tree = ET.parse(f)
                root = tree.getroot()
                ns = {'': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
                for si in root.findall('.//si', ns):
                    t = si.find('.//t', ns)
                    if t is not None and t.text:
                        shared_strings.append(t.text)
                    else:
                        shared_strings.append('')
        except KeyError:
            pass

        # sheet1.xml から行データを取得
        try:
            with z.open('xl/worksheets/sheet1.xml') as f:
                tree = ET.parse(f)
                root = tree.getroot()
                ns = {'': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}

                rows = root.findall('.//row', ns)
                for row_idx, row in enumerate(rows):
                    if row_idx < 2:  # ヘッダー2行スキップ
                        continue

                    cells = row.findall('c', ns)
                    row_data = []

                    for cell in cells:
                        cell_type = cell.get('t')
                        v = cell.find('v', ns)

                        if v is not None and v.text:
                            if cell_type == 's':  # shared string
                                idx = int(v.text)
                                if idx < len(shared_strings):
                                    row_data.append(shared_strings[idx])
                                else:
                                    row_data.append('')
                            else:
                                row_data.append(v.text)
                        else:
                            row_data.append('')

                    if len(row_data) >= 5 and row_data[0]:  # 機能IDがある行のみ
                        result.append({
                            'code': row_data[0],      # 機能ID
                            'lv1': row_data[1] if len(row_data) > 1 else '',
                            'lv2': row_data[2] if len(row_data) > 2 else '',
                            'lv3': row_data[3] if len(row_data) > 3 else '',
                            'name': row_data[4] if len(row_data) > 4 else '',
                            'requirements': row_data[5] if len(row_data) > 5 else '',
                            'owner': row_data[6] if len(row_data) > 6 else '',
                        })

        except KeyError as e:
            print(f"エラー: {e}")

    return result

if __name__ == '__main__':
    script_dir = Path(__file__).parent
    xlsx_path = script_dir / XLSX_PATH
    output_path = script_dir / OUTPUT_JSON

    if not xlsx_path.exists():
        print(f"エラー: {xlsx_path} が見つかりません")
        exit(1)

    data = parse_xlsx_as_zip(xlsx_path)

    output = {
        'generatedAt': '2026-05-21T00:00:00',
        'totalItems': len(data),
        'items': data
    }

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"✓ {len(data)} 件のデータを {OUTPUT_JSON} に出力しました")
