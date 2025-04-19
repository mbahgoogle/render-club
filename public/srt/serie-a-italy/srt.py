import os
import json
import re
from datetime import timedelta

# Folder tempat file JSON disimpan
JSON_FOLDER = "data"
SRT_FOLDER = "srt_output"
VIDEO_DURATION = 200  # Total durasi video dalam detik
OPENING_DURATION = 2  # Durasi opening dalam detik
TOTAL_ENTRIES = 30  # Jumlah pemain dalam satu video
CONTENT_DURATION = VIDEO_DURATION - OPENING_DURATION  # Durasi tanpa opening

# Pastikan folder output ada
os.makedirs(SRT_FOLDER, exist_ok=True)

def format_time(seconds):
    """Format waktu ke SRT (HH:MM:SS,MS) dengan memastikan selalu dalam format benar"""
    t = timedelta(seconds=round(seconds, 3))
    formatted_time = str(t)[:-3].replace(".", ",")  # Format jadi HH:MM:SS,MS
    h, m, s = t.seconds // 3600, (t.seconds % 3600) // 60, t.seconds % 60
    ms = f"{t.microseconds // 1000:03d}"  # Pastikan milidetik selalu 3 digit
    return f"{h:02}:{m:02}:{s:02},{ms}"

def clean_text(text):
    """Hapus karakter tak terlihat dan non-UTF-8 serta karakter khusus tertentu"""
    # Menghapus karakter tak terlihat dan simbol yang tidak diinginkan
    text = re.sub(r"[^\x20-\x7E\u00C0-\u017F]", "", text)  # Menjaga karakter aksen dan karakter Latin lainnya
    text = re.sub(r"\s+", " ", text)  # Ganti spasi berlebih dengan satu spasi
    # Ganti karakter khusus atau simbol tidak diinginkan (contoh: tanda kutip atau simbol lainnya)
    text = text.replace("’", "'").replace("“", '"').replace("”", '"')
    return text.strip()  # Hapus spasi berlebih di awal/akhir

def generate_srt(json_file):
    """Membaca JSON dan membuat file SRT dengan format yang valid"""
    with open(json_file, "r", encoding="utf-8") as f:
        players = json.load(f)

    # Urutkan rank dari terbesar ke terkecil (rank 1 jadi paling akhir)
    players.sort(key=lambda x: x["rank"], reverse=True)

    # Ambil nama klub dari pemain pertama (asumsi semua dari klub yang sama)
    club_name = clean_text(players[0]["club"]) if players else "Unknown Club"

    srt_filename = os.path.join(SRT_FOLDER, os.path.basename(json_file).replace(".json", ".srt"))
    duration_per_entry = CONTENT_DURATION / TOTAL_ENTRIES  # Durasi tiap pemain

    with open(srt_filename, "w", encoding="utf-8") as srt_file:
        index = 1  # Nomor subtitle

        # Opening (Baris 1)
        srt_content = (
            f"{index}\n"
            "00:00:00,000 --> 00:00:02,000\n"
            f"{club_name} All-Time Top Goal Scorers\n\n"
        )
        srt_file.write(srt_content)
        index += 1  # Tambah index subtitle

        # Loop pemain (Rank terbesar ke terkecil)
        for i, player in enumerate(players[:TOTAL_ENTRIES]):
            start_seconds = OPENING_DURATION + i * duration_per_entry
            end_seconds = OPENING_DURATION + (i + 1) * duration_per_entry

            # Perbaikan: Pastikan end_time selalu lebih besar dari start_time
            if end_seconds <= start_seconds:
                print(f"⚠ WARNING: Error di baris {index} - Timestamp tidak valid ({format_time(start_seconds)} --> {format_time(end_seconds)})")
                continue  # Skip subtitle ini agar tidak error di YouTube

            srt_content = (
                f"{index}\n"
                f"{format_time(start_seconds)} --> {format_time(end_seconds)}\n"
                f"{clean_text(player['name'])} ({clean_text(player['nation'])}) - {clean_text(player['club'])}\n"
                f"Appearances: {player['appearances']} | Goals: {player['goals']} | Assists: {player['assists']}\n\n"
            )

            srt_file.write(srt_content)
            index += 1  # Tambah index subtitle

    print(f"✅ Generated: {srt_filename}")

# Loop semua file JSON di folder
for file in os.listdir(JSON_FOLDER):
    if file.endswith(".json"):
        generate_srt(os.path.join(JSON_FOLDER, file))
