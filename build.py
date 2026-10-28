"""Ensambla motiro/index.html a partir de src/ (CSS, SVG, QR, motor).
Uso: python build.py
"""
import os, re, base64
ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, 'src')

def leer(p):
    with open(p, encoding='utf-8') as f:
        return f.read()

tpl = leer(os.path.join(SRC, 'index.tpl.html'))
css = leer(os.path.join(SRC, 'style.css'))
svg = leer(os.path.join(SRC, 'simbolos.svg'))
qr = leer(os.path.join(ROOT, 'qrcode.js'))
core = leer(os.path.join(SRC, 'motor-core.js'))
niveles = leer(os.path.join(SRC, 'motor-niveles.js'))
pleno = leer(os.path.join(SRC, 'motor-pleno.js'))

font = ''
fp = os.path.join(SRC, 'atkinson.woff2')
if os.path.exists(fp) and os.path.getsize(fp) < 62000:
    b64 = base64.b64encode(open(fp, 'rb').read()).decode('ascii')
    font = ("@font-face{font-family:'Atkinson Hyperlegible';font-style:normal;font-weight:400 700;font-display:swap;"
            "src:url(data:font/woff2;base64,%s) format('woff2')}" % b64)

# el script QR usa </script> en ningún lado, pero por seguridad:
for s in (qr, core, niveles, pleno):
    assert '</script' not in s.lower(), 'un script contiene </script>'

out = (tpl.replace('/*__FONT__*/', font)
          .replace('/*__CSS__*/', css)
          .replace('<!--__SVG__-->', svg)
          .replace('/*__QR__*/', qr)
          .replace('/*__CORE__*/', core)
          .replace('/*__NIVELES__*/', niveles)
          .replace('/*__PLENO__*/', pleno))
with open(os.path.join(ROOT, 'index.html'), 'w', encoding='utf-8', newline='\n') as f:
    f.write(out)
tot = os.path.getsize(os.path.join(ROOT, 'index.html')) + os.path.getsize(os.path.join(ROOT, 'mundo-ciudad.js'))
print('index.html: %d bytes · total con mundo-ciudad.js: %d bytes (%.0f KB) · fuente embebida: %s' % (
    os.path.getsize(os.path.join(ROOT, 'index.html')), tot, tot / 1024, 'sí' if font else 'no'))
