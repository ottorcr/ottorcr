#!/usr/bin/env python3
"""Genera index.html (un solo archivo autocontenido) a partir de src/ y audio/.

El código fuente vive en src/ (plantilla, CSS y JS separados para editar cómodamente) y la
narración en audio/ (la genera tools/narrar.py). index.html lleva todo incrustado, así funciona
al abrirlo directamente, descargarlo suelto o publicarlo en cualquier hosting estático.

Uso:  python3 build.py [--sin-audio] [--salida index.html]
"""
import argparse
import base64
import json
import re
from pathlib import Path

ROOT = Path(__file__).parent
SRC = ROOT / "src"
AUDIO = ROOT / "audio"


def script(code):
    # evita que un "</script>" dentro del código cierre la etiqueta antes de tiempo
    return "<script>\n" + code.replace("</script", "<\\/script") + "\n</script>"


def narration():
    manifest = AUDIO / "manifest.json"
    if not manifest.exists():
        return ""
    data = json.loads(manifest.read_text(encoding="utf-8"))
    track = []
    for e in data["escenas"]:
        b64 = base64.b64encode((AUDIO / e["archivo"]).read_bytes()).decode()
        track.append({"src": "data:audio/mpeg;base64," + b64, "dur": e["duracion"]})
    return script(f"/* Narración: {data['voz']} */\nwindow.NARRATION = {json.dumps(track)};")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sin-audio", action="store_true")
    ap.add_argument("--salida", default=str(ROOT / "index.html"))
    args = ap.parse_args()

    html = (SRC / "index.template.html").read_text(encoding="utf-8")
    html = re.sub(r'<link rel="stylesheet" href="([^"]+)">',
                  lambda m: "<style>\n" + (SRC / m.group(1)).read_text(encoding="utf-8") + "</style>", html)
    html = re.sub(r'<script src="([^"]+)"></script>',
                  lambda m: script((SRC / m.group(1)).read_text(encoding="utf-8")), html)
    audio = "" if args.sin_audio else narration()
    # la narración va antes del reproductor, que la lee al arrancar
    html = html.replace("<script>\n/* Motor de la animación", audio + "\n<script>\n/* Motor de la animación", 1)
    html = html.replace("<!-- build -->", "<!-- Archivo generado por build.py a partir de src/ y audio/. No editar a mano. -->")
    out = Path(args.salida)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(html, encoding="utf-8")
    print(f"{out}: {len(html) / 1024 / 1024:.2f} MB · narración: {'sí' if audio else 'no'}")


if __name__ == "__main__":
    main()
