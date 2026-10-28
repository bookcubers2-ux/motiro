/* =====================================================================
   MOTIRÕ · PLANTILLAS DE MECÁNICA
   Cada plantilla recibe ctx = { root, visita, idx, done(stats), reintentar() }
   ===================================================================== */
var PLANTILLAS = {};

function introNivel(ctx, extra) {
  var v = ctx.visita, d = v.datos;
  ctx.root.innerHTML = dialogo(v.guia, d.intro, d.introFacil) + (extra || '') + '<div class="centrado"><button class="btn v" id="btnEmpezar">' + h(T('seguir')) + '</button></div>';
  decir(v.guia, S.calma ? d.introFacil : d.intro);
  return new Promise(function (res) { $('#btnEmpezar').addEventListener('click', function () { AU.init(); res(); }); });
}
function reloj(seg, onTick, onFin) {
  if (S.calma) return { parar: function () { } };
  var t = seg; onTick(t);
  var id = setInterval(function () { if (window.MOTIRO_PAUSA) return; t--; onTick(t); if (t <= 0) { clearInterval(id); onFin(); } }, 1000);
  alLimpiar(function () { clearInterval(id); });
  return { parar: function () { clearInterval(id); } };
}
function mmss(t) { return Math.floor(t / 60) + ':' + ('0' + (t % 60)).slice(-2); }

/* ======================= NIVEL 0: ESTANTE ======================= */
PLANTILLAS.ESTANTE = function (ctx) {
  var d = ctx.visita.datos;
  introNivel(ctx).then(function () {
    var orden = [1, 2, 0]; /* posiciones: índice de libro en cada hueco */
    var sel = null;
    function render() {
      ctx.root.innerHTML = '<p>' + h(T('ordenar')) + '</p><div class="estante" role="list" aria-label="' + h(T('ordenar')) + '">' +
        orden.map(function (li, pos) { var b = d.libros[li]; return '<button class="libro' + (sel === pos ? ' sel' : '') + '" role="listitem" data-pos="' + pos + '" style="background:' + b.color + '" aria-label="' + h(L(b.titulo)) + ', ' + (pos + 1) + '">' + h(L(b.titulo)) + '<span class="tomo">' + b.tomo + '</span></button>'; }).join('') + '</div>';
      $$('.libro', ctx.root).forEach(function (b) { b.addEventListener('click', function () { var pos = +b.getAttribute('data-pos'); AU.clic(); if (sel === null) { sel = pos; } else if (sel === pos) { sel = null; } else { var t = orden[sel]; orden[sel] = orden[pos]; orden[pos] = t; sel = null; } render(); comprobar(); }); });
      $$('.libro', ctx.root).forEach(function (b, i) { b.addEventListener('keydown', function (ev) { var pos = i; if (ev.key === 'ArrowLeft' && pos > 0) { ev.preventDefault(); var t = orden[pos]; orden[pos] = orden[pos - 1]; orden[pos - 1] = t; render(); $$('.libro', ctx.root)[pos - 1].focus(); comprobar(); } if (ev.key === 'ArrowRight' && pos < 2) { ev.preventDefault(); var t2 = orden[pos]; orden[pos] = orden[pos + 1]; orden[pos + 1] = t2; render(); $$('.libro', ctx.root)[pos + 1].focus(); comprobar(); } }); });
    }
    function comprobar() {
      if (orden.every(function (li, pos) { return d.libros[li].tomo === pos + 1; })) { $$('.libro', ctx.root).forEach(function (b) { b.classList.add('ok'); b.disabled = true; }); AU.ok(); VOZ.decir(T('bienOrdenado')); setTimeout(escenaCorta, 900); }
    }
    render();
    function escenaCorta() {
      var k = 0;
      function paso() {
        if (k >= d.escena.length) { pedirTitulo(); return; }
        var e = d.escena[k];
        ctx.root.innerHTML = (e.quien === 'expediente' ? '<svg class="expedienteFig come" role="img" aria-label="Don Expediente"><use href="#ch-expediente"></use></svg>' : '') + dialogo(e.quien, e) + '<div class="centrado"><button class="btn v" id="btnSig">' + h(T('seguir')) + '</button></div>';
        decir(e.quien, e); if (e.quien === 'expediente') AU.mal();
        $('#btnSig').addEventListener('click', function () { k++; paso(); }); $('#btnSig').focus();
      }
      paso();
    }
    function pedirTitulo() {
      ctx.root.innerHTML = dialogo('biblio', d.pedirTitulo) + '<div class="tarjeta"><label for="inpTitulo">' + h(T('tituloLey')) + ' <span class="nota">(' + h(T('maxCar')) + ')</span></label><input type="text" id="inpTitulo" maxlength="80" value="' + h(S.titulo) + '"><p class="nota">' + h(T('sugerencias')) + ':</p><div class="sugs">' + d.sugerencias.map(function (s) { return '<button class="btn g mini" data-s="' + h(L(s)) + '">' + h(L(s)) + '</button>'; }).join('') + '</div><button class="btn v" id="btnTituloOk" disabled>' + h(T('listo')) + '</button></div>';
      decir('biblio', d.pedirTitulo);
      var inp = $('#inpTitulo'), ok = $('#btnTituloOk');
      function chk() { ok.disabled = inp.value.trim().length < 3; }
      inp.addEventListener('input', chk); chk(); inp.focus();
      $$('[data-s]', ctx.root).forEach(function (b) { b.addEventListener('click', function () { inp.value = b.getAttribute('data-s'); chk(); inp.focus(); }); });
      ok.addEventListener('click', function () { S.titulo = inp.value.trim().slice(0, 80); save(); ctx.done({}); });
    }
  });
};

/* ======================= NIVEL 1: GUIA_POR_VOZ ======================= */
PLANTILLAS.GUIA_POR_VOZ = function (ctx) {
  var d = ctx.visita.datos, v = ctx.visita;
  introNivel(ctx).then(function () {
    var mapa = d.mapa.map(function (r) { return r.split(''); }); var H = mapa.length, W = mapa[0].length;
    var jugador = { x: 1, y: 1 }, ventanillas = {}, filas = [], paginas = 0, choques = 0, ojos = false, ultimo = null, terminado = false, tiempoRestante = d.tiempo;
    for (var y = 0; y < H; y++) for (var x = 0; x < W; x++) { var c = mapa[y][x]; if (c === 'S') { jugador = { x: x, y: y }; ultimo = { x: x, y: y }; } if (/[1-4]/.test(c)) ventanillas[c] = { x: x, y: y }; }
    /* filas: cada columna de 'q' contigua es una persona que oscila */
    var visto = {};
    for (y = 0; y < H; y++) for (x = 0; x < W; x++) if (mapa[y][x] === 'q' && !visto[x + ',' + y]) { var celdas = []; var yy = y; while (yy < H && mapa[yy][x] === 'q') { celdas.push({ x: x, y: yy }); visto[x + ',' + yy] = 1; yy++; } if (celdas.length === 1) { var xx = x; while (xx < W && mapa[y][xx] === 'q') { if (xx !== x) { celdas.push({ x: xx, y: y }); visto[xx + ',' + y] = 1; } xx++; } } filas.push({ celdas: celdas, i: 0, dir: 1 }); }
    var TAM = 44; var svgW = W * TAM, svgH = H * TAM;
    var rng = (function (s) { return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; }; })(7);
    var carteles = d.carteles.map(function (c, i) { return { t: L(c), x: 60 + rng() * (svgW - 160), y: 40 + rng() * (svgH - 80), rot: (rng() - .5) * 30 }; });
    var nieblas = [0, 1, 2, 3, 4].map(function () { return { x: rng() * (svgW - 120), y: rng() * (svgH - 100), w: 90 + rng() * 120, h: 60 + rng() * 70 }; });

    ctx.root.innerHTML = '<div class="hud"><span class="reloj" id="relojN1" aria-live="off"></span><span>' + h(T('paginas')) + ': <span id="paginas">' + [1, 2, 3, 4].map(function () { return '<i class="pagina"></i>'; }).join('') + '</span></span><span id="choquesTxt" class="nota">0 ' + h(T('choques')) + '</span>' +
      '<button class="btn b mini" id="btnOjos" aria-pressed="false">' + h(T('cerrarOjos')) + '</button></div>' +
      '<div class="n1"><div class="juego" style="position:relative"><svg id="tablero" viewBox="0 0 ' + svgW + ' ' + svgH + '" role="img" aria-label="' + h(L(v.titulo)) + '"></svg><div id="ojos" class="oculto">' + h(T('ojosTexto')) + '</div></div>' +
      '<div><div class="dpad" aria-label="controles"><span class="vacio"></span><button data-d="0,-1" aria-label="' + h(T('arriba')) + '">▲</button><span class="vacio"></span><button data-d="-1,0" aria-label="' + h(T('izquierda')) + '">◀</button><span class="vacio"></span><button data-d="1,0" aria-label="' + h(T('derecha')) + '">▶</button><span class="vacio"></span><button data-d="0,1" aria-label="' + h(T('abajo')) + '">▼</button><span class="vacio"></span></div>' + (S.calma ? '<p class="nota">' + h(T('turnos')) + '</p>' : '') + '</div></div>';
    var svg = $('#tablero');
    function objetivo() { return paginas < 4 ? ventanillas[String(paginas + 1)] : null; }
    function render() {
      var s = '';
      for (var y = 0; y < H; y++) for (var x = 0; x < W; x++) {
        var c = mapa[y][x]; var px = x * TAM, py = y * TAM;
        if (c === '#') s += '<rect x="' + px + '" y="' + py + '" width="' + TAM + '" height="' + TAM + '" fill="#8A8F98" stroke="#5c6066" stroke-width="2"/>';
        else { s += '<rect x="' + px + '" y="' + py + '" width="' + TAM + '" height="' + TAM + '" fill="' + ((x + y) % 2 ? '#F6EEDC' : '#EFE4C9') + '"/>'; }
        if (/[1-4]/.test(c)) { var n = +c; var hecho = n <= paginas; var act = n === paginas + 1; s += '<rect x="' + (px + 4) + '" y="' + (py + 4) + '" width="' + (TAM - 8) + '" height="' + (TAM - 8) + '" rx="6" fill="' + (hecho ? '#1E7B3C' : act ? '#E3B15B' : '#FFFDF7') + '" stroke="#1F2328" stroke-width="3"/><text x="' + (px + TAM / 2) + '" y="' + (py + TAM / 2 + 8) + '" text-anchor="middle" font-size="22" font-weight="900" fill="' + (hecho ? '#fff' : '#1F2328') + '">' + n + '</text>'; }
      }
      nieblas.forEach(function (n) { s += '<rect class="niebla" x="' + n.x + '" y="' + n.y + '" width="' + n.w + '" height="' + n.h + '" rx="18"/><text class="cartel" x="' + (n.x + 10) + '" y="' + (n.y + 22) + '" opacity=".6">AVISO · NOTICE</text>'; });
      carteles.forEach(function (c) { s += '<g transform="translate(' + c.x + ',' + c.y + ') rotate(' + c.rot + ')"><rect x="-4" y="-12" width="' + (c.t.length * 6.2 + 8) + '" height="16" fill="#FFFDF7" stroke="#C2602F" stroke-width="1.5"/><text class="cartel" x="0" y="0">' + h(c.t) + '</text></g>'; });
      filas.forEach(function (f) { var p = f.celdas[f.i]; s += '<g transform="translate(' + (p.x * TAM + TAM / 2) + ',' + (p.y * TAM + TAM / 2) + ')"><circle r="15" fill="#C2602F" stroke="#1F2328" stroke-width="3"/><circle cx="-5" cy="-3" r="2.5" fill="#1F2328"/><circle cx="5" cy="-3" r="2.5" fill="#1F2328"/><path d="M-5 6 q5 -5 10 0" stroke="#1F2328" stroke-width="2" fill="none"/></g>'; });
      s += '<g transform="translate(' + (jugador.x * TAM + TAM / 2) + ',' + (jugador.y * TAM + TAM / 2) + ')"><use href="#ch-hoja-mini" x="-16" y="-20" width="32" height="38"/></g>';
      svg.innerHTML = s;
      $('#paginas').innerHTML = [1, 2, 3, 4].map(function (i) { return '<i class="pagina' + (i <= paginas ? ' on' : '') + '"></i>'; }).join('');
      $('#choquesTxt').textContent = choques + ' ' + T('choques');
    }
    function libre(x, y) { return x >= 0 && y >= 0 && x < W && y < H && mapa[y][x] !== '#'; }
    function hayFila(x, y) { return filas.some(function (f) { var p = f.celdas[f.i]; return p.x === x && p.y === y; }); }
    function moverFilas() {
      filas.forEach(function (f) {
        if (f.celdas.length < 2) return;
        var ni = f.i + f.dir, nd = f.dir;
        if (ni >= f.celdas.length || ni < 0) { nd = -f.dir; ni = f.i + nd; }
        /* Modo Calma: la fila nunca se mete en la celda del jugador (bloquea, no empuja) */
        if (S.calma && f.celdas[ni].x === jugador.x && f.celdas[ni].y === jugador.y) return;
        f.i = ni; f.dir = nd;
      });
      if (!S.calma && hayFila(jugador.x, jugador.y)) choque();
      render();
    }
    function choque() { choques++; AU.mal(); jugador = { x: ultimo.x, y: ultimo.y }; VOZ.decir(L(d.choque)); }
    function mover(dx, dy) {
      if (terminado || window.MOTIRO_PAUSA) return;
      var nx = jugador.x + dx, ny = jugador.y + dy; if (!libre(nx, ny)) { AU.tono(150, 0.08, 'square', 0.1); return; }
      if (S.calma && hayFila(nx, ny)) { /* turno de espera: la fila avanza, vos no */ AU.tono(150, 0.08, 'square', 0.1); VOZ.sub(T('turnos')); moverFilas(); return; }
      jugador = { x: nx, y: ny }; AU.tono(300 + Math.random() * 60, 0.04, 'triangle', 0.06);
      if (hayFila(nx, ny)) { choque(); render(); return; }
      var c = mapa[ny][nx];
      if (/[1-4]/.test(c)) { var n = +c; if (n === paginas + 1) { paginas++; ultimo = { x: nx, y: ny }; AU.ok(); VOZ.decir(T('llegaste') + ' ' + n + '. ' + L(d.ventanillas[n - 1])); if (paginas === 4) { ganar(); return; } } else if (n > paginas + 1) { VOZ.decir(T('primeroVent') + ' ' + (paginas + 1)); } }
      if (S.calma) moverFilas();
      render();
    }
    function pista() {
      var o = objetivo(); if (!o || terminado) return;
      var dx = o.x - jugador.x, dy = o.y - jugador.y; var partes = [];
      if (Math.abs(dx) > 0) partes.push(T(dx > 0 ? 'derecha' : 'izquierda'));
      if (Math.abs(dy) > 0) partes.push(T(dy > 0 ? 'abajo' : 'arriba'));
      VOZ.decir(T('ventanilla') + ' ' + (paginas + 1) + ' ' + partes.join(', ') + ', ' + (Math.abs(dx) + Math.abs(dy)) + ' ' + T('pasos') + '.');
    }
    function baliza() {
      var o = objetivo(); if (!o || terminado || window.MOTIRO_PAUSA) return;
      var dx = o.x - jugador.x, dy = o.y - jugador.y; var dist = Math.abs(dx) + Math.abs(dy); var maxD = W + H;
      AU.ding(Math.max(-1, Math.min(1, dx / 5)), 440 + (1 - dist / maxD) * 660);
    }
    function ganar() { terminado = true; AU.pararBalizas(); render(); setTimeout(function () { ctx.done({ choques: choques, tiempo: d.tiempo - tiempoRestante }); }, 1200); }
    function perder() { terminado = true; AU.pararBalizas(); VOZ.decir(T('ventCerro')); ctx.root.insertAdjacentHTML('afterbegin', '<div class="aviso"><b>' + h(T('ventCerro')) + '</b> <button class="btn mini" id="btnRe">' + h(T('reintentar')) + '</button></div>'); $('#btnRe').addEventListener('click', ctx.reintentar); $('#btnRe').focus(); }
    /* controles */
    function onKey(ev) { var m = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0], w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0] }[ev.key]; if (m) { ev.preventDefault(); mover(m[0], m[1]); } if (ev.key === 'h' || ev.key === 'H') pista(); }
    document.addEventListener('keydown', onKey); alLimpiar(function () { document.removeEventListener('keydown', onKey); });
    $$('.dpad button', ctx.root).forEach(function (b) { b.addEventListener('click', function () { var p = b.getAttribute('data-d').split(','); mover(+p[0], +p[1]); }); });
    svg.addEventListener('click', function (ev) { var r = svg.getBoundingClientRect(); var cx = (ev.clientX - r.left) / r.width * svgW, cy = (ev.clientY - r.top) / r.height * svgH; var dx = cx - (jugador.x * TAM + TAM / 2), dy = cy - (jugador.y * TAM + TAM / 2); if (Math.abs(dx) > Math.abs(dy)) mover(dx > 0 ? 1 : -1, 0); else mover(0, dy > 0 ? 1 : -1); });
    $('#btnOjos').addEventListener('click', function () { ojos = !ojos; $('#ojos').classList.toggle('oculto', !ojos); $('#btnOjos').setAttribute('aria-pressed', ojos ? 'true' : 'false'); $('#btnOjos').textContent = ojos ? T('abrirOjos') : T('cerrarOjos'); if (ojos) pista(); });
    /* tiempo, balizas, filas */
    var rj = $('#relojN1');
    if (S.calma) rj.textContent = T('calma'); else reloj(d.tiempo, function (t) { tiempoRestante = t; rj.textContent = T('reloj') + ' ' + mmss(t); rj.classList.toggle('urgente', t <= 30); }, perder);
    if (!S.calma) { var fid = setInterval(function () { if (!terminado && !window.MOTIRO_PAUSA) moverFilas(); }, 750); alLimpiar(function () { clearInterval(fid); }); }
    AU.balizaTimer = setInterval(baliza, 1100);
    var pid = setInterval(pista, 9000); alLimpiar(function () { clearInterval(pid); });
    render(); setTimeout(pista, 800);
    if (!S.lector) VOZ.sub('H = ' + T('ventanilla'));
  });
};

/* ======================= NIVEL 2: MURO_DE_PALABRAS ======================= */
PLANTILLAS.MURO_DE_PALABRAS = function (ctx) {
  var d = ctx.visita.datos, v = ctx.visita;
  introNivel(ctx).then(function () {
    var segs = d.segmentos[S.lang] || d.segmentos.es;
    var cola = []; segs.forEach(function (seg, si) { seg.forEach(function (w, wi) { cola.push({ t: w.t, f: w.f, seg: si, fin: wi === seg.length - 1, facil: false }); }); });
    var linea = [], muro = 0, escalones = 0, ci = 0, pausas = 0, pausasOk = 0, enPausa = false, pausaRota = false, maxPal = 0, terminado = false, timer = null;
    ctx.root.innerHTML = '<div class="hud"><span class="reloj">' + h(T('escalones')) + ': <b id="esc">0</b>/' + d.meta + '</span><span class="reloj">' + h(T('muro')) + ': <b id="mur">0</b>/' + d.muroMax + '</span>' + (S.calma ? '<button class="btn mini" id="btnSig">' + h(T('siguientePalabra')) + '</button>' : '') + '</div>' +
      '<div class="juego n2"><div class="muro" id="muro" aria-label="' + h(T('muro')) + '"><span class="techo">▼</span></div><div class="cinta"><div class="linea" id="linea" aria-live="polite"></div></div><div class="escalera" id="escalera"><svg class="tomasFig" id="tomasFig" style="bottom:4px" role="img" aria-label="Tomás"><use href="#ch-tomas"></use></svg></div><div id="pausaCaja" class="pausaCaja oculto"></div></div>' +
      '<p class="nota">' + h(L(d.introFacil)) + '</p>';
    function chipHtml(w, i) { return '<span class="pal' + (w.f ? (w.facil ? ' facil' : ' dificil') : '') + '" data-i="' + i + '"' + (w.f && !w.facil ? ' role="button" tabindex="0" title="' + h(T('glosario')) + ': ' + h(w.f) + '"' : '') + '>' + h(w.facil ? w.f : w.t) + '</span><button class="gap" data-g="' + (i + 1) + '" aria-label="' + h(T('cortar')) + ' ' + (i + 1) + '"></button>'; }
    function renderLinea() { /* render completo (tras un corte) */
      $('#linea').innerHTML = linea.map(chipHtml).join('');
      medir();
    }
    function agregarChip() { /* render incremental: solo la palabra nueva, sin re-animar las demás */
      var i = linea.length - 1; $('#linea').insertAdjacentHTML('beforeend', chipHtml(linea[i], i)); medir();
    }
    function medir() { maxPal = Math.max(maxPal, linea.reduce(function (a, w) { return a + w.t.split(' ').length; }, 0)); }
    /* delegación de eventos: la línea cambia todo el tiempo */
    $('#linea').addEventListener('click', function (ev) {
      var g = ev.target.closest('.gap'); if (g) { cortar(+g.getAttribute('data-g')); return; }
      var p = ev.target.closest('.pal.dificil'); if (p) cambiarPalabra(p);
    });
    $('#linea').addEventListener('keydown', function (ev) { var p = ev.target.closest('.pal.dificil'); if (p && (ev.key === 'Enter' || ev.key === ' ')) { ev.preventDefault(); cambiarPalabra(p); } });
    function cambiarPalabra(p) { var i = +p.getAttribute('data-i'); if (!linea[i]) return; linea[i].facil = true; AU.clic(); p.className = 'pal facil'; p.textContent = linea[i].f; p.removeAttribute('role'); p.removeAttribute('tabindex'); }
    function toque() { if (enPausa) pausaRota = true; }
    ctx.root.addEventListener('pointerdown', toque); ctx.root.addEventListener('keydown', toque);
    function cortar(g) {
      if (terminado || enPausa) return;
      var izq = linea.slice(0, g); if (!izq.length) return;
      if (!izq[izq.length - 1].fin) { muro++; AU.mal(); $('#linea').classList.add('mal'); setTimeout(function () { $('#linea').classList.remove('mal'); }, 400); VOZ.sub(L(d.corteMalo)); agregarLadrillo(izq.map(function (w) { return w.t; }).join(' ')); comprobar(); return; }
      if (izq.some(function (w) { return w.f && !w.facil; })) { AU.mal(); VOZ.sub(L(d.sucio)); return; }
      var n = izq.filter(function (w) { return w.fin; }).length;
      var texto = izq.map(function (w) { return w.facil ? w.f : w.t; }).join(' ');
      linea = linea.slice(g); for (var k = 0; k < n; k++) subir(texto); AU.ok(); renderLinea(); comprobar();
    }
    function agregarLadrillo(txt) { $('#muro').insertAdjacentHTML('beforeend', '<div class="ladrillo">' + h(txt) + '</div>'); $('#mur').textContent = muro; }
    function subir(txt) { escalones++; $('#escalera').insertAdjacentHTML('beforeend', '<div class="escalon">' + h(txt) + '</div>'); $('#esc').textContent = escalones; $('#tomasFig').style.bottom = (4 + escalones * 36) + 'px'; if (escalones % d.pausaCada === 0 && escalones < d.meta) pedirPausa(); }
    function pedirPausa() {
      enPausa = true; pausaRota = false; pausas++; clearInterval(timer); var seg = d.pausaSeg; var caja = $('#pausaCaja'); caja.classList.remove('oculto');
      VOZ.decir(L(d.pausa));
      function pinta() { caja.innerHTML = '<span>' + h(L(d.pausa)) + '</span><b>' + seg + '</b>'; }
      pinta();
      var pid = setInterval(function () { if (window.MOTIRO_PAUSA) return; seg--; pinta(); if (seg <= 0) { clearInterval(pid); enPausa = false; caja.classList.add('oculto'); if (!pausaRota) { pausasOk++; VOZ.sub(L(d.pausaOk)); AU.ok(); } else VOZ.sub(L(d.pausaRota)); if (!S.calma) arrancarCaida(); } }, 1000);
      alLimpiar(function () { clearInterval(pid); });
    }
    function caer() {
      if (terminado || enPausa || window.MOTIRO_PAUSA) return;
      if (ci >= cola.length) { if (linea.length === 0 && escalones < d.meta) { ci = 0; } else if (linea.length === 0) return; else return; }
      if (linea.length >= d.lineaMax) { muro += 2; AU.mal(); VOZ.sub(L(d.derrumbe)); agregarLadrillo(linea.slice(0, 4).map(function (w) { return w.t; }).join(' ') + '…'); agregarLadrillo('…'); /* saltar al próximo segmento */ var segAct = linea[linea.length - 1].seg; while (ci < cola.length && cola[ci].seg === segAct) ci++; linea = []; renderLinea(); comprobar(); return; }
      linea.push(Object.assign({}, cola[ci])); ci++; AU.tono(200 + Math.random() * 40, 0.05, 'triangle', 0.05); agregarChip();
    }
    function comprobar() {
      if (muro >= d.muroMax) { terminado = true; clearInterval(timer); AU.mal(); VOZ.decir(L(d.perdiste)); ctx.root.insertAdjacentHTML('afterbegin', '<div class="aviso"><b>' + h(L(d.perdiste)) + '</b> <button class="btn mini" id="btnRe">' + h(T('reintentar')) + '</button></div>'); $('#btnRe').addEventListener('click', ctx.reintentar); $('#btnRe').focus(); return; }
      if (escalones >= d.meta) { terminado = true; clearInterval(timer); setTimeout(function () { ctx.done({ muro: muro, maxPalabras: maxPal, pausas: pausas, pausasOk: pausasOk, bonus: pausas > 0 && pausasOk === pausas }); }, 900); }
    }
    function arrancarCaida() { clearInterval(timer); timer = setInterval(caer, d.msPorPalabra); alLimpiar(function () { clearInterval(timer); }); }
    if (S.calma) { $('#btnSig').addEventListener('click', caer); } else arrancarCaida();
    renderLinea(); caer();
  });
};

/* ======================= NIVEL 3: HILOS ======================= */
PLANTILLAS.HILOS = function (ctx) {
  var d = ctx.visita.datos, v = ctx.visita;
  introNivel(ctx).then(function () {
    var hilo = d.hilo, nudos = 0, usados = 0, actual = d.inicio, ayudados = {}, visitados = {}, terminado = false, lineas = [];
    visitados[actual] = true;
    var nodos = {}; d.nodos.forEach(function (n) { nodos[n.id] = n; });
    function arista(a, b) { return d.aristas.filter(function (e) { return (e.de === a && e.a === b) || (e.de === b && e.a === a); })[0]; }
    ctx.root.innerHTML = '<div class="hud"><span class="reloj">' + h(T('hilo')) + ': <span class="contadorHilo" id="hiloC"></span></span><span class="nota" id="nudosTxt">0 ' + h(T('nudos')) + '</span></div>' +
      '<div class="juego"><div class="hilosWrap" id="hilosWrap"><svg viewBox="0 0 100 100" aria-hidden="true" id="hilosSvg"><rect width="100" height="100" fill="#EFE4C9"/>' + [46, 38, 30, 22, 14].map(function (r) { return '<circle cx="50" cy="50" r="' + r + '" fill="none" stroke="#C2602F" stroke-width=".8" opacity=".6"/>'; }).join('') + '<g id="hilosG"></g></svg>' +
      d.nodos.map(function (n) { return '<button class="nodo' + (n.id === actual ? ' actual' : '') + (n.tipo === 'vecino' ? ' favorPend' : '') + '" data-id="' + n.id + '" style="left:' + n.x + '%;top:' + n.y + '%" aria-label="' + h(L(n.nombre)) + '">' + ico(n.icono) + h(L(n.nombre)) + '</button>'; }).join('') +
      '<div class="favorCaja oculto" id="favorCaja"></div></div></div><p class="nota">' + h(L(d.introFacil)) + '</p>';
    function renderHilo() { $('#hiloC').innerHTML = Array.apply(null, Array(d.hilo)).map(function (_, i) { return '<i class="' + (i < hilo ? '' : 'off') + '"></i>'; }).join('') + ' <span class="sr">' + hilo + '</span>'; $('#nudosTxt').textContent = nudos + ' ' + T('nudos'); }
    function marcar() { $$('.nodo', ctx.root).forEach(function (b) { var id = b.getAttribute('data-id'); b.classList.toggle('actual', id === actual); b.classList.toggle('visitado', !!visitados[id]); b.classList.toggle('ayudado', !!ayudados[id]); b.classList.toggle('favorPend', nodos[id].tipo === 'vecino' && !ayudados[id]); }); }
    function linea(a, b, nudo) { var na = nodos[a], nb = nodos[b]; var id = 'l' + lineas.length; $('#hilosG').insertAdjacentHTML('beforeend', '<line id="' + id + '" class="hiloLinea anim' + (nudo ? ' nudo' : '') + '" x1="' + na.x + '" y1="' + na.y + '" x2="' + nb.x + '" y2="' + nb.y + '"/>' + (nudo ? '<circle cx="' + ((na.x + nb.x) / 2) + '" cy="' + ((na.y + nb.y) / 2) + '" r="2.2" fill="none" stroke="#C2602F" stroke-width="1.2" stroke-dasharray="1 .6"/>' : '')); lineas.push(id); }
    function gastar(n) { hilo -= n; usados += n; renderHilo(); if (hilo <= 0 && !terminado) { terminado = true; AU.mal(); VOZ.decir(L(d.sinHilo)); ctx.root.insertAdjacentHTML('afterbegin', '<div class="aviso"><b>' + h(L(d.sinHilo)) + '</b> <button class="btn mini" id="btnRe">' + h(T('reintentar')) + '</button></div>'); $('#btnRe').addEventListener('click', ctx.reintentar); $('#btnRe').focus(); } }
    function favor(n, luego) {
      var caja = $('#favorCaja'); caja.classList.remove('oculto'); caja.innerHTML = '<p><b>' + h(L(n.nombre)) + '</b>: ' + h(L(n.favor)) + '</p><button class="btn v" id="btnFavor">' + h(L(n.favorBtn)) + '</button> <button class="btn g mini" id="btnFavorNo">' + h(T('volver')) + '</button>';
      VOZ.decir(L(n.nombre) + ': ' + L(n.favor));
      $('#btnFavor').focus();
      $('#btnFavor').addEventListener('click', function () { ayudados[n.id] = true; AU.ok(); caja.classList.add('oculto'); VOZ.decir(L(n.nombre) + ' ' + T('vecinoAyuda') + ': ' + L(n.ayuda)); marcar(); if (luego) luego(); });
      $('#btnFavorNo').addEventListener('click', function () { caja.classList.add('oculto'); });
    }
    function tocar(id) {
      if (terminado || id === actual) return;
      var n = nodos[id];
      if (n.tipo === 'vecino' && !ayudados[id]) { favor(n, null); return; }
      var e = arista(actual, id);
      if (!e) { nudos++; linea(actual, id, true); AU.mal(); VOZ.decir(L(d.nudo)); gastar(1); return; }
      if (e.tipo === 'desvio') { nudos++; linea(actual, id, true); AU.mal(); VOZ.decir(L(n.nombre) + ': ' + L(n.dice)); gastar(1); return; }
      /* ok */
      linea(actual, id, false); gastar(1); if (terminado) return;
      actual = id; visitados[id] = true; marcar(); AU.ok();
      VOZ.decir(L(n.nombre) + ': ' + L(n.tipo === 'vecino' ? n.ayuda : (n.dice || n.nombre)));
      if (id === d.final) { terminado = true; setTimeout(function () { linea(d.final, d.inicio, false); VOZ.decir(L(d.vuelta)); setTimeout(function () { var nAy = Object.keys(ayudados).length; ctx.done({ hilos: usados, nudos: nudos, ayudados: nAy, bonus: nAy >= 2 }); }, 1500); }, 900); }
    }
    $$('.nodo', ctx.root).forEach(function (b) { b.addEventListener('click', function () { tocar(b.getAttribute('data-id')); }); });
    renderHilo(); marcar();
    VOZ.sub(L(nodos[actual].nombre) + ' → ?');
  });
};

/* ======================= NIVEL 4: CONSTRUCTOR ======================= */
PLANTILLAS.CONSTRUCTOR = function (ctx) {
  var d = ctx.visita.datos, v = ctx.visita;
  S.fichas.tesoro = d.tesoroInicial || 3; S.cartas = {}; S.campos = {}; S.pagoTesoro = {}; S.firmas = {}; S.leyViva = 0; renderFichas();
  var fichasBase = JSON.parse(JSON.stringify(S.fichas));
  introNivel(ctx).then(function () { render(); });
  var abierta = null;
  function grupoBloqueado(casilla) { var vis = MUNDO.visitas.filter(function (x) { return x.desbloquea === casilla; })[0]; return vis ? !S.desbloqueadas[casilla] : false; }
  function render() {
    var html = '<div class="hud"><span class="medidor" aria-label="' + h(T('leyViva')) + '">' + h(T('leyViva')) + ' ' + MUNDO.firmantes.map(function () { return '<i></i>'; }).join('') + '</span></div>' +
      '<div class="casillas">' + MUNDO.casillas.map(function (c, i) { var card = cartaDe(c); var bloq = grupoBloqueado(c); return '<div class="casilla" data-c="' + c + '"><h3>' + h(T('articulo')) + ' ' + (i + 1) + ' · ' + h(nombreCasilla(c)) + '</h3>' + (card ? '<div class="elegida">' + h(textoCarta(card, S.calma || S.lector)) + '<br><span class="' + (S.pagoTesoro[c] ? 'sinFirma' : 'conFirma') + '">' + (S.pagoTesoro[c] ? h(T('pagarTesoro')) : '✓ ' + h(T('firmas'))) + '</span></div>' : '') + (bloq ? '<p class="nota">' + h(T('cartasBloq')) + '</p>' : '') + '<button class="btn mini ' + (card ? 'g' : 'v') + '" data-abrir="' + c + '">' + h(card ? T('cambiar') : T('elegir')) + '</button></div>'; }).join('') + '</div>' +
      '<div id="cartasPanel"></div>' +
      '<div class="centrado" style="margin-top:1rem"><svg class="expedienteFig" id="expFig" role="img" aria-label="Don Expediente"><use href="#ch-expediente"></use></svg><button class="btn t" id="btnSometer" style="font-size:1.2rem">' + h(T('someter')) + '</button></div>';
    ctx.root.innerHTML = html;
    $$('[data-abrir]', ctx.root).forEach(function (b) { b.addEventListener('click', function () { abierta = b.getAttribute('data-abrir'); panel(); }); });
    $('#btnSometer').addEventListener('click', someter);
    if (abierta) panel();
  }
  function panel() {
    var c = abierta; var lista = MUNDO.cartas.filter(function (x) { return x.casilla === c; }); var bloq = grupoBloqueado(c);
    var p = $('#cartasPanel');
    function cartaHtml(card) {
      var puede = !bloq && alcanza(card.costo);
      var valor = S.campos[card.id] !== undefined ? S.campos[card.id] : (card.campoEditable ? card.campoEditable.valor : '');
      var input = '<input type="number" class="campo" data-id="' + card.id + '" value="' + h(valor) + '"';
      if (card.campoEditable) input += ' min="' + card.campoEditable.min + '" max="' + card.campoEditable.max + '" aria-label="' + h(L(card.campoEditable.etiqueta)) + '"';
      input += '>';
      var s = '<div class="carta' + (bloq ? ' bloq' : '') + '" data-id="' + card.id + '">' + ico(card.pictograma, 'pic');
      s += '<div><b>' + h(L(card.textoFormal)).replace('[__]', input) + '</b>';
      s += '<div class="fac">' + ico('pic-facil', 'inl') + ' ' + h(L(card.textoFacil)).replace('[__]', '…') + '</div></div>';
      s += '<div class="costo">' + costoHtml(card.costo) + '</div>';
      s += '<div class="fila"><button class="btn v mini" data-pagar="' + card.id + '"' + (puede ? '' : ' disabled') + '>' + h(T('pagarFichas')) + '</button>';
      s += '<button class="btn g mini" data-tesoro="' + card.id + '"' + (S.fichas.tesoro > 0 ? '' : ' disabled') + '>' + h(T('pagarTesoro')) + '</button></div></div>';
      return s;
    }
    p.innerHTML = '<div class="tarjeta"><h3>' + h(T('casilla')) + ' ' + h(nombreCasilla(c)) + '</h3><div class="cartasLista">' + lista.map(cartaHtml).join('') + '</div></div>';
    $$('.campo', p).forEach(function (inp) { inp.addEventListener('input', function () { S.campos[inp.getAttribute('data-id')] = inp.value; }); inp.addEventListener('click', function (ev) { ev.stopPropagation(); }); });
    function devolver(c) { var prev = cartaDe(c); if (!prev) return; if (S.pagoTesoro[c]) S.fichas.tesoro += 1; else Object.keys(prev.costo).forEach(function (k) { S.fichas[k] += prev.costo[k]; }); }
    $$('[data-pagar]', p).forEach(function (b) { b.addEventListener('click', function () { var id = b.getAttribute('data-pagar'); var card = MUNDO.cartas.filter(function (x) { return x.id === id; })[0]; devolver(c); if (!alcanza(card.costo)) { VOZ.sub(T('noAlcanza')); render(); return; } Object.keys(card.costo).forEach(function (k) { S.fichas[k] -= card.costo[k]; }); S.cartas[c] = id; S.pagoTesoro[c] = false; if (card.campoEditable && S.campos[id] === undefined) S.campos[id] = card.campoEditable.valor; AU.ok(); renderFichas(); abierta = null; save(); render(); }); });
    $$('[data-tesoro]', p).forEach(function (b) { b.addEventListener('click', function () { var id = b.getAttribute('data-tesoro'); var card = MUNDO.cartas.filter(function (x) { return x.id === id; })[0]; devolver(c); if (S.fichas.tesoro < 1) { render(); return; } S.fichas.tesoro -= 1; S.cartas[c] = id; S.pagoTesoro[c] = true; if (card.campoEditable && S.campos[id] === undefined) S.campos[id] = card.campoEditable.valor; AU.clic(); renderFichas(); abierta = null; save(); render(); }); });
    p.scrollIntoView({ behavior: S.calma ? 'auto' : 'smooth', block: 'start' });
  }
  function someter() {
    if (!MUNDO.casillas.every(function (c) { return S.cartas[c]; })) { VOZ.decir(T('faltan')); AU.mal(); return; }
    var fig = $('#expFig'); var i = 0; var lineas = [];
    S.firmas = {}; S.leyViva = 0;
    MUNDO.firmantes.forEach(function (f) { var ok = S.cartas[f.casilla] && !S.pagoTesoro[f.casilla]; S.firmas[f.personaje] = !!ok; if (ok) S.leyViva++; });
    function paso() {
      if (i < MUNDO.casillas.length) {
        var c = MUNDO.casillas[i]; var card = cartaDe(c); var texto = T('articulo') + ' ' + (i + 1) + '. ' + textoCarta(card, true);
        if (S.pagoTesoro[c]) { fig.classList.remove('come'); void fig.offsetWidth; fig.classList.add('come'); AU.mal(); texto += ' ' + L(d.comer); $('.casilla[data-c="' + c + '"] .elegida').classList.add('comido'); }
        VOZ.decir(texto); i++; setTimeout(paso, S.calma ? 1800 : 2600); return;
      }
      /* votos */
      var med = $$('.medidor i', ctx.root); MUNDO.firmantes.forEach(function (f, k) { if (S.firmas[f.personaje]) med[k].classList.add('on'); });
      var votos = MUNDO.firmantes.map(function (f) { return L(MUNDO.personajes[f.personaje].nombre) + ' ' + (S.firmas[f.personaje] ? T('firmo') : T('noFirmo')); }).join('. ');
      var pasa = S.leyViva >= (MUNDO.minFirmas || 2);
      VOZ.decir(votos + '. ' + L(pasa ? d.aprobada : d.rechazada));
      ctx.root.insertAdjacentHTML('beforeend', '<div class="tarjeta centrado"><h3>' + h(T('leyViva')) + ' ' + S.leyViva + '/' + MUNDO.firmantes.length + '</h3>' + MUNDO.firmantes.map(function (f) { return dialogo(f.personaje, L(MUNDO.personajes[f.personaje].nombre) + ' ' + (S.firmas[f.personaje] ? T('firmo') : T('noFirmo'))); }).join('') + '<p><b>' + h(L(pasa ? d.aprobada : d.rechazada)) + '</b></p>' + (pasa ? '<button class="btn v" id="btnFin">' + h(T('seguir')) + '</button>' : '<button class="btn" id="btnRe">' + h(T('reintentar')) + '</button>') + '</div>');
      if (pasa) { AU.ok(); $('#btnFin').addEventListener('click', function () { save(); ctx.done({ leyViva: S.leyViva }); }); $('#btnFin').focus(); }
      else { $('#btnRe').addEventListener('click', function () { S.fichas = JSON.parse(JSON.stringify(fichasBase)); S.cartas = {}; S.pagoTesoro = {}; renderFichas(); ctx.reintentar(); }); $('#btnRe').focus(); }
    }
    $('#btnSometer').disabled = true; paso();
  }
};

/* ======================= STUBS para mundos futuros ======================= */
PLANTILLAS.BALANZA = function (ctx) { ctx.root.innerHTML = '<div class="aviso">BALANZA: plantilla reservada (repartir recursos entre las cinco formas de generosidad). Pendiente.</div><button class="btn" id="b">' + h(T('seguir')) + '</button>'; $('#b').addEventListener('click', function () { ctx.done({}); }); };
PLANTILLAS.RUMOR = function (ctx) { ctx.root.innerHTML = '<div class="aviso">RUMOR: plantilla reservada (cortar la propagación de un mensaje falso en una red). Pendiente.</div><button class="btn" id="b">' + h(T('seguir')) + '</button>'; $('#b').addEventListener('click', function () { ctx.done({}); }); };

/* ======================= Simulación para ?test ======================= */
PLANTILLAS._simular = function () {
  var out = [];
  MUNDO.visitas.forEach(function (v) {
    var d = v.datos || {};
    if (v.plantilla === 'ESTANTE') out.push({ nivel: v.id, ok: d.libros && d.libros.length === 3 && d.libros.map(function (b) { return b.tomo; }).sort().join() === '1,2,3', nota: '3 tomos' });
    if (v.plantilla === 'GUIA_POR_VOZ') {
      /* BFS desde S a 1,2,3,4 en orden */
      var m = d.mapa.map(function (r) { return r.split(''); }); var find = function (ch) { for (var y = 0; y < m.length; y++) for (var x = 0; x < m[0].length; x++) if (m[y][x] === ch) return { x: x, y: y }; return null; };
      var bfs = function (a, b) { var q = [a], seen = {}; seen[a.x + ',' + a.y] = 0; while (q.length) { var p = q.shift(); if (p.x === b.x && p.y === b.y) return seen[p.x + ',' + p.y]; [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (dd) { var nx = p.x + dd[0], ny = p.y + dd[1]; if (m[ny] && m[ny][nx] && m[ny][nx] !== '#' && seen[nx + ',' + ny] === undefined) { seen[nx + ',' + ny] = seen[p.x + ',' + p.y] + 1; q.push({ x: nx, y: ny }); } }); } return -1; };
      var pts = ['S', '1', '2', '3', '4'].map(find); var total = 0, ok = pts.every(Boolean);
      for (var i = 1; i < pts.length && ok; i++) { var dd = bfs(pts[i - 1], pts[i]); if (dd < 0) ok = false; total += dd; }
      out.push({ nivel: v.id, ok: ok, nota: 'camino mínimo ' + total + ' pasos, ' + d.tiempo + ' s' });
    }
    if (v.plantilla === 'MURO_DE_PALABRAS') { var segs = d.segmentos.es; out.push({ nivel: v.id, ok: segs.length >= d.meta && segs.every(function (s) { return s.length <= d.lineaMax; }), nota: segs.length + ' oraciones, meta ' + d.meta }); }
    if (v.plantilla === 'HILOS') {
      var ady = {}; d.aristas.forEach(function (e) { if (e.tipo !== 'ok') return; (ady[e.de] = ady[e.de] || []).push(e.a); (ady[e.a] = ady[e.a] || []).push(e.de); });
      var q = [[d.inicio, 0]], seen = {}; seen[d.inicio] = 1; var dist = -1; while (q.length) { var p = q.shift(); if (p[0] === d.final) { dist = p[1]; break; } (ady[p[0]] || []).forEach(function (n) { if (!seen[n]) { seen[n] = 1; q.push([n, p[1] + 1]); } }); }
      out.push({ nivel: v.id, ok: dist > 0 && dist <= d.hilo, nota: 'ruta mínima ' + dist + ' hilos de ' + d.hilo });
    }
    if (v.plantilla === 'CONSTRUCTOR') {
      /* ¿alcanza la generosidad de una partida perfecta para una carta por casilla con firma? */
      var tot = {}; MUNDO.visitas.forEach(function (x) { Object.keys(x.recompensa || {}).forEach(function (k) { tot[k] = (tot[k] || 0) + x.recompensa[k]; }); Object.keys(x.bonus || {}).forEach(function (k) { tot[k] = (tot[k] || 0) + x.bonus[k]; }); });
      var need = {}; MUNDO.casillas.forEach(function (c) { var cheapest = MUNDO.cartas.filter(function (x) { return x.casilla === c; }).sort(function (a, b) { return Object.keys(a.costo).length - Object.keys(b.costo).length; })[0]; Object.keys(cheapest.costo).forEach(function (k) { need[k] = (need[k] || 0) + cheapest.costo[k]; }); });
      var ok = Object.keys(need).every(function (k) { return (tot[k] || 0) >= need[k]; });
      out.push({ nivel: v.id, ok: ok, nota: 'necesita ' + JSON.stringify(need) + ', partida perfecta da ' + JSON.stringify(tot) });
    }
  });
  return out;
};
