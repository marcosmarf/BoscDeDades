**[English](README.en.md) | [Català](README.md) | [Español](README.es.md)**

# BoscDeDades
Construye, mide y mejora tu ciudad: únete a la red ciudadana que vigila la salud ambiental de nuestras calles con tecnología abierta.

## 🤝 Créditos y Agradecimientos

Este proyecto es un esfuerzo colaborativo que se apoya en el trabajo de grandes referentes. Creemos en el poder del conocimiento abierto y la ciencia impulsada por la comunidad.

### 🏗️ Cimientos Originales
Agradecimiento especial a los pioneros cuyo trabajo hizo posible este proyecto:
* **[Sensor.Community / AirRohr](https://sensor.community/):** Por la infraestructura global y el diseño original basado en ESP8266.
* **[Helmut Bitter (DNMS)](https://github.com/hbitter/DNMS):** Por la investigación innovadora y el firmware sobre sistemas de medición de ruido digital (DNMS).
* **Comunidad de Ciencia Ciudadana:** Por el feedback constante y las pruebas que mantienen estas herramientas en evolución.

### 👥 El Equipo de BoscDeDades
Nuestro equipo de 4 coordinadores ha integrado estas tecnologías para crear un kit de herramientas dedicado a escuelas y centros cívicos:
* **[David Otero]:** Integración de Hardware y Arquitectura de bus I2C.
* **[Javier Rodríguez]:** Responsable Pedagógico y Diseño de Unidades Didácticas.
* **[Marco A. Rodríguez]:** Desarrollo de Software y Dashboard Web.
* **[Marco A. Rodríguez]:** Dinamización Comunitaria y Pruebas de Campo.

### 🌟 Origen del Proyecto
Este "fork" específico se ha desarrollado para mejorar las siguientes características del proyecto original:
- Soportar la comunicación I2C extendida (P82B715PN) y configuraciones de hardware modulares.

### 📁 Estructura del proyecto
En la carpeta "Firmware" encontrarás tres carpetas:
- La "FirmwareTraduit + AP Custom", que es el firmware final precargado en los sensores medioambientales de BoscDeDades.
- La "FirmwareTraduit+ESP8266-SensorComunity", que es el firmware original de Sensor.Community con la traducción al catalán.
- La "Teensy4-dnms-custom", que es el firmware original del sensor de ruido con las modificaciones que hemos incluido para aligerar el código y mejorar la eficiencia.

Dentro de estas carpetas puedes encontrar las versiones compiladas y el código fuente de cada una.

En la carpeta "Hardware" encontrarás las versiones de las PCB que usamos de AirRohr y del DNMS.

En la carpeta "web" encontrarás el código fuente de la web de Bosc de Dades y del servidor provisional de recepción de datos. En la subcarpeta "web/assets/educational-kit" puedes encontrar las unidades didácticas que se utilizan en escuelas e institutos.

En el archivo "LlistaMaterials.md" encontrarás un listado de los materiales que se han utilizado, descripciones y enlaces donde se pueden encontrar.