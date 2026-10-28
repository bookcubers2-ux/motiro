/* =====================================================================
   MOTIRÕ · MODO PLENO (index.html?pleno) · proyector, sin servidor
   ===================================================================== */
var PLENO_KEY = 'motiro.pleno.v1';
function plenoCargar() { try { return JSON.parse(localStorage.getItem(PLENO_KEY) || '{}'); } catch (e) { return {}; } }
function plenoGuardar(p) { try { localStorage.setItem(PLENO_KEY, JSON.stringify(p)); } catch (e) { } }

function escPleno() {
  document.body.classList.add('pleno');
  var P = plenoCargar(); P.codigos = P.codigos || []; P.votos = P.votos || {}; P.metas = P.metas || { real: ['', '', '', ''] };
  var leyes = P.codigos.map(CODIGO.decode).filter(Boolean);
  var preguntas = MUNDO.visitas.filter(function (v) { return v.pregunta; }).map(function (v) { return v.pregunta; });
  var casillasN = MUNDO.casillas.length;

  /* --- agregados --- */
  function cartasPorCasilla() { return MUNDO.casillas.map(function (c, i) { var lista = MUNDO.cartas.filter(function (x) { return x.casilla === c; }); var cnt = lista.map(function () { return 0; }); leyes.forEach(function (l) { var k = l.cartas[i]; if (k < lista.length) cnt[k]++; }); return { casilla: c, lista: lista, cnt: cnt }; }); }
  function leySala() { return cartasPorCasilla().map(function (pc) { var best = 0; pc.cnt.forEach(function (n, k) { if (n > pc.cnt[best]) best = k; }); return pc.lista[best]; }); }
  function generosidad() { var g = { horas: 0, talento: 0, testimonio: 0, lazos: 0, tesoro: 0 }; leyes.forEach(function (l) { if (!l.compromiso) return; var c = MUNDO.compromisos[l.compromiso - 1]; if (!c) return; var n = Math.max(1, l.cantidad); if (c.ficha === 'tiempo') g.horas += 2 * n; else g[c.ficha] = (g[c.ficha] || 0) + n; }); return g; }
  function barra(label, n, tot, alt) { var pct = tot ? Math.round(100 * n / tot) : 0; return '<div class="barraFila"><span>' + h(label) + '</span><div class="pista"><i class="' + (alt ? 'alt' : '') + '" style="width:' + pct + '%"></i></div><b>' + n + '</b></div>'; }

  function render() {
    var g = generosidad(); var ls = leySala(); var firmasProm = leyes.length ? (leyes.reduce(function (a, l) { return a + l.leyViva; }, 0) / leyes.length).toFixed(1) : '0';
    var html = '<h1>' + h(T('plenoTitulo')) + ' · ' + h(L(MUNDO.nombre)) + '</h1>' +
      '<div class="tarjeta noprint"><label for="plenoTxt">' + h(T('pegar')) + '</label><textarea id="plenoTxt" class="plenoTexto" placeholder="MT-XXXX-XXXX"></textarea><div class="fila"><button class="btn v" id="btnSumar">' + h(T('sumar')) + '</button>' + (window.PLENO_CSV_URL ? '<button class="btn b" id="btnCsv">' + h(T('actualizar')) + '</button>' : '') + '<button class="btn g mini" id="btnLimpiar">' + h(T('limpiar')) + '</button><span id="plenoMsg" class="nota"></span></div></div>' +
      '<div class="centrado"><div class="enorme">' + leyes.length + ' / 30</div><div>' + h(T('recibidas')) + '</div></div>' +
      (leyes.length === 0 ? '<p class="aviso">' + h(T('vacio')) + '</p>' : '') +
      '<div class="plenoGrid">' +
      '<div class="tarjeta"><h2>' + h(T('porCasilla')) + '</h2>' + cartasPorCasilla().map(function (pc) { return '<h3>' + h(nombreCasilla(pc.casilla)) + '</h3><div class="barras">' + pc.lista.map(function (card, k) { return barra(L(card.textoFacil).replace('[__]', '…'), pc.cnt[k], leyes.length, k % 2 === 1); }).join('') + '</div>'; }).join('') + '</div>' +
      '<div>' +
      '<div class="tarjeta"><h2>' + h(T('firmasLogradas')) + '</h2><div class="enorme">' + firmasProm + ' / ' + MUNDO.firmantes.length + '</div><div class="nota">' + h(T('promedio')) + '</div><div class="barras">' + MUNDO.firmantes.map(function (f, i) { var n = leyes.filter(function (l) { return (l.firmas >> i) & 1; }).length; return barra(L(MUNDO.personajes[f.personaje].nombre), n, leyes.length); }).join('') + [0, 1, 2, 3].map(function (k) { var n = leyes.filter(function (l) { return l.leyViva === k; }).length; return barra(T('leyViva') + ' ' + k, n, leyes.length, true); }).join('') + '</div></div>' +
      '<div class="tarjeta"><h2>' + h(T('generosidad')) + '</h2><div class="barras">' + barra(T('tiempo') + ' (h)', g.horas, Math.max(45, g.horas)) + barra(T('talento'), g.talento, Math.max(10, g.talento)) + barra(T('testimonio'), g.testimonio, Math.max(10, g.testimonio)) + barra(T('lazos'), g.lazos, Math.max(10, g.lazos)) + barra(T('tesoro'), g.tesoro, Math.max(10, g.tesoro)) + '</div></div>' +
      '<div class="tarjeta"><h2>' + h(T('respuestasSala')) + '</h2>' + preguntas.map(function (p, i) { return '<h3>' + h(L(p.texto)) + '</h3><div class="barras">' + p.opciones.map(function (o, k) { var n = leyes.filter(function (l) { return l.respuestas[i] === k; }).length; return barra(L(o), n, leyes.length, k % 2 === 1); }).join('') + '</div>'; }).join('') + '</div>' +
      '</div></div>' +
      '<div class="tarjeta" id="leySala"><h2>' + h(T('leySala')) + '</h2><ol>' + ls.map(function (card, i) { var vt = P.votos[i] || { si: 0, no: 0 }; var est = vt.si > vt.no ? T('aprobado') : vt.no > vt.si ? T('rechazado') : (vt.si + vt.no > 0 ? T('empate') : ''); return '<li><b>' + h(T('articulo')) + ' ' + (i + 1) + '. (' + h(nombreCasilla(MUNDO.casillas[i])) + ')</b> ' + h(card ? L(card.textoFormal).replace('[__]', card.campoEditable ? card.campoEditable.valor : '') : '—') + '<div class="fac nota">' + h(card ? L(card.textoFacil).replace('[__]', card.campoEditable ? card.campoEditable.valor : '') : '') + '</div><div class="votos noprint"><div class="voto si" role="button" tabindex="0" data-v="si" data-i="' + i + '" aria-label="' + h(T('aFavor')) + ' ' + (i + 1) + '">' + h(T('aFavor')) + '<b>' + vt.si + '</b></div><div class="voto no" role="button" tabindex="0" data-v="no" data-i="' + i + '" aria-label="' + h(T('enContra')) + ' ' + (i + 1) + '">' + h(T('enContra')) + '<b>' + vt.no + '</b></div></div><div class="fila noprint"><b>' + h(est) + '</b> ' + (vt.si === vt.no && vt.si + vt.no > 0 ? '<button class="btn t mini" data-debate="' + i + '">' + h(T('debate')) + ' 60 s</button>' : '') + '<button class="btn g mini" data-reset="' + i + '">0</button><span id="deb' + i + '" class="reloj oculto"></span></div></li>'; }).join('') + '</ol>' +
      '<div class="fila noprint"><button class="btn" id="btnImprimirSala">' + h(T('imprimirSala')) + '</button></div></div>' +
      '<div class="tarjeta noprint"><h2>' + h(T('metaReal')) + '</h2><table class="metaReal"><tr><th></th><th>' + h(T('meta')) + '</th><th>' + h(T('real')) + '</th></tr>' + [['30 / 30', 0], ['45', 1], ['300', 2], ['5-12', 3]].map(function (m, i) { return '<tr><td>' + h(T('metas')[i]) + '</td><td>' + m[0] + '</td><td><input type="text" data-real="' + i + '" value="' + h(P.metas.real[i] || '') + '"></td></tr>'; }).join('') + '</table></div>' +
      '<p class="pie">' + h(T('pie')) + '</p>';
    var e = escena(html);
    $('#btnSumar').addEventListener('click', function () { sumar($('#plenoTxt').value); });
    $('#btnLimpiar').addEventListener('click', function () { if (confirm(T('limpiar') + '?')) { P.codigos = []; P.votos = {}; leyes = []; plenoGuardar(P); render(); } });
    if ($('#btnCsv')) $('#btnCsv').addEventListener('click', function () { fetch(window.PLENO_CSV_URL, { cache: 'no-store' }).then(function (r) { return r.text(); }).then(function (t) { sumar(t); }).catch(function () { $('#plenoMsg').textContent = 'offline'; }); });
    $$('.voto', e).forEach(function (d) { var f = function () { var i = +d.getAttribute('data-i'), v = d.getAttribute('data-v'); P.votos[i] = P.votos[i] || { si: 0, no: 0 }; P.votos[i][v]++; plenoGuardar(P); AU.init(); AU.clic(); render(); document.querySelector('.voto[data-i="' + i + '"][data-v="' + v + '"]').focus(); }; d.addEventListener('click', f); d.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); f(); } }); });
    $$('[data-reset]', e).forEach(function (b) { b.addEventListener('click', function () { P.votos[+b.getAttribute('data-reset')] = { si: 0, no: 0 }; plenoGuardar(P); render(); }); });
    $$('[data-debate]', e).forEach(function (b) { b.addEventListener('click', function () { var i = +b.getAttribute('data-debate'); var s = $('#deb' + i); s.classList.remove('oculto'); var t = 60; s.textContent = '1:00'; var id = setInterval(function () { t--; s.textContent = mmss(t); if (t <= 0) { clearInterval(id); AU.init(); AU.ok(); } }, 1000); alLimpiar(function () { clearInterval(id); }); }); });
    $$('[data-real]', e).forEach(function (inp) { inp.addEventListener('input', function () { P.metas.real[+inp.getAttribute('data-real')] = inp.value; plenoGuardar(P); }); });
    $('#btnImprimirSala').addEventListener('click', imprimirSala);
    /* teclas: 1-5 elige artículo, F a favor, C en contra */
    var sel = 0; function onKey(ev) { if (/^[1-9]$/.test(ev.key) && +ev.key <= casillasN) sel = +ev.key - 1; if (ev.key === 'f' || ev.key === 'F') $('.voto[data-i="' + sel + '"][data-v="si"]').click(); if (ev.key === 'c' || ev.key === 'C') $('.voto[data-i="' + sel + '"][data-v="no"]').click(); }
    document.addEventListener('keydown', onKey); alLimpiar(function () { document.removeEventListener('keydown', onKey); });
  }
  function sumar(texto) {
    var toks = String(texto || '').toUpperCase().match(/[0-9A-Z\-]{8,14}/g) || []; var nuevos = 0, malos = 0;
    toks.forEach(function (t) { var d = CODIGO.decode(t); if (!d) { malos++; return; } if (P.codigos.indexOf(d.codigo) >= 0) return; P.codigos.push(d.codigo); nuevos++; });
    plenoGuardar(P); leyes = P.codigos.map(CODIGO.decode).filter(Boolean); render();
    $('#plenoMsg').textContent = '+' + nuevos + ' · ' + malos + ' ' + T('invalidos'); vivo('+' + nuevos);
  }
  function imprimirSala() {
    var ls = leySala();
    var html = '<div class="papel"><svg class="selloHilo"><use href="#sello"></use></svg><h2>' + h(T('leySala')) + '</h2><p class="mundoNombre">' + h(L(MUNDO.nombre)) + ' · ' + h(T('hoy')) + ' · ' + new Date().toLocaleDateString() + ' · ' + leyes.length + ' ' + h(T('recibidas')) + '</p>' +
      '<h3>' + h(T('formal')) + '</h3><ol>' + ls.map(function (card, i) { var vt = P.votos[i] || { si: 0, no: 0 }; return '<li><b>' + h(T('articulo')) + ' ' + (i + 1) + '. (' + h(nombreCasilla(MUNDO.casillas[i])) + ')</b> ' + h(card ? L(card.textoFormal).replace('[__]', card.campoEditable ? card.campoEditable.valor : '') : '') + ' <i>(' + vt.si + ' / ' + vt.no + ')</i></li>'; }).join('') + '</ol>' +
      '<h3>' + h(T('facil')) + '</h3><ol>' + ls.map(function (card, i) { return '<li>' + h(card ? L(card.textoFacil).replace('[__]', card.campoEditable ? card.campoEditable.valor : '') : '') + '</li>'; }).join('') + '</ol>' +
      '<h3>' + h(T('firmasLinea')) + '</h3><div class="lineasFirma">' + Array.apply(null, Array(30)).map(function (_, i) { return '<div>' + (i + 1) + '.</div>'; }).join('') + '</div></div>' +
      '<div class="toolbar noprint"><button class="btn" id="btnPrint">' + h(T('imprimir')) + '</button><button class="btn g" id="btnBack">' + h(T('volver')) + '</button></div>';
    escena(html); $('#btnPrint').addEventListener('click', function () { window.print(); }); $('#btnBack').addEventListener('click', render); setTimeout(function () { window.print(); }, 300);
  }
  render();
}
