const translations = {
    "ca": {
        "nav-manifest": "Manifest",
        "nav-materials": "Materials",
        "nav-cta": "Full de ruta",
        "nav-plantarSensor": "Plantar un Sensor",

        "main-title": "<span class='text-accent'>Bosc</span> de Dades",
        "main-subtitle": "// CONSTRUEIX, MESURA i MILLORA",

        "manifest-subtitle": "Construeix, mesura i millora la teva ciutat: uneix-te a la xarxa ciutadana que vigila la salut ambiental dels nostres carrers amb tecnologia oberta.",
        "manifest-infoBlock": "Més enllà d'una Smart City, construïm una ciutat de Ciutadans Inteligents. 'Bosc de Dades' és una iniciativa pionera que posa la tecnologia a les teves mans: un projecte de ciència ciutadana on estudiants i veïns construeixen, instal·len i gestionen els seus propis sensors de codi obert. Uneix-te a nosaltres per dibuixar, dada a dada, el mapa real de l'aire que respirem i el soroll que ens envolta, transformant la informació invisible dels nostres carrers en accions per a un futur més saludable.",

        "tooltip-CitizenCience": "Projectes de recerca oberts a la participació de la ciutadania per generar coneixement científic.",
        "tooltip-OpenSource": "Codi font disponible públicament per a ser usat, modificat i distribuït lliurement.",
        "tooltip-IoT": "Internet of Things: xarxa d'objectes físics connectats que recullen i intercanvien dades."
    },
    "es": {
        "nav-manifest": "Manifiesto",
        "nav-materials": "Materiales",
        "nav-cta": "Hoja de ruta",
        "nav-plantarSensor": "Plantar un Sensor",

        "main-title": "<span class='text-accent'>Bosque</span> de Datos",
        "main-subtitle": "// CONSTRUYE, MIDE y MEJORA",

        "manifest-subtitle": "TT",
        "manifest-infoBlock": "TT",

        "tooltip-CitizenCience": "Proyectos de investigación abiertos a la participación ciudadana para generar conocimiento científico.",
        "tooltip-OpenSource": "Código fuente disponible públicamente para ser usado, modificado y distribuido libremente.",
        "tooltip-IoT": "Internet of Things: red de objetos físicos conectados que recogen e intercambian datos."
    }
};

function changeLanguage(lang) {
    localStorage.setItem('bosc_lang', lang);
    document.documentElement.lang = lang;

    const currentDict = translations[lang];
    for (const key in currentDict) {
        const element = document.getElementById(key);

        if (element) {
            if (key.startsWith('tooltip-')) {
                element.setAttribute('data-tooltip', currentDict[key]);
            } else {
                element.innerHTML = currentDict[key];
            }
        }
    }
}