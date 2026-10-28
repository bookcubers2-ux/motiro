"""Juega MOTIRÕ de punta a punta con Playwright (Chromium) y saca capturas.
Uso: python tests/jugar.py [--calma] [--lector] [--movil] [--corta] [--pleno]
Capturas en tests/capturas/.
"""
import sys, os, re, time, json, collections
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = 'file:///' + os.path.join(ROOT, 'index.html').replace('\\', '/')
CAP = os.path.join(ROOT, 'tests', 'capturas'); os.makedirs(CAP, exist_ok=True)
args = sys.argv[1:]
CALMA = '--calma' in args; LECTOR = '--lector' in args; MOVIL = '--movil' in args; CORTA = '--corta' in args
TAG = ('movil' if MOVIL else 'pc') + ('-lector' if LECTOR else '') + ('-calma' if CALMA else '') + ('-corta' if CORTA else '')
LOG = []
def log(*a):
    s = ' '.join(str(x) for x in a); LOG.append(s); print(s, flush=True)
def cap(page, nombre):
    page.screenshot(path=os.path.join(CAP, '%s-%s.png' % (TAG, nombre)), full_page=False)

def bfs(mapa, a, b):
    H, W = len(mapa), len(mapa[0]); q = collections.deque([a]); prev = {a: None}
    while q:
        p = q.popleft()
        if p == b: break
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            n = (p[0] + dx, p[1] + dy)
            if 0 <= n[0] < W and 0 <= n[1] < H and mapa[n[1]][n[0]] != '#' and n not in prev:
                prev[n] = p; q.append(n)
    if b not in prev: return []
    path = []; c = b
    while c != a: path.append(c); c = prev[c]
    return path[::-1]

with sync_playwright() as pw:
    br = pw.chromium.launch(channel='chrome')
    ctx = br.new_context(viewport={'width': 360, 'height': 640} if MOVIL else {'width': 1366, 'height': 768}, device_scale_factor=1)
    page = ctx.new_page()
    errores = []
    page.on('pageerror', lambda e: errores.append(str(e)))
    page.on('console', lambda m: errores.append('console.error: ' + m.text) if m.type == 'error' else None)

    # ---- ?test
    page.goto(URL + '?test'); page.wait_for_timeout(500)
    txt = page.inner_text('#escena'); log('[?test]', txt.replace('\n', ' | ')[:400])
    assert 'TODO OK' in txt, 'fallo en ?test'

    # ---- inicio
    page.goto(URL); page.wait_for_selector('#btnJugar')
    page.evaluate("localStorage.clear()"); page.goto(URL); page.wait_for_selector('#btnJugar')
    if LECTOR: page.check('#chkLector')
    if CALMA: page.check('#chkCalma')
    if CORTA: page.check('input[name=corta][value="1"]')
    page.select_option('#selEdad', '2'); page.fill('#inpNombre', 'Prueba')
    cap(page, '00-inicio')
    page.click('#btnJugar'); page.wait_for_selector('#btnEmpezar')
    M = page.evaluate('window.MOTIRO.mundo()')
    visitas = [v for v in M['visitas'] if not CORTA or v.get('corta') is not False]
    log('visitas activas:', [v['id'] for v in visitas])

    def nivel_estante():
        page.click('#btnEmpezar'); page.wait_for_selector('.libro')
        cap(page, '01-n0-estante')
        # ordenar: leer tomos visibles y hacer swaps
        for _ in range(4):
            tomos = [int(t) for t in page.eval_on_selector_all('.libro .tomo', 'els=>els.map(e=>e.textContent)')]
            if tomos == [1, 2, 3]: break
            # encontrar posición incorrecta y la posición del tomo correcto
            for pos in range(3):
                if tomos[pos] != pos + 1:
                    objetivo = tomos.index(pos + 1)
                    page.click('.libro[data-pos="%d"]' % pos); page.click('.libro[data-pos="%d"]' % objetivo); break
            page.wait_for_timeout(150)
        page.wait_for_selector('#btnSig', timeout=5000)
        for _ in range(5):
            page.click('#btnSig'); page.wait_for_timeout(100)
            if page.query_selector('#inpTitulo'): break
        page.fill('#inpTitulo', 'Ley de la Ventanilla que Escucha'); cap(page, '02-n0-titulo'); page.click('#btnTituloOk')

    def nivel_voz(v):
        page.click('#btnEmpezar'); page.wait_for_selector('#tablero')
        cap(page, '03-n1-tablero')
        mapa = v['datos']['mapa']; TAM = 44
        def pos_jugador():
            tr = page.eval_on_selector('#tablero g:last-of-type', 'g=>g.getAttribute("transform")')
            m = re.match(r'translate\(([\d.]+),([\d.]+)\)', tr); return (int(float(m.group(1)) // TAM), int(float(m.group(2)) // TAM))
        def find(ch):
            for y, r in enumerate(mapa):
                for x, c in enumerate(r):
                    if c == ch: return (x, y)
        pasos = 0; choques_vistos = 0
        for n in '1234':
            objetivo = find(n)
            while True:
                if page.query_selector('#btnRe'): raise SystemExit('nivel 1: la ventanilla cerró')
                ok = len(page.query_selector_all('.pagina.on'))
                if ok >= int(n): break
                p = pos_jugador(); path = bfs(mapa, p, objetivo)
                if not path: raise SystemExit('sin camino desde %s' % (p,))
                nx, ny = path[0]; dx, dy = nx - p[0], ny - p[1]
                key = {(1, 0): 'ArrowRight', (-1, 0): 'ArrowLeft', (0, 1): 'ArrowDown', (0, -1): 'ArrowUp'}[(dx, dy)]
                page.keyboard.press(key); pasos += 1; page.wait_for_timeout(60 if not CALMA else 30)
                if pasos > 900: raise SystemExit('nivel 1: demasiados pasos')
            if n == '2': page.click('#btnOjos'); cap(page, '04-n1-ojos'); page.click('#btnOjos')
        log('nivel 1 completado en', pasos, 'pulsaciones')
        page.wait_for_selector('#btnSeguir', timeout=8000)

    def nivel_muro(v):
        page.click('#btnEmpezar'); page.wait_for_selector('#linea')
        segs = v['datos']['segmentos']['es']; meta = v['datos']['meta']
        hechos = 0; si = 0
        while hechos < meta:
            seg = segs[si % len(segs)]; si += 1
            # esperar a que estén las palabras de este segmento en la línea
            for _ in range(400):
                if page.query_selector('#btnRe'): raise SystemExit('nivel 2: muro al techo')
                if page.query_selector('#pausaCaja:not(.oculto)'):
                    page.wait_for_selector('#pausaCaja.oculto', state='attached', timeout=20000); continue
                n = len(page.query_selector_all('#linea .pal'))
                if n >= len(seg): break
                if CALMA: page.click('#btnSig'); page.wait_for_timeout(40)
                else: page.wait_for_timeout(120)
            for _ in range(10):
                d = page.query_selector('#linea .pal.dificil')
                if not d: break
                d.evaluate('e=>e.click()'); page.wait_for_timeout(40)
            if hechos == 2: cap(page, '05-n2-muro')
            page.evaluate("n=>document.querySelector('#linea .gap[data-g=\"'+n+'\"]').click()", len(seg)); page.wait_for_timeout(120)
            hechos = int(page.inner_text('#esc'))
        log('nivel 2: escalones', hechos, 'muro', page.inner_text('#mur'))
        page.wait_for_selector('#btnSeguir', timeout=20000)

    def nivel_hilos(v):
        page.click('#btnEmpezar'); page.wait_for_selector('.nodo')
        cap(page, '06-n3-hilos')
        d = v['datos']
        # ruta: estudiante de derecho -> subalcaldía -> moto -> mercados (o la ruta mínima del mundo)
        ady = collections.defaultdict(list)
        for e in d['aristas']:
            if e['tipo'] == 'ok': ady[e['de']].append(e['a']); ady[e['a']].append(e['de'])
        q = collections.deque([d['inicio']]); prev = {d['inicio']: None}
        while q:
            p = q.popleft()
            if p == d['final']: break
            for n in ady[p]:
                if n not in prev: prev[n] = p; q.append(n)
        ruta = []; c = d['final']
        while c != d['inicio']: ruta.append(c); c = prev[c]
        ruta = ruta[::-1]; log('ruta hilos:', ruta)
        nodos = {n['id']: n for n in d['nodos']}
        for nid in ruta:
            if nodos[nid]['tipo'] == 'vecino':
                page.click('.nodo[data-id="%s"]' % nid); page.wait_for_selector('#btnFavor'); page.click('#btnFavor'); page.wait_for_timeout(100)
            page.click('.nodo[data-id="%s"]' % nid); page.wait_for_timeout(250)
        page.wait_for_selector('#btnSeguir', timeout=15000)

    def nivel_sesion():
        page.click('#btnEmpezar'); page.wait_for_selector('[data-abrir]')
        for c in M['casillas']:
            page.click('[data-abrir="%s"]' % c); page.wait_for_selector('#cartasPanel .carta')
            btns = page.query_selector_all('#cartasPanel [data-pagar]:not([disabled])')
            if btns: btns[0].click()
            else:
                page.query_selector_all('#cartasPanel [data-tesoro]:not([disabled])')[0].click(); log('casilla', c, 'pagada con Tesoro')
            page.wait_for_timeout(150)
        cap(page, '07-n4-sesion')
        page.click('#btnSometer')
        page.wait_for_selector('#btnFin, #btnRe', timeout=40000)
        if page.query_selector('#btnRe'): raise SystemExit('la ley no pasó')
        cap(page, '08-n4-votacion'); page.click('#btnFin')

    def despues_de_nivel(v):
        page.wait_for_selector('#btnSeguir'); cap(page, '09-recompensa-' + v['id']); page.click('#btnSeguir')
        if v.get('pregunta'):
            page.wait_for_selector('.pregunta button[data-k]'); page.click('.pregunta button[data-k="1"]')
        page.wait_for_selector('#btnIr'); cap(page, '10-mapa-' + v['id']); page.click('#btnIr'); page.wait_for_selector('#btnEmpezar')

    for v in visitas:
        pl = v['plantilla']
        if pl == 'ESTANTE': nivel_estante(); despues_de_nivel(v)
        elif pl == 'GUIA_POR_VOZ': nivel_voz(v); despues_de_nivel(v)
        elif pl == 'MURO_DE_PALABRAS': nivel_muro(v); despues_de_nivel(v)
        elif pl == 'HILOS': nivel_hilos(v); despues_de_nivel(v)
        elif pl == 'CONSTRUCTOR': nivel_sesion()

    # ---- Mi Ley
    page.wait_for_selector('#papel'); cap(page, '11-miley-sin-compromiso')
    page.click('[data-comp]'); page.wait_for_selector('#codigoTxt')
    codigo = page.inner_text('#codigoTxt').strip(); log('código de partida:', codigo)
    dec = page.evaluate('c=>window.MOTIRO.CODIGO.decode(c)', codigo); log('decodificado:', json.dumps(dec))
    S = page.evaluate('window.MOTIRO.estado()'); log('Ley Viva', S['leyViva'], 'fichas finales', S['fichas'])
    assert page.query_selector('.papel .qr svg'), 'sin QR'
    assert dec and dec['leyViva'] == S['leyViva'], 'código no refleja Ley Viva'
    page.click('#btnFacil'); page.wait_for_selector('#papel'); cap(page, '12-miley-facil')
    page.screenshot(path=os.path.join(CAP, '%s-13-miley-completa.png' % TAG), full_page=True)
    wa = page.get_attribute('#btnWa', 'href'); assert wa.startswith('https://wa.me/?text='), 'whatsapp'

    # ---- Pleno
    if '--pleno' in args or True:
        page.goto(URL + '?pleno'); page.wait_for_selector('#plenoTxt')
        page.fill('#plenoTxt', codigo + '\nMT-ZZZZ-0000\n' + codigo); page.click('#btnSumar'); page.wait_for_timeout(300)
        t = page.inner_text('#escena'); assert '1 / 30' in t, 'pleno no sumó el código'
        page.click('.voto[data-i="0"][data-v="si"]'); page.wait_for_timeout(200)
        cap(page, '14-pleno'); page.screenshot(path=os.path.join(CAP, '%s-15-pleno-completo.png' % TAG), full_page=True)
        log('pleno OK:', page.inner_text('#plenoMsg'))

    log('errores JS:', errores if errores else 'ninguno')
    br.close()
    with open(os.path.join(CAP, '%s-log.txt' % TAG), 'w', encoding='utf-8') as f: f.write('\n'.join(LOG))
    print('FIN OK', TAG)
