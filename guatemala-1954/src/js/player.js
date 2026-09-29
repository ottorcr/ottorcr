/* Motor de la animación: escenas, transiciones, línea de tiempo, narración y controles. */
(function () {
  const scenes = window.SCENES;
  const $ = id => document.getElementById(id);
  const art = $('art'), text = $('text'), bar = $('bar'), timeline = $('timeline'), chapter = $('chapter');
  let idx = 0, playing = true, elapsed = 0, last = performance.now(), narrate = false;

  scenes.forEach((s, i) => {
    if (i > 0 && scenes[i - 1].chapter !== s.chapter) {
      const sep = document.createElement('span'); sep.className = 'sep'; timeline.appendChild(sep);
    }
    const b = document.createElement('button');
    b.textContent = s.year;
    b.title = `${s.chapter} · ${s.title}`;
    b.onclick = () => go(i);
    timeline.appendChild(b);
  });

  function speak(s) {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    if (!narrate || !s.say) return;
    const u = new SpeechSynthesisUtterance(s.say);
    u.lang = 'es-MX';
    const v = speechSynthesis.getVoices().find(v => v.lang && v.lang.startsWith('es'));
    if (v) u.voice = v;
    speechSynthesis.speak(u);
  }

  function go(i) {
    idx = (i + scenes.length) % scenes.length;
    const s = scenes[idx];
    elapsed = 0;

    // transición: la capa anterior se desvanece mientras entra la nueva
    art.querySelectorAll('.layer').forEach(old => {
      old.classList.add('leaving');
      setTimeout(() => old.remove(), 800);
    });
    const layer = document.createElement('div');
    layer.className = 'layer entering';
    layer.style.setProperty('--dur', s.dur + 's');
    layer.style.setProperty('--kb', s.kb || 1.06);
    layer.style.setProperty('--kb-origin', s.origin || '50% 50%');
    layer.innerHTML = s.art() + (s.caption ? `<div class="caption">${s.caption}</div>` : '');
    art.appendChild(layer);
    requestAnimationFrame(() => requestAnimationFrame(() => layer.classList.remove('entering')));
    if (s.onEnter) s.onEnter(layer);

    text.innerHTML = `<div class="reveal">
        <div class="year">${s.year}</div>
        <div class="kicker">${s.kicker}</div>
        <h2 class="title">${s.title}</h2>
        <div class="body">${s.body}</div>
      </div>`;
    chapter.textContent = s.chapter;
    [...timeline.querySelectorAll('button')].forEach((b, j) => b.classList.toggle('on', j === idx));
    if (!playing) pauseAnimations(true);
    speak(s);
  }

  function pauseAnimations(p) {
    art.querySelectorAll('*').forEach(el => el.style.animationPlayState = p ? 'paused' : 'running');
  }

  function setPlaying(p) {
    playing = p;
    $('play').textContent = p ? '❚❚' : '►';
    $('play').setAttribute('aria-label', p ? 'Pausar' : 'Reproducir');
    pauseAnimations(!p);
    if ('speechSynthesis' in window) p ? speechSynthesis.resume() : speechSynthesis.pause();
  }

  function loop(t) {
    const dt = Math.min(.25, (t - last) / 1000); last = t;
    if (playing) {
      // con narración activa, espera a que termine la voz antes de avanzar
      const talking = narrate && 'speechSynthesis' in window && speechSynthesis.speaking;
      elapsed += dt;
      const d = scenes[idx].dur;
      if (elapsed >= d && !talking) {
        if (idx < scenes.length - 1) go(idx + 1); else { elapsed = d; setPlaying(false); }
      }
    }
    bar.style.width = ((idx + Math.min(1, elapsed / scenes[idx].dur)) / scenes.length * 100) + '%';
    requestAnimationFrame(loop);
  }

  $('prev').onclick = () => go(idx - 1);
  $('next').onclick = () => go(idx + 1);
  $('play').onclick = () => {
    if (!playing && idx === scenes.length - 1 && elapsed >= scenes[idx].dur) go(0);
    setPlaying(!playing);
  };
  $('sourcesBtn').onclick = () => go(scenes.findIndex(s => s.sources));
  $('narrate').onclick = () => {
    narrate = !narrate;
    $('narrate').setAttribute('aria-pressed', narrate);
    $('narrate').textContent = narrate ? '🔊 Narración' : '🔈 Narración';
    elapsed = 0;
    speak(scenes[idx]);
  };
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') go(idx + 1);
    else if (e.key === 'ArrowLeft') go(idx - 1);
    else if (e.key === ' ') { e.preventDefault(); $('play').click(); }
  });
  document.addEventListener('visibilitychange', () => { last = performance.now(); });

  const start = parseInt(new URLSearchParams(location.search).get('escena'), 10);
  go(Number.isFinite(start) ? start - 1 : 0);
  requestAnimationFrame(loop);
})();
