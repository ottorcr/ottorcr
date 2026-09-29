/* Guion de la animación: cada escena tiene texto, narración y una ilustración SVG animada. */
(function () {
  const A = window.ART, C = A.C, T = A.text;
  const svg = (inner) => `<svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">${inner}</svg>`;

  window.SCENES = [
    /* ───────────── CONTEXTO ───────────── */
    {
      chapter: 'Contexto', year: 'Guatemala', kicker: 'Una animación histórica · 1944–1954', dur: 12, kb: 1.08, origin: '50% 70%',
      title: 'La Primavera Democrática y su final',
      caption: 'Lago de Atitlán y sus volcanes',
      body: `<p>Tierra de volcanes, lagos y más de veinte pueblos mayas. Entre 1944 y 1954 Guatemala vivió diez años de democracia que el escritor Luis Cardoza y Aragón resumió así:</p>
             <blockquote>“Diez años de primavera en el país de la eterna tiranía.”<cite>LUIS CARDOZA Y ARAGÓN</cite></blockquote>
             <p>Terminaron con un golpe de Estado <strong>organizado y financiado por el gobierno de Estados Unidos</strong>. Esta es la historia de <strong>Jacobo Árbenz</strong>.</p>`,
      say: 'Guatemala: tierra de volcanes, lagos y pueblos mayas. Entre 1944 y 1954 vivió diez años de primavera democrática, que terminaron con un golpe de Estado organizado y financiado por el gobierno de Estados Unidos.',
      art: () => svg(`
        ${A.atitlan()}
        <g style="animation: qfly 9s ease-in-out 1.5s forwards; transform: translate(-160px, 120px)">
          <g class="float">${A.quetzal(1)}</g>
        </g>
        <style>@keyframes qfly { 0% { transform: translate(-160px,120px) } 100% { transform: translate(720px,40px) } }</style>
        ${A.huipil(382, 18, 2)}`)
    },
    {
      chapter: 'Contexto', year: '1944', kicker: 'Un país desigual', dur: 14, kb: 1.1, origin: '45% 60%',
      title: 'Café, banano y dictadura',
      caption: 'Contorno real de Guatemala (Natural Earth)',
      body: `<p>Guatemala tenía unos <strong>3 millones de habitantes</strong>, más de la mitad indígenas mayas. La economía dependía del <strong>café</strong> —en fincas de la bocacosta— y del <strong>banano</strong> de una empresa estadounidense.</p>
             <p>La tierra estaba muy concentrada: según el censo agropecuario de 1950, alrededor del <strong>2 % de los propietarios poseía más del 70 % de la tierra</strong> cultivable. Bajo el dictador <strong>Jorge Ubico</strong> (1931–1944), las leyes contra la “vagancia” obligaban a los campesinos a trabajar en fincas y obras públicas.</p>`,
      say: 'En 1944 Guatemala tenía unos tres millones de habitantes, en su mayoría indígenas mayas. Un pequeño grupo de propietarios concentraba la mayor parte de la tierra, y bajo el dictador Jorge Ubico los campesinos eran obligados a trabajar.',
      art: () => svg(`
        ${A.mapCA()}
        ${A.text(470, 360, 'OCÉANO PACÍFICO', { size: 10, fill: '#4c6378', cls: 'fade', delay: .6 })}
        ${A.text(470, 120, 'MAR CARIBE', { size: 10, fill: '#4c6378', cls: 'fade', delay: .6 })}
        ${A.text(250, 180, 'GUATEMALA', { font: 'Playfair Display', size: 22, weight: 800, fill: C.green, cls: 'fade', delay: .8 })}
        ${A.city('Ciudad de Guatemala', { delay: 1.2, dy: -10, anchor: 'start', dx: 4 })}
        ${A.city('Quetzaltenango', { delay: 1.4, anchor: 'end', dx: -8, dy: 4 })}
        ${A.city('Puerto Barrios', { delay: 1.6, anchor: 'start', dx: 8, dy: 4 })}
        ${A.city('Tikal', { delay: 1.8, dy: -10, label: 'Tikal (Petén)' })}
        ${[[190, 285], [205, 292], [222, 296], [170, 280]].map(([x, y], i) => `<circle class="pop" style="--delay:${2.4 + i * .15}s" cx="${x}" cy="${y}" r="5" fill="#7a4a2a" stroke="#c28d5a"/>`).join('')}
        ${A.text(160, 318, '☕ café', { size: 11, fill: '#c28d5a', cls: 'fade', delay: 2.8, anchor: 'end' })}
        ${[[366, 220], [352, 228], [188, 303]].map(([x, y], i) => `<circle class="pop" style="--delay:${3 + i * .15}s" cx="${x}" cy="${y}" r="5" fill="#d9c441"/>`).join('')}
        ${A.text(395, 238, '🍌 banano', { size: 11, fill: '#d9c441', cls: 'fade', delay: 3.3, anchor: 'start' })}
        <g class="fade" style="--delay:4.2s">
          <rect x="400" y="290" width="186" height="96" rx="8" fill="#14110d" opacity=".85" stroke="#3a3228"/>
          ${A.text(412, 310, 'PROPIETARIOS', { anchor: 'start', size: 9 })}
          <rect x="412" y="316" width="4" height="12" fill="${C.gold}"/><rect x="416" y="316" width="160" height="12" fill="#3a3228"/>
          ${A.text(412, 348, 'TIERRA', { anchor: 'start', size: 9 })}
          <rect x="412" y="354" width="164" height="12" fill="#3a3228"/>
          <rect x="412" y="354" width="0" height="12" fill="${C.gold}" style="animation: land70 1.6s ease 4.8s forwards"/>
          ${A.text(576, 378, '≈2 % posee >70 %', { anchor: 'end', size: 9, fill: C.gold })}
        </g>
        <style>@keyframes land70 { to { width: 118px } }</style>`)
    },

    /* ───────────── REVOLUCIÓN ───────────── */
    {
      chapter: 'Revolución', year: '1944', kicker: 'Revolución de Octubre', dur: 13, kb: 1.06,
      title: 'Cae la dictadura',
      caption: 'Ilustración: manifestación frente al Palacio Nacional',
      body: `<p>En junio de 1944, maestros, estudiantes universitarios y trabajadores salen a las calles. Ubico renuncia y deja el poder a otro general, Federico Ponce Vaides.</p>
             <p>El <strong>20 de octubre de 1944</strong> un levantamiento de jóvenes militares y civiles lo derroca. Entre sus líderes está un capitán de 31 años: <strong>Jacobo Árbenz</strong>.</p>`,
      say: 'En 1944 maestros, estudiantes y trabajadores salen a las calles. El veinte de octubre, un levantamiento cívico militar derroca a la dictadura. Entre sus líderes está un joven capitán: Jacobo Árbenz.',
      art: () => {
        let crowd = '';
        for (let row = 0; row < 3; row++)
          for (let i = 0; i < 15; i++) {
            const x = 18 + i * 40 + (row % 2) * 20, y = 322 + row * 30;
            crowd += `<g class="fade" style="--delay:${(1 + row * .3 + i * .05).toFixed(2)}s">${A.person(x, y, 1 + row * .12, row === 2 ? '#e8dbbd' : row === 1 ? '#cdbd9b' : '#a8997a', (i + row) % 3 === 0)}</g>`;
          }
        return svg(`
          <rect width="600" height="400" fill="#1e1a22"/>
          <g class="fade">${A.palace(280)}</g>
          <g class="fade" style="--delay:2.2s">
            <g class="wave-flag"><path d="M60 250 L230 244 L226 280 L64 284Z" fill="${C.red}"/></g>
            ${T(146, 270, '¡LIBERTAD!', { font: 'Playfair Display', size: 20, weight: 800, fill: C.ink })}
            <g class="wave-flag"><rect x="410" y="236" width="40" height="48" fill="${C.sky}"/><rect x="450" y="236" width="40" height="48" fill="#fff"/><rect x="490" y="236" width="40" height="48" fill="${C.sky}"/></g>
            <line x1="410" y1="236" x2="410" y2="330" stroke="#8b7a5c" stroke-width="3"/>
          </g>
          ${crowd}
          ${T(300, 36, '20 · X · 1944', { size: 14, cls: 'fade', delay: 2.6 })}`);
      }
    },
    {
      chapter: 'Revolución', year: '1945', kicker: 'Juan José Arévalo · 1945–1951', dur: 13, kb: 1.05,
      title: 'La primera primavera',
      body: `<p>El maestro <strong>Juan José Arévalo</strong> gana las primeras elecciones libres con una idea que llamó “socialismo espiritual”. Su gobierno crea:</p>
             <p>• una <strong>nueva Constitución</strong> (1945) &nbsp;• el <strong>Seguro Social</strong> (IGSS, 1946)<br>• el <strong>Código de Trabajo</strong> (1947) &nbsp;• la <strong>autonomía universitaria</strong>, escuelas y campañas de alfabetización.</p>
             <p>Árbenz es su <strong>ministro de la Defensa</strong>.</p>`,
      say: 'El maestro Juan José Arévalo gana las primeras elecciones libres. Su gobierno aprueba una nueva Constitución, crea el Seguro Social y el Código de Trabajo. Árbenz es su ministro de la Defensa.',
      art: () => {
        const items = [
          ['1945', 'Constitución', '📜', C.sky], ['1946', 'Seguro Social', '⚕️', C.green],
          ['1947', 'Código de Trabajo', '⚒️', C.gold], ['1945', 'Autonomía USAC', '🎓', C.red],
        ];
        return svg(`
          <rect width="600" height="400" fill="#1a1712"/>
          ${A.volcanoes(360)}
          <g class="fade">
            <rect x="200" y="250" width="200" height="110" fill="#5b4a35"/><path d="M190 252 L300 200 L410 252Z" fill="#7a3a2a"/>
            ${[0, 1, 2].map(i => `<rect x="${222 + i * 60}" y="275" width="36" height="30" fill="#2a2016"/>`).join('')}
            <rect x="286" y="315" width="28" height="45" fill="#2a2016"/>
            ${T(300, 244, 'ESCUELA', { size: 10, fill: C.paper })}
          </g>
          ${items.map(([y, l, ic, c], i) => {
            const x = 90 + i * 140;
            return `<g class="pop" style="--delay:${(1 + i * .5).toFixed(1)}s">
              <circle cx="${x}" cy="110" r="44" fill="#1d1914" stroke="${c}" stroke-width="3"/>
              <text x="${x}" y="122" text-anchor="middle" font-size="34">${ic}</text>
              ${T(x, 172, l, { font: 'IBM Plex Sans', size: 13, weight: 600, fill: C.ink })}
              ${T(x, 190, y, { size: 11, fill: c })}
            </g>`;
          }).join('')}
          ${[0, 1, 2, 3, 4, 5].map(i => `<g class="fade" style="--delay:${(3 + i * .12).toFixed(2)}s">${A.person(150 + i * 60 + (i > 2 ? 60 : 0), 395, .9, '#e8dbbd')}</g>`).join('')}`);
      }
    },

    /* ───────────── ÁRBENZ ───────────── */
    {
      chapter: 'Árbenz', year: 'Árbenz', kicker: '¿Quién era? · 1913–1971', dur: 15, kb: 1.06, origin: '40% 40%',
      title: 'El “Soldado del Pueblo”',
      caption: 'Retrato ilustrado (interpretación artística)',
      body: `<p><strong>Juan Jacobo Árbenz Guzmán</strong> nació en <strong>Quetzaltenango</strong> el 14 de septiembre de 1913. Su padre era un farmacéutico <strong>suizo</strong> emigrado a Guatemala; de él heredó la tez clara y el cabello castaño claro, y por ese origen algunos lo llamaban “el Suizo”.</p>
             <p>Fue un cadete brillante de la <strong>Escuela Politécnica</strong>. Se casó con la salvadoreña <strong>María Cristina Vilanova</strong>, mujer muy interesada en política que influyó en su pensamiento social. En las fotos de la época aparece serio, delgado, con el pelo peinado hacia atrás, de uniforme o de traje oscuro.</p>`,
      say: 'Jacobo Árbenz nació en Quetzaltenango en 1913, hijo de un farmacéutico suizo. Fue un cadete brillante, se casó con la salvadoreña María Cristina Vilanova, y con los años sus seguidores lo llamarían el Soldado del Pueblo.',
      art: () => svg(`
        <defs><radialGradient id="halo" cx="40%" cy="45%"><stop offset="0" stop-color="#3b3226"/><stop offset="1" stop-color="#14110d"/></radialGradient></defs>
        <rect width="600" height="400" fill="url(#halo)"/>
        <g class="fade"><g opacity=".12"><rect x="0" width="60" height="400" fill="${C.sky}"/><rect x="540" width="60" height="400" fill="${C.sky}"/></g></g>
        <g transform="translate(-120 6)"><g class="fade" style="--delay:.3s"><g class="float">${A.arbenz()}</g></g></g>
        ${[['Quetzaltenango, 1913', 70], ['Padre suizo · madre guatemalteca', 125], ['Cadete · Escuela Politécnica', 180], ['Ministro de la Defensa 1945–50', 235], ['Presidente 1951–54', 290]].map(([t, y], i) =>
          `<g class="fade" style="--delay:${(1.4 + i * .6).toFixed(1)}s"><line x1="356" y1="${y - 4}" x2="370" y2="${y - 4}" stroke="${C.gold}" stroke-width="2"/>${T(376, y, t, { anchor: 'start', size: 12, fill: C.ink })}</g>`).join('')}
        ${T(356, 350, '«Soldado del Pueblo»', { anchor: 'start', font: 'Playfair Display', italic: true, size: 20, fill: C.gold, cls: 'fade', delay: 4.8 })}`)
    },
    {
      chapter: 'Árbenz', year: '1951', kicker: 'Elecciones de 1950', dur: 12, kb: 1.05,
      title: 'Árbenz llega a la presidencia',
      body: `<p>Árbenz gana las elecciones de noviembre de 1950 con alrededor del <strong>65 % de los votos</strong> y asume el <strong>15 de marzo de 1951</strong>, en el primer traspaso pacífico del poder entre gobiernos electos en décadas.</p>
             <p>Promete convertir a Guatemala “de un país atrasado y de economía predominantemente feudal en un país moderno y capitalista”.</p>`,
      say: 'En 1950 Árbenz gana las elecciones con cerca del sesenta y cinco por ciento de los votos, y asume el quince de marzo de 1951. Promete convertir a Guatemala en un país moderno.',
      art: () => {
        let ballots = '';
        for (let i = 0; i < 9; i++) {
          const x = 110 + (i % 3) * 40, d = (i * .35).toFixed(2);
          ballots += `<rect x="${x}" y="40" width="26" height="34" rx="2" fill="${C.paper}" style="animation: drop 1.1s ease-in ${d}s forwards; opacity:0"/>`;
        }
        return svg(`
          <style>@keyframes drop { 0%{opacity:0; transform:translateY(-20px)} 15%{opacity:1} 90%{opacity:1; transform:translateY(130px)} 100%{opacity:0; transform:translateY(140px)} }
                 @keyframes fill65 { to { width: 234px; } }</style>
          ${ballots}
          <rect x="80" y="190" width="160" height="110" rx="6" fill="#3a3228" stroke="#8b7a5c" stroke-width="2"/>
          <rect x="120" y="186" width="80" height="8" rx="3" fill="#14110d"/>
          ${T(160, 255, 'VOTO', { size: 14 })}
          <g transform="translate(330 150) scale(.52)"><g class="fade" style="--delay:1.5s">${A.arbenz()}</g></g>
          ${T(486, 130, '15 · III · 1951', { size: 13, fill: C.gold, cls: 'fade', delay: 2.4 })}
          <g class="fade" style="--delay:3.2s">
            <rect x="60" y="330" width="360" height="20" rx="4" fill="#2a241c"/>
            <rect x="60" y="330" width="0" height="20" rx="4" fill="${C.sky}" style="animation: fill65 2s ease 3.4s forwards"/>
            ${T(60, 372, 'Árbenz ≈ 65 %', { anchor: 'start', size: 13 })}
            ${T(420, 372, 'otros', { anchor: 'end', size: 13 })}
          </g>`);
      }
    },
    {
      chapter: 'Árbenz', year: 'Proyecto', kicker: 'Soberanía económica', dur: 13, kb: 1.12, origin: '60% 60%',
      title: 'Carretera, puerto y electricidad',
      caption: 'Rutas aproximadas',
      body: `<p>El plan de Árbenz buscaba romper tres monopolios extranjeros:</p>
             <p>• una <strong>carretera al Atlántico</strong> que compitiera con el ferrocarril IRCA,<br>• un <strong>puerto nacional</strong> (Santo Tomás) frente a Puerto Barrios, controlado por la United Fruit,<br>• la <strong>hidroeléctrica Jurún Marinalá</strong>, frente a la eléctrica estadounidense.</p>
             <p>Y en el centro de todo: la <strong>reforma agraria</strong>.</p>`,
      say: 'Árbenz quería construir una carretera al Atlántico, un puerto nacional y una hidroeléctrica, para romper los monopolios extranjeros del ferrocarril, el puerto y la electricidad.',
      art: () => {
        const [cx, cy] = window.MAP_CA.cities['Ciudad de Guatemala'];
        const [px, py] = window.MAP_CA.cities['Puerto Barrios'];
        return svg(`
          ${A.mapCA()}
          ${A.city('Ciudad de Guatemala', { delay: .6, dy: -10, anchor: 'end', dx: -4 })}
          ${A.city('Puerto Barrios', { delay: .8, anchor: 'start', dx: 8, dy: -6 })}
          <path class="draw" style="--len:260;--d:2.4s;--delay:1.2s" d="M${cx} ${cy} C ${cx + 40} ${cy - 30} ${px - 70} ${py + 40} ${px} ${py}" stroke="#8b7a5c" stroke-width="3" fill="none" stroke-dasharray="6 5"/>
          ${T(300, 214, 'ferrocarril IRCA', { size: 10, fill: '#b7a98c', cls: 'fade', delay: 2 })}
          <path class="draw" style="--len:260;--d:2.4s;--delay:2.6s" d="M${cx} ${cy} C ${cx + 60} ${cy - 10} ${px - 40} ${py + 70} ${px - 4} ${py + 6}" stroke="${C.gold}" stroke-width="4" fill="none"/>
          ${T(330, 272, 'carretera al Atlántico', { size: 10.5, fill: C.gold, cls: 'fade', delay: 3.6 })}
          <g class="pop" style="--delay:4.4s"><path d="M${px - 8} ${py + 12} l8 -18 l8 18z" fill="${C.sky}"/></g>
          ${T(px + 10, py + 22, 'Santo Tomás', { anchor: 'start', size: 10, fill: C.sky, cls: 'fade', delay: 4.6 })}
          <g class="pop" style="--delay:5.2s"><circle cx="${cx - 18}" cy="${cy + 18}" r="10" fill="#1d1914" stroke="${C.gold}" stroke-width="2"/><path d="M${cx - 20} ${cy + 10} l-4 9 h6 l-3 9 l9 -12 h-6 l3 -6z" fill="${C.gold}"/></g>
          ${T(cx - 18, cy + 44, 'Jurún Marinalá', { anchor: 'middle', size: 10, fill: C.gold, cls: 'fade', delay: 5.4 })}`);
      }
    },
    {
      chapter: 'Árbenz', year: 'El Pulpo', kicker: 'United Fruit Company', dur: 13, kb: 1.06,
      title: 'Una empresa con poder de Estado',
      body: `<p>La estadounidense <strong>United Fruit Company</strong> —“El Pulpo”, porque sus tentáculos llegaban a todo— era el <strong>mayor terrateniente</strong> de Guatemala, con grandes plantaciones en Tiquisate y Bananera. La mayor parte de sus tierras estaba <strong>sin cultivar</strong>.</p>
             <p>Controlaba el ferrocarril y Puerto Barrios, y pagaba muy pocos impuestos gracias a concesiones de las dictaduras anteriores. Miguel Ángel Asturias la retrató en su “trilogía bananera”.</p>`,
      say: 'La United Fruit Company, llamada El Pulpo, era el mayor terrateniente del país. Controlaba el ferrocarril y el principal puerto, y la mayor parte de sus tierras estaba sin cultivar.',
      art: () => {
        let plants = '';
        [60, 130, 200, 270, 340, 410, 480, 550].forEach((x, i) => plants += A.bananaPlant(x, 250, .9, i * .15));
        let tentacles = '';
        for (let i = 0; i < 8; i++) {
          const a = -Math.PI + (i + .5) * Math.PI / 8;
          const ex = 300 + Math.cos(a) * 280, ey = 165 + Math.sin(a) * 90;
          tentacles += `<path class="draw" style="--len:420;--d:2.4s;--delay:${1.5 + i * .1}s" d="M300 110 Q ${300 + Math.cos(a) * 130} ${150 + i % 2 * 30} ${ex.toFixed(0)} ${ey.toFixed(0)}" stroke="#a8453a" stroke-width="${7 - Math.abs(i - 3.5)}" fill="none" stroke-linecap="round" opacity=".9"/>`;
        }
        const car = (x) => `<rect x="${x}" y="304" width="52" height="26" fill="#6d5a3a"/>${T(x + 26, 322, 'UFCo', { size: 10, fill: C.paper })}`;
        return svg(`
          <style>@keyframes train { from { transform: translateX(-260px) } to { transform: translateX(640px) } }</style>
          <rect y="250" width="600" height="150" fill="#1f1b15"/>
          ${plants}
          <line x1="0" y1="330" x2="600" y2="330" stroke="#5b4e3b" stroke-width="3"/>
          <line x1="0" y1="340" x2="600" y2="340" stroke="#5b4e3b" stroke-width="3"/>
          <g style="animation: train 7s linear 1s infinite; transform: translateX(-260px)">
            <rect x="0" y="300" width="60" height="30" rx="3" fill="#3f6fa0"/><rect x="40" y="288" width="18" height="14" fill="#3f6fa0"/>
            ${car(66)}${car(124)}${car(182)}
          </g>
          ${tentacles}
          <g class="pop" style="--delay:1.2s">
            <ellipse cx="300" cy="80" rx="62" ry="50" fill="#b8503f"/>
            <circle cx="280" cy="85" r="8" fill="#14110d"/><circle cx="320" cy="85" r="8" fill="#14110d"/>
            ${T(300, 60, 'UFCo', { font: 'Playfair Display', weight: 800, size: 16, fill: C.paper })}
          </g>`);
      }
    },
    {
      chapter: 'Árbenz', year: '1952', kicker: 'Decreto 900 · 17 de junio', dur: 14, kb: 1.05,
      title: 'La Reforma Agraria',
      body: `<p>El <strong>Decreto 900</strong> expropió solo <strong>tierras ociosas</strong> de fincas grandes y las entregó a campesinos. Los dueños recibían bonos según el valor que ellos mismos habían declarado para pagar impuestos.</p>
             <p>Unas <strong>100 000 familias</strong> recibieron tierra. A la United Fruit se le expropiaron cerca de 400 000 acres; el gobierno ofreció unos <strong>US$ 627 000</strong> y Washington reclamó casi <strong>US$ 16 millones</strong> en su nombre.</p>`,
      say: 'El Decreto novecientos expropió las tierras ociosas de las grandes fincas y las repartió entre unas cien mil familias campesinas, incluidas cientos de miles de acres de la United Fruit.',
      art: () => {
        let plots = '';
        const cols = 10, rows = 5;
        for (let r = 0; r < rows; r++)
          for (let c = 0; c < cols; c++) {
            const i = r * cols + c, x = 40 + c * 52, y = 70 + r * 44;
            const idle = (i * 7) % 10 < 7;
            plots += `<rect x="${x}" y="${y}" width="46" height="38" rx="3" fill="#3a3228" ${idle ? `style="animation: toGreen .6s ease ${(1.5 + i * .05).toFixed(2)}s forwards"` : ''}/>`;
            if (idle && i % 3 === 0) plots += `<g class="fade" style="--delay:${(2.2 + i * .05).toFixed(2)}s">${A.mayaPerson(x + 23, y + 36, .75, i)}</g>`;
          }
        return svg(`
          <style>@keyframes toGreen { to { fill: #5c9a47; } }</style>
          ${T(40, 52, 'TIERRA OCIOSA → TIERRA CULTIVADA', { anchor: 'start', size: 13, cls: 'fade' })}
          ${plots}
          <g class="fade" style="--delay:3.5s">
            <text x="300" y="340" text-anchor="middle" font-family="Playfair Display" font-weight="800" font-size="40" fill="${C.gold}" id="counter">0</text>
            ${T(300, 366, 'familias beneficiadas (aprox.)', { size: 13 })}
          </g>`);
      },
      onEnter(root) {
        const el = root.querySelector('#counter'); if (!el) return;
        const start = performance.now() + 3500, target = 100000;
        const tick = t => {
          if (!el.isConnected) return;
          const p = Math.min(1, Math.max(0, (t - start) / 2500));
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString('es-GT');
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    },

    /* ───────────── EL GOLPE ───────────── */
    {
      chapter: 'El golpe', year: 'Washington', kicker: 'Guerra Fría', dur: 14, kb: 1.04,
      title: 'Intereses cruzados',
      body: `<p>En plena Guerra Fría, el gobierno de <strong>Eisenhower</strong> presentó la reforma como una amenaza comunista. Árbenz había legalizado al Partido Guatemalteco del Trabajo (comunista) y tenía asesores de ese partido, aunque no había soviéticos en el país.</p>
             <p>Los hermanos Dulles —<strong>John Foster</strong>, secretario de Estado, y <strong>Allen</strong>, director de la CIA— tenían vínculos previos con la United Fruit a través del bufete Sullivan &amp; Cromwell.</p>`,
      say: 'En plena Guerra Fría, el gobierno de Eisenhower presentó la reforma agraria como una amenaza comunista. Los hermanos Dulles, al frente del Departamento de Estado y de la CIA, tenían vínculos previos con la United Fruit.',
      art: () => {
        const nodes = [
          { id: 'UFCo', x: 300, y: 80, c: '#b8503f' },
          { id: 'CIA · A. Dulles', x: 120, y: 200, c: C.usa },
          { id: 'Depto. de Estado · J. F. Dulles', x: 470, y: 200, c: C.usa },
          { id: 'Casa Blanca · Eisenhower', x: 300, y: 320, c: C.usa },
          { id: 'Prensa · Bernays', x: 110, y: 340, c: C.gold },
          { id: 'Sullivan &amp; Cromwell', x: 490, y: 340, c: C.gold },
        ];
        const edges = [[0, 1], [0, 2], [1, 3], [2, 3], [0, 4], [0, 5], [5, 1], [5, 2], [1, 2]];
        let s = `<g class="fade"><g opacity=".14"><path d="M240 250 Q300 170 360 250Z" fill="${C.usa}"/><rect x="232" y="250" width="136" height="14" fill="${C.usa}"/>${[0, 1, 2, 3, 4, 5, 6].map(i => `<rect x="${240 + i * 19}" y="264" width="8" height="40" fill="${C.usa}"/>`).join('')}</g></g>`;
        edges.forEach(([a, b], i) => {
          const P = nodes[a], Q = nodes[b], len = Math.hypot(P.x - Q.x, P.y - Q.y);
          s += `<line class="draw" style="--len:${len.toFixed(0)};--d:1.2s;--delay:${(1 + i * .35).toFixed(2)}s" x1="${P.x}" y1="${P.y}" x2="${Q.x}" y2="${Q.y}" stroke="#6b5f4c" stroke-width="2"/>`;
        });
        nodes.forEach((n, i) => {
          s += `<g class="pop" style="--delay:${(i * .2).toFixed(1)}s"><circle cx="${n.x}" cy="${n.y}" r="14" fill="${n.c}"/>
                ${T(n.x, n.y + 32, n.id, { font: 'IBM Plex Sans', weight: 600, size: 13, fill: C.ink })}</g>`;
        });
        return svg(s);
      }
    },
    {
      chapter: 'El golpe', year: '1953–54', kicker: 'Operación PBSUCCESS', dur: 15, kb: 1.06,
      title: 'Propaganda, púlpito y radio',
      body: `<p>En agosto de 1953 Eisenhower autoriza la operación encubierta <strong>PBSUCCESS</strong>. La United Fruit ya pagaba al publicista <strong>Edward Bernays</strong> para presentar a Guatemala en la prensa de EE. UU. como una amenaza roja.</p>
             <p>En abril de 1954 el arzobispo <strong>Mariano Rossell y Arellano</strong> publica una carta pastoral “sobre los avances del comunismo en Guatemala”. La CIA arma y entrena en Honduras y Nicaragua a un pequeño ejército del coronel <strong>Carlos Castillo Armas</strong> y crea la radio clandestina <strong>“La Voz de la Liberación”</strong>.</p>`,
      say: 'En agosto de 1953 Eisenhower autoriza la operación encubierta PBSUCCESS. Campañas de prensa, la carta pastoral del arzobispo y la radio clandestina La Voz de la Liberación preparan el terreno, mientras la CIA entrena al ejército de Castillo Armas.',
      art: () => svg(`
        <style>
          @keyframes stamp { 0%{opacity:0; transform:scale(2.2) rotate(-14deg)} 60%{opacity:1; transform:scale(.95) rotate(-14deg)} 100%{opacity:1; transform:scale(1) rotate(-14deg)} }
          @keyframes wave { 0%{opacity:.9; transform:scale(.3)} 100%{opacity:0; transform:scale(1.6)} }
          @keyframes leaf { 0%{opacity:0; transform:translate(0,0) rotate(0)} 10%{opacity:1} 100%{opacity:.9; transform:translate(var(--x),260px) rotate(var(--r))} }
        </style>
        ${A.newspaper(30, 40, '¿AMENAZA ROJA?', 'PRENSA DE EE. UU. · 1953–54', -6, .2)}
        <g class="fade" style="--delay:.6s">
          <rect x="60" y="190" width="200" height="190" rx="4" fill="${C.paper}"/>
          ${T(80, 220, 'MEMORANDUM', { anchor: 'start', size: 13, fill: '#3a3228' })}
          ${T(80, 238, 'SUBJECT: PBSUCCESS', { anchor: 'start', size: 11, fill: '#6b5f4c' })}
          ${[256, 272, 288, 304, 320, 336, 352].map((y, i) => `<rect x="80" y="${y}" width="${120 + (i * 37) % 50}" height="7" fill="${i % 3 === 1 ? '#14110d' : '#b9ab8e'}"/>`).join('')}
          <g style="transform-origin:160px 300px; opacity:0; animation: stamp .5s ease-out 1.8s forwards">
            <rect x="90" y="276" width="140" height="46" rx="4" fill="none" stroke="${C.red}" stroke-width="4"/>
            ${T(160, 308, 'SECRET', { size: 24, weight: 500, fill: C.red })}
          </g>
        </g>
        <g class="fade" style="--delay:2.4s">
          <path d="M300 250 L300 180 L330 150 L360 180 L360 250Z" fill="#3a3040"/>
          <rect x="325" y="118" width="10" height="36" fill="#3a3040"/><rect x="316" y="128" width="28" height="7" fill="#3a3040"/>
          <path d="M318 250 L318 214 Q330 198 342 214 L342 250Z" fill="#1d1914"/>
          <g transform="translate(372 170) rotate(8)"><rect width="56" height="72" fill="${C.paper}"/>${[14, 24, 34, 44, 54].map(y => `<rect x="8" y="${y}" width="40" height="4" fill="#b9ab8e"/>`).join('')}${T(28, 10, 'CARTA PASTORAL', { size: 5.5, fill: '#3a3228' })}</g>
          ${T(340, 272, 'Iglesia · abril 1954', { size: 10.5 })}
        </g>
        <g class="fade" style="--delay:3.4s">
          <path d="M500 330 L520 150 L540 330 Z M508 260 L532 260 M512 220 L528 220" stroke="${C.usa}" stroke-width="4" fill="none"/>
          <circle cx="520" cy="145" r="7" fill="${C.gold}"/>
          ${[0, 1, 2].map(i => `<circle cx="520" cy="145" r="60" fill="none" stroke="${C.gold}" stroke-width="3" style="transform-origin:520px 145px; animation: wave 2.4s ease-out ${3.5 + i * .8}s infinite; opacity:0"/>`).join('')}
          ${T(520, 355, '“La Voz de la Liberación”', { size: 11 })}
        </g>
        ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="${250 + i * 38}" y="10" width="14" height="18" fill="${C.paper}" style="--x:${(i % 2 ? 1 : -1) * (20 + i * 4)}px; --r:${i * 90}deg; animation: leaf 4s ease-in ${(4.5 + i * .25).toFixed(2)}s forwards; opacity:0"/>`).join('')}`)
    },
    {
      chapter: 'El golpe', year: '1954', kicker: '18 de junio', dur: 14, kb: 1.12, origin: '55% 65%',
      title: 'La invasión',
      caption: 'Rutas aproximadas',
      body: `<p>En mayo llega a Puerto Barrios el barco <strong>Alfhem</strong> con armas checoslovacas que Guatemala compró ante el embargo de EE. UU.; Washington lo presenta como prueba de la “amenaza soviética”.</p>
             <p>El <strong>18 de junio</strong> Castillo Armas cruza desde Honduras con unos <strong>480 hombres</strong>. Militarmente era una fuerza débil, pero aviones pilotados por mercenarios contratados por la CIA bombardean la capital y Puerto Barrios, y la radio clandestina siembra el pánico.</p>`,
      say: 'El dieciocho de junio de 1954, Castillo Armas cruza desde Honduras con unos cuatrocientos ochenta hombres. Aviones contratados por la CIA bombardean la capital mientras la radio clandestina siembra el pánico.',
      art: () => {
        const M = window.MAP_CA.cities;
        const [cx, cy] = M['Ciudad de Guatemala'], [fx, fy] = M['Florida (HN)'], [ex, ey] = M['Esquipulas'], [px, py] = M['Puerto Barrios'];
        return svg(`
          <style>
            @keyframes fly { from { transform: translate(560px, 120px) } to { transform: translate(${cx - 40}px, ${cy - 30}px) } }
            @keyframes boom { 0%{opacity:0; transform:scale(.2)} 30%{opacity:1} 100%{opacity:0; transform:scale(1.8)} }
          </style>
          <defs><marker id="arr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="${C.red}"/></marker></defs>
          ${A.mapCA({ hn: '#2a2a33' })}
          ${T(250, 180, 'GUATEMALA', { font: 'Playfair Display', size: 20, weight: 800, fill: C.green, cls: 'fade', delay: .4 })}
          ${T(470, 280, 'HONDURAS', { size: 12, cls: 'fade', delay: .4 })}
          ${A.city('Ciudad de Guatemala', { delay: .6, dy: 18 })}
          ${A.city('Esquipulas', { delay: .8, dy: 18 })}
          ${A.city('Puerto Barrios', { delay: .8, anchor: 'start', dx: 8, dy: -6 })}
          <path class="draw" style="--len:120;--d:2s;--delay:1.4s" d="M${fx + 60} ${fy + 20} Q ${fx} ${fy + 10} ${ex + 6} ${ey - 6}" stroke="${C.red}" stroke-width="5" fill="none" marker-end="url(#arr)"/>
          <path class="draw" style="--len:120;--d:2s;--delay:1.8s" d="M${fx + 50} ${fy - 10} Q ${fx - 10} ${fy - 20} ${fx - 38} ${fy - 30}" stroke="${C.red}" stroke-width="5" fill="none" marker-end="url(#arr)"/>
          ${T(fx + 64, fy + 44, '~480 hombres', { anchor: 'start', size: 11, fill: C.red, cls: 'fade', delay: 2.6 })}
          <g style="animation: fly 3.5s ease-in 3s forwards; transform: translate(560px,120px)"><g transform="scale(-.6 .6)">${A.plane()}</g></g>
          <circle cx="${cx}" cy="${cy}" r="26" fill="${C.gold}" style="transform-origin:${cx}px ${cy}px; animation: boom 1s ease-out 6.4s forwards; opacity:0"/>
          <circle cx="${cx}" cy="${cy}" r="26" fill="${C.red}" style="transform-origin:${cx}px ${cy}px; animation: boom 1s ease-out 7.2s forwards; opacity:0"/>
          <circle cx="${px}" cy="${py}" r="22" fill="${C.gold}" style="transform-origin:${px}px ${py}px; animation: boom 1s ease-out 8s forwards; opacity:0"/>`);
      }
    },
    {
      chapter: 'El golpe', year: '27 junio', kicker: '1954 · mensaje por radio', dur: 15, kb: 1.08,
      title: 'Árbenz renuncia',
      body: `<p>Presionado por los altos mandos del ejército, que temían una intervención directa de EE. UU., Árbenz entrega el poder al coronel Carlos Enrique Díaz y lo anuncia por radio:</p>
             <blockquote>“La verdad hay que buscarla en los intereses financieros de la compañía frutera y en los de los otros monopolios norteamericanos…”<cite>JACOBO ÁRBENZ · 27 DE JUNIO DE 1954</cite></blockquote>
             <p>En pocos días una junta tras otra entrega el poder a <strong>Castillo Armas</strong>.</p>`,
      say: 'La noche del veintisiete de junio de 1954, presionado por el ejército, Árbenz anuncia su renuncia por radio y acusa a la compañía frutera y a los monopolios norteamericanos. Pocos días después, Castillo Armas toma el poder.',
      art: () => svg(`
        <style>@keyframes glow { 0%,100%{opacity:.35} 50%{opacity:.95} } @keyframes soundw { 0%,100%{transform:scaleY(.3)} 50%{transform:scaleY(1)} }</style>
        <rect width="600" height="400" fill="#0e0c09"/>
        <rect x="0" y="300" width="600" height="100" fill="#1a140e"/>
        <g class="fade" style="--delay:.3s">
          <rect x="60" y="150" width="220" height="150" rx="18" fill="#5a4630" stroke="#2a2016" stroke-width="4"/>
          <rect x="80" y="170" width="120" height="110" rx="10" fill="#3a2d1e"/>
          ${[0, 1, 2, 3, 4, 5].map(i => `<line x1="90" y1="${182 + i * 16}" x2="190" y2="${182 + i * 16}" stroke="#2a2016" stroke-width="5"/>`).join('')}
          <rect x="215" y="175" width="50" height="22" rx="3" fill="${C.gold}" style="animation: glow 1.6s ease-in-out infinite"/>
          <circle cx="228" cy="240" r="12" fill="#2a2016"/><circle cx="255" cy="240" r="12" fill="#2a2016"/>
        </g>
        <g class="fade" style="--delay:1s">
          ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => `<rect x="${320 + i * 20}" y="170" width="10" height="80" rx="5" fill="${C.gold}" opacity=".8" style="transform-box:fill-box; transform-origin:center; animation: soundw ${(0.5 + (i % 4) * .15).toFixed(2)}s ease-in-out ${(i * .07).toFixed(2)}s infinite"/>`).join('')}
        </g>
        ${T(300, 90, 'TGW · Radio Nacional', { size: 12, cls: 'fade', delay: 1.2 })}
        ${T(300, 350, '«…temiendo que el ejemplo de Guatemala se propague…»', { font: 'Playfair Display', italic: true, size: 17, fill: C.paper, cls: 'fade', delay: 2 })}
        ${T(300, 50, 'FIN DE LA PRIMAVERA', { font: 'Playfair Display', weight: 800, size: 28, fill: C.red, cls: 'fade', delay: 5 })}`)
    },
    {
      chapter: 'El golpe', year: 'Exilio', kicker: '1954–1971', dur: 15, kb: 1.04,
      title: 'Humillación y destierro',
      caption: 'Ruta aproximada del exilio',
      body: `<p>Árbenz se refugia en la embajada de México con cientos de perseguidos. Al salir del país, en el aeropuerto, lo obligan a <strong>desnudarse</strong> para “comprobar” que no se llevaba nada: una humillación pública pensada para destruir su imagen.</p>
             <p>Comienza un exilio errante —<strong>México, Francia, Suiza, Checoslovaquia, la URSS, China, Uruguay, Cuba</strong>— marcado por la vigilancia de la CIA y tragedias familiares. Muere en la Ciudad de México en <strong>1971</strong>.</p>`,
      say: 'Árbenz sale al exilio. En el aeropuerto lo obligan a desnudarse, en un acto de humillación pública. Vive un exilio errante por Europa y América, y muere en la Ciudad de México en 1971.',
      art: () => {
        const W = window.MAP_WORLD, c = W.cities;
        const route = ['Guatemala', 'México', 'París', 'Suiza', 'Praga', 'Moscú', 'Pekín', 'Montevideo', 'La Habana', 'México'];
        let arcs = '';
        for (let i = 0; i < route.length - 1; i++) {
          const [x1, y1] = c[route[i]], [x2, y2] = c[route[i + 1]];
          const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - Math.max(12, Math.hypot(x2 - x1, y2 - y1) * .25);
          const len = Math.hypot(x2 - x1, y2 - y1) * 1.3 + 10;
          arcs += `<path class="draw" style="--len:${len.toFixed(0)};--d:.9s;--delay:${(1 + i * .9).toFixed(1)}s" d="M${x1} ${y1} Q${mx.toFixed(0)} ${my.toFixed(0)} ${x2} ${y2}" stroke="${C.gold}" stroke-width="2" fill="none"/>`;
        }
        const labels = Object.entries(c).map(([n, [x, y]], i) => {
          const idx = route.indexOf(n);
          const off = { 'Guatemala': [0, 14], 'México': [-4, -8, 'end'], 'La Habana': [4, -8, 'start'], 'París': [-4, -6, 'end'], 'Suiza': [0, 14], 'Praga': [4, -6, 'start'], 'Moscú': [4, -6, 'start'], 'Pekín': [0, -8], 'Montevideo': [6, 4, 'start'] }[n] || [0, -8];
          return `<g class="fade" style="--delay:${(1 + Math.max(0, idx - 1) * .9 + .8).toFixed(1)}s"><circle cx="${x}" cy="${y}" r="3.5" fill="${n === 'Guatemala' ? C.red : C.paper}"/>${T(x + off[0], y + off[1], n, { size: 9.5, fill: C.paper, anchor: off[2] || 'middle' })}</g>`;
        }).join('');
        return svg(`
          <rect width="600" height="400" fill="#141c24"/>
          <path d="${W.d}" fill="#2a2620" stroke="#3f372b" stroke-width=".6" class="fade"/>
          ${arcs}${labels}
          ${T(300, 385, '1954 → 1971', { size: 13, fill: C.gold, cls: 'fade', delay: 9 })}`);
      }
    },

    /* ───────────── DESPUÉS ───────────── */
    {
      chapter: 'Después', year: '1954–1996', kicker: 'Consecuencias', dur: 14, kb: 1.05,
      title: 'Una herida de décadas',
      body: `<p>El nuevo régimen <strong>anula la reforma agraria</strong> y devuelve la tierra a sus antiguos dueños, persigue a sindicalistas y campesinos, y quita el voto a los analfabetos. Castillo Armas es asesinado en 1957.</p>
             <p>La inestabilidad desemboca en el <strong>conflicto armado interno (1960–1996)</strong>. La Comisión para el Esclarecimiento Histórico estimó más de <strong>200 000 personas muertas o desaparecidas</strong>, en su gran mayoría mayas, y atribuyó la inmensa mayoría de las violaciones al Estado.</p>`,
      say: 'El nuevo régimen anula la reforma agraria. La inestabilidad desemboca en un conflicto armado interno de treinta y seis años, con más de doscientas mil personas muertas o desaparecidas.',
      art: () => {
        const marks = [1954, 1957, 1960, 1982, 1996];
        let tl = `<line class="draw" style="--len:480;--d:3s" x1="60" y1="200" x2="540" y2="200" stroke="#6b5f4c" stroke-width="3"/>`;
        marks.forEach((m, i) => {
          const x = 60 + (m - 1954) / (1996 - 1954) * 480;
          tl += `<g class="pop" style="--delay:${(.4 + (x - 60) / 480 * 3).toFixed(2)}s"><circle cx="${x}" cy="200" r="7" fill="${m === 1954 ? C.red : C.gold}"/></g>
                 ${T(x, i % 2 ? 240 : 175, m, { size: 13, cls: 'fade', delay: (.5 + (x - 60) / 480 * 3).toFixed(2) })}`;
        });
        let candles = '';
        for (let i = 0; i < 11; i++) {
          const x = 100 + i * 40;
          candles += `<g class="fade" style="--delay:${(3.5 + i * .15).toFixed(2)}s">
            <rect x="${x - 5}" y="310" width="10" height="36" fill="${C.paper}"/>
            <path d="M${x} 294 C ${x - 6} 302 ${x - 4} 310 ${x} 310 C ${x + 4} 310 ${x + 6} 302 ${x} 294Z" fill="#f0c257" style="transform-box:fill-box; transform-origin:bottom; animation: flick ${(0.8 + (i % 3) * .2).toFixed(1)}s ease-in-out infinite alternate"/></g>`;
        }
        return svg(`<style>@keyframes flick { from{transform:scaleY(.85) skewX(-4deg)} to{transform:scaleY(1.1) skewX(4deg)} }</style>
          ${T(300, 90, '+200 000', { font: 'Playfair Display', weight: 800, size: 40, fill: C.paper, cls: 'fade' })}
          ${T(300, 116, 'víctimas del conflicto armado (CEH, 1999)', { size: 12, cls: 'fade', delay: .3 })}
          ${tl}${candles}${A.huipil(372, 16, 4)}`);
      }
    },
    {
      chapter: 'Después', year: 'Voces', kicker: 'Opiniones y debates', dur: 18, kb: 1.03,
      title: '¿Héroe, reformista o amenaza?',
      body: `<div class="voices">
               <div class="voice pro"><b>Sus seguidores</b>El presidente que dio tierra a los campesinos y defendió la soberanía nacional frente a una empresa extranjera. Un mártir de la democracia.</div>
               <div class="voice con"><b>Sus opositores de 1954</b>Terratenientes, la jerarquía católica y los militares de la “Liberación” lo acusaron de abrir la puerta al comunismo y de tolerar invasiones de fincas.</div>
               <div class="voice usa"><b>Washington en 1954</b>John Foster Dulles celebró por radio la caída de Árbenz como una victoria de los propios guatemaltecos contra el comunismo, sin mencionar el papel de la CIA.</div>
               <div class="voice hist"><b>Los historiadores</b>La mayoría ve la reforma como capitalista y moderada —el propio decreto buscaba “liquidar la propiedad feudal”—; debaten cuánta influencia tuvo el PGT sobre Árbenz. Gleijeses la llamó una “esperanza rota”.</div>
             </div>`,
      say: 'Para sus seguidores, Árbenz fue el presidente que dio tierra a los campesinos y defendió la soberanía. Para sus opositores de 1954, una puerta al comunismo. Washington celebró su caída. Y los historiadores, en su mayoría, ven su reforma como moderada y capitalista.',
      art: () => {
        const q = [
          [150, 110, C.green, '🌽', 'Campesinos'], [450, 110, C.red, '⛪', 'Oposición'],
          [150, 290, C.usa, '🏛️', 'Washington'], [450, 290, C.gold, '📚', 'Historiadores'],
        ];
        return svg(`
          <rect width="600" height="400" fill="#17130f"/>
          ${q.map(([x, y, c, ic, l], i) => `
            <line class="draw" style="--len:180;--d:1s;--delay:${(1 + i * .5).toFixed(1)}s" x1="300" y1="200" x2="${x}" y2="${y}" stroke="${c}" stroke-width="2" stroke-dasharray="4 4"/>
            <g class="pop" style="--delay:${(1.6 + i * .5).toFixed(1)}s">
              <circle cx="${x}" cy="${y}" r="40" fill="#1d1914" stroke="${c}" stroke-width="3"/>
              <text x="${x}" y="${y + 11}" text-anchor="middle" font-size="30">${ic}</text>
              ${T(x, y + 60, l, { font: 'IBM Plex Sans', weight: 600, size: 13, fill: c })}
            </g>`).join('')}
          <circle cx="300" cy="200" r="78" fill="#17130f"/><g transform="translate(300 200) scale(.42) translate(-300 -230)"><g class="fade">${A.arbenz()}</g></g>`);
      }
    },
    {
      chapter: 'Después', year: '1995', kicker: 'El regreso', dur: 14, kb: 1.06,
      title: 'El pueblo lo carga en hombros',
      body: `<p>En octubre de 1995 sus restos vuelven de El Salvador a Guatemala. El partido MLN, heredero de la “Liberación”, se opone; pero miles de personas acuden a recibirlo.</p>
             <p>Camino al Cementerio General, la multitud <strong>baja el ataúd de la carroza</strong> y lo lleva por turnos sobre los hombros —campesinos, obreros, mujeres indígenas y estudiantes— a lo largo de tres kilómetros.</p>`,
      say: 'En 1995 los restos de Árbenz regresan a Guatemala. La multitud baja el ataúd de la carroza y lo lleva en hombros, por turnos, hasta el Cementerio General.',
      art: () => {
        let crowd = '';
        for (let i = 0; i < 16; i++) crowd += `<g class="fade" style="--delay:${(.3 + i * .08).toFixed(2)}s">${i % 3 === 0 ? A.mayaPerson(10 + i * 38, 380, 1.1, i) : A.person(10 + i * 38, 380, 1.15, i % 2 ? '#cdbd9b' : '#a8997a')}</g>`;
        const bearers = [0, 1, 2, 3].map(i => A.person(i * 34, 0, 1.2, '#e8dbbd')).join('');
        return svg(`
          <style>@keyframes march { from { transform: translate(-40px, 318px) } to { transform: translate(380px, 318px) } } @keyframes bob { from { transform: translateY(0) } to { transform: translateY(-3px) } }</style>
          <rect width="600" height="400" fill="#1e2129"/>
          <path d="M0 250 L600 250 L600 400 L0 400Z" fill="#26231e"/>
          <g class="fade">
            <rect x="420" y="130" width="160" height="120" fill="#3b3a38"/><path d="M410 132 L500 90 L590 132Z" fill="#4a4845"/>
            <rect x="480" y="170" width="40" height="80" fill="#1e2129"/>${T(500, 124, 'CEMENTERIO GENERAL', { size: 8.5, fill: C.paper })}
          </g>
          <g style="animation: march 12s linear forwards; transform: translate(-40px, 318px)">
            <g style="animation: bob .5s ease-in-out infinite alternate">
              <rect x="-10" y="-58" width="124" height="18" rx="4" fill="#4a3322"/>
              <rect x="-10" y="-58" width="124" height="6" fill="${C.sky}"/><rect x="30" y="-58" width="44" height="6" fill="#fff"/>
              ${[6, 30, 60, 90].map(x => `<circle cx="${x}" cy="-62" r="5" fill="${[C.red, C.gold, '#e7e0f0', C.red][x % 4]}"/>`).join('')}
            </g>
            ${bearers}
          </g>
          ${crowd}
          ${T(300, 60, '20 · X · 1995', { size: 14, fill: C.gold, cls: 'fade', delay: 1 })}
          ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `<circle cx="${40 + i * 55}" cy="${-10}" r="4" fill="${[C.red, C.gold, '#fff', C.sky][i % 4]}" style="animation: petal 5s linear ${(i * .5).toFixed(1)}s infinite"/>`).join('')}
          <style>@keyframes petal { to { transform: translate(30px, 420px) rotate(180deg) } }</style>`);
      }
    },
    {
      chapter: 'Después', year: 'Leyenda', kicker: 'En el imaginario popular', dur: 17, kb: 1.04,
      title: 'Murales, sellos y novelas',
      body: `<p>Para muchos guatemaltecos Árbenz es el símbolo de <strong>la oportunidad perdida</strong>: el país que pudo haber sido. Su rostro aparece en murales universitarios, pintas callejeras y marchas campesinas, casi siempre junto a la palabra <em>primavera</em>.</p>
             <p>En la cultura: <em>Week-end en Guatemala</em> (1956) de Miguel Ángel Asturias, la película <em>El silencio de Neto</em> (1994) y la novela <em>Tiempos recios</em> (2019) de Mario Vargas Llosa. Un joven médico argentino que vivía en Guatemala en 1954, <strong>Ernesto “Che” Guevara</strong>, dijo haberse radicalizado al ver el golpe.</p>
             <p>En 2023, <strong>Bernardo Arévalo</strong>, hijo de Juan José Arévalo, ganó la presidencia evocando una “nueva primavera”.</p>`,
      say: 'Hoy Árbenz es para muchos el símbolo de la oportunidad perdida. Aparece en murales, sellos y novelas, y la palabra primavera sigue viva en la política guatemalteca.',
      art: () => {
        const mini = `<g transform="translate(0 0)">${A.arbenz()}</g>`;
        return svg(`
          <rect width="600" height="400" fill="#1a1712"/>
          <g class="fade">
            <rect x="20" y="30" width="330" height="250" fill="#4a3c2e"/>
            ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => `<line x1="20" y1="${30 + i * 21}" x2="350" y2="${30 + i * 21}" stroke="#3e3226" stroke-width="1.5"/>`).join('')}
            <circle cx="150" cy="150" r="115" fill="${C.sky}" opacity=".25"/>
            <g transform="translate(150 165) scale(.48) translate(-300 -230)">${mini}</g>
            <path d="M200 60 C 260 40 330 60 340 110 C 300 90 250 90 200 60Z" fill="${C.green}" opacity=".8"/>
            <path d="M30 250 C 80 200 140 230 170 280 L30 280Z" fill="${C.red}" opacity=".7"/>
            ${T(270, 250, 'PRIMAVERA', { font: 'Playfair Display', weight: 800, size: 26, fill: C.gold })}
            
          </g>
          ${A.stamp(390, 36, 120, 150, `<g transform="translate(450 118) scale(.26) translate(-300 -230)">${A.arbenz()}</g>`, 'GUATEMALA · CORREOS', 1.4)}
          <g class="pop" style="--delay:2.4s">
            <rect x="380" y="214" width="200" height="66" rx="6" fill="#1f6b3a" stroke="#fff" stroke-width="2"/>
            ${T(480, 238, 'CARRETERA', { size: 10, fill: '#fff' })}
            ${T(480, 258, 'JACOBO ÁRBENZ GUZMÁN', { font: 'IBM Plex Sans', weight: 600, size: 12.5, fill: '#fff' })}
            ${T(480, 273, '→ Atlántico', { size: 9, fill: '#fff' })}
            <rect x="476" y="280" width="8" height="30" fill="#8b8b8b"/>
          </g>
          ${[['Week-end en Guatemala', '#7a3a2a', 1956], ['El silencio de Neto', '#2e4a6b', 1994], ['Tiempos recios', '#5a5a2a', 2019]].map(([t, c, y], i) => `
            <g class="fade" style="--delay:${(3.2 + i * .5).toFixed(1)}s">
              <rect x="${40 + i * 5}" y="${300 + i * 30}" width="300" height="26" rx="2" fill="${c}"/>
              ${T(55 + i * 5, 318 + i * 30, t, { anchor: 'start', font: 'Playfair Display', size: 13, fill: C.paper })}
              ${T(328 + i * 5, 318 + i * 30, y, { anchor: 'end', size: 10, fill: C.paper })}
            </g>`).join('')}
          ${T(480, 350, '“nueva primavera” · 2023', { size: 11, fill: C.gold, cls: 'fade', delay: 5 })}`);
      }
    },
    {
      chapter: 'Después', year: 'Memoria', kicker: 'Reconocimiento', dur: 15, kb: 1.05,
      title: 'La verdad sale a la luz',
      body: `<p>En <strong>1997</strong> la CIA desclasifica documentos sobre la operación. En <strong>1999</strong>, en Guatemala, el presidente <strong>Bill Clinton</strong> reconoce que el apoyo de EE. UU. a fuerzas militares que cometieron violencia y represión generalizada “fue un error”.</p>
             <p>En <strong>octubre de 2011</strong>, tras un acuerdo ante la Comisión Interamericana de Derechos Humanos, el presidente Álvaro Colom <strong>pide perdón a la familia Árbenz</strong>. El Estado se compromete a revisar los libros de texto, emitir sellos con su imagen y dar su nombre a la carretera al Atlántico.</p>
             <span class="fact">Recordar la historia es la mejor defensa de la democracia.</span>`,
      say: 'En 1997 la CIA desclasifica los documentos de la operación. En 1999 el presidente Clinton reconoce el error del apoyo estadounidense a la represión. Y en 2011 el Estado de Guatemala pide perdón a la familia de Jacobo Árbenz.',
      art: () => svg(`
        <style>@keyframes slide { from { transform: translateY(0) } to { transform: translateY(-90px) } }</style>
        <g class="fade">
          <rect x="140" y="170" width="320" height="170" rx="6" fill="#3a3228"/>
          <rect x="140" y="170" width="320" height="30" fill="#4a3f33"/>
        </g>
        ${[0, 1, 2].map(i => `
          <g style="animation: slide 1.6s ease ${(0.8 + i * .5).toFixed(1)}s forwards">
            <rect x="${170 + i * 90}" y="${190 + i * 4}" width="80" height="100" rx="2" fill="${C.paper}" transform="rotate(${(i - 1) * 6} ${210 + i * 90} 240)"/>
            <text x="${210 + i * 90}" y="${225 + i * 4}" text-anchor="middle" font-family="IBM Plex Mono" font-size="10" fill="${C.red}" transform="rotate(${(i - 1) * 6} ${210 + i * 90} 240)">DECLASSIFIED</text>
          </g>`).join('')}
        ${T(300, 60, '1997 · 1999 · 2011', { size: 14, cls: 'fade', delay: 2.4 })}
        ${A.huipil(362, 18, 3)}`)
    },
    {
      chapter: 'Después', year: 'Fuentes', kicker: 'Para saber más', dur: 22, sources: true, kb: 1.03,
      title: 'Lecturas recomendadas',
      body: `<p>• Comisión para el Esclarecimiento Histórico, <em>Guatemala: Memoria del Silencio</em> (1999).</p>
             <p>• Piero Gleijeses, <em>Shattered Hope: The Guatemalan Revolution and the United States, 1944–1954</em> (1991).</p>
             <p>• Stephen Schlesinger y Stephen Kinzer, <em>Fruta amarga: la CIA en Guatemala</em> (1982).</p>
             <p>• Nick Cullather, <em>Secret History</em> (CIA, 1994; publ. 1999) · Roberto García Ferreira, “La CIA y el exilio de Jacobo Árbenz” (2006).</p>
             <p>• Prensa Libre, hemeroteca: renuncia (1954) y repatriación de restos (1995) · Acuerdo de solución amistosa CIDH (2011).</p>`,
      say: 'Gracias por ver. Consulta las fuentes para profundizar en esta historia.',
      art: () => svg(`
        ${A.atitlan()}
        ${T(300, 70, 'Nunca más', { font: 'Playfair Display', weight: 800, size: 36, fill: C.paper, cls: 'fade', delay: 1.5 })}
        ${A.huipil(382, 18, 1)}`)
    },
  ];
})();
