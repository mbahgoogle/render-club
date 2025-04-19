import os
import json
import re
import chardet

def detect_encoding(filepath):
    with open(filepath, 'rb') as f:
        raw_data = f.read()
    result = chardet.detect(raw_data)
    return result['encoding']

def parse_period(period_str):
    """Ubah string menjadi list of (start, end) tuples"""
    ranges = []
    for part in period_str.split(","):
        match = re.match(r"(\d{4})-(\d{4})", part.strip())
        if match:
            start, end = map(int, match.groups())
            ranges.append((start, end))
    return sorted(ranges)

def merge_with_transition(ranges):
    """Gabungkan periode yang tersambung, tapi pisah jika transisi (tahun akhir = tahun awal periode berikutnya)"""
    if not ranges:
        return []

    merged = []
    current_start, current_end = ranges[0]

    for next_start, next_end in ranges[1:]:
        # Pisah kalau tahun akhir == tahun awal periode berikutnya (transisi)
        if current_end == next_start:
            merged.append((current_start, current_end - 1))
            current_start, current_end = next_start, next_end
        elif next_start <= current_end + 1:
            current_end = max(current_end, next_end)
        else:
            merged.append((current_start, current_end))
            current_start, current_end = next_start, next_end

    merged.append((current_start, current_end))
    return merged

def format_merged_periods(merged, original_str):
    """Kalau cuma 1 periode, kembalikan original"""
    if len(merged) == 1:
        original_clean = original_str.strip()
        if "," not in original_clean:
            return original_clean  # Biarkan format asli
    return "-".join(f"{str(start)[2:]}/{str(end)[2:]}" for start, end in merged)

def process_period_string(period_str):
    ranges = parse_period(period_str)
    merged = merge_with_transition(ranges)
    return format_merged_periods(merged, period_str)

def process_json_files():
    folder = os.path.dirname(os.path.abspath(__file__))
    for filename in os.listdir(folder):
        if filename.endswith(".json"):
            file_path = os.path.join(folder, filename)

            encoding = detect_encoding(file_path)
            with open(file_path, "r", encoding=encoding) as f:
                try:
                    data = json.load(f)
                except json.JSONDecodeError:
                    print(f"❌ Gagal memuat JSON dari {filename}")
                    continue

            changed = False

            if isinstance(data, dict):
                if "period" in data and isinstance(data["period"], str):
                    original = data["period"]
                    new_period = process_period_string(original)
                    if new_period != original:
                        data["period"] = new_period
                        changed = True

            elif isinstance(data, list):
                for item in data:
                    if isinstance(item, dict) and "period" in item and isinstance(item["period"], str):
                        original = item["period"]
                        new_period = process_period_string(original)
                        if new_period != original:
                            item["period"] = new_period
                            changed = True

            if changed:
                with open(file_path, "w", encoding="utf-8") as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)
                print(f"✅ Diubah: {filename}")
            else:
                print(f"ℹ️ Tidak berubah: {filename}")

if __name__ == "__main__":
    process_json_files()
