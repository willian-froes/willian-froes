<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

:root {
  --ink: #06131d;
  --panel: rgba(8, 25, 38, .82);
  --cyan: #54c5f8;
  --blue: #168bff;
  --lime: #c4ff5e;
  --white: #ecf8ff;
}

* { box-sizing: border-box; }

.playground {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  max-width: 1040px;
  margin: 20px auto;
  padding: clamp(20px, 5vw, 56px);
  border: 1px solid rgba(84, 197, 248, .35);
  border-radius: 28px;
  color: var(--white);
  background:
    radial-gradient(ellipse at 10% 0%, rgba(22, 139, 255, .23), transparent 42%),
    radial-gradient(ellipse at 100% 80%, rgba(196, 255, 94, .11), transparent 36%),
    var(--ink);
  font-family: 'Space Grotesk', sans-serif;
  box-shadow: 0 24px 90px rgba(0, 0, 0, .38), inset 0 0 70px rgba(22, 139, 255, .06);
  animation: shell-arrive 900ms cubic-bezier(.2,.8,.2,1) both, shell-glow 7s ease-in-out 1s infinite;
}

.playground::before, .playground::after {
  position: absolute;
  z-index: -1;
  width: 260px;
  height: 260px;
  border: 1px solid rgba(84, 197, 248, .18);
  border-radius: 50%;
  content: '';
  pointer-events: none;
}
.playground::before { top: -150px; right: -40px; box-shadow: 0 0 0 24px rgba(84,197,248,.025), 0 0 0 50px rgba(84,197,248,.02); animation: orbit-drift 12s linear infinite; }
.playground::after { bottom: -205px; left: -105px; width: 330px; height: 330px; border-color: rgba(196,255,94,.14); animation: orbit-drift 18s linear infinite reverse; }

.topline { display:flex; align-items:center; justify-content:space-between; gap:16px; margin-bottom:36px; font: 700 12px 'Space Mono', monospace; letter-spacing:.12em; text-transform:uppercase; color:#9cb8c9; }
.live { display:inline-flex; align-items:center; gap:9px; }
.live::before { width:9px; height:9px; border-radius:50%; background:var(--lime); content:''; box-shadow:0 0 15px var(--lime); animation: beacon 1.4s ease-in-out infinite; }
.version { padding:8px 12px; border:1px solid rgba(84,197,248,.4); border-radius:999px; color:var(--cyan); background:rgba(84,197,248,.08); animation: badge-bob 3s ease-in-out infinite; }

.hero { display:grid; grid-template-columns:minmax(0,1.1fr) minmax(250px,.9fr); align-items:center; gap:32px; }
.eyebrow { margin:0 0 12px; color:var(--lime); font:700 12px 'Space Mono',monospace; letter-spacing:.16em; text-transform:uppercase; animation: slide-in 700ms 150ms both; }
.title { margin:0; color:var(--white); font-size:clamp(42px,8vw,82px); font-weight:700; line-height:.95; letter-spacing:-.07em; animation: title-in 900ms 250ms both; }
.title span { display:inline-block; color:var(--cyan); text-shadow:0 0 28px rgba(84,197,248,.52); animation: title-shimmer 4s ease-in-out 1.4s infinite; }
.intro { max-width:520px; margin:22px 0 0; color:#b7cbd8; font-size:17px; line-height:1.7; animation: slide-in 800ms 400ms both; }

.terminal { position:relative; padding:22px; overflow:hidden; border:1px solid rgba(84,197,248,.3); border-radius:18px; background:rgba(0,0,0,.78); box-shadow:0 15px 45px rgba(0,0,0,.4), 0 0 35px rgba(22,139,255,.12); transform:rotate(2deg); animation: terminal-float 5s ease-in-out infinite; }
.terminal-head { display:flex; align-items:center; gap:7px; padding-bottom:16px; border-bottom:1px solid rgba(255,255,255,.1); color:#8aa3b2; font:11px 'Space Mono',monospace; }
.dot { width:9px; height:9px; border-radius:50%; background:#ff605c; }
.dot:nth-child(2) { background:#ffbd44; }.dot:nth-child(3) { background:#00ca4e; }
.terminal-label { margin-left:auto; }
.code { min-height:110px; padding-top:22px; color:var(--cyan); font:14px/2 'Space Mono',monospace; }
.code-line { white-space:nowrap; overflow:hidden; width:0; animation: type-line 2.2s steps(22,end) 1s forwards, caret .8s step-end 1s 8; border-right:2px solid var(--cyan); }
.code-line:nth-child(2) { color:var(--lime); animation-delay:3.6s,3.6s; }
.code-line:nth-child(3) { color:#b79bff; animation-delay:6.2s,6.2s; }
.code-line:nth-child(4) { color:var(--cyan); animation-delay:8.8s,8.8s; }

.section { margin-top:54px; animation: slide-in 800ms 500ms both; }
.section-title { display:flex; align-items:center; gap:12px; margin:0 0 18px; color:#dff5ff; font:700 13px 'Space Mono',monospace; letter-spacing:.12em; text-transform:uppercase; }
.section-title::after { height:1px; flex:1; content:''; background:linear-gradient(90deg,rgba(84,197,248,.55),transparent); }
.tech-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:14px; }
.tech { display:flex; min-height:106px; flex-direction:column; align-items:center; justify-content:center; gap:10px; padding:14px; border:1px solid rgba(84,197,248,.18); border-radius:16px; color:#d4e8f3; text-decoration:none; background:linear-gradient(145deg,rgba(84,197,248,.09),rgba(255,255,255,.025)); transition:transform .25s,border-color .25s,box-shadow .25s; animation: card-bob 4s ease-in-out infinite; }
.tech:nth-child(2) { animation-delay:.25s; }.tech:nth-child(3) { animation-delay:.5s; }.tech:nth-child(4) { animation-delay:.75s; }
.tech:hover { transform:translateY(-9px) scale(1.04); border-color:var(--cyan); box-shadow:0 12px 32px rgba(22,139,255,.2); }
.tech img { width:38px; height:38px; object-fit:contain; transition:transform .35s; }
.tech:hover img { transform:rotate(-9deg) scale(1.14); }
.tech span { font:12px 'Space Mono',monospace; }

.details { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
.panel { padding:22px; border:1px solid rgba(84,197,248,.19); border-radius:18px; background:var(--panel); transition:transform .25s,border-color .25s; }
.panel:hover { transform:translateY(-4px); border-color:rgba(84,197,248,.55); }
.panel h3 { margin:0 0 16px; color:var(--cyan); font:700 12px 'Space Mono',monospace; letter-spacing:.1em; text-transform:uppercase; }
.commands { display:grid; gap:11px; margin:0; padding:0; list-style:none; }
.commands li { display:grid; grid-template-columns:minmax(145px,auto) 1fr; gap:12px; align-items:baseline; color:#a9bdc9; font-size:13px; }
.commands code { color:var(--lime); font:12px 'Space Mono',monospace; }
.owner { margin:0; color:#e6f5fc; font-size:15px; line-height:1.7; }
.owner small { display:block; color:#a9bdc9; }
.license { display:inline-block; margin-top:18px; padding:6px 10px; border-radius:8px; color:var(--ink); background:var(--lime); font:700 11px 'Space Mono',monospace; text-decoration:none; transition:transform .2s,box-shadow .2s; }
.license:hover { transform:rotate(-3deg) scale(1.06); box-shadow:0 0 20px rgba(196,255,94,.45); }
.footer { display:flex; justify-content:space-between; gap:14px; margin-top:38px; padding-top:18px; border-top:1px solid rgba(84,197,248,.16); color:#7993a3; font:11px 'Space Mono',monospace; }
.footer span:last-child { color:var(--cyan); animation: footer-pulse 2s ease-in-out infinite; }

@keyframes shell-arrive { from { opacity:0; transform:translateY(24px) scale(.985); } to { opacity:1; transform:translateY(0) scale(1); } }
@keyframes shell-glow { 0%,100% { box-shadow:0 24px 90px rgba(0,0,0,.38),inset 0 0 70px rgba(22,139,255,.06); } 50% { box-shadow:0 24px 100px rgba(0,0,0,.42),inset 0 0 100px rgba(22,139,255,.12); } }
@keyframes beacon { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.45; transform:scale(.65); } }
@keyframes badge-bob { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-4px); } }
@keyframes orbit-drift { to { transform:rotate(360deg); } }
@keyframes slide-in { from { opacity:0; transform:translateX(-16px); } to { opacity:1; transform:translateX(0); } }
@keyframes title-in { from { opacity:0; transform:translateY(18px); filter:blur(8px); } to { opacity:1; transform:translateY(0); filter:blur(0); } }
@keyframes title-shimmer { 0%,100% { text-shadow:0 0 20px rgba(84,197,248,.35); } 50% { text-shadow:0 0 38px rgba(84,197,248,.8); } }
@keyframes terminal-float { 0%,100% { transform:translateY(0) rotate(2deg); } 50% { transform:translateY(-10px) rotate(-1deg); } }
@keyframes type-line { from { width:0; } to { width:100%; } }
@keyframes caret { 50% { border-color:transparent; } }
@keyframes card-bob { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-5px); } }
@keyframes footer-pulse { 0%,100% { opacity:.65; } 50% { opacity:1; } }

@media (max-width:700px) {
  .hero,.details { grid-template-columns:1fr; }
  .terminal { max-width:440px; transform:none; }
  .tech-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
  .topline { margin-bottom:28px; }
}
@media (prefers-reduced-motion:reduce) {
  *,*::before,*::after { animation-duration:.01ms !important; animation-iteration-count:1 !important; scroll-behavior:auto !important; }
}
</style>

<div class="playground">
  <div class="topline">
    <span class="live">Experimentos em andamento</span>
    <span class="version">Flutter Playground · v0.1.0+1</span>
  </div>

  <div class="hero">
    <div>
      <p class="eyebrow">Um laboratório de ideias em Flutter</p>
      <h1 class="title">Flutter<br><span>Playground</span></h1>
      <p class="intro">Projeto de experimentação com Flutter. No momento, o app abre uma tela simples com a mensagem “Hello World!”. Pequeno começo, espaço grande para brincar com widgets.</p>
    </div>
    <div class="terminal" aria-label="Editor animado com nomes de widgets Flutter">
      <div class="terminal-head"><i class="dot"></i><i class="dot"></i><i class="dot"></i><span class="terminal-label">main.dart — flutter</span></div>
      <div class="code">
        <div class="code-line">Scaffold(</div>
        <div class="code-line">AppBar(</div>
        <div class="code-line">Container(</div>
        <div class="code-line">ListView(</div>
      </div>
    </div>
  </div>

  <section class="section">
    <h2 class="section-title">Stack de tecnologias</h2>
    <div class="tech-grid">
      <a class="tech" href="https://docs.flutter.dev/" title="Documentação do Flutter"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" alt="Flutter"><span>Flutter</span></a>
      <a class="tech" href="https://dart.dev/guides" title="Documentação do Dart"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" alt="Dart"><span>Dart</span></a>
      <a class="tech" href="https://developer.android.com/docs" title="Documentação do Android"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" alt="Android"><span>Android</span></a>
      <a class="tech" href="https://developer.apple.com/documentation/ios" title="Documentação do iOS"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" alt="Apple"><span>iOS</span></a>
    </div>
  </section>

  <section class="section">
    <h2 class="section-title">Painel de controle</h2>
    <div class="details">
      <div class="panel">
        <h3>Comandos rápidos</h3>
        <ul class="commands">
          <li><code>flutter pub get</code><span>Instala dependências</span></li>
          <li><code>flutter run</code><span>Executa o aplicativo</span></li>
          <li><code>flutter test</code><span>Roda os testes</span></li>
          <li><code>flutter analyze</code><span>Analisa o código</span></li>
        </ul>
      </div>
      <div class="panel">
        <h3>Quem está no teclado</h3>
        <p class="owner">Willian Froes<small>Desenvolvedor Front-end Web/Mobile e Designer UX/UI</small></p>
        <a class="license" href="LICENSE">Licença MIT</a>
      </div>
    </div>
  </section>

  <div class="footer"><span>Versão atual: 0.1.0+1</span><span>feito para experimentar ✦</span></div>
</div>

<html>
    <body>
        <style>
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

:root {
  --ink: #06131d;
  --panel: rgba(8, 25, 38, .82);
  --cyan: #54c5f8;
  --blue: #168bff;
  --lime: #c4ff5e;
  --white: #ecf8ff;
}

* { box-sizing: border-box; }

.playground {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  max-width: 1040px;
  margin: 20px auto;
  padding: clamp(20px, 5vw, 56px);
  border: 1px solid rgba(84, 197, 248, .35);
  border-radius: 28px;
  color: var(--white);
  background:
    radial-gradient(ellipse at 10% 0%, rgba(22, 139, 255, .23), transparent 42%),
    radial-gradient(ellipse at 100% 80%, rgba(196, 255, 94, .11), transparent 36%),
    var(--ink);
  font-family: 'Space Grotesk', sans-serif;
  box-shadow: 0 24px 90px rgba(0, 0, 0, .38), inset 0 0 70px rgba(22, 139, 255, .06);
  animation: shell-arrive 900ms cubic-bezier(.2,.8,.2,1) both, shell-glow 7s ease-in-out 1s infinite;
}

.playground::before, .playground::after {
  position: absolute;
  z-index: -1;
  width: 260px;
  height: 260px;
  border: 1px solid rgba(84, 197, 248, .18);
  border-radius: 50%;
  content: '';
  pointer-events: none;
}
.playground::before { top: -150px; right: -40px; box-shadow: 0 0 0 24px rgba(84,197,248,.025), 0 0 0 50px rgba(84,197,248,.02); animation: orbit-drift 12s linear infinite; }
.playground::after { bottom: -205px; left: -105px; width: 330px; height: 330px; border-color: rgba(196,255,94,.14); animation: orbit-drift 18s linear infinite reverse; }

.topline { display:flex; align-items:center; justify-content:space-between; gap:16px; margin-bottom:36px; font: 700 12px 'Space Mono', monospace; letter-spacing:.12em; text-transform:uppercase; color:#9cb8c9; }
.live { display:inline-flex; align-items:center; gap:9px; }
.live::before { width:9px; height:9px; border-radius:50%; background:var(--lime); content:''; box-shadow:0 0 15px var(--lime); animation: beacon 1.4s ease-in-out infinite; }
.version { padding:8px 12px; border:1px solid rgba(84,197,248,.4); border-radius:999px; color:var(--cyan); background:rgba(84,197,248,.08); animation: badge-bob 3s ease-in-out infinite; }

.hero { display:grid; grid-template-columns:minmax(0,1.1fr) minmax(250px,.9fr); align-items:center; gap:32px; }
.eyebrow { margin:0 0 12px; color:var(--lime); font:700 12px 'Space Mono',monospace; letter-spacing:.16em; text-transform:uppercase; animation: slide-in 700ms 150ms both; }
.title { margin:0; color:var(--white); font-size:clamp(42px,8vw,82px); font-weight:700; line-height:.95; letter-spacing:-.07em; animation: title-in 900ms 250ms both; }
.title span { display:inline-block; color:var(--cyan); text-shadow:0 0 28px rgba(84,197,248,.52); animation: title-shimmer 4s ease-in-out 1.4s infinite; }
.intro { max-width:520px; margin:22px 0 0; color:#b7cbd8; font-size:17px; line-height:1.7; animation: slide-in 800ms 400ms both; }

.terminal { position:relative; padding:22px; overflow:hidden; border:1px solid rgba(84,197,248,.3); border-radius:18px; background:rgba(0,0,0,.78); box-shadow:0 15px 45px rgba(0,0,0,.4), 0 0 35px rgba(22,139,255,.12); transform:rotate(2deg); animation: terminal-float 5s ease-in-out infinite; }
.terminal-head { display:flex; align-items:center; gap:7px; padding-bottom:16px; border-bottom:1px solid rgba(255,255,255,.1); color:#8aa3b2; font:11px 'Space Mono',monospace; }
.dot { width:9px; height:9px; border-radius:50%; background:#ff605c; }
.dot:nth-child(2) { background:#ffbd44; }.dot:nth-child(3) { background:#00ca4e; }
.terminal-label { margin-left:auto; }
.code { min-height:110px; padding-top:22px; color:var(--cyan); font:14px/2 'Space Mono',monospace; }
.code-line { white-space:nowrap; overflow:hidden; width:0; animation: type-line 2.2s steps(22,end) 1s forwards, caret .8s step-end 1s 8; border-right:2px solid var(--cyan); }
.code-line:nth-child(2) { color:var(--lime); animation-delay:3.6s,3.6s; }
.code-line:nth-child(3) { color:#b79bff; animation-delay:6.2s,6.2s; }
.code-line:nth-child(4) { color:var(--cyan); animation-delay:8.8s,8.8s; }

.section { margin-top:54px; animation: slide-in 800ms 500ms both; }
.section-title { display:flex; align-items:center; gap:12px; margin:0 0 18px; color:#dff5ff; font:700 13px 'Space Mono',monospace; letter-spacing:.12em; text-transform:uppercase; }
.section-title::after { height:1px; flex:1; content:''; background:linear-gradient(90deg,rgba(84,197,248,.55),transparent); }
.tech-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:14px; }
.tech { display:flex; min-height:106px; flex-direction:column; align-items:center; justify-content:center; gap:10px; padding:14px; border:1px solid rgba(84,197,248,.18); border-radius:16px; color:#d4e8f3; text-decoration:none; background:linear-gradient(145deg,rgba(84,197,248,.09),rgba(255,255,255,.025)); transition:transform .25s,border-color .25s,box-shadow .25s; animation: card-bob 4s ease-in-out infinite; }
.tech:nth-child(2) { animation-delay:.25s; }.tech:nth-child(3) { animation-delay:.5s; }.tech:nth-child(4) { animation-delay:.75s; }
.tech:hover { transform:translateY(-9px) scale(1.04); border-color:var(--cyan); box-shadow:0 12px 32px rgba(22,139,255,.2); }
.tech img { width:38px; height:38px; object-fit:contain; transition:transform .35s; }
.tech:hover img { transform:rotate(-9deg) scale(1.14); }
.tech span { font:12px 'Space Mono',monospace; }

.details { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
.panel { padding:22px; border:1px solid rgba(84,197,248,.19); border-radius:18px; background:var(--panel); transition:transform .25s,border-color .25s; }
.panel:hover { transform:translateY(-4px); border-color:rgba(84,197,248,.55); }
.panel h3 { margin:0 0 16px; color:var(--cyan); font:700 12px 'Space Mono',monospace; letter-spacing:.1em; text-transform:uppercase; }
.commands { display:grid; gap:11px; margin:0; padding:0; list-style:none; }
.commands li { display:grid; grid-template-columns:minmax(145px,auto) 1fr; gap:12px; align-items:baseline; color:#a9bdc9; font-size:13px; }
.commands code { color:var(--lime); font:12px 'Space Mono',monospace; }
.owner { margin:0; color:#e6f5fc; font-size:15px; line-height:1.7; }
.owner small { display:block; color:#a9bdc9; }
.license { display:inline-block; margin-top:18px; padding:6px 10px; border-radius:8px; color:var(--ink); background:var(--lime); font:700 11px 'Space Mono',monospace; text-decoration:none; transition:transform .2s,box-shadow .2s; }
.license:hover { transform:rotate(-3deg) scale(1.06); box-shadow:0 0 20px rgba(196,255,94,.45); }
.footer { display:flex; justify-content:space-between; gap:14px; margin-top:38px; padding-top:18px; border-top:1px solid rgba(84,197,248,.16); color:#7993a3; font:11px 'Space Mono',monospace; }
.footer span:last-child { color:var(--cyan); animation: footer-pulse 2s ease-in-out infinite; }

@keyframes shell-arrive { from { opacity:0; transform:translateY(24px) scale(.985); } to { opacity:1; transform:translateY(0) scale(1); } }
@keyframes shell-glow { 0%,100% { box-shadow:0 24px 90px rgba(0,0,0,.38),inset 0 0 70px rgba(22,139,255,.06); } 50% { box-shadow:0 24px 100px rgba(0,0,0,.42),inset 0 0 100px rgba(22,139,255,.12); } }
@keyframes beacon { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.45; transform:scale(.65); } }
@keyframes badge-bob { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-4px); } }
@keyframes orbit-drift { to { transform:rotate(360deg); } }
@keyframes slide-in { from { opacity:0; transform:translateX(-16px); } to { opacity:1; transform:translateX(0); } }
@keyframes title-in { from { opacity:0; transform:translateY(18px); filter:blur(8px); } to { opacity:1; transform:translateY(0); filter:blur(0); } }
@keyframes title-shimmer { 0%,100% { text-shadow:0 0 20px rgba(84,197,248,.35); } 50% { text-shadow:0 0 38px rgba(84,197,248,.8); } }
@keyframes terminal-float { 0%,100% { transform:translateY(0) rotate(2deg); } 50% { transform:translateY(-10px) rotate(-1deg); } }
@keyframes type-line { from { width:0; } to { width:100%; } }
@keyframes caret { 50% { border-color:transparent; } }
@keyframes card-bob { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-5px); } }
@keyframes footer-pulse { 0%,100% { opacity:.65; } 50% { opacity:1; } }

@media (max-width:700px) {
  .hero,.details { grid-template-columns:1fr; }
  .terminal { max-width:440px; transform:none; }
  .tech-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
  .topline { margin-bottom:28px; }
}
@media (prefers-reduced-motion:reduce) {
  *,*::before,*::after { animation-duration:.01ms !important; animation-iteration-count:1 !important; scroll-behavior:auto !important; }
}
</style>

<div class="playground">
  <div class="topline">
    <span class="live">Experimentos em andamento</span>
    <span class="version">Flutter Playground · v0.1.0+1</span>
  </div>

  <div class="hero">
    <div>
      <p class="eyebrow">Um laboratório de ideias em Flutter</p>
      <h1 class="title">Flutter<br><span>Playground</span></h1>
      <p class="intro">Projeto de experimentação com Flutter. No momento, o app abre uma tela simples com a mensagem “Hello World!”. Pequeno começo, espaço grande para brincar com widgets.</p>
    </div>
    <div class="terminal" aria-label="Editor animado com nomes de widgets Flutter">
      <div class="terminal-head"><i class="dot"></i><i class="dot"></i><i class="dot"></i><span class="terminal-label">main.dart — flutter</span></div>
      <div class="code">
        <div class="code-line">Scaffold(</div>
        <div class="code-line">AppBar(</div>
        <div class="code-line">Container(</div>
        <div class="code-line">ListView(</div>
      </div>
    </div>
  </div>

  <section class="section">
    <h2 class="section-title">Stack de tecnologias</h2>
    <div class="tech-grid">
      <a class="tech" href="https://docs.flutter.dev/" title="Documentação do Flutter"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" alt="Flutter"><span>Flutter</span></a>
      <a class="tech" href="https://dart.dev/guides" title="Documentação do Dart"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" alt="Dart"><span>Dart</span></a>
      <a class="tech" href="https://developer.android.com/docs" title="Documentação do Android"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" alt="Android"><span>Android</span></a>
      <a class="tech" href="https://developer.apple.com/documentation/ios" title="Documentação do iOS"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" alt="Apple"><span>iOS</span></a>
    </div>
  </section>

  <section class="section">
    <h2 class="section-title">Painel de controle</h2>
    <div class="details">
      <div class="panel">
        <h3>Comandos rápidos</h3>
        <ul class="commands">
          <li><code>flutter pub get</code><span>Instala dependências</span></li>
          <li><code>flutter run</code><span>Executa o aplicativo</span></li>
          <li><code>flutter test</code><span>Roda os testes</span></li>
          <li><code>flutter analyze</code><span>Analisa o código</span></li>
        </ul>
      </div>
      <div class="panel">
        <h3>Quem está no teclado</h3>
        <p class="owner">Willian Froes<small>Desenvolvedor Front-end Web/Mobile e Designer UX/UI</small></p>
        <a class="license" href="LICENSE">Licença MIT</a>
      </div>
    </div>
  </section>

  <div class="footer"><span>Versão atual: 0.1.0+1</span><span>feito para experimentar ✦</span></div>
</div>
    </body>
</html>