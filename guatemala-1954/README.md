# Guatemala 1954 — La Primavera Democrática y su final

Animación web interactiva (en español) sobre la historia de Guatemala entre 1944 y 1954: la Revolución de Octubre, el gobierno de **Jacobo Árbenz**, la **Reforma Agraria (Decreto 900)**, el papel de la **United Fruit Company** y la **operación encubierta de la CIA (PBSUCCESS)** que lo derrocó, junto con sus consecuencias.

## Cómo verla

No necesita compilación: descarga o clona el repositorio y abre `index.html` en el navegador (o publícalo con GitHub Pages).
Puedes abrir directamente una escena con `index.html?escena=5`.

## Estructura

```
index.html        página y controles
css/style.css     estilos y animaciones CSS
js/geo.js         contornos reales de Centroamérica y del mundo (Natural Earth, simplificados)
js/art.js         ilustraciones SVG: retrato de Árbenz, quetzal, lago de Atitlán, Tikal, palacio, textiles mayas…
js/scenes.js      guion: texto, narración e ilustración de cada escena
js/player.js      reproductor: transiciones, línea de tiempo, narración por voz
```

## Controles

| Acción | Control |
| --- | --- |
| Reproducir / pausar | botón ❚❚ / ► o barra espaciadora |
| Escena anterior / siguiente | ◀ ▶ o flechas del teclado |
| Saltar a una escena | línea de tiempo inferior |
| Narración por voz | botón “Narración” (voz en español del navegador; espera a que termine antes de avanzar) |

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
