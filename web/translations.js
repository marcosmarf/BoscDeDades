const translations = {
    "ca": {
        "nav-logo": "BOSC DE DADES",
        "nav-manifest": "Manifest",
        "nav-materials": "Materials",
        "nav-cta": "Full de ruta",
        "nav-plantarSensor": "Plantar un Sensor",
        "lang-trigger": "Idioma",

        "main-title": "<span class='text-accent'>Bosc</span> de Dades",
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

        "cta-title": "Full de Ruta",
        "phase1-title": "Fase 01: El Concepte",
        "phase1-coords": "COORDENADES: 41.53 N, 2.44 E<br>ESTAT: ACTIU",
        "phase1-item1": "<span style='color: #2ecc71;'>✓</span> Anàlisi i selecció de hardware i software",
        "phase1-item2": "<span style='color: #2ecc71;'>✓</span> Proves inicials de càrrega dels sensor",
        "phase1-item3": "<span style='color: #2ecc71;'>✓</span> Planificació dels materials didáctics",
        "phase1-item4": "<span style='color: #f39c12;'>⟳</span> Comunicació de l'inici del projecte",

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
        "phase2-item3": "<span style='color: #e74c3c;'>○</span> Adaptació hardware",
        "phase2-item3-a": "Localització al Català",
        "phase2-item3-b": "¿Afegir pantalla Oled?",
        "phase2-item3-c": "Proves de càrrega",
        "phase2-item3-d": "Disseny construcció encapsulació",
        "phase2-item3-e": "Revisió circuiteria",
        "phase2-item3-f": "Errors alimentació SDS011",
        "phase2-item3-g": "Encapsulació del micro",
        "phase2-item3-h": "Revisió comunicació I2C (¿redisseny placa?)",
        "phase2-item4": "<span style='color: #e74c3c;'>○</span> Adaptació software",
        "phase2-item4-a": "Analisi funcionament de les comunicacions",
        "phase2-item4-b": "¿Servidor propi amb dades?",
        "phase2-item4-c": "Adaptacions",
        "phase2-item5": "<span style='color: #e74c3c;'>○</span> Ensamblatge dels equips",
        "phase2-item5-a": "Ensamblatge dels equips",
        "phase2-item5-b": "Preconfiguració",
        "phase2-item5-c": "Testeig",
        "phase2-item5-d": "Encapsular",
        "phase2-item6": "<span style='color: #e74c3c;'>○</span> Maquetació física de la maleta pedagògica",
        "phase2-item7": "<span style='color: #e74c3c;'>○</span> Organització logística dels tallers",

        "phase3-title": "Fase 03: Tallers i posada en marxa",
        "phase3-meta": "LOCATION: Your home<br>START: Hello World!",
        "phase3-item1": "<span style='color: #e74c3c;'>○</span> Realització de tallers presencials",
        "phase3-item2": "<span style='color: #e74c3c;'>○</span> Seguiment i generació de dades",
        "phase3-item3": "<span style='color: #e74c3c;'>○</span> Documentació i manteniment",

        "phase4-title": "Fase 04: Analisi de dades",
        "phase4-meta": "DATA: Loaded<br>ANALISYS: Start!",
        "phase4-item1": "<span style='color: #e74c3c;'>○</span> Recoleció de dades",
        "phase4-item2": "<span style='color: #e74c3c;'>○</span> Anàlisi de correlacions",
        "phase4-item3": "<span style='color: #e74c3c;'>○</span> Redacció d'informes",

        "footer-title": "Vols plantar un <span style='color: #BAE9F4;'>sensor?</span>",
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
        "nav-logo": "BOSQUE DE DATOS",
        "nav-manifest": "Manifiesto",
        "nav-materials": "Materiales",
        "nav-cta": "Hoja de ruta",
        "nav-plantarSensor": "Plantar un Sensor",
        "lang-trigger": "Idioma",

        "main-title": "<span class='text-accent'>Bosque</span> de Datos",
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

        "cta-title": "Hoja de ruta",
        "phase1-title": "Fase 01: El Concepto",
        "phase1-coords": "COORDENADAS: 41.53 N, 2.44 E<br>ESTADO: ACTIVO",
        "phase1-item1": "<span style='color: #2ecc71;'>✓</span> Análisis y selección de hardware y software",
        "phase1-item2": "<span style='color: #2ecc71;'>✓</span> Pruebas iniciales de carga de los sensores",
        "phase1-item3": "<span style='color: #2ecc71;'>✓</span> Planificación de los materiales didácticos",
        "phase1-item4": "<span style='color: #f39c12;'>⟳</span> Comunicación del inicio del proyecto",

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
        "phase2-item3": "<span style='color: #e74c3c;'>○</span> Adaptación de hardware",
        "phase2-item3-a": "Localización al catalán",
        "phase2-item3-b": "¿Añadir pantalla Oled?",
        "phase2-item3-c": "Pruebas de carga",
        "phase2-item3-d": "Diseño y construcción de la encapsulación",
        "phase2-item3-e": "Revisión de circuitería",
        "phase2-item3-f": "Errores de alimentación del SDS011",
        "phase2-item3-g": "Encapsulación del micro",
        "phase2-item3-h": "Revisión de la comunicación I2C (¿rediseño de placa?)",
        "phase2-item4": "<span style='color: #e74c3c;'>○</span> Adaptación de software",
        "phase2-item4-a": "Análisis del funcionamiento de las comunicaciones",
        "phase2-item4-b": "¿Servidor propio con datos?",
        "phase2-item4-c": "Adaptaciones",
        "phase2-item5": "<span style='color: #e74c3c;'>○</span> Ensamblaje de los equipos",
        "phase2-item5-a": "Ensamblaje de los equipos",
        "phase2-item5-b": "Preconfiguración",
        "phase2-item5-c": "Testeo",
        "phase2-item5-d": "Encapsular",
        "phase2-item6": "<span style='color: #e74c3c;'>○</span> Maquetación física de la maleta pedagógica",
        "phase2-item7": "<span style='color: #e74c3c;'>○</span> Organización logística de los talleres",

        "phase3-title": "Fase 03: Talleres y puesta en marcha",
        "phase3-meta": "LOCALIZACIÓN: Tu casa<br>INICIO: ¡Hola Mundo!",
        "phase3-item1": "<span style='color: #e74c3c;'>○</span> Realización de talleres presenciales",
        "phase3-item2": "<span style='color: #e74c3c;'>○</span> Seguimiento y generación de datos",
        "phase3-item3": "<span style='color: #e74c3c;'>○</span> Documentación y mantenimiento",

        "phase4-title": "Fase 04: Análisis de datos",
        "phase4-meta": "DATOS: Cargados<br>ANÁLISIS: ¡Empieza!",
        "phase4-item1": "<span style='color: #e74c3c;'>○</span> Recolección de datos",
        "phase4-item2": "<span style='color: #e74c3c;'>○</span> Análisis de correlaciones",
        "phase4-item3": "<span style='color: #e74c3c;'>○</span> Redacción de informes",

        "footer-title": "¿Quieres plantar un <span style='color: #BAE9F4;'>sensor?</span>",
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
        "nav-logo": "DATA FOREST",
        "nav-manifest": "Manifesto",
        "nav-materials": "Materials",
        "nav-cta": "Roadmap",
        "nav-plantarSensor": "Plant a Sensor",
        "lang-trigger": "Language",

        "main-title": "<span class='text-accent'>Data</span> Forest",
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

        "cta-title": "Roadmap",
        "phase1-title": "Phase 01: The Concept",
        "phase1-coords": "COORDINATES: 41.53 N, 2.44 E<br>STATUS: ACTIVE",
        "phase1-item1": "<span style='color: #2ecc71;'>✓</span> Hardware and software analysis and selection",
        "phase1-item2": "<span style='color: #2ecc71;'>✓</span> Initial sensor load tests",
        "phase1-item3": "<span style='color: #2ecc71;'>✓</span> Educational material planning",
        "phase1-item4": "<span style='color: #f39c12;'>⟳</span> Project launch communication",

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
        "phase2-item3": "<span style='color: #e74c3c;'>○</span> Hardware adaptation",
        "phase2-item3-a": "Catalan localisation",
        "phase2-item3-b": "Add OLED screen?",
        "phase2-item3-c": "Load tests",
        "phase2-item3-d": "Enclosure design and construction",
        "phase2-item3-e": "Circuit review",
        "phase2-item3-f": "SDS011 power supply issues",
        "phase2-item3-g": "Microphone encapsulation",
        "phase2-item3-h": "I2C communication review (board redesign?)",
        "phase2-item4": "<span style='color: #e74c3c;'>○</span> Software adaptation",
        "phase2-item4-a": "Communication behaviour analysis",
        "phase2-item4-b": "Dedicated data server?",
        "phase2-item4-c": "Adaptations",
        "phase2-item5": "<span style='color: #e74c3c;'>○</span> Device assembly",
        "phase2-item5-a": "Assembly of the devices",
        "phase2-item5-b": "Preconfiguration",
        "phase2-item5-c": "Testing",
        "phase2-item5-d": "Encapsulation",
        "phase2-item6": "<span style='color: #e74c3c;'>○</span> Physical design of the educational kit",
        "phase2-item7": "<span style='color: #e74c3c;'>○</span> Workshop logistics organisation",

        "phase3-title": "Phase 03: Workshops and rollout",
        "phase3-meta": "LOCATION: Your home<br>START: Hello World!",
        "phase3-item1": "<span style='color: #e74c3c;'>○</span> In-person workshops",
        "phase3-item2": "<span style='color: #e74c3c;'>○</span> Monitoring and data generation",
        "phase3-item3": "<span style='color: #e74c3c;'>○</span> Documentation and maintenance",

        "phase4-title": "Phase 04: Data analysis",
        "phase4-meta": "DATA: Loaded<br>ANALYSIS: Start!",
        "phase4-item1": "<span style='color: #e74c3c;'>○</span> Data collection",
        "phase4-item2": "<span style='color: #e74c3c;'>○</span> Correlation analysis",
        "phase4-item3": "<span style='color: #e74c3c;'>○</span> Report writing",

        "footer-title": "Do you want to plant a <span style='color: #BAE9F4;'>sensor?</span>",
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
        trigger.focus();
    });

    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) close();
    });

    document.addEventListener('keydown', (e) => {
        if (!dropdown.classList.contains('is-open')) return;
        if (e.key === 'Escape') {
            e.preventDefault();
            close();
            trigger.focus();
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