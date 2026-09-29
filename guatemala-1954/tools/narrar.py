#!/usr/bin/env python3
"""Genera la pista de narración: un MP3 por escena en audio/ y audio/manifest.json.

Toma el texto de narración (`say`) de cada escena en src/js/scenes.js.

Motores (de más a menos guatemalteco):
  grabaciones  tus propias grabaciones: una por escena (00.wav … 19.wav, o .mp3) en --dir.
               tools/grabar.html sirve para grabarlas en el navegador.
  azure        voces neuronales de Guatemala de Microsoft Azure (es-GT-AndresNeural,
               es-GT-MartaNeural). Necesita las variables AZURE_SPEECH_KEY y AZURE_SPEECH_REGION.
  piper        voz neuronal abierta (https://github.com/rhasspy/piper), acento mexicano.
               Necesita `pip install piper-tts` y un modelo .onnx (ver --modelo).
  espeak       espeak-ng (sintético, sin dependencias de red).

Requiere `lame` para codificar MP3.

Ejemplos:
  python3 tools/narrar.py --motor grabaciones --dir grabaciones/
  AZURE_SPEECH_KEY=… AZURE_SPEECH_REGION=eastus python3 tools/narrar.py --motor azure --voz es-GT-MartaNeural
  python3 tools/narrar.py --motor piper --modelo voces/es_MX-claude-high.onnx
  python3 tools/narrar.py --motor espeak
"""
import argparse
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import urllib.error
import urllib.request
import wave
from pathlib import Path
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parent.parent
SCENES = ROOT / "src" / "js" / "scenes.js"
OUT = ROOT / "audio"


def textos():
    src = SCENES.read_text(encoding="utf-8")
    says = re.findall(r"\bsay:\s*'((?:[^'\\]|\\.)*)'", src)
    return [s.replace("\\'", "'") for s in says]


# ── motores ────────────────────────────────────────────────────────────────

def wav_espeak(texto, destino, _args):
    subprocess.run(["espeak-ng", "-v", "es-419", "-s", "150", "-p", "42", "-g", "4", "-w", str(destino), texto],
                   check=True, stderr=subprocess.DEVNULL)


_piper = None


def wav_piper(texto, destino, args):
    global _piper
    if _piper is None:
        from piper import PiperVoice  # pip install piper-tts
        _piper = PiperVoice.load(str(args.modelo))
    with wave.open(str(destino), "wb") as w:
        if hasattr(_piper, "synthesize_wav"):  # piper-tts >= 1.3
            _piper.synthesize_wav(texto, w)
        else:  # piper-tts 1.2
            _piper.synthesize(texto, w)


def wav_azure(texto, destino, args):
    key, region = os.environ.get("AZURE_SPEECH_KEY"), os.environ.get("AZURE_SPEECH_REGION")
    if not key or not region:
        sys.exit("Faltan AZURE_SPEECH_KEY y AZURE_SPEECH_REGION.")
    lang = "-".join(args.voz.split("-")[:2])
    ssml = (f"<speak version='1.0' xml:lang='{lang}' xmlns='http://www.w3.org/2001/10/synthesis'>"
            f"<voice name='{args.voz}'><prosody rate='{args.velocidad}'>{escape(texto)}</prosody></voice></speak>")
    req = urllib.request.Request(
        f"https://{region}.tts.speech.microsoft.com/cognitiveservices/v1",
        data=ssml.encode("utf-8"), method="POST",
        headers={
            "Ocp-Apim-Subscription-Key": key,
            "Content-Type": "application/ssml+xml",
            "X-Microsoft-OutputFormat": "riff-24khz-16bit-mono-pcm",
            "User-Agent": "guatemala-1954-narracion",
        })
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            destino.write_bytes(r.read())
    except urllib.error.HTTPError as e:
        sys.exit(f"Azure respondió {e.code}: {e.read()[:300]!r}. Revisa la clave, la región y el nombre de la voz.")
    except urllib.error.URLError as e:
        sys.exit(f"No se pudo conectar con Azure ({e.reason}). Revisa la región y tu conexión a internet.")


def wav_grabacion(_texto, destino, args):
    i = int(destino.stem)
    for ext in ("wav", "mp3"):
        f = Path(args.dir) / f"{i:02d}.{ext}"
        if f.exists():
            if ext == "wav":
                shutil.copy(f, destino)
            else:
                subprocess.run(["lame", "--quiet", "--decode", str(f), str(destino)], check=True)
            return
    sys.exit(f"Falta la grabación de la escena {i:02d} ({i:02d}.wav o {i:02d}.mp3) en {args.dir}")


MOTORES = {"grabaciones": wav_grabacion, "azure": wav_azure, "piper": wav_piper, "espeak": wav_espeak}


def nombre_voz(args):
    return {"grabaciones": f"grabación propia ({Path(args.dir).name})", "azure": f"Azure {args.voz}",
            "piper": Path(args.modelo).stem, "espeak": "espeak-ng es-419"}[args.motor]


def duracion(wav_path):
    with wave.open(str(wav_path), "rb") as w:
        return w.getnframes() / w.getframerate()


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--motor", choices=list(MOTORES), default="piper")
    ap.add_argument("--modelo", default=str(ROOT / "voces" / "es_MX-claude-high.onnx"), help="modelo Piper")
    ap.add_argument("--voz", default="es-GT-AndresNeural", help="voz de Azure (es-GT-AndresNeural o es-GT-MartaNeural)")
    ap.add_argument("--velocidad", default="-4%", help="velocidad de Azure, p. ej. -10%%")
    ap.add_argument("--dir", default=str(ROOT / "grabaciones"), help="carpeta con las grabaciones propias")
    ap.add_argument("--kbps", default="48")
    args = ap.parse_args()

    if not shutil.which("lame"):
        sys.exit("Falta `lame` para codificar MP3 (apt install lame / brew install lame).")
    lista = textos()
    if not lista:
        sys.exit("No encontré textos `say` en scenes.js")

    motor = MOTORES[args.motor]
    OUT.mkdir(exist_ok=True)
    escenas = []
    with tempfile.TemporaryDirectory() as tmp:
        for i, texto in enumerate(lista):
            wav = Path(tmp) / f"{i:02d}.wav"
            motor(texto, wav, args)
            mp3 = OUT / f"{i:02d}.mp3"
            subprocess.run(["lame", "--quiet", "-m", "m", "--resample", "22.05", "-b", args.kbps, str(wav), str(mp3)], check=True)
            d = duracion(wav)
            escenas.append({"archivo": mp3.name, "duracion": round(d, 2), "texto": texto})
            print(f"{i:02d}  {d:5.1f}s  {texto[:60]}…")

    for sobrante in OUT.glob("*.mp3"):
        if sobrante.name not in {e["archivo"] for e in escenas}:
            sobrante.unlink()
    (OUT / "manifest.json").write_text(json.dumps({"voz": nombre_voz(args), "escenas": escenas}, ensure_ascii=False, indent=1), encoding="utf-8")
    total = sum(e["duracion"] for e in escenas)
    print(f"{len(escenas)} pistas · {total / 60:.1f} min · voz: {nombre_voz(args)}")


if __name__ == "__main__":
    main()
