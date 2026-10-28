/* =====================================================================
   MOTIRÕ · MUNDOS (datos)
   ---------------------------------------------------------------------
   CÓMO CREAR UN MUNDO NUEVO
   1. Copiá MUNDOS.ciudad en un archivo mundo-<id>.js y cambiá el id y
      el campo "codigo" (número de 1 a 15, viaja en el código de partida).
   2. Cada mundo tiene: nombre, mapa (puntos donde se para La Hoja),
      personajes, visitas (niveles; cada una apunta a una PLANTILLA del
      motor: ESTANTE, GUIA_POR_VOZ, MURO_DE_PALABRAS, HILOS, CONSTRUCTOR,
      BALANZA (stub), RUMOR (stub)), casillas, cartas (máx. 8 por casilla),
      firmantes, compromisos, plantillasMotivos y preguntas.
   3. Todos los textos van como {es:'...', en:'...'}. Las capas gn y ayo
      existen como estructura y están DESACTIVADAS hasta validación
      comunitaria (validacionComunitaria:false).
   4. Cargá el archivo con <script src="mundo-<id>.js"></script> antes
      del motor y abrí index.html?mundo=<id>. El motor no se toca.
   ===================================================================== */
var MUNDOS = window.MUNDOS || {};

MUNDOS.ciudad = {
  id: 'ciudad', codigo: 1, version: 1,
  nombre: { es: 'La Ciudad de los Anillos', en: 'The City of Rings' },
  validacionComunitaria: false,
  minFirmas: 2,
  casillas: ['OBJETO', 'ACCESO', 'LECTURA', 'CERCANIA', 'CUMPLIMIENTO'],
  firmantes: [
    { personaje: 'abril', casilla: 'ACCESO' },
    { personaje: 'tomas', casilla: 'LECTURA' },
    { personaje: 'rosa', casilla: 'CERCANIA' }
  ],
  mapa: {
    puntos: {
      biblioteca: { x: 50, y: 50, nombre: { es: 'Biblioteca', en: 'Library' } },
      tramites: { x: 66, y: 36, nombre: { es: 'Edificio de Trámites', en: 'Public Office' } },
      universidad: { x: 28, y: 34, nombre: { es: 'Universidad', en: 'University' } },
      barrio: { x: 22, y: 76, nombre: { es: 'Anillo exterior', en: 'Outer ring' } },
      asamblea: { x: 50, y: 42, nombre: { es: 'Asamblea', en: 'Assembly' } }
    }
  },
  personajes: {
    hoja: { nombre: { es: 'La Hoja', en: 'The Sheet' }, color: '#FFFFFF' },
    biblio: { nombre: { es: 'El Bibliotecario', en: 'The Librarian' }, color: '#1E7B3C' },
    abril: { nombre: { es: 'Abril', en: 'Abril' }, color: '#E86FA8',
      bio: { es: 'Estudiante, 19 años. Ciega. Experta en moverse por oficinas públicas por sonido.', en: 'Student, 19. Blind. Expert at moving through public offices by sound.' } },
    tomas: { nombre: { es: 'Tomás', en: 'Tomás' }, color: '#E3B15B',
      bio: { es: 'Estudiante autista, 20 años, delegado estudiantil. Lleva un cuaderno con reglas de corte.', en: 'Autistic student, 20, student delegate. Carries a notebook of cutting rules.' } },
    rosa: { nombre: { es: 'Doña Rosa', en: 'Doña Rosa' }, color: '#C2602F',
      bio: { es: 'Tejedora del anillo exterior. Vende bolsos tejidos.', en: 'Weaver from the outer ring. Sells woven bags.' },
      bioComunitaria: { es: 'Tejedora ayorea del anillo exterior.', en: 'Ayoreo weaver from the outer ring.' } },
    expediente: { nombre: { es: 'Don Expediente', en: 'Mr. Dossier' }, color: '#8A8F98' }
  },
  fichas: {
    tiempo:     { nombre: { es: 'Tiempo', en: 'Time' },       color: '#1E7B3C', icono: 'ico-tiempo' },
    talento:    { nombre: { es: 'Talento', en: 'Talent' },    color: '#E3B15B', icono: 'ico-talento' },
    testimonio: { nombre: { es: 'Testimonio', en: 'Testimony' }, color: '#E86FA8', icono: 'ico-testimonio' },
    lazos:      { nombre: { es: 'Lazos', en: 'Ties' },        color: '#A58A5B', icono: 'ico-lazos' },
    tesoro:     { nombre: { es: 'Tesoro', en: 'Treasure' },   color: '#8A8F98', icono: 'ico-tesoro' }
  },

  visitas: [
    /* ---------------- NIVEL 0 ---------------- */
    {
      id: 'n0', plantilla: 'ESTANTE', lugar: 'biblioteca', corta: true, minutos: 4,
      titulo: { es: 'La Hoja en Blanco', en: 'The Blank Sheet' },
      guia: 'biblio',
      datos: {
        intro: {
          es: 'Bienvenida a la biblioteca. Se cayeron tres libros del estante de Derecho. ¿Me ayudás a ordenarlos por tomo?',
          en: 'Welcome to the library. Three books fell off the Law shelf. Can you help me put them back in order by volume?'
        },
        introFacil: { es: 'Ordená los 3 libros: tomo 1, tomo 2, tomo 3.', en: 'Sort the 3 books: volume 1, 2, 3.' },
        libros: [
          { tomo: 1, titulo: { es: 'Constitución · Tomo I', en: 'Constitution · Vol. I' }, color: '#1E7B3C' },
          { tomo: 2, titulo: { es: 'Leyes del Departamento · Tomo II', en: 'Regional Laws · Vol. II' }, color: '#C2602F' },
          { tomo: 3, titulo: { es: 'Reglamentos · Tomo III', en: 'Regulations · Vol. III' }, color: '#E3B15B' }
        ],
        escena: [
          { quien: 'biblio', es: 'Gracias. Ahora mirá eso que entra por la puerta...', en: 'Thank you. Now look what is coming through the door...' },
          { quien: 'expediente', es: 'Mmm. Una ley vieja. Nadie la pudo leer. Nadie la firmó. Ñam.', en: 'Mmm. An old law. No one could read it. No one signed it. Chomp.' },
          { quien: 'biblio', es: 'Ese es Don Expediente. No es malo: es lento, y solo digiere las leyes que no tienen firmas de la gente a la que gobiernan.', en: 'That is Mr. Dossier. He is not evil: he is slow, and he only digests laws that carry no signatures from the people they govern.' },
          { quien: 'biblio', es: 'Vos sos una hoja en blanco. Vas a caminar la ciudad, ayudar a la gente y ganar generosidad: Tiempo, Talento, Testimonio y Lazos. Con eso comprás artículos que la gente firma.', en: 'You are a blank sheet. You will walk the city, help people and earn generosity: Time, Talent, Testimony and Ties. With it you buy articles that people sign.' },
          { quien: 'biblio', es: 'El Tesoro también compra artículos. Pero los artículos comprados solo con Tesoro no llevan firma... y ya viste quién se los come.', en: 'Treasure buys articles too. But articles bought with Treasure alone carry no signature... and you just saw who eats those.' }
        ],
        pedirTitulo: { es: '¿Cómo se va a llamar tu ley?', en: 'What will your law be called?' },
        sugerencias: [
          { es: 'Ley de la Ventanilla que Escucha', en: 'The Listening Counter Act' },
          { es: 'Ley de las Oraciones Cortas', en: 'The Short Sentences Act' },
          { es: 'Ley del Último Anillo', en: 'The Outer Ring Act' },
          { es: 'Ley de la Hoja que Camina', en: 'The Walking Sheet Act' }
        ]
      },
      recompensa: { tiempo: 1 }
    },

    /* ---------------- NIVEL 1 ---------------- */
    {
      id: 'n1', plantilla: 'GUIA_POR_VOZ', lugar: 'tramites', corta: true, minutos: 10,
      titulo: { es: 'La Voz de Abril', en: "Abril's Voice" },
      guia: 'abril', desbloquea: 'ACCESO',
      datos: {
        tiempo: 180,
        intro: {
          es: 'Hola. Soy Abril. Este edificio es un caos de carteles, pero yo no los veo: lo camino por sonido. Seguí mi voz y el ding: suena del lado donde está la ventanilla, y más agudo cuando te acercás. Si querés, cerrá los ojos.',
          en: 'Hi. I am Abril. This building is a chaos of signs, but I do not see them: I walk it by sound. Follow my voice and the ding: it comes from the side where the counter is and gets higher as you get closer. Close your eyes if you like.'
        },
        introFacil: { es: 'Seguí el sonido. Llegá a las ventanillas 1, 2, 3 y 4. No choques con la fila.', en: 'Follow the sound. Reach counters 1, 2, 3 and 4. Do not bump into the queue.' },
        mapa: [
          '###############',
          '#S....#...q...#',
          '#.##..#.#.q.#.#',
          '#.#1..#.#...#.#',
          '#.#...#.###.#.#',
          '#.#.#.....2.#.#',
          '#...#q###.#...#',
          '#.###q#.#.##.##',
          '#.....#.#..q..#',
          '#.###.#4#..q.3#',
          '#.............#',
          '###############'
        ],
        carteles: [
          { es: 'TRÁMITES →', en: 'PROCEDURES →' }, { es: '← CAJA 7', en: '← CASHIER 7' },
          { es: 'VENTANILLA 2 ↑', en: 'COUNTER 2 ↑' }, { es: 'SOLO FOLDER AMARILLO', en: 'YELLOW FOLDER ONLY' },
          { es: 'SALIDA ↓', en: 'EXIT ↓' }, { es: 'NO HAY SISTEMA', en: 'SYSTEM DOWN' },
          { es: 'INFORMES ←', en: 'INFORMATION ←' }, { es: '↑ ↓ ← →', en: '↑ ↓ ← →' }
        ],
        ventanillas: [
          { es: 'Página 1 de 4: Datos personales. La recepcionista no tenía la versión en audio.', en: 'Page 1 of 4: Personal data. The receptionist had no audio version.' },
          { es: 'Página 2 de 4: Declaración jurada. Letra de 8 puntos. Nadie la pudo leer en voz alta.', en: 'Page 2 of 4: Sworn statement. 8-point type. No one could read it aloud.' },
          { es: 'Página 3 de 4: Timbres. El funcionario le habló a mi acompañante, no a mí.', en: 'Page 3 of 4: Stamps. The clerk spoke to my companion, not to me.' },
          { es: 'Página 4 de 4: Firma. ¡Formulario completo! Esto es lo que una ley debería arreglar.', en: 'Page 4 of 4: Signature. Form complete! This is what a law should fix.' }
        ],
        choque: { es: 'La fila te empujó. Volvé a empezar desde la última ventanilla.', en: 'The queue pushed you back. Start again from the last counter.' },
        cierre: { es: 'Gracias por seguir mi voz. Ahora sabés que la información pública es una decisión de diseño.', en: 'Thanks for following my voice. Now you know that public information is a design decision.' }
      },
      recompensa: { testimonio: 1, tiempo: 1 },
      pregunta: {
        id: 'afecta',
        texto: { es: '¿A quién afecta este problema?', en: 'Who does this problem affect?' },
        opciones: [
          { es: 'A mí', en: 'Me' }, { es: 'A alguien que conozco', en: 'Someone I know' },
          { es: 'A nadie que conozca', en: 'No one I know' }, { es: 'No sé', en: 'I do not know' }
        ]
      }
    },

    /* ---------------- NIVEL 2 ---------------- */
    {
      id: 'n2', plantilla: 'MURO_DE_PALABRAS', lugar: 'universidad', corta: true, minutos: 10,
      titulo: { es: 'El Muro de Tomás', en: "Tomás's Wall" },
      guia: 'tomas', desbloquea: 'LECTURA',
      datos: {
        meta: 8, muroMax: 6, lineaMax: 14, msPorPalabra: 1500, pausaCada: 3, pausaSeg: 10,
        intro: {
          es: 'Soy Tomás, delegado estudiantil. Hoy votamos un reglamento, pero el texto me cae encima en ladrillos. Cortá las oraciones donde se puede cortar y cambiá las palabras difíciles por las de mi cuaderno. Cada oración corta es un escalón para mí.',
          en: 'I am Tomás, student delegate. We vote on a regulation today, but the text falls on me in bricks. Cut the sentences where they can be cut and swap the hard words for the ones in my notebook. Every short sentence is a step for me.'
        },
        introFacil: { es: 'Tocá el espacio entre palabras para cortar. Tocá una palabra difícil para cambiarla. Tomás sube un escalón por cada oración limpia.', en: 'Tap the gap between words to cut. Tap a hard word to swap it. Tomás climbs one step per clean sentence.' },
        pausa: { es: 'Necesito un momento. No toques nada por diez segundos, por favor.', en: 'I need a moment. Please do not touch anything for ten seconds.' },
        pausaOk: { es: 'Gracias por esperar.', en: 'Thanks for waiting.' },
        pausaRota: { es: 'Uf. Sigamos igual.', en: 'Oof. Let us go on anyway.' },
        corteMalo: { es: 'Ahí no se corta: la oración queda rota.', en: 'You cannot cut there: the sentence breaks.' },
        sucio: { es: 'Todavía hay una palabra que no entiendo.', en: 'There is still a word I do not understand.' },
        derrumbe: { es: 'La línea se derrumbó sobre el muro.', en: 'The line collapsed onto the wall.' },
        perdiste: { es: 'El muro llegó al techo. Tomás no alcanzó a votar. Probá de nuevo.', en: 'The wall reached the ceiling. Tomás did not make it to the vote. Try again.' },
        cierre: { es: 'Llegué a votar. La velocidad y las palabras largas también son barreras, aunque ningún reglamento las nombre.', en: 'I made it to the vote. Speed and long words are barriers too, even if no regulation names them.' },
        /* segmentos: cada uno es una oración válida. t = texto, f = versión fácil (si existe, la palabra es "difícil") */
        segmentos: {
          es: [
            [{ t: 'La presente disposición normativa', f: 'Esta ley' }, { t: 'tiene por objeto', f: 'busca' }, { t: 'que' }, { t: 'toda persona' }, { t: 'pueda leer' }, { t: 'las normas.' }],
            [{ t: 'Las entidades de la administración pública', f: 'Las oficinas públicas' }, { t: 'deberán', f: 'deben' }, { t: 'entregar' }, { t: 'sus documentos' }, { t: 'en formato accesible.' }],
            [{ t: 'El formato accesible' }, { t: 'incluye' }, { t: 'audio,' }, { t: 'braille' }, { t: 'y Lectura Fácil.' }],
            [{ t: 'El personal' }, { t: 'se dirigirá', f: 'hablará' }, { t: 'a la persona' }, { t: 'con discapacidad' }, { t: 'y no a', f: 'no a' }, { t: 'su acompañante.' }],
            [{ t: 'Cada trámite' }, { t: 'tendrá' }, { t: 'una explicación corta' }, { t: 'en la puerta.' }],
            [{ t: 'Las oficinas' }, { t: 'coadyuvarán', f: 'ayudarán' }, { t: 'a llenar' }, { t: 'los formularios.' }],
            [{ t: 'Nadie' }, { t: 'erogará suma alguna', f: 'pagará' }, { t: 'por recibir' }, { t: 'información' }, { t: 'en su lengua.' }],
            [{ t: 'Las sesiones' }, { t: 'se desarrollarán', f: 'se harán' }, { t: 'en bloques' }, { t: 'con pausas.' }],
            [{ t: 'Cada bloque' }, { t: 'durará' }, { t: 'un máximo de', f: 'como máximo' }, { t: 'veinte minutos.' }],
            [{ t: 'Un comité de jóvenes' }, { t: 'fiscalizará', f: 'revisará' }, { t: 'el cumplimiento' }, { t: 'de esta ley' }, { t: 'cada año.' }],
            [{ t: 'Los pedidos' }, { t: 'de las comunidades' }, { t: 'tendrán respuesta' }, { t: 'en un plazo no mayor a', f: 'en' }, { t: 'treinta días.' }],
            [{ t: 'Esta ley' }, { t: 'entrará en vigencia', f: 'empieza a valer' }, { t: 'el día' }, { t: 'de su publicación.' }]
          ],
          en: [
            [{ t: 'The present normative provision', f: 'This law' }, { t: 'has as its object', f: 'seeks' }, { t: 'that' }, { t: 'every person' }, { t: 'can read' }, { t: 'the rules.' }],
            [{ t: 'Public administration entities', f: 'Public offices' }, { t: 'shall', f: 'must' }, { t: 'deliver' }, { t: 'their documents' }, { t: 'in accessible format.' }],
            [{ t: 'Accessible format' }, { t: 'includes' }, { t: 'audio,' }, { t: 'braille' }, { t: 'and Easy Read.' }],
            [{ t: 'Staff' }, { t: 'shall address', f: 'will speak to' }, { t: 'the person' }, { t: 'with a disability' }, { t: 'and not to', f: 'not to' }, { t: 'their companion.' }],
            [{ t: 'Every procedure' }, { t: 'will have' }, { t: 'a short explanation' }, { t: 'at the door.' }],
            [{ t: 'Offices' }, { t: 'shall coadjuvate', f: 'will help' }, { t: 'in filling' }, { t: 'the forms.' }],
            [{ t: 'No one' }, { t: 'shall disburse any sum', f: 'will pay' }, { t: 'to receive' }, { t: 'information' }, { t: 'in their language.' }],
            [{ t: 'Sessions' }, { t: 'shall be conducted', f: 'will run' }, { t: 'in blocks' }, { t: 'with breaks.' }],
            [{ t: 'Each block' }, { t: 'will last' }, { t: 'a maximum of', f: 'at most' }, { t: 'twenty minutes.' }],
            [{ t: 'A youth committee' }, { t: 'shall oversee', f: 'will review' }, { t: 'compliance' }, { t: 'with this law' }, { t: 'every year.' }],
            [{ t: 'Requests' }, { t: 'from communities' }, { t: 'will be answered' }, { t: 'within a period not exceeding', f: 'within' }, { t: 'thirty days.' }],
            [{ t: 'This law' }, { t: 'shall enter into force', f: 'starts to apply' }, { t: 'on the day' }, { t: 'of its publication.' }]
          ]
        }
      },
      recompensa: { talento: 1 }, bonus: { tiempo: 1 },
      pregunta: {
        id: 'comunidad',
        texto: { es: '¿Ves este problema en tu comunidad?', en: 'Do you see this problem in your community?' },
        opciones: [
          { es: 'Sí, a diario', en: 'Yes, every day' }, { es: 'A veces', en: 'Sometimes' },
          { es: 'Nunca lo había pensado', en: 'I had never thought about it' }, { es: 'No', en: 'No' }
        ]
      }
    },

    /* ---------------- NIVEL 3 ---------------- */
    {
      id: 'n3', plantilla: 'HILOS', lugar: 'barrio', corta: false, minutos: 10,
      titulo: { es: 'El Hilo de Doña Rosa', en: "Doña Rosa's Thread" },
      guia: 'rosa', desbloquea: 'CERCANIA',
      datos: {
        hilo: 8,
        intro: {
          es: 'Mijita, necesito un permiso para vender mis bolsos en el mercado. La oficina está en el centro y yo estoy acá afuera, en el último anillo. Tendé hilos entre la gente para que mi pedido llegue a la oficina correcta y vuelva firmado. El hilo es poco: no lo gastes en nudos.',
          en: 'Dear, I need a permit to sell my bags at the market. The office is downtown and I am out here on the last ring. Stretch threads between people so my request reaches the right office and comes back signed. There is little thread: do not waste it on knots.'
        },
        introFacil: { es: 'Tocá a la persona u oficina a la que querés mandar el pedido. Los vecinos ayudan si antes los ayudaste.', en: 'Tap the person or office you want to send the request to. Neighbours help if you helped them first.' },
        inicio: 'rosa', final: 'mercados',
        nodos: [
          { id: 'rosa', x: 14, y: 78, tipo: 'persona', nombre: { es: 'Doña Rosa', en: 'Doña Rosa' }, icono: 'p-rosa' },
          { id: 'nino', x: 30, y: 90, tipo: 'vecino', nombre: { es: 'Nico, 10 años', en: 'Nico, age 10' }, icono: 'p-nino',
            favor: { es: 'Se le cayó la cadena de la bici.', en: 'His bike chain fell off.' }, favorBtn: { es: 'Arreglar la bici', en: 'Fix the bike' },
            ayuda: { es: 'Yo llevo el papel en bici hasta la Subalcaldía.', en: 'I will bike the paper to the District Office.' } },
          { id: 'profesora', x: 34, y: 62, tipo: 'vecino', nombre: { es: 'Profesora Elvira', en: 'Teacher Elvira' }, icono: 'p-profe',
            favor: { es: 'Se le cayó la bolsa del pan.', en: 'She dropped her bread bag.' }, favorBtn: { es: 'Recoger la bolsa', en: 'Pick up the bag' },
            ayuda: { es: 'Yo conozco a la funcionaria de la Subalcaldía.', en: 'I know the clerk at the District Office.' } },
          { id: 'moto', x: 62, y: 76, tipo: 'vecino', nombre: { es: 'Wilson, mototaxista', en: 'Wilson, moto-taxi' }, icono: 'p-moto',
            favor: { es: 'El motocarro no arranca.', en: 'The moto-cart will not start.' }, favorBtn: { es: 'Empujar el motocarro', en: 'Push the cart' },
            ayuda: { es: 'Yo llevo el papel al centro, gratis.', en: 'I will take the paper downtown, free.' } },
          { id: 'derecho', x: 30, y: 36, tipo: 'vecino', nombre: { es: 'Camila, estudiante de Derecho', en: 'Camila, law student' }, icono: 'p-derecho',
            favor: { es: 'Dejó un libro en el pasto.', en: 'She left a book on the grass.' }, favorBtn: { es: 'Devolver el libro', en: 'Return the book' },
            ayuda: { es: 'Yo redacto el pedido como la oficina lo pide.', en: 'I will write the request the way the office wants it.' } },
          { id: 'subalcaldia', x: 60, y: 40, tipo: 'oficina', nombre: { es: 'Subalcaldía del distrito', en: 'District Office' }, icono: 'p-oficina',
            dice: { es: 'Sello puesto. Ahora llévenlo a la Oficina de Mercados, en el centro.', en: 'Stamped. Now take it to the Markets Office, downtown.' } },
          { id: 'cultura', x: 44, y: 22, tipo: 'oficina', nombre: { es: 'Dirección de Cultura', en: 'Culture Department' }, icono: 'p-oficina',
            dice: { es: 'Aquí no es. Pruebe en otra oficina.', en: 'Wrong office. Try another one.' } },
          { id: 'banco', x: 74, y: 28, tipo: 'oficina', nombre: { es: 'Banco', en: 'Bank' }, icono: 'p-banco',
            dice: { es: 'Esto no es un trámite bancario.', en: 'This is not a bank procedure.' } },
          { id: 'mercados', x: 80, y: 50, tipo: 'oficina', nombre: { es: 'Oficina de Mercados', en: 'Markets Office' }, icono: 'p-sello',
            dice: { es: 'Permiso firmado. ¿Por qué nadie le explicó esto en su barrio?', en: 'Permit signed. Why did no one explain this in her neighbourhood?' } }
        ],
        /* aristas válidas: ok = avanza; desvio = oficina equivocada (nudo, el pedido no avanza) */
        aristas: [
          { de: 'rosa', a: 'derecho', tipo: 'ok' }, { de: 'rosa', a: 'profesora', tipo: 'ok' },
          { de: 'derecho', a: 'subalcaldia', tipo: 'ok' }, { de: 'profesora', a: 'subalcaldia', tipo: 'ok' },
          { de: 'derecho', a: 'nino', tipo: 'ok' }, { de: 'nino', a: 'subalcaldia', tipo: 'ok' },
          { de: 'subalcaldia', a: 'moto', tipo: 'ok' }, { de: 'moto', a: 'mercados', tipo: 'ok' },
          { de: 'rosa', a: 'cultura', tipo: 'desvio' }, { de: 'derecho', a: 'banco', tipo: 'desvio' },
          { de: 'subalcaldia', a: 'cultura', tipo: 'desvio' }, { de: 'profesora', a: 'banco', tipo: 'desvio' },
          { de: 'subalcaldia', a: 'banco', tipo: 'desvio' }, { de: 'moto', a: 'cultura', tipo: 'desvio' }
        ],
        nudo: { es: 'El hilo se enredó. Ese camino no lleva a ningún lado.', en: 'The thread tangled. That path leads nowhere.' },
        sinFavor: { es: 'Primero ayudalo: los vecinos del Motirõ prestan si antes les prestaste.', en: 'Help them first: Motirõ neighbours lend a hand if you lent one first.' },
        sinHilo: { es: 'Se acabó el hilo. El pedido se quedó a mitad de camino. Probá de nuevo.', en: 'The thread ran out. The request got stuck halfway. Try again.' },
        vuelta: { es: 'El permiso volvió firmado al anillo exterior.', en: 'The permit came back signed to the outer ring.' },
        cierre: { es: 'Gracias. La distancia al centro es distancia a los derechos. Los lazos entre vecinos la acortan.', en: 'Thank you. Distance from the centre is distance from rights. Ties between neighbours shorten it.' }
      },
      recompensa: { lazos: 1 }, bonus: { testimonio: 1 },
      pregunta: {
        id: 'perspectiva',
        texto: { es: '¿Qué perspectiva faltaba?', en: 'Whose perspective was missing?' },
        opciones: [
          { es: 'Las personas con discapacidad', en: 'People with disabilities' }, { es: 'Las comunidades indígenas', en: 'Indigenous communities' },
          { es: 'Los barrios de afuera', en: 'The outer neighbourhoods' }, { es: 'Los jóvenes', en: 'Young people' }
        ]
      }
    },

    /* ---------------- NIVEL 4 ---------------- */
    {
      id: 'n4', plantilla: 'CONSTRUCTOR', lugar: 'asamblea', corta: true, minutos: 6,
      titulo: { es: 'La Sesión', en: 'The Session' },
      guia: 'expediente',
      datos: {
        tesoroInicial: 3,
        intro: {
          es: 'Bienvenidos a la Asamblea. Llená las cinco casillas de tu ley con las cartas que ganaste. Pagá con generosidad para que la gente firme. El Tesoro compra cualquier carta... pero yo me como lo que no tiene firma.',
          en: 'Welcome to the Assembly. Fill the five slots of your law with the cards you earned. Pay with generosity so people sign. Treasure buys any card... but I eat whatever has no signature.'
        },
        introFacil: { es: 'Elegí una carta por casilla. Pagá con fichas para que firmen. Las cartas pagadas con Tesoro no llevan firma.', en: 'Pick one card per slot. Pay with tokens so people sign. Cards paid with Treasure carry no signature.' },
        comer: { es: 'Sin firma. Ñam.', en: 'No signature. Chomp.' },
        aprobada: { es: '¡Ley Viva! Tu ley pasa con las firmas de la gente a la que gobierna.', en: 'Living Law! Your law passes with the signatures of the people it governs.' },
        rechazada: { es: 'Tu ley no alcanzó las firmas. Don Expediente se la lleva al archivo. Podés volver a armarla.', en: 'Your law did not get enough signatures. Mr. Dossier takes it to the archive. You can build it again.' }
      }
    }
  ],

  cartas: [
    /* OBJETO */
    { id: 'obj1', casilla: 'OBJETO', costo: { tiempo: 1 }, pictograma: 'pic-ley',
      textoFormal: { es: 'La presente ley garantiza que toda persona joven pueda leer, entender y proponer normas en el Departamento de Santa Cruz.', en: 'This law guarantees that every young person can read, understand and propose rules in the Department of Santa Cruz.' },
      textoFacil: { es: 'Esta ley hace que todos los jóvenes puedan leer y proponer leyes.', en: 'This law lets all young people read and propose laws.' } },
    { id: 'obj2', casilla: 'OBJETO', costo: { tiempo: 1 }, pictograma: 'pic-ojo',
      textoFormal: { es: 'La presente ley tiene por objeto que ninguna norma del Departamento se apruebe sin haber sido leída por las personas a quienes afecta.', en: 'The purpose of this law is that no rule of the Department is approved without being read by the people it affects.' },
      textoFacil: { es: 'Ninguna ley se aprueba si la gente a la que afecta no la pudo leer.', en: 'No law passes if the people it affects could not read it.' } },
    { id: 'obj3', casilla: 'OBJETO', costo: { tiempo: 1 }, pictograma: 'pic-mano',
      textoFormal: { es: 'La presente ley garantiza que todo trámite público pueda completarse por cualquier persona sin pagar ayuda a terceros.', en: 'This law guarantees that any public procedure can be completed by anyone without paying third parties for help.' },
      textoFacil: { es: 'Cualquier persona puede hacer un trámite sin pagarle a nadie para que la ayude.', en: 'Anyone can do a procedure without paying someone to help.' } },
    { id: 'obj4', casilla: 'OBJETO', costo: { tiempo: 1 }, pictograma: 'pic-hilo',
      textoFormal: { es: 'La presente ley reconoce el trabajo voluntario entre vecinos (motirõ) como forma legítima de participación en la vida pública.', en: 'This law recognises voluntary work among neighbours (motirõ) as a legitimate form of participation in public life.' },
      textoFacil: { es: 'Ayudar a los vecinos es una forma de participar y la ley lo reconoce.', en: 'Helping neighbours is a way to participate and the law recognises it.' } },
    /* ACCESO */
    { id: 'acc1', casilla: 'ACCESO', costo: { testimonio: 1 }, pictograma: 'pic-oreja', campoEditable: { tipo: 'numero', valor: 30, min: 1, max: 365, etiqueta: { es: 'días', en: 'days' } },
      textoFormal: { es: 'Toda institución pública entregará sus documentos en formato accesible (audio, braille y Lectura Fácil) en un plazo de [__] días.', en: 'Every public institution shall deliver its documents in accessible format (audio, braille and Easy Read) within [__] days.' },
      textoFacil: { es: 'Las oficinas deben dar sus papeles en audio, braille y lectura fácil en [__] días.', en: 'Offices must give their papers in audio, braille and easy read within [__] days.' } },
    { id: 'acc2', casilla: 'ACCESO', costo: { testimonio: 1 }, pictograma: 'pic-persona',
      textoFormal: { es: 'El personal de toda institución pública se dirigirá directamente a la persona con discapacidad y no a su acompañante.', en: 'Staff of every public institution shall address the person with a disability directly and not their companion.' },
      textoFacil: { es: 'Los funcionarios le hablan a la persona con discapacidad, no a quien la acompaña.', en: 'Clerks speak to the person with a disability, not to whoever is with them.' } },
    { id: 'acc3', casilla: 'ACCESO', costo: { testimonio: 1, tiempo: 1 }, pictograma: 'pic-campana',
      textoFormal: { es: 'Toda oficina pública contará con señalización sonora y táctil y con una persona de orientación en la entrada.', en: 'Every public office shall have audible and tactile signage and a guide person at the entrance.' },
      textoFacil: { es: 'Las oficinas tienen señales que suenan y se tocan, y alguien en la puerta que orienta.', en: 'Offices have signs you can hear and touch, and someone at the door who helps.' } },
    { id: 'acc4', casilla: 'ACCESO', costo: { testimonio: 1 }, pictograma: 'pic-mic',
      textoFormal: { es: 'Los formularios públicos podrán completarse por voz, en papel o en línea, con el mismo valor legal.', en: 'Public forms may be completed by voice, on paper or online, with the same legal value.' },
      textoFacil: { es: 'Un formulario vale igual si lo llenás hablando, en papel o en internet.', en: 'A form counts the same whether you fill it by speaking, on paper or online.' } },
    /* LECTURA */
    { id: 'lec1', casilla: 'LECTURA', costo: { talento: 1 }, pictograma: 'pic-libro',
      textoFormal: { es: 'Todo proyecto de ley tendrá una versión en Lectura Fácil y un glosario anexo.', en: 'Every bill shall have an Easy Read version and an attached glossary.' },
      textoFacil: { es: 'Cada ley viene con una versión fácil y una lista de palabras explicadas.', en: 'Every law comes with an easy version and a list of explained words.' } },
    { id: 'lec2', casilla: 'LECTURA', costo: { talento: 1 }, pictograma: 'pic-pausa',
      textoFormal: { es: 'Las sesiones se organizarán en bloques con pausas para permitir la participación de personas neurodivergentes.', en: 'Sessions shall be organised in blocks with breaks to allow the participation of neurodivergent people.' },
      textoFacil: { es: 'Las sesiones tienen pausas para que todas las personas puedan participar.', en: 'Sessions have breaks so that everyone can take part.' } },
    { id: 'lec3', casilla: 'LECTURA', costo: { talento: 1 }, pictograma: 'pic-tijera', campoEditable: { tipo: 'numero', valor: 25, min: 8, max: 60, etiqueta: { es: 'palabras', en: 'words' } },
      textoFormal: { es: 'Ningún artículo de una norma departamental tendrá oraciones de más de [__] palabras.', en: 'No article of a regional rule shall contain sentences longer than [__] words.' },
      textoFacil: { es: 'Las oraciones de las leyes tienen como máximo [__] palabras.', en: 'Sentences in laws have at most [__] words.' } },
    { id: 'lec4', casilla: 'LECTURA', costo: { talento: 1, testimonio: 1 }, pictograma: 'pic-libro',
      textoFormal: { es: 'La Lectura Fácil será obligatoria en toda comunicación oficial dirigida a la ciudadanía.', en: 'Easy Read shall be mandatory in every official communication addressed to the public.' },
      textoFacil: { es: 'Todo lo que el gobierno le escribe a la gente debe tener versión fácil.', en: 'Everything the government writes to people must have an easy version.' } },
    /* CERCANÍA */
    { id: 'cer1', casilla: 'CERCANIA', costo: { lazos: 1 }, pictograma: 'pic-casa',
      textoFormal: { es: 'La ley se explicará en los barrios del anillo exterior y en la lengua de cada comunidad.', en: 'The law shall be explained in the outer-ring neighbourhoods and in the language of each community.' },
      textoFacil: { es: 'La ley se explica en los barrios de afuera y en el idioma de cada comunidad.', en: 'The law is explained in the outer neighbourhoods and in each community’s language.' } },
    { id: 'cer2', casilla: 'CERCANIA', costo: { lazos: 1 }, pictograma: 'pic-reloj', campoEditable: { tipo: 'numero', valor: 30, min: 1, max: 180, etiqueta: { es: 'días', en: 'days' } },
      textoFormal: { es: 'Los pedidos de las comunidades tendrán respuesta escrita en un plazo máximo de [__] días.', en: 'Requests from communities shall receive a written answer within a maximum of [__] days.' },
      textoFacil: { es: 'Cuando una comunidad pide algo, le responden por escrito en [__] días como máximo.', en: 'When a community asks for something, it gets a written answer within [__] days.' } },
    { id: 'cer3', casilla: 'CERCANIA', costo: { lazos: 1 }, pictograma: 'pic-anillos',
      textoFormal: { es: 'La Asamblea sesionará al menos una vez al año en un barrio situado fuera del cuarto anillo.', en: 'The Assembly shall hold at least one session a year in a neighbourhood beyond the fourth ring road.' },
      textoFacil: { es: 'Una vez al año la Asamblea se reúne en un barrio de afuera.', en: 'Once a year the Assembly meets in an outer neighbourhood.' } },
    { id: 'cer4', casilla: 'CERCANIA', costo: { lazos: 1, tiempo: 1 }, pictograma: 'pic-bolso',
      textoFormal: { es: 'Las asociaciones de artesanas y pequeños productores podrán presentar sus pedidos sin intermediarios ni pago alguno.', en: 'Associations of artisans and small producers may submit their requests without intermediaries or any payment.' },
      textoFacil: { es: 'Las artesanas y productores hacen sus pedidos directamente y gratis.', en: 'Artisans and producers submit their requests directly and for free.' } },
    /* CUMPLIMIENTO */
    { id: 'cum1', casilla: 'CUMPLIMIENTO', costo: { tiempo: 1 }, pictograma: 'pic-check',
      textoFormal: { es: 'Un comité de jóvenes con discapacidad revisará cada año el cumplimiento de la presente ley e informará a la Asamblea.', en: 'A committee of young people with disabilities shall review compliance with this law every year and report to the Assembly.' },
      textoFacil: { es: 'Cada año, jóvenes con discapacidad revisan si la ley se cumple.', en: 'Every year, young people with disabilities check whether the law is followed.' } },
    { id: 'cum2', casilla: 'CUMPLIMIENTO', costo: { tiempo: 1 }, pictograma: 'pic-ojo', campoEditable: { tipo: 'numero', valor: 15, min: 1, max: 90, etiqueta: { es: 'días', en: 'days' } },
      textoFormal: { es: 'La institución que incumpla la presente ley publicará las razones en Lectura Fácil en un plazo de [__] días.', en: 'An institution that fails to comply with this law shall publish its reasons in Easy Read within [__] days.' },
      textoFacil: { es: 'Si una oficina no cumple, tiene que explicar por qué, en fácil, en [__] días.', en: 'If an office does not comply, it must explain why, in easy read, within [__] days.' } },
    { id: 'cum3', casilla: 'CUMPLIMIENTO', costo: { tiempo: 1, lazos: 1 }, pictograma: 'pic-moneda',
      textoFormal: { es: 'El presupuesto destinado al cumplimiento de la presente ley no podrá ser menor que el del año anterior.', en: 'The budget allocated to comply with this law may not be lower than the previous year’s.' },
      textoFacil: { es: 'La plata para cumplir esta ley no puede bajar de un año al otro.', en: 'The money to follow this law cannot go down from one year to the next.' } },
    { id: 'cum4', casilla: 'CUMPLIMIENTO', costo: { tiempo: 1 }, pictograma: 'pic-mic',
      textoFormal: { es: 'Toda persona podrá denunciar el incumplimiento de la presente ley por voz, por escrito o por mensaje, sin necesidad de abogado.', en: 'Anyone may report non-compliance with this law by voice, in writing or by message, without needing a lawyer.' },
      textoFacil: { es: 'Cualquiera puede avisar que la ley no se cumple, hablando o escribiendo, sin abogado.', en: 'Anyone can report that the law is not followed, by speaking or writing, without a lawyer.' } }
  ],

  compromisos: [
    { ficha: 'tiempo', texto: { es: 'Dono 2 horas antes del 5 de diciembre a una causa de mi barrio.', en: 'I donate 2 hours before 5 December to a cause in my neighbourhood.' } },
    { ficha: 'talento', texto: { es: 'Paso un documento público a Lectura Fácil.', en: 'I turn one public document into Easy Read.' } },
    { ficha: 'talento', texto: { es: 'Grabo en audio la explicación de un trámite.', en: 'I record an audio explanation of a public procedure.' } },
    { ficha: 'testimonio', texto: { es: 'Cuento esta historia a 5 personas.', en: 'I tell this story to 5 people.' } },
    { ficha: 'lazos', texto: { es: 'Consigo 10 apoyos para la Ley de la Sala.', en: 'I gather 10 supporters for the Room Law.' } },
    { ficha: 'tesoro', texto: { es: 'Dono a una organización de mi comunidad.', en: 'I donate to an organisation in my community.' } }
  ],

  plantillasMotivos: {
    n1: { es: 'Abril llegó a la ventanilla 4 después de {n1.choques} choques con la fila y no pudo leer el formulario: nadie lo había grabado en audio.', en: 'Abril reached counter 4 after {n1.choques} bumps with the queue and could not read the form: no one had recorded it in audio.' },
    n2: { es: 'Tomás casi no llega a votar porque el texto tenía oraciones de hasta {n2.maxPalabras} palabras y el muro llegó a {n2.muro} ladrillos.', en: 'Tomás almost missed the vote because the text had sentences of up to {n2.maxPalabras} words and the wall reached {n2.muro} bricks.' },
    n3: { es: 'El pedido de Doña Rosa necesitó {n3.hilos} hilos y {n3.nudos} nudos para llegar a la oficina correcta, porque nadie lo explicó en su barrio.', en: 'Doña Rosa’s request needed {n3.hilos} threads and {n3.nudos} knots to reach the right office, because no one explained it in her neighbourhood.' },
    n3falta: { es: 'El pedido de Doña Rosa sigue sin respuesta en el anillo exterior: en esta partida nadie llegó hasta su barrio.', en: 'Doña Rosa’s request is still unanswered on the outer ring: in this game no one reached her neighbourhood.' }
  }
};

/* =====================================================================
   MUNDO 2 (mínimo, de prueba): "La Declaración cumple 80"
   Un solo nivel con la plantilla HILOS + la Sesión. Demuestra que el
   motor funciona con otro objeto de datos sin tocar el código.
   Abrir con index.html?mundo=declaracion80
   ===================================================================== */
MUNDOS.declaracion80 = {
  id: 'declaracion80', codigo: 2, version: 1,
  nombre: { es: 'La Declaración cumple 80', en: 'The Declaration Turns 80' },
  validacionComunitaria: false,
  minFirmas: 1,
  casillas: ['OBJETO', 'ACCESO', 'LECTURA', 'CERCANIA', 'CUMPLIMIENTO'],
  firmantes: [{ personaje: 'vecina', casilla: 'CERCANIA' }],
  mapa: { puntos: {
    barrio: { x: 24, y: 72, nombre: { es: 'Barrio', en: 'Neighbourhood' } },
    asamblea: { x: 50, y: 42, nombre: { es: 'Asamblea', en: 'Assembly' } } } },
  personajes: {
    hoja: { nombre: { es: 'La Hoja', en: 'The Sheet' }, color: '#FFFFFF' },
    vecina: { nombre: { es: 'Doña Eleanor', en: 'Mrs. Eleanor' }, color: '#C2602F', bio: { es: 'Vecina que conoce la Declaración de memoria.', en: 'Neighbour who knows the Declaration by heart.' } },
    expediente: { nombre: { es: 'Don Expediente', en: 'Mr. Dossier' }, color: '#8A8F98' }
  },
  fichas: MUNDOS.ciudad.fichas,
  visitas: [
    { id: 'd1', plantilla: 'HILOS', lugar: 'barrio', corta: true, minutos: 8,
      titulo: { es: 'El Artículo 19 viaja', en: 'Article 19 Travels' }, guia: 'vecina', desbloquea: 'CERCANIA',
      datos: {
        hilo: 6,
        intro: { es: 'Un estudiante denunció censura y nadie le responde. Hacé que su queja llegue a la Defensoría, no a cualquier oficina.', en: 'A student reported censorship and no one answers. Make his complaint reach the Ombudsman, not just any office.' },
        introFacil: { es: 'Tocá a quién mandar la queja. La vecina ayuda si antes la ayudaste.', en: 'Tap who to send the complaint to. The neighbour helps if you helped her first.' },
        inicio: 'estudiante', final: 'defensoria',
        nodos: [
          { id: 'estudiante', x: 18, y: 76, tipo: 'persona', nombre: { es: 'Pablo, estudiante', en: 'Pablo, student' }, icono: 'p-derecho' },
          { id: 'vecina', x: 40, y: 60, tipo: 'vecino', nombre: { es: 'Doña Eleanor', en: 'Mrs. Eleanor' }, icono: 'p-rosa', favor: { es: 'Se le enredó la lana.', en: 'Her yarn got tangled.' }, favorBtn: { es: 'Desenredar la lana', en: 'Untangle the yarn' }, ayuda: { es: 'Yo sé exactamente qué artículo citar.', en: 'I know exactly which article to cite.' } },
          { id: 'policia', x: 66, y: 72, tipo: 'oficina', nombre: { es: 'Policía', en: 'Police' }, icono: 'p-oficina', dice: { es: 'Aquí no se tramitan quejas de derechos.', en: 'Rights complaints are not handled here.' } },
          { id: 'defensoria', x: 56, y: 34, tipo: 'oficina', nombre: { es: 'Defensoría del Pueblo', en: 'Ombudsman' }, icono: 'p-sello', dice: { es: 'Queja recibida con el Artículo 19 citado.', en: 'Complaint received with Article 19 cited.' } }
        ],
        aristas: [
          { de: 'estudiante', a: 'vecina', tipo: 'ok' }, { de: 'vecina', a: 'defensoria', tipo: 'ok' },
          { de: 'estudiante', a: 'policia', tipo: 'desvio' }, { de: 'vecina', a: 'policia', tipo: 'desvio' }
        ],
        nudo: { es: 'Se enredó.', en: 'It tangled.' }, sinFavor: { es: 'Primero ayudala.', en: 'Help her first.' },
        sinHilo: { es: 'Se acabó el hilo. Probá de nuevo.', en: 'Out of thread. Try again.' },
        vuelta: { es: 'La respuesta volvió al barrio.', en: 'The answer came back to the neighbourhood.' },
        cierre: { es: 'Ochenta años después, la Declaración sigue viajando de mano en mano.', en: 'Eighty years on, the Declaration still travels hand to hand.' }
      },
      recompensa: { lazos: 1, tiempo: 2, talento: 1, testimonio: 1 },
      pregunta: { id: 'perspectiva', texto: { es: '¿Qué perspectiva faltaba?', en: 'Whose perspective was missing?' },
        opciones: [{ es: 'Las personas con discapacidad', en: 'People with disabilities' }, { es: 'Las comunidades indígenas', en: 'Indigenous communities' }, { es: 'Los barrios de afuera', en: 'The outer neighbourhoods' }, { es: 'Los jóvenes', en: 'Young people' }] }
    },
    { id: 'd2', plantilla: 'CONSTRUCTOR', lugar: 'asamblea', corta: true, minutos: 5, titulo: { es: 'La Sesión', en: 'The Session' }, guia: 'expediente',
      datos: MUNDOS.ciudad.visitas[4].datos }
  ],
  cartas: [
    { id: 'd-obj', casilla: 'OBJETO', costo: { tiempo: 1 }, pictograma: 'pic-ley', textoFormal: { es: 'La presente ley garantiza que toda persona conozca sus derechos en su propia lengua.', en: 'This law guarantees that everyone knows their rights in their own language.' }, textoFacil: { es: 'Todos conocen sus derechos en su idioma.', en: 'Everyone knows their rights in their language.' } },
    { id: 'd-acc', casilla: 'ACCESO', costo: { testimonio: 1 }, pictograma: 'pic-oreja', textoFormal: { es: 'La Declaración Universal estará disponible en audio y Lectura Fácil en toda biblioteca pública.', en: 'The Universal Declaration shall be available in audio and Easy Read in every public library.' }, textoFacil: { es: 'La Declaración está en audio y fácil en todas las bibliotecas.', en: 'The Declaration is in audio and easy read in all libraries.' } },
    { id: 'd-lec', casilla: 'LECTURA', costo: { talento: 1 }, pictograma: 'pic-libro', textoFormal: { es: 'Toda escuela enseñará el Artículo 19 con ejemplos locales.', en: 'Every school shall teach Article 19 with local examples.' }, textoFacil: { es: 'Las escuelas enseñan la libertad de expresión con ejemplos del barrio.', en: 'Schools teach free expression with neighbourhood examples.' } },
    { id: 'd-cer', casilla: 'CERCANIA', costo: { lazos: 1 }, pictograma: 'pic-casa', textoFormal: { es: 'La Defensoría atenderá quejas en los barrios, sin cita previa.', en: 'The Ombudsman shall receive complaints in neighbourhoods, without appointment.' }, textoFacil: { es: 'La Defensoría va a los barrios y atiende sin cita.', en: 'The Ombudsman comes to neighbourhoods and sees people without appointment.' } },
    { id: 'd-cum', casilla: 'CUMPLIMIENTO', costo: { tiempo: 1 }, pictograma: 'pic-check', textoFormal: { es: 'Cada 10 de diciembre se publicará cuántas quejas recibieron respuesta.', en: 'Every 10 December the number of answered complaints shall be published.' }, textoFacil: { es: 'Cada 10 de diciembre se cuenta cuántas quejas tuvieron respuesta.', en: 'Every 10 December we count how many complaints got an answer.' } }
  ],
  compromisos: MUNDOS.ciudad.compromisos,
  plantillasMotivos: {
    d1: { es: 'La queja de Pablo necesitó {d1.hilos} hilos y {d1.nudos} nudos para llegar a la Defensoría.', en: 'Pablo’s complaint needed {d1.hilos} threads and {d1.nudos} knots to reach the Ombudsman.' }
  }
};
