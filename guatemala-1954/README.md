# Guatemala 1954 — La Primavera Democrática y su final

Animación web interactiva (en español) sobre la historia de Guatemala entre 1944 y 1954: la Revolución de Octubre, el gobierno de **Jacobo Árbenz**, la **Reforma Agraria (Decreto 900)**, el papel de la **United Fruit Company** y la **operación encubierta de la CIA (PBSUCCESS)** que lo derrocó, junto con sus consecuencias.

## Cómo verla

`index.html` es un **único archivo autocontenido**: descárgalo y ábrelo con doble clic en cualquier navegador (no necesita el resto de la carpeta ni internet, salvo para las tipografías). También puedes publicarlo con GitHub Pages.
Puedes abrir directamente una escena con `index.html?escena=5`.

## Estructura y edición

```
index.html                 archivo final (generado, no editar a mano)
build.py                   genera index.html incrustando todo lo de src/
src/index.template.html    página y controles
src/css/style.css          estilos y animaciones CSS
src/js/geo.js              contornos reales de Centroamérica y del mundo (Natural Earth, simplificados)
src/js/art.js              ilustraciones SVG: retrato de Árbenz, quetzal, lago de Atitlán, Tikal, palacio, textiles mayas…
src/js/scenes.js           guion: texto, narración e ilustración de cada escena
src/js/player.js           reproductor: transiciones, línea de tiempo, narración
audio/                     pista de narración: un MP3 por escena + manifest.json
tools/narrar.py            genera audio/ a partir de los textos `say` de cada escena
```

Después de editar algo en `src/`, ejecuta `python3 build.py` para regenerar `index.html`.

## Narración

Cada escena tiene su propia pista MP3 (unos 6 minutos en total) y la animación espera a que termine antes de avanzar. `build.py` incrusta el audio en `index.html` (≈2,5 MB).

- La versión de este repositorio usa **espeak-ng** (voz sintética), la única voz en español disponible sin conexión en el entorno donde se creó.
- El flujo de GitHub Actions la regenera con **Piper**, una voz neuronal abierta con acento mexicano (`es_MX-claude-high`), mucho más natural.

Para regenerarla en tu computadora:

```bash
pip install piper-tts                     # y lame: apt install lame / brew install lame
mkdir -p voces && cd voces
curl -LO https://huggingface.co/rhasspy/piper-voices/resolve/main/es/es_MX/claude/high/es_MX-claude-high.onnx
curl -LO https://huggingface.co/rhasspy/piper-voices/resolve/main/es/es_MX/claude/high/es_MX-claude-high.onnx.json
cd .. && python3 tools/narrar.py --motor piper && python3 build.py
```

También puedes grabar tu propia voz: reemplaza los archivos `audio/NN.mp3`, actualiza las duraciones en `audio/manifest.json` y ejecuta `python3 build.py`.

## Publicación

El flujo `.github/workflows/guatemala-1954.yml` genera la narración con Piper, empaqueta el `index.html` autocontenido y:

- en cada PR, lo deja como paquete descargable en la pestaña **Actions** (artefacto `guatemala-1954`);
- en `main`, lo publica en **GitHub Pages**. Solo hay que activarlo una vez en *Settings → Pages → Source: GitHub Actions*. Quedará en `https://ottorcr.github.io/ottorcr/`.

Como es un solo archivo HTML, también se puede subir tal cual a Netlify Drop, Cloudflare Pages, itch.io o cualquier hosting estático.

## Controles

| Acción | Control |
| --- | --- |
| Reproducir / pausar | botón ❚❚ / ► o barra espaciadora |
| Escena anterior / siguiente | ◀ ▶ o flechas del teclado |
| Saltar a una escena | línea de tiempo inferior |
| Narración | al empezar, “Ver con narración”; luego el botón “Narración” la activa o silencia |

## Escenas (20, en 5 capítulos)

**Contexto** — Guatemala (lago de Atitlán, quetzal) · 1944: café, banano y dictadura (mapa real)
**Revolución** — Octubre de 1944 · Arévalo y la “primera primavera”
**Árbenz** — ¿Quién era? (retrato ilustrado) · Elección de 1950 · Carretera, puerto e hidroeléctrica · La United Fruit · Decreto 900
**El golpe** — Washington y los Dulles · Propaganda, Iglesia y radio · La invasión (mapa real) · La renuncia (cita del discurso) · Exilio (ruta en el mapamundi)
**Después** — Consecuencias · Voces y opiniones · El regreso de sus restos (1995) · Árbenz en el imaginario popular · Memoria y disculpas · Fuentes

El retrato de Árbenz es una ilustración interpretativa basada en descripciones y fotografías de la época, no una reproducción fotográfica.

## Fuentes

- Comisión para el Esclarecimiento Histórico, *Guatemala: Memoria del Silencio* (1999).
- Piero Gleijeses, *Shattered Hope: The Guatemalan Revolution and the United States, 1944–1954* (1991).
- Stephen Schlesinger y Stephen Kinzer, *Bitter Fruit / Fruta amarga* (1982).
- Nick Cullather, *Secret History: The CIA's Classified Account of Its Operations in Guatemala, 1952–1954* (1999).
- U.S. Department of State, Office of the Historian — *Foreign Relations of the United States, 1952–1954, Guatemala*.
- National Security Archive — documentos desclasificados sobre Guatemala.
- Roberto García Ferreira, “La CIA y el exilio de Jacobo Árbenz”, *Perfiles Latinoamericanos* (2006).
- Prensa Libre, hemeroteca: renuncia de Árbenz (1954) y repatriación de sus restos (1995).
- Acuerdo de solución amistosa ante la CIDH y disculpa del Estado de Guatemala (2011).
- Mapas: Natural Earth vía `world-atlas` (dominio público).

Las cifras (votos, familias beneficiadas, hectáreas, indemnizaciones) son aproximaciones tomadas de estas obras; distintas fuentes dan valores ligeramente diferentes.
