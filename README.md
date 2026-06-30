

**[English](README.en.md) | [Català](README.md) | [Español](README.es.md)**

# BoscDeDades

Construeix, mesura i millora la teva ciutat: uneix-te a la xarxa ciutadana que vigila la salut ambiental dels nostres carrers amb tecnologia oberta.

## 🤝 Crèdits i Agraïments

Aquest projecte és un esforç col·laboratiu que es basa en el treball de grans referents. Creiem en el poder del coneixement obert i la ciència impulsada per la comunitat.

### 🏗️ Fonaments Originals

Un agraïment especial als pioners que han fet possible aquest projecte:

- **[Sensor.Community / AirRohr](https://sensor.community/):** Per la infraestructura global i el disseny original basat en ESP8266.
- **[Helmut Bitter (DNMS)](https://github.com/hbitter/DNMS):** Per la recerca innovadora i el firmware per a sistemes de mesura de soroll digital (Digital Noise Measurement Systems).
- **Comunitat de Ciència Ciutadana:** Pel feedback constant i les proves que fan que aquestes eines evolucionin.

### 👥 L'Equip de BoscDeDades

El nostre equip de 4 coordinadors ha integrat aquestes tecnologies per crear un kit d'eines dedicat a escoles i centres cívics:

- **[Adrià de la Iglesia]:** Traducció i adaptació del firmware i del lloc web.
- **[Javier Rodríguez]:** Responsable Pedagògic i Disseny d'Unitats Didàctiques.
- **[Marco A. Rodríguez]:** Desenvolupament de Software i Dashboard Web.
- **[Marco A. Rodríguez]:** Dinamització Comunitària i Proves de Camp.

### 🌟 Origen del Projecte

Aquest "fork" específic s'ha desenvolupat per millorar les següents característiques del projecte original:

- Admetre la comunicació I2C estesa (P82B715PN) i configuracions de hardware modulars.

### 📁 Estructura del projecte

A la carpeta "Firmware" trobareu tres carpetes:

- La "FirmwareTraduit + AP Custom", que és el firmware final que hi ha precarregat als sensors mediambientals del BoscDeDades.
- La "FirmwareTraduit+ESP8266-SensorComunity", que és el firmware original de Sensor.Community amb la traducció al català.
- La "Teensy4-dnms-custom", que és el firmware original del sensor de soroll amb les modificacions que hem inclòs per alleugerar el codi i millorar l'eficiència.

Dins d'aquestes carpetes podeu trobar les versions compilades i el codi font de cadascuna.

A la carpeta "Hardware" trobareu les versions de les PCB que fem servir d'AirRohr i del DNMS.

A la carpeta "web" trobareu el codi font de la web de Bosc de Dades i del servidor provisional de recepció de dades. A la subcarpeta "web/assets/educational-kit" podeu trobar les unitats didàctiques que es fan servir a escoles i instituts.

A l'arxiu "LlistaMaterials.md" trobareu un llistat dels materials que s'han fet servir, descripcions i enllaços on es poden trobar. 