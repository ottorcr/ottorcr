/* Motor de la animación: escenas, transiciones, línea de tiempo, narración y controles. */
(function () {
  const scenes = window.SCENES;
  const $ = id => document.getElementById(id);
  const art = $('art'), text = $('text'), bar = $('bar'), timeline = $('timeline'), chapter = $('chapter');
  // Pista de narración grabada (la incrusta build.py); si no existe, se usa la voz del navegador.
  const track = window.NARRATION && window.NARRATION.length === scenes.length ? window.NARRATION : null;
  const audio = track ? new Audio() : null;
  if (audio) window.__narration = audio;
  let idx = 0, playing = false, elapsed = 0, last = performance.now(), narrate = false;

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
    if (audio) {
      audio.pause();
      audio.src = track[idx].src;
      if (narrate && playing) audio.play().catch(() => {});
      return;
    }
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    if (!narrate || !s.say) return;
    const u = new SpeechSynthesisUtterance(s.say);
    u.lang = 'es-MX';
    const v = speechSynthesis.getVoices().find(v => v.lang && v.lang.startsWith('es'));
    if (v) u.voice = v;
    speechSynthesis.speak(u);
  }

  function talking() {
    if (!narrate) return false;
    if (audio) return !audio.paused && !audio.ended;
    return 'speechSynthesis' in window && speechSynthesis.speaking;
  }

  // con narración, la escena dura al menos lo que dura su pista
  const sceneDur = i => Math.max(scenes[i].dur, narrate && track ? track[i].dur + 1.2 : 0);

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
    layer.style.setProperty('--dur', sceneDur(idx) + 's');
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
    if (audio) {
      if (p && narrate && !audio.ended) audio.play().catch(() => {}); else audio.pause();
    } else if ('speechSynthesis' in window) {
      p ? speechSynthesis.resume() : speechSynthesis.pause();
    }
  }

  function setNarrate(n) {
    narrate = n;
    $('narrate').setAttribute('aria-pressed', narrate);
    $('narrate').textContent = narrate ? '🔊 Narración' : '🔈 Narración';
  }

  function loop(t) {
    const dt = Math.min(.25, (t - last) / 1000); last = t;
    if (playing) {
      elapsed += dt;
      if (elapsed >= sceneDur(idx) && !talking()) {
        if (idx < scenes.length - 1) go(idx + 1); else { elapsed = sceneDur(idx); setPlaying(false); }
      }
    }
    bar.style.width = ((idx + Math.min(1, elapsed / sceneDur(idx))) / scenes.length * 100) + '%';
    requestAnimationFrame(loop);
  }

  $('prev').onclick = () => go(idx - 1);
  $('next').onclick = () => go(idx + 1);
  $('play').onclick = () => {
    if (!playing && idx === scenes.length - 1 && elapsed >= sceneDur(idx)) { setPlaying(true); go(0); return; }
    setPlaying(!playing);
  };
  $('sourcesBtn').onclick = () => go(scenes.findIndex(s => s.sources));
  $('narrate').onclick = () => {
    setNarrate(!narrate);
    elapsed = 0;
    speak(scenes[idx]);
  };
  document.addEventListener('keydown', e => {
    if (!$('intro').hidden) return;
    if (e.key === 'ArrowRight') go(idx + 1);
    else if (e.key === 'ArrowLeft') go(idx - 1);
    else if (e.key === ' ') { e.preventDefault(); $('play').click(); }
  });
  document.addEventListener('visibilitychange', () => { last = performance.now(); });

  // pantalla de inicio: el navegador solo permite audio tras un clic
  const start = parseInt(new URLSearchParams(location.search).get('escena'), 10);
  const first = Number.isFinite(start) ? start - 1 : 0;
  if (!track && !('speechSynthesis' in window)) $('introVoice').hidden = true;
  const begin = withVoice => {
    $('intro').hidden = true;
    setNarrate(withVoice);
    go(first);
    setPlaying(true);
  };
  $('introVoice').onclick = () => begin(true);
  $('introMute').onclick = () => begin(false);
  go(first);
  pauseAnimations(true);
  requestAnimationFrame(loop);
})();
