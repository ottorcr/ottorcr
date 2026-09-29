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
tools/grabar.template.html herramienta para grabar la narración con tu voz (build.py genera grabar.html)
grabar.html                grabadora lista para usar (generada)
```

Después de editar algo en `src/`, ejecuta `python3 build.py` para regenerar `index.html`.

## Narración

Cada escena tiene su propia pista MP3 (unos 6 minutos en total) y la animación espera a que termine antes de avanzar. `build.py` incrusta el audio en `index.html`. `tools/narrar.py` genera las pistas con cuatro motores, del más guatemalteco al menos:

| Motor | Acento | Qué necesita |
| --- | --- | --- |
| `grabaciones` | **Guatemalteco real**: tu voz | grabar con `grabar.html` |
| `azure` | **Guatemalteco** (voces neuronales `es-GT-AndresNeural` / `es-GT-MartaNeural`) | cuenta de Azure (tiene nivel gratuito) |
| `piper` | mexicano (voz neuronal abierta `es_MX-claude-high`) | nada, lo hace GitHub Actions |
| `espeak` | sintético, robótico | nada; es la versión incluida en este repo |

### Opción 1: grabar tu propia voz

1. Abre `grabar.html` en Chrome, Edge o Firefox (con doble clic; también queda publicado junto a la animación).
2. Activa el micrófono y graba cada escena leyendo el texto en pantalla. Los silencios del inicio y del final se recortan solos.
3. Descarga todas las tomas (`00.wav` … `19.wav`) en `guatemala-1954/grabaciones/`.
4. Ejecuta `python3 tools/narrar.py --motor grabaciones && python3 build.py`, o simplemente sube la carpeta `grabaciones/` al repositorio: GitHub Actions las usará automáticamente.

### Opción 2: voz guatemalteca de Azure

1. Crea un recurso **Speech** en el portal de Azure y copia su clave y región (por ejemplo `eastus`).
2. En GitHub: *Settings → Secrets and variables → Actions* → agrega los secretos `AZURE_SPEECH_KEY` y `AZURE_SPEECH_REGION`. Para voz femenina, agrega la variable `AZURE_VOZ` = `es-GT-MartaNeural`.
3. Vuelve a ejecutar el flujo (pestaña *Actions* → *Run workflow*). Si no hay grabaciones propias, usará Azure.

En tu computadora: `AZURE_SPEECH_KEY=… AZURE_SPEECH_REGION=eastus python3 tools/narrar.py --motor azure && python3 build.py`.

### Opción 3: Piper (sin cuentas)

```bash
pip install piper-tts                     # y lame: apt install lame / brew install lame
mkdir -p voces && cd voces
curl -LO https://huggingface.co/rhasspy/piper-voices/resolve/main/es/es_MX/claude/high/es_MX-claude-high.onnx
curl -LO https://huggingface.co/rhasspy/piper-voices/resolve/main/es/es_MX/claude/high/es_MX-claude-high.onnx.json
cd .. && python3 tools/narrar.py --motor piper && python3 build.py
```

## Publicación

El flujo `.github/workflows/guatemala-1954.yml` genera la narración con la mejor voz disponible (grabaciones propias → Azure es-GT → Piper), empaqueta el `index.html` autocontenido y:

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
