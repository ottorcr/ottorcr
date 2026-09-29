/* Piezas de ilustración reutilizables (SVG en texto, lienzo 600x400). */
(function () {
  const A = {};
  const C = { sky: '#4a9fd8', green: '#6fae5a', gold: '#d9a441', red: '#c8442f', usa: '#8fa3c7', paper: '#efe4cc', ink: '#f3ead6', muted: '#b7a98c', dark: '#14110d' };
  A.C = C;

  A.text = (x, y, s, o = {}) =>
    `<text x="${x}" y="${y}" text-anchor="${o.anchor || 'middle'}" font-family="${o.font || 'IBM Plex Mono'}" font-size="${o.size || 12}" ${o.weight ? `font-weight="${o.weight}"` : ''} ${o.italic ? 'font-style="italic"' : ''} fill="${o.fill || C.muted}" ${o.cls ? `class="${o.cls}"` : ''} style="${o.delay != null ? `--delay:${o.delay}s;` : ''}${o.style || ''}">${s}</text>`;

  A.volcanoes = (y = 330) => `
    <path d="M0 ${y} L110 ${y - 150} L140 ${y - 160} L175 ${y - 140} L290 ${y} Z" fill="#2c2620"/>
    <path d="M180 ${y} L330 ${y - 200} L360 ${y - 205} L385 ${y - 190} L520 ${y} Z" fill="#241f19"/>
    <path d="M400 ${y} L500 ${y - 120} L525 ${y - 125} L600 ${y - 70} L600 ${y} Z" fill="#2c2620"/>
    <rect y="${y}" width="600" height="${400 - y}" fill="#1c1813"/>`;

  A.person = (x, y, s = 1, color = '#d9c9a8', armUp = false) => `
    <g transform="translate(${x} ${y}) scale(${s})" fill="${color}">
      <circle cx="0" cy="-34" r="7"/>
      <rect x="-7" y="-26" width="14" height="26" rx="5"/>
      ${armUp ? `<rect x="5" y="-48" width="4" height="24" rx="2" transform="rotate(15 7 -24)"/>` : ''}
    </g>`;

  /* persona con ropa típica: falda (corte) y huipil a rayas */
  A.mayaPerson = (x, y, s = 1, i = 0) => {
    const tops = [C.red, '#7a3f8f', C.sky, C.gold];
    const top = tops[i % tops.length];
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <circle cx="0" cy="-40" r="7" fill="#b08463"/>
      <path d="M-6 -46 Q0 -54 6 -46 L6 -43 L-6 -43Z" fill="#1c1813"/>
      <rect x="-9" y="-32" width="18" height="14" rx="3" fill="${top}"/>
      <rect x="-9" y="-27" width="18" height="2" fill="${C.paper}" opacity=".7"/>
      <path d="M-8 -18 L8 -18 L10 0 L-10 0Z" fill="#2d3a5c"/>
      <rect x="-9" y="-12" width="18" height="2" fill="${C.gold}" opacity=".6"/>
    </g>`;
  };

  A.bananaPlant = (x, y, s = 1, delay = 0) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <g class="up" style="--delay:${delay}s">
        <rect x="-3" y="-60" width="6" height="60" fill="#6b5a36"/>
        <g class="sway">
          <path d="M0 -58 C -30 -80 -50 -70 -58 -55 C -35 -62 -18 -60 0 -54Z" fill="#5c9a47"/>
          <path d="M0 -58 C 30 -84 52 -72 60 -58 C 36 -64 18 -60 0 -54Z" fill="#6fae5a"/>
          <path d="M0 -58 C -8 -90 8 -100 14 -96 C 6 -86 4 -72 0 -56Z" fill="#7cbd63"/>
          <ellipse cx="6" cy="-48" rx="6" ry="9" fill="#d9c441"/>
        </g>
      </g>
    </g>`;

  A.plane = (fill = C.usa) => `
    <g fill="${fill}">
      <path d="M0 0 L60 -4 L70 0 L60 4 Z"/>
      <path d="M28 -2 L18 -26 L26 -26 L42 -2 Z"/>
      <path d="M28 2 L18 26 L26 26 L42 2 Z"/>
      <path d="M2 -1 L-4 -12 L4 -12 L10 -1 Z"/>
    </g>`;

  /* Quetzal, ave nacional: cuerpo verde, pecho rojo, cola larga */
  A.quetzal = (s = 1) => `
    <g transform="scale(${s})">
      <path d="M-10 4 C -40 10 -80 4 -120 16 C -84 10 -44 16 -8 10Z" fill="#1f7a45"/>
      <path d="M-10 6 C -44 18 -86 18 -128 34 C -88 22 -46 22 -6 12Z" fill="#2f9956"/>
      <ellipse cx="4" cy="2" rx="18" ry="11" fill="#2f9956"/>
      <path d="M8 6 C 14 14 4 18 -6 12 Z" fill="#c8302c"/>
      <circle cx="20" cy="-6" r="8" fill="#2f9956"/>
      <path d="M14 -13 Q 22 -22 28 -12 Z" fill="#3fb865"/>
      <circle cx="23" cy="-7" r="1.8" fill="#14110d"/>
      <path d="M27 -5 L 33 -3 L 27 -1Z" fill="#e7c24a"/>
      <g class="flap"><path d="M-4 -2 C -8 -24 10 -34 16 -30 C 12 -20 8 -8 6 -2Z" fill="#23864c"/></g>
    </g>`;

  /* Lago de Atitlán con sus tres volcanes (San Pedro, Tolimán y Atitlán) */
  A.atitlan = () => `
    <defs>
      <linearGradient id="dawn" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1b2740"/><stop offset=".55" stop-color="#7a4b4b"/><stop offset="1" stop-color="#e3a458"/>
      </linearGradient>
      <linearGradient id="lake" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3a5a78"/><stop offset="1" stop-color="#15212e"/>
      </linearGradient>
      <radialGradient id="sunG"><stop offset="0" stop-color="#ffd67a"/><stop offset=".4" stop-color="#f0b24f" stop-opacity=".7"/><stop offset="1" stop-color="#f0b24f" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="600" height="260" fill="url(#dawn)"/>
    <g style="animation: sunrise 7s ease-out forwards; transform: translateY(90px)">
      <circle cx="300" cy="170" r="110" fill="url(#sunG)"/>
      <circle cx="300" cy="170" r="30" fill="#ffd67a"/>
    </g>
    <path d="M40 250 L150 120 L168 116 L185 124 L290 250Z" fill="#3a3346"/>
    <path d="M300 250 L390 118 L402 112 L414 118 L470 180 L488 150 L500 146 L512 152 L600 240 L600 250Z" fill="#332c3e"/>
    <path d="M0 250 L60 205 L120 230 L200 200 L280 236 L340 214 L420 232 L520 206 L600 228 L600 250Z" fill="#2a2433"/>
    <rect y="250" width="600" height="150" fill="url(#lake)"/>
    <g opacity=".35" transform="translate(0 500) scale(1 -1)">
      <path d="M40 250 L150 120 L168 116 L185 124 L290 250Z" fill="#3a3346"/>
      <path d="M300 250 L390 118 L402 112 L414 118 L470 180 L488 150 L500 146 L512 152 L600 240 L600 250Z" fill="#332c3e"/>
    </g>
    ${[270, 290, 312, 336].map((y, i) => `<rect x="${250 - i * 20}" y="${y}" width="${100 + i * 40}" height="2" fill="#ffd67a" class="shimmer" style="animation-delay:${i * .4}s"/>`).join('')}
    <g style="animation: drift 18s linear forwards">
      <path d="M120 330 L170 330 L162 338 L128 338Z" fill="#1a130e"/>${A.person(146, 330, .5, '#1a130e')}
    </g>
    <path d="M0 260 C 120 250 200 270 300 258 C 420 248 500 268 600 256" stroke="#efe4cc" stroke-opacity=".12" fill="none"/>
    <style>@keyframes sunrise { to { transform: translateY(0); } } @keyframes drift { to { transform: translateX(160px); } }</style>`;

  /* Templo I de Tikal */
  A.tikal = (x = 300, y = 330, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<rect x="${-70 + i * 5}" y="${-i * 16 - 16}" width="${140 - i * 10}" height="16" fill="${i % 2 ? '#8a7d66' : '#7a6e58'}"/>`).join('')}
      <rect x="-14" y="-150" width="28" height="18" fill="#6d624e"/>
      <rect x="-5" y="-146" width="10" height="14" fill="#2a241c"/>
      <path d="M-18 -150 L18 -150 L14 -190 L-14 -190Z" fill="#8a7d66"/>
      <rect x="-3" y="-140" width="6" height="140" fill="#6d624e" opacity=".7"/>
    </g>`;

  /* Palacio de gobierno esquemático (fachada simétrica) */
  A.palace = (y = 250, color = '#4f6b52') => `
    <g>
      <rect x="90" y="${y - 90}" width="420" height="90" fill="${color}"/>
      <rect x="240" y="${y - 150}" width="120" height="150" fill="${color}"/>
      <path d="M232 ${y - 150} L300 ${y - 185} L368 ${y - 150}Z" fill="#3f5942"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<path d="M${105 + i * 22} ${y} L${105 + i * 22} ${y - 40} Q${114 + i * 22} ${y - 54} ${123 + i * 22} ${y - 40} L${123 + i * 22} ${y}Z" fill="#26331f"/>`).join('')}
      ${[0, 1, 2, 3, 4, 5].map(i => `<path d="M${373 + i * 22} ${y} L${373 + i * 22} ${y - 40} Q${382 + i * 22} ${y - 54} ${391 + i * 22} ${y - 40} L${391 + i * 22} ${y}Z" fill="#26331f"/>`).join('')}
      ${[0, 1, 2].map(i => `<rect x="${256 + i * 34}" y="${y - 120}" width="18" height="30" rx="9" fill="#26331f"/>`).join('')}
      <path d="M280 ${y} L280 ${y - 55} Q300 ${y - 78} 320 ${y - 55} L320 ${y}Z" fill="#26331f"/>
      <line x1="300" y1="${y - 185}" x2="300" y2="${y - 225}" stroke="#8b7a5c" stroke-width="2"/>
      <g class="wave-flag"><rect x="300" y="${y - 225}" width="12" height="18" fill="${C.sky}"/><rect x="312" y="${y - 225}" width="12" height="18" fill="#fff"/><rect x="324" y="${y - 225}" width="12" height="18" fill="${C.sky}"/></g>
    </g>`;

  /* Retrato estilizado de Jacobo Árbenz: tez clara, cabello castaño claro peinado hacia atrás,
     traje oscuro y banda presidencial azul y blanco. Ilustración interpretativa, no fotografía. */
  A.arbenz = ({ sash = true, uniform = false } = {}) => {
    const suit = uniform ? '#4c5236' : '#1f2530';
    return `
    <g class="arbenz">
      <path d="M140 400 C150 330 220 300 300 294 C380 300 450 330 460 400Z" fill="${suit}"/>
      ${uniform ? `<path d="M232 310 L300 380 L368 310" stroke="#3a3f29" stroke-width="6" fill="none"/>
        <circle cx="300" cy="352" r="4" fill="${C.gold}"/><circle cx="300" cy="378" r="4" fill="${C.gold}"/>
        <rect x="190" y="318" width="40" height="8" rx="2" fill="${C.gold}" transform="rotate(-12 210 322)"/>
        <rect x="370" y="318" width="40" height="8" rx="2" fill="${C.gold}" transform="rotate(12 390 322)"/>`
      : `<path d="M268 298 L300 368 L332 298Z" fill="#f2efe6"/>
        <path d="M294 306 L306 306 L311 364 L300 380 L289 364Z" fill="#5a2a2a"/>
        <path d="M268 298 L300 368 L250 330Z M332 298 L300 368 L350 330Z" fill="#161b24"/>`}
      <path d="M268 244 L268 300 Q300 318 332 300 L332 244Z" fill="#d9b394"/>
      <path d="M268 280 Q300 300 332 280 L332 300 Q300 318 268 300Z" fill="#c49c7d" opacity=".7"/>
      <ellipse cx="243" cy="196" rx="10" ry="18" fill="#dfb898"/>
      <ellipse cx="357" cy="196" rx="10" ry="18" fill="#dfb898"/>
      <path d="M246 170 C246 120 276 104 300 104 C326 104 354 120 354 170 L354 212 C352 250 326 272 300 274 C274 272 248 250 246 212Z" fill="#eccaa8"/>
      <path d="M252 212 C256 246 276 266 300 270 C288 262 270 246 262 214Z" fill="#d9b394" opacity=".6"/>
      <path d="M244 172 C238 116 272 90 304 92 C338 94 364 116 356 172 C352 150 346 134 332 128 C312 118 284 118 266 128 C254 136 248 150 244 172Z" fill="#8c6a45"/>
      <path d="M262 124 C282 110 318 108 342 124 M258 134 C280 118 322 116 348 134 M256 146 C278 128 324 128 352 146" stroke="#6e5234" stroke-width="2" fill="none"/>
      <path d="M266 176 Q280 168 292 174 M308 174 Q320 168 334 176" stroke="#6b4f33" stroke-width="4" fill="none" stroke-linecap="round"/>
      <ellipse cx="280" cy="190" rx="8" ry="4.5" fill="#fff"/><ellipse cx="320" cy="190" rx="8" ry="4.5" fill="#fff"/>
      <circle cx="281" cy="190" r="3.4" fill="#4b5a52"/><circle cx="321" cy="190" r="3.4" fill="#4b5a52"/>
      <path d="M272 186 Q280 182 288 186 M312 186 Q320 182 328 186" stroke="#8a6a50" stroke-width="1.5" fill="none"/>
      <path d="M300 192 L296 222 Q300 228 308 224" stroke="#b58a6a" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <path d="M284 244 Q300 250 316 244" stroke="#9c6450" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M286 250 Q300 256 314 250" stroke="#c49c7d" stroke-width="1.5" fill="none"/>
      ${sash ? `<g>
        <path d="M188 332 L214 314 L360 400 L318 400Z" fill="${C.sky}"/>
        <path d="M206 320 L222 309 L378 400 L346 400Z" fill="#fff" opacity=".95"/>
        <path d="M214 314 L230 304 L398 400 L372 400Z" fill="${C.sky}"/>
        <circle cx="300" cy="366" r="10" fill="${C.gold}" stroke="#8b6a2a" stroke-width="2"/>
      </g>` : ''}
    </g>`;
  };

  /* Franja de patrones textiles mayas */
  A.huipil = (y = 380, h = 20, delay = 0) => {
    let s = '';
    const cols = [C.red, C.gold, C.sky, C.green, '#7a3f8f'];
    for (let i = 0; i < 30; i++) {
      const x = i * 20, c = cols[i % cols.length];
      s += `<path class="pop" style="--delay:${(delay + i * .03).toFixed(2)}s" d="M${x + 10} ${y} L${x + 20} ${y + h / 2} L${x + 10} ${y + h} L${x} ${y + h / 2}Z" fill="${c}"/>`;
      s += `<rect x="${x + 7}" y="${y + h / 2 - 3}" width="6" height="6" fill="${C.dark}" opacity=".6" class="fade" style="--delay:${(delay + .6 + i * .03).toFixed(2)}s"/>`;
    }
    return `<rect x="0" y="${y}" width="600" height="${h}" fill="#241d16"/>${s}`;
  };

  /* Mapa de Centroamérica (contornos reales de Natural Earth) */
  A.mapCA = (o = {}) => {
    const M = window.MAP_CA;
    return `
      <rect width="600" height="400" fill="#18222b"/>
      <path d="${M.MX}" fill="#2a2620" stroke="#4a4032" stroke-width="1" class="fade" style="--delay:${o.delay || 0}s"/>
      <path d="${M.BZ}" fill="#2a2620" stroke="#4a4032" stroke-width="1" class="fade" style="--delay:${o.delay || 0}s"/>
      <path d="${M.SV}" fill="#2a2620" stroke="#4a4032" stroke-width="1" class="fade" style="--delay:${o.delay || 0}s"/>
      <path d="${M.HN}" fill="${o.hn || '#2a2620'}" stroke="#6b5f4c" stroke-width="1" class="fade" style="--delay:${o.delay || 0}s"/>
      <path d="${M.GT}" fill="${o.gt || '#2c3a2a'}" stroke="${C.green}" stroke-width="2" class="fade" style="--delay:${(o.delay || 0) + .2}s"/>`;
  };
  A.city = (name, o = {}) => {
    const [x, y] = window.MAP_CA.cities[name];
    const dx = o.dx || 0, dy = o.dy == null ? -10 : o.dy;
    return `<g class="fade" style="--delay:${o.delay || 0}s">
      <circle cx="${x}" cy="${y}" r="${o.r || 4}" fill="${o.fill || C.paper}"/>
      ${A.text(x + dx, y + dy, o.label || name, { anchor: o.anchor || 'middle', size: o.size || 11, fill: o.color || C.paper })}
    </g>`;
  };

  A.newspaper = (x, y, head, sub, rot = 0, delay = 0, lang = 'en') => `
    <g class="fade" style="--delay:${delay}s" transform="rotate(${rot} ${x + 90} ${y + 60})">
      <rect x="${x}" y="${y}" width="180" height="120" fill="${C.paper}"/>
      <rect x="${x + 8}" y="${y + 8}" width="164" height="3" fill="#3a3228"/>
      ${A.text(x + 90, y + 34, head, { font: 'Playfair Display', size: 17, weight: 800, fill: '#14110d' })}
      ${A.text(x + 90, y + 50, sub, { size: 8.5, fill: '#3a3228' })}
      ${[62, 72, 82, 92, 102].map(yy => `<rect x="${x + 10}" y="${y + yy}" width="74" height="4" fill="#b9ab8e"/><rect x="${x + 96}" y="${y + yy}" width="74" height="4" fill="#b9ab8e"/>`).join('')}
    </g>`;

  A.stamp = (x, y, w, h, inner, label, delay = 0) => {
    let perf = '';
    for (let i = 0; i <= w; i += 10) perf += `<circle cx="${x + i}" cy="${y}" r="3.5" fill="#1d1914"/><circle cx="${x + i}" cy="${y + h}" r="3.5" fill="#1d1914"/>`;
    for (let i = 0; i <= h; i += 10) perf += `<circle cx="${x}" cy="${y + i}" r="3.5" fill="#1d1914"/><circle cx="${x + w}" cy="${y + i}" r="3.5" fill="#1d1914"/>`;
    return `<g class="pop" style="--delay:${delay}s">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${C.paper}"/>${perf}
      <rect x="${x + 8}" y="${y + 8}" width="${w - 16}" height="${h - 34}" fill="${C.sky}"/>
      ${inner}
      ${A.text(x + w / 2, y + h - 12, label, { size: 10, fill: '#14110d' })}
    </g>`;
  };

  window.ART = A;
})();
