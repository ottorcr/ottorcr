#!/usr/bin/env python3
"""Genera la pista de narración: un MP3 por escena en audio/ y audio/manifest.json.

Toma el texto de narración (`say`) de cada escena en src/js/scenes.js.

Motores:
  piper   voz neuronal abierta (https://github.com/rhasspy/piper). Necesita `pip install piper-tts`
          y un modelo de voz .onnx (por defecto es_MX-claude-high, ver --modelo).
  espeak  espeak-ng (sintético, sin dependencias de red).

Requiere `lame` para codificar MP3.

Ejemplos:
  python3 tools/narrar.py --motor espeak
  python3 tools/narrar.py --motor piper --modelo voces/es_MX-claude-high.onnx
"""
import argparse
import json
import re
import shutil
import subprocess
import sys
import tempfile
import wave
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SCENES = ROOT / "src" / "js" / "scenes.js"
OUT = ROOT / "audio"


def textos():
    src = SCENES.read_text(encoding="utf-8")
    says = re.findall(r"\bsay:\s*'((?:[^'\\]|\\.)*)'", src)
    return [s.replace("\\'", "'") for s in says]


def wav_espeak(texto, destino):
    subprocess.run(["espeak-ng", "-v", "es-419", "-s", "150", "-p", "42", "-g", "4", "-w", str(destino), texto],
                   check=True, stderr=subprocess.DEVNULL)


def cargar_piper(modelo):
    from piper import PiperVoice  # pip install piper-tts
    return PiperVoice.load(str(modelo))


def wav_piper(voz, texto, destino):
    with wave.open(str(destino), "wb") as w:
        if hasattr(voz, "synthesize_wav"):  # piper-tts >= 1.3
            voz.synthesize_wav(texto, w)
        else:  # piper-tts 1.2
            voz.synthesize(texto, w)


def duracion(wav_path):
    with wave.open(str(wav_path), "rb") as w:
        return w.getnframes() / w.getframerate()


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--motor", choices=["piper", "espeak"], default="piper")
    ap.add_argument("--modelo", default=str(ROOT / "voces" / "es_MX-claude-high.onnx"))
    ap.add_argument("--kbps", default="40")
    args = ap.parse_args()

    if not shutil.which("lame"):
        sys.exit("Falta `lame` para codificar MP3 (apt install lame / brew install lame).")
    lista = textos()
    if not lista:
        sys.exit("No encontré textos `say` en scenes.js")

    voz = cargar_piper(args.modelo) if args.motor == "piper" else None
    voz_nombre = Path(args.modelo).stem if voz else "espeak-ng es-419"
    OUT.mkdir(exist_ok=True)
    for viejo in OUT.glob("*.mp3"):
        viejo.unlink()

    escenas = []
    with tempfile.TemporaryDirectory() as tmp:
        for i, texto in enumerate(lista):
            wav = Path(tmp) / f"{i:02d}.wav"
            if voz:
                wav_piper(voz, texto, wav)
            else:
                wav_espeak(texto, wav)
            mp3 = OUT / f"{i:02d}.mp3"
            subprocess.run(["lame", "--quiet", "-m", "m", "--resample", "22.05", "-b", args.kbps, str(wav), str(mp3)], check=True)
            d = duracion(wav)
            escenas.append({"archivo": mp3.name, "duracion": round(d, 2)})
            print(f"{i:02d}  {d:5.1f}s  {texto[:60]}…")

    (OUT / "manifest.json").write_text(json.dumps({"voz": voz_nombre, "escenas": escenas}, ensure_ascii=False, indent=1), encoding="utf-8")
    total = sum(e["duracion"] for e in escenas)
    print(f"{len(escenas)} pistas · {total / 60:.1f} min · voz: {voz_nombre}")


if __name__ == "__main__":
    main()
