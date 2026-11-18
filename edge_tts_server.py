#!/usr/bin/env python3
"""
零依赖微软 Edge-TTS 巴葡/欧葡 神经网络语音 + 巴葡发音纠音 Agent 本地服务
支持功能：
  1. GET  /tts             - 微软 Edge-TTS 巴葡/欧葡神经网络语音合成与本地缓存
  2. GET  /api/coach_status - 发音教练服务健康检查与最新录音元数据
  3. POST /api/save_recording - 接收网页麦克风录音，自动用 ffmpeg 转为 16kHz 单声道 WAV
                                保存至 audio/my_recordings/latest.wav，并与巴葡标准音做声学对比
  4. POST /api/gemini_assess  - (可选) 调用 Gemini 原生多模态音频 API 对真实录音进行音素级听音纠音

用法：
  python3 edge_tts_server.py          # 启动本地语音 + 发音评测网页服务 (http://127.0.0.1:8765)
"""

import base64
import hashlib
import http.server
import json
import math
import os
import shutil
import socket
import ssl
import struct
import subprocess
import tempfile
import time
import urllib.error
import urllib.parse
import urllib.request
import uuid
import wave
from pathlib import Path
from xml.sax.saxutils import escape as xml_escape

TRUSTED_CLIENT_TOKEN = "6A5AA1D4EAFF4E9FB37E23D68491D6F4"
WSS_HOST = "speech.platform.bing.com"
WSS_PORT = 443
CHROMIUM_FULL_VERSION = "130.0.2849.68"
SEC_MS_GEC_VERSION = f"1-{CHROMIUM_FULL_VERSION}"
WIN_EPOCH = 11644473600

BASE_DIR = Path(__file__).resolve().parent
CACHE_DIR = BASE_DIR / "audio" / "tts_cache"
RECORDINGS_DIR = BASE_DIR / "audio" / "my_recordings"
CACHE_DIR.mkdir(parents=True, exist_ok=True)
RECORDINGS_DIR.mkdir(parents=True, exist_ok=True)

FFMPEG_BIN = shutil.which("ffmpeg") or ("/opt/homebrew/bin/ffmpeg" if Path("/opt/homebrew/bin/ffmpeg").exists() else None)

ALLOWED_VOICES = {
    "pt-BR-FranciscaNeural": "pt-BR",
    "pt-BR-AntonioNeural": "pt-BR",
    "pt-BR-ThalitaMultilingualNeural": "pt-BR",
    "pt-PT-RaquelNeural": "pt-PT",
    "pt-PT-DuarteNeural": "pt-PT",
}


def generate_sec_ms_gec() -> str:
    """Calculate Microsoft Edge ReadAloud Sec-MS-GEC token."""
    ticks = int(time.time() + WIN_EPOCH)
    ticks -= ticks % 300
    ticks *= 10_000_000
    str_to_hash = f"{ticks}{TRUSTED_CLIENT_TOKEN}"
    return hashlib.sha256(str_to_hash.encode("ascii")).hexdigest().upper()


def _ws_send_text(sock: ssl.SSLSocket, text: str) -> None:
    payload = text.encode("utf-8")
    header = bytearray([0x81])  # FIN + Text frame
    length = len(payload)
    if length < 126:
        header.append(0x80 | length)
    elif length < 65536:
        header.append(0x80 | 126)
        header.extend(struct.pack("!H", length))
    else:
        header.append(0x80 | 127)
        header.extend(struct.pack("!Q", length))

    mask_key = os.urandom(4)
    header.extend(mask_key)
    masked = bytearray(length)
    for i in range(length):
        masked[i] = payload[i] ^ mask_key[i % 4]
    sock.sendall(header + masked)


def _recv_exact(sock: ssl.SSLSocket, n: int) -> bytes:
    buf = bytearray()
    while len(buf) < n:
        chunk = sock.recv(n - len(buf))
        if not chunk:
            raise ConnectionError("WebSocket connection closed unexpectedly")
        buf.extend(chunk)
    return bytes(buf)


def _ws_recv_frame(sock: ssl.SSLSocket):
    first2 = _recv_exact(sock, 2)
    b1, b2 = first2[0], first2[1]
    opcode = b1 & 0x0F
    masked = (b2 & 0x80) != 0
    length = b2 & 0x7F
    if length == 126:
        length = struct.unpack("!H", _recv_exact(sock, 2))[0]
    elif length == 127:
        length = struct.unpack("!Q", _recv_exact(sock, 8))[0]
    mask_key = _recv_exact(sock, 4) if masked else b""
    payload = _recv_exact(sock, length) if length > 0 else b""
    if masked:
        payload = bytes(b ^ mask_key[i % 4] for i, b in enumerate(payload))
    return opcode, payload


def synthesize_edge_tts_mp3(text: str, voice: str = "pt-BR-FranciscaNeural", rate: str = "-5%", pitch: str = "+0Hz") -> bytes:
    """Synthesize speech via Microsoft Edge ReadAloud WebSocket using pure Python stdlib."""
    if voice not in ALLOWED_VOICES:
        voice = "pt-BR-FranciscaNeural"
    lang = ALLOWED_VOICES[voice]
    conn_id = uuid.uuid4().hex
    gec = generate_sec_ms_gec()
    path = (
        f"/consumer/speech/synthesize/readaloud/edge/v1"
        f"?TrustedClientToken={TRUSTED_CLIENT_TOKEN}"
        f"&Sec-MS-GEC={gec}"
        f"&Sec-MS-GEC-Version={SEC_MS_GEC_VERSION}"
        f"&ConnectionId={conn_id}"
    )

    ws_key = hashlib.sha1(os.urandom(16)).digest()[:16]
    ws_key_b64 = base64.b64encode(ws_key).decode("ascii")

    ctx = ssl.create_default_context()
    raw_sock = socket.create_connection((WSS_HOST, WSS_PORT), timeout=12)
    sock = ctx.wrap_socket(raw_sock, server_hostname=WSS_HOST)

    try:
        handshake = (
            f"GET {path} HTTP/1.1\r\n"
            f"Host: {WSS_HOST}\r\n"
            f"Pragma: no-cache\r\n"
            f"Cache-Control: no-cache\r\n"
            f"User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0\r\n"
            f"Upgrade: websocket\r\n"
            f"Origin: chrome-extension://jdiccldimpdaibmpdkjnbmckianbfold\r\n"
            f"Sec-WebSocket-Version: 13\r\n"
            f"Sec-WebSocket-Key: {ws_key_b64}\r\n"
            f"Connection: Upgrade\r\n\r\n"
        )
        sock.sendall(handshake.encode("utf-8"))

        resp_buf = b""
        while b"\r\n\r\n" not in resp_buf:
            chunk = sock.recv(1024)
            if not chunk:
                raise ConnectionError("Handshake failed")
            resp_buf += chunk
        header_line = resp_buf.split(b"\r\n", 1)[0].decode("utf-8", errors="replace")
        if "101" not in header_line:
            raise RuntimeError(f"Edge TTS WebSocket handshake rejected: {header_line}")

        timestamp = time.strftime("%a %b %d %Y %H:%M:%S GMT+0000 (Coordinated Universal Time)", time.gmtime())
        config_msg = (
            f"X-Timestamp:{timestamp}\r\n"
            f"Content-Type:application/json; charset=utf-8\r\n"
            f"Path:speech.config\r\n\r\n"
            '{"context":{"synthesis":{"audio":{"metadataoptions":'
            '{"sentenceBoundaryEnabled":"false","wordBoundaryEnabled":"false"},'
            '"outputFormat":"audio-24khz-48kbitrate-mono-mp3"}}}}\r\n'
        )
        _ws_send_text(sock, config_msg)

        req_id = uuid.uuid4().hex
        safe_text = xml_escape(text.strip())
        ssml = (
            f"<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='{lang}'>"
            f"<voice name='{voice}'>"
            f"<prosody pitch='{pitch}' rate='{rate}' volume='+0%'>{safe_text}</prosody>"
            f"</voice></speak>"
        )
        ssml_msg = (
            f"X-RequestId:{req_id}\r\n"
            f"Content-Type:application/ssml+xml\r\n"
            f"X-Timestamp:{timestamp}Z\r\n"
            f"Path:ssml\r\n\r\n"
            f"{ssml}"
        )
        _ws_send_text(sock, ssml_msg)

        audio_bytes = bytearray()
        while True:
            opcode, payload = _ws_recv_frame(sock)
            if opcode == 0x2:  # Binary frame
                if len(payload) < 2:
                    continue
                header_len = struct.unpack("!H", payload[:2])[0]
                headers_bytes = payload[2 : 2 + header_len]
                body = payload[2 + header_len :]
                if b"Path:audio" in headers_bytes:
                    audio_bytes.extend(body)
            elif opcode == 0x1:  # Text frame
                txt = payload.decode("utf-8", errors="ignore")
                if "Path:turn.end" in txt:
                    break
            elif opcode == 0x8:  # Close frame
                break

        if not audio_bytes:
            raise RuntimeError("Edge TTS returned empty audio stream")
        return bytes(audio_bytes)
    finally:
        try:
            sock.close()
        except Exception:
            pass


def get_cached_or_synthesize(text: str, voice: str = "pt-BR-FranciscaNeural", rate: str = "-5%") -> Path:
    norm_text = " ".join(text.strip().split())
    cache_key = hashlib.md5(f"{voice}|{rate}|{norm_text.lower()}".encode("utf-8")).hexdigest()
    out_file = CACHE_DIR / f"{voice}_{cache_key}.mp3"
    if out_file.exists() and out_file.stat().st_size > 200:
        return out_file
    mp3_data = synthesize_edge_tts_mp3(norm_text, voice=voice, rate=rate)
    out_file.write_bytes(mp3_data)
    return out_file


def convert_to_wav16k(src_path: Path, dst_wav: Path) -> bool:
    """Convert arbitrary audio container (webm/ogg/mp4/mp3/wav) to 16kHz 16-bit mono PCM WAV."""
    if not FFMPEG_BIN:
        return False
    cmd = [
        FFMPEG_BIN,
        "-y",
        "-i",
        str(src_path),
        "-ac",
        "1",
        "-ar",
        "16000",
        "-sample_fmt",
        "s16",
        str(dst_wav),
    ]
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=15)
    return res.returncode == 0 and dst_wav.exists() and dst_wav.stat().st_size > 100


def analyze_wav16k(wav_path: Path) -> dict:
    """Extract trimmed speech duration, RMS dB, syllable pulse count, and 24-bin energy contour."""
    with wave.open(str(wav_path), "rb") as wf:
        sample_rate = wf.getframerate()
        n_frames = wf.getnframes()
        raw = wf.readframes(n_frames)

    if n_frames == 0 or len(raw) < 4:
        return {"duration": 0.0, "trimmedDuration": 0.0, "rmsDb": -60.0, "syllablePulses": 0, "contour": []}

    count = len(raw) // 2
    samples = struct.unpack(f"<{count}h", raw[: count * 2])

    # Frame energy in 25ms windows
    win = max(1, int(sample_rate * 0.025))
    energies = []
    for i in range(0, len(samples), win):
        chunk = samples[i : i + win]
        if not chunk:
            break
        ms = sum(s * s for s in chunk) / len(chunk)
        rms = math.sqrt(ms) / 32768.0
        energies.append(rms)

    if not energies:
        return {"duration": 0.0, "trimmedDuration": 0.0, "rmsDb": -60.0, "syllablePulses": 0, "contour": []}

    peak_rms = max(energies)
    overall_rms = math.sqrt(sum(e * e for e in energies) / len(energies))
    rms_db = 20.0 * math.log10(max(overall_rms, 1e-6))

    # Silence trimming threshold (relative to peak, with floor)
    thresh = max(0.012, peak_rms * 0.12)
    active_indices = [idx for idx, e in enumerate(energies) if e >= thresh]
    if active_indices:
        start_i, end_i = active_indices[0], active_indices[-1]
        active_energies = energies[start_i : end_i + 1]
    else:
        active_energies = energies

    trimmed_dur = round(len(active_energies) * 0.025, 2)
    total_dur = round(len(samples) / float(sample_rate), 2)

    # Smooth active energies and count syllable-like energy peaks
    smoothed = []
    for i in range(len(active_energies)):
        lo = max(0, i - 1)
        hi = min(len(active_energies), i + 2)
        smoothed.append(sum(active_energies[lo:hi]) / (hi - lo))

    pulse_thresh = max(0.02, peak_rms * 0.28)
    pulses = 0
    last_pulse_idx = -4
    for i in range(1, len(smoothed) - 1):
        if smoothed[i] >= pulse_thresh and smoothed[i] >= smoothed[i - 1] and smoothed[i] >= smoothed[i + 1]:
            if i - last_pulse_idx >= 3:  # at least ~75ms apart
                pulses += 1
                last_pulse_idx = i
    if pulses == 0 and peak_rms >= 0.02:
        pulses = 1

    # Resample active contour to 24 bins normalized 0..1 for visual comparison
    bins = 24
    contour = []
    if active_energies and peak_rms > 1e-5:
        for b in range(bins):
            s_idx = int(b * len(active_energies) / bins)
            e_idx = max(s_idx + 1, int((b + 1) * len(active_energies) / bins))
            seg = active_energies[s_idx:e_idx]
            val = (sum(seg) / len(seg)) / peak_rms if seg else 0.0
            contour.append(round(min(1.0, val), 3))

    return {
        "duration": total_dur,
        "trimmedDuration": trimmed_dur,
        "rmsDb": round(rms_db, 1),
        "syllablePulses": pulses,
        "contour": contour,
    }


def compare_with_reference(user_wav: Path, target_text: str, voice: str = "pt-BR-FranciscaNeural") -> dict:
    """Compare user's WAV recording against native Brazilian Portuguese TTS reference."""
    user_stats = analyze_wav16k(user_wav)
    result = {"user": user_stats, "ref": None, "paceRatio": 1.0, "rhythmScore": None}
    if not target_text.strip() or not FFMPEG_BIN:
        return result

    try:
        ref_mp3 = get_cached_or_synthesize(target_text, voice=voice, rate="-5%")
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
            tmp_wav = Path(tmp.name)
        try:
            if convert_to_wav16k(ref_mp3, tmp_wav):
                ref_stats = analyze_wav16k(tmp_wav)
                result["ref"] = ref_stats
                if ref_stats["trimmedDuration"] > 0.15 and user_stats["trimmedDuration"] > 0.15:
                    pace_ratio = round(user_stats["trimmedDuration"] / ref_stats["trimmedDuration"], 2)
                    result["paceRatio"] = pace_ratio

                    # Cosine similarity of 24-bin normalized energy envelopes
                    uc, rc = user_stats["contour"], ref_stats["contour"]
                    if len(uc) == len(rc) and len(uc) > 0:
                        dot = sum(a * b for a, b in zip(uc, rc))
                        na = math.sqrt(sum(a * a for a in uc))
                        nb = math.sqrt(sum(b * b for b in rc))
                        sim = dot / (na * nb) if (na > 0 and nb > 0) else 0.0
                        pace_penalty = min(0.35, abs(1.0 - pace_ratio) * 0.35)
                        rhythm = max(0, min(100, int(round((sim * 100) * (1.0 - pace_penalty * 0.5)))))
                        result["rhythmScore"] = rhythm
        finally:
            if tmp_wav.exists():
                tmp_wav.unlink()
    except Exception:
        pass
    return result


def call_gemini_audio_coach(wav_bytes: bytes, target_text: str, target_zh: str, api_key: str) -> dict:
    """Send native WAV audio directly to Gemini multimodal model for Brazilian Portuguese phonetic coaching."""
    audio_b64 = base64.b64encode(wav_bytes).decode("ascii")
    prompt = f"""你是一位专门辅导中国外贸人学习【巴西葡萄牙语 (PT-BR)】的资深语音学私教 Agent。
学员正在练习这句巴西葡语：
- 目标葡语句子: "{target_text}"
- 中文含义: "{target_zh}"

请仔细聆听这段学员的真实录音，不要只看文字是否接近，请重点用“耳朵”听以下【巴葡核心音素细节】：
1. 鼻元音与鼻音尾（如 -ão, -õe, -m/-n 是否饱满且词尾 -m 有没有错误闭唇）；
2. t / d 在 [i] 音（含词尾弱化的 -e）前是否自然腭化读成 [tʃ] / [dʒ]（如 bom dia, cliente, frete, pedido）；
3. 词首 r / 双写 rr 是否读成喉擦音 [h]，词中单 r 是否为轻弹闪音 [ɾ]（如 real 雷亚尔、caro vs carro）；
4. 音节尾/词尾的 -l 是否圆唇读成 [w]（如 Brasil, real, total），而不是卷舌读成英文 l；
5. 重音位置（Sílaba tônica）与开闭口元音（é/ê, ó/ô）是否准确，语调是否自然。

请严格只返回合法的 JSON 对象（不要加 ```json 代码块），字段格式如下：
{{
  "overallScore": 0到100的整数评分,
  "heardTranscript": "你实际听到的葡语内容（若没声音或说中文请如实写）",
  "summary": "一两句话总体评价（温和鼓励+一针见血指出最关键的听感印象）",
  "wordFeedback": [
    {{
      "word": "目标词",
      "status": "good 或 warn 或 bad",
      "issue": "听到的具体发音表现与改进方法（如舌位、口型、重音）"
    }}
  ],
  "phoneticTips": [
    "针对刚才录音里暴露出的 1~3 条最核心纠音建议"
  ],
  "businessTip": "结合巴西做生意/WhatsApp沟通场景的一句实用小贴士"
}}"""

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt},
                    {"inline_data": {"mime_type": "audio/wav", "data": audio_b64}},
                ]
            }
        ],
        "generationConfig": {
            "temperature": 0.25,
            "responseMimeType": "application/json",
        },
    }
    body_bytes = json.dumps(payload).encode("utf-8")

    last_err = ""
    for model_name in ("gemini-2.5-flash", "gemini-2.0-flash"):
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={urllib.parse.quote(api_key)}"
        req = urllib.request.Request(url, data=body_bytes, headers={"Content-Type": "application/json"}, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=28) as resp:
                resp_data = json.loads(resp.read().decode("utf-8"))
            candidates = resp_data.get("candidates") or []
            if not candidates:
                raise RuntimeError("Gemini 未返回候选结果")
            parts = candidates[0].get("content", {}).get("parts") or []
            raw_text = "".join(p.get("text", "") for p in parts).strip()
            if raw_text.startswith("```"):
                raw_text = raw_text.strip("`")
                if raw_text.startswith("json"):
                    raw_text = raw_text[4:].strip()
            parsed = json.loads(raw_text)
            parsed["model"] = model_name
            return parsed
        except urllib.error.HTTPError as he:
            err_body = he.read().decode("utf-8", errors="replace")
            last_err = f"HTTP {he.code}: {err_body[:240]}"
            if he.code in (400, 401, 403):
                break
        except Exception as e:
            last_err = str(e)

    raise RuntimeError(f"Gemini 听音评测请求失败: {last_err}")


class EdgeTtsHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(BASE_DIR), **kwargs)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

    def _send_json(self, status: int, data: dict):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/health":
            self._send_json(
                200,
                {
                    "ok": True,
                    "voices": list(ALLOWED_VOICES.keys()),
                    "coachReady": True,
                    "ffmpeg": bool(FFMPEG_BIN),
                    "hasServerGeminiKey": bool(os.environ.get("GEMINI_API_KEY")),
                },
            )
            return

        if parsed.path == "/api/coach_status":
            meta_file = RECORDINGS_DIR / "latest_meta.json"
            latest_meta = None
            if meta_file.exists():
                try:
                    latest_meta = json.loads(meta_file.read_text(encoding="utf-8"))
                except Exception:
                    latest_meta = None
            self._send_json(
                200,
                {
                    "ok": True,
                    "ffmpeg": bool(FFMPEG_BIN),
                    "hasServerGeminiKey": bool(os.environ.get("GEMINI_API_KEY")),
                    "latestRecording": latest_meta,
                },
            )
            return

        if parsed.path == "/tts":
            qs = urllib.parse.parse_qs(parsed.query)
            text = (qs.get("text") or [""])[0].strip()
            voice = (qs.get("voice") or ["pt-BR-FranciscaNeural"])[0].strip()
            rate = (qs.get("rate") or ["-5%"])[0].strip()
            if not text:
                self._send_json(400, {"error": "Missing text"})
                return
            try:
                mp3_path = get_cached_or_synthesize(text, voice=voice, rate=rate)
                data = mp3_path.read_bytes()
                self.send_response(200)
                self.send_header("Content-Type", "audio/mpeg")
                self.send_header("Content-Length", str(len(data)))
                self.send_header("Cache-Control", "public, max-age=31536000")
                self.end_headers()
                self.wfile.write(data)
            except Exception as e:
                self._send_json(500, {"error": str(e)})
            return

        return super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        content_len = int(self.headers.get("Content-Length") or 0)
        if content_len <= 0 or content_len > 25 * 1024 * 1024:
            self._send_json(400, {"error": "Invalid payload size"})
            return

        raw_body = self.rfile.read(content_len)
        try:
            payload = json.loads(raw_body.decode("utf-8"))
        except Exception:
            self._send_json(400, {"error": "Invalid JSON"})
            return

        if parsed.path == "/api/save_recording":
            b64 = payload.get("audioBase64") or ""
            if "," in b64:
                b64 = b64.split(",", 1)[1]
            target_text = (payload.get("targetText") or "").strip()
            target_zh = (payload.get("targetZh") or "").strip()
            asr_transcript = (payload.get("asrTranscript") or "").strip()
            mime_type = (payload.get("mimeType") or "audio/webm").strip()

            try:
                audio_bytes = base64.b64decode(b64)
            except Exception:
                self._send_json(400, {"error": "Invalid base64 audio"})
                return

            ext = ".webm"
            if "mp4" in mime_type or "m4a" in mime_type:
                ext = ".m4a"
            elif "ogg" in mime_type:
                ext = ".ogg"
            elif "wav" in mime_type:
                ext = ".wav"

            ts = time.strftime("%Y%m%d_%H%M%S")
            raw_path = RECORDINGS_DIR / f"raw_{ts}{ext}"
            latest_wav = RECORDINGS_DIR / "latest.wav"
            archive_wav = RECORDINGS_DIR / f"rec_{ts}.wav"
            raw_path.write_bytes(audio_bytes)

            converted = False
            if convert_to_wav16k(raw_path, latest_wav):
                shutil.copy2(latest_wav, archive_wav)
                converted = True
                try:
                    raw_path.unlink()
                except Exception:
                    pass
            else:
                # Fallback if ffmpeg unavailable
                archive_wav = raw_path

            # Keep only most recent 25 archived recordings to save disk space
            archived = sorted(RECORDINGS_DIR.glob("rec_*.wav"), key=lambda p: p.stat().st_mtime, reverse=True)
            for old_f in archived[25:]:
                try:
                    old_f.unlink()
                except Exception:
                    pass

            acoustic = None
            if converted and latest_wav.exists():
                acoustic = compare_with_reference(latest_wav, target_text)

            meta = {
                "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
                "targetText": target_text,
                "targetZh": target_zh,
                "asrTranscript": asr_transcript,
                "latestWav": "audio/my_recordings/latest.wav" if converted else str(archive_wav.relative_to(BASE_DIR)),
                "archiveWav": str(archive_wav.relative_to(BASE_DIR)),
                "acoustic": acoustic,
            }
            (RECORDINGS_DIR / "latest_meta.json").write_text(
                json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8"
            )

            self._send_json(200, {"ok": True, "meta": meta})
            return

        if parsed.path == "/api/gemini_assess":
            api_key = (payload.get("apiKey") or os.environ.get("GEMINI_API_KEY") or "").strip()
            if not api_key:
                self._send_json(400, {"error": "未提供 Gemini API Key。可在界面右上角填入，或直接在 Antigravity 聊天框里对我说“帮我听下刚才那句发音”免费听音诊断！"})
                return

            target_text = (payload.get("targetText") or "").strip()
            target_zh = (payload.get("targetZh") or "").strip()
            latest_wav = RECORDINGS_DIR / "latest.wav"

            wav_bytes = None
            b64 = payload.get("audioBase64") or ""
            if b64:
                if "," in b64:
                    b64 = b64.split(",", 1)[1]
                raw_bytes = base64.b64decode(b64)
                with tempfile.NamedTemporaryFile(suffix=".webm", delete=False) as tf:
                    tf.write(raw_bytes)
                    tmp_in = Path(tf.name)
                with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tw:
                    tmp_out = Path(tw.name)
                try:
                    if convert_to_wav16k(tmp_in, tmp_out):
                        wav_bytes = tmp_out.read_bytes()
                        shutil.copy2(tmp_out, latest_wav)
                finally:
                    for p in (tmp_in, tmp_out):
                        if p.exists():
                            p.unlink()

            if wav_bytes is None and latest_wav.exists():
                wav_bytes = latest_wav.read_bytes()

            if not wav_bytes:
                self._send_json(400, {"error": "未找到可评测的录音文件，请先点击麦克风录音。"})
                return

            try:
                assessment = call_gemini_audio_coach(wav_bytes, target_text, target_zh, api_key)
                self._send_json(200, {"ok": True, "assessment": assessment})
            except Exception as e:
                self._send_json(500, {"error": str(e)})
            return

        self._send_json(404, {"error": "Unknown endpoint"})


def _get_lan_ip() -> str:
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("223.5.5.5", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"


class ReusableThreadingHTTPServer(http.server.ThreadingHTTPServer):
    allow_reuse_address = True


def main():
    port = int(os.environ.get("PORT", "8765"))
    lan_ip = _get_lan_ip()
    server = ReusableThreadingHTTPServer(("0.0.0.0", port), EdgeTtsHandler)
    print(f"🎙️ 巴葡神经网络语音 + 发音纠音 Agent 服务已启动:")
    print(f"   💻 电脑访问: http://127.0.0.1:{port}/index.html")
    print(f"   📱 手机/iPad (同 Wi-Fi): http://{lan_ip}:{port}/index.html")
    print(f"   🎧 录音自动归档目录: {RECORDINGS_DIR}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n已停止服务。")


if __name__ == "__main__":
    main()
