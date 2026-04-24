const translations = {
    "ca": {
        "nav-manifest": "Manifest",
        "nav-materials": "Descàrregues",
        "nav-install": "Instal·lació",
        "nav-cta": "Full de ruta",
        "nav-plantarSensor": "Plantar un Sensor",
        "lang-trigger": "Idioma",

        "main-subtitle": "// CONSTRUEIX, MESURA i MILLORA",

        "manifest-subtitle": "Construeix, mesura i millora la teva ciutat: uneix-te a la xarxa ciutadana que vigila la salut ambiental dels nostres carrers amb tecnologia oberta.",
        "manifest-infoBlock": "Més enllà d'una Smart City, construïm una ciutat de Ciutadans Inteligents. 'Bosc de Dades' és una iniciativa pionera que posa la tecnologia a les teves mans: un projecte de ciència ciutadana on estudiants i veïns construeixen, instal·len i gestionen els seus propis sensors de codi obert. Uneix-te a nosaltres per dibuixar, dada a dada, el mapa real de l'aire que respirem i el soroll que ens envolta, transformant la informació invisible dels nostres carrers en accions per a un futur més saludable.",

        "tooltip-CitizenCience": "Projectes de recerca oberts a la participació de la ciutadania per generar coneixement científic.",
        "tooltip-OpenSource": "Codi font disponible públicament per a ser usat, modificat i distribuït lliurement.",
        "tooltip-IoT": "Internet of Things: xarxa d'objectes físics connectats que recullen i intercanvien dades.",

        "dwn-title": "Descàrregues",
        "dwn-manual": "Manual d'Usuari",
        "dwn-code": "Codi Font",
        "dwn-data": "Dades Obertes",
        "dwn-docs": "Documentació Tècnica",

        "install-title": "Instal·lació",
        "install-subtitle": "Guia ràpida per muntar el sensor, configurar el Wi‑Fi i començar a enviar dades.",
        "install-steps-title": "Passos bàsics",
        "install-step1": "1) Muntatge del kit i comprovació d'alimentació",
        "install-step2": "2) Carregar el firmware i configurar la xarxa Wi‑Fi",
        "install-step3": "3) Registrar el sensor i verificar que publica dades",
        "install-step4": "4) Descarregar i consultar les dades",
        "install-note": "Si ets un centre educatiu o un grup, podem ajudar-vos a preparar una sessió d'instal·lació pas a pas.",
        "install-video1-caption": "Tutorial 1: Muntatge",
        "install-video2-caption": "Tutorial 2: Firmware + Wi‑Fi",
        "install-video3-caption": "Tutorial 3: Verificació de dades",
        "install-video4-caption": "Tutorial 4: Descarregar dades",

        "cta-title": "Full de Ruta",
        "phase1-title": "Fase 01: El Concepte",
        "phase1-coords": "COORDENADES: 41.53 N, 2.44 E<br>ESTAT: ACTIU",
        "phase1-item1": "<span style='color: #2ecc71;'>✓</span> Anàlisi i selecció de hardware i software",
        "phase1-item2": "<span style='color: #2ecc71;'>✓</span> Proves inicials de càrrega dels sensor",
        "phase1-item3": "<span style='color: #2ecc71;'>✓</span> Planificació dels materials didáctics",
        "phase1-item4": "<span style='color: #2ecc71;'>✓</span> Comunicació de l'inici del projecte",

        "phase2-title": "Fase 02: Tecnologia",
        "phase2-meta": "HARDWARE: ESP8266 + SDS011<br>PLATAFORMA: SENSOR.COMMUNITY",
        "phase2-item1": "<span style='color: #f39c12;'>⟳</span> Generació de materials didáctics",
        "phase2-item1-a": "Materials Instituts",
        "phase2-item1-b": "Materials Centres cívics",
        "phase2-item1-c": "Materials Tallers",
        "phase2-item2": "<span style='color: #f39c12;'>⟳</span> Generació de materials gràfics",
        "phase2-item2-a": "Logos",
        "phase2-item2-b": "Plantilles documents",
        "phase2-item2-c": "Maquetació web",
        "phase2-item2-d": "¿Eines de visualització de dades?",
        "phase2-item2-e": "Disseny maleta pedagògica",
        "phase2-item3": "<span style='color: #f39c12;'>⟳</span> Adaptació hardware",
        "phase2-item3-a": "Localització al Català",
        "phase2-item3-b": "¿Afegir pantalla Oled?",
        "phase2-item3-c": "Proves de càrrega",
        "phase2-item3-d": "Disseny construcció encapsulació",
        "phase2-item3-e": "Revisió circuiteria",
        "phase2-item3-f": "Errors alimentació SDS011",
        "phase2-item3-g": "Encapsulació del micro",
        "phase2-item3-h": "Revisió comunicació I2C (¿redisseny placa?)",
        "phase2-item4": "<span style='color: #f39c12;'>⟳</span> Adaptació software",
        "phase2-item4-a": "Analisi funcionament de les comunicacions",
        "phase2-item4-b": "¿Servidor propi amb dades?",
        "phase2-item4-c": "Adaptacions",
        "phase2-item5": "<span style='color: #e74c3c;'>○</span> Ensamblatge dels equips",
        "phase2-item5-a": "Ensamblatge dels equips",
        "phase2-item5-b": "Preconfiguració",
        "phase2-item5-c": "Testeig",
        "phase2-item5-d": "Encapsular",
        "phase2-item6": "<span style='color: #e74c3c;'>○</span> Maquetació física de la maleta pedagògica",
        "phase2-item7": "<span style='color: #f39c12;'>⟳</span> Organització logística dels tallers",

        "phase3-title": "Fase 03: Tallers i posada en marxa",
        "phase3-meta": "LOCATION: Your home<br>START: Hello World!",
        "phase3-item1": "<span style='color: #f39c12;'>⟳</span> Realització de tallers presencials",
        "phase3-item2": "<span style='color: #e74c3c;'>○</span> Seguiment i generació de dades",
        "phase3-item3": "<span style='color: #f39c12;'>⟳</span> Documentació i manteniment",

        "phase4-title": "Fase 04: Analisi de dades",
        "phase4-meta": "DATA: Loaded<br>ANALISYS: Start!",
        "phase4-item1": "<span style='color: #e74c3c;'>○</span> Recoleció de dades",
        "phase4-item2": "<span style='color: #e74c3c;'>○</span> Anàlisi de correlacions",
        "phase4-item3": "<span style='color: #e74c3c;'>○</span> Redacció d'informes",

        "maleta-title": "Maleta pedagògica",
        "maleta-subtitle": "Materials educatius per portar el projecte a l'aula, al taller o al centre cívic.",
        "maleta-steps-title": "Contingut bàsic",
        "maleta-step1": "5 Kits de sensors de partícules i medi ambientals, per monitoritzar la qualitat de l'aire",
        "maleta-step2": "2 Kits de mesurament de soroll digital (DNMS) d'alta precició",
        "maleta-step3": "Plànol tècnic de Mataró per a la geolocalització de dades",
        "maleta-step4": "Revistes i dossiers amb situacions d'aprenentatge (SdA) alineades amb el currículum",
        "maleta-note": "Els sensors d'aquest projecte són de tipus DIY (Do-It-Yourself). Tot i la seva precisió per a l'anàlisi de tendències, no són instruments de mesura validats per la indústria ni per organismes oficials de metrologia",
        "maleta-video1-caption": "Recurs 1: Maleta pedagògica",
        "maleta-video2-caption": "Recurs 2: Materials visuals",
        "maleta-video3-caption": "Recurs 3: Dinàmiques de taller",
        "maleta-video4-caption": "Recurs 4: Activitats d'anàlisi",

        "footer-title": "Vols plantar un <span style='color: #7FE5B8;'>sensor?</span>",
        "contact-name-label": "Nom i cognoms",
        "contact-email-label": "Correu electrònic",
        "contact-message-label": "Missatge",
        "contact-message-placeholder": "Explica'ns on voldries plantar el sensor, qui el faria servir, etc.",
        "contact-submit-label": "Enviar sol·licitud",

        "msg-contact-sending": "Enviant el formulari…",
        "msg-contact-feedback": "Gràcies! Hem rebut la teva sol·licitud.",
        "msg-contact-error-required": "Si us plau, omple tots els camps.",
        "msg-contact-error-email": "Introdueix un correu electrònic vàlid.",
        "msg-contact-error": "Hi ha hagut un problema en enviar el formulari. Torna-ho a provar més tard."
    },
    "es": {
        "nav-manifest": "Manifiesto",
        "nav-materials": "Descargas",
        "nav-install": "Instalación",
        "nav-cta": "Hoja de ruta",
        "nav-plantarSensor": "Plantar un Sensor",
        "lang-trigger": "Idioma",
        "main-subtitle": "// CONSTRUYE, MIDE y MEJORA",

        "manifest-subtitle": "Construye, mide y mejora tu ciudad: únete a la red ciudadana que vigila la salud ambiental de nuestras calles con tecnología abierta.",
        "manifest-infoBlock": "Más allá de una Smart City, construimos una ciudad de Ciudadanos Inteligentes. 'Bosque de Datos' es una iniciativa pionera que pone la tecnología en tus manos: un proyecto de ciencia ciudadana donde estudiantes y vecinos construyen, instalan y gestionan sus propios sensores de código abierto. Únete a nosotros para dibujar, dato a dato, el mapa real del aire que respiramos y el ruido que nos rodea, transformando la información invisible de nuestras calles en acciones para un futuro más saludable.",

        "tooltip-CitizenCience": "Proyectos de investigación abiertos a la participación ciudadana para generar conocimiento científico.",
        "tooltip-OpenSource": "Código fuente disponible públicamente para ser usado, modificado y distribuido libremente.",
        "tooltip-IoT": "Internet of Things: red de objetos físicos conectados que recogen e intercambian datos.",

        "dwn-title": "Descargas",
        "dwn-manual": "Manual de Usuario",
        "dwn-code": "Código Fuente",
        "dwn-data": "Datos Abiertos",
        "dwn-docs": "Documentación Técnica",
        
        "install-title": "Instalación",
        "install-subtitle": "Guía rápida para montar el sensor, configurar el Wi‑Fi y empezar a enviar datos.",
        "install-steps-title": "Pasos básicos",
        "install-step1": "1) Montaje del kit y comprobación de alimentación",
        "install-step2": "2) Cargar el firmware y configurar la red Wi‑Fi",
        "install-step3": "3) Registrar el sensor y verificar que publica datos",
        "install-step4": "4) Descargar y consultar los datos",
        "install-note": "Si sois un centro educativo o un grupo, podemos ayudaros a preparar una sesión de instalación paso a paso.",
        "install-video1-caption": "Tutorial 1: Montaje",
        "install-video2-caption": "Tutorial 2: Firmware + Wi‑Fi",
        "install-video3-caption": "Tutorial 3: Verificación de datos",
        "install-video4-caption": "Tutorial 4: Descarga de datos",

        "cta-title": "Hoja de ruta",
        "phase1-title": "Fase 01: El Concepto",
        "phase1-coords": "COORDENADAS: 41.53 N, 2.44 E<br>ESTADO: ACTIVO",
        "phase1-item1": "<span style='color: #2ecc71;'>✓</span> Análisis y selección de hardware y software",
        "phase1-item2": "<span style='color: #2ecc71;'>✓</span> Pruebas iniciales de carga de los sensores",
        "phase1-item3": "<span style='color: #2ecc71;'>✓</span> Planificación de los materiales didácticos",
        "phase1-item4": "<span style='color: #2ecc71;'>✓</span> Comunicación del inicio del proyecto",

        "phase2-title": "Fase 02: Tecnología",
        "phase2-meta": "HARDWARE: ESP8266 + SDS011<br>PLATAFORMA: SENSOR.COMMUNITY",
        "phase2-item1": "<span style='color: #f39c12;'>⟳</span> Generación de materiales didácticos",
        "phase2-item1-a": "Materiales Institutos",
        "phase2-item1-b": "Materiales Centros cívicos",
        "phase2-item1-c": "Materiales Talleres",
        "phase2-item2": "<span style='color: #f39c12;'>⟳</span> Generación de materiales gráficos",
        "phase2-item2-a": "Logos",
        "phase2-item2-b": "Plantillas de documentos",
        "phase2-item2-c": "Maquetación web",
        "phase2-item2-d": "¿Herramientas de visualización de datos?",
        "phase2-item2-e": "Diseño de maleta pedagógica",
        "phase2-item3": "<span style='color: #f39c12;'>⟳</span> Adaptación de hardware",
        "phase2-item3-a": "Localización al catalán",
        "phase2-item3-b": "¿Añadir pantalla Oled?",
        "phase2-item3-c": "Pruebas de carga",
        "phase2-item3-d": "Diseño y construcción de la encapsulación",
        "phase2-item3-e": "Revisión de circuitería",
        "phase2-item3-f": "Errores de alimentación del SDS011",
        "phase2-item3-g": "Encapsulación del micro",
        "phase2-item3-h": "Revisión de la comunicación I2C (¿rediseño de placa?)",
        "phase2-item4": "<span style='color: #f39c12;'>⟳</span> Adaptación de software",
        "phase2-item4-a": "Análisis del funcionamiento de las comunicaciones",
        "phase2-item4-b": "¿Servidor propio con datos?",
        "phase2-item4-c": "Adaptaciones",
        "phase2-item5": "<span style='color: #e74c3c;'>○</span> Ensamblaje de los equipos",
        "phase2-item5-a": "Ensamblaje de los equipos",
        "phase2-item5-b": "Preconfiguración",
        "phase2-item5-c": "Testeo",
        "phase2-item5-d": "Encapsular",
        "phase2-item6": "<span style='color: #e74c3c;'>○</span> Maquetación física de la maleta pedagógica",
        "phase2-item7": "<span style='color: #f39c12;'>⟳</span> Organización logística de los talleres",

        "phase3-title": "Fase 03: Talleres y puesta en marcha",
        "phase3-meta": "LOCALIZACIÓN: Tu casa<br>INICIO: ¡Hola Mundo!",
        "phase3-item1": "<span style='color: #f39c12;'>⟳</span> Realización de talleres presenciales",
        "phase3-item2": "<span style='color: #e74c3c;'>○</span> Seguimiento y generación de datos",
        "phase3-item3": "<span style='color: #f39c12;'>⟳</span> Documentación y mantenimiento",

        "phase4-title": "Fase 04: Análisis de datos",
        "phase4-meta": "DATOS: Cargados<br>ANÁLISIS: ¡Empieza!",
        "phase4-item1": "<span style='color: #e74c3c;'>○</span> Recolección de datos",
        "phase4-item2": "<span style='color: #e74c3c;'>○</span> Análisis de correlaciones",
        "phase4-item3": "<span style='color: #e74c3c;'>○</span> Redacción de informes",

        "maleta-title": "Maleta pedagógica",
        "maleta-subtitle": "Materiales educativos para llevar el proyecto al aula, al taller o al centro cívico.",
        "maleta-steps-title": "El Kit Pedagógico",
        "maleta-step1": "5 Kits de sensores de partículas y medioambientales para monitorizar la calidad del aire",
        "maleta-step2": "2 Kits de medición de ruido digital (DNMS) de alta precisión",
        "maleta-step3": "Plano técnico de Mataró para la geolocalización de datos",
        "maleta-step4": "Revistas y dosieres con situaciones de aprendizaje (SdA) alineadas con el currículo",
        "maleta-note": "Los sensores de este proyecto son de tipo DIY (Do-It-Yourself). A pesar de su precisión para el análisis de tendencias, no son instrumentos de medida validados por la industria ni por organismos oficiales de metrología",
        "maleta-video1-caption": "Recurso 1: Guía docente",
        "maleta-video2-caption": "Recurso 2: Materiales visuales",
        "maleta-video3-caption": "Recurso 3: Dinámicas de taller",
        "maleta-video4-caption": "Recurso 4: Actividades de análisis",

        "footer-title": "¿Quieres plantar un <span style='color: #7FE5B8;'>sensor?</span>",
        "contact-name-label": "Nombre y apellidos",
        "contact-email-label": "Correo electrónico",
        "contact-message-label": "Mensaje",
        "contact-message-placeholder": "Cuéntanos dónde te gustaría plantar el sensor, quién lo usaría, etc.",
        "contact-submit-label": "Enviar solicitud",
        "msg-contact-sending": "Enviando el formulario…",
        "msg-contact-feedback": "¡Gracias! Hemos recibido tu solicitud.",
        "msg-contact-error-required": "Por favor, rellena todos los campos.",
        "msg-contact-error-email": "Introduce un correo electrónico válido.",
        "msg-contact-error": "Ha habido un problema al enviar el formulario. Inténtalo de nuevo más tarde."
    },
    "en": {
        "nav-manifest": "Manifesto",
        "nav-materials": "Downloads",
        "nav-install": "Installation",
        "nav-cta": "Roadmap",
        "nav-plantarSensor": "Plant a Sensor",
        "lang-trigger": "Language",
        "main-subtitle": "// BUILD, MEASURE and IMPROVE",

        "manifest-subtitle": "Build, measure and improve your city: join the citizen network that monitors the environmental health of our streets with open technology.",
        "manifest-infoBlock": "Beyond a Smart City, we are building a city of Smart Citizens. 'Data Forest' is a pioneering initiative that puts technology in your hands: a citizen science project where students and neighbours build, install and manage their own open-source sensors. Join us to draw, data by data, the real map of the air we breathe and the noise around us, turning the invisible information of our streets into actions for a healthier future.",

        "tooltip-CitizenCience": "Research projects open to citizen participation to generate scientific knowledge.",
        "tooltip-OpenSource": "Source code that is publicly available to be used, modified and freely distributed.",
        "tooltip-IoT": "Internet of Things: network of physical objects connected to collect and exchange data.",

        "dwn-title": "Downloads",
        "dwn-manual": "User Manual",
        "dwn-code": "Source Code",
        "dwn-data": "Open Data",
        "dwn-docs": "Technical Documentation",

        "intall-title": "Installation",
        "install-subtitle": "Quick guide to assemble the sensor, configure Wi‑Fi, and start sending data.",
        "install-steps-title": "Basic steps",
        "install-step1": "1) Assemble the kit and check power",
        "install-step2": "2) Flash the firmware and configure Wi‑Fi",
        "install-step3": "3) Register the sensor and verify data publishing",
        "install-step4": "4) Download and review the data",
        "install-note": "If you are a school or a group, we can help you run a step‑by‑step installation session.",
        "install-video1-caption": "Tutorial 1: Assembly",
        "install-video2-caption": "Tutorial 2: Firmware + Wi‑Fi",
        "install-video3-caption": "Tutorial 3: Data verification",
        "install-video4-caption": "Tutorial 4: Data download",

        "cta-title": "Roadmap",
        "phase1-title": "Phase 01: The Concept",
        "phase1-coords": "COORDINATES: 41.53 N, 2.44 E<br>STATUS: ACTIVE",
        "phase1-item1": "<span style='color: #2ecc71;'>✓</span> Hardware and software analysis and selection",
        "phase1-item2": "<span style='color: #2ecc71;'>✓</span> Initial sensor load tests",
        "phase1-item3": "<span style='color: #2ecc71;'>✓</span> Educational material planning",
        "phase1-item4": "<span style='color: #2ecc71;'>✓</span> Project launch communication",

        "phase2-title": "Phase 02: Technology",
        "phase2-meta": "HARDWARE: ESP8266 + SDS011<br>PLATFORM: SENSOR.COMMUNITY",
        "phase2-item1": "<span style='color: #f39c12;'>⟳</span> Creation of educational materials",
        "phase2-item1-a": "High school materials",
        "phase2-item1-b": "Community centre materials",
        "phase2-item1-c": "Workshop materials",
        "phase2-item2": "<span style='color: #f39c12;'>⟳</span> Creation of graphic materials",
        "phase2-item2-a": "Logos",
        "phase2-item2-b": "Document templates",
        "phase2-item2-c": "Web layout",
        "phase2-item2-d": "Data visualisation tools?",
        "phase2-item2-e": "Educational kit design",
        "phase2-item3": "<span style='color: #f39c12;'>⟳</span> Hardware adaptation",
        "phase2-item3-a": "Catalan localisation",
        "phase2-item3-b": "Add OLED screen?",
        "phase2-item3-c": "Load tests",
        "phase2-item3-d": "Enclosure design and construction",
        "phase2-item3-e": "Circuit review",
        "phase2-item3-f": "SDS011 power supply issues",
        "phase2-item3-g": "Microphone encapsulation",
        "phase2-item3-h": "I2C communication review (board redesign?)",
        "phase2-item4": "<span style='color: #f39c12;'>⟳</span> Software adaptation",
        "phase2-item4-a": "Communication behaviour analysis",
        "phase2-item4-b": "Dedicated data server?",
        "phase2-item4-c": "Adaptations",
        "phase2-item5": "<span style='color: #e74c3c;'>○</span> Device assembly",
        "phase2-item5-a": "Assembly of the devices",
        "phase2-item5-b": "Preconfiguration",
        "phase2-item5-c": "Testing",
        "phase2-item5-d": "Encapsulation",
        "phase2-item6": "<span style='color: #e74c3c;'>○</span> Physical design of the educational kit",
        "phase2-item7": "<span style='color: #f39c12;'>⟳</span> Workshop logistics organisation",

        "phase3-title": "Phase 03: Workshops and rollout",
        "phase3-meta": "LOCATION: Your home<br>START: Hello World!",
        "phase3-item1": "<span style='color: #f39c12;'>⟳</span> In-person workshops",
        "phase3-item2": "<span style='color: #e74c3c;'>○</span> Monitoring and data generation",
        "phase3-item3": "<span style='color: #f39c12;'>⟳</span> Documentation and maintenance",

        "phase4-title": "Phase 04: Data analysis",
        "phase4-meta": "DATA: Loaded<br>ANALYSIS: Start!",
        "phase4-item1": "<span style='color: #e74c3c;'>○</span> Data collection",
        "phase4-item2": "<span style='color: #e74c3c;'>○</span> Correlation analysis",
        "phase4-item3": "<span style='color: #e74c3c;'>○</span> Report writing",

        "maleta-title": "Educational Kit",
        "maleta-subtitle": "Educational materials to bring the project into classrooms, workshops, or community centres.",
        "maleta-steps-title": "The Educational Kit",
        "maleta-step1": "5 particle and environmental sensor kits to monitor air quality",
        "maleta-step2": "2 high-precision digital noise measurement kits (DNMS)",
        "maleta-step3": "Technical map of Mataró for data geolocation",
        "maleta-step4": "Magazines and dossiers with learning situations (SdA) aligned with the curriculum",
        "maleta-note": "The sensors in this project are DIY (Do-It-Yourself) devices. Although they are accurate for trend analysis, they are not measurement instruments validated by industry or official metrology bodies",
        "maleta-video1-caption": "Resource 1: Teaching guide",
        "maleta-video2-caption": "Resource 2: Visual materials",
        "maleta-video3-caption": "Resource 3: Workshop dynamics",
        "maleta-video4-caption": "Resource 4: Analysis activities",

        "footer-title": "Do you want to plant a <span style='color: #7FE5B8;'>sensor?</span>",
        "contact-name-label": "Name and surname",
        "contact-email-label": "Email",
        "contact-message-label": "Message",
        "contact-message-placeholder": "Tell us where you would like to plant the sensor, who would use it, etc.",
        "contact-submit-label": "Send request",
        "msg-contact-sending": "Sending…",
        "msg-contact-feedback": "Thank you! We have received your request.",
        "msg-contact-error-required": "Please fill in all fields.",
        "msg-contact-error-email": "Please enter a valid email address.",
        "msg-contact-error": "There has been a problem sending the form. Please try again later."
    }
};

function t(key, fallback = '') {
    const lang = document.documentElement.lang || 'ca';
    const dict = translations[lang] || translations.ca || {};
    return dict[key] ?? fallback;
}

function changeLanguage(lang) {
    localStorage.setItem('bosc_lang', lang);
    document.documentElement.lang = lang;

    const currentDict = translations[lang];
    for (const key in currentDict) {
        if (key.endsWith('-placeholder')) {
            const el = document.getElementById(key.replace(/-placeholder$/, ''));
            if (el) el.setAttribute('placeholder', currentDict[key]);
            continue;
        }

        const element = document.getElementById(key);

        if (element) {
            if (key.startsWith('tooltip-')) {
                element.setAttribute('data-tooltip', currentDict[key]);
            } else {
                element.innerHTML = currentDict[key];
            }
        }
    }

    syncLanguageSelector(lang);
    clearContactFeedback();
}

function clearContactFeedback() {
    const feedbackEl = document.getElementById('contact-feedback');
    if (!feedbackEl) return;
    feedbackEl.textContent = '';
    feedbackEl.style.color = '';
}

function setupLanguageSelector() {
    const dropdown = document.getElementById('lang-dropdown');
    const trigger = document.getElementById('lang-trigger');
    const menu = document.getElementById('lang-menu');
    if (!dropdown || !trigger || !menu) return;

    if (dropdown.dataset.bound === '1') return;
    dropdown.dataset.bound = '1';

    const open = () => {
        dropdown.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
    };

    const close = () => {
        dropdown.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
    };

    const focusTriggerWithoutScroll = () => {
        // Keep keyboard focus for accessibility without nudging viewport position.
        if (typeof trigger.focus === 'function') {
            try {
                trigger.focus({ preventScroll: true });
            } catch (_) {
                trigger.focus();
            }
        }
    };

    const toggle = () => {
        if (dropdown.classList.contains('is-open')) close();
        else open();
    };

    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        toggle();
    });

    menu.addEventListener('click', (e) => {
        const btn = e.target && e.target.closest ? e.target.closest('.lang-option') : null;
        if (!btn) return;
        const newLang = btn.getAttribute('data-lang') || 'ca';
        changeLanguage(newLang);
        close();
        focusTriggerWithoutScroll();
    });

    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) close();
    });

    document.addEventListener('keydown', (e) => {
        if (!dropdown.classList.contains('is-open')) return;
        if (e.key === 'Escape') {
            e.preventDefault();
            close();
            focusTriggerWithoutScroll();
        }
    });
}

function syncLanguageSelector(lang) {
    const dropdown = document.getElementById('lang-dropdown');
    const trigger = document.getElementById('lang-trigger');
    const menu = document.getElementById('lang-menu');
    if (!dropdown || !trigger || !menu) return;

    trigger.setAttribute('data-lang', lang);

    const options = menu.querySelectorAll('.lang-option');
    options.forEach((opt) => {
        const optLang = opt.getAttribute('data-lang');
        const selected = optLang === lang;
        opt.classList.toggle('is-selected', selected);
        opt.setAttribute('aria-selected', selected ? 'true' : 'false');
    });
}

function initLanguage() {
    let savedLang = null;
    try {
        savedLang = localStorage.getItem('bosc_lang');
    } catch (_) {
        savedLang = null;
    }

    const langToApply = savedLang && translations[savedLang] ? savedLang : 'ca';
    setupLanguageSelector();
    changeLanguage(langToApply);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguage);
} else {
    initLanguage();
}

window.t = t;