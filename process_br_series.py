#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
巴西电视剧 / 电影原声提取与《大学葡萄牙语 1》单元自动匹配工具
======================================================================
功能说明：
1. 扫描 `videos/` 目录下的巴西电视剧/电影文件（支持 .mp4, .mkv, .webm, .mov, .mp3, .wav, .m4a）
2. 自动读取同名葡语字幕（.srt / .vtt / .ass）；若无字幕文件，可自动调用 Whisper 语音识别生成带时间戳的台词
3. 解析 `course_data.js` 中全书 14 个单元的核心词汇（含巴葡异形词如 você, ônibus, celular, trem, moça 等）与句型
4. 计算每句台词与各单元的匹配度，筛选最适合跟读的台词片段（1.2秒 ~ 9秒）
5. 调用 `ffmpeg` 自动切出原声音频片段，保存至 `audio/br_clips/`，并自动更新 `br_clips_data.js`

使用方法：
  方式 A（推荐：视频/音频 + 葡语字幕 .srt/.vtt，秒级完成）：
    将 `S01E01.mp4` 和 `S01E01.srt` 放入 `videos/` 文件夹，然后运行：
    python3 process_br_series.py --series "Coisa Mais Linda"

  方式 B（仅视频/音频，无字幕文件，使用 Whisper 自动语音转写）：
    python3 process_br_series.py --series "Avenida Brasil" --whisper-model base
"""

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path
from typing import Dict, List, Optional, Tuple

WORKSPACE_DIR = Path(__file__).resolve().parent
VIDEOS_DIR = WORKSPACE_DIR / "videos"
OUTPUT_CLIPS_DIR = WORKSPACE_DIR / "audio" / "br_clips"
COURSE_DATA_JS = WORKSPACE_DIR / "course_data.js"
BR_CLIPS_DATA_JS = WORKSPACE_DIR / "br_clips_data.js"

MEDIA_EXTENSIONS = {".mp4", ".mkv", ".webm", ".mov", ".avi", ".mp3", ".wav", ".m4a", ".aac", ".ogg"}
SUB_EXTENSIONS = [".pt.srt", ".br.srt", ".pt-BR.srt", ".srt", ".pt.vtt", ".vtt", ".ass"]

# Stopwords to ignore when scoring unit-specific vocabulary matches
PT_STOPWORDS = {
    "a", "o", "as", "os", "um", "uma", "de", "do", "da", "dos", "das",
    "em", "no", "na", "nos", "nas", "por", "para", "pra", "com", "sem",
    "e", "ou", "mas", "que", "se", "não", "sim", "é", "são", "foi",
    "eu", "tu", "ele", "ela", "nós", "eles", "elas", "me", "te", "se",
    "meu", "minha", "seu", "sua", "isto", "isso", "muito", "mais", "já"
}

# Unit-specific bonus keywords (including Brazilian Portuguese equivalents)
UNIT_BONUS_KEYWORDS: Dict[str, List[str]] = {
    "intro": ["oi", "olá", "bom dia", "boa tarde", "boa noite", "tchau", "obrigado", "obrigada", "por favor", "com licença", "desculpa"],
    "u1": ["nome", "chamo", "chama", "sou", "estudante", "professor", "português", "brasileiro", "chinês", "prazer", "você"],
    "u2": ["tudo bem", "como está", "estou bem", "família", "pai", "mãe", "irmão", "irmã", "amigo", "amiga", "moça", "bonita", "alto"],
    "u3": ["moro", "mora", "morar", "apartamento", "casa", "quarto", "sala", "cozinha", "banheiro", "rua", "cidade", "perto", "longe"],
    "u4": ["fazendo", "trabalhando", "estudando", "falando", "comendo", "escritório", "trabalho", "banco", "hospital", "universidade"],
    "u5": ["horas", "acordo", "acorda", "café da manhã", "almoço", "jantar", "todos os dias", "sempre", "cedo", "tarde", "dormir"],
    "u6": ["restaurante", "cardápio", "cafezinho", "suco", "cerveja", "água", "carne", "peixe", "frango", "conta", "sorvete", "delícia"],
    "u7": ["tempo", "chovendo", "chuva", "sol", "calor", "frio", "vento", "verão", "inverno", "primavera", "outono", "temperatura"],
    "u8": ["celular", "telefone", "ligar", "alô", "ônibus", "trem", "metrô", "táxi", "aeroporto", "avião", "passagem", "viagem"],
    "u9": ["quanto custa", "preço", "comprar", "loja", "shopping", "roupa", "vestido", "camisa", "sapato", "barato", "caro", "reais"],
    "u10": ["ontem", "passado", "fui", "foi", "fiz", "fez", "vi", "disse", "cinema", "festa", "fim de semana", "a gente"],
    "u11": ["médico", "hospital", "dor", "cabeça", "febre", "gripe", "remédio", "farmácia", "doente", "saúde", "sentindo"],
    "u12": ["quando era", "criança", "morava", "ia", "tinha", "costumava", "antigamente", "lembro", "época", "escola"],
    "u13": ["onde fica", "estação", "banco", "correio", "direita", "esquerda", "semáforo", "esquina", "atravessar", "quadra"],
    "u14": ["futuro", "próximo", "ano novo", "natal", "feriado", "férias", "espero", "parabéns", "feliz", "sucesso", "sonho"],
}


def tokenize_pt(text: str) -> List[str]:
    return re.findall(r"[a-zà-öø-ÿ]+(?:-[a-zà-öø-ÿ]+)*", text.lower())


def load_unit_lexicon() -> Dict[str, Dict[str, float]]:
    """Build weighted keyword dictionary for each unit from course_data.js + UNIT_BONUS_KEYWORDS."""
    unit_weights: Dict[str, Dict[str, float]] = {}

    for uid, words in UNIT_BONUS_KEYWORDS.items():
        unit_weights[uid] = {}
        for w in words:
            unit_weights[uid][w.lower()] = 3.0

    if COURSE_DATA_JS.exists():
        raw = COURSE_DATA_JS.read_text(encoding="utf-8")
        # Extract unit blocks roughly by id: "u1", etc.
        unit_matches = list(re.finditer(r'id:\s*"([a-z0-9_]+)"', raw))
        for idx, m in enumerate(unit_matches):
            uid = m.group(1)
            if uid not in unit_weights:
                unit_weights[uid] = {}
            start = m.start()
            end = unit_matches[idx + 1].start() if idx + 1 < len(unit_matches) else len(raw)
            block = raw[start:end]

            # Extract vocab pt words in this unit
            for vm in re.finditer(r'\{\s*pt:\s*"([^"]+)"', block):
                raw_pt = vm.group(1)
                clean_pt = re.sub(r"\(.*?\)", "", raw_pt).split("/")[0].strip().lower()
                if clean_pt and clean_pt not in PT_STOPWORDS and len(clean_pt) > 2:
                    unit_weights[uid][clean_pt] = max(unit_weights[uid].get(clean_pt, 0.0), 2.5)
                for tok in tokenize_pt(clean_pt):
                    if tok not in PT_STOPWORDS and len(tok) > 2:
                        unit_weights[uid][tok] = max(unit_weights[uid].get(tok, 0.0), 1.8)

    return unit_weights


def parse_timestamp(ts: str) -> float:
    """Parse SRT/VTT timestamp like 00:04:12,340 or 04:12.340 into seconds."""
    ts = ts.strip().replace(",", ".")
    parts = ts.split(":")
    if len(parts) == 3:
        return int(parts[0]) * 3600 + int(parts[1]) * 60 + float(parts[2])
    elif len(parts) == 2:
        return int(parts[0]) * 60 + float(parts[1])
    return float(parts[0])


def format_timestamp(sec: float) -> str:
    sec = max(0.0, sec)
    h = int(sec // 3600)
    m = int((sec % 3600) // 60)
    s = int(sec % 60)
    return f"{h:02d}:{m:02d}:{s:02d}"


def parse_subtitle_file(sub_path: Path) -> List[Dict]:
    """Parse .srt or .vtt subtitle file into [{'start': float, 'end': float, 'pt': str, 'zh': str}]."""
    raw = sub_path.read_text(encoding="utf-8", errors="replace")
    raw = raw.replace("\r\n", "\n")
    segments = []

    blocks = re.split(r"\n\s*\n", raw)
    time_re = re.compile(r"(\d{1,2}:\d{2}:\d{2}[,.]\d{1,3}|\d{2}:\d{2}[,.]\d{1,3})\s*-->\s*(\d{1,2}:\d{2}:\d{2}[,.]\d{1,3}|\d{2}:\d{2}[,.]\d{1,3})")

    for b in blocks:
        lines = [ln.strip() for ln in b.strip().split("\n") if ln.strip()]
        if not lines:
            continue
        tm_idx = -1
        tm_match = None
        for i, ln in enumerate(lines):
            m = time_re.search(ln)
            if m:
                tm_idx = i
                tm_match = m
                break
        if tm_match is None:
            continue

        start_sec = parse_timestamp(tm_match.group(1))
        end_sec = parse_timestamp(tm_match.group(2))
        text_lines = lines[tm_idx + 1:]
        # Clean HTML/ASS tags and hearing-impaired brackets
        cleaned_lines = []
        for tl in text_lines:
            tl = re.sub(r"<[^>]+>", "", tl)
            tl = re.sub(r"\{[^}]+\}", "", tl)
            tl = re.sub(r"\[[^\]]+\]", "", tl).strip()
            if tl:
                cleaned_lines.append(tl)

        if not cleaned_lines:
            continue

        # Support bilingual subtitles (Portuguese + Chinese) if present
        pt_parts = []
        zh_parts = []
        for tl in cleaned_lines:
            if re.search(r"[\u4e00-\u9fff]", tl):
                zh_parts.append(tl)
            else:
                pt_parts.append(tl)

        pt_text = " ".join(pt_parts).strip()
        zh_text = " ".join(zh_parts).strip()
        if pt_text:
            segments.append({
                "start": start_sec,
                "end": end_sec,
                "pt": pt_text,
                "zh": zh_text
            })

    return segments


def transcribe_with_whisper(media_path: Path, model_name: str = "base") -> List[Dict]:
    """Fallback when no .srt file is provided: transcribe Brazilian Portuguese audio via faster-whisper or openai-whisper."""
    print(f"🎙️ 未找到字幕文件，正在使用 Whisper ({model_name}) 自动识别巴剧语音: {media_path.name} ...")
    try:
        from faster_whisper import WhisperModel
        model = WhisperModel(model_name, device="cpu", compute_type="int8")
        segs, _ = model.transcribe(str(media_path), language="pt", beam_size=5, vad_filter=True)
        out = []
        for s in segs:
            txt = s.text.strip()
            if txt:
                out.append({"start": float(s.start), "end": float(s.end), "pt": txt, "zh": ""})
        return out
    except ImportError:
        pass

    try:
        import whisper
        model = whisper.load_model(model_name)
        res = model.transcribe(str(media_path), language="pt")
        out = []
        for s in res.get("segments", []):
            txt = s.get("text", "").strip()
            if txt:
                out.append({"start": float(s["start"]), "end": float(s["end"]), "pt": txt, "zh": ""})
        return out
    except ImportError:
        print("⚠️ 未安装 faster-whisper 或 openai-whisper。请为视频放入同名 .srt 字幕文件，或运行: pip install faster-whisper")
        return []


def match_segment_to_units(pt_text: str, unit_lexicon: Dict[str, Dict[str, float]]) -> List[Tuple[str, float, List[str]]]:
    """Score a Portuguese subtitle segment against all textbook units."""
    lower_text = pt_text.lower()
    tokens = set(tokenize_pt(lower_text))
    if len(tokens) < 3 or len(tokens) > 20:
        return []

    results = []
    for uid, weights in unit_lexicon.items():
        score = 0.0
        matched = []
        for kw, w in weights.items():
            if " " in kw:
                if kw in lower_text:
                    score += w * 1.5
                    matched.append(kw)
            else:
                if kw in tokens:
                    score += w
                    matched.append(kw)
        if score >= 3.5 and matched:
            # Deduplicate matched words preserving order
            uniq_matched = []
            for m in matched:
                if m not in uniq_matched:
                    uniq_matched.append(m)
            results.append((uid, score, uniq_matched[:4]))

    results.sort(key=lambda x: x[1], reverse=True)
    return results


def slice_audio_clip(media_path: Path, start_sec: float, end_sec: float, out_mp3: Path, pad_before: float = 0.2, pad_after: float = 0.3) -> bool:
    """Use ffmpeg to slice a clean normalized MP3 clip from the video/audio file."""
    if not shutil.which("ffmpeg"):
        print("⚠️ 未检测到 ffmpeg，跳过音频切片。")
        return False

    OUTPUT_CLIPS_DIR.mkdir(parents=True, exist_ok=True)
    actual_start = max(0.0, start_sec - pad_before)
    duration = max(1.0, (end_sec + pad_after) - actual_start)

    cmd = [
        "ffmpeg", "-y",
        "-ss", f"{actual_start:.3f}",
        "-i", str(media_path),
        "-t", f"{duration:.3f}",
        "-vn",
        "-acodec", "libmp3lame",
        "-ac", "1",
        "-ar", "44100",
        "-b:a", "128k",
        "-af", "loudnorm=I=-16:TP=-1.5:LRA=11",
        str(out_mp3)
    ]
    res = subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return res.returncode == 0 and out_mp3.exists()


def load_existing_br_clips() -> Dict[str, List[Dict]]:
    if not BR_CLIPS_DATA_JS.exists():
        return {}
    raw = BR_CLIPS_DATA_JS.read_text(encoding="utf-8")
    m = re.search(r"window\.BR_CLIPS_DATA\s*=\s*(\{.*\})\s*;?\s*$", raw, re.DOTALL)
    if not m:
        return {}
    js_obj = m.group(1)
    # Convert JS object keys to valid JSON if needed
    js_obj_fixed = re.sub(r"(?m)^\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:", r'"\1":', js_obj)
    js_obj_fixed = re.sub(r",\s*([}\]])", r"\1", js_obj_fixed)
    try:
        return json.loads(js_obj_fixed)
    except Exception:
        return {}


def save_br_clips_js(data: Dict[str, List[Dict]]) -> None:
    content = (
        "// Authentic Brazilian TV Series Dialogue Clips & Unit Matcher Dataset\n"
        "// Automatically updated by `python3 process_br_series.py`\n"
        "window.BR_CLIPS_DATA = "
        + json.dumps(data, ensure_ascii=False, indent=2)
        + ";\n"
    )
    BR_CLIPS_DATA_JS.write_text(content, encoding="utf-8")


def find_matching_subtitle(media_path: Path) -> Optional[Path]:
    stem = media_path.with_suffix("")
    for ext in SUB_EXTENSIONS:
        candidate = Path(str(stem) + ext)
        if candidate.exists():
            return candidate
    return None


def main():
    parser = argparse.ArgumentParser(description="从巴西电视剧提取原声并自动匹配《大学葡萄牙语 1》单元")
    parser.add_argument("--videos-dir", default=str(VIDEOS_DIR), help="存放巴剧视频/音频与字幕的目录 (默认: ./videos)")
    parser.add_argument("--series", default="巴西剧集原声", help="剧集名称标签，例如 'Coisa Mais Linda'")
    parser.add_argument("--max-per-unit", type=int, default=5, help="每个单元最多切出的巴剧原声片段数 (默认: 5)")
    parser.add_argument("--whisper-model", default="base", help="无字幕时使用的 Whisper 模型大小 (tiny/base/small/medium)")
    args = parser.parse_args()

    vdir = Path(args.videos_dir)
    vdir.mkdir(parents=True, exist_ok=True)
    OUTPUT_CLIPS_DIR.mkdir(parents=True, exist_ok=True)

    media_files = sorted([p for p in vdir.iterdir() if p.is_file() and p.suffix.lower() in MEDIA_EXTENSIONS])
    if not media_files:
        print("======================================================================")
        print(f"📂 当前 `{vdir}` 文件夹为空。")
        print("👉 请将你下载的巴西电视剧/电影文件（.mp4 / .mkv / .mp3）及葡语字幕（.srt / .vtt）放入：")
        print(f"   {vdir}")
        print("👉 然后重新运行：")
        print(f"   python3 process_br_series.py --series \"剧集名称\"")
        print("======================================================================")
        return

    unit_lexicon = load_unit_lexicon()
    existing_data = load_existing_br_clips()
    unit_candidates: Dict[str, List[Tuple[float, Dict]]] = {uid: [] for uid in unit_lexicon}

    for media_path in media_files:
        ep_label = media_path.stem
        sub_path = find_matching_subtitle(media_path)
        if sub_path:
            print(f"📖 正在解析字幕: {sub_path.name} (对应视频: {media_path.name})")
            segments = parse_subtitle_file(sub_path)
        else:
            segments = transcribe_with_whisper(media_path, args.whisper_model)

        print(f"   共读取到 {len(segments)} 条台词，正在匹配《大学葡萄牙语 1》14 个单元词汇...")
        for seg in segments:
            dur = seg["end"] - seg["start"]
            if dur < 1.0 or dur > 10.0:
                continue
            matches = match_segment_to_units(seg["pt"], unit_lexicon)
            for uid, score, matched_words in matches[:2]:
                unit_candidates[uid].append((
                    score,
                    {
                        "media_path": media_path,
                        "series": args.series,
                        "episode": ep_label,
                        "start": seg["start"],
                        "end": seg["end"],
                        "timeRange": f"{format_timestamp(seg['start'])} - {format_timestamp(seg['end'])}",
                        "pt": seg["pt"],
                        "zh": seg["zh"] or "（巴剧原声台词 · 点击上方单词可逐词点读）",
                        "matchedWords": matched_words,
                    }
                ))

    total_sliced = 0
    for uid, cand_list in unit_candidates.items():
        if not cand_list:
            continue
        # Sort by highest match score and deduplicate by Portuguese text
        cand_list.sort(key=lambda x: x[0], reverse=True)
        seen_texts = set()
        selected = []
        for score, item in cand_list:
            norm = item["pt"].lower()
            if norm in seen_texts:
                continue
            seen_texts.add(norm)
            selected.append(item)
            if len(selected) >= args.max_per_unit:
                break

        if uid not in existing_data:
            existing_data[uid] = []

        for idx, item in enumerate(selected, start=1):
            safe_ep = re.sub(r"[^a-zA-Z0-9_-]", "_", item["episode"])[:24]
            mp3_name = f"{uid}_{safe_ep}_{idx:02d}.mp3"
            out_mp3 = OUTPUT_CLIPS_DIR / mp3_name
            rel_mp3 = f"audio/br_clips/{mp3_name}"

            ok = slice_audio_clip(item["media_path"], item["start"], item["end"], out_mp3)
            clip_entry = {
                "series": item["series"],
                "episode": item["episode"],
                "timeRange": item["timeRange"],
                "pt": item["pt"],
                "zh": item["zh"],
                "matchedWords": item["matchedWords"],
                "note": f"自动从 {item['episode']} 提取的巴剧实景原声",
                "audioFile": rel_mp3 if ok else ""
            }
            # Prepend newly extracted real-audio clips to the front of the unit's list
            if not any(c.get("pt") == clip_entry["pt"] for c in existing_data[uid]):
                existing_data[uid].insert(0, clip_entry)
                if ok:
                    total_sliced += 1
                    print(f"  ✂️ [{uid}] 已切出原声片段: {rel_mp3} | \"{item['pt']}\" (命中: {', '.join(item['matchedWords'])})")

    save_br_clips_js(existing_data)
    print("======================================================================")
    print(f"✅ 处理完成！共切出 {total_sliced} 段巴西剧集原声 MP3，已写入 `br_clips_data.js`。")
    print("👉 现在刷新网页，即可在各课的「🎬 巴剧原声实景片段」卡片中直接点击播放！")
    print("======================================================================")


if __name__ == "__main__":
    main()
