#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
高频8000外贸商务英语词汇随身袋 - 音频自动分段、离线语音识别与牛津词典释义生成工具
"""

import json
import os
import re
import subprocess
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

WORKSPACE_DIR = Path(__file__).resolve().parent
SEGMENTS_JSON = Path("/tmp/mp3_segments.json")
CACHE_JSON = WORKSPACE_DIR / "trade_vocab_cache.json"
OUTPUT_JS = WORKSPACE_DIR / "trade_vocab_data.js"
SR_BINARY = Path("/tmp/sr_oxford")

HOMOPHONE_FIXES = {
    "buy appointment": "by appointment",
    "a point": "appoint",
    "kashmir": "cashmere",
    "moher": "mohair",
    "remy": "ramie",
    "milan velvet": "melange velvet",
    "tusa silk": "tussah silk",
    "micro suede": "microsuede",
}

CHINESE_HEADER_NOISE = {
    "e", "a", "i", "o", "u", "are", "our", "or", "er", "san", "send", "so",
    "oh", "woo", "liu", "chi", "ba", "jiu", "shi", "yi", "er", "pan", "tan"
}


def parse_oxford_entry(ox: str):
    if not ox:
        return "", ""
    pos_m = re.search(
        r"\b(noun|verb|adjective|adverb|preposition|conjunction|idiom|phrase|phrasal verb)\b",
        ox,
    )
    pos_map = {
        "noun": "n.",
        "verb": "v.",
        "adjective": "adj.",
        "adverb": "adv.",
        "preposition": "prep.",
        "conjunction": "conj.",
        "idiom": "idiom",
        "phrase": "phr.",
        "phrasal verb": "phr.v.",
    }
    pos = pos_map.get(pos_m.group(1), "") if pos_m else ""

    # Cut before example sentences (▸) if possible to get primary meanings first
    main_part = ox.split("▸")[0]
    zh_chunks = re.findall(r"[\u4e00-\u9fff]+(?:[，、；（）\u4e00-\u9fff]*[\u4e00-\u9fff]+)?", main_part)
    if not zh_chunks:
        zh_chunks = re.findall(r"[\u4e00-\u9fff]+(?:[，、；（）\u4e00-\u9fff]*[\u4e00-\u9fff]+)?", ox)

    ignore = {
        "英式", "美式", "复数", "比较级", "最高级", "过去式", "过去分词",
        "现在分词", "第三人称单数", "牛津英汉汉英词典", "正式", "非正式", "商业", "法律"
    }
    zh_clean = []
    for z in zh_chunks:
        z = z.strip("，、；（）")
        if z and z not in ignore and z not in zh_clean:
            zh_clean.append(z)
    zh = "；".join(zh_clean[:4])
    return pos, zh


def clean_segments_for_track(filename: str, raw_segs: list):
    """Filter out the initial Chinese track/section announcement segments."""
    is_track_one = re.match(r"^1[\.\s、]", filename) is not None
    min_word_start = 8.2 if is_track_one else 4.7

    words = []
    for idx, seg in enumerate(raw_segs):
        s = float(seg.get("start", 0.0))
        e = float(seg.get("end", 0.0))
        en = (seg.get("en") or "").strip()
        ipa = (seg.get("ipa") or "").strip()
        ox = (seg.get("ox") or "").strip()

        # Skip Chinese header at the beginning of the audio
        if s < min_word_start:
            continue
        if s < 14.8 and is_track_one:
            low = en.lower()
            if not low or low.startswith("part ") or low.startswith("section ") or low in CHINESE_HEADER_NOISE:
                continue
        if idx == 0:
            continue

        low = en.lower()
        if low in HOMOPHONE_FIXES:
            en = HOMOPHONE_FIXES[low]
        elif low.startswith("buy "):
            en = "by " + en[4:]

        pos, zh = parse_oxford_entry(ox)
        words.append({
            "start": round(s, 2),
            "end": round(e, 2),
            "en": en.lower() if en and not en.isupper() else en,
            "ipa": ipa,
            "pos": pos,
            "zh": zh,
        })
    return words


def export_js(mp3_list: list, cache: dict):
    """Export window.TRADE_VOCAB_DATA to trade_vocab_data.js."""
    parts_map = {}
    recognized_tracks = 0
    total_words = 0

    for item in mp3_list:
        part_name = item["part"]
        sec_name = item["section"]
        fn = item["filename"]
        rel_path = item["path"]
        dur = item["duration"]

        if part_name not in parts_map:
            parts_map[part_name] = {}
        if sec_name not in parts_map[part_name]:
            parts_map[part_name][sec_name] = []

        if rel_path in cache:
            words = cache[rel_path]
            recognized_tracks += 1
        else:
            # Fallback timestamp placeholders before ASR finishes
            is_track_one = re.match(r"^1[\.\s、]", fn) is not None
            min_s = 8.2 if is_track_one else 4.7
            words = [
                {
                    "start": round(s[0], 2),
                    "end": round(s[1], 2),
                    "en": f"Word #{i+1}",
                    "ipa": "",
                    "pos": "",
                    "zh": "点击播放原声跟读",
                }
                for i, s in enumerate([seg for seg in item["segments"] if seg[0] >= min_s])
            ]

        total_words += len(words)
        clean_title = re.sub(r"\.mp3$", "", fn, flags=re.IGNORECASE)
        parts_map[part_name][sec_name].append({
            "title": clean_title,
            "filename": fn,
            "path": rel_path,
            "duration": dur,
            "recognized": rel_path in cache,
            "words": words,
        })

    parts_out = []
    for part_name, secs_dict in parts_map.items():
        secs_out = []
        for sec_name, tracks in secs_dict.items():
            secs_out.append({
                "id": f"{part_name}_{sec_name}",
                "title": sec_name,
                "trackCount": len(tracks),
                "wordCount": sum(len(t["words"]) for t in tracks),
                "tracks": tracks,
            })
        parts_out.append({
            "title": part_name,
            "sectionCount": len(secs_out),
            "sections": secs_out,
        })

    payload = {
        "bookTitle": "高频8000外贸商务英语词汇随身袋",
        "totalTracks": len(mp3_list),
        "recognizedTracks": recognized_tracks,
        "totalWords": total_words,
        "updatedAt": time.strftime("%Y-%m-%d %H:%M:%S"),
        "parts": parts_out,
    }

    js_content = "// 高频8000外贸商务英语词汇随身袋 数据文件\nwindow.TRADE_VOCAB_DATA = " + json.dumps(payload, ensure_ascii=False, indent=2) + ";\n"
    OUTPUT_JS.write_text(js_content, encoding="utf-8")


def process_one(item):
    rel_path = item["path"]
    try:
        out = subprocess.check_output(
            [str(SR_BINARY), rel_path, json.dumps(item["segments"])],
            timeout=50,
        ).decode("utf-8", "ignore")
        raw_segs = json.loads(out)
        words = clean_segments_for_track(item["filename"], raw_segs)
        return rel_path, words
    except Exception as e:
        return rel_path, None


def main():
    with open(SEGMENTS_JSON, "r", encoding="utf-8") as f:
        mp3_list = json.load(f)

    cache = {}
    if CACHE_JSON.exists():
        try:
            cache = json.loads(CACHE_JSON.read_text(encoding="utf-8"))
        except Exception:
            cache = {}

    # Always write initial JS immediately so the webpage works right away
    export_js(mp3_list, cache)
    print(f"Initial trade_vocab_data.js exported ({len(cache)}/{len(mp3_list)} tracks cached).")

    todo = [item for item in mp3_list if item["path"] not in cache]
    if not todo:
        print("All tracks already recognized!")
        return

    t0 = time.time()
    completed = 0
    with ThreadPoolExecutor(max_workers=6) as ex:
        futures = {ex.submit(process_one, item): item for item in todo}
        for fut in as_completed(futures):
            rel_path, words = fut.result()
            completed += 1
            if words is not None:
                cache[rel_path] = words
            if completed % 10 == 0 or completed == len(todo):
                CACHE_JSON.write_text(json.dumps(cache, ensure_ascii=False), encoding="utf-8")
                export_js(mp3_list, cache)
                elapsed = time.time() - t0
                print(f"[{completed}/{len(todo)}] Updated trade_vocab_data.js ({len(cache)}/{len(mp3_list)} total, {elapsed:.1f}s)")


if __name__ == "__main__":
    main()
