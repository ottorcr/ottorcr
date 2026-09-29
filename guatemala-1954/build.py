#!/usr/bin/env python3
"""Genera index.html (un solo archivo autocontenido) a partir de src/.

El código fuente vive en src/ (plantilla, CSS y JS separados para editar cómodamente).
index.html lleva todo incrustado, así funciona al abrirlo directamente, descargarlo suelto
o previsualizarlo sin el resto de la carpeta.

Uso:  python3 build.py
"""
import re
from pathlib import Path

ROOT = Path(__file__).parent
SRC = ROOT / "src"


def inline(match):
    kind, path = match.group(1), match.group(2)
    content = (SRC / path).read_text(encoding="utf-8")
    if kind == "css":
        return f"<style>\n{content}</style>"
    # evita que un "</script>" dentro del código cierre la etiqueta antes de tiempo
    return "<script>\n" + content.replace("</script", "<\\/script") + "</script>"


template = (SRC / "index.template.html").read_text(encoding="utf-8")
html = re.sub(r'<link rel="stylesheet" href="(?P<p>[^"]+)">',
              lambda m: inline(re.match(r"(css)\|(.*)", "css|" + m.group("p"))), template)
html = re.sub(r'<script src="([^"]+)"></script>',
              lambda m: inline(re.match(r"(js)\|(.*)", "js|" + m.group(1))), html)
html = html.replace("<!-- build -->", "<!-- Archivo generado por build.py a partir de src/. No editar a mano. -->")
(ROOT / "index.html").write_text(html, encoding="utf-8")
print(f"index.html: {len(html) / 1024:.0f} KB")
