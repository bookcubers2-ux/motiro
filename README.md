# MOTIRÕ · la ley que nadie pudo comprar

Juego web educativo y accesible. El jugador es un proyecto de ley que camina Santa Cruz de la Sierra ganándose, con actos de generosidad, las firmas de las personas a las que va a gobernar. Cada partida produce un documento real ("Mi Ley") y un código corto que se suma en un Modo Pleno proyectado.

Un Impact Arcade de GivingTuesday + Games for Change. Hecho en la Biblioteca de Relaciones Internacionales, UAGRM. Licencia MIT. Sin rastreo, sin analítica, sin datos personales.

## Cómo abrirlo

- **En línea:** https://bookcubers2-ux.github.io/motiro/
- **Desde disco:** descargá la carpeta y abrí `index.html` con doble clic (Chrome 70+ o cualquier navegador moderno). No necesita servidor, internet ni instalación. Solo hacen falta dos archivos: `index.html` y `mundo-ciudad.js`.

Rutas útiles:

| URL | Qué hace |
|---|---|
| `index.html` | Jugar (español por defecto; inglés desde la portada) |
| `index.html?pleno` | Modo Pleno para el proyector |
| `index.html?test` | Pruebas: encode/decode del código (20 casos) y verificación de que cada nivel es completable |
| `index.html?mundo=declaracion80` | Segundo mundo de ejemplo (1 nivel + Sesión) |
| `index.html?lang=en` | Arranca en inglés |

Accesibilidad: **Modo Lector** (voz, letra 24 px, contraste 7:1, teclado completo) y **Modo Calma** (sin relojes ni música, turnos en vez de tiempo, botón Pausa, tecla Escape). Se combinan. En el Nivel 1 el botón "Cerrar los ojos" deja el nivel jugable solo con sonido (balizas estéreo, requiere audífonos).

Teclas: flechas o WASD para moverse (Nivel 1), **H** repite la pista de Abril, Tab/Enter/Espacio para todo lo demás.

## El día del evento (Modo Pleno)

1. En la computadora del proyector abrí `index.html?pleno`. Todo funciona sin internet.
2. Cada jugador termina su partida en la pantalla **Mi Ley**, donde aparece su código `MT-XXXX-XXXX` grande con QR. Lo dicta, lo muestra o lo manda por WhatsApp.
3. El facilitador pega los códigos en el cuadro de arriba (uno por línea o separados por espacios) y pulsa **Sumar códigos**. El contador muestra "N / 30 leyes recibidas"; los códigos inválidos se descartan por checksum.
4. El Pleno muestra: qué carta eligió la sala por casilla, firmas logradas, generosidad comprometida y las respuestas de las tres preguntas.
5. **Ley de la Sala:** se arma con la carta más votada por casilla. Para cada artículo hay dos contadores (verde a favor, blanco en contra) que se suben con clic o con teclas: `1`-`5` elige el artículo, `F` a favor, `C` en contra. Empate: botón "Debate 60 s".
6. **Imprimir Ley de la Sala:** versión formal + Lectura Fácil + 30 líneas de firma.
7. **Meta / Real:** los valores reales se cargan a mano después del evento y quedan guardados en el navegador.

Opcional, con internet: en `index.html` (arriba del todo) se pueden configurar `PLENO_FORM_URL` (un Google Form con el código prellenado; usar `{codigo}` en la URL) y `PLENO_CSV_URL` (hoja de Google publicada como CSV con una columna de códigos). Con eso el botón "Enviar al Pleno" abre el formulario y el Pleno tiene un botón "Actualizar desde la hoja".

## El código de partida

8 caracteres en base32 de Crockford (40 bits): versión (2), mundo (4), 5 casillas × índice de carta (15), compromiso (3) + cantidad (2), 3 respuestas (6), franja de edad (2), firmas (3), checksum (3). El título libre y el nombre no viajan en el código. `window.MOTIRO.CODIGO.encode/decode` en consola.

## Cómo crear un mundo nuevo

Un mundo es solo datos. No se toca el motor.

1. Copiá `mundo-ciudad.js` como `mundo-<id>.js`, cambiá `id` y `codigo` (1 a 15).
2. Definí `visitas` (niveles). Cada visita apunta a una plantilla del motor: `ESTANTE`, `GUIA_POR_VOZ` (mapa de texto: `#` pared, `.` piso, `S` inicio, `1`-`4` ventanillas, `q` fila), `MURO_DE_PALABRAS` (segmentos de oración; `f` = versión fácil de una palabra difícil), `HILOS` (nodos, aristas `ok`/`desvio`, favores de vecinos) y `CONSTRUCTOR` (la Sesión). `BALANZA` y `RUMOR` están reservadas.
3. Definí `cartas` (máximo 8 por casilla, con `textoFormal`, `textoFacil`, `costo`, `campoEditable` opcional), `firmantes`, `compromisos`, `plantillasMotivos` y las `preguntas` dentro de cada visita.
4. Agregá `<script src="mundo-<id>.js"></script>` en `index.html` después de `mundo-ciudad.js` y abrí `index.html?mundo=<id>`.

`MUNDOS.declaracion80` es el ejemplo mínimo.

## Desarrollo

- Fuentes en `src/` (CSS, SVG de símbolos, motor en tres archivos, plantilla HTML). `python build.py` ensambla `index.html` con todo en línea (incluida la librería QR `qrcode-generator`, MIT, y la fuente Atkinson Hyperlegible).
- `python tests/jugar.py [--movil] [--lector] [--calma] [--corta]` juega los cinco niveles de punta a punta con Playwright + Chrome y guarda capturas en `tests/capturas/`.
- Peso total: ≈ 260 KB. ES2017, sin módulos, sin WebGL, sin canvas.
- Las capas guaraní (`gn`) y ayoreo (`ayo`) existen como estructura vacía y están desactivadas hasta su validación comunitaria. Doña Rosa se presenta como "tejedora del anillo exterior"; el flag `validacionComunitaria` del mundo activa su identidad ayorea solo cuando la CANOB la valide.
