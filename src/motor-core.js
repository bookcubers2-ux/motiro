/* =====================================================================
   MOTIRÕ · MOTOR (núcleo)  · ES2017, sin módulos, sin ?. ni ??
   ===================================================================== */
'use strict';

/* ---------- Diccionario de interfaz ---------- */
var TXT = {
  es: {
    titulo: 'MOTIRÕ', sub: 'la ley que nadie pudo comprar',
    frase: 'En este juego, el único lobby permitido es un regalo para otra persona.',
    pie: 'Hecho en la Biblioteca de Relaciones Internacionales, UAGRM, Santa Cruz de la Sierra, Bolivia. Un Impact Arcade de GivingTuesday + Games for Change.',
    acercaNombre: 'Motirõ nombra el trabajo colectivo y voluntario entre vecinos en el mundo guaraní. Glosa pendiente de validación comunitaria.',
    idioma: 'Idioma', accesibilidad: 'Accesibilidad', normal: 'Normal', normalD: 'Juego completo con relojes y música suave.',
    lector: 'Modo Lector', lectorD: 'Todo se lee en voz alta, letra grande, contraste alto, teclado completo.',
    calma: 'Modo Calma', calmaD: 'Sin relojes ni música, sin destellos, una instrucción por pantalla.',
    partida: 'Tipo de partida', completa: 'Partida completa', completaD: 'Cinco niveles, unos 40 minutos.',
    corta: 'Partida corta', cortaD: 'Niveles 0, 1, 2 y 4, para eventos de 60 minutos.',
    edad: 'Tu edad (opcional)', edadOpc: ['Prefiero no decir', 'Menos de 18', '18 a 24', '25 o más'],
    nombreHoja: 'Nombre de tu Hoja (opcional)', jugar: 'Jugar', retomar: 'Retomar partida', nueva: 'Partida nueva',
    acerca: 'Acerca de', pleno: 'Modo Pleno', volver: 'Volver', seguir: 'Seguir', listo: 'Listo', reintentar: 'Probar de nuevo',
    mapa: 'Mapa de la ciudad', nivel: 'Nivel', ir: 'Entrar', minutos: 'min',
    fichas: 'Fichas de generosidad', tiempo: 'Tiempo', talento: 'Talento', testimonio: 'Testimonio', lazos: 'Lazos', tesoro: 'Tesoro',
    ganaste: 'Ganaste', desbloqueo: 'Desbloqueaste cartas del grupo', pregunta: 'Una pregunta antes de seguir',
    silencio: 'Silenciar música', sonido: 'Activar música', tema: 'Modo oscuro', pausa: 'Pausa', continuar: 'Continuar',
    tituloLey: 'Título de tu ley', maxCar: 'máximo 80 caracteres', sugerencias: 'Sugerencias',
    ordenar: 'Ordená los libros: tocá uno y después tocá el lugar donde va.', bienOrdenado: 'Los tres tomos quedaron en orden.',
    cerrarOjos: 'Cerrar los ojos', abrirOjos: 'Abrir los ojos', ojosTexto: 'Pantalla a oscuras. Seguí el sonido y la voz de Abril. Flechas para moverte.',
    paginas: 'Páginas del formulario', reloj: 'Cierre de ventanilla', ventanilla: 'Ventanilla', pasos: 'pasos',
    derecha: 'a la derecha', izquierda: 'a la izquierda', arriba: 'arriba', abajo: 'abajo', llegaste: 'Llegaste a la ventanilla',
    primeroVent: 'Primero andá a la ventanilla', ventCerro: 'La ventanilla cerró. Probá de nuevo.', choques: 'choques', turnos: 'Turnos (Modo Calma): la fila se mueve cuando vos te movés.',
    escalones: 'escalones', muro: 'muro', siguientePalabra: 'Siguiente palabra', glosario: 'Cuaderno de Tomás', cortar: 'cortar acá',
    hilo: 'Hilo', nudos: 'nudos', ayudar: 'Ayudar', enviar: 'Enviar el pedido a', vecinoAyuda: 'ahora presta su ayuda',
    casilla: 'Casilla', elegir: 'Elegir carta', cambiar: 'Cambiar', pagarFichas: 'Pagar con fichas', pagarTesoro: 'Pagar con Tesoro (sin firma)', noAlcanza: 'No te alcanzan las fichas',
    someter: 'Someter a votación', leyViva: 'Ley Viva', faltan: 'Faltan casillas por llenar', cartasBloq: 'Cartas bloqueadas: no visitaste ese nivel. Solo se pueden comprar con Tesoro.',
    sobrantes: 'Fichas que sobran', compromiso: 'Compromiso Motirõ', elegiCompromiso: 'Con lo que te sobra, elegí un compromiso',
    miLey: 'Mi Ley', motivos: 'Exposición de motivos', articulos: 'Artículos', firmas: 'Firmas', respuestas: 'Mis respuestas',
    firmo: 'firmó', noFirmo: 'no firmó: el artículo se compró con Tesoro', comido: 'Don Expediente se lo comió',
    formal: 'Versión formal', facil: 'Lectura Fácil', escuchar: 'Escuchar', parar: 'Parar', imprimir: 'Imprimir / Guardar PDF', copiar: 'Copiar texto', copiado: 'Texto copiado',
    whatsapp: 'Compartir por WhatsApp', enviarPleno: 'Enviar al Pleno', codigo: 'Código de partida', dictar: 'Dictá o mostrá este código al facilitador.',
    otraVez: 'Jugar otra vez', articulo: 'Artículo', fin: 'Fin de la partida', hoja: 'La Hoja',
    plenoTitulo: 'PLENO · Ley de la Sala', pegar: 'Pegá o tipeá los códigos (uno por línea o separados por espacios)', sumar: 'Sumar códigos', recibidas: 'leyes recibidas', invalidos: 'códigos inválidos',
    actualizar: 'Actualizar desde la hoja', porCasilla: 'Qué eligió la sala por casilla', firmasLogradas: 'Firmas logradas', generosidad: 'Generosidad comprometida',
    leySala: 'Ley de la Sala', votar: 'Votar', aFavor: 'A favor', enContra: 'En contra', empate: 'Empate: 60 segundos de debate', debate: 'Debate', aprobado: 'Aprobado', rechazado: 'Rechazado',
    imprimirSala: 'Imprimir Ley de la Sala', metaReal: 'Meta / Real', meta: 'Meta', real: 'Real', limpiar: 'Borrar todo', firmasLinea: 'Firmas de la sala',
    metas: ['Compromisos cumplidos', 'Horas donadas', 'Apoyos conseguidos', 'Entrega a la Asamblea antes del 5 de diciembre'],
    promedio: 'promedio', respuestasSala: 'Respuestas de la sala', vacio: 'Todavía no hay leyes. Pegá códigos arriba.',
    testOk: 'pruebas correctas', hoy: 'Santa Cruz de la Sierra', edadTxt: 'Edad', sinVoz: 'Sin voz instalada: se muestran subtítulos.',
    mundo: 'Mundo', validacion: 'Capas guaraní y ayoreo: pendientes de validación comunitaria (desactivadas).',
    guardado: 'Partida guardada', pausaTxt: 'Juego en pausa. Tomá el tiempo que necesites.',
    sobreLey: 'Esta ley fue construida jugando. Cada artículo se pagó con generosidad.', jugadora: 'Jugó', escrito: 'Escrita por'
  },
  en: {
    titulo: 'MOTIRÕ', sub: 'the law no one could buy',
    frase: 'In this game, the only lobbying allowed is a gift for someone else.',
    pie: 'Made at the International Relations Library, UAGRM, Santa Cruz de la Sierra, Bolivia. An Impact Arcade by GivingTuesday + Games for Change.',
    acercaNombre: 'Motirõ names collective, voluntary work among neighbours in the Guaraní world. Gloss pending community validation.',
    idioma: 'Language', accesibilidad: 'Accessibility', normal: 'Normal', normalD: 'Full game with timers and soft music.',
    lector: 'Reader Mode', lectorD: 'Everything read aloud, large type, high contrast, full keyboard.',
    calma: 'Calm Mode', calmaD: 'No timers or music, no flashes, one instruction per screen.',
    partida: 'Game type', completa: 'Full game', completaD: 'Five levels, about 40 minutes.',
    corta: 'Short game', cortaD: 'Levels 0, 1, 2 and 4, for 60-minute events.',
    edad: 'Your age (optional)', edadOpc: ['Prefer not to say', 'Under 18', '18 to 24', '25 or older'],
    nombreHoja: 'Name of your Sheet (optional)', jugar: 'Play', retomar: 'Resume game', nueva: 'New game',
    acerca: 'About', pleno: 'Plenary Mode', volver: 'Back', seguir: 'Continue', listo: 'Done', reintentar: 'Try again',
    mapa: 'City map', nivel: 'Level', ir: 'Enter', minutos: 'min',
    fichas: 'Generosity tokens', tiempo: 'Time', talento: 'Talent', testimonio: 'Testimony', lazos: 'Ties', tesoro: 'Treasure',
    ganaste: 'You earned', desbloqueo: 'You unlocked cards of the group', pregunta: 'One question before going on',
    silencio: 'Mute music', sonido: 'Music on', tema: 'Dark mode', pausa: 'Pause', continuar: 'Continue',
    tituloLey: 'Title of your law', maxCar: '80 characters max', sugerencias: 'Suggestions',
    ordenar: 'Sort the books: tap one, then tap where it goes.', bienOrdenado: 'The three volumes are in order.',
    cerrarOjos: 'Close your eyes', abrirOjos: 'Open your eyes', ojosTexto: 'Screen dark. Follow the sound and Abril’s voice. Arrow keys to move.',
    paginas: 'Form pages', reloj: 'Counter closing', ventanilla: 'Counter', pasos: 'steps',
    derecha: 'to the right', izquierda: 'to the left', arriba: 'up', abajo: 'down', llegaste: 'You reached counter',
    primeroVent: 'First go to counter', ventCerro: 'The counter closed. Try again.', choques: 'bumps', turnos: 'Turns (Calm Mode): the queue moves when you move.',
    escalones: 'steps', muro: 'wall', siguientePalabra: 'Next word', glosario: 'Tomás’s notebook', cortar: 'cut here',
    hilo: 'Thread', nudos: 'knots', ayudar: 'Help', enviar: 'Send the request to', vecinoAyuda: 'now lends a hand',
    casilla: 'Slot', elegir: 'Choose card', cambiar: 'Change', pagarFichas: 'Pay with tokens', pagarTesoro: 'Pay with Treasure (no signature)', noAlcanza: 'Not enough tokens',
    someter: 'Put to a vote', leyViva: 'Living Law', faltan: 'Some slots are still empty', cartasBloq: 'Locked cards: you did not visit that level. They can only be bought with Treasure.',
    sobrantes: 'Leftover tokens', compromiso: 'Motirõ Pledge', elegiCompromiso: 'With what is left, choose a pledge',
    miLey: 'My Law', motivos: 'Statement of reasons', articulos: 'Articles', firmas: 'Signatures', respuestas: 'My answers',
    firmo: 'signed', noFirmo: 'did not sign: the article was bought with Treasure', comido: 'Mr. Dossier ate it',
    formal: 'Formal version', facil: 'Easy Read', escuchar: 'Listen', parar: 'Stop', imprimir: 'Print / Save PDF', copiar: 'Copy text', copiado: 'Text copied',
    whatsapp: 'Share on WhatsApp', enviarPleno: 'Send to the Plenary', codigo: 'Game code', dictar: 'Read or show this code to the facilitator.',
    otraVez: 'Play again', articulo: 'Article', fin: 'End of game', hoja: 'The Sheet',
    plenoTitulo: 'PLENARY · Room Law', pegar: 'Paste or type the codes (one per line or separated by spaces)', sumar: 'Add codes', recibidas: 'laws received', invalidos: 'invalid codes',
    actualizar: 'Refresh from sheet', porCasilla: 'What the room chose per slot', firmasLogradas: 'Signatures achieved', generosidad: 'Generosity pledged',
    leySala: 'Room Law', votar: 'Vote', aFavor: 'In favour', enContra: 'Against', empate: 'Tie: 60 seconds of debate', debate: 'Debate', aprobado: 'Approved', rechazado: 'Rejected',
    imprimirSala: 'Print the Room Law', metaReal: 'Goal / Actual', meta: 'Goal', real: 'Actual', limpiar: 'Clear all', firmasLinea: 'Room signatures',
    metas: ['Pledges kept', 'Hours donated', 'Supporters gathered', 'Delivered to the Assembly before 5 December'],
    promedio: 'average', respuestasSala: 'Room answers', vacio: 'No laws yet. Paste codes above.',
    testOk: 'tests passed', hoy: 'Santa Cruz de la Sierra', edadTxt: 'Age', sinVoz: 'No voice installed: subtitles are shown.',
    mundo: 'World', validacion: 'Guaraní and Ayoreo layers: pending community validation (disabled).',
    guardado: 'Game saved', pausaTxt: 'Game paused. Take the time you need.',
    sobreLey: 'This law was built by playing. Every article was paid for with generosity.', jugadora: 'Played by', escrito: 'Written by'
  },
  /* capas pendientes de validación comunitaria: estructura vacía, desactivadas */
  gn: { _pendiente: true, titulo: 'MOTIRÕ' },
  ayo: { _pendiente: true, titulo: 'MOTIRÕ' }
};
var IDIOMAS_ACTIVOS = ['es', 'en'];

/* ---------- Estado ---------- */
var Q = (function () { var o = {}; location.search.replace(/^\?/, '').split('&').forEach(function (p) { if (!p) return; var kv = p.split('='); o[decodeURIComponent(kv[0])] = kv.length > 1 ? decodeURIComponent(kv[1]) : true; }); return o; })();
var S = null;
var MUNDO = null;
var LIMPIEZA = [];
var SAVE_KEY = 'motiro.partida.v1', PREF_KEY = 'motiro.pref.v1';

function estadoNuevo() {
  return {
    v: 1, mundo: MUNDO.id, lang: 'es', lector: false, calma: false, corta: false, edad: 0, nombreHoja: '',
    titulo: '', visitaIdx: 0, fichas: { tiempo: 0, talento: 0, testimonio: 0, lazos: 0, tesoro: 0 },
    desbloqueadas: {}, stats: {}, respuestas: [], cartas: {}, campos: {}, pagoTesoro: {}, firmas: {}, leyViva: 0,
    compromiso: null, terminada: false, creada: Date.now()
  };
}
function pref() { try { return JSON.parse(localStorage.getItem(PREF_KEY) || '{}'); } catch (e) { return {}; } }
function guardarPref(p) { try { localStorage.setItem(PREF_KEY, JSON.stringify(p)); } catch (e) { } }
function save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch (e) { } }
function cargarPartida() { try { var s = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null'); return (s && s.v === 1 && s.mundo === MUNDO.id && !s.terminada && s.visitaIdx > 0) ? s : null; } catch (e) { return null; } }
function borrarPartida() { try { localStorage.removeItem(SAVE_KEY); } catch (e) { } }

/* ---------- i18n ---------- */
function T(k) { var d = TXT[S ? S.lang : 'es'] || TXT.es; var v = d[k]; if (v === undefined) v = TXT.es[k]; return v === undefined ? k : v; }
function L(o) { if (o == null) return ''; if (typeof o === 'string') return o; var l = S ? S.lang : 'es'; return o[l] !== undefined ? o[l] : (o.es !== undefined ? o.es : ''); }
function fmt(s, vars) { return String(s).replace(/\{([\w.]+)\}/g, function (m, k) { var v = k.split('.').reduce(function (a, b) { return a == null ? undefined : a[b]; }, vars); return v === undefined || v === null ? '0' : v; }); }
function h(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

/* ---------- DOM ---------- */
function $(sel, root) { return (root || document).querySelector(sel); }
function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
function el(tag, attrs, html) { var e = document.createElement(tag); if (attrs) Object.keys(attrs).forEach(function (k) { if (k === 'class') e.className = attrs[k]; else if (k.indexOf('on') === 0) e.addEventListener(k.slice(2), attrs[k]); else e.setAttribute(k, attrs[k]); }); if (html != null) e.innerHTML = html; return e; }
function ico(id, cls) { return '<svg class="' + (cls || '') + '" aria-hidden="true"><use href="#' + id + '"></use></svg>'; }
function retrato(id) { return '<svg role="img" aria-label="' + h(L(MUNDO.personajes[id] ? MUNDO.personajes[id].nombre : id)) + '"><use href="#ch-' + (MUNDO.personajes[id] && MUNDO.personajes[id].icono ? MUNDO.personajes[id].icono : id) + '"></use></svg>'; }
function limpiar() { LIMPIEZA.forEach(function (f) { try { f(); } catch (e) { } }); LIMPIEZA = []; VOZ.parar(); AU.pararBalizas(); }
function alLimpiar(f) { LIMPIEZA.push(f); }
function escena(html) { limpiar(); var e = $('#escena'); e.innerHTML = html; window.scrollTo(0, 0); var f = e.querySelector('h1,h2'); if (f) { f.setAttribute('tabindex', '-1'); f.focus({ preventScroll: true }); } return e; }
function vivo(txt) { var a = $('#live'); if (!a) return; a.textContent = ''; setTimeout(function () { a.textContent = txt; }, 30); }

/* ---------- Diálogo ---------- */
function dialogo(quien, texto, facil) {
  var p = MUNDO.personajes[quien] || { nombre: quien };
  return '<div class="dialogo"><div class="retrato">' + retrato(quien) + '</div><div><span class="quien">' + h(L(p.nombre)) + '</span><span class="texto">' + h(L(texto)) + '</span>' + (facil ? '<span class="facil">' + ico('pic-facil', 'inl') + ' ' + h(L(facil)) + '</span>' : '') + '</div></div>';
}
function decir(quien, texto) { var n = MUNDO.personajes[quien] ? L(MUNDO.personajes[quien].nombre) : ''; VOZ.decir((n ? n + ': ' : '') + L(texto)); }

/* ---------- Voz ---------- */
var VOZ = {
  ok: !!window.speechSynthesis, timer: null,
  decir: function (txt, opts) {
    opts = opts || {};
    txt = String(txt || '');
    this.sub(txt);
    if (!this.ok) return;
    try {
      if (!opts.cola) speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(txt);
      var lang = S.lang === 'en' ? 'en-US' : 'es-419';
      u.lang = lang; u.rate = S.lector ? 0.95 : 1.02;
      var voces = speechSynthesis.getVoices();
      var v = voces.filter(function (x) { return x.lang.replace('_', '-').toLowerCase().indexOf(S.lang === 'en' ? 'en' : 'es') === 0; });
      var pref = v.filter(function (x) { return /419|MX|US|BO|AR|CO/.test(x.lang); });
      if (pref.length) u.voice = pref[0]; else if (v.length) u.voice = v[0];
      speechSynthesis.speak(u);
    } catch (e) { }
  },
  sub: function (txt) { var s = $('#subt'); if (!s) return; s.textContent = txt; clearTimeout(this.timer); var ms = Math.max(2500, Math.min(14000, txt.length * 70)); this.timer = setTimeout(function () { s.textContent = ''; }, ms); },
  parar: function () { if (this.ok) try { speechSynthesis.cancel(); } catch (e) { } var s = $('#subt'); if (s) s.textContent = ''; }
};
if (VOZ.ok) { try { speechSynthesis.getVoices(); speechSynthesis.onvoiceschanged = function () { }; } catch (e) { } }

/* ---------- Audio (Web Audio, todo sintetizado) ---------- */
var AU = {
  ctx: null, master: null, musicaOn: true, musicaTimer: null, balizaTimer: null, compas: 0,
  init: function () {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    try { var C = window.AudioContext || window.webkitAudioContext; this.ctx = new C(); this.master = this.ctx.createGain(); this.master.gain.value = 0.5; this.master.connect(this.ctx.destination); } catch (e) { this.ctx = null; }
  },
  tono: function (freq, dur, tipo, vol, pan, t0) {
    if (!this.ctx) return; var c = this.ctx, t = t0 || c.currentTime;
    var o = c.createOscillator(), g = c.createGain(); o.type = tipo || 'sine'; o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.3, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    var dest = this.master;
    if (pan !== undefined && c.createStereoPanner) { var p = c.createStereoPanner(); p.pan.value = Math.max(-1, Math.min(1, pan)); p.connect(this.master); dest = p; }
    o.connect(g); g.connect(dest); o.start(t); o.stop(t + dur + 0.05);
  },
  ruido: function (dur, vol, t0) {
    if (!this.ctx) return; var c = this.ctx, t = t0 || c.currentTime; var n = Math.floor(c.sampleRate * dur); var b = c.createBuffer(1, n, c.sampleRate); var d = b.getChannelData(0); for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
    var s = c.createBufferSource(); s.buffer = b; var g = c.createGain(); g.gain.value = vol || 0.15; var f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1800; s.connect(f); f.connect(g); g.connect(this.master); s.start(t);
  },
  ok: function () { if (S && S.calma) return; this.tono(660, 0.12, 'triangle', 0.25); this.tono(990, 0.18, 'triangle', 0.2, undefined, this.ctx ? this.ctx.currentTime + 0.1 : 0); },
  mal: function () { if (S && S.calma) return; this.tono(220, 0.25, 'sawtooth', 0.15); },
  clic: function () { this.tono(880, 0.05, 'square', 0.08); },
  ding: function (pan, freq) { this.tono(freq || 880, 0.35, 'sine', 0.35, pan); this.tono((freq || 880) * 2, 0.2, 'sine', 0.1, pan); },
  pararBalizas: function () { clearInterval(this.balizaTimer); this.balizaTimer = null; },
  /* Loop 6/8 tipo chovena: percusión sintetizada + melodía pentatónica, volumen bajo */
  musica: function (on) {
    this.musicaOn = on; clearInterval(this.musicaTimer); this.musicaTimer = null;
    if (!on || !this.ctx || (S && S.calma)) return;
    var self = this, notas = [523, 587, 659, 784, 880, 784, 659, 587], paso = 0;
    var bpm = 150, dt = 60 / bpm; /* corchea en 6/8 */
    this.musicaTimer = setInterval(function () {
      if (!self.ctx) return; var t = self.ctx.currentTime + 0.05; var i = paso % 6;
      if (i === 0) { self.ruido(0.08, 0.12, t); self.tono(110, 0.18, 'sine', 0.18, undefined, t); }
      if (i === 3) { self.ruido(0.06, 0.08, t); }
      if (i === 2 || i === 5) self.tono(2600, 0.02, 'square', 0.02, undefined, t);
      if (i === 0 || i === 2 || i === 3 || i === 5) self.tono(notas[(paso >> 1) % notas.length], 0.25, 'triangle', 0.045, undefined, t);
      paso++;
    }, dt * 1000);
  }
};

/* ---------- Fichas ---------- */
function sumarFichas(obj) { Object.keys(obj || {}).forEach(function (k) { S.fichas[k] = (S.fichas[k] || 0) + obj[k]; }); renderFichas(); }
function renderFichas() {
  var c = $('#fichas'); if (!c || !S) return;
  var html = Object.keys(MUNDO.fichas).map(function (k) { var f = MUNDO.fichas[k]; return '<span class="ficha" data-f="' + k + '" title="' + h(L(f.nombre)) + '">' + ico(f.icono) + '<span class="sr">' + h(L(f.nombre)) + ': </span>' + (S.fichas[k] || 0) + '</span>'; }).join('');
  c.innerHTML = html; c.setAttribute('aria-label', T('fichas'));
}
function costoHtml(costo) { return Object.keys(costo).map(function (k) { var f = MUNDO.fichas[k]; var n = costo[k]; var s = ''; for (var i = 0; i < n; i++) s += '<span class="ficha" data-f="' + k + '">' + ico(f.icono) + '<span class="sr">' + h(L(f.nombre)) + '</span></span>'; return s; }).join(''); }
function alcanza(costo) { return Object.keys(costo).every(function (k) { return (S.fichas[k] || 0) >= costo[k]; }); }

/* ---------- Código de partida (base32 Crockford, 40 bits) ---------- */
var CODIGO = (function () {
  var ALF = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
  function bits(n, w) { var a = []; for (var i = w - 1; i >= 0; i--) a.push((n >> i) & 1); return a; }
  function num(arr, i, w) { var n = 0; for (var k = 0; k < w; k++) n = (n << 1) | arr[i + k]; return n; }
  function checksum(payload) { var cs = 5; for (var i = 0; i < payload.length; i++) cs = (cs * 5 + payload[i] * (i + 3)) & 7; return cs; }
  function encode(o) {
    var p = [].concat(bits(o.version || 1, 2), bits(o.mundo || 1, 4));
    for (var i = 0; i < 5; i++) p = p.concat(bits((o.cartas && o.cartas[i]) || 0, 3));
    p = p.concat(bits(o.compromiso || 0, 3), bits(o.cantidad || 0, 2));
    for (i = 0; i < 3; i++) p = p.concat(bits((o.respuestas && o.respuestas[i]) || 0, 2));
    p = p.concat(bits(o.edad || 0, 2), bits(o.firmas || 0, 3));
    var all = p.concat(bits(checksum(p), 3));
    var s = ''; for (i = 0; i < 8; i++) s += ALF[num(all, i * 5, 5)];
    return 'MT-' + s.slice(0, 4) + '-' + s.slice(4);
  }
  function decode(str) {
    var s = String(str || '').toUpperCase().replace(/^MT/, '').replace(/[^0-9A-Z]/g, '').replace(/O/g, '0').replace(/[IL]/g, '1');
    if (s.length !== 8) return null;
    var all = []; for (var i = 0; i < 8; i++) { var v = ALF.indexOf(s[i]); if (v < 0) return null; all = all.concat(bits(v, 5)); }
    var p = all.slice(0, 37); if (checksum(p) !== num(all, 37, 3)) return null;
    var o = { version: num(p, 0, 2), mundo: num(p, 2, 4), cartas: [], respuestas: [] };
    for (i = 0; i < 5; i++) o.cartas.push(num(p, 6 + i * 3, 3));
    o.compromiso = num(p, 21, 3); o.cantidad = num(p, 24, 2);
    for (i = 0; i < 3; i++) o.respuestas.push(num(p, 26 + i * 2, 2));
    o.edad = num(p, 32, 2); o.firmas = num(p, 34, 3);
    o.leyViva = ((o.firmas & 1) + ((o.firmas >> 1) & 1) + ((o.firmas >> 2) & 1));
    o.codigo = 'MT-' + s.slice(0, 4) + '-' + s.slice(4);
    return o;
  }
  function test() {
    var ok = 0, n = 20, fallos = [], detectados = 0;
    for (var i = 0; i < n; i++) {
      var o = { version: 1, mundo: 1 + (i % 15), cartas: [0, 1, 2, 3, 4].map(function () { return Math.floor(Math.random() * 8); }), compromiso: Math.floor(Math.random() * 8), cantidad: Math.floor(Math.random() * 4), respuestas: [0, 1, 2].map(function () { return Math.floor(Math.random() * 4); }), edad: Math.floor(Math.random() * 4), firmas: Math.floor(Math.random() * 8) };
      var c = encode(o), d = decode(c);
      var igual = d && d.mundo === o.mundo && d.cartas.join() === o.cartas.join() && d.compromiso === o.compromiso && d.cantidad === o.cantidad && d.respuestas.join() === o.respuestas.join() && d.edad === o.edad && d.firmas === o.firmas;
      var corrupto = c.slice(0, 5) + (c[5] === 'A' ? 'B' : 'A') + c.slice(6);
      if (decode(corrupto) === null) detectados++; /* checksum de 3 bits: detecta ~7 de cada 8 errores de un símbolo */
      if (igual) ok++; else fallos.push(c);
    }
    console.log('CODIGO encode/decode: ' + ok + '/' + n + ' ' + (fallos.length ? 'FALLOS ' + fallos.join(', ') : 'OK') + ' · checksum detectó ' + detectados + '/' + n + ' corrupciones (esperado ≈ 7/8)');
    return { ok: ok, n: n, fallos: fallos, detectados: detectados };
  }
  return { encode: encode, decode: decode, test: test };
})();

function codigoDePartida() {
  var cartas = MUNDO.casillas.map(function (c) { var id = S.cartas[c]; var lista = MUNDO.cartas.filter(function (x) { return x.casilla === c; }); var i = lista.findIndex(function (x) { return x.id === id; }); return i < 0 ? 0 : i; });
  var firmasBits = 0; MUNDO.firmantes.forEach(function (f, i) { if (S.firmas[f.personaje]) firmasBits |= (1 << i); });
  var comp = S.compromiso ? S.compromiso.idx + 1 : 0;
  return CODIGO.encode({ version: 1, mundo: MUNDO.codigo || 1, cartas: cartas, compromiso: comp, cantidad: S.compromiso ? Math.min(3, S.compromiso.cantidad) : 0, respuestas: S.respuestas.slice(0, 3), edad: S.edad, firmas: firmasBits });
}

/* ---------- QR ---------- */
function qrSvg(texto) {
  try { var q = qrcode(0, 'M'); q.addData(texto); q.make(); return q.createSvgTag({ cellSize: 4, margin: 2, scalable: true }); } catch (e) { return '<span class="nota">QR</span>'; }
}

/* ---------- Barra / preferencias ---------- */
function aplicarPrefs() {
  document.documentElement.setAttribute('data-lector', S.lector ? '1' : '0');
  document.documentElement.setAttribute('data-calma', S.calma ? '1' : '0');
  document.documentElement.setAttribute('data-tema', S.oscuro ? 'oscuro' : 'claro');
  document.documentElement.lang = S.lang;
  var p = pref(); p.lang = S.lang; p.lector = S.lector; p.calma = S.calma; p.oscuro = !!S.oscuro; p.musica = AU.musicaOn; guardarPref(p);
  var b = $('#btnMusica'); if (b) { b.setAttribute('aria-pressed', AU.musicaOn ? 'true' : 'false'); b.setAttribute('aria-label', AU.musicaOn ? T('silencio') : T('sonido')); b.title = b.getAttribute('aria-label'); }
  var t = $('#btnTema'); if (t) { t.setAttribute('aria-pressed', S.oscuro ? 'true' : 'false'); t.setAttribute('aria-label', T('tema')); t.title = T('tema'); }
  var pz = $('#pausaGlobal'); if (pz) { pz.classList.toggle('oculto', !S.calma); pz.textContent = T('pausa'); }
  var lg = $('#barra .logo'); if (lg) lg.setAttribute('aria-label', T('titulo') + ' · ' + T('volver'));
  if (AU.ctx) AU.musica(AU.musicaOn);
}
function pausaGlobal() {
  var v = el('div', { id: 'velo', role: 'dialog', 'aria-modal': 'true' }, '<p>' + h(T('pausaTxt')) + '</p><button class="btn v" id="btnSeguirPausa">' + h(T('continuar')) + '</button>');
  document.body.appendChild(v); window.MOTIRO_PAUSA = true;
  $('#btnSeguirPausa').focus(); $('#btnSeguirPausa').addEventListener('click', function () { v.remove(); window.MOTIRO_PAUSA = false; });
}

/* ---------- Escena: Inicio ---------- */
function escInicio() {
  var guardada = cargarPartida();
  var html = '<div class="portada">' +
    '<svg class="logoHoja" role="img" aria-label="' + h(T('hoja')) + '"><use href="#ch-hoja"></use></svg>' +
    '<h1>' + h(T('titulo')) + '</h1><p class="sub">' + h(T('sub')) + '</p><p class="frase">' + h(T('frase')) + '</p></div>' +
    '<div class="tarjeta">' +
    (guardada ? '<div class="aviso"><b>' + h(T('guardado')) + '</b>: ' + h(guardada.titulo || '') + ' · ' + T('nivel') + ' ' + guardada.visitaIdx + ' <button class="btn v mini" id="btnRetomar">' + h(T('retomar')) + '</button></div>' : '') +
    '<h2>' + h(T('idioma')) + '</h2><div class="opciones" role="radiogroup" aria-label="' + h(T('idioma')) + '">' +
    '<label class="opc"><input type="radio" name="lang" value="es"' + (S.lang === 'es' ? ' checked' : '') + '><b>Español</b></label>' +
    '<label class="opc"><input type="radio" name="lang" value="en"' + (S.lang === 'en' ? ' checked' : '') + '><b>English</b></label></div>' +
    '<p class="nota">' + h(T('validacion')) + '</p>' +
    '<h2>' + h(T('accesibilidad')) + '</h2><div class="opciones">' +
    '<label class="opc"><input type="checkbox" id="chkLector"' + (S.lector ? ' checked' : '') + '><span><b>' + h(T('lector')) + '</b><small>' + h(T('lectorD')) + '</small></span></label>' +
    '<label class="opc"><input type="checkbox" id="chkCalma"' + (S.calma ? ' checked' : '') + '><span><b>' + h(T('calma')) + '</b><small>' + h(T('calmaD')) + '</small></span></label></div>' +
    '<h2>' + h(T('partida')) + '</h2><div class="opciones" role="radiogroup">' +
    '<label class="opc"><input type="radio" name="corta" value="0"' + (!S.corta ? ' checked' : '') + '><span><b>' + h(T('completa')) + '</b><small>' + h(T('completaD')) + '</small></span></label>' +
    '<label class="opc"><input type="radio" name="corta" value="1"' + (S.corta ? ' checked' : '') + '><span><b>' + h(T('corta')) + '</b><small>' + h(T('cortaD')) + '</small></span></label></div>' +
    '<div class="fila" style="margin-top:.6rem"><div><label for="selEdad">' + h(T('edad')) + '</label><br><select id="selEdad">' + T('edadOpc').map(function (o, i) { return '<option value="' + i + '"' + (S.edad === i ? ' selected' : '') + '>' + h(o) + '</option>'; }).join('') + '</select></div>' +
    '<div style="flex:1;min-width:200px"><label for="inpNombre">' + h(T('nombreHoja')) + '</label><br><input type="text" id="inpNombre" maxlength="24" value="' + h(S.nombreHoja) + '"></div></div>' +
    '<div class="fila centrado" style="justify-content:center;margin-top:1rem"><button class="btn v" id="btnJugar" style="font-size:1.3rem;padding:.7rem 2rem">' + h(T('jugar')) + '</button>' +
    '<button class="btn b" id="btnAcerca">' + h(T('acerca')) + '</button><a class="btn g" href="?pleno' + (MUNDO.id !== 'ciudad' ? '&mundo=' + MUNDO.id : '') + '">' + h(T('pleno')) + '</a></div>' +
    '</div><p class="pie">' + h(T('pie')) + '</p>';
  var e = escena(html);
  $$('input[name=lang]', e).forEach(function (r) { r.addEventListener('change', function () { S.lang = r.value; aplicarPrefs(); escInicio(); }); });
  $('#chkLector').addEventListener('change', function (ev) { S.lector = ev.target.checked; aplicarPrefs(); if (S.lector) VOZ.decir(T('lector') + '. ' + T('lectorD')); });
  $('#chkCalma').addEventListener('change', function (ev) { S.calma = ev.target.checked; aplicarPrefs(); });
  $('#btnAcerca').addEventListener('click', escAcerca);
  if (guardada) $('#btnRetomar').addEventListener('click', function () { AU.init(); S = guardada; aplicarPrefs(); renderFichas(); escMapa(); });
  $('#btnJugar').addEventListener('click', function () {
    AU.init();
    var p = $('input[name=corta]:checked'); S.corta = p && p.value === '1';
    S.edad = parseInt($('#selEdad').value, 10) || 0; S.nombreHoja = $('#inpNombre').value.trim();
    var keep = { lang: S.lang, lector: S.lector, calma: S.calma, oscuro: S.oscuro, corta: S.corta, edad: S.edad, nombreHoja: S.nombreHoja };
    S = estadoNuevo(); Object.keys(keep).forEach(function (k) { S[k] = keep[k]; });
    aplicarPrefs(); renderFichas(); AU.musica(AU.musicaOn); escNivel(0);
  });
  if (S.lector) VOZ.decir(T('titulo') + ', ' + T('sub') + '. ' + T('frase'));
}

function escAcerca() {
  var html = '<div class="tarjeta"><h2>' + h(T('acerca')) + '</h2><p>' + h(T('acercaNombre')) + '</p><p>' + h(T('pie')) + '</p>' +
    '<h3>' + h(T('mundo')) + '</h3><p>' + Object.keys(MUNDOS).map(function (k) { return '<a class="btn ' + (k === MUNDO.id ? 'v' : 'b') + ' mini" href="?mundo=' + k + '">' + h(L(MUNDOS[k].nombre)) + '</a>'; }).join(' ') + '</p>' +
    '<p class="nota">' + h(T('validacion')) + '</p>' +
    '<h3>' + h(L(MUNDO.nombre)) + '</h3><div>' + Object.keys(MUNDO.personajes).filter(function (k) { return MUNDO.personajes[k].bio; }).map(function (k) { var p = MUNDO.personajes[k]; var bio = (MUNDO.validacionComunitaria && p.bioComunitaria) ? p.bioComunitaria : p.bio; return dialogo(k, bio); }).join('') + '</div>' +
    '<p class="nota">MIT · Sin rastreo, sin analítica, sin datos personales. / No tracking, no analytics, no personal data.</p>' +
    '<button class="btn" id="btnVolver">' + h(T('volver')) + '</button></div>';
  escena(html); $('#btnVolver').addEventListener('click', escInicio);
}

/* ---------- Visitas activas ---------- */
function visitas() { return MUNDO.visitas.filter(function (v) { return !S.corta || v.corta !== false; }); }

/* ---------- Escena: Mapa ---------- */
function mapaSvg(destacarIdx) {
  var vs = visitas(); var pts = MUNDO.mapa.puntos;
  var s = '<svg viewBox="0 0 100 100" role="img" aria-label="' + h(T('mapa')) + '">';
  s += '<defs><radialGradient id="gTierra"><stop offset="55%" stop-color="#E9DEC4"/><stop offset="100%" stop-color="#D9A27A"/></radialGradient></defs>';
  s += '<rect width="100" height="100" fill="url(#gTierra)"/>';
  for (var r = 46; r > 6; r -= 8) s += '<circle cx="50" cy="50" r="' + r + '" fill="none" stroke="#C2602F" stroke-width="' + (r > 30 ? 1.6 : 1) + '" stroke-dasharray="' + (r > 30 ? '3 1' : '0') + '" opacity=".75"/>';
  /* avenidas radiales */
  for (var a = 0; a < 8; a++) { var ang = a * Math.PI / 4; s += '<line x1="50" y1="50" x2="' + (50 + 47 * Math.cos(ang)).toFixed(1) + '" y2="' + (50 + 47 * Math.sin(ang)).toFixed(1) + '" stroke="#C2602F" stroke-width=".6" opacity=".4"/>'; }
  /* plaza + catedral + asamblea (centro) */
  s += '<rect x="44" y="44" width="12" height="12" rx="1" fill="#1E7B3C" opacity=".85"/><rect x="47" y="35" width="6" height="7" fill="#FFFDF7" stroke="#1F2328" stroke-width=".6"/><polygon points="47,35 50,31 53,35" fill="#C2602F" stroke="#1F2328" stroke-width=".6"/><rect x="49.4" y="29" width="1.2" height="2.4" fill="#1F2328"/>';
  /* tajibos en flor */
  [[18, 20], [82, 22], [84, 78], [16, 86], [34, 92], [70, 90], [10, 52], [90, 50]].forEach(function (p) { s += '<rect x="' + (p[0] - .6) + '" y="' + p[1] + '" width="1.2" height="4" fill="#6B4B2A"/><circle cx="' + p[0] + '" cy="' + p[1] + '" r="3.2" fill="#E86FA8"/>'; });
  /* casas bajas anillo exterior */
  [[8, 70], [12, 64], [88, 66], [92, 72], [30, 8], [70, 8], [64, 94]].forEach(function (p) { s += '<rect x="' + p[0] + '" y="' + p[1] + '" width="4" height="3" fill="#FFFDF7" stroke="#1F2328" stroke-width=".5"/><polygon points="' + p[0] + ',' + p[1] + ' ' + (p[0] + 2) + ',' + (p[1] - 2) + ' ' + (p[0] + 4) + ',' + p[1] + '" fill="#C2602F"/>'; });
  vs.forEach(function (v, i) {
    var p = pts[v.lugar] || { x: 50, y: 50 }; var hecho = i < S.visitaIdx; var actual = i === S.visitaIdx;
    s += '<g class="punto" data-i="' + i + '" tabindex="' + (actual ? '0' : '-1') + '" role="button" aria-label="' + h(T('nivel') + ' ' + i + ': ' + L(v.titulo)) + '">' +
      '<circle class="aro" cx="' + p.x + '" cy="' + p.y + '" r="5.2" fill="' + (hecho ? '#1E7B3C' : actual ? '#E3B15B' : '#FFFDF7') + '" stroke="#1F2328" stroke-width="1"/>' +
      '<text x="' + p.x + '" y="' + (p.y + 1.6) + '" text-anchor="middle" font-size="4.6" font-weight="800" fill="' + (hecho ? '#fff' : '#1F2328') + '">' + i + '</text>' +
      '<text x="' + p.x + '" y="' + (p.y + 9) + '" text-anchor="middle" font-size="3.3" font-weight="700" fill="#1F2328" stroke="#FFFDF7" stroke-width=".6" paint-order="stroke">' + h(L(p.nombre)) + '</text></g>';
  });
  var cur = vs[Math.min(S.visitaIdx, vs.length - 1)]; var pc = pts[cur.lugar] || { x: 50, y: 50 };
  s += '<g class="hojaMapa" id="hojaMapa" style="transform:translate(' + (pc.x - 4) + 'px,' + (pc.y - 13) + 'px)"><use href="#ch-hoja-mini" width="8" height="9"/></g>';
  s += '</svg>';
  return s;
}
function escMapa() {
  var vs = visitas(); var i = S.visitaIdx;
  if (i >= vs.length) { escMiLey(); return; }
  var v = vs[i];
  var html = '<h2>' + h(T('mapa')) + ' · ' + h(L(MUNDO.nombre)) + '</h2><div class="hilo-prog" aria-hidden="true"><i style="width:' + Math.round(100 * i / vs.length) + '%"></i></div>' +
    '<div class="mapa-wrap">' + mapaSvg(i) + '</div>' +
    '<div class="tarjeta centrado"><h3>' + h(T('nivel')) + ' ' + i + ' · ' + h(L(v.titulo)) + '</h3><p class="nota">' + h(L(MUNDO.mapa.puntos[v.lugar].nombre)) + ' · ≈ ' + v.minutos + ' ' + h(T('minutos')) + '</p>' +
    '<button class="btn v" id="btnIr" style="font-size:1.2rem">' + h(T('ir')) + '</button></div>';
  var e = escena(html);
  /* animación: la hoja viene del punto anterior */
  if (i > 0) { var prev = MUNDO.mapa.puntos[vs[i - 1].lugar]; var hm = $('#hojaMapa'); if (hm && prev) { hm.style.transform = 'translate(' + (prev.x - 4) + 'px,' + (prev.y - 13) + 'px)'; setTimeout(function () { var p = MUNDO.mapa.puntos[v.lugar]; hm.style.transform = 'translate(' + (p.x - 4) + 'px,' + (p.y - 13) + 'px)'; }, 80); } }
  $('#btnIr').addEventListener('click', function () { escNivel(i); });
  $$('.punto', e).forEach(function (g) { g.addEventListener('click', function () { if (+g.getAttribute('data-i') === i) escNivel(i); }); g.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); if (+g.getAttribute('data-i') === i) escNivel(i); } }); });
  if (S.lector) VOZ.decir(T('mapa') + '. ' + T('nivel') + ' ' + i + ': ' + L(v.titulo));
  save();
}

/* ---------- Escena: Nivel (despacho a plantilla) ---------- */
function escNivel(i) {
  var vs = visitas(); var v = vs[i]; if (!v) { escMiLey(); return; }
  S.visitaIdx = i; save();
  var pl = PLANTILLAS[v.plantilla];
  var root = escena('<h2 class="noprint">' + h(T('nivel')) + ' ' + i + ' · ' + h(L(v.titulo)) + '</h2><div id="nivelRoot"></div>');
  var ctx = {
    root: $('#nivelRoot'), visita: v, idx: i,
    done: function (stats) { terminarNivel(i, stats || {}); },
    reintentar: function () { escNivel(i); }
  };
  if (!pl) { ctx.root.innerHTML = '<div class="aviso">Plantilla no disponible: ' + h(v.plantilla) + '</div><button class="btn" id="btnSkip">' + h(T('seguir')) + '</button>'; $('#btnSkip').addEventListener('click', function () { ctx.done({}); }); return; }
  pl(ctx);
}
function terminarNivel(i, stats) {
  var v = visitas()[i];
  S.stats[v.id] = stats;
  var ganado = Object.assign({}, v.recompensa || {});
  if (stats.bonus && v.bonus) Object.keys(v.bonus).forEach(function (k) { ganado[k] = (ganado[k] || 0) + v.bonus[k]; });
  if (v.plantilla === 'CONSTRUCTOR') { S.visitaIdx = i + 1; save(); escMiLey(); return; }
  sumarFichas(ganado);
  if (v.desbloquea) S.desbloqueadas[v.desbloquea] = true;
  S.visitaIdx = i + 1; save();
  AU.ok();
  var html = '<div class="tarjeta centrado"><h2>' + h(T('ganaste')) + '</h2><div class="fila" style="justify-content:center;font-size:1.3rem">' + costoHtml(ganado) + '</div>' +
    (v.desbloquea ? '<p>' + h(T('desbloqueo')) + ' <b>' + h(v.desbloquea) + '</b></p>' : '') +
    (v.datos && v.datos.cierre ? dialogo(v.guia, v.datos.cierre) : '') +
    '<button class="btn v" id="btnSeguir">' + h(T('seguir')) + '</button></div>';
  escena(html);
  var txt = T('ganaste') + ': ' + Object.keys(ganado).map(function (k) { return ganado[k] + ' ' + L(MUNDO.fichas[k].nombre); }).join(', ') + '. ' + (v.datos && v.datos.cierre ? L(v.datos.cierre) : '');
  if (S.lector || v.datos.cierre) VOZ.decir(txt);
  $('#btnSeguir').addEventListener('click', function () { if (v.pregunta) escPregunta(i); else escMapa(); });
}

/* ---------- Escena: Pregunta de reflexión ---------- */
function escPregunta(i) {
  var v = visitas()[i]; var p = v.pregunta;
  var html = '<div class="tarjeta pregunta"><h2>' + h(T('pregunta')) + '</h2><p style="font-size:1.3rem;font-weight:700">' + h(L(p.texto)) + '</p><div class="opciones">' +
    p.opciones.map(function (o, k) { return '<button class="btn b" data-k="' + k + '" style="justify-content:flex-start;text-align:left">' + h(L(o)) + '</button>'; }).join('') + '</div></div>';
  var e = escena(html);
  VOZ.decir(L(p.texto) + '. ' + p.opciones.map(function (o, k) { return (k + 1) + ': ' + L(o); }).join('. '));
  $$('button[data-k]', e).forEach(function (b) { b.addEventListener('click', function () { var k = +b.getAttribute('data-k'); var pos = preguntasActivas().indexOf(p.id); if (pos < 0) pos = S.respuestas.length; S.respuestas[pos] = k; AU.clic(); save(); escMapa(); }); });
}
function preguntasActivas() { return MUNDO.visitas.filter(function (v) { return v.pregunta; }).map(function (v) { return v.pregunta.id; }); }

/* ---------- Texto de la ley ---------- */
function cartaDe(casilla) { var id = S.cartas[casilla]; return MUNDO.cartas.filter(function (c) { return c.id === id; })[0] || null; }
function textoCarta(c, facil) { if (!c) return ''; var t = L(facil ? c.textoFacil : c.textoFormal); var val = S.campos[c.id]; if (c.campoEditable) t = t.replace('[__]', val !== undefined ? val : c.campoEditable.valor); return t; }
function nombreCasilla(c) { var m = { es: { OBJETO: 'OBJETO', ACCESO: 'ACCESO', LECTURA: 'LECTURA', CERCANIA: 'CERCANÍA', CUMPLIMIENTO: 'CUMPLIMIENTO' }, en: { OBJETO: 'PURPOSE', ACCESO: 'ACCESS', LECTURA: 'READING', CERCANIA: 'PROXIMITY', CUMPLIMIENTO: 'COMPLIANCE' } }; var d = m[S.lang] || m.es; return d[c] || c; }
function motivos() {
  var out = []; var pm = MUNDO.plantillasMotivos || {}; var activas = visitas().map(function (v) { return v.id; });
  Object.keys(pm).forEach(function (k) {
    if (/falta$/.test(k)) { var base = k.replace(/falta$/, ''); if (activas.indexOf(base) < 0) out.push(fmt(L(pm[k]), S.stats)); }
    else if (S.stats[k]) out.push(fmt(L(pm[k]), S.stats));
  });
  return out;
}
function leyTexto(facil) {
  var lines = [L(MUNDO.nombre) + ' · ' + T('titulo')];
  lines.push((S.titulo || T('miLey')).toUpperCase()); lines.push('');
  lines.push(T('motivos') + ':'); motivos().forEach(function (m) { lines.push('· ' + m); }); lines.push('');
  MUNDO.casillas.forEach(function (c, i) { var card = cartaDe(c); var comido = S.pagoTesoro[c]; lines.push(T('articulo') + ' ' + (i + 1) + '. (' + nombreCasilla(c) + ') ' + textoCarta(card, facil) + (comido ? ' [' + T('comido') + ']' : '')); });
  lines.push(''); lines.push(T('firmas') + ':');
  MUNDO.firmantes.forEach(function (f) { lines.push('· ' + L(MUNDO.personajes[f.personaje].nombre) + ' ' + (S.firmas[f.personaje] ? T('firmo') : T('noFirmo'))); });
  if (S.compromiso) { lines.push(''); lines.push(T('compromiso') + ': ' + L(MUNDO.compromisos[S.compromiso.idx].texto)); }
  lines.push(''); lines.push(T('codigo') + ': ' + codigoDePartida());
  return lines.join('\n');
}

/* ---------- Escena: Mi Ley ---------- */
function escMiLey() {
  S.terminada = true; save();
  var facil = !!S.verFacil; var cod = codigoDePartida();
  var compOpts = MUNDO.compromisos.map(function (c, idx) { return { c: c, idx: idx, n: S.fichas[c.ficha] || 0 }; });
  var conSobra = compOpts.filter(function (o) { return o.n > 0 && o.c.ficha !== 'tesoro'; });
  var lista = conSobra.length ? conSobra.concat(compOpts.filter(function (o) { return o.c.ficha === 'tesoro'; })) : compOpts;
  var html = '<div class="papel" id="papel"><svg class="selloHilo" role="img" aria-label="' + h(T('leyViva')) + '"><use href="#sello"></use></svg>' +
    '<h2>' + h(S.titulo || T('miLey')) + '</h2><p class="mundoNombre">' + h(L(MUNDO.nombre)) + ' · ' + h(T('hoy')) + ' · ' + new Date().toLocaleDateString(S.lang === 'en' ? 'en-GB' : 'es-BO') + (S.nombreHoja ? ' · ' + h(T('escrito')) + ' ' + h(S.nombreHoja) : '') + '</p>' +
    '<h3>' + h(T('motivos')) + '</h3><p>' + motivos().map(h).join(' ') + '</p>' +
    '<h3>' + h(T('articulos')) + '</h3><ol>' + MUNDO.casillas.map(function (c, i) { var card = cartaDe(c); var com = S.pagoTesoro[c]; return '<li' + (com ? ' class="comido"' : '') + '><b>' + h(T('articulo')) + ' ' + (i + 1) + '. (' + h(nombreCasilla(c)) + ')</b> ' + h(textoCarta(card, facil)) + (com ? ' <i>(' + h(T('comido')) + ')</i>' : '') + '</li>'; }).join('') + '</ol>' +
    '<h3>' + h(T('firmas')) + ' · ' + h(T('leyViva')) + ' ' + S.leyViva + '/' + MUNDO.firmantes.length + '</h3>' +
    MUNDO.firmantes.map(function (f) { var ok = S.firmas[f.personaje]; return '<div class="firma' + (ok ? '' : ' no') + '">' + ico(ok ? 'pic-check' : 'pic-x', 'inl') + ' <b>' + h(L(MUNDO.personajes[f.personaje].nombre)) + '</b> ' + h(ok ? T('firmo') : T('noFirmo')) + '</div>'; }).join('') +
    '<h3>' + h(T('compromiso')) + '</h3>' +
    (S.compromiso ? '<p>' + ico(MUNDO.fichas[MUNDO.compromisos[S.compromiso.idx].ficha].icono, 'inl') + ' <b>' + h(L(MUNDO.compromisos[S.compromiso.idx].texto)) + '</b></p>' :
      '<div class="compromisos noprint"><p>' + h(T('elegiCompromiso')) + ' (' + h(T('sobrantes')) + ': ' + Object.keys(S.fichas).filter(function (k) { return S.fichas[k] > 0; }).map(function (k) { return S.fichas[k] + ' ' + L(MUNDO.fichas[k].nombre); }).join(', ') + ')</p><div class="opciones">' +
        lista.map(function (o) { return '<button class="opc btn b" data-comp="' + o.idx + '" style="justify-content:flex-start;text-align:left">' + ico(MUNDO.fichas[o.c.ficha].icono, 'inl') + '<span>' + h(L(o.c.texto)) + '</span></button>'; }).join('') + '</div></div>') +
    '<h3>' + h(T('respuestas')) + '</h3><ul>' + MUNDO.visitas.filter(function (v) { return v.pregunta; }).map(function (v, k) { var r = S.respuestas[k]; return '<li><i>' + h(L(v.pregunta.texto)) + '</i> ' + (r === undefined ? '—' : h(L(v.pregunta.opciones[r]))) + '</li>'; }).join('') + '</ul>' +
    '<h3>' + h(T('codigo')) + '</h3><div class="codigo" id="codigoTxt">' + cod + '</div><div class="qr">' + qrSvg(cod) + '</div><p class="nota centrado">' + h(T('dictar')) + '</p>' +
    '<p class="nota centrado">' + h(T('sobreLey')) + '</p></div>' +
    '<div class="toolbar noprint">' +
    '<button class="btn b" id="btnFacil" aria-pressed="' + (facil ? 'true' : 'false') + '">' + h(facil ? T('formal') : T('facil')) + '</button>' +
    '<button class="btn b" id="btnEscuchar">' + h(T('escuchar')) + '</button>' +
    '<button class="btn" id="btnImprimir">' + h(T('imprimir')) + '</button>' +
    '<button class="btn b" id="btnCopiar">' + h(T('copiar')) + '</button>' +
    '<a class="btn v" id="btnWa" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(leyTexto(facil)) + '">' + h(T('whatsapp')) + '</a>' +
    '<button class="btn t" id="btnPleno">' + h(T('enviarPleno')) + '</button>' +
    '<button class="btn g" id="btnOtra">' + h(T('otraVez')) + '</button></div>';
  var e = escena(html);
  $$('[data-comp]', e).forEach(function (b) { b.addEventListener('click', function () { var idx = +b.getAttribute('data-comp'); var f = MUNDO.compromisos[idx].ficha; S.compromiso = { idx: idx, cantidad: Math.max(1, S.fichas[f] || 1) }; AU.ok(); save(); escMiLey(); }); });
  $('#btnFacil').addEventListener('click', function () { S.verFacil = !S.verFacil; escMiLey(); });
  $('#btnEscuchar').addEventListener('click', function () { VOZ.decir(leyTexto(facil)); });
  $('#btnImprimir').addEventListener('click', function () { window.print(); });
  $('#btnCopiar').addEventListener('click', function () { var t = leyTexto(facil); try { navigator.clipboard.writeText(t).then(function () { vivo(T('copiado')); VOZ.sub(T('copiado')); }); } catch (err) { var ta = el('textarea', {}, ''); ta.value = t; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (e2) { } ta.remove(); VOZ.sub(T('copiado')); } });
  $('#btnPleno').addEventListener('click', function () { var url = window.PLENO_FORM_URL; if (url) { window.open(url.replace('{codigo}', encodeURIComponent(cod)) + (url.indexOf('{codigo}') < 0 ? encodeURIComponent(cod) : ''), '_blank'); } else { VOZ.decir(T('dictar') + ' ' + cod.split('').join(' ')); $('#codigoTxt').style.fontSize = '2.6rem'; $('#codigoTxt').scrollIntoView(); } });
  $('#btnOtra').addEventListener('click', function () { borrarPartida(); S.terminada = true; escInicio(); });
  if (S.lector) VOZ.decir(T('miLey') + '. ' + (S.titulo || '') + '. ' + T('leyViva') + ' ' + S.leyViva);
}

/* ---------- Pruebas (?test) ---------- */
function correrTests() {
  var r = CODIGO.test();
  var vs = MUNDO.visitas; var okNiveles = vs.every(function (v) { return !!PLANTILLAS[v.plantilla] || v.plantilla === 'BALANZA' || v.plantilla === 'RUMOR'; });
  var cartasOk = MUNDO.casillas.every(function (c) { var n = MUNDO.cartas.filter(function (x) { return x.casilla === c; }).length; return n >= 1 && n <= 8; });
  var sim = PLANTILLAS._simular ? PLANTILLAS._simular() : [];
  console.log('Plantillas presentes:', okNiveles, '| Cartas por casilla (1-8):', cartasOk);
  sim.forEach(function (s) { console.log('Simulación ' + s.nivel + ': ' + (s.ok ? 'completable' : 'FALLA') + (s.nota ? ' · ' + s.nota : '')); });
  var total = (r.fallos.length === 0 && okNiveles && cartasOk && sim.every(function (s) { return s.ok; }));
  escena('<div class="tarjeta"><h2>?test</h2><p>' + r.ok + '/' + r.n + ' ' + h(T('testOk')) + ' (encode/decode)</p><p>Plantillas: ' + okNiveles + ' · Cartas: ' + cartasOk + '</p><ul>' + sim.map(function (s) { return '<li>' + h(s.nivel) + ': ' + (s.ok ? 'OK' : 'FALLA') + ' ' + h(s.nota || '') + '</li>'; }).join('') + '</ul><p><b>' + (total ? 'TODO OK' : 'HAY FALLOS') + '</b></p><a class="btn" href="?">' + h(T('volver')) + '</a></div>');
  return total;
}

/* ---------- Arranque ---------- */
function arrancar() {
  var mid = Q.mundo && MUNDOS[Q.mundo] ? Q.mundo : 'ciudad';
  MUNDO = MUNDOS[mid];
  S = estadoNuevo();
  var p = pref(); if (p.lang && IDIOMAS_ACTIVOS.indexOf(p.lang) >= 0) S.lang = p.lang; S.lector = !!p.lector; S.calma = !!p.calma; S.oscuro = !!p.oscuro; if (p.musica === false) AU.musicaOn = false;
  if (Q.lang && IDIOMAS_ACTIVOS.indexOf(Q.lang) >= 0) S.lang = Q.lang;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches && p.calma === undefined) { /* respetamos: sin forzar Modo Calma, las animaciones ya se reducen por CSS */ }
  aplicarPrefs();
  $('#btnMusica').addEventListener('click', function () { AU.init(); AU.musica(!AU.musicaOn); aplicarPrefs(); });
  $('#btnTema').addEventListener('click', function () { S.oscuro = !S.oscuro; aplicarPrefs(); });
  $('#pausaGlobal').addEventListener('click', pausaGlobal);
  $('#barra .logo').addEventListener('click', function () { if (Q.pleno !== undefined) { location.href = location.pathname; return; } if (!S.terminada && S.visitaIdx > 0 && !confirm(T('volver') + '?')) return; escInicio(); });
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && S.calma && !window.MOTIRO_PAUSA) pausaGlobal(); });
  renderFichas();
  if (Q.test !== undefined) { correrTests(); return; }
  if (Q.pleno !== undefined) { escPleno(); return; }
  escInicio();
}
window.MOTIRO = { estado: function () { return S; }, mundo: function () { return MUNDO; }, CODIGO: CODIGO, version: '1.0.0' };
document.addEventListener('DOMContentLoaded', arrancar);
