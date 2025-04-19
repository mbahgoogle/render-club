import os
import json
import re
from datetime import timedelta

# Lokasi direktori
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
JSON_FOLDER = SCRIPT_DIR
SRT_FOLDER = os.path.join(SCRIPT_DIR, "srt_output")

VIDEO_DURATION = 200  # Detik
OPENING_DURATION = 2
TOTAL_ENTRIES = 30
CONTENT_DURATION = VIDEO_DURATION - OPENING_DURATION

# Kamus terjemahan multibahasa
TRANSLATIONS = {
    "en": {"title": "All-Time Top Goal Scorers", "appearances": "Appearances", "goals": "Goals", "assists": "Assists"},
    "id": {"title": "Pencetak Gol Terbanyak Sepanjang Masa", "appearances": "Penampilan", "goals": "Gol", "assists": "Asis"},
    "es": {"title": "Máximos Goleadores Históricos", "appearances": "Partidos", "goals": "Goles", "assists": "Asistencias"},
    "fr": {"title": "Meilleurs Buteurs de Tous les Temps", "appearances": "Apparitions", "goals": "Buts", "assists": "Passes décisives"},
    "de": {"title": "Rekordtorschützen Aller Zeiten", "appearances": "Einsätze", "goals": "Tore", "assists": "Vorlagen"},
    "pt": {"title": "Maiores Artilheiros de Todos os Tempos", "appearances": "Partidas", "goals": "Gols", "assists": "Assistências"},
    "it": {"title": "Migliori Marcatori di Sempre", "appearances": "Presenze", "goals": "Gol", "assists": "Assist"},
    "zh": {"title": "历史最佳射手榜", "appearances": "出场数", "goals": "进球", "assists": "助攻"},
    "ar": {"title": "أفضل الهدافين عبر التاريخ", "appearances": "الظهور", "goals": "الأهداف", "assists": "التمريرات الحاسمة"},
    "ru": {"title": "Лучшие бомбардиры всех времён", "appearances": "Матчи", "goals": "Голы", "assists": "Голевые передачи"},
    "ja": {"title": "歴代最多得点者", "appearances": "出場数", "goals": "ゴール", "assists": "アシスト"},
    "hi": {"title": "सभी समय के शीर्ष गोल स्कोरर", "appearances": "प्रदर्शन", "goals": "गोल", "assists": "असिस्ट"},
    "ko": {"title": "역대 최다 득점자", "appearances": "출전", "goals": "골", "assists": "도움"},
}

def format_time(seconds):
    """Format waktu ke SRT"""
    t = timedelta(seconds=round(seconds, 3))
    total_seconds = int(t.total_seconds())
    h, m, s = total_seconds // 3600, (total_seconds % 3600) // 60, total_seconds % 60
    ms = f"{t.microseconds // 1000:03d}"
    return f"{h:02}:{m:02}:{s:02},{ms}"

def clean_text(text):
    """Bersihkan karakter aneh atau tak terlihat"""
    text = re.sub(r"[^\x20-\x7E\u00C0-\u017F]", "", text)
    text = re.sub(r"\s+", " ", text)
    text = text.replace("’", "'").replace("“", '"').replace("”", '"')
    return text.strip()

def generate_srt(json_file, lang="en"):
    """Buat file SRT dari file JSON dalam bahasa tertentu"""
    translations = TRANSLATIONS.get(lang, TRANSLATIONS["en"])

    with open(json_file, "r", encoding="utf-8") as f:
        players = json.load(f)

    players.sort(key=lambda x: x["rank"], reverse=True)
    club_name = clean_text(players[0]["club"]) if players else "Unknown Club"

    out_dir = os.path.join(SRT_FOLDER, lang)
    os.makedirs(out_dir, exist_ok=True)
    srt_path = os.path.join(out_dir, os.path.basename(json_file).replace(".json", ".srt"))
    duration_per_entry = CONTENT_DURATION / TOTAL_ENTRIES

    with open(srt_path, "w", encoding="utf-8") as srt_file:
        index = 1
        # Opening
        srt_file.write(
            f"{index}\n"
            f"00:00:00,000 --> 00:00:02,000\n"
            f"{club_name} {translations['title']}\n\n"
        )
        index += 1

        for i, player in enumerate(players[:TOTAL_ENTRIES]):
            start_sec = OPENING_DURATION + i * duration_per_entry
            end_sec = OPENING_DURATION + (i + 1) * duration_per_entry
            if end_sec <= start_sec:
                print(f"⚠ WARNING: Skip baris {index} - waktu tidak valid")
                continue

            stats = []
            if player.get("appearances"):
                stats.append(f"{translations['appearances']}: {player['appearances']}")
            if player.get("goals"):
                stats.append(f"{translations['goals']}: {player['goals']}")
            if player.get("assists"):
                stats.append(f"{translations['assists']}: {player['assists']}")

            stats_line = " | ".join(stats)

            srt_file.write(
                f"{index}\n"
                f"{format_time(start_sec)} --> {format_time(end_sec)}\n"
                f"{clean_text(player['name'])} ({clean_text(player['nation'])}) - {clean_text(player['club'])}\n"
                f"{stats_line}\n\n"
            )
            index += 1

    print(f"✅ {lang.upper()} → {os.path.basename(srt_path)}")

# Proses semua file JSON → semua bahasa
for file in os.listdir(JSON_FOLDER):
    if file.endswith(".json"):
        full_path = os.path.join(JSON_FOLDER, file)
        for lang in TRANSLATIONS:
            generate_srt(full_path, lang=lang)
